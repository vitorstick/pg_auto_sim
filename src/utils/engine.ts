import type { InputConfig, SimulationPoint, SimulationResult } from '../types/simulator';

export function parseMs(val: string | number): number {
  if (typeof val === 'number') return val;
  const match = val.match(/^\s*([0-9.]+)\s*(ms|s|min|h)?\s*$/i);
  if (!match) return parseFloat(val) || 0;
  const num = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();
  if (unit === 's') return num * 1000;
  if (unit === 'min') return num * 60 * 1000;
  if (unit === 'h') return num * 3600 * 1000;
  return num; // default ms
}

export function parseSeconds(val: string | number): number {
  if (typeof val === 'number') return val;
  const match = val.match(/^\s*([0-9.]+)\s*(s|min|h|ms)?\s*$/i);
  if (!match) return parseFloat(val) || 0;
  const num = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();
  if (unit === 'ms') return num / 1000;
  if (unit === 'min') return num * 60;
  if (unit === 'h') return num * 3600;
  return num; // default s
}

export function parseMemMB(val: string | number): number {
  if (typeof val === 'number') return val;
  const match = val.match(/^\s*([0-9.]+)\s*(kb|mb|gb|tb)?\s*$/i);
  if (!match) return parseFloat(val) || 0;
  const num = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();
  if (unit === 'kb') return num / 1024;
  if (unit === 'gb') return num * 1024;
  if (unit === 'tb') return num * 1024 * 1024;
  return num; // default MB
}

export function runSimulation(config: InputConfig): SimulationResult {
  const {
    totalRows,
    initialDead,
    writeRate,
    vacuumThreshold,
    vacuumScale,
    costLimit,
    costDelay,
    naptime,
    maintenanceMem,
  } = config;

  const costDelayMs = parseMs(costDelay);
  const naptimeSeconds = parseSeconds(naptime);
  const maintenanceMemMB = parseMemMB(maintenanceMem);

  const delay = costDelayMs <= 0 ? 1 : costDelayMs;
  const limit = costLimit <= 0 ? 1 : costLimit;

  // IO Throughput estimate: (costLimit / costDelay) * 0.12 MB/s
  // e.g. (200 / 20) * 0.12 = 1.2 MB/s
  const ioImpactMBs = (limit / delay) * 0.12;
  const pagesPerSec = ioImpactMBs * 128; // 8KB per page, so 1MB/s = 128 pages/sec

  // Table Page estimation: assume avg row size is 150 bytes
  const rowSize = 150;
  const tablePages = Math.max(1, (totalRows * rowSize) / 8192);

  // Capacity in maintenance_work_mem
  // Dead tuples are stored as 6-byte TIDs
  const capacity = (maintenanceMemMB * 1024 * 1024) / 6;

  // Threshold: vacuum_threshold + vacuum_scale_factor * totalRows
  const threshold = vacuumThreshold + vacuumScale * totalRows;

  // 24 Hour simulation in 10-second intervals
  // Total seconds = 24 * 3600 = 86400
  // Total intervals = 8640
  const totalSeconds = 24 * 3600;
  const intervalSeconds = 10;
  const totalIntervals = totalSeconds / intervalSeconds;

  let currentDead = initialDead;
  let vacuumRemainingSeconds = 0;
  let vacuumRateTuplesPerSec = 0;
  let totalVacuumTimeSeconds = 0;
  let vacuumCount = 0;
  let maxIndexPasses = 1;

  let timeSinceLastCheck = 0;

  const rawPoints: { timeHours: number; deadTuples: number; threshold: number; isVacuuming: boolean }[] = [];

  for (let step = 0; step <= totalIntervals; step++) {
    const currentTimeSeconds = step * intervalSeconds;
    const timeHours = currentTimeSeconds / 3600;

    let isVacuuming = false;

    if (vacuumRemainingSeconds > 0) {
      isVacuuming = true;
      vacuumRemainingSeconds -= intervalSeconds;
      totalVacuumTimeSeconds += intervalSeconds;

      // Clean dead tuples
      currentDead -= vacuumRateTuplesPerSec * intervalSeconds;
      // Also accumulate new dead tuples from writes
      currentDead += writeRate * intervalSeconds;

      if (currentDead < 0) currentDead = 0;

      if (vacuumRemainingSeconds <= 0) {
        vacuumRemainingSeconds = 0;
        // At the end of vacuum, reset remaining dead tuples to a realistic clean state
        // (Postgres vacuum cleans what it collected at start, so writes during vacuum remain)
        currentDead = Math.max(0, currentDead);
      }
    } else {
      // Accumulate writes
      currentDead += writeRate * intervalSeconds;

      // Check for trigger based on naptime interval
      timeSinceLastCheck += intervalSeconds;
      if (timeSinceLastCheck >= naptimeSeconds) {
        timeSinceLastCheck = 0;
        if (currentDead > threshold) {
          // Trigger vacuum!
          vacuumCount++;
          
          // Index passes needed based on current dead tuples size
          const passes = Math.max(1, Math.ceil(currentDead / capacity));
          if (passes > maxIndexPasses) {
            maxIndexPasses = passes;
          }

          // Vacuum Duration Calculation
          const baseScanSeconds = tablePages / pagesPerSec;
          // Index scanning takes 15% of table scan time per pass
          const indexScanSeconds = (tablePages * 0.15) * passes;
          const vacuumDurationSeconds = baseScanSeconds + indexScanSeconds;

          vacuumRemainingSeconds = vacuumDurationSeconds;
          vacuumRateTuplesPerSec = currentDead / vacuumDurationSeconds;
          isVacuuming = true;
        }
      }
    }

    rawPoints.push({
      timeHours,
      deadTuples: Math.round(currentDead),
      threshold: Math.round(threshold),
      isVacuuming,
    });
  }

  // Downsample to 288 points (every 5 minutes = 30 intervals of 10s)
  const downsampledPoints: SimulationPoint[] = [];
  const sampleInterval = 30; // 300 seconds / 10 seconds = 30
  for (let i = 0; i < rawPoints.length; i += sampleInterval) {
    downsampledPoints.push(rawPoints[i]);
  }
  // Ensure the last point is included
  if ((rawPoints.length - 1) % sampleInterval !== 0) {
    downsampledPoints.push(rawPoints[rawPoints.length - 1]);
  }

  const avgDurationMinutes = vacuumCount > 0 
    ? Math.round((totalVacuumTimeSeconds / vacuumCount) / 60) 
    : 0;

  const vacuumFrequencyHours = vacuumCount > 0 
    ? parseFloat((24 / vacuumCount).toFixed(1)) 
    : 0;

  // Determine health
  let isHealthy: 'healthy' | 'warning' | 'unhealthy' = 'healthy';
  let verdict = '';

  const vacuumActivePercentage = (totalVacuumTimeSeconds / totalSeconds) * 100;

  if (vacuumActivePercentage > 80) {
    isHealthy = 'unhealthy';
    verdict = `Verdict: Critical. Autovacuum is running constantly (${Math.round(vacuumActivePercentage)}% of the 24h cycle) and cannot keep up with the write rate. Dead tuples are accumulating, leading to severe table bloat. Consider increasing 'autovacuum_vacuum_cost_limit' to 500-1000, decreasing 'autovacuum_vacuum_cost_delay' to 2-10ms, or reducing write load.`;
  } else if (vacuumActivePercentage > 30) {
    isHealthy = 'warning';
    verdict = `Verdict: System is keeping up, but high write rates make vacuum runtime long (running ${Math.round(vacuumActivePercentage)}% of the day). Consider increasing 'autovacuum_vacuum_cost_limit' for faster cleanup, balanced against system load.`;
  } else if (maxIndexPasses > 1) {
    isHealthy = 'warning';
    verdict = `Verdict: System keeps up, but autovacuum requires ${maxIndexPasses} index passes because 'maintenance_work_mem' (${maintenanceMem}) is too low to hold all ${Math.round(threshold).toLocaleString()} dead tuple TIDs. This increases vacuum durations. Consider increasing 'maintenance_work_mem' to at least ${Math.ceil((threshold * 6) / (1024 * 1024))}MB.`;
  } else if (vacuumCount === 0) {
    isHealthy = 'healthy';
    verdict = `Verdict: System is healthy. Write rate is low relative to the table size, and dead tuples never reached the trigger threshold (${Math.round(threshold).toLocaleString()}). No autovacuum runs were necessary.`;
  } else {
    isHealthy = 'healthy';
    verdict = `Verdict: System is keeping up cleanly. Autovacuum triggers occasionally (every ${vacuumFrequencyHours} hours) and completes quickly (averaging ${avgDurationMinutes} mins), keeping dead tuples well below the trigger threshold without affecting disk IO significantly.`;
  }

  return {
    points: downsampledPoints,
    avgDurationMinutes,
    vacuumFrequencyHours,
    ioImpactMBs: parseFloat(ioImpactMBs.toFixed(1)),
    vacuumCount,
    isHealthy,
    verdict,
    indexPasses: maxIndexPasses,
  };
}


export interface InputConfig {
  totalRows: number;
  initialDead: number;
  writeRate: number;
  vacuumThreshold: number;
  vacuumScale: number;
  analyzeScale: number;
  costLimit: number;
  costDelay: string;
  maxWorkers: number;
  naptime: string;
  maintenanceMem: string;
}

export interface SimulationPoint {
  timeHours: number;
  deadTuples: number;
  threshold: number;
  isVacuuming: boolean;
}

export interface SimulationResult {
  points: SimulationPoint[];
  avgDurationMinutes: number;
  vacuumFrequencyHours: number;
  ioImpactMBs: number;
  vacuumCount: number;
  isHealthy: 'healthy' | 'warning' | 'unhealthy';
  verdict: string;
  indexPasses: number;
}


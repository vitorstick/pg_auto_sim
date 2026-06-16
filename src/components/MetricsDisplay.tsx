import { Clock, RefreshCw, HardDrive } from 'lucide-react';
import type { SimulationResult } from '../types/simulator';

interface MetricsDisplayProps {
  result: SimulationResult;
}

export default function MetricsDisplay({ result }: MetricsDisplayProps) {
  const { avgDurationMinutes, vacuumFrequencyHours, ioImpactMBs, vacuumCount } = result;

  // Determine Duration Status Dot and text
  let durationDotColor = 'bg-emerald-500';
  let durationStatusText = 'Optimal';
  if (vacuumCount > 0) {
    if (avgDurationMinutes > 60) {
      durationDotColor = 'bg-rose-500';
      durationStatusText = 'Very High';
    } else if (avgDurationMinutes > 20) {
      durationDotColor = 'bg-amber-500';
      durationStatusText = 'Moderate';
    }
  } else {
    durationStatusText = 'No Vacuums';
  }

  // Determine Frequency Status Dot and text
  let freqDotColor = 'bg-emerald-500';
  let freqStatusText = 'Infrequent';
  if (vacuumCount > 0) {
    if (vacuumFrequencyHours < 1) {
      freqDotColor = 'bg-rose-500';
      freqStatusText = 'Critical load';
    } else if (vacuumFrequencyHours < 4) {
      freqDotColor = 'bg-amber-500';
      freqStatusText = 'Frequent';
    } else {
      freqStatusText = 'Normal';
    }
  } else {
    freqStatusText = 'Idle';
  }

  // Determine IO Impact Status Dot and text
  let ioDotColor = 'bg-emerald-500';
  let ioStatusText = 'Low';
  if (ioImpactMBs > 10) {
    ioDotColor = 'bg-rose-500';
    ioStatusText = 'High Impact';
  } else if (ioImpactMBs > 3) {
    ioDotColor = 'bg-amber-500';
    ioStatusText = 'Medium Impact';
  }

  const formatFrequency = () => {
    if (vacuumCount === 0) return 'Never';
    if (vacuumFrequencyHours < 1) {
      const mins = Math.round(vacuumFrequencyHours * 60);
      return `Every ${mins} Mins`;
    }
    return `Every ${vacuumFrequencyHours} Hours`;
  };

  const formatDuration = () => {
    if (vacuumCount === 0) return '0 Minutes';
    return `${avgDurationMinutes} Minutes`;
  };

  return (
    <div className="space-y-3.5 text-left">
      <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
        Key Metrics (Outputs)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Average Duration */}
        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Average Duration per Vacuum
              </p>
              <p className="text-xl font-bold text-white tracking-tight">
                {formatDuration()}
              </p>
            </div>
            <div className="bg-blue-950/40 p-2 rounded-lg border border-blue-500/10 text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span className={`w-2 h-2 rounded-full ${durationDotColor} inline-block shadow-sm`}></span>
            <span>{durationStatusText}</span>
          </div>
        </div>

        {/* Card 2: Vacuum Frequency */}
        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Vacuum Frequency
              </p>
              <p className="text-xl font-bold text-white tracking-tight">
                {formatFrequency()}
              </p>
            </div>
            <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-500/10 text-amber-400">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span className={`w-2 h-2 rounded-full ${freqDotColor} inline-block shadow-sm`}></span>
            <span>{freqStatusText}</span>
          </div>
        </div>

        {/* Card 3: IO Impact */}
        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                IO Impact (Estimated)
              </p>
              <p className="text-xl font-bold text-white tracking-tight">
                {ioImpactMBs} MB/s
              </p>
            </div>
            <div className="bg-teal-950/40 p-2 rounded-lg border border-teal-500/10 text-teal-400">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span className={`w-2 h-2 rounded-full ${ioDotColor} inline-block shadow-sm`}></span>
            <span>{ioStatusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


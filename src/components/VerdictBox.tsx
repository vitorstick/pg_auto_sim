import { AlertCircle, CheckCircle } from 'lucide-react';
import type { InputConfig, SimulationState } from '../types/simulator';

interface VerdictBoxProps {
  config: InputConfig;
  data: SimulationState[];
}

export default function VerdictBox({ config, data }: VerdictBoxProps) {
  const peakConnections = data.length > 0 ? Math.max(...data.map(d => d.activeConnections)) : 0;
  const isOverloaded = peakConnections > config.maxConnections;

  return (
    <div className={`p-6 rounded-lg border flex items-start space-x-4 text-left ${
      isOverloaded 
        ? 'bg-rose-950/30 border-rose-500/30 text-rose-200' 
        : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
    }`}>
      {isOverloaded ? (
        <>
          <AlertCircle className="h-6 w-6 text-rose-400 shrink-0" />
          <div>
            <h3 className="font-semibold text-rose-300">Warning: Database Overloaded</h3>
            <p className="text-sm text-slate-300 mt-1">
              Peak connection usage ({peakConnections}) exceeds the configured max connections ({config.maxConnections}).
              Consider increasing maximum connections or tuning pool size.
            </p>
          </div>
        </>
      ) : (
        <>
          <CheckCircle className="h-6 w-6 text-emerald-400 shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-300">Database Healthy</h3>
            <p className="text-sm text-slate-300 mt-1">
              Peak connection usage remains within acceptable limits. Your database configuration is safe for this workload.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

import { Cpu, Users, Zap } from 'lucide-react';
import type { SimulationState } from '../types/simulator';

interface MetricsDisplayProps {
  data: SimulationState[];
}

export default function MetricsDisplay({ data }: MetricsDisplayProps) {
  const peakConnections = data.length > 0 ? Math.max(...data.map(d => d.activeConnections)) : 0;
  const peakCpu = data.length > 0 ? Math.max(...data.map(d => d.cpuUtilization)) : 0;
  const avgCpu = data.length > 0 ? Math.round(data.reduce((acc, d) => acc + d.cpuUtilization, 0) / data.length) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center space-x-4">
        <div className="bg-indigo-900/50 p-3 rounded-full text-indigo-400 border border-indigo-500/20">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">Peak Connections</p>
          <p className="text-2xl font-semibold text-white">{peakConnections}</p>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center space-x-4">
        <div className="bg-emerald-900/50 p-3 rounded-full text-emerald-400 border border-emerald-500/20">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">Peak CPU Load</p>
          <p className="text-2xl font-semibold text-white">{peakCpu}%</p>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center space-x-4">
        <div className="bg-amber-900/50 p-3 rounded-full text-amber-400 border border-amber-500/20">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">Average CPU Load</p>
          <p className="text-2xl font-semibold text-white">{avgCpu}%</p>
        </div>
      </div>
    </div>
  );
}

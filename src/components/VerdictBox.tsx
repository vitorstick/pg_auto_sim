import { CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';
import type { SimulationResult } from '../types/simulator';

interface VerdictBoxProps {
  result: SimulationResult;
}

export default function VerdictBox({ result }: VerdictBoxProps) {
  const { isHealthy, verdict } = result;

  // Render properties based on health
  let borderClass = 'border-emerald-900/50 bg-emerald-950/15';
  let badgeText = 'HEALTHY';
  let badgeColor = 'text-emerald-400';
  let Icon = CheckCircle2;

  if (isHealthy === 'warning') {
    borderClass = 'border-amber-900/50 bg-amber-950/15';
    badgeText = 'HEALTHY (WITH WARNINGS)';
    badgeColor = 'text-amber-500 font-semibold';
    Icon = AlertTriangle;
  } else if (isHealthy === 'unhealthy') {
    borderClass = 'border-rose-900/50 bg-rose-950/15';
    badgeText = 'UNHEALTHY';
    badgeColor = 'text-rose-500 font-semibold';
    Icon = AlertCircle;
  }

  return (
    <div className="space-y-3.5 text-left">
      <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
        Diagnostic Verdict
      </h2>
      <div className={`p-5 rounded-xl border ${borderClass} transition duration-300`}>
        <div className="flex justify-between items-center pb-3 border-b border-slate-800/40 mb-3.5">
          <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
            <Icon className={`w-4 h-4 ${badgeColor}`} />
            <span>Analysis</span>
          </div>
          <span className={`text-xs font-bold tracking-wider uppercase ${badgeColor}`}>
            {badgeText}
          </span>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800/60 mt-0.5 text-slate-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {verdict}
          </p>
        </div>
      </div>
    </div>
  );
}


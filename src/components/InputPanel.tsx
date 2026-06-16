import { HelpCircle } from 'lucide-react';
import type { InputConfig } from '../types/simulator';

interface InputPanelProps {
  config: InputConfig;
  onChange: (newConfig: InputConfig) => void;
  onSimulate?: () => void;
}

export default function InputPanel({ config, onChange, onSimulate }: InputPanelProps) {
  const handleChange = (key: keyof InputConfig, value: string | number) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5 text-left">
      <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
        Configuration (Inputs)
      </h2>

      {/* TABLE WORKLOAD */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-xl p-4 space-y-4">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
          Table Workload
        </h3>
        <div className="space-y-3.5">
          {/* Total Rows */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-medium text-slate-400">Total Rows</label>
              <span title="Total number of rows in the table" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.totalRows}
              onChange={(e) => handleChange('totalRows', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* Initial Dead */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-medium text-slate-400">Initial Dead Tuples</label>
              <span title="Number of dead rows initially in the table" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.initialDead}
              onChange={(e) => handleChange('initialDead', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* Write Rate */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-medium text-slate-400">Write Rate / sec</label>
              <span title="Write rate of updates/deletes creating dead tuples per second" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.writeRate}
              onChange={(e) => handleChange('writeRate', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>
        </div>
      </div>

      {/* AUTOVACUUM SETTINGS */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-xl p-4 space-y-4">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
          Autovacuum Settings
        </h3>
        <div className="space-y-3.5">
          {/* vacuum_threshold */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">autovacuum_vacuum_threshold</label>
              <span title="Minimum number of dead tuples before vacuum" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.vacuumThreshold}
              onChange={(e) => handleChange('vacuumThreshold', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* vacuum_scale_factor */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">autovacuum_vacuum_scale_factor</label>
              <span title="Multiplier of total rows to add to threshold" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              value={config.vacuumScale}
              onChange={(e) => handleChange('vacuumScale', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* analyze_scale_factor */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-[#d97706]/90">autovacuum_analyze_scale_factor</label>
              <span title="Multiplier of total rows to trigger an ANALYZE run" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              value={config.analyzeScale}
              onChange={(e) => handleChange('analyzeScale', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* vacuum_cost_limit */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">autovacuum_vacuum_cost_limit</label>
              <span title="Cost score limit before worker sleeps to throttle disk I/O" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.costLimit}
              onChange={(e) => handleChange('costLimit', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* vacuum_cost_delay */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">autovacuum_vacuum_cost_delay</label>
              <span title="Duration worker sleeps when cost limit is hit (e.g. 20ms)" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="text"
              value={config.costDelay}
              onChange={(e) => handleChange('costDelay', e.target.value)}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* max_workers */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">
                <span className="text-amber-500 font-semibold mr-1">NEW:</span>
                autovacuum_max_workers
              </label>
              <span title="Maximum concurrent autovacuum worker processes across DB" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="number"
              value={config.maxWorkers}
              onChange={(e) => handleChange('maxWorkers', Number(e.target.value))}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* naptime */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">
                <span className="text-amber-500 font-semibold mr-1">NEW:</span>
                autovacuum_naptime
              </label>
              <span title="Interval between autovacuum checks on tables (e.g. 1min)" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="text"
              value={config.naptime}
              onChange={(e) => handleChange('naptime', e.target.value)}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>

          {/* maintenance_work_mem */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <label className="text-xs font-mono text-slate-300">
                <span className="text-amber-500 font-semibold mr-1">NEW:</span>
                maintenance_work_mem
              </label>
              <span title="Memory limit for sorting dead tuple keys (e.g. 64MB)" className="cursor-help inline-flex items-center">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </div>
            <input
              type="text"
              value={config.maintenanceMem}
              onChange={(e) => handleChange('maintenanceMem', e.target.value)}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition duration-200"
            />
          </div>
        </div>
      </div>

      {/* SIMULATE BUTTON */}
      <button
        onClick={onSimulate}
        type="button"
        className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg border border-teal-550/20 active:translate-y-px transition duration-150 uppercase tracking-wider text-xs cursor-pointer"
      >
        Simulate
      </button>
    </div>
  );
}

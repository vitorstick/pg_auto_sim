import type { InputConfig } from '../types/simulator';

interface InputPanelProps {
  config: InputConfig;
  onChange: (newConfig: InputConfig) => void;
}

export default function InputPanel({ config, onChange }: InputPanelProps) {
  const handleChange = (key: keyof InputConfig, value: number) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4 text-left">
      <h2 className="text-lg font-semibold text-white">Simulator Inputs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Connection Pool Size
          </label>
          <input
            type="number"
            value={config.connectionPoolSize}
            onChange={(e) => handleChange('connectionPoolSize', Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Max Connections
          </label>
          <input
            type="number"
            value={config.maxConnections}
            onChange={(e) => handleChange('maxConnections', Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

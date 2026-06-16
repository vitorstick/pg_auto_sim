import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import type { SimulationPoint } from '../types/simulator';

interface MainChartProps {
  data: SimulationPoint[];
}

export default function MainChart({ data }: MainChartProps) {
  // Format Y Axis values to read like 100k, 500k, or standard localized numbers
  const formatYAxis = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(0)}k`;
    }
    return value.toString();
  };

  // Get the threshold value from the first point to display as a reference line
  const thresholdVal = data.length > 0 ? data[0].threshold : 0;

  return (
    <div className="bg-[#121824] p-5 rounded-xl border border-slate-800/80 space-y-4 text-left">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Live Autovacuum Simulation (24-Hour Period)
        </h2>
        <div className="flex items-center space-x-4 text-[10px] font-medium text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-0.5 bg-orange-500 inline-block"></span>
            <span>Current Dead Tuples</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-0.5 border-t border-dashed border-rose-500 inline-block"></span>
            <span>Trigger Threshold</span>
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="timeHours"
              stroke="#475569"
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) => `${Math.round(tick)}h`}
              type="number"
              domain={[0, 24]}
              ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]}
              style={{ fontSize: 10, fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#475569"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              style={{ fontSize: 10, fontFamily: 'monospace' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0d131f', borderColor: '#1e293b', color: '#cbd5e1', borderRadius: '8px' }}
              labelFormatter={(label) => `Time: ${parseFloat(Number(label).toFixed(2))} Hours`}
              formatter={(value: any, name: any) => {
                if (name === 'deadTuples') return [Number(value).toLocaleString(), 'Dead Tuples'];
                if (name === 'threshold') return [Number(value).toLocaleString(), 'Trigger Threshold'];
                return [value, name];
              }}
            />
            <ReferenceLine
              y={thresholdVal}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: '',
                fill: '#ef4444',
                fontSize: 10,
                position: 'top',
              }}
            />
            <Line
              type="monotone"
              dataKey="deadTuples"
              stroke="#f97316"
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              name="deadTuples"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


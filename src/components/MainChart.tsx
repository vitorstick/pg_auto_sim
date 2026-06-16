import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { SimulationState } from '../types/simulator';

interface MainChartProps {
  data: SimulationState[];
}

export default function MainChart({ data }: MainChartProps) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4 text-left">
      <h2 className="text-lg font-semibold text-white">Simulation Over Time</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="activeConnections"
              stroke="#6366f1"
              activeDot={{ r: 8 }}
              name="Active Connections"
            />
            <Line
              type="monotone"
              dataKey="cpuUtilization"
              stroke="#10b981"
              name="CPU Utilization (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

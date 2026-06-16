import { useState, useMemo } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import MainChart from './components/MainChart';
import MetricsDisplay from './components/MetricsDisplay';
import VerdictBox from './components/VerdictBox';
import type { InputConfig } from './types/simulator';
import { runSimulation } from './utils/engine';

const DEFAULT_CONFIG: InputConfig = {
  connectionPoolSize: 50,
  maxConnections: 100,
};

function App() {
  const [config, setConfig] = useState<InputConfig>(DEFAULT_CONFIG);

  const simulationData = useMemo(() => {
    return runSimulation(config);
  }, [config]);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Configuration URL copied to clipboard!'))
      .catch(() => alert('Failed to copy URL.'));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-8 text-slate-100">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-lg shadow-2xl border border-slate-800">
        <Header onReset={handleReset} onShare={handleShare} />
        
        <div className="p-6 space-y-6">
          <InputPanel config={config} onChange={setConfig} />
          
          <MetricsDisplay data={simulationData} />
          
          <MainChart data={simulationData} />
          
          <VerdictBox config={config} data={simulationData} />
        </div>
      </div>
    </div>
  );
}

export default App;

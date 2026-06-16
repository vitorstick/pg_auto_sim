import { useState, useMemo, useEffect } from 'react';
import Header from './Header';
import InputPanel from './InputPanel';
import MainChart from './MainChart';
import MetricsDisplay from './MetricsDisplay';
import VerdictBox from './VerdictBox';
import type { InputConfig } from '../types/simulator';
import { runSimulation } from '../utils/engine';

const DEFAULT_CONFIG: InputConfig = {
  totalRows: 10000000,
  initialDead: 500000,
  writeRate: 500,
  vacuumThreshold: 50,
  vacuumScale: 0.10,
  analyzeScale: 0.05,
  costLimit: 200,
  costDelay: '20ms',
  maxWorkers: 3,
  naptime: '1min',
  maintenanceMem: '64MB',
};

export default function AutovacuumDashboard() {
  const [config, setConfig] = useState<InputConfig>(DEFAULT_CONFIG);

  // Load configuration from hash if present on mount
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#config=')) {
        try {
          const serialized = hash.substring(8); // remove '#config='
          const parsed = JSON.parse(atob(serialized));
          // Ensure it matches our expected keys
          if (parsed && typeof parsed.totalRows === 'number' && typeof parsed.vacuumThreshold === 'number') {
            setConfig(parsed);
          }
        } catch (e) {
          console.error('Failed to parse shared configuration from URL', e);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const simulationResult = useMemo(() => {
    return runSimulation(config);
  }, [config]);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    // Clear URL hash
    window.location.hash = '';
  };

  const handleShare = () => {
    try {
      const serialized = btoa(JSON.stringify(config));
      const url = `${window.location.origin}${window.location.pathname}#config=${serialized}`;
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('Configuration share link copied to clipboard!');
        })
        .catch(() => {
          alert(`Failed to copy URL automatically. Here is the link:\n\n${url}`);
        });
    } catch (e) {
      alert('Failed to generate sharing link.');
    }
  };

  const handleSimulate = () => {
    // Run simulation is already reactive to state, but we can display a brief alert or toast
    // to give visual confirmation of recalculation.
    const button = document.querySelector('button[type="button"]:last-of-type');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = 'Simulating...';
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d131f] text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-[#111722] rounded-2xl shadow-2xl border border-slate-800/60 overflow-hidden flex flex-col">
        <Header onReset={handleReset} onShare={handleShare} />

        <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel - Inputs (4/12 width on lg) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <InputPanel 
              config={config} 
              onChange={setConfig} 
              onSimulate={handleSimulate} 
            />
          </div>

          {/* Right Panel - Outputs (8/12 width on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
            <MainChart data={simulationResult.points} />

            <MetricsDisplay result={simulationResult} />

            <VerdictBox result={simulationResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

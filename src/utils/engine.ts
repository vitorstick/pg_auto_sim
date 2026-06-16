import type { InputConfig, SimulationState } from '../types/simulator';

export function runSimulation(config: InputConfig): SimulationState[] {
  // Pure math simulation loop stub
  return [
    { timestamp: '0s', activeConnections: config.connectionPoolSize, cpuUtilization: 10 },
    { timestamp: '5s', activeConnections: config.connectionPoolSize * 1.2, cpuUtilization: 25 },
    { timestamp: '10s', activeConnections: config.connectionPoolSize * 1.5, cpuUtilization: 45 },
  ];
}

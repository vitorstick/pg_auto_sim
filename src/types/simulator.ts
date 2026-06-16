export interface InputConfig {
  connectionPoolSize: number;
  maxConnections: number;
}

export interface SimulationState {
  timestamp: string;
  activeConnections: number;
  cpuUtilization: number;
}

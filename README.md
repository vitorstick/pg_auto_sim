# PG_AUTO_SIM 🐘 📉

An interactive, frontend-only simulation engine designed to demystify PostgreSQL's cost-based autovacuum and auto-analyze operations. 

Adjust workload patterns and internal engine parameters in real time to visualize data bloat cycles, estimated disk I/O impact, and worker behaviors without spinning up a live database.

**No database required. Runs entirely in your browser.**

---

## 🧐 Why This Matters

Configuring PostgreSQL's autovacuum is historically seen as a "black box" for many software developers and DBAs. Suboptimal configurations can lead to massive table bloat or sudden disk I/O performance degradation. 

**PG_AUTO_SIM** accurately brings the internal token-bucket algorithms of PostgreSQL (specifically from `src/backend/postmaster/autovacuum.c`) directly to your web browser. 

---

## ✨ Features

* **Real-Time Simulation Engine:** Runs pure in-memory mathematical calculations using native TypeScript hooks. Every variation instantly updates your data structures.
* **Zero Sliders/Ranges UI:** Built with precise numerical fields for deterministic configuration tuning.
* **Visual 24-Hour Timeline:** Plots live `Dead Tuples` accumulation and cleanup thresholds using responsive charts (`Recharts`).
* **I/O Throughput Predictor:** Automatically estimates real physical disk interactions (MB/s) using weighted averages for page hits, misses, and dirty state flushes.
* **Dynamic Diagnostic Verdicts:** Uses algorithmic rule evaluation to categorize your system health instantly (Healthy, Inefficient, or Out of Control Bloat).
* **Shareable Configurations:** Export and share your simulator settings via URL hash encoding.

---

## 🛠️ Built With

* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **Icons:** Lucide React

---

## 📦 Getting Started

Since this is a client-side-only app, you do not need docker, a local database, or a backend environment to run it.

### Prerequisites

* Node.js (v20.x or higher)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/postgresql-helper.git
   cd postgresql-helper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory.

---

## 🚀 How to Use

### Basic Workflow

1. **Adjust Parameters:** Use the input panel on the left to configure your PostgreSQL table and autovacuum settings.
2. **View Results:** The main chart displays a 24-hour simulation with dead tuple accumulation and cleanup cycles.
3. **Monitor Metrics:** Metrics panel shows average vacuum duration, frequency, I/O impact, and overall system health.
4. **Check Verdict:** The verdict box provides algorithmic health assessment (Healthy, Inefficient, or Unhealthy).

### Configuration Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| **Table Configuration** |
| `Total Rows` | Total number of rows in the table | 10,000,000 | 5,000,000 |
| `Initial Dead Tuples` | Starting dead tuple count | 500,000 | 100,000 |
| `Write Rate (tuples/sec)` | Workload: updates/deletes per second | 500 | 1000 |
| **Autovacuum Thresholds** |
| `Vacuum Threshold` | Base threshold for vacuum trigger | 50 | 100 |
| `Vacuum Scale Factor` | Multiplier: threshold = base + (scale × total_rows) | 0.10 | 0.20 |
| `Analyze Scale Factor` | Scale factor for analyze operations | 0.05 | 0.10 |
| **Cost Control** |
| `Cost Limit (pages)` | Max pages to scan per naptime interval | 200 | 500 |
| `Cost Delay (ms)` | Delay between pages in vacuum scan | 20ms | 10ms |
| **Worker Management** |
| `Max Workers` | Maximum parallel autovacuum workers | 3 | 5 |
| `Naptime (interval)` | How often autovacuum checks for work | 1min | 30s |
| `Maintenance Work Mem (MB)` | Memory allocated for vacuum operations | 64MB | 256MB |

### Understanding the Output

- **Dead Tuples Chart:** Shows accumulation over 24 hours and when vacuums trigger and complete.
- **Vacuum Frequency:** How often vacuums run in your 24-hour window.
- **Avg Duration:** Average time each vacuum operation takes.
- **I/O Impact:** Estimated disk I/O in MB/s during vacuum operations.
- **Vacuum Count:** Total number of vacuum cycles in 24 hours.

---

## 🔄 How the Simulator Works

### Algorithm Overview

The simulator models PostgreSQL's autovacuum engine:

1. **Dead Tuple Accumulation:** Based on write rate (updates/deletes), dead tuples accumulate over time.
2. **Threshold Detection:** Vacuum triggers when: `dead_tuples > vacuum_threshold + (vacuum_scale_factor × total_rows)`
3. **Vacuum Execution:** Calculated using cost-based parameters (`cost_limit`, `cost_delay`) to estimate scan time.
4. **I/O Estimation:** Disk I/O is estimated using: `(cost_limit / cost_delay) × 0.12 MB/s`
5. **Health Verdict:** System evaluated based on bloat levels, vacuum frequency, and I/O impact.

### Mathematical Model

- **Table Size:** Estimated from row count (assuming ~150 bytes per row, 8KB pages)
- **Scan Capacity:** Based on `maintenance_work_mem` and cost parameters
- **Frequency:** Determined by write rate and threshold configuration

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AutovacuumDashboard.tsx    # Main layout and state management
│   ├── Header.tsx                  # Application header
│   ├── InputPanel.tsx              # Configuration input fields
│   ├── MainChart.tsx               # 24-hour timeline visualization
│   ├── MetricsDisplay.tsx          # Key metrics display
│   └── VerdictBox.tsx              # Health verdict output
├── types/
│   └── simulator.ts                # TypeScript interfaces
├── utils/
│   └── engine.ts                   # Simulation logic
├── App.tsx                         # Main App component
├── main.tsx                        # React entry point
└── index.css                       # Global styles
```

---

## 🔗 Share Your Configuration

The simulator supports **URL-based configuration sharing**:

1. Configure your parameters in the app
2. The URL hash automatically encodes your configuration (base64-encoded JSON)
3. Share the URL with others to replicate your setup

**Example URL:**
```
http://localhost:5173/#config=eyJ0b3RhbFJvd3MiOjEwMDAwMDAwLCJ2YWN1dW1UaHJlc2hvbGQiOjEwMH0=
```

---

## 🐛 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (TypeScript + Vite)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Code Standards

- **TypeScript:** Strict mode enabled
- **Linting:** ESLint with React hooks plugin
- **Styling:** Tailwind CSS with PostCSS

---

## 📚 Related Documentation

- [PostgreSQL Autovacuum Documentation](https://www.postgresql.org/docs/current/routine-vacuuming.html)
- [PostgreSQL autovacuum.c Source](https://github.com/postgres/postgres/blob/master/src/backend/postmaster/autovacuum.c)
- [Tuning autovacuum Parameters](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html)

---

## 📝 License

This project is open source. See LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the simulator's accuracy or user experience.

---

## 📞 Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **Icons:** Lucide React

---

## 📦 Getting Started

Since this is a client-side-only app, you do not need docker, a local database, or a backend environment to run it.

### Prerequisites
* Node.js (v20.x or higher)
* npm or yarn

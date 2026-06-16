# PG_AUTO_SIM 🐘 📉

An interactive, frontend-only simulation engine designed to demystify PostgreSQL's cost-based autovacuum and auto-analyze operations. 

Adjust workload patterns and internal engine parameters in real time to visualize data bloat cycles, estimated disk I/O impact, and worker behaviors without spinning up a live database.

## 🚀 Live Demo
👉 **[Insert Your Vercel/Netlify/GitHub Pages URL Here]**

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

---

## 🛠️ Built With

* **Framework:** React 18 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (Slate/Dark DB Aesthetic)
* **Charts:** Recharts
* **Icons:** Lucide React

---

## 📦 Getting Started

Since this is a client-side-only app, you do not need docker, a local database, or a backend environment to run it.

### Prerequisites
* Node.js (v18.x or higher)
* npm or yarn

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/pg-vacuum-simulator.git](https://github.com/your-username/pg-vacuum-simulator.git)
   cd pg-vacuum-simulator
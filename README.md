# Maternal & Child Health Risk Monitoring System

A responsive, healthcare web application for monitoring maternal health (first pregnancy check-up through childbirth) and fetal/child health (womb through early childhood).

## 🌟 Key Features

- **Dual Portals**: 
  - **Patient Portal (Read-Only)**: Vitals averages, longitudinal charts, individual check-ups, risk screening gauges, WHO pediatric growth curves, 4D memory video scans.
  - **Hospital Staff Portal (Full CRUD)**: Search patient registry, edit records across visits, add new check-ups, upload universal diagnostic files, upload 4D ultrasound scans, manage status lifecycle, and review immutable version audit trails.
- **4D Ultrasound Fetal Memory Engine**:
  - Interactive Canvas 4D simulation with organic breathing/limb motion, floating amniotic fluid particles, Doppler audio synthesis, and HUD telemetry.
  - Supports real video file playback when uploaded.
- **Algorithmic Risk Screening**:
  - Multi-factor risk calculation for maternal & pediatric parameters with explicit clinical screening disclaimers.
- **Pre-Loaded Demo Data**:
  - 3 mothers (Ananya Sharma, Priya Mehta - High Risk GDM, Fatima Khan - Full Term)
  - 3 children (Baby Sharma, Zara Khan, Arjun Mehta - 2.5 yr toddler with full vaccination records)

## 🚀 Running the App

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Demo Credentials:
- **Patient**: `ananya` / `demo123` (or click **Demo Patient**)
- **Hospital Staff**: `drsinha` / `demo123` (or click **Demo Hospital Staff**)

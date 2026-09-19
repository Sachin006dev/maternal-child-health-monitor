import { useMemo, useState } from 'react';

const stats = [
  { label: 'Active Patients', value: '1,248' },
  { label: 'Risk Flags', value: '87' },
  { label: 'Check-ups', value: '3,410' },
  { label: 'Avg. Follow-up', value: '14d' },
];

const portalCards = [
  { title: 'Patient Portal', text: 'Read-only vitals, longitudinal charts, growth monitoring, and maternal risk screening.' },
  { title: 'Hospital Staff Portal', text: 'Manage the registry, edit visit records, review audit trails, and track operational status.' },
  { title: '4D Fetal Memory', text: 'Access stored scans, movement summaries, and nursing review notes from one secure dashboard.' },
];

const demoAccounts = [
  {
    username: 'ananya',
    password: 'demo123',
    role: 'patient',
    name: 'Ananya Sharma',
    patientId: 'M-2048',
    riskLevel: 'Moderate Risk',
    riskPercent: 72,
    age: '28 yrs',
    gestation: '32 weeks',
  },
  {
    username: 'drsinha',
    password: 'demo123',
    role: 'staff',
    name: 'Dr. Neha Sinha',
    dept: 'Maternal-Fetal Medicine',
  },
];

const patientMetrics = [
  { label: 'Blood Pressure', value: '118/76 mmHg' },
  { label: 'Heart Rate', value: '82 bpm' },
  { label: 'Temperature', value: '98.6°F' },
  { label: 'Blood Sugar', value: '96 mg/dL' },
  { label: 'Weight Gain', value: '+8.4 kg' },
  { label: 'Hydration', value: 'Normal' },
];

const checkups = [
  { date: '12 Apr 2026', type: 'Routine check-up', note: 'Fetal growth normal; minor fatigue reported; hydration plan revised.' },
  { date: '29 Mar 2026', type: 'Ultrasound review', note: 'Placental position confirmed; monitor mild trend variation in amniotic fluid.' },
  { date: '14 Mar 2026', type: 'Nutrition counselling', note: 'Iron supplementation adjusted for anemia risk and improved rest schedule.' },
];

const growthData = [58, 63, 67, 79, 84, 91, 96];
const growthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const staffPatients = [
  { name: 'Ananya Sharma', status: 'Monitoring', visits: 7, risk: 'Moderate' },
  { name: 'Priya Mehta', status: 'High Risk', visits: 9, risk: 'High' },
  { name: 'Fatima Khan', status: 'Full Term', visits: 5, risk: 'Low' },
  { name: 'Baby Sharma', status: 'Vaccinated', visits: 4, risk: 'Low' },
];

const riskFilters = ['All', 'Low', 'Moderate', 'High'];

const activityLogs = [
  { time: '08:40', text: 'BP screening completed for Ananya Sharma', type: 'monitor' },
  { time: '09:15', text: 'Ultrasound archive synced to fetal memory vault', type: 'scan' },
  { time: '11:05', text: 'Risk flag reviewed by Dr. Neha Sinha', type: 'alert' },
  { time: '13:30', text: 'Nutrition plan updated for Priya Mehta', type: 'care' },
  { time: '15:10', text: 'Immunization form validated for Baby Sharma', type: 'record' },
];

const patientTimeline = [
  { label: 'Admission', value: '14 Mar 2026' },
  { label: 'First review', value: '15 Mar 2026' },
  { label: 'Ultrasound', value: '21 Mar 2026' },
  { label: 'Follow-up', value: '12 Apr 2026' },
];

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [scanMode, setScanMode] = useState('live');

  const filteredPatients = useMemo(() => {
    return staffPatients.filter((patient) => {
      const matchesText =
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.status.toLowerCase().includes(query.toLowerCase()) ||
        patient.risk.toLowerCase().includes(query.toLowerCase());

      const matchesRisk = riskFilter === 'All' || patient.risk === riskFilter;
      return matchesText && matchesRisk;
    });
  }, [query, riskFilter]);

  const handleLogin = (event) => {
    event.preventDefault();
    const match = demoAccounts.find(
      (account) =>
        account.username.toLowerCase() === form.username.trim().toLowerCase() &&
        account.password === form.password
    );

    if (!match) {
      setError('Invalid demo credentials. Try ananya / demo123 or drsinha / demo123.');
      return;
    }

    setUser(match);
    setError('');
  };

  const quickLogin = (username, password) => {
    const match = demoAccounts.find(
      (account) => account.username === username && account.password === password
    );
    if (match) {
      setForm({ username, password });
      setUser(match);
      setError('');
    }
  };

  const logout = () => {
    setUser(null);
    setForm({ username: '', password: '' });
    setError('');
  };

  return (
    <div className="app-shell light-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">+</div>
          <div>
            <p className="eyebrow">Maternal & Child Health</p>
            <h1>CareConnect</h1>
          </div>
        </div>

        {user ? (
          <div className="topbar-actions">
            <span className="user-chip">{user.role === 'patient' ? 'Patient View' : 'Clinical View'}</span>
            <button className="secondary-button" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="topbar-actions">
            <button className="ghost-button">About</button>
            <button className="primary-button" onClick={() => quickLogin('ananya', 'demo123')}>Demo Patient</button>
          </div>
        )}
      </header>

      {!user ? (
        <main className="landing-layout">
          <section className="hero-card">
            <div className="hero-header-row">
              <span className="status-pill success">Live care coordination</span>
              <span className="tiny-label">HIPAA demo</span>
            </div>

            <h2>Monitoring pregnancy, newborn, and child health from one secure dashboard.</h2>
            <p>
              A responsive hospital workflow for maternal assessment, fetal monitoring, pediatric growth
              tracking, and timely risk analysis across the full care journey.
            </p>

            <div className="cta-row">
              <button className="primary-button" onClick={() => quickLogin('ananya', 'demo123')}>Patient Portal</button>
              <button className="secondary-button" onClick={() => quickLogin('drsinha', 'demo123')}>Hospital Staff</button>
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className="login-panel">
            <div className="panel-heading">
              <h3>Secure access</h3>
              <span className="status-pill neutral">Demo mode</span>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <label>
                Username
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => setForm({ ...form, username: event.target.value })}
                  placeholder="Enter username"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="Enter password"
                />
              </label>

              {error ? <p className="error-text">{error}</p> : null}
              <button type="submit" className="primary-button full-width">Login</button>
            </form>

            <div className="demo-credentials">
              <p><strong>Patient:</strong> ananya / demo123</p>
              <p><strong>Staff:</strong> drsinha / demo123</p>
            </div>
          </aside>
        </main>
      ) : (
        <main className="portal-view">
          {user.role === 'patient' ? (
            <>
              <section className="patient-header">
                <div>
                  <p className="eyebrow">Patient dashboard</p>
                  <h2>Welcome back, {user.name}</h2>
                </div>
                <div className="header-actions">
                  <span className="risk-badge">{user.riskLevel}</span>
                  <button className="secondary-button small">Share report</button>
                </div>
              </section>

              <div className="dashboard-grid">
                <section className="panel panel-lg">
                  <div className="panel-header">
                    <h3>Vitals overview</h3>
                    <span className="status-pill neutral">Updated today</span>
                  </div>

                  <div className="metrics-grid">
                    {patientMetrics.map((metric) => (
                      <div key={metric.label} className="metric-box">
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-header">
                    <h3>Risk score</h3>
                  </div>
                  <div className="gauge-wrap">
                    <div
                      className="gauge"
                      style={{
                        background: `conic-gradient(#62c6ff 0 ${user.riskPercent}%, rgba(128, 152, 177, 0.12) ${user.riskPercent}% 100%)`,
                      }}
                    >
                      <strong>{user.riskPercent}%</strong>
                      <span>Risk index</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="dashboard-grid three-grid">
                <section className="panel">
                  <div className="panel-header">
                    <h3>Growth trend</h3>
                  </div>
                  <div className="line-chart" aria-label="Growth chart">
                    <svg viewBox="0 0 360 180" preserveAspectRatio="none" className="line-graph">
                      <defs>
                        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="rgba(95, 177, 255, 0.45)" />
                          <stop offset="100%" stopColor="rgba(95, 177, 255, 0.03)" />
                        </linearGradient>
                      </defs>

                      {[0, 25, 50, 75, 100].map((tick) => (
                        <line
                          key={tick}
                          x1="0"
                          x2="360"
                          y1={20 + (100 - tick) * 1.2}
                          y2={20 + (100 - tick) * 1.2}
                          stroke="rgba(102, 145, 187, 0.18)"
                          strokeDasharray="4 6"
                        />
                      ))}

                      {growthData.map((value, index) => {
                        const x = (index / (growthData.length - 1)) * 320 + 20;
                        const y = 150 - (value / 100) * 110;
                        return (
                          <g key={`${value}-${index}`}>
                            <circle cx={x} cy={y} r="4.5" className="chart-dot" />
                          </g>
                        );
                      })}

                      <path
                        d={growthData
                          .map((value, index) => {
                            const x = (index / (growthData.length - 1)) * 320 + 20;
                            const y = 150 - (value / 100) * 110;
                            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                          })
                          .join(' ')}
                        className="chart-line"
                      />

                      <path
                        d={
                          `${growthData
                            .map((value, index) => {
                              const x = (index / (growthData.length - 1)) * 320 + 20;
                              const y = 150 - (value / 100) * 110;
                              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                            })
                            .join(' ')} L 340 150 L 20 150 Z`
                        }
                        fill="url(#chartFill)"
                        opacity="0.9"
                      />
                    </svg>

                    <div className="chart-labels">
                      {growthLabels.map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-header">
                    <h3>Care timeline</h3>
                  </div>
                  <div className="timeline-row">
                    {patientTimeline.map((item) => (
                      <div key={item.label} className="time-pill">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-header">
                    <h3>Recent notes</h3>
                  </div>
                  <ul className="timeline-list">
                    {checkups.map((visit) => (
                      <li key={visit.date}>
                        <strong>{visit.date}</strong>
                        <span>{visit.type}</span>
                        <p>{visit.note}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="panel scan-panel">
                <div className="panel-header">
                  <h3>Fetal memory scan</h3>
                  <div className="mode-toggle-group">
                    {['live', 'outline', 'mono', 'echo'].map((mode) => (
                      <button
                        key={mode}
                        className={`mode-toggle ${scanMode === mode ? 'active' : ''}`}
                        onClick={() => setScanMode(mode)}
                        type="button"
                      >
                        {mode === 'live' ? 'Live' : mode === 'outline' ? 'Outline' : mode === 'mono' ? 'Mono' : 'Echo'}
                      </button>
                    ))}
                    <button className="secondary-button small">Upload scan</button>
                  </div>
                </div>

                <div className={`scan-viewer fetal-video mode-${scanMode}`} aria-label="Fetal monitor screen">
                  <div className="scan-overlay" />
                  <div className="scan-rings" />
                  <div className="hud-readout">
                    <span>HR 145 bpm</span>
                    <span>GA 32 w</span>
                    <span>Vitals stable</span>
                  </div>
                  <div className="scan-beam" />
                  <div className="scan-pulse" />
                  <div className="fetal-figure">
                    <div className="fetal-head" />
                    <div className="fetal-torso" />
                    <div className="fetal-arm arm-left" />
                    <div className="fetal-arm arm-right" />
                    <div className="fetal-leg leg-left" />
                    <div className="fetal-leg leg-right" />
                    <div className="fetal-cord" />
                    <div className="fetal-face">
                      <span className="eye eye-left" />
                      <span className="eye eye-right" />
                      <span className="mouth" />
                    </div>
                  </div>
                  <div className="scan-grid" />
                  <div className="heartbeat-line" />
                  <span className="bubble bubble-1" />
                  <span className="bubble bubble-2" />
                  <span className="bubble bubble-3" />
                  <span className="bubble bubble-4" />
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="patient-header">
                <div>
                  <p className="eyebrow">Hospital staff portal</p>
                  <h2>Clinical operations overview</h2>
                </div>
                <div className="header-actions">
                  <button className="secondary-button small">Add patient</button>
                  <button className="primary-button small">Export report</button>
                </div>
              </section>

              <div className="dashboard-grid two-grid">
                <section className="panel staff-panel">
                  <div className="panel-header">
                    <h3>Patient registry</h3>
                    <div className="registry-controls">
                      <select
                        value={riskFilter}
                        onChange={(event) => setRiskFilter(event.target.value)}
                        className="risk-filter"
                        aria-label="Filter patients by risk level"
                      >
                        {riskFilters.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search patients"
                        className="search-input"
                      />
                    </div>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Status</th>
                        <th>Visits</th>
                        <th>Risk</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr key={patient.name}>
                          <td>{patient.name}</td>
                          <td>
                            <span className={`status-tag ${patient.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {patient.status}
                            </span>
                          </td>
                          <td>{patient.visits}</td>
                          <td>{patient.risk}</td>
                          <td>
                            <button className="secondary-button small">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <section className="panel">
                  <div className="panel-header">
                    <h3>System logs</h3>
                    <span className="status-pill neutral">Updated 2m ago</span>
                  </div>

                  <ul className="log-list">
                    {activityLogs.map((log) => (
                      <li key={`${log.time}-${log.text}`} className={`log-item ${log.type}`}>
                        <span className="log-time">{log.time}</span>
                        <p>{log.text}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="panel scan-panel">
                <div className="panel-header">
                  <h3>Diagnostic archive</h3>
                  <button className="secondary-button small">Upload files</button>
                </div>

                <div className="scan-viewer archive-viewer" aria-label="Diagnostic archive">
                  <div className="scan-overlay archive-overlay" />
                  <div className="archive-card">
                    <div className="archive-badge">Routine scan</div>
                    <h4>Fetal head circumference</h4>
                    <p>Saved 15 mins ago · 4D memory capture</p>
                  </div>
                  <div className="scan-grid" />
                  <div className="scan-beam archive-beam" />
                </div>
              </section>
            </>
          )}
        </main>
      )}

      <section className="feature-grid">
        {portalCards.map((card) => (
          <article key={card.title} className="feature-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;

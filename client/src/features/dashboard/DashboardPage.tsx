import MainLayout from "../../components/layout/MainLayout.tsx";
import "./Dashboard.css";

const DashboardPage = () => {
  const kpiCards = [
    { title: "Active Vehicles", value: "120", icon: "local_shipping", color: "#3b82f6", bg: "#eff6ff", trend: "+8%", positive: true },
    { title: "Available Vehicles", value: "96", icon: "check_circle", color: "#10b981", bg: "#ecfdf5", trend: "+3%", positive: true },
    { title: "In Maintenance", value: "12", icon: "build", color: "#f59e0b", bg: "#fffbeb", trend: "-2%", positive: false },
    { title: "Active Trips", value: "38", icon: "route", color: "#8b5cf6", bg: "#f5f3ff", trend: "+12%", positive: true },
    { title: "Pending Trips", value: "15", icon: "pending_actions", color: "#ef4444", bg: "#fef2f2", trend: "+5%", positive: false },
    { title: "Drivers On Duty", value: "81", icon: "person", color: "#06b6d4", bg: "#ecfeff", trend: "+4%", positive: true },
    { title: "Fleet Utilization", value: "80%", icon: "speed", color: "#f97316", bg: "#fff7ed", trend: "+2%", positive: true },
  ];

  const recentTrips = [
    { id: "TRP-001", driver: "David Harrison", route: "NY → LA", status: "In Progress", time: "10:42 AM" },
    { id: "TRP-002", driver: "Sarah Jenkins", route: "CH → MI", status: "Completed", time: "09:15 AM" },
    { id: "TRP-003", driver: "Elena Rodriguez", route: "LA → SF", status: "Pending", time: "08:30 AM" },
    { id: "TRP-004", driver: "Marcus Chen", route: "TX → NY", status: "In Progress", time: "08:00 AM" },
  ];

  const statusColors: Record<string, string> = {
    "In Progress": "status-badge in-progress",
    "Completed": "status-badge completed",
    "Pending": "status-badge pending",
  };

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1>Fleet Overview</h1>
            <p>Welcome back, Fleet Manager 👋 — Here's what's happening today.</p>
          </div>
          <div className="dashboard-header-actions">
            <button className="btn-outline">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>file_download</span>
              Export
            </button>
            <button className="btn-primary">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
              New Trip
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          {kpiCards.map((card) => (
            <div className="kpi-card" key={card.title} style={{ borderLeftColor: card.color }}>
              <div className="kpi-card-top">
                <div className="kpi-icon" style={{ background: card.bg, color: card.color }}>
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <span className={`kpi-trend ${card.positive ? "positive" : "negative"}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    {card.positive ? "trending_up" : "trending_down"}
                  </span>
                  {card.trend}
                </span>
              </div>
              <h3>{card.title}</h3>
              <p className="kpi-value" style={{ color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bottom-grid">
          <div className="recent-trips-panel">
            <div className="panel-header">
              <h3>
                <span className="material-symbols-outlined text-blue-500" style={{ color: "#3b82f6" }}>route</span>
                Recent Trips
              </h3>
              <a href="#" className="view-all-link">View All →</a>
            </div>
            <div className="trips-list">
              <table>
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Driver</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td><strong>{trip.id}</strong></td>
                      <td>{trip.driver}</td>
                      <td>{trip.route}</td>
                      <td><span className={statusColors[trip.status]}>{trip.status}</span></td>
                      <td style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{trip.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="activity-panel">
            <div className="panel-header">
              <h3>
                <span className="material-symbols-outlined" style={{ color: "#8b5cf6" }}>notifications</span>
                Activity Feed
              </h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#3b82f6" }}></div>
                <div>
                  <p className="activity-text"><strong>David Harrison</strong> started trip #NY-LA-402</p>
                  <span className="activity-time">10:42 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#10b981" }}></div>
                <div>
                  <p className="activity-text"><strong>Sarah Jenkins</strong> completed route #CH-MI-991</p>
                  <span className="activity-time">09:15 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#f59e0b" }}></div>
                <div>
                  <p className="activity-text">Vehicle <strong>VT-1102-S</strong> entered maintenance</p>
                  <span className="activity-time">08:50 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#6b7280" }}></div>
                <div>
                  <p className="activity-text">System: <strong>42 drivers</strong> checked-in for shift</p>
                  <span className="activity-time">08:00 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#ef4444" }}></div>
                <div>
                  <p className="activity-text"><strong>Elena Rodriguez's</strong> license expires in 12 days</p>
                  <span className="activity-time">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;

import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../../services/api';
import MainLayout from "../../components/layout/MainLayout.tsx";
import "./Dashboard.css";

const statusColors: Record<string, string> = {
  "Dispatched": "status-badge in-progress",
  "Completed": "status-badge completed",
  "Draft": "status-badge pending",
  "In Progress": "status-badge in-progress",
};

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

const DashboardPage = () => {
  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ['kpis'],
    queryFn: async () => {
      const res = await api.get('/reports/kpis');
      return res.data;
    },
    refetchInterval: 30000,
  });

  const { data: trips } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const res = await api.get('/trips');
      return res.data;
    },
  });

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data;
    },
  });

  const recentTrips = (trips || [])
    .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const vehicleStatusData = (() => {
    const counts: Record<string, number> = {};
    (vehicles || []).forEach((v: any) => {
      counts[v.status] = (counts[v.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  const vehicleTypeData = (() => {
    const counts: Record<string, number> = {};
    (vehicles || []).forEach((v: any) => {
      counts[v.type] = (counts[v.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  const tripsByStatusData = (() => {
    const counts: Record<string, number> = {};
    (trips || []).forEach((t: any) => {
      counts[t.status] = (counts[t.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  const kpiCards = [
    { title: "Active Vehicles", value: kpiData?.activeVehicles ?? "...", icon: "local_shipping", color: "#3b82f6", bg: "#eff6ff", trend: "", positive: true },
    { title: "Available Vehicles", value: kpiData?.availableVehicles ?? "...", icon: "check_circle", color: "#10b981", bg: "#ecfdf5", trend: "", positive: true },
    { title: "In Maintenance", value: kpiData?.maintenanceVehicles ?? "...", icon: "build", color: "#f59e0b", bg: "#fffbeb", trend: "", positive: false },
    { title: "Active Trips", value: kpiData?.activeTrips ?? "...", icon: "route", color: "#8b5cf6", bg: "#f5f3ff", trend: "", positive: true },
    { title: "Pending Trips", value: kpiData?.pendingTrips ?? "...", icon: "pending_actions", color: "#ef4444", bg: "#fef2f2", trend: "", positive: false },
    { title: "Drivers On Duty", value: kpiData?.driversOnDuty ?? "...", icon: "person", color: "#06b6d4", bg: "#ecfeff", trend: "", positive: true },
    { title: "Fleet Utilization", value: kpiLoading ? "..." : `${kpiData?.fleetUtilizationPercentage ?? 0}%`, icon: "speed", color: "#f97316", bg: "#fff7ed", trend: "", positive: true },
  ];

  const activities = (trips || [])
    .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .map((trip: any) => {
      const time = new Date(trip.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dots: Record<string, string> = { 'Dispatched': '#3b82f6', 'Completed': '#10b981', 'Draft': '#f59e0b', 'Cancelled': '#ef4444' };
      return {
        dot: dots[trip.status] || '#6b7280',
        text: trip.status === 'Dispatched' ? `<strong>${trip.driver?.name || 'Driver'}</strong> dispatched on <strong>${trip.vehicleId}</strong> from ${trip.source} to ${trip.destination}` :
              trip.status === 'Completed' ? `<strong>${trip.driver?.name || 'Driver'}</strong> completed trip <strong>${trip.source} → ${trip.destination}</strong>` :
              trip.status === 'Draft' ? `Trip <strong>${trip.source} → ${trip.destination}</strong> created as Draft` :
              `<strong>${trip.driver?.name || 'Driver'}</strong> trip <strong>${trip.source} → ${trip.destination}</strong> cancelled`,
        time,
      };
    });

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1>Fleet Overview</h1>
            <p>Welcome back, Fleet Manager — Here's what's happening today.</p>
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
                {card.trend && (
                  <span className={`kpi-trend ${card.positive ? "positive" : "negative"}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      {card.positive ? "trending_up" : "trending_down"}
                    </span>
                    {card.trend}
                  </span>
                )}
              </div>
              <h3>{card.title}</h3>
              <p className="kpi-value" style={{ color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="chart-section">
          <div className="chart-card wide">
            <div className="chart-card-header">
              <h3>Vehicle Status Distribution</h3>
              <span className="chart-subtitle">Current fleet breakdown</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={vehicleStatusData} layout="vertical" margin={{ left: 50, right: 30, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fill: '#6b7280' }} width={100} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {vehicleStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
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
                    <th>Trip</th>
                    <th>Driver</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrips.map((trip: any) => (
                    <tr key={trip.id}>
                      <td><strong>{trip.id?.slice(0, 8)}</strong></td>
                      <td>{trip.driver?.name || '-'}</td>
                      <td>{trip.source} → {trip.destination}</td>
                      <td><span className={statusColors[trip.status] || 'status-badge pending'}>{trip.status}</span></td>
                      <td style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                        {new Date(trip.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                  {recentTrips.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No trips yet</td></tr>
                  )}
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
              {activities.map((act: any, i: number) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: act.dot }}></div>
                  <div>
                    <p className="activity-text" dangerouslySetInnerHTML={{ __html: act.text }} />
                    <span className="activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;

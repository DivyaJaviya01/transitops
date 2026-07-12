import MainLayout from "../../components/layout/MainLayout.tsx";
import KPICard from "./components/KPICard.tsx";
import RecentTrips from "./components/RecentTrips.tsx";
import ActivityPanel from "./components/ActivityPanel.tsx";
import "./Dashboard.css";

const DashboardPage = () => {
  const cards = [
    { title: "Active Vehicles", value: 120 },
    { title: "Available Vehicles", value: 96 },
    { title: "In Maintenance", value: 12 },
    { title: "Active Trips", value: 38 },
    { title: "Pending Trips", value: 15 },
    { title: "Drivers On Duty", value: 81 },
    { title: "Fleet Utilization", value: "80%" },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        <h1>Fleet Overview</h1>
        <p>Welcome back, Fleet Manager 👋</p>

        <div className="dashboard-grid">
          {cards.map((card) => (
            <KPICard
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <div className="bottom-grid">
          <RecentTrips />
          <ActivityPanel />
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
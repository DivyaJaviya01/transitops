import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import MainLayout from "../../components/layout/MainLayout";
import KPICard from "./components/KPICard";
import RecentTrips from "./components/RecentTrips";
import ActivityPanel from "./components/ActivityPanel";
import "./Dashboard.css";

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['kpis'],
    queryFn: async () => {
      const res = await api.get('/reports/kpis');
      return res.data;
    },
    refetchInterval: 10000 // Poll every 10 seconds for real-time monitoring
  });

  const cards = [
    { title: "Active Vehicles", value: isLoading ? '...' : data?.activeVehicles },
    { title: "Available Vehicles", value: isLoading ? '...' : data?.availableVehicles },
    { title: "In Maintenance", value: isLoading ? '...' : data?.maintenanceVehicles },
    { title: "Active Trips", value: isLoading ? '...' : data?.activeTrips },
    { title: "Pending Trips", value: isLoading ? '...' : data?.pendingTrips },
    { title: "Drivers On Duty", value: isLoading ? '...' : data?.driversOnDuty },
    { title: "Fleet Utilization", value: isLoading ? '...' : `${data?.fleetUtilizationPercentage}%` },
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
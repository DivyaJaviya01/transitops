import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../features/dashboard/DashboardPage';
import VehiclesPage from '../features/vehicles/VehiclesPage';
import DriversPage from '../features/drivers/DriversPage';
import TripsPage from '../features/trips/TripsPage';
import MaintenancePage from '../features/maintenance/MaintenancePage';
import ExpensesPage from '../features/expenses/ExpensesPage';
import ReportsPage from '../features/reports/ReportsPage';
import LoginPage from '../features/auth/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/expenses" element={<ExpensesPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;

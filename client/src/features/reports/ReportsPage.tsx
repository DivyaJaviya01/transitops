import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiDownload, FiFileText, FiActivity } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Vehicle {
  registrationNumber: string;
  name: string;
  type: string;
  odometer: number;
}

interface Analytics {
  registrationNumber: string;
  fuelEfficiencyKmPerLiter: number;
  totalDistanceTraveledKm: number;
  totalOperationalCost: number;
  estimatedRevenue: number;
  roiPercentage: number;
}

const ReportsPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Fetch vehicles
  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ['vehicles-report'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data;
    }
  });

  // Fetch analytics for selected vehicle
  const { data: analytics, isLoading: isAnalyticsLoading } = useQuery<Analytics>({
    queryKey: ['vehicle-analytics', selectedVehicle],
    queryFn: async () => {
      if (!selectedVehicle) return null;
      const res = await api.get(`/reports/analytics/${selectedVehicle}`);
      return res.data;
    },
    enabled: !!selectedVehicle
  });

  const handleExportCSV = () => {
    // Open CSV download link in new tab
    const token = localStorage.getItem('token');
    window.open(`http://localhost:5000/api/reports/export/csv?token=${token}`, '_blank');
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Reports & Analytics</h1>
            <p>Analyze vehicle efficiency, ROI metrics, and export reports</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="login-button"
            style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}
          >
            <FiDownload /> Export Fleet CSV
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
          {/* Vehicles List */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Fleet Assets</h3>
            {isLoading ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading fleet list...</p>
            ) : !vehicles || vehicles.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No vehicles registered yet.</p>
            ) : (
              <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="trips-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((v) => (
                        <tr
                          key={v.registrationNumber}
                          style={{
                            backgroundColor: selectedVehicle === v.registrationNumber ? 'var(--table-row-hover)' : 'transparent',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedVehicle(v.registrationNumber)}
                        >
                          <td style={{ fontWeight: 700 }}>{v.name} ({v.registrationNumber})</td>
                          <td>{v.type}</td>
                          <td>
                            <button
                              onClick={() => setSelectedVehicle(v.registrationNumber)}
                              className="status-badge in-progress"
                              style={{ border: 'none', cursor: 'pointer' }}
                            >
                              Analyze
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Analysis View */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Vehicle Telemetry & ROI</h3>
            {!selectedVehicle ? (
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '3rem',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}>
                <FiActivity size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
                <p>Select an asset from the left table to load financial and efficiency analytics.</p>
              </div>
            ) : isAnalyticsLoading ? (
              <p style={{ color: 'var(--text-secondary)' }}>Computing operational telemetry...</p>
            ) : analytics ? (
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '2rem'
              }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  {selectedVehicle} Analytics
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Fuel Efficiency</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 700 }}>
                      {analytics.fuelEfficiencyKmPerLiter} km / Liter
                    </p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Distance Traveled</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 700 }}>
                      {analytics.totalDistanceTraveledKm} km
                    </p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Operational Costs (Fuel & Shop)</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-danger)' }}>
                      -${analytics.totalOperationalCost.toLocaleString()}
                    </p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Estimated Revenue ($5.00/km)</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-success)' }}>
                      +${analytics.estimatedRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Asset Return on Investment (ROI)</p>
                    <p style={{
                      margin: '0.25rem 0 0 0', fontSize: '1.75rem', fontWeight: 800,
                      color: analytics.roiPercentage >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'
                    }}>
                      {analytics.roiPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;

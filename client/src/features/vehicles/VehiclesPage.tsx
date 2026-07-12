import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const VehiclesPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Vehicles</h1>
        <p>Manage and track fleet vehicles</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Vehicle Registry Table</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No vehicles found. Register a vehicle to begin.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehiclesPage;

import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const TripsPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Trips</h1>
        <p>Dispatch vehicles and track delivery routes</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Trip Dispatch Console</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No active trips. Click 'New Trip' to dispatch.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TripsPage;

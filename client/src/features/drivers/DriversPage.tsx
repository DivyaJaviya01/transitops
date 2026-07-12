import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const DriversPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Drivers</h1>
        <p>Manage fleet driver profiles and safety ratings</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Driver Directory</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No drivers found. Add a driver profile to begin.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default DriversPage;

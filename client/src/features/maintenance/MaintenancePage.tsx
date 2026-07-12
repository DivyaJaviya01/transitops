import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const MaintenancePage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Maintenance</h1>
        <p>Schedule service repairs and track vehicle downtime</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Maintenance Logs</h3>
          <p style={{ color: 'var(--text-secondary)' }}>All vehicles are healthy. No active maintenance logs.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default MaintenancePage;

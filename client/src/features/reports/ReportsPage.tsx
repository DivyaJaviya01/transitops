import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const ReportsPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Reports</h1>
        <p>Analyze fuel efficiency, ROI percentages, and export CSV data sheets</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Fleet Performance Reports</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Click 'Generate Report' or 'Export CSV' to request analytics reports.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;

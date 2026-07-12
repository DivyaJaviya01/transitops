import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const ExpensesPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1>Expenses</h1>
        <p>Log fuel costs and calculate fleet operational expense metrics</p>
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          <h3>Expense Ledger</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No expenses recorded for this month.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;

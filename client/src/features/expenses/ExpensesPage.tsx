import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FiPlus, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Vehicle {
  registrationNumber: string;
  name: string;
}

interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
  vehicleId: string;
  vehicle: Vehicle;
}

interface OperationalCost {
  vehicleId: string;
  fuelCost: number;
  expenseCost: number;
  totalOperationalCost: number;
}

const ExpensesPage = () => {
  const queryClient = useQueryClient();
  const [showFuelModal, setShowFuelModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedCostVehicle, setSelectedCostVehicle] = useState('');

  // Fuel log form
  const [fuelForm, setFuelForm] = useState({
    vehicleId: '',
    liters: '',
    cost: '',
    date: ''
  });

  // Generic expense form
  const [expenseForm, setExpenseForm] = useState({
    vehicleId: '',
    amount: '',
    category: 'Other',
    description: '',
    date: ''
  });

  // Fetch registered vehicles
  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ['vehicles-expense-options'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data;
    }
  });

  // Fetch logged expenses
  const { data: expenses, isLoading } = useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      const res = await api.get('/expenses');
      return res.data;
    }
  });

  // Fetch operational cost for a selected vehicle
  const { data: costData } = useQuery<OperationalCost>({
    queryKey: ['operational-cost', selectedCostVehicle],
    queryFn: async () => {
      if (!selectedCostVehicle) return null;
      const res = await api.get(`/expenses/cost/${selectedCostVehicle}`);
      return res.data;
    },
    enabled: !!selectedCostVehicle
  });

  const logFuelMutation = useMutation({
    mutationFn: async (payload: typeof fuelForm) => {
      return api.post('/expenses/fuel', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['operational-cost'] });
      toast.success('Fuel purchase log created successfully!');
      setShowFuelModal(false);
      setFuelForm({ vehicleId: '', liters: '', cost: '', date: '' });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to log fuel');
    }
  });

  const logExpenseMutation = useMutation({
    mutationFn: async (payload: typeof expenseForm) => {
      return api.post('/expenses/other', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['operational-cost'] });
      toast.success('Operational expense recorded successfully!');
      setShowExpenseModal(false);
      setExpenseForm({ vehicleId: '', amount: '', category: 'Other', description: '', date: '' });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to log expense');
    }
  });

  const handleFuelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fuelForm.vehicleId || !fuelForm.liters || !fuelForm.cost) {
      toast.error('All fields are required');
      return;
    }
    logFuelMutation.mutate(fuelForm);
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.vehicleId || !expenseForm.amount || !expenseForm.category) {
      toast.error('Required fields missing');
      return;
    }
    logExpenseMutation.mutate(expenseForm);
  };

  return (
    <MainLayout>
      <Toaster position="top-right" richColors />
      <div className="p-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Expenses</h1>
            <p>Log operational costs, fuel purchases, and compute vehicle total costs</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setShowFuelModal(true)}
              className="login-button"
              style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}
            >
              <FiPlus /> Log Fuel Purchase
            </button>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="login-button"
              style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              <FiPlus /> Record Expense
            </button>
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div style={{
          marginTop: '2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3>Operational Cost Calculator</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <select
              value={selectedCostVehicle}
              onChange={(e) => setSelectedCostVehicle(e.target.value)}
              style={{
                padding: '0.75rem 1rem', borderRadius: '8px',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)', outline: 'none'
              }}
            >
              <option value="">-- Select Vehicle to Inspect --</option>
              {vehicles?.map((v) => (
                <option key={v.registrationNumber} value={v.registrationNumber}>
                  {v.name} ({v.registrationNumber})
                </option>
              ))}
            </select>
          </div>
          {costData && (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)',
              paddingTop: '1.5rem'
            }}>
              <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Fuel Cost Sum</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>${costData.fuelCost.toLocaleString()}</p>
              </div>
              <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>General Expenses</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>${costData.expenseCost.toLocaleString()}</p>
              </div>
              <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Cost</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-brand)' }}>
                  ${costData.totalOperationalCost.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Log Fuel Modal */}
        {showFuelModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '450px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Log Fuel Purchase</h2>
              <form onSubmit={handleFuelSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Vehicle</label>
                    <select
                      value={fuelForm.vehicleId}
                      onChange={(e) => setFuelForm({ ...fuelForm, vehicleId: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="">-- Choose Vehicle --</option>
                      {vehicles?.map((v) => (
                        <option key={v.registrationNumber} value={v.registrationNumber}>
                          {v.name} ({v.registrationNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Liters Purchased"
                      value={fuelForm.liters}
                      onChange={(e) => setFuelForm({ ...fuelForm, liters: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Total Cost ($)"
                      value={fuelForm.cost}
                      onChange={(e) => setFuelForm({ ...fuelForm, cost: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="submit" className="login-button" style={{ marginTop: 0 }}>Log Purchase</button>
                  <button
                    type="button"
                    onClick={() => setShowFuelModal(false)}
                    className="login-button"
                    style={{
                      marginTop: 0, backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)', color: 'var(--text-secondary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Record Expense Modal */}
        {showExpenseModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '450px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Record Operational Expense</h2>
              <form onSubmit={handleExpenseSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Vehicle</label>
                    <select
                      value={expenseForm.vehicleId}
                      onChange={(e) => setExpenseForm({ ...expenseForm, vehicleId: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="">-- Choose Vehicle --</option>
                      {vehicles?.map((v) => (
                        <option key={v.registrationNumber} value={v.registrationNumber}>
                          {v.name} ({v.registrationNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Amount ($)"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Category</label>
                    <select
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="Permit">Permit / Tolls</option>
                      <option value="Insurance">Insurance Renewal</option>
                      <option value="Other">Other Miscellaneous</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Description / Reason"
                      value={expenseForm.description}
                      onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="submit" className="login-button" style={{ marginTop: 0 }}>Record Expense</button>
                  <button
                    type="button"
                    onClick={() => setShowExpenseModal(false)}
                    className="login-button"
                    style={{
                      marginTop: 0, backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)', color: 'var(--text-secondary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ledger list */}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Loading ledger...</p>
          ) : !expenses || expenses.length === 0 ? (
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              borderRadius: '8px', padding: '3rem', textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <FiDollarSign size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
              <p>No operational expenses logged. Add logs using the buttons above.</p>
            </div>
          ) : (
            <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="trips-list">
                <table>
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Expense Category</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Cost Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td style={{ fontWeight: 700 }}>{expense.vehicle.name} ({expense.vehicleId})</td>
                        <td>{expense.category}</td>
                        <td>{expense.description || '—'}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td style={{ fontWeight: 700, color: 'var(--accent-danger)' }}>
                          -${expense.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;

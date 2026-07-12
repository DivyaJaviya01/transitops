import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FiPlus, FiTool, FiCheck } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Vehicle {
  registrationNumber: string;
  name: string;
  status: string;
}

interface MaintenanceLog {
  id: string;
  type: string;
  cost: number;
  startDate: string;
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  status: string;
  vehicleId: string;
  vehicle: Vehicle;
}

const MaintenancePage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    vehicleId: '',
    type: 'Routine Oil Change',
    cost: '',
    startDate: '',
    estimatedCompletionDate: ''
  });

  const { data: logs, isLoading } = useQuery<MaintenanceLog[]>({
    queryKey: ['maintenance-logs'],
    queryFn: async () => {
      const res = await api.get('/maintenance');
      return res.data;
    }
  });

  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ['vehicles-maintenance-options'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data.filter((v: Vehicle) => v.status !== 'Retired');
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newLog: typeof form) => {
      return api.post('/maintenance', newLog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-logs'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-expense-options'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-report'] });
      toast.success('Vehicle placed in shop for maintenance successfully!');
      setShowModal(false);
      setForm({
        vehicleId: '',
        type: 'Routine Oil Change',
        cost: '',
        startDate: '',
        estimatedCompletionDate: ''
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Scheduling failed');
    }
  });

  const closeMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.patch(`/maintenance/${id}/close`, {
        actualCompletionDate: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-logs'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-expense-options'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-report'] });
      toast.success('Maintenance completed. Vehicle returned to Available status.');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to close log');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleId || !form.type || !form.cost || !form.startDate || !form.estimatedCompletionDate) {
      toast.error('Please fill in all fields');
      return;
    }
    createMutation.mutate(form);
  };

  return (
    <MainLayout>
      <Toaster position="top-right" richColors />
      <div className="p-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Maintenance</h1>
            <p>Schedule services and track active repair logs</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[var(--accent-brand)] text-white px-4 py-2.5 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:opacity-90 active:opacity-80 transition-all shadow-sm"
          >
            <FiPlus /> Schedule Service
          </button>
        </div>

        {/* Modal Dialog */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: '2.5rem',
              width: '100%', maxWidth: '500px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Schedule Vehicle Maintenance</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Vehicle</label>
                    <select
                      value={form.vehicleId}
                      onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--card-border)', backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="">-- Select Vehicle --</option>
                      {vehicles?.map((v) => (
                        <option key={v.registrationNumber} value={v.registrationNumber}>
                          {v.name} ({v.registrationNumber}) — {v.status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Service Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--card-border)', backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="Routine Oil Change">Routine Oil Change</option>
                      <option value="Tire Rotation/Replacement">Tire Rotation/Replacement</option>
                      <option value="Brake Pad Service">Brake Pad Service</option>
                      <option value="Engine Repair">Engine Repair</option>
                      <option value="Body work">Body work</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Estimated Cost ($)"
                      value={form.cost}
                      onChange={(e) => setForm({ ...form, cost: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Start Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Estimated Completion Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        value={form.estimatedCompletionDate}
                        onChange={(e) => setForm({ ...form, estimatedCompletionDate: e.target.value })}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="submit" className="login-button" style={{ marginTop: 0 }}>Schedule</button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="login-button"
                    style={{
                      marginTop: 0, backgroundColor: 'transparent',
                      border: '1px solid var(--card-border)', color: 'var(--text-secondary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Logs list */}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Loading logs...</p>
          ) : !logs || logs.length === 0 ? (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <FiTool size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
              <p>No maintenance logs. Click the button to schedule service.</p>
            </div>
          ) : (
            <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="trips-list">
                <table>
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Service Type</th>
                      <th>Cost</th>
                      <th>Start Date</th>
                      <th>Estimated End</th>
                      <th>Completion Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ fontWeight: 700 }}>{log.vehicle.name} ({log.vehicleId})</td>
                        <td>{log.type}</td>
                        <td>${log.cost.toLocaleString()}</td>
                        <td>{new Date(log.startDate).toLocaleDateString()}</td>
                        <td>{new Date(log.estimatedCompletionDate).toLocaleDateString()}</td>
                        <td>
                          {log.actualCompletionDate ? new Date(log.actualCompletionDate).toLocaleDateString() : '—'}
                        </td>
                        <td>
                          {log.status === 'Closed' ? (
                            <span className="status-badge completed">Closed</span>
                          ) : (
                            <span className="status-badge pending">Active</span>
                          )}
                        </td>
                        <td>
                          {log.status === 'Active' && (
                            <button
                              onClick={() => closeMutation.mutate(log.id)}
                              className="status-badge completed"
                              style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                              title="Complete Maintenance"
                            >
                              <FiCheck size={12} /> Close
                            </button>
                          )}
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

export default MaintenancePage;

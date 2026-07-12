import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FiPlus, FiNavigation, FiX, FiCheck, FiSend } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Vehicle {
  registrationNumber: string;
  name: string;
  status: string;
}

interface Driver {
  id: string;
  name: string;
  status: string;
}

interface Trip {
  id: string;
  source: string;
  destination: string;
  cargoWeight: number;
  plannedDistance: number;
  actualDistance?: number;
  fuelConsumed?: number;
  status: string;
  vehicleId: string;
  driverId: string;
  vehicle: Vehicle;
  driver: Driver;
}

const TripsPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Complete Trip form fields
  const [completeForm, setCompleteForm] = useState({
    actualDistance: '',
    fuelConsumed: ''
  });

  // Create Trip form fields
  const [form, setForm] = useState({
    source: '',
    destination: '',
    cargoWeight: '',
    plannedDistance: '',
    vehicleId: '',
    driverId: ''
  });

  // Fetch all trips
  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: async () => {
      const res = await api.get('/trips');
      return res.data;
    }
  });

  // Fetch available vehicles & drivers
  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ['available-vehicles'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data.filter((v: Vehicle) => v.status === 'Available');
    }
  });

  const { data: drivers } = useQuery<Driver[]>({
    queryKey: ['available-drivers'],
    queryFn: async () => {
      const res = await api.get('/drivers');
      return res.data.filter((d: Driver) => d.status === 'Available');
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newTrip: typeof form) => {
      return api.post('/trips', newTrip);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['available-drivers'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['recent-trips'] });
      toast.success('Trip created successfully in Draft!');
      setShowModal(false);
      setForm({
        source: '',
        destination: '',
        cargoWeight: '',
        plannedDistance: '',
        vehicleId: '',
        driverId: ''
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to create trip');
    }
  });

  const dispatchMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.patch(`/trips/${id}/dispatch`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['available-drivers'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['recent-trips'] });
      toast.success('Trip successfully dispatched!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Dispatch failed');
    }
  });

  const completeMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: typeof completeForm }) => {
      return api.patch(`/trips/${id}/complete`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['available-drivers'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['recent-trips'] });
      toast.success('Trip marked as completed!');
      setShowCompleteModal(false);
      setSelectedTripId(null);
      setCompleteForm({ actualDistance: '', fuelConsumed: '' });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Completion failed');
    }
  });

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.patch(`/trips/${id}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['available-drivers'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['recent-trips'] });
      toast.success('Trip has been cancelled.');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Cancellation failed');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source || !form.destination || !form.cargoWeight || !form.plannedDistance || !form.vehicleId || !form.driverId) {
      toast.error('Please fill in all fields');
      return;
    }
    createMutation.mutate(form);
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeForm.actualDistance || !completeForm.fuelConsumed) {
      toast.error('Odometer increment and fuel amount are required');
      return;
    }
    if (selectedTripId) {
      completeMutation.mutate({ id: selectedTripId, payload: completeForm });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      case 'dispatched':
        return <span className="status-badge in-progress">Dispatched</span>;
      case 'cancelled':
        return <span className="status-badge logout" style={{
          backgroundColor: 'rgba(248, 81, 73, 0.15)',
          color: 'var(--accent-danger)'
        }}>Cancelled</span>;
      default:
        return <span className="status-badge pending">Draft</span>;
    }
  };

  return (
    <MainLayout>
      <Toaster position="top-right" richColors />
      <div className="p-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Trips</h1>
            <p>Plan, dispatch, and track active deliveries</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[var(--accent-brand)] text-white px-4 py-2.5 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:opacity-90 active:opacity-80 transition-all shadow-sm"
          >
            <FiPlus /> New Trip
          </button>
        </div>

        {/* Create Modal */}
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
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Create New Trip</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Source Location"
                      value={form.source}
                      onChange={(e) => setForm({ ...form, source: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Destination Location"
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Cargo Weight (kg)"
                      value={form.cargoWeight}
                      onChange={(e) => setForm({ ...form, cargoWeight: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Planned Distance (km)"
                      value={form.plannedDistance}
                      onChange={(e) => setForm({ ...form, plannedDistance: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Select Available Vehicle</label>
                    <select
                      value={form.vehicleId}
                      onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--card-border)', backgroundColor: 'var(--input-bg)',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Select Available Driver</label>
                    <select
                      value={form.driverId}
                      onChange={(e) => setForm({ ...form, driverId: e.target.value })}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid var(--card-border)', backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)', outline: 'none'
                      }}
                    >
                      <option value="">-- Choose Driver --</option>
                      {drivers?.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="submit" className="login-button" style={{ marginTop: 0 }}>Create</button>
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

        {/* Complete Trip Dialog */}
        {showCompleteModal && (
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
              width: '100%', maxWidth: '400px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Complete Delivery</h2>
              <form onSubmit={handleCompleteSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Actual Distance Traveled (km)"
                      value={completeForm.actualDistance}
                      onChange={(e) => setCompleteForm({ ...completeForm, actualDistance: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Total Fuel Consumed (liters)"
                      value={completeForm.fuelConsumed}
                      onChange={(e) => setCompleteForm({ ...completeForm, fuelConsumed: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="submit" className="login-button" style={{ marginTop: 0 }}>Save & Complete</button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCompleteModal(false);
                      setSelectedTripId(null);
                    }}
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

        {/* Trips List */}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Loading dispatcher logs...</p>
          ) : !trips || trips.length === 0 ? (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <FiNavigation size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
              <p>No trip delivery logs. Plan a new trip route above.</p>
            </div>
          ) : (
            <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="trips-list">
                <table>
                  <thead>
                    <tr>
                      <th>Route</th>
                      <th>Cargo Load</th>
                      <th>Distance</th>
                      <th>Vehicle ID</th>
                      <th>Driver Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map((t) => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 700 }}>{t.source} → {t.destination}</td>
                        <td>{t.cargoWeight} kg</td>
                        <td>
                          {t.status === 'Completed' ? `${t.actualDistance} km (actual)` : `${t.plannedDistance} km (planned)`}
                        </td>
                        <td>{t.vehicle.name} ({t.vehicleId})</td>
                        <td>{t.driver.name}</td>
                        <td>{getStatusBadge(t.status)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {t.status === 'Draft' && (
                              <button
                                onClick={() => dispatchMutation.mutate(t.id)}
                                className="status-badge in-progress"
                                style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                title="Dispatch Trip"
                              >
                                <FiSend size={12} /> Dispatch
                              </button>
                            )}
                            {t.status === 'Dispatched' && (
                              <button
                                onClick={() => {
                                  setSelectedTripId(t.id);
                                  setShowCompleteModal(true);
                                }}
                                className="status-badge completed"
                                style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                title="Complete Trip"
                              >
                                <FiCheck size={12} /> Complete
                              </button>
                            )}
                            {t.status !== 'Completed' && t.status !== 'Cancelled' && (
                              <button
                                onClick={() => cancelMutation.mutate(t.id)}
                                className="status-badge logout"
                                style={{
                                  border: 'none', cursor: 'pointer', display: 'flex',
                                  alignItems: 'center', gap: '0.25rem',
                                  backgroundColor: 'rgba(248,81,73,0.15)', color: 'var(--accent-danger)'
                                }}
                                title="Cancel Trip"
                              >
                                <FiX size={12} /> Cancel
                              </button>
                            )}
                          </div>
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

export default TripsPage;

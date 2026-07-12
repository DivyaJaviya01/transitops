import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FiPlus, FiTrash2, FiTruck } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Vehicle {
  registrationNumber: string;
  name: string;
  type: string;
  maxLoadCapacity: number;
  odometer: number;
  acquisitionCost: number;
  status: string;
}

const VehiclesPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    registrationNumber: '',
    name: '',
    type: 'Truck',
    maxLoadCapacity: '',
    odometer: '',
    acquisitionCost: '',
    status: 'Available'
  });

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const res = await api.get('/vehicles');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newVehicle: typeof form) => {
      return api.post('/vehicles', newVehicle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      toast.success('Vehicle registered successfully!');
      setShowModal(false);
      setForm({
        registrationNumber: '',
        name: '',
        type: 'Truck',
        maxLoadCapacity: '',
        odometer: '',
        acquisitionCost: '',
        status: 'Available'
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (regNum: string) => {
      return api.delete(`/vehicles/${regNum}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      toast.success('Vehicle deleted successfully!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Deletion failed');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.registrationNumber || !form.name || !form.maxLoadCapacity || !form.odometer || !form.acquisitionCost) {
      toast.error('Please fill in all fields');
      return;
    }
    createMutation.mutate(form);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <span className="status-badge completed">Available</span>;
      case 'on trip':
        return <span className="status-badge in-progress">On Trip</span>;
      case 'in shop':
        return <span className="status-badge pending">In Shop</span>;
      default:
        return <span className="status-badge pending">{status}</span>;
    }
  };

  return (
    <MainLayout>
      <Toaster position="top-right" richColors />
      <div className="p-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Vehicles</h1>
            <p>Manage and track fleet vehicles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="login-button"
            style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}
          >
            <FiPlus /> Register Vehicle
          </button>
        </div>

        {/* Modal Dialog */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem',
              width: '100%',
              maxWidth: '500px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Register New Vehicle</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Registration Number (e.g. GJ-01-XX-1234)"
                      value={form.registrationNumber}
                      onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Vehicle Name / Model"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    >
                      <option value="Truck">Truck</option>
                      <option value="Van">Van</option>
                      <option value="Semi">Semi</option>
                      <option value="Car">Car</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Max Load Capacity (kg)"
                      value={form.maxLoadCapacity}
                      onChange={(e) => setForm({ ...form, maxLoadCapacity: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Initial Odometer Reading (km)"
                      value={form.odometer}
                      onChange={(e) => setForm({ ...form, odometer: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Acquisition Cost ($)"
                      value={form.acquisitionCost}
                      onChange={(e) => setForm({ ...form, acquisitionCost: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    type="submit"
                    className="login-button"
                    style={{ marginTop: 0 }}
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="login-button"
                    style={{
                      marginTop: 0,
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vehicles List */}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Loading registry...</p>
          ) : !vehicles || vehicles.length === 0 ? (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <FiTruck size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
              <p>No vehicles found. Click the button to add your first vehicle.</p>
            </div>
          ) : (
            <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="trips-list">
                <table>
                  <thead>
                    <tr>
                      <th>Plate Number</th>
                      <th>Model Name</th>
                      <th>Type</th>
                      <th>Max Capacity</th>
                      <th>Odometer</th>
                      <th>Acquisition Cost</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v) => (
                      <tr key={v.registrationNumber}>
                        <td style={{ fontWeight: 700 }}>{v.registrationNumber}</td>
                        <td>{v.name}</td>
                        <td>{v.type}</td>
                        <td>{v.maxLoadCapacity} kg</td>
                        <td>{v.odometer} km</td>
                        <td>${v.acquisitionCost.toLocaleString()}</td>
                        <td>{getStatusBadge(v.status)}</td>
                        <td>
                          <button
                            onClick={() => deleteMutation.mutate(v.registrationNumber)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--accent-danger)',
                              cursor: 'pointer',
                              padding: '0.25rem'
                            }}
                            title="Delete Vehicle"
                          >
                            <FiTrash2 size={16} />
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
      </div>
    </MainLayout>
  );
};

export default VehiclesPage;

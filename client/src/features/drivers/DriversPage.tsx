import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FiPlus, FiTrash2, FiUsers } from 'react-icons/fi';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiryDate: string;
  contactNumber: string;
  safetyScore: number;
  status: string;
}

const DriversPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    licenseNumber: '',
    licenseCategory: 'Class A',
    licenseExpiryDate: '',
    contactNumber: '',
    safetyScore: '100',
    status: 'Available'
  });

  const { data: drivers, isLoading } = useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: async () => {
      const res = await api.get('/drivers');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newDriver: typeof form) => {
      return api.post('/drivers', newDriver);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      toast.success('Driver profile created successfully!');
      setShowModal(false);
      setForm({
        name: '',
        licenseNumber: '',
        licenseCategory: 'Class A',
        licenseExpiryDate: '',
        contactNumber: '',
        safetyScore: '100',
        status: 'Available'
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/drivers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      toast.success('Driver deleted successfully!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Deletion failed');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.licenseNumber || !form.licenseExpiryDate || !form.contactNumber) {
      toast.error('Please fill in all required fields');
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
      case 'suspended':
        return <span className="status-badge pending">Suspended</span>;
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
            <h1>Drivers</h1>
            <p>Manage and track driver profiles and telemetry ratings</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="login-button"
            style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}
          >
            <FiPlus /> Add Driver
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
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Add New Driver Profile</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="License Number (e.g. DL-XXXXXXXXXX)"
                      value={form.licenseNumber}
                      onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <select
                      value={form.licenseCategory}
                      onChange={(e) => setForm({ ...form, licenseCategory: e.target.value })}
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
                      <option value="Class A">Class A (Heavy Commercial)</option>
                      <option value="Class B">Class B (Commercial)</option>
                      <option value="Class C">Class C (Standard)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>License Expiry Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        value={form.licenseExpiryDate}
                        onChange={(e) => setForm({ ...form, licenseExpiryDate: e.target.value })}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Contact Number (e.g. +91 99999-99999)"
                      value={form.contactNumber}
                      onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Safety Score (out of 100)"
                      value={form.safetyScore}
                      onChange={(e) => setForm({ ...form, safetyScore: e.target.value })}
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
                    Save Profile
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

        {/* Drivers List */}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Loading profiles...</p>
          ) : !drivers || drivers.length === 0 ? (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <FiUsers size={48} style={{ marginBottom: '1rem', color: 'var(--accent-brand)' }} />
              <p>No driver profiles registered. Click the button to add a driver.</p>
            </div>
          ) : (
            <div className="recent-trips-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="trips-list">
                <table>
                  <thead>
                    <tr>
                      <th>Driver Name</th>
                      <th>License Number</th>
                      <th>Category</th>
                      <th>Expiry Date</th>
                      <th>Contact info</th>
                      <th>Safety Score</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((d) => (
                      <tr key={d.id}>
                        <td style={{ fontWeight: 700 }}>{d.name}</td>
                        <td>{d.licenseNumber}</td>
                        <td>{d.licenseCategory}</td>
                        <td>{new Date(d.licenseExpiryDate).toLocaleDateString()}</td>
                        <td>{d.contactNumber}</td>
                        <td style={{
                          fontWeight: 700,
                          color: d.safetyScore >= 85 ? 'var(--accent-success)' : d.safetyScore >= 70 ? 'var(--accent-warning)' : 'var(--accent-danger)'
                        }}>{d.safetyScore} / 100</td>
                        <td>{getStatusBadge(d.status)}</td>
                        <td>
                          <button
                            onClick={() => deleteMutation.mutate(d.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--accent-danger)',
                              cursor: 'pointer',
                              padding: '0.25rem'
                            }}
                            title="Delete Profile"
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

export default DriversPage;

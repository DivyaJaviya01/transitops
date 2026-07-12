import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import MainLayout from "../../components/layout/MainLayout.tsx";

const statusBadge: Record<string, string> = {
  'On Trip': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--status-trip-bg)] text-[var(--status-trip-fg)] text-[11px] font-bold',
  'Available': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--status-available-bg)] text-[var(--status-available-fg)] text-[11px] font-bold',
  'Off Duty': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--status-duty-bg)] text-[var(--status-duty-fg)] text-[11px] font-bold',
  'Suspended': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--status-suspended-bg)] text-[var(--status-suspended-fg)] text-[11px] font-bold',
};

const statusDot: Record<string, string> = {
  'On Trip': 'bg-[var(--status-trip-dot)] animate-pulse',
  'Available': 'bg-[var(--status-available-dot)]',
  'Off Duty': 'bg-[var(--status-duty-dot)]',
  'Suspended': 'bg-[var(--status-suspended-dot)]',
};

const DriverForm = ({ onSubmit, onCancel, loading }: { onSubmit: (data: any) => void; onCancel: () => void; loading: boolean }) => {
  const [form, setForm] = useState({ name: '', licenseNumber: '', licenseCategory: 'Class A', licenseExpiryDate: '', contactNumber: '', status: 'Available', safetyScore: 85 });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, licenseExpiryDate: new Date(form.licenseExpiryDate) }); }} className="space-y-4">
      <div>
        <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Full Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1 focus:ring-[var(--accent-brand)] focus:border-[var(--accent-brand)]" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">License Number</label>
          <input value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1" required />
        </div>
        <div>
          <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">License Category</label>
          <select value={form.licenseCategory} onChange={(e) => setForm({ ...form, licenseCategory: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1">
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Contact Number</label>
        <input value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1" placeholder="e.g. +1-555-1234" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">License Expiry</label>
          <input type="date" value={form.licenseExpiryDate} onChange={(e) => setForm({ ...form, licenseExpiryDate: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1" required />
        </div>
        <div>
          <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1">
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Off Duty">Off Duty</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Safety Score (0-100)</label>
        <input type="number" value={form.safetyScore} onChange={(e) => setForm({ ...form, safetyScore: Number(e.target.value) })} className="w-full border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-[14px] mt-1" min="0" max="100" />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-[12px] font-bold text-[var(--text-secondary)] border border-[var(--card-border)] hover:bg-gray-50 dark:hover:bg-[var(--table-row-hover)]">Cancel</button>
        <button type="submit" disabled={loading} className="bg-secondary text-white px-6 py-2.5 rounded-lg text-[12px] font-bold hover:opacity-90 disabled:opacity-50">{loading ? 'Saving...' : 'Save Driver'}</button>
      </div>
    </form>
  );
};

const DriversPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const queryClient = useQueryClient();

  const handleExportCSV = () => {
    const token = localStorage.getItem('token');
    window.open(`http://localhost:5000/api/reports/export/csv?token=${token}`, '_blank');
  };

  const addDriverMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/drivers', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-drivers'] });
      setShowAddDriver(false);
    },
  });

  const { data: allDrivers, isLoading } = useQuery({
    queryKey: ['drivers', statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await api.get(`/drivers?${params.toString()}`);
      return res.data;
    },
  });

  const drivers = allDrivers || [];
  const totalPersonnel = drivers.length;
  const onTrip = drivers.filter((d: any) => d.status === 'On Trip').length;
  const available = drivers.filter((d: any) => d.status === 'Available').length;
  const avgSafety = drivers.length > 0
    ? (drivers.reduce((s: number, d: any) => s + (d.safetyScore || 0), 0) / drivers.length).toFixed(1)
    : '0';

  return (
    <MainLayout>
      <div className="p-margin-desktop space-y-8 max-w-container-max mx-auto p-8">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-[var(--card-bg)] p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-outline mb-1">TOTAL PERSONNEL</p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">{totalPersonnel}</h2>
              </div>
              <div className="bg-surface-container-high p-3 rounded-xl">
                <span className="material-symbols-outlined text-secondary">groups</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white dark:bg-[var(--card-bg)] p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">ON TRIP</p>
            <h3 className="text-headline-md font-headline-md text-secondary">{onTrip}</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-secondary h-full" style={{ width: `${totalPersonnel > 0 ? (onTrip / totalPersonnel) * 100 : 0}%` }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">{totalPersonnel > 0 ? Math.round((onTrip / totalPersonnel) * 100) : 0}% Capacity</p>
          </div>
          
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white dark:bg-[var(--card-bg)] p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">AVAILABLE</p>
            <h3 className="text-headline-md font-headline-md text-on-surface">{available}</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-on-tertiary-fixed-variant h-full" style={{ width: `${totalPersonnel > 0 ? (available / totalPersonnel) * 100 : 0}%` }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">Ready for dispatch</p>
          </div>
          
          <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-blue-900 p-6 rounded-xl border border-blue-800 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-blue-200/70 mb-1">AVERAGE SAFETY SCORE</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-[32px] font-bold text-white">{avgSafety}</h2>
                <span className="text-blue-200/50 text-[14px]">/ 100</span>
              </div>
            </div>
            <div className="mt-4 flex gap-1.5 items-end h-16 relative z-10">
              {drivers.slice(0, 7).map((d: any, i: number) => (
                <div key={i} className="w-full rounded-t-md transition-all hover:opacity-80" style={{
                  height: `${Math.max(8, (d.safetyScore || 50) / 100 * 60)}px`,
                  backgroundColor: d.safetyScore >= 90 ? '#22c55e' : d.safetyScore >= 80 ? '#eab308' : '#ef4444',
                }}></div>
              ))}
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px] text-white">verified_user</span>
            </div>
          </div>
        </section>
        
        <section className="bg-white dark:bg-[var(--card-bg)] rounded-xl border border-gray-200 dark:border-[var(--card-border)] shadow-sm mt-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-[var(--card-border)] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gray-50 dark:bg-[var(--surface-muted)]">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="flex bg-gray-100 dark:bg-[var(--surface-muted)] rounded-lg p-1 border border-gray-200 dark:border-[var(--card-border)]">
                <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-[var(--card-bg)] shadow-sm text-gray-900 dark:text-[var(--text-primary)]' : 'text-gray-500 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-[var(--text-primary)]'}`}>
                  <span className="material-symbols-outlined text-[18px]">list</span>
                  List
                </button>
                <button onClick={() => setViewMode('grid')} className={`px-4 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-[var(--card-bg)] shadow-sm text-gray-900 dark:text-[var(--text-primary)]' : 'text-gray-500 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-[var(--text-primary)]'}`}>
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  Grid
                </button>
              </div>
              <div className="h-6 w-px bg-gray-200 dark:bg-[var(--card-border)]"></div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-500 dark:text-[var(--text-secondary)]">Status:</span>
                <select className="bg-transparent border-0 text-[13px] font-bold focus:ring-0 cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Available">Available</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button onClick={() => setShowAddDriver(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                ADD DRIVER
              </button>
              <button onClick={handleExportCSV} className="text-[13px] font-bold text-gray-500 dark:text-[var(--text-secondary)] flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-[var(--table-row-hover)] px-3 py-2 rounded-lg transition-colors border border-gray-200 dark:border-[var(--card-border)] cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Export CSV
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-[var(--surface-muted)] sticky top-0 border-b border-gray-200 dark:border-[var(--card-border)]">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider">Personnel Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider">ID / License</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider text-center">Safety Score</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider">License Expiry</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-[var(--text-secondary)] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[var(--card-border)]">
                {isLoading && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading drivers...</td></tr>
                )}
                {!isLoading && drivers.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No drivers found</td></tr>
                )}
                {drivers.map((d: any) => {
                  const daysLeft = Math.ceil((new Date(d.licenseExpiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <tr className="hover:bg-gray-50 dark:hover:bg-[var(--table-row-hover)] transition-colors group" key={d.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--avatar-bg)] text-[var(--avatar-fg)] flex items-center justify-center font-bold text-sm">
                            {d.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[14px] text-gray-900 dark:text-[var(--text-primary)] font-semibold">{d.name}</p>
                            <p className="text-[12px] text-gray-500 dark:text-[var(--text-secondary)]">{d.licenseCategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px]">
                        <p className="text-gray-900 dark:text-[var(--text-primary)]">#{d.licenseNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={statusBadge[d.status] || statusBadge['Available']}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[d.status] || 'bg-green-700 dark:bg-green-400'}`}></span>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold" style={{ color: d.safetyScore >= 90 ? '#059669' : d.safetyScore >= 80 ? '#d97706' : '#dc2626' }}>{d.safetyScore}</span>
                          <div className="w-20 h-1.5 bg-gray-100 dark:bg-[var(--surface-muted)] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${d.safetyScore}%`, backgroundColor: d.safetyScore >= 90 ? '#16a34a' : d.safetyScore >= 80 ? '#d97706' : '#dc2626' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px]">
                        <p className="text-gray-900 dark:text-[var(--text-primary)]">{new Date(d.licenseExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        <p className={`text-[11px] font-bold ${daysLeft <= 30 ? 'text-red-600' : daysLeft <= 90 ? 'text-amber-600' : 'text-green-600'}`}>
                          {daysLeft <= 0 ? 'EXPIRED' : `${daysLeft} days left`}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setSelectedDriver(d)} className="text-gray-500 dark:text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-lg transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {isLoading && <p className="col-span-full text-center text-gray-500 dark:text-[var(--text-secondary)] py-8">Loading drivers...</p>}
            {!isLoading && drivers.length === 0 && <p className="col-span-full text-center text-gray-500 dark:text-[var(--text-secondary)] py-8">No drivers found</p>}
            {drivers.map((d: any) => {
              const daysLeft = Math.ceil((new Date(d.licenseExpiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={d.id} className="bg-white dark:bg-[var(--card-bg)] border border-gray-200 dark:border-[var(--card-border)] rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--avatar-bg)] text-[var(--avatar-fg)] flex items-center justify-center font-bold text-lg">
                      {d.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-[var(--text-primary)]">{d.name}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[var(--text-secondary)]">{d.licenseCategory}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-[var(--text-secondary)]">License</span>
                      <span className="text-gray-900 dark:text-[var(--text-primary)] font-medium">#{d.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-[var(--text-secondary)]">Status</span>
                      <span className={statusBadge[d.status] || statusBadge['Available']}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[d.status] || 'bg-green-700 dark:bg-green-400'}`}></span>
                        {d.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-[var(--text-secondary)]">Safety Score</span>
                      <span className="font-bold" style={{ color: d.safetyScore >= 90 ? '#166534' : d.safetyScore >= 80 ? '#92400e' : '#dc2626' }}>{d.safetyScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-[var(--text-secondary)]">License Expiry</span>
                      <span className={`font-bold ${daysLeft <= 30 ? 'text-red-600' : daysLeft <= 90 ? 'text-amber-600' : 'text-green-600'}`}>
                        {new Date(d.licenseExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>
        {selectedDriver && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedDriver(null)}>
            <div className="bg-white dark:bg-[var(--card-bg)] rounded-xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--avatar-bg)] text-[var(--avatar-fg)] flex items-center justify-center font-bold text-lg">
                    {selectedDriver.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-[var(--text-primary)]">{selectedDriver.name}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-[var(--text-secondary)]">{selectedDriver.licenseCategory}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedDriver(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-[var(--table-row-hover)] rounded cursor-pointer"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-[var(--card-border)]"><span className="text-gray-500 dark:text-[var(--text-secondary)]">License Number</span><span className="font-semibold text-[var(--text-primary)]">#{selectedDriver.licenseNumber}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-[var(--card-border)]"><span className="text-gray-500 dark:text-[var(--text-secondary)]">Status</span><span className={statusBadge[selectedDriver.status] || statusBadge['Available']}>{selectedDriver.status}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-[var(--card-border)]"><span className="text-gray-500 dark:text-[var(--text-secondary)]">Safety Score</span><span className="font-bold" style={{ color: selectedDriver.safetyScore >= 90 ? '#059669' : selectedDriver.safetyScore >= 80 ? '#d97706' : '#dc2626' }}>{selectedDriver.safetyScore}/100</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-500 dark:text-[var(--text-secondary)]">License Expiry</span><span className="font-semibold text-[var(--text-primary)]">{new Date(selectedDriver.licenseExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
              </div>
            </div>
          </div>
        )}
        {showAddDriver && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddDriver(false)}>
            <div className="bg-white dark:bg-[var(--card-bg)] rounded-xl p-8 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[20px] font-bold text-[var(--text-primary)] mb-6">Add New Driver</h3>
              <DriverForm onSubmit={(data) => addDriverMutation.mutate(data)} onCancel={() => setShowAddDriver(false)} loading={addDriverMutation.isPending} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DriversPage;

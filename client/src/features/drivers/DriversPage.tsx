import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import MainLayout from "../../components/layout/MainLayout.tsx";

const statusBadge: Record<string, string> = {
  'On Trip': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold',
  'Available': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold',
  'Off Duty': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold',
  'Suspended': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold',
};

const statusDot: Record<string, string> = {
  'On Trip': 'bg-blue-700 animate-pulse',
  'Available': 'bg-green-700',
  'Off Duty': 'bg-slate-700',
  'Suspended': 'bg-red-700',
};

const DriversPage = () => {
  const [statusFilter, setStatusFilter] = useState('');

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
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
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
          
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">ON TRIP</p>
            <h3 className="text-headline-md font-headline-md text-secondary">{onTrip}</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-secondary h-full" style={{ width: `${totalPersonnel > 0 ? (onTrip / totalPersonnel) * 100 : 0}%` }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">{totalPersonnel > 0 ? Math.round((onTrip / totalPersonnel) * 100) : 0}% Capacity</p>
          </div>
          
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">AVAILABLE</p>
            <h3 className="text-headline-md font-headline-md text-on-surface">{available}</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-on-tertiary-fixed-variant h-full" style={{ width: `${totalPersonnel > 0 ? (available / totalPersonnel) * 100 : 0}%` }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">Ready for dispatch</p>
          </div>
          
          <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-primary-container p-6 rounded-xl border border-outline flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-label-md text-on-primary-container/70 mb-1">AVERAGE SAFETY SCORE</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-headline-lg font-headline-lg text-white">{avgSafety}</h2>
                <span className="text-on-primary-container/50 text-body-sm">/ 100</span>
              </div>
            </div>
            <div className="mt-4 flex gap-1 items-end h-12 relative z-10">
              {drivers.slice(0, 7).map((d: any, i: number) => (
                <div key={i} className="w-full rounded-t-sm" style={{
                  height: `${Math.max(15, (d.safetyScore || 50) * 0.12)}px`,
                  backgroundColor: `rgba(111, 251, 190, ${(d.safetyScore || 50) / 100})`,
                }}></div>
              ))}
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px] text-white">verified_user</span>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-outline-variant flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-surface-container-lowest">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="flex bg-surface-container-low rounded-lg p-1 border border-outline-variant">
                <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-label-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">list</span>
                  List
                </button>
                <button className="px-4 py-1.5 rounded-md text-label-md text-outline hover:text-on-surface transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  Grid
                </button>
              </div>
              <div className="h-6 w-px bg-outline-variant"></div>
              <div className="flex items-center gap-2">
                <span className="text-label-md text-outline">Status:</span>
                <select className="bg-transparent border-none text-label-md font-bold focus:ring-0 cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Available">Available</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button className="text-label-md font-bold text-outline flex items-center gap-1 hover:bg-surface-container-low px-3 py-2 rounded-lg transition-colors border border-outline-variant">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Export CSV
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low/50 sticky top-0 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Personnel Name</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">ID / License</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider text-center">Safety Score</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">License Expiry</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {isLoading && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#76777d' }}>Loading drivers...</td></tr>
                )}
                {!isLoading && drivers.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#76777d' }}>No drivers found</td></tr>
                )}
                {drivers.map((d: any) => {
                  const daysLeft = Math.ceil((new Date(d.licenseExpiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <tr className="hover:bg-surface-container-low/30 transition-colors group" key={d.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-sm">
                            {d.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-body-md text-on-surface font-semibold">{d.name}</p>
                            <p className="text-label-sm text-outline">{d.licenseCategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-tabular-nums text-body-sm">
                        <p className="text-on-surface">#{d.licenseNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={statusBadge[d.status] || statusBadge['Available']}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[d.status] || 'bg-green-700'}`}></span>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-tabular-nums font-bold" style={{ color: d.safetyScore >= 90 ? '#166534' : d.safetyScore >= 80 ? '#92400e' : '#dc2626' }}>{d.safetyScore}</span>
                          <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${d.safetyScore}%`, backgroundColor: d.safetyScore >= 90 ? '#16a34a' : d.safetyScore >= 80 ? '#d97706' : '#dc2626' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-tabular-nums text-body-sm">
                        <p className="text-on-surface">{new Date(d.licenseExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        <p className={`text-[11px] font-bold ${daysLeft <= 30 ? 'text-red-600' : daysLeft <= 90 ? 'text-amber-600' : 'text-green-600'}`}>
                          {daysLeft <= 0 ? 'EXPIRED' : `${daysLeft} days left`}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-outline hover:text-secondary p-1 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default DriversPage;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import MainLayout from "../../components/layout/MainLayout.tsx";

const statusBadge: Record<string, string> = {
  'Available': 'px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit',
  'On Trip': 'px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 flex items-center gap-1 w-fit',
  'In Shop': 'px-3 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 flex items-center gap-1 w-fit',
  'Retired': 'px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 flex items-center gap-1 w-fit',
};

const statusDot: Record<string, string> = {
  'Available': 'bg-green-700',
  'On Trip': 'bg-blue-700',
  'In Shop': 'bg-orange-700',
  'Retired': 'bg-slate-700',
};

const VehicleRegistry: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles', statusFilter, typeFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (typeFilter) params.set('type', typeFilter);
      const res = await api.get(`/vehicles?${params.toString()}`);
      return res.data;
    },
  });

  return (
    <MainLayout>
      <div className="p-[32px] space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1c30] mb-1">Vehicle Registry</h2>
            <div className="flex items-center text-[12px] font-semibold tracking-wider text-[#76777d] gap-2">
              <span>Fleet</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#0058be] font-bold">All Assets</span>
            </div>
          </div>
          <button className="bg-[#0058be] text-white px-6 py-2.5 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:opacity-90 active:opacity-80 transition-all shadow-sm">
            <span className="material-symbols-outlined">add</span>
            ADD VEHICLE
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg material-symbols-outlined">local_shipping</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Total Fleet</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">{vehicles?.length ?? '...'} <span className="text-[13px] font-normal text-[#76777d] ml-1">Assets</span></h3>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-green-50 text-green-600 rounded-lg material-symbols-outlined">check_circle</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Active (On Trip)</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">{vehicles?.filter((v: any) => v.status === 'On Trip').length ?? '...'} <span className="text-[13px] font-normal text-[#76777d] ml-1">Operational</span></h3>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-orange-50 text-orange-600 rounded-lg material-symbols-outlined">warning</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Maintenance</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">{vehicles?.filter((v: any) => v.status === 'In Shop').length ?? '...'} <span className="text-[13px] font-normal text-[#76777d] ml-1">In Shop</span></h3>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-slate-50 text-slate-600 rounded-lg material-symbols-outlined">event_busy</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Available</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">{vehicles?.filter((v: any) => v.status === 'Available').length ?? '...'} <span className="text-[13px] font-normal text-[#76777d] ml-1">Ready</span></h3>
          </div>
        </div>

        <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col xl:flex-row items-center justify-between gap-4 border border-[#c6c6cd]/50">
          <div className="flex flex-wrap items-center gap-4 flex-1 w-full xl:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#76777d] font-bold tracking-wider">FILTERS:</span>
            </div>
            <select className="bg-[#f8f9ff] border-[#c6c6cd] rounded px-3 py-1.5 text-[13px] focus:ring-[#0058be] focus:border-[#0058be] min-w-[140px]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="On Trip">On Trip</option>
              <option value="In Shop">In Shop</option>
              <option value="Retired">Retired</option>
            </select>
            <select className="bg-[#f8f9ff] border-[#c6c6cd] rounded px-3 py-1.5 text-[13px] focus:ring-[#0058be] focus:border-[#0058be] min-w-[140px]" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Vehicle Types</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Sedan">Sedan</option>
            </select>
            <button className="text-[#0058be] text-[12px] font-bold hover:underline px-2" onClick={() => { setStatusFilter(''); setTypeFilter(''); }}>Clear All</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#76777d]">Showing {vehicles?.length ?? 0} vehicles</span>
          </div>
        </div>

        <div className="bg-[#f8f9ff] border border-[#c6c6cd] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#e5eeff] text-[#0b1c30]">
                <tr className="text-[12px] font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Vehicle ID</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Name / Type</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Odometer</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Capacity</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#45464d] divide-y divide-[#c6c6cd]/30">
                {isLoading && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#76777d' }}>Loading vehicles...</td></tr>
                )}
                {!isLoading && vehicles?.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#76777d' }}>No vehicles found</td></tr>
                )}
                {(vehicles || []).map((v: any) => (
                  <tr className="hover:bg-[#eff6ff] transition-colors cursor-pointer" key={v.registrationNumber}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-['Inter'] font-medium text-[14px] text-[#0b1c30] font-bold">{v.registrationNumber}</span>
                        <span className="text-[11px] text-[#76777d]">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#76777d] text-[20px]">
                          {v.type === 'Truck' ? 'local_shipping' : v.type === 'Van' ? 'airport_shuttle' : 'directions_car'}
                        </span>
                        <span>{v.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={statusBadge[v.status] || statusBadge['Available']}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[v.status] || 'bg-green-700'}`}></span> {v.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#76777d]">{v.odometer?.toLocaleString()} km</td>
                    <td className="px-6 py-4 text-[13px] text-[#76777d]">{v.maxLoadCapacity?.toLocaleString()} kg</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                        <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleRegistry;

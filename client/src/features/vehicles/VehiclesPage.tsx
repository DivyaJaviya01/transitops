import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

const VehicleForm = ({ onSubmit, onCancel, loading }: { onSubmit: (data: any) => void; onCancel: () => void; loading: boolean }) => {
  const [form, setForm] = useState({ registrationNumber: '', name: '', type: 'Truck', maxLoadCapacity: 0, odometer: 0, acquisitionCost: 0, status: 'Available' });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div>
        <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Registration Number</label>
        <input value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1 focus:ring-[#0058be] focus:border-[#0058be]" placeholder="e.g. VT-1234-X" required />
      </div>
      <div>
        <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Vehicle Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1 focus:ring-[#0058be] focus:border-[#0058be]" placeholder="e.g. Volvo FH16" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1">
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>
        <div>
          <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1">
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Max Load (kg)</label>
          <input type="number" value={form.maxLoadCapacity} onChange={(e) => setForm({ ...form, maxLoadCapacity: Number(e.target.value) })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1" min="0" required />
        </div>
        <div>
          <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Odometer (km)</label>
          <input type="number" value={form.odometer} onChange={(e) => setForm({ ...form, odometer: Number(e.target.value) })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1" min="0" />
        </div>
        <div>
          <label className="text-[12px] font-bold text-[#76777d] uppercase tracking-wider">Cost ($)</label>
          <input type="number" value={form.acquisitionCost} onChange={(e) => setForm({ ...form, acquisitionCost: Number(e.target.value) })} className="w-full border border-[#c6c6cd] rounded-lg px-4 py-2.5 text-[14px] mt-1" min="0" required />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-[12px] font-bold text-[#76777d] border border-[#c6c6cd] hover:bg-gray-50">Cancel</button>
        <button type="submit" disabled={loading} className="bg-[#0058be] text-white px-6 py-2.5 rounded-lg text-[12px] font-bold hover:opacity-90 disabled:opacity-50">{loading ? 'Saving...' : 'Save Vehicle'}</button>
      </div>
    </form>
  );
};

const VehicleRegistry: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const queryClient = useQueryClient();

  const addVehicleMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/vehicles', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['kpis'] });
      queryClient.invalidateQueries({ queryKey: ['available-vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-expense-options'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-maintenance-options'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles-report'] });
      setShowAddVehicle(false);
    },
  });

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
          <button onClick={() => setShowAddVehicle(true)} className="bg-[#0058be] text-white px-6 py-2.5 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:opacity-90 active:opacity-80 transition-all shadow-sm">
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
                        <button onClick={() => setSelectedVehicle(v)} className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors cursor-pointer" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                        <button onClick={() => setSelectedVehicle(v)} className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors cursor-pointer"><span className="material-symbols-outlined">more_vert</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedVehicle && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedVehicle(null)}>
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[20px] font-bold text-[#0b1c30]">{selectedVehicle.registrationNumber}</h3>
                  <p className="text-[13px] text-[#76777d]">{selectedVehicle.name}</p>
                </div>
                <button onClick={() => setSelectedVehicle(null)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#76777d]">Type</span><span className="font-semibold text-[#0b1c30]">{selectedVehicle.type}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#76777d]">Status</span><span className={statusBadge[selectedVehicle.status] || statusBadge['Available']}>{selectedVehicle.status.toUpperCase()}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#76777d]">Odometer</span><span className="font-semibold text-[#0b1c30]">{selectedVehicle.odometer?.toLocaleString()} km</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#76777d]">Max Load</span><span className="font-semibold text-[#0b1c30]">{selectedVehicle.maxLoadCapacity?.toLocaleString()} kg</span></div>
                <div className="flex justify-between py-2"><span className="text-[#76777d]">Acquisition Cost</span><span className="font-semibold text-[#0b1c30]">${selectedVehicle.acquisitionCost?.toLocaleString() || 'N/A'}</span></div>
              </div>
            </div>
          </div>
        )}
        {showAddVehicle && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddVehicle(false)}>
            <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[20px] font-bold text-[#0b1c30] mb-6">Add New Vehicle</h3>
              <VehicleForm onSubmit={(data) => addVehicleMutation.mutate(data)} onCancel={() => setShowAddVehicle(false)} loading={addVehicleMutation.isPending} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VehicleRegistry;

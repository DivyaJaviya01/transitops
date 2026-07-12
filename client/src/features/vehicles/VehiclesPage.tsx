import React from 'react';
import MainLayout from "../../components/layout/MainLayout.tsx";

const VehicleRegistry: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-[32px] space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumbs & Action Header */}
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

        {/* Fleet Metrics Grid (Bento Style) */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg material-symbols-outlined">local_shipping</span>
              <span className="text-[#009668] text-[11px] font-bold bg-[#6ffbbe]/20 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
              </span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Total Fleet</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">1,248 <span className="text-[13px] font-normal text-[#76777d] ml-1">Assets</span></h3>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-green-50 text-green-600 rounded-lg material-symbols-outlined">check_circle</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Active</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">1,182 <span className="text-[13px] font-normal text-[#76777d] ml-1">Operational</span></h3>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-orange-50 text-orange-600 rounded-lg material-symbols-outlined">warning</span>
              <span className="text-[#ba1a1a] text-[11px] font-bold bg-[#ffdad6]/20 px-2 py-0.5 rounded">Critical</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Maintenance</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">42 <span className="text-[13px] font-normal text-[#76777d] ml-1">In Shop</span></h3>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f9ff] border border-[#c6c6cd] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="p-2 bg-slate-50 text-slate-600 rounded-lg material-symbols-outlined">event_busy</span>
            </div>
            <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-wider">Inactive/Retired</p>
            <h3 className="text-[24px] font-semibold text-[#0b1c30]">24 <span className="text-[13px] font-normal text-[#76777d] ml-1">Decommissioned</span></h3>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col xl:flex-row items-center justify-between gap-4 border border-[#c6c6cd]/50">
          <div className="flex flex-wrap items-center gap-4 flex-1 w-full xl:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#76777d] font-bold tracking-wider">FILTERS:</span>
            </div>
            <select className="bg-[#f8f9ff] border-[#c6c6cd] rounded px-3 py-1.5 text-[13px] focus:ring-[#0058be] focus:border-[#0058be] min-w-[140px]">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Maintenance</option>
              <option>Retired</option>
            </select>
            <select className="bg-[#f8f9ff] border-[#c6c6cd] rounded px-3 py-1.5 text-[13px] focus:ring-[#0058be] focus:border-[#0058be] min-w-[140px]">
              <option>All Vehicle Types</option>
              <option>Heavy Duty Truck</option>
              <option>Delivery Van</option>
              <option>Light Commercial</option>
            </select>
            <select className="bg-[#f8f9ff] border-[#c6c6cd] rounded px-3 py-1.5 text-[13px] focus:ring-[#0058be] focus:border-[#0058be] min-w-[140px]">
              <option>Fuel Level: All</option>
              <option>Low (&lt; 20%)</option>
              <option>Medium (20-60%)</option>
              <option>High (&gt; 60%)</option>
            </select>
            <button className="text-[#0058be] text-[12px] font-bold hover:underline px-2">Clear All</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#76777d]">Showing 1-10 of 1,248</span>
            <div className="flex border border-[#c6c6cd] rounded overflow-hidden">
              <button className="px-2 py-1 bg-[#f8f9ff] border-r border-[#c6c6cd] text-[#76777d] hover:bg-[#eff4ff]"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
              <button className="px-2 py-1 bg-[#f8f9ff] text-[#76777d] hover:bg-[#eff4ff]"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
            </div>
          </div>
        </div>

        {/* Main Data Table Container */}
        <div className="bg-[#f8f9ff] border border-[#c6c6cd] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#e5eeff] text-[#0b1c30]">
                <tr className="text-[12px] font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">
                    <div className="flex items-center gap-2 cursor-pointer group">
                      Vehicle ID <span className="material-symbols-outlined text-[16px] group-hover:text-[#0058be]">expand_more</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Operator</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Fuel Level</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] whitespace-nowrap">Last Location</th>
                  <th className="px-6 py-4 border-b border-[#c6c6cd] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#45464d] divide-y divide-[#c6c6cd]/30">
                {/* Row 1: Active */}
                <tr className="hover:bg-[#eff6ff] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-['Inter'] font-medium text-[14px] text-[#0b1c30] font-bold">VT-4092-X</span>
                      <span className="text-[11px] text-[#76777d]">VIN: 1HGCM82633A001</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#76777d] text-[20px]">local_shipping</span>
                      Heavy Duty Truck
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span> ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#dce9ff] overflow-hidden border border-[#c6c6cd]">
                        <img className="w-full h-full object-cover" alt="Operator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPGvyS-DzGvy-BYSkqH76K9-fCkXUcTRdAFU73xRSgFtv_1qrPEPXnk87_m4Ni9UyPcfn93evYuOYAgsPy9tW0CkytFOZyYpqUJgImvK5bSVfpMtPzW2vHFBM9vObbsTciAdJDago9Eo_JudYJEkio8Ls97THtTDTgW0VDnzcmtiFG5kgSPBGHFwW30YvCBg1BBxx7OwEfoFaf0gU8coQniR14wvtddB0D7MQ4A2BSXC6anYnu0kH52jAesN2QcNwHC91UIJAkn_c" />
                      </div>
                      <span>Marcus Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-medium font-['Inter']">
                        <span>84%</span>
                        <span className="text-[#76777d]">Full</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#76777d]">Chicago, IL (HQ-2)</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                  </td>
                </tr>
                
                {/* Row 2: Maintenance */}
                <tr className="hover:bg-[#eff6ff] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-['Inter'] font-medium text-[14px] text-[#0b1c30] font-bold">VT-1102-S</span>
                      <span className="text-[11px] text-[#76777d]">VIN: 2HJFK92812B449</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#76777d] text-[20px]">airport_shuttle</span>
                      Delivery Van
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-700 animate-pulse"></span> MAINTENANCE
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="italic text-[#76777d]">Unassigned</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-medium font-['Inter'] text-[#ba1a1a]">
                        <span>12%</span>
                        <span className="text-[#76777d]">Low</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ba1a1a]" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#76777d]">Detroit Service Center</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Active */}
                <tr className="hover:bg-[#eff6ff] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-['Inter'] font-medium text-[14px] text-[#0b1c30] font-bold">VT-9921-M</span>
                      <span className="text-[11px] text-[#76777d]">VIN: 5TYUI88231C902</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#76777d] text-[20px]">local_shipping</span>
                      Light Commercial
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span> ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#dce9ff] overflow-hidden border border-[#c6c6cd]">
                        <img className="w-full h-full object-cover" alt="Operator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvL7GQIYqGj_Kaq645dMzHQMjdF67GpulpwDMcYTdkotywFCh26y1CQHOJmnhJc-r8OAHajYwfWaeagh9Sa_zNBTFKqPFOLz9GUk45FTxoB0rNfaDDat6gs4pC_r0JM0o-23FcrUNkXmxV5H4ebuPXuM9frDCrTXmheQejolLE-cLoLtPVm-ixZ_msCruC9U1PPSgDACRUGpNaVFn3cAh6l0oMRHpAbrEh5JTX5h310GcDNo72Oh-HQ2mjStpxOLWuMFftJyxRv60" />
                      </div>
                      <span>Sarah Jenkins</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-medium font-['Inter']">
                        <span>45%</span>
                        <span className="text-[#76777d]">Medium</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2170e4]" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#76777d]">In-Transit: I-90 West</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Retired */}
                <tr className="hover:bg-[#eff6ff] transition-colors opacity-70 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-['Inter'] font-medium text-[14px] text-[#0b1c30] font-bold">VT-0021-R</span>
                      <span className="text-[11px] text-[#76777d]">VIN: 3HHGG44123D881</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#76777d] text-[20px]">local_shipping</span>
                      Heavy Duty Truck
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> RETIRED
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="italic text-[#76777d]">None</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] text-[#76777d]">EMPTY</span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#76777d]">Yard C (Storage)</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#0058be] transition-colors" title="View Details"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#dce9ff] rounded text-[#76777d] transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-[#c6c6cd]">
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#76777d]">Rows per page:</span>
              <select className="bg-transparent border-none text-[13px] font-bold text-[#0b1c30] focus:ring-0">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[13px] text-[#0b1c30] font-medium font-['Inter']">1-10 of 1,248</span>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-[#e5eeff] text-[#76777d] rounded disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">first_page</span>
                </button>
                <button className="p-1 hover:bg-[#e5eeff] text-[#76777d] rounded disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-1 hover:bg-[#e5eeff] text-[#0b1c30] rounded">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <button className="p-1 hover:bg-[#e5eeff] text-[#0b1c30] rounded">
                  <span className="material-symbols-outlined">last_page</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Context Cards (Horizontal) */}
        <div className="grid grid-cols-12 gap-6 pb-[32px]">
          <div className="col-span-12 lg:col-span-8 bg-[#f8f9ff] border border-[#c6c6cd] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[20px] leading-[28px] font-semibold text-[#0b1c30]">Regional Fleet Distribution</h4>
              <button className="text-[#0058be] text-[12px] font-bold tracking-wider hover:underline">View All Locations</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] text-[#45464d]">North America</span>
                  <span className="font-bold font-medium font-['Inter'] text-[#0b1c30]">642</span>
                </div>
                <div className="h-2 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0058be]" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] text-[#45464d]">Europe</span>
                  <span className="font-bold font-medium font-['Inter'] text-[#0b1c30]">412</span>
                </div>
                <div className="h-2 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0058be]" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] text-[#45464d]">Asia Pacific</span>
                  <span className="font-bold font-medium font-['Inter'] text-[#0b1c30]">194</span>
                </div>
                <div className="h-2 w-full bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0058be]" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 bg-[#131b2e] text-[#7c839b] p-6 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[20px] leading-[28px] font-semibold text-white mb-2">Fleet Insights</h4>
              <p className="text-[13px] text-[#7c839b]/80 mb-6 leading-relaxed">Predictive maintenance alerts for <span className="text-[#6ffbbe] font-bold">8 vehicles</span> in the Midwest region are pending review.</p>
              <button className="w-full bg-[#2170e4] text-[#fefcff] py-3 rounded-lg text-[12px] font-bold tracking-wider hover:bg-[#2170e4]/90 transition-all flex items-center justify-center gap-2">
                RUN DIAGNOSTICS <span className="material-symbols-outlined text-[18px]">bolt</span>
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#0058be] opacity-20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleRegistry;

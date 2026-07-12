import React from 'react';
import MainLayout from "../../components/layout/MainLayout.tsx";

const DriversPage = () => {
  return (
    <MainLayout>
      <div className="p-margin-desktop space-y-8 max-w-container-max mx-auto p-8">
        {/* KPI Section (Bento Style) */}
        <section className="grid grid-cols-12 gap-6">
          {/* Main KPI */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-md text-outline mb-1">TOTAL PERSONNEL</p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">1,248</h2>
              </div>
              <div className="bg-surface-container-high p-3 rounded-xl">
                <span className="material-symbols-outlined text-secondary">groups</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded text-label-sm">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                +12%
              </span>
              <span className="text-outline text-label-sm">vs last month</span>
            </div>
          </div>
          
          {/* Secondary KPIs */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">ON TRIP</p>
            <h3 className="text-headline-md font-headline-md text-secondary">842</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-secondary h-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">68% Capacity</p>
          </div>
          
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-xl border border-outline-variant">
            <p className="text-label-md text-outline mb-1">AVAILABLE</p>
            <h3 className="text-headline-md font-headline-md text-on-surface">316</h3>
            <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-on-tertiary-fixed-variant h-full" style={{ width: '25%' }}></div>
            </div>
            <p className="text-label-sm text-outline mt-2">Ready for dispatch</p>
          </div>
          
          <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-primary-container p-6 rounded-xl border border-outline flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-label-md text-on-primary-container/70 mb-1">AVERAGE SAFETY SCORE</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-headline-lg font-headline-lg text-white">94.2</h2>
                <span className="text-on-primary-container/50 text-body-sm">/ 100</span>
              </div>
            </div>
            <div className="mt-4 flex gap-1 items-end h-12 relative z-10">
              {/* Tiny Data Viz Bars */}
              <div className="w-full bg-on-tertiary-fixed-variant/40 h-4 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/50 h-6 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/70 h-10 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/80 h-8 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/90 h-12 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/70 h-9 rounded-t-sm"></div>
              <div className="w-full bg-on-tertiary-fixed-variant/100 h-11 rounded-t-sm"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px] text-white">verified_user</span>
            </div>
          </div>
        </section>
        
        {/* Data Table Section */}
        <section className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden mt-8">
          {/* Table Controls */}
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
                <select className="bg-transparent border-none text-label-md font-bold focus:ring-0 cursor-pointer">
                  <option>All Statuses</option>
                  <option>On Trip</option>
                  <option>Available</option>
                  <option>Off-duty</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button className="text-label-md font-bold text-secondary flex items-center gap-1 hover:bg-secondary/5 px-3 py-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[18px]">assignment</span>
                Bulk Assign
              </button>
              <button className="text-label-md font-bold text-outline flex items-center gap-1 hover:bg-surface-container-low px-3 py-2 rounded-lg transition-colors border border-outline-variant">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Export CSV
              </button>
              <button className="bg-surface-container-high w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
          
          {/* Actual Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low/50 sticky top-0 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">
                    <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                  </th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Personnel Name</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">ID / License</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider text-center">Safety Score</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">License Expiry</th>
                  <th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-4">
                    <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full border border-outline-variant bg-surface-container" alt="David Harrison" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf8SIJTsu3in97FyGcwy-tYrOABB97euWil8Oh-xOToJ3AVlpT__qnk9NqtUYgrftYRYCUU6oenFgsByWwv-X3WWT40FmUSemqp07tPBckURnw83HjDhlylZHFzls3x80fQueOAcppx4CjqmcmYmT1n0aj6tR0SwmjfLSF8Y8EbFc1vD171WjNghky4MQkkafRzYx4W5RmbT-4iQVszACvaXg9uYr-T6Km1k5nUHtH8S_XLHWUmc4NkvfcVXUVYr4XcutodGXfhAA" />
                      <div>
                        <p className="font-body-md text-on-surface font-semibold">David Harrison</p>
                        <p className="text-label-sm text-outline">Lead Hauler • Regional</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-tabular-nums text-body-sm">
                    <p className="text-on-surface">#TRX-9482</p>
                    <p className="text-outline text-[11px]">Class A CDL (Multi-Trailer)</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/10 text-secondary text-label-sm font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      On Trip
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-tabular-nums font-bold text-on-tertiary-container">98.2</span>
                      <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="bg-on-tertiary-container h-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-tabular-nums text-body-sm">
                    <p className="text-on-surface">Sep 12, 2026</p>
                    <p className="text-on-tertiary-container text-[11px]">Valid • 780 days left</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-outline hover:text-secondary p-1 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
                
                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-4">
                    <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full border border-outline-variant bg-surface-container" alt="Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnfhqW9uzpb6KHORqibT6EusxA_FzASgu9Wa0-xOkboB3m-3MdbsEkY558i_IrCwM_mXKqjJdhnuWSblOfqKzxvVpSqMaJrSFqP6-YnV-RX57MSoRZfhCWDwY4mObgKyUfXnxf6t9nP2YXexhSYtKO0cvymBxj2XrlgLdf2Eu609qVQ79FY1ftyD-nUiGfumfhABs8l1pcozEYurmBjStMZ-lbNbbLrT-Cbefu3NIrIdtxWLj5yAubnurv1WyhEPPmcDLPeqB5fYk" />
                      <div>
                        <p className="font-body-md text-on-surface font-semibold">Elena Rodriguez</p>
                        <p className="text-label-sm text-outline">Delivery Specialist • Urban</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-tabular-nums text-body-sm">
                    <p className="text-on-surface">#TRX-2201</p>
                    <p className="text-outline text-[11px]">Class B CDL</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant text-label-sm font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed-variant"></span>
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-tabular-nums font-bold text-on-tertiary-container">91.5</span>
                      <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="bg-on-tertiary-container h-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-tabular-nums text-body-sm">
                    <p className="text-on-surface">Oct 04, 2024</p>
                    <p className="text-error text-[11px] font-bold">Expiring Soon • 12 days left</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-outline hover:text-secondary p-1 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Bottom Dashboard Row */}
        <section className="grid grid-cols-12 gap-6 pb-margin-desktop mt-8">
          {/* Maintenance Alerts */}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-outline-variant overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-error">warning</span>
                Compliance Alerts
              </h3>
              <button className="text-secondary text-label-md font-bold hover:underline">View All</button>
            </div>
            <div className="p-0">
              <div className="px-6 py-4 flex items-center justify-between border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-error-container/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-error">credit_card_off</span>
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface font-semibold">License Expiration</p>
                    <p className="text-body-sm text-outline">Elena Rodriguez • #TRX-2201</p>
                  </div>
                </div>
                <span className="text-label-sm font-bold text-error px-2 py-1 bg-error-container rounded">12 Days Left</span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary-container/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">health_and_safety</span>
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface font-semibold">Medical Cert Overdue</p>
                    <p className="text-body-sm text-outline">Marcus Chen • #TRX-7734</p>
                  </div>
                </div>
                <span className="text-label-sm font-bold text-on-surface-variant px-2 py-1 bg-surface-variant rounded">Today</span>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-outline-variant overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">history</span>
                Recent Dispatch Logs
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="relative pl-8 pb-4 border-l-2 border-outline-variant/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-white"></div>
                <p className="text-label-sm text-outline">10:42 AM</p>
                <p className="text-body-md text-on-surface"><strong>David Harrison</strong> assigned to Route <strong>#NY-LA-402</strong></p>
              </div>
              <div className="relative pl-8 pb-4 border-l-2 border-outline-variant/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-on-tertiary-fixed-variant border-2 border-white"></div>
                <p className="text-label-sm text-outline">09:15 AM</p>
                <p className="text-body-md text-on-surface"><strong>Sarah Jenkins</strong> completed Route <strong>#CH-MI-991</strong></p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-variant border-2 border-white"></div>
                <p className="text-label-sm text-outline">08:00 AM</p>
                <p className="text-body-md text-on-surface">System automatic shift update: <strong>42 Drivers</strong> checked-in</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default DriversPage;

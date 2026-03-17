'use client'
import Browser from '@/app/components/admin/analytics/Browser';
import Cards from '@/app/components/admin/analytics/Cards';
import Countries from '@/app/components/admin/analytics/Countries';
import Devices from '@/app/components/admin/analytics/Devices';
import Graph from '@/app/components/admin/analytics/Graph';
import TopPages from '@/app/components/admin/analytics/TopPages';
import Traffic from '@/app/components/admin/analytics/Traffic';
import Sidebar from '@/app/components/admin/SideBar';

export default function AnalyticsDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 text-slate-900 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Visitor Analytics</h1>
            <p className="mt-2 text-slate-500">Overview of site visitors</p>
          </div>

          {/* Stat Cards */}
          <Cards />

          {/* Area Chart - Daily Visitors */}
          <Graph />

          {/* Pie Charts - Traffic Sources + Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Traffic />
            <Devices />
          </div>

          {/* Countries + Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Countries />
            <TopPages />
          </div>

          {/* Browsers Bar Chart */}
          <Browser />

          <div className="mt-12 text-center text-xs text-slate-400">
            Data based on visitor tracking • Last updated: March 17, 2026
          </div>

        </div>
      </div>

    </div>
  );
}
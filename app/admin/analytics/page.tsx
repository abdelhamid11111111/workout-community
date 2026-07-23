'use client';

import { useEffect, useState } from 'react';
import Browser from '@/app/components/admin/analytics/Browser';
import Cards from '@/app/components/admin/analytics/Cards';
import Countries from '@/app/components/admin/analytics/Countries';
import Devices from '@/app/components/admin/analytics/Devices';
import Graph from '@/app/components/admin/analytics/Graph';
import TopPages from '@/app/components/admin/analytics/TopPages';
import Traffic from '@/app/components/admin/analytics/Traffic';
import Sidebar from '@/app/components/admin/SideBar';

interface AnalyticsData {
  cards?: {
    totalVisitors: string;
    uniqueSessions: string;
    avgSession: string;
    bounceRate: string;
  };
  graph?: Array<{ day: string; visitors: number }>;
  browsers?: Array<{ browser: string; count: number; pct: number }>;
  devices?: Array<{ name: string; value: number }>;
  countries?: Array<{ country: string; count: string; pct: string }>;
  topPages?: Array<{ path: string; views: string; pct: string }>;
  traffic?: Array<{ name: string; value: number }>;
  error?: string;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [activeNow, setActiveNow] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchAnalytics = () => {
      fetch('/api/admin/analytics')
        .then((res) => res.json())
        .then((data: AnalyticsData) => {
          setData(data);
          setLoading(false);
          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch((err) => {
          console.error('Failed to load analytics:', err);
          setLoading(false);
        });
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRealtime = () => {
      fetch('/api/admin/analytics/realtime')
        .then((res) => res.json())
        .then((data: { activeNow?: number }) => {
          setActiveNow(data.activeNow ?? 0);
        })
        .catch((err) => console.error('Failed to load realtime data:', err));
    };

    fetchRealtime();
    const interval = setInterval(fetchRealtime, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 text-slate-900 pb-16 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
            Loading analytics...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                Visitor Analytics
              </h1>
              <p className="mt-2 text-slate-500">Overview of site visitors</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeNow} active right now
            </div>
          </div>

          <Cards data={data?.cards} activeNow={activeNow} />

          <Graph data={data?.graph} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Traffic data={data?.traffic} />
            <Devices data={data?.devices} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Countries data={data?.countries} />
            <TopPages data={data?.topPages} />
          </div>

          <Browser data={data?.browsers} />

          <div className="mt-12 text-center text-xs text-slate-400">
            28-day snapshot last refreshed at {lastUpdated || 'just now'} • &quot;Active right now&quot; updates every 5s from GA4 Realtime
          </div>

        </div>
      </div>
    </div>
  );
}
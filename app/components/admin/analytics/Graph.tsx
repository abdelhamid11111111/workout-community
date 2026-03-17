import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Graph = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-800">Daily Visitors</h3>
                <span className="text-xs text-slate-400">Mar 1 – 17</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={[
                    { day: 'Mar 1', visitors: 320 }, { day: 'Mar 2', visitors: 410 },
                    { day: 'Mar 3', visitors: 380 }, { day: 'Mar 4', visitors: 520 },
                    { day: 'Mar 5', visitors: 490 }, { day: 'Mar 6', visitors: 610 },
                    { day: 'Mar 7', visitors: 580 }, { day: 'Mar 8', visitors: 420 },
                    { day: 'Mar 9', visitors: 390 }, { day: 'Mar 10', visitors: 640 },
                    { day: 'Mar 11', visitors: 700 }, { day: 'Mar 12', visitors: 680 },
                    { day: 'Mar 13', visitors: 510 }, { day: 'Mar 14', visitors: 590 },
                    { day: 'Mar 15', visitors: 750 }, { day: 'Mar 16', visitors: 820 },
                    { day: 'Mar 17', visitors: 760 },
                  ]}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                          <div className="text-slate-400 mb-1">{label}</div>
                          <div className="font-bold text-indigo-500">{payload[0].value?.toLocaleString()}</div>
                        </div>
                      ) : null
                    }
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#6366f1" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
  )
}

export default Graph
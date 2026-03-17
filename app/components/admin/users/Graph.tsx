import React from "react";
import { Users } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2 text-sm lg:text-base">
        <Users className="w-4 h-4 text-indigo-500" /> New Users — Last 7 Days
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Daily signups from Mar 11 to Mar 17
      </p>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart
          data={[
            { day: "Mon", users: 9 },
            { day: "Tue", users: 14 },
            { day: "Wed", users: 11 },
            { day: "Thu", users: 18 },
            { day: "Fri", users: 22 },
            { day: "Sat", users: 7 },
            { day: "Sun", users: 6 },
          ]}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                  <div className="text-slate-400 mb-1">{label}</div>
                  <div className="font-bold text-indigo-600">
                    {payload[0].value} new users
                  </div>
                </div>
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#userGrad)"
            dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-indigo-600">
            87
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Total This Week</div>
        </div>
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-emerald-600">
            12.4
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Avg / Day</div>
        </div>
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-amber-600">
            Fri
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Peak Day</div>
        </div>
      </div>
    </div>
  );
};

export default Graph;

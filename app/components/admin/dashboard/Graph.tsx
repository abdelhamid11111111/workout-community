import React from "react";
import { Trophy } from "lucide-react";
import {
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const Graph = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2 text-sm lg:text-base">
        <Trophy className="w-4 h-4 text-emerald-500" /> Users Joining Challenges
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Total new challenge joins per month
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={[
            { month: "Aug", joins: 84 },
            { month: "Sep", joins: 120 },
            { month: "Oct", joins: 98 },
            { month: "Nov", joins: 145 },
            { month: "Dec", joins: 110 },
            { month: "Jan", joins: 190 },
            { month: "Feb", joins: 174 },
            { month: "Mar", joins: 231 },
          ]}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="joinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#94a3b8", fontSize: 10 }}
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
                  <div className="font-bold text-emerald-600">
                    {payload[0].value} joins
                  </div>
                </div>
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="joins"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#joinGrad)"
            dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-emerald-600">
            1,152
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Total Joins</div>
        </div>
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-indigo-600">
            144
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Avg / Month</div>
        </div>
        <div className="text-center">
          <div className="text-lg lg:text-xl font-extrabold text-amber-600">
            +33%
          </div>
          <div className="text-xs text-slate-400 mt-0.5">vs Last Month</div>
        </div>
      </div>
    </div>
  );
};

export default Graph;

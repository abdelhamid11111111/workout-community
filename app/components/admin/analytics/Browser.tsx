import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Browser = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Browsers</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={[
            { browser: "Chrome", pct: 53.0, count: 6814, color: "#10b981" },
            { browser: "Safari", pct: 22.1, count: 2843, color: "#6366f1" },
            { browser: "Firefox", pct: 9.7, count: 1247, color: "#f97316" },
            { browser: "Edge", pct: 8.5, count: 1093, color: "#f59e0b" },
            { browser: "Others", pct: 6.6, count: 850, color: "#94a3b8" },
          ]}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="browser"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                  <div className="text-slate-400 mb-1">{label}</div>
                  <div className="font-bold text-slate-700">
                    {payload[0].value}% ·{" "}
                    {payload[0].payload.count.toLocaleString()} visits
                  </div>
                </div>
              ) : null
            }
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
            <Cell fill="#10b981" />
            <Cell fill="#6366f1" />
            <Cell fill="#f97316" />
            <Cell fill="#f59e0b" />
            <Cell fill="#94a3b8" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Browser;

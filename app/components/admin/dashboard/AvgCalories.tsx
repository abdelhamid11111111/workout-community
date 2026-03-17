import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AvgCalories = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <TrendingUp className="w-4 h-4 text-emerald-500" /> Avg Calories Burned
        per Category
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={[
            { category: "HIIT", avg: 480 },
            { category: "Cardio", avg: 410 },
            { category: "Running", avg: 390 },
            { category: "Strength", avg: 320 },
            { category: "Pilates", avg: 240 },
            { category: "Yoga", avg: 190 },
            { category: "Stretch", avg: 120 },
          ]}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            unit=" cal"
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                  <div className="text-slate-400 mb-1">{label}</div>
                  <div className="font-bold text-emerald-600">
                    {payload[0].value} kcal avg
                  </div>
                </div>
              ) : null
            }
          />
          <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
            <Cell fill="#f97316" />
            <Cell fill="#f43f5e" />
            <Cell fill="#14b8a6" />
            <Cell fill="#6366f1" />
            <Cell fill="#ec4899" />
            <Cell fill="#a855f7" />
            <Cell fill="#84cc16" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AvgCalories;

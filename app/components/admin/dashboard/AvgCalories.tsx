"use client";
import React, { useEffect, useState } from "react";
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

type CategoryBar = {
  category: string;
  avg: number;
  color: string;
};

// fixed order + color so the bars stay stable regardless of what the API returns
const CATEGORY_CONFIG: { key: string; label: string; color: string }[] = [
  { key: "HIIT", label: "HIIT", color: "#f97316" },
  { key: "Cardio", label: "Cardio", color: "#f43f5e" },
  { key: "Running", label: "Running", color: "#14b8a6" },
  { key: "Strength", label: "Strength", color: "#6366f1" },
  { key: "Pilates", label: "Pilates", color: "#ec4899" },
  { key: "Sports", label: "Sports", color: "#eab308" },
  { key: "Yoga", label: "Yoga", color: "#a855f7" },
  { key: "Stretching", label: "Stretch", color: "#84cc16" },
];

const AvgCalories = () => {
  const [avgByCategory, setAvgByCategory] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/dashboard/avgCalories");
      const data = await res.json();
      setAvgByCategory(data.avgByCategory ?? {});
    };
    fetchData();
  }, []);

  const chartData: CategoryBar[] = CATEGORY_CONFIG.map(({ key, label, color }) => ({
    category: label,
    avg: avgByCategory[key] ?? 0,
    color,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <TrendingUp className="w-4 h-4 text-emerald-500" /> Avg Calories Burned
        per Category
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
            {chartData.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AvgCalories;
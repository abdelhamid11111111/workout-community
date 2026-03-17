import React from "react";
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

const PostWorkout = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <span>💬</span> Post-Workout Feel
      </h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={[
            { feel: "V.Good", count: 3210 },
            { feel: "Good", count: 2840 },
            { feel: "Neutral", count: 1420 },
            { feel: "Bad", count: 620 },
            { feel: "V.Bad", count: 180 },
          ]}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="feel"
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
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                  <div className="text-slate-400 mb-1">{label}</div>
                  <div className="font-bold text-slate-700">
                    {payload[0]?.value?.toLocaleString()} workouts
                  </div>
                </div>
              ) : null
            }
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            <Cell fill="#22c55e" />
            <Cell fill="#84cc16" />
            <Cell fill="#94a3b8" />
            <Cell fill="#fb923c" />
            <Cell fill="#f43f5e" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostWorkout;

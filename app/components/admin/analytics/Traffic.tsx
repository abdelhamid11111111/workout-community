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

const Traffic = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Traffic Sources</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={[
                { name: "Direct", value: 36 },
                { name: "Google", value: 29.7 },
                { name: "Instagram", value: 13.6 },
                { name: "Facebook", value: 10 },
                { name: "Twitter/X", value: 7.3 },
                { name: "Other", value: 3.4 },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
            >
              <Cell fill="#6366f1" />
              <Cell fill="#10b981" />
              <Cell fill="#f59e0b" />
              <Cell fill="#f43f5e" />
              <Cell fill="#f97316" />
              <Cell fill="#a855f7" />
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                    <span className="font-bold text-slate-700">
                      {payload[0].name}:{" "}
                    </span>
                    <span className="text-slate-500">{payload[0].value}%</span>
                  </div>
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-indigo-500" />
            <span className="text-xs text-slate-500 flex-1">Direct</span>
            <span className="text-xs font-semibold text-slate-700">36%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-emerald-500" />
            <span className="text-xs text-slate-500 flex-1">Google</span>
            <span className="text-xs font-semibold text-slate-700">29.7%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-amber-500" />
            <span className="text-xs text-slate-500 flex-1">Instagram</span>
            <span className="text-xs font-semibold text-slate-700">13.6%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-rose-500" />
            <span className="text-xs text-slate-500 flex-1">Facebook</span>
            <span className="text-xs font-semibold text-slate-700">10%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-orange-500" />
            <span className="text-xs text-slate-500 flex-1">Twitter/X</span>
            <span className="text-xs font-semibold text-slate-700">7.3%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-purple-500" />
            <span className="text-xs text-slate-500 flex-1">Other</span>
            <span className="text-xs font-semibold text-slate-700">3.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;

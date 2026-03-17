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

const Devices = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Devices</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={[
                { name: "Mobile", value: 59.3 },
                { name: "Desktop", value: 33.4 },
                { name: "Tablet", value: 7.3 },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={4}
              dataKey="value"
            >
              <Cell fill="#6366f1" />
              <Cell fill="#10b981" />
              <Cell fill="#f59e0b" />
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
            <span className="text-xs text-slate-500 flex-1">Mobile</span>
            <span className="text-xs font-semibold text-slate-700">59.3%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-emerald-500" />
            <span className="text-xs text-slate-500 flex-1">Desktop</span>
            <span className="text-xs font-semibold text-slate-700">33.4%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-amber-500" />
            <span className="text-xs text-slate-500 flex-1">Tablet</span>
            <span className="text-xs font-semibold text-slate-700">7.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;

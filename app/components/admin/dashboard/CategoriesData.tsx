import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Heart } from "lucide-react";

const CategoriesData = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <Heart className="w-4 h-4 text-rose-400" /> Most Loved Categories
      </h3>
      <div className="flex items-center gap-3">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={[
                { name: "Cardio", value: 28 },
                { name: "Strength", value: 22 },
                { name: "Yoga", value: 18 },
                { name: "HIIT", value: 16 },
                { name: "Running", value: 10 },
                { name: "Pilates", value: 6 },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={62}
              paddingAngle={3}
              dataKey="value"
            >
              <Cell fill="#f43f5e" />
              <Cell fill="#6366f1" />
              <Cell fill="#a855f7" />
              <Cell fill="#f97316" />
              <Cell fill="#14b8a6" />
              <Cell fill="#ec4899" />
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
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Cardio</span>
            <span className="text-xs font-semibold text-slate-700">28%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Strength</span>
            <span className="text-xs font-semibold text-slate-700">22%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Yoga</span>
            <span className="text-xs font-semibold text-slate-700">18%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">HIIT</span>
            <span className="text-xs font-semibold text-slate-700">16%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Running</span>
            <span className="text-xs font-semibold text-slate-700">10%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Pilates</span>
            <span className="text-xs font-semibold text-slate-700">6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;

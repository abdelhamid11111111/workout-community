import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DeviceItem {
  name: string;
  value: number;
}

interface DevicesProps {
  data?: DeviceItem[];
}

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#a855f7"];
const COLOR_CLASSES = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500"];

const Devices = ({ data = [] }: DevicesProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Devices</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
                    <span className="font-bold text-slate-700">{payload[0].name}: </span>
                    <span className="text-slate-500">{payload[0].value}%</span>
                  </div>
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={item.name || index} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${COLOR_CLASSES[index % COLOR_CLASSES.length]}`} />
              <span className="text-xs text-slate-500 flex-1">{item.name}</span>
              <span className="text-xs font-semibold text-slate-700">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devices;
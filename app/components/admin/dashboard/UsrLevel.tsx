"use client";
import { Target } from "lucide-react";
import React, { useEffect, useState } from "react";

const UsrLevel = () => {
  const [total, setTotal] = useState(0);
  const [totalBeginner, setTotalBeginner] = useState(0);
  const [totalIntermediate, setTotalIntermediate] = useState(0);
  const [totalAdvanced, setTotalAdvanced] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/dashboard/usrLevel");
      const data = await res.json();
      setTotal(data.totalUsers);
      setTotalBeginner(data.countLevels.beginner ?? 0);
      setTotalIntermediate(data.countLevels.intermediate ?? 0);
      setTotalAdvanced(data.countLevels.advanced ?? 0);
    };
    fetchData();
  }, []);

  const beginnerPersentage = totalBeginner / total * 100
  const intermediatePersentage = totalIntermediate / total * 100
  const advancedPersentage = totalAdvanced / total * 100


  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <Target className="w-4 h-4 text-slate-400" /> User Levels
      </h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Beginner</span>
            <span className="text-slate-400">{totalBeginner} · {beginnerPersentage.toFixed(2)} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full"
              style={{ width: `${beginnerPersentage.toFixed(2)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Intermediate</span>
            <span className="text-slate-400">{totalIntermediate} · {intermediatePersentage.toFixed(2)} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${intermediatePersentage.toFixed(2)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Advanced</span>
            <span className="text-slate-400">{totalAdvanced} · {advancedPersentage.toFixed(2)} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-400 rounded-full"
              style={{ width: `${advancedPersentage.toFixed(2)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsrLevel;

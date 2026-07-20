"use client";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const WorkoutTime = () => {
  const [total, setTotal] = useState(0);
  const [totalNight, setTotalNight] = useState(0);
  const [totalEvening, setTotalEvening] = useState(0);
  const [totalMorning, setTotalMorning] = useState(0);
  const [totalAfternoon, setTotalAfternoon] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/dashboard/workoutTime");
      const data = await res.json();
      setTotal(data.totalUser);
      setTotalNight(data.countTimes.Night ?? 0);
      setTotalEvening(data.countTimes.Evening ?? 0);
      setTotalMorning(data.countTimes.Morning ?? 0);
      setTotalAfternoon(data.countTimes.Afternoon ?? 0);
    };
    fetchData();
  }, []);

  
  const percentageMorning = total > 0 ? (totalMorning / total * 100) : 0;
  const percentageEvening = total > 0 ? (totalEvening / total * 100) : 0;
  const percentageAfternoon = total > 0 ? (totalAfternoon / total * 100) : 0;
  const percentageNight = total > 0 ? (totalNight / total * 100) : 0;


  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm sm:col-span-2 lg:col-span-1">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <Clock className="w-4 h-4 text-slate-400" /> Favorite Workout Time
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌅</div>
          <div className="text-sm lg:text-base font-extrabold text-amber-600">
            {percentageMorning.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 font-medium">Morning</div>
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">☀️</div>
          <div className="text-sm lg:text-base font-extrabold text-sky-600">
            {percentageAfternoon.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 font-medium">Afternoon</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌆</div>
          <div className="text-sm lg:text-base font-extrabold text-indigo-600">
            {percentageEvening.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 font-medium">Evening</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌙</div>
          <div className="text-sm lg:text-base font-extrabold text-slate-600">
            {percentageNight.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 font-medium">Night</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTime;

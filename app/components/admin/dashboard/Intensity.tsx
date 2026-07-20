"use client"
import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const Intensity = () => {

  const [totalHigh, setTotalHigh] = useState(0)
  const [totalLow, setTotalLow] = useState(0)
  const [totalModerate, setTotalModerate] = useState(0)
  const [totalVeryHigh, setTotalVeryHigh] = useState(0)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    const fetchData =async () => {
      const res = await fetch('/api/admin/dashboard/intensity')
      const data = await res.json()
      setTotal(data.totalWorkout ?? 0)
      setTotalHigh(data.countIntensity.High ?? 0)
      setTotalLow(data.countIntensity.Low ?? 0)
      setTotalModerate(data.countIntensity.Moderate ?? 0)
      setTotalVeryHigh(data.countIntensity.Very ?? 0)
    }
    fetchData()
  },[])

  const persentageHigh = totalHigh / total * 100
  const persentageLow = totalLow / total * 100
  const persentageModerate = totalModerate / total * 100
  const persentageVeryHigh = totalVeryHigh / total * 100


  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <Zap className="w-4 h-4 text-amber-400" /> Workout Intensity
      </h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Low</span>
            <span className="text-slate-400">{persentageLow.toFixed(2) ?? 0} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full"
              style={{ width: `${persentageLow}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Moderate</span>
            <span className="text-slate-400">{persentageModerate.toFixed(2) ?? 0} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${persentageModerate}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">High</span>
            <span className="text-slate-400">{persentageHigh.toFixed(2) ?? 0} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full"
              style={{ width: `${persentageHigh}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Very High</span>
            <span className="text-slate-400">{persentageVeryHigh.toFixed(2) ?? 0} %</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full"
              style={{ width: `${persentageVeryHigh}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intensity;

"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Heart } from "lucide-react";

const CategoriesData = () => {
  const [totalJoiningChallenges, setTotalJoiningChallenges] = useState(0);
  const [totalCardio, setTotalCardio] = useState(0);
  const [totalStrength, setTotalStrength] = useState(0);
  const [totalYoga, setTotalYoga] = useState(0);
  const [totalHIIT, setTotalHIIT] = useState(0);
  const [totalPilates, setTotalPilates] = useState(0);
  const [totalStretching, setTotalStretching] = useState(0);
  const [totalSports, setTotalSports] = useState(0);
  const [totalRunning, setTotalRunning] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/dashboard/lovedCategories");
      const data = await res.json();
      setTotalJoiningChallenges(data.totalJoiningChallenges ?? 0);
      setTotalCardio(data.counts.Cardio ?? 0);
      setTotalStrength(data.counts.Strength ?? 0);
      setTotalYoga(data.counts.Yoga ?? 0);
      setTotalHIIT(data.counts.HIIT ?? 0);
      setTotalPilates(data.counts.Pilates ?? 0);
      setTotalStretching(data.counts.Stretching ?? 0);
      setTotalSports(data.counts.Sports ?? 0);
      setTotalRunning(data.counts.Running ?? 0);
    };
    fetchData();
  }, []);

  const cardioPercentage = (totalCardio / totalJoiningChallenges) * 100;
  const StrengthPercentage = (totalStrength / totalJoiningChallenges) * 100;
  const YogaPercentage = (totalYoga / totalJoiningChallenges) * 100;
  const HIITPercentage = (totalHIIT / totalJoiningChallenges) * 100;
  const PilatesPercentage = (totalPilates / totalJoiningChallenges) * 100;
  const StretchingPercentage = (totalStretching / totalJoiningChallenges) * 100;
  const SportsPercentage = (totalSports / totalJoiningChallenges) * 100;
  const RunningPercentage = (totalRunning / totalJoiningChallenges) * 100;

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
                { name: "Cardio", value: Number(cardioPercentage.toFixed(2)) },
                {
                  name: "Strength",
                  value: Number(StrengthPercentage.toFixed(2)),
                },
                { name: "Yoga", value: Number(YogaPercentage.toFixed(2)) },
                { name: "HIIT", value: Number(HIITPercentage.toFixed(2)) },
                {
                  name: "Running",
                  value: Number(RunningPercentage.toFixed(2)),
                },
                {
                  name: "Pilates",
                  value: Number(PilatesPercentage.toFixed(2)),
                },
                {
                  name: "Stretching",
                  value: Number(StretchingPercentage.toFixed(2)) 
                },
                { name: "Sports", value: Number(SportsPercentage.toFixed(2)) },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={62}
              paddingAngle={3}
              dataKey="value"
            >
              <Cell fill="#f43f5e" /> {/* Cardio - Rose 500 */}
              <Cell fill="#6366f1" /> {/* Strength - Indigo 500 */}
              <Cell fill="#a855f7" /> {/* Yoga - Purple 500 */}
              <Cell fill="#f97316" /> {/* HIIT - Orange 500 */}
              <Cell fill="#14b8a6" /> {/* Running - Teal 500 */}
              <Cell fill="#ec4899" /> {/* Pilates - Pink 500 */}
              <Cell fill="#8bb5f9" /> {/* Stretching - Blue 500 (New) */}
              <Cell fill="#eab308" /> {/* Sports - Yellow 500 (New) */}
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
            <span className="text-xs font-semibold text-slate-700">
              {(cardioPercentage ?? 0).toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Strength</span>
            <span className="text-xs font-semibold text-slate-700">
              {StrengthPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Yoga</span>
            <span className="text-xs font-semibold text-slate-700">
              {YogaPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">HIIT</span>
            <span className="text-xs font-semibold text-slate-700">
              {HIITPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Running</span>
            <span className="text-xs font-semibold text-slate-700">
              {RunningPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Pilates</span>
            <span className="text-xs font-semibold text-slate-700">
              {PilatesPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#eab308] shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Sports</span>
            <span className="text-xs font-semibold text-slate-700">
              {SportsPercentage.toFixed(2)} %
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8bb5f9] shrink-0" />
            <span className="text-xs text-slate-500 flex-1">Stretching</span>
            <span className="text-xs font-semibold text-slate-700">
              {StretchingPercentage.toFixed(2)} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;

import React from "react";
import {
  Trophy,
  Users,
  Flame,
  Dumbbell,
} from "lucide-react";

const Cards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
          <Users className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium leading-tight">
          Total Users
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-indigo-600 mt-1">
          1,284
        </div>
        <div className="text-xs text-emerald-500 font-semibold mt-1">
          +12% this month
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
          <Trophy className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium leading-tight">
          Challenges
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-emerald-600 mt-1">
          24
        </div>
        <div className="text-xs text-slate-400 font-medium mt-1">18 active</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
          <Dumbbell className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium leading-tight">
          Workouts
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-amber-600 mt-1">
          8,431
        </div>
        <div className="text-xs text-emerald-500 font-semibold mt-1">
          +8% this week
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
          <Flame className="w-4 h-4 text-rose-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium leading-tight">
          Calories
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-rose-600 mt-1">
          2.1M
        </div>
        <div className="text-xs text-slate-400 font-medium mt-1">all time</div>
      </div>
    </div>
  );
};

export default Cards;

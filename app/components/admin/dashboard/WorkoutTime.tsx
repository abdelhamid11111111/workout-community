import { Clock } from "lucide-react";
import React from "react";

const WorkoutTime = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm sm:col-span-2 lg:col-span-1">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
        <Clock className="w-4 h-4 text-slate-400" /> Favorite Workout Time
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌅</div>
          <div className="text-sm lg:text-base font-extrabold text-amber-600">
            38%
          </div>
          <div className="text-xs text-slate-500 font-medium">Morning</div>
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">☀️</div>
          <div className="text-sm lg:text-base font-extrabold text-sky-600">
            24%
          </div>
          <div className="text-xs text-slate-500 font-medium">Afternoon</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌆</div>
          <div className="text-sm lg:text-base font-extrabold text-indigo-600">
            29%
          </div>
          <div className="text-xs text-slate-500 font-medium">Evening</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 lg:p-3 text-center">
          <div className="text-lg mb-1">🌙</div>
          <div className="text-sm lg:text-base font-extrabold text-slate-600">
            9%
          </div>
          <div className="text-xs text-slate-500 font-medium">Night</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTime;

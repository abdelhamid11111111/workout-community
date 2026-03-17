import React from "react";

const TopPages = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Top Pages</h3>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">/</div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: "57.2%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          7,342
        </div>
        <div className="w-10 text-right text-xs text-slate-400">57.2%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          /challenges
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: "17%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          2,189
        </div>
        <div className="w-10 text-right text-xs text-slate-400">17%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          /my-challenges
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500"
            style={{ width: "11.1%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          1,421
        </div>
        <div className="w-10 text-right text-xs text-slate-400">11.1%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          /leaderboard
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-rose-500"
            style={{ width: "7.7%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          984
        </div>
        <div className="w-10 text-right text-xs text-slate-400">7.7%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          /sign-up
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: "4%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          511
        </div>
        <div className="w-10 text-right text-xs text-slate-400">4%</div>
      </div>
    </div>
  );
};

export default TopPages;

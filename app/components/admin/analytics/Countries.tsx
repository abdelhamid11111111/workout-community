import React from "react";

const Countries = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Top Countries</h3>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          Morocco
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: "45.5%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          5,842
        </div>
        <div className="w-10 text-right text-xs text-slate-400">45.5%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          France
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: "18.1%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          2,319
        </div>
        <div className="w-10 text-right text-xs text-slate-400">18.1%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          Spain
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500"
            style={{ width: "11.1%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          1,428
        </div>
        <div className="w-10 text-right text-xs text-slate-400">11.1%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          Germany
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-rose-500"
            style={{ width: "7.7%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          987
        </div>
        <div className="w-10 text-right text-xs text-slate-400">7.7%</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-28 text-xs text-slate-500 text-right truncate">
          United States
        </div>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: "5%" }}
          />
        </div>
        <div className="w-14 text-right text-xs font-semibold text-slate-700">
          641
        </div>
        <div className="w-10 text-right text-xs text-slate-400">5%</div>
      </div>
    </div>
  );
};

export default Countries;

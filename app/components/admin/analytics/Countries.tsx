import React from "react";

interface CountryItem {
  country: string;
  count: string;
  pct: string;
}

interface CountriesProps {
  data?: CountryItem[];
}

const COLORS = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-orange-500"];

const Countries = ({ data = [] }: CountriesProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Top Countries</h3>

      {data.length === 0 ? (
        <div className="text-xs text-slate-400 py-4 text-center">No country data available</div>
      ) : (
        data.map((item, idx) => (
          <div key={item.country || idx} className="flex items-center gap-3 mb-3">
            <div className="w-28 text-xs text-slate-500 text-right truncate">
              {item.country}
            </div>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${COLORS[idx % COLORS.length]}`}
                style={{ width: item.pct }}
              />
            </div>
            <div className="w-14 text-right text-xs font-semibold text-slate-700">
              {item.count}
            </div>
            <div className="w-10 text-right text-xs text-slate-400">{item.pct}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Countries;
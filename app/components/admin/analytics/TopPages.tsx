import React from "react";

interface PageItem {
  path: string;
  views: string;
  pct: string;
}

interface TopPagesProps {
  data?: PageItem[];
}

const COLORS = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-orange-500"];

const TopPages = ({ data = [] }: TopPagesProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-5">Top Pages</h3>

      {data.length === 0 ? (
        <div className="text-xs text-slate-400 py-4 text-center">No page view data available</div>
      ) : (
        data.map((item, idx) => (
          <div key={item.path || idx} className="flex items-center gap-3 mb-3">
            <div className="w-28 text-xs text-slate-500 text-right truncate">
              {item.path}
            </div>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${COLORS[idx % COLORS.length]}`}
                style={{ width: item.pct }}
              />
            </div>
            <div className="w-14 text-right text-xs font-semibold text-slate-700">
              {item.views}
            </div>
            <div className="w-10 text-right text-xs text-slate-400">{item.pct}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default TopPages;
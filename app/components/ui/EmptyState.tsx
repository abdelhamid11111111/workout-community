

import {  SearchX } from "lucide-react";





export const EmptyChallenges = ({ onClear }: { onClear: () => void }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
    <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6">
      <SearchX className="w-9 h-9 text-emerald-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">
      No challenges found
    </h3>
    <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
      We couldn&apos;t find any challenges matching your search. Try adjusting your filters or search term.
    </p>
    <button
      onClick={onClear}
      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
    >
      Clear filters
    </button>
  </div>
);

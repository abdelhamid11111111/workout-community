import React from "react";
import { MousePointerClick, Clock, Users, ArrowUpRight } from "lucide-react";

const Cards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-indigo-100">
          <Users className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Total Visitors
        </div>
        <div className="text-3xl font-extrabold mt-1 mb-2 text-indigo-500">
          12,847
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-100">
          <MousePointerClick className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Unique Sessions
        </div>
        <div className="text-3xl font-extrabold mt-1 mb-2 text-emerald-500">
          9,321
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-amber-100">
          <Clock className="w-5 h-5 text-amber-500" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Avg. Session
        </div>
        <div className="text-3xl font-extrabold mt-1 mb-2 text-amber-500">
          2m 41s
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-rose-100">
          <ArrowUpRight className="w-5 h-5 text-rose-500" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Bounce Rate
        </div>
        <div className="text-3xl font-extrabold mt-1 mb-2 text-rose-500">
          38.4%
        </div>
      </div>
    </div>
  );
};

export default Cards;

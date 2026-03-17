import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopChall = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
      <div className="px-4 lg:px-6 py-4 lg:py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm lg:text-base">
          <Trophy className="w-4 h-4 text-amber-400" /> Top Challenges
        </h3>
        <Link
          href="/challenges"
          className="text-xs text-emerald-600 font-semibold flex items-center gap-1 hover:underline"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {/* Mobile cards */}
      <div className="block lg:hidden divide-y divide-slate-100">
        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                30-Day Cardio Blast
              </div>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                  Cardio
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">
                  Active
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-amber-600 text-sm">
                500 pts
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                142 users · 30d
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                Strength Foundation
              </div>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                  Strength
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">
                  Active
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-amber-600 text-sm">
                750 pts
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                98 users · 21d
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                Morning Yoga Flow
              </div>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                  Yoga
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">
                  Active
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-amber-600 text-sm">
                300 pts
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                211 users · 14d
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                HIIT Inferno
              </div>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  HIIT
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">
                  Active
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-amber-600 text-sm">
                1,000 pts
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                74 users · 28d
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                5K Running Plan
              </div>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">
                  Running
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                  Inactive
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-amber-600 text-sm">
                850 pts
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                56 users · 42d
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="text-left px-6 py-3 font-medium">Challenge</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Level</th>
              <th className="text-right px-4 py-3 font-medium">Days</th>
              <th className="text-right px-4 py-3 font-medium">Participants</th>
              <th className="text-right px-6 py-3 font-medium">Reward</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">
                  30-Day Cardio Blast
                </div>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600">
                  Cardio
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
              </td>
              <td className="px-4 py-4 text-right text-slate-600 font-medium">
                30d
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                142
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                500 pts
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">
                  Strength Foundation
                </div>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600">
                  Strength
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
              </td>
              <td className="px-4 py-4 text-right text-slate-600 font-medium">
                21d
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                98
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                750 pts
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">
                  Morning Yoga Flow
                </div>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600">
                  Yoga
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
              </td>
              <td className="px-4 py-4 text-right text-slate-600 font-medium">
                14d
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                211
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                300 pts
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">HIIT Inferno</div>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                  HIIT
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
              </td>
              <td className="px-4 py-4 text-right text-slate-600 font-medium">
                28d
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                74
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                1,000 pts
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">
                  5K Running Plan
                </div>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">
                  Inactive
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700">
                  Running
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
              </td>
              <td className="px-4 py-4 text-right text-slate-600 font-medium">
                42d
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                56
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                850 pts
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopChall;

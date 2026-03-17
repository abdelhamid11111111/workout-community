import React from "react";
import {
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const TopUsrs = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
      <div className="px-4 lg:px-6 py-4 lg:py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm lg:text-base">
          <Star className="w-4 h-4 text-amber-400" /> Top Users
        </h3>
        <Link
          href="/users"
          className="text-xs text-emerald-600 font-semibold flex items-center gap-1 hover:underline"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {/* Mobile cards view */}
      <div className="block lg:hidden divide-y divide-slate-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              S
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                sara_fit
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
                <span className="text-xs text-slate-400">Morning</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-emerald-600 text-sm">
              2,340 pts
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              8 challenges · 47 workouts
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              M
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                mo_lifts
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
                <span className="text-xs text-slate-400">Evening</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-emerald-600 text-sm">
              1,580 pts
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              5 challenges · 31 workouts
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              L
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                lina_yoga
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
                <span className="text-xs text-slate-400">Morning</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-emerald-600 text-sm">
              720 pts
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              3 challenges · 18 workouts
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              K
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                karim_run
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
                <span className="text-xs text-slate-400">Afternoon</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-emerald-600 text-sm">
              3,100 pts
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              11 challenges · 63 workouts
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              N
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                nadia_hiit
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
                <span className="text-xs text-slate-400">Night</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-emerald-600 text-sm">
              1,420 pts
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              6 challenges · 29 workouts
            </div>
          </div>
        </div>
      </div>
      {/* Desktop table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="text-left px-6 py-3 font-medium">User</th>
              <th className="text-left px-4 py-3 font-medium">Level</th>
              <th className="text-left px-4 py-3 font-medium">Time</th>
              <th className="text-right px-4 py-3 font-medium">Challenges</th>
              <th className="text-right px-4 py-3 font-medium">Workouts</th>
              <th className="text-right px-6 py-3 font-medium">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">sara_fit</div>
                    <div className="text-xs text-slate-400">
                      sara@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">Morning</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                8
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                47
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                2,340
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">mo_lifts</div>
                    <div className="text-xs text-slate-400">mo@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">Evening</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                5
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                31
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                1,580
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    L
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      lina_yoga
                    </div>
                    <div className="text-xs text-slate-400">
                      lina@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  beginner
                </span>
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">Morning</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                3
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                18
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                720
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold">
                    K
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      karim_run
                    </div>
                    <div className="text-xs text-slate-400">
                      karim@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                  advanced
                </span>
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">Afternoon</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                11
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                63
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                3,100
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    N
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      nadia_hiit
                    </div>
                    <div className="text-xs text-slate-400">
                      nadia@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  intermediate
                </span>
              </td>
              <td className="px-4 py-4 text-slate-500 text-xs">Night</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                6
              </td>
              <td className="px-4 py-4 text-right font-semibold text-slate-700">
                29
              </td>
              <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                1,420
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopUsrs;

import { ChevronDown, Filter, Search } from "lucide-react";
import React from "react";

const Table = () => {
  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by username or email..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Level{" "}
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            Time <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Mobile card list */}
        <div className="block lg:hidden divide-y divide-slate-100">
          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                S
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  sara_fit
                </div>
                <div className="text-xs text-slate-400 truncate">
                  sara@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    advanced
                  </span>
                  <span className="text-xs text-slate-400">🌅 Morning</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                8 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">47 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Mar 1, 2026</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                M
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  mo_lifts
                </div>
                <div className="text-xs text-slate-400 truncate">
                  mo@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    intermediate
                  </span>
                  <span className="text-xs text-slate-400">🌆 Evening</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                5 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">31 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Feb 14, 2026</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                L
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  lina_yoga
                </div>
                <div className="text-xs text-slate-400 truncate">
                  lina@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    beginner
                  </span>
                  <span className="text-xs text-slate-400">🌅 Morning</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                3 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">18 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Jan 22, 2026</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                K
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  karim_run
                </div>
                <div className="text-xs text-slate-400 truncate">
                  karim@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    advanced
                  </span>
                  <span className="text-xs text-slate-400">☀️ Afternoon</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                11 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">63 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Dec 5, 2025</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                N
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  nadia_hiit
                </div>
                <div className="text-xs text-slate-400 truncate">
                  nadia@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    intermediate
                  </span>
                  <span className="text-xs text-slate-400">🌙 Night</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                6 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">29 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Nov 18, 2025</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                A
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  adam_strong
                </div>
                <div className="text-xs text-slate-400 truncate">
                  adam@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    beginner
                  </span>
                  <span className="text-xs text-slate-400">🌅 Morning</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                2 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">9 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Mar 10, 2026</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                R
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  rania_flex
                </div>
                <div className="text-xs text-slate-400 truncate">
                  rania@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    intermediate
                  </span>
                  <span className="text-xs text-slate-400">🌆 Evening</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                4 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">22 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Mar 15, 2026</div>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                Y
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">
                  youssef_pb
                </div>
                <div className="text-xs text-slate-400 truncate">
                  youssef@example.com
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    advanced
                  </span>
                  <span className="text-xs text-slate-400">☀️ Afternoon</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-slate-600">
                9 challenges
              </div>
              <div className="text-xs text-slate-400 mt-0.5">54 workouts</div>
              <div className="text-xs text-slate-400 mt-0.5">Oct 3, 2025</div>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/60">
                <th className="text-left px-6 py-3 font-medium">User</th>
                <th className="text-left px-4 py-3 font-medium">Level</th>
                <th className="text-left px-4 py-3 font-medium">Goals</th>
                <th className="text-left px-4 py-3 font-medium">
                  Workout Time
                </th>
                <th className="text-right px-4 py-3 font-medium">Challenges</th>
                <th className="text-right px-4 py-3 font-medium">Workouts</th>
                <th className="text-right px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        sara_fit
                      </div>
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
                <td className="px-4 py-4 text-xs text-slate-500">
                  Lose weight, Tone up
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌅 Morning</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  8
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  47
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Mar 1, 2026
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        mo_lifts
                      </div>
                      <div className="text-xs text-slate-400">
                        mo@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                    intermediate
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  Build muscle, Strength
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌆 Evening</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  5
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  31
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Feb 14, 2026
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                <td className="px-4 py-4 text-xs text-slate-500">
                  Flexibility, Mindfulness
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌅 Morning</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  3
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  18
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Jan 22, 2026
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                <td className="px-4 py-4 text-xs text-slate-500">
                  Run 5K, Endurance
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  ☀️ Afternoon
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  11
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  63
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Dec 5, 2025
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                <td className="px-4 py-4 text-xs text-slate-500">
                  Fat burn, Stamina
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌙 Night</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  6
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  29
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Nov 18, 2025
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        adam_strong
                      </div>
                      <div className="text-xs text-slate-400">
                        adam@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    beginner
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  Get fit, Stay active
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌅 Morning</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  2
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  9
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Mar 10, 2026
                </td>
              </tr>

              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        rania_flex
                      </div>
                      <div className="text-xs text-slate-400">
                        rania@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                    intermediate
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  Stretch daily, Core
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">🌆 Evening</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  4
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  22
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Mar 15, 2026
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      Y
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        youssef_pb
                      </div>
                      <div className="text-xs text-slate-400">
                        youssef@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                    advanced
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  Personal best, Power
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  ☀️ Afternoon
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  9
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-700">
                  54
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400">
                  Oct 3, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Showing 8 of 1,284 users
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              Prev
            </button>
            <button className="px-3 py-1.5 text-xs bg-indigo-600 border border-indigo-600 rounded-lg text-white font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

"use client";
import Sidebar from "@/app/components/admin/SideBar";
import { Search, Filter, ChevronDown, Pencil, Trash2, Plus, X } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">Challenges</h1>
              <p className="mt-1 text-slate-500 text-sm">12 total challenges</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm self-start sm:self-auto">
              <Plus className="w-4 h-4" /> New Challenge
            </button>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">

            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Category <ChevronDown className="w-3 h-3" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              Level <ChevronDown className="w-3 h-3" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              Status <ChevronDown className="w-3 h-3" />
            </button>

          </div>

          <div className="text-xs text-slate-400 mb-3">Showing 6 of 12 results</div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Mobile cards */}
            <div className="block lg:hidden divide-y divide-slate-100">

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">30-Day Cardio Blast</div>
                  <div className="text-xs text-slate-400 mt-0.5">Burn it all</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">Cardio</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">beginner</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Active</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">30d · 500 pts · 142 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">Strength Foundation</div>
                  <div className="text-xs text-slate-400 mt-0.5">Build your base</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">Strength</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">intermediate</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Active</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">21d · 750 pts · 98 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">Morning Yoga Flow</div>
                  <div className="text-xs text-slate-400 mt-0.5">Start calm</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">Yoga</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">beginner</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Active</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">14d · 300 pts · 211 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">HIIT Inferno</div>
                  <div className="text-xs text-slate-400 mt-0.5">Push the limit</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">HIIT</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">advanced</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Active</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">28d · 1,000 pts · 74 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">5K Running Plan</div>
                  <div className="text-xs text-slate-400 mt-0.5">Hit the road</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">Running</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">intermediate</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Inactive</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">42d · 850 pts · 56 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="px-4 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">Core Crusher</div>
                  <div className="text-xs text-slate-400 mt-0.5">Abs of steel</div>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">HIIT</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">intermediate</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Active</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">21d · 600 pts · 88 users</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/60">
                    <th className="text-left px-6 py-3 font-medium">Challenge</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Level</th>
                    <th className="text-right px-4 py-3 font-medium">Days</th>
                    <th className="text-right px-4 py-3 font-medium">Reward</th>
                    <th className="text-right px-4 py-3 font-medium">Users</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Created</th>
                    <th className="text-right px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">30-Day Cardio Blast</div>
                      <div className="text-xs text-slate-400 mt-0.5">Burn it all</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600">Cardio</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">beginner</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">30d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">500</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">142</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Jan 10, 2026</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">Strength Foundation</div>
                      <div className="text-xs text-slate-400 mt-0.5">Build your base</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600">Strength</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">intermediate</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">21d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">750</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">98</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Jan 18, 2026</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">Morning Yoga Flow</div>
                      <div className="text-xs text-slate-400 mt-0.5">Start calm</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600">Yoga</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">beginner</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">14d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">300</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">211</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Feb 2, 2026</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">HIIT Inferno</div>
                      <div className="text-xs text-slate-400 mt-0.5">Push the limit</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">HIIT</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">advanced</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">28d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">1,000</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">74</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Feb 11, 2026</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">5K Running Plan</div>
                      <div className="text-xs text-slate-400 mt-0.5">Hit the road</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700">Running</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">intermediate</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">42d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">850</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">56</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">Inactive</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Nov 5, 2025</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">Core Crusher</div>
                      <div className="text-xs text-slate-400 mt-0.5">Abs of steel</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">HIIT</span></td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">intermediate</span></td>
                    <td className="px-4 py-4 text-right font-medium text-slate-700">21d</td>
                    <td className="px-4 py-4 text-right font-extrabold text-amber-600">600</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">88</td>
                    <td className="px-4 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span></td>
                    <td className="px-4 py-4 text-xs text-slate-400">Feb 20, 2026</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-400">Page 1 of 2 · 12 results</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-400 opacity-40 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1.5 text-xs bg-emerald-600 border border-emerald-600 rounded-lg text-white font-semibold">1</button>
                <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">2</button>
                <button className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">Next</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
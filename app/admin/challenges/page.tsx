"use client";
import Sidebar from "@/app/components/admin/SideBar";
import { useState } from "react";
import { Search, Filter, ChevronDown, Pencil, Trash2, Plus, X, Check } from "lucide-react";

const INITIAL_CHALLENGES = [
  { id: "1", title: "30-Day Cardio Blast", subtitle: "Burn it all", category: "Cardio", level: "beginner", days: 30, rewardPoints: 500, active: true, participants: 142, createdAt: "Jan 10, 2026" },
  { id: "2", title: "Strength Foundation", subtitle: "Build your base", category: "Strength", level: "intermediate", days: 21, rewardPoints: 750, active: true, participants: 98, createdAt: "Jan 18, 2026" },
  { id: "3", title: "Morning Yoga Flow", subtitle: "Start calm", category: "Yoga", level: "beginner", days: 14, rewardPoints: 300, active: true, participants: 211, createdAt: "Feb 2, 2026" },
  { id: "4", title: "HIIT Inferno", subtitle: "Push the limit", category: "HIIT", level: "advanced", days: 28, rewardPoints: 1000, active: true, participants: 74, createdAt: "Feb 11, 2026" },
  { id: "5", title: "5K Running Plan", subtitle: "Hit the road", category: "Running", level: "intermediate", days: 42, rewardPoints: 850, active: false, participants: 56, createdAt: "Nov 5, 2025" },
  { id: "6", title: "Core Crusher", subtitle: "Abs of steel", category: "HIIT", level: "intermediate", days: 21, rewardPoints: 600, active: true, participants: 88, createdAt: "Feb 20, 2026" },
  { id: "7", title: "Pilates Reset", subtitle: "Align your body", category: "Pilates", level: "beginner", days: 10, rewardPoints: 250, active: true, participants: 134, createdAt: "Mar 1, 2026" },
  { id: "8", title: "Advanced Stretching", subtitle: "Full mobility", category: "Stretching", level: "advanced", days: 7, rewardPoints: 200, active: false, participants: 41, createdAt: "Oct 14, 2025" },
  { id: "9", title: "Sports Circuit", subtitle: "All-round athlete", category: "Sports", level: "advanced", days: 35, rewardPoints: 950, active: true, participants: 62, createdAt: "Dec 3, 2025" },
  { id: "10", title: "Beginner Cardio", subtitle: "First steps", category: "Cardio", level: "beginner", days: 14, rewardPoints: 300, active: true, participants: 190, createdAt: "Mar 10, 2026" },
  { id: "11", title: "Power Lifting Intro", subtitle: "Heavy and safe", category: "Strength", level: "intermediate", days: 28, rewardPoints: 700, active: false, participants: 33, createdAt: "Sep 22, 2025" },
  { id: "12", title: "Zen Yoga", subtitle: "Peace of mind", category: "Yoga", level: "beginner", days: 21, rewardPoints: 350, active: true, participants: 175, createdAt: "Mar 14, 2026" },
];

const CATEGORY_COLORS = {
  Cardio: "bg-red-100 text-red-600",
  Strength: "bg-indigo-100 text-indigo-600",
  Yoga: "bg-purple-100 text-purple-600",
  HIIT: "bg-orange-100 text-orange-700",
  Running: "bg-teal-100 text-teal-700",
  Pilates: "bg-pink-100 text-pink-600",
  Stretching: "bg-lime-100 text-lime-700",
  Sports: "bg-sky-100 text-sky-600",
};

const LEVEL_COLORS = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-rose-100 text-rose-700",
};

const PAGE_SIZE = 6;

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLevel, setFilterLevel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showCategoryDrop, setShowCategoryDrop] = useState(false);
  const [showLevelDrop, setShowLevelDrop] = useState(false);
  const [showStatusDrop, setShowStatusDrop] = useState(false);

  // Filter + search
  const filtered = challenges.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subtitle?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "All" || c.category === filterCategory;
    const matchLevel = filterLevel === "All" || c.level === filterLevel;
    const matchStatus = filterStatus === "All" || (filterStatus === "Active" ? c.active : !c.active);
    return matchSearch && matchCategory && matchLevel && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditForm({ title: c.title, subtitle: c.subtitle, category: c.category, level: c.level, days: c.days, rewardPoints: c.rewardPoints, active: c.active });
  };

  const saveEdit = (id) => {
    setChallenges((prev) => prev.map((c) => c.id === id ? { ...c, ...editForm } : c));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const deleteChallenge = (id) => {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
  };

  const resetFilters = () => {
    setSearch("");
    setFilterCategory("All");
    setFilterLevel("All");
    setFilterStatus("All");
    setPage(1);
  };

  const hasFilters = search || filterCategory !== "All" || filterLevel !== "All" || filterStatus !== "All";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">Challenges</h1>
              <p className="mt-1 text-slate-500 text-sm">{challenges.length} total challenges</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm self-start sm:self-auto">
              <Plus className="w-4 h-4" /> New Challenge
            </button>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">

            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search challenges..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            {/* Category filter */}
            <div className="relative">
              <button
                onClick={() => { setShowCategoryDrop(!showCategoryDrop); setShowLevelDrop(false); setShowStatusDrop(false); }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                {filterCategory === "All" ? "Category" : filterCategory}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showCategoryDrop && (
                <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[140px]">
                  {["All", "Cardio", "Strength", "Yoga", "HIIT", "Running", "Pilates", "Stretching", "Sports"].map((cat) => (
                    <button key={cat} onClick={() => { setFilterCategory(cat); setShowCategoryDrop(false); setPage(1); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${filterCategory === cat ? "text-emerald-600 font-semibold" : "text-slate-600"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Level filter */}
            <div className="relative">
              <button
                onClick={() => { setShowLevelDrop(!showLevelDrop); setShowCategoryDrop(false); setShowStatusDrop(false); }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {filterLevel === "All" ? "Level" : filterLevel}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLevelDrop && (
                <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[130px]">
                  {["All", "beginner", "intermediate", "advanced"].map((lv) => (
                    <button key={lv} onClick={() => { setFilterLevel(lv); setShowLevelDrop(false); setPage(1); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors capitalize ${filterLevel === lv ? "text-emerald-600 font-semibold" : "text-slate-600"}`}>
                      {lv}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status filter */}
            <div className="relative">
              <button
                onClick={() => { setShowStatusDrop(!showStatusDrop); setShowCategoryDrop(false); setShowLevelDrop(false); }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {filterStatus === "All" ? "Status" : filterStatus}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showStatusDrop && (
                <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[120px]">
                  {["All", "Active", "Inactive"].map((s) => (
                    <button key={s} onClick={() => { setFilterStatus(s); setShowStatusDrop(false); setPage(1); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${filterStatus === s ? "text-emerald-600 font-semibold" : "text-slate-600"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button onClick={resetFilters} className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-400 hover:text-rose-500 transition-colors">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs text-slate-400 mb-3">
            Showing {paginated.length} of {filtered.length} results
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Mobile cards */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {paginated.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-slate-400">No challenges found.</div>
              )}
              {paginated.map((c) => (
                <div key={c.id} className="px-4 py-4">
                  {editingId === c.id ? (
                    <div className="space-y-2">
                      <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Title" />
                      <input value={editForm.subtitle} onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Subtitle" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="number" value={editForm.days} onChange={(e) => setEditForm({ ...editForm, days: Number(e.target.value) })}
                          className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Days" />
                        <input type="number" value={editForm.rewardPoints} onChange={(e) => setEditForm({ ...editForm, rewardPoints: Number(e.target.value) })}
                          className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Points" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(c.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                          <Check className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={cancelEdit} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 text-sm truncate">{c.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{c.subtitle}</div>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[c.category]}`}>{c.category}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[c.level]}`}>{c.level}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                            {c.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{c.days}d · {c.rewardPoints} pts · {c.participants} users</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => startEdit(c)} className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirmId === c.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => deleteChallenge(c.id)} className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteConfirmId(null)} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirmId(c.id)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-sm text-slate-400">No challenges found.</td>
                    </tr>
                  )}
                  {paginated.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      {editingId === c.id ? (
                        <>
                          <td className="px-6 py-3" colSpan={2}>
                            <div className="flex gap-2">
                              <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Title" />
                              <input value={editForm.subtitle} onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                                className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Subtitle" />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <select value={editForm.level} onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                              className="px-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300">
                              <option value="beginner">beginner</option>
                              <option value="intermediate">intermediate</option>
                              <option value="advanced">advanced</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" value={editForm.days} onChange={(e) => setEditForm({ ...editForm, days: Number(e.target.value) })}
                              className="w-16 px-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" value={editForm.rewardPoints} onChange={(e) => setEditForm({ ...editForm, rewardPoints: Number(e.target.value) })}
                              className="w-20 px-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                          </td>
                          <td className="px-4 py-3 text-right text-slate-400 text-xs">{c.participants}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => setEditForm({ ...editForm, active: !editForm.active })}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${editForm.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                              {editForm.active ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">{c.createdAt}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => saveEdit(c.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                                <Check className="w-3.5 h-3.5" /> Save
                              </button>
                              <button onClick={cancelEdit} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                                <X className="w-3.5 h-3.5" /> Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{c.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{c.subtitle}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[c.category]}`}>{c.category}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[c.level]}`}>{c.level}</span>
                          </td>
                          <td className="px-4 py-4 text-right font-medium text-slate-700">{c.days}d</td>
                          <td className="px-4 py-4 text-right font-extrabold text-amber-600">{c.rewardPoints}</td>
                          <td className="px-4 py-4 text-right font-semibold text-slate-700">{c.participants}</td>
                          <td className="px-4 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                              {c.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-400">{c.createdAt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => startEdit(c)} className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Pencil className="w-4 h-4" />
                              </button>
                              {deleteConfirmId === c.id ? (
                                <div className="flex gap-1">
                                  <button onClick={() => deleteChallenge(c.id)} className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors" title="Confirm delete">
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => setDeleteConfirmId(null)} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors" title="Cancel">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirmId(c.id)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-400">
                Page {page} of {totalPages || 1} · {filtered.length} results
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${page === p ? "bg-emerald-600 border-emerald-600 text-white font-semibold" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
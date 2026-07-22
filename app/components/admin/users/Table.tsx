import { ApiRes2, pagination, User } from "@/app/types/types";
import { ChevronDown, Filter, Search, UserIcon, Users, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { levelStyles } from "../../../colors/data";

const ITEMS_PER_PAGE = 8;

const Table = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async (params: URLSearchParams) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/users/table?${params.toString()}`);
        const data: ApiRes2 = await res.json();
        setUsers(data.data);
        setPaginationInfo(data.pagination);
      } catch (error) {
        console.error("failed loading", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(searchParams);
  }, [searchParams]);

  useEffect(() => {
    const load = () => {
      setSearch(searchParams.get("search") || "");
      setCurrentPage(Number(searchParams.get("page") || "1"));
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPages >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`/admin/users?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("level");
    params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`, { scroll: false });
  };

  const generatePages = () => {
    if (!paginationInfo) return [];
    const { currentPage, totalPages } = paginationInfo;
    const items: (string | number)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (currentPage <= 3) {
        items.push(2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 2) {
        items.push(
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        items.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return items;
  };

  const isEmpty = !loading && users.length === 0;
  const hasActiveFilters = Boolean(
    searchParams.get("search") || searchParams.get("level"),
  );

  // how many blank rows/cards we need to pad with so the widget
  // stays the same height whether the page has 1 result or 8
  const emptyRowsCount =
    !loading && users.length > 0 && users.length < ITEMS_PER_PAGE
      ? ITEMS_PER_PAGE - users.length
      : 0;

  // fixed row height so real rows and padding rows match exactly
  const ROW_HEIGHT = "h-[68px]";

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              const params = new URLSearchParams(searchParams.toString());
              if (value) params.set("search", value);
              else params.delete("search");
              params.set("page", "1");
              router.push(`/admin/users?${params.toString()}`, {
                scroll: false,
              });
            }}
            placeholder="Search by username..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) params.set("level", value);
                else params.delete("level");
                params.set("page", "1");
                router.push(`/admin/users?${params.toString()}`, {
                  scroll: false,
                });
              }}
              className="appearance-none pl-9 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Mobile card list */}
        {!isEmpty && (
          <div className="block lg:hidden divide-y divide-slate-100">
            {users.map((user) => (
              <div
                key={user.id}
                className="px-4 py-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.name ?? "Profile"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 text-sm truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelStyles[user.currentLevel as keyof typeof levelStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {user.currentLevel}
                      </span>
                      <span className="text-xs text-slate-400">
                        {user.workoutTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold text-slate-600">
                    {user._count.challenges} challenges
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {user._count.workouts} workouts
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop table */}
        {!isEmpty && (
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left px-6 py-3 font-medium">User</th>
                  <th className="text-left px-4 py-3 font-medium">Level</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Workout Time
                  </th>
                  <th className="text-right px-4 py-3 font-medium">
                    Challenges
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Workouts</th>
                  <th className="text-right px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${ROW_HEIGHT}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={user.name ?? "Profile"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-slate-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${levelStyles[user.currentLevel as keyof typeof levelStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {user.currentLevel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {user.workoutTime}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">
                      {user._count.challenges}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-700">
                      {user._count.workouts}
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}

                {/* Padding rows so the table keeps a fixed height even with < 8 results */}
                {Array.from({ length: emptyRowsCount }).map((_, i) => (
                  <tr
                    key={`empty-${i}`}
                    className={`border-b border-slate-50 ${ROW_HEIGHT}`}
                  >
                    <td colSpan={6}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center text-center px-6 py-20">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              {hasActiveFilters ? (
                <Search className="w-7 h-7 text-indigo-400" />
              ) : (
                <Users className="w-7 h-7 text-indigo-400" />
              )}
            </div>
            <h3 className="text-sm font-semibold text-slate-700">
              {hasActiveFilters ? "No matching users" : "No users yet"}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs">
              {hasActiveFilters
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Once people sign up, they'll show up here."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {paginationInfo && paginationInfo.totalPages > 1 && (
          <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Showing {paginationInfo.offset + 1} to{" "}
              {paginationInfo.offset + users.length} of{" "}
              {paginationInfo.totalItems} users
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={!paginationInfo.hasPrevPage}
                className={`px-3 py-1.5 text-xs bg-white border rounded-lg transition-colors
                            ${!paginationInfo.hasPrevPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-50"}`}
              >
                Prev
              </button>
              {generatePages().map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === "..." ? (
                    <span className="px-2 py-1 text-xs text-slate-400">
                      •••
                    </span>
                  ) : (
                    <button
                      onClick={() => goToPage(pageNum as number)}
                      className={`px-3 py-1.5 text-xs border rounded-lg transition-colors
                                              ${pageNum === currentPage ? "bg-indigo-600 border border-indigo-600 text-white font-semibold" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                    >
                      {pageNum}
                    </button>
                  )}
                </React.Fragment>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={!paginationInfo.hasNextPage}
                className={`px-3 py-1.5 text-xs bg-white border rounded-lg transition-colors
                            ${!paginationInfo.hasNextPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-100"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

"use client";
import { ApiRes, challenge, pagination } from "@/app/types/types";
import { categoryStyles, levelStyles } from "@/app/colors/data";
import {
  ChevronRight,
  Trophy,
  Search,
  Users,
  Flame,
  Inbox,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 5;

const TopChall = () => {
  const [infoPagination, setInfoPagination] = useState<pagination | null>(null);
  const [challenges, setChallenges] = useState<challenge[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async (params: URLSearchParams) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/dashboard/topChall?${params.toString()}`,
        );
        const data: ApiRes = await res.json();
        setInfoPagination(data.pagination);
        setChallenges(data.data);
      } catch (error) {
        console.error("server error", error);
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
    if (page >= 1 && infoPagination && infoPagination.totalPages >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`/admin/dashboard?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/admin/dashboard?${params.toString()}`, { scroll: false });
  };

  const generatePages = () => {
    if (!infoPagination) return [];
    const { currentPage, totalPages } = infoPagination;
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

  const isEmpty = !loading && challenges.length === 0;

  // how many blank rows/cards we need to pad with so the widget
  // stays the same height whether the page has 1 result or 5
  const emptyRowsCount =
    !loading && challenges.length > 0 && challenges.length < ITEMS_PER_PAGE
      ? ITEMS_PER_PAGE - challenges.length
      : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4 lg:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm lg:text-base">
            <span className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
            </span>
            Top Challenges
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) params.set("search", value);
                else params.delete("search");
                params.set("page", "1");
                router.push(`/admin/dashboard?${params.toString()}`, {
                  scroll: false,
                });
              }}
              placeholder="Search challenges..."
className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 max-w-full sm:w-64 md:w-72 transition-all"            />
          </div>
        </div>
      </div>

      {/* Fixed-height content area so the card doesn't jump size */}
      <div className="min-h-[300px] flex flex-col">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-600">
                {search ? "No challenges found" : "No challenges yet"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {search
                  ? `Nothing matches "${search}"`
                  : "Challenges will show up here once created"}
              </p>
            </div>
            {search && (
              <button
                onClick={clearSearch}
                className="text-xs font-semibold text-emerald-600 hover:underline mt-1"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 text-sm truncate">
                        {challenge.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            categoryStyles[
                              challenge.category as keyof typeof categoryStyles
                            ] ?? ""
                          }`}
                        >
                          {challenge.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            levelStyles[
                              challenge.level as keyof typeof levelStyles
                            ] ?? ""
                          }`}
                        >
                          {challenge.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-indigo-600 text-sm flex items-center gap-1 justify-end">
                        <Users className="w-3.5 h-3.5" />{" "}
                        {challenge.userChallenges.length}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 justify-end">
                        <Flame className="w-3 h-3 text-amber-500" />{" "}
                        {challenge.rewardPoints} pts · {challenge.days}d
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* filler cards to keep height consistent on partial pages */}
              {Array.from({ length: emptyRowsCount }).map((_, i) => (
                <div key={`empty-mobile-${i}`} className="px-4 py-4">
                  <div className="h-[46px]" />
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/60">
                    <th className="text-left px-6 py-3 font-medium">
                      Challenge
                    </th>
                    <th className="text-left px-4 py-3 font-medium">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Level</th>
                    <th className="text-right px-4 py-3 font-medium">Days</th>
                    <th className="text-right px-4 py-3 font-medium">
                      Participants
                    </th>
                    <th className="text-right px-6 py-3 font-medium">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {challenges.map((challenge) => (
                    <tr
                      key={challenge.id}
                      className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 max-w-60">
                        <div className="font-semibold text-slate-800 truncate">
                          {challenge.title}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                            categoryStyles[
                              challenge.category as keyof typeof categoryStyles
                            ] ?? ""
                          }`}
                        >
                          {challenge.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                            levelStyles[
                              challenge.level as keyof typeof levelStyles
                            ] ?? ""
                          }`}
                        >
                          {challenge.level}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-slate-600 font-medium">
                        {challenge.days}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-slate-700">
                        {challenge.userChallenges.length}
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-amber-600">
                        {challenge.rewardPoints} pts
                      </td>
                    </tr>
                  ))}

                  {/* filler rows to keep table height consistent on partial pages */}
                  {Array.from({ length: emptyRowsCount }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td className="px-6 py-4">&nbsp;</td>
                      <td className="px-4 py-4">&nbsp;</td>
                      <td className="px-4 py-4">&nbsp;</td>
                      <td className="px-4 py-4">&nbsp;</td>
                      <td className="px-4 py-4">&nbsp;</td>
                      <td className="px-6 py-4">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Footer: total + pagination */}
      {infoPagination && infoPagination.totalPages > 1 && (
        <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-slate-400">
            Showing {infoPagination.offset + 1} to{" "}
            {infoPagination.offset + challenges.length} of{" "}
            {infoPagination.totalItems} total
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={!infoPagination.hasPrevPage}
              className={`px-3 py-1.5 text-xs bg-white border rounded-lg transition-colors
                            ${!infoPagination.hasPrevPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-50"}`}
            >
              Prev
            </button>
            {generatePages().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="px-2 py-1 text-xs text-slate-400">•••</span>
                ) : (
                  <button
                    onClick={() => goToPage(pageNum as number)}
                    className={`px-3 py-1.5 text-xs border rounded-lg transition-colors
                                  ${pageNum === currentPage ? "bg-emerald-600 border-emerald-600 text-white font-semibold" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!infoPagination.hasNextPage}
              className={`px-3 py-1.5 text-xs bg-white border rounded-lg transition-colors
                            ${!infoPagination.hasNextPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-50"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopChall;

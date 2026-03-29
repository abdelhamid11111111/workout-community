"use client";
import React from "react";
import Sidebar from "@/app/components/admin/SideBar";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ApiRes, challenge, pagination } from "../../../types/types";
import { levelStyles, categoryStyles } from "../../../colors/data";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: string[];
  levels: string[];
};

const ITEMS_PER_PAGE = 6;

const SkeletonRow = ({ index }: { index: number }) => (
  <tr className="border-b border-slate-50">
    <td className="px-6 py-[18px]">
      <div className="space-y-2">
        <div
          className="h-4 w-40 rounded-lg bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60}ms` }}
        />
        <div
          className="h-3 w-24 rounded-lg bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 30}ms` }}
        />
      </div>
    </td>
    <td className="px-4 py-[18px]">
      <div
        className="h-7 w-20 rounded-xl bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 40}ms` }}
      />
    </td>
    <td className="px-4 py-[18px]">
      <div
        className="h-7 w-20 rounded-xl bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 50}ms` }}
      />
    </td>
    <td className="px-4 py-[18px] text-right">
      <div
        className="h-4 w-8 rounded-lg bg-slate-200 animate-pulse ml-auto"
        style={{ animationDelay: `${index * 60 + 60}ms` }}
      />
    </td>
    <td className="px-4 py-[18px] text-right">
      <div
        className="h-4 w-12 rounded-lg bg-slate-200 animate-pulse ml-auto"
        style={{ animationDelay: `${index * 60 + 70}ms` }}
      />
    </td>
    <td className="px-4 py-[18px]">
      <div
        className="h-6 w-16 rounded-full bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 80}ms` }}
      />
    </td>
    <td className="px-4 py-[18px]">
      <div
        className="h-4 w-24 rounded-lg bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 90}ms` }}
      />
    </td>
    <td className="px-6 py-[18px]">
      <div className="flex items-center justify-end gap-1">
        <div
          className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 100}ms` }}
        />
        <div
          className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 110}ms` }}
        />
        <div
          className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 120}ms` }}
        />
      </div>
    </td>
  </tr>
);

const EmptyRow = () => (
  <tr className=" border-slate-50">
    <td className="px-6 py-[18px]">
      <div className="space-y-2">
        <div className="h-4" />
        <div className="h-3" />
      </div>
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-7" />
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-7" />
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-4" />
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-4" />
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-6" />
    </td>
    <td className="px-4 py-[18px]">
      <div className="h-4" />
    </td>
    <td className="px-6 py-[18px]">
      <div className="h-8" />
    </td>
  </tr>
);

const MobileSkeletonCard = ({ index }: { index: number }) => (
  <div className="px-4 py-4 flex items-start justify-between gap-3 border-b border-slate-100">
    <div className="space-y-2 flex-1">
      <div
        className="h-4 w-40 rounded-lg bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60}ms` }}
      />
      <div
        className="h-3 w-24 rounded-lg bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 30}ms` }}
      />
      <div className="flex gap-2 mt-2">
        <div
          className="h-5 w-16 rounded-full bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 50}ms` }}
        />
        <div
          className="h-5 w-16 rounded-full bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 70}ms` }}
        />
        <div
          className="h-5 w-14 rounded-full bg-slate-200 animate-pulse"
          style={{ animationDelay: `${index * 60 + 90}ms` }}
        />
      </div>
      <div
        className="h-3 w-32 rounded-lg bg-slate-200 animate-pulse"
        style={{ animationDelay: `${index * 60 + 100}ms` }}
      />
    </div>
    <div className="flex gap-1 shrink-0">
      <div className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse" />
      <div className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex items-center justify-center h-50 py-20">
    <div className="flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Search className="w-6 h-6 text-slate-300" />
      </div>
      <p className="text-sm font-semibold text-slate-500">
        No challenges found
      </p>
      <p className="text-xs text-slate-400">
        Try adjusting your filters or search term
      </p>
    </div>
  </div>
);

export default function ChallengesPage({ categories, levels }: Props) {
  const [challenges, setChallenges] = useState<challenge[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState<pagination | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchChallenges = async (
    page: number = 1,
    search: string,
    category: string,
    level: string,
    status: string,
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/challenges?page=${page}&search=${search}&category=${category}&level=${level}&status=${status}`,
      );
      const data: ApiRes = await res.json();
      setChallenges(data.data);
      setPaginationInfo(data.pagination);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page") || "1");
    const searchFromUrl = searchParams.get("search") || "";
    const levelFromUrl = searchParams.get("level") || "";
    const statusFromUrl = searchParams.get("status") || "";
    const categoryFromUrl = searchParams.get("category") || "";
    setSearch(searchFromUrl);
    setCurrentPage(pageFromUrl);
    fetchChallenges(
      pageFromUrl,
      searchFromUrl,
      categoryFromUrl,
      levelFromUrl,
      statusFromUrl,
    );
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPages >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`/admin/challenges?${params.toString()}`);
    }
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

  const emptyRowsCount =
    !loading && challenges.length > 0 && challenges.length < ITEMS_PER_PAGE
      ? ITEMS_PER_PAGE - challenges.length
      : 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Challenges
            </h1>
            <Link href="/admin/challenges/new">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm self-start sm:self-auto">
                <Plus className="w-4 h-4" /> New Challenge
              </button>
            </Link>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
            <div className="flex-1 min-w-50 relative">
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
                  router.push(`/admin/challenges?${params.toString()}`);
                }}
                placeholder="Search challenges..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <select
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) params.set("category", value);
                else params.delete("category");
                params.set("page", "1");
                router.push(`/admin/challenges?${params.toString()}`);
              }}
              className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) params.set("level", value);
                else params.delete("level");
                params.set("page", "1");
                router.push(`/admin/challenges?${params.toString()}`);
              }}
              className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="">All Levels</option>
              {levels.map((lv, i) => (
                <option key={i} value={lv}>
                  {lv}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) params.set("status", value);
                else params.delete("status");
                params.set("page", "1");
                router.push(`/admin/challenges?${params.toString()}`);
              }}
              className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Results count */}
          <div className="text-xs text-slate-400 mb-3 h-4">
            {!loading && paginationInfo && (
              <>
                Showing {challenges.length} of {paginationInfo.totalItems}{" "}
                results
              </>
            )}
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Mobile cards */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <MobileSkeletonCard key={i} index={i} />
                ))
              ) : challenges.length === 0 ? (
                <EmptyState />
              ) : (
                challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="px-4 py-4 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 text-sm">
                        {challenge.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {challenge.subtitle}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${categoryStyles[challenge.category as keyof typeof categoryStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                        >
                          {challenge.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelStyles[challenge.level as keyof typeof levelStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                        >
                          {challenge.level}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${challenge.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                        >
                          {challenge.active ? "active" : "inactive"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {challenge.days}d · {challenge.rewardPoints} pts
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link href={`/challenge/${challenge.title}`}>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-gray-100 hover:text-gray-500 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
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
                    <th className="text-right px-4 py-3 font-medium">Reward</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Created</th>
                    <th className="text-right px-6 py-3 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <SkeletonRow key={i} index={i} />
                    ))
                  ) : challenges.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="h-[438px] text-center align-middle"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <Search className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-sm font-semibold text-slate-500">
                            No challenges found
                          </p>
                          <p className="text-xs text-slate-400">
                            Try adjusting your filters or search term
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {challenges.map((challenge) => (
                        <tr
                          key={challenge.id}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-[18px]">
                            <div className="font-semibold text-slate-800">
                              {challenge.title}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {challenge.subtitle}
                            </div>
                          </td>
                          <td className="px-4 py-[18px]">
                            <span
                              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${categoryStyles[challenge.category as keyof typeof categoryStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                            >
                              {challenge.category}
                            </span>
                          </td>
                          <td className="px-4 py-[18px]">
                            <span
                              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${levelStyles[challenge.level as keyof typeof levelStyles] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                            >
                              {challenge.level}
                            </span>
                          </td>
                          <td className="px-4 py-[18px] text-right font-medium text-slate-700">
                            {challenge.days}
                          </td>
                          <td className="px-4 py-[18px] text-right font-extrabold text-amber-600">
                            {challenge.rewardPoints}
                          </td>
                          <td className="px-4 py-[18px]">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${challenge.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                            >
                              {challenge.active ? "active" : "inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-[18px] text-xs text-slate-400">
                            {new Date(challenge.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-6 py-[18px]">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/challenge/${challenge.title}`}>
                                <button className="p-2 rounded-xl text-slate-400 hover:bg-gray-100 hover:text-gray-500 transition-colors">
                                  <FaEye className="w-4 h-4" />
                                </button>
                              </Link>
                              <button className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {Array.from({ length: emptyRowsCount }).map((_, i) => (
                        <EmptyRow key={`pad-${i}`} />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && paginationInfo && paginationInfo.totalPages > 1 && (
              <div className="px-4 lg:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400">
                  Showing {paginationInfo.offset + 1} to{" "}
                  {paginationInfo.offset + challenges.length} of{" "}
                  {paginationInfo.totalItems} total
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
                            ${pageNum === currentPage ? "bg-emerald-600 border-emerald-600 text-white font-semibold" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
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
                      ${!paginationInfo.hasNextPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-50"}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

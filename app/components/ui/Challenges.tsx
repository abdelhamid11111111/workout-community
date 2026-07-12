"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Trophy,
  ArrowRight,
  Router,
} from "lucide-react";
import { SearchX } from "lucide-react";
import Image from "next/image";
import { ApiRes, challenge, pagination } from "../../types/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { EmptyChallenges } from "./EmptyState";
import { ChallengeCardSkeleton } from "./LoadingState";

type Props = {
  categories: string[];
  levels: string[];
};

const Challenges = ({ categories, levels }: Props) => {
  const [allChallenges, setChallenges] = useState<challenge[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState<pagination | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchChallenges = async (params: URLSearchParams) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/challenge?${params.toString()}`);
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
    setSearch(searchParams.get("search") || "");
    setCurrentPage(Number(searchParams.get("page") || "1"));
    fetchChallenges(searchParams);
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPages >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`/?${params.toString()}`, { scroll: false });
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

  const clearFilters = () => {
    router.push("/", { scroll: false });
  };

  return (
    <div>
      {/* Search - Categories */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
            {/* Search */}
            <div className="relative">
              <button className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5.5 w-5.5 text-emerald-600" />
              </button>
              <input
                type="search"
                placeholder="Find a challenge..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams(searchParams.toString());
                  if (value) params.set("search", value);
                  else params.delete("search");
                  params.set("page", "1");
                  router.push(`/?${params.toString()}`, { scroll: false });
                }}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-xl border border-slate-200 
                      text-base text-mauve-700
                      focus:outline-none"
              />
            </div>

            {/* Filters group */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Category filter */}
              <div className="relative sm:min-w-[180px]">
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    const params = new URLSearchParams(searchParams.toString());
                    if (value) params.set("category", value);
                    else params.delete("category");
                    params.set("page", "1");
                    router.push(`/?${params.toString()}`, { scroll: false });
                  }}
                  className="w-full appearance-none pl-11 pr-10 py-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl text-base text-emerald-800 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-700" />

                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Level filter */}
              <div className="relative sm:min-w-[180px]">
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    const params = new URLSearchParams(searchParams.toString());
                    if (value) params.set("level", value);
                    else params.delete("level");
                    params.set("page", "1");
                    router.push(`/?${params.toString()}`, { scroll: false });
                  }}
                  className="w-full appearance-none pl-11 pr-10 py-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl text-base text-emerald-800 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="">All Levels</option>
                  {levels.map((level, i) => (
                    <option key={i} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-700" />

                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* All Challenges Grid – refined cards with modern hover */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">
          All Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ChallengeCardSkeleton key={i} index={i} />
            ))
          ) : allChallenges.length === 0 ? (
            <EmptyChallenges onClear={clearFilters} />
          ) : (
            allChallenges.map((challenge, index) => (
              <Link
                key={challenge.id}
                href={`/challenge/${challenge.title}`}
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_48px_-16px_rgba(15,23,42,0.18)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
                >
                  {/* Image */}
                  <div className="relative h-64 lg:h-72 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={challenge.imgs[0]}
                      alt={challenge.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* gradient for badge legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-slate-900/10" />

                    {/* Reward badge */}
                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold">
                      <Trophy className="w-3.5 h-3.5 text-amber-300" />
                      {challenge.rewardPoints} pts
                    </div>

                    {/* Duration tag */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {challenge.days}-day challenge
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                        {challenge.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {challenge.level}
                      </span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2.5 tracking-tight line-clamp-1">
                      {challenge.title}
                    </h3>

                    <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-2 mb-6">
                      {challenge.description}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <span className="text-sm font-semibold text-slate-700">
                        View challenge
                      </span>
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>
      {/* Pagination – cleaner, more modern */}
      {!loading && paginationInfo && paginationInfo.totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={!paginationInfo.hasPrevPage}
              className={`px-6 py-3 rounded-2xl border 
                font-medium 
               transition-colors ${!paginationInfo.hasPrevPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-100"}`}
            >
              Previous
            </button>

            {generatePages().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <button className=" px-6 py-3 rounded-2xl text-slate-400">
                    •••
                  </button>
                ) : (
                  <button
                    onClick={() => goToPage(pageNum as number)}
                    className={`px-6 py-3 rounded-2xl
              font-semibold 
             ${pageNum === currentPage ? "text-white bg-emerald-600" : " text-slate-600"}
             shadow-md`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!paginationInfo.hasNextPage}
              className={`px-6 py-3 rounded-2xl border 
                font-medium 
               transition-colors ${!paginationInfo.hasNextPage ? "text-slate-300 border-slate-200 cursor-not-allowed" : "text-slate-600 border-slate-300 hover:bg-slate-100"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;

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
import Image from "next/image";
import { ApiRes, challenge, pagination } from "../../types/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
            focus:border-emerald-500 focus:outline-none"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-72 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={challenge.imgs[0]}
                  alt={challenge.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 line-clamp-1">
                  {challenge.title}
                </h3>

                {/* Description – truncated to ~1.5 lines max */}
                <p className="text-slate-600 mb-6 lg:mb-8 text-base leading-relaxed line-clamp-2">
                  {challenge.description}
                </p>

                {/* Category + Difficulty */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    {challenge.category}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                    {challenge.level}
                  </span>
                </div>

                {/* Stats – without participants */}
                <div className="space-y-3 mb-8 text-slate-700 text-base">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <span>{challenge.days}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-slate-500" />
                    <span>{challenge.rewardPoints} reward points</span>
                  </div>
                </div>

                <Link
                  href={`/challenge/${challenge.title}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-base group-hover:translate-y-[-2px]"
                >
                  View Details
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
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

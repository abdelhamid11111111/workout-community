import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, Trophy, ArrowRight } from "lucide-react";
import Image from "next/image";

const allChallenges = [
  {
    id: 1,
    title: "30-Day Full Body Transformation",
    description:
      "Complete daily workouts targeting all major muscle groups for a comprehensive fitness transformation.",
    category: "Strength",
    difficulty: "Intermediate",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    participants: 1247,
    duration: "30 days",
    rewardPoints: 750,
  },
  {
    id: 2,
    title: "Morning Yoga Flow Challenge",
    description:
      "Start each day with energizing yoga sequences designed to improve flexibility and mental clarity.",
    category: "Yoga",
    difficulty: "Beginner",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
    participants: 892,
    duration: "21 days",
    rewardPoints: 500,
  },
  {
    id: 3,
    title: "HIIT Cardio Blast",
    description:
      "High-intensity interval training sessions to maximize calorie burn and boost metabolism.",
    category: "HIIT",
    difficulty: "Advanced",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf022?w=400&q=80",
    participants: 1543,
    duration: "14 days",
    rewardPoints: 600,
  },
  {
    id: 4,
    title: "Core Strength Builder",
    description:
      "Focused core workouts to develop a strong, stable midsection for improved athletic performance.",
    category: "Strength",
    difficulty: "Intermediate",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1518611505868-48510c2e2e80?w=400&q=80",
    participants: 967,
    duration: "28 days",
    rewardPoints: 550,
  },
  {
    id: 5,
    title: "5K Running Program",
    description:
      "Progressive running plan to help you complete a 5K with confidence and speed.",
    category: "Cardio",
    difficulty: "Beginner",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=400&q=80",
    participants: 2114,
    duration: "42 days",
    rewardPoints: 800,
  },
  {
    id: 6,
    title: "Flexibility & Mobility",
    description:
      "Daily stretching routines to enhance range of motion and reduce muscle tightness.",
    category: "Flexibility",
    difficulty: "Beginner",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
    participants: 745,
    duration: "30 days",
    rewardPoints: 450,
  },
];

const Challenges = () => {
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
                className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-xl border border-slate-200 
                     text-base placeholder-slate-400
                     focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Filter – big touch target */}
            <button
              className="group flex items-center justify-center gap-3 px-6 py-4 bg-emerald-50 
                         hover:bg-emerald-100 rounded-xl border border-emerald-100 
                         transition-colors sm:min-w-[160px]"
            >
              <Filter className="h-5.5 w-5.5 text-emerald-700 group-hover:text-emerald-800" />
              <span className="font-medium text-emerald-800 text-base whitespace-nowrap">
                All Categories
              </span>
              <svg
                className="h-4 w-4 text-emerald-700"
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
            </button>
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
                  src={challenge.image}
                  alt={challenge.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2.5">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-white shadow-sm ${
                      challenge.status === "active"
                        ? "bg-emerald-600"
                        : challenge.status === "upcoming"
                          ? "bg-amber-500"
                          : "bg-slate-600"
                    }`}
                  >
                    {challenge.status.charAt(0).toUpperCase() +
                      challenge.status.slice(1)}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-white bg-amber-500 shadow-sm">
                    Featured
                  </span>
                </div>
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
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Stats – without participants */}
                <div className="space-y-3 mb-8 text-slate-700 text-base">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <span>{challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-slate-500" />
                    <span>{challenge.rewardPoints} reward points</span>
                  </div>
                </div>

                <Link
                  href={`/challenge/${challenge.id}`}
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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center gap-3">
          <button className="px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors">
            Previous
          </button>
          <button className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold shadow-md">
            1
          </button>
          <button className="px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors">
            2
          </button>
          <button className="px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;

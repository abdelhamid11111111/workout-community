"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const ChallengesHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    {
      icon: TrendingUp,
      label: "Active Challenges",
      value: "6",
      color: "text-teal-600",
    },
    {
      icon: Users,
      label: "Total Participants",
      value: "11572",
      color: "text-orange-600",
    },
    {
      icon: Calendar,
      label: "Starting Soon",
      value: "2",
      color: "text-blue-600",
    },
    { icon: Trophy, label: "Completed", value: "2", color: "text-orange-600" },
  ];

  const featuredChallenge = {
    title: "Morning Yoga Flow Challenge",
    description:
      "Start each day with energizing yoga sequences designed to improve flexibility and mental clarity.",
    category: "Yoga",
    tag: "Featured",
    participants: 892,
    duration: "21 days",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">FIT</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-gray-900 hidden sm:block">
                FitHub
              </span>
            </Link>

            

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors text-sm sm:text-base"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                Sign Up
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-900" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-900" />
                )}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div className="relative h-screen md:h-96 bg-gray-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Hero Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gray-600/70"></div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
                Community Workout Challenges
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of fitness enthusiasts and transform your workout
                routine
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/my-challenges"
                  className="px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors text-sm sm:text-base"
                >
                  View My Challenges
                </Link>

              <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Leaderboard
              </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg p-4 sm:p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gray-100">
                  <stat.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`}
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Featured Challenges
          </h2>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
              <Image
                src={featuredChallenge.image}
                alt={featuredChallenge.title}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Navigation */}
              <button className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all z-10">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all z-10">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-white/20 text-white backdrop-blur-sm rounded text-xs font-medium">
                    {featuredChallenge.category}
                  </span>
                  <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-medium">
                    {featuredChallenge.tag}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  {featuredChallenge.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 mb-4 line-clamp-2">
                  {featuredChallenge.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{featuredChallenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredChallenge.duration}</span>
                  </div>
                </div>
                <Link
                  href="/challenge/1"
                  className="inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 font-semibold transition-colors text-xs sm:text-sm"
                >
                  View Challenge
                </Link>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 py-3 bg-gray-50">
              <button className="h-2 w-6 rounded-full bg-teal-500"></button>
              <button className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400"></button>
              <button className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400"></button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                <option>All Categories</option>
                <option>Strength</option>
                <option>Yoga</option>
                <option>HIIT</option>
                <option>Cardio</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* All Challenges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">All Challenges</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 w-full bg-gray-200">
                <Image
                  src={challenge.image}
                  alt={challenge.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Status & Featured Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white ${
                      challenge.status === "active"
                        ? "bg-teal-500"
                        : challenge.status === "upcoming"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {challenge.status}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-orange-500">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {challenge.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Category & Difficulty Badges */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-teal-100 text-teal-700">
                    {challenge.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 text-gray-700">
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2 sm:space-y-2.5 mb-6 text-sm sm:text-base text-gray-700">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span>{challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span>{challenge.rewardPoints} reward points</span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/challenge/${challenge.id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors text-sm">
            Previous
          </button>
          <button className="px-4 py-2 rounded bg-teal-500 text-white font-semibold text-sm">
            1
          </button>
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors text-sm">
            2
          </button>
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="relative h-64 sm:h-80 bg-gray-900 overflow-hidden mt-8 sm:mt-12">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf022?w=1200&q=80"
          alt="CTA Background"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-orange-600/80"></div>

        <div className="relative h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 text-white/90">
              Join a challenge today and become part of our thriving fitness
              community
            </p>
            <Link
              href="/my-challenges"
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors text-sm sm:text-base"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesHome;
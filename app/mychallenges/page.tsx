'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, Calendar, Target, TrendingUp, Upload, CheckCircle } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import Link from 'next/link'
import CardsChallenges from '../components/ui/CardsChallenges'

interface Challenge {
  id: number
  title: string
  category: string
  difficulty: string
  progress: number
  workoutsCompleted: number
  workoutsTotal: number
  currentStreak?: number
  daysRemaining?: number
  pointsEarned?: number
  completedDate?: string
  images: string[]
}

const MyChallenges = () => {
  const userActiveChallenges: Challenge[] = [
    {
      id: 1,
      title: '30-Day Full Body Transformation',
      category: 'Strength',
      difficulty: 'Intermediate',
      progress: 48,
      workoutsCompleted: 6,
      workoutsTotal: 30,
      currentStreak: 9,
      daysRemaining: 22,
      images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80']
    },
    {
      id: 2,
      title: 'Morning Yoga Flow Challenge',
      category: 'Yoga',
      difficulty: 'Beginner',
      progress: 11,
      workoutsCompleted: 14,
      workoutsTotal: 30,
      currentStreak: 2,
      daysRemaining: 8,
      images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80']
    },
    {
      id: 3,
      title: 'HIIT Cardio Blast',
      category: 'HIIT',
      difficulty: 'Advanced',
      progress: 42,
      workoutsCompleted: 0,
      workoutsTotal: 30,
      currentStreak: 0,
      daysRemaining: 17,
      images: ['https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&q=80']
    }
  ]

  const completedChallenges: Challenge[] = [
    {
      id: 4,
      title: '10K Running Challenge',
      category: 'Run',
      difficulty: 'Advanced',
      progress: 100,
      workoutsCompleted: 30,
      workoutsTotal: 30,
      pointsEarned: 500,
      completedDate: 'Mar 10, 2026',
      images: ['https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=400&q=80']
    }
  ]

  // You can later control this via state/tabs — for now showing active by default
  const displayChallenges = userActiveChallenges // ← change to completedChallenges when needed

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            My Challenges
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Track your progress and stay motivated
          </p>
        </div>

        {/* Stats Grid */}
        <CardsChallenges/>

        {/* Tabs – visual only (no interaction in this static version) */}
        <div className="flex gap-3 mb-10 border-b border-slate-200 pb-4">
          <button
            className="px-6 py-3 rounded-xl font-semibold text-base bg-emerald-600 text-white shadow-md"
          >
            Active ({userActiveChallenges.length})
          </button>
          <button
            className="px-6 py-3 rounded-xl font-semibold text-base bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          >
            Completed ({completedChallenges.length})
          </button>
        </div>

        {/* Challenges List */}
        <div className="space-y-6 lg:space-y-8">
          {displayChallenges.length > 0 ? (
            displayChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-6 lg:p-8">
                  {/* Image */}
                  <div className="relative w-full lg:w-56 lg:h-56 h-72 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={challenge.images[0]}
                      alt={challenge.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 224px"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title & Badges */}
                    <div className="mb-5">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {challenge.title}
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                          {challenge.category}
                        </span>
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                          challenge.difficulty === 'Beginner' ? 'bg-green-50 text-green-800 border-green-100' :
                          challenge.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-800 border-amber-100' :
                          'bg-red-50 text-red-800 border-red-100'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        {challenge.daysRemaining && (
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                            {challenge.daysRemaining} days left
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-sm font-medium text-slate-600">Overall Progress</span>
                        <span className="text-sm font-bold text-emerald-700">{challenge.progress}%</span>
                      </div>
                      <ProgressBar progress={challenge.progress} height="h-2.5" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-7">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-slate-100">
                          <Trophy className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Workouts</p>
                          <p className="font-semibold text-slate-900">
                            {challenge.workoutsCompleted} / {challenge.workoutsTotal}
                          </p>
                        </div>
                      </div>

                      {challenge.currentStreak !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-slate-100">
                            <TrendingUp className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Current Streak</p>
                            <p className="font-semibold text-slate-900">{challenge.currentStreak} days</p>
                          </div>
                        </div>
                      )}

                      {challenge.daysRemaining !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-slate-100">
                            <Calendar className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Days Remaining</p>
                            <p className="font-semibold text-slate-900">{challenge.daysRemaining}</p>
                          </div>
                        </div>
                      )}

                      {challenge.completedDate && (
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-slate-100">
                            <Calendar className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Completed</p>
                            <p className="font-semibold text-slate-900">{challenge.completedDate}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buttons – only shown for active */}
                    {!challenge.completedDate && (
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/submit/${challenge.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
                        >
                          <Upload className="w-4 h-4" />
                          Submit Workout
                        </Link>
                        <Link
                          href={`/challenge/${challenge.id}`}
                          className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Completed side info */}
                  {challenge.completedDate && (
                    <div className="flex flex-col items-start lg:items-end gap-3 lg:pt-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold text-lg">Completed</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">
                        +{challenge.pointsEarned} points
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 lg:p-16 text-center border border-slate-100 shadow-sm"
            >
              <Trophy className="w-20 h-20 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No Challenges Yet
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                Join a challenge to start tracking your progress
              </p>
              <Link
                href="/"
                className="inline-flex px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-base"
              >
                Browse Challenges
              </Link>
            </motion.div>
          )}
        </div>

        {/* CTA – shown when there are active challenges */}
        {userActiveChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 lg:mt-16 w-full bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-8 lg:p-12 text-center shadow-xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Keep Going! 💪</h3>
            <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              You are doing great! Stay consistent and you will reach your goals.
            </p>
            <Link
              href="/leaderboard"
              className="inline-flex px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-300 text-base lg:text-lg"
            >
              Check Your Ranking
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MyChallenges
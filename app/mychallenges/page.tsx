'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, Calendar, Target, TrendingUp, Upload, CheckCircle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import Link from 'next/link'

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
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')

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

  const displayChallenges = activeTab === 'active' ? userActiveChallenges : completedChallenges

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Challenges</h1>
          <p className="text-gray-600 mt-2">Track your progress and stay motivated</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Trophy, label: 'Active Challenges', value: userActiveChallenges.length, color: 'bg-teal-100', textColor: 'text-teal-600' },
            { icon: CheckCircle, label: 'Completed', value: completedChallenges.length, color: 'bg-green-100', textColor: 'text-green-600' },
            { icon: TrendingUp, label: 'Total Progress', value: '33%', color: 'bg-orange-100', textColor: 'text-orange-600' },
            { icon: Target, label: 'Current Streak', value: '10 days', color: 'bg-blue-100', textColor: 'text-blue-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              activeTab === 'active'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Active ({userActiveChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              activeTab === 'completed'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Completed ({completedChallenges.length})
          </button>
        </div>

        {/* Challenges List */}
        <div className="space-y-4 sm:space-y-6">
          {displayChallenges.length > 0 ? (
            displayChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image - Square Format */}
                  <div className="w-full sm:w-40 sm:h-40 h-64 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={challenge.images[0]}
                      alt={challenge.title}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title & Badges */}
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          challenge.category === 'Strength' ? 'bg-teal-100 text-teal-700' :
                          challenge.category === 'Yoga' ? 'bg-orange-100 text-orange-700' :
                          challenge.category === 'HIIT' ? 'bg-pink-100 text-pink-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {challenge.category}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        {activeTab === 'active' && challenge.daysRemaining && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {challenge.daysRemaining} days left
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                        <span className="text-sm font-bold text-teal-600">{challenge.progress}%</span>
                      </div>
                      <ProgressBar progress={challenge.progress} height="h-2" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">Workouts</p>
                          <p className="font-semibold text-gray-900">{challenge.workoutsCompleted} / {challenge.workoutsTotal}</p>
                        </div>
                      </div>
                      {activeTab === 'active' && (
                        <>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-600">Current Streak</p>
                              <p className="font-semibold text-gray-900">{challenge.currentStreak} days</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-600">Days Remaining</p>
                              <p className="font-semibold text-gray-900">{challenge.daysRemaining}</p>
                            </div>
                          </div>
                        </>
                      )}
                      {activeTab === 'completed' && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-600">Completed</p>
                            <p className="font-semibold text-gray-900">{challenge.completedDate}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    {activeTab === 'active' && (
                      <div className="flex gap-3">
                        <Link
                          href={`/submit/${challenge.id}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold text-sm transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Submit Workout
                        </Link>
                        <Link
                          href={`/challenge/${challenge.id}`}
                          className="px-4 py-2 bg-white text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 font-semibold text-sm transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Completed Badge */}
                  {activeTab === 'completed' && (
                    <div className="flex flex-col items-start sm:items-end justify-start sm:justify-center gap-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Completed</span>
                      </div>
                      <p className="text-sm text-gray-600">+{challenge.pointsEarned} points</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'active' ? 'No Active Challenges' : 'No Completed Challenges'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'active'
                  ? 'Join a challenge to start your fitness journey'
                  : 'Complete challenges to see them here'}
              </p>
              <Link href="/" className="inline-block px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold">
                Browse Challenges
              </Link>
            </div>
          )}
        </div>

        {/* CTA */}
        {activeTab === 'active' && userActiveChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-8 text-center mt-8"
          >
            <h3 className="text-2xl font-bold mb-2">Keep Going! 💪</h3>
            <p className="mb-6">You are doing great! Stay consistent and you will reach your goals.</p>
            <Link
              href="/leaderboard"
              className="inline-block px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
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
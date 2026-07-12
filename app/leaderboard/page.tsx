"use client";
import React from "react";
// import { motion } from 'framer-motion'
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";
import Link from "next/link";

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-7 h-7 text-yellow-300 drop-shadow-md" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-300 drop-shadow-md" />;
      case 3:
        return <Award className="w-7 h-7 text-orange-300 drop-shadow-md" />;
      default:
        return <span className="text-lg font-bold">{rank}</span>;
    }
  };

  const getRankStyles = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-br from-yellow-500 to-amber-600 shadow-yellow-500/30";
    if (rank === 2)
      return "bg-gradient-to-br from-gray-400 to-gray-600 shadow-gray-500/30";
    if (rank === 3)
      return "bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30";
    return "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 shadow-sm";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header – centered */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 mb-6 shadow-xl shadow-indigo-500/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Community Leaderboard
          </h1>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            See who’s crushing their fitness goals — and join the race!
          </p>
        </div>

        {/* Podium – Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto mb-16 items-end">
          {/* 2nd */}
          <div className="relative flex flex-col items-center order-2 sm:order-1">
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-4xl font-black shadow-lg border-4 border-white">
                2
              </div>
            </div>

            <div className="glass-card w-full max-w-xs p-6 md:p-8 text-center rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-xl border border-gray-300/40 hover:shadow-2xl transition-all duration-300">
              <Medal className="w-12 h-12 text-gray-200 mx-auto mb-5 opacity-90" />
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Sarah Johnson"
                className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-white/60 shadow-md"
              />
              <h3 className="text-xl md:text-2xl font-bold">Sarah Johnson</h3>
              <p className="text-4xl font-extrabold mt-3">8,750</p>
              <p className="text-white/90 mt-1">points</p>
            </div>
          </div>

          {/* 1st – bigger card */}
          <div className="relative flex flex-col items-center order-1 z-10">
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white">
                1
              </div>
            </div>

            <div className="glass-card w-full max-w-xs p-8 md:p-10 text-center rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-2xl border-2 border-yellow-300/50 hover:shadow-gold transition-all duration-300">
              <Crown className="w-14 h-14 text-yellow-200 mx-auto mb-6 drop-shadow-md" />
              <img
                src="https://i.pravatar.cc/150?img=8"
                alt="Alex Carter"
                className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-white/80 shadow-xl"
              />
              <h3 className="text-2xl md:text-3xl font-extrabold">
                Alex Carter
              </h3>
              <p className="text-5xl font-black mt-3">9,420</p>
              <p className="text-white/90 mt-1">points</p>
            </div>
          </div>

          {/* 3rd */}
          <div className="relative flex flex-col items-center order-3">
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-4xl font-black shadow-lg border-4 border-white">
                3
              </div>
            </div>

            <div className="glass-card w-full max-w-xs p-6 md:p-8 text-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl border border-gray-300/40 hover:shadow-2xl transition-all duration-300">
              <Award className="w-12 h-12 text-orange-200 mx-auto mb-5 opacity-90" />
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Mike Lee"
                className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-white/60 shadow-md"
              />
              <h3 className="text-xl md:text-2xl font-bold">Mike Lee</h3>
              <p className="text-4xl font-extrabold mt-3">8,100</p>
              <p className="text-white/90 mt-1">points</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-card overflow-hidden rounded-2xl border border-gray-200/60 shadow-xl bg-white/70 backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <tr>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider hidden sm:table-cell">
                  Workouts
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider hidden md:table-cell">
                  Streak
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider hidden lg:table-cell">
                  Trend
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200/60">
              {[
                {
                  rank: 1,
                  name: "Alex Carter",
                  img: "https://i.pravatar.cc/100?img=8",
                  points: 9420,
                  workouts: 312,
                  streak: "54 days",
                  trend: "+15%",
                  tag: "Elite Athlete",
                },
                {
                  rank: 2,
                  name: "Sarah Johnson",
                  img: "https://i.pravatar.cc/100?img=5",
                  points: 8750,
                  workouts: 280,
                  streak: "47 days",
                  trend: "+12%",
                  tag: "Pro Trainer",
                },
                {
                  rank: 3,
                  name: "Mike Lee",
                  img: "https://i.pravatar.cc/100?img=3",
                  points: 8100,
                  workouts: 260,
                  streak: "39 days",
                  trend: "+9%",
                  tag: "Fitness Lover",
                },
              ].map((user) => (
                <tr
                  key={user.rank}
                  className="hover:bg-indigo-50/60 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-full text-white font-bold shadow-md ${getRankStyles(user.rank)}`}
                    >
                      {getRankIcon(user.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.img}
                        alt={user.name}
                        className="w-12 h-12 rounded-full ring-2 ring-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.tag}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-indigo-700">
                    {user.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-gray-700 hidden sm:table-cell">
                    {user.workouts}
                  </td>
                  <td className="px-6 py-5 text-gray-700 hidden md:table-cell">
                    {user.streak}
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" /> {user.trend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-10 shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Claim the Top Spot?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
              >
                Browse Challenges
              </Link>
              <Link
                href="/active"
                className="inline-flex items-center px-8 py-4 border-2 border-white font-semibold rounded-xl hover:bg-white/10 transition"
              >
                My Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

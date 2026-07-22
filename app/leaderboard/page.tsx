"use client";
import React, { useEffect, useState } from "react";
import { Trophy, Medal, Award, Crown, UserIcon } from "lucide-react";
import Link from "next/link";
import { ApiRes2, User } from "@/app/types/types";
import {levelStyles} from '../colors/data'


type AvatarProps = {
  user: User;
  className: string;
};

const Avatar = ({ user, className }: AvatarProps) =>
  user.profilePic ? (
    <img
      src={user.profilePic}
      alt={user.name ?? "Profile"}
      className={`${className} object-cover`}
    />
  ) : (
    <div className={`${className} border-bs-gray-600 flex items-center justify-center`}>
      <UserIcon className="w-1/2 h-1/2 text-white" />
    </div>
  );

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/users/table?page=1");
        const data: ApiRes2 = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.error("failed loading leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Derived score since there's no real "points" field in the schema.
  // Adjust the weights however makes sense for your app.
  const getPoints = (user: User) =>
    user._count.workouts * 100 + user._count.challenges * 250;

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

  // FIX: text color now lives here for every rank tier, instead of being
  // hardcoded as "text-white" on the wrapping div (which was clashing with
  // the "text-gray-800" below and rendering rank 4+ invisible).
  const getRankStyles = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-br from-yellow-500 to-amber-600 shadow-yellow-500/30 text-white";
    if (rank === 2)
      return "bg-gradient-to-br from-gray-400 to-gray-600 shadow-gray-500/30 text-white";
    if (rank === 3)
      return "bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30 text-white";
    return "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 shadow-sm";
  };

  const first = users[0];
  const second = users[1];
  const third = users[2];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 text-center text-gray-400">
        Loading leaderboard...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 text-center text-gray-400">
        No users on the leaderboard yet.
      </div>
    );
  }

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
            See who is crushing their fitness goals — and join the race!
          </p>
        </div>

        {/* Podium – Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto mb-16 items-end">
          {/* 2nd */}
          {second && (
            <div className="relative flex flex-col items-center order-2 sm:order-1">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-4xl font-black shadow-lg border-4 border-white">
                  2
                </div>
              </div>

              <div className="glass-card w-full max-w-xs p-6 md:p-8 text-center rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-xl border border-gray-300/40 hover:shadow-2xl transition-all duration-300">
                <Medal className="w-12 h-12 text-gray-200 mx-auto mb-5 opacity-90" />
                <Avatar
                  user={second}
                  className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-white/60 shadow-md"
                />
                <h3 className="text-xl md:text-2xl font-bold">
                  {second.name}
                </h3>
                <p className="text-4xl font-extrabold mt-3">
                  {getPoints(second).toLocaleString()}
                </p>
                <p className="text-white/90 mt-1">points</p>
              </div>
            </div>
          )}

          {/* 1st – bigger card */}
          {first && (
            <div className="relative flex flex-col items-center order-1 z-10">
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white">
                  1
                </div>
              </div>

              <div className="glass-card w-full max-w-xs p-8 md:p-10 text-center rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-2xl border-2 border-yellow-300/50 hover:shadow-gold transition-all duration-300">
                <Crown className="w-14 h-14 text-yellow-200 mx-auto mb-6 drop-shadow-md" />
                <Avatar
                  user={first}
                  className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-white/80 shadow-xl"
                />
                <h3 className="text-2xl md:text-3xl font-extrabold">
                  {first.name}
                </h3>
                <p className="text-5xl font-black mt-3">
                  {getPoints(first).toLocaleString()}
                </p>
                <p className="text-white/90 mt-1">points</p>
              </div>
            </div>
          )}

          {/* 3rd */}
          {third && (
            <div className="relative flex flex-col items-center order-3">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-4xl font-black shadow-lg border-4 border-white">
                  3
                </div>
              </div>

              <div className="glass-card w-full max-w-xs p-6 md:p-8 text-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl border border-gray-300/40 hover:shadow-2xl transition-all duration-300">
                <Award className="w-12 h-12 text-orange-200 mx-auto mb-5 opacity-90" />
                <Avatar
                  user={third}
                  className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-white/60 shadow-md"
                />
                <h3 className="text-xl md:text-2xl font-bold">
                  {third.name}
                </h3>
                <p className="text-4xl font-extrabold mt-3">
                  {getPoints(third).toLocaleString()}
                </p>
                <p className="text-white/90 mt-1">points</p>
              </div>
            </div>
          )}
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
                  Challenges
                </th>
                <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider hidden lg:table-cell">
                  Level
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200/60">
              {users.map((user, index) => {
                const rank = index + 1;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-indigo-50/60 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div
                        className={`w-11 h-11 flex items-center justify-center rounded-full font-bold shadow-md ${getRankStyles(rank)}`}
                      >
                        {getRankIcon(rank)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar
                          user={user}
                          className="w-12 h-12 rounded-full ring-2 ring-gray-200 bg-indigo-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-indigo-700">
                      {getPoints(user).toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-gray-700 hidden sm:table-cell">
                      {user._count.workouts}
                    </td>
                    <td className="px-6 py-5 text-gray-700 hidden md:table-cell">
                      {user._count.challenges}
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${levelStyles[user.currentLevel] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {user.currentLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
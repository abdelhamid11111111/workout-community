"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Calendar, TrendingUp, Upload } from "lucide-react";
import Link from "next/link";
import { userChallenge } from "@/app/types/types";
import ProgressBar from "./ProgressBar";
import { LiveTimeAgo } from "./LiveTimeAgo";

const ChallengeCard = ({ userChallenge }: { userChallenge: userChallenge }) => {
  const [workoutCount, setWorkoutCount] = useState<number | null>(null);
  const challenge = userChallenge.challenge;

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`/api/workout/${challenge.id}`);
        const data = await res.json();
        setWorkoutCount(data.countWorkout);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchCount();
  }, [challenge.id]);

  const progressPercent =
    Number(userChallenge.challenge.days) > 0
      ? Math.round(
          ((workoutCount ?? 0) / Number(userChallenge.challenge.days)) * 100,
        )
      : 0;

  return (
    <motion.div
      key={userChallenge.challenge.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <span className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 px-3 py-1 rounded-full backdrop-blur-sm text-sm font-medium text-slate-600">
        Added <LiveTimeAgo date={userChallenge.joinedAt} />
      </span>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-6 lg:p-8">
        {/* Image */}
        <div className="relative w-full lg:w-56 lg:h-56 h-72 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={userChallenge.challenge?.imgs?.[0] ?? null}
            alt={userChallenge.challenge.title}
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
              {userChallenge.challenge.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                {userChallenge.challenge.category}
              </span>
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                  userChallenge.challenge.level === "Beginner"
                    ? "bg-green-50 text-green-800 border-green-100"
                    : userChallenge.challenge.level === "Intermediate"
                      ? "bg-amber-50 text-amber-800 border-amber-100"
                      : "bg-red-50 text-red-800 border-red-100"
                }`}
              >
                {userChallenge.challenge.level}
              </span>
              {userChallenge.challenge.days && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                  {/* {challenge.daysRemaining}  */}2 days left
                </span>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-medium text-slate-600">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-emerald-700">
                {/* {challenge.progress} */}
                {progressPercent}%
              </span>
            </div>
            <ProgressBar progress={progressPercent} height="h-2.5" />
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
                  {workoutCount} / {userChallenge.challenge.days}
                </p>
              </div>
            </div>

            {/* {challenge.currentStreak !== undefined && ( */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100">
                <TrendingUp className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Streak</p>
                <p className="font-semibold text-slate-900">22 days</p>
              </div>
            </div>
            {/* )} */}

            {/* {challenge.daysRemaining !== undefined && ( */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100">
                <Calendar className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Days Remaining</p>
                <p className="font-semibold text-slate-900">12</p>
              </div>
            </div>
            {/* )} */}

            {/* {challenge.completedDate && (
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-slate-100">
                            <Calendar className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Completed</p>
                            <p className="font-semibold text-slate-900">
                              {challenge.completedDate}
                            </p>
                          </div>
                        </div>
                      )} */}
          </div>

          {/* Buttons – only shown for active */}
          {/* {!challenge.completedDate && ( */}
          <div className="flex flex-wrap gap-3">
            {workoutCount === Number(userChallenge.challenge.days) ? (
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 px-6 py-3 bg-slate-100 text-slate-400  rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4" />
                Submit Workout
              </button>
            ) : (
              <Link
                href={`/mychallenges/workout/${userChallenge.challenge.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4" />
                Submit Workout
              </Link>
            )}
            <Link
              href={`/challenge/${userChallenge.challenge.title}`}
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              View Details
            </Link>
            <div
              // href={`/challenge/${challenge.id}`}
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              Give Up
            </div>
          </div>
          {/* )} */}
        </div>

        {/* Completed side info */}
        {/* {challenge.completedDate && (
                    <div className="flex flex-col items-start lg:items-end gap-3 lg:pt-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold text-lg">Completed</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">
                        +{challenge.pointsEarned} points
                      </p>
                    </div>
                  )} */}
      </div>
    </motion.div>
  );
};

export default ChallengeCard;

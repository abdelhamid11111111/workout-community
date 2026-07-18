import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Swords, CheckCircle, Flame } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

type Props = {
  countActive: number;
  countCompleted: number;
};

const CardsChallenges = ({ countActive, countCompleted }: Props) => {
  const [rewardsPoints, setRewardsPoints] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/mychallenges/CardsChallenges");
        const data = await res.json();
        setRewardsPoints(data.totalRewardPoints);
        setCaloriesBurned(data.totalCaloriesBurned);
      } catch (err) {
        console.error("Failed to fetch challenge stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
      {/* Card 1: Active Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.6 }}
        className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3.5 rounded-xl">
            <Swords className="w-7 h-7 text-emerald-700" />
          </div>
          <div>
            <div className="text-sm text-slate-600 font-medium">
              Active Challenges
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {isLoading ? (
                <div className="h-8 sm:h-9 w-16 bg-slate-200 rounded-md animate-pulse mt-1" />
              ) : (
                <AnimatedCounter
                  format={(v: number) => `${v.toLocaleString()}`}
                  value={countActive}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Completed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3.5 rounded-xl">
            <CheckCircle className="w-7 h-7 text-green-700" />
          </div>
          <div>
            <div className="text-sm text-slate-600 font-medium">Completed</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {isLoading ? (
                <div className="h-8 sm:h-9 w-16 bg-slate-200 rounded-md animate-pulse mt-1" />
              ) : (
                <AnimatedCounter
                  format={(v: number) => `${v.toLocaleString()}`}
                  value={countCompleted}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 3: Consistency Score calories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.6 }}
        className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3.5 rounded-xl">
            <Swords className="w-7 h-7 text-emerald-700" />
          </div>
          <div>
            <div className="text-sm text-slate-600 font-medium">
              Calories Burned
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {isLoading ? (
                <div className="h-8 sm:h-9 w-16 bg-slate-200 rounded-md animate-pulse mt-1" />
              ) : (
                <AnimatedCounter
                  format={(v: number) => `${v.toLocaleString()}`}
                  value={caloriesBurned}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 4: Total Active Minutes (Swapped out Current Streak) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3.5 rounded-xl">
            <Trophy className="w-7 h-7 text-blue-700" />
          </div>
          <div>
            <div className="text-sm text-slate-600 font-medium">Reward points</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {isLoading ? (
                <div className="h-8 sm:h-9 w-16 bg-slate-200 rounded-md animate-pulse mt-1" />
              ) : (
                <AnimatedCounter
                  format={(v: number) => `${v.toLocaleString()}`}
                  value={rewardsPoints}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardsChallenges;

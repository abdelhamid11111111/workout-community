"use client";
import { useEffect, useState } from "react";
import CardsChallenges from "../components/ui/CardsChallenges";
import ChallengeCard from "../components/ui/ChallengeCard"; // ← new file, below
import { userChallenge } from "../types/types";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MyChallenges = () => {
  const [userChallenge, setUserChallenge] = useState<userChallenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("/api/mychallenges");
        const data = await res.json();
        setUserChallenge(data);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          My Challenges
        </h1>
        <p className="mt-3 pb-4 text-lg text-slate-600">
          Track your progress and stay motivated
        </p>

        <CardsChallenges />

        <div className="space-y-6 lg:space-y-8 mt-10">
          {userChallenge.length > 0 ? (
            userChallenge.map((uc) => (
              <ChallengeCard
                key={uc.challenge.id}
                userChallenge={uc}
                onDelete={(id) =>
                  setUserChallenge((prev) =>
                    prev.filter((item) => item.challenge.id !== id),
                  )
                }
              />
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
      </div>
    </div>
  );
};

export default MyChallenges;

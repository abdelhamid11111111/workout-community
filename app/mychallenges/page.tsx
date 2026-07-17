"use client";
import { useEffect, useState } from "react";
import CardsChallenges from "../components/ui/CardsChallenges";
import ChallengeCard from "../components/ui/ChallengeCard"; // ← new file, below
import { userChallenge } from "../types/types";

const MyChallenges = () => {
  const [Challenge, setChallenge] = useState<userChallenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("/api/mychallenges");
        const data = await res.json();
        setChallenge(data);
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
        <p className="mt-3 text-lg text-slate-600">
          Track your progress and stay motivated
        </p>

        <CardsChallenges />

        <div className="space-y-6 lg:space-y-8 mt-10">
          {Challenge.length > 0 ? (
            Challenge.map((uc) => (
              <ChallengeCard key={uc.challenge.id} userChallenge={uc} />
            ))
          ) : (
            <p>No challenges yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChallenges;
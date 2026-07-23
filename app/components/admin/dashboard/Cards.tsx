"use client";
import React, { useEffect, useState } from "react";
import {
  Trophy,
  Users,
  Flame,
  Dumbbell,
} from "lucide-react";

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [part, setPart] = useState(0);
  const [challenges, setChallenges] = useState(0);
  const [ActiveChallenges, setActiveChallenges] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/dashboard/cards");
        const data = await res.json();
        setUsers(data.totalUsers);
        setChallenges(data.countChallenges);
        setActiveChallenges(data.activeChallengesCount);
        setWorkout(data.totalWorkouts);
        setCalories(data.totalCalories);
        setPart(data.totalPar);
      } catch (error) {
        console.error("failed loading dashboard cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardConfigs = [
    {
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      label: "Total Users",
      value: users,
      valueColor: "text-indigo-600",
    },
    {
      icon: Trophy,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      label: "Challenges",
      value: challenges,
      valueColor: "text-emerald-600",
    },
    {
      icon: Dumbbell,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      label: "Workouts",
      value: workout,
      valueColor: "text-amber-600",
    },
    {
      icon: Flame,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      label: "Calories",
      value: calories,
      valueColor: "text-rose-600",
      footer: "all time",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm animate-pulse"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-slate-200 mb-3" />
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-6 lg:h-8 w-16 rounded bg-slate-200 mt-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
      {cardConfigs.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm animate-in fade-in duration-300"
          >
            <div
              className={`w-8 h-8 lg:w-9 lg:h-9 rounded-xl ${card.iconBg} flex items-center justify-center mb-3`}
            >
              <Icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-medium leading-tight">
              {card.label}
            </div>
            <div className={`text-xl lg:text-3xl font-extrabold ${card.valueColor} mt-1`}>
              {card.value}
            </div>
            {card.footer && (
              <div className="text-xs text-slate-400 font-medium mt-1">
                {card.footer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
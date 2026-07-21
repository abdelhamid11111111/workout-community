import React, { useEffect, useState } from "react";
import { Users, TrendingUp, UserX, Dumbbell } from "lucide-react";

const Cards = () => {

  const [totalUsers, setTotalUsers] = useState(0)
  const [totalInChall, setTotalInChall] = useState(0)
  const [notInChall, setNotInChall] = useState(0)
  const [avgWorkoutPerUsr, setAvgWorkoutPerUsr] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/users/cards")
        if (!response.ok) {
          throw new Error("Failed to load user cards data")
        }

        const data = await response.json()
        setTotalUsers(data.totalUsers ?? 0)
        setTotalInChall(data.totalInChall ?? 0)
        setNotInChall(data.notInChall ?? 0)
        setAvgWorkoutPerUsr(data.avgWorkoutPerUsr ?? 0)
      } catch (error) {
        console.error("Error fetching cards data:", error)
      }
    }

    fetchData()
  },[])


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
          <Users className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Total Users
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-indigo-600 mt-1">
          {totalUsers}
        </div>
        {/* <div className="text-xs text-emerald-500 font-semibold mt-1">
          +12% this month
        </div> */}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
          <Dumbbell className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Avg Workouts per User
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-emerald-600 mt-1">
          {avgWorkoutPerUsr.toFixed(1)}
        </div>
        {/* <div className="text-xs text-emerald-500 font-semibold mt-1">
          +23% vs last week
        </div> */}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
          <TrendingUp className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          In a Challenge
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-amber-600 mt-1">
          {totalInChall}
        </div>
        {/* <div className="text-xs text-slate-400 font-medium mt-1">
          65% of users
        </div> */}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
          <UserX className="w-4 h-4 text-rose-600" />
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          No Activity
        </div>
        <div className="text-xl lg:text-3xl font-extrabold text-rose-600 mt-1">
          {notInChall}
        </div>
        {/* <div className="text-xs text-slate-400 font-medium mt-1">
          last 30 days
        </div> */}
      </div>
    </div>
  );
};

export default Cards;


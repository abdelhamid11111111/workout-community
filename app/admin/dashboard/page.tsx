"use client";
import AvgCalories from "@/app/components/admin/dashboard/AvgCalories";
import Cards from "@/app/components/admin/dashboard/Cards";
import CategoriesData from "@/app/components/admin/dashboard/CategoriesData";
import Graph from "@/app/components/admin/dashboard/Graph";
import Intensity from "@/app/components/admin/dashboard/Intensity";
import PostWorkout from "@/app/components/admin/dashboard/Post-Workout";
import TopChall from "@/app/components/admin/dashboard/TopChall";
import TopUsrs from "@/app/components/admin/dashboard/TopUsrs";
import UsrLevel from "@/app/components/admin/dashboard/UsrLevel";
import WorkoutTime from "@/app/components/admin/dashboard/WorkoutTime";
import Sidebar from "@/app/components/admin/SideBar";



export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Welcome back — here is what is happening today.
            </p>
          </div>

          {/* KPI Cards */}
          <Cards/>

          {/* Users Joining Challenges Over Time */}
          <Graph/>

          {/* Category Pie + Feel Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">

            {/* Most Loved Categories */}
            <CategoriesData/>

            {/* Post-Workout Feel */}
            <PostWorkout/>
          </div>

          {/* Intensity + User Levels + Workout Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">

            {/* Intensity */}
            <Intensity/>

            {/* User Levels */}
            <UsrLevel/>

            {/* Workout Time */}
            <WorkoutTime/>

          </div>

          {/* Avg Calories by Category */}
          <AvgCalories/>

          {/* Top Users Table */}
          <TopUsrs/>

          {/* Top Challenges Table */}
          <TopChall/>
        </div>
      </div>
    </div>
  );
}
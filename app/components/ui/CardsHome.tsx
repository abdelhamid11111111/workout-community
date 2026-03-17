import React from 'react'
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

 const stats = [
    {
      icon: TrendingUp,
      label: "Active Challenges",
      value: "6",
      color: "text-emerald-600",
    },
    {
      icon: Users,
      label: "Total Participants",
      value: "11572",
      color: "text-amber-600",
    },
    {
      icon: Calendar,
      label: "Starting Soon",
      value: "2",
      color: "text-blue-600",
    },
    { icon: Trophy, label: "Completed", value: "2", color: "text-amber-600" },
  ];


const CardsHome = () => {
  return (
     <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-12 md:-mt-16 relative z-10 mb-16 lg:mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100/80">
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  )
}

export default CardsHome
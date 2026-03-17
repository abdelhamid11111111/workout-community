import React from 'react'
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  TrendingUp,
  CheckCircle,
} from "lucide-react";



const CardsChallenges = () => {
    
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {[
            {
              icon: Trophy,
              label: "Active Challenges",
              value: "3",
              color: "bg-emerald-100",
              textColor: "text-emerald-700",
            },
            {
              icon: CheckCircle,
              label: "Completed",
              value: "1",
              color: "bg-green-100",
              textColor: "text-green-700",
            },
            {
              icon: TrendingUp,
              label: "Total Progress",
              value: "33%",
              color: "bg-amber-100",
              textColor: "text-amber-700",
            },
            {
              icon: Target,
              label: "Current Streak",
              value: "10 days",
              color: "bg-blue-100",
              textColor: "text-blue-700",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3.5 rounded-xl`}>
                  <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
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
  )
}

export default CardsChallenges
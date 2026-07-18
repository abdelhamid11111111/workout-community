import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Trophy } from "lucide-react";

const CardsHome = () => {
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [totalJoins, setTotalJoins] = useState(0);
  const [totalWorkouts, SetTotalWorkouts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/homepage/cards");
      const data = await res.json();
      setTotalChallenges(data.challenges);
      setParticipants(data.totalPar);
      setTotalJoins(data.totalJoins);
      SetTotalWorkouts(data.totalWorkout);
    };
    fetchData()
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-12 md:-mt-16 relative z-10 mb-16 lg:mb-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100/80">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">
                Active Challenges
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {totalChallenges}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Total Participants */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100/80">
              <Users className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">
                Total Participants
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {participants}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Starting Soon */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100/80">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">
                Total Joining 
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {totalJoins}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Completed */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100/80">
              <Trophy className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Workouts</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {totalWorkouts}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardsHome;

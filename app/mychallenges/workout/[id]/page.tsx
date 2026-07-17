"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Intensity, Feel } from "@/generated/prisma/enums";

const intensity = Object.values(Intensity);
const feel = Object.values(Feel);

const SubmitRoutine = () => {
  const router = useRouter();

  const [duration, setDuration] = useState("");
  const [burnedCalories, setBurnedCalories] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState<Intensity>();
  const [selectedFeel, setSelectedFeel] = useState<Feel>();
  const [error, setError] = useState('')

  const formatEnumText = (text: string) => {
    const spaced = text.replace(/([A-Z])/g, " $1").trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };

  const { id } = useParams();
  const challengeId = id

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/workout/${challengeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duration: duration,
          burnedCalories: burnedCalories,
          selectedFeel: selectedFeel,
          selectedIntensity: selectedIntensity,
        }),
      });

      const data = await res.json()

      if(res.ok){
        router.push('/mychallenges')
      } else{
        setError(data.error)
      }

    } catch (error) {
      console.error("failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 mb-6 shadow-sm">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Submit Workout Routine
          </h1>
          <p className="text-gray-500">Log your workout progress</p>
        </div>

        {/* --- ERROR BANNER (Beautifully Styled) --- */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 mb-6 shadow-sm"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-red-800">Something went wrong</h3>
              <p className="text-sm text-red-700 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workout Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Workout Details
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 45"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories Burned
                  </label>
                  <input
                    type="number"
                    value={burnedCalories}
                    onChange={(e) => setBurnedCalories(e.target.value)}
                    placeholder="e.g., 350"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Performance Metrics
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Intensity Level *
                </label>
                <div className="flex gap-2">
                  {intensity.map((level) => (
                    <label key={level} className="flex-1">
                      <div
                        onClick={() => setSelectedIntensity(level)}
                        className={`px-2 py-2.5 text-center text-sm font-medium rounded-xl border cursor-pointer transition-all
${
  selectedIntensity === level
    ? "border-orange-500 bg-orange-50 text-orange-600"
    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-800"
}`}
                      >
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How do you feel after this workout? *
                </label>
                <div className="flex gap-2">
                  {feel.map((feelItem, index) => (
                    <label key={index} className="flex-1">
                      <div
                        onClick={() => setSelectedFeel(feelItem)}
                        className={`px-2 py-2.5 text-center text-sm font-medium rounded-xl border cursor-pointer transition-all
${
  selectedFeel === feelItem
    ? "border-orange-500 bg-orange-50 text-orange-600"
    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-800"
}`}
                      >
                        {formatEnumText(feelItem)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-400 text-white transition-all active:scale-[0.98] shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Submit Workout
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  </div>
  );
};

export default SubmitRoutine;

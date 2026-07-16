"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const SubmitRoutine = () => {

  const router = useRouter();

  const [duration, setDuration] = useState('')
  const [burnedCalories, setBurnedCalories] = useState('')

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
            <p className="text-gray-500">Log your workout progress for</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
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
                    {["Low", "Moderate", "High", "Very High"].map((level) => (
                      <label key={level} className="flex-1">
                        <input
                          type="radio"
                          value={level.toLowerCase()}
                          className="sr-only peer"
                          name="intensity"
                        />
                        <div
                          className="px-2 py-2.5 text-center text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-600 cursor-pointer
                          peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600
                          hover:border-gray-300 hover:text-gray-800 transition-all"
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
                    {["😫", "😐", "🙂", "😊", "🤩"].map((emoji, index) => (
                      <label key={index} className="flex-1">
                        <input
                          type="radio"
                          value={index + 1}
                          className="sr-only peer"
                          name="feeling"
                        />
                        <div
                          className="text-2xl text-center py-2.5 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer
                          peer-checked:border-orange-500 peer-checked:bg-orange-50
                          hover:border-gray-300 transition-all"
                        >
                          {emoji}
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

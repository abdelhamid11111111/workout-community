'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Dumbbell, Zap, Trophy } from 'lucide-react'
import { useState } from 'react'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-700 p-12 relative overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.03]" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-extrabold text-sm tracking-tight">FIT</span>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">FitApp</span>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
              Good to see<br />you again.
            </h2>
            <p className="mt-4 text-teal-100 text-base leading-relaxed">
              Your challenges are waiting. Pick up right where you left off.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">1.2K</div>
              <div className="text-xs text-teal-100 mt-0.5 font-medium">Members</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">24</div>
              <div className="text-xs text-teal-100 mt-0.5 font-medium">Challenges</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">8.4K</div>
              <div className="text-xs text-teal-100 mt-0.5 font-medium">Workouts</div>
            </div>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-teal-50 text-sm font-medium">Join challenges & earn reward points</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-teal-50 text-sm font-medium">Track workouts and calories burned</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="text-teal-50 text-sm font-medium">All levels — beginner to advanced</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 text-teal-200 text-xs">
          © 2026 FitApp. All rights reserved.
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-xs tracking-tight">FIT</span>
            </div>
            <span className="text-slate-900 font-extrabold text-base tracking-tight">FitApp</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-500 text-sm">
              Sign in to continue your fitness journey.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:p-8">
            <form className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm mt-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Do not have an account?{' '}
            <Link href="/sign-up" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Sign Up
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  )
}
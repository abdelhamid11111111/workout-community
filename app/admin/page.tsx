'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your authentication logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[#64748b]">
          Sign in to continue to your admin dashboard.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[440px] rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold tracking-wider text-[#334155]">
              EMAIL ADDRESS
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="isaac@neotone.ma"
                required
                className="w-full rounded-xl border border-amber-100 bg-[#fefde8] py-3.5 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold tracking-wider text-[#334155]">
                PASSWORD
              </label>
              <a
                href="#forgot"
                className="text-xs font-semibold text-[#00966d] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-amber-100 bg-[#fefde8] py-3.5 pl-12 pr-12 text-sm font-medium tracking-widest text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00966d] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#007f5c] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Footer Link */}
      <p className="mt-8 text-sm text-slate-500">
        Do not have an account?{' '}
        <a href="#signup" className="font-semibold text-[#00966d] hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default AdminAuth;
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const AdminAuth = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // 1. Same login call as your normal sign-in — admin is just a user.
    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message || 'Invalid email or password.');
      setIsSubmitting(false);
      return;
    }

    // 2. THIS is the admin-specific check: reject anyone whose role isn't admin.
    if (data?.user.role !== 'admin') {
      setError('This account does not have admin access.');
      await authClient.signOut(); // don't leave a valid session for a non-admin sitting around
      setIsSubmitting(false);
      return;
    }

    // 3. Only true admins get past this point.
    router.push('/admin/dashboard');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans antialiased">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#64748b]">Sign in to continue to your admin dashboard.</p>
      </div>

      <div className="w-full max-w-[440px] rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[11px] font-bold tracking-wider text-[#334155]">EMAIL ADDRESS</label>
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

          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-wider text-[#334155]">PASSWORD</label>
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
                className="absolute right-4 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00966d] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#007f5c] active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
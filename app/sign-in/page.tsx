"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // 1. New state: the two fields we're sending to the server,
  //    plus loading/error state to drive the UI.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. The actual sign-in logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser's default full-page form submit
    setError("");
    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message || "Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    // Success: better-auth has already set the session cookie.
    // Send them into the app.
    router.push("/home");
    router.refresh(); // makes sure server components re-read the new session
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Back button — same placement/style as sign-up's SignUp.tsx */}
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-xs tracking-tight">
                FIT
              </span>
            </div>
            <span className="text-slate-900 font-extrabold text-base tracking-tight">
              FitApp
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-500 text-sm">
              Sign in to continue your fitness journey.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:p-8">
            {/* 3. onSubmit wired to handleSubmit */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* 4. Show the error message, if any */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <Link
                    href="/forgot-password"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Do not have an account?{" "}
            <Link
              href="/sign-up"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base sm:text-lg tracking-tight">
                FIT
              </span>
            </div>
            <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight hidden sm:block">
              FitHub
            </span>
          </Link>

          {/* Auth Buttons – more refined */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-slate-700 hover:text-emerald-700 font-medium transition-colors text-sm sm:text-base"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-5 sm:px-7 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Menu className="w-6 h-6 text-slate-800" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

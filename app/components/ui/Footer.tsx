import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
      {/* Brand block */}
      <div className="md:col-span-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">FIT</span>
          </div>
          <p className="font-semibold text-white text-2xl tracking-tight">FitHub</p>
        </div>
        <p className="text-slate-400 leading-relaxed max-w-sm">
          Real challenges, real streaks, real community. Built for people who
          show up daily and want to keep going.
        </p>
      </div>

      {/* Link columns */}
      <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Company
          </p>
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors w-fit">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-white transition-colors w-fit">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Legal
          </p>
          <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors w-fit">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-slate-300 hover:text-white transition-colors w-fit">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>

    <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500">
      © {new Date().getFullYear()} FitHub. All rights reserved.
    </div>
  </div>
</footer>
  );
};

export default Footer;

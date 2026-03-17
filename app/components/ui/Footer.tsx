import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {/* Brand + copyright */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">FIT</span>
            </div>
            <div>
              <p className="font-semibold text-white text-lg tracking-tight">
                FitHub
              </p>
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} FitHub. All rights reserved.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

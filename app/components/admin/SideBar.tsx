"use client";
import {
  BarChart3,
  LayoutDashboard,
  Trophy,
  Users,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar - only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-base sm:text-lg tracking-tight">
            FIT
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Overlay - shown behind sidebar on mobile when open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col py-8 px-4
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:sticky lg:translate-x-0
        `}
      >
        {/* Logo + Close button */}
        <div className="mb-10 px-2 flex items-center justify-between">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">
              FIT
            </span>
          </div>
          {/* Close button - only on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === "/admin/dashboard"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            href="/admin/analytics"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === "/admin/analytics"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>

          <Link
            href="/admin/challenges"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === "/admin/challenges"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Challenges
          </Link>

          <Link
            href="/admin/users"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === "/admin/users"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <Users className="w-5 h-5" />
            Users
          </Link>
        </nav>
      </div>

      {/* Mobile top spacing so content doesn't hide behind the top bar */}
      <div className="lg:hidden h-14" />
    </>
  );
}

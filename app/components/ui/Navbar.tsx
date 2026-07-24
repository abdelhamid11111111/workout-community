"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User as UserIcon, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

type SessionUser = {
  name?: string | null;
  email: string;
  profilePic?: string | null;
};

type Props = {
  initialSession: { user: SessionUser } | null;
};

const Navbar = ({ initialSession }: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const load = () => {
      setMounted(true);
    };
    load();
  }, []);

  if (!mounted) return null;

  const user = isPending
    ? (initialSession?.user ?? null)
    : (session?.user ?? null);

  return (
    <nav className="bg-white/80 dark:bg-neutral-950 backdrop-blur-md border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base sm:text-lg tracking-tight">
                FIT
              </span>
            </div>
            <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight hidden sm:block">
              FitHub
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 dark:border-slate-600  shadow-sm hover:opacity-90 transition"
                  aria-label="Open profile menu"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name ?? "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                    </div>
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 overflow-hidden">
                    <div className="px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 truncate">
                      {user.name}
                    </div>
                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await authClient.signOut();
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors text-sm sm:text-base"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 sm:px-7 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 shrink-0"
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </span>
            </button> */}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {/* <Menu className="w-6 h-6 text-slate-800 dark:text-slate-200" /> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

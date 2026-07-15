"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, User as UserIcon, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type SessionUser = {
  name?: string | null;
  email: string;
  profilePic?: string | null;
};

type Props = {
  initialSession: { user: SessionUser } | null;
};

const Navbar = ({ initialSession }: Props) => {

  // data: get access to data in the browser.
  // isPending is boolean change according loading.

  // get data of session and isPending status from the browser
  const {data: session, isPending} = authClient.useSession()

  const [menuOpen, setMenuOpen] = useState(false);

  // if loading is true get data from server, if false get it from browser
  const user = isPending ? (initialSession?.user ?? null ): (session?.user ?? null)

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

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm hover:opacity-90 transition"
                  aria-label="Open profile menu"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name ?? "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <div className="px-4 py-2 text-sm font-medium text-slate-800 border-b border-slate-100 truncate">
                      {user.name}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await authClient.signOut();
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
              </>
            )}

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
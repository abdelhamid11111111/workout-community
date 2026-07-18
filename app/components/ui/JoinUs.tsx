import Link from "next/link";
import React from "react";

const JoinUs = () => {
  return (
    <div className="relative bg-slate-950 overflow-hidden mt-12 lg:mt-20">
  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600" />

  <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ready to start your journey?
        </h2>
        <p className="text-white/85 mt-1 text-base">
          Join a challenge and become part of our fitness community.
        </p>
      </div>
      <Link
        href="/sign-up"
        className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-white text-amber-700 rounded-full font-bold hover:bg-slate-50 transition-colors"
      >
        Get started
      </Link>
    </div>
  </div>
</div>
  );
};

export default JoinUs;

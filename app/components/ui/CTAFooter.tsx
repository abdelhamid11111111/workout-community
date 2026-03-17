import Link from "next/link";
import React from "react";

const CTAFooter = () => {
  return (
    <div className="relative h-80 lg:h-80 bg-slate-950 overflow-hidden mt-12 lg:mt-20">
      <div className="absolute inset-0 bg-linear-to-br from-amber-600/85 via-orange-600/75 to-amber-700/80" />

      <div className="relative h-full flex items-center">
        <div className="max-w-5xl mx-auto text-center px-6 lg:px-8 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-white tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-white/90 font-light max-w-3xl mx-auto">
            Join a challenge today and become part of our thriving fitness
            community
          </p>
          <Link
            href="/my-challenges"
            className="inline-block px-10 py-4 bg-white text-amber-700 rounded-full font-bold shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-300 text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTAFooter;

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const featuredChallenge = {
  title: "Morning Yoga Flow Challenge",
  description:
    "Start each day with energizing yoga sequences designed to improve flexibility and mental clarity.",
  category: "Yoga",
  tag: "Featured",
  participants: 892,
  duration: "21 days",
  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
};

const FeaturedChallenge = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 md:mb-8 tracking-tight">
          Featured Challenge
        </h2>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <div className="relative h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[520px] bg-slate-200">
            <Image
              src={featuredChallenge.image}
              alt={featuredChallenge.title}
              fill
              className="object-cover brightness-[0.92]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent/30" />

            {/* Navigation buttons – slightly larger on mobile */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/35 backdrop-blur-lg hover:bg-black/55 rounded-full transition-all z-10 md:left-6">
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/35 backdrop-blur-lg hover:bg-black/55 rounded-full transition-all z-10 md:right-6">
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            {/* Content – better spacing & sizing on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-5 xs:p-6 sm:p-8 lg:p-10 text-white">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-4.5xl font-extrabold mb-3 xs:mb-4 leading-tight tracking-tight">
                {featuredChallenge.title}
              </h2>

              <p className="text-sm xs:text-base sm:text-lg text-white/90 mb-5 xs:mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-2">
                {featuredChallenge.description}
              </p>

              <div className="flex flex-wrap gap-4 xs:gap-6 text-xs xs:text-sm sm:text-base mb-6 xs:mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 xs:w-5 xs:h-5" />
                  <span>{featuredChallenge.participants} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 xs:w-5 xs:h-5" />
                  <span>{featuredChallenge.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-3 py-5 bg-slate-50">
            <button className="h-3 w-10 rounded-full bg-emerald-600"></button>
            <button className="h-3 w-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors"></button>
            <button className="h-3 w-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors"></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedChallenge;

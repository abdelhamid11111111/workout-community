"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CardsHome from "../components/ui/CardsHome";
import Navbar from "../components/ui/Navbar";
import FeaturedChallenge from "../components/ui/FeaturedChallenge";
import Challenges from "../components/ui/Challenges";
import Footer from "../components/ui/Footer";
import CTAFooter from "../components/ui/CTAFooter";



const ChallengesHome = () => {
 
 


  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      {/* Navbar – cleaner, more premium feel */}
      <Navbar/>

      {/* Hero – taller on mobile, softer overlay, better typography */}
      <div className="relative h-[85vh] md:h-[70vh] lg:h-[90vh] bg-slate-950 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Hero Background"
          fill
          className="object-cover brightness-[0.65] scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-950/80" />

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
                Community Workout Challenges
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-10 text-slate-200/90 font-light max-w-3xl mx-auto">
                Join thousands of fitness enthusiasts and transform your workout
                routine
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link
                  href="/my-challenges"
                  className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
                >
                  View My Challenges
                </Link>
                <Link
                  href="/leaderboard"
                  className="px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-base sm:text-lg"
                >
                  Leaderboard
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats – softer cards, better icon contrast */}
     <CardsHome/>

      {/* Featured Carousel – cleaner overlay, modern typography */}
      <FeaturedChallenge/>

      {/* Search - Categories - Challenges - Pagination */}
      <Challenges/>

      {/* CTA Footer – richer gradient, better contrast */}
      <CTAFooter/>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ChallengesHome;

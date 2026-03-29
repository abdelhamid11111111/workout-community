"use client";
import { challenge } from "@/app/types/types";
import {
  Calendar,
  Users,
  Clock,
  Target,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



const ChallengePage = () => {
  const { title } = useParams();
  const [challenge, setChallenge] = useState<null | challenge>(null);
  const [pics, setPics] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const router = useRouter()

  const fetchChallenge = async () => {
    try {
      const res = await fetch(`/api/challenge/${title}`);
      const data = await res.json();
      setChallenge(data);
      setGoals(data.goals);
      setPics(data.imgs);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchChallenge();
    };
    load();
  }, [challenge]);

  return (
    <div>
      {challenge && (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          {/* ── Header ── */}
          <div className="relative overflow-hidden bg-white border-b border-slate-200">
            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-8">
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
                <ArrowLeft onClick={() => router.back()} className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-3 mb-4">
                {/* Status badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {challenge.active == true ? 'active' : 'inactive'}
                </span>
                {/* Category badge */}
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
                  {challenge.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 max-w-2xl leading-tight">
                {challenge.title}
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-xl mb-6">
                {challenge.subtitle}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <span className="text-orange-500">
                    <Users className="w-4 h-4" />
                  </span>
                  1,247 Participants
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <span className="text-orange-500">
                    <Calendar className="w-4 h-4" />
                  </span>
                  {challenge.days} days
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <span className="text-orange-500">
                    <Target className="w-4 h-4" />
                  </span>
                  {challenge.level}
                </div>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ── Main Column ── */}
              <div className="lg:col-span-2 space-y-6">
                {/* Gallery */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-orange-500" />
                    Challenge Gallery
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {pics.map(
                      (img, index) =>
                        img && (
                          <div
                            key={index}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border border-slate-100 hover:border-orange-300 transition-colors"
                          >
                            <Image
                              src={img}
                              alt={`Challenge ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                </div>

                {/* About */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-bold text-slate-800 mb-3">
                    About This Challenge
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {challenge.description}
                  </p>
                  <div className="border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      Challenge Goals
                    </h3>
                    <ul className="space-y-3">
                      {goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-slate-600 text-sm">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Sidebar ── */}
              <div className="space-y-5">
                {/* Join card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-5">
                    Join This Challenge
                  </h3>
                  <div className="space-y-1 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-400 text-sm">Duration</span>
                      <span className="font-semibold text-sm text-slate-800">
                        {challenge.days} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-400 text-sm">Difficulty</span>
                      <span className="font-semibold text-sm text-slate-800">
                        {challenge.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-400 text-sm">
                        Participants
                      </span>
                      <span className="font-semibold text-sm text-slate-800">
                        1,247
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-slate-400 text-sm">
                        Reward Points
                      </span>
                      <span className="font-semibold text-sm text-orange-500">
                        {challenge.rewardPoints}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all bg-orange-500 hover:bg-orange-400 text-white shadow-sm shadow-orange-200 active:scale-[0.98]">
                    Join Challenge
                  </button>

                  {challenge.active == true && (
                    <p className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Challenge is currently active
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;

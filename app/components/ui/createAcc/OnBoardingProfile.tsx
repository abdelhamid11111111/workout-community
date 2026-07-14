"use client";
import { ImagePlus, TrendingUp, Clock, Target, Check } from "lucide-react";
import { Level, WorkoutTime, PersonalGoals } from "@/generated/prisma/enums";
import { useState } from "react";

type Props = {
  profilePic: File | null; setProfilePic: (f: File | null) => void;
  currentLevel: Level | ""; setCurrentLevel: (v: Level | "") => void;
  workoutTime: WorkoutTime | ""; setWorkoutTime: (v: WorkoutTime | "") => void;
  personalGoals: PersonalGoals[]; setPersonalGoals: (v: PersonalGoals[]) => void;
  error: string;
};

export default function OnBoardingProfile({
  profilePic, setProfilePic,
  currentLevel, setCurrentLevel,
  workoutTime, setWorkoutTime,
  personalGoals, setPersonalGoals,
  error,
}: Props) {
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

  const levelOptions = Object.values(Level) as Level[];
  const workoutTimeOptions = Object.values(WorkoutTime) as WorkoutTime[];
  const goalOptions = Object.values(PersonalGoals) as PersonalGoals[];

  const formatEnumText = (text: string) => {
    const spaced = text.replace(/([A-Z])/g, " $1").trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const toggleGoal = (goal: PersonalGoals) => {
    setPersonalGoals(
      personalGoals.includes(goal)
        ? personalGoals.filter((g) => g !== goal)
        : [...personalGoals, goal]
    );
  };

  return (
    <div className="px-6 py-16 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a]">
            Complete your profile
          </h1>
          <p className="mt-3 text-slate-500 text-base max-w-md mx-auto">
            A few quick details to customize your dashboard and personalize your fitness journey.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-[11px] font-bold tracking-wider text-[#334155] uppercase">
                  Profile Picture
                </h2>
                <p className="text-xs text-slate-400 mt-1 mb-8">Optional but recommended</p>
              </div>
              <div className="flex items-center gap-6 py-4">
                <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {profilePicPreview ? (
                    <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlus className="w-7 h-7 text-slate-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="inline-block cursor-pointer px-5 py-3 text-xs font-semibold text-[#00966d] bg-[#e6f5f0] hover:bg-[#d1ede2] rounded-xl border border-[#b3e6d5] transition-all active:scale-[0.98]">
                    {profilePic ? "Change photo" : "Upload photo"}
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                  </label>
                  <p className="text-[11px] text-slate-400 block pl-1">JPG or PNG. Max 5MB.</p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
              <h2 className="text-[11px] font-bold tracking-wider text-[#334155] uppercase">
                Fitness Level
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">Helps us recommend the right programs</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {levelOptions.map((level) => {
                  const isSelected = currentLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setCurrentLevel(level)}
                      className={`relative p-5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#00966d] border-[#00966d] text-white shadow-md"
                          : "bg-slate-50 border-slate-200/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50"
                      }`}
                    >
                      {isSelected && <Check className="absolute top-3 right-3 w-4 h-4 text-white" />}
                      <TrendingUp className={`w-5 h-5 mb-3 ${isSelected ? "text-white" : "text-[#00966d]"}`} />
                      <div className="font-bold text-sm">{formatEnumText(level)}</div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
              <h2 className="text-[11px] font-bold tracking-wider text-[#334155] uppercase">
                Workout Time
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">When do you feel most energetic?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {workoutTimeOptions.map((time) => {
                  const isSelected = workoutTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setWorkoutTime(time)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? "bg-[#00966d] border-[#00966d] text-white shadow-md"
                          : "bg-slate-50 border-slate-200/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50"
                      }`}
                    >
                      <Clock className={`w-5 h-5 mb-2 ${isSelected ? "text-white" : "text-[#00966d]"}`} />
                      <div className="font-bold text-xs">{formatEnumText(time)}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
              <h2 className="text-[11px] font-bold tracking-wider text-[#334155] uppercase">
                Personal Goals
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">Select all priorities that apply to you</p>
              <div className="flex flex-wrap gap-2.5">
                {goalOptions.map((goal) => {
                  const active = personalGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        active
                          ? "bg-[#00966d] border-[#00966d] text-white shadow-sm"
                          : "bg-slate-50 border-slate-200/70 text-slate-600 hover:border-slate-300 hover:bg-slate-100/50"
                      }`}
                    >
                      <Target className={`w-3.5 h-3.5 ${active ? "text-white" : "text-[#00966d]"}`} />
                      {formatEnumText(goal)}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
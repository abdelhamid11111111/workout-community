"use client";
import Sidebar from "@/app/components/admin/SideBar";
import { FormType } from "@/app/types/types";
import { ArrowLeft, Plus, X, ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  categories: string[];
  levels: string[];
};

export default function NewChallengePage({ categories, levels }: Props) {
  const [goals, setGoals] = useState(["", "", ""]);
  const [imagePreview, setImagePreview] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [form, setForm] = useState<FormType>({
    title: "",
    subtitle: "",
    description: "",
    days: "",
    rewardPoints: "",
    category: "",
    level: "",
    goals: [],
    images: [null, null, null],
  });
  const router = useRouter()

  const addGoal = () => setGoals([...goals, ""]);
  const removeGoal = (i: number) => {
    setGoals(goals.filter((_, idx) => idx !== i));

    const goalsArray = [...form.goals];
    goalsArray.splice(i, 1);
    setForm({ ...form, goals: goalsArray });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview (display only)
    // take copy existing perv imgs
    const updatedPreviews = [...imagePreview];
    // each pic get its url
    updatedPreviews[i] = URL.createObjectURL(file);
    // update state to be visible
    setImagePreview(updatedPreviews);

    // Store actual File for upload
    // get copy of existing img array
    const updatedImages = [...form.images];
    // put the new file in the right box
    updatedImages[i] = file;
    // save the new array in the form
    setForm({ ...form, images: updatedImages });
  };

  const handleAddChall = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("subtitle", form.subtitle);
      formData.append("days", form.days);
      formData.append("rewardPoints", form.rewardPoints);
      formData.append("category", form.category);
      formData.append("level", form.level);
      form.goals.forEach((goal) => {
        if (goal) formData.append("goals[]", goal);
      });
      form.images.forEach((image) => {
        if (image) formData.append("images[]", image);
      });

      const res = await fetch('/api/challenges', {
        method: 'POST',
        body: formData
      })

      if(res.ok){
        router.push('/admin/challenges')
      }


    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/challenges"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Challenges
            </Link>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              New Challenge
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Fill in the details to create a new challenge.
            </p>
          </div>

          <form className="space-y-6">
            {/* ── Basic Info + Settings ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Basic Info
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. 30-Day Cardio Blast"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) =>
                      setForm({ ...form, subtitle: e.target.value })
                    }
                    name="subtitle"
                    placeholder="e.g. Burn it all in 30 days"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe the challenge in detail..."
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Settings
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                    Duration (days) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="days"
                    min="1"
                    value={form.days}
                    onChange={(e) => setForm({ ...form, days: e.target.value })}
                    placeholder="e.g. 30"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                    Reward Points
                  </label>
                  <input
                    type="number"
                    name="rewardPoints"
                    min="0"
                    value={form.rewardPoints}
                    onChange={(e) =>
                      setForm({ ...form, rewardPoints: e.target.value })
                    }
                    placeholder="e.g. 500"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700">
                      Active on Launch
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 leading-relaxed">
                    Challenge will be visible to users immediately. You can
                    deactivate it anytime from the table.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Category & Level ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category — uses has-checked so Tailwind doesn't purge */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Category <span className="text-rose-500">*</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, index) => (
                    <label
                      key={index}
                      className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100    ${cat === "Cardio" ? "has-checked:bg-red-100    has-checked:text-red-600    has-checked:border-red-300" : ""}
                        ${cat === "Strength" ? "has-checked:bg-indigo-100 has-checked:text-indigo-600 has-checked:border-indigo-300" : ""}
                        ${cat === "Yoga" ? "has-checked:bg-purple-100 has-checked:text-purple-600 has-checked:border-purple-300" : ""}
                        ${cat === "HIIT" ? "has-checked:bg-orange-100 has-checked:text-orange-600 has-checked:border-orange-300" : ""}
                        ${cat === "Pilates" ? "has-checked:bg-pink-100   has-checked:text-pink-600   has-checked:border-pink-300" : ""}
                        ${cat === "Stretching" ? "has-checked:bg-lime-100   has-checked:text-lime-600   has-checked:border-lime-300" : ""}
                        ${cat === "Sports" ? "has-checked:bg-sky-100    has-checked:text-sky-600    has-checked:border-sky-300" : ""}
                        ${cat === "Running" ? "has-checked:bg-teal-100   has-checked:text-teal-600   has-checked:border-teal-300" : ""}
                      transition-all `}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        className="sr-only"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Level <span className="text-rose-500">*</span>
                </h2>
                <div className="flex flex-col gap-3">
                  {levels.map((lv, index) => (
                    <label
                      key={index}
                      className={`cursor-pointer py-3 px-4 rounded-xl text-sm font-semibold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100    ${lv === "beginner" ? "has-checked:bg-emerald-100 has-checked:text-emerald-700 has-checked:border-emerald-300" : ""}
                        ${lv === "intermediate" ? "has-checked:bg-amber-100   has-checked:text-amber-700   has-checked:border-amber-300" : ""}
                        ${lv === "advanced" ? "has-checked:bg-rose-100    has-checked:text-rose-700    has-checked:border-rose-300" : ""}
                      transition-all `}
                    >
                      <input
                        type="radio"
                        name="level"
                        value={lv}
                        onChange={(e) =>
                          setForm({ ...form, level: e.target.value })
                        }
                        className="sr-only"
                      />
                      {lv}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Goals + Images ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Goals — scrollable after 4 */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Goals
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      What users should achieve
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addGoal}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {/* Scroll starts after 4 goals (~172px per 4 rows) */}
                <div className="overflow-y-auto max-h-44 space-y-2 pr-1">
                  {/* The array length creates inputs */}
                  {goals.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <input
                        type="text"
                        value={form.goals[i] ?? ""}
                        onChange={(e) => {
                          // makes a copy: ["", ""] → ["", ""]
                          const updated = [...form.goals];

                          // updates only the typed index, e.g: ["hello", ""]
                          updated[i] = e.target.value;

                          // saves the new array back into form
                          setForm({ ...form, goals: updated });
                        }}
                        name="goals[]"
                        placeholder={`Goal ${i + 1}...`}
                        className="flex-1 px-3 py-2.5 text-sm m-0.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
                      />
                      {goals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGoal(i)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Images
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload up to 3 images
                  </p>
                </div>
                <div className="space-y-3">
                  {imagePreview.map((preview, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
                        {preview ? (
                          <Image
                            src={preview}
                            alt=""
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImagePlus className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block w-full cursor-pointer">
                          <span className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-all">
                            <ImagePlus className="w-3.5 h-3.5" />
                            {preview ? "Change image" : `Upload image ${i + 1}`}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImage(e, i)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      {preview && (
                        <button
                          type="button"
                          onClick={() => {
                            const prevImgs = [...imagePreview];
                            prevImgs[i] = null;
                            setImagePreview(prevImgs);

                            const imgs = [...form.images];
                            imgs[i] = null;
                            setForm({ ...form, images: imgs });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-start gap-3 pt-2">
              <button
                onClick={handleAddChall}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Create Challenge
              </button>
              <Link
                href="/admin/challenges"
                className="flex items-center justify-center py-3 px-6 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

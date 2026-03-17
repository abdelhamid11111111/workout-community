import { Target } from 'lucide-react'
import React from 'react'

const UsrLevel = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
                <Target className="w-4 h-4 text-slate-400" /> User Levels
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Beginner</span>
                    <span className="text-slate-400">541 · 42%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "42%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Intermediate</span>
                    <span className="text-slate-400">488 · 38%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: "38%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Advanced</span>
                    <span className="text-slate-400">255 · 20%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>
  )
}

export default UsrLevel
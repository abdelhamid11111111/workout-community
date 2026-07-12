



export const ChallengeCardSkeleton = ({ index }: { index: number }) => (
  <div
    className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] animate-pulse"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Image, with badge placeholders in the same spots as the real card */}
    <div className="relative h-64 lg:h-72 w-full bg-slate-200">
      <div className="absolute top-5 right-5 h-7 w-16 rounded-full bg-slate-300/70" />
      <div className="absolute bottom-5 left-5 h-7 w-32 rounded-full bg-slate-300/70" />
    </div>

    {/* Content */}
    <div className="p-6 lg:p-7">
      {/* Eyebrow: category · level */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <div className="w-1 h-1 rounded-full bg-slate-200" />
        <div className="h-3 w-12 bg-slate-200 rounded" />
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-slate-200 rounded-lg mb-2.5" />

      {/* Description */}
      <div className="space-y-2.5 mb-6">
        <div className="h-4 w-full bg-slate-200 rounded-lg" />
        <div className="h-4 w-5/6 bg-slate-200 rounded-lg" />
      </div>

      {/* Footer: "View challenge" + arrow circle */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <div className="h-4 w-28 bg-slate-200 rounded-lg" />
        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </div>
    </div>
  </div>
);

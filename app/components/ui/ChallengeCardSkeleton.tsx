const ChallengeCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-2xl dark:bg-neutral-900 overflow-hidden shadow-md border border-slate-100 animate-pulse">
      <div className="flex flex-col lg:flex-row dark:bg-neutral-900 gap-6 lg:gap-8 p-6 lg:p-8">
        {/* Image */}
        <div className="w-full lg:w-56 lg:h-56 dark:bg-neutral-900 h-72 flex-shrink-0 rounded-xl bg-slate-200" />

        {/* Content */}
        <div className="flex-1 dark:bg-neutral-900">
          {/* Title & badges */}
          <div className="mb-5">
            <div className="h-6 lg:h-7 bg-slate-200 rounded-lg w-3/4 mb-3" />
            <div className="flex flex-wrap gap-2.5">
              <div className="h-6 w-20 bg-slate-200 rounded-full" />
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="h-6 w-28 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <div className="h-4 w-28 bg-slate-200 rounded" />
              <div className="h-4 w-10 bg-slate-200 rounded" />
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full" />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-7">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 w-16 bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-12 w-40 bg-slate-200 rounded-xl" />
            <div className="h-12 w-32 bg-slate-200 rounded-xl" />
            <div className="h-12 w-36 bg-slate-200 rounded-xl ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
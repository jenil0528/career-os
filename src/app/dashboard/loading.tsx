export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-9 bg-white/5 rounded-xl w-72" />
        <div className="h-5 bg-white/5 rounded-lg w-96" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5 h-32">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="w-12 h-4 rounded bg-white/5" />
            </div>
            <div className="w-20 h-8 rounded bg-white/5 mb-2" />
            <div className="w-24 h-4 rounded bg-white/5" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-6 h-80">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="w-32 h-5 rounded bg-white/5" />
                <div className="w-48 h-4 rounded bg-white/5" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5" />
            </div>
            <div className="w-full h-52 rounded-xl bg-white/[0.03]" />
          </div>
        ))}
      </div>

      {/* Suggestions skeleton */}
      <div className="space-y-4">
        <div className="w-40 h-6 rounded bg-white/5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-xl p-4 h-24">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 rounded bg-white/5" />
                  <div className="w-full h-3 rounded bg-white/5" />
                  <div className="w-20 h-3 rounded bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-8 animate-pulse">
      <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
      <div className="h-4 w-72 bg-slate-100 rounded-lg mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[110px] bg-slate-100 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[320px] bg-slate-100 rounded-2xl" />
          <div className="h-[260px] bg-slate-100 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="h-5 w-28 bg-slate-200 rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[170px] bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

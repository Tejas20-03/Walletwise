export default function ExpensesLoading() {
  return (
    <div className="p-5 sm:p-6 lg:p-8">
      <div className="mb-6">
        <div className="h-8 w-36 bg-slate-100 rounded-xl animate-pulse mb-2" />
        <div className="h-4 w-64 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      <div className="h-24 bg-slate-100 rounded-2xl animate-pulse mb-6" />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50">
          <div className="h-5 w-32 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="divide-y divide-slate-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="h-7 w-7 rounded-lg bg-slate-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded animate-pulse w-40" />
              </div>
              <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

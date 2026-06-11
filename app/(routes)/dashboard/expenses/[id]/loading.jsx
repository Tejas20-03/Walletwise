export default function ExpenseLoading() {
  return (
    <div className="p-6 md:p-8 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-slate-200 rounded-xl" />
        <div>
          <div className="h-6 w-36 bg-slate-200 rounded-lg mb-1.5" />
          <div className="h-4 w-24 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="h-[170px] bg-slate-100 rounded-2xl" />
        <div className="h-[170px] bg-slate-100 rounded-2xl" />
      </div>
      <div className="h-[320px] bg-slate-100 rounded-2xl" />
    </div>
  );
}

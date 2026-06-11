import Link from "next/link";

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-cyan-100 text-cyan-700",
];

function progressColor(pct, isOver) {
  if (isOver) return "bg-red-500";
  if (pct >= 80) return "bg-orange-400";
  if (pct >= 50) return "bg-amber-400";
  return "bg-emerald-500";
}

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

export default function BudgetItem({ budget }) {
  const amount = Number(budget.amount);
  const spent = Number(budget.totalSpend) || 0;
  const remaining = amount - spent;
  const pct = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;
  const isOver = spent > amount;

  const colorClass = AVATAR_COLORS[budget.id % AVATAR_COLORS.length];
  const initials = budget.name?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <Link href={"/dashboard/expenses/" + budget.id}>
      <div className="group bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-200 cursor-pointer h-[175px] flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`h-11 w-11 ${colorClass} rounded-xl flex items-center justify-center font-bold text-sm shrink-0`}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 leading-tight truncate group-hover:text-indigo-700 transition-colors">
                {budget.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {budget.totalItem} {budget.totalItem === 1 ? "expense" : "expenses"}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-slate-900 text-sm">₹{fmt(amount)}</p>
            {isOver ? (
              <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                Over limit
              </span>
            ) : (
              <p className="text-[10px] text-slate-400 mt-0.5">{pct.toFixed(0)}% used</p>
            )}
          </div>
        </div>

        {/* Bottom: progress */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">₹{fmt(spent)} spent</span>
            <span className={`font-medium ${isOver ? "text-red-500" : "text-slate-500"}`}>
              {isOver
                ? `₹${fmt(Math.abs(remaining))} over`
                : `₹${fmt(remaining)} left`}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${progressColor(pct, isOver)}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

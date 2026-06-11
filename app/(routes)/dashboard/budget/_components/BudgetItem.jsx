import Link from "next/link";
import { getCategoryById } from "@/utils/categories";

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

  const category = getCategoryById(budget.category);
  const Icon = category.icon;

  return (
    <Link href={"/dashboard/expenses/" + budget.id}>
      <div className="group bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-200 cursor-pointer h-[175px] flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`h-11 w-11 ${category.color} rounded-xl flex items-center justify-center shrink-0`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 leading-tight truncate group-hover:text-indigo-700 transition-colors">
                {budget.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 capitalize">{category.label}</p>
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

        {/* Progress */}
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

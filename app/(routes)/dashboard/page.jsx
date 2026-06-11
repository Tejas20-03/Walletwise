import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getBudgetList, getAllExpenses } from "@/app/actions/budget";
import CardsInfo from "./_components/CardsInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

function barColor(pct, isOver) {
  if (isOver) return "bg-red-500";
  if (pct >= 80) return "bg-orange-400";
  if (pct >= 50) return "bg-amber-400";
  return "bg-emerald-500";
}

export default async function DashboardPage() {
  const [user, budgetList] = await Promise.all([currentUser(), getBudgetList()]);

  if (budgetList.length === 0) {
    redirect("/dashboard/budget");
  }

  const allExpenses = await getAllExpenses();
  const expenses = allExpenses.filter((e) => e.id !== null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting}, {user?.firstName}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Here&apos;s a snapshot of your finances today.
        </p>
      </div>

      {/* Stat cards */}
      <CardsInfo budgetList={budgetList} />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-6">
        {/* Left: chart + recent expenses */}
        <div className="lg:col-span-2 space-y-6">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable expensesList={expenses} />
        </div>

        {/* Right: compact budget list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-sm">Your Budgets</h2>
            <Link
              href="/dashboard/budget"
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {budgetList.map((budget) => {
              const amount = Number(budget.amount);
              const spent = Number(budget.totalSpend) || 0;
              const pct = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;
              const isOver = spent > amount;
              return (
                <Link href={`/dashboard/expenses/${budget.id}`} key={budget.id}>
                  <div className="bg-white rounded-xl p-4 border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-sm font-semibold text-slate-800 truncate leading-tight group-hover:text-indigo-700 transition-colors">
                        {budget.name}
                      </p>
                      <span className={`text-xs font-bold ml-2 shrink-0 ${isOver ? "text-red-500" : "text-slate-500"}`}>
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                      <div
                        className={`h-1.5 rounded-full transition-all ${barColor(pct, isOver)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">₹{fmt(spent)} spent</span>
                      <span className="text-xs text-slate-400">of ₹{fmt(amount)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

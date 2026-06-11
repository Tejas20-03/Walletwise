import { getBudgetList } from "@/app/actions/budget";
import BudgetItem from "./_components/BudgetItem";
import CreateBudget from "./_components/CreateBudget";
import { PiggyBank } from "lucide-react";

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

export default async function BudgetPage() {
  const budgetList = await getBudgetList();

  const totalBudget = budgetList.reduce((s, b) => s + Number(b.amount), 0);
  const totalSpent = budgetList.reduce((s, b) => s + (Number(b.totalSpend) || 0), 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Budgets</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Create and manage your spending categories.
        </p>
      </div>

      {/* Summary bar — only when budgets exist */}
      {budgetList.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="pr-5">
              <p className="text-xs text-slate-400 mb-1">Total Budget</p>
              <p className="text-xl font-bold text-slate-900">₹{fmt(totalBudget)}</p>
            </div>
            <div className="px-5">
              <p className="text-xs text-slate-400 mb-1">Spent</p>
              <p className="text-xl font-bold text-rose-600">₹{fmt(totalSpent)}</p>
            </div>
            <div className="pl-5">
              <p className="text-xs text-slate-400 mb-1">Remaining</p>
              <p className={`text-xl font-bold ${remaining < 0 ? "text-red-600" : "text-emerald-600"}`}>
                ₹{fmt(Math.abs(remaining))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {budgetList.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CreateBudget />
          <div className="md:col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <PiggyBank className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">No budgets yet</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Create your first budget to start tracking your spending.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CreateBudget />
          {budgetList.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
}

import { getAllExpensesWithBudget } from "@/app/actions/budget";
import ExpensesFilteredView from "./_components/ExpensesFilteredView";

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

function thisMonthYear() {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}

export default async function AllExpensesPage() {
  const raw = await getAllExpensesWithBudget();
  const expenses = raw.filter((e) => e.id !== null);

  const month = thisMonthYear();
  const thisMonthExpenses = expenses.filter(
    (e) => e.createdAt?.substring(3, 10) === month
  );
  const thisMonthTotal = thisMonthExpenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Expenses</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Every expense logged across all your budgets.
        </p>
      </div>

      {/* This-month summary */}
      {expenses.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <div className="grid grid-cols-2 divide-x divide-slate-100">
            <div className="pr-5">
              <p className="text-xs text-slate-400 mb-1">This Month — Entries</p>
              <p className="text-xl font-bold text-slate-900">{thisMonthExpenses.length}</p>
            </div>
            <div className="pl-5">
              <p className="text-xs text-slate-400 mb-1">This Month — Spent</p>
              <p className="text-xl font-bold text-rose-600">₹{fmt(thisMonthTotal)}</p>
            </div>
          </div>
        </div>
      )}

      <ExpensesFilteredView expensesList={expenses} />
    </div>
  );
}

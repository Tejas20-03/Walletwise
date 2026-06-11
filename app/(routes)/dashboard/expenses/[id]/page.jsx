import { redirect } from "next/navigation";
import { getBudgetById } from "@/app/actions/budget";
import { getExpensesList } from "@/app/actions/expenses";
import BudgetItem from "../../budget/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import BudgetActions from "../_components/BudgetActions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ExpensesPage({ params }) {
  const budgetId = parseInt(params.id);

  const [budgetInfo, expensesList] = await Promise.all([
    getBudgetById(budgetId),
    getExpensesList(budgetId),
  ]);

  if (!budgetInfo) {
    redirect("/dashboard/budget");
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/budget"
            className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Expenses</h1>
            <p className="text-sm text-slate-500 mt-0.5">{budgetInfo.name}</p>
          </div>
        </div>
        <BudgetActions budgetInfo={budgetInfo} />
      </div>

      {/* Budget overview + Add expense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BudgetItem budget={budgetInfo} />
        <AddExpense budgetId={budgetId} />
      </div>

      {/* Expense list */}
      <ExpenseListTable expensesList={expensesList} />
    </div>
  );
}

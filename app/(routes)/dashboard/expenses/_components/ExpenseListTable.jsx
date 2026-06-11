"use client";

import { deleteExpense } from "@/app/actions/expenses";
import { ReceiptText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ExpenseListTable({ expensesList }) {
  const router = useRouter();

  const handleDelete = async (expense) => {
    await deleteExpense(expense.id);
    toast("Expense deleted.");
    router.refresh();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-slate-50 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Latest Expenses</h2>
        <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
          {expensesList.length} {expensesList.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {expensesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-slate-400 gap-3">
          <ReceiptText className="h-10 w-10 opacity-20" />
          <p className="text-sm font-medium">No expenses yet</p>
          <p className="text-xs text-slate-300">Add your first expense above</p>
        </div>
      ) : (
        <>
          {/* Desktop table header — hidden on mobile */}
          <div className="hidden sm:grid sm:grid-cols-4 px-6 py-2.5 bg-slate-50 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</span>
          </div>

          <div className="divide-y divide-slate-50">
            {expensesList.map((expense) => (
              <div key={expense.id} className="group hover:bg-slate-50/70 transition-colors">
                {/* Mobile layout */}
                <div className="flex sm:hidden items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <ReceiptText className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{expense.name}</p>
                      <p className="text-xs text-slate-400">{expense.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-sm font-semibold text-slate-900">
                      ₹{Number(expense.amount).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleDelete(expense)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-4 items-center px-6 py-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <ReceiptText className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 truncate">{expense.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-slate-400">{expense.createdAt}</span>
                  <button
                    onClick={() => handleDelete(expense)}
                    className="text-slate-300 hover:text-red-500 transition-colors w-fit"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

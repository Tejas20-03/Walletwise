"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import AllExpensesTable from "./AllExpensesTable";

function currentMonthYear() {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}

function lastMonthYear() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function ExpensesFilteredView({ expensesList }) {
  const [search, setSearch]           = useState("");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [monthFilter, setMonthFilter]  = useState("current");

  // Unique budgets derived from the list
  const budgets = useMemo(() => {
    const seen = new Set();
    return expensesList.filter((e) => {
      if (!e.budgetId || seen.has(e.budgetId)) return false;
      seen.add(e.budgetId);
      return true;
    }).map((e) => ({ id: e.budgetId, name: e.budgetName }));
  }, [expensesList]);

  const filtered = useMemo(() => {
    const thisMonth = currentMonthYear();
    const prevMonth = lastMonthYear();
    return expensesList.filter((e) => {
      if (search && !e.name?.toLowerCase().includes(search.toLowerCase())) return false;
      if (budgetFilter !== "all" && String(e.budgetId) !== budgetFilter) return false;
      if (monthFilter === "current") {
        if (!e.createdAt || e.createdAt.substring(3, 10) !== thisMonth) return false;
      } else if (monthFilter === "last") {
        if (!e.createdAt || e.createdAt.substring(3, 10) !== prevMonth) return false;
      }
      return true;
    });
  }, [expensesList, search, budgetFilter, monthFilter]);

  const filteredTotal = filtered.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-9 rounded-xl h-10"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Budget filter */}
          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Budgets</option>
            {budgets.map((b) => (
              <option key={b.id} value={String(b.id)}>{b.name}</option>
            ))}
          </select>

          {/* Month filter */}
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="current">This Month</option>
            <option value="last">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Active filter summary */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Total: ₹{filteredTotal.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>

      <AllExpensesTable expensesList={filtered} />
    </div>
  );
}

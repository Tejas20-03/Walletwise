"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const ROUTE_TITLES = {
  "/dashboard": "Overview",
  "/dashboard/budget": "Budgets",
  "/dashboard/expenses": "Expenses",
};

function DashboardHeader() {
  const path = usePathname();
  // expense detail: /dashboard/expenses/[id] — starts with "/dashboard/expenses/" (trailing slash)
  const isExpenseDetail = path.startsWith("/dashboard/expenses/");
  const title = ROUTE_TITLES[path] ?? "Overview";

  return (
    <div className="h-14 px-5 sm:px-6 bg-white/95 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-1.5 text-sm">
        {isExpenseDetail ? (
          <>
            <Link
              href="/dashboard/budget"
              className="text-slate-400 hover:text-indigo-600 transition-colors font-medium"
            >
              Budgets
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-semibold text-slate-800">Expenses</span>
          </>
        ) : (
          <h2 className="font-semibold text-slate-800">{title}</h2>
        )}
      </div>

      {/* UserButton only on mobile — desktop has it in SideNav */}
      <div className="md:hidden">
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;

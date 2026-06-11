"use client";

import { LayoutGrid, PiggyBank, ReceiptText, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const MENU = [
  { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { name: "Budgets",   icon: PiggyBank,  path: "/dashboard/budget" },
  { name: "Expenses",  icon: ReceiptText, path: "/dashboard/expenses" },
];

function isActive(itemPath, currentPath) {
  if (itemPath === "/dashboard") return currentPath === "/dashboard";
  if (itemPath === "/dashboard/budget") {
    // Also active when viewing a specific budget's expenses
    return currentPath === "/dashboard/budget" || currentPath.startsWith("/dashboard/expenses/");
  }
  if (itemPath === "/dashboard/expenses") {
    return currentPath === "/dashboard/expenses";
  }
  return false;
}

function SideNav() {
  const path = usePathname();

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-black tracking-tighter">W</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Wallet<span className="text-indigo-400">Wise</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-5 pb-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        {MENU.map((item) => {
          const active = isActive(item.path, path);
          return (
            <Link href={item.path} key={item.name}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
              }`}>
                <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-slate-500"}`} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Quick action */}
      <div className="px-3 pb-3">
        <Link href="/dashboard/budget">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-800/50 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors border border-slate-700/40 group">
            <div className="h-5 w-5 rounded-md bg-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-colors">
              <Plus className="h-3 w-3 text-white" />
            </div>
            New Budget
          </div>
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-800/60 flex items-center gap-3">
        <UserButton />
        <p className="text-xs text-slate-500">Account settings</p>
      </div>
    </div>
  );
}

export default SideNav;

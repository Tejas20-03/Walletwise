"use client";

import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { name: "Overview",  icon: LayoutGrid,  path: "/dashboard" },
  { name: "Budgets",   icon: PiggyBank,   path: "/dashboard/budget" },
  { name: "Expenses",  icon: ReceiptText, path: "/dashboard/expenses" },
];

function isActive(itemPath, currentPath) {
  if (itemPath === "/dashboard") return currentPath === "/dashboard";
  if (itemPath === "/dashboard/budget") {
    return currentPath === "/dashboard/budget" || currentPath.startsWith("/dashboard/expenses/");
  }
  if (itemPath === "/dashboard/expenses") {
    return currentPath === "/dashboard/expenses";
  }
  return false;
}

function MobileNav() {
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-100 shadow-2xl shadow-slate-900/10 flex md:hidden z-50">
      {MENU.map((item) => {
        const active = isActive(item.path, path);
        return (
          <Link href={item.path} key={item.name} className="flex-1">
            <div className={`relative flex flex-col items-center pt-4 pb-3 gap-1 text-xs font-medium transition-colors ${
              active ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            }`}>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full" />
              )}
              <item.icon className="h-5 w-5" />
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MobileNav;

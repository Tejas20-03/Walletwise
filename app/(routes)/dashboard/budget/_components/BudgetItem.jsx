import Link from "next/link";
import React from "react";

function BudgetItem({ budgetI }) {
  const calculateProgress = () => {
    const perc = (budgetI.totalSpend / budgetI.amount) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link
      href={"/dashboard/expenses/" + budgetI?.id}
      className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl px-4 p-3 bg-slate-100 rounded-full">
            {budgetI?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budgetI?.name}</h2>
            <h2 className="text-sm text-gray-500">
              {budgetI.totalItem} Item{budgetI?.totalItem !== 1 ? "s" : ""}
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budgetI.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">
            ${budgetI.totalSpend ? budgetI.totalSpend : 0} Spend
          </h2>
          <h2 className="text-xs text-slate-400">
            ${budgetI.amount - budgetI.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;

import React from "react";

function BudgetItem({ budget }) {
  return (
    <div>
      <div>
        <h2 className="text-3xl p-2 bg-slate-100 rounded-full">
          {budget?.icon}
        </h2>
        <div>
          <h2>{budget.name}</h2>
          <h2>{budget.totalItems}</h2>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;

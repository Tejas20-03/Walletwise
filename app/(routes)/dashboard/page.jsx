"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardsInfo from "./_components/CardsInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budget/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function page() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);
  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div>
      <div className="p-8">
        <h2 className="font-bold text-3xl">Hi, {user?.fullName}✌️</h2>
        <p className="text-gray-500">
          Here's what happenning with your money, Let's Manage your Expenses
        </p>
        <CardsInfo budgetList={budgetList} />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
          <div className="md:col-span-2">
            <BarChartDashboard budgetList={budgetList} />
            <ExpenseListTable
              expensesList={expensesList}
              refreshData={() => getBudgetList()}
            />
          </div>
          <div className="grid gap-5">
            {budgetList.map((budget, index) => (
              <BudgetItem budgetI={budget} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

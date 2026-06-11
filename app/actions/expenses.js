"use server";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

async function getUserEmail() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user.primaryEmailAddress?.emailAddress;
}

export async function addExpense({ name, amount, budgetId }) {
  const email = await getUserEmail();
  const [owned] = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, email)));
  if (!owned) throw new Error("Unauthorized");

  return db
    .insert(Expenses)
    .values({
      name,
      amount,
      budgetId,
      createdAt: new Date().toLocaleDateString("en-GB"),
    })
    .returning({ insertedId: Expenses.id });
}

export async function deleteExpense(expenseId) {
  const email = await getUserEmail();
  const [expense] = await db
    .select({ id: Expenses.id })
    .from(Expenses)
    .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(and(eq(Expenses.id, expenseId), eq(Budgets.createdBy, email)));
  if (!expense) throw new Error("Unauthorized");
  return db.delete(Expenses).where(eq(Expenses.id, expenseId)).returning();
}

export async function getExpensesList(budgetId) {
  return db
    .select()
    .from(Expenses)
    .where(eq(Expenses.budgetId, budgetId))
    .orderBy(desc(Expenses.id));
}

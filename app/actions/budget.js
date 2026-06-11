"use server";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

async function getUserEmail() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user.primaryEmailAddress?.emailAddress;
}

export async function getBudgetList() {
  const email = await getUserEmail();
  return db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, email))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
}

export async function getBudgetById(budgetId) {
  const email = await getUserEmail();
  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(and(eq(Budgets.createdBy, email), eq(Budgets.id, budgetId)))
    .groupBy(Budgets.id);
  return result[0] ?? null;
}

export async function createBudget({ name, amount }) {
  const email = await getUserEmail();
  return db
    .insert(Budgets)
    .values({ name, amount, createdBy: email })
    .returning({ insertId: Budgets.id });
}

export async function updateBudget(budgetId, { name, amount }) {
  const email = await getUserEmail();
  const [owned] = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, email)));
  if (!owned) throw new Error("Unauthorized");
  return db
    .update(Budgets)
    .set({ name, amount })
    .where(eq(Budgets.id, budgetId))
    .returning();
}

export async function deleteBudget(budgetId) {
  const email = await getUserEmail();
  const [owned] = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, email)));
  if (!owned) throw new Error("Unauthorized");
  await db.delete(Expenses).where(eq(Expenses.budgetId, budgetId));
  return db.delete(Budgets).where(eq(Budgets.id, budgetId)).returning();
}

export async function checkUserBudgets() {
  const email = await getUserEmail();
  return db.select().from(Budgets).where(eq(Budgets.createdBy, email));
}

export async function getAllExpenses() {
  const email = await getUserEmail();
  return db
    .select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt,
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, email))
    .orderBy(desc(Expenses.id));
}

export async function getAllExpensesWithBudget() {
  const email = await getUserEmail();
  return db
    .select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt,
      budgetId: Budgets.id,
      budgetName: Budgets.name,
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, email))
    .orderBy(desc(Expenses.id));
}

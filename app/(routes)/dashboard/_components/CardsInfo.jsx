"use client";

import { PiggyBank, ReceiptText, ShieldCheck, Wallet } from "lucide-react";

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

export default function CardsInfo({ budgetList }) {
  const totalBudget = budgetList.reduce((s, b) => s + Number(b.amount), 0);
  const totalSpend  = budgetList.reduce((s, b) => s + (Number(b.totalSpend) || 0), 0);
  const remaining   = totalBudget - totalSpend;
  const spendPct    = totalBudget > 0 ? ((totalSpend / totalBudget) * 100).toFixed(0) : 0;
  const isOver      = remaining < 0;

  const onTrack     = budgetList.filter((b) => (Number(b.totalSpend) || 0) <= Number(b.amount)).length;
  const overCount   = budgetList.length - onTrack;
  const healthScore = budgetList.length > 0 ? Math.round((onTrack / budgetList.length) * 100) : 100;
  const healthColor = healthScore >= 75 ? "text-emerald-600" : healthScore >= 40 ? "text-amber-500" : "text-red-500";
  const healthBg    = healthScore >= 75 ? "bg-emerald-50"    : healthScore >= 40 ? "bg-amber-50"    : "bg-red-50";

  const cards = [
    {
      label:    "Total Budget",
      value:    `₹${fmt(totalBudget)}`,
      sub:      `${budgetList.length} active budget${budgetList.length !== 1 ? "s" : ""}`,
      icon:     PiggyBank,
      iconBg:   "bg-indigo-50",
      iconColor:"text-indigo-600",
    },
    {
      label:    "Spent This Month",
      value:    `₹${fmt(totalSpend)}`,
      sub:      `${spendPct}% of total budget`,
      icon:     ReceiptText,
      iconBg:   "bg-rose-50",
      iconColor:"text-rose-500",
    },
    {
      label:    isOver ? "Over Budget" : "Remaining",
      value:    `₹${fmt(Math.abs(remaining))}`,
      sub:      isOver ? "Exceeded your limit" : "Available to spend",
      icon:     Wallet,
      iconBg:   isOver ? "bg-red-50"     : "bg-emerald-50",
      iconColor:isOver ? "text-red-500"  : "text-emerald-600",
      overBudget: isOver,
    },
    {
      label:    "Budget Health",
      value:    `${healthScore}%`,
      sub:      overCount === 0
                  ? "All budgets on track"
                  : `${overCount} budget${overCount > 1 ? "s" : ""} over limit`,
      icon:     ShieldCheck,
      iconBg:   healthBg,
      iconColor: healthColor,
      overBudget: healthScore < 40,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`h-11 w-11 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
            <card.icon className={`h-5 w-5 ${card.iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 mb-0.5">{card.label}</p>
            <p className={`text-lg font-bold leading-tight ${card.overBudget ? "text-red-600" : "text-slate-900"}`}>
              {card.value}
            </p>
            <p className={`text-xs mt-0.5 ${card.overBudget ? "text-red-500 font-medium" : "text-slate-400"}`}>
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addExpense } from "@/app/actions/expenses";
import { Loader, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddExpense({ budgetId }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = async () => {
    if (!name.trim() || !Number(amount) > 0) return;
    setLoading(true);
    try {
      await addExpense({ name: name.trim(), amount, budgetId });
      setName("");
      setAmount("");
      router.refresh();
      toast("Expense added!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
          <PlusCircle className="h-4 w-4 text-indigo-600" />
        </div>
        <h2 className="font-semibold text-slate-900">Add Expense</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1.5">
            Expense Name
          </label>
          <Input
            className="rounded-xl h-11"
            placeholder="e.g. Groceries, Netflix, Rent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1.5">
            Amount (₹)
          </label>
          <Input
            type="number"
            min="0.01"
            step="0.01"
            className="rounded-xl h-11"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={!(name.trim() && Number(amount) > 0) || loading}
          className="w-full h-11 rounded-xl font-semibold"
        >
          {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Add Expense"}
        </Button>
      </div>
    </div>
  );
}

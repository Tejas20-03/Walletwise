"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/utils/categories";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateBudget } from "@/app/actions/budget";

export default function EditBudget({ budgetInfo }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("other");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo.name ?? "");
      setAmount(budgetInfo.amount ?? "");
      setCategory(budgetInfo.category ?? "other");
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    await updateBudget(budgetInfo.id, { name, amount, category });
    setOpen(false);
    router.refresh();
    toast("Budget updated!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 rounded-xl h-10">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Update Budget</DialogTitle>
          <DialogDescription className="text-slate-500">
            Change the name, limit, or category for this budget.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-1">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Budget Name</label>
            <Input
              className="rounded-xl h-11"
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Monthly Limit (₹)</label>
            <Input
              type="number"
              min="1"
              className="rounded-xl h-11"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const selected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`h-7 w-7 rounded-lg ${cat.color} flex items-center justify-center shrink-0`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="rounded-xl">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!(name.trim() && Number(amount) > 0)}
            onClick={onUpdateBudget}
            className="rounded-xl font-semibold"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

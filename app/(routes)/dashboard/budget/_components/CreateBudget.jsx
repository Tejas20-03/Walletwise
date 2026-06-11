"use client";

import { Button } from "@/components/ui/button";
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
import { createBudget } from "@/app/actions/budget";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateBudget() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onCreateBudget = async () => {
    await createBudget({ name, amount });
    setName("");
    setAmount("");
    setOpen(false);
    router.refresh();
    toast("Budget created!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-2xl p-5 border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200 cursor-pointer h-[170px] flex flex-col items-center justify-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
            <Plus className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-sm font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">
            Create New Budget
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Budget</DialogTitle>
          <DialogDescription className="text-slate-500">
            Set a spending limit to start tracking expenses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Budget Name
            </label>
            <Input
              className="rounded-xl h-11"
              placeholder="e.g. Groceries, Rent, Travel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Monthly Limit (₹)
            </label>
            <Input
              type="number"
              min="1"
              className="rounded-xl h-11"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="rounded-xl">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!(name.trim() && Number(amount) > 0)}
            onClick={onCreateBudget}
            className="rounded-xl font-semibold"
          >
            Create Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

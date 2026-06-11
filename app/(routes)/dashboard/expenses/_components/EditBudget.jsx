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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateBudget } from "@/app/actions/budget";

export default function EditBudget({ budgetInfo }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo.name ?? "");
      setAmount(budgetInfo.amount ?? "");
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    await updateBudget(budgetInfo.id, { name, amount });
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

      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Update Budget</DialogTitle>
          <DialogDescription className="text-slate-500">
            Change the name or limit for this budget.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Budget Name
            </label>
            <Input
              className="rounded-xl h-11"
              placeholder="e.g. Groceries"
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

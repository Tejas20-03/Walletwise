"use client";

import { useRouter } from "next/navigation";
import EditBudget from "./EditBudget";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBudget } from "@/app/actions/budget";
import { toast } from "sonner";

export default function BudgetActions({ budgetInfo }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBudget(budgetInfo.id);
    toast("Budget deleted.");
    router.replace("/dashboard/budget");
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <EditBudget budgetInfo={budgetInfo} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="flex gap-2 rounded-xl h-10">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this budget?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{budgetInfo?.name}</strong> and all its expenses. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Delete Budget
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

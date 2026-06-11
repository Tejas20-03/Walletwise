"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        We had trouble loading your data. This is usually temporary.
      </p>
      <Button onClick={reset} className="rounded-xl px-6">
        Try again
      </Button>
    </div>
  );
}

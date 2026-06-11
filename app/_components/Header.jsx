"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-100">
      <div className="mx-auto max-w-screen-xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-200">
            <span className="text-white text-sm font-black tracking-tighter">W</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Wallet<span className="text-indigo-600">Wise</span>
          </span>
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="rounded-lg font-medium">
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="rounded-lg font-medium text-slate-600">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="rounded-lg font-semibold px-4">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

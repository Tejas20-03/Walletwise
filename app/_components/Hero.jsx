"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PiggyBank, ReceiptText, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: PiggyBank,
    title: "Smart Budgeting",
    description: "Create custom budgets for every category and stay on top of your financial goals.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    icon: ReceiptText,
    title: "Expense Tracking",
    description: "Log every expense instantly. Never lose track of where your money is going.",
    color: "from-rose-400 to-pink-600",
  },
  {
    icon: TrendingUp,
    title: "Visual Insights",
    description: "Beautiful charts give you a clear picture of your spending patterns and trends.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your financial data is protected with bank-grade security. Always.",
    color: "from-amber-400 to-orange-500",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create your budgets",
    description:
      "Set a spending limit for each category — groceries, rent, subscriptions, anything. Takes 30 seconds.",
  },
  {
    n: "02",
    title: "Log your expenses",
    description:
      "Add expenses as you spend. WalletWise tracks how much you've used in each budget automatically.",
  },
  {
    n: "03",
    title: "Stay in control",
    description:
      "See exactly where your money goes with live charts and instant alerts when you're near your limit.",
  },
];

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-indigo-50 blur-3xl opacity-70" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-50 blur-3xl opacity-60" />
        </div>

        <div className="mx-auto max-w-screen-xl px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-100">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Smart Budget Management
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto">
            Take control of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4845d2] to-violet-500">
              your finances
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Create budgets, track every expense, and get clear insights into your
            spending — all in one beautifully simple app.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="h-12 px-7 text-base font-semibold rounded-xl shadow-lg shadow-indigo-200 gap-2">
                {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {!isSignedIn && (
              <Link href="/sign-in">
                <Button variant="ghost" className="h-12 px-5 text-base rounded-xl text-slate-600">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mx-auto max-w-screen-xl px-6 pb-0 relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200">
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10 pointer-events-none"
              style={{ top: "60%" }}
            />
            <Image
              src="/bg.png"
              alt="WalletWise dashboard preview"
              width={1200}
              height={700}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Simple process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              How WalletWise works
            </h2>
            <p className="mt-4 text-slate-500 max-w-md mx-auto">
              Three steps to complete financial clarity. No complexity, no learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200" />

            {STEPS.map((step, i) => (
              <div key={step.n} className="flex flex-col items-center text-center relative">
                <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-200 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Everything you need to manage money
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">
              Simple, powerful tools that make budgeting feel effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div
                  className={`h-11 w-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-200`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to take charge of your money?
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto">
            Join thousands of people managing their finances smarter with WalletWise.
          </p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="inline-block mt-8">
            <Button className="h-12 px-8 text-base font-semibold rounded-xl bg-white text-slate-900 hover:bg-slate-100 gap-2">
              {isSignedIn ? "Open Dashboard" : "Start for Free"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Hero;

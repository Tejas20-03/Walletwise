import Link from "next/link";

const STATS = [
  { value: "10K+", label: "Active users" },
  { value: "₹2Cr+", label: "Budgets tracked" },
  { value: "100%", label: "Free to use" },
  { value: "5 stars", label: "User rating" },
];

function Wordmark({ dark = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
        <span className="text-white text-sm font-black tracking-tighter">W</span>
      </div>
      <span className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        Wallet<span className={dark ? "text-indigo-400" : "text-indigo-600"}>Wise</span>
      </span>
    </Link>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex flex-col bg-slate-950 p-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Wordmark dark />
        </div>

        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-white text-3xl font-bold leading-tight">
            Smart money management
            <br />
            for modern life.
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed max-w-sm">
            Track expenses, build budgets, and gain full visibility over your
            finances — all in one place.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-sm relative z-10">
          &copy; {new Date().getFullYear()} WalletWise. All rights reserved.
        </p>
      </div>

      {/* Right panel — auth form */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
        <div className="lg:hidden mb-8">
          <Wordmark />
        </div>
        {children}
      </div>
    </div>
  );
}

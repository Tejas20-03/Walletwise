import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-xs">
            <Image
              src="/logo.png"
              width={120}
              height={44}
              alt="WalletWise"
              className="brightness-0 invert"
            />
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Smart budget tracking for modern people. Know where every rupee goes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {["Dashboard", "Budgets", "Expenses"].map((item) => (
                  <li key={item}>
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Account</h4>
              <ul className="space-y-3">
                {[
                  { label: "Sign In", href: "/sign-in" },
                  { label: "Sign Up", href: "/sign-up" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-slate-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} WalletWise. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">Built for better finances.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

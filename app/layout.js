import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "WalletWise | Expense Tracker",
  description: "Track your Expenses on the go",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
    <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

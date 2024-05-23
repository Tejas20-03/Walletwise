import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
    },
  ];
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <h2 className="flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer hover:text-primary hover:bg-blue-100">
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;

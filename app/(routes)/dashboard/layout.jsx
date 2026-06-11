import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import MobileNav from "./_components/MobileNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed md:w-64 hidden md:block top-0 left-0 bottom-0 z-50">
        <SideNav />
      </div>
      <div className="md:ml-64 pb-16 md:pb-0">
        <DashboardHeader />
        {children}
      </div>
      <MobileNav />
    </div>
  );
}

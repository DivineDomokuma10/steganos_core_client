import { ReactNode } from "react";
import HeaderNav from "./header-nav";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen min-h-screen flex flex-col">
      <HeaderNav />
      {children}
    </main>
  );
};

export default DashboardWrapper;

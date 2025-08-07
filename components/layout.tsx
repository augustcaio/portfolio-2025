"use client";

import FloatingSidebar from "./floating-sidebar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="h-screen bg-background transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Floating Sidebar */}
        <FloatingSidebar />

        <main
          className={`flex-1 ${isHomePage ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

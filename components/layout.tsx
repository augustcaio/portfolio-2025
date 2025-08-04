"use client";

import FloatingSidebar from "./floating-sidebar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col min-h-screen">
        {/* Floating Sidebar */}
        <FloatingSidebar />

        <AnimatePresence mode="wait" initial={false}>
          <main key={pathname} className="flex-grow">
            {children}
          </main>
        </AnimatePresence>
      </div>
    </div>
  );
}

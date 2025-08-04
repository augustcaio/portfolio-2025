"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Projetos", href: "/projetos" },
  { name: "Contato", href: "/contato" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-8">
      <Link href="/" className="flex items-center space-x-2">
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Augusto Caio
          </span>
        </div>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.name}
              {isActive && (
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-md" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

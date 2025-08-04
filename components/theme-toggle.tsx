"use client";

import { useContext } from "react";
import { ThemeContext } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const context = useContext(ThemeContext);

  // Se o contexto não estiver disponível, renderizar um placeholder
  if (!context) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-full"
        disabled
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </Button>
    );
  }

  const { theme, toggleTheme, mounted } = context;

  // Não renderizar até que o componente esteja montado
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-full"
        disabled
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="h-9 w-9 p-0 rounded-full"
        aria-label={`Alternar para modo ${
          theme === "light" ? "escuro" : "claro"
        }`}
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}

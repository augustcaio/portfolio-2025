"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ThemeToggle({
  size = "md",
  className = "",
}: ThemeToggleProps) {
  const context = useContext(ThemeContext);
  const [isAnimating, setIsAnimating] = useState(false);

  // Configurações de tamanho baseadas no prop size
  const sizeConfig = {
    sm: {
      button: "h-8 w-8",
      icon: "h-4 w-4",
    },
    md: {
      button: "h-10 w-10",
      icon: "h-4 w-4",
    },
    lg: {
      button: "h-12 w-12",
      icon: "h-5 w-5",
    },
  };

  const config = sizeConfig[size];

  // Se o contexto não estiver disponível, renderizar um placeholder
  if (!context) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`${config.button} p-0 rounded-full ${className}`}
        disabled
      >
        <Sun className={config.icon} aria-hidden="true" />
      </Button>
    );
  }

  const { theme, toggleTheme, mounted } = context;

  // Não renderizar até que o componente esteja montado
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`${config.button} p-0 rounded-full ${className}`}
        disabled
      >
        <Sun className={config.icon} aria-hidden="true" />
      </Button>
    );
  }

  const handleToggle = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    toggleTheme();

    // Aguarda a animação terminar antes de permitir nova troca
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`${config.button} p-0 rounded-full relative overflow-hidden ${className}`}
      disabled={isAnimating}
      aria-label={`Alternar para modo ${
        theme === "light" ? "escuro" : "claro"
      }`}
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className={config.icon} aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className={config.icon} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

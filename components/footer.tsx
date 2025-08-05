import { motion } from "framer-motion";
import GitHubStats from "./github-stats";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted h-[80px] lg:h-[100px] lg:flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-4 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Estatísticas do GitHub */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            <GitHubStats />
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-center lg:text-right"
          >
            <p className="text-xs lg:text-sm text-muted-foreground">
              © {currentYear} Augusto Caio. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground mt-1 hidden lg:block">
              Desenvolvido com Next.js, TypeScript e Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

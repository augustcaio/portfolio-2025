import GitHubStats from "./github-stats";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted h-[80px] lg:h-[100px] lg:flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-4 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Estatísticas do GitHub */}
          <div>
            <GitHubStats />
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-xs lg:text-sm text-muted-foreground">
              © {currentYear} Augusto Caio. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground mt-1 hidden lg:block">
              Desenvolvido com Next.js, TypeScript e Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

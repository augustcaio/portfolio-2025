"use client";

import Layout from "@/components/layout";
import ProjectCard from "@/components/project-card";
import ProjectsSkeleton from "@/components/projects-skeleton";
import { fetchProjects } from "@/lib/api";
import { Suspense, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Github, Calendar, Code, RefreshCw } from "lucide-react";
import LanguageFilter from "@/components/language-filter";
import { Project } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import AnimatedLoader from "@/components/animated-loader";
import PageTransition from "@/components/page-transition";
import { usePathname } from "next/navigation";
import GitHubStats from "@/components/github-stats";
import { motion, AnimatePresence } from "framer-motion";

// Componente wrapper para renderização apenas no cliente
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <ProjectsSkeleton />;
  }

  return <>{children}</>;
}

function ProjectsList() {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [usingFallback, setUsingFallback] = useState(false);
  const projectsPerPage = 6;

  const loadProjects = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);

      // Mostrar loading imediatamente
      console.log("🔄 [CLIENT] Carregando projetos da API local...");

      // Verificar cache local (5 minutos) - apenas se localStorage estiver disponível
      const cacheKey = "projects-cache";
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem("projects-cache-time");

        if (cachedData && cacheTime) {
          const cacheAge = Date.now() - parseInt(cacheTime);
          if (cacheAge < 5 * 60 * 1000) {
            // 5 minutos
            console.log("✅ [CLIENT] Usando dados do cache local");
            const data = JSON.parse(cachedData);
            setProjects(data);
            setFilteredProjects(data);
            setDisplayedProjects(data.slice(0, projectsPerPage));
            setLastFetch(Date.now());
            setLoading(false);
            return;
          }
        }
      }

      const data = await fetchProjects();
      console.log(`✅ [CLIENT] ${data.length} projetos carregados com sucesso`);
      console.log(
        "🔍 [CLIENT] Dados dos projetos:",
        data.map((p) => ({ name: p.name, languages: p.languages }))
      );

      // Salvar no cache local - apenas se localStorage estiver disponível
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem("projects-cache-time", Date.now().toString());
      }

      // Verificar se está usando dados de fallback (baseado no primeiro projeto)
      const isUsingFallback =
        data.length > 0 &&
        data[0].name === "portfolio-2025" &&
        data[0].id === 1;
      setUsingFallback(isUsingFallback);

      if (isUsingFallback) {
        console.log(
          "⚠️ [CLIENT] Usando dados de fallback - APIs externas indisponíveis"
        );
      } else {
        console.log("✅ [CLIENT] Usando dados reais das APIs");
      }

      setProjects(data);
      setFilteredProjects(data);
      setDisplayedProjects(data.slice(0, projectsPerPage));
      setLastFetch(Date.now());
    } catch (error) {
      console.error("❌ [CLIENT] Erro ao carregar projetos:", error);
      setUsingFallback(true);

      // Garantir que sempre temos dados para mostrar
      if (projects.length === 0) {
        console.log("🔄 [CLIENT] Aplicando dados de fallback após erro...");
        const fallbackData: Project[] = [
          {
            id: 1,
            name: "portfolio-2025",
            description:
              "Portfolio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS",
            html_url: "https://github.com/augustcaio/portfolio-2025",
            homepage: "https://portfolio-2025.vercel.app",
            language: "TypeScript",
            languages: { TypeScript: 60, HTML: 25, CSS: 15 },
            stargazers_count: 5,
            forks_count: 2,
            updated_at: "2024-01-15T10:30:00Z",
            topics: ["nextjs", "typescript", "tailwind", "portfolio"],
          },
          {
            id: 2,
            name: "api-github-proxy",
            description:
              "API proxy para buscar dados do GitHub de forma segura",
            html_url: "https://github.com/augustcaio/api-github-proxy",
            homepage: null,
            language: "JavaScript",
            languages: { JavaScript: 80, JSON: 20 },
            stargazers_count: 3,
            forks_count: 1,
            updated_at: "2024-01-10T14:20:00Z",
            topics: ["api", "github", "proxy", "nodejs"],
          },
        ];
        setProjects(fallbackData);
        setFilteredProjects(fallbackData);
        setDisplayedProjects(fallbackData.slice(0, projectsPerPage));
      }
    } finally {
      setLoading(false);
    }
  };

  // Carregar projetos quando o componente for montado (apenas no cliente)
  useEffect(() => {
    // Garantir que estamos no cliente antes de executar
    if (typeof window !== "undefined") {
      loadProjects();
    }
  }, []); // Array de dependências vazio garante que só execute uma vez por montagem

  // Carregar projetos sempre que o usuário navegar para esta página
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/projetos") {
      console.log(
        "📍 Usuário navegou para a página de projetos - carregando dados frescos"
      );
      loadProjects();
    }
  }, [pathname]); // Executa sempre que o pathname mudar

  // Função para recarregar projetos manualmente
  const refreshProjects = async () => {
    console.log("🔄 [CLIENT] Recarregando projetos manualmente...");

    // Limpar cache local - apenas se localStorage estiver disponível
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("projects-cache");
      localStorage.removeItem("projects-cache-time");
    }

    await loadProjects();
    setCurrentPage(1); // Reset para a primeira página
  };

  const handleFilterChange = (filtered: Project[]) => {
    setFilteredProjects(filtered);
    setDisplayedProjects(filtered.slice(0, projectsPerPage));
    setCurrentPage(1);
  };

  const loadMoreProjects = () => {
    setLoadingMore(true);

    // Simular delay para melhor UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * projectsPerPage;
      const newProjects = filteredProjects.slice(startIndex, endIndex);

      setDisplayedProjects(newProjects);
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 500);
  };

  const hasMoreProjects = displayedProjects.length < filteredProjects.length;

  if (loading) {
    return <ProjectsSkeleton />;
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Container com largura fixa para todo o conteúdo */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtro por Linguagem */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="w-full sm:w-48 lg:w-56 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-sm sm:text-base font-semibold text-foreground">
                      <span>Projetos (0)</span>
                      {loading && (
                        <span className="ml-2 text-sm text-primary">
                          🔄 Carregando...
                        </span>
                      )}
                      {usingFallback && !loading && (
                        <span className="ml-2 text-sm text-destructive">
                          ⚠️ Modo offline
                        </span>
                      )}
                    </h2>

                    {/* Separador vertical */}
                    <div className="hidden sm:block w-px h-6 bg-border"></div>

                    {/* Botão de Refresh - agora ao lado do título no mobile */}
                    <div className="flex-shrink-0 sm:hidden">
                      <Button
                        onClick={refreshProjects}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 px-1.5 py-0.5 h-6 text-xs bg-card border-border text-card-foreground"
                      >
                        <RefreshCw className={`h-2.5 w-2.5`} />
                        <span>{loading ? "..." : "Atualizar"}</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {lastFetch > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Última atualização:{" "}
                    {new Date(lastFetch).toLocaleTimeString("pt-BR")}
                    {usingFallback && (
                      <span className="ml-1 text-destructive">
                        (dados de exemplo)
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className="w-full sm:flex sm:flex-row sm:items-center sm:space-x-3">
                <div className="w-full sm:flex-shrink-0 sm:w-auto">
                  <LanguageFilter
                    projects={projects}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                {/* Botão de Refresh - visível apenas em desktop */}
                <div className="flex-shrink-0 hidden sm:block">
                  <Button
                    onClick={refreshProjects}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-card border-border text-card-foreground"
                  >
                    <RefreshCw className={`h-4 w-4`} />
                    <span>{loading ? "Carregando..." : "Atualizar"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center py-8 sm:py-12"
          role="status"
          aria-live="polite"
        >
          <div className="max-w-md mx-auto px-4">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-muted rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {projects.length === 0
                ? "Não foi possível carregar os projetos no momento."
                : "Não há projetos para a linguagem selecionada."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Estatísticas dos projetos filtrados
  const totalProjects = filteredProjects.length;
  const totalStars = filteredProjects.reduce(
    (sum, project) => sum + project.stargazers_count,
    0
  );

  // Extrair todas as linguagens únicas dos projetos filtrados
  const allLanguages = new Set<string>();
  filteredProjects.forEach((project) => {
    // Adicionar linguagem principal se existir
    if (project.language) {
      allLanguages.add(project.language);
    }

    // Adicionar todas as linguagens do objeto languages
    if (project.languages && Object.keys(project.languages).length > 0) {
      Object.keys(project.languages).forEach((lang) => {
        allLanguages.add(lang);
      });
    }
  });

  const languages = Array.from(allLanguages).sort();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Container com largura fixa para todo o conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Filtro por Linguagem */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <div className="w-full sm:w-48 lg:w-56 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-sm sm:text-base font-semibold text-foreground">
                    <span>
                      Projetos ({displayedProjects.length} de {totalProjects})
                    </span>
                    {loading && (
                      <span className="ml-2 text-sm text-primary">
                        🔄 Carregando...
                      </span>
                    )}
                    {usingFallback && !loading && (
                      <span className="ml-2 text-sm text-destructive">
                        ⚠️ Modo offline
                      </span>
                    )}
                  </h2>

                  {/* Separador vertical */}
                  <div className="hidden sm:block w-px h-6 bg-border"></div>

                  {/* Botão de Refresh - agora ao lado do título no mobile */}
                  <div className="flex-shrink-0 sm:hidden">
                    <Button
                      onClick={refreshProjects}
                      disabled={loading}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 px-1.5 py-0.5 h-6 text-xs bg-card border-border text-card-foreground"
                    >
                      <RefreshCw className={`h-2.5 w-2.5`} />
                      <span>{loading ? "..." : "Atualizar"}</span>
                    </Button>
                  </div>
                </div>
              </div>

              {lastFetch > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Última atualização:{" "}
                  {new Date(lastFetch).toLocaleTimeString("pt-BR")}
                  {usingFallback && (
                    <span className="ml-1 text-destructive">
                      (dados de exemplo)
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="w-full sm:flex sm:flex-row sm:items-center sm:space-x-3">
              <div className="w-full sm:flex-shrink-0 sm:w-auto">
                <LanguageFilter
                  projects={projects}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Botão de Refresh - visível apenas em desktop */}
              <div className="flex-shrink-0 hidden sm:block">
                <Button
                  onClick={refreshProjects}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-card border-border text-card-foreground"
                >
                  <RefreshCw className={`h-4 w-4`} />
                  <span>{loading ? "Carregando..." : "Atualizar"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mensagem de modo offline */}
      {usingFallback && !loading && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-destructive">⚠️</span>
            <p className="text-sm text-destructive/90">
              <strong>Modo offline:</strong> As APIs externas estão
              temporariamente indisponíveis. Exibindo dados de exemplo. Tente
              atualizar mais tarde.
            </p>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        aria-labelledby="stats-heading"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8"
      >
        <h3 id="stats-heading" className="sr-only">
          Estatísticas dos projetos
        </h3>
        <div
          className="bg-card rounded-lg p-3 sm:p-4 border border-border"
          role="region"
          aria-label="Total de projetos"
        >
          <div className="flex items-center space-x-2">
            <Github
              className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Total de Projetos
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-card-foreground mt-1">
            {totalProjects}
          </p>
        </div>
        <div
          className="bg-card rounded-lg p-3 sm:p-4 border border-border"
          role="region"
          aria-label="Total de estrelas"
        >
          <div className="flex items-center space-x-2">
            <Calendar
              className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Total de Stars
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-card-foreground mt-1">
            {totalStars}
          </p>
        </div>
        <div
          className="bg-card rounded-lg p-3 sm:p-4 border border-border sm:col-span-2 lg:col-span-1"
          role="region"
          aria-label="Linguagens utilizadas"
        >
          <div className="flex items-center space-x-2">
            <Code
              className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Linguagens
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {languages.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
            {languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{languages.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </motion.section>

      {/* Lista de Projetos */}
      <section aria-labelledby="projects-heading" className="mt-6 sm:mt-8">
        <h3 id="projects-heading" className="sr-only">
          Lista de projetos
        </h3>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Botão Carregar Mais */}
      <AnimatePresence>
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center pt-6 sm:pt-8"
          >
            <div>
              <Button
                onClick={loadMoreProjects}
                disabled={loadingMore}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                aria-label={`Carregar mais ${Math.min(
                  projectsPerPage,
                  filteredProjects.length - displayedProjects.length
                )} projetos`}
              >
                {loadingMore ? (
                  <>
                    <AnimatedLoader size="sm" className="mr-2" />
                    <span aria-live="polite">Carregando...</span>
                  </>
                ) : (
                  `Carregar mais (${Math.min(
                    projectsPerPage,
                    filteredProjects.length - displayedProjects.length
                  )} projetos)`
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projetos() {
  return (
    <>
      <Head>
        <title>Meus Projetos | Portfolio - Augusto Caio</title>
        <meta
          name="description"
          content="Confira alguns dos projetos que desenvolvi. Cada projeto representa uma jornada de aprendizado e inovação em desenvolvimento de software."
        />
        <meta
          name="keywords"
          content="projetos, portfolio, desenvolvimento, software, programação, github, augusto caio"
        />
        <meta name="author" content="Augusto Caio" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seu-dominio.com/projetos" />
        <meta
          property="og:title"
          content="Meus Projetos | Portfolio - Augusto Caio"
        />
        <meta
          property="og:description"
          content="Confira alguns dos projetos que desenvolvi. Cada projeto representa uma jornada de aprendizado e inovação."
        />
        <meta
          property="og:image"
          content="https://seu-dominio.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://seu-dominio.com/projetos"
        />
        <meta
          property="twitter:title"
          content="Meus Projetos | Portfolio - Augusto Caio"
        />
        <meta
          property="twitter:description"
          content="Confira alguns dos projetos que desenvolvi. Cada projeto representa uma jornada de aprendizado e inovação."
        />
        <meta
          property="twitter:image"
          content="https://seu-dominio.com/og-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://seu-dominio.com/projetos" />
      </Head>

      <div className="min-h-screen flex flex-col bg-background">
        {/* GitHub Stats - Topo no Mobile, Final no Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 1.2 }}
          className="flex-shrink-0 py-8 px-4 order-first lg:order-last"
        >
          <div className="max-w-7xl mx-auto">
            <GitHubStats />
          </div>
        </motion.div>

        {/* Conteúdo Principal - Centralizado */}
        <div className="flex-1 flex flex-col px-4 order-last lg:order-first">
          <div className="max-w-7xl mx-auto w-full py-8 sm:py-12 pb-20 sm:pb-12">
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Projetos
              </h1>
            </motion.header>

            <ClientOnly>
              <ProjectsList />
            </ClientOnly>
          </div>
        </div>
      </div>
    </>
  );
}

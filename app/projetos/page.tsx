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
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLoader from "@/components/animated-loader";
import PageTransition from "@/components/page-transition";
import { usePathname } from "next/navigation";

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
      console.log("🔄 Carregando projetos da API local...");

      const data = await fetchProjects();
      console.log(`✅ ${data.length} projetos carregados com sucesso`);

      // Verificar se está usando dados de fallback (baseado no primeiro projeto)
      const isUsingFallback =
        data.length > 0 &&
        data[0].name === "portfolio-2025" &&
        data[0].id === 1;
      setUsingFallback(isUsingFallback);

      if (isUsingFallback) {
        console.log(
          "⚠️ Usando dados de fallback - APIs externas indisponíveis"
        );
      } else {
        console.log("✅ Usando dados reais das APIs");
      }

      setProjects(data);
      setFilteredProjects(data);
      setDisplayedProjects(data.slice(0, projectsPerPage));
      setLastFetch(Date.now());
    } catch (error) {
      console.error("❌ Erro ao carregar projetos:", error);
      setUsingFallback(true);

      // Garantir que sempre temos dados para mostrar
      if (projects.length === 0) {
        console.log("🔄 Aplicando dados de fallback após erro...");
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

  // Carregar projetos quando o componente for montado
  useEffect(() => {
    loadProjects();
  }, []); // Array de dependências vazio garante que só execute uma vez por montagem

  // Carregar projetos sempre que o usuário navegar para esta página
  useEffect(() => {
    if (pathname === "/projetos") {
      console.log(
        "📍 Usuário navegou para a página de projetos - carregando dados frescos"
      );
      loadProjects();
    }
  }, [pathname]); // Executa sempre que o pathname mudar

  // Função para recarregar projetos manualmente
  const refreshProjects = async () => {
    console.log("🔄 Recarregando projetos manualmente...");
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
      <motion.div
        className="space-y-6 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container com largura fixa para todo o conteúdo */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtro por Linguagem */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="w-full sm:w-48 lg:w-56 flex-shrink-0">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Projetos (0)</span>
                  {loading && (
                    <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                      🔄 Carregando...
                    </span>
                  )}
                  {usingFallback && !loading && (
                    <span className="ml-2 text-sm text-orange-600 dark:text-orange-400">
                      ⚠️ Modo offline
                    </span>
                  )}
                </h2>
                {lastFetch > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Última atualização:{" "}
                    {new Date(lastFetch).toLocaleTimeString("pt-BR")}
                    {usingFallback && (
                      <span className="ml-1 text-orange-500">
                        (dados de exemplo)
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className="flex flex-row items-center space-x-3">
                <div className="flex-shrink-0">
                  <LanguageFilter
                    projects={projects}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                {/* Botão de Refresh */}
                <div className="flex-shrink-0">
                  <Button
                    onClick={refreshProjects}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    <span>{loading ? "Carregando..." : "Atualizar"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="text-center py-8 sm:py-12"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-md mx-auto px-4">
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </motion.div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {projects.length === 0
                ? "Não foi possível carregar os projetos no momento."
                : "Não há projetos para a linguagem selecionada."}
            </p>
          </div>
        </motion.div>
      </motion.div>
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
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Container com largura fixa para todo o conteúdo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filtro por Linguagem */}
        <motion.div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <div className="w-full sm:w-48 lg:w-56 flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                <span>
                  Projetos ({displayedProjects.length} de {totalProjects})
                </span>
                {loading && (
                  <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                    🔄 Carregando...
                  </span>
                )}
                {usingFallback && !loading && (
                  <span className="ml-2 text-sm text-orange-600 dark:text-orange-400">
                    ⚠️ Modo offline
                  </span>
                )}
              </h2>
              {lastFetch > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Última atualização:{" "}
                  {new Date(lastFetch).toLocaleTimeString("pt-BR")}
                  {usingFallback && (
                    <span className="ml-1 text-orange-500">
                      (dados de exemplo)
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="flex flex-row items-center space-x-3">
              <div className="flex-shrink-0">
                <LanguageFilter
                  projects={projects}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Botão de Refresh */}
              <div className="flex-shrink-0">
                <Button
                  onClick={refreshProjects}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span>{loading ? "Carregando..." : "Atualizar"}</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mensagem de modo offline */}
        {usingFallback && !loading && (
          <motion.div
            className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-orange-600 dark:text-orange-400">⚠️</span>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <strong>Modo offline:</strong> As APIs externas estão
                temporariamente indisponíveis. Exibindo dados de exemplo. Tente
                atualizar mais tarde.
              </p>
            </div>
          </motion.div>
        )}

        {/* Estatísticas */}
        <motion.section
          aria-labelledby="stats-heading"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h3 id="stats-heading" className="sr-only">
            Estatísticas dos projetos
          </h3>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="Total de projetos"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Github
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Total de Projetos
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {totalProjects}
            </p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="Total de estrelas"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Calendar
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Total de Stars
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {totalStars}
            </p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1"
            role="region"
            aria-label="Linguagens utilizadas"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Code
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
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
          </motion.div>
        </motion.section>

        {/* Lista de Projetos */}
        <motion.section
          aria-labelledby="projects-heading"
          className="mt-6 sm:mt-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
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
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Botão Carregar Mais */}
        <AnimatePresence>
          {hasMoreProjects && (
            <motion.div
              className="flex justify-center pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
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

      <Layout>
        <PageTransition>
          <motion.main
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.header
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                Projetos
              </motion.h1>
            </motion.header>

            <ProjectsList />
          </motion.main>
        </PageTransition>
      </Layout>
    </>
  );
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages: { [key: string]: number }; // Todas as linguagens com porcentagens
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

// Interface para os dados retornados pela API
interface RepositoryData {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

// Dados de fallback para quando a API estiver indisponível
const fallbackProjects: Project[] = [
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
    description: "API proxy para buscar dados do GitHub de forma segura",
    html_url: "https://github.com/augustcaio/api-github-proxy",
    homepage: null,
    language: "JavaScript",
    languages: { JavaScript: 80, JSON: 20 },
    stargazers_count: 3,
    forks_count: 1,
    updated_at: "2024-01-10T14:20:00Z",
    topics: ["api", "github", "proxy", "nodejs"],
  },
  {
    id: 3,
    name: "react-todo-app",
    description: "Aplicação de tarefas desenvolvida com React e localStorage",
    html_url: "https://github.com/augustcaio/react-todo-app",
    homepage: "https://react-todo-app-demo.vercel.app",
    language: "JavaScript",
    languages: { JavaScript: 70, HTML: 20, CSS: 10 },
    stargazers_count: 8,
    forks_count: 3,
    updated_at: "2024-01-05T09:15:00Z",
    topics: ["react", "todo", "localstorage", "hooks"],
  },
  {
    id: 4,
    name: "nodejs-crud-api",
    description: "API RESTful com Node.js, Express e MongoDB",
    html_url: "https://github.com/augustcaio/nodejs-crud-api",
    homepage: null,
    language: "JavaScript",
    languages: { JavaScript: 85, JSON: 15 },
    stargazers_count: 12,
    forks_count: 5,
    updated_at: "2024-01-12T16:45:00Z",
    topics: ["nodejs", "express", "mongodb", "api"],
  },
  {
    id: 5,
    name: "python-web-scraper",
    description: "Web scraper desenvolvido em Python com BeautifulSoup",
    html_url: "https://github.com/augustcaio/python-web-scraper",
    homepage: null,
    language: "Python",
    languages: { Python: 90, Markdown: 10 },
    stargazers_count: 6,
    forks_count: 2,
    updated_at: "2024-01-08T11:30:00Z",
    topics: ["python", "web-scraping", "beautifulsoup", "automation"],
  },
  {
    id: 6,
    name: "vue-weather-app",
    description:
      "Aplicação de previsão do tempo com Vue.js e OpenWeatherMap API",
    html_url: "https://github.com/augustcaio/vue-weather-app",
    homepage: "https://vue-weather-app.netlify.app",
    language: "Vue",
    languages: { Vue: 60, JavaScript: 25, CSS: 15 },
    stargazers_count: 15,
    forks_count: 7,
    updated_at: "2024-01-14T13:20:00Z",
    topics: ["vue", "weather", "api", "netlify"],
  },
];

export async function fetchProjects(): Promise<Project[]> {
  try {
    console.log("🌐 Conectando com a API local...");

    // Criar um controller para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

    // Usar a API local que tem fallback robusto
    const res = await fetch("/api/projects", {
      method: "GET",
      cache: "no-store", // Sempre buscar dados frescos
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      console.log(
        `✅ API local conectada com sucesso! ${data.length} repositórios encontrados`
      );

      return data;
    } else {
      console.error(
        `❌ API local retornou status ${res.status}: ${res.statusText}`
      );
      console.log("🔄 Usando dados de fallback devido ao status de erro...");
      return fallbackProjects;
    }
  } catch (error) {
    console.error("❌ Erro ao conectar com a API local:", error);

    // Log específico para diferentes tipos de erro
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      console.error("🔍 Erro de rede detectado - possíveis causas:");
      console.error("   - Servidor local indisponível");
      console.error("   - Problema de conectividade");
      console.error("   - CORS ou bloqueio de rede");
    } else if (error instanceof Error && error.name === "AbortError") {
      console.error(
        "⏰ Timeout da requisição - API demorou muito para responder"
      );
    }

    console.log("🔄 Usando dados de fallback devido ao erro de conexão...");
    return fallbackProjects;
  }
}

export async function fetchProjectById(id: number): Promise<Project | null> {
  try {
    // Buscar nos projetos já carregados
    const projects = await fetchProjects();
    const project = projects.find((p) => p.id === id);

    return project || null;
  } catch (error) {
    console.error("❌ Erro ao buscar projeto:", error);
    return null;
  }
}

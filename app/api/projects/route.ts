import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/lib/api";

// Função para buscar linguagens de um repositório específico
async function fetchRepositoryLanguages(
  owner: string,
  repo: string
): Promise<{ [key: string]: number }> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-2025",
        },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(`❌ Erro ao buscar linguagens para ${owner}/${repo}:`, error);
  }

  return {};
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

export async function GET(request: NextRequest) {
  try {
    console.log("🌐 API local: Tentando buscar projetos do GitHub...");

    // Primeiro, tentar a API externa customizada
    const externalApiUrl =
      "https://git-api-i3y5.onrender.com/api/v1/users/augustcaio/repositories";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout

    try {
      const response = await fetch(externalApiUrl, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log(
          `✅ API externa funcionando! ${data.length} repositórios encontrados`
        );

        // Converter os dados para o formato esperado e buscar linguagens
        const projectsPromises = data.map(async (repo: any) => {
          // Buscar linguagens do repositório
          const languages = await fetchRepositoryLanguages(
            "augustcaio",
            repo.name
          );

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: `https://github.com/${repo.full_name}`,
            homepage: repo.homepage,
            language: repo.language,
            languages: languages,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            topics: repo.topics || [],
          };
        });

        const projects = await Promise.all(projectsPromises);

        return NextResponse.json(projects, { status: 200 });
      }
    } catch (externalError) {
      console.error("❌ Erro na API externa:", externalError);
      clearTimeout(timeoutId);
    }

    // Se a API externa falhar, tentar a API oficial do GitHub
    console.log("🔄 Tentando API oficial do GitHub...");

    const githubApiUrl =
      "https://api.github.com/users/augustcaio/repos?sort=updated&per_page=10";

    try {
      const githubResponse = await fetch(githubApiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-2025",
        },
      });

      if (githubResponse.ok) {
        const githubData = await githubResponse.json();
        console.log(
          `✅ GitHub API funcionando! ${githubData.length} repositórios encontrados`
        );

        // Converter os dados para o formato esperado e buscar linguagens
        const projectsPromises = githubData.map(async (repo: any) => {
          // Buscar linguagens do repositório
          const languages = await fetchRepositoryLanguages(
            "augustcaio",
            repo.name
          );

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            languages: languages,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            topics: repo.topics || [],
          };
        });

        const projects = await Promise.all(projectsPromises);

        return NextResponse.json(projects, { status: 200 });
      }
    } catch (githubError) {
      console.error("❌ Erro na GitHub API:", githubError);
    }

    // Se ambas as APIs falharem, usar dados de fallback
    console.log("🔄 Usando dados de fallback...");
    return NextResponse.json(fallbackProjects, { status: 200 });
  } catch (error) {
    console.error("❌ Erro geral na API local:", error);

    // Em caso de erro, sempre retornar dados de fallback
    return NextResponse.json(fallbackProjects, { status: 200 });
  }
}

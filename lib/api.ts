export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
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

export async function fetchProjects(): Promise<Project[]> {
  try {
    // Buscar todos os repositórios do usuário augustcaio
    const res = await fetch(
      "https://git-api-i3y5.onrender.com/api/v1/users/augustcaio/repositories",
      {
        next: { revalidate: 3600 }, // Revalidar a cada 1 hora
      }
    );

    if (!res.ok) {
      console.error(`API retornou status ${res.status}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    // Converter os dados para o formato esperado
    const projects: Project[] = data.map((repo: RepositoryData) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: `https://github.com/${repo.full_name}`,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      topics: repo.topics || [],
    }));

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function fetchProjectById(id: number): Promise<Project | null> {
  try {
    // Buscar nos projetos já carregados
    const projects = await fetchProjects();
    const project = projects.find((p) => p.id === id);

    return project || null;
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return null;
  }
}

import { NextRequest, NextResponse } from "next/server";

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  name?: string;
  login?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

// Dados de fallback caso a API falhe
const fallbackUser: GitHubUser = {
  avatar_url: "https://github.com/augustcaio.png?size=200",
  bio: "Desenvolvedor Fullstack apaixonado por criar soluções inovadoras",
  name: "Caio Augusto",
  login: "augustcaio",
  public_repos: 15,
  followers: 10,
  following: 20,
};

export async function GET(request: NextRequest) {
  try {
    console.log("🚀 Buscando dados do usuário da API oficial do GitHub...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

    const response = await fetch("https://api.github.com/users/augustcaio", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "portfolio-2025",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Dados do usuário obtidos com sucesso");

      const userData: GitHubUser = {
        avatar_url: data.avatar_url || fallbackUser.avatar_url,
        bio: data.bio || fallbackUser.bio,
        name: data.name || fallbackUser.name,
        login: data.login || fallbackUser.login,
        public_repos: data.public_repos || fallbackUser.public_repos,
        followers: data.followers || fallbackUser.followers,
        following: data.following || fallbackUser.following,
      };

      return NextResponse.json(userData, { status: 200 });
    } else {
      console.log(`❌ GitHub API retornou status ${response.status}`);
      return NextResponse.json(fallbackUser, { status: 200 });
    }
  } catch (error) {
    console.error("❌ Erro ao buscar dados do usuário:", error);
    return NextResponse.json(fallbackUser, { status: 200 });
  }
}

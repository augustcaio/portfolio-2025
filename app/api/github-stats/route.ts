import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("📊 Buscando estatísticas do GitHub...");

    const username = "augustcaio";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Buscar dados do usuário
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-2025",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    clearTimeout(timeoutId);

    if (!userResponse.ok) {
      console.log(`❌ Erro ao buscar dados do usuário: ${userResponse.status}`);
      return NextResponse.json(getFallbackStats(), { status: 200 });
    }

    const userData = await userResponse.json();

    // Buscar repositórios para calcular stars e forks
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-2025",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    let totalStars = 0;
    let totalForks = 0;
    let publicRepos = 0;

    if (reposResponse.ok) {
      const reposData = await reposResponse.json();
      publicRepos = reposData.length;

      reposData.forEach((repo: any) => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
      });
    }

    const stats = {
      followers: userData.followers || 0,
      public_repos: publicRepos,
      total_stars: totalStars,
      total_forks: totalForks,
      updated_at: new Date().toISOString(),
    };

    console.log("✅ Estatísticas do GitHub obtidas:", stats);
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas do GitHub:", error);
    return NextResponse.json(getFallbackStats(), { status: 200 });
  }
}

function getFallbackStats() {
  return {
    followers: 15,
    public_repos: 8,
    total_stars: 25,
    total_forks: 12,
    updated_at: new Date().toISOString(),
  };
}

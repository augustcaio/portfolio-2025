"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Users, Star, GitFork, Calendar } from "lucide-react";

interface GitHubStats {
  followers: number;
  public_repos: number;
  total_stars: number;
  total_forks: number;
  updated_at: string;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const statsItems = [
    {
      icon: Github,
      label: "Repositórios",
      value: stats?.public_repos || 0,
      color: "text-primary",
    },
    {
      icon: Users,
      label: "Seguidores",
      value: stats?.followers || 0,
      color: "text-chart-2",
    },
    {
      icon: Star,
      label: "Stars",
      value: stats?.total_stars || 0,
      color: "text-chart-3",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: stats?.total_forks || 0,
      color: "text-chart-1",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
        <div className="flex items-center space-x-6 lg:space-x-8">
          {statsItems.map((item, index) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-8 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
      {/* Estatísticas em linha única */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="flex items-center space-x-2 group"
          >
            <item.icon
              className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform duration-200`}
            />
            <span className="text-sm font-medium text-foreground">
              {formatNumber(item.value)}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex items-center space-x-2 text-muted-foreground"
      >
        <Calendar className="h-4 w-4" />
        <span className="text-xs">
          Atualizado {new Date(stats.updated_at).toLocaleDateString("pt-BR")}
        </span>
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TypingEffect from "./typing-effect";
import GitHubStats from "./github-stats";
import { motion } from "framer-motion";

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  name?: string;
  login?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export default function Hero() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [apiSource, setApiSource] = useState<string>("");

  // Dados de fallback caso a API falhe
  const fallbackData: GitHubUser = {
    avatar_url: "https://github.com/augustcaio.png?size=200",
    bio: "Desenvolvedor Fullstack apaixonado por criar soluções inovadoras",
    name: "Caio Augusto",
    login: "augustcaio",
    public_repos: 15,
    followers: 10,
    following: 20,
  };

  // Tecnologias inseridas manualmente
  const phrases = [
    "Desenvolvedor Fullstack",
    "React",
    "React Native",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
  ];

  useEffect(() => {
    async function fetchGitHubUser() {
      try {
        setLoading(true);
        setError(false);
        console.log("🔄 [CLIENT] Iniciando busca de dados do usuário...");

        // Usar API route local em vez de chamar diretamente a API do GitHub
        const response = await fetch("/api/github-user", {
          next: { revalidate: 3600 },
        });

        if (response.ok) {
          const data = await response.json();

          // Determinar a fonte dos dados baseado nos dados retornados
          if (data.public_repos !== undefined && data.followers !== undefined) {
            if (data.public_repos > 0) {
              setApiSource("API Externa Integrada");
              console.log(
                "✅ [CLIENT] Dados obtidos da API externa integrada!"
              );
            } else {
              setApiSource("API Oficial GitHub");
              console.log(
                "✅ [CLIENT] Dados obtidos da API oficial do GitHub!"
              );
            }
          } else {
            setApiSource("Dados de Fallback");
            console.log("⚠️ [CLIENT] Usando dados de fallback!");
          }

          console.log("📊 [CLIENT] Dados do usuário:", {
            name: data.name,
            login: data.login,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
          });

          setUserData(data);
        } else {
          console.warn(
            "❌ [CLIENT] API local indisponível, usando dados de fallback"
          );
          setError(true);
          setApiSource("Dados de Fallback (Erro)");
          setUserData(fallbackData);
        }
      } catch (error) {
        console.warn(
          "❌ [CLIENT] Erro ao buscar dados do usuário, usando fallback:",
          error
        );
        setError(true);
        setApiSource("Dados de Fallback (Erro)");
        setUserData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubUser();
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="w-48 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.2,
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.8,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background lg:justify-center">
      {/* GitHub Stats - Topo no Mobile, Final no Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.5,
        }}
        className="flex-shrink-0 py-8 px-4 order-first lg:order-last"
      >
        <div className="max-w-7xl mx-auto">
          <GitHubStats />
        </div>
      </motion.div>

      {/* Hero Section - Centralizado */}
      <div className="flex-1 flex items-center justify-center px-4 order-last lg:order-first">
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl -translate-y-12 lg:translate-y-0">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Avatar com animação de entrada melhorada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.2,
              }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-2xl bg-muted group"
              style={{
                boxShadow:
                  "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {!imageError && userData?.avatar_url ? (
                <div className="w-full h-full">
                  <Image
                    src={userData.avatar_url}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    priority
                    onError={handleImageError}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg
                    className="w-16 h-16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col">
              {/* Nome com animação de entrada */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 0.6,
                }}
                className="text-4xl sm:text-6xl font-bold text-foreground"
                style={{ fontFamily: '"Google Sans Code", monospace' }}
              >
                Caio Augusto
              </motion.h1>

              {/* Typing effect com animação de entrada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 0.8,
                }}
                className="mt-4"
              >
                <TypingEffect
                  phrases={phrases}
                  speed={80}
                  className="text-xl sm:text-2xl text-muted-foreground"
                  style={{ fontFamily: '"Google Sans Code", monospace' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout - Vertical */}
          <div className="lg:hidden flex flex-col items-center gap-6 text-center">
            {/* Avatar mobile com animação de entrada melhorada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.2,
              }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl bg-muted group"
              style={{
                boxShadow:
                  "0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {!imageError && userData?.avatar_url ? (
                <div className="w-full h-full">
                  <Image
                    src={userData.avatar_url}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    priority
                    onError={handleImageError}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              {/* Nome mobile com animação de entrada */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 0.6,
                }}
                className="text-3xl sm:text-4xl font-bold text-foreground"
                style={{ fontFamily: '"Google Sans Code", monospace' }}
              >
                Caio Augusto
              </motion.h1>

              {/* Typing effect mobile com animação de entrada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 0.8,
                }}
                className="mt-2"
              >
                <TypingEffect
                  phrases={phrases}
                  speed={80}
                  className="text-lg sm:text-xl text-muted-foreground"
                  style={{ fontFamily: '"Google Sans Code", monospace' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

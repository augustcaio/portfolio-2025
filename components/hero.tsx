"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TypingEffect from "./typing-effect";

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
}

export default function Hero() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

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
        const response = await fetch(
          "https://api.github.com/users/augustcaio",
          {
            next: { revalidate: 3600 },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Erro ao buscar dados do usuário GitHub");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:flex items-center gap-8">
          {userData?.avatar_url && (
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg">
              <Image
                src={userData.avatar_url}
                alt="Foto de perfil"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col">
            <h1
              className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: '"Google Sans Code", monospace' }}
            >
              Caio Augusto
            </h1>

            <div className="mt-4">
              <TypingEffect
                phrases={phrases}
                speed={80}
                className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
                style={{ fontFamily: '"Google Sans Code", monospace' }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical */}
        <div className="lg:hidden flex flex-col items-center gap-6 text-center">
          {userData?.avatar_url && (
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg">
              <Image
                src={userData.avatar_url}
                alt="Foto de perfil"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col items-center gap-3">
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: '"Google Sans Code", monospace' }}
            >
              Caio Augusto
            </h1>

            <div className="mt-2">
              <TypingEffect
                phrases={phrases}
                speed={80}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300"
                style={{ fontFamily: '"Google Sans Code", monospace' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

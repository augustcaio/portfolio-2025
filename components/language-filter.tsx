"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export default function LanguageFilter({
  projects,
  onFilterChange,
}: LanguageFilterProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Extrair todas as linguagens únicas dos projetos (incluindo todas as linguagens de cada projeto)
  const allLanguages = new Set<string>();

  projects.forEach((project) => {
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

  const languages = ["all", ...Array.from(allLanguages).sort()] as string[];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);

    if (language === "all") {
      onFilterChange(projects);
    } else {
      const filteredProjects = projects.filter((project) => {
        // Verificar se a linguagem principal corresponde
        if (project.language === language) {
          return true;
        }

        // Verificar se a linguagem está presente no objeto languages
        if (project.languages && project.languages[language]) {
          return true;
        }

        return false;
      });
      onFilterChange(filteredProjects);
    }
  };

  return (
    <motion.div
      className="flex items-center space-x-2"
      role="group"
      aria-labelledby="language-filter-label"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <label id="language-filter-label" className="sr-only">
        Filtrar projetos por linguagem de programação
      </label>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger
            className="w-full sm:w-[240px] lg:w-[280px] text-sm min-w-0"
            aria-label="Selecionar linguagem para filtrar projetos"
          >
            <SelectValue placeholder="Filtrar por linguagem" />
          </SelectTrigger>
          <SelectContent>
            <AnimatePresence>
              {languages.map((language, index) => {
                const count =
                  language === "all"
                    ? projects.length
                    : projects.filter((p) => {
                        // Verificar se a linguagem principal corresponde
                        if (p.language === language) {
                          return true;
                        }

                        // Verificar se a linguagem está presente no objeto languages
                        if (p.languages && p.languages[language]) {
                          return true;
                        }

                        return false;
                      }).length;

                return (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SelectItem
                      value={language}
                      className="text-sm"
                      aria-label={`${
                        language === "all" ? "Todas as linguagens" : language
                      } - ${count} projetos`}
                    >
                      {language === "all"
                        ? `Todas as linguagens (${count})`
                        : `${language} (${count})`}
                    </SelectItem>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </SelectContent>
        </Select>
      </motion.div>
    </motion.div>
  );
}

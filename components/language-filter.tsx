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
    <div
      className="flex items-center space-x-2"
      role="group"
      aria-labelledby="language-filter-label"
    >
      <label id="language-filter-label" className="sr-only">
        Filtrar projetos por linguagem de programação
      </label>
      <div>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger
            className="w-full text-sm min-w-0 bg-card border-border text-card-foreground"
            aria-label="Selecionar linguagem para filtrar projetos"
          >
            <SelectValue placeholder="Filtrar por linguagem" />
          </SelectTrigger>
          <SelectContent>
            <>
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
                  <div key={language}>
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
                  </div>
                );
              })}
            </>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

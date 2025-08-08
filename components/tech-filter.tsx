"use client";

import { useState } from "react";
import { Project } from "@/lib/api";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code,
  FileCode,
  Coffee,
  FileText,
  Globe,
  Palette,
  Zap,
  Server,
  Database,
  Cpu,
  Hash,
  FileJson,
  Wrench,
  Shield,
  Layers,
  Search,
  Smartphone,
  Package,
  Settings,
} from "lucide-react";

interface TechFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

// Função para gerar abreviação automática
const generateShortLabel = (tech: string): string => {
  // Mapeamento manual para casos específicos
  const manualMapping: { [key: string]: string } = {
    TypeScript: "TS",
    JavaScript: "JS",
    Python: "PY",
    "Next.js": "Next",
    "Node.js": "Node",
    Dockerfile: "Docker",
    Procfile: "Proc",
    Markdown: "MD",
    Shell: "SH",
  };

  if (manualMapping[tech]) {
    return manualMapping[tech];
  }

  // Para tecnologias não mapeadas, usa as primeiras 3-4 letras
  if (tech.length <= 4) return tech;
  return tech.substring(0, 3).toUpperCase();
};

// Função para gerar ícone baseado na tecnologia
const getTechIcon = (tech: string): React.ComponentType<any> => {
  const iconMapping: { [key: string]: React.ComponentType<any> } = {
    TypeScript: FileCode,
    JavaScript: Code,
    Python: FileCode,
    Vue: Layers,
    React: Zap,
    HTML: Globe,
    CSS: Palette,
    "Next.js": Zap,
    "Node.js": Server,
    Java: Coffee,
    PHP: Code,
    "C++": Cpu,
    "C#": Shield,
    Go: Zap,
    Rust: Wrench,
    Swift: Smartphone,
    Kotlin: Smartphone,
    Ruby: Database,
    Shell: Hash,
    Markdown: FileText,
    JSON: FileJson,
    YAML: FileText,
    Dockerfile: Package,
    Procfile: Settings,
  };

  return iconMapping[tech] || Code;
};

// Função para gerar cor baseada na tecnologia
const getTechColor = (tech: string): string => {
  const colorMapping: { [key: string]: string } = {
    TypeScript:
      "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    JavaScript:
      "bg-yellow-500/10 text-yellow-600 border-yellow-200/50 hover:bg-yellow-500/20 dark:bg-[#f1fa8c]/10 dark:text-[#f1fa8c] dark:border-[#f1fa8c]/20 dark:hover:bg-[#f1fa8c]/20",
    Python:
      "bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500/20 dark:bg-[#50fa7b]/10 dark:text-[#50fa7b] dark:border-[#50fa7b]/20 dark:hover:bg-[#50fa7b]/20",
    Vue: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 hover:bg-emerald-500/20 dark:bg-[#50fa7b]/10 dark:text-[#50fa7b] dark:border-[#50fa7b]/20 dark:hover:bg-[#50fa7b]/20",
    React:
      "bg-cyan-500/10 text-cyan-600 border-cyan-200/50 hover:bg-cyan-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    HTML: "bg-orange-500/10 text-orange-600 border-orange-200/50 hover:bg-orange-500/20 dark:bg-[#ffb86c]/10 dark:text-[#ffb86c] dark:border-[#ffb86c]/20 dark:hover:bg-[#ffb86c]/20",
    CSS: "bg-pink-500/10 text-pink-600 border-pink-200/50 hover:bg-pink-500/20 dark:bg-[#ff79c6]/10 dark:text-[#ff79c6] dark:border-[#ff79c6]/20 dark:hover:bg-[#ff79c6]/20",
    "Next.js":
      "bg-gray-500/10 text-gray-700 border-gray-200/50 hover:bg-gray-500/20 dark:bg-[#f8f8f2]/10 dark:text-[#f8f8f2] dark:border-[#f8f8f2]/20 dark:hover:bg-[#f8f8f2]/20",
    "Node.js":
      "bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500/20 dark:bg-[#50fa7b]/10 dark:text-[#50fa7b] dark:border-[#50fa7b]/20 dark:hover:bg-[#50fa7b]/20",
    Java: "bg-red-500/10 text-red-600 border-red-200/50 hover:bg-red-500/20 dark:bg-[#ff5555]/10 dark:text-[#ff5555] dark:border-[#ff5555]/20 dark:hover:bg-[#ff5555]/20",
    PHP: "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/20 dark:bg-[#bd93f9]/10 dark:text-[#bd93f9] dark:border-[#bd93f9]/20 dark:hover:bg-[#bd93f9]/20",
    "C++":
      "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    "C#": "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/20 dark:bg-[#bd93f9]/10 dark:text-[#bd93f9] dark:border-[#bd93f9]/20 dark:hover:bg-[#bd93f9]/20",
    Go: "bg-cyan-500/10 text-cyan-600 border-cyan-200/50 hover:bg-cyan-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    Rust: "bg-orange-500/10 text-orange-600 border-orange-200/50 hover:bg-orange-500/20 dark:bg-[#ffb86c]/10 dark:text-[#ffb86c] dark:border-[#ffb86c]/20 dark:hover:bg-[#ffb86c]/20",
    Swift:
      "bg-orange-500/10 text-orange-600 border-orange-200/50 hover:bg-orange-500/20 dark:bg-[#ffb86c]/10 dark:text-[#ffb86c] dark:border-[#ffb86c]/20 dark:hover:bg-[#ffb86c]/20",
    Kotlin:
      "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/20 dark:bg-[#bd93f9]/10 dark:text-[#bd93f9] dark:border-[#bd93f9]/20 dark:hover:bg-[#bd93f9]/20",
    Ruby: "bg-red-500/10 text-red-600 border-red-200/50 hover:bg-red-500/20 dark:bg-[#ff5555]/10 dark:text-[#ff5555] dark:border-[#ff5555]/20 dark:hover:bg-[#ff5555]/20",
    Shell:
      "bg-gray-500/10 text-gray-600 border-gray-200/50 hover:bg-gray-500/20 dark:bg-[#6272a4]/10 dark:text-[#6272a4] dark:border-[#6272a4]/20 dark:hover:bg-[#6272a4]/20",
    Markdown:
      "bg-gray-500/10 text-gray-600 border-gray-200/50 hover:bg-gray-500/20 dark:bg-[#6272a4]/10 dark:text-[#6272a4] dark:border-[#6272a4]/20 dark:hover:bg-[#6272a4]/20",
    JSON: "bg-yellow-500/10 text-yellow-600 border-yellow-200/50 hover:bg-yellow-500/20 dark:bg-[#f1fa8c]/10 dark:text-[#f1fa8c] dark:border-[#f1fa8c]/20 dark:hover:bg-[#f1fa8c]/20",
    YAML: "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    Dockerfile:
      "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
    Procfile:
      "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/20 dark:bg-[#bd93f9]/10 dark:text-[#bd93f9] dark:border-[#bd93f9]/20 dark:hover:bg-[#bd93f9]/20",
  };

  // Cor padrão baseada no hash do nome da tecnologia para consistência
  if (!colorMapping[tech]) {
    const colors = [
      "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/20 dark:bg-[#8be9fd]/10 dark:text-[#8be9fd] dark:border-[#8be9fd]/20 dark:hover:bg-[#8be9fd]/20",
      "bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500/20 dark:bg-[#50fa7b]/10 dark:text-[#50fa7b] dark:border-[#50fa7b]/20 dark:hover:bg-[#50fa7b]/20",
      "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/20 dark:bg-[#bd93f9]/10 dark:text-[#bd93f9] dark:border-[#bd93f9]/20 dark:hover:bg-[#bd93f9]/20",
      "bg-orange-500/10 text-orange-600 border-orange-200/50 hover:bg-orange-500/20 dark:bg-[#ffb86c]/10 dark:text-[#ffb86c] dark:border-[#ffb86c]/20 dark:hover:bg-[#ffb86c]/20",
      "bg-pink-500/10 text-pink-600 border-pink-200/50 hover:bg-pink-500/20 dark:bg-[#ff79c6]/10 dark:text-[#ff79c6] dark:border-[#ff79c6]/20 dark:hover:bg-[#ff79c6]/20",
    ];

    // Usa um hash simples para garantir cor consistente
    const hash = tech.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  }

  return colorMapping[tech];
};

// Função para gerar configuração dinâmica de tecnologia
const getTechConfig = (tech: string) => ({
  icon: getTechIcon(tech),
  color: getTechColor(tech),
  label: tech,
  shortLabel: generateShortLabel(tech),
});

export default function TechFilter({
  projects,
  onFilterChange,
}: TechFilterProps) {
  const [selectedTech, setSelectedTech] = useState<string>("all");

  // Extrair todas as tecnologias únicas dos projetos
  const allTechnologies = new Set<string>();

  projects.forEach((project) => {
    // Adicionar linguagem principal se existir
    if (project.language) {
      allTechnologies.add(project.language);
    }

    // Adicionar todas as linguagens do objeto languages
    if (project.languages && Object.keys(project.languages).length > 0) {
      Object.keys(project.languages).forEach((lang) => {
        allTechnologies.add(lang);
      });
    }
  });

  const technologies = Array.from(allTechnologies).sort();

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech);

    if (tech === "all") {
      onFilterChange(projects);
    } else {
      const filteredProjects = projects.filter((project) => {
        // Verificar se a linguagem principal corresponde
        if (project.language === tech) {
          return true;
        }

        // Verificar se a linguagem está presente no objeto languages
        if (project.languages && project.languages[tech]) {
          return true;
        }

        return false;
      });
      onFilterChange(filteredProjects);
    }
  };

  // Calcular contagem para cada tecnologia
  const getTechCount = (tech: string) => {
    if (tech === "all") return projects.length;

    return projects.filter((p) => {
      if (p.language === tech) return true;
      if (p.languages && p.languages[tech]) return true;
      return false;
    }).length;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="flex flex-wrap gap-1.5 sm:gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Botão "Todas" */}
        <motion.button
          variants={itemVariants}
          onClick={() => handleTechChange("all")}
          className={cn(
            "flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm font-medium",
            selectedTech === "all"
              ? "bg-primary text-primary-foreground border-primary shadow-lg"
              : "bg-card hover:bg-muted border-border text-card-foreground hover:border-primary/40"
          )}
          aria-label={`Mostrar todos os projetos (${getTechCount("all")})`}
        >
          <Search className="h-4 w-4" />
          <span>Todas</span>
          <span className="text-xs opacity-70">({getTechCount("all")})</span>
        </motion.button>

        {/* Botões das tecnologias */}
        {technologies.map((tech) => {
          const techConfig = getTechConfig(tech);
          const count = getTechCount(tech);
          const IconComponent = techConfig.icon;

          return (
            <motion.button
              key={tech}
              variants={itemVariants}
              onClick={() => handleTechChange(tech)}
              className={cn(
                "flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm font-medium",
                selectedTech === tech
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : techConfig.color
              )}
              aria-label={`Filtrar projetos por ${techConfig.label} (${count})`}
              title={`${techConfig.label} - ${count} projeto${count !== 1 ? "s" : ""}`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="hidden sm:inline">{tech}</span>
              <span className="sm:hidden">{techConfig.shortLabel}</span>
              <span className="text-xs opacity-70">({count})</span>
            </motion.button>
          );
        })}
      </motion.div>

      {selectedTech !== "all" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted-foreground mt-2"
        >
          Mostrando projetos que usam{" "}
          <strong className="text-primary">{selectedTech}</strong>
        </motion.p>
      )}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Star, GitFork, Calendar, ExternalLink } from "lucide-react";
import { Project } from "@/lib/api";
import { motion } from "framer-motion";
import AnimatedLoader from "./animated-loader";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border group min-h-[180px]">
        <CardHeader className="pb-0 flex-shrink-0 p-3">
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex-1 pr-2"
            >
              <CardTitle className="text-base font-bold text-card-foreground line-clamp-2 leading-tight">
                {project.name
                  .replace(/[-_]/g, " ")
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </CardTitle>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                aria-label={`Ver repositório ${project.name} no GitHub`}
              >
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>
          {project.description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-1"
            >
              <CardDescription className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                {project.description}
              </CardDescription>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="flex-grow p-3 pt-1 flex flex-col">
          {/* Linguagens */}
          <div className="flex flex-wrap gap-1 mb-2">
            {(() => {
              console.log(
                `🔍 Renderizando linguagens para ${project.name}:`,
                project.languages
              );
              return null;
            })()}
            {Object.entries(project.languages || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([language, percentage]) => (
                <div
                  key={language}
                  className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border"
                  title={`${language}: ${percentage}%`}
                >
                  {language}
                </div>
              ))}
          </div>

          {/* Exibir topics se houver espaço */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {project.topics.slice(0, 1).map((topic) => (
                <div
                  key={topic}
                  className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-card text-muted-foreground border border-border"
                >
                  {topic}
                </div>
              ))}
            </div>
          )}

          {/* Estatísticas do projeto */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-1 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" aria-hidden="true" />
                <span>{project.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="h-3 w-3" aria-hidden="true" />
                <span>{project.forks_count}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <span>{formatDate(project.updated_at)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex-shrink-0 p-3">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                asChild
                variant="outline"
                className="w-full h-7 text-xs border-border bg-muted text-card-foreground hover:bg-muted/80 dark:!border dark:!border-primary/60 dark:hover:!border-primary/80 transition-colors"
                aria-label={`Ver código do projeto ${project.name} no GitHub`}
              >
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3 mr-1" aria-hidden="true" />
                  Ver Código
                </a>
              </Button>
            </motion.div>
            {project.homepage && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  asChild
                  variant="default"
                  className="w-full h-7 text-xs"
                  aria-label={`Ver demo do projeto ${project.name}`}
                >
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                    Demo
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

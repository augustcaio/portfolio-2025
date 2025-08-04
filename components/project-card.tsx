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
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700 group">
        <CardHeader className="pb-2 sm:pb-3 flex-shrink-0 p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                {project.name}
              </CardTitle>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                aria-label={`Ver repositório ${project.name} no GitHub`}
              >
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </motion.div>
          </div>
          {project.description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                {project.description}
              </CardDescription>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="pb-2 sm:pb-3 flex-grow p-4 sm:p-6 pt-0">
          <motion.div
            className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4"
            role="group"
            aria-label="Linguagens e tags do projeto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Exibir todas as linguagens */}
            {project.languages && Object.keys(project.languages).length > 0 ? (
              Object.entries(project.languages)
                .sort(([, a], [, b]) => b - a) // Ordenar por porcentagem decrescente
                .slice(0, 4) // Mostrar até 4 linguagens principais
                .map(([lang, percentage], langIndex) => (
                  <motion.div
                    key={lang}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + langIndex * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs"
                      title={`${lang}: ${percentage}%`}
                    >
                      {lang}
                    </Badge>
                  </motion.div>
                ))
            ) : project.language ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs"
                >
                  {project.language}
                </Badge>
              </motion.div>
            ) : null}

            {/* Exibir topics se houver espaço */}
            {project.topics &&
              project.topics.slice(0, 2).map((topic, topicIndex) => (
                <motion.div
                  key={topic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + topicIndex * 0.1 }}
                >
                  <Badge variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                </motion.div>
              ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-2 sm:space-y-0"
            role="group"
            aria-label="Estatísticas do projeto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="flex items-center space-x-1"
                aria-label={`${project.stargazers_count} estrelas`}
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                <span>{project.stargazers_count}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-1"
                aria-label={`${project.forks_count} forks`}
                whileHover={{ scale: 1.05 }}
              >
                <GitFork className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                <span>{project.forks_count}</span>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center space-x-1"
              aria-label={`Atualizado em ${formatDate(project.updated_at)}`}
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{formatDate(project.updated_at)}</span>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-0 flex-shrink-0 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                asChild
                variant="outline"
                className="flex-1 text-sm w-full"
                aria-label={`Ver código do projeto ${project.name} no GitHub`}
              >
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                    aria-hidden="true"
                  />
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
                  className="flex-1 text-sm w-full"
                  aria-label={`Ver demo do projeto ${project.name}`}
                >
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
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

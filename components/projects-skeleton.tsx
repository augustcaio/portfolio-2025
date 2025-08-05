import { Code, Github, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsSkeleton() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      aria-label="Carregando projetos"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container com largura fixa para todo o conteúdo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton do Filtro */}
        <motion.div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-2">
            <motion.div
              className="w-full sm:w-52 h-5 sm:h-6 bg-muted rounded animate-pulse flex-shrink-0"
              aria-hidden="true"
              variants={itemVariants}
            />
            <motion.div
              className="w-full sm:w-48 h-9 sm:h-10 bg-muted rounded animate-pulse flex-shrink-0"
              aria-hidden="true"
              variants={itemVariants}
            />
          </div>
        </motion.div>

        {/* Skeleton das Estatísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8"
          aria-label="Carregando estatísticas"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-card rounded-lg p-3 sm:p-4 border border-border"
            aria-hidden="true"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Github className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Total de Projetos
              </span>
            </div>
            <div className="w-8 h-6 sm:w-10 sm:h-8 bg-muted rounded animate-pulse mt-1" />
          </motion.div>
          <motion.div
            className="bg-card rounded-lg p-3 sm:p-4 border border-border"
            aria-hidden="true"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Total de Stars
              </span>
            </div>
            <div className="w-8 h-6 sm:w-10 sm:h-8 bg-muted rounded animate-pulse mt-1" />
          </motion.div>
          <motion.div
            className="bg-card rounded-lg p-3 sm:p-4 border border-border sm:col-span-2 lg:col-span-1"
            aria-hidden="true"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Linguagens
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <div className="w-12 h-4 bg-muted rounded animate-pulse" />
              <div className="w-16 h-4 bg-muted rounded animate-pulse" />
              <div className="w-14 h-4 bg-muted rounded animate-pulse" />
            </div>
          </motion.div>
        </motion.div>

        {/* Skeleton da Lista de Projetos */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch mt-6 sm:mt-8"
          aria-label="Carregando lista de projetos"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg border border-border p-4 sm:p-6 h-full flex flex-col animate-pulse"
              aria-hidden="true"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4 flex-shrink-0">
                <div className="w-3/4 h-5 sm:h-6 bg-muted rounded" />
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-muted rounded" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-4 flex-grow">
                <div className="w-full h-3 sm:h-4 bg-muted rounded" />
                <div className="w-2/3 h-3 sm:h-4 bg-muted rounded" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 flex-shrink-0">
                <div className="w-12 h-4 bg-muted rounded" />
                <div className="w-16 h-4 bg-muted rounded" />
                <div className="w-14 h-4 bg-muted rounded" />
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0 mb-4 flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-muted rounded" />
                    <div className="w-4 h-3 bg-muted rounded" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-muted rounded" />
                    <div className="w-4 h-3 bg-muted rounded" />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-muted rounded" />
                  <div className="w-16 h-3 bg-muted rounded" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <div className="flex-1 h-8 sm:h-9 bg-muted rounded" />
                <div className="flex-1 h-8 sm:h-9 bg-muted rounded" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skeleton do Botão Carregar Mais */}
        <motion.div
          className="flex justify-center pt-6 sm:pt-8"
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-full sm:w-auto h-10 sm:h-12 bg-muted rounded animate-pulse"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

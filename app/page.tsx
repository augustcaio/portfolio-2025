export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Olá, eu sou{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Augusto Caio
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras e
            experiências digitais excepcionais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div>
              <a
                href="/projetos"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Ver Projetos
              </a>
            </div>

            <div>
              <a
                href="/contato"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

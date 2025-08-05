import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-muted-foreground mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Página não encontrada
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200"
            >
              Voltar ao Início
            </Link>
          </div>

          <div>
            <Link
              href="/projetos"
              className="inline-flex items-center px-6 py-3 border border-border text-foreground hover:bg-muted font-medium rounded-lg transition-colors duration-200"
            >
              Ver Projetos
            </Link>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Se você acredita que isso é um erro, entre em{" "}
            <Link href="/contato" className="text-primary hover:underline">
              contato
            </Link>{" "}
            comigo.
          </p>
        </div>
      </div>
    </div>
  );
}

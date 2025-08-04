import Navbar from "./navbar";
import Footer from "./footer";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./mobile-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Navbar />
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

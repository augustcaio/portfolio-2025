import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { ThemeScript } from "./theme-script";
import Layout from "@/components/layout";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Augusto Caio",
  description: "Portfolio pessoal de Augusto Caio, desenvolvedor full-stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

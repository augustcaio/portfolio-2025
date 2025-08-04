"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, FolderOpen, Mail } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Início", href: "/", icon: Home },
  { name: "Projetos", href: "/projetos", icon: FolderOpen },
  { name: "Contato", href: "/contato", icon: Mail },
];

export default function FloatingSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      router.push(href);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Lado Esquerdo */}
      <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-background/80 backdrop-blur-sm rounded-full shadow-lg border p-2">
          <div className="flex flex-col items-center space-y-1">
            {/* Navigation Links */}
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Tooltip key={item.name} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "h-10 w-10 rounded-full transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Theme Toggle */}
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <ThemeToggle
                  size="md"
                  className="transition-all duration-200 hover:bg-muted/50"
                />
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <p>Alternar tema</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/90 backdrop-blur-sm rounded-full shadow-lg border px-3 py-1.5">
          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Tooltip key={item.name} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "h-8 w-8 rounded-full transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Theme Toggle for Mobile */}
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <ThemeToggle
                  size="sm"
                  className="transition-all duration-200 hover:bg-muted/50"
                />
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                <p>Alternar tema</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

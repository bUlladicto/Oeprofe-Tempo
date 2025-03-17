"use client";

import Link from "next/link";
import { createClientSupabase } from "@/utils/client-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Home,
  BookOpen,
  Award,
  BarChart2,
  Settings,
  LogOut,
  Search,
  BookCheck,
  Grid3X3,
  Bell,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";

export default function DashboardNavbar() {
  const supabase = createClientSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  // Detectar scroll para cambiar apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para navegar a rutas específicas
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.includes(path);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm transition-all duration-200",
      scrolled && "shadow-md"
    )}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="flex items-center gap-2 text-foreground font-bold"
          >
            <span className="text-primary">Oe</span>
            <span>Profe</span>
            <span className="ml-1 text-xs text-muted-foreground font-normal">BETA</span>
          </Link>

          <div className="hidden md:flex items-center ml-6 space-x-6 text-sm font-medium">
            <Button
              variant="link"
              onClick={() => navigateTo("/dashboard")}
              className={cn(
                "transition-colors hover:text-foreground/80 relative py-1 px-0 h-auto font-medium text-sm",
                isActive("/dashboard") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Inicio
              <span 
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out",
                  isActive("/dashboard") ? "w-full opacity-100" : "w-0 opacity-0"
                )} 
              />
            </Button>
            
            <Button
              variant="link"
              onClick={() => navigateTo("/dashboard/courses")}
              className={cn(
                "transition-colors hover:text-foreground/80 relative py-1 px-0 h-auto font-medium text-sm",
                isActive("/dashboard/courses") || pathname?.includes("/course/") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Mis Cursos
              <span 
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out",
                  isActive("/dashboard/courses") || pathname?.includes("/course/") ? "w-full opacity-100" : "w-0 opacity-0"
                )} 
              />
            </Button>
            
            <Button
              variant="link"
              onClick={() => navigateTo("/dashboard/subjects")}
              className={cn(
                "transition-colors hover:text-foreground/80 relative py-1 px-0 h-auto font-medium text-sm",
                isActive("/dashboard/subjects") || pathname?.includes("/subject/") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Asignaturas
              <span 
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out",
                  isActive("/dashboard/subjects") || pathname?.includes("/subject/") ? "w-full opacity-100" : "w-0 opacity-0"
                )} 
              />
            </Button>
            
            <Button
              variant="link"
              onClick={() => navigateTo("/dashboard/achievements")}
              className={cn(
                "transition-colors hover:text-foreground/80 relative py-1 px-0 h-auto font-medium text-sm",
                isActive("/dashboard/achievements") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Logros
              <span 
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out",
                  isActive("/dashboard/achievements") ? "w-full opacity-100" : "w-0 opacity-0"
                )} 
              />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground"
            onClick={() => navigateTo("/dashboard/search")}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground"
            onClick={() => navigateTo("/dashboard/notifications")}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">Mi Cuenta</p>
                <p className="text-xs text-muted-foreground">Administra tu perfil y suscripción</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/subscription')}>
                <BookCheck className="mr-2 h-4 w-4" />
                <span>Suscripción</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

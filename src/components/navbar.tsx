"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const pathname = usePathname();

  // Detectar la sección activa y el estado de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Cambiar la apariencia del navbar al hacer scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detectar qué sección está actualmente en la vista
      const sections = [
        "features",
        "ai-tutor",
        "courses",
        "methodology",
        "subjects",
        "benefits",
        "testimonials",
        "pricing"
      ];

      // Encontrar cuál es la sección más cercana a la parte superior de la vista
      let closestSection = null;
      let closestDistance = Number.MAX_VALUE;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const distanceFromTop = Math.abs(rect.top - 100); // 100px desde el top como punto de referencia
        
        if (distanceFromTop < closestDistance) {
          closestDistance = distanceFromTop;
          closestSection = section;
        }
      });

      if (closestSection) {
        setActiveSection("#" + closestSection);
      }
    };

    // Ejecutar una vez al cargar para establecer la sección inicial
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar clic en enlaces de navegación
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Cerrar menú móvil si está abierto
      if (mobileNavOpen) {
        setMobileNavOpen(false);
      }
      
      // Scroll suave a la sección
      window.scrollTo({
        top: element.offsetTop - 80, // Ajustar según altura del navbar
        behavior: 'smooth'
      });
      
      // Actualizar URL sin recargar la página
      window.history.pushState(null, '', href);
      setActiveSection(href);
    }
  };

  const navItems = [
    { href: "#features", label: "Características" },
    { href: "#ai-tutor", label: "Tutor IA" },
    { href: "#courses", label: "Cursos" },
    { href: "#methodology", label: "Metodología" },
    { href: "#benefits", label: "Beneficios" },
    { href: "#pricing", label: "Planes" }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm transition-all duration-200",
      scrolled && "shadow-md"
    )}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              <span className="text-primary">Oe</span>
              <span>Profe</span>
              <span className="ml-1 text-xs text-muted-foreground font-normal">BETA</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href)}
                className={cn(
                  "transition-colors hover:text-foreground/80 relative py-1 px-1",
                  activeSection === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out",
                    activeSection === item.href ? "w-full opacity-100" : "w-0 opacity-0"
                  )} 
                />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
            <Link
              href="/sign-in"
              className={cn(
                "mx-3 hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
              )}
            >
              Iniciar Sesión
            </Link>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/sign-up">Probar Gratis</Link>
            </Button>
            <button
              className="ml-2 flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
              onClick={toggleMobileNav}
              aria-label="Toggle Menu"
            >
              {mobileNavOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {mobileNavOpen && <MobileNav toggleMobileNav={toggleMobileNav} navItems={navItems} />}
      </AnimatePresence>
    </header>
  );
}

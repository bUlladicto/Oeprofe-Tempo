"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  toggleMobileNav: () => void;
  navItems: NavItem[];
}

export function MobileNav({ toggleMobileNav, navItems }: MobileNavProps) {
  // Función para manejar clic en enlaces de navegación
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Cerrar menú móvil
      toggleMobileNav();
      
      // Pequeño timeout para asegurar que el menú se cierre antes de hacer scroll
      setTimeout(() => {
        // Scroll suave a la sección
        window.scrollTo({
          top: element.offsetTop - 80, // Ajustar según altura del navbar
          behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        window.history.pushState(null, '', href);
      }, 100);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto pb-32 md:hidden"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-20 grid gap-6 bg-background p-6 shadow-lg">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavLinkClick(e, item.href)}
              className="flex w-full items-center py-3 text-base font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/sign-in" onClick={toggleMobileNav}>
              <Button variant="ghost" className="w-full justify-start">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/sign-up" onClick={toggleMobileNav}>
              <Button className="w-full">Probar Gratis</Button>
            </Link>
          </div>
        </nav>
      </div>
      <motion.div
        className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleMobileNav}
      />
    </motion.div>
  );
} 
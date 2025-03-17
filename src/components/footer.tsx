"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">OeProfe</h2>
            <p className="text-muted-foreground max-w-xs mb-6">
              La primera plataforma chilena de tutoría IA personalizada, adaptada al currículo nacional y la PAES.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground mb-3">
              <Mail className="h-4 w-4" />
              <span className="text-sm">contacto@oeprofe.cl</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground mb-3">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+56 2 2123 4567</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Santiago, Chile</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {/* Platform Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Plataforma</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Planes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Mi Tutor IA
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Subjects Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Asignaturas</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Matemáticas
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Lenguaje
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Ciencias
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    PAES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Guía para Padres
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Blog Educativo
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Calendario PAES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Seguridad de Datos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} OeProfe Chile. Tu tutor IA para el currículo chileno. Todos los derechos reservados.
          </div>

          <div className="flex space-x-4">
            <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

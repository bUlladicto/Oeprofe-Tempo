"use client";

import { Button } from "./ui/button";
import { BookOpen, Award, Sparkles, Compass, Search, BarChart, BookCheck, MessageSquare, Clock, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Definir los tipos de secciones posibles
type SectionType = 
  | "enrolled"    // Mis Cursos
  | "recommended" // Recomendados
  | "achievements" // Logros
  | "activity"    // Actividad Reciente
  | "tutor"       // Tutor IA
  | "search"      // Buscar
  | "progress"    // Progreso
  | "plan";       // Plan

interface DashboardNavProps {
  onSectionChange?: (section: SectionType) => void;
  initialSection?: SectionType;
}

export default function DashboardNav({ onSectionChange, initialSection = "enrolled" }: DashboardNavProps) {
  const [activeSection, setActiveSection] = useState<SectionType>(initialSection);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Función para cambiar la sección activa
  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
    
    // Si se proporciona una función de callback, la llamamos
    if (onSectionChange) {
      onSectionChange(section);
    }
    
    // También hacemos scroll a la sección correspondiente
    document.getElementById(`${section}-section`)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scrollear automáticamente al botón activo cuando cambia la sección
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
      if (activeButton) {
        const scrollContainer = scrollContainerRef.current;
        const buttonLeft = activeButton.offsetLeft;
        const containerWidth = scrollContainer.clientWidth;
        const buttonWidth = activeButton.clientWidth;
        
        // Centrar el botón en el contenedor
        scrollContainer.scrollTo({
          left: buttonLeft - (containerWidth / 2) + (buttonWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  // Función para controlar la visibilidad de las flechas de navegación
  const checkArrowsVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Mostrar flecha izquierda solo si hemos scrolleado
      setShowLeftArrow(scrollLeft > 0);
      
      // Mostrar flecha derecha solo si hay más contenido para ver
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Inicializar y actualizar la visibilidad de las flechas
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkArrowsVisibility();
      scrollContainer.addEventListener('scroll', checkArrowsVisibility);
      window.addEventListener('resize', checkArrowsVisibility);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkArrowsVisibility);
        window.removeEventListener('resize', checkArrowsVisibility);
      };
    }
  }, []);

  // Funciones para controlar el scroll con las flechas
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Todos los botones de navegación en una estructura de datos
  const navButtons: {section: SectionType; label: string; description: string; icon: React.ReactNode}[] = [
    {
      section: "enrolled",
      label: "Mis Cursos",
      description: "Continúa tu aprendizaje",
      icon: <BookOpen className="h-5 w-5 text-primary" />
    },
    {
      section: "recommended",
      label: "Recomendados",
      description: "Cursos sugeridos para ti",
      icon: <Compass className="h-5 w-5 text-primary" />
    },
    {
      section: "achievements",
      label: "Logros",
      description: "Tus medallas y trofeos",
      icon: <Award className="h-5 w-5 text-primary" />
    },
    {
      section: "activity",
      label: "Actividad",
      description: "Historial de aprendizaje",
      icon: <Bell className="h-5 w-5 text-primary" />
    },
    {
      section: "tutor",
      label: "Tutor IA",
      description: "Ayuda personalizada",
      icon: <MessageSquare className="h-5 w-5 text-primary" />
    },
    {
      section: "search",
      label: "Buscar",
      description: "Encuentra contenido",
      icon: <Search className="h-5 w-5 text-primary" />
    },
    {
      section: "progress",
      label: "Progreso",
      description: "Estadísticas de aprendizaje",
      icon: <BarChart className="h-5 w-5 text-primary" />
    },
    {
      section: "plan",
      label: "Plan",
      description: "Gestiona tu suscripción",
      icon: <BookCheck className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="relative">
      {/* Botón de navegación izquierdo */}
      {showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card shadow-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label="Scroll izquierda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Container con scroll horizontal */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto py-3 px-10 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 px-1 w-full md:w-auto">
          {navButtons.map((button) => (
            <Button 
              key={button.section}
              data-section={button.section}
              variant={activeSection === button.section ? "default" : "outline"} 
              className={cn(
                "flex-none snap-start flex items-center px-6 py-4 h-auto min-w-[170px] sm:min-w-[200px] md:min-w-[220px] transition-all text-left shadow-sm hover:shadow",
                activeSection === button.section ? "border-primary bg-primary/10 hover:bg-primary/20" : ""
              )}
              onClick={() => handleSectionChange(button.section)}
            >
              <div className="mr-4 flex-shrink-0 bg-primary/10 p-2 rounded-full">
                {button.icon}
              </div>
              <div className="text-left overflow-hidden">
                <p className="font-medium text-sm sm:text-base md:text-lg whitespace-nowrap truncate">{button.label}</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">{button.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Botón de navegación derecho */}
      {showRightArrow && (
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card shadow-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label="Scroll derecha"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Indicadores de scroll en forma de sombras gradientes */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none", showLeftArrow ? "opacity-100" : "opacity-0")} />
      <div className={cn("absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none", showRightArrow ? "opacity-100" : "opacity-0")} />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 
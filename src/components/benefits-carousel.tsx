"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Tipo para el objeto de beneficio
interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
  research: string;
}

// Props para el componente
interface BenefitsCarouselProps {
  benefits: Benefit[];
}

export default function BenefitsCarousel({ benefits }: BenefitsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para navegar al beneficio anterior
  const prevBenefit = () => {
    setActiveIndex((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  // Función para navegar al beneficio siguiente
  const nextBenefit = () => {
    setActiveIndex((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
  };

  // Función para navegar a un beneficio específico
  const goToBenefit = (index: number) => {
    setActiveIndex(index);
  };

  // Manejar navegación con teclado y autoavance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevBenefit();
      if (e.key === "ArrowRight") nextBenefit();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Autoavanzar cada 5 segundos si no está siendo manipulado
    const autoAdvance = setInterval(() => {
      if (!isDragging) {
        nextBenefit();
      }
    }, 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(autoAdvance);
    };
  }, [benefits.length, isDragging]);

  // Manejar scroll del carrusel cuando cambia el índice activo
  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = activeIndex * (350 + 24); // ancho del elemento + espacio
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative max-w-[90vw] mx-auto">
      {/* Botones de navegación */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-10 md:-translate-x-8">
        <button
          onClick={prevBenefit}
          className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-accent transition-colors"
          aria-label="Beneficio anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-10 md:translate-x-8">
        <button
          onClick={nextBenefit}
          className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-accent transition-colors"
          aria-label="Beneficio siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contenedor del carrusel */}
      <div 
        className="overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-8 scrollbar-hide space-x-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={`flex-none w-[350px] snap-center transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: activeIndex === index ? 1 : 0.9, 
                opacity: activeIndex === index ? 1 : 0.6 
              }}
              transition={{ duration: 0.3 }}
              onClick={() => goToBenefit(index)}
            >
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm h-full cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{benefit.description}</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs text-primary/90 font-mono">
                    <span className="inline-block bg-primary/10 px-2 py-1 rounded mr-2">ESTUDIO</span> 
                    {benefit.research}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicadores de navegación */}
      <div className="flex justify-center mt-6 space-x-2">
        {benefits.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => goToBenefit(index)}
            aria-label={`Ir al beneficio ${index + 1}`}
          />
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 
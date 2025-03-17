"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserCircle, 
  Sparkles, 
  Brain, 
  Clock, 
  ArrowRight, 
  BookOpen,
  Lightbulb,
  BarChart2,
  MessageSquareText 
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function TutoringComparison() {
  const [activeTab, setActiveTab] = useState<"traditional" | "ai">("ai");
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <div className="relative rounded-xl overflow-hidden border border-border shadow-xl">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("traditional")}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
            activeTab === "traditional" 
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Tutoría Tradicional
          {activeTab === "traditional" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
              layoutId="activeTabIndicator"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
            activeTab === "ai" 
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Tutoría con IA Personalizada
          {activeTab === "ai" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
              layoutId="activeTabIndicator"
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "traditional" ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tutoría tradicional en el aula</h3>
              <p className="text-muted-foreground">
                El modelo tradicional de enseñanza está limitado por la relación profesor-estudiantes, donde un solo educador debe dividir su atención entre muchos alumnos.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                  <span>Relación típica de 1:30 (profesor:estudiantes)</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                  <span>Tiempo de atención limitado por estudiante</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                  <span>Ritmo de aprendizaje estandarizado para todos</span>
                </li>
                <li className="flex items-start">
                  <BarChart2 className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                  <span>Retroalimentación general y poco frecuente</span>
                </li>
              </ul>
            </div>
            <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-300 mb-2 relative z-10">
                    <UserCircle className="w-10 h-10" />
                  </div>
                  <div className="text-center mb-8">
                    <span className="text-sm font-medium">Profesor</span>
                  </div>
                  <div className="absolute top-20 w-64 flex flex-wrap justify-center gap-2">
                    {Array(12).fill(0).map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-xs text-center text-muted-foreground bg-background/60 backdrop-blur-sm rounded p-2">
                Atención dividida entre muchos estudiantes con necesidades diversas
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tutoría personalizada con IA</h3>
              <p className="text-muted-foreground">
                Volvemos al ideal educativo de la tutoría 1:1, donde cada estudiante recibe atención completa, adaptada a sus necesidades específicas, disponible en cualquier momento.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <UserCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Relación 1:1 para atención personalizada</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Disponible 24/7, sin limitaciones de horario</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Adaptación al ritmo y estilo de aprendizaje único</span>
                </li>
                <li className="flex items-start">
                  <Brain className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Retroalimentación instantánea y personalizada</span>
                </li>
              </ul>
            </div>
            <div className="relative h-80 bg-muted/20 rounded-lg overflow-hidden border border-border/50">
              <div className="absolute inset-0">
                {/* Línea de tiempo histórica */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-primary/20"></div>
                <div className="absolute top-4 left-[20%] w-1 h-3 bg-primary/40 rounded-full"></div>
                <div className="absolute top-2 left-[20%] text-xs text-muted-foreground">Sócrates</div>
                
                <div className="absolute top-4 left-[40%] w-1 h-3 bg-primary/40 rounded-full"></div>
                <div className="absolute top-2 left-[40%] text-xs text-muted-foreground">Aristóteles</div>
                
                <div className="absolute top-4 left-[60%] w-1 h-3 bg-primary/40 rounded-full"></div>
                <div className="absolute top-2 left-[60%] text-xs text-muted-foreground">Era Industrial</div>
                
                <div className="absolute top-4 left-[80%] w-1 h-3 bg-primary/40 rounded-full"></div>
                <div className="absolute top-2 left-[80%] text-xs text-muted-foreground">Presente</div>
                
                {/* Gráfica de evolución de la personalización */}
                <svg className="absolute top-10 left-0 right-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Línea que representa la personalización (alta en la antigua Grecia, baja en la era industrial, alta nuevamente con IA) */}
                  <path 
                    d="M 0,20 L 20,20 Q 30,20 40,50 L 60,80 Q 70,80 80,20 L 100,20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    className="text-primary" 
                  />
                  {/* Área bajo la curva */}
                  <path 
                    d="M 0,100 L 0,20 L 20,20 Q 30,20 40,50 L 60,80 Q 70,80 80,20 L 100,20 L 100,100 Z" 
                    className="fill-primary/10" 
                  />
                  {/* Líneas punteadas verticales */}
                  <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" className="text-muted-foreground/30" />
                  <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" className="text-muted-foreground/30" />
                  <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" className="text-muted-foreground/30" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" className="text-muted-foreground/30" />
                </svg>
                
                {/* Etiquetas de la gráfica */}
                <div className="absolute top-28 left-[10%] text-xs text-center">
                  <div className="text-primary font-medium">Alta</div>
                  <div className="text-muted-foreground text-[10px]">Personalización</div>
                </div>
                <div className="absolute top-[105px] left-[60%] text-xs text-center">
                  <div className="text-muted-foreground text-[10px]">Baja</div>
                  <div className="text-muted-foreground text-[10px]">Personalización</div>
                </div>
                
                {/* Representación del chat */}
                <div className="absolute bottom-4 left-4 right-4 h-32 bg-card rounded-lg border border-border/50 overflow-hidden shadow-md">
                  <div className="flex h-full">
                    <div className="w-12 bg-primary/5 flex flex-col items-center pt-3 border-r border-border/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Brain className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto">
                      <div className={`p-2 rounded-lg rounded-tl-none text-xs ${isDarkTheme ? 'bg-primary/10' : 'bg-primary/5'} mb-2 max-w-[90%]`}>
                        <p>¿En qué parte de la ecuación cuadrática 2x² - 5x + 3 = 0 tienes dificultad?</p>
                      </div>
                      <div className="flex justify-end mb-2">
                        <div className={`p-2 rounded-lg rounded-tr-none text-xs ${isDarkTheme ? 'bg-primary/20' : 'bg-primary/10'} max-w-[90%]`}>
                          <p>No entiendo cómo factorizarla para encontrar las soluciones.</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg rounded-tl-none text-xs ${isDarkTheme ? 'bg-primary/10' : 'bg-primary/5'} max-w-[90%]`}>
                        <p>Para factorizar, necesitamos encontrar dos números que:</p>
                        <p>1. Multiplicados den 2×3 = 6</p>
                        <p>2. Sumados den -5</p>
                        <p>¿Qué números cumplen estas condiciones?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Etiqueta de método socrático */}
                <div className="absolute bottom-[140px] right-4 bg-primary/10 text-primary text-xs py-1 px-3 rounded-full flex items-center">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  <span>Método socrático digital</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium">
              {activeTab === "ai" 
                ? "Tutoría con IA: El regreso al ideal educativo de la antigüedad" 
                : "Modelo tradicional: Limitado por recursos y tiempo"}
            </span>
          </div>
          <button 
            onClick={() => setActiveTab(activeTab === "traditional" ? "ai" : "traditional")}
            className="text-sm text-primary flex items-center hover:underline"
          >
            Ver {activeTab === "traditional" ? "tutoría IA" : "tradicional"}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
} 
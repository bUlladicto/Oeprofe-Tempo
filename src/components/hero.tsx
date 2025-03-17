"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientMotionWrapper from "./client-motion-wrapper";
import { Code, Terminal, Send } from "lucide-react";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  
  return (
    <div className="relative overflow-hidden bg-background pb-16 pt-[4.5rem]">
      {/* Fondo con efecto de código/matriz */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 overflow-hidden">
          {/* Líneas de código animadas */}
          <ClientMotionWrapper>
            <motion.div
              className="absolute top-20 left-10 text-xs font-mono opacity-20 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2 }}
            >
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="mb-1">{`function tutorIA(estudiante, nivel) { return new Promise((resolve) => { ... }) }`}</div>
              ))}
            </motion.div>
          </ClientMotionWrapper>
          
          <ClientMotionWrapper>
            <motion.div
              className="absolute bottom-20 right-10 text-xs font-mono opacity-20 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="mb-1">{`const curriculum = await api.fetchChileanCurriculum(asignatura, nivel);`}</div>
              ))}
            </motion.div>
          </ClientMotionWrapper>
        </div>
        
        {/* Formas decorativas de fondo */}
        <div className="absolute top-0 right-0 -z-10 transform-gpu blur-3xl">
          <ClientMotionWrapper>
            <motion.div
              animate={{
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="aspect-[1108/632] w-[80rem] bg-gradient-to-r from-primary/20 to-secondary/20 opacity-20"
            />
          </ClientMotionWrapper>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 transform-gpu blur-3xl">
          <ClientMotionWrapper>
            <motion.div
              animate={{
                opacity: [0.3, 0.15, 0.3],
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="aspect-[1108/632] w-[60rem] bg-gradient-to-l from-primary/30 to-secondary/30 opacity-30"
            />
          </ClientMotionWrapper>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                <Code className="mr-1 h-3 w-3" /> Educación Chilena + IA
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Tu tutor <span className="text-primary">inteligente</span> para el currículum chileno
            </h1>
            <p className="max-w-[42rem] text-muted-foreground text-xl sm:text-2xl">
              Aprendizaje 1:1 personalizado con IA. Diseñado para cada estudiante, alineado con el sistema educativo chileno y la PAES.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-md shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-shadow">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="#ai-tutor">
                <Button variant="outline" size="lg" className="text-md">
                  Conocer el Tutor IA
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Todas las asignaturas</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Preparación PAES</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Tutor 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ClientMotionWrapper>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-2xl border border-primary/30"
              >
                <div className="absolute top-0 left-0 right-0 h-8 bg-card border-b border-border flex items-center px-4">
                  <Terminal className="h-3.5 w-3.5 text-primary mr-2" />
                  <span className="text-xs font-mono">oeprofe-tutor-ia.cli</span>
                </div>
                <div className={`absolute top-8 bottom-0 left-0 right-0 ${isDarkTheme ? 'bg-black/90' : 'bg-slate-900/80'} pt-4`}>
                  {/* Simulación del chat del tutor */}
                  <div className="relative h-full w-full overflow-hidden">
                    {/* Fondo oscuro con código */}
                    <div className="absolute inset-0 opacity-15 overflow-hidden">
                      {Array(15).fill(0).map((_, i) => (
                        <div key={i} className="text-xs font-mono text-primary/70 ml-4 my-2">
                          {i % 2 === 0 
                            ? `const respuesta = await tutorIA.preguntar("¿Cómo resolver ${i % 3 === 0 ? 'ecuaciones cuadráticas' : i % 3 === 1 ? 'sistemas de ecuaciones' : 'factorización algebraica'}?");`
                            : `// Procesando respuesta para ${i % 3 === 0 ? 'María' : i % 3 === 1 ? 'Carlos' : 'Daniela'}, nivel ${Math.floor(Math.random() * 12) + 1}`
                          }
                        </div>
                      ))}
                    </div>
                    
                    {/* Interfaz del chat */}
                    <div className="absolute inset-0 flex flex-col p-4">
                      <div className="flex items-center border-b border-primary/20 pb-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                          IA
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-primary">Tutor IA de Matemáticas</h3>
                          <p className="text-xs text-muted-foreground">Método socrático personalizado</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto space-y-4">
                        {/* Mensaje del usuario */}
                        <div className="flex justify-end">
                          <div className="bg-primary/10 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                            <p className={`text-sm ${isDarkTheme ? 'text-foreground' : 'text-foreground'}`}>No entiendo cómo resolver esta ecuación cuadrática: 2x² - 5x + 3 = 0</p>
                            <p className="text-xs text-right text-muted-foreground mt-1">10:24</p>
                          </div>
                        </div>
                        
                        {/* Respuesta del tutor */}
                        <div className="flex justify-start">
                          <div className={`${isDarkTheme ? 'bg-muted/50' : 'bg-muted/70'} rounded-lg rounded-tl-none p-3 max-w-[80%]`}>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                                IA
                              </div>
                              <span className="text-xs font-medium">Tutor IA</span>
                            </div>
                            <p className={`text-sm ${isDarkTheme ? 'text-foreground' : 'text-foreground'}`}>
                              Vamos a analizarla paso a paso. En una ecuación cuadrática de la forma ax² + bx + c = 0, ¿puedes identificar cuáles son los valores de a, b y c en tu ecuación?
                            </p>
                            <p className="text-xs text-right text-muted-foreground mt-1">10:25</p>
                          </div>
                        </div>
                        
                        {/* Segunda interacción */}
                        <div className="flex justify-end">
                          <div className="bg-primary/10 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                            <p className={`text-sm ${isDarkTheme ? 'text-foreground' : 'text-foreground'}`}>Creo que a = 2, b = -5 y c = 3</p>
                            <p className="text-xs text-right text-muted-foreground mt-1">10:26</p>
                          </div>
                        </div>
                        
                        <ClientMotionWrapper>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex justify-start"
                          >
                            <div className={`${isDarkTheme ? 'bg-muted/50' : 'bg-muted/70'} rounded-lg rounded-tl-none p-3 max-w-[80%]`}>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                                  IA
                                </div>
                                <span className="text-xs font-medium">Tutor IA</span>
                              </div>
                              <p className={`text-sm ${isDarkTheme ? 'text-foreground' : 'text-foreground'}`}>
                                ¡Exacto! Ahora, ¿qué métodos conoces para resolver ecuaciones cuadráticas? Podríamos usar la fórmula general o intentar factorizar. ¿Qué te parece si intentamos primero ver si podemos factorizar esta expresión?
                              </p>
                              <p className="text-xs text-right text-muted-foreground mt-1">10:27</p>
                            </div>
                          </motion.div>
                        </ClientMotionWrapper>
                      </div>
                      
                      {/* Área de input */}
                      <div className="border-t border-primary/20 pt-3 mt-3">
                        <div className={`${isDarkTheme ? 'bg-muted/30' : 'bg-muted/40'} rounded-lg flex items-center p-2`}>
                          <input 
                            type="text" 
                            className="bg-transparent flex-1 text-sm border-none outline-none focus:ring-0" 
                            placeholder="Escribe tu pregunta..."
                            disabled
                          />
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 ml-1 rounded-full">
                            <Send className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-muted-foreground">Método socrático: te guío con preguntas</p>
                          <p className="text-xs text-primary">Disponible 24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ClientMotionWrapper>
            
            <div className="absolute -right-6 -bottom-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl"></div>
            
            {/* Elementos de decoración tipo código */}
            <div className="absolute -left-10 top-20 bg-primary/5 border border-primary/10 rounded p-2 rotate-6 shadow-sm">
              <code className="text-xs font-mono text-primary/70">import {'{ TutorIA }'} from 'oeprofe';</code>
            </div>
            <div className="absolute -right-10 bottom-32 bg-primary/5 border border-primary/10 rounded p-2 -rotate-3 shadow-sm">
              <code className="text-xs font-mono text-primary/70">await tutor.explain('matematicas');</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientMotionWrapper from "./client-motion-wrapper";
import { Code, Terminal } from "lucide-react";

export default function Hero() {
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
                <div className="absolute top-8 bottom-0 left-0 right-0 bg-black/90 pt-4">
                  <Image
                    src="/tutor-ai-demo.png"
                    alt="AI Tutor Demo"
                    fill
                    className="object-cover opacity-80"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="rounded-lg bg-card/90 backdrop-blur-sm p-4 shadow-lg border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        IA
                      </div>
                      <div className="flex-1">
                        <ClientMotionWrapper>
                          <motion.p 
                            className="text-sm text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                          >
                            Entiendo que estás teniendo dificultades con la resolución de ecuaciones cuadráticas. Vamos a dividir este problema en pasos más simples. Primero identificaremos los valores de a, b y c en la ecuación...
                          </motion.p>
                        </ClientMotionWrapper>
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

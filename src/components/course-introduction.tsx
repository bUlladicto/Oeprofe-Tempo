"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Clock, FileText, GraduationCap, Info, PlayCircle, Target, Trophy, UsersRound, PlusCircle, BookOpen, BarChart, Calculator, Brain } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DiagnosticEvaluation from "./diagnostic-evaluation";

interface CourseIntroductionProps {
  courseId: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  lastUpdate: string;
  objectives: string[];
  requirements: string[];
  overview: string;
}

export default function CourseIntroduction({
  courseId,
  title = "Matemáticas - Álgebra y funciones cuadráticas",
  description = "Domina el álgebra y las funciones cuadráticas con un enfoque práctico orientado a la PAES y aplicaciones del mundo real",
  subject = "Matemáticas",
  level = "2° Medio",
  instructor = "Prof. Gabriel Martínez",
  duration = "10 semanas",
  students = 584,
  rating = 4.8,
  lastUpdate = "Agosto 2023",
  objectives = [
    "Comprender los conceptos fundamentales del álgebra",
    "Resolver problemas con ecuaciones cuadráticas",
    "Graficar e interpretar funciones cuadráticas",
    "Aplicar conceptos algebraicos a problemas del mundo real",
    "Prepararse eficazmente para la PAES de matemáticas"
  ],
  requirements = [
    "Conocimientos básicos de álgebra de 1° Medio",
    "Comprensión de ecuaciones lineales",
    "Operaciones con números reales"
  ],
  overview = "Este curso de Matemáticas está diseñado para estudiantes de 2° Medio que buscan fortalecer sus habilidades en álgebra y funciones cuadráticas, con un enfoque específico en la preparación para la PAES. A través de explicaciones claras, ejercicios prácticos y evaluaciones periódicas, los estudiantes desarrollarán una comprensión profunda de estos conceptos fundamentales."
}: Partial<CourseIntroductionProps>) {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  return (
    <div className="space-y-8">
      {/* Bienvenida y video introductorio */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-400/30">
                  {subject}
                </Badge>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-400/30">
                  {level}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-6 space-y-6">
              <p className="text-muted-foreground">{overview}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm">Instructor: <span className="font-medium">{instructor}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">Duración: <span className="font-medium">{duration}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersRound className="h-5 w-5 text-primary" />
                  <span className="text-sm"><span className="font-medium">{students}</span> estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span className="text-sm">Calificación: <span className="font-medium">{rating}/5</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm">Actualizado: <span className="font-medium">{lastUpdate}</span></span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">¿Por qué tomar este curso?</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Las habilidades matemáticas desarrolladas en este curso son esenciales para el éxito académico y profesional. El álgebra y las funciones cuadráticas son fundamentales para la PAES y aparecen en numerosas aplicaciones del mundo real, desde ingeniería hasta economía.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-3">
                {!showDiagnostic ? (
                  <Button 
                    onClick={() => setShowDiagnostic(true)} 
                    className="gap-2"
                  >
                    <BarChart className="h-4 w-4" />
                    Iniciar evaluación diagnóstica
                  </Button>
                ) : (
                  <Button asChild className="gap-2">
                    <Link href={`/course/${courseId}/lesson/introduction`}>
                      <PlayCircle className="h-4 w-4" />
                      Comenzar curso
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Explorar temario
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="h-full">
            <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-primary/30 z-10"></div>
              <img 
                src="/course-preview-math.jpg" 
                alt="Vista previa del curso" 
                className="w-full h-full object-cover absolute opacity-70"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1000";
                }}
              />
              <Button className="z-20 gap-2" size="lg">
                <PlayCircle className="h-5 w-5" />
                Ver introducción
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Lo que aprenderás:</h3>
              <ul className="space-y-2">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contenido condicional - Evaluación diagnóstica o detalles del curso */}
      {showDiagnostic ? (
        <DiagnosticEvaluation 
          courseId={courseId || "default-course-id"}
          subject={subject}
          onComplete={() => {
            // En una aplicación real, aquí guardaríamos los resultados
            setShowDiagnostic(false);
          }}
        />
      ) : (
        <Tabs defaultValue="detalles" className="space-y-6">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
            <TabsTrigger 
              value="detalles" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
            >
              Detalles del curso
            </TabsTrigger>
            <TabsTrigger 
              value="requisitos" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
            >
              Requisitos previos
            </TabsTrigger>
            <TabsTrigger 
              value="metodologia" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
            >
              Metodología
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="detalles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Acerca del curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-primary" />
                    Objetivos de aprendizaje
                  </h3>
                  <ul className="space-y-2 ml-7">
                    {objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-primary" />
                    Enfoque pedagógico
                  </h3>
                  <p className="text-muted-foreground ml-7">
                    Este curso utiliza una metodología de aprendizaje basada en problemas, combinando explicaciones teóricas con numerosos ejercicios prácticos. El contenido está estructurado progresivamente, partiendo desde conceptos básicos hacia aplicaciones más complejas. Se hace especial énfasis en la comprensión conceptual y no solo en los procedimientos mecánicos.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <BarChart className="h-5 w-5 text-primary" />
                    Evaluación y progreso
                  </h3>
                  <p className="text-muted-foreground ml-7">
                    El curso incluye evaluaciones formativas al final de cada módulo y ejercicios de autoevaluación para consolidar el aprendizaje. La plataforma realiza un seguimiento personalizado de tu progreso, identificando áreas de fortaleza y aspectos que requieren mayor atención.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Estructura del curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <PlusCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Módulo 1: Fundamentos de álgebra</h3>
                      <p className="text-sm text-muted-foreground">Expresiones algebraicas, ecuaciones lineales y sistemas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Módulo 2: Ecuaciones cuadráticas</h3>
                      <p className="text-sm text-muted-foreground">Resolución de ecuaciones, factorización y fórmula cuadrática</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Módulo 3: Funciones cuadráticas</h3>
                      <p className="text-sm text-muted-foreground">Gráficas, propiedades y transformaciones</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Módulo 4: Aplicaciones prácticas</h3>
                      <p className="text-sm text-muted-foreground">Problemas de optimización y modelado con funciones cuadráticas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Módulo 5: Preparación para la PAES</h3>
                      <p className="text-sm text-muted-foreground">Estrategias y ejercicios tipo PAES de matemáticas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requisitos">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requisitos previos</CardTitle>
                <CardDescription>
                  Para aprovechar al máximo este curso, se recomienda que el estudiante ya posea los siguientes conocimientos:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{requirement}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {index === 0 && "Comprender el uso de variables, operaciones algebraicas básicas y simplificación de expresiones."}
                          {index === 1 && "Saber despejar incógnitas y resolver problemas lineales sencillos."}
                          {index === 2 && "Manejar con soltura operaciones con fracciones, decimales, potencias y raíces."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 border-t pt-6">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-4 rounded-lg flex gap-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">¿No tienes estos requisitos?</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300/80 mt-1">
                        No te preocupes, hemos preparado una sección introductoria de nivelación que cubre estos conceptos. También puedes revisar nuestro curso de "Fundamentos de Matemáticas" que te ayudará a prepararte.
                      </p>
                      <Button variant="link" className="text-amber-700 dark:text-amber-400 p-0 h-auto mt-2">
                        Ver curso de nivelación
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metodologia">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Metodología de enseñanza</CardTitle>
                <CardDescription>
                  Este curso combina distintos enfoques pedagógicos para maximizar tu aprendizaje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Aprendizaje visual</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lecciones en video con explicaciones claras y visuales para ayudarte a comprender los conceptos abstractos con ejemplos gráficos y animaciones.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calculator className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Práctica guiada</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ejercicios paso a paso con retroalimentación inmediata para que practiques los conceptos aprendidos y corrijas errores en tiempo real.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Aprendizaje adaptativo</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      El sistema analiza tu desempeño para ofrecerte contenido y ejercicios personalizados según tus fortalezas y áreas de mejora.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Tutor IA</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Asistencia 24/7 con nuestro tutor de IA que responde preguntas, proporciona explicaciones adicionales y te guía mediante el método socrático.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-medium mb-4">Certificación de aprendizaje</h3>
                  <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-lg">
                    <div className="bg-primary/10 h-14 w-14 flex items-center justify-center rounded-full">
                      <Trophy className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Certificado de finalización</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Al completar el curso con un mínimo de 70% de aprobación, recibirás un certificado digital que acredita tus conocimientos en álgebra y funciones cuadráticas.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 
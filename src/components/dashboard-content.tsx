"use client";

import { useState } from "react";
import DashboardNav from "./dashboard-nav";
import CourseCard from "./course-card";
import AchievementBadge from "./achievement-badge";
import ClientMotionWrapper from "./client-motion-wrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Compass,
  Sparkles,
  Search,
  BarChart,
  BookCheck,
  MessageSquare,
  ArrowRight,
  LineChart,
  FileText,
  CheckCircle2,
  Clock,
  Bell,
  Calculator
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Progress } from "./ui/progress";
import ManageSubscription from "./manage-subscription";
import { Badge } from "./ui/badge";

// Tipo para las secciones de navegación
type SectionType = 
  | "enrolled"    // Mis Cursos
  | "recommended" // Recomendados
  | "achievements" // Logros
  | "activity"    // Actividad Reciente
  | "tutor"       // Tutor IA
  | "search"      // Buscar
  | "progress"    // Progreso
  | "plan";       // Plan

interface DashboardContentProps {
  enrolledCourses: any[];
  recommendedCourses: any[];
  achievements: any[];
  user: any;
  redirectUrl?: string;
}

export default function DashboardContent({
  enrolledCourses,
  recommendedCourses,
  achievements,
  user,
  redirectUrl
}: DashboardContentProps) {
  const [activeSection, setActiveSection] = useState<SectionType>("enrolled");

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  // Recientes actividades y sesiones
  const recentActivities = [
    {
      id: "act1",
      title: "Completaste una lección",
      course: "Matemáticas Básicas",
      lesson: "Números del 1 al 100",
      date: "Ayer, 18:35",
      icon: <BookCheck className="h-5 w-5 text-emerald-500" />
    },
    {
      id: "act2",
      title: "Lograste un nuevo logro",
      achievement: "Científico Curioso",
      date: "10/07/2023, 14:22",
      icon: <Award className="h-5 w-5 text-amber-500" />
    },
    {
      id: "act3",
      title: "Iniciaste un nuevo curso",
      course: "Ciencias de la Naturaleza",
      date: "08/07/2023, 09:15",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />
    },
    {
      id: "act4",
      title: "Completaste un examen",
      course: "Lenguaje",
      date: "05/07/2023, 16:40",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    },
    {
      id: "act5",
      title: "Sesión con tutor IA",
      topic: "Fracciones y decimales",
      date: "03/07/2023, 11:20",
      icon: <MessageSquare className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div>
      {/* Navegación */}
      <DashboardNav 
        onSectionChange={handleSectionChange} 
        initialSection={activeSection} 
      />

      {/* Contenido dinámico basado en la sección activa */}
      <div className="mt-8">
        {/* Mis Cursos */}
        {activeSection === "enrolled" && (
          <div className="space-y-6" id="enrolled-section">
            <h2 className="text-2xl font-semibold">Mis Cursos</h2>
            
            {/* Curso matemáticas destacado con evaluación diagnóstica */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calculator className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-400/30">
                      Matemáticas
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Nueva evaluación diagnóstica
                    </Badge>
                  </div>
                  <h3 className="text-xl font-medium">Matemáticas - Álgebra y funciones cuadráticas</h3>
                  <p className="text-muted-foreground mt-1">Evaluación diagnóstica disponible para personalizar tu experiencia de aprendizaje</p>
                </div>
                <Button asChild>
                  <Link href="/course/math-101">
                    <BarChart className="mr-2 h-4 w-4" />
                    Comenzar evaluación
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Carrusel de cursos en progreso */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Continúa aprendiendo</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/courses" className="text-primary">
                    Ver todos mis cursos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {enrolledCourses.map((course, index) => (
                  <ClientMotionWrapper key={course.id} delay={index}>
                    <CourseCard {...course} />
                  </ClientMotionWrapper>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recomendados */}
        {activeSection === "recommended" && (
          <div id="recommended-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cursos Recomendados</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/discover">
                  <Compass className="mr-2 h-4 w-4" />
                  Explorar más
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course, index) => (
                <ClientMotionWrapper key={course.id} delay={index}>
                  <CourseCard {...course} />
                </ClientMotionWrapper>
              ))}
            </div>
          </div>
        )}

        {/* Logros */}
        {activeSection === "achievements" && (
          <div id="achievements-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Mis Logros</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/achievements">Ver todos</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <ClientMotionWrapper key={achievement.id} delay={index}>
                  <AchievementBadge {...achievement} />
                </ClientMotionWrapper>
              ))}
            </div>
          </div>
        )}

        {/* Actividad Reciente */}
        {activeSection === "activity" && (
          <div id="activity-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Actividad Reciente</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/activity">Ver todo mi historial</Link>
              </Button>
            </div>
            <Card className="border-border/40">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-card border border-border">
                        {activity.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        {activity.course && (
                          <p className="text-sm text-muted-foreground">
                            {activity.course}
                            {activity.lesson && ` - ${activity.lesson}`}
                          </p>
                        )}
                        {activity.achievement && (
                          <p className="text-sm text-muted-foreground">
                            {activity.achievement}
                          </p>
                        )}
                        {activity.topic && (
                          <p className="text-sm text-muted-foreground">
                            {activity.topic}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/activity">
                    <Bell className="mr-2 h-4 w-4" />
                    Ver actividad completa
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Tutor IA */}
        {activeSection === "tutor" && (
          <div id="tutor-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tutor IA</h2>
            </div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tu asistente de aprendizaje personal</CardTitle>
                <CardDescription>
                  El Tutor IA está diseñado para adaptarse a tu estilo de aprendizaje y ayudarte con cualquier materia del currículo chileno.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <h3 className="font-medium">¿Qué puedes hacer con el Tutor IA?</h3>
                    <ul className="space-y-2">
                      {[
                        "Resolver dudas de cualquier materia",
                        "Practicar ejercicios y recibir retroalimentación",
                        "Prepararte para evaluaciones y la PAES",
                        "Recibir explicaciones personalizadas a tu ritmo"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l border-border hidden md:block"></div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-4">Sesiones recientes</h3>
                    <div className="space-y-3">
                      {[
                        { title: "Ecuaciones cuadráticas", subject: "Matemáticas", date: "Hace 2 días" },
                        { title: "Guerra del Pacífico", subject: "Historia", date: "Hace 5 días" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/40 border border-border">
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-xs text-muted-foreground">{session.subject} • {session.date}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link href="/dashboard/tutor">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Iniciar nueva sesión
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Buscar */}
        {activeSection === "search" && (
          <div id="search-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Buscar</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Encuentra cualquier contenido</CardTitle>
                <CardDescription>
                  Busca cursos, lecciones, temas o cualquier contenido educativo disponible en la plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">¿Qué quieres aprender hoy?</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Accede rápidamente a cualquier tema del currículo chileno. Busca por asignatura, nivel educativo o tema específico.
                  </p>
                  <Button asChild size="lg" className="px-8">
                    <Link href="/dashboard/search">
                      <Search className="mr-2 h-4 w-4" />
                      Ir a búsqueda avanzada
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progreso */}
        {activeSection === "progress" && (
          <div id="progress-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Mi Progreso</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progreso por asignatura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { subject: "Matemáticas", progress: 68, color: "bg-blue-500" },
                      { subject: "Lenguaje", progress: 45, color: "bg-purple-500" },
                      { subject: "Ciencias", progress: 32, color: "bg-green-500" },
                      { subject: "Historia", progress: 22, color: "bg-amber-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.subject}</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Estadísticas de aprendizaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Lecciones completadas", value: "32", icon: <BookCheck className="h-8 w-8 text-primary" /> },
                      { label: "Horas de estudio", value: "12.5", icon: <Clock className="h-8 w-8 text-primary" /> },
                      { label: "Días activos", value: "14", icon: <CheckCircle2 className="h-8 w-8 text-primary" /> },
                      { label: "Evaluaciones", value: "8", icon: <FileText className="h-8 w-8 text-primary" /> },
                    ].map((stat, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-lg border border-border">
                        <div className="p-3 bg-primary/10 rounded-full mb-2">
                          {stat.icon}
                        </div>
                        <span className="text-xl font-bold">{stat.value}</span>
                        <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard/progress">
                      <LineChart className="mr-2 h-4 w-4" />
                      Ver informe detallado
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Plan de suscripción */}
        {activeSection === "plan" && (
          <div id="plan-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Mi Plan</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Plan Actual</CardTitle>
                <CardDescription>
                  Gestiona tu suscripción y acceso a la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-primary/20 rounded-lg p-6 bg-primary/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-xs text-primary font-medium uppercase">Plan activo</p>
                      <h3 className="text-xl font-bold mt-1">Plan Estudiante Premium</h3>
                      <p className="text-sm text-muted-foreground mt-1">Renovación: 15 de octubre, 2023</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {redirectUrl && (
                        <ManageSubscription redirectUrl={redirectUrl} />
                      )}
                      <Button variant="outline">Cambiar plan</Button>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium mb-3">Características incluidas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Acceso ilimitado al tutor IA",
                        "Todos los cursos del currículo",
                        "Práctica personalizada",
                        "Evaluaciones y seguimiento",
                        "Materiales descargables",
                        "Soporte prioritario"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Play,
  BookCheck,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardNavbar from "@/components/dashboard-navbar";
import ModuleAccordion from "@/components/module-accordion";
import CourseIntroduction from "@/components/course-introduction";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }

  // Fetch course data
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (courseError) {
    // Si hay un error, lo registramos pero seguimos con datos de muestra
    console.error("Error fetching course:", courseError);
  }

  // Datos del curso (reales o de ejemplo si no hay datos)
  const courseData = course || {
    id: params.id || "math-101",
    title: "Matemáticas - Álgebra y funciones cuadráticas",
    description: "Domina el álgebra y las funciones cuadráticas con un enfoque práctico orientado a la PAES y aplicaciones del mundo real",
    subject: "Matemáticas",
    grade_level: "2° Medio",
  };

  // Fetch user's progress data
  const { data: userProgress, error: progressError } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("course_id", params.id)
    .limit(1)
    .single();

  // Sample data structure for modules and lessons
  const modules = [
    {
      id: "module-0",
      title: "Módulo 0: Introducción al curso",
      description: "Bienvenida, objetivos y evaluación diagnóstica",
      lessons: [
        {
          id: "lesson-0-1",
          title: "Bienvenida y presentación del curso",
          description: "Conoce los objetivos, metodología y estructura del curso",
          type: "video",
          completed: true,
          duration: "10 minutos",
        },
        {
          id: "lesson-0-2",
          title: "Evaluación diagnóstica",
          description: "Identifica tus conocimientos previos y áreas de mejora",
          type: "quiz",
          completed: true,
          duration: "30 minutos",
        },
        {
          id: "lesson-0-3",
          title: "Guía de estudio personalizada",
          description: "Plan personalizado según tus resultados de la evaluación diagnóstica",
          type: "practice",
          completed: false,
          duration: "15 minutos",
        },
      ],
    },
    {
      id: "module-1",
      title: "Módulo 1: Fundamentos de álgebra",
      description: "Conceptos básicos y operaciones algebraicas",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Introducción a las variables y expresiones algebraicas",
          description: "Conoce los conceptos fundamentales del álgebra",
          type: "video",
          completed: true,
          duration: "15 minutos",
        },
        {
          id: "lesson-1-2",
          title: "Simplificación de expresiones algebraicas",
          description: "Aprende a simplificar y manipular expresiones",
          type: "video",
          completed: true,
          duration: "20 minutos",
        },
        {
          id: "lesson-1-3",
          title: "Ecuaciones lineales y su resolución",
          description: "Técnicas para resolver ecuaciones de primer grado",
          type: "practice",
          completed: false,
          duration: "25 minutos",
        },
        {
          id: "lesson-1-4",
          title: "Evaluación del módulo 1",
          description: "Comprueba tus conocimientos de álgebra básica",
          type: "quiz",
          completed: false,
          duration: "15 minutos",
        },
      ],
    },
    {
      id: "module-2",
      title: "Módulo 2: Ecuaciones cuadráticas",
      description: "Resolución de ecuaciones de segundo grado",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Forma general de las ecuaciones cuadráticas",
          description: "Entendiendo la estructura de las ecuaciones de segundo grado",
          type: "video",
          completed: false,
          duration: "15 minutos",
        },
        {
          id: "lesson-2-2",
          title: "Resolución por factorización",
          description: "Técnicas para resolver ecuaciones mediante factorización",
          type: "video",
          completed: false,
          duration: "20 minutos",
        },
        {
          id: "lesson-2-3",
          title: "La fórmula cuadrática",
          description: "Utilizando la fórmula general para resolver ecuaciones",
          type: "practice",
          completed: false,
          duration: "25 minutos",
        },
        {
          id: "lesson-2-4",
          title: "Discriminante y naturaleza de las raíces",
          description: "Analizando los tipos de soluciones posibles",
          type: "video",
          completed: false,
          duration: "18 minutos",
        },
        {
          id: "lesson-2-5",
          title: "Evaluación del módulo 2",
          description: "Comprueba tus conocimientos de ecuaciones cuadráticas",
          type: "quiz",
          completed: false,
          duration: "20 minutos",
        },
      ],
    },
    {
      id: "module-3",
      title: "Módulo 3: Funciones cuadráticas",
      description: "Gráficas y propiedades de las funciones cuadráticas",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Definición y elementos de una función cuadrática",
          description: "Conceptos básicos sobre funciones de segundo grado",
          type: "video",
          completed: false,
          duration: "15 minutos",
        },
        {
          id: "lesson-3-2",
          title: "Gráfica de una parábola",
          description: "Representación gráfica de funciones cuadráticas",
          type: "video",
          completed: false,
          duration: "20 minutos",
        },
        {
          id: "lesson-3-3",
          title: "Vértice, eje de simetría y puntos de corte",
          description: "Elementos principales de una parábola",
          type: "practice",
          completed: false,
          duration: "25 minutos",
        },
        {
          id: "lesson-3-4",
          title: "Transformaciones de funciones cuadráticas",
          description: "Efectos de los parámetros en la forma de la parábola",
          type: "video",
          completed: false,
          duration: "22 minutos",
        },
        {
          id: "lesson-3-5",
          title: "Evaluación del módulo 3",
          description: "Comprueba tus conocimientos de funciones cuadráticas",
          type: "quiz",
          completed: false,
          duration: "20 minutos",
        },
      ],
    },
  ];

  // Calculate progress statistics
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce((acc, module) => {
    return acc + module.lessons.filter(lesson => lesson.completed).length;
  }, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  // Mostrar la introducción del curso si es el curso de matemáticas específico
  const showCourseIntro = params.id === "math-101";

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="container pb-16 pt-8">
        <div className="space-y-8">
          {/* Mostrar el componente de introducción al curso solo para math-101 */}
          {showCourseIntro && (
            <CourseIntroduction 
              courseId={courseData.id}
              title={courseData.title}
              description={courseData.description}
              subject={courseData.subject || "Matemáticas"}
              level={courseData.grade_level || "2° Medio"}
            />
          )}

          {/* Course Modules */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Contenido del curso</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>
                  {completedLessons} de {totalLessons} lecciones completadas ({progress}%)
                </span>
              </div>
              </div>

            <Progress value={progress} className="h-2" />

            <div className="space-y-4">
              {modules.map((module) => (
                    <ModuleAccordion
                      key={module.id}
                      module={module}
                  courseId={courseData.id} 
                    />
                  ))}
            </div>
                    </div>
                    </div>
                  </div>
      <footer className="border-t py-6 bg-muted/20">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            © 2023 OeProfe Tempo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

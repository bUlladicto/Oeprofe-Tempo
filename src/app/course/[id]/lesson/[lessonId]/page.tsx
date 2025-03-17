import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  CheckCircle2,
  Menu,
  X,
  List,
  MessageSquare,
  PenSquare,
  FileText,
  CheckCheck,
  ChevronDown,
  Sparkles,
  Book,
  VideoIcon,
  ClipboardList,
  Clock,
  Check,
} from "lucide-react";
import VideoPlayer from "@/components/video-player";
import LessonContent from "@/components/lesson-content";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { markLessonCompleted } from "@/app/actions";
import SocraticTutor from "@/components/socratic-tutor";
import Module1Lesson1Content from "@/components/module1-lesson1-content";
import Module1Lesson2Content from "@/components/module1-lesson2-content";

export default async function LessonPage({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  // Si no hay datos en la base de datos, usar datos de muestra
  const sampleCourse = {
    id: params.id,
    title: "Curso de ejemplo",
    description: "Este es un curso de ejemplo para demostración",
    subject: "Matemáticas",
    grade_level: "1° Básico",
    duration: "4 horas",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  };

  // Usar los datos de la base de datos o los de muestra si no hay
  const courseData = course || sampleCourse;

  // Sample modules and lessons
  const sampleModules = [
    {
      id: "mod1",
      title: "Introducción al curso",
      description: "Bienvenida y conceptos básicos",
      position: 1,
      course_id: params.id,
      lessons: [
        {
          id: "les1",
          title: "Bienvenida al curso",
          description: "Conoce los objetivos y la metodología",
          type: "video",
          completed: true,
          duration: "5 min",
          module_id: "mod1",
          position: 1,
        },
        {
          id: "les2",
          title: "Evaluación diagnóstica",
          description: "Mide tu nivel actual de conocimientos",
          type: "quiz",
          completed: true,
          duration: "15 min",
          module_id: "mod1",
          position: 2,
        },
      ],
    },
    {
      id: "mod2",
      title: "Fundamentos",
      description: "Conceptos esenciales para dominar la materia",
      position: 2,
      course_id: params.id,
      lessons: [
        {
          id: "les3",
          title: "Principios básicos",
          description: "Fundamentos teóricos esenciales",
          type: "video",
          completed: true,
          duration: "12 min",
          module_id: "mod2",
          position: 1,
        },
        {
          id: "les4",
          title: "Ejercicios prácticos",
          description: "Aplica los conceptos aprendidos",
          type: "practice",
          completed: false,
          duration: "20 min",
          module_id: "mod2",
          position: 2,
        },
        {
          id: "les5",
          title: "Evaluación de conceptos",
          description: "Comprueba tu comprensión",
          type: "quiz",
          completed: false,
          duration: "15 min",
          module_id: "mod2",
          position: 3,
        },
      ],
    },
    {
      id: "mod3",
      title: "Aplicaciones avanzadas",
      description: "Uso de conceptos en situaciones complejas",
      position: 3,
      course_id: params.id,
      lessons: [
        {
          id: "les6",
          title: "Casos de estudio",
          description: "Análisis de situaciones reales",
          type: "video",
          completed: false,
          duration: "15 min",
          module_id: "mod3",
          position: 1,
        },
        {
          id: "les7",
          title: "Proyecto final",
          description: "Aplica todos los conceptos aprendidos",
          type: "practice",
          completed: false,
          duration: "30 min",
          module_id: "mod3",
          position: 2,
        },
      ],
    },
  ];

  // Get lesson details (usando datos de muestra)
  const allLessons = sampleModules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l.id === params.lessonId) || {
    id: params.lessonId,
    title: "Lección de ejemplo",
    description: "Esta es una lección de ejemplo para demostración",
    type: "video",
    completed: false,
    duration: "10 min",
    module_id: "mod1",
    position: 1,
  };

  // Find module for this lesson
  const currentModule = sampleModules.find(m => m.id === currentLesson.module_id) || sampleModules[0];
  
  // Calculate current module progress
  const moduleLessons = currentModule.lessons;
  const completedModuleLessons = moduleLessons.filter(l => l.completed);
  const moduleProgress = Math.round((completedModuleLessons.length / moduleLessons.length) * 100);

  // Find next and previous lessons
  const lessonIndex = moduleLessons.findIndex(l => l.id === currentLesson.id);
  const previousLesson = lessonIndex > 0 ? moduleLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < moduleLessons.length - 1 ? moduleLessons[lessonIndex + 1] : null;

  // Set type-specific content
  const lessonContent = {
    video: {
      title: "Introducción a los conceptos básicos",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      transcript: `
        <p>Bienvenidos a esta lección sobre conceptos básicos. En este video, vamos a explorar los fundamentos que necesitas comprender antes de avanzar.</p>
        <p>Primero, hablaremos sobre la importancia de estos conceptos en el contexto actual y cómo se aplican en situaciones cotidianas.</p>
        <p>Luego, analizaremos ejemplos prácticos y resolveremos algunos ejercicios para consolidar lo aprendido.</p>
        <p>Finalmente, discutiremos cómo estos conceptos se relacionan con temas más avanzados que veremos en futuras lecciones.</p>
      `
    },
    practice: {
      title: "Ejercicios prácticos",
      instructions: "Resuelve los siguientes ejercicios aplicando los conceptos aprendidos en la lección anterior.",
      problems: [
        {
          id: "p1",
          question: "Problema 1: Si tenemos un conjunto de datos con valores [2, 4, 6, 8, 10], ¿cuál es la media aritmética?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "6"
        },
        {
          id: "p2",
          question: "Problema 2: Aplica el concepto X para resolver la siguiente situación...",
          options: ["Opción A", "Opción B", "Opción C", "Opción D"],
          correctAnswer: "Opción C"
        }
      ]
    },
    quiz: {
      title: "Evaluación de conocimientos",
      description: "Comprueba tu comprensión de los conceptos estudiados en este módulo.",
      questions: [
        {
          id: "q1",
          question: "¿Cuál de las siguientes afirmaciones es correcta?",
          options: ["Afirmación A", "Afirmación B", "Afirmación C", "Afirmación D"],
          correctAnswer: "Afirmación C"
        },
        {
          id: "q2",
          question: "¿Qué concepto se aplica mejor a la siguiente situación...?",
          options: ["Concepto A", "Concepto B", "Concepto C", "Concepto D"],
          correctAnswer: "Concepto B"
        }
      ]
    }
  };

  return (
    <SubscriptionCheck>
      <div className="flex flex-col h-screen bg-background">
      <DashboardNavbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar para navegación de lecciones */}
          <div className="hidden md:flex flex-col w-72 border-r border-border/40 bg-card/40">
            <div className="p-4 border-b border-border/40">
              <Link
                href={`/course/${params.id}`}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Volver al curso</span>
              </Link>
              <h3 className="mt-3 font-semibold text-base line-clamp-2">{courseData.title}</h3>
            </div>

            {/* Módulos y lecciones */}
            <div className="flex-1 overflow-y-auto p-0">
              {sampleModules.map((module) => (
                <div key={module.id} className="border-b border-border/40 last:border-0">
                  <div className="flex justify-between items-center p-4 bg-card/60">
                    <h4 className="font-medium text-sm">{module.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border-t border-border/20">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/course/${params.id}/lesson/${lesson.id}`}
                        className={cn(
                          "flex items-center p-3 text-sm hover:bg-muted/50 transition-colors border-l-2 border-transparent",
                          lesson.id === params.lessonId && "bg-primary/5 border-l-2 border-primary",
                          lesson.completed && lesson.id !== params.lessonId && "border-l-2 border-emerald-500/50"
                        )}
                      >
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center mr-3",
                          lesson.completed ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                        )}>
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : lesson.type === "video" ? (
                            <Play className="h-4 w-4" />
                          ) : lesson.type === "practice" ? (
                            <PenSquare className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-medium line-clamp-1",
                            lesson.id === params.lessonId && "text-primary"
                          )}>
                            {lesson.title}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Barra superior con título de lección */}
            <div className="flex items-center justify-between p-4 border-b border-border/40 bg-card">
              <div>
                <h1 className="text-xl font-semibold">{currentLesson.title}</h1>
                <p className="text-sm text-muted-foreground">{currentModule.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Menu className="h-4 w-4 mr-2" />
                  Contenido
                </Button>
                <Progress value={moduleProgress} className="w-24 h-2 bg-secondary" />
                <span className="text-sm font-medium">{moduleProgress}%</span>
              </div>
            </div>
            
            {/* Contenido de la lección */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="content">Contenido</TabsTrigger>
                    <TabsTrigger value="resources">Recursos</TabsTrigger>
                    <TabsTrigger value="notes">Mis notas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-6">
                    {params.lessonId === "lesson-1-1" ? (
                      <Module1Lesson1Content />
                    ) : params.lessonId === "lesson-1-2" ? (
                      <Module1Lesson2Content />
                    ) : currentLesson.type === "video" ? (
                      <>
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <VideoPlayer videoUrl={lessonContent.video.videoUrl} />
                        </div>
                        <div className="mt-6">
                          <h2 className="text-2xl font-bold mb-4">{lessonContent.video.title}</h2>
                          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: lessonContent.video.transcript }}></div>
                        </div>
                      </>
                    ) : currentLesson.type === "practice" ? (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">{lessonContent.practice.title}</h2>
                        <p className="text-lg">{lessonContent.practice.instructions}</p>
                        
                        <div className="space-y-8 mt-8">
                          {lessonContent.practice.problems.map((problem, index) => (
                            <Card key={problem.id} className="border-border/40">
                              <CardHeader>
                                <CardTitle className="text-xl">{problem.question}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {problem.options.map((option, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                      <div className="h-5 w-5 rounded-full border border-primary/50 flex items-center justify-center">
                                        {i === 2 && <div className="h-3 w-3 rounded-full bg-primary"></div>}
                                      </div>
                                      <span>{option}</span>
                                    </div>
                                  ))}
                                </div>
                  </CardContent>
                </Card>
                          ))}
                        </div>
                      </div>
                    ) : currentLesson.type === "quiz" ? (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">{lessonContent.quiz.title}</h2>
                        <p className="text-lg">{lessonContent.quiz.description}</p>
                        
                        <div className="space-y-8 mt-8">
                          {lessonContent.quiz.questions.map((question, index) => (
                            <Card key={question.id} className="border-border/40">
                <CardHeader>
                                <CardTitle className="text-xl">Pregunta {index + 1}: {question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                                <div className="space-y-3">
                                  {question.options.map((option, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                      <div className="h-5 w-5 rounded-full border border-primary/50 flex items-center justify-center">
                                        {option === question.correctAnswer && <div className="h-3 w-3 rounded-full bg-primary"></div>}
                                      </div>
                                      <span>{option}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Contenido de la lección</h2>
                        <p>El contenido para este tipo de lección no está disponible.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="resources" className="space-y-4">
                    <h2 className="text-2xl font-bold">Recursos para esta lección</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-border/40">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-primary/10">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Material de apoyo</h3>
                              <p className="text-sm text-muted-foreground">PDF - 2.5 MB</p>
                              <Button variant="link" className="px-0 h-7">Descargar</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-border/40">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-primary/10">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Ejercicios adicionales</h3>
                              <p className="text-sm text-muted-foreground">PDF - 1.8 MB</p>
                              <Button variant="link" className="px-0 h-7">Descargar</Button>
                            </div>
                          </div>
                </CardContent>
              </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    <h2 className="text-2xl font-bold">Mis notas</h2>
                    <Card className="border-border/40">
                      <CardContent className="p-6">
                        <textarea 
                          className="w-full h-64 bg-card border border-border/40 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                          placeholder="Escribe tus notas aquí..."
                        />
                        <div className="flex justify-end mt-4">
                          <Button>Guardar notas</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Navegación entre lecciones */}
            <div className="border-t border-border/40 p-4 bg-card">
              <div className="flex justify-between">
                {previousLesson ? (
                  <Button variant="outline" asChild>
                    <Link href={`/course/${params.id}/lesson/${previousLesson.id}`}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button variant="default" className="mx-auto">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Marcar como completada
                </Button>

                {nextLesson ? (
                  <Button variant="default" asChild>
                    <Link href={`/course/${params.id}/lesson/${nextLesson.id}`}>
                      Siguiente
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="default" asChild>
                    <Link href={`/course/${params.id}`}>
                      Finalizar
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Socratic Tutor component */}
        <SocraticTutor 
          lessonTitle={currentLesson.title}
          lessonType={currentLesson.type}
          courseSubject={courseData.subject}
          concepts={['Ecuaciones', 'Funciones', 'Problemas de aplicación']}
        />
      </div>
    </SubscriptionCheck>
  );
}

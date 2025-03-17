import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  Star,
  TrendingUp,
  TrendingDown,
  Brain,
  LineChart
} from "lucide-react";
import Link from "next/link";

export default async function CoursesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample enrolled courses with more detailed info
  const enrolledCourses = [
    {
      id: "1",
      title: "Matemáticas Básicas",
      description:
        "Aprende los fundamentos de matemáticas con actividades interactivas y divertidas.",
      subject: "Matemáticas",
      gradeLevel: "1° Básico",
      progress: 65,
      duration: "4 horas",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
      achievements: 3,
      completedLessons: 8,
      totalLessons: 12,
      lastAccessed: "Hace 2 días",
      skills: [
        { name: "Numeración", level: 75, trending: "up" },
        { name: "Operaciones básicas", level: 60, trending: "up" },
        { name: "Resolución de problemas", level: 40, trending: "stable" },
        { name: "Geometría básica", level: 30, trending: "down" },
      ],
      strengths: ["Operaciones con números del 1-100", "Secuencias numéricas", "Reconocimiento de patrones"],
      weaknesses: ["Problemas de palabras", "Geometría espacial", "Fracciones simples"],
      nextMilestone: "Completar módulo de fracciones"
    },
    {
      id: "2",
      title: "Lectura y Escritura",
      description:
        "Desarrolla habilidades de lectura y escritura con nuestro método probado.",
      subject: "Lenguaje",
      gradeLevel: "2° Básico",
      progress: 30,
      duration: "6 horas",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      achievements: 1,
      completedLessons: 5,
      totalLessons: 15,
      lastAccessed: "Ayer",
      skills: [
        { name: "Comprensión lectora", level: 45, trending: "up" },
        { name: "Ortografía", level: 60, trending: "stable" },
        { name: "Producción de textos", level: 25, trending: "up" },
        { name: "Vocabulario", level: 55, trending: "up" },
      ],
      strengths: ["Identificación de ideas principales", "Ortografía de palabras comunes", "Lectura en voz alta"],
      weaknesses: ["Producción de textos narrativos", "Uso de puntuación", "Inferencias"],
      nextMilestone: "Completar módulo de comprensión lectora"
    },
    {
      id: "3",
      title: "Ciencias de la Naturaleza",
      description:
        "Explora el mundo natural con experimentos y actividades prácticas.",
      subject: "Ciencias",
      gradeLevel: "3° Básico",
      progress: 10,
      duration: "5 horas",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
      achievements: 0,
      completedLessons: 2,
      totalLessons: 20,
      lastAccessed: "Hace 1 semana",
      skills: [
        { name: "Método científico", level: 15, trending: "stable" },
        { name: "Seres vivos", level: 25, trending: "up" },
        { name: "Ecosistemas", level: 10, trending: "stable" },
        { name: "Materia y energía", level: 5, trending: "up" },
      ],
      strengths: ["Clasificación de seres vivos", "Observación científica"],
      weaknesses: ["Experimentación", "Ciclos de vida", "Cadenas alimentarias"],
      nextMilestone: "Completar módulo de ecosistemas"
    },
  ];

  return (
    <SubscriptionCheck>
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 pt-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Mis Cursos</h1>
              <p className="text-muted-foreground">
                Gestiona tus cursos, revisa tu progreso y mejora tus habilidades
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Volver al Dashboard
              </Link>
            </Button>
          </div>

          {/* Estadísticas generales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-border/40 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    <p className="text-xs text-muted-foreground">de 10 disponibles</p>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      {Math.round(
                        enrolledCourses.reduce((acc, course) => acc + course.progress, 0) /
                          enrolledCourses.length
                      )}%
                    </div>
                    <p className="text-xs text-muted-foreground">Promedio</p>
                  </div>
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <LineChart className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lecciones Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      {enrolledCourses.reduce((acc, course) => acc + course.completedLessons, 0)}/
                      {enrolledCourses.reduce((acc, course) => acc + course.totalLessons, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="p-2 rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Logros Desbloqueados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      {enrolledCourses.reduce((acc, course) => acc + course.achievements, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Award className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de cursos con detalles */}
          <div className="space-y-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="border-border/40 hover:border-primary/30 transition-colors overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Imagen y detalles básicos */}
                  <div className="md:col-span-3 h-full">
                    <div className="relative h-48 md:h-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${course.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="secondary" className="bg-background/80 text-xs">
                            {course.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-background/80 text-xs">
                            {course.gradeLevel}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white">{course.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Contenido y progreso */}
                  <div className="md:col-span-9 p-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Visión General</TabsTrigger>
                        <TabsTrigger value="skills">Habilidades</TabsTrigger>
                        <TabsTrigger value="strengths">Fortalezas</TabsTrigger>
                        <TabsTrigger value="weaknesses">Áreas de Mejora</TabsTrigger>
                      </TabsList>
                      
                      {/* Visión general */}
                      <TabsContent value="overview" className="mt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{course.description}</p>
                          
                          <div className="flex flex-wrap gap-6">
                            <div>
                              <p className="text-sm font-medium mb-1">Progreso del curso</p>
                              <div className="flex items-center gap-2">
                                <Progress value={course.progress} className="h-2 w-40" />
                                <span className="text-sm">{course.progress}%</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium mb-1">Lecciones completadas</p>
                              <p className="text-sm">
                                <span className="font-medium">{course.completedLessons}</span> de {course.totalLessons}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium mb-1">Logros desbloqueados</p>
                              <p className="text-sm">
                                <span className="font-medium">{course.achievements}</span>
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium mb-1">Último acceso</p>
                              <p className="text-sm">{course.lastAccessed}</p>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <p className="text-sm font-medium mb-3">Próximo objetivo</p>
                            <div className="flex items-center space-x-2 text-emerald-500 text-sm">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>{course.nextMilestone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex gap-2">
                          <Button asChild>
                            <Link href={`/course/${course.id}`}>
                              Continuar curso
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline">Ver contenido</Button>
                        </div>
                      </TabsContent>
                      
                      {/* Habilidades */}
                      <TabsContent value="skills" className="mt-4">
                        <div className="space-y-6">
                          <p className="text-sm text-muted-foreground">
                            Análisis de tus habilidades desarrolladas en este curso. El sistema evalúa tu desempeño en cada área.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course.skills.map((skill, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">{skill.name}</p>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium">{skill.level}%</span>
                                    {skill.trending === "up" && (
                                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                                    )}
                                    {skill.trending === "down" && (
                                      <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                    {skill.trending === "stable" && (
                                      <div className="h-4 w-4 text-amber-500 flex items-center">―</div>
                                    )}
                                  </div>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Fortalezas */}
                      <TabsContent value="strengths" className="mt-4">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Basado en tu desempeño, estas son tus principales fortalezas en este curso.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {course.strengths.map((strength, index) => (
                              <Card key={index} className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/10 dark:border-emerald-900/30">
                                <CardContent className="p-4 flex items-start space-x-3">
                                  <Star className="h-5 w-5 text-emerald-500 mt-0.5" />
                                  <p className="text-sm">{strength}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              <Brain className="mr-1 h-4 w-4" />
                              Practicar con tutor IA
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Debilidades */}
                      <TabsContent value="weaknesses" className="mt-4">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Hemos identificado estas áreas donde podrías mejorar. Te recomendamos enfocarte en ellas.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {course.weaknesses.map((weakness, index) => (
                              <Card key={index} className="border-amber-200 bg-amber-50 dark:bg-amber-950/10 dark:border-amber-900/30">
                                <CardContent className="p-4 flex items-start space-x-3">
                                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                                  <p className="text-sm">{weakness}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="text-xs h-8 bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary hover:text-primary">
                              <Brain className="mr-1 h-4 w-4" />
                              Ejercicios recomendados
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </SubscriptionCheck>
  );
} 
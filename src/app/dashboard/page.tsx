import DashboardNavbar from "@/components/dashboard-navbar";
import ManageSubscription from "@/components/manage-subscription";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  BookOpen,
  Award,
  Clock,
  BarChart,
  BookMarked,
  Lightbulb,
  Globe,
  Sparkles,
  BookCheck,
  Search,
  Compass,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  FileText,
  LineChart,
  Calculator
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { manageSubscriptionAction } from "../actions";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/course-card";
import AchievementBadge from "@/components/achievement-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientMotionWrapper from "@/components/client-motion-wrapper";
import Footer from "@/components/footer";
import DashboardNav from "@/components/dashboard-nav";
import DashboardContent from "@/components/dashboard-content";
import { Badge } from "@/components/ui/badge";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const result = await manageSubscriptionAction(user?.id);

  if (!result) {
    return redirect("/pricing");
  }

  // Sample enrolled courses
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
    },
  ];

  // Sample recommended courses
  const recommendedCourses = [
    {
      id: "4",
      title: "Historia de Chile",
      description:
        "Conoce la historia de nuestro país desde sus orígenes hasta la actualidad.",
      subject: "Historia",
      gradeLevel: "4° Básico",
      duration: "8 horas",
      image:
        "https://images.unsplash.com/photo-1551406483-3731d1997540?w=800&q=80",
    },
    {
      id: "5",
      title: "Inglés Básico",
      description:
        "Aprende las bases del idioma inglés con lecciones interactivas y divertidas.",
      subject: "Inglés",
      gradeLevel: "3° Básico",
      duration: "10 horas",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    },
    {
      id: "6",
      title: "Preparación PAES Matemáticas",
      description:
        "Prepárate para la prueba con ejercicios específicos y contenido adaptado a ti.",
      subject: "PAES",
      gradeLevel: "4° Medio",
      duration: "12 horas",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    },
  ];

  // Sample achievements
  const achievements = [
    {
      id: "a1",
      name: "Matemático Novato",
      description: "Completar 5 lecciones de matemáticas",
      icon: <Award className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "15/05/2023",
    },
    {
      id: "a2",
      name: "Lector Ávido",
      description: "Leer 10 textos en la plataforma",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "20/06/2023",
    },
    {
      id: "a3",
      name: "Científico Curioso",
      description: "Completar 3 experimentos virtuales",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "10/07/2023",
    },
    {
      id: "a4",
      name: "Historiador",
      description: "Completar el curso de Historia de Chile",
      icon: <BookMarked className="h-8 w-8 text-primary" />,
      unlocked: false,
    },
    {
      id: "a5",
      name: "Políglota",
      description: "Completar el curso básico de inglés",
      icon: <Globe className="h-8 w-8 text-primary" />,
      unlocked: false,
    },
  ];

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
  ];

  return (
    <SubscriptionCheck>
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 pt-8 pb-16">
          {/* Welcome Banner */}
          <div className="mb-8 relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-40 w-40 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -right-10 -bottom-20 -z-10 h-80 w-80 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                  <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <FileText className="mr-1 h-3 w-3" />
                    3 cursos en progreso
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">¡Bienvenido{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}!</h1>
                <p className="text-muted-foreground mb-4">
                  Continúa tu aprendizaje personalizado con tu tutor IA o descubre nuevos contenidos.
                </p>
                
                <div className="flex items-center space-x-3">
                  <Suspense fallback={<div>Cargando...</div>}>
                    {result?.url && (
                      <ManageSubscription redirectUrl={result?.url!} />
                    )}
                  </Suspense>
                  <Button asChild variant="default">
                    <Link href="/dashboard/tutor">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Iniciar Tutoría IA
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-4 flex items-center justify-center p-2">
                <div className="relative w-full h-full min-h-[100px] max-h-[160px]">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="text-center">
                      <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Última sesión:</p>
                      <p className="text-xs text-muted-foreground mb-1">"Ecuaciones cuadráticas"</p>
                      <Button variant="outline" size="sm" className="mt-1 h-7 text-xs" asChild>
                        <Link href="/course/math-101/lesson/lesson-2-1">
                          Continuar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <ClientMotionWrapper delay={0}>
              <Card className="border-border/40 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>Cursos Activos</span>
                    <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center">
                      <ArrowRight className="h-3 w-3 mr-1 rotate-45" /> +1
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                      <p className="text-xs text-muted-foreground">3 completados este mes</p>
                    </div>
                    <div className="p-2 rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={75} className="h-1.5 bg-secondary" />
                  </div>
                </CardContent>
              </Card>
            </ClientMotionWrapper>
            
            <ClientMotionWrapper delay={1}>
              <Card className="border-border/40 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>Logros Desbloqueados</span>
                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center">
                      <ArrowRight className="h-3 w-3 mr-1 rotate-45" /> +2
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold">
                        {achievements.filter((a) => a.unlocked).length}/{achievements.length}
                      </div>
                      <p className="text-xs text-muted-foreground">60% completado</p>
                    </div>
                    <div className="p-2 rounded-full bg-amber-500/10">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={60} className="h-1.5 bg-secondary" />
                  </div>
                </CardContent>
              </Card>
            </ClientMotionWrapper>
            
            <ClientMotionWrapper delay={2}>
              <Card className="border-border/40 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>Tiempo de Estudio</span>
                    <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center">
                      <ArrowRight className="h-3 w-3 mr-1 rotate-45" /> +2h
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold">12h 30m</div>
                      <p className="text-xs text-muted-foreground">3h 20m esta semana</p>
                    </div>
                    <div className="p-2 rounded-full bg-emerald-500/10">
                      <Clock className="h-5 w-5 text-emerald-500" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={40} className="h-1.5 bg-secondary" />
                  </div>
                </CardContent>
              </Card>
            </ClientMotionWrapper>
            
            <ClientMotionWrapper delay={3}>
              <Card className="border-border/40 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>Progreso General</span>
                    <span className="text-xs text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full flex items-center">
                      <ArrowRight className="h-3 w-3 mr-1 rotate-45" /> +5%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold">35%</div>
                      <p className="text-xs text-muted-foreground">Meta mensual: 50%</p>
                    </div>
                    <div className="p-2 rounded-full bg-purple-500/10">
                      <BarChart className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={35} className="h-1.5 bg-secondary" />
                  </div>
                </CardContent>
              </Card>
            </ClientMotionWrapper>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Content Tabs (Columns 1-2) */}
            <div className="lg:col-span-3">
              <div>
                {/* Utilizamos el componente DashboardContent para manejar el contenido dinámico */}
                <DashboardContent 
                  enrolledCourses={enrolledCourses}
                  recommendedCourses={recommendedCourses}
                  achievements={achievements}
                  user={user}
                  redirectUrl={result?.url}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </SubscriptionCheck>
  );
}

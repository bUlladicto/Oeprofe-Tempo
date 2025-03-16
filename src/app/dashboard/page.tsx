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
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { manageSubscriptionAction } from "../actions";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/course-card";
import AchievementBadge from "@/components/achievement-badge";

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
  ];

  // Sample achievements
  const achievements = [
    {
      id: "a1",
      name: "Matemático Novato",
      description: "Completar 5 lecciones de matemáticas",
      icon: <Award />,
      unlocked: true,
      date: "15/05/2023",
    },
    {
      id: "a2",
      name: "Lector Ávido",
      description: "Leer 10 textos en la plataforma",
      icon: <BookOpen />,
      unlocked: true,
      date: "20/06/2023",
    },
    {
      id: "a3",
      name: "Científico Curioso",
      description: "Completar 3 experimentos virtuales",
      icon: <Lightbulb />,
      unlocked: true,
      date: "10/07/2023",
    },
    {
      id: "a4",
      name: "Historiador",
      description: "Completar el curso de Historia de Chile",
      icon: <BookMarked />,
      unlocked: false,
    },
    {
      id: "a5",
      name: "Políglota",
      description: "Completar el curso básico de inglés",
      icon: <Globe />,
      unlocked: false,
    },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mi Aprendizaje</h1>
            <div className="flex items-center gap-4">
              <Suspense fallback={<div>Cargando...</div>}>
                {result?.url && (
                  <ManageSubscription redirectUrl={result?.url!} />
                )}
              </Suspense>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cursos Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {enrolledCourses.length}
                  </div>
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Logros Desbloqueados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {achievements.filter((a) => a.unlocked).length}
                  </div>
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tiempo de Estudio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12h 30m</div>
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Progreso General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">35%</div>
                  <BarChart className="h-5 w-5 text-purple-500" />
                </div>
                <Progress value={35} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="enrolled" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="enrolled">Mis Cursos</TabsTrigger>
              <TabsTrigger value="recommended">Recomendados</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
            </TabsList>
            <TabsContent value="enrolled" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Logros</CardTitle>
                  <CardDescription>
                    Has desbloqueado{" "}
                    {achievements.filter((a) => a.unlocked).length} de{" "}
                    {achievements.length} logros disponibles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {achievements.map((achievement) => (
                      <AchievementBadge key={achievement.id} {...achievement} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Clock, CheckCircle2, Play } from "lucide-react";
import ModuleAccordion from "@/components/module-accordion";
import Link from "next/link";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
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

  if (courseError || !course) {
    return redirect("/dashboard");
  }

  // Get user progress for this course
  const { data: userProgress, error: progressError } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", params.id)
    .single();

  // If no progress record exists, create one
  if (progressError) {
    await supabase.from("user_progress").insert({
      user_id: user.id,
      course_id: params.id,
      progress: 0,
    });
  }

  const progress = userProgress?.progress || 0;

  // Get modules for this course
  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", params.id)
    .order("position");

  if (modulesError) {
    console.error("Error fetching modules:", modulesError);
  }

  // Get all lessons for this course's modules
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("*")
    .in("module_id", modules?.map((m) => m.id) || [])
    .order("position");

  if (lessonsError) {
    console.error("Error fetching lessons:", lessonsError);
  }

  // Get user lesson progress
  const { data: userLessonProgress, error: lessonProgressError } =
    await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .in("lesson_id", lessons?.map((l) => l.id) || []);

  if (lessonProgressError) {
    console.error("Error fetching lesson progress:", lessonProgressError);
  }

  // Calculate completed lessons
  const completedLessons = userLessonProgress?.filter((p) => p.completed) || [];
  const completedCount = completedLessons.length;
  const totalLessons = lessons?.length || 0;

  // Find the next lesson to continue
  let nextLessonId = null;
  let nextLessonModuleId = null;

  if (lessons && lessons.length > 0) {
    const completedLessonIds = completedLessons.map((p) => p.lesson_id);
    const incompleteLessons = lessons.filter(
      (l) => !completedLessonIds.includes(l.id),
    );

    if (incompleteLessons.length > 0) {
      nextLessonId = incompleteLessons[0].id;
      nextLessonModuleId = incompleteLessons[0].module_id;
    } else {
      // If all lessons are completed, suggest the first one for review
      nextLessonId = lessons[0].id;
      nextLessonModuleId = lessons[0].module_id;
    }
  }

  // Organize lessons by module
  const moduleWithLessons = modules?.map((module) => {
    const moduleLessons =
      lessons?.filter((l) => l.module_id === module.id) || [];
    const moduleLessonProgress = moduleLessons.map((lesson) => {
      const progress = userLessonProgress?.find(
        (p) => p.lesson_id === lesson.id,
      );
      return {
        ...lesson,
        completed: progress?.completed || false,
      };
    });

    return {
      ...module,
      lessons: moduleLessonProgress,
    };
  });

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course Info */}
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600">{course.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lecciones</p>
                      <p className="font-medium">
                        {completedCount}/{totalLessons} completadas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Logros</p>
                      <p className="font-medium">3 disponibles</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duración</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Progreso del curso</CardTitle>
                  <CardDescription>
                    Has completado el {progress}% de este curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="content" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Contenido</TabsTrigger>
                  <TabsTrigger value="resources">Recursos</TabsTrigger>
                  <TabsTrigger value="achievements">Logros</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {moduleWithLessons?.map((module) => (
                    <ModuleAccordion
                      key={module.id}
                      module={module}
                      courseId={params.id}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recursos del curso</CardTitle>
                      <CardDescription>
                        Material complementario para profundizar tu aprendizaje
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <a href="#" className="text-blue-600 hover:underline">
                            Guía de estudio - {course.title}.pdf
                          </a>
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <a href="#" className="text-blue-600 hover:underline">
                            Actividades prácticas.pdf
                          </a>
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <a href="#" className="text-blue-600 hover:underline">
                            Glosario de términos.pdf
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Logros del curso</CardTitle>
                      <CardDescription>
                        Desbloquea estos logros completando actividades
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border border-amber-200 bg-amber-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-amber-100 p-2 rounded-full">
                                <Award className="h-5 w-5 text-amber-600" />
                              </div>
                              <h3 className="font-medium">Explorador</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                              Completa tu primera lección
                            </p>
                            {completedCount > 0 && (
                              <div className="mt-2 flex items-center text-green-600 text-sm">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Desbloqueado
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <Card className="border border-amber-200 bg-amber-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-amber-100 p-2 rounded-full">
                                <Award className="h-5 w-5 text-amber-600" />
                              </div>
                              <h3 className="font-medium">Dedicado</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                              Completa 5 lecciones
                            </p>
                            {completedCount >= 5 && (
                              <div className="mt-2 flex items-center text-green-600 text-sm">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Desbloqueado
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <Card className="border border-amber-200 bg-amber-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-amber-100 p-2 rounded-full">
                                <Award className="h-5 w-5 text-amber-600" />
                              </div>
                              <h3 className="font-medium">Maestro</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                              Completa todo el curso
                            </p>
                            {completedCount === totalLessons &&
                              totalLessons > 0 && (
                                <div className="mt-2 flex items-center text-green-600 text-sm">
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Desbloqueado
                                </div>
                              )}
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <Card className="sticky top-4">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Continúa aprendiendo
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {completedCount === totalLessons
                        ? "¡Has completado todas las lecciones! Puedes repasar cualquier lección."
                        : `Has completado ${completedCount} de ${totalLessons} lecciones.`}
                    </p>
                    <Progress
                      value={(completedCount / totalLessons) * 100}
                      className="h-2 mb-2"
                    />
                  </div>

                  {nextLessonId && (
                    <Button asChild className="w-full mb-4">
                      <Link
                        href={`/lesson/${nextLessonId}?courseId=${params.id}&moduleId=${nextLessonModuleId}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {completedCount === totalLessons
                          ? "Repasar lecciones"
                          : "Continuar curso"}
                      </Link>
                    </Button>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">
                        {totalLessons} lecciones
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">
                        3 logros disponibles
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

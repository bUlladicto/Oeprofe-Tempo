import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Play,
  BookOpen,
  CheckCircle2,
  ListChecks,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default async function ModulePage({
  params,
}: {
  params: { id: string; moduleId: string };
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

  // Get module details
  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .eq("id", params.moduleId)
    .single();

  if (moduleError || !module) {
    return redirect(`/course/${params.id}`);
  }

  // Get all lessons for this module
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", params.moduleId)
    .order("position");

  if (lessonsError) {
    console.error("Error fetching lessons:", lessonsError);
    return redirect(`/course/${params.id}`);
  }

  // Get user lesson progress
  const { data: userLessonProgress, error: progressError } = await supabase
    .from("user_lesson_progress")
    .select("*")
    .eq("user_id", user.id)
    .in("lesson_id", lessons?.map((l) => l.id) || []);

  // Calculate progress
  const completedLessons = userLessonProgress?.filter((p) => p.completed) || [];
  const progress = Math.round(
    (completedLessons.length / (lessons?.length || 1)) * 100,
  );

  // Find first incomplete lesson
  let nextLessonId = null;
  if (lessons && lessons.length > 0) {
    const completedLessonIds = completedLessons.map((p) => p.lesson_id);
    const incompleteLessons = lessons.filter(
      (l) => !completedLessonIds.includes(l.id),
    );

    if (incompleteLessons.length > 0) {
      nextLessonId = incompleteLessons[0].id;
    } else {
      // If all lessons are completed, suggest the first one for review
      nextLessonId = lessons[0].id;
    }
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link
                href={`/course/${params.id}`}
                className="hover:text-blue-600"
              >
                {course.title}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>{module.title}</span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-gray-600">{module.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Progreso del módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {completedLessons.length} de {lessons?.length || 0}{" "}
                        lecciones completadas
                      </span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {nextLessonId && (
                    <Button asChild className="w-full">
                      <Link
                        href={`/course/${params.id}/lesson/${nextLessonId}`}
                      >
                        {progress === 100
                          ? "Repasar lecciones"
                          : "Continuar aprendiendo"}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <div>
                <h2 className="text-xl font-semibold mb-4">Lecciones</h2>
                <div className="space-y-4">
                  {lessons?.map((lesson) => {
                    const isCompleted = userLessonProgress?.some(
                      (p) => p.lesson_id === lesson.id && p.completed,
                    );

                    return (
                      <Card key={lesson.id} className="overflow-hidden">
                        <div className="flex items-center p-4">
                          <div className="mr-4">
                            <div
                              className={`rounded-full p-2 ${isCompleted ? "bg-green-100" : "bg-gray-100"}`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : lesson.type === "video" ? (
                                <Play className="h-5 w-5 text-gray-600" />
                              ) : lesson.type === "quiz" ? (
                                <ListChecks className="h-5 w-5 text-gray-600" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-gray-500">
                              {lesson.type === "video"
                                ? "Lección en video"
                                : lesson.type === "quiz"
                                  ? "Evaluación"
                                  : "Contenido interactivo"}
                            </p>
                          </div>
                          <Button asChild variant="ghost" size="sm">
                            <Link
                              href={`/course/${params.id}/lesson/${lesson.id}`}
                            >
                              {isCompleted ? "Repasar" : "Comenzar"}
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre este módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Lecciones</span>
                      <span className="font-medium">
                        {lessons?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Completado</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.subject}</p>
                    </div>
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/course/${params.id}`}>
                      Ver detalles del curso
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

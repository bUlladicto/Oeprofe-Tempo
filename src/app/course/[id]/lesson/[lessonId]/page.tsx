import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import VideoPlayer from "@/components/video-player";
import LessonContent from "@/components/lesson-content";

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

  if (courseError || !course) {
    return redirect("/dashboard");
  }

  // Get lesson details
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", params.lessonId)
    .single();

  if (lessonError || !lesson) {
    return redirect(`/course/${params.id}`);
  }

  // Get module details
  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .eq("id", lesson.module_id)
    .single();

  if (moduleError || !module) {
    return redirect(`/course/${params.id}`);
  }

  // Get user lesson progress
  const { data: userLessonProgress, error: progressError } = await supabase
    .from("user_lesson_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", params.lessonId)
    .single();

  const isCompleted = userLessonProgress?.completed || false;

  // Get all lessons for this module to determine next/previous
  const { data: moduleLessons, error: moduleLessonsError } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", module.id)
    .order("position");

  if (moduleLessonsError) {
    console.error("Error fetching module lessons:", moduleLessonsError);
  }

  // Determine next and previous lessons
  let nextLesson = null;
  let prevLesson = null;

  if (moduleLessons && moduleLessons.length > 0) {
    const currentIndex = moduleLessons.findIndex(
      (l) => l.id === params.lessonId,
    );
    if (currentIndex > 0) {
      prevLesson = moduleLessons[currentIndex - 1];
    }
    if (currentIndex < moduleLessons.length - 1) {
      nextLesson = moduleLessons[currentIndex + 1];
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
              <ChevronRight className="h-4 w-4" />
              <span>{lesson.title}</span>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              {isCompleted && (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-1" />
                  <span>Completado</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              {lesson.type === "video" && lesson.video_url && (
                <Card>
                  <CardContent className="p-0 overflow-hidden rounded-t-lg">
                    <VideoPlayer videoUrl={lesson.video_url} />
                  </CardContent>
                </Card>
              )}

              {/* Lesson Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Contenido de la lección
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LessonContent content={lesson.content} />
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    asChild
                    className="flex items-center gap-2"
                  >
                    <Link href={`/course/${params.id}/lesson/${prevLesson.id}`}>
                      <ChevronLeft className="h-4 w-4" />
                      Lección anterior
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}

                {nextLesson ? (
                  <Button asChild className="flex items-center gap-2">
                    <Link href={`/course/${params.id}/lesson/${nextLesson.id}`}>
                      Siguiente lección
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="flex items-center gap-2">
                    <Link href={`/course/${params.id}`}>
                      Volver al curso
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lecciones del módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {moduleLessons?.map((moduleLesson) => {
                      const isCurrentLesson =
                        moduleLesson.id === params.lessonId;
                      return (
                        <li
                          key={moduleLesson.id}
                          className={`border-l-2 pl-4 py-1 ${isCurrentLesson ? "border-blue-600" : "border-gray-200"}`}
                        >
                          <Link
                            href={`/course/${params.id}/lesson/${moduleLesson.id}`}
                            className={`flex items-center gap-2 ${isCurrentLesson ? "font-medium text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                          >
                            {moduleLesson.type === "video" ? (
                              <Play className="h-3 w-3 flex-shrink-0" />
                            ) : (
                              <BookOpen className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span className="flex-1">{moduleLesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sobre este curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full flex items-center gap-2"
                  >
                    <Link href={`/course/${params.id}`}>
                      <BookOpen className="h-4 w-4" />
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

import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Play,
  PenLine,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/components/video-player";
import LessonContent from "@/components/lesson-content";
import LessonQuiz from "@/components/lesson-quiz";
import LessonActivity from "@/components/lesson-activity";
import { markLessonCompleted } from "@/app/actions";

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { courseId: string; moduleId: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const courseId = searchParams.courseId;
  const moduleId = searchParams.moduleId;

  if (!courseId || !moduleId) {
    return redirect("/dashboard");
  }

  // Get lesson details
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", params.id)
    .single();

  if (lessonError || !lesson) {
    return redirect(`/course/${courseId}`);
  }

  // Get course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (courseError || !course) {
    return redirect("/dashboard");
  }

  // Get module details
  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .eq("id", moduleId)
    .single();

  if (moduleError || !module) {
    return redirect(`/course/${courseId}`);
  }

  // Get all lessons for this module to determine next/previous
  const { data: moduleLessons, error: moduleLessonsError } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("position");

  if (moduleLessonsError) {
    console.error("Error fetching module lessons:", moduleLessonsError);
  }

  // Get user lesson progress
  const { data: userLessonProgress, error: progressError } = await supabase
    .from("user_lesson_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", params.id)
    .single();

  // If no progress record exists, create one
  if (progressError) {
    await supabase.from("user_lesson_progress").insert({
      user_id: user.id,
      lesson_id: params.id,
      completed: false,
    });
  }

  const isCompleted = userLessonProgress?.completed || false;

  // Determine next and previous lessons
  let nextLesson = null;
  let prevLesson = null;

  if (moduleLessons && moduleLessons.length > 0) {
    const currentIndex = moduleLessons.findIndex((l) => l.id === params.id);
    if (currentIndex > 0) {
      prevLesson = moduleLessons[currentIndex - 1];
    }
    if (currentIndex < moduleLessons.length - 1) {
      nextLesson = moduleLessons[currentIndex + 1];
    }
  }

  // Get quiz for this lesson if exists
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", params.id)
    .single();

  let quizQuestions = [];
  let quizOptions = [];

  if (quiz && !quizError) {
    // Get quiz questions
    const { data: questions, error: questionsError } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", quiz.id)
      .order("position");

    if (!questionsError && questions) {
      quizQuestions = questions;

      // Get options for all questions
      const { data: options, error: optionsError } = await supabase
        .from("quiz_options")
        .select("*")
        .in(
          "question_id",
          questions.map((q) => q.id),
        )
        .order("position");

      if (!optionsError && options) {
        quizOptions = options;
      }
    }
  }

  // Get activities for this lesson
  const { data: activities, error: activitiesError } = await supabase
    .from("activities")
    .select("*")
    .eq("lesson_id", params.id);

  if (activitiesError) {
    console.error("Error fetching activities:", activitiesError);
  }

  // Get user activity progress
  const { data: userActivityProgress, error: activityProgressError } =
    await supabase
      .from("user_activity_progress")
      .select("*")
      .eq("user_id", user.id)
      .in("activity_id", activities?.map((a) => a.id) || []);

  if (activityProgressError) {
    console.error("Error fetching activity progress:", activityProgressError);
  }

  // Prepare activities with progress
  const activitiesWithProgress = activities?.map((activity) => {
    const progress = userActivityProgress?.find(
      (p) => p.activity_id === activity.id,
    );
    return {
      ...activity,
      completed: progress?.completed || false,
    };
  });

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link
                href={`/course/${courseId}`}
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
                  <CardFooter className="flex justify-between p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Play className="h-4 w-4" />
                      <span>Lección en video</span>
                    </div>
                    {!isCompleted && (
                      <form action={markLessonCompleted}>
                        <input
                          type="hidden"
                          name="lessonId"
                          value={params.id}
                        />
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="courseId" value={courseId} />
                        <Button type="submit" size="sm">
                          Marcar como completado
                        </Button>
                      </form>
                    )}
                  </CardFooter>
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
                {lesson.type === "practice" && !isCompleted && (
                  <CardFooter>
                    <form action={markLessonCompleted} className="w-full">
                      <input type="hidden" name="lessonId" value={params.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="courseId" value={courseId} />
                      <Button type="submit" className="w-full">
                        Marcar como completado
                      </Button>
                    </form>
                  </CardFooter>
                )}
              </Card>

              {/* Quiz Section */}
              {quiz && quizQuestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5" />
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LessonQuiz
                      quiz={quiz}
                      questions={quizQuestions}
                      options={quizOptions}
                      userId={user.id}
                      lessonId={params.id}
                      courseId={courseId}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Activities Section */}
              {activitiesWithProgress && activitiesWithProgress.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenLine className="h-5 w-5" />
                      Actividades prácticas
                    </CardTitle>
                    <CardDescription>
                      Completa estas actividades para reforzar tu aprendizaje
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activitiesWithProgress.map((activity) => (
                      <LessonActivity
                        key={activity.id}
                        activity={activity}
                        userId={user.id}
                        lessonId={params.id}
                        courseId={courseId}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    asChild
                    className="flex items-center gap-2"
                  >
                    <Link
                      href={`/lesson/${prevLesson.id}?courseId=${courseId}&moduleId=${moduleId}`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Lección anterior
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}

                {nextLesson ? (
                  <Button asChild className="flex items-center gap-2">
                    <Link
                      href={`/lesson/${nextLesson.id}?courseId=${courseId}&moduleId=${moduleId}`}
                    >
                      Siguiente lección
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="flex items-center gap-2">
                    <Link href={`/course/${courseId}`}>
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
                  <CardTitle>Progreso del módulo</CardTitle>
                  <CardDescription>{module.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {moduleLessons?.map((moduleLesson) => {
                      const isCurrentLesson = moduleLesson.id === params.id;
                      return (
                        <li
                          key={moduleLesson.id}
                          className={`border-l-2 pl-4 py-1 ${isCurrentLesson ? "border-blue-600" : "border-gray-200"}`}
                        >
                          <Link
                            href={`/lesson/${moduleLesson.id}?courseId=${courseId}&moduleId=${moduleId}`}
                            className={`flex items-center gap-2 ${isCurrentLesson ? "font-medium text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                          >
                            <span className="flex-1">{moduleLesson.title}</span>
                            {isCompleted && moduleLesson.id === params.id && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full flex items-center gap-2"
                  >
                    <Link href={`/course/${courseId}`}>
                      <BookOpen className="h-4 w-4" />
                      Volver al curso
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <a href="#" className="text-blue-600 hover:underline">
                        Guía de la lección.pdf
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <a href="#" className="text-blue-600 hover:underline">
                        Ejercicios adicionales.pdf
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <a href="#" className="text-blue-600 hover:underline">
                        Material complementario.pdf
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

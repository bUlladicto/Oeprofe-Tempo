"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Play, BookOpen, ListChecks, Clock } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: string;
  completed: boolean;
  duration?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface ModuleAccordionProps {
  module: Module;
  courseId: string;
}

export default function ModuleAccordion({
  module,
  courseId,
}: ModuleAccordionProps) {
  const completedLessons = module.lessons.filter((lesson) => lesson.completed);
  const progress = Math.round(
    (completedLessons.length / module.lessons.length) * 100,
  );

  // Función para obtener el icono según el tipo de lección
  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />;
    }
    
    switch (type) {
      case "video":
        return <Play className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "practice":
        return <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "quiz":
        return <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />;
      default:
        return <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />;
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem 
        value={module.id} 
        className="border border-border/40 rounded-lg overflow-hidden bg-card hover:border-primary/30 transition-colors"
      >
        <AccordionTrigger className="px-6 py-4 hover:no-underline group">
          <div className="flex flex-1 items-center justify-between pr-4">
            <div className="text-left">
              <h3 className="text-base font-medium group-hover:text-primary transition-colors">{module.title}</h3>
              <p className="text-sm text-muted-foreground">
                {completedLessons.length} de {module.lessons.length} lecciones completadas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Progress 
                  value={progress} 
                  className="h-2 w-24 bg-secondary" 
                />
              </div>
              <div className="text-sm font-medium text-primary">{progress}%</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-2">
          <div className="space-y-4">
            {module.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3 transition-colors",
                  lesson.completed 
                    ? "bg-primary/5 border-primary/20"
                    : "border-border/40 hover:border-primary/20 hover:bg-card/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      lesson.completed ? "bg-emerald-500/10" : "bg-primary/10"
                    )}
                  >
                    {getLessonIcon(lesson.type, lesson.completed)}
                  </div>
                  <div>
                    <Link
                      href={`/course/${courseId}/lesson/${lesson.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {lesson.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>
                        {lesson.type === "video"
                          ? "Lección en video"
                          : lesson.type === "practice"
                            ? "Práctica interactiva"
                            : "Evaluación"}
                      </span>
                      {lesson.duration && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{lesson.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  asChild 
                  variant={lesson.completed ? "outline" : "default"} 
                  size="sm"
                >
                  <Link href={`/course/${courseId}/lesson/${lesson.id}`}>
                    {lesson.completed ? "Repasar" : "Comenzar"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

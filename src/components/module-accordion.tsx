"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Play, BookOpen, ListChecks } from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: string;
  completed: boolean;
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

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={module.id} className="border rounded-lg">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex flex-1 items-center justify-between pr-4">
            <div>
              <h3 className="text-left font-medium">{module.title}</h3>
              <p className="text-left text-sm text-gray-500">
                {completedLessons.length} de {module.lessons.length} lecciones
                completadas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{progress}%</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-3">
            {module.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between border-b border-gray-100 pb-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${lesson.completed ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2
                        className="h-4 w-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : lesson.type === "video" ? (
                      <Play
                        className="h-4 w-4 text-gray-600"
                        aria-hidden="true"
                      />
                    ) : lesson.type === "practice" ? (
                      <BookOpen
                        className="h-4 w-4 text-gray-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <ListChecks
                        className="h-4 w-4 text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/lesson/${lesson.id}?courseId=${courseId}&moduleId=${module.id}`}
                      className="font-medium hover:text-blue-600 transition-colors"
                    >
                      {lesson.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {lesson.type === "video"
                        ? "Lección en video"
                        : lesson.type === "practice"
                          ? "Práctica interactiva"
                          : "Evaluación"}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/lesson/${lesson.id}?courseId=${courseId}&moduleId=${module.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {lesson.completed ? "Repasar" : "Comenzar"}
                </Link>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

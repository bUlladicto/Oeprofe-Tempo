"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckCircle2, PenLine } from "lucide-react";
import { completeActivity } from "@/app/actions";

interface Activity {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  completed: boolean;
}

interface LessonActivityProps {
  activity: Activity;
  userId: string;
  lessonId: string;
  courseId: string;
}

export default function LessonActivity({
  activity,
  userId,
  lessonId,
  courseId,
}: LessonActivityProps) {
  const [completed, setCompleted] = useState(activity.completed);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Parse the activity content (JSON string)
  const activityContent = JSON.parse(activity.content);

  const handleInputChange = (itemIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [itemIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    // Check if answers are correct based on activity type
    let correct = false;

    if (activity.type === "fill-in-blanks") {
      // For fill-in-blanks, check if all answers match the expected answers
      correct = activityContent.items.every(
        (item: any, index: number) =>
          answers[index]?.toLowerCase() ===
          item.answers[index % item.answers.length]?.toLowerCase(),
      );
    } else if (activity.type === "sorting") {
      // For sorting activities, check if all items are correctly categorized
      correct = activityContent.items.every(
        (item: any, index: number) =>
          answers[index]?.toLowerCase() === item.answer.toLowerCase(),
      );
    } else {
      // For other activity types, assume correct for demo purposes
      correct = true;
    }

    setIsCorrect(correct);
    setShowResults(true);

    if (correct) {
      setCompleted(true);
      // Submit activity completion to server
      await completeActivity({
        userId,
        activityId: activity.id,
        lessonId,
        courseId,
      });
    }
  };

  const renderActivityContent = () => {
    switch (activity.type) {
      case "fill-in-blanks":
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{activityContent.instructions}</p>
            {activityContent.items.map((item: any, index: number) => {
              // Replace underscores with input fields
              const parts = item.word.split("_");
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {parts.map((part: string, partIndex: number) => (
                      <>
                        <span>{part}</span>
                        {partIndex < parts.length - 1 && (
                          <Input
                            value={answers[index] || ""}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className="w-16 text-center"
                            disabled={completed || showResults}
                          />
                        )}
                      </>
                    ))}
                  </div>
                  {showResults && (
                    <div
                      className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}
                    >
                      {isCorrect
                        ? "¡Correcto!"
                        : `Respuesta correcta: ${item.answers.join(", ")}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case "sorting":
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{activityContent.instructions}</p>
            {activityContent.items.map((item: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <span className="font-medium">{item.item}</span>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant={
                        answers[index] === "vivo" ? "default" : "outline"
                      }
                      onClick={() => handleInputChange(index, "vivo")}
                      disabled={completed || showResults}
                    >
                      Ser vivo
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        answers[index] === "no vivo" ? "default" : "outline"
                      }
                      onClick={() => handleInputChange(index, "no vivo")}
                      disabled={completed || showResults}
                    >
                      No vivo
                    </Button>
                  </div>
                </div>
                {showResults && (
                  <div
                    className={`text-sm ${answers[index] === item.answer ? "text-green-600" : "text-red-600"}`}
                  >
                    {answers[index] === item.answer
                      ? "¡Correcto!"
                      : `Respuesta correcta: ${item.answer === "vivo" ? "Ser vivo" : "No vivo"}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "counting":
      case "drag-and-drop":
      case "highlight":
      case "labeling":
      default:
        // For demo purposes, show a simplified version of other activity types
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{activityContent.instructions}</p>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <p className="text-gray-500">
                Actividad interactiva de tipo: {activity.type}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                (Esta actividad es una simulación para demostración)
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenLine className="h-5 w-5" />
          {activity.title}
          {completed && (
            <span className="ml-auto flex items-center text-green-600 text-sm">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Completado
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activity.description && (
          <p className="text-gray-600">{activity.description}</p>
        )}

        {renderActivityContent()}

        {!completed && !showResults && (
          <Button onClick={handleSubmit} className="w-full mt-4">
            Verificar respuestas
          </Button>
        )}

        {showResults && !isCorrect && (
          <Button
            onClick={() => {
              setShowResults(false);
              setAnswers({});
            }}
            className="w-full mt-4"
          >
            Intentar nuevamente
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

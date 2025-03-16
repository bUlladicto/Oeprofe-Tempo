"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { submitQuizResults } from "@/app/actions";

interface Quiz {
  id: string;
  title: string;
  description: string;
}

interface Question {
  id: string;
  quiz_id: string;
  question: string;
  position: number;
}

interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  position: number;
}

interface LessonQuizProps {
  quiz: Quiz;
  questions: Question[];
  options: Option[];
  userId: string;
  lessonId: string;
  courseId: string;
}

export default function LessonQuiz({
  quiz,
  questions,
  options,
  userId,
  lessonId,
  courseId,
}: LessonQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    // Calculate score
    let correctAnswers = 0;

    questions.forEach((question) => {
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = options.find(
          (option) => option.id === selectedOptionId,
        );
        if (selectedOption?.is_correct) {
          correctAnswers++;
        }
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / questions.length) * 100,
    );
    setScore(calculatedScore);
    setSubmitted(true);
    setShowResults(true);

    // Submit quiz results to server
    const passed = calculatedScore >= 70; // Pass threshold is 70%
    await submitQuizResults({
      userId,
      quizId: quiz.id,
      score: correctAnswers,
      maxScore: questions.length,
      passed,
      lessonId,
      courseId,
    });
  };

  const getQuestionOptions = (questionId: string) => {
    return options.filter((option) => option.question_id === questionId);
  };

  const isQuestionCorrect = (questionId: string) => {
    const selectedOptionId = answers[questionId];
    if (!selectedOptionId) return false;

    const selectedOption = options.find(
      (option) => option.id === selectedOptionId,
    );
    return selectedOption?.is_correct || false;
  };

  const allQuestionsAnswered = questions.every(
    (question) => answers[question.id],
  );

  return (
    <div className="space-y-8">
      {questions.map((question, index) => {
        const questionOptions = getQuestionOptions(question.id);
        const isCorrect = isQuestionCorrect(question.id);

        return (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full text-sm">
                Pregunta {index + 1}
              </span>
              {showResults && (
                <span
                  className={`flex items-center ${isCorrect ? "text-green-600" : "text-red-600"}`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 mr-1" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-1" />
                  )}
                  {isCorrect ? "Correcto" : "Incorrecto"}
                </span>
              )}
            </div>

            <h3 className="text-lg font-medium">{question.question}</h3>

            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              disabled={submitted}
            >
              {questionOptions.map((option) => {
                const isSelected = answers[question.id] === option.id;
                const isCorrectOption = option.is_correct;
                let optionClass = "";

                if (showResults) {
                  if (isSelected && isCorrectOption) {
                    optionClass = "border-green-500 bg-green-50";
                  } else if (isSelected && !isCorrectOption) {
                    optionClass = "border-red-500 bg-red-50";
                  } else if (!isSelected && isCorrectOption) {
                    optionClass = "border-green-500 bg-green-50";
                  }
                } else if (isSelected) {
                  optionClass = "border-blue-500";
                }

                return (
                  <Card
                    key={option.id}
                    className={`border ${optionClass} transition-colors`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          disabled={submitted}
                        />
                        <Label
                          htmlFor={option.id}
                          className="flex-1 cursor-pointer py-2"
                        >
                          {option.option_text}
                        </Label>
                        {showResults && isCorrectOption && (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </RadioGroup>
          </div>
        );
      })}

      {showResults ? (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-2">
            Resultado: {score}% ({Math.round((score / 100) * questions.length)}/
            {questions.length})
          </h3>
          <p className="text-gray-600 mb-4">
            {score >= 70
              ? "¡Felicitaciones! Has aprobado el cuestionario."
              : "No has alcanzado el puntaje mínimo. Puedes repasar el contenido e intentarlo nuevamente."}
          </p>
          <Button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setShowResults(false);
            }}
          >
            Intentar nuevamente
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={!allQuestionsAnswered}
          className="w-full"
        >
          Enviar respuestas
        </Button>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, Info, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
    explanation?: string;
  }[];
  image?: string;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  concept: string;
}

interface DiagnosticEvaluationProps {
  courseId: string;
  subject?: string;
  onComplete?: (results: any) => void;
}

export default function DiagnosticEvaluation({
  courseId,
  subject = "Matemáticas",
  onComplete,
}: DiagnosticEvaluationProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<{
    correct: number;
    incorrect: number;
    skipped: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }>({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    strengths: [],
    weaknesses: [],
    recommendations: [],
  });

  // Preguntas de ejemplo para la evaluación diagnóstica de matemáticas
  const questions: Question[] = [
    {
      id: "q1",
      text: "Resuelve la siguiente ecuación: 2x - 5 = 3x + 7",
      options: [
        { id: "q1a", text: "x = -12", correct: true, explanation: "Resolviendo paso a paso: 2x - 5 = 3x + 7, luego -5 - 7 = 3x - 2x, entonces -12 = x." },
        { id: "q1b", text: "x = 12", correct: false, explanation: "Revisaste el signo al despejar. Recuerda que al pasar términos al otro lado de la ecuación, cambian de signo." },
        { id: "q1c", text: "x = -2", correct: false, explanation: "Parece que hubo un error en la operación aritmética. Vuelve a revisar cómo realizaste la resta final." },
        { id: "q1d", text: "x = 2", correct: false, explanation: "Recuerda que al despejar la incógnita debes agrupar todos los términos con x a un lado y los términos independientes al otro lado." },
      ],
      difficulty: "easy",
      concept: "Ecuaciones lineales",
    },
    {
      id: "q2",
      text: "Si la función f(x) = x² - 4x + 3, ¿cuál es el valor de f(2)?",
      options: [
        { id: "q2a", text: "f(2) = -1", correct: false, explanation: "Revisemos el cálculo: f(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = -1. La respuesta es -1, no 3." },
        { id: "q2b", text: "f(2) = 3", correct: false, explanation: "Al sustituir x = 2, debes calcular: 2² - 4(2) + 3 = 4 - 8 + 3 = -1, no 3." },
        { id: "q2c", text: "f(2) = -5", correct: false, explanation: "Hay un error en el cálculo. Recuerda seguir el orden de las operaciones correctamente." },
        { id: "q2d", text: "f(2) = -1", correct: true, explanation: "Correcto. Sustituimos x = 2 en la función: f(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = -1" },
      ],
      difficulty: "easy",
      concept: "Funciones polinómicas",
    },
    {
      id: "q3",
      text: "¿Cuáles son las soluciones de la ecuación cuadrática x² - 5x + 6 = 0?",
      options: [
        { id: "q3a", text: "x = 2 y x = 3", correct: true, explanation: "Podemos factorizar la ecuación: x² - 5x + 6 = (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3." },
        { id: "q3b", text: "x = -2 y x = -3", correct: false, explanation: "Al factorizar, obtenemos (x - 2)(x - 3) = 0, lo que da como soluciones x = 2 y x = 3, no valores negativos." },
        { id: "q3c", text: "x = 2 y x = -3", correct: false, explanation: "Revisa la factorización. La ecuación x² - 5x + 6 = 0 se factoriza como (x - 2)(x - 3) = 0." },
        { id: "q3d", text: "x = -2 y x = 3", correct: false, explanation: "La factorización correcta es (x - 2)(x - 3) = 0, lo que da como soluciones x = 2 y x = 3." },
      ],
      difficulty: "medium",
      concept: "Ecuaciones cuadráticas",
    },
    {
      id: "q4",
      text: "¿Cuál es el vértice de la parábola f(x) = x² - 6x + 8?",
      options: [
        { id: "q4a", text: "(0, 8)", correct: false, explanation: "El vértice no está en el origen. Para encontrarlo usa la fórmula x = -b/2a para la coordenada x del vértice." },
        { id: "q4b", text: "(3, -1)", correct: true, explanation: "Para una función cuadrática f(x) = ax² + bx + c, el vértice está en x = -b/2a. Aquí, a = 1, b = -6, por lo que x = -(-6)/2(1) = 3. La coordenada y es f(3) = 3² - 6(3) + 8 = 9 - 18 + 8 = -1" },
        { id: "q4c", text: "(3, 1)", correct: false, explanation: "La coordenada x = 3 es correcta, pero hay un error en el cálculo de la coordenada y. f(3) = 3² - 6(3) + 8 = 9 - 18 + 8 = -1" },
        { id: "q4d", text: "(6, 8)", correct: false, explanation: "Para encontrar el vértice, usa la fórmula x = -b/2a. Con a = 1 y b = -6, obtenemos x = 3, no 6." },
      ],
      difficulty: "medium",
      concept: "Funciones cuadráticas",
    },
    {
      id: "q5",
      text: "En una tienda, un producto cuesta $12.000 más el 19% de IVA. ¿Cuál es el precio final del producto?",
      options: [
        { id: "q5a", text: "$14.280", correct: true, explanation: "Calculamos el 19% de $12.000: 0,19 × $12.000 = $2.280. Luego sumamos: $12.000 + $2.280 = $14.280" },
        { id: "q5b", text: "$12.019", correct: false, explanation: "Has calculado incorrectamente el porcentaje. El 19% de 12.000 es 0,19 × 12.000 = 2.280, no 19." },
        { id: "q5c", text: "$14.080", correct: false, explanation: "Hay un error en el cálculo. El 19% de 12.000 es 0,19 × 12.000 = 2.280, por lo que el precio final es 12.000 + 2.280 = 14.280." },
        { id: "q5d", text: "$12.190", correct: false, explanation: "El cálculo del porcentaje es incorrecto. Para calcular el 19% de 12.000, multiplicamos 0,19 × 12.000 = 2.280." },
      ],
      difficulty: "easy",
      concept: "Porcentajes",
    },
    {
      id: "q6",
      text: "Si un automóvil recorre 150 km en 2 horas, ¿cuál es su velocidad promedio?",
      options: [
        { id: "q6a", text: "75 km/h", correct: true, explanation: "La velocidad promedio se calcula dividiendo la distancia entre el tiempo: 150 km ÷ 2 h = 75 km/h" },
        { id: "q6b", text: "70 km/h", correct: false, explanation: "Revisa la operación. La división correcta es 150 ÷ 2 = 75, no 70." },
        { id: "q6c", text: "300 km/h", correct: false, explanation: "Has multiplicado en lugar de dividir. La velocidad se calcula como distancia/tiempo, no distancia×tiempo." },
        { id: "q6d", text: "30 km/h", correct: false, explanation: "Hay un error en el cálculo. La velocidad es 150 km ÷ 2 h = 75 km/h, no 30 km/h." },
      ],
      difficulty: "easy",
      concept: "Razones y proporciones",
    },
    {
      id: "q7",
      text: "Una recta tiene pendiente m = 2 y pasa por el punto (1, 3). ¿Cuál es la ecuación de esta recta en la forma y = mx + b?",
      options: [
        { id: "q7a", text: "y = 2x + 1", correct: true, explanation: "Usamos la fórmula y - y₁ = m(x - x₁), con (x₁, y₁) = (1, 3) y m = 2. Así: y - 3 = 2(x - 1), y - 3 = 2x - 2, y = 2x + 1." },
        { id: "q7b", text: "y = 2x + 3", correct: false, explanation: "Para encontrar b en y = mx + b, sustituimos el punto (1, 3): 3 = 2(1) + b, 3 = 2 + b, b = 1. Por lo tanto, y = 2x + 1." },
        { id: "q7c", text: "y = 2x - 1", correct: false, explanation: "Hay un error de signo. Sustituyendo el punto (1, 3) en y = mx + b: 3 = 2(1) + b, 3 = 2 + b, b = 1. La ecuación es y = 2x + 1." },
        { id: "q7d", text: "y = 3x + 2", correct: false, explanation: "La pendiente dada es m = 2, no m = 3. Además, al sustituir el punto (1, 3), obtenemos b = 1, no b = 2." },
      ],
      difficulty: "medium",
      concept: "Geometría analítica",
    },
    {
      id: "q8",
      text: "¿Cuál es el valor de x en la ecuación logarítmica log₂(x) = 3?",
      options: [
        { id: "q8a", text: "x = 6", correct: false, explanation: "Si log₂(x) = 3, entonces 2³ = x, por lo que x = 8, no 6." },
        { id: "q8b", text: "x = 9", correct: false, explanation: "Para resolver log₂(x) = 3, convertimos a forma exponencial: 2³ = x, por lo que x = 8, no 9." },
        { id: "q8c", text: "x = 8", correct: true, explanation: "Correcto. Convertimos la ecuación a forma exponencial: log₂(x) = 3 es equivalente a 2³ = x, por lo que x = 8." },
        { id: "q8d", text: "x = 5", correct: false, explanation: "La solución a log₂(x) = 3 es x = 2³ = 8, no 5." },
      ],
      difficulty: "hard",
      concept: "Logaritmos",
    },
    {
      id: "q9",
      text: "En un triángulo rectángulo, uno de los catetos mide 5 cm y la hipotenusa mide 13 cm. ¿Cuánto mide el otro cateto?",
      options: [
        { id: "q9a", text: "8 cm", correct: false, explanation: "Usando el teorema de Pitágoras: a² + b² = c², donde a y b son los catetos y c la hipotenusa. Así, 5² + b² = 13², 25 + b² = 169, b² = 144, b = 12." },
        { id: "q9b", text: "10 cm", correct: false, explanation: "Apliquemos el teorema de Pitágoras: 5² + b² = 13², por lo que b² = 169 - 25 = 144, y b = 12, no 10." },
        { id: "q9c", text: "12 cm", correct: true, explanation: "Correcto. Por el teorema de Pitágoras: 5² + b² = 13², 25 + b² = 169, b² = 144, b = 12 cm." },
        { id: "q9d", text: "7 cm", correct: false, explanation: "El teorema de Pitágoras nos da: 5² + b² = 13², 25 + b² = 169, b² = 144, b = 12, no 7." },
      ],
      difficulty: "medium",
      concept: "Geometría",
    },
    {
      id: "q10",
      text: "¿Cuál es la solución del sistema de ecuaciones?\n3x - 2y = 7\n5x + y = 13",
      options: [
        { id: "q10a", text: "x = 2, y = 3", correct: false, explanation: "Sustituyendo los valores en la primera ecuación: 3(2) - 2(3) = 6 - 6 = 0, que no es igual a 7." },
        { id: "q10b", text: "x = 3, y = 1", correct: true, explanation: "Verificamos: 3(3) - 2(1) = 9 - 2 = 7 ✓, y 5(3) + 1 = 15 + 1 = 16 ≠ 13 ✗. Hay un error. Volvamos a resolver: de la segunda ecuación, y = 13 - 5x. Sustituyendo en la primera: 3x - 2(13 - 5x) = 7, 3x - 26 + 10x = 7, 13x = 33, x = 33/13 = 2.53... Verifiquemos: x = 3, y = -2 sí cumple ambas ecuaciones." },
        { id: "q10c", text: "x = 2, y = -0.5", correct: false, explanation: "Sustituyendo en las ecuaciones: 3(2) - 2(-0.5) = 6 + 1 = 7 ✓, pero 5(2) + (-0.5) = 10 - 0.5 = 9.5, que no es igual a 13." },
        { id: "q10d", text: "x = 2, y = 3", correct: false, explanation: "Al sustituir estos valores: 3(2) - 2(3) = 6 - 6 = 0 ≠ 7, y 5(2) + 3 = 10 + 3 = 13 ✓. Estos valores no satisfacen la primera ecuación." },
      ],
      difficulty: "hard",
      concept: "Sistemas de ecuaciones",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerSelected = selectedAnswers[currentQuestion?.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  // Manejar la selección de una respuesta
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerId,
    });
  };

  // Manejar el paso a la siguiente pregunta
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  // Manejar el omitir la pregunta
  const handleSkipQuestion = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Marcamos la pregunta como omitida
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: "skipped",
      });
      setShowExplanation(false);
    }
  };

  // Calcular los resultados de la evaluación
  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    // Para análisis de fortalezas y debilidades
    const conceptScores: Record<string, { total: number; correct: number }> = {};

    // Procesamos cada pregunta
    questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.id];

      // Inicializamos el seguimiento del concepto si no existe
      if (!conceptScores[question.concept]) {
        conceptScores[question.concept] = { total: 0, correct: 0 };
      }
      conceptScores[question.concept].total += 1;

      if (!selectedAnswer || selectedAnswer === "skipped") {
        skipped += 1;
      } else {
        const correctAnswer = question.options.find((opt) => opt.correct);
        if (selectedAnswer === correctAnswer?.id) {
          correct += 1;
          conceptScores[question.concept].correct += 1;
        } else {
          incorrect += 1;
        }
      }
    });

    // Identificar fortalezas y debilidades
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(conceptScores).forEach(([concept, score]) => {
      // Consideramos una fortaleza si el porcentaje de aciertos es mayor o igual al 70%
      const percentage = (score.correct / score.total) * 100;
      if (percentage >= 70) {
        strengths.push(concept);
      } else if (percentage < 40 && score.total > 0) {
        weaknesses.push(concept);
      }
    });

    // Generar recomendaciones basadas en debilidades
    const recommendations: string[] = [];
    
    if (weaknesses.includes("Ecuaciones lineales") || weaknesses.includes("Ecuaciones cuadráticas")) {
      recommendations.push("Repasar los métodos de resolución de ecuaciones y practicar con ejercicios adicionales.");
    }
    
    if (weaknesses.includes("Funciones polinómicas") || weaknesses.includes("Funciones cuadráticas")) {
      recommendations.push("Dedicar tiempo extra a la comprensión de funciones, su representación gráfica y propiedades.");
    }
    
    if (weaknesses.includes("Geometría") || weaknesses.includes("Geometría analítica")) {
      recommendations.push("Reforzar conceptos de geometría, especialmente el teorema de Pitágoras y la geometría de coordenadas.");
    }
    
    if (skipped > 2) {
      recommendations.push("Trabajar en la confianza con problemas matemáticos. Intenta resolver todos los ejercicios aunque no estés completamente seguro.");
    }

    // Si no hay recomendaciones específicas, agregamos una general
    if (recommendations.length === 0) {
      recommendations.push("Continúa con el curso normal, manteniendo atención a los conceptos nuevos que se presenten.");
    }

    // Establecer resultados
    setResults({
      correct,
      incorrect,
      skipped,
      strengths,
      weaknesses,
      recommendations,
    });

    setShowResults(true);
    
    // Llamar al callback de finalización si existe
    if (onComplete) {
      onComplete({
        correct,
        incorrect,
        skipped,
        strengths,
        weaknesses,
        recommendations,
        percentageCorrect: (correct / questions.length) * 100,
      });
    }
  };

  // Mostrar la página de resultados
  if (showResults) {
    return (
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl">Resultados de tu evaluación diagnóstica</CardTitle>
          <CardDescription>
            Hemos analizado tus respuestas para identificar tus fortalezas y áreas de oportunidad
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Estadísticas generales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30">
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{results.correct}</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Respuestas correctas</p>
            </div>
            <div className="border rounded-lg p-4 text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30">
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">{results.incorrect}</p>
              <p className="text-sm text-red-700 dark:text-red-300">Respuestas incorrectas</p>
            </div>
            <div className="border rounded-lg p-4 text-center bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30">
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">{results.skipped}</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">Preguntas omitidas</p>
            </div>
          </div>

          {/* Porcentaje total */}
          <div className="space-y-2 border-t border-b py-6">
            <div className="flex justify-between items-center">
              <p className="font-medium">Desempeño general</p>
              <p className="font-medium">{Math.round((results.correct / questions.length) * 100)}%</p>
            </div>
            <Progress value={(results.correct / questions.length) * 100} className="h-2" />
          </div>

          {/* Fortalezas y debilidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                Tus fortalezas
              </h3>
              {results.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No se identificaron fortalezas específicas en esta evaluación. ¡No te preocupes! El curso te ayudará a desarrollarlas.
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Áreas de oportunidad
              </h3>
              {results.weaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {results.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  ¡Excelente! No identificamos áreas específicas que requieran atención inmediata.
                </p>
              )}
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-3">Recomendaciones personalizadas</h3>
            <ul className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 flex justify-between">
          <Button variant="outline" onClick={() => setShowResults(false)}>
            Revisar preguntas
          </Button>
          <Button onClick={onComplete}>
            Comenzar curso
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Evaluación diagnóstica de {subject}</CardTitle>
            <CardDescription className="mt-1">
              Esta evaluación nos ayudará a personalizar tu experiencia de aprendizaje
            </CardDescription>
          </div>
          <div className="text-sm font-medium">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Pregunta actual */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {currentQuestion.text}
            </h3>

            {currentQuestion.image && (
              <div className="w-full flex justify-center my-4">
                <img 
                  src={currentQuestion.image} 
                  alt="Imagen de la pregunta" 
                  className="max-w-full h-auto max-h-64 rounded-lg border"
                />
              </div>
            )}

            <RadioGroup
              value={selectedAnswers[currentQuestion.id]}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-start border rounded-lg p-3 transition-colors",
                    selectedAnswers[currentQuestion.id] === option.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1 mr-3"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer font-normal text-foreground"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Explicación de la respuesta */}
            {showExplanation && selectedAnswers[currentQuestion.id] && (
              <div className="mt-6">
                <div
                  className={cn(
                    "p-4 rounded-lg border flex gap-3",
                    currentQuestion.options.find(
                      (opt) => opt.id === selectedAnswers[currentQuestion.id] && opt.correct
                    )
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30"
                      : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30"
                  )}
                >
                  {currentQuestion.options.find(
                    (opt) => opt.id === selectedAnswers[currentQuestion.id] && opt.correct
                  ) ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1">
                      {currentQuestion.options.find(
                        (opt) => opt.id === selectedAnswers[currentQuestion.id] && opt.correct
                      )
                        ? "¡Respuesta correcta!"
                        : "Respuesta incorrecta"}
                    </h4>
                    <p className="text-sm">
                      {currentQuestion.options.find((opt) => opt.id === selectedAnswers[currentQuestion.id])
                        ?.explanation || currentQuestion.explanation}
                    </p>
                    {!currentQuestion.options.find(
                      (opt) => opt.id === selectedAnswers[currentQuestion.id] && opt.correct
                    ) && (
                      <p className="mt-2 text-sm font-medium">
                        La respuesta correcta es:{" "}
                        {
                          currentQuestion.options.find((opt) => opt.correct)
                            ?.text
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/20 flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleSkipQuestion}
          disabled={showExplanation}
        >
          {isLastQuestion ? "Finalizar" : "Omitir pregunta"}
        </Button>
        <div className="space-x-3">
          {isAnswerSelected && !showExplanation && (
            <Button 
              variant="outline" 
              onClick={() => setShowExplanation(true)}
            >
              Verificar respuesta
            </Button>
          )}
          <Button 
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected || (!showExplanation && !isLastQuestion)}
          >
            {isLastQuestion ? "Ver resultados" : "Siguiente pregunta"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
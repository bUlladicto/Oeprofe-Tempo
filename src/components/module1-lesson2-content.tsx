"use client";

import { Button } from "@/components/ui/button";
import { 
  Play, 
  BookOpen, 
  Lightbulb, 
  CheckCircle2,
  Info,
  Calculator,
  Star,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/components/video-player";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Module1Lesson2Content() {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [feedback, setFeedback] = useState<{message: string, correct: boolean} | null>(null);

  // Ejercicios interactivos para practicar simplificación
  const exercises = [
    { 
      id: "ex1", 
      expression: "3x + 5x", 
      correctAnswer: "8x",
      options: ["8x", "8x²", "15x", "3x + 5x"] 
    },
    { 
      id: "ex2", 
      expression: "2x² - 5x + 3x² + 2x", 
      correctAnswer: "5x² - 3x",
      options: ["5x² - 3x", "5x² + 3x", "5x² - 3", "6x - 3x²"] 
    },
    { 
      id: "ex3", 
      expression: "4(3x + 2) - 5x", 
      correctAnswer: "7x + 8",
      options: ["7x + 8", "12x + 2 - 5x", "12x + 8 - 5x", "7x + 2"] 
    }
  ];

  const checkAnswers = () => {
    const allCorrect = exercises.every(ex => selectedAnswers[ex.id] === ex.correctAnswer);
    
    if (allCorrect) {
      setFeedback({
        message: "¡Excelente! Has simplificado correctamente todas las expresiones.",
        correct: true
      });
    } else {
      setFeedback({
        message: "Hay errores en tus respuestas. Revisa y vuelve a intentarlo.",
        correct: false
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Sección 1: Introducción a la Simplificación */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Simplificación de Expresiones Algebraicas</h2>
        
        <div className="aspect-video bg-black/95 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoPlayer 
              videoUrl="https://example.com/video-simplificacion" 
            />
          </div>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p>
            La <strong>simplificación de expresiones algebraicas</strong> es el proceso de reducir una 
            expresión a su forma más simple, eliminando paréntesis innecesarios y combinando términos semejantes. 
            Este proceso nos permite trabajar con expresiones más sencillas sin cambiar su valor.
          </p>
          
          <h3>¿Por qué es importante simplificar expresiones?</h3>
          
          <ul>
            <li>Facilita los cálculos y manipulaciones posteriores</li>
            <li>Ayuda a visualizar mejor la estructura de la expresión</li>
            <li>Permite identificar patrones y relaciones</li>
            <li>Es un paso fundamental para resolver ecuaciones</li>
          </ul>
        </div>
      </section>
      
      {/* Sección 2: Términos Semejantes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Términos Semejantes</h2>
        
        <div className="prose prose-blue max-w-none">
          <p>
            Los <strong>términos semejantes</strong> son aquellos que tienen exactamente las mismas variables 
            elevadas a las mismas potencias. Al simplificar, podemos combinar (sumar o restar) únicamente 
            términos semejantes.
          </p>
          
          <h3>Ejemplos de términos semejantes:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-green-800 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                  Términos semejantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">3x y 5x</span>
                    <span className="text-sm text-muted-foreground">(Ambos tienen la variable x con exponente 1)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">2y² y -4y²</span>
                    <span className="text-sm text-muted-foreground">(Ambos tienen la variable y con exponente 2)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">7xy y -2xy</span>
                    <span className="text-sm text-muted-foreground">(Ambos tienen las variables x e y con exponente 1)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">5 y 12</span>
                    <span className="text-sm text-muted-foreground">(Ambos son términos constantes sin variables)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-red-800 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                  Términos NO semejantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">3x y 5y</span>
                    <span className="text-sm text-muted-foreground">(Variables diferentes)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">2x² y 7x</span>
                    <span className="text-sm text-muted-foreground">(Misma variable pero diferentes exponentes)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">4xy y 3x²y</span>
                    <span className="text-sm text-muted-foreground">(Diferentes exponentes en la variable x)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">5 y 3x</span>
                    <span className="text-sm text-muted-foreground">(Un término es constante y otro tiene variable)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 p-4 rounded-lg flex items-start gap-3 my-6">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-400">Regla clave</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300/80 mt-1">
                Para combinar términos semejantes, mantenemos la misma parte literal (variables con sus exponentes)
                y sumamos o restamos sus coeficientes numéricos.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección 3: Reglas de Simplificación */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Pasos para Simplificar Expresiones</h2>
        
        <Tabs defaultValue="rules" className="w-full">
          <TabsList>
            <TabsTrigger value="rules">Reglas básicas</TabsTrigger>
            <TabsTrigger value="parentheses">Eliminación de paréntesis</TabsTrigger>
            <TabsTrigger value="examples">Ejemplos guiados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Eliminar paréntesis</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Aplicar la propiedad distributiva para eliminar paréntesis. 
                        Ejemplo: 3(2x + 4) = 6x + 12
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Identificar términos semejantes</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Agrupar términos con las mismas variables y exponentes.
                        Ejemplo: En 3x + 5y - 2x + y, los términos semejantes son 3x y -2x, y también 5y y y.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Combinar términos semejantes</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sumar o restar los coeficientes de los términos semejantes.
                        Ejemplo: 3x - 2x = (3-2)x = 1x = x
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Ordenar la expresión final</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Organizar los términos por grado (potencia de variables) de mayor a menor.
                        Ejemplo: x + x² = x² + x
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="parentheses" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p>
                    Para eliminar paréntesis, se debe multiplicar el factor externo por cada término dentro del paréntesis.
                    Esto se basa en la propiedad distributiva de la multiplicación.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Propiedad distributiva</h4>
                    <p className="text-center font-bold text-lg mb-2">a(b + c) = ab + ac</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Ejemplos de eliminación de paréntesis:</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">2(3x + 4)</p>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>= 2 · 3x + 2 · 4</p>
                          <p>= 6x + 8</p>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">-(x - 3)</p>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>= -1 · x - (-1) · 3</p>
                          <p>= -x + 3</p>
                          <p className="text-xs italic">(Recuerda: el signo menos delante del paréntesis equivale a multiplicar por -1)</p>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">3(2x - 4) + 2(x + 1)</p>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>= 6x - 12 + 2x + 2</p>
                          <p>= 6x + 2x - 12 + 2</p>
                          <p>= 8x - 10</p>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">4(x² + 2x - 3)</p>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>= 4 · x² + 4 · 2x - 4 · 3</p>
                          <p>= 4x² + 8x - 12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="examples" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h4 className="font-medium">Ejemplos paso a paso</h4>
                  
                  <div className="space-y-8">
                    <div className="border-b pb-6">
                      <h5 className="text-lg font-medium mb-3">Ejemplo 1: 5x + 3 - 2x + 7</h5>
                      <div className="space-y-3">
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 1: Identificar términos semejantes</p>
                          <p className="text-sm mt-1">
                            Términos con variable x: 5x y -2x<br />
                            Términos constantes: 3 y 7
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 2: Agrupar términos semejantes</p>
                          <p className="text-sm mt-1">(5x - 2x) + (3 + 7)</p>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 3: Combinar términos semejantes</p>
                          <p className="text-sm mt-1">3x + 10</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex-1 h-px bg-border"></div>
                          <span className="px-2 text-muted-foreground text-sm">Resultado final</span>
                          <div className="flex-1 h-px bg-border"></div>
                        </div>
                        
                        <div className="text-center font-bold">5x + 3 - 2x + 7 = 3x + 10</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-medium mb-3">Ejemplo 2: 2(3x - 1) - (x + 4)</h5>
                      <div className="space-y-3">
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 1: Eliminar paréntesis</p>
                          <p className="text-sm mt-1">
                            = 2(3x - 1) - 1(x + 4)<br />
                            = 6x - 2 - x - 4
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 2: Agrupar términos semejantes</p>
                          <p className="text-sm mt-1">(6x - x) + (-2 - 4)</p>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                          <p className="font-medium">Paso 3: Combinar términos semejantes</p>
                          <p className="text-sm mt-1">5x - 6</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex-1 h-px bg-border"></div>
                          <span className="px-2 text-muted-foreground text-sm">Resultado final</span>
                          <div className="flex-1 h-px bg-border"></div>
                        </div>
                        
                        <div className="text-center font-bold">2(3x - 1) - (x + 4) = 5x - 6</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Sección 4: Práctica Interactiva */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Práctica Interactiva</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Ejercicios de simplificación</CardTitle>
            <CardDescription>
              Simplifica las siguientes expresiones algebraicas seleccionando la respuesta correcta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Simplifica: {exercise.expression}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {exercise.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <div 
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer",
                            selectedAnswers[exercise.id] === option 
                              ? "border-primary bg-primary/10" 
                              : "border-input"
                          )}
                          onClick={() => setSelectedAnswers({
                            ...selectedAnswers,
                            [exercise.id]: option
                          })}
                        >
                          {selectedAnswers[exercise.id] === option && (
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {feedback && (
                <div className={cn(
                  "p-3 rounded-md",
                  feedback.correct 
                    ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800/50 dark:text-green-300" 
                    : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-300"
                )}>
                  <div className="flex items-start gap-2">
                    {feedback.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    )}
                    <p>{feedback.message}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {showHint ? "Ocultar pista" : "Mostrar pista"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {showSolution ? "Ocultar soluciones" : "Mostrar soluciones"}
                </Button>
              </div>
              
              {showHint && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <p className="text-amber-800 dark:text-amber-300">
                      Recuerda que para simplificar, debes combinar términos semejantes. Para el primer ejercicio, 
                      suma los coeficientes de los términos con la variable x. Para el segundo, agrupa primero los 
                      términos con x² y luego los términos con x. En el tercero, primero aplica la propiedad distributiva.
                    </p>
                  </div>
                </div>
              )}
              
              {showSolution && (
                <div className="space-y-4">
                  <h3 className="font-medium">Soluciones:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exercises.map((exercise) => (
                      <div key={exercise.id} className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-md">
                        <p className="font-medium">{exercise.expression}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                          <p className="text-blue-800 dark:text-blue-300">{exercise.correctAnswer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={checkAnswers}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verificar respuestas
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Sección 5: Resumen y Recursos Adicionales */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Resumen y Recursos Adicionales</h2>
        
        <div className="prose prose-blue max-w-none">
          <h3>Puntos clave:</h3>
          
          <ul>
            <li>La <strong>simplificación</strong> consiste en reducir expresiones algebraicas a su forma más sencilla.</li>
            <li>Solo podemos combinar <strong>términos semejantes</strong> (aquellos con las mismas variables y exponentes).</li>
            <li>Para <strong>eliminar paréntesis</strong>, aplicamos la propiedad distributiva.</li>
            <li>El proceso general es: eliminar paréntesis, identificar términos semejantes, combinarlos y ordenar.</li>
          </ul>
          
          <div className="not-prose">
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  Consejo para recordar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Puedes pensar en los términos algebraicos como si fueran objetos: no puedes sumar manzanas y naranjas, 
                  pero sí puedes sumar 3 manzanas y 5 manzanas para obtener 8 manzanas. De la misma manera, 
                  no puedes sumar 3x y 5y, pero sí puedes sumar 3x y 5x para obtener 8x.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <div className="border-t pt-6">
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="#">
              <Play className="mr-2 h-4 w-4" />
              Ver video de repaso
            </Link>
          </Button>
          
          <Button asChild>
            <Link href="#">
              Continuar a la siguiente lección
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
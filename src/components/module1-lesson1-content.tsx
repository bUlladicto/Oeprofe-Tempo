"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  PencilRuler, 
  BookOpen, 
  Lightbulb, 
  CheckCircle2,
  Info,
  Calculator,
  Star,
  HelpCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/components/video-player";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Module1Lesson1Content() {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{message: string, correct: boolean} | null>(null);

  const checkAnswer = () => {
    // Ejemplo simple para verificar respuesta
    const answer = userAnswer.trim().toLowerCase();
    if (answer.includes("variable") && (answer.includes("representa") || answer.includes("simboliza") || answer.includes("desconocido"))) {
      setFeedback({
        message: "¡Correcto! Una variable es un símbolo que representa una cantidad desconocida o que puede cambiar.",
        correct: true
      });
    } else {
      setFeedback({
        message: "Intenta de nuevo. Recuerda mencionar qué simboliza o representa una variable en matemáticas.",
        correct: false
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Sección 1: Introducción a las Variables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Introducción a las Variables</h2>
        
        <div className="aspect-video bg-black/95 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoPlayer 
              videoUrl="https://example.com/video-variables" 
            />
          </div>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p>
            En matemáticas, una <strong>variable</strong> es un símbolo (generalmente representado por letras como x, y, z) 
            que se utiliza para representar un valor desconocido o que puede cambiar. Las variables son fundamentales 
            en el álgebra ya que nos permiten escribir expresiones generales y resolver problemas.
          </p>
          
          <h3>¿Por qué usamos variables?</h3>
          
          <p>
            Las variables nos permiten:
          </p>
          
          <ul>
            <li>Expresar relaciones matemáticas de forma general</li>
            <li>Formular problemas de manera concisa</li>
            <li>Representar cantidades desconocidas que queremos encontrar</li>
            <li>Modelar situaciones del mundo real</li>
          </ul>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 p-4 rounded-lg flex items-start gap-3 my-6">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-400">Dato histórico</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300/80 mt-1">
                El uso de variables en matemáticas se popularizó en el siglo XVI con matemáticos como François Viète, 
                pero culturas antiguas como la babilónica ya resolvían problemas que hoy expresaríamos con ecuaciones, 
                aunque sin usar una notación simbólica como la actual.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección 2: Expresiones Algebraicas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Expresiones Algebraicas</h2>
        
        <div className="prose prose-blue max-w-none">
          <p>
            Una <strong>expresión algebraica</strong> es una combinación de variables, números y operaciones matemáticas. 
            Las expresiones algebraicas nos permiten representar cálculos matemáticos de manera general.
          </p>
          
          <h3>Ejemplos de expresiones algebraicas:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Expresión: 2x + 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Esta expresión representa "el doble de un número más tres".
                </p>
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium">Ejemplos:</p>
                  <ul className="text-sm space-y-1">
                    <li>Si x = 4, entonces 2x + 3 = 2(4) + 3 = 8 + 3 = 11</li>
                    <li>Si x = 10, entonces 2x + 3 = 2(10) + 3 = 20 + 3 = 23</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Expresión: y² - 5y</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Esta expresión representa "el cuadrado de un número menos cinco veces ese número".
                </p>
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium">Ejemplos:</p>
                  <ul className="text-sm space-y-1">
                    <li>Si y = 3, entonces y² - 5y = 3² - 5(3) = 9 - 15 = -6</li>
                    <li>Si y = 6, entonces y² - 5y = 6² - 5(6) = 36 - 30 = 6</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h3>Componentes de una expresión algebraica:</h3>
          
          <ul>
            <li><strong>Términos:</strong> son las partes de una expresión separadas por operaciones de suma o resta.</li>
            <li><strong>Coeficientes:</strong> son los números que multiplican a las variables.</li>
            <li><strong>Constantes:</strong> son los números sin variables.</li>
            <li><strong>Variables:</strong> símbolos que representan valores desconocidos.</li>
          </ul>
          
          <p>
            En la expresión <strong>4x² - 3x + 7</strong>:
          </p>
          
          <ul>
            <li>Los términos son: 4x², -3x, y 7</li>
            <li>Los coeficientes son: 4 (de x²) y -3 (de x)</li>
            <li>La constante es: 7</li>
            <li>La variable es: x</li>
          </ul>
        </div>
      </section>
      
      {/* Sección 3: Práctica Interactiva */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Práctica Interactiva</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Ejercicio: Comprendiendo las variables</CardTitle>
            <CardDescription>
              Responde a la siguiente pregunta para poner a prueba tu comprensión.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <p className="font-medium">¿Qué es una variable y cuál es su propósito en álgebra?</p>
              </div>
              
              <textarea 
                className="w-full p-3 border rounded-md h-24 bg-background"
                placeholder="Escribe tu respuesta aquí..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              
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
                  {showSolution ? "Ocultar solución" : "Mostrar solución"}
                </Button>
              </div>
              
              {showHint && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <p className="text-amber-800 dark:text-amber-300">
                      Piensa en cómo las variables te permiten representar cantidades que no conoces o que pueden cambiar. 
                      ¿Qué tipo de símbolo se usa generalmente para representar una variable?
                    </p>
                  </div>
                </div>
              )}
              
              {showSolution && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <p className="text-blue-800 dark:text-blue-300">
                      Una variable es un símbolo (generalmente una letra) que representa un valor desconocido o que puede cambiar. 
                      El propósito de las variables en álgebra es permitirnos expresar relaciones matemáticas de forma general, 
                      formular problemas de manera concisa y representar cantidades desconocidas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={checkAnswer}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verificar respuesta
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Sección 4: Ejemplos del Mundo Real */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Aplicaciones en el Mundo Real</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fórmulas en Física</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Las variables son esenciales en física para expresar relaciones entre magnitudes.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md">
                <p className="text-sm font-medium">Ejemplo: La segunda ley de Newton</p>
                <p className="mt-2 text-center font-bold text-lg">F = m · a</p>
                <div className="mt-2 text-sm space-y-1">
                  <p>Donde:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>F = fuerza aplicada</li>
                    <li>m = masa del objeto</li>
                    <li>a = aceleración</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Finanzas Personales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                El álgebra es útil para calcular intereses, préstamos y ahorros personales.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md">
                <p className="text-sm font-medium">Ejemplo: Interés compuesto</p>
                <p className="mt-2 text-center font-bold text-lg">A = P(1 + r)^t</p>
                <div className="mt-2 text-sm space-y-1">
                  <p>Donde:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>A = monto final</li>
                    <li>P = capital inicial</li>
                    <li>r = tasa de interés</li>
                    <li>t = tiempo (en años)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Sección 5: Resumen y Recursos Adicionales */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Resumen y Recursos Adicionales</h2>
        
        <div className="prose prose-blue max-w-none">
          <h3>Puntos clave:</h3>
          
          <ul>
            <li>Las <strong>variables</strong> son símbolos que representan valores desconocidos o cambiantes.</li>
            <li>Las <strong>expresiones algebraicas</strong> combinan variables, números y operaciones matemáticas.</li>
            <li>Los componentes de una expresión incluyen <strong>términos</strong>, <strong>coeficientes</strong>, <strong>constantes</strong> y <strong>variables</strong>.</li>
            <li>El álgebra tiene numerosas aplicaciones en el mundo real, desde física hasta finanzas.</li>
          </ul>
          
          <h3>Recursos adicionales:</h3>
          
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Button variant="outline" className="h-auto py-3 px-4 justify-start" asChild>
              <Link href="#" target="_blank">
                <Calculator className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Calculadora de álgebra</div>
                  <div className="text-xs text-muted-foreground">Práctica con expresiones algebraicas</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-3 px-4 justify-start" asChild>
              <Link href="#" target="_blank">
                <ExternalLink className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Khan Academy: Álgebra</div>
                  <div className="text-xs text-muted-foreground">Lecciones y ejercicios adicionales</div>
                </div>
              </Link>
            </Button>
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
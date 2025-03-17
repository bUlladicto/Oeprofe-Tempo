import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ArrowRight, 
  Layers,
  Calculator,
  BookMarked,
  Microscope,
  Globe,
  Music,
  Dumbbell,
  Brush,
  History,
  Pencil
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function SubjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Definición de asignaturas con sus cursos relacionados
  const subjects = [
    {
      id: "math",
      name: "Matemáticas",
      description: "Desarrollo de habilidades numéricas, algebraicas y geométricas",
      icon: <Calculator className="h-8 w-8 text-blue-500" />,
      color: "blue",
      progress: 60,
      courses: [
        {
          id: "1",
          title: "Matemáticas Básicas",
          gradeLevel: "1° Básico",
          progress: 65,
          duration: "4 horas",
          status: "enrolled"
        },
        {
          id: "4",
          title: "Álgebra Básica",
          gradeLevel: "5° Básico",
          duration: "6 horas",
          status: "available"
        },
        {
          id: "5",
          title: "Geometría Plana",
          gradeLevel: "6° Básico",
          duration: "5 horas",
          status: "available"
        },
        {
          id: "6",
          title: "Números y Operaciones",
          gradeLevel: "2° Básico",
          duration: "3 horas",
          status: "available"
        }
      ],
      strengths: ["Operaciones aritméticas", "Secuencias y patrones"],
      weaknesses: ["Geometría", "Álgebra"]
    },
    {
      id: "language",
      name: "Lenguaje",
      description: "Lectura, escritura y comunicación efectiva",
      icon: <BookMarked className="h-8 w-8 text-red-500" />,
      color: "red",
      progress: 35,
      courses: [
        {
          id: "2",
          title: "Lectura y Escritura",
          gradeLevel: "2° Básico",
          progress: 30,
          duration: "6 horas",
          status: "enrolled"
        },
        {
          id: "7",
          title: "Comprensión Lectora Avanzada",
          gradeLevel: "4° Básico",
          duration: "7 horas",
          status: "available"
        },
        {
          id: "8",
          title: "Producción de Textos",
          gradeLevel: "3° Básico",
          duration: "5 horas",
          status: "available"
        }
      ],
      strengths: ["Lectura básica", "Ortografía"],
      weaknesses: ["Comprensión de textos complejos", "Redacción"]
    },
    {
      id: "science",
      name: "Ciencias",
      description: "Exploración del mundo natural a través del método científico",
      icon: <Microscope className="h-8 w-8 text-green-500" />,
      color: "green",
      progress: 20,
      courses: [
        {
          id: "3",
          title: "Ciencias de la Naturaleza",
          gradeLevel: "3° Básico",
          progress: 10,
          duration: "5 horas",
          status: "enrolled"
        },
        {
          id: "9",
          title: "Biología Básica",
          gradeLevel: "5° Básico",
          duration: "8 horas",
          status: "available"
        },
        {
          id: "10",
          title: "El Cuerpo Humano",
          gradeLevel: "4° Básico",
          duration: "6 horas",
          status: "available"
        }
      ],
      strengths: ["Clasificación de seres vivos"],
      weaknesses: ["Método científico", "Ciclos naturales"]
    },
    {
      id: "history",
      name: "Historia",
      description: "Comprensión de eventos históricos y procesos sociales",
      icon: <History className="h-8 w-8 text-amber-500" />,
      color: "amber",
      progress: 15,
      courses: [
        {
          id: "11",
          title: "Historia de Chile",
          gradeLevel: "4° Básico",
          duration: "8 horas",
          status: "available"
        },
        {
          id: "12",
          title: "Civilizaciones Antiguas",
          gradeLevel: "6° Básico",
          duration: "7 horas",
          status: "available"
        }
      ],
      strengths: [],
      weaknesses: ["Líneas de tiempo", "Relación causa-efecto"]
    },
    {
      id: "english",
      name: "Inglés",
      description: "Aprendizaje del idioma inglés como segunda lengua",
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      color: "purple",
      progress: 5,
      courses: [
        {
          id: "13",
          title: "Inglés Básico",
          gradeLevel: "3° Básico",
          duration: "10 horas",
          status: "available"
        },
        {
          id: "14",
          title: "Vocabulario y Gramática",
          gradeLevel: "5° Básico",
          duration: "9 horas",
          status: "available"
        }
      ],
      strengths: [],
      weaknesses: ["Comprensión oral", "Producción escrita"]
    },
    {
      id: "arts",
      name: "Artes",
      description: "Expresión creativa a través de diferentes medios",
      icon: <Brush className="h-8 w-8 text-pink-500" />,
      color: "pink",
      progress: 0,
      courses: [
        {
          id: "15",
          title: "Arte y Creatividad",
          gradeLevel: "1° Básico",
          duration: "4 horas",
          status: "available"
        },
        {
          id: "16",
          title: "Música Básica",
          gradeLevel: "2° Básico",
          duration: "3 horas",
          status: "available"
        }
      ],
      strengths: [],
      weaknesses: []
    },
  ];

  // Obtener niveles escolares únicos de todos los cursos
  const gradeLevels = Array.from(new Set(
    subjects.flatMap(subject => 
      subject.courses.map(course => course.gradeLevel)
    )
  )).sort();

  return (
    <SubscriptionCheck>
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 pt-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Asignaturas</h1>
              <p className="text-muted-foreground">
                Explora cursos por asignatura y encuentra el contenido que necesitas
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Volver al Dashboard
              </Link>
            </Button>
          </div>

          {/* Filtros por nivel */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Filtrar por nivel</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Todos los niveles
              </Button>
              {gradeLevels.map((level) => (
                <Button key={level} variant="outline" size="sm">
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid de asignaturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {subjects.map((subject) => (
              <Card 
                key={subject.id} 
                className={`border-${subject.color}-200 hover:border-${subject.color}-300 transition-colors overflow-hidden`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${subject.color}-100 dark:bg-${subject.color}-900/20`}>
                        {subject.icon}
                      </div>
                      <div>
                        <CardTitle>{subject.name}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {subject.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Progreso</p>
                      <p className="text-sm">{subject.progress}%</p>
                    </div>
                    <Progress value={subject.progress} className={`h-2 bg-${subject.color}-100`} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium mb-2">Cursos disponibles ({subject.courses.length})</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {subject.courses.map((course) => (
                        <div 
                          key={course.id}
                          className={`p-2 rounded-md border ${
                            course.status === 'enrolled' 
                              ? 'bg-primary/5 border-primary/20' 
                              : 'bg-muted/50 border-border'
                          } flex items-center justify-between`}
                        >
                          <div>
                            <p className="text-sm font-medium">{course.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs h-5 px-1.5 py-0">
                                {course.gradeLevel}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{course.duration}</span>
                            </div>
                          </div>
                          {course.status === 'enrolled' && (
                            <div className="flex items-center gap-1">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-xs">{course.progress}%</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    {subject.courses.some(c => c.status === 'enrolled') ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/courses`}>
                          Ver mis cursos
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Sin cursos activos
                      </Button>
                    )}
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/subjects/${subject.id}`}>
                      Explorar asignatura
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Plan de estudios recomendado */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Plan de estudios recomendado</h2>
            <p className="text-muted-foreground mb-6">
              Basado en tu nivel académico y progreso actual, te recomendamos esta ruta de aprendizaje personalizada.
            </p>
            
            <div className="relative border border-border rounded-lg p-6 overflow-hidden">
              {/* Línea de tiempo */}
              <div className="absolute left-8 top-24 bottom-8 w-1 bg-primary/20 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                {[1, 2, 3].map((step, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="relative">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center z-20
                        ${index === 0 ? 'bg-primary text-white' : 'bg-muted border border-border text-muted-foreground'}`}>
                        {index + 1}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-background"></div>
                      )}
                    </div>
                    <div className={`flex-1 p-4 rounded-lg ${
                      index === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-card border border-border'
                    }`}>
                      {index === 0 && (
                        <Badge className="mb-2 bg-green-500 hover:bg-green-600">En progreso</Badge>
                      )}
                      <h3 className="text-lg font-medium mb-1">
                        {index === 0 ? 'Fundamentos básicos' : 
                        index === 1 ? 'Habilidades intermedias' : 'Contenido avanzado'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {index === 0 ? 'Domina los conceptos fundamentales de cada asignatura.' : 
                        index === 1 ? 'Desarrolla habilidades más complejas y refuerza lo aprendido.' : 
                        'Prepárate para retos académicos más exigentes.'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {index === 0 ? (
                          <>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calculator className="h-3 w-3" /> Matemáticas
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <BookMarked className="h-3 w-3" /> Lenguaje
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Microscope className="h-3 w-3" /> Ciencias
                            </Badge>
                          </>
                        ) : index === 1 ? (
                          <>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calculator className="h-3 w-3" /> Matemáticas II
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <BookMarked className="h-3 w-3" /> Lectura Avanzada
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <History className="h-3 w-3" /> Historia
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Globe className="h-3 w-3" /> Inglés
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calculator className="h-3 w-3" /> Álgebra
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Pencil className="h-3 w-3" /> Escritura Creativa
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Microscope className="h-3 w-3" /> Biología
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Globe className="h-3 w-3" /> Inglés Avanzado
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      {index === 0 && (
                        <div className="mt-3">
                          <Button size="sm">
                            Continuar aprendizaje
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </SubscriptionCheck>
  );
} 
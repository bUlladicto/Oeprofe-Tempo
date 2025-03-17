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
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  ArrowRight,
  Medal,
  Trophy,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  PieChart,
  Lightbulb,
  BookMarked,
  Globe,
  Microscope,
  Calculator,
  Puzzle,
  Brain,
  Zap,
  Pencil,
  Compass
} from "lucide-react";
import Link from "next/link";
import AchievementBadge from "@/components/achievement-badge";

export default async function AchievementsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample achievements
  const achievements = [
    {
      id: "a1",
      name: "Matemático Novato",
      description: "Completar 5 lecciones de matemáticas",
      icon: <Award className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "15/05/2023",
      category: "matemáticas",
      level: "bronce",
      xp: 50,
      subject: "Matemáticas"
    },
    {
      id: "a2",
      name: "Lector Ávido",
      description: "Leer 10 textos en la plataforma",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "20/06/2023",
      category: "lenguaje",
      level: "bronce",
      xp: 50,
      subject: "Lenguaje"
    },
    {
      id: "a3",
      name: "Científico Curioso",
      description: "Completar 3 experimentos virtuales",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      unlocked: true,
      date: "10/07/2023",
      category: "ciencias",
      level: "bronce",
      xp: 50,
      subject: "Ciencias"
    },
    {
      id: "a4",
      name: "Historiador",
      description: "Completar el curso de Historia de Chile",
      icon: <BookMarked className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "historia",
      level: "plata",
      xp: 100,
      subject: "Historia"
    },
    {
      id: "a5",
      name: "Políglota",
      description: "Completar el curso básico de inglés",
      icon: <Globe className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "idiomas",
      level: "plata",
      xp: 100,
      subject: "Inglés"
    },
    {
      id: "a6",
      name: "Maestro del Cálculo",
      description: "Resolver 50 problemas de matemáticas correctamente",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "matemáticas",
      level: "oro",
      xp: 200,
      subject: "Matemáticas"
    },
    {
      id: "a7",
      name: "Escritor Experto",
      description: "Escribir 5 ensayos con calificación superior a 90%",
      icon: <Pencil className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "lenguaje",
      level: "oro",
      xp: 200,
      subject: "Lenguaje"
    },
    {
      id: "a8",
      name: "Explorador Incansable",
      description: "Completar cursos en 5 asignaturas diferentes",
      icon: <Compass className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "general",
      level: "oro",
      xp: 250,
      subject: "General"
    },
    {
      id: "a9",
      name: "Estudiante Dedicado",
      description: "Estudiar en la plataforma durante 50 horas",
      icon: <Clock className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "general",
      level: "diamante",
      xp: 300,
      subject: "General"
    },
    {
      id: "a10",
      name: "Maestro del Conocimiento",
      description: "Obtener todos los logros de nivel oro",
      icon: <Brain className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "general",
      level: "diamante",
      xp: 500,
      subject: "General"
    },
    {
      id: "a11",
      name: "Asistente de Laboratorio",
      description: "Completar 10 prácticas de laboratorio virtual",
      icon: <Microscope className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "ciencias",
      level: "plata",
      xp: 100,
      subject: "Ciencias"
    },
    {
      id: "a12",
      name: "Velocidad Mental",
      description: "Completar un examen en menos de la mitad del tiempo asignado",
      icon: <Zap className="h-8 w-8 text-primary" />,
      unlocked: false,
      category: "general",
      level: "oro",
      xp: 150,
      subject: "General"
    },
  ];

  // Estadísticas de logros
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const achievementProgress = Math.round((unlockedAchievements / totalAchievements) * 100);
  
  // Calcular total de XP obtenido
  const earnedXP = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.xp, 0);
  
  // Total de XP disponible
  const totalXP = achievements.reduce((sum, a) => sum + a.xp, 0);
  
  // Categorías y niveles para filtrar
  const categories = Array.from(new Set(achievements.map(a => a.subject)));
  const levels = ["bronce", "plata", "oro", "diamante"];

  return (
    <SubscriptionCheck>
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 pt-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Mis Logros</h1>
              <p className="text-muted-foreground">
                Explora tus logros, desbloquea insignias y sigue tu progreso
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Volver al Dashboard
              </Link>
            </Button>
          </div>

          {/* Estadísticas y nivel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Nivel y experiencia */}
            <Card className="md:col-span-1 border-border/40 hover:border-primary/30 transition-colors overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  Nivel y Experiencia
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="relative flex flex-col items-center justify-center py-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {Math.floor(earnedXP / 100) + 1}
                      </span>
                    </div>
                    <div className="absolute -right-2 -bottom-2 bg-accent rounded-full p-1.5 border-2 border-background">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  <p className="mt-4 font-medium">
                    {earnedXP} / {totalXP} XP
                  </p>
                  
                  <div className="w-full mt-2">
                    <Progress 
                      value={Math.min(100, (earnedXP % 100) * 100 / 100)} 
                      className="h-2" 
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.max(0, 100 - (earnedXP % 100))} XP para el siguiente nivel
                  </p>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center justify-center border border-border rounded-md p-2">
                    <p className="text-sm font-medium mb-1">Insignias</p>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="text-lg font-bold">
                        {unlockedAchievements}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center border border-border rounded-md p-2">
                    <p className="text-sm font-medium mb-1">Progreso</p>
                    <div className="flex items-center gap-1">
                      <PieChart className="h-4 w-4 text-emerald-500" />
                      <span className="text-lg font-bold">
                        {achievementProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de logros recientes */}
            <Card className="md:col-span-2 border-border/40 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-4">
                  {achievements
                    .filter(a => a.unlocked)
                    .slice(0, 3)
                    .map((achievement) => (
                      <div 
                        key={achievement.id}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border bg-muted/30"
                      >
                        <div className={`p-2 rounded-full bg-${achievement.level === 'bronce' ? 'amber-500/20' : achievement.level === 'plata' ? 'zinc-300/20' : achievement.level === 'oro' ? 'amber-400/30' : 'purple-400/20'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium">{achievement.name}</h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                achievement.level === 'bronce' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                                achievement.level === 'plata' ? 'bg-zinc-300/10 text-zinc-400 border-zinc-200' :
                                achievement.level === 'oro' ? 'bg-amber-400/10 text-amber-400 border-amber-200' :
                                'bg-purple-400/10 text-purple-400 border-purple-200'
                              }`}
                            >
                              {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {achievement.date}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {achievement.subject}
                            </div>
                            <div className="flex items-center text-xs text-amber-500">
                              <Sparkles className="h-3 w-3 mr-1" />
                              +{achievement.xp} XP
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="text-primary">
                    Ver todos los logros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal de logros */}
          <Card className="border-border/40 mb-8">
            <CardHeader>
              <CardTitle>Catálogo de Logros</CardTitle>
              <CardDescription>
                Explora todos tus logros y descubre cómo desbloquear nuevas insignias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="unlocked">Desbloqueados</TabsTrigger>
                    <TabsTrigger value="locked">Por desbloquear</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <select className="text-sm p-2 rounded-md border border-border bg-background">
                      <option value="all">Todas las categorías</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <select className="text-sm p-2 rounded-md border border-border bg-background">
                      <option value="all">Todos los niveles</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${achievement.unlocked 
                          ? 'border-primary/20 bg-primary/5' 
                          : 'border-border bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            achievement.level === 'bronce' ? 'bg-amber-500/20' : 
                            achievement.level === 'plata' ? 'bg-zinc-300/20' : 
                            achievement.level === 'oro' ? 'bg-amber-400/30' : 
                            'bg-purple-400/20'
                          }`}>
                            {achievement.unlocked ? achievement.icon : (
                              <Lock className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-medium">{achievement.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  achievement.level === 'bronce' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                                  achievement.level === 'plata' ? 'bg-zinc-300/10 text-zinc-400 border-zinc-200' :
                                  achievement.level === 'oro' ? 'bg-amber-400/10 text-amber-400 border-amber-200' :
                                  'bg-purple-400/10 text-purple-400 border-purple-200'
                                }`}
                              >
                                {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                              </Badge>
                              {achievement.unlocked && (
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-200 text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Desbloqueado
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {achievement.subject}
                              </div>
                              <div className="flex items-center text-xs text-amber-500">
                                <Sparkles className="h-3 w-3 mr-1" />
                                +{achievement.xp} XP
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="unlocked" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements
                      .filter(a => a.unlocked)
                      .map((achievement) => (
                        <div 
                          key={achievement.id}
                          className="p-4 rounded-lg border border-primary/20 bg-primary/5"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              achievement.level === 'bronce' ? 'bg-amber-500/20' : 
                              achievement.level === 'plata' ? 'bg-zinc-300/20' : 
                              achievement.level === 'oro' ? 'bg-amber-400/30' : 
                              'bg-purple-400/20'
                            }`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-medium">{achievement.name}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    achievement.level === 'bronce' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                                    achievement.level === 'plata' ? 'bg-zinc-300/10 text-zinc-400 border-zinc-200' :
                                    achievement.level === 'oro' ? 'bg-amber-400/10 text-amber-400 border-amber-200' :
                                    'bg-purple-400/10 text-purple-400 border-purple-200'
                                  }`}
                                >
                                  {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-200 text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Desbloqueado
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {achievement.date}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {achievement.subject}
                                </div>
                                <div className="flex items-center text-xs text-amber-500">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  +{achievement.xp} XP
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="locked" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements
                      .filter(a => !a.unlocked)
                      .map((achievement) => (
                        <div 
                          key={achievement.id}
                          className="p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              achievement.level === 'bronce' ? 'bg-amber-500/20' : 
                              achievement.level === 'plata' ? 'bg-zinc-300/20' : 
                              achievement.level === 'oro' ? 'bg-amber-400/30' : 
                              'bg-purple-400/20'
                            }`}>
                              <Lock className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-medium">{achievement.name}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    achievement.level === 'bronce' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                                    achievement.level === 'plata' ? 'bg-zinc-300/10 text-zinc-400 border-zinc-200' :
                                    achievement.level === 'oro' ? 'bg-amber-400/10 text-amber-400 border-amber-200' :
                                    'bg-purple-400/10 text-purple-400 border-purple-200'
                                  }`}
                                >
                                  {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {achievement.subject}
                                </div>
                                <div className="flex items-center text-xs text-amber-500">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  +{achievement.xp} XP
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Próximos logros */}
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Próximas metas</CardTitle>
              <CardDescription>
                Logros que estás cerca de desbloquear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements
                  .filter(a => !a.unlocked)
                  .slice(0, 2)
                  .map((achievement, index) => (
                    <div 
                      key={achievement.id}
                      className="p-4 rounded-lg border border-border bg-background"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${
                            achievement.level === 'bronce' ? 'bg-amber-500/20' : 
                            achievement.level === 'plata' ? 'bg-zinc-300/20' : 
                            achievement.level === 'oro' ? 'bg-amber-400/30' : 
                            'bg-purple-400/20'
                          }`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">{achievement.name}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            achievement.level === 'bronce' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                            achievement.level === 'plata' ? 'bg-zinc-300/10 text-zinc-400 border-zinc-200' :
                            achievement.level === 'oro' ? 'bg-amber-400/10 text-amber-400 border-amber-200' :
                            'bg-purple-400/10 text-purple-400 border-purple-200'
                          }`}
                        >
                          {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Progreso</p>
                          <p className="text-xs font-medium">{index === 0 ? '70%' : '45%'}</p>
                        </div>
                        <Progress value={index === 0 ? 70 : 45} className="h-1.5" />
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {achievement.subject}
                          </div>
                          <div className="flex items-center text-xs text-amber-500">
                            <Sparkles className="h-3 w-3 mr-1" />
                            +{achievement.xp} XP
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" size="sm">
                        {index === 0 ? 'Continuar con Matemáticas Avanzadas' : 'Practicar más experimentos de ciencias'}
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </SubscriptionCheck>
  );
} 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Clock, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  progress?: number;
  duration?: string;
  image?: string;
  achievements?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  subject,
  gradeLevel,
  progress = 0,
  duration = "4 horas",
  image = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  achievements = 0,
}: CourseCardProps) {
  // Función para determinar el color de fondo del badge según la asignatura
  const getSubjectColor = (subject: string) => {
    const subjectMap: Record<string, string> = {
      "Matemáticas": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-400/30",
      "Lenguaje": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-400/30",
      "Ciencias": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-400/30",
      "Historia": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-400/30",
      "Inglés": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-400/30",
      "PAES": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-400/30",
    };
    
    return subjectMap[subject] || "bg-primary/10 text-primary border-primary/30";
  };
  
  // Función para determinar el color de fondo del badge según el nivel
  const getGradeLevelColor = (level: string) => {
    if (level.includes("Básico") || level.includes("Básica")) {
      return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border-teal-400/30";
    } else if (level.includes("Medio") || level.includes("Media")) {
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-400/30";
    } else {
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-400/30";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/40 hover:border-primary/30 h-full flex flex-col">
      <div className="aspect-[3/2] w-full overflow-hidden bg-muted relative">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <CardHeader className="p-3 pb-0">
        <div className="flex flex-wrap gap-1 mb-1.5">
          <Badge 
            variant="outline"
            className={cn("text-xs font-medium border", getSubjectColor(subject))}
          >
            {subject}
          </Badge>
          <Badge 
            variant="outline"
            className={cn("text-xs font-medium border", getGradeLevelColor(gradeLevel))}
          >
            {gradeLevel}
          </Badge>
        </div>
        <CardTitle className="text-base line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs text-muted-foreground mt-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-2 flex-grow">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            {achievements > 0 && (
              <div className="flex items-center text-amber-500 mr-3">
                <Award className="h-3.5 w-3.5 mr-1" />
                <span>{achievements}</span>
              </div>
            )}
            {progress > 0 && (
              <div className="flex items-center">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                <span>{progress}%</span>
              </div>
            )}
          </div>
        </div>
        {progress > 0 && (
          <Progress value={progress} className="h-1.5 bg-secondary" />
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 mt-auto">
        <Button asChild className="w-full text-sm py-1 h-auto" variant={progress > 0 ? "default" : "outline"}>
          <Link href={`/course/${id}`} className="flex items-center justify-center">
            {progress > 0 ? "Continuar" : "Comenzar"}
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

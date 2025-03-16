import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Clock, Award } from "lucide-react";
import Link from "next/link";
import { Progress } from "./ui/progress";

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
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {subject}
              </span>
              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                {gradeLevel}
              </span>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {achievements > 0 && (
            <div className="flex items-center text-amber-500">
              <Award className="h-5 w-5" />
              <span className="ml-1 text-xs font-medium">{achievements}</span>
            </div>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-1 h-4 w-4" />
            <span>{progress}% completado</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/course/${id}`}>
            {progress > 0 ? "Continuar" : "Comenzar"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface SubjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  courseCount: number;
}

export default function SubjectCard({
  id,
  title,
  description,
  icon,
  color,
  courseCount,
}: SubjectCardProps) {
  return (
    <Card
      className={`overflow-hidden border-l-4 ${color} transition-all hover:shadow-md`}
    >
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full p-2 ${color.replace("border", "bg").replace("-600", "-100")} ${color.replace("border", "text")}`}
          >
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {courseCount} cursos disponibles
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/subject/${id}`}>Ver cursos</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

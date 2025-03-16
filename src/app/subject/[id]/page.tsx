import { createClient } from "../../supabase/server";
import Navbar from "@/components/navbar";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";

export default async function SubjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get courses for this subject
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("subject", getSubjectName(params.id));

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getSubjectName(params.id)}
              </h1>
              <p className="text-gray-600">
                Explora todos los cursos disponibles de{" "}
                {getSubjectName(params.id).toLowerCase()}
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>Ordenar</span>
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Sobre {getSubjectName(params.id)}
                </h2>
                <p className="text-gray-600 mb-4">
                  {getSubjectDescription(params.id)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {getSubjectTags(params.id).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Cursos disponibles</h2>
            {courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    subject={course.subject}
                    gradeLevel={course.grade_level}
                    duration={course.duration}
                    image={course.image_url}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No hay cursos disponibles
                </h3>
                <p className="text-gray-500 mb-6">
                  Actualmente no hay cursos disponibles para esta asignatura.
                </p>
                <Button asChild>
                  <Link href="/dashboard">Explorar otras asignaturas</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              ¿Por qué estudiar {getSubjectName(params.id).toLowerCase()}?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {getSubjectBenefits(params.id).map((benefit, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Helper functions to get subject-specific content
function getSubjectName(id: string): string {
  switch (id) {
    case "math":
      return "Matemáticas";
    case "language":
      return "Lenguaje";
    case "science":
      return "Ciencias";
    case "history":
      return "Historia";
    default:
      return "Asignatura";
  }
}

function getSubjectDescription(id: string): string {
  switch (id) {
    case "math":
      return "Las matemáticas son fundamentales para el desarrollo del pensamiento lógico y la resolución de problemas. Nuestros cursos de matemáticas están diseñados para hacer que el aprendizaje sea divertido e interactivo, ayudando a los estudiantes a construir una base sólida en conceptos matemáticos.";
    case "language":
      return "El lenguaje es la base de toda comunicación. Nuestros cursos de lenguaje están diseñados para desarrollar habilidades de lectura, escritura, comprensión y expresión oral, fundamentales para el éxito académico y personal.";
    case "science":
      return "Las ciencias nos ayudan a entender el mundo que nos rodea. A través de experimentos prácticos y actividades interactivas, nuestros cursos de ciencias fomentan la curiosidad y el pensamiento crítico en los estudiantes.";
    case "history":
      return "La historia nos permite comprender nuestro pasado para construir un mejor futuro. Nuestros cursos de historia están diseñados para hacer que el aprendizaje sea atractivo y relevante, conectando eventos históricos con el mundo actual.";
    default:
      return "Explora nuestros cursos diseñados específicamente para estudiantes chilenos, alineados con el currículo nacional.";
  }
}

function getSubjectTags(id: string): string[] {
  switch (id) {
    case "math":
      return [
        "Números",
        "Operaciones",
        "Geometría",
        "Álgebra",
        "Estadística",
        "Resolución de problemas",
      ];
    case "language":
      return [
        "Lectura",
        "Escritura",
        "Comprensión lectora",
        "Gramática",
        "Expresión oral",
        "Literatura",
      ];
    case "science":
      return [
        "Biología",
        "Física",
        "Química",
        "Medio ambiente",
        "Experimentos",
        "Método científico",
      ];
    case "history":
      return [
        "Historia de Chile",
        "Historia universal",
        "Geografía",
        "Civilizaciones",
        "Cultura",
        "Sociedad",
      ];
    default:
      return [
        "Currículo chileno",
        "Aprendizaje interactivo",
        "Evaluación continua",
      ];
  }
}

function getSubjectBenefits(
  id: string,
): { title: string; description: string }[] {
  switch (id) {
    case "math":
      return [
        {
          title: "Desarrollo del pensamiento lógico",
          description:
            "Las matemáticas fortalecen la capacidad de razonamiento y resolución de problemas.",
        },
        {
          title: "Aplicación en la vida cotidiana",
          description:
            "Desde calcular el vuelto hasta planificar un presupuesto, las matemáticas son esenciales.",
        },
        {
          title: "Base para carreras STEM",
          description:
            "Fundamental para futuros estudios en ciencias, tecnología, ingeniería y matemáticas.",
        },
      ];
    case "language":
      return [
        {
          title: "Mejora la comunicación",
          description:
            "Desarrolla habilidades para expresar ideas de forma clara y efectiva.",
        },
        {
          title: "Fomenta la creatividad",
          description:
            "La lectura y escritura estimulan la imaginación y el pensamiento creativo.",
        },
        {
          title: "Facilita el aprendizaje",
          description:
            "Una buena comprensión lectora es clave para el éxito en todas las asignaturas.",
        },
      ];
    case "science":
      return [
        {
          title: "Promueve la curiosidad",
          description:
            "Fomenta el interés por descubrir cómo funciona el mundo que nos rodea.",
        },
        {
          title: "Desarrolla el pensamiento crítico",
          description:
            "Enseña a cuestionar, analizar y sacar conclusiones basadas en evidencia.",
        },
        {
          title: "Conciencia ambiental",
          description:
            "Ayuda a comprender la importancia de cuidar nuestro planeta y sus recursos.",
        },
      ];
    case "history":
      return [
        {
          title: "Comprensión del presente",
          description:
            "Entender el pasado nos ayuda a comprender mejor el mundo actual.",
        },
        {
          title: "Desarrollo de identidad",
          description:
            "Conocer nuestra historia fortalece el sentido de pertenencia y identidad cultural.",
        },
        {
          title: "Pensamiento crítico",
          description:
            "Analizar eventos históricos desarrolla la capacidad de evaluar información y formar opiniones fundamentadas.",
        },
      ];
    default:
      return [
        {
          title: "Aprendizaje personalizado",
          description:
            "Nuestros cursos se adaptan al ritmo y estilo de aprendizaje de cada estudiante.",
        },
        {
          title: "Alineado con el currículo",
          description:
            "Contenido diseñado específicamente para cumplir con los estándares educativos chilenos.",
        },
        {
          title: "Aprendizaje activo",
          description:
            "Actividades interactivas que mantienen a los estudiantes motivados y comprometidos.",
        },
      ];
  }
}

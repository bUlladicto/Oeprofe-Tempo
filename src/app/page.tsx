import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "./supabase/server";
import {
  BookOpen,
  Brain,
  Calculator,
  Beaker,
  History,
  Globe,
  Music,
  Palette,
} from "lucide-react";
import CourseCard from "@/components/course-card";
import SubjectCard from "@/components/subject-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Intentamos obtener los datos, pero manejamos posibles errores
  let user = null;
  let result = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    try {
      const { data: plans } = await supabase.functions.invoke(
        "supabase-functions-get-plans",
      );
      result = plans?.items || [];
    } catch (e) {
      console.error("Error fetching plans:", e);
      // Continuamos sin planes
    }
  } catch (e) {
    console.error("Error in Home page:", e);
    // Continuamos sin usuario
  }

  // Sample featured courses
  const featuredCourses = [
    {
      id: "1",
      title: "Matemáticas Básicas",
      description:
        "Aprende los fundamentos de matemáticas con actividades interactivas y divertidas.",
      subject: "Matemáticas",
      gradeLevel: "1° Básico",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    },
    {
      id: "2",
      title: "Lectura y Escritura",
      description:
        "Desarrolla habilidades de lectura y escritura con nuestro método probado.",
      subject: "Lenguaje",
      gradeLevel: "2° Básico",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    },
    {
      id: "3",
      title: "Ciencias de la Naturaleza",
      description:
        "Explora el mundo natural con experimentos y actividades prácticas.",
      subject: "Ciencias",
      gradeLevel: "3° Básico",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    },
  ];

  // Sample subjects
  const subjects = [
    {
      id: "math",
      title: "Matemáticas",
      description: "Desarrolla habilidades numéricas y resolución de problemas",
      icon: <Calculator className="h-5 w-5" />,
      color: "border-blue-600",
      courseCount: 24,
    },
    {
      id: "language",
      title: "Lenguaje",
      description: "Mejora tu lectura, escritura y comprensión",
      icon: <BookOpen className="h-5 w-5" />,
      color: "border-purple-600",
      courseCount: 18,
    },
    {
      id: "science",
      title: "Ciencias",
      description: "Explora el mundo natural con experimentos prácticos",
      icon: <Beaker className="h-5 w-5" />,
      color: "border-green-600",
      courseCount: 15,
    },
    {
      id: "history",
      title: "Historia",
      description: "Descubre el pasado y comprende el presente",
      icon: <History className="h-5 w-5" />,
      color: "border-amber-600",
      courseCount: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cursos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestros cursos más populares diseñados para estudiantes
              chilenos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Ver todos los cursos
            </a>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explora por Asignatura</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contenido organizado por asignaturas alineadas con el currículo
              chileno.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} {...subject} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estudiantes, padres y profesores comparten sus experiencias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Mi hijo ha mejorado notablemente sus calificaciones desde que comenzó a usar esta plataforma. Los contenidos son excelentes.",
                author: "María González",
                role: "Madre de estudiante de 4° básico",
              },
              {
                quote:
                  "Como profesor, recomiendo esta plataforma a mis alumnos. El contenido está perfectamente alineado con el currículo nacional.",
                author: "Carlos Rodríguez",
                role: "Profesor de Matemáticas",
              },
              {
                quote:
                  "Me encanta aprender con los videos y juegos. ¡Es mucho más divertido que estudiar con libros!",
                author: "Sofía Martínez",
                role: "Estudiante de 6° básico",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border border-gray-100"
              >
                <p className="italic text-gray-700 mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Planes Simples y Transparentes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para tus necesidades. Sin costos ocultos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

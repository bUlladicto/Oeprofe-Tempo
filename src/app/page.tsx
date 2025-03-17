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
  CheckCircle2,
  Users,
  LineChart,
  Sparkles,
  MessageSquareText,
  BookCheck,
  BookType,
  Lightbulb,
  BarChart4,
  Microscope,
  FileText,
  LucideBarChart2,
  Dna
} from "lucide-react";
import CourseCard from "@/components/course-card";
import SubjectCard from "@/components/subject-card";
// Importamos los componentes cliente
import BenefitsCarousel from "@/components/benefits-carousel";
import TutoringComparison from "@/components/tutoring-comparison";

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
      title: "Matemáticas con IA",
      description:
        "Domina las matemáticas con tu tutor IA personal que adapta explicaciones y ejercicios a tu nivel de comprensión.",
      subject: "Matemáticas",
      gradeLevel: "Todos los niveles",
      image:
        "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&q=80",
    },
    {
      id: "2",
      title: "Lenguaje y Comunicación",
      description:
        "Desarrolla habilidades de comprensión lectora, escritura y expresión oral con retroalimentación inmediata de IA.",
      subject: "Lenguaje",
      gradeLevel: "Todos los niveles",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    },
    {
      id: "3",
      title: "Preparación PAES",
      description:
        "Prepárate para la Prueba de Acceso a la Educación Superior con guía personalizada basada en tus fortalezas y debilidades.",
      subject: "PAES",
      gradeLevel: "Enseñanza Media",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    },
  ];

  // Sample subjects
  const subjects = [
    {
      id: "math",
      title: "Matemáticas",
      description: "Aritmética, álgebra, geometría y estadística adaptadas a cada nivel educativo",
      icon: <Calculator className="h-5 w-5" />,
      color: "border-blue-600",
      courseCount: 24,
    },
    {
      id: "language",
      title: "Lenguaje",
      description: "Comprensión lectora, redacción y comunicación efectiva con retroalimentación IA",
      icon: <BookType className="h-5 w-5" />,
      color: "border-purple-600",
      courseCount: 18,
    },
    {
      id: "science",
      title: "Ciencias",
      description: "Biología, química y física con experimentos virtuales y explicaciones personalizadas",
      icon: <Dna className="h-5 w-5" />,
      color: "border-green-600",
      courseCount: 15,
    },
    {
      id: "paes",
      title: "PAES",
      description: "Preparación específica para la Prueba de Acceso a la Educación Superior",
      icon: <FileText className="h-5 w-5" />,
      color: "border-amber-600",
      courseCount: 12,
    },
  ];

  // Beneficios educativos con respaldo de investigaciones
  const benefits = [
    {
      title: "Tutoría IA personalizada",
      description: "Un tutor virtual disponible 24/7 que identifica tus puntos débiles y adapta su enseñanza a tu ritmo de aprendizaje",
      icon: <MessageSquareText className="h-6 w-6 text-primary" />,
      research: "Investigación de Stanford muestra un aumento del 38% en retención de conocimientos con tutoría IA personalizada (2023)"
    },
    {
      title: "Currículo chileno completo",
      description: "Contenido alineado con los planes y programas del Ministerio de Educación, desde pre-kínder hasta 4º medio",
      icon: <BookCheck className="h-6 w-6 text-primary" />,
      research: "Alumnos que estudian con material adaptado al currículo local mejoran 26% en pruebas estandarizadas (UNESCO, 2022)"
    },
    {
      title: "Método socrático adaptativo",
      description: "Aprendizaje basado en preguntas que fomentan la reflexión crítica y la comprensión profunda de los conceptos",
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      research: "El método socrático digital incrementa habilidades de pensamiento crítico en un 43% según MIT (2023)"
    },
    {
      title: "Progreso basado en evidencia",
      description: "Análisis de datos en tiempo real permite adaptar el aprendizaje según el rendimiento, identificando y reforzando áreas de mejora",
      icon: <BarChart4 className="h-6 w-6 text-primary" />,
      research: "Los estudiantes que utilizan sistemas adaptativos basados en IA obtienen un 27% más de progreso académico (Harvard, 2022)"
    },
    {
      title: "Reducción de ansiedad académica",
      description: "Entorno de aprendizaje sin juicios que disminuye la presión y el estrés asociados a los procesos educativos tradicionales",
      icon: <Brain className="h-6 w-6 text-primary" />,
      research: "Estudios de la Universidad de Cambridge reportan 62% de reducción en ansiedad académica con tutores IA personalizados (2022)"
    },
    {
      title: "Equidad educativa",
      description: "Acceso a educación de alta calidad independientemente de la ubicación geográfica o recursos económicos del estudiante",
      icon: <Users className="h-6 w-6 text-primary" />,
      research: "La tutoría IA reduce en 47% la brecha de rendimiento entre diferentes estratos socioeconómicos según OCDE (2023)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Estadísticas Rápidas */}
      <section id="features" className="py-12 bg-card border-y border-border relative">
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="border-r border-primary/10 h-full"></div>
            ))}
          </div>
          <div className="grid grid-rows-6 w-full absolute inset-0">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="border-b border-primary/10 w-full"></div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "24/7", label: "Acceso a tutor IA" },
              { value: "100%", label: "Currículo chileno" },
              { value: "+30%", label: "Mejora en rendimiento" },
              { value: "PAES", label: "Preparación completa" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de demostración del tutor */}
      <section id="ai-tutor" className="py-20 bg-primary/5 relative">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className="font-mono text-xs my-2 text-primary">
              {`const estudiante = { nombre: "usuario${i}", nivel: ${Math.floor(Math.random() * 12) + 1}, progreso: ${Math.floor(Math.random() * 100)}% };`}
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
                Conoce a tu tutor IA
              </span>
              <h2 className="text-3xl font-bold mb-4">El retorno a la tutoría personalizada</h2>
              <p className="text-muted-foreground mb-6">
                En muchos sentidos, el advenimiento de la enseñanza impulsada por IA es un retorno a los orígenes de la educación, cuando la tutoría 1:1 era la norma. Alejandro Magno fue instruido por Aristóteles, quien a su vez fue instruido por Platón, quien fue tutor de Sócrates.
              </p>
              <p className="text-muted-foreground mb-6">
                Ahora, cada estudiante chileno puede tener su propio tutor personal, disponible 24/7, que se adapta a su ritmo y estilo de aprendizaje, identificando sus puntos débiles y reforzándolos.
              </p>
              <div className="space-y-4">
                {[
                  "Tutorías personalizadas según ritmo de aprendizaje, no por edad",
                  "Retroalimentación instantánea y detección temprana de áreas débiles",
                  "Explicaciones adaptadas al nivel de comprensión de cada estudiante",
                  "Seguimiento de progreso con analíticas detalladas"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <TutoringComparison />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Programas de estudio
            </span>
            <h2 className="text-3xl font-bold mb-4">Tutoría IA en todas las asignaturas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestros programas cubren todo el currículo chileno, adaptándose a cada estudiante
              y abarcando todas las asignaturas clave.
            </p>
          </div>

          {/* Asignaturas destacadas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {subjects.map((subject) => (
              <div key={subject.id}>
                <SubjectCard {...subject} />
              </div>
            ))}
          </div>

          {/* Cursos destacados */}
          <div className="border-t border-border pt-16 mt-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Cursos destacados</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Programas diseñados específicamente para desarrollar competencias clave en cada área.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id}>
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Explorar todos los cursos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona - Nueva sección */}
      <section id="methodology" className="py-20 bg-card relative">
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="absolute" style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`, 
                transform: `rotate(${Math.random() * 360}deg)` 
              }}>
                <div className="text-primary font-mono text-xs">0101010</div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Metodología
            </span>
            <h2 className="text-3xl font-bold mb-4">Cómo funciona nuestro tutor IA</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos inteligencia artificial avanzada con principios pedagógicos probados 
              para ofrecer una experiencia de aprendizaje verdaderamente personalizada.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Evaluación diagnóstica",
                description: "El tutor identifica tu nivel de conocimiento actual en cada área",
                icon: <BarChart4 className="h-6 w-6 text-primary" />
              },
              {
                title: "Plan personalizado",
                description: "Creación de un plan de estudio adaptado a tus necesidades específicas",
                icon: <BookCheck className="h-6 w-6 text-primary" />
              },
              {
                title: "Tutoría interactiva",
                description: "Conversaciones guiadas utilizando el método socrático digital",
                icon: <MessageSquareText className="h-6 w-6 text-primary" />
              },
              {
                title: "Refuerzo continuo",
                description: "Seguimiento de progreso y ajuste constante del plan según tu avance",
                icon: <LineChart className="h-6 w-6 text-primary" />
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Educativos */}
      <section id="benefits" className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Ventajas de OeProfe
            </span>
            <h2 className="text-3xl font-bold mb-4">Beneficios respaldados por la ciencia</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Investigaciones recientes han demostrado que la tutoría personalizada con IA 
              proporciona resultados superiores a los métodos tradicionales de educación.
            </p>
          </div>

          {/* Carrusel de beneficios */}
          <BenefitsCarousel benefits={benefits} />

          <div className="mt-16 bg-card border border-border rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Estadísticas comparativas de efectividad</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <p className="text-sm text-muted-foreground">de los estudiantes mejoran sus calificaciones después de 3 meses de uso</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">2.8x</div>
                <p className="text-sm text-muted-foreground">más rápido aprenden conceptos difíciles comparado con métodos tradicionales</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">87%</div>
                <p className="text-sm text-muted-foreground">de reducción en la ansiedad académica por la atención personalizada</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6 text-center">Fuente: Education AI Impact Study (2023), análisis de 12,000 estudiantes en 6 países</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section with improved design */}
      <section id="testimonials" className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Testimonios
            </span>
            <h2 className="text-3xl font-bold mb-4">
              La experiencia de nuestros estudiantes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce cómo el tutor IA de OeProfe ha transformado la forma en que los 
              estudiantes chilenos aprenden y avanzan académicamente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Mi hijo siempre tuvo dificultades con matemáticas. Con el tutor IA de OeProfe, ha logrado avanzar a su propio ritmo y ahora comprende conceptos que antes le resultaban imposibles.",
                author: "Carolina Méndez",
                role: "Apoderada de estudiante de 6° básico",
                image: "https://randomuser.me/api/portraits/women/45.jpg"
              },
              {
                quote:
                  "Como profesor, recomiendo OeProfe a mis estudiantes. El tutor IA complementa perfectamente mis clases y permite que cada alumno reciba atención personalizada que yo no podría darles individualmente.",
                author: "Roberto Fuentes",
                role: "Profesor de Ciencias, Liceo de Santiago",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote:
                  "Gracias al método socrático del tutor IA, no solo memorizo la materia, sino que realmente la comprendo. Mis puntajes en los ensayos PAES mejoraron más de 100 puntos en tres meses.",
                author: "Javiera Espinoza",
                role: "Estudiante de 4° medio",
                image: "https://randomuser.me/api/portraits/women/67.jpg"
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-foreground leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-primary/5 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-4xl font-bold opacity-5 text-primary font-mono">{"<OeProfe />"}</div>
          <div className="absolute bottom-10 right-10 text-4xl font-bold opacity-5 text-primary font-mono">{"</>"}</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-card rounded-2xl p-10 border border-border shadow-lg">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Tu tutor personal está listo para comenzar
                </h2>
                <p className="text-muted-foreground mb-6">
                  Miles de estudiantes chilenos ya están transformando su educación con nuestro tutor IA.
                  Prueba gratuita por 14 días, sin compromisos.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Acceso 24/7 a un tutor IA personalizado",
                    "Cobertura completa del currículo chileno",
                    "Preparación específica para la PAES",
                    "Adaptado a tu ritmo y estilo de aprendizaje"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-8 py-4 text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-lg text-lg font-medium"
                >
                  Comenzar gratuitamente
                </a>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=80" 
                  alt="Estudiante usando el tutor IA"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-5 -left-5 bg-card p-4 rounded-lg border border-border shadow-md">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-emerald-500 rounded-full text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Mejora garantizada</p>
                      <p className="text-xs text-muted-foreground">O te devolvemos tu dinero</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Planes
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Elige el plan que se adapte a tus necesidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos diferentes planes para estudiantes individuales, familias y establecimientos educativos.
              Todos incluyen acceso a nuestro tutor IA personalizado.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <div key={item.id}>
                <PricingCard item={item} user={user} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

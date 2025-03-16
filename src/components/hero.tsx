import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Aprende{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Sin Límites
              </span>{" "}
              con Nuestra Plataforma Educativa
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Plataforma de aprendizaje diseñada específicamente para
              estudiantes chilenos de PK-12, alineada con el currículo nacional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Comenzar Gratis
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Ver Planes
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Alineado con el currículo chileno</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Prueba gratuita de 14 días</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Características Principales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para hacer el aprendizaje
              divertido, efectivo y adaptado a cada estudiante.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-blue-600 mb-4">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Contenido Interactivo
              </h3>
              <p className="text-gray-600">
                Lecciones en video, actividades interactivas y evaluaciones que
                hacen el aprendizaje divertido.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-blue-600 mb-4">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Currículo Chileno</h3>
              <p className="text-gray-600">
                Contenido alineado con los estándares educativos chilenos para
                todos los niveles desde PK hasta 12.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-blue-600 mb-4">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Aprendizaje Gamificado
              </h3>
              <p className="text-gray-600">
                Sistema de insignias, logros y recompensas que motivan a los
                estudiantes a seguir aprendiendo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

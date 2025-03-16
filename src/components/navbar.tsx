import Link from "next/link";
import { createClient } from "../app/supabase/server";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    console.error("Error in Navbar:", e);
    // Continuamos sin usuario
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold flex items-center gap-2"
        >
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>Aprende Chile</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Características
          </Link>
          <Link
            href="#pricing"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Planes
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Asignaturas
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Recursos
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>Mi Aprendizaje</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  BookOpen,
  Award,
  BarChart,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center gap-2"
          >
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>Aprende Chile</span>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Link>
          <Link
            href="/dashboard/courses"
            className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>Mis Cursos</span>
          </Link>
          <Link
            href="/dashboard/achievements"
            className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <Award className="h-4 w-4" />
            <span>Logros</span>
          </Link>
          <Link
            href="/dashboard/progress"
            className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <BarChart className="h-4 w-4" />
            <span>Progreso</span>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

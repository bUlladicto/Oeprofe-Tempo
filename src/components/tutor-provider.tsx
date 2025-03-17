"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SocraticTutor from './socratic-tutor';

export default function TutorProvider() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Determinar si estamos en la landing page (página principal)
  const isLandingPage = pathname === '/';
  
  // Solo renderizar el componente en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // No mostrar el tutor en la landing page
  if (isLandingPage) {
    return null;
  }
  
  // Adaptar las propiedades según la página actual
  let tutorProps = {
    lessonTitle: "Navegación en OeProfe",
    lessonType: "interaction",
    courseSubject: "Ayuda",
    concepts: ["Navegación", "Dudas", "Soporte"]
  };
  
  // Personalizar el tutor según la ruta actual
  if (pathname.includes('/course/')) {
    tutorProps = {
      lessonTitle: "Contenido del curso",
      lessonType: "learning",
      courseSubject: "Curso actual",
      concepts: ["Contenido", "Ejercicios", "Evaluaciones"]
    };
  } else if (pathname.includes('/dashboard')) {
    tutorProps = {
      lessonTitle: "Panel de Control",
      lessonType: "navigation",
      courseSubject: "Dashboard",
      concepts: ["Progreso", "Cursos", "Estadísticas"]
    };
  }
  
  return <SocraticTutor {...tutorProps} />;
} 
-- Create courses table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT,
    grade_level TEXT,
    duration TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
DROP POLICY IF EXISTS "Public courses access" ON public.courses;
CREATE POLICY "Public courses access"
    ON public.courses
    FOR SELECT
    USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;

-- Insert sample courses
INSERT INTO public.courses (id, title, description, subject, grade_level, duration, image_url)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Matemáticas Básicas', 'Aprende los fundamentos de matemáticas con actividades interactivas y divertidas.', 'Matemáticas', '1° Básico', '4 horas', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80'),
    ('22222222-2222-2222-2222-222222222222', 'Lectura y Escritura', 'Desarrolla habilidades de lectura y escritura con nuestro método probado.', 'Lenguaje', '2° Básico', '6 horas', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'),
    ('33333333-3333-3333-3333-333333333333', 'Ciencias de la Naturaleza', 'Explora el mundo natural con experimentos y actividades prácticas.', 'Ciencias', '3° Básico', '5 horas', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'),
    ('44444444-4444-4444-4444-444444444444', 'Historia de Chile', 'Conoce la historia de nuestro país desde sus orígenes hasta la actualidad.', 'Historia', '4° Básico', '8 horas', 'https://images.unsplash.com/photo-1551406483-3731d1997540?w=800&q=80'),
    ('55555555-5555-5555-5555-555555555555', 'Inglés Básico', 'Aprende las bases del idioma inglés con lecciones interactivas y divertidas.', 'Inglés', '3° Básico', '10 horas', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80');

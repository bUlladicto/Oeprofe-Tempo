-- Create user_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create modules table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    type TEXT NOT NULL,
    video_url TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_lesson_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Insert sample data for modules
INSERT INTO public.modules (id, course_id, title, description, position)
VALUES 
('11111111-1111-1111-1111-111111111111', '1', 'Introducción a los Números', 'Conceptos básicos de números y conteo', 1),
('22222222-2222-2222-2222-222222222222', '1', 'Operaciones Básicas', 'Suma y resta de números', 2),
('33333333-3333-3333-3333-333333333333', '2', 'Introducción a la Lectura', 'Primeros pasos en la lectura', 1),
('44444444-4444-4444-4444-444444444444', '3', 'El Mundo Natural', 'Explorando la naturaleza', 1);

-- Insert sample data for lessons
INSERT INTO public.lessons (id, module_id, title, description, content, type, video_url, position)
VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Contando del 1 al 10', 'Aprende a contar los primeros números', '<p>En esta lección aprenderemos a contar del 1 al 10.</p>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Reconociendo Números', 'Identifica los números escritos', '<p>Aprende a reconocer los números cuando están escritos.</p>', 'practice', null, 2),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Sumando Números', 'Primeros pasos en la suma', '<p>Aprenderemos a sumar números pequeños.</p>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'Las Vocales', 'Conociendo las vocales', '<p>Aprenderemos las vocales y sus sonidos.</p>', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '44444444-4444-4444-4444-444444444444', 'Seres Vivos', 'Características de los seres vivos', '<p>Aprenderemos qué son los seres vivos y sus características.</p>', 'practice', null, 1);

-- Enable row level security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
CREATE POLICY "Users can view their own progress"
ON public.user_progress FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
CREATE POLICY "Users can update their own progress"
ON public.user_progress FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
CREATE POLICY "Users can insert their own progress"
ON public.user_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public modules access" ON public.modules;
CREATE POLICY "Public modules access"
ON public.modules FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public lessons access" ON public.lessons;
CREATE POLICY "Public lessons access"
ON public.lessons FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can view their own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "Users can view their own lesson progress"
ON public.user_lesson_progress FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "Users can update their own lesson progress"
ON public.user_lesson_progress FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "Users can insert their own lesson progress"
ON public.user_lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add to realtime
alter publication supabase_realtime add table public.user_progress;
alter publication supabase_realtime add table public.modules;
alter publication supabase_realtime add table public.lessons;
alter publication supabase_realtime add table public.user_lesson_progress;
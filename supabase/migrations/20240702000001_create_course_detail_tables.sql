-- Create courses table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    duration TEXT,
    subject TEXT,
    grade_level TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    type TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz options table
CREATE TABLE IF NOT EXISTS quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress tables
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_activity_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add sample data
INSERT INTO courses (id, title, description, image_url, duration, subject, grade_level) VALUES
('11111111-1111-1111-1111-111111111111', 'Matemáticas Básicas', 'Aprende los fundamentos de matemáticas con actividades interactivas y divertidas.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', '4 horas', 'Matemáticas', '1° Básico'),
('22222222-2222-2222-2222-222222222222', 'Lectura y Escritura', 'Desarrolla habilidades de lectura y escritura con nuestro método probado.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', '6 horas', 'Lenguaje', '2° Básico'),
('33333333-3333-3333-3333-333333333333', 'Ciencias de la Naturaleza', 'Explora el mundo natural con experimentos y actividades prácticas.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', '5 horas', 'Ciencias', '3° Básico');

-- Add modules for Matemáticas Básicas
INSERT INTO modules (id, course_id, title, description, position) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Introducción a los Números', 'Conoce los números del 1 al 10', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Sumas Básicas', 'Aprende a sumar números de un dígito', 2);

-- Add lessons for Introducción a los Números
INSERT INTO lessons (id, module_id, title, description, content, video_url, type, position) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Conociendo los Números', 'Aprende a identificar los números del 1 al 10', '<p>En esta lección aprenderás a identificar los números del 1 al 10.</p><p>Cada número representa una cantidad específica:</p><ul><li>1: una unidad</li><li>2: dos unidades</li><li>3: tres unidades</li><li>Y así sucesivamente hasta el 10</li></ul>', 'https://www.youtube.com/embed/pZnfkHFBCb4', 'video', 1),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Contando Objetos', 'Practica contando objetos del 1 al 10', '<p>En esta lección practicarás contando diferentes objetos.</p><p>Recuerda seguir estos pasos:</p><ol><li>Señala cada objeto mientras cuentas</li><li>Cuenta en orden: 1, 2, 3...</li><li>El último número que digas es la cantidad total</li></ol>', 'https://www.youtube.com/embed/pZnfkHFBCb4', 'practice', 2);

-- Add quiz for Conociendo los Números
INSERT INTO quizzes (id, lesson_id, title, description) VALUES
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Quiz: Identificación de Números', 'Demuestra tu conocimiento sobre los números del 1 al 10');

-- Add questions for the quiz
INSERT INTO quiz_questions (id, quiz_id, question, position) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '¿Cuál es el número que viene después del 5?', 1),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '¿Cuántos dedos tienes en una mano?', 2);

-- Add options for the questions
INSERT INTO quiz_options (id, question_id, option_text, is_correct, position) VALUES
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '4', FALSE, 1),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '6', TRUE, 2),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '7', FALSE, 3),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '4', FALSE, 1),
('llllllll-llll-llll-llll-llllllllllll', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '5', TRUE, 2),
('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '10', FALSE, 3);

-- Add activity for Contando Objetos
INSERT INTO activities (id, lesson_id, title, description, content, type) VALUES
('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Actividad: Contar Animales', 'Cuenta cuántos animales hay en cada grupo', '{"instructions":"Cuenta cuántos animales hay en cada imagen y selecciona la respuesta correcta.","items":[{"item":"Perro","answer":"vivo"},{"item":"Gato","answer":"vivo"},{"item":"Piedra","answer":"no vivo"},{"item":"Árbol","answer":"vivo"}]}', 'sorting');

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to courses, modules, lessons
DROP POLICY IF EXISTS "Public courses access" ON courses;
CREATE POLICY "Public courses access" ON courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public modules access" ON modules;
CREATE POLICY "Public modules access" ON modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public lessons access" ON lessons;
CREATE POLICY "Public lessons access" ON lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public quizzes access" ON quizzes;
CREATE POLICY "Public quizzes access" ON quizzes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public quiz questions access" ON quiz_questions;
CREATE POLICY "Public quiz questions access" ON quiz_questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public quiz options access" ON quiz_options;
CREATE POLICY "Public quiz options access" ON quiz_options FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public activities access" ON activities;
CREATE POLICY "Public activities access" ON activities FOR SELECT USING (true);

-- Create policies for user progress tables (only own data)
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
CREATE POLICY "Users can view own progress" ON user_progress 
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
CREATE POLICY "Users can insert own progress" ON user_progress 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress" ON user_progress 
    FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for other user progress tables
DROP POLICY IF EXISTS "Users can view own lesson progress" ON user_lesson_progress;
CREATE POLICY "Users can view own lesson progress" ON user_lesson_progress 
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own lesson progress" ON user_lesson_progress;
CREATE POLICY "Users can insert own lesson progress" ON user_lesson_progress 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own lesson progress" ON user_lesson_progress;
CREATE POLICY "Users can update own lesson progress" ON user_lesson_progress 
    FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime for relevant tables
alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table modules;
alter publication supabase_realtime add table lessons;
alter publication supabase_realtime add table user_progress;
alter publication supabase_realtime add table user_lesson_progress;

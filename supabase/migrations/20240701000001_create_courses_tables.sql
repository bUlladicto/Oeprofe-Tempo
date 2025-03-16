-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  image_url TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  position INTEGER NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_options table
CREATE TABLE IF NOT EXISTS quiz_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create user_quiz_results table
CREATE TABLE IF NOT EXISTS user_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_activity_progress table
CREATE TABLE IF NOT EXISTS user_activity_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, activity_id)
);

-- Enable realtime for all tables
alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table modules;
alter publication supabase_realtime add table lessons;
alter publication supabase_realtime add table quizzes;
alter publication supabase_realtime add table quiz_questions;
alter publication supabase_realtime add table quiz_options;
alter publication supabase_realtime add table user_progress;
alter publication supabase_realtime add table user_lesson_progress;
alter publication supabase_realtime add table user_quiz_results;
alter publication supabase_realtime add table achievements;
alter publication supabase_realtime add table user_achievements;
alter publication supabase_realtime add table activities;
alter publication supabase_realtime add table user_activity_progress;

-- Insert sample data for courses
INSERT INTO courses (id, title, description, subject, grade_level, image_url, duration) VALUES
('11111111-1111-1111-1111-111111111111', 'Matemáticas Básicas', 'Aprende los fundamentos de matemáticas con actividades interactivas y divertidas.', 'Matemáticas', '1° Básico', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', '4 horas'),
('22222222-2222-2222-2222-222222222222', 'Lectura y Escritura', 'Desarrolla habilidades de lectura y escritura con nuestro método probado.', 'Lenguaje', '2° Básico', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', '6 horas'),
('33333333-3333-3333-3333-333333333333', 'Ciencias de la Naturaleza', 'Explora el mundo natural con experimentos y actividades prácticas.', 'Ciencias', '3° Básico', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', '5 horas');

-- Insert sample data for modules
INSERT INTO modules (id, course_id, title, description, position) VALUES
-- Matemáticas Básicas modules
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Números del 1 al 10', 'Aprende a contar y reconocer los números del 1 al 10', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Sumas básicas', 'Aprende a sumar números pequeños', 2),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Restas básicas', 'Aprende a restar números pequeños', 3),

-- Lectura y Escritura modules
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'Vocales', 'Reconocimiento y escritura de vocales', 1),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Consonantes', 'Reconocimiento y escritura de consonantes', 2),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'Palabras simples', 'Formación y lectura de palabras simples', 3),

-- Ciencias de la Naturaleza modules
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Los seres vivos', 'Características de los seres vivos', 1),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '33333333-3333-3333-3333-333333333333', 'Las plantas', 'Partes de las plantas y su ciclo de vida', 2),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', '33333333-3333-3333-3333-333333333333', 'Los animales', 'Clasificación de los animales', 3);

-- Insert sample data for lessons
INSERT INTO lessons (id, module_id, title, description, content, video_url, position, type) VALUES
-- Matemáticas - Números del 1 al 10 lessons
('lesson-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Reconociendo los números', 'Aprende a reconocer los números del 1 al 10', '<p>En esta lección aprenderemos a reconocer los números del 1 al 10. Cada número tiene su propio símbolo y representa una cantidad específica.</p><p>Vamos a ver cada número:</p><ul><li>1 - uno</li><li>2 - dos</li><li>3 - tres</li><li>4 - cuatro</li><li>5 - cinco</li><li>6 - seis</li><li>7 - siete</li><li>8 - ocho</li><li>9 - nueve</li><li>10 - diez</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1, 'video'),
('lesson-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Contando objetos', 'Aprende a contar objetos del 1 al 10', '<p>En esta lección practicaremos contar objetos del 1 al 10. Es importante asociar cada número con la cantidad que representa.</p><p>Vamos a contar diferentes grupos de objetos y asignarles el número correcto.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2, 'video'),
('lesson-03', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Escribiendo los números', 'Aprende a escribir los números del 1 al 10', '<p>En esta lección aprenderemos a escribir los números del 1 al 10. Es importante practicar la escritura para mejorar nuestra habilidad.</p><p>Seguiremos las flechas para escribir cada número correctamente.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3, 'practice'),

-- Matemáticas - Sumas básicas lessons
('lesson-04', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '¿Qué es sumar?', 'Introducción al concepto de suma', '<p>En esta lección aprenderemos qué significa sumar. Sumar es juntar o agregar elementos para obtener un total.</p><p>Por ejemplo, si tenemos 2 manzanas y agregamos 3 manzanas más, en total tendremos 5 manzanas. Esto se escribe como: 2 + 3 = 5</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1, 'video'),
('lesson-05', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sumas hasta 5', 'Practica sumas con resultados hasta 5', '<p>En esta lección practicaremos sumas cuyos resultados no superan el número 5.</p><p>Algunos ejemplos:</p><ul><li>1 + 1 = 2</li><li>2 + 2 = 4</li><li>3 + 1 = 4</li><li>2 + 3 = 5</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2, 'practice'),
('lesson-06', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sumas hasta 10', 'Practica sumas con resultados hasta 10', '<p>En esta lección practicaremos sumas cuyos resultados no superan el número 10.</p><p>Algunos ejemplos:</p><ul><li>5 + 2 = 7</li><li>4 + 3 = 7</li><li>6 + 2 = 8</li><li>5 + 5 = 10</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3, 'practice'),

-- Lectura y Escritura - Vocales lessons
('lesson-07', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Las vocales', 'Conoce las vocales: a, e, i, o, u', '<p>En esta lección conoceremos las vocales: a, e, i, o, u. Las vocales son sonidos que se pronuncian sin obstrucción en la boca.</p><p>Cada vocal tiene su propio sonido y forma:</p><ul><li>A - a</li><li>E - e</li><li>I - i</li><li>O - o</li><li>U - u</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1, 'video'),
('lesson-08', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Reconociendo las vocales', 'Aprende a reconocer las vocales en diferentes palabras', '<p>En esta lección aprenderemos a reconocer las vocales en diferentes palabras. Es importante identificar las vocales para poder leer correctamente.</p><p>Por ejemplo:</p><ul><li>Casa: las vocales son a, a</li><li>Perro: las vocales son e, o</li><li>Libro: las vocales son i, o</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2, 'practice'),
('lesson-09', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Escribiendo las vocales', 'Aprende a escribir las vocales', '<p>En esta lección aprenderemos a escribir las vocales. Es importante practicar la escritura para mejorar nuestra habilidad.</p><p>Seguiremos las flechas para escribir cada vocal correctamente, tanto en mayúscula como en minúscula.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3, 'practice'),

-- Ciencias - Los seres vivos lessons
('lesson-10', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '¿Qué son los seres vivos?', 'Características de los seres vivos', '<p>En esta lección aprenderemos qué son los seres vivos y cuáles son sus características principales.</p><p>Los seres vivos:</p><ul><li>Nacen</li><li>Crecen</li><li>Se reproducen</li><li>Se alimentan</li><li>Respiran</li><li>Responden a estímulos</li><li>Mueren</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1, 'video'),
('lesson-11', 'gggggggg-gggg-gggg-gggg-gggggggggggg', 'Seres vivos y no vivos', 'Diferencias entre seres vivos y objetos no vivos', '<p>En esta lección aprenderemos a diferenciar entre seres vivos y objetos no vivos.</p><p>Ejemplos de seres vivos: personas, animales, plantas.</p><p>Ejemplos de objetos no vivos: piedras, juguetes, mesas.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2, 'practice'),
('lesson-12', 'gggggggg-gggg-gggg-gggg-gggggggggggg', 'Clasificando seres vivos', 'Aprende a clasificar diferentes seres vivos', '<p>En esta lección aprenderemos a clasificar diferentes seres vivos según sus características.</p><p>Podemos clasificarlos en:</p><ul><li>Animales</li><li>Plantas</li><li>Hongos</li><li>Bacterias</li></ul>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 3, 'practice');

-- Insert sample data for quizzes
INSERT INTO quizzes (id, lesson_id, title, description) VALUES
('quiz-01', 'lesson-03', 'Quiz: Números del 1 al 10', 'Comprueba tu conocimiento sobre los números del 1 al 10'),
('quiz-02', 'lesson-06', 'Quiz: Sumas básicas', 'Comprueba tu habilidad para realizar sumas básicas'),
('quiz-03', 'lesson-09', 'Quiz: Las vocales', 'Comprueba tu conocimiento sobre las vocales'),
('quiz-04', 'lesson-12', 'Quiz: Los seres vivos', 'Comprueba tu conocimiento sobre los seres vivos');

-- Insert sample data for quiz questions
INSERT INTO quiz_questions (id, quiz_id, question, position) VALUES
-- Quiz: Números del 1 al 10
('question-01', 'quiz-01', '¿Cuál es el número que viene después del 5?', 1),
('question-02', 'quiz-01', '¿Cuántos dedos tienes en una mano?', 2),
('question-03', 'quiz-01', '¿Qué número representa esta cantidad: ●●●?', 3),

-- Quiz: Sumas básicas
('question-04', 'quiz-02', '¿Cuánto es 2 + 3?', 1),
('question-05', 'quiz-02', '¿Cuánto es 4 + 4?', 2),
('question-06', 'quiz-02', 'Si tienes 3 manzanas y te dan 2 más, ¿cuántas manzanas tienes en total?', 3),

-- Quiz: Las vocales
('question-07', 'quiz-03', '¿Cuántas vocales hay en español?', 1),
('question-08', 'quiz-03', '¿Cuál es la primera vocal del abecedario?', 2),
('question-09', 'quiz-03', '¿Qué vocales hay en la palabra "casa"?', 3),

-- Quiz: Los seres vivos
('question-10', 'quiz-04', '¿Cuál de estos NO es un ser vivo?', 1),
('question-11', 'quiz-04', '¿Qué hacen todos los seres vivos?', 2),
('question-12', 'quiz-04', '¿A qué grupo pertenece un árbol?', 3);

-- Insert sample data for quiz options
INSERT INTO quiz_options (id, question_id, option_text, is_correct, position) VALUES
-- Question 1 options
('option-01', 'question-01', '4', FALSE, 1),
('option-02', 'question-01', '5', FALSE, 2),
('option-03', 'question-01', '6', TRUE, 3),
('option-04', 'question-01', '7', FALSE, 4),

-- Question 2 options
('option-05', 'question-02', '4', FALSE, 1),
('option-06', 'question-02', '5', TRUE, 2),
('option-07', 'question-02', '6', FALSE, 3),
('option-08', 'question-02', '10', FALSE, 4),

-- Question 3 options
('option-09', 'question-03', '2', FALSE, 1),
('option-10', 'question-03', '3', TRUE, 2),
('option-11', 'question-03', '4', FALSE, 3),
('option-12', 'question-03', '5', FALSE, 4),

-- Question 4 options
('option-13', 'question-04', '4', FALSE, 1),
('option-14', 'question-04', '5', TRUE, 2),
('option-15', 'question-04', '6', FALSE, 3),
('option-16', 'question-04', '7', FALSE, 4),

-- Question 5 options
('option-17', 'question-05', '6', FALSE, 1),
('option-18', 'question-05', '7', FALSE, 2),
('option-19', 'question-05', '8', TRUE, 3),
('option-20', 'question-05', '9', FALSE, 4),

-- Question 6 options
('option-21', 'question-06', '4', FALSE, 1),
('option-22', 'question-06', '5', TRUE, 2),
('option-23', 'question-06', '6', FALSE, 3),
('option-24', 'question-06', '7', FALSE, 4),

-- Question 7 options
('option-25', 'question-07', '4', FALSE, 1),
('option-26', 'question-07', '5', TRUE, 2),
('option-27', 'question-07', '6', FALSE, 3),
('option-28', 'question-07', '7', FALSE, 4),

-- Question 8 options
('option-29', 'question-08', 'a', TRUE, 1),
('option-30', 'question-08', 'e', FALSE, 2),
('option-31', 'question-08', 'i', FALSE, 3),
('option-32', 'question-08', 'o', FALSE, 4),

-- Question 9 options
('option-33', 'question-09', 'a, e', FALSE, 1),
('option-34', 'question-09', 'a, o', FALSE, 2),
('option-35', 'question-09', 'a, a', TRUE, 3),
('option-36', 'question-09', 'e, a', FALSE, 4),

-- Question 10 options
('option-37', 'question-10', 'Perro', FALSE, 1),
('option-38', 'question-10', 'Árbol', FALSE, 2),
('option-39', 'question-10', 'Piedra', TRUE, 3),
('option-40', 'question-10', 'Flor', FALSE, 4),

-- Question 11 options
('option-41', 'question-11', 'Hablan', FALSE, 1),
('option-42', 'question-11', 'Caminan', FALSE, 2),
('option-43', 'question-11', 'Respiran', TRUE, 3),
('option-44', 'question-11', 'Nadan', FALSE, 4),

-- Question 12 options
('option-45', 'question-12', 'Animales', FALSE, 1),
('option-46', 'question-12', 'Plantas', TRUE, 2),
('option-47', 'question-12', 'Hongos', FALSE, 3),
('option-48', 'question-12', 'Bacterias', FALSE, 4);

-- Insert sample data for activities
INSERT INTO activities (id, lesson_id, title, description, content, type) VALUES
-- Matemáticas activities
('activity-01', 'lesson-02', 'Contando objetos', 'Practica contar objetos del 1 al 10', '{"instructions":"Cuenta cuántos objetos hay en cada grupo y selecciona el número correcto.","items":[{"image":"https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80","answer":3},{"image":"https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=800&q=80","answer":5},{"image":"https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&q=80","answer":7}]}', 'counting'),
('activity-02', 'lesson-05', 'Resolviendo sumas', 'Practica sumas básicas', '{"instructions":"Resuelve las siguientes sumas arrastrando el número correcto al espacio en blanco.","items":[{"problem":"2 + 1 = ?","answer":3},{"problem":"3 + 2 = ?","answer":5},{"problem":"1 + 4 = ?","answer":5}]}', 'drag-and-drop'),

-- Lectura y Escritura activities
('activity-03', 'lesson-08', 'Identificando vocales', 'Practica identificar vocales en palabras', '{"instructions":"Identifica todas las vocales en las siguientes palabras.","items":[{"word":"casa","answers":["a","a"]},{"word":"perro","answers":["e","o"]},{"word":"libro","answers":["i","o"]}]}', 'highlight'),
('activity-04', 'lesson-09', 'Escribiendo vocales', 'Practica escribir vocales', '{"instructions":"Completa las siguientes palabras con la vocal correcta.","items":[{"word":"c_s_","answers":["a","a"]},{"word":"p_rr_","answers":["e","o"]},{"word":"l_br_","answers":["i","o"]}]}', 'fill-in-blanks'),

-- Ciencias activities
('activity-05', 'lesson-11', 'Clasificando seres vivos', 'Practica clasificar seres vivos y no vivos', '{"instructions":"Clasifica los siguientes elementos como seres vivos o no vivos.","items":[{"item":"Perro","answer":"vivo"},{"item":"Piedra","answer":"no vivo"},{"item":"Árbol","answer":"vivo"},{"item":"Juguete","answer":"no vivo"},{"item":"Flor","answer":"vivo"}]}', 'sorting'),
('activity-06', 'lesson-12', 'Partes de los seres vivos', 'Identifica las partes de diferentes seres vivos', '{"instructions":"Identifica las partes de los siguientes seres vivos.","items":[{"image":"https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=800&q=80","parts":["cabeza","tronco","extremidades"]},{"image":"https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80","parts":["raíz","tallo","hojas","flor"]}]}', 'labeling');

-- Insert sample data for achievements
INSERT INTO achievements (id, name, description, icon) VALUES
('achievement-01', 'Matemático Novato', 'Completar 5 lecciones de matemáticas', 'Award'),
('achievement-02', 'Lector Ávido', 'Leer 10 textos en la plataforma', 'BookOpen'),
('achievement-03', 'Científico Curioso', 'Completar 3 experimentos virtuales', 'Lightbulb'),
('achievement-04', 'Historiador', 'Completar el curso de Historia de Chile', 'BookMarked'),
('achievement-05', 'Políglota', 'Completar el curso básico de inglés', 'Globe');
-- ═══════════════════════════════════════════════════════════════════════════
-- AXIOM — Datos iniciales (4 facultades + materias + 15 usuarios mock + pagos + historial)
-- ═══════════════════════════════════════════════════════════════════════════
-- Pegar en SQL Editor de Supabase DESPUÉS de ejecutar schema.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- FACULTADES (4 carreras UMSS)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO facultades (id, nombre, nombre_corto, color, color_secundario, emoji, descripcion, areas, ponderacion, duracion_minutos, preguntas_examen, ano_inicio_banco) VALUES
('economicas', 'Ciencias Económicas y Administrativas', 'Económicas', '#10b981', '#34d399', '📊', 'Carreras: Economía, Administración de Empresas, Contaduría Pública, Ingeniería Comercial.',
  '["matematicas","economicas","verbal","razonamiento"]'::jsonb,
  '{"matematicas":0.40,"economicas":0.35,"verbal":0.15,"razonamiento":0.10}'::jsonb,
  180, 100, 2020),
('ingenieria', 'Facultad de Ciencias y Tecnología', 'Ingeniería', '#3b82f6', '#60a5fa', '⚙️', 'Carreras: Ingeniería Civil, Industrial, de Sistemas, Eléctrica, Electrónica, Mecánica, Química, Matemáticas, Física.',
  '["matematicas","fisica","quimica","razonamiento"]'::jsonb,
  '{"matematicas":0.40,"fisica":0.30,"quimica":0.20,"razonamiento":0.10}'::jsonb,
  180, 100, 2020),
('medicina', 'Facultad de Medicina', 'Medicina', '#ef4444', '#f87171', '⚕️', 'Carreras: Medicina, Enfermería, Bioquímica y Farmacia, Tecnología Médica, Fisioterapia.',
  '["biologia","quimica","fisica","verbal"]'::jsonb,
  '{"biologia":0.40,"quimica":0.30,"fisica":0.20,"verbal":0.10}'::jsonb,
  180, 100, 2020),
('derecho', 'Facultad de Derecho y Ciencias Políticas', 'Derecho', '#a855f7', '#c084fc', '⚖️', 'Carreras: Derecho, Ciencias Políticas, Administración Pública, Relaciones Internacionales.',
  '["civica","historia","verbal","razonamiento"]'::jsonb,
  '{"civica":0.35,"historia":0.30,"verbal":0.25,"razonamiento":0.10}'::jsonb,
  180, 100, 2021)
ON CONFLICT (id) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  color = EXCLUDED.color,
  areas = EXCLUDED.areas,
  ponderacion = EXCLUDED.ponderacion;

-- ─────────────────────────────────────────────────────────────────────────────
-- MATERIAS (organizadas por facultad)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO materias (id, facultad_id, nombre, area, libros_referencia) VALUES
-- Económicas
('alg-economicas',     'economicas', 'Álgebra y Funciones',           'matematicas',  '["Algebra Baldor","Calculo Stewart"]'::jsonb),
('calc-economicas',    'economicas', 'Cálculo Diferencial e Integral','matematicas',  '["Cálculo Larson","Cálculo Leithold"]'::jsonb),
('microeconomia',      'economicas', 'Microeconomía',                 'economicas',   '["Mankiw - Principios","Pindyck"]'::jsonb),
('macroeconomia',      'economicas', 'Macroeconomía',                 'economicas',   '["Mankiw - Macroeconomía","Blanchard"]'::jsonb),
('verbal-economicas',  'economicas', 'Comprensión Lectora',           'verbal',       '["Razonamiento Verbal UMSS"]'::jsonb),
('logica-economicas',  'economicas', 'Razonamiento Lógico Matemático','razonamiento', '["Razonamiento Lógico Cuanto"]'::jsonb),
-- Ingeniería
('alg-ing',            'ingenieria', 'Álgebra y Trigonometría',       'matematicas',  '["Algebra Baldor","Trigonometría Sullivan"]'::jsonb),
('geom-ing',           'ingenieria', 'Geometría Analítica',           'matematicas',  '["Lehmann","Charles Lehmann"]'::jsonb),
('calc-ing',           'ingenieria', 'Cálculo I',                     'matematicas',  '["Stewart","Leithold"]'::jsonb),
('mec-fisica',         'ingenieria', 'Mecánica Clásica',              'fisica',       '["Sears Zemansky","Serway Vol. 1"]'::jsonb),
('term-fisica',        'ingenieria', 'Termodinámica y Ondas',         'fisica',       '["Serway Vol. 2"]'::jsonb),
('quim-gen',           'ingenieria', 'Química General',               'quimica',      '["Chang","Whitten"]'::jsonb),
('razon-ing',          'ingenieria', 'Razonamiento Lógico',           'razonamiento', '["Razonamiento Lógico Cuanto"]'::jsonb),
-- Medicina
('biocelular',         'medicina',   'Biología Celular y Molecular',  'biologia',     '["Curtis - Biología","Alberts - Bio Celular"]'::jsonb),
('anatomia-basica',    'medicina',   'Anatomía Humana Básica',        'biologia',     '["Tortora","Rouvière"]'::jsonb),
('genetica',           'medicina',   'Genética Básica',               'biologia',     '["Curtis Cap. Genética"]'::jsonb),
('quim-organica',      'medicina',   'Química Orgánica',              'quimica',      '["Wade","McMurry"]'::jsonb),
('quim-inorg',         'medicina',   'Química Inorgánica',            'quimica',      '["Chang","Petrucci"]'::jsonb),
('fisica-med',         'medicina',   'Física Aplicada a la Medicina', 'fisica',       '["Cromer - Física Vida"]'::jsonb),
('verbal-med',         'medicina',   'Comprensión Lectora',           'verbal',       '["Razonamiento Verbal UMSS"]'::jsonb),
-- Derecho
('const-politica',     'derecho',    'Constitución Política del Estado','civica',     '["CPE 2009 Bolivia"]'::jsonb),
('civica-general',     'derecho',    'Educación Cívica',              'civica',       '["Cívica 4to Secundaria"]'::jsonb),
('hist-bolivia',       'derecho',    'Historia de Bolivia',           'historia',     '["Mesa Gisbert - Historia Bolivia","Querejazu"]'::jsonb),
('hist-universal',     'derecho',    'Historia Universal',            'historia',     '["Lozano - Historia Universal"]'::jsonb),
('filosofia',          'derecho',    'Filosofía y Ética',             'verbal',       '["Gaarder - Sofía","Savater - Ética"]'::jsonb),
('verbal-der',         'derecho',    'Comprensión Lectora Jurídica',  'verbal',       '["Razonamiento Verbal UMSS"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET nombre = EXCLUDED.nombre;

-- ─────────────────────────────────────────────────────────────────────────────
-- USUARIOS (15 mock para mostrar la plataforma poblada desde el inicio)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO usuarios (id, email, nombre, facultad_objetivo, plan, avatar_color, fecha_registro, examenes_completados, mejor_nota, nota_promedio) VALUES
('u-001','ana.lopez@umss.edu.bo','Ana López','economicas','premium','#a855f7','2025-08-15',24,87,72),
('u-002','carlos.mamani@umss.edu.bo','Carlos Mamani','ingenieria','pro','#3b82f6','2025-09-02',18,92,78),
('u-003','lucia.gutierrez@umss.edu.bo','Lucía Gutiérrez','medicina','pro','#ef4444','2025-07-20',31,95,81),
('u-004','miguel.rojas@gmail.com','Miguel Rojas','derecho','premium','#10b981','2025-10-05',12,79,65),
('u-005','sofia.cruz@umss.edu.bo','Sofía Cruz','ingenieria','gratis','#f59e0b','2026-01-10',2,58,54),
('u-006','pablo.choque@umss.edu.bo','Pablo Choque','medicina','pro','#06b6d4','2025-11-18',9,73,67),
('u-007','elena.vargas@gmail.com','Elena Vargas','economicas','gratis','#ec4899','2026-02-01',1,62,62),
('u-008','diego.flores@umss.edu.bo','Diego Flores','ingenieria','premium','#8b5cf6','2025-06-12',45,98,85),
('u-009','valeria.suarez@umss.edu.bo','Valeria Suárez','medicina','premium','#dc2626','2025-05-22',38,96,84),
('u-010','ricardo.aliaga@gmail.com','Ricardo Aliaga','derecho','pro','#7c3aed','2025-12-08',14,81,70),
('u-011','natalia.quispe@umss.edu.bo','Natalia Quispe','economicas','pro','#0ea5e9','2025-09-30',21,88,76),
('u-012','fernando.medina@gmail.com','Fernando Medina','ingenieria','gratis','#84cc16','2026-03-15',2,55,52),
('u-013','carmen.silva@umss.edu.bo','Carmen Silva','medicina','pro','#f43f5e','2025-10-22',16,84,75),
('u-014','alvaro.rocha@gmail.com','Álvaro Rocha','derecho','gratis','#9333ea','2026-04-10',1,60,60),
('u-015','patricia.calle@umss.edu.bo','Patricia Calle','economicas','premium','#059669','2025-04-18',52,94,82)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- PAGOS (historial mock para que el admin vea datos al entrar)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO pagos (id, usuario_id, plan, monto, moneda, metodo, estado, fecha, referencia, valido_hasta) VALUES
('p-001','u-001','premium',100,'BOB','tigo_money','aprobado','2026-05-01','TM-89472341','2026-06-01'),
('p-002','u-002','pro',50,'BOB','qr_bancario','aprobado','2026-05-03','QR-77231189','2026-06-03'),
('p-003','u-003','pro',50,'BOB','transferencia','aprobado','2026-05-05','BG-99812234','2026-06-05'),
('p-004','u-004','premium',100,'BOB','tigo_money','aprobado','2026-05-08','TM-83721998','2026-06-08'),
('p-005','u-006','pro',50,'BOB','qr_bancario','aprobado','2026-05-10','QR-66554433','2026-06-10'),
('p-006','u-008','premium',100,'BOB','transferencia','aprobado','2026-05-12','BU-11223344','2026-06-12'),
('p-007','u-009','premium',100,'BOB','tigo_money','aprobado','2026-05-15','TM-77882211','2026-06-15'),
('p-008','u-010','pro',50,'BOB','qr_bancario','aprobado','2026-05-18','QR-44556677','2026-06-18'),
('p-009','u-011','pro',50,'BOB','transferencia','aprobado','2026-05-20','BM-88991122','2026-06-20'),
('p-010','u-013','pro',50,'BOB','tigo_money','pendiente','2026-05-23','TM-99887766',NULL),
('p-011','u-015','premium',100,'BOB','qr_bancario','aprobado','2026-05-23','QR-33445566','2026-06-23')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pagos (id, usuario_id, plan, monto, moneda, metodo, estado, fecha, referencia, motivo_rechazo) VALUES
('p-012','u-005','pro',50,'BOB','transferencia','rechazado','2026-05-22','BG-22334455','Comprobante no legible. Reintentar.')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- HISTORIAL (examenes ya completados para mostrar progreso)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO historial (id, usuario_id, facultad, fecha, modo, anio_examen, nota, correctas, incorrectas, sin_responder, tiempo_segundos, desglose) VALUES
('h-001','u-001','economicas','2026-05-23T10:30:00Z','examen_real',2024,78,8,2,0,5400,'{"matematicas":80,"economicas":75,"verbal":100,"razonamiento":50}'::jsonb),
('h-002','u-001','economicas','2026-05-22T14:15:00Z','predictivo',NULL,85,17,3,0,3200,'{"matematicas":90,"economicas":80,"verbal":100,"razonamiento":50}'::jsonb),
('h-003','u-002','ingenieria','2026-05-23T16:00:00Z','examen_real',2024,92,14,1,0,4800,'{"matematicas":95,"fisica":90,"quimica":85,"razonamiento":100}'::jsonb),
('h-004','u-003','medicina','2026-05-23T08:00:00Z','mixto',NULL,95,19,1,0,4200,'{"biologia":100,"quimica":90,"fisica":90,"verbal":100}'::jsonb),
('h-005','u-008','ingenieria','2026-05-22T19:30:00Z','examen_real',2024,98,15,0,0,5100,'{"matematicas":100,"fisica":100,"quimica":95,"razonamiento":100}'::jsonb),
('h-006','u-009','medicina','2026-05-22T11:45:00Z','predictivo',NULL,96,11,1,0,3900,'{"biologia":100,"quimica":90,"fisica":100,"verbal":100}'::jsonb),
('h-007','u-015','economicas','2026-05-21T15:20:00Z','examen_real',2023,94,14,1,0,4500,'{"matematicas":95,"economicas":90,"verbal":100,"razonamiento":100}'::jsonb),
('h-008','u-004','derecho','2026-05-21T18:00:00Z','examen_real',2024,79,9,3,0,5600,'{"civica":85,"historia":75,"verbal":80,"razonamiento":75}'::jsonb),
('h-009','u-005','ingenieria','2026-05-20T20:00:00Z','examen_real',2023,58,6,4,0,6000,'{"matematicas":60,"fisica":55,"quimica":50,"razonamiento":70}'::jsonb),
('h-010','u-006','medicina','2026-05-20T09:30:00Z','por_tema',NULL,73,11,4,0,1800,'{"biologia":73}'::jsonb),
('h-011','u-010','derecho','2026-05-19T16:15:00Z','examen_real',2023,81,8,2,0,4700,'{"civica":85,"historia":80,"verbal":80,"razonamiento":80}'::jsonb),
('h-012','u-011','economicas','2026-05-19T11:00:00Z','mixto',NULL,88,18,2,0,3500,'{"matematicas":90,"economicas":85,"verbal":100,"razonamiento":75}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- LISTO. La plataforma ya tiene datos iniciales y se ve poblada al entrar.
-- ═══════════════════════════════════════════════════════════════════════════

-- SEED DATA FOR COURSES
-- Based on Veroni Kite Roadmap & Pricing

insert into public.courses (title_es, title_en, description_es, description_en, level_required, duration_hours, price_cop, image_url)
values
(
  'Curso Discovery', 
  'Discovery Course', 
  'Primeros pasos: teoría de viento, seguridad básica y familiarización con el equipo.',
  'First steps: wind theory, basic safety and equipment familiarization.',
  1,
  3,
  350000,
  null
),
(
  'Control de Kite', 
  'Kite Control', 
  'Entender cómo funciona el viento, la ventana de viento y las zonas de potencia.',
  'Understand how wind works, the wind window and power zones.',
  2,
  6,
  650000,
  null
),
(
  'Curso Waterstart', 
  'Waterstart Course', 
  'El momento clave: levantarse del agua y dar tus primeras navegaciones.',
  'The key moment: getting up from the water and your first rides.',
  3,
  9,
  900000,
  null
);

-- SEED DATA FOR CONTENT (Sample)
insert into public.content (title_es, title_en, slug, type, content_html_es, content_html_en, is_public, published_at)
values
(
  'Bienvenidos a Veroni Kite',
  'Welcome to Veroni Kite',
  'welcome-veroni-kite',
  'blog',
  '<p>Estamos emocionados de lanzar nuestra nueva plataforma web.</p>',
  '<p>We are excited to launch our new web platform.</p>',
  true,
  now()
);

-- Note: To seed Slots or Progress, you first need to create Users in the Authentication tab
-- and use their UUIDs here.

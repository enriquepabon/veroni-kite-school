import { RoadMapLevel } from '@/types';

/**
 * Kitesurf Road Map — Seed Data
 * 6 levels with sub-skills and curated tutorial videos, bilingual.
 * This data is used by both PublicRoadMap and ActiveRoadMap components.
 * When Supabase is connected, this will be fetched from the `skills` table.
 *
 * Video sources:
 * - Kitesurf College (youtube.com/@kitesurfco) — 126K+ subs, clearest beginner tutorials
 * - Progression Sports (youtube.com/@learnwithprogression) — 10M+ views, professional instruction
 */
export const roadmapLevels: RoadMapLevel[] = [
    {
        id: 'level-1',
        level: 1,
        name_es: 'Descubrimiento',
        name_en: 'Discovery',
        description_es: 'Primeros pasos: teoría de viento, seguridad básica y familiarización con el equipo.',
        description_en: 'First steps: wind theory, basic safety and equipment familiarization.',
        icon: '🪁',
        color: '#00D4AA', // ocean-teal
        gradient: 'from-ocean-teal-400 to-ocean-teal-600',
        skills: [
            {
                id: 'skill-1-1',
                name_es: 'Teoría del viento y ventana de viento',
                name_en: 'Wind theory and wind window',
                description_es: 'Entender cómo funciona el viento, la ventana de viento y las zonas de potencia.',
                description_en: 'Understand how wind works, the wind window and power zones.',
            },
            {
                id: 'skill-1-2',
                name_es: 'Seguridad y sistemas de emergencia',
                name_en: 'Safety and emergency systems',
                description_es: 'Conocer los sistemas de seguridad: quick release, chicken loop, leash y señales.',
                description_en: 'Know safety systems: quick release, chicken loop, leash and signals.',
            },
            {
                id: 'skill-1-3',
                name_es: 'Montaje y desmontaje del equipo',
                name_en: 'Equipment setup and breakdown',
                description_es: 'Armar y desarmar correctamente el kite, líneas y barra.',
                description_en: 'Correctly set up and break down the kite, lines and bar.',
            },
            {
                id: 'skill-1-4',
                name_es: 'Control del kite en tierra',
                name_en: 'Kite control on land',
                description_es: 'Manejar el kite con precisión en tierra: figuras de 8, estacionado, power zone.',
                description_en: 'Handle the kite with precision on land: figure 8s, parking, power zone.',
            },
            {
                id: 'skill-1-5',
                name_es: 'Body drag básico',
                name_en: 'Basic body drag',
                description_es: 'Ser arrastrado por el kite en el agua de forma controlada.',
                description_en: 'Be dragged by the kite in the water in a controlled manner.',
            },
        ],
        videos: [
            {
                id: 'vid-1-1',
                youtube_id: 'Vaa3RMTyxEg',
                title_es: 'Control del Kite 101 — Tips para tu primera clase',
                title_en: 'Kite Control 101 — Tips for your first lesson',
                channel: 'Kitesurf College',
            },
            {
                id: 'vid-1-2',
                youtube_id: 'JCG0hk1X8XA',
                title_es: 'Introduccion al Kiteboarding para principiantes',
                title_en: 'Introduction to Kiteboarding for beginners',
                channel: 'Progression',
            },
            {
                id: 'vid-1-3',
                youtube_id: '0IvY3Nqxwpg',
                title_es: 'Errores comunes en clase de kitesurf y como evitarlos',
                title_en: 'Kitesurf lesson mistakes & tips for avoiding them',
                channel: 'Kitesurf College',
            },
            {
                id: 'vid-1-4',
                youtube_id: 'pECl31cvLCg',
                title_es: 'Como arreglar lineas cruzadas o invertidas',
                title_en: 'How to fix crossed or inverted lines',
                channel: 'Kitesurf College',
            },
        ],
    },
    {
        id: 'level-2',
        level: 2,
        name_es: 'Control de Kite',
        name_en: 'Kite Control',
        description_es: 'Dominio del kite en agua: power strokes, body drag upwind y preparación para board.',
        description_en: 'Mastering the kite in water: power strokes, upwind body drag and board preparation.',
        icon: '💨',
        color: '#0A84FF', // deep-marine-500
        gradient: 'from-ocean-teal to-deep-marine-500',
        skills: [
            {
                id: 'skill-2-1',
                name_es: 'Power strokes y generación de potencia',
                name_en: 'Power strokes and power generation',
                description_es: 'Generar potencia de forma controlada con movimientos de la barra.',
                description_en: 'Generate power in a controlled manner with bar movements.',
            },
            {
                id: 'skill-2-2',
                name_es: 'Body drag downwind y crosswind',
                name_en: 'Downwind and crosswind body drag',
                description_es: 'Navegar con el cuerpo en diferentes direcciones respecto al viento.',
                description_en: 'Navigate with the body in different directions relative to the wind.',
            },
            {
                id: 'skill-2-3',
                name_es: 'Body drag upwind',
                name_en: 'Upwind body drag',
                description_es: 'Técnica crítica para recuperar la tabla: navegar contra el viento solo con el kite.',
                description_en: 'Critical technique for board recovery: navigate against the wind with just the kite.',
            },
            {
                id: 'skill-2-4',
                name_es: 'Introducción a la tabla',
                name_en: 'Board introduction',
                description_es: 'Primer contacto con la tabla: posición del cuerpo y pies.',
                description_en: 'First contact with the board: body and foot position.',
            },
        ],
        videos: [
            {
                id: 'vid-2-1',
                youtube_id: 'wsLt1ZXxXoI',
                title_es: 'Aumentos repentinos de viento — como evitarlos y manejarlos',
                title_en: 'Sudden wind increases — how to avoid and handle them',
                channel: 'Kitesurf College',
            },
            {
                id: 'vid-2-2',
                youtube_id: 'uocy0lVUaJY',
                title_es: 'Tutorial: Foul Hook, Miss Hook y Re-Hook',
                title_en: 'Foul Hook, Miss Hook and Re-Hook Tutorial',
                channel: 'Kitesurf College',
            },
        ],
    },
    {
        id: 'level-3',
        level: 3,
        name_es: 'Waterstart',
        name_en: 'Waterstart',
        description_es: 'El momento clave: levantarse del agua y dar tus primeras navegaciones.',
        description_en: 'The key moment: getting up from the water and your first rides.',
        icon: '🏄',
        color: '#1E5F8A', // deep-marine-600
        gradient: 'from-deep-marine-500 to-deep-marine-700',
        skills: [
            {
                id: 'skill-3-1',
                name_es: 'Técnica de waterstart',
                name_en: 'Waterstart technique',
                description_es: 'Levantarse del agua con la tabla usando la potencia del kite.',
                description_en: 'Get up from the water with the board using kite power.',
            },
            {
                id: 'skill-3-2',
                name_es: 'Primeras navegaciones',
                name_en: 'First rides',
                description_es: 'Mantener el equilibrio y navegar distancias cortas en línea recta.',
                description_en: 'Maintain balance and ride short distances in a straight line.',
            },
            {
                id: 'skill-3-3',
                name_es: 'Control de velocidad',
                name_en: 'Speed control',
                description_es: 'Regular la velocidad usando edge de la tabla y posición del kite.',
                description_en: 'Control speed using board edge and kite position.',
            },
            {
                id: 'skill-3-4',
                name_es: 'Paradas controladas',
                name_en: 'Controlled stops',
                description_es: 'Detenerse de forma segura y controlada.',
                description_en: 'Stop safely and in a controlled manner.',
            },
        ],
        videos: [
            {
                id: 'vid-3-1',
                youtube_id: '4nfy-5FZGJE',
                title_es: 'Waterstart — Tips esenciales (version actualizada)',
                title_en: 'Waterstart — Top Tips (updated version)',
                channel: 'Progression',
            },
            {
                id: 'vid-3-2',
                youtube_id: 'JlNpmAiPQIE',
                title_es: 'Waterstart — Tips esenciales',
                title_en: 'Waterstart — Top Tips',
                channel: 'Progression',
            },
            {
                id: 'vid-3-3',
                youtube_id: 'hyj7Lrk1Jds',
                title_es: 'Errores comunes en el waterstart y primeras navegaciones',
                title_en: 'Common mistakes in waterstarts & first runs',
                channel: 'Progression',
            },
        ],
    },
    {
        id: 'level-4',
        level: 4,
        name_es: 'Rider Independiente',
        name_en: 'Independent Rider',
        description_es: 'Navegación autónoma: ir y volver, transiciones y control total.',
        description_en: 'Autonomous riding: going and returning, transitions and total control.',
        icon: '🌊',
        color: '#FF6B35', // sand-gold
        gradient: 'from-deep-marine-600 to-sand-gold',
        skills: [
            {
                id: 'skill-4-1',
                name_es: 'Upwind riding',
                name_en: 'Upwind riding',
                description_es: 'Navegar contra el viento para volver al punto de partida.',
                description_en: 'Ride against the wind to return to the starting point.',
            },
            {
                id: 'skill-4-2',
                name_es: 'Transiciones (cambio de dirección)',
                name_en: 'Transitions (direction change)',
                description_es: 'Cambiar de dirección sin caer: jibe y transición abierta.',
                description_en: 'Change direction without falling: jibe and open transition.',
            },
            {
                id: 'skill-4-3',
                name_es: 'Self-rescue',
                name_en: 'Self-rescue',
                description_es: 'Volver a la orilla de forma segura en caso de emergencia.',
                description_en: 'Return to shore safely in case of emergency.',
            },
            {
                id: 'skill-4-4',
                name_es: 'Navegación en diferentes condiciones',
                name_en: 'Riding in different conditions',
                description_es: 'Adaptarse a diferentes intensidades de viento, olas y corrientes.',
                description_en: 'Adapt to different wind intensities, waves and currents.',
            },
        ],
        videos: [
            {
                id: 'vid-4-1',
                youtube_id: '0SJ-a_gffVs',
                title_es: 'Giro deslizado — cambio de direccion basico',
                title_en: 'Sliding Turn — basic direction change',
                channel: 'Progression',
            },
            {
                id: 'vid-4-2',
                youtube_id: 'MfbNHYNIUC0',
                title_es: 'Rueda de trucos — Transiciones e inspiracion',
                title_en: 'Trick Wheel — Transitions & inspiration',
                channel: 'Progression',
            },
        ],
    },
    {
        id: 'level-5',
        level: 5,
        name_es: 'Avanzado',
        name_en: 'Advanced',
        description_es: 'Primeros saltos y maniobras: pop, backroll y kiteloop.',
        description_en: 'First jumps and maneuvers: pop, backroll and kiteloop.',
        icon: '🚀',
        color: '#E85D2A', // sand-gold-600
        gradient: 'from-sand-gold to-sand-gold-700',
        skills: [
            {
                id: 'skill-5-1',
                name_es: 'Pop y saltos básicos',
                name_en: 'Pop and basic jumps',
                description_es: 'Técnica de pop para despegar del agua y primeros saltos.',
                description_en: 'Pop technique to take off from water and first jumps.',
            },
            {
                id: 'skill-5-2',
                name_es: 'Backroll',
                name_en: 'Backroll',
                description_es: 'Rotación hacia atrás en el aire — el salto más emblemático.',
                description_en: 'Backward rotation in the air — the most iconic jump.',
            },
            {
                id: 'skill-5-3',
                name_es: 'Kiteloop básico',
                name_en: 'Basic kiteloop',
                description_es: 'Hacer girar el kite 360° durante un salto para potencia extra.',
                description_en: 'Loop the kite 360° during a jump for extra power.',
            },
            {
                id: 'skill-5-4',
                name_es: 'Navegación switch (toeside)',
                name_en: 'Switch riding (toeside)',
                description_es: 'Navegar con el pie contrario adelante.',
                description_en: 'Ride with the opposite foot forward.',
            },
        ],
        videos: [
            {
                id: 'vid-5-1',
                youtube_id: 'udcdK6Fr6Rc',
                title_es: 'Saltos — Tips esenciales',
                title_en: 'Jumping — Top Tips',
                channel: 'Progression',
            },
            {
                id: 'vid-5-2',
                youtube_id: '976-5neat-A',
                title_es: 'Backroll — Tips esenciales',
                title_en: 'Back Rolls — Top Tips',
                channel: 'Progression',
            },
            {
                id: 'vid-5-3',
                youtube_id: 'cVUqcels4-M',
                title_es: 'Pop con pre-carga — Tecnica de despegue',
                title_en: 'Pre-Load Pop Take Off technique',
                channel: 'Kitesurf College',
            },
            {
                id: 'vid-5-4',
                youtube_id: 'ui1JuioIc5c',
                title_es: 'Kite Loop Late Backroll y todos los pasos de entrenamiento',
                title_en: 'Kite Loop Late Backroll & all training steps',
                channel: 'Kitesurf College',
            },
            {
                id: 'vid-5-5',
                youtube_id: '7tsSjtpdSLg',
                title_es: 'Cuando meter la barra al saltar',
                title_en: 'When to sheet the bar in when jumping',
                channel: 'Progression',
            },
        ],
    },
    {
        id: 'level-6',
        level: 6,
        name_es: 'Pro / Freestyle',
        name_en: 'Pro / Freestyle',
        description_es: 'Nivel competición: handle pass, unhooked tricks y coaching avanzado.',
        description_en: 'Competition level: handle pass, unhooked tricks and advanced coaching.',
        icon: '🏆',
        color: '#C4A052', // gold
        gradient: 'from-sand-gold-600 to-yellow-500',
        skills: [
            {
                id: 'skill-6-1',
                name_es: 'Handle pass',
                name_en: 'Handle pass',
                description_es: 'Pasar la barra por detrás de la espalda durante un salto.',
                description_en: 'Pass the bar behind the back during a jump.',
            },
            {
                id: 'skill-6-2',
                name_es: 'Unhooked tricks',
                name_en: 'Unhooked tricks',
                description_es: 'Maniobras sin estar enganchado al arnés — estilo freestyle puro.',
                description_en: 'Tricks without being hooked to the harness — pure freestyle style.',
            },
            {
                id: 'skill-6-3',
                name_es: 'Board-off tricks',
                name_en: 'Board-off tricks',
                description_es: 'Maniobras quitando la tabla en el aire.',
                description_en: 'Tricks removing the board mid-air.',
            },
            {
                id: 'skill-6-4',
                name_es: 'Competición y coaching',
                name_en: 'Competition and coaching',
                description_es: 'Preparación para competencias y desarrollo como instructor.',
                description_en: 'Competition preparation and instructor development.',
            },
        ],
        videos: [
            {
                id: 'vid-6-1',
                youtube_id: 'nbNFM7ZL5e4',
                title_es: 'Pop desenganchado (Unhooked) — Tips esenciales',
                title_en: 'Popping (Unhooked) — Top Tips',
                channel: 'Progression',
            },
            {
                id: 'vid-6-2',
                youtube_id: 'GuRsWppsFeE',
                title_es: 'F16 — Backroll desenganchado con Kiteloop',
                title_en: 'F16 — Unhooked Back Roll with a Kiteloop',
                channel: 'Progression',
            },
            {
                id: 'vid-6-3',
                youtube_id: 'aB7rtHYZLZs',
                title_es: 'S-Bend — Tips esenciales',
                title_en: 'S-Bend — Top Tips',
                channel: 'Progression',
            },
            {
                id: 'vid-6-4',
                youtube_id: '6hr3hBQsnvA',
                title_es: 'Surface Pass — Tips esenciales',
                title_en: 'Surface Pass — Top Tips',
                channel: 'Progression',
            },
        ],
    },
];

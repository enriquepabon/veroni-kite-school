export interface BlogArticle {
    slug: string;
    title: { es: string; en: string };
    description: { es: string; en: string };
    content: { es: string; en: string };
    image: string;
    date: string;
    author: string;
    tags: string[];
    readTime: number;
}

export const blogArticles: BlogArticle[] = [
    // ─── ARTÍCULO 1 ───────────────────────────────────────────────
    {
        slug: 'guia-aprender-kitesurf-colombia',
        title: {
            es: 'Guía Completa para Aprender Kitesurf en Colombia (2026)',
            en: 'Complete Guide to Learn Kitesurfing in Colombia (2026)',
        },
        description: {
            es: 'Todo lo que necesitas saber antes de tu primera clase: spots, precios reales, temporada de vientos y por qué Colombia se convirtió en el destino favorito de los kiters.',
            en: 'Everything you need to know before your first lesson: spots, real prices, wind season and why Colombia became the favorite destination for kiters.',
        },
        content: {
            es: `## Colombia no es solo café y salsa — también es viento

Si alguien me hubiera dicho hace cinco años que Colombia iba a recibir una fecha del GKA Kite World Tour, le habría dicho que estaba loco. Pero aquí estamos: Salinas del Rey, un pueblito de pescadores entre Cartagena y Barranquilla, fue sede oficial del campeonato mundial de freestyle en 2023, 2024 y 2025.

¿Qué pasó? Que el mundo descubrió lo que los locales ya sabían: la costa caribe colombiana tiene vientos brutales, agua caliente todo el año y precios que hacen llorar de alegría a cualquier europeo.

### Los números que importan

Antes de que te emociones, vamos a lo concreto:

- **Temporada principal:** Diciembre a abril (vientos de 20-35 nudos)
- **Segunda temporada:** Junio a agosto (15-25 nudos, más suave pero navegable)
- **Temperatura del agua:** 26-28°C todo el año. Sí, todo el año. Sin neopreno.
- **Precio promedio de clases:** $250.000-300.000 COP por hora privada (~$60-70 USD)
- **Paquete completo para principiantes:** Desde $350.000 COP (~$85 USD) por 3 horas

Compara eso con Tarifa (España) donde una hora cuesta €80-100, o Cabarete (República Dominicana) a $80-100 USD. Colombia es significativamente más accesible.

### Los spots que tienes que conocer

Colombia tiene más de 3.000 km de costa, pero los spots de kite se concentran en el Caribe norte:

**Salinas del Rey (Santa Verónica)** — El más completo. Bahía protegida con agua plana para principiantes, mar abierto con olas para los avanzados, y 80+ km de costa para downwinds épicos. Vientos de 20-35 nudos en temporada. A 2 horas de Cartagena y 1.5 de Barranquilla. Aquí fue el GKA World Tour.

**Cabo de la Vela (La Guajira)** — El más salvaje. Desierto que se encuentra con el mar. Vientos que no paran, literalmente: 25-35 nudos de diciembre a agosto. Pero es remoto, la infraestructura es básica y llegar toma 4-5 horas desde Santa Marta. Para kiters que buscan aventura pura.

**Puerto Velero** — A solo 10 km de Santa Verónica. Bahía con agua plana, ideal para principiantes. Vientos de 15-25 nudos, más suaves que Salinas. Buena opción si los nudos de Salinas te intimidan.

**Lago Calima (Valle del Cauca)** — El spot del interior. A 1.600 metros de altitud, con vientos térmicos constantes por las tardes. Diferente a todo lo demás — aquí haces kite en un lago rodeado de montañas.

### ¿Cuánto tiempo toma aprender de verdad?

Seamos honestos, porque hay mucho marketing engañoso en esta industria:

- **Primeras 3 horas:** Vas a aprender teoría de viento, seguridad, y a manejar el kite en tierra. Probablemente hagas body drag (dejarte arrastrar por el agua sin tabla). Te vas a sentir torpe. Es normal.
- **Horas 4-6:** Control del kite en agua, body drag upwind, y los primeros intentos con la tabla. Aquí es donde la mayoría se enamora o se frustra.
- **Horas 6-12:** Waterstart. El momento mágico donde te paras en la tabla y navegas tus primeros metros. Según la IKO, la mayoría de estudiantes lo logran entre las horas 6 y 12.
- **Horas 12-20:** Navegación independiente. Ir upwind (contra el viento) y volver al punto de salida sin ayuda.

**La verdad incómoda:** nadie se convierte en rider independiente en un fin de semana. Los que te prometen eso están mintiendo. Pero con 3-4 días de clases intensivas (12-16 horas), la mayoría de personas con buena condición física logran sus primeras navegaciones.

### ¿Por qué Colombia y no otro país?

Tres razones que no son negociables:

1. **Precio-calidad imbatible.** Una semana de clases intensivas en Colombia cuesta lo mismo que 2 días en Tarifa o Hawaii.
2. **Agua caliente 365 días.** En Europa necesitas un neopreno de 4mm que cuesta €200+. Aquí vas en boardshorts.
3. **El factor humano.** Los colombianos somos otra cosa. La hospitalidad, la comida, la cultura — aprender kite aquí es una experiencia completa, no solo un deporte.

### Tu siguiente paso

Si estás leyendo esto, probablemente ya tienes la curiosidad. No la dejes morir. [Reserva tu primera clase](/reservar) y descubre si el kite es para ti. Lo peor que puede pasar es que te diviertas.`,
            en: `## Colombia isn't just coffee and salsa — it's also wind

If someone had told me five years ago that Colombia would host a GKA Kite World Tour event, I would've called them crazy. But here we are: Salinas del Rey, a small fishing village between Cartagena and Barranquilla, has been an official venue for the freestyle world championship in 2023, 2024, and 2025.

What happened? The world discovered what locals already knew: Colombia's Caribbean coast has insane winds, warm water year-round, and prices that make any European weep with joy.

### The numbers that matter

Before you get too excited, let's get specific:

- **Main season:** December to April (20-35 knot winds)
- **Second season:** June to August (15-25 knots, softer but rideable)
- **Water temperature:** 26-28°C year-round. Yes, year-round. No wetsuit needed.
- **Average lesson price:** $60-70 USD per private hour
- **Complete beginner package:** From $85 USD for 3 hours

Compare that with Tarifa (Spain) where an hour costs €80-100, or Cabarete (Dominican Republic) at $80-100 USD. Colombia is significantly more affordable.

### The spots you need to know

Colombia has over 3,000 km of coastline, but the kite spots are concentrated on the northern Caribbean coast:

**Salinas del Rey (Santa Verónica)** — The most complete. Protected bay with flat water for beginners, open sea with waves for advanced riders, and 80+ km of coastline for epic downwinds. 20-35 knot winds in season. 2 hours from Cartagena, 1.5 from Barranquilla. This is where the GKA World Tour was held.

**Cabo de la Vela (La Guajira)** — The wildest. Desert meets ocean. Winds that literally don't stop: 25-35 knots from December to August. But it's remote, infrastructure is basic, and getting there takes 4-5 hours from Santa Marta. For kiters seeking pure adventure.

**Puerto Velero** — Just 10 km from Santa Verónica. Flat-water bay, ideal for beginners. 15-25 knot winds, gentler than Salinas. Good option if Salinas' knots intimidate you.

**Lago Calima (Valle del Cauca)** — The inland spot. At 1,600 meters altitude, with consistent thermal winds in the afternoons. Different from everything else — here you kite on a lake surrounded by mountains.

### How long does it actually take to learn?

Let's be honest, because there's a lot of misleading marketing in this industry:

- **First 3 hours:** You'll learn wind theory, safety, and kite handling on land. You'll probably do body drag (being pulled through the water without a board). You'll feel clumsy. That's normal.
- **Hours 4-6:** Kite control in water, upwind body drag, and first attempts with the board. This is where most people fall in love or get frustrated.
- **Hours 6-12:** Waterstart. The magic moment where you stand up on the board and ride your first meters. According to the IKO, most students achieve this between hours 6 and 12.
- **Hours 12-20:** Independent riding. Going upwind and returning to your starting point without help.

**The uncomfortable truth:** Nobody becomes an independent rider in a weekend. Anyone promising that is lying. But with 3-4 days of intensive lessons (12-16 hours), most people in good physical condition achieve their first rides.

### Why Colombia and not somewhere else?

Three non-negotiable reasons:

1. **Unbeatable value.** A week of intensive lessons in Colombia costs the same as 2 days in Tarifa or Hawaii.
2. **Warm water 365 days.** In Europe you need a 4mm wetsuit that costs €200+. Here you ride in boardshorts.
3. **The human factor.** Colombians are something else. The hospitality, the food, the culture — learning to kite here is a complete experience, not just a sport.

### Your next step

If you're reading this, you probably already have the curiosity. Don't let it die. [Book your first class](/reservar) and find out if kite is for you. The worst that can happen is you'll have fun.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-01',
        author: 'Veroni Kite',
        tags: ['kitesurf', 'colombia', 'principiantes', 'guía'],
        readTime: 10,
    },

    // ─── ARTÍCULO 2 ───────────────────────────────────────────────
    {
        slug: 'salinas-del-rey-mejor-spot-kite-colombia',
        title: {
            es: 'Salinas del Rey: Por Qué el Mundo Vino a Hacer Kite Aquí',
            en: 'Salinas del Rey: Why the World Came to Kite Here',
        },
        description: {
            es: 'La historia de cómo un pueblo de pescadores se convirtió en sede del campeonato mundial de kitesurf. Condiciones, viento, cómo llegar y dónde quedarse.',
            en: 'The story of how a fishing village became home to the kitesurf world championship. Conditions, wind, how to get there and where to stay.',
        },
        content: {
            es: `## De pueblo de pescadores a sede del campeonato mundial

Salinas del Rey no aparece en la mayoría de los mapas turísticos de Colombia. No tiene aeropuerto, no tiene centros comerciales, y hasta hace poco la carretera para llegar era un desafío en sí mismo. Pero tiene algo que no se puede comprar ni construir: viento. Mucho viento. El tipo de viento que hace que riders profesionales de todo el planeta se suban a un avión para venir aquí.

En 2023, cuando la GKA (Global Kitesports Association) anunció que Salinas del Rey sería sede de una fecha del Kite World Tour, muchos en la comunidad internacional preguntaron: "¿Dónde queda eso?" Hoy, después de tres años consecutivos recibiendo el campeonato, la pregunta cambió: "¿Cómo no lo descubrimos antes?"

### Lo que hace único a este lugar

Hay spots con buen viento en todo el mundo. Lo que hace especial a Salinas del Rey es la combinación de factores que rara vez se encuentran juntos:

**La bahía.** Salinas tiene una bahía natural protegida que crea condiciones de agua plana incluso cuando el viento sopla con fuerza. Para un principiante, esto es oro puro: puedes aprender sin que las olas te tumben cada 30 segundos. Para un freestyler, es una pista de baile perfecta.

**El mar abierto.** Sales de la bahía y el oleaje cambia completamente. Olas de 1-3 metros que son una delicia para wave riding. Dos mundos en el mismo spot.

**La costa.** 80+ kilómetros de playa continua hacia el suroeste. Los downwinds desde Salinas son legendarios — navegas con el viento a tu favor, recorriendo kilómetros de costa virgen, con el desierto de un lado y el Caribe del otro.

### El viento, en números reales

Estos no son datos de marketing. Son promedios basados en estaciones meteorológicas y reportes de la comunidad kiter:

| Mes | Viento promedio | Días navegables | Nivel recomendado |
|-----|----------------|-----------------|-------------------|
| Enero | 22-30 nudos | 25-28 | Todos los niveles |
| Febrero | 25-35 nudos | 26-28 | Intermedio+ (muy fuerte) |
| Marzo | 25-35 nudos | 25-28 | Intermedio+ (muy fuerte) |
| Abril | 20-28 nudos | 22-25 | Todos los niveles |
| Mayo | 12-20 nudos | 15-18 | Principiantes (suave) |
| Junio | 15-22 nudos | 18-22 | Todos los niveles |
| Julio | 15-25 nudos | 18-22 | Todos los niveles |
| Agosto | 12-20 nudos | 15-18 | Principiantes (suave) |
| Sep-Nov | 8-15 nudos | 8-12 | No recomendado |

**Dirección del viento:** Predominante del noreste (NE), lo que genera una condición side-onshore en la bahía — ideal para kitesurf porque el viento te empuja hacia la playa, no mar adentro.

### Cómo llegar (sin perderte)

**Desde Cartagena (Aeropuerto Rafael Núñez - CTG):**
Toma la vía hacia Barranquilla. En el peaje de Bayunca sigue derecho. Después del pueblo de Luruaco, busca el desvío hacia Juan de Acosta / Santa Verónica. Son aproximadamente 120 km, unas 2 horas sin tráfico. Con tráfico de temporada alta, pueden ser 3.

**Desde Barranquilla (Aeropuerto Ernesto Cortissoz):**
Toma la vía hacia Cartagena y desvía hacia Juan de Acosta / Santa Verónica. Son unos 80 km, hora y media aproximadamente.

**¿Necesitas transporte?** En Veroni Kite coordinamos tu transporte desde ambas ciudades. Solo [escríbenos](/reservar).

### Dónde quedarse

Salinas del Rey y Santa Verónica tienen opciones para todo presupuesto:

- **Hostales y posadas:** Desde $40.000-60.000 COP/noche (~$10-15 USD). Básicos pero limpios, cerca de la playa.
- **Cabañas frente al mar:** Desde $120.000-200.000 COP/noche (~$30-50 USD). La opción más popular entre kiters.
- **Casas de alquiler:** Para grupos, desde $300.000 COP/noche. Con cocina, terraza, y espacio para guardar equipo.

**Tip local:** Los mejores hospedajes se llenan rápido en temporada alta (dic-mar). Reserva con al menos 2 semanas de anticipación.

### La comunidad

Lo que más me gusta de Salinas no es el viento — es la gente. Hay una comunidad kiter que se ha formado orgánicamente. Locales que crecieron aquí y se enamoraron del deporte. Extranjeros que vinieron por una semana y llevan tres años viviendo aquí. Escuelas como la nuestra que nacieron del sueño de dos amigos de la infancia.

Cuando llegas a Salinas, no eres un turista más. Eres parte del spot. La gente te saluda, te dice dónde está mejor el viento hoy, te invita a una cerveza al atardecer. Esa es la magia que ningún folleto turístico puede capturar.

¿Listo para conocer Salinas? [Mira cómo llegar](/ubicacion) o [reserva tu clase](/reservar) con nosotros.`,
            en: `## From fishing village to world championship venue

Salinas del Rey doesn't appear on most Colombian tourist maps. It has no airport, no shopping malls, and until recently the road to get there was a challenge in itself. But it has something that can't be bought or built: wind. A lot of wind. The kind of wind that makes professional riders from around the planet get on a plane to come here.

In 2023, when the GKA (Global Kitesports Association) announced that Salinas del Rey would host a stop of the Kite World Tour, many in the international community asked: "Where is that?" Today, after three consecutive years hosting the championship, the question has changed: "How didn't we discover this sooner?"

### What makes this place unique

There are spots with good wind all over the world. What makes Salinas del Rey special is the combination of factors that are rarely found together:

**The bay.** Salinas has a natural protected bay that creates flat water conditions even when the wind blows hard. For a beginner, this is pure gold: you can learn without waves knocking you over every 30 seconds. For a freestyler, it's a perfect dance floor.

**The open sea.** Leave the bay and the swell changes completely. 1-3 meter waves that are a delight for wave riding. Two worlds in the same spot.

**The coastline.** 80+ kilometers of continuous beach towards the southwest. Downwinds from Salinas are legendary — you ride with the wind in your favor, covering kilometers of virgin coastline, with the desert on one side and the Caribbean on the other.

### Wind data, real numbers

These aren't marketing figures. They're averages based on weather stations and kiter community reports:

| Month | Average Wind | Rideable Days | Recommended Level |
|-------|-------------|---------------|-------------------|
| January | 22-30 knots | 25-28 | All levels |
| February | 25-35 knots | 26-28 | Intermediate+ (very strong) |
| March | 25-35 knots | 25-28 | Intermediate+ (very strong) |
| April | 20-28 knots | 22-25 | All levels |
| May | 12-20 knots | 15-18 | Beginners (light) |
| June | 15-22 knots | 18-22 | All levels |
| July | 15-25 knots | 18-22 | All levels |
| August | 12-20 knots | 15-18 | Beginners (light) |
| Sep-Nov | 8-15 knots | 8-12 | Not recommended |

**Wind direction:** Predominantly northeast (NE), creating a side-onshore condition in the bay — ideal for kitesurfing because the wind pushes you toward the beach, not out to sea.

### How to get there (without getting lost)

**From Cartagena (Rafael Núñez Airport - CTG):**
Take the road toward Barranquilla. At the Bayunca toll, continue straight. After the town of Luruaco, look for the turnoff toward Juan de Acosta / Santa Verónica. It's approximately 120 km, about 2 hours without traffic. With high-season traffic, it can be 3.

**From Barranquilla (Ernesto Cortissoz Airport):**
Take the road toward Cartagena and turn off toward Juan de Acosta / Santa Verónica. It's about 80 km, roughly an hour and a half.

**Need transportation?** At Veroni Kite we coordinate your transport from both cities. Just [write to us](/reservar).

### Where to stay

Salinas del Rey and Santa Verónica have options for every budget:

- **Hostels and guesthouses:** From $10-15 USD/night. Basic but clean, close to the beach.
- **Beachfront cabins:** From $30-50 USD/night. The most popular option among kiters.
- **Rental houses:** For groups, from $75 USD/night. With kitchen, terrace, and space to store equipment.

**Local tip:** The best accommodations fill up fast in high season (Dec-Mar). Book at least 2 weeks in advance.

### The community

What I like most about Salinas isn't the wind — it's the people. There's a kite community that has formed organically. Locals who grew up here and fell in love with the sport. Foreigners who came for a week and have been living here for three years. Schools like ours that were born from the dream of two childhood friends.

When you arrive in Salinas, you're not just another tourist. You're part of the spot. People greet you, tell you where the wind is best today, invite you for a beer at sunset. That's the magic that no tourist brochure can capture.

Ready to visit Salinas? [See how to get there](/ubicacion) or [book your class](/reservar) with us.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-05',
        author: 'Veroni Kite',
        tags: ['salinas del rey', 'spot', 'GKA', 'colombia'],
        readTime: 9,
    },

    // ─── ARTÍCULO 3 ───────────────────────────────────────────────
    {
        slug: 'certificacion-iko-que-es-por-que-importa',
        title: {
            es: '¿Qué es la Certificación IKO? (Y Por Qué Debería Importarte)',
            en: 'What is IKO Certification? (And Why You Should Care)',
        },
        description: {
            es: 'La certificación IKO es tu seguro de vida en el kitesurf. Qué es, cómo funciona el Kite Card, y por qué nunca deberías tomar clases con alguien no certificado.',
            en: 'IKO certification is your life insurance in kitesurfing. What it is, how the Kite Card works, and why you should never take lessons from someone uncertified.',
        },
        content: {
            es: `## La diferencia entre aprender bien y aprender a sobrevivir

Voy a ser directo: el kitesurf puede ser peligroso. Un kite de 12 metros cuadrados genera una fuerza brutal — suficiente para levantarte del suelo y lanzarte 10 metros si no sabes lo que haces. Esto no lo digo para asustarte, lo digo para que entiendas por qué la persona que te enseña importa tanto.

La IKO (International Kiteboarding Organization) existe exactamente para esto. Es el organismo mundial que certifica que un instructor sabe lo que hace, y que una escuela cumple con estándares mínimos de seguridad.

### IKO en números

- **Fundada en:** 2001
- **Instructores certificados:** Más de 50.000 en todo el mundo
- **Centros certificados:** Más de 300 en 60+ países
- **Estudiantes certificados:** Millones con su Kite Card

### Niveles de instructor IKO

No todos los instructores IKO son iguales. Hay una jerarquía:

**Instructor Nivel 1:** El punto de entrada. Puede enseñar principiantes las bases del kite en tierra y los primeros pasos en agua. Para obtenerlo, debes pasar un curso intensivo de formación y evaluación.

**Instructor Nivel 2:** Requiere haber enseñado mínimo 35 estudiantes y 280 horas de instrucción registradas. Puede enseñar hasta waterstart y navegación básica.

**Instructor Nivel 3:** El nivel senior. Mínimo 125 estudiantes y 1.000 horas de enseñanza. Puede enseñar todos los niveles y formar a otros instructores.

**Instructor Nivel 4:** El nivel máximo. Examinador que certifica a otros instructores.

### Tu Kite Card: el pasaporte del kiter

Cuando tomas clases en una escuela IKO, no solo aprendes — obtienes una certificación oficial que se registra en el sistema global de la IKO. Es tu **Kite Card**, y funciona como un pasaporte:

- Registra tu nivel actual (del 1 al 5 como estudiante)
- Es reconocida en cualquier escuela IKO del mundo
- Se puede consultar digitalmente desde la app IKOintl
- Si viajas a otro país y quieres seguir tomando clases, el instructor nuevo sabe exactamente en qué nivel estás

Esto elimina el problema clásico de "ya sé un poco" donde pierdes tiempo y dinero repitiendo cosas que ya dominaste.

### Los niveles de estudiante IKO

| Nivel | Nombre | Lo que dominas |
|-------|--------|----------------|
| 1 | Discovery | Manejo del kite en tierra, body drag, seguridad |
| 2 | Intermediate | Waterstart, navegación básica en ambas direcciones |
| 3 | Independent | Navegas solo, vas upwind, vuelves a tu punto de salida |
| 4 | Advanced | Saltos, transiciones, maniobras técnicas |
| 5 | Expert | Freestyle completo, nivel de competición |

### Por qué NO deberías aprender con tu amigo

Lo escucho todo el tiempo: "Mi amigo hace kite, me va a enseñar." Es la peor idea posible, y no lo digo por vender clases. Lo digo porque:

1. **Tu amigo no sabe enseñar.** Saber hacer kite y saber enseñar kite son habilidades completamente diferentes. Un instructor IKO pasó por formación específica en pedagogía del kitesurf.

2. **Los malos hábitos son difíciles de corregir.** Según la IKO, estudiantes que aprenden sin instrucción profesional son tres veces más propensos a sufrir accidentes serios.

3. **No conoce los protocolos de seguridad.** ¿Sabe tu amigo hacer un self-rescue en mar abierto? ¿Sabe cómo actuar si el kite se enreda en las líneas? ¿Sabe evaluar si las condiciones son seguras para tu nivel?

4. **Tu amigo no tiene seguro.** Si algo sale mal, no hay cobertura de responsabilidad civil.

### En Veroni Kite

Todos nuestros instructores están certificados IKO. Al terminar tu curso, recibes tu Kite Card oficial. Si después viajas a Brasil, España o Indonesia y quieres seguir tu progresión, cualquier escuela IKO sabe exactamente dónde retomar.

[Reserva tu clase](/reservar) con instructores certificados. Tu seguridad no es negociable.`,
            en: `## The difference between learning well and learning to survive

I'll be direct: kitesurfing can be dangerous. A 12-square-meter kite generates brutal force — enough to lift you off the ground and launch you 10 meters if you don't know what you're doing. I'm not saying this to scare you; I'm saying it so you understand why the person teaching you matters so much.

The IKO (International Kiteboarding Organization) exists exactly for this. It's the global body that certifies that an instructor knows what they're doing, and that a school meets minimum safety standards.

### IKO by the numbers

- **Founded:** 2001
- **Certified instructors:** Over 50,000 worldwide
- **Certified centers:** Over 300 in 60+ countries
- **Certified students:** Millions with their Kite Card

### IKO instructor levels

Not all IKO instructors are equal. There's a hierarchy:

**Level 1 Instructor:** The entry point. Can teach beginners the basics of kite handling on land and first steps in water. To earn it, you must pass an intensive training and evaluation course.

**Level 2 Instructor:** Requires having taught at least 35 students and 280 registered teaching hours. Can teach up to waterstart and basic navigation.

**Level 3 Instructor:** The senior level. Minimum 125 students and 1,000 teaching hours. Can teach all levels and train other instructors.

**Level 4 Instructor:** The maximum level. Examiner who certifies other instructors.

### Your Kite Card: the kiter's passport

When you take lessons at an IKO school, you don't just learn — you get an official certification registered in the IKO global system. It's your **Kite Card**, and it works like a passport:

- Records your current level (1 to 5 as a student)
- Recognized at any IKO school in the world
- Can be checked digitally from the IKOintl app
- If you travel to another country and want to continue lessons, the new instructor knows exactly what level you're at

This eliminates the classic "I already know a bit" problem where you waste time and money repeating things you've already mastered.

### IKO student levels

| Level | Name | What you master |
|-------|------|-----------------|
| 1 | Discovery | Kite handling on land, body drag, safety |
| 2 | Intermediate | Waterstart, basic navigation in both directions |
| 3 | Independent | Solo riding, going upwind, returning to starting point |
| 4 | Advanced | Jumps, transitions, technical maneuvers |
| 5 | Expert | Full freestyle, competition level |

### Why you should NOT learn from your friend

I hear it all the time: "My friend kites, they'll teach me." It's the worst possible idea, and I'm not saying this to sell lessons. I'm saying it because:

1. **Your friend doesn't know how to teach.** Knowing how to kite and knowing how to teach kite are completely different skills. An IKO instructor went through specific training in kitesurf pedagogy.

2. **Bad habits are hard to correct.** According to the IKO, students who learn without professional instruction are three times more likely to suffer serious accidents.

3. **They don't know safety protocols.** Does your friend know how to do a self-rescue in open water? Do they know what to do if the kite tangles in the lines? Can they assess whether conditions are safe for your level?

4. **Your friend doesn't have insurance.** If something goes wrong, there's no liability coverage.

### At Veroni Kite

All our instructors are IKO certified. When you finish your course, you receive your official Kite Card. If you later travel to Brazil, Spain, or Indonesia and want to continue your progression, any IKO school knows exactly where to pick up.

[Book your class](/reservar) with certified instructors. Your safety is non-negotiable.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-08',
        author: 'Veroni Kite',
        tags: ['IKO', 'certificación', 'seguridad', 'instructores'],
        readTime: 7,
    },

    // ─── ARTÍCULO 4 ───────────────────────────────────────────────
    {
        slug: 'temporada-vientos-salinas-del-rey',
        title: {
            es: 'Temporada de Vientos en Salinas del Rey: Cuándo Venir (Mes por Mes)',
            en: 'Wind Season in Salinas del Rey: When to Come (Month by Month)',
        },
        description: {
            es: 'Análisis mes por mes de las condiciones de viento en Salinas del Rey. Cuándo hay más viento, cuándo es mejor para principiantes, y cuándo no vale la pena venir.',
            en: 'Month-by-month analysis of wind conditions in Salinas del Rey. When there is more wind, when it is best for beginners, and when it is not worth coming.',
        },
        content: {
            es: `## No todos los meses son iguales

La pregunta que más nos hacen: "¿Cuándo es la mejor época para ir?" Y la respuesta honesta es: depende de quién eres.

Si eres principiante, los meses con viento nuclear de febrero y marzo no son necesariamente tu mejor opción. Si eres rider avanzado buscando viento fuerte garantizado, septiembre es una pérdida de tiempo. Vamos mes por mes.

### Los vientos alisios del noreste

Antes de los datos, un poco de contexto. El viento en la costa caribe colombiana viene de los **alisios del noreste** — corrientes de aire que soplan desde el Atlántico Norte hacia el ecuador. Son los mismos vientos que llenan los spots del Caribe desde Aruba hasta República Dominicana.

En Salinas del Rey, estos vientos llegan con dirección NE, creando una condición **side-onshore** en la bahía principal. Esto significa que el viento sopla ligeramente hacia la playa — perfecto para kite porque si algo sale mal, el viento te acerca a tierra en vez de alejarte.

### Mes por mes: la guía honesta

**Diciembre** — El arranque. Los alisios empiezan a consolidarse a mediados de mes. Espera 18-25 nudos con días puntuales de 30+. Es un buen mes: buen viento sin ser excesivo, y la temperatura es perfecta. Hay bastante gente por vacaciones.

**Enero** — Temporada alta. 22-30 nudos promedio, con rachas de hasta 35. Días navegables: 25-28 al mes. Excelente para todos los niveles. Si eres principiante, el viento es manejable con kites pequeños.

**Febrero y Marzo** — Los meses bestia. 25-35 nudos consistentes. Hay días donde sopla tan fuerte que hasta los riders experimentados salen con kites de 7-9 metros. Si eres principiante, puedes aprender pero tu instructor va a elegir horarios estratégicos (temprano en la mañana cuando el viento aún no está al máximo). Es cuando se celebra el GKA World Tour.

**Abril** — El sweet spot. El viento baja un poco: 20-28 nudos. Menos gente, precios más accesibles, y condiciones perfectas para aprender. Mi mes favorito para enseñar principiantes.

**Mayo** — Transición. El viento cae a 12-20 nudos. Algunos días navegas, otros no. Si solo vienes por kite, es una apuesta.

**Junio y Julio** — La segunda temporada. Los alisios regresan con 15-25 nudos. No tan fuerte como enero-marzo, pero suficiente para navegar la mayoría de días. Menos turistas, spot más tranquilo. Excelente para principiantes.

**Agosto** — Similar a mayo. 12-20 nudos, inconsistente. Hay días buenos pero no es garantía.

**Septiembre a Noviembre** — Temporada baja. 8-15 nudos con muchos días sin viento. Lluvias más frecuentes. No vale la pena venir específicamente para kite, pero si estás de paseo por la zona, siempre puedes tener suerte con un día bueno.

### ¿Cuándo venir si eres principiante?

Mi recomendación: **abril, junio o julio**. Viento suficiente para aprender pero no tan brutal como para frustrar. Menos gente en el agua (importante cuando estás aprendiendo). Y precios de alojamiento más bajos.

Si solo puedes venir en temporada alta (dic-mar), no hay problema — simplemente tus clases se programarán en los horarios con viento más suave.

### ¿Cuándo venir si eres rider experimentado?

**Febrero o marzo.** Sin duda. Viento garantizado, olas afuera, y la posibilidad de hacer downwinds épicos con 30+ nudos a tu favor.

[Consulta disponibilidad](/reservar) para la fecha que más te conviene.`,
            en: `## Not all months are created equal

The question we get asked most: "When's the best time to go?" And the honest answer is: it depends on who you are.

If you're a beginner, the nuclear-wind months of February and March aren't necessarily your best bet. If you're an advanced rider looking for guaranteed strong wind, September is a waste of time. Let's go month by month.

### The northeast trade winds

Before the data, some context. Wind on Colombia's Caribbean coast comes from the **northeast trade winds** — air currents that blow from the North Atlantic toward the equator. They're the same winds that power spots across the Caribbean from Aruba to the Dominican Republic.

In Salinas del Rey, these winds arrive from the NE, creating a **side-onshore** condition in the main bay. This means the wind blows slightly toward the beach — perfect for kiting because if something goes wrong, the wind pushes you toward land instead of away from it.

### Month by month: the honest guide

**December** — The start. Trade winds begin consolidating mid-month. Expect 18-25 knots with occasional 30+ days. It's a good month: solid wind without being excessive, and the temperature is perfect. Quite busy due to holidays.

**January** — High season. 22-30 knot average, with gusts up to 35. Rideable days: 25-28 per month. Excellent for all levels. If you're a beginner, the wind is manageable with smaller kites.

**February and March** — The beast months. 25-35 knots consistent. There are days where it blows so hard that even experienced riders go out with 7-9 meter kites. If you're a beginner, you can still learn but your instructor will choose strategic times (early morning when the wind hasn't peaked yet). This is when the GKA World Tour is held.

**April** — The sweet spot. Wind drops a bit: 20-28 knots. Fewer people, more affordable prices, and perfect conditions for learning. My favorite month for teaching beginners.

**May** — Transition. Wind drops to 12-20 knots. Some days you ride, others you don't. If you're coming only for kite, it's a gamble.

**June and July** — The second season. Trade winds return with 15-25 knots. Not as strong as January-March, but enough to ride most days. Fewer tourists, quieter spot. Excellent for beginners.

**August** — Similar to May. 12-20 knots, inconsistent. Good days happen but no guarantee.

**September to November** — Low season. 8-15 knots with many windless days. More frequent rain. Not worth coming specifically for kite, but if you're in the area, you can always get lucky with a good day.

### When to come if you're a beginner?

My recommendation: **April, June, or July.** Enough wind to learn but not so brutal as to frustrate you. Fewer people on the water (important when learning). And lower accommodation prices.

If you can only come during high season (Dec-Mar), no problem — your lessons will simply be scheduled during the gentler wind hours.

### When to come if you're an experienced rider?

**February or March.** Without question. Guaranteed wind, waves outside, and the chance to do epic downwinds with 30+ knots at your back.

[Check availability](/reservar) for the date that suits you best.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-10',
        author: 'Veroni Kite',
        tags: ['viento', 'temporada', 'salinas del rey', 'clima'],
        readTime: 7,
    },

    // ─── ARTÍCULO 5 ───────────────────────────────────────────────
    {
        slug: 'cuanto-cuesta-aprender-kitesurf-precios-2026',
        title: {
            es: '¿Cuánto Cuesta Aprender Kitesurf? Guía de Precios 2026',
            en: 'How Much Does It Cost to Learn Kitesurfing? 2026 Price Guide',
        },
        description: {
            es: 'Desglose honesto de todos los costos: clases, equipo, viaje y gastos ocultos. Comparación de precios Colombia vs otros destinos.',
            en: 'Honest breakdown of all costs: lessons, equipment, travel and hidden expenses. Price comparison Colombia vs other destinations.',
        },
        content: {
            es: `## La pregunta del millón (literalmente)

"¿Cuánto me va a salir esto?" Es lo primero que pregunta todo el mundo, y es justo. El kitesurf tiene fama de ser un deporte caro, y no voy a mentirte: no es el más barato. Pero tampoco es lo que muchos piensan. Vamos a desglosar todo.

### Costo de las clases (lo que pagas para aprender)

Esto varía enormemente según el país. Aquí va la comparación real:

| Destino | Precio/hora privada | Paquete principiante (~10h) |
|---------|--------------------|-----------------------------|
| **Colombia (Salinas del Rey)** | $60-70 USD | $350-600 USD |
| República Dominicana (Cabarete) | $80-100 USD | $700-900 USD |
| España (Tarifa) | €80-100 | €700-1.000 |
| Brasil (Cumbuco) | $70-90 USD | $600-800 USD |
| México (Cancún/Progreso) | $80-100 USD | $700-900 USD |
| Tailandia (Hua Hin) | $60-80 USD | $500-700 USD |

**Colombia es de los destinos más accesibles del mundo**, y con condiciones de primer nivel (literal: sede del campeonato mundial).

### En Veroni Kite, nuestros precios

- **Descubrimiento (3h):** $350.000 COP (~$85 USD) — Tu primer contacto con el kite.
- **Control de Kite (6h):** $650.000 COP (~$160 USD) — Dominas el kite en agua.
- **Waterstart (9h):** $900.000 COP (~$220 USD) — Tus primeras navegaciones.
- **Navegación Independiente (12h):** $1.200.000 COP (~$295 USD) — Sales solo.

Todos incluyen equipo completo, instructor certificado IKO, y tu Kite Card.

### ¿Y si después quiero mi propio equipo?

Aquí es donde el kitesurf se pone serio. Un kit completo nuevo:

| Componente | Precio nuevo | Precio usado |
|-----------|-------------|-------------|
| Kite (necesitas mínimo 2 tamaños) | $1.000-1.800 USD c/u | $400-800 USD c/u |
| Tabla (twintip) | $300-600 USD | $150-300 USD |
| Arnés | $150-300 USD | $75-150 USD |
| Barra y líneas | $300-500 USD | $150-250 USD |
| Bomba | $30-50 USD | — |

**Total nuevo:** $2.800-5.000 USD
**Total usado (buen estado):** $1.200-2.500 USD

**Mi consejo:** NO compres equipo hasta que hayas terminado al menos el nivel 3 (waterstart) y sepas que esto es lo tuyo. Muchas personas compran equipo emocionados después de la primera clase y luego no lo usan. Primero aprende, después invierte.

### Los costos ocultos que nadie te dice

- **Protector solar resistente al agua:** Vas a gastar más en protector solar de lo que imaginas. Compra SPF 50+ y aplica cada 2 horas. ~$15-20 USD/semana.
- **Gafas de sol con cinta:** Las normales se caen al agua y se pierden. Compra unas con cinta de neopreno. ~$20-40 USD.
- **Rash guard / lycra UV:** Imprescindible si no quieres quemarte. ~$25-50 USD.
- **Transporte al spot:** Si no tienes vehículo propio, taxis/transporte desde Cartagena o Barranquilla. ~$30-50 USD ida y vuelta.

### El costo real de una semana aprendiendo kite en Colombia

Hagamos las cuentas completas para una semana en Salinas del Rey:

| Concepto | Costo estimado |
|----------|---------------|
| Vuelo a Cartagena (desde Bogotá) | $100-200.000 COP ($25-50 USD) |
| Transporte CTG → Salinas | $60.000 COP ($15 USD) |
| Alojamiento 7 noches (cabaña) | $840.000-1.400.000 COP ($200-350 USD) |
| Curso Waterstart (9h) | $900.000 COP ($220 USD) |
| Comida 7 días | $350.000-500.000 COP ($85-125 USD) |
| Extras (protector solar, etc.) | $100.000 COP ($25 USD) |
| **TOTAL** | **$2.350.000-3.160.000 COP ($575-785 USD)** |

**Menos de $800 USD por una semana completa aprendiendo kitesurf en el Caribe colombiano.** Intenta eso en Europa.

[Reserva tu curso](/reservar) y empieza a planear tu viaje.`,
            en: `## The million-dollar question (literally)

"How much is this going to cost me?" It's the first thing everyone asks, and rightly so. Kitesurfing has a reputation for being an expensive sport, and I won't lie: it's not the cheapest. But it's also not what many people think. Let's break it all down.

### Cost of lessons (what you pay to learn)

This varies enormously by country. Here's the real comparison:

| Destination | Price/private hour | Beginner package (~10h) |
|------------|-------------------|------------------------|
| **Colombia (Salinas del Rey)** | $60-70 USD | $350-600 USD |
| Dominican Republic (Cabarete) | $80-100 USD | $700-900 USD |
| Spain (Tarifa) | €80-100 | €700-1,000 |
| Brazil (Cumbuco) | $70-90 USD | $600-800 USD |
| Mexico (Cancún/Progreso) | $80-100 USD | $700-900 USD |
| Thailand (Hua Hin) | $60-80 USD | $500-700 USD |

**Colombia is one of the most affordable destinations in the world**, with top-tier conditions (literally: world championship venue).

### At Veroni Kite, our prices

- **Discovery (3h):** ~$85 USD — Your first contact with the kite.
- **Kite Control (6h):** ~$160 USD — Master the kite in water.
- **Waterstart (9h):** ~$220 USD — Your first rides.
- **Independent Navigation (12h):** ~$295 USD — Ride solo.

All include full equipment, IKO-certified instructor, and your Kite Card.

### What if I want my own equipment later?

This is where kitesurfing gets serious. A complete new kit:

| Component | New price | Used price |
|----------|----------|-----------|
| Kite (need at least 2 sizes) | $1,000-1,800 USD each | $400-800 USD each |
| Board (twintip) | $300-600 USD | $150-300 USD |
| Harness | $150-300 USD | $75-150 USD |
| Bar and lines | $300-500 USD | $150-250 USD |
| Pump | $30-50 USD | — |

**Total new:** $2,800-5,000 USD
**Total used (good condition):** $1,200-2,500 USD

**My advice:** DO NOT buy equipment until you've completed at least level 3 (waterstart) and you know this is your thing. Many people buy gear excited after their first class and then never use it. First learn, then invest.

### Hidden costs nobody tells you about

- **Water-resistant sunscreen:** You'll spend more on sunscreen than you imagine. Buy SPF 50+ and reapply every 2 hours. ~$15-20 USD/week.
- **Sunglasses with strap:** Regular ones fall in the water and are lost forever. Buy ones with a neoprene strap. ~$20-40 USD.
- **Rash guard / UV lycra:** Essential if you don't want to get burned. ~$25-50 USD.
- **Transport to the spot:** If you don't have your own vehicle, taxis/transport from Cartagena or Barranquilla. ~$30-50 USD round trip.

### The real cost of a week learning kite in Colombia

Let's do the complete math for a week in Salinas del Rey:

| Item | Estimated cost |
|------|---------------|
| Flight to Cartagena (from Bogotá) | $25-50 USD |
| Transport CTG → Salinas | $15 USD |
| Accommodation 7 nights (cabin) | $200-350 USD |
| Waterstart course (9h) | $220 USD |
| Food 7 days | $85-125 USD |
| Extras (sunscreen, etc.) | $25 USD |
| **TOTAL** | **$575-785 USD** |

**Less than $800 USD for a complete week learning kitesurfing in the Colombian Caribbean.** Try that in Europe.

[Book your course](/reservar) and start planning your trip.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-12',
        author: 'Veroni Kite',
        tags: ['precios', 'costos', 'principiantes', 'equipo'],
        readTime: 8,
    },

    // ─── ARTÍCULO 6 ───────────────────────────────────────────────
    {
        slug: 'errores-principiantes-kitesurf',
        title: {
            es: '7 Errores que Todo Principiante Comete en Kitesurf (Y Cómo Evitarlos)',
            en: '7 Mistakes Every Beginner Makes in Kitesurfing (And How to Avoid Them)',
        },
        description: {
            es: 'Los errores más comunes que vemos todos los días en la playa. Algunos son graciosos, otros son peligrosos. Todos son evitables.',
            en: 'The most common mistakes we see on the beach every day. Some are funny, others are dangerous. All are avoidable.',
        },
        content: {
            es: `## Después de miles de estudiantes, los patrones se repiten

Llevamos años enseñando kitesurf en Salinas del Rey y hay errores que vemos una y otra vez. No te sientas mal si reconoces alguno — todos los hemos cometido. La diferencia es que tú puedes evitarlos antes de pisarla playa.

### Error #1: Intentar aprender solo (o con un amigo)

Este es el error más peligroso y el más común. "Mi amigo me enseña" o "vi tutoriales en YouTube" son frases que escuchamos semanalmente. Los datos de la IKO son claros: los autodidactas tienen tres veces más probabilidades de sufrir accidentes graves.

El kite no es como la bicicleta. Es un deporte donde una decisión equivocada puede mandarte volando contra una palmera. Literalmente. Un instructor certificado sabe leer las condiciones, elegir el kite correcto para tu peso y el viento del día, y reaccionar si algo sale mal.

**Cómo evitarlo:** Toma clases profesionales. Punto. No hay atajo para esto.

### Error #2: Elegir el kite equivocado para las condiciones

Principiantes que ven a un rider avanzado con un kite enorme y piensan que más grande = mejor. O peor: alguien que compró equipo usado sin entender las tallas.

Un kite demasiado grande con mucho viento es una receta para el desastre. Un kite demasiado pequeño con poco viento es una pérdida de tiempo frustrante.

**Cómo evitarlo:** Tu instructor elige el kite por ti durante las clases. Cuando seas independiente, aprende la tabla de tallas: un rider de 75 kg en 20 nudos necesita un kite de ~10-12m². En 30 nudos, baja a 7-9m².

### Error #3: Ignorar el chequeo de seguridad prevuelo

Las ganas de entrar al agua son enormes. Pero saltarte el chequeo del equipo es como no ponerte el cinturón de seguridad en el carro. El 90% del tiempo no pasa nada. El otro 10% puede ser grave.

**Cómo evitarlo:** Antes de cada sesión, revisa: líneas sin nudos ni desgaste, chicken loop funcionando, sistema de seguridad desbloqueado, leash conectado. Son 2 minutos que pueden salvarte horas en el hospital.

### Error #4: Ir a un spot que no es para tu nivel

Hay una razón por la que Salinas del Rey es ideal para aprender: bahía protegida, agua plana, viento side-onshore. Pero algunos principiantes se entusiasman y van directo al mar abierto, o eligen un spot con corrientes fuertes, obstáculos (rocas, barcos), o viento offshore (que te aleja de la costa).

**Cómo evitarlo:** Pregunta siempre a los locales. Si no conoces un spot, no te metas solo. Los primeros meses, quédate en spots con agua plana, poca profundidad y viento que te empuje hacia la playa.

### Error #5: Querer saltar antes de saber navegar

Lo entiendo perfectamente: los videos de kite son 90% saltos espectaculares. Es tentador intentar despegar del agua apenas puedes mantener el equilibrio. Pero saltar sin dominar la navegación básica es como intentar hacer un wheelie sin saber andar en bicicleta.

**Cómo evitarlo:** Sigue la progresión. Primero navega upwind. Luego transiciones. Luego velocidad. Los saltos llegan naturalmente cuando tu cuerpo ya tiene la memoria muscular necesaria. Nuestro [Road Map](/roadmap) existe exactamente para esto.

### Error #6: Subestimar el sol

No es un error de kitesurf técnicamente, pero es el que más dolor causa. Estás en el agua, hay brisa, no sientes calor... y después de 3 horas pareces una langosta. En el Caribe colombiano, el índice UV llega a 11+ (extremo). La reflexión del agua duplica la exposición.

**Cómo evitarlo:** SPF 50+ resistente al agua, aplicado 30 minutos antes de entrar y reaplicado cada 2 horas. Lycra con protección UV. Gorro o gorra con cinta cuando no estés en el agua.

### Error #7: No pedir ayuda para lanzar y aterrizar el kite

Lanzar y aterrizar el kite son los momentos más peligrosos de una sesión. El kite está al máximo de su potencia y tú estás en tierra firme (donde los golpes duelen más). Muchos principiantes intentan hacerlo solos o con alguien que no sabe cómo asistir.

**Cómo evitarlo:** Siempre pide ayuda a otro kiter o a tu instructor. Asegúrate de que la persona que te asiste sepa qué hacer — si no, enséñale antes. En Salinas del Rey la comunidad es genial con esto: cualquier kiter en la playa te ayuda con gusto.

### El error bonus: rendirse demasiado pronto

El kitesurf tiene una curva de aprendizaje empinada al principio. Las primeras horas pueden ser frustrantes. Vas a tragar agua. El kite se te va a caer. Te van a doler músculos que no sabías que existían.

Pero si pasas esa barrera inicial, lo que viene después es adictivo. El momento en que haces tu primer waterstart — cuando te levantas en la tabla y el viento te lleva — es una de las sensaciones más increíbles que puedes experimentar.

No te rindas en las primeras 3 horas. Dale al menos 6. Si después de eso no es para ti, perfecto. Pero dale la oportunidad.

[Reserva tu clase](/reservar) y evita estos errores desde el día uno.`,
            en: `## After thousands of students, the patterns repeat

We've been teaching kitesurfing in Salinas del Rey for years and there are mistakes we see over and over. Don't feel bad if you recognize some — we've all made them. The difference is you can avoid them before hitting the beach.

### Mistake #1: Trying to learn alone (or with a friend)

This is the most dangerous and most common mistake. "My friend will teach me" or "I watched YouTube tutorials" are phrases we hear weekly. IKO data is clear: self-learners are three times more likely to suffer serious accidents.

Kiting isn't like cycling. It's a sport where one wrong decision can send you flying into a palm tree. Literally. A certified instructor knows how to read conditions, choose the right kite for your weight and the day's wind, and react if something goes wrong.

**How to avoid it:** Take professional lessons. Period. There's no shortcut for this.

### Mistake #2: Choosing the wrong kite for conditions

Beginners who see an advanced rider with a huge kite and think bigger = better. Or worse: someone who bought used equipment without understanding sizes.

A kite that's too big in strong wind is a recipe for disaster. A kite that's too small in light wind is a frustrating waste of time.

**How to avoid it:** Your instructor chooses the kite for you during lessons. When you're independent, learn the size chart: a 75 kg rider in 20 knots needs a ~10-12m² kite. In 30 knots, drop to 7-9m².

### Mistake #3: Skipping the pre-flight safety check

The urge to hit the water is enormous. But skipping the equipment check is like not wearing your seatbelt. 90% of the time nothing happens. The other 10% can be serious.

**How to avoid it:** Before every session, check: lines without knots or wear, chicken loop working, safety system unlocked, leash connected. It's 2 minutes that can save you hours in the hospital.

### Mistake #4: Going to a spot that's not right for your level

There's a reason Salinas del Rey is ideal for learning: protected bay, flat water, side-onshore wind. But some beginners get excited and head straight to open sea, or choose a spot with strong currents, obstacles (rocks, boats), or offshore wind (which takes you away from shore).

**How to avoid it:** Always ask the locals. If you don't know a spot, don't go in alone. For the first months, stick to flat-water spots with shallow depth and wind that pushes you toward the beach.

### Mistake #5: Wanting to jump before knowing how to ride

I completely understand: kite videos are 90% spectacular jumps. It's tempting to try taking off as soon as you can keep your balance. But jumping without mastering basic navigation is like trying to wheelie without knowing how to ride a bike.

**How to avoid it:** Follow the progression. First ride upwind. Then transitions. Then speed. Jumps come naturally when your body has the necessary muscle memory. Our [Road Map](/roadmap) exists exactly for this.

### Mistake #6: Underestimating the sun

It's not technically a kitesurfing mistake, but it causes the most pain. You're on the water, there's a breeze, you don't feel hot... and after 3 hours you look like a lobster. In the Colombian Caribbean, the UV index reaches 11+ (extreme). Water reflection doubles the exposure.

**How to avoid it:** SPF 50+ water-resistant sunscreen, applied 30 minutes before entering and reapplied every 2 hours. UV-protection lycra. Hat or cap with strap when you're not in the water.

### Mistake #7: Not asking for help launching and landing the kite

Launching and landing the kite are the most dangerous moments of a session. The kite is at maximum power and you're on solid ground (where impacts hurt more). Many beginners try to do it alone or with someone who doesn't know how to assist.

**How to avoid it:** Always ask another kiter or your instructor for help. Make sure the person assisting knows what to do — if not, teach them first. In Salinas del Rey the community is great about this: any kiter on the beach will happily help you.

### The bonus mistake: giving up too soon

Kitesurfing has a steep learning curve at the beginning. The first hours can be frustrating. You'll swallow water. The kite will crash. Muscles you didn't know existed will hurt.

But if you push through that initial barrier, what comes after is addictive. The moment you do your first waterstart — when you stand up on the board and the wind takes you — is one of the most incredible sensations you can experience.

Don't give up in the first 3 hours. Give it at least 6. If after that it's not for you, that's perfectly fine. But give it a chance.

[Book your class](/reservar) and avoid these mistakes from day one.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-14',
        author: 'Veroni Kite',
        tags: ['principiantes', 'errores', 'seguridad', 'consejos'],
        readTime: 9,
    },

    // ─── ARTÍCULO 7 ───────────────────────────────────────────────
    {
        slug: 'kitesurf-vs-surf-diferencias',
        title: {
            es: 'Kitesurf vs Surf: ¿Cuál Es Para Ti?',
            en: 'Kitesurfing vs Surfing: Which One Is for You?',
        },
        description: {
            es: 'Comparación honesta entre kitesurf y surf: tiempo de aprendizaje, costos, condiciones necesarias y cuál es más fácil de aprender.',
            en: 'Honest comparison between kitesurfing and surfing: learning time, costs, required conditions and which is easier to learn.',
        },
        content: {
            es: `## La eterna pregunta de los deportes acuáticos

"¿Kitesurf o surf?" Si tuviese un peso por cada vez que me preguntan esto, podría comprarme otro kite. La respuesta corta: son deportes completamente diferentes que comparten el agua y nada más. La respuesta larga... bueno, para eso está este artículo.

### Curva de aprendizaje

**Surf:** La curva es lenta y larga. Vas a necesitar varios días solo para ponerte de pie de manera consistente. Semanas para hacer tus primeros giros. Meses para leer las olas y posicionarte bien. La verdad: la mayoría de personas que toman una clase de surf logran ponerse de pie una o dos veces, y luego se frustran porque en las siguientes sesiones no pueden replicarlo.

**Kitesurf:** La curva es empinada pero corta. Las primeras 3 horas son pura teoría y kite en tierra — parece que no avanzas. Pero entre las horas 6-12, boom: waterstart. Y de ahí la progresión es rápida. En 12-20 horas la mayoría navega de forma independiente.

**Veredicto:** El kitesurf te da resultados más rápidos. El surf te da años de perfeccionamiento continuo. Depende de tu paciencia.

### Costos

| Concepto | Kitesurf | Surf |
|----------|----------|------|
| Clases para empezar | $350-600 USD (10-12h) | $50-150 USD (2-3h) |
| Equipo propio (nuevo) | $2.800-5.000 USD | $300-800 USD |
| Equipo propio (usado) | $1.200-2.500 USD | $100-400 USD |
| Mantenimiento anual | $200-500 USD | $50-100 USD |

**Veredicto:** El surf es dramáticamente más barato. Una tabla usada y un traje de baño y ya estás. El kitesurf requiere una inversión seria. Pero las clases en Colombia reducen mucho la brecha.

### ¿Qué necesitas de la naturaleza?

**Surf:** Necesitas OLAS. Sin olas no hay surf. Y las buenas olas no son predecibles — dependes del swell, las mareas, la dirección. Puedes ir a la playa y que no haya nada.

**Kitesurf:** Necesitas VIENTO. Y el viento es más predecible que las olas. En temporada de viento, puedes tener 25-28 días navegables al mes. Además, el kite funciona en agua plana, con olas, en lagunas, en lagos... es más versátil.

**Veredicto:** El kitesurf es más predecible y versátil. El surf depende más del capricho del océano.

### Condición física

**Surf:** Requiere mucho remo. Los primeros meses te destrozan los hombros, la espalda y los brazos. La fuerza del core es importante pero el cardio es rey.

**Kitesurf:** El kite hace el trabajo de tracción. Tú manejas la dirección y el equilibrio. Es más técnico que físico. Se usa mucho el core, las piernas y los antebrazos (por el agarre de la barra). Pero gente de 50+ años aprende kite sin problema.

**Veredicto:** El kitesurf es más accesible físicamente. El surf es un workout más completo pero más exigente para empezar.

### ¿Se pueden hacer los dos?

Absolutamente. De hecho, muchos kiters son surfers y viceversa. Son complementarios:

- Los días sin viento pero con olas → surf
- Los días con viento pero sin olas → kite en agua plana
- Los días con viento Y olas → wave kiting (lo mejor de ambos mundos)

Salinas del Rey es perfecto para esto: la bahía para kite y las olas afuera para surf o wave kite.

### Mi opinión honesta

Si tienes un presupuesto limitado y vives cerca del mar con olas → surf.
Si quieres resultados rápidos y estás dispuesto a invertir → kitesurf.
Si quieres experimentar ambos → [ven a Salinas del Rey](/ubicacion) y haz los dos.

No hay un deporte "mejor". Hay el deporte correcto para ti en este momento de tu vida.

[Reserva tu clase de kitesurf](/reservar) y descúbrelo por ti mismo.`,
            en: `## The eternal water sports question

"Kitesurfing or surfing?" If I had a dollar for every time I'm asked this, I could buy another kite. The short answer: they're completely different sports that share water and nothing else. The long answer... well, that's what this article is for.

### Learning curve

**Surfing:** The curve is slow and long. You'll need several days just to stand up consistently. Weeks to make your first turns. Months to read waves and position yourself well. The truth: most people who take a surf lesson manage to stand up once or twice, then get frustrated because they can't replicate it in following sessions.

**Kitesurfing:** The curve is steep but short. The first 3 hours are pure theory and kite on land — it feels like you're not progressing. But between hours 6-12, boom: waterstart. And from there progression is fast. In 12-20 hours most people ride independently.

**Verdict:** Kitesurfing gives you faster results. Surfing gives you years of continuous refinement. Depends on your patience.

### Costs

| Item | Kitesurfing | Surfing |
|------|------------|---------|
| Lessons to start | $350-600 USD (10-12h) | $50-150 USD (2-3h) |
| Own equipment (new) | $2,800-5,000 USD | $300-800 USD |
| Own equipment (used) | $1,200-2,500 USD | $100-400 USD |
| Annual maintenance | $200-500 USD | $50-100 USD |

**Verdict:** Surfing is dramatically cheaper. A used board and swim trunks and you're set. Kitesurfing requires a serious investment. But lessons in Colombia significantly narrow the gap.

### What do you need from nature?

**Surfing:** You need WAVES. No waves, no surf. And good waves aren't predictable — you depend on swell, tides, direction. You can go to the beach and find nothing.

**Kitesurfing:** You need WIND. And wind is more predictable than waves. In wind season, you can have 25-28 rideable days per month. Plus, kiting works on flat water, with waves, in lagoons, on lakes... it's more versatile.

**Verdict:** Kitesurfing is more predictable and versatile. Surfing depends more on the ocean's mood.

### Physical fitness

**Surfing:** Requires a lot of paddling. The first months destroy your shoulders, back, and arms. Core strength matters but cardio is king.

**Kitesurfing:** The kite does the pulling work. You manage direction and balance. It's more technical than physical. Core, legs, and forearms (from bar grip) are used a lot. But people over 50 learn to kite without problems.

**Verdict:** Kitesurfing is more physically accessible. Surfing is a more complete workout but more demanding to start.

### Can you do both?

Absolutely. In fact, many kiters are surfers and vice versa. They're complementary:

- Windless days with waves → surf
- Windy days without waves → flat-water kiting
- Windy days WITH waves → wave kiting (best of both worlds)

Salinas del Rey is perfect for this: the bay for kiting and the waves outside for surfing or wave kiting.

### My honest opinion

If you have a limited budget and live near the sea with waves → surf.
If you want fast results and are willing to invest → kitesurfing.
If you want to experience both → [come to Salinas del Rey](/ubicacion) and do both.

There's no "better" sport. There's the right sport for you at this point in your life.

[Book your kitesurfing class](/reservar) and find out for yourself.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-15',
        author: 'Veroni Kite',
        tags: ['kitesurf', 'surf', 'comparación', 'principiantes'],
        readTime: 7,
    },

    // ─── ARTÍCULO 8 ───────────────────────────────────────────────
    {
        slug: 'que-llevar-primera-clase-kitesurf',
        title: {
            es: 'Qué Llevar a Tu Primera Clase de Kitesurf (Y Qué Dejar en Casa)',
            en: 'What to Bring to Your First Kitesurf Lesson (And What to Leave at Home)',
        },
        description: {
            es: 'La lista definitiva de lo que necesitas para tu primera clase. Lo que la escuela te da, lo que tú traes, y los errores más comunes de equipaje.',
            en: 'The definitive list of what you need for your first class. What the school provides, what you bring, and the most common packing mistakes.',
        },
        content: {
            es: `## Tu primera clase está reservada. Ahora, ¿qué metes en la maleta?

Tranquilo — no necesitas comprar nada especial. La escuela proporciona todo el equipo de kite. Pero hay cosas que marcan la diferencia entre una experiencia increíble y un día de sufrimiento innecesario. Esta es la lista que le mandamos a cada estudiante antes de su primera clase.

### Lo que la escuela te proporciona

En Veroni Kite (y en cualquier escuela seria) te dan:

- Kite apropiado para tu peso y las condiciones del día
- Tabla
- Arnés
- Casco
- Chaleco salvavidas
- Barra y líneas

Tú no tienes que preocuparte por nada de esto. Tu instructor elige todo basado en las condiciones.

### Lo que TÚ debes llevar

**Imprescindible:**

- **Protector solar SPF 50+ resistente al agua.** Esto no es opcional. En Salinas del Rey el índice UV llega a 11 (extremo). La reflexión del agua duplica la exposición. Aplícalo 30 minutos antes de entrar y reaplicalo cada 2 horas. Trae un envase generoso — vas a usar más del que crees. Busca marcas reef-safe si puedes, para cuidar los corales.

- **Lycra / rash guard con protección UV.** Aunque haga calor, úsala. Protege del sol y evita el roce del arnés contra tu piel. Después de 3 horas de arnés sin lycra, vas a tener una marca que parece un cinturón de seguridad.

- **Traje de baño debajo.** Parece obvio, pero alguien siempre llega en ropa interior pensando que es lo mismo. Un bañador o boardshort que se ajuste bien y no se baje con el agua.

- **Gafas de sol con cinta de neopreno.** Las gafas normales se caen al agua en los primeros 5 minutos. Punto. Invierte $20-30 USD en unas gafas deportivas con cinta o al menos compra una cinta de neopreno para las que ya tienes.

- **Agua y snacks.** El kitesurf deshidrata mucho más de lo que crees. Trae al menos 1.5 litros de agua y algún snack energético (fruta, granola, nueces). Come algo ligero 1-2 horas antes de la clase — no con el estómago vacío, pero tampoco lleno.

- **Toalla.** Para secarte después.

- **Ropa de cambio.** Vas a salir mojado y salado. Ten ropa seca para ponerte después.

**Recomendado:**

- **Zapatos acuáticos o sandalias con agarre.** La playa en Salinas del Rey es mayormente arena, pero en algunos spots hay conchas y piedras. Unos zapatos acuáticos baratos ($10-15 USD) te salvan los pies.

- **Gorra o sombrero para antes/después.** Mientras esperas tu turno o descansas entre sesiones.

- **Bolsa impermeable para el celular.** Si quieres llevar el teléfono a la playa sin riesgo.

- **Efectivo.** No todos los spots tienen datáfono. Lleva efectivo para comida, bebida o transporte.

### Lo que NO debes llevar

- **Joyería.** Anillos, cadenas, pulseras — TODO se queda en casa. El arnés puede engancharse en cadenas (peligroso) y los anillos se pierden en el agua.

- **GoPro (en tu primera clase).** Sé que quieres el video. Pero en tu primera clase necesitas concentrarte en aprender, no en filmar. Tus manos estarán ocupadas con la barra. Si quieres video, pregunta si el instructor puede grabarte — en Veroni Kite incluimos video en el curso de Waterstart.

- **Ropa holgada o suelta.** Nada que el viento pueda inflar o que se enganche en las líneas. Nada de camisetas sueltas, sombreros sin cinta, o pareos.

- **Actitud de "ya sé."** Llega con mente abierta. Incluso si has hecho wakeboard, windsurf o surf, el kite es diferente. Deja que el instructor te guíe desde cero.

### La preparación física (días antes)

No necesitas ser atleta, pero estos tips ayudan:

- **Hidrátate bien** los 2-3 días previos. La deshidratación bajo el sol caribeño es real.
- **Estira los hombros, espalda y piernas.** Vas a usar músculos que normalmente no usas.
- **Duerme bien** la noche anterior. El kitesurf requiere concentración — si llegas cansado, aprendes menos.
- **No bebas alcohol la noche anterior.** La resaca + sol + ejercicio físico = día horrible.

### El día de la clase

1. Llega 15-20 minutos antes
2. Come algo ligero 1-2 horas antes
3. Aplica protector solar antes de salir del alojamiento
4. Lleva la actitud correcta: curiosidad, paciencia y ganas de divertirte

Eso es todo. No necesitas más. El resto lo ponemos nosotros.

¿Listo? [Reserva tu clase](/reservar) y nos vemos en la playa.`,
            en: `## Your first class is booked. Now, what do you pack?

Relax — you don't need to buy anything special. The school provides all the kite equipment. But there are things that make the difference between an incredible experience and a day of unnecessary suffering. This is the list we send to every student before their first class.

### What the school provides

At Veroni Kite (and any serious school) you get:

- Kite appropriate for your weight and the day's conditions
- Board
- Harness
- Helmet
- Life vest
- Bar and lines

You don't have to worry about any of this. Your instructor chooses everything based on conditions.

### What YOU should bring

**Essential:**

- **SPF 50+ water-resistant sunscreen.** This is not optional. In Salinas del Rey the UV index reaches 11 (extreme). Water reflection doubles the exposure. Apply 30 minutes before entering and reapply every 2 hours. Bring a generous bottle — you'll use more than you think. Look for reef-safe brands if possible to protect the corals.

- **UV-protection lycra / rash guard.** Even if it's hot, wear it. It protects from the sun and prevents the harness from rubbing against your skin. After 3 hours of harness without a lycra, you'll have a mark that looks like a seatbelt burn.

- **Swimsuit underneath.** Seems obvious, but someone always shows up in underwear thinking it's the same. A swimsuit or boardshort that fits well and doesn't slide down in water.

- **Sunglasses with neoprene strap.** Regular glasses fall in the water within the first 5 minutes. Period. Invest $20-30 USD in sport glasses with a strap or at least buy a neoprene strap for the ones you already have.

- **Water and snacks.** Kitesurfing dehydrates much more than you'd think. Bring at least 1.5 liters of water and some energy snack (fruit, granola, nuts). Eat something light 1-2 hours before class — not on an empty stomach, but not full either.

- **Towel.** To dry off after.

- **Change of clothes.** You'll come out wet and salty. Have dry clothes to change into.

**Recommended:**

- **Water shoes or sandals with grip.** The beach in Salinas del Rey is mostly sand, but in some spots there are shells and rocks. Cheap water shoes ($10-15 USD) save your feet.

- **Cap or hat for before/after.** While waiting your turn or resting between sessions.

- **Waterproof phone pouch.** If you want to bring your phone to the beach without risk.

- **Cash.** Not all spots have card readers. Bring cash for food, drinks, or transport.

### What NOT to bring

- **Jewelry.** Rings, chains, bracelets — ALL stay at home. The harness can catch on chains (dangerous) and rings get lost in the water.

- **GoPro (on your first class).** I know you want the video. But on your first class you need to focus on learning, not filming. Your hands will be busy with the bar. If you want video, ask if the instructor can film you — at Veroni Kite we include video in the Waterstart course.

- **Loose or baggy clothing.** Nothing the wind can inflate or that can catch on the lines. No loose t-shirts, hats without straps, or sarongs.

- **An "I already know" attitude.** Come with an open mind. Even if you've done wakeboarding, windsurfing, or surfing, kiting is different. Let the instructor guide you from zero.

### Physical preparation (days before)

You don't need to be an athlete, but these tips help:

- **Hydrate well** the 2-3 days before. Dehydration under the Caribbean sun is real.
- **Stretch your shoulders, back, and legs.** You'll use muscles you normally don't use.
- **Sleep well** the night before. Kitesurfing requires concentration — if you arrive tired, you learn less.
- **Don't drink alcohol the night before.** Hangover + sun + physical exercise = horrible day.

### On the day of class

1. Arrive 15-20 minutes early
2. Eat something light 1-2 hours before
3. Apply sunscreen before leaving your accommodation
4. Bring the right attitude: curiosity, patience, and a desire to have fun

That's it. You don't need more. We provide the rest.

Ready? [Book your class](/reservar) and we'll see you on the beach.`,
        },
        image: '/og-image.jpg',
        date: '2026-03-16',
        author: 'Veroni Kite',
        tags: ['primera clase', 'equipaje', 'consejos', 'principiantes'],
        readTime: 8,
    },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
    return blogArticles.find((a) => a.slug === slug);
}

export function getAllArticles(): BlogArticle[] {
    return blogArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

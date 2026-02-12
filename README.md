# Veroni Kite School

Landing page para Veroni Kite School, escuela de kitesurf certificada IKO ubicada en Salinas del Rey, Colombia.

## Tecnologías

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Despliegue:** GitHub Pages (static export)

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción (static export) |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run typecheck` | Verifica tipos con TypeScript |
| `npm run test` | Ejecuta los tests |

## Build de Producción

El proyecto está configurado para static export (SSG). El build genera archivos estáticos en el directorio `out/`.

```bash
npm run build
```

## Despliegue en GitHub Pages

### Método 1: GitHub Actions (Recomendado)

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que despliega automáticamente al hacer push a `main`.

**Pasos para configurar:**

1. En el repositorio de GitHub, ir a **Settings > Pages**
2. En **Source**, seleccionar **GitHub Actions**
3. Hacer push a la rama `main`
4. El workflow construirá y desplegará automáticamente

### Método 2: Deploy Manual

```bash
# Generar build
npm run build

# El directorio out/ contiene los archivos estáticos
# Copiar contenido de out/ a la rama gh-pages o configurar en Settings
```

### Configurar BasePath (si es necesario)

Si el sitio se hospeda en una subruta (ej: `usuario.github.io/veroni-kite-school/`), descomentar y configurar `basePath` en `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/veroni-kite-school', // Descomentar si es necesario
  images: {
    unoptimized: true,
  },
};
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css      # Estilos globales y Tailwind
│   ├── layout.tsx       # Layout raíz con SEO metadata
│   └── page.tsx         # Página principal
├── components/
│   ├── Header.tsx       # Navegación y logo
│   ├── Hero.tsx         # Sección hero con CTA
│   ├── Classes.tsx      # Precios y planes
│   ├── AboutUs.tsx      # Sobre nosotros e IKO
│   ├── Testimonials.tsx # Testimonios de clientes
│   ├── FAQ.tsx          # Preguntas frecuentes
│   └── Footer.tsx       # Pie de página y contacto
└── __tests__/           # Tests unitarios
```

## SEO

El sitio está optimizado para SEO con:

- Meta tags completos (title, description, keywords)
- Open Graph para redes sociales
- Twitter Cards
- JSON-LD structured data (LocalBusiness schema)
- robots.txt y sitemap.xml
- HTML semántico

## Licencia

© 2026 Veroni Kite School. Todos los derechos reservados.

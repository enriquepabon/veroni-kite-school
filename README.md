# Veroni Kite Academy

Full-stack kitesurf academy platform for **Veroni Kite** in Salinas del Rey, Colombia. Built with Next.js 15, Supabase, Wompi payments, and bilingual support (ES/EN).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Auth & DB** | Supabase (Auth, Postgres, Storage) |
| **Payments** | Wompi (Colombian gateway) |
| **i18n** | next-intl (ES/EN) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **Weather** | Windy API |
| **Deploy** | Vercel |

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/           # Marketing pages (home, courses, location, about)
│   │   ├── (auth)/             # Login, registration
│   │   └── (dashboard)/
│   │       ├── dashboard/      # Student dashboard
│   │       ├── weather/        # Weather center + Windy map
│   │       ├── resources/      # Video/blog/news library
│   │       ├── profile/        # User profile
│   │       ├── booking/        # Class booking + Wompi checkout
│   │       ├── my-roadmap/     # Student progress tracker
│   │       └── admin/          # Admin panel (calendar, students, content)
│   └── api/
│       ├── weather/            # Windy API proxy (15-min cache)
│       ├── bookings/           # Booking management
│       ├── progress/           # Student skill progress (role-protected)
│       └── wompi/              # Payment webhook handler
├── components/
│   ├── public/                 # Navbar, Footer, Hero, WhatsApp widget
│   ├── dashboard/              # DashboardLayout sidebar/nav
│   └── weather/                # WeatherWidget, WindForecastChart
├── lib/
│   ├── supabase/               # Supabase client (server + browser)
│   ├── seo/                    # JSON-LD structured data
│   └── weather/                # Windy API integration
├── messages/                   # es.json, en.json translations
├── i18n/                       # next-intl config + routing
└── styles/                     # Global CSS
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Wompi Payments
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_...
WOMPI_PRIVATE_KEY=prv_test_...
WOMPI_EVENTS_SECRET=test_events_...
NEXT_PUBLIC_WOMPI_ENV=sandbox   # or "production"

# Windy API
WINDY_API_KEY=your-windy-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Key Features

- **6-Level Kite Road Map** — Interactive progression tracker (Discovery → Pro)
- **Weather Center** — Real-time wind data from Windy API + embedded wind map
- **Class Booking** — Course selection → date → slot → Wompi checkout
- **Student Dashboard** — Progress, bookings, weather, and resources
- **Admin Panel** — Calendar slots, student progress editor, content CMS
- **Bilingual** — Full Spanish/English with URL-based locale routing
- **SEO** — JSON-LD (LocalBusiness + Course), dynamic sitemap, Open Graph

## Deployment (Vercel)

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — Next.js detected automatically
4. For production Wompi:
   - Change `NEXT_PUBLIC_WOMPI_ENV=production`
   - Use production Wompi keys
   - Update webhook URL to production domain

## License

© 2026 Veroni Kite Academy. All rights reserved.

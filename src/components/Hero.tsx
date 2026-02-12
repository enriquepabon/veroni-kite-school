"use client";

import Link from "next/link";

export function Hero() {
  // Placeholder WhatsApp number - replace with actual number
  const whatsappNumber = "573001234567";
  const whatsappMessage = encodeURIComponent(
    "¡Hola! Quiero información sobre clases de kitesurf"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Placeholder Background - Gradient simulating beach/ocean */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-800"
        data-testid="hero-background"
        aria-hidden="true"
      />

      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* Decorative elements - kite/wind suggestion */}
      <div
        className="absolute top-20 right-10 md:top-32 md:right-20 w-32 h-32 md:w-48 md:h-48 opacity-20"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className="w-full h-full text-white"
        >
          <path
            d="M50 5L95 50L50 95L5 50L50 5Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <line x1="50" y1="95" x2="50" y2="150" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          data-testid="hero-headline"
        >
          Aprende Kitesurf en el Paraíso Colombiano
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          data-testid="hero-subheadline"
        >
          Descubre la magia del kitesurf en{" "}
          <span className="font-semibold text-white">Salinas del Rey</span>, 
          donde el viento perfecto y las aguas cristalinas te esperan.
          Certificación IKO garantizada.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - WhatsApp */}
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            data-testid="whatsapp-cta"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            ¡Reserva tu Clase!
          </Link>

          {/* Secondary CTA - View Classes */}
          <a
            href="#clases"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border-2 border-white/50 hover:border-white"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("clases");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Ver Clases
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Certificación IKO</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-cyan-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Salinas del Rey, Colombia</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Equipo Incluido</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;

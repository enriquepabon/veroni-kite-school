export function AboutUs() {
  return (
    <section
      id="nosotros"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            data-testid="about-headline"
          >
            Sobre Veroni Kite School
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Tu escuela de kitesurf certificada en el corazón de la costa colombiana
          </p>
        </div>

        {/* Two-column layout: image + text */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          data-testid="about-grid"
        >
          {/* Image Column */}
          <div className="relative" data-testid="about-image-column">
            {/* Placeholder image - gradient background with kite silhouette */}
            <div
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 relative"
              data-testid="about-image-placeholder"
            >
              {/* Decorative elements to make placeholder visually interesting */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Instructor silhouette placeholder */}
                <svg
                  className="w-48 h-48 text-white/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              {/* Beach/wave decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-blue-800/40 to-transparent" />
              
              {/* Image placeholder text */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-white/70 text-sm font-medium">
                  Instructor certificado IKO
                </span>
              </div>
            </div>

            {/* IKO Badge overlay */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm" data-testid="iko-badge">
                  Certificación IKO
                </p>
                <p className="text-gray-500 text-xs">International Kiteboarding Organization</p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="space-y-6" data-testid="about-text-column">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pasión por el Kitesurf desde 2015
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4" data-testid="about-description">
                En Veroni Kite School, combinamos años de experiencia con una pasión 
                inquebrantable por el kitesurf. Nuestros instructores están certificados 
                por la <strong>International Kiteboarding Organization (IKO)</strong>, 
                garantizando que recibirás la mejor formación siguiendo los estándares 
                internacionales de seguridad y técnica.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nos enorgullece ser parte de la comunidad IKO, una organización reconocida 
                mundialmente que establece los más altos estándares en la enseñanza del 
                kitesurf.
              </p>
            </div>

            {/* Location highlight */}
            <div 
              className="bg-cyan-50 rounded-xl p-6 border-l-4 border-cyan-500"
              data-testid="location-highlight"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-cyan-600"
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
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1" data-testid="location-title">
                    Ubicación Privilegiada
                  </h4>
                  <p className="text-gray-600 text-sm" data-testid="location-description">
                    Nos encontramos en <strong>Salinas del Rey</strong>, Colombia, 
                    un paraíso costero con condiciones perfectas para el kitesurf durante 
                    todo el año. Vientos constantes, aguas cálidas y paisajes increíbles 
                    hacen de este lugar el destino ideal para aprender y perfeccionar 
                    tu técnica.
                  </p>
                </div>
              </div>
            </div>

            {/* Key features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Instructores certificados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Equipo de alta calidad</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Grupos reducidos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Seguridad garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

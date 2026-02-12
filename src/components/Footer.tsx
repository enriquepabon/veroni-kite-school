import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="bg-gray-900 text-white"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1" data-testid="footer-brand">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">
                Veroni Kite School
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Escuela de kitesurf certificada IKO en Salinas del Rey, Colombia. 
              Aprende con los mejores instructores en el paraíso del viento.
            </p>
            {/* Social Links */}
            <div className="flex gap-4" data-testid="social-links">
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Síguenos en Instagram"
                data-testid="social-link-instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Síguenos en Facebook"
                data-testid="social-link-facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div data-testid="footer-navigation">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Navegación
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#inicio"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-inicio"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#clases"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-clases"
                >
                  Clases
                </Link>
              </li>
              <li>
                <Link
                  href="#nosotros"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-nosotros"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonios"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-testimonios"
                >
                  Testimonios
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#contacto"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  data-testid="nav-link-contacto"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div data-testid="footer-contact">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contacto
            </h3>
            <ul className="space-y-4">
              {/* WhatsApp */}
              <li className="flex items-start gap-3" data-testid="contact-whatsapp">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">WhatsApp</p>
                  <a
                    href="https://wa.me/573001234567?text=Hola%20Veroni%20Kite%20School"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                  >
                    +57 300 123 4567
                  </a>
                </div>
              </li>
              {/* Email */}
              <li className="flex items-start gap-3" data-testid="contact-email">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:info@veronikiteschool.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                  >
                    info@veronikiteschool.com
                  </a>
                </div>
              </li>
              {/* Location */}
              <li className="flex items-start gap-3" data-testid="contact-location">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ubicación</p>
                  <p className="text-white text-sm" data-testid="location-text">
                    Salinas del Rey, Colombia
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div data-testid="footer-map">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Ubicación
            </h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden h-40 md:h-48">
              <a
                href="https://maps.google.com/?q=Salinas+del+Rey,+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
                aria-label="Ver ubicación en Google Maps"
              >
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                  <div className="text-center">
                    <svg 
                      className="w-12 h-12 text-cyan-400 mx-auto mb-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-white text-sm font-medium">Salinas del Rey</p>
                    <p className="text-cyan-400 text-xs mt-1">Ver en Google Maps</p>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-cyan-600 px-4 py-2 rounded-full">
                    Abrir Mapa
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-testid="copyright-bar">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left" data-testid="copyright-text">
              © {currentYear} Veroni Kite School. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

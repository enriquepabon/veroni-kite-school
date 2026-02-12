import Link from "next/link";

interface PricingCard {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const pricingOptions: PricingCard[] = [
  {
    title: "Clase por Hora",
    price: "$50,000 COP",
    priceNote: "por hora",
    description:
      "Perfecto para probar el kitesurf o practicar habilidades específicas con instrucción personalizada.",
    features: [
      "Instrucción personalizada 1:1",
      "Equipo completo incluido",
      "Seguro durante la clase",
      "Certificación IKO disponible",
    ],
  },
  {
    title: "Curso Básico",
    price: "$500,000 COP",
    priceNote: "curso completo",
    description:
      "Aprende los fundamentos del kitesurf en un programa estructurado de varios días.",
    features: [
      "10 horas de instrucción",
      "Teoría y práctica en el agua",
      "Equipo completo incluido",
      "Certificación IKO Nivel 1",
      "Material didáctico",
    ],
    highlighted: true,
  },
  {
    title: "Curso Completo",
    price: "$500,000 COP",
    priceNote: "programa intensivo",
    description:
      "Domina el kitesurf con nuestro programa más completo. Desde principiante hasta navegación independiente.",
    features: [
      "20+ horas de instrucción",
      "Teoría avanzada incluida",
      "Equipo premium incluido",
      "Certificación IKO Nivel 2",
      "Seguimiento post-curso",
      "Acceso a comunidad de kiters",
    ],
  },
];

export function Classes() {
  // Placeholder WhatsApp number - replace with actual number
  const whatsappNumber = "573001234567";

  const getWhatsAppLink = (courseName: string) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el ${courseName}. ¿Podrían darme más información?`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section
      id="clases"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      data-testid="classes-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            data-testid="classes-headline"
          >
            Nuestras Clases de Kitesurf
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el programa que mejor se adapte a tu nivel y objetivos.
            Todos incluyen equipo y certificación IKO.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-testid="pricing-grid"
        >
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 flex flex-col ${
                option.highlighted
                  ? "bg-cyan-600 text-white shadow-2xl transform md:-translate-y-4"
                  : "bg-white text-gray-900 shadow-lg"
              }`}
              data-testid={`pricing-card-${index + 1}`}
            >
              {/* Popular badge */}
              {option.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full">
                    Más Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    option.highlighted ? "text-white" : "text-gray-900"
                  }`}
                  data-testid={`pricing-title-${index + 1}`}
                >
                  {option.title}
                </h3>
                <p
                  className={`text-sm ${
                    option.highlighted ? "text-cyan-100" : "text-gray-500"
                  }`}
                >
                  {option.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${
                    option.highlighted ? "text-white" : "text-cyan-600"
                  }`}
                  data-testid={`pricing-price-${index + 1}`}
                >
                  {option.price}
                </span>
                {option.priceNote && (
                  <span
                    className={`text-sm ml-2 ${
                      option.highlighted ? "text-cyan-100" : "text-gray-500"
                    }`}
                  >
                    {option.priceNote}
                  </span>
                )}
              </div>

              {/* Features List */}
              <ul className="flex-grow mb-8 space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        option.highlighted ? "text-cyan-200" : "text-cyan-500"
                      }`}
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
                    <span
                      className={`text-sm ${
                        option.highlighted ? "text-cyan-50" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={getWhatsAppLink(option.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-center transition-all duration-300 transform hover:scale-105 ${
                  option.highlighted
                    ? "bg-white text-cyan-600 hover:bg-cyan-50"
                    : "bg-cyan-600 text-white hover:bg-cyan-700"
                }`}
                data-testid={`pricing-cta-${index + 1}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reservar Ahora
              </Link>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            ¿Tienes preguntas sobre qué curso elegir?{" "}
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Necesito ayuda para elegir el curso adecuado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-cyan-700 font-semibold underline"
            >
              Contáctanos
            </Link>{" "}
            y te asesoramos sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Classes;

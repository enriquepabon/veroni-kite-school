"use client";

import { useState } from "react";

// FAQ data
const faqItems = [
  {
    id: 1,
    question: "¿Necesito experiencia previa para aprender kitesurf?",
    answer:
      "¡No! Nuestros cursos están diseñados especialmente para principiantes. No necesitas experiencia previa en kitesurf ni en otros deportes acuáticos. Nuestros instructores certificados IKO te guiarán paso a paso desde el primer momento, comenzando con la teoría del viento y el manejo del kite en tierra antes de ir al agua.",
  },
  {
    id: 2,
    question: "¿Qué debo traer a las clases?",
    answer:
      "Nosotros proporcionamos todo el equipo de kitesurf (kite, barra, arnés, tabla y chaleco). Tú solo necesitas traer: protector solar resistente al agua (SPF 50+), ropa cómoda para la playa, gafas de sol con sujeción, agua y snacks, y muchas ganas de aprender. Recomendamos también traer una toalla y ropa de cambio.",
  },
  {
    id: 3,
    question: "¿Cuál es el mejor clima para practicar kitesurf?",
    answer:
      "Salinas del Rey tiene condiciones ideales casi todo el año, con vientos constantes entre 15-25 nudos. La temporada alta de viento es de diciembre a abril y de junio a agosto. Monitoreamos las condiciones climáticas diariamente y te avisamos si hay que reprogramar por seguridad. El agua es cálida todo el año (26-28°C), por lo que no necesitas traje de neopreno.",
  },
  {
    id: 4,
    question: "¿Cuánto tiempo dura cada clase y cuántas necesito?",
    answer:
      "Las clases individuales duran aproximadamente 2-3 horas. Para el curso básico (3 días), recomendamos sesiones de mañana cuando el viento es más constante. La mayoría de estudiantes logran navegar de forma independiente después del curso básico de 3 días. El curso completo de 5 días te lleva al nivel de transiciones y saltos básicos. Cada persona aprende a su ritmo y ajustamos las clases según tu progreso.",
  },
  {
    id: 5,
    question: "¿Es seguro el kitesurf? ¿Qué medidas de seguridad tienen?",
    answer:
      "El kitesurf es seguro cuando se practica con instructores certificados y siguiendo los protocolos adecuados. En Veroni Kite School todos nuestros instructores tienen certificación IKO (International Kiteboarding Organization), el estándar internacional de seguridad. Utilizamos equipos con sistemas de liberación rápida, cascos y chalecos obligatorios, y siempre hay supervisión en el agua. Además, la zona de Salinas del Rey tiene aguas poco profundas ideales para principiantes.",
  },
  {
    id: 6,
    question: "¿Puedo tomar clases si no sé nadar?",
    answer:
      "Recomendamos que sepas nadar al menos básicamente, ya que te sentirás más cómodo y seguro en el agua. Sin embargo, siempre usamos chalecos salvavidas y las primeras clases son en aguas poco profundas donde puedes hacer pie. Si tienes dudas sobre tu nivel de natación, coméntanos y evaluamos juntos si es adecuado comenzar.",
  },
  {
    id: 7,
    question: "¿Hay límite de edad o peso para practicar kitesurf?",
    answer:
      "Aceptamos estudiantes desde los 10 años (con autorización de padres) hasta cualquier edad mientras tengas buena condición física básica. El kitesurf es un deporte que depende más de la técnica que de la fuerza bruta. En cuanto al peso, generalmente trabajamos con personas entre 40 y 110 kg, adaptando el tamaño del kite según tu peso y las condiciones del viento.",
  },
];

// FAQ Item component
function FAQItem({
  item,
  isExpanded,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b border-gray-200 last:border-b-0"
      data-testid={`faq-item-${item.id}`}
    >
      <button
        type="button"
        className="w-full py-6 flex items-center justify-between text-left hover:text-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-lg"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${item.id}`}
        data-testid={`faq-question-${item.id}`}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-cyan-600 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 pb-6" : "max-h-0"
        }`}
        aria-hidden={!isExpanded}
        data-testid={`faq-answer-${item.id}`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      data-testid="faq-section"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            data-testid="faq-headline"
          >
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra respuestas a las dudas más comunes sobre nuestras clases
            de kitesurf.
          </p>
        </div>

        {/* FAQ List */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
          data-testid="faq-list"
        >
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="https://wa.me/573001234567?text=Hola,%20tengo%20una%20pregunta%20sobre%20las%20clases%20de%20kitesurf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-lg"
            data-testid="faq-whatsapp-cta"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;

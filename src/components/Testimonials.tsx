// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" data-testid="star-rating" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Carlos Martínez",
    location: "Bogotá, Colombia",
    rating: 5,
    quote: "Increíble experiencia en Veroni Kite School. Los instructores son muy profesionales y pacientes. En solo una semana ya estaba navegando de forma independiente. ¡100% recomendado!",
    avatar: "CM",
  },
  {
    id: 2,
    name: "María Fernanda López",
    location: "Medellín, Colombia",
    rating: 5,
    quote: "El curso completo fue la mejor inversión que pude hacer. El equipo es de primera calidad y Salinas del Rey es un lugar mágico para aprender. Volveré sin duda.",
    avatar: "ML",
  },
  {
    id: 3,
    name: "Andrés García",
    location: "Cali, Colombia",
    rating: 5,
    quote: "Vinimos en familia y fue una experiencia inolvidable. El instructor certificado IKO nos hizo sentir seguros en todo momento. Las condiciones del viento en esta playa son perfectas.",
    avatar: "AG",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            data-testid="testimonials-headline"
          >
            Lo Que Dicen Nuestros Estudiantes
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Cientos de estudiantes han confiado en nosotros para aprender kitesurf.
            Aquí están sus experiencias.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="testimonials-grid"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-10 h-10 text-cyan-500/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Star Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Review Text */}
              <blockquote className="flex-grow mb-6">
                <p
                  className="text-gray-600 leading-relaxed italic"
                  data-testid={`testimonial-quote-${testimonial.id}`}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                {/* Avatar Placeholder */}
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg"
                  data-testid={`testimonial-avatar-${testimonial.id}`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p
                    className="font-semibold text-gray-900"
                    data-testid={`testimonial-name-${testimonial.id}`}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <strong>4.9/5</strong> basado en más de 100 reseñas
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

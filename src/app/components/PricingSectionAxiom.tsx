"use client";

import Link from "next/link";

const PLANES = [
  {
    nombre: "Prueba gratis",
    precio: "Bs. 0",
    sufijo: "/sin tarjeta",
    descripcion: "Para conocer cómo funciona Axiom antes de pagar.",
    incluye: [
      "1 examen IA de 10 preguntas",
      "Resultados con explicaciones",
      "Sin plan personalizado",
    ],
    cta: "Probar gratis",
    href: "/login?demo=1",
    destacado: false,
    color: "neutral",
  },
  {
    nombre: "Premium",
    precio: "Bs. 50",
    sufijo: "/mes",
    descripcion: "Para el estudiante que se prepara en serio para la UMSS.",
    incluye: [
      "Exámenes IA ILIMITADOS",
      "Modo 'Mis errores' con IA",
      "Plan de estudio IA personalizado tras cada examen",
      "Historial completo de tu progreso",
      "Soporte por WhatsApp",
    ],
    cta: "Quiero el plan Premium",
    href: "/pago?producto=axiom-premium",
    destacado: true,
    color: "violet",
  },
];

export default function PricingSectionAxiom() {
  return (
    <section
      id="precios"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
          Precios
        </div>
        <h2 className="font-crimson text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Empieza gratis. Paga cuando estes listo.
        </h2>
        <p className="mt-3 text-base text-neutral-600">
          Sin contratos. Sin permanencia. Cancelas cuando ya entraste a la UMSS.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {PLANES.map((plan) => {
          const esDestacado = plan.destacado;
          return (
            <div
              key={plan.nombre}
              className={`relative flex flex-col rounded-3xl border p-7 transition-all ${
                esDestacado
                  ? "border-violet-400 bg-gradient-to-br from-violet-50 via-white to-indigo-50 shadow-2xl shadow-violet-200/50"
                  : "border-neutral-200 bg-white/90 shadow-sm"
              }`}
            >
              {esDestacado && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  Más elegido
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xl font-bold text-neutral-900">
                  {plan.nombre}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{plan.descripcion}</p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-neutral-900">
                  {plan.precio}
                </span>
                <span className="text-sm text-neutral-500">{plan.sufijo}</span>
              </div>

              <ul className="mb-7 flex-1 space-y-2.5">
                {plan.incluye.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-700"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        esDestacado
                          ? "bg-violet-600 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold transition-all ${
                  esDestacado
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                    : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-neutral-500">
        Paga por Tigo Money, QR bancario o transferencia. Activación manual en
        menos de 24 horas (te avisamos por WhatsApp).
      </p>
    </section>
  );
}

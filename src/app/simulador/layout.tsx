import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Examen UMSS | Exámenes Reales y Práctica con IA",
  description:
    "Crea tu simulacro personalizado para la admisión a la Universidad Mayor de San Simón (UMSS). Practica con exámenes oficiales y preguntas generadas bajo tiempo real en Medicina, Tecnología y Económicas.",
  openGraph: {
    title: "Simulador de Examen UMSS | AXIOM",
    description:
      "Practica con exámenes reales y preguntas cronometradas idénticas a la prueba de admisión de la UMSS.",
  },
};

export default function SimuladorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

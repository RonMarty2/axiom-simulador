import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios y Planes de Preparación UMSS (en Bs.) | AXIOM",
  description:
    "Planes de preparación accesibles para el examen de admisión UMSS Cochabamba. Banco de 139 exámenes reales, explicaciones paso a paso y simulador con IA. Pago por QR Simple.",
  openGraph: {
    title: "Precios y Planes de Preparación UMSS | AXIOM",
    description:
      "Asegura tu ingreso a San Simón por una fracción de lo que cuesta una academia presencial. Pago único por QR boliviano.",
  },
};

export default function PreciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

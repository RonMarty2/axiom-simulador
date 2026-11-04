import type { Metadata } from "next";
import { totalExamenes } from "@/lib/axiom/total-examenes";

export async function generateMetadata(): Promise<Metadata> {
  const total = await totalExamenes();
  return {
    title: "Precios y Planes de Preparación UMSS (en Bs.) | AXIOM",
    description: `Planes de preparación accesibles para el examen de admisión UMSS Cochabamba. Banco de ${total} exámenes reales, explicaciones paso a paso y simulador con IA. Pago por QR Simple.`,
    openGraph: {
      title: "Precios y Planes de Preparación UMSS | AXIOM",
      description:
        "Asegura tu ingreso a San Simón por una fracción de lo que cuesta una academia presencial. Pago único por QR boliviano.",
    },
  };
}

export default function PreciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

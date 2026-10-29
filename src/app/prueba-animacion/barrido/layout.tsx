import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// el barrido es "use client" y no puede llamar a notFound() en el servidor: lo hace este layout.
// Misma regla que /prueba-animacion: herramienta de desarrollo, en produccion no existe para nadie
export default function BarridoLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return <>{children}</>;
}

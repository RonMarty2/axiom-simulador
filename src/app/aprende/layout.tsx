import { redirect } from "next/navigation";
import { accesoAprende } from "@/lib/acceso-contenido";

// Guard de las lecciones. Corre en el servidor ANTES de que se renderice
// nada: si el alumno no tiene suscripción activa, la lección no llega a
// pintarse. Ver src/lib/acceso-contenido.ts para el alcance real de esto.
export default async function AprendeLayout({ children }: { children: React.ReactNode }) {
  const veredicto = await accesoAprende();
  if (!veredicto.permitido && veredicto.destino) redirect(veredicto.destino);
  return <>{children}</>;
}

import { redirect } from "next/navigation";
import { accesoLaminas } from "@/lib/acceso-contenido";

// Guard de las Láminas de Repaso: son contenido pago completo (la propia
// pantalla dice "Contenido premium"), así que todo lo que cuelga de /laminas
// pide suscripción activa. El índice /laminas queda abierto para que se vea
// qué incluye.
export default async function LaminasLayout({ children }: { children: React.ReactNode }) {
  const veredicto = await accesoLaminas();
  if (!veredicto.permitido && veredicto.destino) redirect(veredicto.destino);
  return <>{children}</>;
}

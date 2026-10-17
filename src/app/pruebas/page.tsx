import { notFound, redirect } from "next/navigation";
import { PESTANAS } from "./pestanas";

// Entrada a la zona de pruebas (solo desarrollo): lleva a la primera pestaña
export default function Pruebas() {
  if (process.env.NODE_ENV !== "development") notFound();
  redirect(PESTANAS[0].ruta);
}

import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/session";
import { esPago } from "@/lib/plan";
import { SLUGS_GRATIS } from "@/lib/axiom/catalogo-aprende";
import { RUTA_HEADER } from "@/middleware";

// Guard de servidor para el contenido pago.
//
// Por qué existe: las ~110 lecciones de /aprende y las 64 láminas de /laminas
// son componentes cliente sin ningún chequeo. El candado se veía en el índice,
// pero escribiendo la URL a mano (o siguiendo un link compartido) se abrían
// enteras. El plan del usuario se deriva de las suscripciones vigentes, así
// que acá alcanza con mirar `usuario.plan`.
//
// Alcance honesto: esto frena el acceso por URL, que es el 99% del problema
// real. NO esconde el contenido de alguien que se ponga a leer el bundle de
// JavaScript: las lecciones son componentes estáticos y viajan compiladas al
// cliente. Esconderlas de verdad pide moverlas a datos que se pidan al
// servidor, y eso es una refactorización de las 110 páginas.

export type Motivo = "login" | "onboarding" | "pago";

export interface Veredicto {
  permitido: boolean;
  motivo?: Motivo;
  destino?: string;
}

async function rutaActual(): Promise<string> {
  const h = await headers();
  return h.get(RUTA_HEADER) ?? "";
}

// Segmentos de la ruta después del prefijo: "/aprende/potenciacion" con
// prefijo "aprende" devuelve ["potenciacion"].
function segmentos(ruta: string, prefijo: string): string[] {
  return ruta
    .split("/")
    .filter(Boolean)
    .slice(ruta.split("/").filter(Boolean).indexOf(prefijo) + 1);
}

async function evaluar(
  prefijo: string,
  motivoPago: string,
  esGratis: (partes: string[]) => boolean,
): Promise<Veredicto> {
  const ruta = await rutaActual();
  const partes = segmentos(ruta, prefijo);

  // El índice (/aprende, /laminas) queda abierto: es el catálogo, y es
  // justamente donde se ve qué hay adentro y el botón de suscribirse.
  if (partes.length === 0) return { permitido: true };

  if (esGratis(partes)) return { permitido: true };

  const usuario = await getCurrentUser();
  if (!usuario) return { permitido: false, motivo: "login", destino: "/login" };
  if (!usuario.facultad_objetivo) return { permitido: false, motivo: "onboarding", destino: "/onboarding" };
  if (!esPago(usuario.plan)) {
    // El motivo hace que /precios explique POR QUÉ lo mandaron ahí, en vez de
    // aparecer de la nada con la lista de planes.
    return { permitido: false, motivo: "pago", destino: `/precios?motivo=${motivoPago}` };
  }
  return { permitido: true };
}

// Lecciones: la Unidad 01 de cada bloque es gratis (decisión D2).
export function accesoAprende(): Promise<Veredicto> {
  return evaluar("aprende", "leccion", (partes) => SLUGS_GRATIS.has(partes[0]));
}

// Láminas de Repaso: son contenido pago completo, no hay módulo de muestra.
export function accesoLaminas(): Promise<Veredicto> {
  return evaluar("laminas", "lamina", () => false);
}

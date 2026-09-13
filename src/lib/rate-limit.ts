// Limitador de intentos por IP, en memoria del proceso.
//
// ALCANCE, para que quede claro qué protege y qué no: en Vercel cada instancia
// serverless tiene su propia memoria, así que un atacante repartido entre
// varias instancias consigue más intentos que el límite nominal. Aun así corta
// la fuerza bruta de golpe — pasar de "intentos ilimitados" a "unos pocos por
// instancia cada 15 minutos" cambia el ataque de horas a inviable.
//
// Si alguna vez hace falta una garantía dura (varios endpoints sensibles, o
// tráfico real), esto se reemplaza por un contador en Supabase o en Redis sin
// tocar a quien lo llama.

type Registro = { intentos: number; desde: number; bloqueadoHasta: number };

const registros = new Map<string, Registro>();

// Limpieza perezosa: sin esto el Map crece sin techo en una instancia que viva
// mucho, porque cada IP nueva deja su entrada para siempre.
function limpiar(ahora: number, ventanaMs: number) {
  if (registros.size < 1000) return;
  for (const [k, r] of registros) {
    if (ahora - r.desde > ventanaMs && ahora > r.bloqueadoHasta) registros.delete(k);
  }
}

export interface ResultadoLimite {
  permitido: boolean;
  /** Segundos que faltan para poder reintentar. Solo si permitido es false. */
  esperaSegundos: number;
  /** Intentos que quedan en la ventana actual. */
  restantes: number;
}

export function consultarLimite(
  clave: string,
  { maxIntentos = 5, ventanaMs = 15 * 60_000 } = {},
): ResultadoLimite {
  const ahora = Date.now();
  limpiar(ahora, ventanaMs);

  const r = registros.get(clave);

  if (r && ahora < r.bloqueadoHasta) {
    return { permitido: false, esperaSegundos: Math.ceil((r.bloqueadoHasta - ahora) / 1000), restantes: 0 };
  }
  // Ventana vencida (o primera vez): se arranca de cero.
  if (!r || ahora - r.desde > ventanaMs) {
    registros.set(clave, { intentos: 0, desde: ahora, bloqueadoHasta: 0 });
    return { permitido: true, esperaSegundos: 0, restantes: maxIntentos };
  }
  return { permitido: true, esperaSegundos: 0, restantes: Math.max(0, maxIntentos - r.intentos) };
}

/** Suma un intento fallido y bloquea la clave si se pasó del máximo. */
export function registrarFallo(
  clave: string,
  { maxIntentos = 5, ventanaMs = 15 * 60_000, bloqueoMs = 15 * 60_000 } = {},
): ResultadoLimite {
  const ahora = Date.now();
  const r = registros.get(clave) ?? { intentos: 0, desde: ahora, bloqueadoHasta: 0 };

  if (ahora - r.desde > ventanaMs) {
    r.intentos = 0;
    r.desde = ahora;
  }
  r.intentos++;
  if (r.intentos >= maxIntentos) r.bloqueadoHasta = ahora + bloqueoMs;
  registros.set(clave, r);

  return r.bloqueadoHasta > ahora
    ? { permitido: false, esperaSegundos: Math.ceil((r.bloqueadoHasta - ahora) / 1000), restantes: 0 }
    : { permitido: true, esperaSegundos: 0, restantes: Math.max(0, maxIntentos - r.intentos) };
}

/** Borra el registro de una clave. Se llama cuando el intento fue exitoso. */
export function limpiarLimite(clave: string) {
  registros.delete(clave);
}

/**
 * IP del cliente. En Vercel la real viene en x-forwarded-for; el primer valor
 * de esa lista es el cliente y el resto son proxies. Si no hay cabecera se
 * devuelve una clave fija: es preferible limitar de más (todos comparten cubo)
 * que dejar el endpoint abierto.
 */
export function ipDe(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "desconocida";
}

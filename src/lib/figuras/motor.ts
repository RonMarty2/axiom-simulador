// Motor de geometría para las figuras de examen.
//
// Por qué existe: las figuras dibujadas "a mano" (coordenadas tipeadas)
// salieron espejadas, con ángulos que no medían lo que decían y etiquetas
// flotando lejos de su vértice. Acá la figura NO se dibuja: se DECLARA
// ("rayo desde V a 55° hasta cruzar la recta n") y cada punto se calcula
// con trigonometría. Un ángulo declarado de 37° mide 37° siempre.
//
// Convención de ángulos: grados, 0° = este (derecha), positivo = ANTIHORARIO
// visual (hacia arriba). Internamente se invierte el eje Y porque SVG crece
// hacia abajo. Ejemplos: 90° = arriba, 180° = izquierda, -40° = abajo-derecha.

export interface Pt {
  x: number;
  y: number;
}

const RAD = Math.PI / 180;

export function avanzar(desde: Pt, anguloGrados: number, distancia: number): Pt {
  return {
    x: desde.x + Math.cos(anguloGrados * RAD) * distancia,
    y: desde.y - Math.sin(anguloGrados * RAD) * distancia,
  };
}

// Avanza por el rayo hasta cruzar la recta horizontal y = yObjetivo.
// Tira error si el rayo nunca la cruza (paralelo o va para el otro lado):
// mejor explotar acá que dibujar cualquier cosa en silencio.
export function hastaY(desde: Pt, anguloGrados: number, yObjetivo: number): Pt {
  const dy = -Math.sin(anguloGrados * RAD);
  const deltaY = yObjetivo - desde.y;
  if (Math.abs(dy) < 1e-9) throw new Error(`hastaY: rayo a ${anguloGrados}° es horizontal, nunca cruza y=${yObjetivo}`);
  const t = deltaY / dy;
  if (t <= 0) throw new Error(`hastaY: el rayo a ${anguloGrados}° desde (${desde.x},${desde.y}) se aleja de y=${yObjetivo}`);
  return avanzar(desde, anguloGrados, t);
}

export function anguloHacia(desde: Pt, hacia: Pt): number {
  return Math.atan2(-(hacia.y - desde.y), hacia.x - desde.x) / RAD;
}

export function distancia(a: Pt, b: Pt): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

// Ángulo (0..180) entre los rayos v->a y v->b. Para verificaciones.
export function anguloEn(vertice: Pt, a: Pt, b: Pt): number {
  let d = Math.abs(anguloHacia(vertice, a) - anguloHacia(vertice, b)) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

// Verificación dura: si la figura declarada no cumple lo que sus etiquetas
// dicen (ej: "el ángulo en W debe medir 95°"), explota al construir.
export function verificarAngulo(nombre: string, esperado: number, real: number, toleranciaGrados = 0.5): void {
  if (Math.abs(esperado - real) > toleranciaGrados) {
    throw new Error(`Figura inconsistente: ${nombre} debería medir ${esperado}° pero mide ${real.toFixed(2)}°`);
  }
}

export function verificarDistancia(nombre: string, esperado: number, real: number, tolerancia = 2): void {
  if (Math.abs(esperado - real) > tolerancia) {
    throw new Error(`Figura inconsistente: ${nombre} debería medir ${esperado.toFixed(1)} pero mide ${real.toFixed(1)}`);
  }
}

// ── Escena declarativa ──
// La figura es una lista de elementos; el renderer (React o el harness de
// verificación) solo los pinta. `desdePaso` = a partir de qué paso de la
// solución aparece (sin él, es parte del enunciado y se ve siempre).

export type Rol =
  | "trazo"      // líneas principales de la figura (navy)
  | "dato"       // etiquetas/arcos de datos dados (colores cálidos)
  | "incognita"  // lo que se busca (violeta)
  | "aux"        // construcciones auxiliares de la solución (verde punteado)
  | "resalte"    // resaltado del paso actual (violeta grueso translúcido)
  | "resultado"; // valores derivados en la solución (rojo)

// `desdePaso`: aparece a partir de ese paso. `hastaPaso`: se muestra solo
// hasta ese paso inclusive (ej: la etiqueta "95°" se retira cuando el paso 1
// la descompone en 55° + 40° para que no se pisen).
interface BaseElemento {
  rol: Rol;
  desdePaso?: number;
  hastaPaso?: number;
  color?: string;
}

export type Elemento =
  | (BaseElemento & { tipo: "linea"; de: Pt; a: Pt; punteada?: boolean; grosor?: number })
  | (BaseElemento & { tipo: "poligono"; puntos: Pt[]; relleno?: boolean; rellenoColor?: string })
  | (BaseElemento & { tipo: "arco"; d: string })
  | (BaseElemento & { tipo: "cuadradoRecto"; d: string; relleno?: boolean })
  | (BaseElemento & { tipo: "path"; d: string; relleno?: boolean })
  | (BaseElemento & { tipo: "punto"; en: Pt; r?: number })
  | (BaseElemento & { tipo: "texto"; en: Pt; texto: string; tam?: number; cursiva?: boolean; negrita?: boolean; rot?: number; ancla?: "start" | "middle" | "end" });

export function elementoVisible(e: Elemento, paso: number): boolean {
  if (e.desdePaso !== undefined && paso < e.desdePaso) return false;
  if (e.hastaPaso !== undefined && paso > e.hastaPaso) return false;
  return true;
}

export interface Figura {
  ancho: number;
  alto: number;
  pasos: number; // cuántos pasos de construcción tiene (0 = figura estática)
  elementos: Elemento[];
}

// Arco de ángulo entre dos direcciones (el arco barre del ángulo `a1` al
// `a2` por el lado CORTO). Devuelve el path y dónde va la etiqueta.
export function arcoAngulo(
  vertice: Pt,
  a1: number,
  a2: number,
  radio: number,
  radioEtiqueta?: number
): { d: string; etiquetaEn: Pt; medida: number } {
  // normalizar diferencia a (-180, 180] para barrer por el lado corto
  let delta = (((a2 - a1) % 360) + 540) % 360 - 180;
  const medida = Math.abs(delta);
  const p1 = avanzar(vertice, a1, radio);
  const p2 = avanzar(vertice, a1 + delta, radio);
  // SVG sweep: nuestro antihorario visual = sweep-flag 0 con Y invertida
  const sweep = delta > 0 ? 0 : 1;
  const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radio} ${radio} 0 0 ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  const etiquetaEn = avanzar(vertice, a1 + delta / 2, radioEtiqueta ?? radio + 12);
  return { d, etiquetaEn, medida };
}

// Cuadradito de ángulo recto en `vertice`, entre las direcciones a1 y a2.
// Verifica que de verdad haya 90° entre ellas.
export function cuadradoRecto(vertice: Pt, a1: number, a2: number, lado = 9): string {
  const delta = (((a2 - a1) % 360) + 540) % 360 - 180;
  verificarAngulo("cuadradoRecto", 90, Math.abs(delta));
  const p1 = avanzar(vertice, a1, lado);
  const p3 = avanzar(vertice, a2, lado);
  // cuarto vértice del cuadradito: paralelogramo v→p1→p2→p3
  const p2: Pt = { x: p1.x + (p3.x - vertice.x), y: p1.y + (p3.y - vertice.y) };
  return `M ${vertice.x.toFixed(2)} ${vertice.y.toFixed(2)} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} Z`;
}

// Resistor estilo zigzag entre dos puntos (para circuitos): tramo recto,
// zigzag centrado, tramo recto. Devuelve el path completo de -de- hasta -a-.
export function resistorZigzag(de: Pt, a: Pt, picos = 6, amplitud = 5): string {
  const dir = anguloHacia(de, a);
  const largo = distancia(de, a);
  const zonaZig = Math.min(largo * 0.6, picos * 7);
  const ini = avanzar(de, dir, (largo - zonaZig) / 2);
  const paso = zonaZig / picos;
  let d = `M ${de.x.toFixed(2)} ${de.y.toFixed(2)} L ${ini.x.toFixed(2)} ${ini.y.toFixed(2)}`;
  for (let i = 0; i < picos; i++) {
    const centro = avanzar(ini, dir, paso * (i + 0.5));
    const lado = i % 2 === 0 ? 90 : -90;
    const pico = avanzar(centro, dir + lado, amplitud);
    d += ` L ${pico.x.toFixed(2)} ${pico.y.toFixed(2)}`;
  }
  const fin = avanzar(ini, dir, zonaZig);
  d += ` L ${fin.x.toFixed(2)} ${fin.y.toFixed(2)} L ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  return d;
}

// Punta de flecha (triángulo relleno) en `punta`, apuntando en la dirección
// `anguloDireccion`. Se usa junto a una linea para dibujar vectores/campos.
export function cabezaFlecha(punta: Pt, anguloDireccion: number, tam = 7): string {
  const izq = avanzar(punta, anguloDireccion + 152, tam);
  const der = avanzar(punta, anguloDireccion - 152, tam);
  return `M ${punta.x.toFixed(2)} ${punta.y.toFixed(2)} L ${izq.x.toFixed(2)} ${izq.y.toFixed(2)} L ${der.x.toFixed(2)} ${der.y.toFixed(2)} Z`;
}

// Rectángulo apoyado sobre una superficie inclinada (ej: bloque sobre un
// plano). `base` es el punto medio del lado que toca la superficie,
// `anguloSuperficie` la dirección de la superficie, `largo` a lo largo de
// ella y `alto` hacia afuera. La normal se elige SOLA hacia arriba (el
// bloque siempre queda del lado de arriba de la superficie — imposible
// dibujarlo colgando para abajo por error de signo).
export function bloqueSobre(base: Pt, anguloSuperficie: number, largo: number, alto: number): Pt[] {
  const candidata = anguloSuperficie + 90;
  const normal = Math.sin(candidata * RAD) >= 0 ? candidata : anguloSuperficie - 90;
  const c1 = avanzar(base, anguloSuperficie, largo / 2);
  const c2 = avanzar(base, anguloSuperficie, -largo / 2);
  const c3 = avanzar(c2, normal, alto);
  const c4 = avanzar(c1, normal, alto);
  return [c1, c2, c3, c4];
}

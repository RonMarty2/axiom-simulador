// Definiciones declarativas de las figuras de examen construidas con el
// motor de geometría. Cada figura se DECLARA con los ángulos reales del
// problema y los puntos se calculan; las verificaciones explotan si la
// figura no cumple lo que sus propias etiquetas dicen.

import {
  type Elemento,
  type Figura,
  type Pt,
  anguloEn,
  anguloHacia,
  arcoAngulo,
  avanzar,
  bloqueSobre,
  cabezaFlecha,
  cuadradoRecto,
  distancia,
  hastaY,
  verificarAngulo,
} from "./motor";

const ROJO = "#dc2626";
const AMBAR = "#d97706";
const VIOLETA = "#6d28d9";
const VERDE = "#059669";
const NAVY = "#1a1a2e";

// ── G5 · paralelas m ∥ n con poligonal (α, α, 95°, 40°, 2x) ──
// Reconstrucción fiel al PDF: desde el vértice V sobre m bajan dos rayos con
// ángulo α a cada lado. El izquierdo llega a W (ángulo 95°); desde W el tramo
// vuelve hacia abajo-DERECHA y cruza n formando 40°. El rayo derecho es la
// transversal larga: cruza n y termina bajo n en R, donde un cuadradito marca
// el ángulo recto con el rayo que sube formando 2x con n.
// Geometría real: α = 55°, tramo W→n a 40° bajo la horizontal (55+40 = 95 ✓),
// 2x = 90−55 = 35°.
function g5(): Figura {
  const Y_M = 45;
  const Y_N = 200;

  // Construcción encadenada con ángulos reales
  const F: Pt = { x: 168, y: Y_N };            // pie del tramo de W en n (ángulo 40°)
  const W = hastaY(F, 140, 130);               // subir a 40° sobre la horizontal hasta y=130
  const V = hastaY(W, 55, Y_M);                // subir a 55° hasta la recta m
  const Q = hastaY(V, -55, Y_N);               // transversal: bajar a 55° hasta n
  const R = avanzar(Q, -55, 30);               // seguir 30 más: termina BAJO n
  const S = hastaY(R, 35, Y_N);                // rayo perpendicular: sube a 35° y cruza n
  const finRayo = avanzar(R, 35, 118);         // extremo visible del rayo 2x
  const colaF = avanzar(W, anguloHacia(W, F), distancia(W, F) + 16); // tramo sigue un poco bajo n

  // La figura debe medir lo que dice — si no, explotar al construir.
  verificarAngulo("ángulo 95° en W", 95, anguloEn(W, V, F));
  verificarAngulo("ángulo 40° en F", 40, anguloEn(F, W, { x: F.x - 60, y: Y_N }));
  verificarAngulo("ángulo recto en R", 90, anguloEn(R, V, finRayo));
  verificarAngulo("2x = 35° en S", 35, anguloEn(S, finRayo, { x: S.x + 60, y: Y_N }));
  verificarAngulo("α izquierdo = 55°", 55, anguloEn(V, W, { x: V.x - 60, y: Y_M }));
  verificarAngulo("α derecho = 55°", 55, anguloEn(V, R, { x: V.x + 60, y: Y_M }));

  // Arcos de ángulo (como en el PDF)
  const arcoAlfaIzq = arcoAngulo(V, 180, anguloHacia(V, W), 16, 27);
  const arcoAlfaDer = arcoAngulo(V, anguloHacia(V, Q), 0, 16, 27);
  const arco95 = arcoAngulo(W, anguloHacia(W, F), anguloHacia(W, V), 14, 29);
  // La etiqueta del 95° se corre un poco hacia arriba para no quedar pegada
  // a la recta auxiliar horizontal que aparece en el paso 1.
  const etiqueta95 = avanzar(W, 26, 33);
  const arco40 = arcoAngulo(F, anguloHacia(F, W), 180, 17, 30);
  const arco2x = arcoAngulo(S, 0, 35, 19, 33);

  // Pasos de la solución: arcos de la descomposición del 95° en W
  const arco55sup = arcoAngulo(W, 0, 55, 22, 42);   // parte superior (55°)
  const arco40inf = arcoAngulo(W, -40, 0, 22, 38);  // parte inferior (40°)

  const el: Elemento[] = [
    // rectas paralelas
    { tipo: "linea", de: { x: 30, y: Y_M }, a: { x: 395, y: Y_M }, rol: "trazo", grosor: 2 },
    { tipo: "texto", en: { x: 18, y: Y_M + 4 }, texto: "m", rol: "trazo", tam: 15, cursiva: true },
    { tipo: "linea", de: { x: 30, y: Y_N }, a: { x: 395, y: Y_N }, rol: "trazo", grosor: 2 },
    { tipo: "texto", en: { x: 18, y: Y_N + 4 }, texto: "n", rol: "trazo", tam: 15, cursiva: true },
    // poligonal
    { tipo: "linea", de: V, a: W, rol: "trazo" },
    { tipo: "linea", de: W, a: colaF, rol: "trazo" },
    { tipo: "linea", de: V, a: R, rol: "trazo" },
    { tipo: "linea", de: R, a: finRayo, rol: "trazo" },
    // arcos y etiquetas de los DATOS
    { tipo: "arco", d: arcoAlfaIzq.d, rol: "incognita" },
    { tipo: "texto", en: arcoAlfaIzq.etiquetaEn, texto: "α", rol: "incognita", tam: 12 },
    { tipo: "arco", d: arcoAlfaDer.d, rol: "incognita" },
    { tipo: "texto", en: arcoAlfaDer.etiquetaEn, texto: "α", rol: "incognita", tam: 12 },
    { tipo: "arco", d: arco95.d, rol: "dato", color: ROJO },
    // la etiqueta "95°" se retira cuando el paso 1 la parte en 55° + 40°
    { tipo: "texto", en: etiqueta95, texto: "95°", rol: "dato", color: ROJO, tam: 12, negrita: true, hastaPaso: 0 },
    { tipo: "arco", d: arco40.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco40.etiquetaEn, texto: "40°", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "arco", d: arco2x.d, rol: "incognita" },
    { tipo: "texto", en: arco2x.etiquetaEn, texto: "2x", rol: "incognita", tam: 12, negrita: true },
    { tipo: "cuadradoRecto", d: cuadradoRecto(R, anguloHacia(R, V), 35, 7), rol: "trazo", relleno: true },

    // ── PASO 1: auxiliar por W + el 95° se parte en 55° + 40° ──
    { tipo: "linea", de: { x: 44, y: W.y }, a: { x: 258, y: W.y }, rol: "aux", punteada: true, desdePaso: 1 },
    { tipo: "texto", en: { x: 44, y: W.y + 12 }, texto: "auxiliar", rol: "aux", tam: 9, ancla: "start", desdePaso: 1 },
    { tipo: "arco", d: arco55sup.d, rol: "incognita", desdePaso: 1 },
    { tipo: "texto", en: arco55sup.etiquetaEn, texto: "55°", rol: "incognita", tam: 11, negrita: true, desdePaso: 1 },
    { tipo: "arco", d: arco40inf.d, rol: "aux", desdePaso: 1 },
    { tipo: "texto", en: arco40inf.etiquetaEn, texto: "40°", rol: "aux", tam: 11, negrita: true, desdePaso: 1 },
    { tipo: "linea", de: W, a: F, rol: "resalte", desdePaso: 1 },
    { tipo: "texto", en: { x: 300, y: 78 }, texto: "95° = 40° + 55°", rol: "trazo", tam: 12, negrita: true, ancla: "start", desdePaso: 1 },

    // ── PASO 2: α = 55° (correspondientes, m ∥ n) ──
    { tipo: "linea", de: V, a: W, rol: "resalte", desdePaso: 2 },
    { tipo: "texto", en: { x: 300, y: 102 }, texto: "α = 55°", rol: "incognita", tam: 12, negrita: true, ancla: "start", desdePaso: 2 },

    // ── PASO 3: la transversal y 2x = 90° − 55° = 35° ──
    { tipo: "linea", de: V, a: R, rol: "resalte", desdePaso: 3 },
    { tipo: "texto", en: { x: 300, y: 126 }, texto: "2x = 90°−55° = 35°", rol: "resultado", tam: 12, negrita: true, ancla: "start", desdePaso: 3 },
    { tipo: "texto", en: { x: 300, y: 148 }, texto: "x = 17,5°", rol: "resultado", tam: 12, negrita: true, ancla: "start", desdePaso: 3 },
  ];

  return { ancho: 420, alto: 252, pasos: 3, elementos: el };
}

// ── F10 · bloque sobre plano inclinado 37° con P y 200 m ──
// Fiel al PDF: el plano BAJA hacia la derecha; el bloque arriba a la
// izquierda; P sobre el plano cerca del final; la horizontal punteada cruza
// abajo a la derecha y el arco de 37° queda entre el plano y esa horizontal.
function f10(): Figura {
  const C: Pt = { x: 330, y: 175 };            // cruce plano-horizontal
  const INCLINACION = 143;                      // 37° sobre la horizontal, subiendo a la izquierda
  const T = avanzar(C, INCLINACION, 250);       // tope del plano
  const E = avanzar(C, INCLINACION - 180, 18);  // el plano sigue un poco más abajo del cruce
  const P = avanzar(C, INCLINACION, 26);        // punto P sobre el plano
  const bloque = bloqueSobre(avanzar(C, INCLINACION, 228), INCLINACION, 34, 26);
  const M200 = avanzar(avanzar(C, INCLINACION, 132), INCLINACION - 90, 17); // etiqueta 200 m, lado de abajo

  verificarAngulo("37° entre plano y horizontal", 37, anguloEn(C, T, { x: C.x - 60, y: C.y }));

  const arco37 = arcoAngulo(C, INCLINACION, 180, 24, 40);

  const el: Elemento[] = [
    // horizontal punteada
    { tipo: "linea", de: { x: 296, y: C.y }, a: { x: 408, y: C.y }, rol: "trazo", punteada: true },
    // plano inclinado
    { tipo: "linea", de: T, a: E, rol: "trazo", grosor: 2 },
    // bloque
    { tipo: "poligono", puntos: bloque, rol: "incognita", relleno: true },
    // P
    { tipo: "punto", en: P, rol: "resultado" },
    { tipo: "texto", en: { x: P.x + 14, y: P.y + 1 }, texto: "P", rol: "resultado", tam: 13, negrita: true },
    // 200 m a lo largo del plano
    { tipo: "texto", en: M200, texto: "200 m", rol: "trazo", tam: 12, rot: 37 },
    // arco 37°
    { tipo: "arco", d: arco37.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco37.etiquetaEn, texto: "37°", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    // μ del enunciado
    { tipo: "texto", en: { x: 120, y: 130 }, texto: "μ = 0.25", rol: "trazo", tam: 11, cursiva: true },
  ];

  return { ancho: 420, alto: 220, pasos: 0, elementos: el };
}

// ── F11 · péndulo cargado en equilibrio con campo E perpendicular al hilo ──
// Fiel al PDF: soporte con rayitas en el techo, hilo desviado α = 37° de la
// vertical (línea punteada vertical como referencia), bolita cargada al
// final, y líneas de campo E paralelas entre sí, PERPENDICULARES al hilo
// (esa perpendicularidad es la clave física del "mínimo E"). Un segundo α
// marca el ángulo entre las líneas de campo y la horizontal punteada.
function f11(): Figura {
  const A: Pt = { x: 262, y: 36 };            // anclaje en el techo
  const DIR_CUERDA = -53;                      // vertical (-90°) desviada 37° hacia la derecha
  const B = avanzar(A, DIR_CUERDA, 132);       // bolita
  const DIR_CAMPO = DIR_CUERDA + 90;           // 37°: perpendicular al hilo, hacia arriba-derecha
  const bajoVertical = { x: A.x, y: A.y + 100 };

  verificarAngulo("α hilo-vertical = 37°", 37, anguloEn(A, B, bajoVertical));
  verificarAngulo("campo ⊥ hilo", 90, Math.abs(DIR_CAMPO - DIR_CUERDA));

  const arcoAlfaHilo = arcoAngulo(A, -90, DIR_CUERDA, 34, 46);
  const finHorizontal = { x: B.x + 78, y: B.y };
  const arcoAlfaCampo = arcoAngulo(B, 0, DIR_CAMPO, 26, 38);

  const el: Elemento[] = [
    // techo: línea de soporte + rayitas
    { tipo: "linea", de: { x: A.x - 30, y: A.y }, a: { x: A.x + 30, y: A.y }, rol: "trazo", grosor: 2 },
  ];
  for (let i = 0; i < 6; i++) {
    const pie = { x: A.x - 25 + i * 10, y: A.y };
    el.push({ tipo: "linea", de: pie, a: avanzar(pie, 120, 10), rol: "trazo", grosor: 1 });
  }

  el.push(
    // referencia vertical punteada + α del hilo
    { tipo: "linea", de: A, a: bajoVertical, rol: "trazo", punteada: true },
    { tipo: "arco", d: arcoAlfaHilo.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlfaHilo.etiquetaEn, texto: "α", rol: "dato", color: AMBAR, tam: 13, negrita: true },
    // hilo y bolita cargada
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: B, rol: "incognita", r: 8 },
    { tipo: "texto", en: { x: B.x - 16, y: B.y + 16 }, texto: "q₀", rol: "incognita", tam: 12, negrita: true },
    // horizontal punteada por la bolita + α del campo
    { tipo: "linea", de: B, a: finHorizontal, rol: "trazo", punteada: true },
    { tipo: "arco", d: arcoAlfaCampo.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlfaCampo.etiquetaEn, texto: "α", rol: "dato", color: AMBAR, tam: 13, negrita: true },
  );

  // líneas de campo E: paralelas, perpendiculares al hilo, con flecha
  for (let i = 0; i < 5; i++) {
    const inicio = { x: 64 + i * 52, y: 216 };
    const fin = avanzar(inicio, DIR_CAMPO, 150 + (i % 2) * 16);
    el.push(
      { tipo: "linea", de: inicio, a: fin, rol: "aux", color: VERDE, grosor: 1.4 },
      { tipo: "path", d: cabezaFlecha(fin, DIR_CAMPO), rol: "aux", color: VERDE, relleno: true },
    );
  }
  el.push({ tipo: "texto", en: { x: 14, y: 240 }, texto: "líneas de campo E (⊥ al hilo)", rol: "aux", color: VERDE, tam: 10, ancla: "start" });

  return { ancho: 420, alto: 252, pasos: 0, elementos: el };
}

const CONSTRUCTORES: Record<string, () => Figura> = {
  "g5-paralelas": g5,
  "f10-plano": f10,
  "f11-campo": f11,
};

// Cache: la construcción corre una vez por id (las verificaciones también).
const cache = new Map<string, Figura>();

export function construirFigura(id: string): Figura | null {
  const ctor = CONSTRUCTORES[id];
  if (!ctor) return null;
  if (!cache.has(id)) cache.set(id, ctor());
  return cache.get(id)!;
}

export { NAVY, ROJO, AMBAR, VIOLETA, VERDE };

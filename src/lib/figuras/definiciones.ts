// Definiciones declarativas de las figuras de examen construidas con el
// motor de geometría. Cada figura se DECLARA con los ángulos reales del
// problema y los puntos se calculan; las verificaciones explotan si la
// figura no cumple lo que sus propias etiquetas dicen.

import {
  type Elemento,
  type Figura,
  type Pt,
  type Rol,
  anguloEn,
  anguloHacia,
  arcoAngulo,
  avanzar,
  bloqueSobre,
  cabezaFlecha,
  cuadradoRecto,
  distancia,
  hastaY,
  incirculo,
  resistorZigzag,
  verificarAngulo,
  verificarDistancia,
} from "./motor.ts";

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
// F10 reconstruida siguiendo AL PIE DE LA LETRA la descripción dictada por
// Ronald sobre el recorte nítido del PDF (19-jul-2026) — no simplificar
// ningún elemento de esta lista:
// 1. Plano baja de izquierda a derecha; 37° con la horizontal.
// 2. El 37° está marcado en la ESQUINA INFERIOR DERECHA (entre la colita
//    del plano que sigue más allá del cruce y la horizontal hacia la
//    derecha) con un arco GRANDE Y CLARO — notablemente más grande que el
//    texto "37°" — y la etiqueta bien DENTRO de la cuña, separada de la
//    hipotenusa (no pegada a la banda).
// 3. Horizontal punteada CORTA que sale apenas a la derecha del vértice
//    (dos rayitas nomás, no una línea larga hacia la izquierda).
// 4. Bloque GRANDE, casi cuadrado, gris sólido, en el extremo superior
//    izquierdo de la rampa, CASI TOCANDO el borde superior del dibujo.
// 5. Debajo del bloque, sobre la rampa: cota con dos rayitas verticales
//    cortas y "200 m" centrado.
// 6. "P" pegada INMEDIATAMENTE a la derecha de la cota, AL MISMO NIVEL de
//    la rampa (texto sin rotar, no flotando).
// 7. La rampa tiene un grosor/sombra gris clara por debajo.
function f10(): Figura {
  const C: Pt = { x: 330, y: 195 };             // cruce plano-horizontal (vértice del ángulo real)
  const INCLINACION = 143;                       // 37° sobre la horizontal, subiendo a la izquierda
  const T = avanzar(C, INCLINACION, 258);        // tope del plano (extremo superior izquierdo)
  const E = avanzar(C, INCLINACION - 180, 42);   // colita del plano: sigue un poco MÁS ALLÁ del cruce
  const NORMAL = INCLINACION + 90;               // grosor de la banda, hacia "abajo" de la rampa
  const ANCHO_BANDA = 7;
  const banda = [T, E, avanzar(E, NORMAL, ANCHO_BANDA), avanzar(T, NORMAL, ANCHO_BANDA)];

  // Bloque GRANDE y casi cuadrado, pegado al extremo T (casi toca el borde
  // superior del viewBox).
  const bloque = bloqueSobre(avanzar(T, INCLINACION - 180, 21), INCLINACION, 48, 42);

  // Cota "200 m": dos rayitas verticales sobre la rampa, una justo bajo el
  // bloque y otra en P (cerca del cruce).
  const tickArriba = avanzar(C, INCLINACION, 202);
  const P = avanzar(C, INCLINACION, 32);
  const M200 = avanzar(avanzar(C, INCLINACION, (202 + 32) / 2), NORMAL, 22);

  verificarAngulo("37° entre plano y horizontal", 37, anguloEn(C, T, { x: C.x - 60, y: C.y }));

  // El ángulo que se MARCA es el de la esquina inferior derecha: entre la
  // horizontal hacia la derecha (0°) y la colita del plano (E), que apunta
  // a INCLINACION-180 = -37°. Arco GRANDE (radio 36, casi 3x el tamaño de
  // fuente de "37°") y etiqueta bien adentro de la cuña, sesgada hacia el
  // lado horizontal (ángulo -11° en vez del bisector -18.5°) para separarla
  // claramente de la hipotenusa del plano.
  const DIR_COLA = INCLINACION - 180;
  const arco37 = arcoAngulo(C, 0, DIR_COLA, 36, 999);
  const etiqueta37 = avanzar(C, -11, 60);

  const el: Elemento[] = [
    // horizontal punteada CORTA, apenas a la derecha del vértice (2 rayitas)
    { tipo: "linea", de: { x: C.x - 4, y: C.y }, a: { x: C.x + 44, y: C.y }, rol: "trazo", punteada: true },
    // sombra/banda gris clara de la rampa
    { tipo: "poligono", puntos: banda, rol: "trazo", relleno: true, rellenoColor: "#d9d9d5" },
    // bloque gris sólido, grande y casi cuadrado
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#8c8c94" },
    // las dos rayitas cortas de la cota "200 m"
    { tipo: "linea", de: avanzar(tickArriba, INCLINACION - 90, 4), a: avanzar(tickArriba, NORMAL, ANCHO_BANDA + 4), rol: "trazo", grosor: 1.2 },
    { tipo: "linea", de: avanzar(P, INCLINACION - 90, 4), a: avanzar(P, NORMAL, ANCHO_BANDA + 4), rol: "trazo", grosor: 1.2 },
    { tipo: "texto", en: M200, texto: "200 m", rol: "trazo", tam: 12, rot: 37, cursiva: true },
    // "P": pegada a la cota, AL MISMO NIVEL de la rampa, sin rotar
    { tipo: "texto", en: avanzar(P, 0, 24), texto: "P", rol: "trazo", tam: 13, negrita: true, cursiva: true },
    // arco 37° grande y claro, etiqueta bien adentro de la cuña
    { tipo: "arco", d: arco37.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: etiqueta37, texto: "37°", rol: "dato", color: AMBAR, tam: 13, negrita: true },
  ];

  return { ancho: 420, alto: 250, pasos: 0, elementos: el };
}

// ── F11 · péndulo cargado en equilibrio con campo E perpendicular al hilo ──
// Fiel al PDF: soporte con rayitas en el techo, hilo desviado α = 37° de la
// vertical (línea punteada vertical como referencia), bolita cargada al
// final, y líneas de campo E paralelas entre sí, PERPENDICULARES al hilo
// (esa perpendicularidad es la clave física del "mínimo E"). Un segundo α
// marca el ángulo entre las líneas de campo y la horizontal punteada.
// F11 reconstruida contra la imagen LIMPIA de referencia (19-jul-2026,
// segunda vuelta): la primera descripción dictada por texto decía que el
// campo iba "casi horizontal, apenas hacia abajo" — al recibir la imagen
// nítida se vio que en realidad va bien EMPINADO hacia arriba-derecha,
// PERPENDICULAR al hilo (coincide con la física: E⊥hilo para el mínimo).
// Lección: cuando el texto dictado y la imagen nítida no coinciden, manda
// la imagen. Elementos confirmados contra la referencia:
// 1. Soporte triangular con rayitas en el techo.
// 2. Hilo desviado a la derecha, α=37° con la vertical punteada (1er α,
//    arriba, junto al soporte).
// 3. 2º α: a media cuerda, entre una horizontal punteada corta y la
//    dirección del campo.
// 4. Bolita: círculo VACÍO (sin punto adentro).
// 5. 5-6 flechas paralelas, empinadas hacia arriba-derecha, perpendiculares
//    al hilo, cruzando toda la región (una pasa cerca de la bolita).
function f11(): Figura {
  const G: Pt = { x: 214, y: 34 };             // centro del soporte en el techo
  const A: Pt = { x: G.x, y: G.y + 12 };       // punta del soporte: de acá cuelga el hilo
  const DIR_CUERDA = -53;                      // vertical (-90°) desviada 37° hacia la derecha
  const B = avanzar(A, DIR_CUERDA, 132);       // bolita
  const DIR_CAMPO = DIR_CUERDA + 90;           // 37°: perpendicular al hilo, empinado arriba-derecha
  const bajoVertical = { x: A.x, y: A.y + 128 };
  const S = avanzar(A, DIR_CUERDA, 74);        // punto a media cuerda: ahí va el 2º α

  verificarAngulo("α hilo-vertical = 37°", 37, anguloEn(A, B, bajoVertical));
  verificarAngulo("campo ⊥ hilo", 90, Math.abs(DIR_CAMPO - DIR_CUERDA));

  const arcoAlfaHilo = arcoAngulo(A, -90, DIR_CUERDA, 26, 38);
  const arcoAlfaCampo = arcoAngulo(S, 0, DIR_CAMPO, 20, 30);

  const el: Elemento[] = [
    // soporte del techo: rayitas + triangulito colgante
    { tipo: "linea", de: { x: G.x - 22, y: G.y }, a: { x: G.x + 22, y: G.y }, rol: "trazo", grosor: 1.8 },
  ];
  for (let i = 0; i < 5; i++) {
    const pie = { x: G.x - 18 + i * 9, y: G.y };
    el.push({ tipo: "linea", de: pie, a: avanzar(pie, 120, 9), rol: "trazo", grosor: 1 });
  }
  el.push(
    { tipo: "poligono", puntos: [{ x: G.x - 8, y: G.y }, { x: G.x + 8, y: G.y }, A], rol: "trazo" },
    // referencia vertical punteada + 1er α (hilo vs. vertical, junto al techo)
    { tipo: "linea", de: A, a: bajoVertical, rol: "trazo", punteada: true },
    { tipo: "arco", d: arcoAlfaHilo.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlfaHilo.etiquetaEn, texto: "α", rol: "dato", color: AMBAR, tam: 13, negrita: true },
    // hilo
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 1.8 },
    // 2º α: a media cuerda, horizontal punteada corta + arco hacia el campo
    { tipo: "linea", de: S, a: { x: S.x + 64, y: S.y }, rol: "trazo", punteada: true },
    { tipo: "arco", d: arcoAlfaCampo.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlfaCampo.etiquetaEn, texto: "α", rol: "dato", color: AMBAR, tam: 13, negrita: true },
  );

  // Líneas de campo: 6 flechas paralelas, empinadas arriba-derecha
  // (perpendiculares al hilo), cruzando toda la región — una pasa cerca de
  // la bolita. Se dibujan antes que la bolita para que quede por encima.
  // Cada fila se desplaza desde S en la dirección PERPENDICULAR al campo
  // (la dirección del propio hilo) — así quedan genuinamente paralelas Y,
  // clave, la fila de desplazamiento 0 pasa EXACTO por S: esa es la línea
  // real contra la que se mide el 2º α (no un arco flotando sin ningún
  // trazo que lo sostenga, como pasó en el primer intento).
  const OFFSETS = [-2, -1, 0, 1, 2, 3];
  for (const o of OFFSETS) {
    const filaS = avanzar(S, DIR_CUERDA, o * 32);
    const inicio = avanzar(filaS, DIR_CAMPO + 180, 80);
    const fin = avanzar(filaS, DIR_CAMPO, 88);
    el.push(
      { tipo: "linea", de: inicio, a: fin, rol: "trazo", grosor: 1.2 },
      { tipo: "path", d: cabezaFlecha(fin, DIR_CAMPO, 6), rol: "trazo", relleno: true },
    );
  }

  // Bolita: círculo VACÍO, sin punto adentro (como la referencia).
  el.push({ tipo: "punto", en: B, rol: "trazo", r: 9 });

  return { ancho: 420, alto: 330, pasos: 0, elementos: el };
}

// ── G6 · triángulo isósceles con cadena BC = BF = FE = ED = DA ──
// Construida con la solución real (θ = 20°): A a la derecha con el ángulo θ,
// B arriba-izquierda, C abajo-izquierda; E sobre AB; D y F sobre AC. La
// gracia: la cadena de 5 segmentos iguales SOLO cierra si θ = 20° — la
// propia construcción valida la respuesta (verificamos las 4 distancias).
function g6(): Figura {
  const TH = 20;                                  // ∡BAC (la respuesta del problema)
  const A: Pt = { x: 392, y: 122 };
  const L = 330;                                  // AB = AC
  const B = avanzar(A, 180 - TH / 2, L);          // arriba-izquierda
  const C = avanzar(A, 180 + TH / 2, L);          // abajo-izquierda
  const s = distancia(B, C);                      // BC = paso de la cadena

  const dirAC = anguloHacia(A, C);
  const dirAB = anguloHacia(A, B);
  const D = avanzar(A, dirAC, s);                             // DA = s
  const E = avanzar(A, dirAB, 2 * s * Math.cos(TH * Math.PI / 180));  // ED = s
  const F = avanzar(A, dirAC, distancia(A, D) + 2 * s * Math.cos(2 * TH * Math.PI / 180)); // FE = s

  // La cadena debe cerrar EXACTA con θ = 20°.
  verificarAngulo("∡BAC = 20°", TH, anguloEn(A, B, C));
  verificarDistancia("ED = BC", s, distancia(E, D));
  verificarDistancia("FE = BC", s, distancia(F, E));
  verificarDistancia("BF = BC", s, distancia(B, F));
  // Ángulos de la cadena (2θ, 3θ, 4θ) que se van revelando en los pasos
  verificarAngulo("∡EDC = 2θ", 2 * TH, anguloEn(D, E, C));
  verificarAngulo("∡FEB = 3θ", 3 * TH, anguloEn(E, F, B));
  verificarAngulo("∡BFC = 4θ", 4 * TH, anguloEn(F, B, C));
  verificarAngulo("∡BCA = 4θ (base del isósceles)", 4 * TH, anguloEn(C, B, A));

  // etiqueta a radio 62: el ángulo en A es tan agudo (20°) que más cerca
  // queda pisada por los dos lados del triángulo
  const arcoTheta = arcoAngulo(A, dirAB, dirAC, 30, 62);
  const arco2t = arcoAngulo(D, anguloHacia(D, E), anguloHacia(D, C), 16, 28);
  const arco3t = arcoAngulo(E, anguloHacia(E, F), anguloHacia(E, B), 14, 26);
  const arco4t = arcoAngulo(F, anguloHacia(F, B), anguloHacia(F, C), 13, 26);

  const el: Elemento[] = [
    // triángulo
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: A, a: C, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: B, a: C, rol: "trazo", grosor: 1.8 },
    // cadena interna
    { tipo: "linea", de: D, a: E, rol: "incognita" },
    { tipo: "linea", de: E, a: F, rol: "incognita" },
    { tipo: "linea", de: F, a: B, rol: "incognita" },
    // rótulos de vértices
    { tipo: "texto", en: { x: B.x - 10, y: B.y - 8 }, texto: "B", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: C.x - 10, y: C.y + 12 }, texto: "C", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: A.x + 12, y: A.y }, texto: "A", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: E.x + 2, y: E.y - 12 }, texto: "E", rol: "trazo", tam: 12 },
    { tipo: "texto", en: { x: D.x + 4, y: D.y + 14 }, texto: "D", rol: "trazo", tam: 12 },
    { tipo: "texto", en: { x: F.x - 2, y: F.y + 15 }, texto: "F", rol: "trazo", tam: 12 },
    // dato del problema + incógnita
    { tipo: "texto", en: { x: 150, y: 22 }, texto: "BC = BF = FE = ED = DA", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arcoTheta.d, rol: "incognita" },
    { tipo: "texto", en: arcoTheta.etiquetaEn, texto: "θ = ?", rol: "incognita", tam: 11, negrita: true },

    // PASO 1 · triángulo ADE: base θ, exterior 2θ en D
    { tipo: "linea", de: D, a: E, rol: "resalte", desdePaso: 1 },
    { tipo: "arco", d: arco2t.d, rol: "resultado", desdePaso: 1 },
    { tipo: "texto", en: arco2t.etiquetaEn, texto: "2θ", rol: "resultado", tam: 11, negrita: true, desdePaso: 1 },
    { tipo: "texto", en: { x: 116, y: 226 }, texto: "en D: θ + θ = 2θ (ángulo exterior)", rol: "resultado", tam: 11, ancla: "start", desdePaso: 1, hastaPaso: 1 },

    // PASO 2 · triángulo DEF: aparece 3θ en E
    { tipo: "linea", de: E, a: F, rol: "resalte", desdePaso: 2 },
    { tipo: "arco", d: arco3t.d, rol: "resultado", desdePaso: 2 },
    { tipo: "texto", en: arco3t.etiquetaEn, texto: "3θ", rol: "resultado", tam: 11, negrita: true, desdePaso: 2 },
    { tipo: "texto", en: { x: 116, y: 226 }, texto: "en E: 2θ + θ = 3θ", rol: "resultado", tam: 11, ancla: "start", desdePaso: 2, hastaPaso: 2 },

    // PASO 3 · triángulo EFB: aparece 4θ en F
    { tipo: "linea", de: F, a: B, rol: "resalte", desdePaso: 3 },
    { tipo: "arco", d: arco4t.d, rol: "resultado", desdePaso: 3 },
    { tipo: "texto", en: arco4t.etiquetaEn, texto: "4θ", rol: "resultado", tam: 11, negrita: true, desdePaso: 3 },
    { tipo: "texto", en: { x: 116, y: 226 }, texto: "en F: 3θ + θ = 4θ", rol: "resultado", tam: 11, ancla: "start", desdePaso: 3, hastaPaso: 3 },

    // PASO 4 · base del isósceles: 4θ = 90 − θ/2 → θ = 20°
    { tipo: "linea", de: B, a: C, rol: "resalte", desdePaso: 4 },
    { tipo: "texto", en: { x: 116, y: 226 }, texto: "4θ = 90° − θ/2  →  θ = 20°", rol: "resultado", tam: 12, negrita: true, ancla: "start", desdePaso: 4 },
  ];

  return { ancho: 420, alto: 240, pasos: 4, elementos: el };
}

// ── G7 · cuadrado de lado 4 inscrito en triángulo isósceles (ápice 120°) ──
// Dibujada A ESCALA con la respuesta real: b = 4(2√3+1) ≈ 17,86. Los
// vértices superiores del cuadrado se calculan como INTERSECCIÓN con los
// lados del triángulo — tocan los lados por construcción, no a ojo.
function g7(): Figura {
  const Y_BASE = 196;
  const bReal = 4 * (2 * Math.sqrt(3) + 1);      // ≈ 17,856 (la respuesta)
  const escala = 320 / bReal;                     // px por unidad
  const ladoPx = 4 * escala;                      // cuadrado de lado 4, a escala

  const Aiz: Pt = { x: 50, y: Y_BASE };
  const Cde: Pt = { x: 50 + bReal * escala, y: Y_BASE };
  const M: Pt = { x: (Aiz.x + Cde.x) / 2, y: Y_BASE - (bReal / (2 * Math.sqrt(3))) * escala }; // ápice

  // esquinas superiores del cuadrado: intersección de los lados con la altura del cuadrado
  const yTope = Y_BASE - ladoPx;
  const tl = hastaY(Aiz, anguloHacia(Aiz, M), yTope);
  const tr = hastaY(Cde, anguloHacia(Cde, M), yTope);

  verificarAngulo("ápice = 120°", 120, anguloEn(M, Aiz, Cde));
  verificarAngulo("base = 30°", 30, anguloEn(Aiz, M, Cde));
  verificarDistancia("el tope del cuadrado mide igual que su lado", ladoPx, distancia(tl, tr));

  const arco120 = arcoAngulo(M, anguloHacia(M, Aiz), anguloHacia(M, Cde), 18, 32);
  const arco30i = arcoAngulo(Aiz, anguloHacia(Aiz, M), 0, 24, 38);
  const arco30d = arcoAngulo(Cde, 180, anguloHacia(Cde, M), 24, 38);

  const el: Elemento[] = [
    // triángulo
    { tipo: "linea", de: Aiz, a: M, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: M, a: Cde, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: Aiz, a: Cde, rol: "trazo", grosor: 1.8 },
    // Composición calcada del PDF: B arriba del ápice, 120° AFUERA a la
    // derecha del ápice, "4" adentro del cuadrado (arriba) y a la derecha,
    // "b" simple sobre la base. El cuadrado va SIN relleno, como el PDF.
    { tipo: "texto", en: { x: M.x - 6, y: M.y - 13 }, texto: "B", rol: "trazo", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: { x: Aiz.x - 12, y: Aiz.y + 4 }, texto: "A", rol: "trazo", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: { x: Cde.x + 12, y: Cde.y + 4 }, texto: "C", rol: "trazo", tam: 14, negrita: true, cursiva: true },
    { tipo: "arco", d: arco120.d, rol: "dato", color: ROJO },
    { tipo: "texto", en: { x: M.x + 42, y: M.y - 8 }, texto: "120°", rol: "dato", color: ROJO, tam: 11, negrita: true, cursiva: true },
    { tipo: "linea", de: avanzar(M, -30, 18), a: { x: M.x + 27, y: M.y - 9 }, rol: "dato", color: ROJO, grosor: 1 },
    // cuadrado inscrito (las esquinas superiores TOCAN los lados por construcción)
    { tipo: "poligono", puntos: [{ x: tl.x, y: Y_BASE }, tl, tr, { x: tr.x, y: Y_BASE }], rol: "trazo" },
    { tipo: "texto", en: { x: (tl.x + tr.x) / 2, y: yTope + 12 }, texto: "4", rol: "trazo", tam: 12, cursiva: true },
    { tipo: "texto", en: { x: tr.x + 11, y: (yTope + Y_BASE) / 2 }, texto: "4", rol: "trazo", tam: 12, cursiva: true },
    { tipo: "texto", en: { x: (Aiz.x + Cde.x) / 2, y: Y_BASE + 14 }, texto: "b", rol: "trazo", tam: 13, cursiva: true },

    // PASO 1 · ángulos de la base (30°) y la altura H
    { tipo: "arco", d: arco30i.d, rol: "dato", color: AMBAR, desdePaso: 1 },
    { tipo: "texto", en: arco30i.etiquetaEn, texto: "30°", rol: "dato", color: AMBAR, tam: 11, negrita: true, desdePaso: 1 },
    { tipo: "arco", d: arco30d.d, rol: "dato", color: AMBAR, desdePaso: 1 },
    { tipo: "texto", en: arco30d.etiquetaEn, texto: "30°", rol: "dato", color: AMBAR, tam: 11, negrita: true, desdePaso: 1 },
    { tipo: "linea", de: M, a: { x: M.x, y: Y_BASE }, rol: "aux", punteada: true, desdePaso: 1 },
    { tipo: "texto", en: { x: M.x + 14, y: (M.y + Y_BASE) / 2 + 14 }, texto: "H", rol: "aux", tam: 12, cursiva: true, desdePaso: 1 },

    // PASO 2 · el triangulito de arriba es semejante al grande
    { tipo: "linea", de: tl, a: M, rol: "resalte", desdePaso: 2 },
    { tipo: "linea", de: M, a: tr, rol: "resalte", desdePaso: 2 },
    { tipo: "linea", de: tl, a: tr, rol: "resalte", desdePaso: 2 },
    { tipo: "texto", en: { x: 78, y: 40 }, texto: "triangulito ~ triángulo grande", rol: "resultado", tam: 11, ancla: "start", desdePaso: 2, hastaPaso: 2 },

    // PASO 3 · la fórmula y el valor real de b
    { tipo: "texto", en: { x: 78, y: 40 }, texto: "lado = b/(2√3 + 1)  →  b = 4(2√3+1) ≈ 17,86", rol: "resultado", tam: 12, negrita: true, ancla: "start", desdePaso: 3 },
  ];

  return { ancho: 420, alto: 236, pasos: 3, elementos: el };
}

// ── F12 · circuito: Req entre A y B (15, 5 y tres de 10 Ω) ──
// Fiel al recorte nítido del PDF (19-jul-2026): rectángulo exterior con
// 10Ω en el borde izquierdo; 15Ω cuelga del riel superior y termina en A
// (terminal); 5Ω en el borde derecho baja hasta el riel de B; del riel de
// B bajan DOS 10Ω al riel inferior. A y B quedan enfrentados y abiertos.
// Pasos: 1) 10∥10 = 5 entre B y D; 2) T→B: 5 ∥ (10+5) = 3,75;
// 3) Req = 15 + 3,75 = 18,75 → E) Ninguno.
function f12(): Figura {
  const IZQ = 62, DER = 378, ARR = 30, ABA = 198;
  const XM = 208;              // rama del 15Ω / A / B
  const X1 = 282;              // 10Ω del medio (cuelga del riel de B)
  const X2 = DER;              // 10Ω derecho: SOBRE el borde derecho, debajo del 5Ω (como el PDF)
  const Y_RIEL_B = 132;        // riel de B

  const A: Pt = { x: XM, y: 110 };
  const B: Pt = { x: XM, y: Y_RIEL_B };

  const el: Elemento[] = [
    // rieles superior e inferior
    { tipo: "linea", de: { x: IZQ, y: ARR }, a: { x: DER, y: ARR }, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: { x: IZQ, y: ABA }, a: { x: DER, y: ABA }, rol: "trazo", grosor: 1.8 },
    // borde izquierdo con 10Ω
    { tipo: "path", d: resistorZigzag({ x: IZQ, y: ARR }, { x: IZQ, y: ABA }), rol: "trazo" },
    { tipo: "texto", en: { x: IZQ - 22, y: 114 }, texto: "10 Ω", rol: "trazo", tam: 11 },
    // rama del 15Ω hasta A
    { tipo: "path", d: resistorZigzag({ x: XM, y: ARR }, A), rol: "trazo" },
    { tipo: "texto", en: { x: XM - 26, y: 68 }, texto: "15 Ω", rol: "trazo", tam: 11 },
    { tipo: "punto", en: A, rol: "trazo" },
    { tipo: "texto", en: { x: A.x - 14, y: A.y - 2 }, texto: "A", rol: "trazo", tam: 13, negrita: true },
    // terminal B (abierto frente a A) y su riel hasta el borde derecho
    { tipo: "punto", en: B, rol: "trazo" },
    { tipo: "texto", en: { x: B.x - 14, y: B.y + 6 }, texto: "B", rol: "trazo", tam: 13, negrita: true },
    { tipo: "linea", de: B, a: { x: DER, y: Y_RIEL_B }, rol: "trazo", grosor: 1.6 },
    // 5Ω en el borde derecho, del riel superior al riel de B
    { tipo: "path", d: resistorZigzag({ x: DER, y: ARR }, { x: DER, y: Y_RIEL_B }), rol: "trazo" },
    { tipo: "texto", en: { x: DER + 20, y: 78 }, texto: "5 Ω", rol: "trazo", tam: 11 },
    // los dos 10Ω del riel de B al riel inferior: uno cuelga del riel, el
    // otro está sobre el borde derecho (continuación del 5Ω), como el PDF
    { tipo: "path", d: resistorZigzag({ x: X1, y: Y_RIEL_B }, { x: X1, y: ABA }), rol: "trazo" },
    { tipo: "texto", en: { x: X1 - 22, y: 168 }, texto: "10 Ω", rol: "trazo", tam: 11 },
    { tipo: "path", d: resistorZigzag({ x: X2, y: Y_RIEL_B }, { x: X2, y: ABA }), rol: "trazo" },
    { tipo: "texto", en: { x: X2 + 24, y: 168 }, texto: "10 Ω", rol: "trazo", tam: 11 },

    // PASO 1 · los dos 10Ω en paralelo (B→D) = 5Ω
    { tipo: "path", d: resistorZigzag({ x: X1, y: Y_RIEL_B }, { x: X1, y: ABA }), rol: "resalte", desdePaso: 1 },
    { tipo: "path", d: resistorZigzag({ x: X2, y: Y_RIEL_B }, { x: X2, y: ABA }), rol: "resalte", desdePaso: 1 },
    { tipo: "texto", en: { x: 90, y: 224 }, texto: "10 ∥ 10 = 5 Ω entre B y el riel de abajo", rol: "resultado", tam: 11, ancla: "start", desdePaso: 1, hastaPaso: 1 },

    // PASO 2 · de T a B: 5 directo ∥ (10 + 5) = 3,75
    { tipo: "path", d: resistorZigzag({ x: DER, y: ARR }, { x: DER, y: Y_RIEL_B }), rol: "resalte", desdePaso: 2 },
    { tipo: "path", d: resistorZigzag({ x: IZQ, y: ARR }, { x: IZQ, y: ABA }), rol: "resalte", desdePaso: 2 },
    { tipo: "texto", en: { x: 90, y: 224 }, texto: "arriba → B:  5 ∥ (10 + 5) = 3,75 Ω", rol: "resultado", tam: 11, ancla: "start", desdePaso: 2, hastaPaso: 2 },

    // PASO 3 · el 15 está en serie obligada con A
    { tipo: "path", d: resistorZigzag({ x: XM, y: ARR }, A), rol: "resalte", desdePaso: 3 },
    { tipo: "texto", en: { x: 90, y: 224 }, texto: "Req = 15 + 3,75 = 18,75 Ω → no está: E) Ninguno", rol: "resultado", tam: 12, negrita: true, ancla: "start", desdePaso: 3 },
  ];

  return { ancho: 420, alto: 236, pasos: 3, elementos: el };
}

// ══════════════ Examen 2-2022 (1ra Opción) ══════════════

// ── G5(2022) · triángulo equilátero ABC con PQR inscrito, PQ⊥BC ──
// Coordenadas calculadas algebraicamente (no a ojo): con lado s del
// triángulo grande, el lado de PQR es L=s/√3 y P queda a 2s/3 de B sobre
// BC. Verificado: PQR es equilátero (los 3 lados miden L) y PQ⊥BC.
function g5b(): Figura {
  const s = 300;
  const B: Pt = { x: 60, y: 280 };
  const C: Pt = { x: 60 + s, y: 280 };
  const A: Pt = { x: 60 + s / 2, y: 280 - (s * Math.sqrt(3)) / 2 };
  const L = s / Math.sqrt(3);
  const p = (2 * s) / 3; // distancia de B a P sobre BC
  const P: Pt = { x: B.x + p, y: 280 };
  const Q: Pt = { x: P.x, y: 280 - Math.sqrt(3) * (s - p) };
  const R: Pt = { x: B.x + p - (L * Math.sqrt(3)) / 2, y: 280 - L / 2 };

  verificarDistancia("PQ = L", L, distancia(P, Q));
  verificarDistancia("QR = L", L, distancia(Q, R));
  verificarDistancia("PR = L", L, distancia(P, R));
  verificarAngulo("PQ ⊥ BC", 90, anguloEn(P, Q, C));
  verificarAngulo("∡ABC = 60°", 60, anguloEn(B, A, C));

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C], rol: "trazo" },
    { tipo: "poligono", puntos: [P, Q, R], rol: "incognita" },
    { tipo: "texto", en: { x: A.x, y: A.y - 12 }, texto: "A", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: B.x - 16, y: B.y + 6 }, texto: "B", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: C.x + 16, y: C.y + 6 }, texto: "C", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: Q.x + 14, y: Q.y }, texto: "Q", rol: "incognita", tam: 12 },
    { tipo: "texto", en: { x: R.x - 14, y: R.y }, texto: "R", rol: "incognita", tam: 12 },
    { tipo: "texto", en: { x: P.x, y: P.y + 16 }, texto: "P", rol: "incognita", tam: 12 },
    { tipo: "cuadradoRecto", d: cuadradoRecto(P, 90, 180, 8), rol: "trazo" },
  ];
  return { ancho: 420, alto: 300, pasos: 0, elementos: el };
}

// ── G6(2022) · cuadrilátero PQRS con dos incírculos (esquemático) ──
// No hay longitudes reales dadas en el enunciado más que los dos radios y
// el perímetro (la figura del PDF tampoco está a escala) — este esquema
// respeta la topología: diagonal PR, ángulo recto en Q y en S, un círculo
// inscrito en cada triángulo con su radio rotulado.
function g6b(): Figura {
  // Reconstruida contra el PDF real (19-jul-2026): S va PEGADO cerca de R
  // (triángulo PRS angosto, no un cuadrilátero simétrico), y los círculos
  // son INCÍRCULOS reales (tangentes a los 3 lados), no puestos a ojo.
  // Q y S siguen sobre la circunferencia de diámetro PR (Thales): cualquier
  // punto de esa circunferencia ve PR bajo ángulo recto, exacto.
  const P: Pt = { x: 60, y: 225 };
  const R: Pt = { x: 365, y: 150 };
  const M: Pt = { x: (P.x + R.x) / 2, y: (P.y + R.y) / 2 };
  const radio = distancia(P, R) / 2;
  const yEnCirculo = (x: number, arriba: boolean) => {
    const dy = Math.sqrt(Math.max(0, radio * radio - (x - M.x) ** 2));
    return arriba ? M.y - dy : M.y + dy;
  };
  const Q: Pt = { x: 180, y: yEnCirculo(180, true) };
  const S: Pt = { x: 330, y: yEnCirculo(330, false) }; // cerca de R en x -> triángulo PRS angosto
  verificarAngulo("∡PQR = 90°", 90, anguloEn(Q, P, R));
  verificarAngulo("∡PSR = 90°", 90, anguloEn(S, P, R));

  const { centro: centroPQR, radio: radioPQR } = incirculo(P, Q, R);
  const { centro: centroPRS, radio: radioPRS } = incirculo(P, R, S);

  const el: Elemento[] = [
    { tipo: "linea", de: P, a: Q, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: Q, a: R, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: R, a: S, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: S, a: P, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: P, a: R, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: P.x - 16, y: P.y }, texto: "P", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: Q.x, y: Q.y - 12 }, texto: "Q", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: R.x + 16, y: R.y }, texto: "R", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: S.x + 4, y: S.y + 16 }, texto: "S", rol: "trazo", tam: 14, negrita: true },
    { tipo: "cuadradoRecto", d: cuadradoRecto(Q, anguloHacia(Q, P), anguloHacia(Q, R), 10), rol: "dato", color: AMBAR },
    { tipo: "cuadradoRecto", d: cuadradoRecto(S, anguloHacia(S, R), anguloHacia(S, P), 8), rol: "dato", color: AMBAR },
    { tipo: "punto", en: centroPQR, rol: "incognita", r: radioPQR },
    { tipo: "texto", en: centroPQR, texto: "3", rol: "incognita", tam: 13, negrita: true },
    { tipo: "punto", en: centroPRS, rol: "incognita", r: radioPRS },
    { tipo: "texto", en: centroPRS, texto: "2", rol: "incognita", tam: 12, negrita: true },
  ];
  return { ancho: 420, alto: 320, pasos: 0, elementos: el };
}

// ── F9(2022) · móvil con velocidad constante, tres instantes ──
// Arco puente (bezier cuadrático) entre dos puntos a la misma altura, usado
// para el corchete de TIEMPO arriba de la pista (como en el PDF).
function arcoPuente(de: Pt, a: Pt, altura: number): string {
  const mx = (de.x + a.x) / 2;
  return `M ${de.x} ${de.y} Q ${mx} ${de.y - altura} ${a.x} ${a.y}`;
}

function f9b(): Figura {
  const Y = 130;
  const X1 = 70, X2 = 230, X3 = 360;
  const GROSOR_PISTA = 9;
  const el: Elemento[] = [
    // pista gruesa tipo camino (gris), no una línea fina
    { tipo: "linea", de: { x: 30, y: Y }, a: { x: 400, y: Y }, rol: "trazo", grosor: GROSOR_PISTA, color: "#b9b9c2" },
    { tipo: "linea", de: { x: 30, y: Y }, a: { x: 400, y: Y }, rol: "trazo", grosor: 1 },
    // 3 bolitas grises
    { tipo: "punto", en: { x: X1, y: Y }, rol: "trazo", r: 8, color: "#9a9aa5" },
    { tipo: "punto", en: { x: X2, y: Y }, rol: "trazo", r: 8, color: "#9a9aa5" },
    { tipo: "punto", en: { x: X3, y: Y }, rol: "trazo", r: 8, color: "#9a9aa5" },
    // flechitas de dirección justo después de la 1ª y 2ª bolita
    { tipo: "linea", de: { x: X1 + 10, y: Y }, a: { x: X1 + 26, y: Y }, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: X1 + 26, y: Y }, 0, 5), rol: "trazo", relleno: true },
    { tipo: "linea", de: { x: X2 + 10, y: Y }, a: { x: X2 + 26, y: Y }, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: X2 + 26, y: Y }, 0, 5), rol: "trazo", relleno: true },
    // TIEMPO arriba, como arco puente
    { tipo: "path", d: arcoPuente({ x: X1, y: Y - 14 }, { x: X2, y: Y - 14 }, 26), rol: "dato", color: AMBAR },
    { tipo: "texto", en: { x: (X1 + X2) / 2, y: Y - 44 }, texto: "4 s", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "path", d: arcoPuente({ x: X2, y: Y - 14 }, { x: X3, y: Y - 14 }, 22), rol: "resultado", color: ROJO },
    { tipo: "texto", en: { x: (X2 + X3) / 2, y: Y - 40 }, texto: "2 s", rol: "resultado", color: ROJO, tam: 12, negrita: true },
    // DISTANCIA abajo, como cota con rayitas
    { tipo: "linea", de: { x: X1, y: Y + 14 }, a: { x: X1, y: Y + 22 }, rol: "dato", color: AMBAR, grosor: 1.2 },
    { tipo: "linea", de: { x: X2, y: Y + 14 }, a: { x: X2, y: Y + 22 }, rol: "dato", color: AMBAR, grosor: 1.2 },
    { tipo: "linea", de: { x: X1, y: Y + 18 }, a: { x: X2, y: Y + 18 }, rol: "dato", color: AMBAR, grosor: 1.2 },
    { tipo: "texto", en: { x: (X1 + X2) / 2, y: Y + 34 }, texto: "d + 5", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "linea", de: { x: X3, y: Y + 14 }, a: { x: X3, y: Y + 22 }, rol: "resultado", color: ROJO, grosor: 1.2 },
    { tipo: "linea", de: { x: X2, y: Y + 18 }, a: { x: X3, y: Y + 18 }, rol: "resultado", color: ROJO, grosor: 1.2 },
    { tipo: "texto", en: { x: (X2 + X3) / 2, y: Y + 34 }, texto: "d − 2", rol: "resultado", color: ROJO, tam: 12, negrita: true },
  ];
  return { ancho: 420, alto: 190, pasos: 0, elementos: el };
}

// ── F10(2022) · dos bloques en contacto, empujados por F ──
function f10b(): Figura {
  const Y = 180, ALTO_B = 60;
  const b1: Pt[] = [{ x: 120, y: Y - ALTO_B }, { x: 220, y: Y - ALTO_B }, { x: 220, y: Y }, { x: 120, y: Y }];
  const b2: Pt[] = [{ x: 220, y: Y - 36 }, { x: 280, y: Y - 36 }, { x: 280, y: Y }, { x: 220, y: Y }];
  const el: Elemento[] = [
    { tipo: "linea", de: { x: 40, y: Y }, a: { x: 380, y: Y }, rol: "trazo", grosor: 2 },
    { tipo: "poligono", puntos: b1, rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "poligono", puntos: b2, rol: "trazo", relleno: true, rellenoColor: "#d9d9e0" },
    { tipo: "texto", en: { x: 170, y: Y - 30 }, texto: "1", rol: "trazo", tam: 16, negrita: true },
    { tipo: "texto", en: { x: 250, y: Y - 18 }, texto: "2", rol: "trazo", tam: 16, negrita: true },
    { tipo: "texto", en: { x: 170, y: Y + 18 }, texto: "m₁ = 15 kg", rol: "trazo", tam: 11 },
    { tipo: "texto", en: { x: 250, y: Y + 34 }, texto: "m₂ = 5 kg", rol: "trazo", tam: 11 },
    { tipo: "linea", de: { x: 50, y: Y - 30 }, a: { x: 118, y: Y - 30 }, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha({ x: 118, y: Y - 30 }, 0, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: 55, y: Y - 42 }, texto: "F = 100 N", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: 250, y: Y + 16 }, texto: "f = 20 N (roce)", rol: "dato", color: AMBAR, tam: 10 },
  ];
  return { ancho: 420, alto: 220, pasos: 0, elementos: el };
}

// ── F11(2022) · acantilado, dos esferas en sentidos opuestos ──
// Hipótesis usada en la resolución: misma altura, sentidos horizontales
// opuestos (es la única lectura que da un número limpio y coincide exacto
// con una opción). Marcada para confirmar contra el PDF original.
// Corregida el 3-nov-2026 contra el facsímil 2022-1op-2 (F11): la esfera 1 sale
// con 30 m/s VERTICAL HACIA ARRIBA y la esfera 2 con 20 m/s VERTICAL HACIA ABAJO,
// ambas desde el borde del acantilado. (La versión anterior la dibujaba horizontal.)
function f11b(): Figura {
  const borde: Pt = { x: 180, y: 70 };
  const bola1: Pt = { x: 200, y: 70 };
  const bola2: Pt = { x: 235, y: 70 };
  const el: Elemento[] = [
    { tipo: "poligono", puntos: [{ x: 20, y: 70 }, borde, { x: 180, y: 270 }, { x: 20, y: 270 }], rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "punto", en: bola1, rol: "trazo", r: 7 },
    { tipo: "punto", en: bola2, rol: "trazo", r: 7 },
    // esfera 1: lanzamiento vertical hacia ARRIBA a 30 m/s
    { tipo: "linea", de: avanzar(bola1, 90, 10), a: avanzar(bola1, 90, 50), rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(bola1, 90, 50), 90, 7), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: bola1.x + 34, y: bola1.y - 36 }, texto: "30 m/s", rol: "resultado", color: ROJO, tam: 12, negrita: true },
    // esfera 2: lanzamiento hacia ABAJO a 20 m/s
    { tipo: "linea", de: avanzar(bola2, -90, 10), a: avanzar(bola2, -90, 80), rol: "dato", color: AMBAR, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(bola2, -90, 80), -90, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: bola2.x + 34, y: bola2.y + 44 }, texto: "20 m/s", rol: "dato", color: AMBAR, tam: 12, negrita: true },
  ];
  return { ancho: 420, alto: 300, pasos: 0, elementos: el };
}

// ── F12(2022) · bloque en plano 37° con fuerza F horizontal ──
function f12b(): Figura {
  // Espejada contra el PDF real: el plano sube hacia la DERECHA (no la
  // izquierda), con el 37° marcado abajo-IZQUIERDA y F empujando hacia la
  // derecha (horizontal, hacia la cuesta).
  const C: Pt = { x: 90, y: 195 };
  const INCLINACION = 37;
  const T = avanzar(C, INCLINACION, 258);
  const E = avanzar(C, INCLINACION - 180, 42);
  // bloqueSobre() elige SOLA el lado "hacia arriba" para el bloque; la banda
  // (grosor de la rampa) tiene que ir del lado CONTRARIO — para inclinación
  // 37° ese lado contrario es INCLINACION-90 (verificado: para la versión
  // original de 143° el equivalente era INCLINACION+90, exactamente opuesto
  // al lado que blockSobre elegía ahí).
  const NORMAL_BANDA = INCLINACION - 90;
  const banda = [T, E, avanzar(E, NORMAL_BANDA, 7), avanzar(T, NORMAL_BANDA, 7)];
  const bloque = bloqueSobre(avanzar(T, INCLINACION - 180, 30), INCLINACION, 40, 34);
  const centroBloque = avanzar(T, INCLINACION - 180, 30);
  // Fuerza F HORIZONTAL (ángulo 0°, empujando hacia la cuesta que sube a
  // la derecha) — NO perpendicular al plano. Flecha a la altura del
  // bloque, apuntando hacia él desde la izquierda.
  const flechaFin: Pt = { x: centroBloque.x - 26, y: centroBloque.y };
  const flechaIni: Pt = { x: centroBloque.x - 88, y: centroBloque.y };

  verificarAngulo("37° entre plano y horizontal", 37, anguloEn(C, T, { x: C.x + 60, y: C.y }));
  const arco37 = arcoAngulo(C, 180, INCLINACION - 180, 30, 46);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: C.x - 40, y: C.y }, a: { x: C.x + 4, y: C.y }, rol: "trazo", punteada: true },
    { tipo: "poligono", puntos: banda, rol: "trazo", relleno: true, rellenoColor: "#d9d9d5" },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#8c8c94" },
    { tipo: "linea", de: flechaIni, a: flechaFin, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(flechaFin, 0, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: flechaIni.x - 4, y: flechaIni.y - 12 }, texto: "F = 200 N", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "end" },
    { tipo: "arco", d: arco37.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco37.etiquetaEn, texto: "37°", rol: "dato", color: AMBAR, tam: 13, negrita: true },
    { tipo: "texto", en: { x: 340, y: 120 }, texto: "μ = 0,2", rol: "trazo", tam: 11, cursiva: true, ancla: "start" },
  ];
  return { ancho: 420, alto: 260, pasos: 0, elementos: el };
}

// Tres cargas puntuales: q en P, y q1/q2 simétricas respecto de la horizontal
// que pasa por P. El enunciado da r = 2 m y 1 m de separación horizontal, así
// que la componente vertical es √3 por Pitágoras y la dirección P→q1 queda a
// 120° (60° sobre la horizontal, medido desde el oeste).
//
// A propósito NO se dibuja la fuerza resultante: la pregunta es justamente
// calcularla, y dibujarla sería regalar la respuesta.
function f19cargas(): Figura {
  const M = 56;                                   // escala: 1 m = 56 px
  const P: Pt = { x: 296, y: 132 };
  const q1 = avanzar(P, 120, 2 * M);              // arriba-izquierda
  const q2 = avanzar(P, -120, 2 * M);             // abajo-izquierda

  verificarDistancia("q1 a P = 2 m", 2 * M, distancia(q1, P));
  verificarDistancia("q2 a P = 2 m", 2 * M, distancia(q2, P));
  verificarDistancia("separación horizontal = 1 m", M, P.x - q1.x);
  verificarDistancia("q1 y q2 alineadas en vertical", 0, Math.abs(q1.x - q2.x));
  verificarAngulo("60° sobre la horizontal", 60, anguloEn(P, q1, { x: P.x - 60, y: P.y }));

  // Las etiquetas "2 m" se corren PERPENDICULAR a su propio trazo y hacia
  // afuera de la cuña que forman los dos radios. Puestas con un offset fijo
  // arriba/abajo quedaban montadas sobre la línea.
  const medioArriba = avanzar({ x: (P.x + q1.x) / 2, y: (P.y + q1.y) / 2 }, 30, 17);
  const medioAbajo = avanzar({ x: (P.x + q2.x) / 2, y: (P.y + q2.y) / 2 }, -30, 17);

  const el: Elemento[] = [
    // eje de simetría: la horizontal que pasa por P
    { tipo: "linea", de: { x: q1.x - 46, y: P.y }, a: { x: P.x + 54, y: P.y }, rol: "trazo", punteada: true },
    // vertical que une q1 y q2, para que se vea que están alineadas
    { tipo: "linea", de: q1, a: q2, rol: "trazo", punteada: true },

    // los dos radios de 2 m
    { tipo: "linea", de: q1, a: P, rol: "trazo", grosor: 1.7 },
    { tipo: "linea", de: q2, a: P, rol: "trazo", grosor: 1.7 },
    { tipo: "texto", en: medioArriba, texto: "2 m", rol: "dato", color: AMBAR, tam: 12, negrita: true, ancla: "middle" },
    { tipo: "texto", en: medioAbajo, texto: "2 m", rol: "dato", color: AMBAR, tam: 12, negrita: true, ancla: "middle" },

    // el metro horizontal, marcado sobre el eje de simetría
    { tipo: "linea", de: { x: q1.x, y: P.y - 7 }, a: { x: q1.x, y: P.y + 7 }, rol: "dato", color: AMBAR },
    { tipo: "texto", en: { x: (q1.x + P.x) / 2, y: P.y - 11 }, texto: "1 m", rol: "dato", color: AMBAR, tam: 12, negrita: true, ancla: "middle" },

    // las cargas
    { tipo: "punto", en: q1, r: 6, rol: "trazo", color: ROJO },
    { tipo: "punto", en: q2, r: 6, rol: "trazo", color: ROJO },
    { tipo: "punto", en: P, r: 6, rol: "incognita", color: VIOLETA },

    { tipo: "texto", en: { x: q1.x - 10, y: q1.y - 8 }, texto: "q₁ = 8 μC", rol: "dato", color: ROJO, tam: 12.5, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: q2.x - 10, y: q2.y + 14 }, texto: "q₂ = 8 μC", rol: "dato", color: ROJO, tam: 12.5, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: P.x + 13, y: P.y - 8 }, texto: "P", rol: "incognita", color: VIOLETA, tam: 13, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: P.x + 13, y: P.y + 12 }, texto: "q = 2 μC", rol: "incognita", color: VIOLETA, tam: 12.5, negrita: true, ancla: "start" },
  ];
  return { ancho: 420, alto: 272, pasos: 0, elementos: el };
}

// Triángulo acutángulo ABC con D y E sobre AC (en el orden A, D, E, C) y los
// segmentos BD y BE. El enunciado solo da ∠BDA = 80° y que los tres
// triángulos son isósceles; la configuración real (∠A = 80°, ∠ABC = 80°,
// ∠C = 20°) sale de la solución y es la única que deja ABC acutángulo.
//
// Se marca SOLO el 80° en D. Poner las marcas de qué lados son iguales
// regalaría el paso decisivo del problema, que es justamente descubrir cuál
// de las tres formas de ser isósceles da un triángulo acutángulo.
function g5cadena(): Figura {
  const rad = (g: number) => (g * Math.PI) / 180;
  const A: Pt = { x: 42, y: 218 };
  const AC = 344;
  const C: Pt = avanzar(A, 0, AC);

  // Ley de senos con ∠A = 80°, ∠B = 80°, ∠C = 20°.
  const AB = (AC * Math.sin(rad(20))) / Math.sin(rad(80));
  const B = avanzar(A, 80, AB);
  // Triángulo ABD: ∠A = 80°, ∠BDA = 80°, ∠ABD = 20°.
  const AD = (AB * Math.sin(rad(20))) / Math.sin(rad(80));
  const D = avanzar(A, 0, AD);
  // Triángulo BDE isósceles con DE = DB.
  const E = avanzar(D, 0, distancia(D, B));

  verificarAngulo("∠BDA = 80°", 80, anguloEn(D, B, A));
  verificarAngulo("∠A = 80°", 80, anguloEn(A, B, C));
  verificarAngulo("∠C = 20°", 20, anguloEn(C, B, A));
  verificarAngulo("∠ABC = 80°", 80, anguloEn(B, A, C));
  verificarAngulo("∠DEB = 40°", 40, anguloEn(E, D, B));
  verificarDistancia("AB = BD", distancia(A, B), distancia(B, D));
  verificarDistancia("DB = DE", distancia(D, B), distancia(D, E));
  if (!(A.x < D.x && D.x < E.x && E.x < C.x)) throw new Error("A, D, E, C no quedan en ese orden");

  // El arco va con radio de etiqueta generoso: con ∠A = 80° el triángulo es
  // achatado y AD queda corto, así que la etiqueta se monta sobre BD si se la
  // deja cerca del vértice.
  const arco80 = arcoAngulo(D, 180, anguloHacia(D, B), 30, 54);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C], rol: "trazo" },
    { tipo: "linea", de: B, a: D, rol: "trazo" },
    { tipo: "linea", de: B, a: E, rol: "trazo" },

    { tipo: "arco", d: arco80.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco80.etiquetaEn, texto: "80°", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "middle" },

    { tipo: "punto", en: A, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: B, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: C, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: D, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: E, r: 3.2, rol: "trazo" },

    { tipo: "texto", en: { x: A.x - 9, y: A.y + 16 }, texto: "A", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: B.x - 4, y: B.y - 10 }, texto: "B", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: C.x + 10, y: C.y + 6 }, texto: "C", rol: "trazo", tam: 13, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: D.x, y: D.y + 19 }, texto: "D", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: E.x, y: E.y + 19 }, texto: "E", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: 254, pasos: 0, elementos: el };
}

// Pentágono convexo con los cinco ángulos exteriores marcados como
// expresiones en x. El enunciado NO da los lados, así que se recorre el
// perímetro girando en cada vértice el ángulo exterior real (x = 35°) y se
// resuelven los dos últimos lados para que el recorrido CIERRE. Dibujarlo a
// ojo daría un pentágono cuyos ángulos no miden lo que dicen sus etiquetas.
function g6pentagono(): Figura {
  const rad = (g: number) => (g * Math.PI) / 180;
  // Ángulos exteriores en A, B, C, D, E (con x = 35°, suman 360°).
  const EXT = [70, 75, 110, 50, 55];
  const suma = EXT.reduce((a, b) => a + b, 0);
  if (Math.abs(suma - 360) > 0.01) throw new Error(`los exteriores suman ${suma}, no 360`);

  // Rumbo de cada lado: al llegar a un vértice se gira su ángulo exterior.
  const rumbo = [0, EXT[1], EXT[1] + EXT[2], EXT[1] + EXT[2] + EXT[3], EXT[1] + EXT[2] + EXT[3] + EXT[4]];
  const u = (g: number) => ({ x: Math.cos(rad(g)), y: Math.sin(rad(g)) });

  // Tres lados fijos; los otros dos salen de exigir que el polígono cierre.
  const [s1, s2, s3] = [104, 104, 104];
  const acum = { x: 0, y: 0 };
  [s1, s2, s3].forEach((s, i) => { acum.x += s * u(rumbo[i]).x; acum.y += s * u(rumbo[i]).y; });
  const u4 = u(rumbo[3]), u5 = u(rumbo[4]);
  const det = u4.x * u5.y - u5.x * u4.y;
  const s4 = (-acum.x * u5.y + acum.y * u5.x) / det;
  const s5 = (-u4.x * acum.y + u4.y * acum.x) / det;
  if (s4 <= 0 || s5 <= 0) throw new Error("el pentágono no cierra con lados positivos");

  const lados = [s1, s2, s3, s4, s5];
  const crudos: Pt[] = [{ x: 0, y: 0 }];
  lados.forEach((s, i) => {
    const p = crudos[i];
    crudos.push({ x: p.x + s * u(rumbo[i]).x, y: p.y - s * u(rumbo[i]).y }); // y invertida: SVG crece hacia abajo
  });
  crudos.pop();                                   // el 6º punto es A otra vez

  // Escalar y centrar. Los lados salen del cierre del polígono, así que su
  // tamaño es el que es: sin escalar, el pentágono ocupaba un tercio del
  // lienzo y las cinco etiquetas quedaban ilegibles encimadas.
  const xs = crudos.map((p) => p.x), ys = crudos.map((p) => p.y);
  const ancho = Math.max(...xs) - Math.min(...xs);
  const alto = Math.max(...ys) - Math.min(...ys);
  const k = Math.min(250 / ancho, 150 / alto);   // deja margen para arcos y rótulos
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const V = crudos.map((p) => ({ x: 210 + (p.x - cx) * k, y: 134 + (p.y - cy) * k }));
  const [A, B, C, D, E] = V;

  // Cada ángulo INTERIOR tiene que ser el suplemento de su exterior.
  const nombres = ["A", "B", "C", "D", "E"];
  V.forEach((v, i) => {
    const prev = V[(i + 4) % 5], sig = V[(i + 1) % 5];
    verificarAngulo(`interior en ${nombres[i]}`, 180 - EXT[i], anguloEn(v, prev, sig));
  });

  const ETIQUETAS = ["2x", "2x + 5°", "3x + 5°", "x + 15°", "x + 20°"];
  const el: Elemento[] = [{ tipo: "poligono", puntos: V, rol: "trazo" }];

  V.forEach((v, i) => {
    const sig = V[(i + 1) % 5];
    const prev = V[(i + 4) % 5];
    // Prolongación del lado que entra: contra ella se mide el ángulo exterior.
    const dirEntra = anguloHacia(prev, v);
    const fuera = avanzar(v, dirEntra, 34);
    const arco = arcoAngulo(v, dirEntra, anguloHacia(v, sig), 19, 31);
    el.push(
      { tipo: "linea", de: v, a: fuera, rol: "trazo", punteada: true },
      { tipo: "arco", d: arco.d, rol: "dato", color: AMBAR },
      { tipo: "texto", en: arco.etiquetaEn, texto: ETIQUETAS[i], rol: "dato", color: AMBAR, tam: 11, negrita: true, ancla: "middle" },
      { tipo: "punto", en: v, r: 3.2, rol: "trazo" },
    );
  });

  const rotulo = (p: Pt, centroX: number, centroY: number, t: string): Elemento => ({
    tipo: "texto",
    en: { x: p.x + (p.x > centroX ? 13 : -13), y: p.y + (p.y > centroY ? 16 : -8) },
    texto: t, rol: "trazo", tam: 13, negrita: true,
    ancla: p.x > centroX ? "start" : "end",
  });
  [A, B, C, D, E].forEach((p, i) => el.push(rotulo(p, 210, 132, nombres[i])));

  return { ancho: 420, alto: 268, pasos: 0, elementos: el };
}

// Cuadrilátero ABCD con ángulo recto en B, tres lados iguales (AB = BC = CD)
// y ∠BCD = 150°. Todo queda fijado por esos datos: A arriba de B, C a la
// derecha, y CD sale de C girando 30° respecto de la prolongación de BC
// (suplemento de los 150°). El α que se pide está en A.
function g7cuadrilatero(): Figura {
  const L = 112;                                   // el lado x
  const B: Pt = { x: 96, y: 196 };
  const A = avanzar(B, 90, L);                     // arriba
  const C = avanzar(B, 0, L);                      // derecha
  const D = avanzar(C, 30, L);

  verificarAngulo("recto en B", 90, anguloEn(B, A, C));
  verificarAngulo("∠BCD = 150°", 150, anguloEn(C, B, D));
  verificarDistancia("AB = BC", distancia(A, B), distancia(B, C));
  verificarDistancia("BC = CD", distancia(B, C), distancia(C, D));
  verificarAngulo("α en A = 75°", 75, anguloEn(A, B, D));

  const arco150 = arcoAngulo(C, anguloHacia(C, B), anguloHacia(C, D), 26, 40);
  const arcoAlfa = arcoAngulo(A, anguloHacia(A, B), anguloHacia(A, D), 30, 46);

  const medio = (p: Pt, q: Pt) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C, D], rol: "trazo" },

    { tipo: "path", d: cuadradoRecto(B, anguloHacia(B, A), anguloHacia(B, C), 11), rol: "dato", color: AMBAR },
    { tipo: "arco", d: arco150.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco150.etiquetaEn, texto: "150°", rol: "dato", color: AMBAR, tam: 12, negrita: true, ancla: "middle" },
    { tipo: "arco", d: arcoAlfa.d, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: arcoAlfa.etiquetaEn, texto: "α", rol: "incognita", color: VIOLETA, tam: 14, negrita: true, ancla: "middle" },

    // los tres lados iguales
    { tipo: "texto", en: { x: medio(A, B).x - 12, y: medio(A, B).y + 4 }, texto: "x", rol: "dato", color: AMBAR, tam: 12.5, cursiva: true, ancla: "middle" },
    { tipo: "texto", en: { x: medio(B, C).x, y: medio(B, C).y + 17 }, texto: "x", rol: "dato", color: AMBAR, tam: 12.5, cursiva: true, ancla: "middle" },
    { tipo: "texto", en: avanzar(medio(C, D), -60, 14), texto: "x", rol: "dato", color: AMBAR, tam: 12.5, cursiva: true, ancla: "middle" },

    { tipo: "punto", en: A, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: B, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: C, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: D, r: 3.2, rol: "trazo" },

    { tipo: "texto", en: { x: A.x - 6, y: A.y - 11 }, texto: "A", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: B.x - 12, y: B.y + 14 }, texto: "B", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: C.x + 4, y: C.y + 18 }, texto: "C", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: D.x + 13, y: D.y - 4 }, texto: "D", rol: "trazo", tam: 13, negrita: true, ancla: "start" },
  ];
  return { ancho: 420, alto: 250, pasos: 0, elementos: el };
}

// Carrito acelerado con una masa colgando de un resorte anclado al techo.
// Dibujada mirando el facsímil (examen 2-2024, única opción, F11): el resorte
// sale del techo hacia abajo-IZQUIERDA porque el carrito acelera a la derecha
// y la masa queda atrás. El 60° va entre el resorte y la vertical punteada,
// medido en el anclaje, igual que en el original.
function f11carrito(): Figura {
  const IZQ = 112, DER = 352, TECHO = 58, PISO = 176;
  const anclaje: Pt = { x: 300, y: TECHO + 8 };
  const masa = avanzar(anclaje, -150, 108);            // 60° a la izquierda de la vertical
  const bajoAnclaje = { x: anclaje.x, y: anclaje.y + 92 };

  verificarAngulo("60° con la vertical", 60, anguloEn(anclaje, masa, bajoAnclaje));

  const arco60 = arcoAngulo(anclaje, -90, anguloHacia(anclaje, masa), 30, 45);

  const el: Elemento[] = [
    // caja del carrito
    { tipo: "poligono", puntos: [{ x: IZQ, y: TECHO }, { x: DER, y: TECHO }, { x: DER, y: PISO }, { x: IZQ, y: PISO }], rol: "trazo" },
  ];

  // rayado de la pared izquierda, como en el facsímil
  for (let i = 0; i < 5; i++) {
    const y = TECHO + 16 + i * 18;
    el.push({ tipo: "linea", de: { x: IZQ - 13, y: y + 9 }, a: { x: IZQ, y }, rol: "trazo", grosor: 1 });
  }

  // ruedas y suelo
  const RUEDA = 11;
  for (const cx of [IZQ + 42, DER - 42]) {
    el.push({ tipo: "punto", en: { x: cx, y: PISO + RUEDA }, r: RUEDA, rol: "trazo" });
  }
  el.push({ tipo: "linea", de: { x: IZQ - 24, y: PISO + 2 * RUEDA }, a: { x: DER + 24, y: PISO + 2 * RUEDA }, rol: "trazo", grosor: 1.8 });
  for (let i = 0; i < 14; i++) {
    const x = IZQ - 18 + i * 20;
    el.push({ tipo: "linea", de: { x, y: PISO + 2 * RUEDA }, a: { x: x - 8, y: PISO + 2 * RUEDA + 8 }, rol: "trazo", grosor: 1 });
  }

  el.push(
    // vertical de referencia + ángulo
    { tipo: "linea", de: anclaje, a: bajoAnclaje, rol: "trazo", punteada: true },
    { tipo: "arco", d: arco60.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco60.etiquetaEn, texto: "60°", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "middle" },

    // resorte y masa
    { tipo: "path", d: resistorZigzag(anclaje, masa, 9, 6), rol: "trazo" },
    { tipo: "punto", en: masa, r: 8, rol: "trazo" },
    { tipo: "texto", en: { x: masa.x - 15, y: masa.y + 5 }, texto: "m", rol: "dato", color: AMBAR, tam: 13, cursiva: true, negrita: true, ancla: "end" },

    // aceleración del carrito
    { tipo: "linea", de: { x: DER + 8, y: TECHO - 16 }, a: { x: DER + 52, y: TECHO - 16 }, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha({ x: DER + 52, y: TECHO - 16 }, 0, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: DER + 30, y: TECHO - 22 }, texto: "a", rol: "resultado", color: ROJO, tam: 13, cursiva: true, negrita: true, ancla: "middle" },
  );

  return { ancho: 420, alto: 214, pasos: 0, elementos: el };
}

// Disco lanzado sobre piso áspero que se detiene tras recorrer d. Dibujada
// mirando el facsímil (examen 2-2024, única opción, F12): bloque macizo en la
// posición inicial con la flecha de velocidad, bloque punteado donde se
// detiene, el arco "t" entre ambos y la distancia d acotada abajo.
function f12disco(): Figura {
  const PISO = 158;
  const INI: Pt = { x: 96, y: PISO };
  const FIN: Pt = { x: 300, y: PISO };
  const ANCHO = 46, ALTO = 30;

  const caja = (base: Pt): Pt[] => [
    { x: base.x, y: base.y },
    { x: base.x + ANCHO, y: base.y },
    { x: base.x + ANCHO, y: base.y - ALTO },
    { x: base.x, y: base.y - ALTO },
  ];

  const medioIni = { x: INI.x + ANCHO / 2, y: INI.y - ALTO };
  const medioFin = { x: FIN.x + ANCHO / 2, y: FIN.y - ALTO };
  const cima = { x: (medioIni.x + medioFin.x) / 2, y: medioIni.y - 46 };

  const el: Elemento[] = [
    // piso con rayado
    { tipo: "linea", de: { x: 54, y: PISO }, a: { x: 382, y: PISO }, rol: "trazo", grosor: 1.8 },
  ];
  for (let i = 0; i < 18; i++) {
    const x = 58 + i * 19;
    el.push({ tipo: "linea", de: { x, y: PISO }, a: { x: x - 8, y: PISO + 9 }, rol: "trazo", grosor: 1 });
  }

  // Trayectoria punteada. Se arma con segmentos porque `punteada` solo existe
  // en el elemento "linea"; un path no la soporta.
  const bezier = (t: number): Pt => ({
    x: (1 - t) ** 2 * medioIni.x + 2 * (1 - t) * t * cima.x + t ** 2 * medioFin.x,
    y: (1 - t) ** 2 * medioIni.y + 2 * (1 - t) * t * (cima.y - 20) + t ** 2 * medioFin.y,
  });
  for (let i = 0; i < 24; i += 2) {
    el.push({ tipo: "linea", de: bezier(i / 24), a: bezier((i + 1) / 24), rol: "trazo" });
  }

  el.push(
    { tipo: "texto", en: { x: cima.x, y: cima.y - 6 }, texto: "t", rol: "dato", color: AMBAR, tam: 13, cursiva: true, negrita: true, ancla: "middle" },

    // bloque inicial (macizo) y final (punteado)
    { tipo: "poligono", puntos: caja(INI), rol: "trazo" },
    { tipo: "texto", en: { x: INI.x + ANCHO / 2, y: INI.y - ALTO / 2 + 5 }, texto: "m", rol: "trazo", tam: 13, cursiva: true, ancla: "middle" },
    { tipo: "linea", de: caja(FIN)[0], a: caja(FIN)[1], rol: "trazo", punteada: true },
    { tipo: "linea", de: caja(FIN)[1], a: caja(FIN)[2], rol: "trazo", punteada: true },
    { tipo: "linea", de: caja(FIN)[2], a: caja(FIN)[3], rol: "trazo", punteada: true },
    { tipo: "linea", de: caja(FIN)[3], a: caja(FIN)[0], rol: "trazo", punteada: true },

    // velocidad inicial
    { tipo: "linea", de: { x: INI.x - 4, y: INI.y - ALTO - 16 }, a: { x: INI.x + ANCHO + 6, y: INI.y - ALTO - 16 }, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha({ x: INI.x + ANCHO + 6, y: INI.y - ALTO - 16 }, 0, 8), rol: "resultado", color: ROJO, relleno: true },

    // distancia recorrida
    { tipo: "linea", de: { x: INI.x, y: PISO + 26 }, a: { x: FIN.x + ANCHO, y: PISO + 26 }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x: INI.x, y: PISO + 26 }, 180, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: FIN.x + ANCHO, y: PISO + 26 }, 0, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: (INI.x + FIN.x + ANCHO) / 2, y: PISO + 42 }, texto: "d", rol: "dato", color: AMBAR, tam: 13, cursiva: true, negrita: true, ancla: "middle" },

    // coeficiente de rozamiento, apuntando al piso
    { tipo: "linea", de: { x: 392, y: PISO - 34 }, a: { x: 356, y: PISO + 4 }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x: 356, y: PISO + 4 }, -134, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: 394, y: PISO - 40 }, texto: "μ = 0,25", rol: "dato", color: AMBAR, tam: 12, negrita: true, ancla: "end" },
  );

  return { ancho: 420, alto: 214, pasos: 0, elementos: el };
}

// A, C, D alineados en la base (AC = 2, CD = 1); B arriba a la derecha; P es
// el punto medio de CB y DP ⊥ CB en P. Dibujada mirando el facsímil (examen
// 2-2023, 2da opción, G5): B queda a la derecha de D, no entre C y D.
//
// La condición DP ⊥ CB con P punto medio deja UN grado de libertad: para cada
// inclinación β de CB hay una configuración válida (sale CB = 2·cos β). Se
// elige β = 30° porque reproduce la disposición del original. El resultado del
// problema (R = 1/2) no depende de esa elección — se comprobó con β = 45° y
// β = 60°, que dan la misma R.
function g5trianguloCP(): Figura {
  const rad = (g: number) => (g * Math.PI) / 180;
  const U = 92;                                    // una unidad del enunciado
  const BETA = 30;
  const C: Pt = { x: 218, y: 182 };
  const A = avanzar(C, 180, 2 * U);
  const D = avanzar(C, 0, U);
  const B = avanzar(C, BETA, 2 * Math.cos(rad(BETA)) * U);
  const P = { x: (C.x + B.x) / 2, y: (C.y + B.y) / 2 };

  verificarDistancia("AC = 2", 2 * U, distancia(A, C));
  verificarDistancia("CD = 1", U, distancia(C, D));
  verificarDistancia("CP = PB", distancia(C, P), distancia(P, B));
  verificarAngulo("DP ⊥ CB en P", 90, anguloEn(P, D, B));
  verificarAngulo("A, C, D alineados", 180, anguloEn(C, A, D));

  const arcoTheta = arcoAngulo(B, anguloHacia(B, A), anguloHacia(B, C), 30, 44);
  const arcoPhi = arcoAngulo(D, anguloHacia(D, C), anguloHacia(D, P), 26, 40);

  const el: Elemento[] = [
    { tipo: "linea", de: A, a: D, rol: "trazo", grosor: 1.7 },
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 1.7 },
    { tipo: "linea", de: C, a: B, rol: "trazo", grosor: 1.7 },
    { tipo: "linea", de: D, a: P, rol: "trazo", grosor: 1.7 },

    { tipo: "path", d: cuadradoRecto(P, anguloHacia(P, D), anguloHacia(P, B), 10), rol: "dato", color: AMBAR },
    { tipo: "arco", d: arcoTheta.d, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: arcoTheta.etiquetaEn, texto: "θ", rol: "incognita", color: VIOLETA, tam: 13, negrita: true, ancla: "middle" },
    { tipo: "arco", d: arcoPhi.d, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: arcoPhi.etiquetaEn, texto: "φ", rol: "incognita", color: VIOLETA, tam: 13, negrita: true, ancla: "middle" },

    // las dos medidas de la base
    { tipo: "texto", en: { x: (A.x + C.x) / 2, y: A.y + 19 }, texto: "2", rol: "dato", color: AMBAR, tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: (C.x + D.x) / 2, y: A.y + 19 }, texto: "1", rol: "dato", color: AMBAR, tam: 13, negrita: true, ancla: "middle" },

    { tipo: "punto", en: A, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: C, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: D, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: B, r: 3.2, rol: "trazo" },
    { tipo: "punto", en: P, r: 4.4, rol: "trazo" },

    { tipo: "texto", en: { x: A.x - 6, y: A.y + 19 }, texto: "A", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: C.x, y: C.y + 19 }, texto: "C", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: D.x + 6, y: D.y + 19 }, texto: "D", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: B.x + 6, y: B.y - 10 }, texto: "B", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: P.x - 14, y: P.y - 6 }, texto: "P", rol: "trazo", tam: 13, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: 226, pasos: 0, elementos: el };
}

// Lámpara arriba y dos moscas en la misma vertical, cada una 1 m debajo de la
// anterior, y el piso 1 m debajo de la segunda. Dibujada mirando el facsímil
// (examen 2-2023, 2da opción, F11): la de arriba va hacia la DERECHA a
// 0,3 m/s y la de abajo hacia la IZQUIERDA a 0,5 m/s. Las dos parten justo
// debajo de la lámpara, que es lo que hace que el dibujo muestre un instante
// y no el caso general.
function f11moscas(): Figura {
  const EJE = 214;
  const LAMPARA: Pt = { x: EJE, y: 38 };
  const METRO = 44;
  const MOSCA1 = { x: EJE, y: LAMPARA.y + METRO };
  const MOSCA2 = { x: EJE, y: MOSCA1.y + METRO };
  const PISO = MOSCA2.y + METRO;

  verificarDistancia("lámpara a mosca 1 = 1 m", METRO, distancia(LAMPARA, MOSCA1));
  verificarDistancia("mosca 1 a mosca 2 = 1 m", METRO, distancia(MOSCA1, MOSCA2));
  verificarDistancia("mosca 2 al piso = 1 m", METRO, PISO - MOSCA2.y);

  const cota = (y1: number, y2: number, texto: string): Elemento[] => {
    const x = EJE + 34;
    return [
      { tipo: "linea", de: { x, y: y1 }, a: { x, y: y2 }, rol: "dato", color: AMBAR },
      { tipo: "linea", de: { x: x - 5, y: y1 }, a: { x: x + 5, y: y1 }, rol: "dato", color: AMBAR },
      { tipo: "linea", de: { x: x - 5, y: y2 }, a: { x: x + 5, y: y2 }, rol: "dato", color: AMBAR },
      { tipo: "texto", en: { x: x + 10, y: (y1 + y2) / 2 + 4 }, texto: texto, rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "start" },
    ];
  };

  const flecha = (desde: Pt, haciaDerecha: boolean, texto: string): Elemento[] => {
    const largo = 52;
    const fin = { x: desde.x + (haciaDerecha ? largo : -largo), y: desde.y };
    return [
      { tipo: "linea", de: desde, a: fin, rol: "resultado", color: ROJO, grosor: 2 },
      { tipo: "path", d: cabezaFlecha(fin, haciaDerecha ? 0 : 180, 7), rol: "resultado", color: ROJO, relleno: true },
      { tipo: "texto", en: { x: fin.x + (haciaDerecha ? 6 : -6), y: fin.y - 7 }, texto: texto, rol: "resultado", color: ROJO, tam: 11.5, negrita: true, ancla: haciaDerecha ? "start" : "end" },
    ];
  };

  const el: Elemento[] = [
    // lámpara
    { tipo: "punto", en: LAMPARA, r: 11, rol: "trazo", color: AMBAR },
    { tipo: "linea", de: { x: LAMPARA.x, y: LAMPARA.y - 20 }, a: { x: LAMPARA.x, y: LAMPARA.y - 11 }, rol: "trazo" },
    // vertical de referencia
    { tipo: "linea", de: { x: EJE, y: LAMPARA.y + 12 }, a: { x: EJE, y: PISO }, rol: "trazo", punteada: true },
    // piso
    { tipo: "linea", de: { x: 58, y: PISO }, a: { x: 372, y: PISO }, rol: "trazo", grosor: 1.8 },
  ];
  for (let i = 0; i < 17; i++) {
    const x = 62 + i * 19;
    el.push({ tipo: "linea", de: { x, y: PISO }, a: { x: x - 8, y: PISO + 9 }, rol: "trazo", grosor: 1 });
  }

  el.push(
    { tipo: "punto", en: MOSCA1, r: 4.6, rol: "trazo" },
    { tipo: "punto", en: MOSCA2, r: 4.6, rol: "trazo" },
    ...flecha(MOSCA1, true, "0,3 m/s"),
    ...flecha(MOSCA2, false, "0,5 m/s"),
    ...cota(LAMPARA.y + 12, MOSCA1.y, "1 m"),
    ...cota(MOSCA1.y, MOSCA2.y, "1 m"),
    ...cota(MOSCA2.y, PISO, "1 m"),
  );

  return { ancho: 420, alto: PISO + 26, pasos: 0, elementos: el };
}

// Esfera lanzada HORIZONTALMENTE a 10 m/s desde 10 m de altura. Dibujada
// mirando el facsímil (examen 2-2023, 2da opción, F10): la velocidad inicial
// sale horizontal hacia la derecha desde el borde de una plataforma, con la
// vertical punteada marcando la altura y la flecha de g apuntando abajo.
//
// No se dibuja la parábola completa ni la altura que se pide: eso es lo que
// el alumno tiene que hallar.
function f10proyectil(): Figura {
  const SUELO = 196;
  const ALTURA = 130;                               // los 10 m
  const SALIDA: Pt = { x: 148, y: SUELO - ALTURA };

  const el: Elemento[] = [
    // plataforma de lanzamiento
    { tipo: "linea", de: { x: 74, y: SALIDA.y }, a: SALIDA, rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: SALIDA, r: 6, rol: "trazo" },

    // velocidad inicial, horizontal
    { tipo: "linea", de: { x: SALIDA.x + 8, y: SALIDA.y }, a: { x: SALIDA.x + 66, y: SALIDA.y }, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha({ x: SALIDA.x + 66, y: SALIDA.y }, 0, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: SALIDA.x + 37, y: SALIDA.y - 9 }, texto: "10 m/s", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "middle" },

    // vertical y cota de los 10 m
    { tipo: "linea", de: SALIDA, a: { x: SALIDA.x, y: SUELO }, rol: "trazo", punteada: true },
    { tipo: "linea", de: { x: SALIDA.x + 96, y: SALIDA.y }, a: { x: SALIDA.x + 96, y: SUELO }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x: SALIDA.x + 96, y: SALIDA.y }, 90, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: SALIDA.x + 96, y: SUELO }, -90, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: SALIDA.x + 104, y: SUELO - ALTURA / 2 + 4 }, texto: "10 m", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "start" },

    // gravedad
    { tipo: "linea", de: { x: SALIDA.x + 20, y: SALIDA.y + 22 }, a: { x: SALIDA.x + 20, y: SALIDA.y + 62 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: cabezaFlecha({ x: SALIDA.x + 20, y: SALIDA.y + 62 }, -90, 7), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: SALIDA.x + 26, y: SALIDA.y + 46 }, texto: "g", rol: "trazo", tam: 12.5, cursiva: true, negrita: true, ancla: "start" },

    // suelo
    { tipo: "linea", de: { x: 74, y: SUELO }, a: { x: 358, y: SUELO }, rol: "trazo", grosor: 2.4 },
  ];
  for (let i = 0; i < 15; i++) {
    const x = 78 + i * 19;
    el.push({ tipo: "linea", de: { x, y: SUELO }, a: { x: x - 8, y: SUELO + 9 }, rol: "trazo", grosor: 1 });
  }

  return { ancho: 420, alto: SUELO + 26, pasos: 0, elementos: el };
}

// Persona mirando un cuadro, con ángulo de visión de 45°. El facsímil lo
// dibuja en perspectiva 3D, pero la geometría que importa es el corte
// lateral: ojo a 1,2 m del piso, cuadro de 1,5 m de alto apoyado a 1 m del
// piso, y la distancia d que se busca.
//
// Se dibuja con d = 1,657 m, que es la solución exacta de la ecuación del
// ángulo (d² − 1,5d − 0,26 = 0). Así los 45° del dibujo son los 45° de
// verdad y no una aproximación a ojo — y de paso confirma la opción 1,66.
function g8cuadro(): Figura {
  const M = 62;                                    // 1 metro
  const PISO = 224;
  const PARED = 336;
  const D = 1.657;
  const ojo: Pt = { x: PARED - D * M, y: PISO - 1.2 * M };
  const abajo: Pt = { x: PARED, y: PISO - 1.0 * M };
  const arriba: Pt = { x: PARED, y: PISO - 2.5 * M };

  verificarAngulo("ángulo de visión = 45°", 45, anguloEn(ojo, arriba, abajo));
  verificarDistancia("cuadro mide 1,5 m", 1.5 * M, distancia(arriba, abajo));

  const arco45 = arcoAngulo(ojo, anguloHacia(ojo, abajo), anguloHacia(ojo, arriba), 34, 50);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 62, y: PISO }, a: { x: PARED, y: PISO }, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: { x: PARED, y: PISO }, a: { x: PARED, y: 40 }, rol: "trazo", grosor: 2 },

    // el cuadro
    { tipo: "linea", de: arriba, a: abajo, rol: "trazo", grosor: 4 },

    // líneas de visión y el ángulo
    { tipo: "linea", de: ojo, a: arriba, rol: "trazo" },
    { tipo: "linea", de: ojo, a: abajo, rol: "trazo" },
    { tipo: "arco", d: arco45.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco45.etiquetaEn, texto: "45°", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "middle" },

    // la persona: el ojo y una vertical hasta el piso
    { tipo: "punto", en: ojo, r: 5, rol: "trazo" },
    { tipo: "linea", de: ojo, a: { x: ojo.x, y: PISO }, rol: "trazo", punteada: true },

    // cotas
    { tipo: "linea", de: { x: ojo.x - 30, y: ojo.y }, a: { x: ojo.x - 30, y: PISO }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x: ojo.x - 30, y: ojo.y }, 90, 6), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: ojo.x - 30, y: PISO }, -90, 6), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: ojo.x - 36, y: (ojo.y + PISO) / 2 + 4 }, texto: "1,2 m", rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "end" },

    { tipo: "linea", de: { x: PARED + 26, y: arriba.y }, a: { x: PARED + 26, y: abajo.y }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x: PARED + 26, y: arriba.y }, 90, 6), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: PARED + 26, y: abajo.y }, -90, 6), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: PARED + 32, y: (arriba.y + abajo.y) / 2 + 4 }, texto: "1,5 m", rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "start" },

    { tipo: "linea", de: { x: PARED + 26, y: abajo.y }, a: { x: PARED + 26, y: PISO }, rol: "dato", color: AMBAR },
    { tipo: "texto", en: { x: PARED + 32, y: (abajo.y + PISO) / 2 + 4 }, texto: "1 m", rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "start" },

    { tipo: "linea", de: { x: ojo.x, y: PISO + 24 }, a: { x: PARED, y: PISO + 24 }, rol: "incognita", color: VIOLETA },
    { tipo: "path", d: cabezaFlecha({ x: ojo.x, y: PISO + 24 }, 180, 6), rol: "incognita", color: VIOLETA, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: PARED, y: PISO + 24 }, 0, 6), rol: "incognita", color: VIOLETA, relleno: true },
    { tipo: "texto", en: { x: (ojo.x + PARED) / 2, y: PISO + 40 }, texto: "d", rol: "incognita", color: VIOLETA, tam: 13, cursiva: true, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: PISO + 50, pasos: 0, elementos: el };
}

// Esfera colgada de una cuerda, soltada desde la horizontal, que baja por una
// trayectoria semicircular. Del facsímil (examen 1-2025, 1ra opción, F12): el
// soporte va arriba a la izquierda, la cuerda sale HORIZONTAL hacia la
// derecha con la esfera en la punta, y el arco punteado baja hasta el punto
// más bajo, justo debajo del soporte.
function f12esfera(): Figura {
  const pivote: Pt = { x: 158, y: 62 };
  const L = 136;
  const esfera = avanzar(pivote, 0, L);              // cuerda horizontal
  const masBajo = avanzar(pivote, -90, L);           // punto más bajo

  verificarDistancia("cuerda horizontal = radio", L, distancia(pivote, esfera));
  verificarDistancia("el punto más bajo está a la misma distancia", L, distancia(pivote, masBajo));
  verificarAngulo("cuarto de vuelta", 90, anguloEn(pivote, esfera, masBajo));

  const el: Elemento[] = [
    // soporte del techo
    { tipo: "linea", de: { x: pivote.x - 34, y: pivote.y }, a: { x: pivote.x + 16, y: pivote.y }, rol: "trazo", grosor: 2.4 },
  ];
  for (let i = 0; i < 5; i++) {
    const pie = { x: pivote.x - 30 + i * 10, y: pivote.y };
    el.push({ tipo: "linea", de: pie, a: avanzar(pie, 120, 9), rol: "trazo", grosor: 1 });
  }

  // arco punteado: de la esfera al punto más bajo, con segmentos alternados
  for (let i = 0; i < 20; i += 2) {
    const a = avanzar(pivote, -(i / 20) * 90, L);
    const b = avanzar(pivote, -((i + 1) / 20) * 90, L);
    el.push({ tipo: "linea", de: a, a: b, rol: "trazo" });
  }

  el.push(
    { tipo: "linea", de: pivote, a: esfera, rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: esfera, r: 11, rol: "trazo" },
    { tipo: "texto", en: { x: esfera.x + 20, y: esfera.y + 5 }, texto: "10 N", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "start" },
    { tipo: "punto", en: masBajo, r: 3, rol: "trazo", color: VIOLETA },
    { tipo: "texto", en: { x: masBajo.x, y: masBajo.y + 22 }, texto: "posición más baja", rol: "incognita", color: VIOLETA, tam: 11.5, negrita: true, ancla: "middle" },
  );

  return { ancho: 420, alto: 246, pasos: 0, elementos: el };
}

// Símbolo de pila: raya larga (+) y raya corta (−), perpendiculares al cable.
// Se corta el cable en el hueco para que no atraviese el símbolo.
function pila(de: Pt, a: Pt, etiqueta: string, color = AMBAR): Elemento[] {
  const dir = anguloHacia(de, a);
  const medio = { x: (de.x + a.x) / 2, y: (de.y + a.y) / 2 };
  const p1 = avanzar(medio, dir, -5);
  const p2 = avanzar(medio, dir, 5);
  const perp = dir + 90;
  const raya = (centro: Pt, largo: number, grosor: number): Elemento => ({
    tipo: "linea",
    de: avanzar(centro, perp, largo),
    a: avanzar(centro, perp, -largo),
    rol: "trazo",
    grosor,
  });
  return [
    { tipo: "linea", de, a: p1, rol: "trazo" },
    { tipo: "linea", de: p2, a, rol: "trazo" },
    raya(p1, 11, 2.2),
    raya(p2, 6, 2.2),
    { tipo: "texto", en: avanzar(medio, perp, 22), texto: etiqueta, rol: "dato", color, tam: 11.5, negrita: true, ancla: "middle" },
  ];
}

// Resistencia con su valor al costado.
function resistencia(de: Pt, a: Pt, etiqueta: string, ladoEtiqueta = 1, aparte = 18): Elemento[] {
  const dir = anguloHacia(de, a);
  const medio = { x: (de.x + a.x) / 2, y: (de.y + a.y) / 2 };
  return [
    { tipo: "path", d: resistorZigzag(de, a, 6, 5), rol: "trazo" },
    { tipo: "texto", en: avanzar(medio, dir + 90, aparte * ladoEtiqueta), texto: etiqueta, rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "middle" },
  ];
}

// Puente: dos pilas de 2 V en los lados, dos resistencias de 1 Ω arriba, dos
// abajo, y una rama central con 4 Ω en serie con una fuente de 4 V. Del
// facsímil (examen 2-2023, 2da opción, F9).
function f9puente(): Figura {
  const IZQ = 92, MED = 210, DER = 328;
  const ARR = 56, ABA = 186;
  const TL = { x: IZQ, y: ARR }, TM = { x: MED, y: ARR }, TR = { x: DER, y: ARR };
  const BL = { x: IZQ, y: ABA }, BM = { x: MED, y: ABA }, BR = { x: DER, y: ABA };
  const centro = { x: MED, y: (ARR + ABA) / 2 };

  const el: Elemento[] = [
    ...resistencia(TL, TM, "1 Ω", -1),
    ...resistencia(TM, TR, "1 Ω", -1),
    ...resistencia(BL, BM, "1 Ω", 1),
    ...resistencia(BM, BR, "1 Ω", 1),
    ...pila(TL, BL, "2 V"),
    ...pila(TR, BR, "2 V"),
    ...resistencia(TM, centro, "4 Ω", 1),
    ...pila(centro, BM, "4 V"),
  ];
  for (const n of [TL, TM, TR, BL, BM, BR]) el.push({ tipo: "punto", en: n, r: 3, rol: "trazo" });
  return { ancho: 420, alto: 224, pasos: 0, elementos: el };
}

// Dos fuentes (12 V y 5 V) con 3 Ω en la rama central, 2 Ω y 1 Ω abajo, y el
// amperímetro en el cable inferior. Del facsímil (examen 1-2023, 2da opción,
// F12).
function f12dosFuentes(): Figura {
  const IZQ = 96, MED = 212, DER = 328;
  const ARR = 50, MITAD = 122, ABA = 190;
  const TL = { x: IZQ, y: ARR }, TM = { x: MED, y: ARR }, TR = { x: DER, y: ARR };
  const ML = { x: IZQ, y: MITAD }, MR = { x: DER, y: MITAD };
  const BL = { x: IZQ, y: ABA }, BM = { x: MED, y: ABA }, BR = { x: DER, y: ABA };
  const amperimetro = { x: (IZQ + MED) / 2, y: ABA };

  const el: Elemento[] = [
    // riel superior
    { tipo: "linea", de: TL, a: TR, rol: "trazo" },
    // rama izquierda: 12 V arriba, 2 Ω abajo
    ...pila(TL, ML, "12 V"),
    ...resistencia(ML, BL, "2 Ω", 1),
    // rama central
    ...resistencia(TM, BM, "3 Ω", 1),
    // rama derecha: 5 V arriba, 1 Ω abajo
    ...pila(TR, MR, "5 V"),
    ...resistencia(MR, BR, "1 Ω", -1),
    // riel inferior con el amperímetro
    { tipo: "linea", de: BL, a: { x: amperimetro.x - 11, y: ABA }, rol: "trazo" },
    { tipo: "linea", de: { x: amperimetro.x + 11, y: ABA }, a: BR, rol: "trazo" },
    { tipo: "punto", en: amperimetro, r: 11, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: { x: amperimetro.x, y: amperimetro.y + 5 }, texto: "A", rol: "incognita", color: VIOLETA, tam: 12, negrita: true, ancla: "middle" },
  ];
  for (const n of [TL, TM, TR, BL, BM, BR]) el.push({ tipo: "punto", en: n, r: 3, rol: "trazo" });
  return { ancho: 420, alto: 228, pasos: 0, elementos: el };
}

// Polea de la que alguien tira hacia arriba por el eje. Del facsímil (examen
// 1-2024, 2da opción, F10): m₁ cuelga del lado izquierdo y m₂ está APOYADO en
// el piso del lado derecho — que m₂ arranque apoyado es justo lo que hace el
// problema, y no se deduce del enunciado.
function f10polea(): Figura {
  const EJE: Pt = { x: 214, y: 84 };
  const RADIO = 17;
  const PISO = 208;
  const izq = { x: EJE.x - RADIO, y: EJE.y };
  const der = { x: EJE.x + RADIO, y: EJE.y };
  const M1 = { x: izq.x, y: 140 };
  const M2 = { x: der.x, y: PISO - 20 };

  const caja = (centro: Pt, ancho: number, alto: number): Pt[] => [
    { x: centro.x - ancho / 2, y: centro.y - alto / 2 },
    { x: centro.x + ancho / 2, y: centro.y - alto / 2 },
    { x: centro.x + ancho / 2, y: centro.y + alto / 2 },
    { x: centro.x - ancho / 2, y: centro.y + alto / 2 },
  ];

  const el: Elemento[] = [
    // fuerza sobre el eje
    { tipo: "linea", de: { x: EJE.x, y: EJE.y - RADIO - 8 }, a: { x: EJE.x, y: 26 }, rol: "resultado", color: ROJO, grosor: 2.2 },
    { tipo: "path", d: cabezaFlecha({ x: EJE.x, y: 26 }, 90, 9), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: EJE.x + 10, y: 36 }, texto: "F = 100 N", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "start" },

    // polea
    { tipo: "punto", en: EJE, r: RADIO, rol: "trazo" },
    { tipo: "punto", en: EJE, r: 3, rol: "trazo" },

    // cable a cada lado
    { tipo: "linea", de: izq, a: M1, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: der, a: M2, rol: "trazo", grosor: 1.6 },

    // los dos bloques
    { tipo: "poligono", puntos: caja(M1, 40, 28), rol: "trazo" },
    { tipo: "texto", en: { x: M1.x, y: M1.y + 5 }, texto: "m₁", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "poligono", puntos: caja(M2, 40, 28), rol: "trazo" },
    { tipo: "texto", en: { x: M2.x, y: M2.y + 5 }, texto: "m₂", rol: "dato", color: AMBAR, tam: 12.5, negrita: true, ancla: "middle" },

    // piso bajo m₂
    { tipo: "linea", de: { x: der.x - 58, y: PISO }, a: { x: der.x + 58, y: PISO }, rol: "trazo", grosor: 2 },
  ];
  for (let i = 0; i < 7; i++) {
    const x = der.x - 52 + i * 17;
    el.push({ tipo: "linea", de: { x, y: PISO }, a: { x: x - 8, y: PISO + 9 }, rol: "trazo", grosor: 1 });
  }

  return { ancho: 420, alto: PISO + 26, pasos: 0, elementos: el };
}

// Ramal en serie entre A y B: 4 Ω, fuente de 10 V, 3 Ω y fuente de 5 V, con
// 3 A circulando. Del facsímil (examen 2-2022, 2da opción, F10), que lo dibuja
// como una única rama horizontal y no como un circuito cerrado.
function f10ramal(): Figura {
  const Y = 112;
  const A: Pt = { x: 48, y: Y };
  const B: Pt = { x: 372, y: Y };
  const paso = (B.x - A.x) / 4;
  const n = (i: number) => ({ x: A.x + paso * i, y: Y });

  const el: Elemento[] = [
    ...resistencia(n(0), n(1), "4 Ω", -1),
    ...pila(n(1), n(2), "10 V"),
    ...resistencia(n(2), n(3), "3 Ω", -1),
    ...pila(n(3), n(4), "5 V"),

    { tipo: "punto", en: A, r: 3.4, rol: "trazo" },
    { tipo: "punto", en: B, r: 3.4, rol: "trazo" },
    { tipo: "texto", en: { x: A.x, y: A.y + 22 }, texto: "A", rol: "incognita", color: VIOLETA, tam: 13, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: B.x, y: B.y + 22 }, texto: "B", rol: "incognita", color: VIOLETA, tam: 13, negrita: true, ancla: "middle" },

    // sentido de la corriente
    { tipo: "linea", de: { x: n(1).x + 6, y: Y - 40 }, a: { x: n(2).x - 6, y: Y - 40 }, rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha({ x: n(2).x - 6, y: Y - 40 }, 0, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: (n(1).x + n(2).x) / 2, y: Y - 46 }, texto: "3 A", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: 160, pasos: 0, elementos: el };
}

// Cuatro resistencias iguales entre a y b. Del facsímil (examen 1-2006, 2da
// opción, F12), leído en los trazos vectoriales del PDF: arriba una R de a a b;
// al medio una R de a al nodo M y otra R de M a b; abajo una R que va de a a M
// (NO a b: queda en paralelo con la primera del medio). Req = [(R||R)+R]||R =
// 3R/5 = 3 Ω con R = 5 Ω. Antes se dibujó como tres ramas completas en
// paralelo (2R/5 = 2 Ω) y la respuesta del banco estaba mal (corregido 4-oct).
function f12cuatroR(): Figura {
  const IZQ = 96, DER = 330, M = (IZQ + DER) / 2;
  const ARRIBA = 54, MEDIO = 112, ABAJO = 170;
  const a: Pt = { x: IZQ - 34, y: MEDIO };
  const b: Pt = { x: DER + 34, y: MEDIO };

  const el: Elemento[] = [
    // vertical izquierda: une las tres ramas en a
    { tipo: "linea", de: { x: IZQ, y: ARRIBA }, a: { x: IZQ, y: ABAJO }, rol: "trazo" },
    // vertical derecha: baja la R de arriba hasta b
    { tipo: "linea", de: { x: DER, y: ARRIBA }, a: { x: DER, y: MEDIO }, rol: "trazo" },
    // vertical del nodo M: sube la R de abajo hasta la rama del medio
    { tipo: "linea", de: { x: M, y: MEDIO }, a: { x: M, y: ABAJO }, rol: "trazo" },
    { tipo: "linea", de: a, a: { x: IZQ, y: MEDIO }, rol: "trazo" },
    { tipo: "linea", de: { x: DER, y: MEDIO }, a: b, rol: "trazo" },

    // rama de arriba: una R de a a b
    ...resistencia({ x: IZQ, y: ARRIBA }, { x: DER, y: ARRIBA }, "R", -1),
    // rama del medio: R de a a M y R de M a b
    ...resistencia({ x: IZQ, y: MEDIO }, { x: M, y: MEDIO }, "R", -1),
    ...resistencia({ x: M, y: MEDIO }, { x: DER, y: MEDIO }, "R", -1),
    // abajo: R de a a M
    ...resistencia({ x: IZQ, y: ABAJO }, { x: M, y: ABAJO }, "R", 1),

    { tipo: "punto", en: { x: M, y: MEDIO }, r: 2.6, rol: "trazo" },
    { tipo: "punto", en: a, r: 3.4, rol: "trazo" },
    { tipo: "punto", en: b, r: 3.4, rol: "trazo" },
    { tipo: "texto", en: { x: a.x - 10, y: a.y + 5 }, texto: "a", rol: "incognita", color: VIOLETA, tam: 13, cursiva: true, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: b.x + 10, y: b.y + 5 }, texto: "b", rol: "incognita", color: VIOLETA, tam: 13, cursiva: true, negrita: true, ancla: "start" },
  ];
  return { ancho: 420, alto: 214, pasos: 0, elementos: el };
}

// ── Helpers de arcos y cotas (comunes a las figuras de geometría) ──

// Arco de circunferencia de `centro` y `radio`, del ángulo a1 al a2. A
// diferencia de arcoAngulo, NO se limita al lado corto: el signo de (a2-a1)
// elige por dónde va, así que una semicircunferencia que pandea hacia abajo
// se escribe arcoDe(c, r, 180, 360) y la que pandea hacia arriba
// arcoDe(c, r, 180, 0). Imposible equivocarse de lado en silencio.
function arcoDe(centro: Pt, radio: number, a1: number, a2: number): string {
  const p1 = avanzar(centro, a1, radio);
  const p2 = avanzar(centro, a2, radio);
  const barrido = a2 - a1;
  const largo = Math.abs(barrido) > 180 ? 1 : 0;
  const sweep = barrido > 0 ? 0 : 1;
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radio.toFixed(2)} ${radio.toFixed(2)} 0 ${largo} ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

// Solo el tramo de arco, para encadenarlo dentro de un path que ya arrancó.
function sigueArco(centro: Pt, radio: number, a1: number, a2: number): string {
  const p2 = avanzar(centro, a2, radio);
  const barrido = a2 - a1;
  return ` A ${radio.toFixed(2)} ${radio.toFixed(2)} 0 ${Math.abs(barrido) > 180 ? 1 : 0} ${barrido > 0 ? 0 : 1} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

function circuloPath(centro: Pt, radio: number): string {
  return arcoDe(centro, radio, 0, 180) + sigueArco(centro, radio, 180, 360) + " Z";
}

// Cota con topes en las puntas (las "30 m" del PDF).
function cota(a: Pt, b: Pt, etiqueta: string, desplazamiento = 13): Elemento[] {
  const dir = anguloHacia(a, b);
  const medio: Pt = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const tope = (p: Pt): Elemento => ({
    tipo: "linea", de: avanzar(p, dir + 90, 5), a: avanzar(p, dir - 90, 5), rol: "dato",
  });
  return [
    { tipo: "linea", de: a, a: b, rol: "dato" },
    tope(a), tope(b),
    { tipo: "texto", en: avanzar(medio, dir + 90, desplazamiento), texto: etiqueta, rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
  ];
}

function rotulo(en: Pt, texto: string, rol: Rol = "trazo", tam = 13): Elemento {
  return { tipo: "texto", en, texto, rol, tam, negrita: true, ancla: "middle" };
}

// ── G7(2-2022) · dos cuadrados de lado 12 con semicircunferencias y cuartas ──
// El transcriptor había marcado E porque su lectura daba 18π. Con el PDF
// nítido (2-op-2-2022, pág. 1) cada cuadrado tiene TRES trazos: la
// semicircunferencia de diámetro el lado izquierdo, la cuarta circunferencia
// centrada en el vértice inferior izquierdo (radio = lado) y la diagonal
// desde ese mismo vértice. Las tres regiones grises suman
// (9π-18) + (9π-18) + (144-18π) = 36 por cuadrado: los π se cancelan.
// Dos cuadrados dan 72, que es la opción b).
function g7dosCuadrados(): Figura {
  const L = 148;
  const Y0 = 42;
  const GRIS = "#9aa0ad";

  function bloque(x0: number, nSupIzq: string, nSupDer: string, nInfIzq: string, nInfDer: string, nApex: string, nCruce: string): Elemento[] {
    const supIzq: Pt = { x: x0, y: Y0 };
    const supDer: Pt = { x: x0 + L, y: Y0 };
    const infIzq: Pt = { x: x0, y: Y0 + L };
    const infDer: Pt = { x: x0 + L, y: Y0 + L };
    const cen: Pt = { x: x0, y: Y0 + L / 2 };
    const r = L / 2;

    const apex = avanzar(cen, 0, r);            // tope de la semicircunferencia
    const cruce = avanzar(infIzq, 45, L);       // diagonal ∩ cuarta circunferencia

    verificarDistancia("apex sobre la semi", r, distancia(cen, apex));
    verificarDistancia("cruce a radio del cuarto", L, distancia(infIzq, cruce));
    verificarAngulo("cruce sobre la diagonal", 0, anguloEn(infIzq, cruce, supDer), 0.2);

    // Región 1: entre el arco supIzq→cruce, el tramo de diagonal y el arco de vuelta.
    const r1 = `M ${supIzq.x} ${supIzq.y}` + sigueArco(infIzq, L, 90, 45) +
      ` L ${apex.x.toFixed(2)} ${apex.y.toFixed(2)}` + sigueArco(cen, r, 0, 90) + " Z";
    // Región 2: la luna entre la diagonal y la semicircunferencia.
    const r2 = `M ${infIzq.x} ${infIzq.y} L ${apex.x.toFixed(2)} ${apex.y.toFixed(2)}` +
      sigueArco(cen, r, 0, -90) + " Z";
    // Región 3: el triángulo curvo contra el lado derecho del cuadrado.
    const r3 = `M ${cruce.x.toFixed(2)} ${cruce.y.toFixed(2)} L ${supDer.x} ${supDer.y} L ${infDer.x} ${infDer.y}` +
      sigueArco(infIzq, L, 0, 45) + " Z";

    const el: Elemento[] = [
      { tipo: "path", d: r1, rol: "trazo", relleno: true, color: GRIS },
      { tipo: "path", d: r2, rol: "trazo", relleno: true, color: GRIS },
      { tipo: "path", d: r3, rol: "trazo", relleno: true, color: GRIS },
      { tipo: "poligono", puntos: [supIzq, supDer, infDer, infIzq], rol: "trazo" },
      { tipo: "path", d: arcoDe(cen, r, 90, -90), rol: "trazo" },
      { tipo: "path", d: arcoDe(infIzq, L, 90, 0), rol: "trazo" },
      { tipo: "linea", de: infIzq, a: supDer, rol: "trazo" },
      rotulo({ x: supDer.x + 14, y: supDer.y - 10 }, nSupDer),
      rotulo({ x: infDer.x + 14, y: infDer.y + 14 }, nInfDer),
      rotulo({ x: cruce.x - 6, y: cruce.y - 18 }, nCruce, "incognita", 12),
      rotulo({ x: apex.x + 15, y: apex.y + 13 }, nApex, "incognita", 12),
      { tipo: "texto", en: { x: x0 + L / 2, y: Y0 - 13 }, texto: "12", rol: "dato", tam: 12, negrita: true, ancla: "middle" },
      { tipo: "texto", en: { x: x0 + L / 2, y: Y0 + L + 15 }, texto: "12", rol: "dato", tam: 12, negrita: true, ancla: "middle" },
    ];
    if (nSupIzq) el.push(rotulo({ x: supIzq.x - 14, y: supIzq.y - 10 }, nSupIzq));
    if (nInfIzq) el.push(rotulo({ x: infIzq.x - 14, y: infIzq.y + 14 }, nInfIzq));
    return el;
  }

  const el: Elemento[] = [
    ...bloque(44, "A", "D", "B", "C", "O", "E"),
    ...bloque(44 + L, "", "G", "", "F", "M", "N"),
    { tipo: "texto", en: { x: 44 - 17, y: Y0 + L / 2 }, texto: "12", rol: "dato", tam: 12, negrita: true, ancla: "middle" },
  ];
  return { ancho: 44 + 2 * L + 44, alto: Y0 + L + 40, pasos: 0, elementos: el };
}

// ── F9(2-2022) y F10(3-2022) · tiro parabólico con Hmax ──
// Misma figura y mismos datos en los dos exámenes. La clave que faltaba: A
// NO es un punto cualquiera, es el VÉRTICE (de ahí baja la vertical de
// Hmax). Entonces v_x = 30/2 = 15 m/s, del vértice al piso hay 30+45 = 75 m
// y son 5 s de caída: Hmax = ½·10·5² = 125 m (opción d).
function f9parabolico(): Figura {
  const SUELO = 236;
  const X_SALIDA = 46, X_CAIDA = 376;      // 150 m de alcance total
  const ALTO = 168;
  const PX = (X_CAIDA - X_SALIDA) / 150;   // px por metro, horizontal
  const vertice: Pt = { x: (X_SALIDA + X_CAIDA) / 2, y: SUELO - ALTO };
  const enX = (metrosDesdeVertice: number): Pt => {
    const t = metrosDesdeVertice / 75;
    return { x: vertice.x + metrosDesdeVertice * PX, y: SUELO - ALTO * (1 - t * t) };
  };
  const B = enX(30);
  const caida: Pt = { x: X_CAIDA, y: SUELO };

  verificarDistancia("A→B horizontal = 30 m", 30 * PX, B.x - vertice.x);
  verificarDistancia("B→caída horizontal = 45 m", 45 * PX, caida.x - B.x);

  const puntos: Pt[] = [];
  for (let i = 0; i <= 72; i++) puntos.push(enX(-75 + (150 * i) / 72));
  const trayecto = "M " + puntos.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ");

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 24, y: SUELO }, a: { x: 400, y: SUELO }, rol: "trazo", grosor: 2.6 },
    { tipo: "path", d: trayecto, rol: "trazo" },
    { tipo: "punto", en: { x: X_SALIDA, y: SUELO - 4 }, r: 5, rol: "trazo" },
    { tipo: "punto", en: vertice, r: 5, rol: "dato" },
    { tipo: "punto", en: B, r: 5, rol: "dato" },
    rotulo({ x: vertice.x - 15, y: vertice.y - 14 }, "A", "dato"),
    rotulo({ x: B.x + 15, y: B.y - 14 }, "B", "dato"),
    { tipo: "linea", de: vertice, a: { x: vertice.x, y: SUELO }, rol: "incognita", punteada: true },
    { tipo: "linea", de: B, a: { x: B.x, y: SUELO }, rol: "dato", punteada: true },
    { tipo: "texto", en: { x: vertice.x - 34, y: vertice.y + 64 }, texto: "Hmax", rol: "incognita", tam: 13, negrita: true, ancla: "middle" },
    ...cota({ x: vertice.x, y: SUELO + 30 }, { x: B.x, y: SUELO + 30 }, "30 m"),
    ...cota({ x: B.x, y: SUELO + 30 }, { x: caida.x, y: SUELO + 30 }, "45 m"),
    { tipo: "texto", en: { x: (vertice.x + B.x) / 2, y: vertice.y - 28 }, texto: "t = 2 s", rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: 292, pasos: 0, elementos: el };
}

// ── G7(3-2022) · cámaras A y B, agentes en D y C ──
// Los tres ángulos en H llenan la recta D-H-C: 2α + α + 2α = 180°, o sea
// α = 36°. Con AH = m y BH = n: CD = DH + HC = (m+n)·cos2α, y como el
// enunciado da m/n = tanα·tan2α, resulta CD = n·(tanα·tan2α + 1)·cos2α = n.
// Ese factor vale 1 para CUALQUIER α — por eso el dato del enunciado es el
// que cierra el problema, y la respuesta es la opción b).
function g7camaras(): Figura {
  const ALFA = 36;
  const RAD = Math.PI / 180;
  const SUELO = 266;
  const n = 116;
  const m = n * Math.tan(ALFA * RAD) * Math.tan(2 * ALFA * RAD);
  const H: Pt = { x: 212, y: SUELO };
  const A = avanzar(H, 180 - 2 * ALFA, m);
  const B = avanzar(H, 2 * ALFA, n);
  const D: Pt = { x: A.x, y: SUELO };
  const C: Pt = { x: B.x, y: SUELO };

  verificarAngulo("∡AHD = 2α", 2 * ALFA, anguloEn(H, A, { x: 0, y: SUELO }));
  verificarAngulo("∡AHB = α", ALFA, anguloEn(H, A, B));
  verificarAngulo("∡BHC = 2α", 2 * ALFA, anguloEn(H, B, { x: 420, y: SUELO }));
  verificarDistancia("CD = n", n, distancia(C, D));

  const aIzq = arcoAngulo(H, 180, 180 - 2 * ALFA, 40, 58);
  const aMed = arcoAngulo(H, 180 - 2 * ALFA, 2 * ALFA, 62, 80);
  const aDer = arcoAngulo(H, 2 * ALFA, 0, 40, 58);
  verificarAngulo("arco 2α izquierdo", 2 * ALFA, aIzq.medida);
  verificarAngulo("arco α", ALFA, aMed.medida);
  verificarAngulo("arco 2α derecho", 2 * ALFA, aDer.medida);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 34, y: SUELO }, a: { x: 392, y: SUELO }, rol: "trazo", grosor: 2.2 },
    { tipo: "linea", de: D, a: A, rol: "trazo", punteada: true },
    { tipo: "linea", de: C, a: B, rol: "trazo", punteada: true },
    { tipo: "linea", de: H, a: A, rol: "trazo" },
    { tipo: "linea", de: H, a: B, rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(D, 0, 90, 9), rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(C, 180, 90, 9), rol: "trazo" },
    { tipo: "arco", d: aIzq.d, rol: "dato" },
    { tipo: "arco", d: aMed.d, rol: "dato" },
    { tipo: "arco", d: aDer.d, rol: "dato" },
    rotulo(aIzq.etiquetaEn, "2α", "dato", 12),
    rotulo(aMed.etiquetaEn, "α", "dato", 12),
    rotulo(aDer.etiquetaEn, "2α", "dato", 12),
    rotulo({ x: A.x - 16, y: A.y - 7 }, "A"),
    rotulo({ x: B.x + 16, y: B.y - 7 }, "B"),
    rotulo({ x: D.x - 7, y: SUELO + 18 }, "D"),
    rotulo({ x: H.x + 5, y: SUELO + 18 }, "H"),
    rotulo({ x: C.x + 13, y: SUELO + 18 }, "C"),
    rotulo(avanzar({ x: (H.x + A.x) / 2, y: (H.y + A.y) / 2 }, 180 - 2 * ALFA + 90, 16), "m", "dato", 12),
    rotulo(avanzar(avanzar(H, 2 * ALFA, n * 0.78), 2 * ALFA - 90, 19), "n", "dato", 12),
    ...cota({ x: D.x, y: SUELO + 42 }, { x: C.x, y: SUELO + 42 }, "CD", -14),
  ];
  return { ancho: 420, alto: 344, pasos: 0, elementos: el };
}

// ── G5(2-2023) · cuadrado de lado 4 con cuatro semicircunferencias ──
// Lo que trababa la lectura: las semicircunferencias NO tienen por diámetro
// un lado entero, sino MEDIO lado (radio 1), dos por el lado de arriba y dos
// por el de abajo. El círculo central es tangente a las cuatro, así que su
// centro está a 1 + r del centro de cualquiera: √(1² + 2²) = r + 1, o sea
// r = √5 - 1 (opción a).
function g5semisCuadrado(): Figura {
  const U = 60;                 // px por unidad (lado = 4)
  const X0 = 52, Y0 = 34;
  const lado = 4 * U;
  const r = (Math.sqrt(5) - 1) * U;
  const centro: Pt = { x: X0 + lado / 2, y: Y0 + lado / 2 };
  const centrosSemi: Pt[] = [
    { x: X0 + U, y: Y0 }, { x: X0 + 3 * U, y: Y0 },
    { x: X0 + U, y: Y0 + lado }, { x: X0 + 3 * U, y: Y0 + lado },
  ];
  for (const c of centrosSemi) {
    verificarDistancia("círculo central tangente a la semi", r + U, distancia(centro, c));
  }

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [
      { x: X0, y: Y0 }, { x: X0 + lado, y: Y0 }, { x: X0 + lado, y: Y0 + lado }, { x: X0, y: Y0 + lado },
    ], rol: "trazo" },
    { tipo: "path", d: arcoDe(centrosSemi[0], U, 180, 360), rol: "trazo" },
    { tipo: "path", d: arcoDe(centrosSemi[1], U, 180, 360), rol: "trazo" },
    { tipo: "path", d: arcoDe(centrosSemi[2], U, 180, 0), rol: "trazo" },
    { tipo: "path", d: arcoDe(centrosSemi[3], U, 180, 0), rol: "trazo" },
    { tipo: "path", d: circuloPath(centro, r), rol: "incognita" },
    { tipo: "linea", de: centro, a: avanzar(centro, 205, r), rol: "incognita" },
    rotulo(avanzar(avanzar(centro, 205, r / 2), 295, 12), "r", "incognita", 12),
    { tipo: "texto", en: { x: X0 + lado / 2, y: Y0 - 14 }, texto: "4", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: X0 - 17, y: Y0 + lado / 2 }, texto: "4", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
  ];
  return { ancho: X0 + lado + 52, alto: Y0 + lado + 34, pasos: 0, elementos: el };
}

// ── G6(2-2023) · triángulo equilátero sobre tres cuadrados de lado 12 ──
// Dos cuadrados apoyados en la base separados por un hueco de 12 y el
// tercero encima del hueco. Cada lado oblicuo pasa por el vértice superior
// EXTERNO del cuadrado de su lado. Con la base sobre y=0 y el centro en
// x=0, el vértice (-18, 12) manda: -18 = -b + 12/√3, o sea b = 18 + 4√3, y
// el área es b²√3 = 372√3 + 432 (opción d).
function g6tresCuadrados(): Figura {
  const U = 6.4;                       // px por unidad
  const a = 12 * U;                    // lado del cuadrado
  const b = (18 + 4 * Math.sqrt(3)) * U;
  const CX = 212, BASE = 300;
  const izq: Pt = { x: CX - b, y: BASE };
  const der: Pt = { x: CX + b, y: BASE };
  const apex: Pt = { x: CX, y: BASE - b * Math.sqrt(3) };

  const cuadrado = (x: number, y: number): Pt[] => [
    { x, y }, { x: x + a, y }, { x: x + a, y: y + a }, { x, y: y + a },
  ];
  const abajoIzq = cuadrado(CX - 18 * U, BASE - a);
  const abajoDer = cuadrado(CX + 6 * U, BASE - a);
  const arriba = cuadrado(CX - 6 * U, BASE - 2 * a);

  verificarAngulo("equilátero: ángulo en la base", 60, anguloEn(izq, der, apex));
  verificarAngulo("equilátero: ángulo en el ápice", 60, anguloEn(apex, izq, der));
  verificarAngulo("el lado izquierdo pasa por el vértice", 0, anguloEn(izq, abajoIzq[0], apex), 0.2);
  verificarAngulo("el lado derecho pasa por el vértice", 0, anguloEn(der, abajoDer[1], apex), 0.2);
  verificarDistancia("lado del cuadrado", a, distancia(abajoIzq[0], abajoIzq[1]));

  const GRIS = "#c4c8d0";
  const el: Elemento[] = [
    { tipo: "poligono", puntos: [izq, der, apex], rol: "trazo" },
    { tipo: "poligono", puntos: abajoIzq, rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "poligono", puntos: abajoDer, rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "poligono", puntos: arriba, rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "texto", en: { x: abajoIzq[0].x + a / 2, y: BASE - a / 2 }, texto: "12", rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: arriba[0].x + a / 2, y: BASE - 1.5 * a }, texto: "12", rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: abajoDer[0].x + a / 2, y: BASE - a / 2 }, texto: "12", rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
  ];
  return { ancho: 424, alto: 330, pasos: 0, elementos: el };
}

// ── G7(2-2023) · triángulo oscuro en el cuadrado de lado 4 ──
// El equilátero se apoya en el lado inferior del cuadrado, así que su ápice
// queda en (2, 2√3). La región oscura es el triángulo ápice–esquina superior
// derecha–esquina inferior derecha: base = el lado derecho (4) y altura = la
// distancia horizontal del ápice a ese lado (2), o sea área 4 (opción a).
function g7trianguloOscuro(): Figura {
  const U = 62;
  const X0 = 62, Y0 = 30;
  const lado = 4 * U;
  const si: Pt = { x: X0, y: Y0 };
  const sd: Pt = { x: X0 + lado, y: Y0 };
  const ii: Pt = { x: X0, y: Y0 + lado };
  const id: Pt = { x: X0 + lado, y: Y0 + lado };
  const apex: Pt = { x: X0 + lado / 2, y: Y0 + lado - (lado * Math.sqrt(3)) / 2 };

  verificarDistancia("equilátero: lado izquierdo", lado, distancia(ii, apex));
  verificarDistancia("equilátero: lado derecho", lado, distancia(id, apex));
  verificarAngulo("equilátero: ángulo en el ápice", 60, anguloEn(apex, ii, id));

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [apex, sd, id], rol: "trazo", relleno: true, rellenoColor: "#2b2b35" },
    { tipo: "poligono", puntos: [si, sd, id, ii], rol: "trazo" },
    { tipo: "poligono", puntos: [ii, id, apex], rol: "trazo" },
    { tipo: "texto", en: { x: X0 + lado / 2, y: Y0 - 14 }, texto: "4", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: X0 - 17, y: Y0 + lado / 2 }, texto: "4", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
  ];
  return { ancho: X0 + lado + 62, alto: Y0 + lado + 34, pasos: 0, elementos: el };
}

// ── F9(2-2023) · cuatro vectores sobre la circunferencia ──
// En el escaneo de baja resolución el ángulo de la izquierda parecía 50°;
// en el PDF nítido los dos miden 30°. A, B y C salen del centro y su punta
// cae en la circunferencia (módulo R = |A| = √3). D NO sale del centro: va
// de la punta de C al extremo derecho, o sea D = (R, R). Sumando,
// A+B+C+D = (R, R) y el módulo es R√2 = √6 (opción c).
function f9vectores(): Figura {
  const O: Pt = { x: 208, y: 166 };
  const R = 112;
  const A = avanzar(O, 150, R);
  const B = avanzar(O, 30, R);
  const C = avanzar(O, 270, R);
  const D = avanzar(O, 0, R);

  verificarDistancia("|A| = R", R, distancia(O, A));
  verificarDistancia("|B| = R", R, distancia(O, B));
  verificarDistancia("|C| = R", R, distancia(O, C));
  verificarDistancia("|D| = R√2", R * Math.SQRT2, distancia(C, D));
  verificarAngulo("A a 30° de la horizontal", 30, anguloEn(O, A, avanzar(O, 180, R)));
  verificarAngulo("B a 30° de la horizontal", 30, anguloEn(O, B, D));

  const arcoA = arcoAngulo(O, 180, 150, 52, 72);
  const arcoB = arcoAngulo(O, 0, 30, 52, 72);
  verificarAngulo("arco izquierdo", 30, arcoA.medida);
  verificarAngulo("arco derecho", 30, arcoB.medida);

  const vector = (de: Pt, a: Pt, etiqueta: string, desplazamiento: number): Elemento[] => {
    const dir = anguloHacia(de, a);
    return [
      { tipo: "linea", de, a, rol: "trazo", grosor: 2 },
      { tipo: "path", d: cabezaFlecha(a, dir, 9), rol: "trazo", relleno: true },
      rotulo(avanzar(a, dir, desplazamiento), etiqueta, "trazo", 13),
    ];
  };

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "aux" },
    { tipo: "linea", de: { x: O.x - R - 42, y: O.y }, a: { x: O.x + R + 42, y: O.y }, rol: "aux" },
    { tipo: "linea", de: { x: O.x, y: O.y - R - 42 }, a: { x: O.x, y: O.y + R + 42 }, rol: "aux" },
    { tipo: "arco", d: arcoA.d, rol: "dato" },
    { tipo: "arco", d: arcoB.d, rol: "dato" },
    rotulo(arcoA.etiquetaEn, "30°", "dato", 11.5),
    rotulo(arcoB.etiquetaEn, "30°", "dato", 11.5),
    ...vector(O, A, "A", 16),
    ...vector(O, B, "B", 16),
    ...vector(C, D, "D", 17),
    ...vector(O, C, "C", 16),
  ];
  return { ancho: 420, alto: 340, pasos: 0, elementos: el };
}

// ── G8(3-2023) · octógono regular y las dos rectas secantes ──
// Una recta es la prolongación del lado de abajo; la otra pasa por dos
// vértices (el de la izquierda-arriba y el de arriba-derecha). Esa diagonal
// forma 22,5° con la horizontal, así que x = 22,5° = π/8 (opción a).
function g8octogono(): Figura {
  const LADO = 46;
  const R = LADO / (2 * Math.sin((22.5 * Math.PI) / 180));
  const C: Pt = { x: 300, y: 118 };
  const V = (k: number): Pt => avanzar(C, 22.5 + 45 * k, R);
  const vertices = [0, 1, 2, 3, 4, 5, 6, 7].map(V);
  const abajoIzq = V(5), abajoDer = V(6);
  const izqArriba = V(3), arribaDer = V(1);

  verificarDistancia("arista = 1 (escala)", LADO, distancia(abajoIzq, abajoDer));
  verificarDistancia("el lado de abajo es horizontal", 0, abajoIzq.y - abajoDer.y, 0.01);

  const SUELO = abajoIzq.y;
  const dirDiagonal = anguloHacia(izqArriba, arribaDer);
  verificarAngulo("la diagonal sube 22,5°", 22.5, Math.abs(dirDiagonal));

  const corte = hastaY(izqArriba, dirDiagonal + 180, SUELO);
  const fin = avanzar(arribaDer, dirDiagonal, 26);
  const arco = arcoAngulo(corte, 0, 22.5, 50, 70);
  verificarAngulo("arco x", 22.5, arco.medida);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 46, y: SUELO }, a: { x: 400, y: SUELO }, rol: "trazo" },
    { tipo: "linea", de: corte, a: fin, rol: "trazo" },
    { tipo: "poligono", puntos: vertices, rol: "trazo" },
    { tipo: "arco", d: arco.d, rol: "incognita" },
    rotulo(arco.etiquetaEn, "x", "incognita", 14),
    rotulo({ x: V(0).x + 17, y: (V(0).y + V(7).y) / 2 }, "1", "dato", 12),
  ];
  return { ancho: 424, alto: SUELO + 44, pasos: 0, elementos: el };
}

// ── G5(1-2024) · rectángulo con semicircunferencia y cuarta circunferencia ──
// El alto no viene dado, pero la figura muestra las dos curvas TANGENTES y
// eso lo fija: con AD = 4, AE = EB = y y DC = 2y, la tangencia externa pide
// EC = 3y, o sea √(16 + y²) = 3y y por lo tanto y = √2. El área sombreada
// es medio círculo de radio y más un cuarto de círculo de radio 2y:
// ½π·2 + ¼π·8 = 3π (opción a).
function g5rectArcos(): Figura {
  const U = 68;
  const y = Math.SQRT2 * U;
  const ancho = 4 * U, alto = 2 * y;
  const X0 = 56, Y0 = 40;
  const A: Pt = { x: X0, y: Y0 };
  const D: Pt = { x: X0 + ancho, y: Y0 };
  const Bv: Pt = { x: X0, y: Y0 + alto };
  const Cv: Pt = { x: X0 + ancho, y: Y0 + alto };
  const E: Pt = { x: X0, y: Y0 + y };

  verificarDistancia("tangencia: EC = 3y", 3 * y, distancia(E, Cv));
  verificarDistancia("E es el punto medio de AB", y, distancia(A, E));
  verificarDistancia("el cuarto de círculo tiene radio DC", alto, distancia(Cv, D));

  const GRIS = "#9aa0ad";
  const semi = `M ${A.x} ${A.y}` + sigueArco(E, y, 90, -90) + " Z";
  const cuarto = `M ${Cv.x} ${Cv.y} L ${D.x} ${D.y}` + sigueArco(Cv, alto, 90, 180) + " Z";

  const el: Elemento[] = [
    { tipo: "path", d: semi, rol: "trazo", relleno: true, color: GRIS },
    { tipo: "path", d: cuarto, rol: "trazo", relleno: true, color: GRIS },
    { tipo: "poligono", puntos: [A, D, Cv, Bv], rol: "trazo" },
    { tipo: "path", d: arcoDe(E, y, 90, -90), rol: "trazo" },
    { tipo: "path", d: arcoDe(Cv, alto, 90, 180), rol: "trazo" },
    { tipo: "punto", en: E, r: 3.5, rol: "trazo" },
    rotulo({ x: A.x - 15, y: A.y - 11 }, "A"),
    rotulo({ x: D.x + 15, y: D.y - 11 }, "D"),
    rotulo({ x: Bv.x - 15, y: Bv.y + 14 }, "B"),
    rotulo({ x: Cv.x + 15, y: Cv.y + 14 }, "C"),
    rotulo({ x: E.x - 17, y: E.y }, "E"),
    { tipo: "texto", en: { x: X0 + ancho / 2, y: Y0 - 14 }, texto: "4", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: X0 - 34, y: Y0 + y / 2 }, texto: "y", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: X0 - 34, y: Y0 + 1.5 * y }, texto: "y", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: D.x + 18, y: Y0 + alto / 2 }, texto: "x", rol: "dato", tam: 12.5, negrita: true, ancla: "middle" },
  ];
  return { ancho: X0 + ancho + 56, alto: Y0 + alto + 40, pasos: 0, elementos: el };
}

// ── G7(3-2024) · círculo inscrito en el semicírculo de diámetro 10 ──
// El círculo es tangente al diámetro, a la cuerda que sale a 30° del extremo
// izquierdo y por dentro al semicírculo. Su centro está sobre la bisectriz
// (15°), así que r = 10(tan15° - tan²15°) = 10√a y el área es 100πa
// (opción c), usando el dato tan²15° - tan15° = -√a.
function g7semiInscrito(): Figura {
  const U = 35;
  const R = 5 * U;
  const O: Pt = { x: 210, y: 248 };
  const izq = avanzar(O, 180, R);
  const der = avanzar(O, 0, R);
  const t15 = Math.tan((15 * Math.PI) / 180);
  const r = 10 * (t15 - t15 * t15) * U;
  const centro = avanzar(izq, 15, r / Math.sin((15 * Math.PI) / 180));
  const cuerdaFin = avanzar(izq, 30, 2 * R * Math.cos((30 * Math.PI) / 180));

  verificarDistancia("tangente interior al semicírculo", R - r, distancia(O, centro));
  verificarDistancia("tangente al diámetro", r, O.y - centro.y);
  verificarDistancia("la cuerda termina en el arco", R, distancia(O, cuerdaFin));
  verificarAngulo("la cuerda sale a 30°", 30, anguloEn(izq, cuerdaFin, der));

  const arco30 = arcoAngulo(izq, 0, 30, 46, 64);
  verificarAngulo("arco 30°", 30, arco30.medida);

  const el: Elemento[] = [
    { tipo: "path", d: arcoDe(O, R, 180, 0), rol: "trazo" },
    { tipo: "linea", de: izq, a: der, rol: "trazo" },
    { tipo: "linea", de: izq, a: cuerdaFin, rol: "trazo" },
    { tipo: "path", d: circuloPath(centro, r), rol: "incognita", relleno: true, color: "#b9b2d6" },
    { tipo: "path", d: circuloPath(centro, r), rol: "incognita" },
    { tipo: "arco", d: arco30.d, rol: "dato" },
    rotulo(arco30.etiquetaEn, "30°", "dato", 11.5),
    ...cota({ x: izq.x, y: O.y + 26 }, { x: der.x, y: O.y + 26 }, "10"),
  ];
  return { ancho: 420, alto: 300, pasos: 0, elementos: el };
}

// ── F11(2-2025) · rizo circular liso ──
// "Llega solo hasta B" en una pista lisa quiere decir que ahí se le acaba la
// rapidez. La altura de B sobre el piso es R + R·senα, y por conservación
// v₀²/2 = g·h, o sea h = 1600/20 = 80 m = 50(1 + senα): senα = 0,6 y
// α = 37° (opción b).
function f11rizo(): Figura {
  const R = 96;
  const C: Pt = { x: 258, y: 176 };
  const SUELO = C.y + R;
  const ALFA = 37;
  const B = avanzar(C, ALFA, R);
  const derecha = avanzar(C, 0, R);

  verificarDistancia("el rizo apoya en el piso", R, SUELO - C.y);
  verificarAngulo("B a α sobre la horizontal del centro", ALFA, anguloEn(C, B, derecha));

  const arcoAlfa = arcoAngulo(C, 0, ALFA, 46, 64);
  verificarAngulo("arco α", ALFA, arcoAlfa.medida);

  const pelota: Pt = { x: 118, y: SUELO - 8 };
  const puntaV: Pt = { x: pelota.x + 36, y: pelota.y - 32 };
  const el: Elemento[] = [
    { tipo: "linea", de: { x: 26, y: SUELO }, a: { x: 398, y: SUELO }, rol: "trazo", grosor: 2.6 },
    { tipo: "path", d: arcoDe(C, R, 268, 268 + 344), rol: "trazo" },
    { tipo: "linea", de: C, a: derecha, rol: "aux", punteada: true },
    { tipo: "linea", de: C, a: B, rol: "aux", punteada: true },
    { tipo: "linea", de: C, a: { x: C.x, y: SUELO }, rol: "dato", punteada: true },
    { tipo: "arco", d: arcoAlfa.d, rol: "incognita" },
    rotulo(arcoAlfa.etiquetaEn, "α", "incognita", 13),
    rotulo({ x: C.x - 21, y: C.y + R / 2 }, "R", "dato", 13),
    rotulo(avanzar(B, ALFA, 18), "B", "trazo", 13),
    { tipo: "punto", en: pelota, r: 7, rol: "trazo" },
    { tipo: "linea", de: { x: pelota.x - 26, y: puntaV.y }, a: puntaV, rol: "dato" },
    { tipo: "path", d: cabezaFlecha(puntaV, 0, 7), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: pelota.x + 4, y: puntaV.y - 15 }, texto: "V = 40 m/s", rol: "dato", tam: 12, negrita: true, ancla: "middle" },
    { tipo: "texto", en: { x: 58, y: SUELO - 20 }, texto: "liso", rol: "dato", tam: 12, negrita: true, ancla: "middle" },
  ];
  return { ancho: 420, alto: SUELO + 34, pasos: 0, elementos: el };
}

// ── F24 (2-2010 final 2da) · tres resistencias en paralelo entre dos nodos ──
// El enunciado da la topología completa: 2Ω, 2Ω y 1Ω entre los MISMOS dos
// nodos, alimentadas por una fuente. 1/R = 1/2+1/2+1/1 = 2 → R = 0,5 Ω.
function f24tresParalelo(): Figura {
  const IZQ = 55, ARR = 52, ABA = 186;
  const XS = [150, 240, 330];           // las tres ramas
  const DER = XS[XS.length - 1];        // el riel termina EN la última rama, sin cable colgando
  const VALORES = ["2 Ω", "2 Ω", "1 Ω"];

  const el: Elemento[] = [
    // nodos: riel superior y riel inferior
    { tipo: "linea", de: { x: IZQ, y: ARR }, a: { x: DER, y: ARR }, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: { x: IZQ, y: ABA }, a: { x: DER, y: ABA }, rol: "trazo", grosor: 1.8 },
    // fuente a la izquierda (placas larga/corta)
    { tipo: "linea", de: { x: IZQ, y: ARR }, a: { x: IZQ, y: 108 }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: IZQ - 13, y: 108 }, a: { x: IZQ + 13, y: 108 }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: IZQ - 7, y: 119 }, a: { x: IZQ + 7, y: 119 }, rol: "trazo", grosor: 1.4 },
    { tipo: "linea", de: { x: IZQ, y: 119 }, a: { x: IZQ, y: ABA }, rol: "trazo", grosor: 1.6 },
    { tipo: "texto", en: { x: IZQ - 34, y: 118 }, texto: "V", rol: "trazo", tam: 13, cursiva: true },
    // los dos nodos comunes, marcados: es el dato que hace que sean paralelo
    { tipo: "punto", en: { x: XS[0], y: ARR }, rol: "dato", color: ROJO, r: 3.4 },
    { tipo: "punto", en: { x: XS[0], y: ABA }, rol: "dato", color: ROJO, r: 3.4 },
  ];

  XS.forEach((x, i) => {
    el.push({ tipo: "path", d: resistorZigzag({ x, y: ARR }, { x, y: ABA }), rol: "trazo" });
    el.push({ tipo: "texto", en: { x: x + 22, y: 122 }, texto: VALORES[i], rol: "trazo", tam: 11 });
  });

  return { ancho: 400, alto: 230, pasos: 0, elementos: el };
}

// ── F12 (1-2010 1ra) · cuatro resistencias entre A y B, como en el facsímil ──
// Corregida el 3-nov-2026: el banco había supuesto dos ramas en serie y su
// respuesta (2,4 Ω) no salía del dibujo del PDF. En el PDF, A toca el riel
// superior a la izquierda de R1; R3 y R4 cuelgan de ese mismo riel; R1 lleva
// a R2, que baja hasta el riel inferior donde está B. Entonces R1+R2 = 4 Ω
// queda en paralelo con R3 = 2 Ω y R4 = 4 Ω: 1/Req = 1/4 + 1/2 + 1/4 = 1 → 1 Ω.
function f12cuatroRamas(): Figura {
  const Y_SUP = 54, Y_INF = 192;        // rieles
  const Y_R0 = 92, Y_R1 = 154;          // extremos de los resistores verticales
  const X3 = 70, X4 = 130, X2 = 360;    // R3, R4 y R2
  const XA = 175;                       // donde A toca el riel de arriba
  const A: Pt = { x: XA, y: 22 };
  const B: Pt = { x: XA, y: 214 };

  const el: Elemento[] = [
    // terminal A
    { tipo: "punto", en: A, rol: "trazo", r: 3.4 },
    { tipo: "texto", en: { x: A.x - 17, y: A.y + 5 }, texto: "A", rol: "trazo", tam: 14, negrita: true },
    { tipo: "linea", de: A, a: { x: XA, y: Y_SUP }, rol: "trazo", grosor: 1.6 },
    // riel de arriba con R1 entre A y R2
    { tipo: "linea", de: { x: X3, y: Y_SUP }, a: { x: 215, y: Y_SUP }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: 215, y: Y_SUP }, { x: 295, y: Y_SUP }), rol: "trazo" },
    { tipo: "texto", en: { x: 255, y: Y_SUP - 15 }, texto: "R₁ = 3 Ω", rol: "trazo", tam: 11, ancla: "middle" },
    { tipo: "linea", de: { x: 295, y: Y_SUP }, a: { x: X2, y: Y_SUP }, rol: "trazo", grosor: 1.6 },
    // R3, R4 y R2 bajan al riel de abajo
    { tipo: "linea", de: { x: X3, y: Y_SUP }, a: { x: X3, y: Y_R0 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: X3, y: Y_R0 }, { x: X3, y: Y_R1 }), rol: "trazo" },
    { tipo: "linea", de: { x: X3, y: Y_R1 }, a: { x: X3, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    { tipo: "texto", en: { x: X3 - 14, y: 127 }, texto: "R₃ = 2 Ω", rol: "trazo", tam: 11, ancla: "end" },
    { tipo: "linea", de: { x: X4, y: Y_SUP }, a: { x: X4, y: Y_R0 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: X4, y: Y_R0 }, { x: X4, y: Y_R1 }), rol: "trazo" },
    { tipo: "linea", de: { x: X4, y: Y_R1 }, a: { x: X4, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    { tipo: "texto", en: { x: X4 + 14, y: 127 }, texto: "R₄ = 4 Ω", rol: "trazo", tam: 11, ancla: "start" },
    { tipo: "linea", de: { x: X2, y: Y_SUP }, a: { x: X2, y: Y_R0 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: X2, y: Y_R0 }, { x: X2, y: Y_R1 }), rol: "trazo" },
    { tipo: "linea", de: { x: X2, y: Y_R1 }, a: { x: X2, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    { tipo: "texto", en: { x: X2 - 14, y: 127 }, texto: "R₂ = 1 Ω", rol: "trazo", tam: 11, ancla: "end" },
    // riel de abajo y terminal B
    { tipo: "linea", de: { x: X3, y: Y_INF }, a: { x: X2, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: XA, y: Y_INF }, a: B, rol: "trazo", grosor: 1.6 },
    { tipo: "punto", en: B, rol: "trazo", r: 3.4 },
    { tipo: "texto", en: { x: B.x + 17, y: B.y + 5 }, texto: "B", rol: "trazo", tam: 14, negrita: true },
  ];

  return { ancho: 430, alto: 236, pasos: 0, elementos: el };
}

// ── F11/F19 · Atwood con separación inicial h (m1=4 kg, m2=1 kg, h=24 m) ──
// Sirve para 2-2022 P11 y 1-2025 P19: mismo enunciado, mismos datos, misma
// respuesta. m1 arranca h por ENCIMA de m2, baja h/2 y se cruzan a mitad de
// camino: a = (m1-m2)g/(m1+m2) = 6, v² = 2·6·12 → v = 12 m/s.
function f11atwoodH(): Figura {
  const CX = 210, CY = 44, R = 17;      // polea
  const XI = CX - R, XD = CX + R;       // las dos ramas de la cuerda
  const Y_M1 = 86;                      // m1 arriba (es la pesada: baja)
  const Y_M2 = 196;                     // m2 abajo
  const LADO = 30;

  // La separación dibujada ES la del problema: se verifica contra la cota.
  verificarDistancia("separación h dibujada", Y_M2 - Y_M1, 110, 0.5);

  const el: Elemento[] = [
    // soporte y polea
    { tipo: "linea", de: { x: CX - 62, y: 16 }, a: { x: CX + 62, y: 16 }, rol: "trazo", grosor: 2.2 },
    { tipo: "linea", de: { x: CX, y: 16 }, a: { x: CX, y: CY - R }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: `M ${CX - R} ${CY} A ${R} ${R} 0 1 1 ${CX + R} ${CY} A ${R} ${R} 0 1 1 ${CX - R} ${CY} Z`, rol: "trazo" },
    { tipo: "punto", en: { x: CX, y: CY }, rol: "trazo", r: 2 },
    // cuerda
    { tipo: "linea", de: { x: XI, y: CY }, a: { x: XI, y: Y_M1 }, rol: "trazo", grosor: 1.5 },
    { tipo: "linea", de: { x: XD, y: CY }, a: { x: XD, y: Y_M2 }, rol: "trazo", grosor: 1.5 },
    // bloques
    { tipo: "poligono", puntos: [
        { x: XI - LADO / 2, y: Y_M1 }, { x: XI + LADO / 2, y: Y_M1 },
        { x: XI + LADO / 2, y: Y_M1 + LADO }, { x: XI - LADO / 2, y: Y_M1 + LADO }],
      rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: XI, y: Y_M1 + LADO / 2 + 5 }, texto: "m₁", rol: "trazo", tam: 12, ancla: "middle" },
    { tipo: "texto", en: { x: XI - 26, y: Y_M1 + LADO / 2 + 5 }, texto: "4 kg", rol: "dato", color: ROJO, tam: 11, ancla: "end" },
    { tipo: "poligono", puntos: [
        { x: XD - LADO / 2, y: Y_M2 }, { x: XD + LADO / 2, y: Y_M2 },
        { x: XD + LADO / 2, y: Y_M2 + LADO }, { x: XD - LADO / 2, y: Y_M2 + LADO }],
      rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: XD, y: Y_M2 + LADO / 2 + 5 }, texto: "m₂", rol: "trazo", tam: 12, ancla: "middle" },
    { tipo: "texto", en: { x: XD + 30, y: Y_M2 + LADO / 2 + 5 }, texto: "1 kg", rol: "dato", color: ROJO, tam: 11 },
    // cota de la separación inicial h, que es el dato que hace al problema
    { tipo: "linea", de: { x: 112, y: Y_M1 + LADO / 2 }, a: { x: 112, y: Y_M2 + LADO / 2 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: 106, y: Y_M1 + LADO / 2 }, a: { x: 118, y: Y_M1 + LADO / 2 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: 106, y: Y_M2 + LADO / 2 }, a: { x: 118, y: Y_M2 + LADO / 2 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: 86, y: (Y_M1 + Y_M2) / 2 + LADO / 2 }, texto: "h = 24 m", rol: "dato", color: AMBAR, tam: 11, ancla: "end" },
  ];

  return { ancho: 400, alto: 250, pasos: 0, elementos: el };
}

// ── F17 (2-2013 parcial 1ra) · plano inclinado con rozamiento ──
// Altura 5 m, base 10 m, el cuerpo parte del reposo en A y llega a la base
// con v = 5 m/s. El ángulo NO se da: sale de la geometría, atan(5/10).
function f17planoRozamiento(): Figura {
  const ESC = 30;                        // px por metro dibujado
  const BASE_M = 10, ALTO_M = 5;
  const P: Pt = { x: 70, y: 200 };                              // vértice del ángulo (pie de la rampa)
  const Q: Pt = { x: P.x + BASE_M * ESC, y: P.y };              // esquina inferior derecha
  const A: Pt = { x: Q.x, y: P.y - ALTO_M * ESC };              // lo alto del plano

  // El dibujo tiene que MEDIR lo que dicen sus etiquetas.
  verificarDistancia("base de 10 m", BASE_M * ESC, distancia(P, Q), 0.5);
  verificarDistancia("altura de 5 m", ALTO_M * ESC, distancia(Q, A), 0.5);
  verificarAngulo("inclinación = atan(5/10)", Math.atan2(ALTO_M, BASE_M) * 180 / Math.PI, anguloEn(P, Q, A));

  const bloque = bloqueSobre(avanzar(A, anguloHacia(A, P), 34), anguloHacia(A, P), 30, 17);

  const el: Elemento[] = [
    // el triángulo del plano
    { tipo: "poligono", puntos: [P, Q, A], rol: "trazo", relleno: true, rellenoColor: "#f1f0eb" },
    // el bloque, apoyado sobre la rampa con su inclinación real
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "texto", en: { x: A.x - 78, y: A.y + 26 }, texto: "20 kg", rol: "dato", color: ROJO, tam: 11 },
    // A arriba, base abajo
    { tipo: "punto", en: A, rol: "trazo", r: 3 },
    { tipo: "texto", en: { x: A.x + 10, y: A.y - 4 }, texto: "A", rol: "trazo", tam: 13, negrita: true },
    { tipo: "texto", en: { x: P.x - 6, y: P.y + 18 }, texto: "v = 5 m/s", rol: "dato", color: VERDE, tam: 11, ancla: "start" },
    // cotas: altura y base
    { tipo: "linea", de: { x: Q.x + 26, y: A.y }, a: { x: Q.x + 26, y: Q.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x + 20, y: A.y }, a: { x: Q.x + 32, y: A.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x + 20, y: Q.y }, a: { x: Q.x + 32, y: Q.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: Q.x + 36, y: (A.y + Q.y) / 2 + 4 }, texto: "5 m", rol: "dato", color: AMBAR, tam: 11 },
    { tipo: "linea", de: { x: P.x, y: Q.y + 34 }, a: { x: Q.x, y: Q.y + 34 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: P.x, y: Q.y + 28 }, a: { x: P.x, y: Q.y + 40 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x, y: Q.y + 28 }, a: { x: Q.x, y: Q.y + 40 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: (P.x + Q.x) / 2, y: Q.y + 52 }, texto: "10 m", rol: "dato", color: AMBAR, tam: 11, ancla: "middle" },
    // el ángulo recto en Q, que es lo que hace que base y altura sean catetos
    { tipo: "cuadradoRecto", d: cuadradoRecto(Q, 180, -90, 11), rol: "trazo" },
  ];

  return { ancho: 430, alto: 275, pasos: 0, elementos: el };
}

// ── F12 (2-2014 única) · energía con rozamiento solo en el tramo horizontal ──
// Baja sin fricción desde A (6 m), cruza 9 m con μ=1/3 y sube sin fricción
// hasta B. mgh_A - μmg·d = mgh_B → 60 - 30 = 10h → h = 3 m.
function f12energiaRampa(): Figura {
  const ESC = 21;                         // px por metro
  const Y0 = 210;                         // nivel del tramo horizontal
  const H_A = 6, H_B = 3, LARGO = 9;
  const xIniRampa = 78;
  const P1: Pt = { x: xIniRampa + 90, y: Y0 };                  // pie de la rampa izquierda
  const A: Pt = { x: xIniRampa, y: Y0 - H_A * ESC };            // arriba a la izquierda
  const P2: Pt = { x: P1.x + LARGO * ESC, y: Y0 };              // pie de la rampa derecha
  const B: Pt = { x: P2.x + 66, y: Y0 - H_B * ESC };            // donde se detiene

  verificarDistancia("altura de A = 6 m", H_A * ESC, Y0 - A.y, 0.5);
  verificarDistancia("altura de B = 3 m", H_B * ESC, Y0 - B.y, 0.5);
  verificarDistancia("tramo rugoso = 9 m", LARGO * ESC, distancia(P1, P2), 0.5);

  const bloque = bloqueSobre(avanzar(A, anguloHacia(A, P1), 20), anguloHacia(A, P1), 26, 15);

  const el: Elemento[] = [
    // el perfil del terreno, de una sola pieza
    { tipo: "linea", de: A, a: P1, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: P1, a: P2, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: P2, a: B, rol: "trazo", grosor: 2 },
    // el bloque, apoyado sobre la rampa de salida
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    // A y B
    { tipo: "punto", en: A, rol: "trazo", r: 3 },
    { tipo: "texto", en: { x: A.x - 13, y: A.y - 6 }, texto: "A", rol: "trazo", tam: 13, negrita: true },
    { tipo: "punto", en: B, rol: "resultado", color: ROJO, r: 3 },
    { tipo: "texto", en: { x: B.x + 13, y: B.y - 6 }, texto: "B", rol: "resultado", color: ROJO, tam: 13, negrita: true },
    // el dato de cada tramo: lo que cambia el problema es DÓNDE hay rozamiento
    { tipo: "texto", en: { x: (A.x + P1.x) / 2 - 26, y: (A.y + Y0) / 2 + 16 }, texto: "μ = 0", rol: "trazo", tam: 11 },
    { tipo: "texto", en: { x: (P2.x + B.x) / 2 + 4, y: (B.y + Y0) / 2 + 20 }, texto: "μ = 0", rol: "trazo", tam: 11 },
    { tipo: "texto", en: { x: (P1.x + P2.x) / 2, y: Y0 - 14 }, texto: "μ = 1/3", rol: "dato", color: ROJO, tam: 12, negrita: true },
    // cotas
    { tipo: "linea", de: { x: A.x - 26, y: A.y }, a: { x: A.x - 26, y: Y0 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: A.x - 32, y: A.y }, a: { x: A.x - 20, y: A.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: A.x - 32, y: Y0 }, a: { x: A.x - 20, y: Y0 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: A.x - 36, y: (A.y + Y0) / 2 }, texto: "6 m", rol: "dato", color: AMBAR, tam: 11, ancla: "end" },
    { tipo: "linea", de: { x: B.x + 30, y: B.y }, a: { x: B.x + 30, y: Y0 }, rol: "incognita", grosor: 1.4 },
    { tipo: "linea", de: { x: B.x + 24, y: B.y }, a: { x: B.x + 36, y: B.y }, rol: "incognita", grosor: 1.4 },
    { tipo: "linea", de: { x: B.x + 24, y: Y0 }, a: { x: B.x + 36, y: Y0 }, rol: "incognita", grosor: 1.4 },
    { tipo: "texto", en: { x: B.x + 40, y: (B.y + Y0) / 2 }, texto: "h = ?", rol: "incognita", tam: 12, ancla: "start" },
    { tipo: "linea", de: { x: P1.x, y: Y0 + 26 }, a: { x: P2.x, y: Y0 + 26 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: P1.x, y: Y0 + 20 }, a: { x: P1.x, y: Y0 + 32 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: P2.x, y: Y0 + 20 }, a: { x: P2.x, y: Y0 + 32 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: (P1.x + P2.x) / 2, y: Y0 + 44 }, texto: "9 m", rol: "dato", color: AMBAR, tam: 11 },
  ];

  return { ancho: 505, alto: 270, pasos: 0, elementos: el };
}

// ── F6 (2-2008 parcial 2da) · dos secantes desde un punto externo ──
// Una secante pasa por el centro: AE=10 y AF=10+2r. La otra da AB=12, AC=25.
// Potencia del punto: 10(10+2r)=300 → r=10. La figura se construye CON r=10,
// así que las longitudes dibujadas son las del problema.
function f6secantesPotencia(): Figura {
  const ESC = 6;                           // px por metro
  const R = 10 * ESC;                      // radio real: 10 m
  const O: Pt = { x: 250, y: 132 };
  const A: Pt = { x: O.x - (10 * ESC + R), y: O.y };   // AE=10 y EO=r → AO = 10+r
  const E: Pt = { x: A.x + 10 * ESC, y: O.y };         // el cercano
  const F: Pt = { x: O.x + R, y: O.y };                // el diametralmente opuesto

  // La segunda secante: se calcula el ángulo que hace que AB=12 y AC=25.
  // t² - 2·AO·cosθ·t + (AO² - R²) = 0, con raíces 12·ESC y 25·ESC.
  const AO = distancia(A, O);
  const t1 = 12 * ESC, t2 = 25 * ESC;
  const cosT = (t1 + t2) / (2 * AO);
  const th = -Math.acos(cosT) * 180 / Math.PI;          // hacia arriba
  const B = avanzar(A, th, t1);
  const C = avanzar(A, th, t2);

  // Que el dibujo cumpla de verdad la potencia del punto.
  verificarDistancia("AE = 10 m", 10 * ESC, distancia(A, E), 0.5);
  verificarDistancia("AF = 10+2r", (10 + 20) * ESC, distancia(A, F), 0.5);
  verificarDistancia("AB = 12 m", t1, distancia(A, B), 0.5);
  verificarDistancia("AC = 25 m", t2, distancia(A, C), 0.5);
  verificarDistancia("B sobre la circunferencia", R, distancia(O, B), 0.5);
  verificarDistancia("C sobre la circunferencia", R, distancia(O, C), 0.5);

  const el: Elemento[] = [
    { tipo: "path", d: `M ${O.x - R} ${O.y} A ${R} ${R} 0 1 1 ${O.x + R} ${O.y} A ${R} ${R} 0 1 1 ${O.x - R} ${O.y} Z`, rol: "trazo" },
    { tipo: "linea", de: A, a: F, rol: "trazo", grosor: 1.5 },
    { tipo: "linea", de: A, a: C, rol: "trazo", grosor: 1.5 },
    { tipo: "punto", en: O, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: O.x + 4, y: O.y + 15 }, texto: "O", rol: "trazo", tam: 13, negrita: true },
    { tipo: "punto", en: A, rol: "trazo", r: 3 },
    { tipo: "texto", en: { x: A.x - 14, y: A.y + 2 }, texto: "A", rol: "trazo", tam: 13, negrita: true },
    { tipo: "punto", en: E, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: E.x - 13, y: E.y - 13 }, texto: "E", rol: "trazo", tam: 12 },
    { tipo: "punto", en: F, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: F.x + 13, y: F.y + 3 }, texto: "F", rol: "trazo", tam: 12 },
    { tipo: "punto", en: B, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: B.x + 4, y: B.y + 15 }, texto: "B", rol: "trazo", tam: 12 },
    { tipo: "punto", en: C, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: C.x + 6, y: C.y - 12 }, texto: "C", rol: "trazo", tam: 12 },
    // los tres datos, sobre sus tramos
    { tipo: "texto", en: { x: (A.x + E.x) / 2, y: A.y - 13 }, texto: "10", rol: "dato", color: AMBAR, tam: 11 },
    { tipo: "texto", en: { x: (A.x + B.x) / 2 - 12, y: (A.y + B.y) / 2 + 16 }, texto: "12", rol: "dato", color: AMBAR, tam: 11 },
    { tipo: "texto", en: { x: (B.x + C.x) / 2 - 2, y: (B.y + C.y) / 2 + 18 }, texto: "25", rol: "dato", color: AMBAR, tam: 11 },
    // el radio buscado
    { tipo: "linea", de: O, a: E, rol: "incognita", grosor: 2 },
    { tipo: "texto", en: { x: (O.x + E.x) / 2, y: O.y - 12 }, texto: "r = ?", rol: "incognita", tam: 12 },
  ];

  return { ancho: 400, alto: 265, pasos: 0, elementos: el };
}

// ── F7 (1-2024 final) · dos secantes y el ángulo inscrito ∠BDE ──
// Orden circular B-D-E-C con arcos d, a, b, c. De ∠BAC=(c−a)/2=80 y c=5a
// sale a=40, b=2a=80, c=200 y d=360−a−b−c=40. La figura se dibuja con ESOS
// arcos, así que el ∠BDE que se ve es el real: (b+c)/2 = 140°.
function f7secantesArcos(): Figura {
  const O: Pt = { x: 252, y: 140 };
  const R = 86;
  const ARCO = { d: 40, a: 40, b: 80, c: 200 };
  verificarAngulo("los arcos suman 360", 360, ARCO.a + ARCO.b + ARCO.c + ARCO.d);

  // Se recorre la circunferencia acumulando los arcos: B → D → E → C → B.
  const pt = (grados: number): Pt => ({
    x: O.x + R * Math.cos(grados * Math.PI / 180),
    y: O.y - R * Math.sin(grados * Math.PI / 180),
  });
  const gB = 160, gD = gB - ARCO.d, gE = gD - ARCO.a, gC = gE - ARCO.b;
  const B = pt(gB), D = pt(gD), E = pt(gE), C = pt(gC);

  // A es donde se cruzan las rectas DB y EC, prolongadas fuera del círculo.
  const cruce = (p1: Pt, p2: Pt, p3: Pt, p4: Pt): Pt => {
    const a1 = p2.y - p1.y, b1 = p1.x - p2.x, c1 = a1 * p1.x + b1 * p1.y;
    const a2 = p4.y - p3.y, b2 = p3.x - p4.x, c2 = a2 * p3.x + b2 * p3.y;
    const det = a1 * b2 - a2 * b1;
    return { x: (b2 * c1 - b1 * c2) / det, y: (a1 * c2 - a2 * c1) / det };
  };
  const A = cruce(D, B, E, C);

  // Las dos medidas que el problema usa tienen que salir del dibujo.
  verificarAngulo("∠BAC = 80°", 80, anguloEn(A, B, C));
  verificarAngulo("∠BDE = 140°", 140, anguloEn(D, B, E));

  const el: Elemento[] = [
    { tipo: "path", d: `M ${O.x - R} ${O.y} A ${R} ${R} 0 1 1 ${O.x + R} ${O.y} A ${R} ${R} 0 1 1 ${O.x - R} ${O.y} Z`, rol: "trazo" },
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 1.5 },
    { tipo: "linea", de: A, a: C, rol: "trazo", grosor: 1.5 },
    { tipo: "linea", de: D, a: E, rol: "trazo", grosor: 1.5 },
    { tipo: "punto", en: A, rol: "trazo", r: 3 },
    { tipo: "texto", en: { x: A.x - 14, y: A.y }, texto: "A", rol: "trazo", tam: 13, negrita: true },
    ...[["B", B, -1, -1], ["D", D, -1.5, 0.4], ["E", E, 1, 1], ["C", C, 1, -1]].map(([n, p, dx, dy]) => ([
      { tipo: "punto" as const, en: p as Pt, rol: "trazo" as const, r: 2.6 },
      { tipo: "texto" as const, en: { x: (p as Pt).x + (dx as number) * 14, y: (p as Pt).y + (dy as number) * 12 }, texto: n as string, rol: "trazo" as const, tam: 12, negrita: true },
    ])).flat(),
    // el ángulo dato en A y la incógnita en D
    { tipo: "arco", d: arcoAngulo(A, anguloHacia(A, B), anguloHacia(A, C), 19, 29).d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAngulo(A, anguloHacia(A, B), anguloHacia(A, C), 19, 29).etiquetaEn, texto: "80°", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "arco", d: arcoAngulo(D, anguloHacia(D, B), anguloHacia(D, E), 24, 38).d, rol: "incognita" },
    { tipo: "texto", en: arcoAngulo(D, anguloHacia(D, B), anguloHacia(D, E), 24, 33).etiquetaEn, texto: "x", rol: "incognita", tam: 13, negrita: true },
  ];

  return { ancho: 430, alto: 280, pasos: 0, elementos: el };
}

// ── F19 (2-2014 parcial 2da) · dos péndulos y choque elástico ──
// m1=2 kg se suelta desde 90° con L=2 m: llega abajo con v=√(2gL)=2√10.
// Choque elástico contra m2=4 kg en reposo: v2'=2m1/(m1+m2)·v1=(4√10)/3,
// y sube h=v2'²/(2g)=8/9 m.
function f19pendulosChoque(): Figura {
  const TECHO = 22;                     // el techo
  const PIV = 52;                       // los pivotes cuelgan del techo, para que
  const L = 104;                        // el hilo horizontal de m1 no pise el techo
  const P2: Pt = { x: 244, y: PIV };
  const P1: Pt = { x: P2.x - 24, y: PIV };
  const M2 = avanzar(P2, -90, L);
  const M1ini = avanzar(P1, 180, L);
  const M1baj = avanzar(P1, -90, L);
  const H = 42;                         // altura a la que sube m2 (la incógnita)
  const M2alto: Pt = { x: M2.x + 84, y: M2.y - H };

  verificarAngulo("m1 arranca a 90° de la vertical", 90, anguloEn(P1, M1ini, M1baj));
  verificarDistancia("los dos hilos miden lo mismo", distancia(P2, M2), distancia(P1, M1ini), 0.5);

  const el: Elemento[] = [
    // techo y los dos pivotes colgando de él
    { tipo: "linea", de: { x: 176, y: TECHO }, a: { x: 316, y: TECHO }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: P1.x, y: TECHO }, a: P1, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: P2.x, y: TECHO }, a: P2, rol: "trazo", grosor: 1.6 },
    { tipo: "punto", en: P1, rol: "trazo", r: 2.4 },
    { tipo: "punto", en: P2, rol: "trazo", r: 2.4 },
    // m1 arrancando en horizontal, y el arco que va a recorrer
    { tipo: "linea", de: P1, a: M1ini, rol: "trazo", grosor: 1.4 },
    { tipo: "punto", en: M1ini, rol: "dato", color: ROJO, r: 11 },
    { tipo: "texto", en: { x: M1ini.x, y: M1ini.y - 22 }, texto: "m₁ = 2 kg", rol: "dato", color: ROJO, tam: 11 },
    { tipo: "path", d: arcoAngulo(P1, 180, -90, L).d, rol: "aux" },
    { tipo: "arco", d: arcoAngulo(P1, 180, -90, 26, 42).d, rol: "incognita" },
    { tipo: "texto", en: arcoAngulo(P1, 180, -90, 26, 56).etiquetaEn, texto: "90°", rol: "incognita", tam: 11 },
    // m2 en reposo
    { tipo: "linea", de: P2, a: M2, rol: "trazo", grosor: 1.4 },
    { tipo: "punto", en: M2, rol: "trazo", r: 13 },
    { tipo: "texto", en: { x: M2.x - 4, y: M2.y + 28 }, texto: "m₂ = 4 kg", rol: "trazo", tam: 11 },
    { tipo: "texto", en: { x: P2.x - 14, y: PIV + L / 2 }, texto: "L = 2 m", rol: "dato", color: AMBAR, tam: 11, ancla: "end" },
    // a dónde llega m2 después del choque: la incógnita
    { tipo: "linea", de: P2, a: M2alto, rol: "aux", punteada: true },
    { tipo: "punto", en: M2alto, rol: "incognita", r: 11 },
    { tipo: "linea", de: { x: M2.x, y: M2.y }, a: { x: M2alto.x + 34, y: M2.y }, rol: "aux", punteada: true },
    { tipo: "linea", de: { x: M2alto.x + 26, y: M2alto.y }, a: { x: M2alto.x + 34, y: M2alto.y }, rol: "aux", punteada: true },
    { tipo: "linea", de: { x: M2alto.x + 30, y: M2.y }, a: { x: M2alto.x + 30, y: M2alto.y }, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: M2alto.x + 38, y: M2.y - H / 2 }, texto: "h = ?", rol: "incognita", tam: 12, ancla: "start" },
  ];
  return { ancho: 400, alto: 230, pasos: 0, elementos: el };
}

// ── F10 (1-2016 2da) · tres bloques en línea arrastrados por F ──
// Superficie lisa: a = F/(m1+m2+m3) = 3/12 = 0,25. El cable "2" solo tiene
// que arrastrar a m3, así que T2 = m3·a = 6·0,25 = 3/2 N.
function f10tresBloquesCable(): Figura {
  const piso = 112, ALTO = 42;
  const Y = piso - ALTO;   // el bloque APOYA en el piso: su altura define dónde empieza
  const XS = [70, 170, 272];            // m3, m2, m1 (en ese orden)
  const ANCHOS = [52, 46, 38];
  const NOMBRES = ["m₃ = 6 kg", "m₂ = 4 kg", "m₁ = 2 kg"];

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 24, y: piso }, a: { x: 390, y: piso }, rol: "trazo", grosor: 2.2 },
    { tipo: "texto", en: { x: 200, y: piso + 20 }, texto: "superficie lisa", rol: "trazo", tam: 10 },
  ];
  XS.forEach((x, i) => {
    const w = ANCHOS[i];
    el.push({ tipo: "poligono", puntos: [
      { x, y: Y }, { x: x + w, y: Y }, { x: x + w, y: piso }, { x, y: piso }],
      rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" });
    el.push({ tipo: "texto", en: { x: x + w / 2, y: Y + ALTO / 2 }, texto: NOMBRES[i].split(" ")[0], rol: "trazo", tam: 12 });
    el.push({ tipo: "texto", en: { x: x + w / 2, y: Y - 14 }, texto: NOMBRES[i].slice(NOMBRES[i].indexOf("=") + 2), rol: "dato", color: AMBAR, tam: 10 });
  });
  // cable 2 (entre m3 y m2) y cable 1 (entre m2 y m1)
  const yCable = Y + ALTO / 2;
  el.push({ tipo: "linea", de: { x: XS[0] + ANCHOS[0], y: yCable }, a: { x: XS[1], y: yCable }, rol: "incognita", grosor: 2 });
  el.push({ tipo: "texto", en: { x: (XS[0] + ANCHOS[0] + XS[1]) / 2, y: yCable - 16 }, texto: "cable 2", rol: "incognita", tam: 11, negrita: true });
  el.push({ tipo: "linea", de: { x: XS[1] + ANCHOS[1], y: yCable }, a: { x: XS[2], y: yCable }, rol: "trazo", grosor: 1.6 });
  el.push({ tipo: "texto", en: { x: (XS[1] + ANCHOS[1] + XS[2]) / 2, y: yCable - 16 }, texto: "cable 1", rol: "trazo", tam: 10 });
  // la fuerza, sobre m1
  const desdeF: Pt = { x: XS[2] + ANCHOS[2], y: yCable };
  el.push({ tipo: "linea", de: desdeF, a: avanzar(desdeF, 0, 62), rol: "resultado", color: ROJO, grosor: 2.2 });
  el.push({ tipo: "path", d: cabezaFlecha(avanzar(desdeF, 0, 62), 0, 8), rol: "resultado", color: ROJO, relleno: true });
  el.push({ tipo: "texto", en: { x: desdeF.x + 34, y: yCable - 16 }, texto: "F = 3 N", rol: "resultado", color: ROJO, tam: 12, negrita: true });
  return { ancho: 400, alto: 148, pasos: 0, elementos: el };
}

// ── F18 (2-2024 parcial 2da) · plano inclinado en equilibrio ──
// T = W·senθ → 100 = 200·senθ → θ = 30°. Con altura 4: L = 4/tan30° = 4√3 ≈ 7 m.
function f18planoEquilibrio(): Figura {
  const ESC = 26;
  const ALTO_M = 4, L_M = 4 * Math.sqrt(3);
  const Y0 = 196;
  const P: Pt = { x: 62, y: Y0 };                                  // vértice del ángulo
  const Q: Pt = { x: P.x + L_M * ESC, y: Y0 };                     // esquina inferior derecha
  const A: Pt = { x: Q.x, y: Y0 - ALTO_M * ESC };                  // lo alto

  verificarAngulo("inclinación = 30°", 30, anguloEn(P, Q, A));
  verificarDistancia("altura = 4 m", ALTO_M * ESC, distancia(Q, A), 0.5);

  const sobreRampa = avanzar(A, anguloHacia(A, P), 78);
  const bloque = bloqueSobre(sobreRampa, anguloHacia(A, P), 34, 19);
  const tDesde = avanzar(sobreRampa, anguloHacia(P, A), 20);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [P, Q, A], rol: "trazo", relleno: true, rellenoColor: "#f1f0eb" },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "texto", en: { x: sobreRampa.x - 6, y: sobreRampa.y - 30 }, texto: "200 N", rol: "dato", color: ROJO, tam: 11 },
    // la cuerda, tirando rampa arriba
    { tipo: "linea", de: tDesde, a: avanzar(tDesde, anguloHacia(P, A), 58), rol: "resultado", color: VERDE, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(tDesde, anguloHacia(P, A), 58), anguloHacia(P, A), 8), rol: "resultado", color: VERDE, relleno: true },
    { tipo: "texto", en: { x: A.x - 52, y: A.y - 16 }, texto: "T = 100 N", rol: "resultado", color: VERDE, tam: 11 },
    // cotas
    { tipo: "linea", de: { x: Q.x + 26, y: A.y }, a: { x: Q.x + 26, y: Q.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x + 20, y: A.y }, a: { x: Q.x + 32, y: A.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x + 20, y: Q.y }, a: { x: Q.x + 32, y: Q.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: Q.x + 38, y: (A.y + Q.y) / 2 }, texto: "4 m", rol: "dato", color: AMBAR, tam: 11, ancla: "start" },
    { tipo: "linea", de: { x: P.x, y: Y0 + 28 }, a: { x: Q.x, y: Y0 + 28 }, rol: "incognita", grosor: 1.4 },
    { tipo: "linea", de: { x: P.x, y: Y0 + 22 }, a: { x: P.x, y: Y0 + 34 }, rol: "incognita", grosor: 1.4 },
    { tipo: "linea", de: { x: Q.x, y: Y0 + 22 }, a: { x: Q.x, y: Y0 + 34 }, rol: "incognita", grosor: 1.4 },
    { tipo: "texto", en: { x: (P.x + Q.x) / 2, y: Y0 + 46 }, texto: "L = ?", rol: "incognita", tam: 12 },
    { tipo: "cuadradoRecto", d: cuadradoRecto(Q, 180, -90, 11), rol: "trazo" },
  ];
  return { ancho: 400, alto: 256, pasos: 0, elementos: el };
}

// ── F9 (2-2017 2da) · A cae del muro y B se lanza desde el piso ──
// Es el problema del "cazador y el mono": para que choquen, B tiene que
// apuntar a la posición INICIAL de A. tanθ = 40/40 = 1 → θ = 45°.
function f9caidaYLanzamiento(): Figura {
  const ESC = 2.9;                      // px por metro
  const PISO = 212;
  const H = 40 * ESC, D = 40 * ESC;
  const baseMuro: Pt = { x: 90, y: PISO };
  const A: Pt = { x: baseMuro.x, y: PISO - H };     // arriba del muro
  const B: Pt = { x: baseMuro.x + D, y: PISO };     // en el piso, a 40 m

  // θ se mide contra la horizontal que apunta AL MURO, que queda a la izquierda de B.
  verificarAngulo("apuntar a A da 45°", 45, anguloEn(B, A, { x: B.x - 60, y: PISO }));
  verificarDistancia("muro de 40 m", H, distancia(baseMuro, A), 0.5);
  verificarDistancia("separación de 40 m", D, distancia(baseMuro, B), 0.5);

  const P: Pt = { x: A.x, y: A.y + H * 0.42 };      // el choque, sobre la vertical de A

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 40, y: PISO }, a: { x: 350, y: PISO }, rol: "trazo", grosor: 2.2 },
    // el muro
    { tipo: "poligono", puntos: [{ x: baseMuro.x - 20, y: PISO }, { x: baseMuro.x, y: PISO }, A, { x: baseMuro.x - 20, y: A.y }],
      rol: "trazo", relleno: true, rellenoColor: "#d7d7e0" },
    // A cae: se suelta del reposo
    { tipo: "punto", en: A, rol: "dato", color: ROJO, r: 7 },
    { tipo: "texto", en: { x: A.x + 14, y: A.y - 12 }, texto: "A", rol: "dato", color: ROJO, tam: 13, negrita: true },
    { tipo: "linea", de: avanzar(A, -90, 12), a: avanzar(A, -90, 42), rol: "dato", color: ROJO, grosor: 1.8, punteada: true },
    { tipo: "path", d: cabezaFlecha(avanzar(A, -90, 42), -90, 7), rol: "dato", color: ROJO, relleno: true },
    // B se lanza apuntando a A
    { tipo: "punto", en: B, rol: "resultado", color: VERDE, r: 7 },
    { tipo: "texto", en: { x: B.x + 12, y: B.y - 14 }, texto: "B", rol: "resultado", color: VERDE, tam: 13, negrita: true },
    { tipo: "linea", de: B, a: avanzar(B, anguloHacia(B, A), 62), rol: "resultado", color: VERDE, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(B, anguloHacia(B, A), 62), anguloHacia(B, A), 8), rol: "resultado", color: VERDE, relleno: true },
    { tipo: "texto", en: { x: B.x + 16, y: B.y - 58 }, texto: "V₀ = 40 m/s", rol: "resultado", color: VERDE, tam: 11, ancla: "start" },
    { tipo: "arco", d: arcoAngulo(B, 180, anguloHacia(B, A), 34, 50).d, rol: "incognita" },
    { tipo: "texto", en: { x: B.x - 46, y: B.y - 16 }, texto: "θ", rol: "incognita", tam: 13, negrita: true },
    // la línea de mira, que es la clave del problema
    { tipo: "linea", de: B, a: A, rol: "aux", punteada: true },
    // el punto de encuentro
    { tipo: "punto", en: P, rol: "incognita", r: 5 },
    { tipo: "texto", en: { x: P.x + 14, y: P.y }, texto: "P", rol: "incognita", tam: 12, negrita: true },
    // cotas
    { tipo: "linea", de: { x: baseMuro.x - 36, y: A.y }, a: { x: baseMuro.x - 36, y: PISO }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: baseMuro.x - 42, y: A.y }, a: { x: baseMuro.x - 30, y: A.y }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: baseMuro.x - 42, y: PISO }, a: { x: baseMuro.x - 30, y: PISO }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: baseMuro.x - 46, y: (A.y + PISO) / 2 }, texto: "40 m", rol: "dato", color: AMBAR, tam: 11, ancla: "end" },
    { tipo: "linea", de: { x: baseMuro.x, y: PISO + 26 }, a: { x: B.x, y: PISO + 26 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: baseMuro.x, y: PISO + 20 }, a: { x: baseMuro.x, y: PISO + 32 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "linea", de: { x: B.x, y: PISO + 20 }, a: { x: B.x, y: PISO + 32 }, rol: "dato", color: AMBAR, grosor: 1.4 },
    { tipo: "texto", en: { x: (baseMuro.x + B.x) / 2, y: PISO + 44 }, texto: "40 m", rol: "dato", color: AMBAR, tam: 11 },
  ];
  return { ancho: 380, alto: 272, pasos: 0, elementos: el };
}

// ── F11 (3-2017 1ra) · pared de la muerte (cilindro vertical) ──
// La respuesta (20 m/s) confirma cuál de los dos montajes es: sale de
// μN = mg con N = mv²/r, o sea v = √(gr/μ) = √(10·20/0,5) = 20. Un rizo
// vertical daría √(gr) ≈ 14,1 y ni siquiera usaría μ.
function f11paredMuerte(): Figura {
  const CX = 200, CY = 92, RX = 118, RY = 34;    // el cilindro, en perspectiva
  const ALTO = 96;
  const moto: Pt = { x: CX + RX, y: CY + 30 };   // la moto, contra la pared interior

  const el: Elemento[] = [
    // boca del cilindro (elipse) y sus paredes
    { tipo: "path", d: `M ${CX - RX} ${CY} A ${RX} ${RY} 0 1 0 ${CX + RX} ${CY} A ${RX} ${RY} 0 1 0 ${CX - RX} ${CY}`, rol: "trazo" },
    { tipo: "linea", de: { x: CX - RX, y: CY }, a: { x: CX - RX, y: CY + ALTO }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: CX + RX, y: CY }, a: { x: CX + RX, y: CY + ALTO }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: `M ${CX - RX} ${CY + ALTO} A ${RX} ${RY} 0 0 0 ${CX + RX} ${CY + ALTO}`, rol: "trazo" },
    // el radio, sobre la boca
    { tipo: "linea", de: { x: CX, y: CY }, a: { x: CX + RX, y: CY }, rol: "dato", color: AMBAR, grosor: 1.6 },
    { tipo: "punto", en: { x: CX, y: CY }, rol: "dato", color: AMBAR, r: 2.6 },
    { tipo: "texto", en: { x: CX + RX / 2, y: CY - 12 }, texto: "r = 20 m", rol: "dato", color: AMBAR, tam: 11 },
    // la moto, pegada a la pared
    { tipo: "poligono", puntos: [
        { x: moto.x - 20, y: moto.y - 9 }, { x: moto.x - 2, y: moto.y - 9 },
        { x: moto.x - 2, y: moto.y + 9 }, { x: moto.x - 20, y: moto.y + 9 }],
      rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    // las tres fuerzas que sostienen el problema
    { tipo: "linea", de: moto, a: avanzar(moto, 180, 56), rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(moto, 180, 56), 180, 7), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: moto.x - 60, y: moto.y - 12 }, texto: "N", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "end" },
    { tipo: "linea", de: moto, a: avanzar(moto, 90, 44), rol: "aux", grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(moto, 90, 44), 90, 7), rol: "aux", relleno: true },
    { tipo: "texto", en: { x: moto.x + 16, y: moto.y - 46 }, texto: "f = μN", rol: "aux", tam: 11, ancla: "start" },
    { tipo: "linea", de: moto, a: avanzar(moto, -90, 44), rol: "incognita", grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(moto, -90, 44), -90, 7), rol: "incognita", relleno: true },
    { tipo: "texto", en: { x: moto.x + 16, y: moto.y + 46 }, texto: "mg", rol: "incognita", tam: 11, ancla: "start" },
    { tipo: "texto", en: { x: CX, y: CY + ALTO + 52 }, texto: "μ = 0,5 entre la moto y la pared", rol: "dato", color: AMBAR, tam: 11 },
  ];
  return { ancho: 400, alto: 262, pasos: 0, elementos: el };
}

// ── F20 (1-2024 final) · dos fuentes de 8V a un nodo, y 5Ω + 32V a tierra ──
// Nodo a V: (8−V)/2 + (8−V)/2 = (V−32)/5 → V = 12, I = 4 A por el 5Ω.
// P = I²R = 16·5 = 80 W.
function f20dosFuentesNodo(): Figura {
  const TIERRA = 236, ARR = 54;
  const IZQ = 56, DER = 344, NODO_X = 200;
  const NODO: Pt = { x: NODO_X, y: ARR };

  const pila = (x: number, y: number, etiqueta: string): Elemento[] => ([
    { tipo: "linea", de: { x: x - 14, y }, a: { x: x + 14, y }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: x - 7, y: y + 10 }, a: { x: x + 7, y: y + 10 }, rol: "trazo", grosor: 1.4 },
    { tipo: "texto", en: { x: x + 24, y: y + 5 }, texto: etiqueta, rol: "dato", color: AMBAR, tam: 11, ancla: "start" },
  ]);

  const el: Elemento[] = [
    // riel de tierra
    { tipo: "linea", de: { x: IZQ, y: TIERRA }, a: { x: DER, y: TIERRA }, rol: "trazo", grosor: 2 },
    { tipo: "texto", en: { x: DER + 6, y: TIERRA + 4 }, texto: "tierra", rol: "trazo", tam: 10, ancla: "start" },
    // riel de arriba, que une las dos ramas con el nodo
    { tipo: "linea", de: { x: IZQ, y: ARR }, a: { x: DER, y: ARR }, rol: "trazo", grosor: 1.8 },
    // rama izquierda: 8V en serie con 2Ω
    { tipo: "linea", de: { x: IZQ, y: ARR }, a: { x: IZQ, y: 108 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: IZQ, y: 108 }, { x: IZQ, y: 158 }), rol: "trazo" },
    { tipo: "texto", en: { x: IZQ - 8, y: 133 }, texto: "2 Ω", rol: "trazo", tam: 11, ancla: "end" },
    { tipo: "linea", de: { x: IZQ, y: 158 }, a: { x: IZQ, y: 186 }, rol: "trazo", grosor: 1.6 },
    ...pila(IZQ, 186, "8 V"),
    { tipo: "linea", de: { x: IZQ, y: 196 }, a: { x: IZQ, y: TIERRA }, rol: "trazo", grosor: 1.6 },
    // rama derecha: igual
    { tipo: "linea", de: { x: DER, y: ARR }, a: { x: DER, y: 108 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: resistorZigzag({ x: DER, y: 108 }, { x: DER, y: 158 }), rol: "trazo" },
    { tipo: "texto", en: { x: DER - 8, y: 133 }, texto: "2 Ω", rol: "trazo", tam: 11, ancla: "end" },
    { tipo: "linea", de: { x: DER, y: 158 }, a: { x: DER, y: 186 }, rol: "trazo", grosor: 1.6 },
    ...pila(DER, 186, "8 V"),
    { tipo: "linea", de: { x: DER, y: 196 }, a: { x: DER, y: TIERRA }, rol: "trazo", grosor: 1.6 },
    // rama del medio: 5Ω en serie con 32V, del nodo a tierra
    { tipo: "punto", en: NODO, rol: "resultado", color: ROJO, r: 3.6 },
    { tipo: "path", d: resistorZigzag({ x: NODO_X, y: ARR + 14 }, { x: NODO_X, y: 116 }), rol: "resultado", color: ROJO },
    { tipo: "texto", en: { x: NODO_X + 14, y: 86 }, texto: "5 Ω", rol: "resultado", color: ROJO, tam: 12, negrita: true, ancla: "start" },
    { tipo: "linea", de: { x: NODO_X, y: 116 }, a: { x: NODO_X, y: 186 }, rol: "trazo", grosor: 1.6 },
    ...pila(NODO_X, 186, "32 V"),
    { tipo: "linea", de: { x: NODO_X, y: 196 }, a: { x: NODO_X, y: TIERRA }, rol: "trazo", grosor: 1.6 },
    { tipo: "texto", en: { x: NODO_X, y: ARR - 16 }, texto: "nodo común", rol: "dato", color: AMBAR, tam: 10 },
  ];
  return { ancho: 400, alto: 270, pasos: 0, elementos: el };
}

// ── Las cuatro figuras del examen 1-2016, 1ra opción ──
// Leídas del facsímil `examenes pasados/FCYT/141_1ra-op-1-2016.pdf`, página 1
// (Figura 1, Figura 2 y la del G7) y página 2 (la del F10), renderizado a
// 300 dpi y recortado para medirlas. Las tres primeras estaban en la lista de
// `docs/figuras-pendientes.md`; la del G7 NO estaba y el PDF la tiene.

// Rayado de una superficie fija (piso o techo) entre x1 y x2, a la altura y.
// `haciaArriba` pone las plumas por encima de la línea, como el techo del F10.
function rayado(x1: number, x2: number, y: number, haciaArriba = false): Elemento[] {
  const el: Elemento[] = [];
  for (let x = x1 + 7; x <= x2; x += 15) {
    el.push({
      tipo: "linea",
      de: { x, y },
      a: { x: x - 8, y: haciaArriba ? y - 9 : y + 9 },
      rol: "trazo",
      grosor: 1,
    });
  }
  return el;
}

// El solcito del facsímil: disco chico con plumas alrededor.
function sol(centro: Pt, radio = 8): Elemento[] {
  const el: Elemento[] = [{ tipo: "punto", en: centro, r: radio, rol: "dato", color: AMBAR }];
  for (let a = 0; a < 360; a += 30) {
    el.push({
      tipo: "linea",
      de: avanzar(centro, a, radio + 3),
      a: avanzar(centro, a, radio + 9),
      rol: "dato", color: AMBAR, grosor: 1.2,
    });
  }
  return el;
}

// ── G5 (1-2016 1ra) · cuadrado con tres segmentos internos de 5 cm ──
// Figura 1 del PDF. Los dos segmentos que salen de los vértices izquierdos
// llegan al MISMO punto interior, así que ese punto está sobre la mediatriz de
// esos dos vértices: la línea media horizontal. El tercero sale de ahí
// horizontal hasta el lado derecho. Eso fija el lado en 8 (y el área en 64):
// con P = (s-5, s/2), (s-5)² + (s/2)² = 25 ⇒ s = 8, P = (3,4).
// El dibujo usa el lado real (8 cm) para que las proporciones no mientan.
function g5tresSegmentos5(): Figura {
  const ESC = 26;                 // px por cm
  const LADO = 8 * ESC;           // el lado real que sale del sistema
  const X0 = 106, Y0 = 30;

  // (cx, cy) en cm medidos desde el vértice inferior izquierdo
  const en = (cx: number, cy: number): Pt => ({ x: X0 + cx * ESC, y: Y0 + (8 - cy) * ESC });

  const TL = en(0, 8), TR = en(8, 8), BR = en(8, 0), BL = en(0, 0);
  const P = en(3, 4);             // el punto interior
  const R = en(8, 4);             // donde el segmento horizontal toca el lado derecho

  // Los tres segmentos tienen que medir 5 cm de verdad, no parecerlo.
  verificarDistancia("segmento desde el vértice superior izquierdo", 5 * ESC, distancia(TL, P));
  verificarDistancia("segmento desde el vértice inferior izquierdo", 5 * ESC, distancia(BL, P));
  verificarDistancia("segmento horizontal hasta el lado derecho", 5 * ESC, distancia(P, R));
  verificarDistancia("el punto interior está a media altura", 0, Math.abs(P.y - (TL.y + BL.y) / 2), 0.01);

  // Las etiquetas de los dos segmentos oblicuos van ROTADAS sobre el trazo.
  // Horizontales no se pueden: el texto corre hacia la derecha y el segmento
  // baja (o sube) más rápido, así que lo cruza siempre en algún punto.
  const etiquetaOblicua = (a: Pt, b: Pt, ladoPerp: number): Elemento => {
    const dir = anguloHacia(a, b);
    const medio: Pt = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    return {
      tipo: "texto", en: avanzar(medio, dir + ladoPerp, 12), texto: "5 cm",
      rol: "dato", tam: 11.5, negrita: true, rot: -dir,
    };
  };

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [TL, TR, BR, BL], rol: "trazo" },
    { tipo: "linea", de: TL, a: P, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: BL, a: P, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: P, a: R, rol: "trazo", grosor: 1.8 },
    etiquetaOblicua(TL, P, -90),
    etiquetaOblicua(BL, P, 90),
    { tipo: "texto", en: { x: (P.x + R.x) / 2, y: P.y - 13 }, texto: "5 cm", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: { x: (TL.x + TR.x) / 2, y: BR.y + 22 }, texto: "Figura 1", rol: "trazo", tam: 12 },
  ];

  return { ancho: 420, alto: Y0 + LADO + 44, pasos: 0, elementos: el };
}

// ── Cuadrado grande + cuarto de círculo + cuadrado chico tangente ──
// La MISMA construcción aparece en dos exámenes de 2016 con el dato invertido:
// el 1-2016 1ra (G6) da el área del cuadrado chico y pide la sombreada, y el
// 1-2016 2da (G5) da el área del cuarto de círculo y pide el lado del chico.
// El dibujo es idéntico hasta la escala, porque a/L = 1 − 1/√2 SIEMPRE: el
// cuarto de círculo está centrado en el vértice inferior izquierdo con radio
// igual al lado (el arco pasa por el superior izquierdo y el inferior
// derecho), y el cuadrado chico toca el arco con su vértice más cercano al
// centro, así que (L−a)√2 = L. Por eso comparten builder y solo cambian los
// rótulos.
function cuadradoConCuartoCirculo(rotulos: (g: {
  L: number; A: number; X0: number; Y0: number;
  TL: Pt; TR: Pt; BR: Pt; O: Pt; cTL: Pt; cBL: Pt; cBR: Pt;
}) => Elemento[]): Figura {
  const L = 224;                       // lado grande en px
  const A = L * (1 - 1 / Math.SQRT2);  // lado del cuadrado chico
  const X0 = 98, Y0 = 28;
  const GRIS = "#9aa0ad";

  const TL: Pt = { x: X0, y: Y0 };
  const TR: Pt = { x: X0 + L, y: Y0 };
  const BR: Pt = { x: X0 + L, y: Y0 + L };
  const O: Pt = { x: X0, y: Y0 + L };           // centro del cuarto de círculo
  // cuadrado chico, pegado al vértice superior derecho
  const cTL: Pt = { x: TR.x - A, y: Y0 };
  const cBL: Pt = { x: TR.x - A, y: Y0 + A };   // su vértice más cercano a O: el tangente
  const cBR: Pt = { x: TR.x, y: Y0 + A };

  // Lo que sostiene todo el problema: ese vértice está EXACTAMENTE sobre el arco.
  verificarDistancia("vértice del cuadrado chico sobre el arco", L, distancia(O, cBL), 0.5);
  verificarDistancia("el arco pasa por el vértice superior izquierdo", L, distancia(O, TL), 0.5);
  verificarDistancia("el arco pasa por el vértice inferior derecho", L, distancia(O, BR), 0.5);

  // Cuarto de disco: del centro al vértice superior izquierdo, arco de 90° a 0°, y cierra.
  const sombreado = `M ${O.x} ${O.y} L ${TL.x} ${TL.y}` + sigueArco(O, L, 90, 0) + " Z";

  const el: Elemento[] = [
    { tipo: "path", d: sombreado, rol: "trazo", relleno: true, color: GRIS },
    { tipo: "poligono", puntos: [TL, TR, BR, O], rol: "trazo" },
    { tipo: "path", d: arcoDe(O, L, 90, 0), rol: "trazo" },
    { tipo: "poligono", puntos: [cTL, TR, cBR, cBL], rol: "trazo" },
    { tipo: "punto", en: cBL, rol: "incognita", r: 3.2 },
    // El rótulo "tangente" va al margen, con guía: entre el arco y el lado
    // derecho del cuadrado grande la franja blanca es de 20-40 px y el texto
    // no entra sin meterse en el sombreado.
    { tipo: "linea", de: cBL, a: { x: 326, y: 132 }, rol: "incognita", grosor: 1 },
    { tipo: "texto", en: { x: 331, y: 132 }, texto: "tangente", rol: "incognita", tam: 10.5, negrita: true, ancla: "start" },
    ...rotulos({ L, A, X0, Y0, TL, TR, BR, O, cTL, cBL, cBR }),
  ];

  return { ancho: 420, alto: Y0 + L + 46, pasos: 0, elementos: el };
}

// ── G6 (1-2016 1ra) · dato: el cuadrado chico tiene área 16 ──
function g6cuartoCirculoTangente(): Figura {
  return cuadradoConCuartoCirculo(({ A, cTL, Y0, X0, L, O }) => [
    { tipo: "texto", en: { x: cTL.x + A / 2, y: Y0 + A / 2 }, texto: "área 16", rol: "dato", tam: 10.5, negrita: true },
    { tipo: "texto", en: { x: X0 + L / 2, y: O.y + 24 }, texto: "Figura 2", rol: "trazo", tam: 12 },
  ]);
}

// ── G5 (1-2016 2da) · dato: el cuarto de círculo tiene área 4π; se pide el lado ──
// Con área 4π el radio es 4, así que el lado grande es 4 y el chico
// 4 − 2√2. El dato ya no cabe adentro del cuadrado chico (es el del sector),
// así que va de pie de figura, y el lado que se busca lleva su cota violeta.
function g5cuartoCirculoArea4Pi(): Figura {
  return cuadradoConCuartoCirculo(({ A, cBR, Y0, X0, L, O }) => [
    { tipo: "texto", en: { x: X0 + L * 0.34, y: O.y - L * 0.30 }, texto: "área 4π", rol: "dato", color: NAVY, tam: 13, negrita: true },
    ...cota({ x: cBR.x, y: Y0 }, { x: cBR.x, y: Y0 + A }, "?", -22),
  ]);
}

// ── G8 (1-2016 2da opción) · x en función de θ ──
// Cuadrilátero ABCD del facsímil: en A el ángulo θ entre la base AD y el lado
// AB = 5; ángulo recto en B (entre BA y la diagonal BD), en C y en D. Con eso
// BC ∥ AD y CD es vertical, así que x = CD es simplemente la altura de B:
// x = 5·sen(θ). El dibujo se construye con θ = 40°, que es el que tiene el
// facsímil (proporción ancho/alto ≈ 2, igual que el escaneo).
function g8cuadrilateroTheta5(): Figura {
  const TH = 40;                 // θ del dibujo
  const LADO = 5;
  const ESC = 46;                // px por unidad
  const A: Pt = { x: 48, y: 200 };

  const B = avanzar(A, TH, LADO * ESC);
  const D = hastaY(B, TH - 90, A.y);          // la diagonal BD, perpendicular a AB, hasta la base
  const C: Pt = { x: D.x, y: B.y };           // arriba de D, a la altura de B

  // El dibujo tiene que medir lo que dicen sus etiquetas.
  verificarDistancia("lado AB = 5", LADO * ESC, distancia(A, B));
  verificarAngulo("θ en A", TH, anguloEn(A, D, B));
  verificarAngulo("ángulo recto en B", 90, anguloEn(B, A, D));
  verificarAngulo("ángulo recto en C", 90, anguloEn(C, B, D));
  verificarAngulo("ángulo recto en D", 90, anguloEn(D, C, A));
  verificarDistancia("x = 5·sen(θ)", LADO * Math.sin(TH * Math.PI / 180) * ESC, distancia(C, D));

  const arcoTh = arcoAngulo(A, 0, TH, 34, 52);
  verificarAngulo("el arco marca θ", TH, arcoTh.medida);

  const medioAB: Pt = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C, D], rol: "trazo" },
    { tipo: "linea", de: B, a: D, rol: "trazo" },
    { tipo: "texto", en: avanzar(medioAB, TH + 90, 16), texto: "5", rol: "dato", tam: 13, negrita: true },
    { tipo: "cuadradoRecto", d: cuadradoRecto(B, anguloHacia(B, A), anguloHacia(B, D), 10), rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(C, anguloHacia(C, B), anguloHacia(C, D), 10), rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(D, anguloHacia(D, C), anguloHacia(D, A), 10), rol: "trazo" },
    { tipo: "arco", d: arcoTh.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoTh.etiquetaEn, texto: "θ", rol: "dato", tam: 14, negrita: true },
    { tipo: "texto", en: { x: D.x + 18, y: (C.y + D.y) / 2 }, texto: "x", rol: "incognita", tam: 15, cursiva: true, negrita: true, ancla: "start" },
  ];

  return { ancho: 420, alto: A.y + 40, pasos: 0, elementos: el };
}

// ── G5 (1-2016 3ra) · hexágono con tres sectores en vértices alternados ──
// Figura 1 del facsímil. Tres circunferencias de radio 5 = el lado, centradas
// en vértices ALTERNADOS. Como el radio iguala al lado, cada una pasa exacto
// por sus dos vecinos, y el sector que queda adentro del hexágono es el de su
// ángulo interior (120°): lo sombreado es el resto, 240° por vértice.
//
// Por eso el área es 3·(240/360)·π·5² = 50π y los arcos suman
// 3·(240/360)·2π·5 = 20π (opción C). Los tres sectores se TOCAN en los
// vértices intermedios y no se solapan: las dos circunferencias de dos
// vértices alternados se cortan justo en el vértice de en medio y en el centro
// del hexágono, los dos sobre el borde o adentro.
function g5hexagonoTresSectores(): Figura {
  const LADO = 5;
  const ESC = 16;
  const R = LADO * ESC;               // radio = lado
  const C: Pt = { x: 210, y: 170 };   // centro del hexágono
  const GRIS = "#9aa0ad";

  // Hexágono con dos lados horizontales (como el facsímil): vértices cada 60°
  // desde 0°. En un hexágono regular el circunradio ES el lado.
  const V = (i: number): Pt => avanzar(C, i * 60, R);
  const vertices = [0, 1, 2, 3, 4, 5].map(V);

  verificarDistancia("lado del hexágono", R, distancia(vertices[0], vertices[1]));
  verificarDistancia("el radio iguala al lado", R, distancia(C, vertices[0]));
  verificarAngulo("ángulo interior", 120, anguloEn(vertices[1], vertices[0], vertices[2]));

  // Sector de 240° (lo de AFUERA del hexágono) en el vértice i: sus dos radios
  // apuntan a los vecinos, o sea a i·60 ∓ 120, y el arco barre del primero al
  // segundo en sentido antihorario, que es el camino que NO pasa por el
  // interior (la dirección al centro es i·60 + 180).
  const sector = (i: number): string => {
    const v = V(i);
    const a1 = i * 60 - 120, a2 = i * 60 + 120;
    const ini = avanzar(v, a1, R);
    verificarDistancia("el arco arranca en un vértice vecino", 0, Math.min(...vertices.map((w) => distancia(ini, w))), 0.01);
    return `M ${v.x.toFixed(2)} ${v.y.toFixed(2)} L ${ini.x.toFixed(2)} ${ini.y.toFixed(2)}` + sigueArco(v, R, a1, a2) + " Z";
  };

  const el: Elemento[] = [
    // los tres sectores, en vértices alternados (1, 3 y 5)
    ...[1, 3, 5].map((i): Elemento => ({ tipo: "path", d: sector(i), rol: "trazo", relleno: true, color: GRIS })),
    // el hexágono encima, para que sus lados se vean
    { tipo: "poligono", puntos: vertices, rol: "trazo" },
    { tipo: "texto", en: { x: C.x, y: vertices[1].y + 15 }, texto: "5 cm", rol: "dato", tam: 11.5, negrita: true },
    // El pie va abajo del sector MAS BAJO, que llega hasta
    // C.y + R·sen(60°) + R, no hasta C.y + R.
    { tipo: "texto", en: { x: C.x, y: C.y + R * Math.sin(Math.PI / 3) + R + 22 }, texto: "Figura 1", rol: "trazo", tam: 12 },
  ];

  return { ancho: 420, alto: Math.round(C.y + R * Math.sin(Math.PI / 3) + R + 42), pasos: 0, elementos: el };
}

// ── G6 (1-2016 3ra) · cuadrado de lado 2 con triángulo equilátero encima ──
// Esta figura NO estaba en docs/figuras-pendientes.md: su enunciado decía
// "ver figura adjunta", que el regex del trinquete no matchea. El facsímil la
// trae, y sin ella no se sabe desde qué borde se mide la sombra.
//
// El rayo roza el vértice del triángulo (1, 2+√3) y cae a 30°, así que toca el
// piso en 1 + (2+√3)√3 = 4 + 2√3. La "SOMBRA" del facsímil se mide desde el
// borde DERECHO del cuadrado (x = 2), no desde el izquierdo: 2 + 2√3.
function g6cuadradoTrianguloSombra(): Figura {
  const L = 2;                                  // lado del cuadrado y del triángulo
  const ALTURA_T = (Math.sqrt(3) / 2) * L;      // √3
  const ELEV = 30;
  const ESC = 34;
  const X0 = 118, Y_PISO = 224;

  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_PISO - uy * ESC });

  const cBL = en(0, 0), cBR = en(L, 0), cTR = en(L, L), cTL = en(0, L);
  const apex = en(L / 2, L + ALTURA_T);
  const D = en(L / 2 + (L + ALTURA_T) / Math.tan((ELEV * Math.PI) / 180), 0);
  const SOL = avanzar(apex, 180 - ELEV, 4 * ESC);

  verificarDistancia("lado del cuadrado", L * ESC, distancia(cBL, cBR));
  verificarDistancia("lado del triángulo", L * ESC, distancia(cTL, apex));
  verificarDistancia("el triángulo es equilátero", L * ESC, distancia(cTR, apex));
  verificarAngulo("elevación del sol", ELEV, anguloEn(D, apex, { x: D.x - 80, y: Y_PISO }));
  verificarAngulo("el rayo roza el vértice", 180, anguloEn(apex, SOL, D));
  verificarDistancia("sombra = 2 + 2√3", (L + 2 * Math.sqrt(3)) * ESC, distancia(cBR, D));

  const arco30 = arcoAngulo(D, 180, anguloHacia(D, apex), 32, 48);
  verificarAngulo("el arco marca 30°", ELEV, arco30.medida);

  const BRAZO = Y_PISO + 17;

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 26, y: Y_PISO }, a: { x: 400, y: Y_PISO }, rol: "trazo", grosor: 2 },
    ...rayado(26, cBL.x - 4, Y_PISO),
    { tipo: "linea", de: SOL, a: D, rol: "dato", color: AMBAR, grosor: 1.6 },
    ...sol(SOL, 7),
    // el cuadrado (gris claro) y el triángulo (oscuro), como el facsímil
    { tipo: "poligono", puntos: [cTL, cTR, cBR, cBL], rol: "trazo", relleno: true, rellenoColor: "#d6d6de" },
    { tipo: "poligono", puntos: [cTL, cTR, apex], rol: "trazo", relleno: true, rellenoColor: "#2b2b35" },
    { tipo: "texto", en: { x: cBL.x - 14, y: (cBL.y + cTL.y) / 2 }, texto: "2", rol: "dato", tam: 13, negrita: true, ancla: "end" },
    { tipo: "arco", d: arco30.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco30.etiquetaEn, texto: "30°", rol: "dato", tam: 12, negrita: true },
    // la sombra, que es lo que se pregunta: desde el borde derecho del cuadrado
    { tipo: "linea", de: { x: cBR.x, y: BRAZO }, a: { x: D.x, y: BRAZO }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: cBR.x, y: BRAZO - 6 }, a: { x: cBR.x, y: BRAZO + 6 }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: D.x, y: BRAZO - 6 }, a: { x: D.x, y: BRAZO + 6 }, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: (cBR.x + D.x) / 2, y: BRAZO + 16 }, texto: "sombra", rol: "incognita", tam: 11.5, negrita: true },
  ];

  return { ancho: 420, alto: BRAZO + 30, pasos: 0, elementos: el };
}

// ── G8 (1-2016 3ra) · cuadrado con P punto medio del lado superior ──
// Tres trazos: del vértice inferior izquierdo salen la diagonal (al superior
// derecho) y el segmento a P; de P sale el segmento al vértice inferior
// derecho. El ángulo x está en el CRUCE de la diagonal con PD, abierto hacia
// arriba. Las pendientes son 1 y −2, así que tan(x) = |(1−(−2))/(1+1·(−2))| = 3
// y x = arctan(3) ≈ 71,57°: ninguna de las opciones (65, 70, 75, 85), o sea E.
// El vértice superior izquierdo no tiene ningún trazo, y eso también se ve.
function g8cuadradoPuntoMedioCevianas(): Figura {
  const S = 240;
  const X0 = 90, Y0 = 26;

  const C: Pt = { x: X0, y: Y0 + S };          // inferior izquierdo
  const D: Pt = { x: X0 + S, y: Y0 + S };      // inferior derecho
  const B: Pt = { x: X0 + S, y: Y0 };          // superior derecho
  const A: Pt = { x: X0, y: Y0 };              // superior izquierdo
  const P: Pt = { x: X0 + S / 2, y: Y0 };      // punto medio del lado superior

  // Cruce de la diagonal CB con el segmento PD: en el cuadrado unitario cae en
  // (2/3, 2/3) medido desde C.
  const Q: Pt = { x: X0 + (2 * S) / 3, y: Y0 + S / 3 };

  verificarDistancia("P es el punto medio", distancia(P, A), distancia(P, B), 0.01);
  verificarAngulo("Q está sobre la diagonal CB", 0, anguloEn(C, Q, B), 0.2);
  verificarAngulo("Q está sobre PD", 0, anguloEn(P, Q, D), 0.2);

  const arcoX = arcoAngulo(Q, anguloHacia(Q, B), anguloHacia(Q, P), 40, 60);
  verificarAngulo("x = arctan(3)", (Math.atan(3) * 180) / Math.PI, arcoX.medida);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, D, C], rol: "trazo" },
    { tipo: "linea", de: C, a: P, rol: "trazo" },
    { tipo: "linea", de: C, a: B, rol: "trazo" },
    { tipo: "linea", de: P, a: D, rol: "trazo" },
    { tipo: "texto", en: { x: P.x, y: P.y - 15 }, texto: "P", rol: "trazo", tam: 14, negrita: true },
    { tipo: "arco", d: arcoX.d, rol: "incognita" },
    { tipo: "texto", en: arcoX.etiquetaEn, texto: "x", rol: "incognita", tam: 15, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: Y0 + S + 34, pasos: 0, elementos: el };
}

// ── Triángulo rectángulo con la bisectriz de un ángulo agudo ──
// Otra construcción que aparece dos veces en 2016 con distinto dato: el
// 1-2016 2da (G5) la da con 17 y 8, el 1-2016 2da de agosto (G5) con 16 y 8.
// El ángulo recto está en el vértice inferior DERECHO, el cateto vertical
// queda partido por el pie de la bisectriz (el segmento chico es el de abajo,
// junto al ángulo recto), y la base es la x que se busca.
//
// Por el teorema de la bisectriz, sup/inf = hipotenusa/base, y con la
// hipotenusa por Pitágoras sale la base:
//   17 y 8 → x = 40/3     16 y 8 → x = 8√3
// El dibujo va A ESCALA con esa x, que es más angosto que el esquema del
// facsímil (ese no está a escala). Regla 7 de §4.5: manda la geometría.
function trianguloBisectriz(sup: number, inf: number, rotuloX: string): Figura {
  const cateto = sup + inf;
  // teorema de la bisectriz: sup/inf = √(x²+cateto²)/x  ⇒  x = cateto·inf/√(sup²−inf²)
  const x = (cateto * inf) / Math.sqrt(sup * sup - inf * inf);
  const ESC = 230 / cateto;                  // el cateto vertical ocupa 230 px

  const A: Pt = { x: 150, y: 256 };                        // vértice del ángulo 2φ
  const C: Pt = { x: A.x + x * ESC, y: A.y };              // ángulo recto
  const B: Pt = { x: C.x, y: A.y - cateto * ESC };         // vértice superior
  const D: Pt = { x: C.x, y: A.y - inf * ESC };            // pie de la bisectriz

  verificarAngulo("ángulo recto en C", 90, anguloEn(C, A, B));
  verificarDistancia("segmento de abajo", inf * ESC, distancia(C, D));
  verificarDistancia("segmento de arriba", sup * ESC, distancia(D, B));
  // Lo que define la figura: AD parte el ángulo de A en dos mitades iguales.
  verificarAngulo("AD es bisectriz", anguloEn(A, C, D), anguloEn(A, D, B), 0.05);

  const arcoBajo = arcoAngulo(A, 0, anguloHacia(A, D), 30, 46);
  const arcoAlto = arcoAngulo(A, anguloHacia(A, D), anguloHacia(A, B), 44, 60);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C], rol: "trazo" },
    { tipo: "linea", de: A, a: D, rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(C, anguloHacia(C, B), anguloHacia(C, A), 10), rol: "trazo" },
    { tipo: "texto", en: { x: C.x + 16, y: (D.y + B.y) / 2 }, texto: String(sup), rol: "dato", tam: 13, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: C.x + 16, y: (C.y + D.y) / 2 }, texto: String(inf), rol: "dato", tam: 13, negrita: true, ancla: "start" },
    { tipo: "arco", d: arcoBajo.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoBajo.etiquetaEn, texto: "φ", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arcoAlto.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlto.etiquetaEn, texto: "φ", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: { x: (A.x + C.x) / 2, y: A.y + 20 }, texto: rotuloX, rol: "incognita", tam: 15, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: A.y + 44, pasos: 0, elementos: el };
}

function g5bisectriz17y8(): Figura {
  return trianguloBisectriz(17, 8, "x");
}

function g5bisectriz16y8(): Figura {
  return trianguloBisectriz(16, 8, "x");
}

// ── G6 (1-2016 2da, las dos opciones) · la recta que parte el cuadrado en dos ──
// Figura 3 del facsímil, idéntica en las dos opciones de agosto. B está sobre
// la prolongación de la base, a 5 del cuadrado de lado 4. La recta que divide
// al cuadrado en dos áreas iguales tiene que pasar por su CENTRO, así que su
// pendiente es 2/7 y entra por el lado izquierdo a la altura x = 10/7.
// El trapecio de abajo mide (10/7 + 18/7)/2 · 4 = 8, la mitad de 16.
function g6rectaBisecaCuadrado(): Figura {
  const D = 5, L = 4;                 // distancia de B al cuadrado, y lado
  const ESC = 38;
  const X0 = 38, Y_BASE = 190;

  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const B = en(0, 0);
  const sBL = en(D, 0), sBR = en(D + L, 0), sTR = en(D + L, L), sTL = en(D, L);
  const centro = en(D + L / 2, L / 2);
  // la recta pasa por B y por el centro: alturas de entrada y salida
  const yEntra = (L / 2) * (D / (D + L / 2));           // 10/7
  const ySale = (L / 2) * ((D + L) / (D + L / 2));      // 18/7
  const E = en(D, yEntra);
  const F = en(D + L, ySale);

  verificarDistancia("lado del cuadrado", L * ESC, distancia(sBL, sTL));
  verificarDistancia("B está a 5 del cuadrado", D * ESC, distancia(B, sBL));
  verificarAngulo("la recta pasa por el centro del cuadrado", 0, anguloEn(B, centro, F), 0.2);
  // y parte el cuadrado en dos mitades: el trapecio de abajo tiene que dar 8
  verificarDistancia("mitad del área del cuadrado", (L * L) / 2, ((yEntra + ySale) / 2) * L, 0.01);

  const el: Elemento[] = [
    { tipo: "linea", de: B, a: { x: sBR.x, y: Y_BASE }, rol: "trazo", grosor: 1.6 },
    { tipo: "poligono", puntos: [sTL, sTR, sBR, sBL], rol: "trazo" },
    { tipo: "linea", de: B, a: F, rol: "trazo" },
    { tipo: "texto", en: { x: B.x - 12, y: B.y - 6 }, texto: "B", rol: "trazo", tam: 14, negrita: true, ancla: "end" },
    ...cota(B, sBL, "5", 20),
    ...cota(sBL, sBR, "4", 20),
    { tipo: "texto", en: { x: sBR.x + 16, y: (sBR.y + sTR.y) / 2 }, texto: "4", rol: "dato", tam: 13, negrita: true, ancla: "start" },
    // x: el tramo del lado izquierdo, de la base a la recta
    { tipo: "linea", de: sBL, a: E, rol: "incognita", grosor: 3 },
    { tipo: "texto", en: { x: E.x + 12, y: (sBL.y + E.y) / 2 }, texto: "x", rol: "incognita", tam: 15, cursiva: true, negrita: true, ancla: "start" },
  ];

  return { ancho: 420, alto: Y_BASE + 46, pasos: 0, elementos: el };
}

// ── F11 (1-2016 2da, las dos opciones) · A y B sobre la mesa, C colgando ──
// Es la figura que docs/figuras-pendientes.md había descartado a propósito:
// "no queda claro cómo están montadas las dos poleas". El facsímil lo aclara y
// no era lo que decía el texto: la mesa tiene un HUECO en el medio, con una
// pared que baja en cada borde interno y una polea montada arriba de cada
// pared. A está sobre el tramo izquierdo, B sobre el derecho, y cada uno tira
// de su propia cuerda: horizontal hasta el tope de su polea, un cuarto de
// vuelta, y vertical hacia abajo hasta C, que cuelga entre las dos.
//
// Son DOS cuerdas, no una: C está sostenido por las dos a la vez. De ahí
// m_C·g − 2T = m_C·a con T = m_A(a + μg), que da a = 4,5 m/s² (y 9 m en 2 s).
function f11dosBloquesMesaHueco(): Figura {
  const MESA = 92, PISO_PARED = 212;
  const R = 17;
  const PL: Pt = { x: 178, y: 68 };           // polea izquierda
  const PR: Pt = { x: 242, y: 68 };           // polea derecha
  const Y_CABLE = PL.y - R;                   // los tramos horizontales, por el tope
  const X_IZQ = PL.x + R, X_DER = PR.x - R;   // las dos ramas que bajan, por dentro
  const PARED_IZQ = 160, PARED_DER = 260;
  const C_ANCHO = 62, C_ALTO = 58, C_TOP = 136;
  const C_CX = (X_IZQ + X_DER) / 2;

  // Bloques A y B, apoyados en la mesa
  const B_ALTO = 52;
  const cajaA: Pt[] = [{ x: 62, y: MESA - B_ALTO }, { x: 134, y: MESA - B_ALTO }, { x: 134, y: MESA }, { x: 62, y: MESA }];
  const cajaB: Pt[] = [{ x: 286, y: MESA - B_ALTO }, { x: 358, y: MESA - B_ALTO }, { x: 358, y: MESA }, { x: 286, y: MESA }];
  const cajaC: Pt[] = [
    { x: C_CX - C_ANCHO / 2, y: C_TOP }, { x: C_CX + C_ANCHO / 2, y: C_TOP },
    { x: C_CX + C_ANCHO / 2, y: C_TOP + C_ALTO }, { x: C_CX - C_ANCHO / 2, y: C_TOP + C_ALTO },
  ];

  // La cuerda tiene que estar donde dice: tangente a las poleas, los tramos de
  // los bloques horizontales y las dos ramas de C verticales.
  verificarAngulo("tramo de A horizontal", 0, anguloHacia({ x: 134, y: Y_CABLE }, { x: PL.x, y: Y_CABLE }));
  verificarAngulo("tramo de B horizontal", 180, Math.abs(anguloHacia({ x: 286, y: Y_CABLE }, { x: PR.x, y: Y_CABLE })));
  verificarDistancia("el tramo horizontal entra por el tope de la polea", R, distancia(PL, { x: PL.x, y: Y_CABLE }));
  verificarAngulo("rama izquierda vertical", -90, anguloHacia({ x: X_IZQ, y: PL.y }, { x: X_IZQ, y: C_TOP }));
  verificarAngulo("rama derecha vertical", -90, anguloHacia({ x: X_DER, y: PR.y }, { x: X_DER, y: C_TOP }));
  verificarDistancia("cuarto de vuelta en la polea izquierda", R, distancia(PL, { x: X_IZQ, y: PL.y }));
  verificarDistancia("cuarto de vuelta en la polea derecha", R, distancia(PR, { x: X_DER, y: PR.y }));
  verificarDistancia("las dos ramas llegan a C", 0, Math.abs((X_IZQ + X_DER) / 2 - C_CX), 0.01);

  const el: Elemento[] = [
    // mesa partida al medio, y las dos paredes del hueco
    { tipo: "linea", de: { x: 36, y: MESA }, a: { x: PARED_IZQ, y: MESA }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: PARED_DER, y: MESA }, a: { x: 384, y: MESA }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: PARED_IZQ, y: MESA }, a: { x: PARED_IZQ, y: PISO_PARED }, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: { x: PARED_DER, y: MESA }, a: { x: PARED_DER, y: PISO_PARED }, rol: "trazo", grosor: 2.4 },
    // soportes y poleas
    { tipo: "linea", de: { x: PARED_IZQ, y: MESA }, a: PL, rol: "trazo", grosor: 1.3 },
    { tipo: "linea", de: { x: PARED_DER, y: MESA }, a: PR, rol: "trazo", grosor: 1.3 },
    { tipo: "path", d: circuloPath(PL, R), rol: "trazo" },
    { tipo: "path", d: circuloPath(PR, R), rol: "trazo" },
    { tipo: "punto", en: PL, rol: "trazo", r: 2.2 },
    { tipo: "punto", en: PR, rol: "trazo", r: 2.2 },
    // cuerda de A: horizontal, cuarto de vuelta, y baja
    { tipo: "linea", de: { x: 134, y: Y_CABLE }, a: { x: PL.x, y: Y_CABLE }, rol: "trazo", grosor: 1.5 },
    { tipo: "path", d: arcoDe(PL, R, 90, 0), rol: "trazo" },
    { tipo: "linea", de: { x: X_IZQ, y: PL.y }, a: { x: X_IZQ, y: C_TOP }, rol: "trazo", grosor: 1.5 },
    // cuerda de B: igual, espejada
    { tipo: "linea", de: { x: 286, y: Y_CABLE }, a: { x: PR.x, y: Y_CABLE }, rol: "trazo", grosor: 1.5 },
    { tipo: "path", d: arcoDe(PR, R, 90, 180), rol: "trazo" },
    { tipo: "linea", de: { x: X_DER, y: PR.y }, a: { x: X_DER, y: C_TOP }, rol: "trazo", grosor: 1.5 },
    // los tres bloques
    { tipo: "poligono", puntos: cajaA, rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "poligono", puntos: cajaB, rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "poligono", puntos: cajaC, rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "texto", en: { x: 98, y: MESA - B_ALTO / 2 - 7 }, texto: "A", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: 98, y: MESA - B_ALTO / 2 + 10 }, texto: "10 kg", rol: "dato", tam: 10.5 },
    { tipo: "texto", en: { x: 322, y: MESA - B_ALTO / 2 - 7 }, texto: "B", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: 322, y: MESA - B_ALTO / 2 + 10 }, texto: "10 kg", rol: "dato", tam: 10.5 },
    { tipo: "texto", en: { x: C_CX, y: C_TOP + C_ALTO / 2 - 8 }, texto: "C", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: C_CX, y: C_TOP + C_ALTO / 2 + 10 }, texto: "20 kg", rol: "dato", tam: 10.5 },
    { tipo: "texto", en: { x: 78, y: MESA + 16 }, texto: "μ = 0,1", rol: "dato", tam: 11.5, negrita: true },
  ];

  return { ancho: 420, alto: PISO_PARED + 28, pasos: 0, elementos: el };
}


// ── G7 (1-2016 1ra) · triángulo equilátero al sol, con el sol a 30° ──
// Esta figura NO estaba en docs/figuras-pendientes.md, y el facsímil la trae:
// es la que está al lado del enunciado del G7 (rotulada "Figura 3" en la tira
// de figuras de más arriba de la hoja). El enunciado había quedado como "un
// triángulo equilátero de lado 6 se halla, sabiendo que…" porque la pasada
// mecánica del 14-sep le sacó el "como en la figura" sin que hubiera figura.
//
// OJO, esto es lo que el PDF corrige: el triángulo está DADO VUELTA. El lado
// horizontal de 6 está ARRIBA y el vértice de abajo es el único que toca el
// piso. La explicación que estaba escrita lo ponía apoyado sobre su base ("el
// vértice izquierdo de la base en (0,0)"), que no es lo que se ve. Da 12 igual
// — proyectando (x,y) ↦ x + y√3, los vértices del triángulo invertido caen en
// 0, 6 y 12, y los del apoyado también — pero la figura dibujada según el
// texto viejo no sería la del examen.
function g7equilateroSombra(): Figura {
  const ESC = 21;                             // px por unidad de lado
  const LADO = 6;
  const ALTURA = (Math.sqrt(3) / 2) * LADO;   // 3√3 ≈ 5,196
  const ELEV = 30;                            // el sol, sobre la horizontal
  const X0 = 130, Y_PISO = 232;

  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_PISO - uy * ESC });

  const V = en(0, 0);                                  // el vértice que toca el piso
  const T_IZQ = en(-LADO / 2, ALTURA);
  const T_DER = en(LADO / 2, ALTURA);
  // El rayo roza T_DER y llega al piso: avance horizontal = altura / tan(30°) = 9.
  const D = en(LADO / 2 + ALTURA / Math.tan((ELEV * Math.PI) / 180), 0);
  const SOL = avanzar(T_DER, 180 - ELEV, 9 * ESC);     // el rayo, estirado hacia atrás

  verificarDistancia("lado superior", LADO * ESC, distancia(T_IZQ, T_DER));
  verificarDistancia("lado izquierdo", LADO * ESC, distancia(V, T_IZQ));
  verificarDistancia("lado derecho", LADO * ESC, distancia(V, T_DER));
  verificarAngulo("elevación del sol en el piso", ELEV, anguloEn(D, T_DER, { x: D.x - 80, y: Y_PISO }));
  verificarAngulo("el rayo pasa por el vértice superior derecho", 180, anguloEn(T_DER, SOL, D));
  verificarDistancia("la sombra mide 12", 12 * ESC, distancia(V, D));

  const arco30 = arcoAngulo(D, 180, anguloHacia(D, T_DER), 34, 50);
  verificarAngulo("el arco marca 30°", ELEV, arco30.medida);

  const BRAZO = Y_PISO + 17;
  const medioIzq: Pt = { x: (V.x + T_IZQ.x) / 2, y: (V.y + T_IZQ.y) / 2 };

  const el: Elemento[] = [
    // piso, con el rayado solo afuera de la sombra (como el facsímil)
    { tipo: "linea", de: { x: 24, y: Y_PISO }, a: { x: 404, y: Y_PISO }, rol: "trazo", grosor: 2 },
    ...rayado(24, V.x - 4, Y_PISO),
    ...rayado(D.x + 4, 404, Y_PISO),
    // el rayo de sol y el sol
    { tipo: "linea", de: SOL, a: D, rol: "dato", color: AMBAR, grosor: 1.6 },
    ...sol(SOL),
    // el triángulo, dado vuelta: lado de 6 arriba, vértice en el piso
    { tipo: "poligono", puntos: [T_IZQ, T_DER, V], rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: (T_IZQ.x + T_DER.x) / 2, y: T_IZQ.y - 13 }, texto: "6", rol: "dato", tam: 12.5, negrita: true },
    { tipo: "texto", en: avanzar(medioIzq, anguloHacia(V, T_IZQ) + 90, 15), texto: "6", rol: "dato", tam: 12.5, negrita: true },
    // el ángulo de 30° donde el rayo toca el piso
    { tipo: "arco", d: arco30.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco30.etiquetaEn, texto: "30°", rol: "dato", tam: 12, negrita: true },
    // la sombra: lo que se pregunta
    { tipo: "linea", de: { x: V.x, y: BRAZO }, a: { x: D.x, y: BRAZO }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: V.x, y: BRAZO - 6 }, a: { x: V.x, y: BRAZO + 6 }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: D.x, y: BRAZO - 6 }, a: { x: D.x, y: BRAZO + 6 }, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: (V.x + D.x) / 2, y: BRAZO + 16 }, texto: "sombra", rol: "incognita", tam: 11.5, negrita: true },
  ];

  return { ancho: 420, alto: BRAZO + 30, pasos: 0, elementos: el };
}

// ── F10 (1-2016 1ra) · bloque colgado y bloque horizontal, dos poleas fijas ──
// La figura de la página 2 del facsímil. Es lo que decide el problema y no se
// puede adivinar del texto: NO es un sistema de masas con poleas móviles. Es
// UNA sola cuerda que sale del bloque 1 (que cuelga), pasa por una polea fija
// al techo, baja hasta una polea fija al piso, da un cuarto de vuelta y sigue
// horizontal hasta el bloque 2. Las dos poleas son fijas, así que la tensión es
// la misma en todo el recorrido y los dos bloques comparten el módulo de la
// aceleración: T = m₂a = 24 N y m₁ = T/(g−a) = 24/6 = 4 kg.
function f10colganteDosPoleas(): Figura {
  const TECHO = 38, PISO = 262;
  const EJE1: Pt = { x: 156, y: 78 }, R1 = 17;      // polea del techo
  const X_IZQ = EJE1.x - R1, X_DER = EJE1.x + R1;   // las dos ramas de la cuerda
  const R2 = 15;
  const EJE2: Pt = { x: X_DER + R2, y: 234 };       // polea del piso
  const BAJADA: Pt = { x: X_DER, y: EJE2.y };       // donde la rama vertical toca la polea del piso
  const SALIDA: Pt = { x: EJE2.x, y: EJE2.y - R2 }; // de donde sale el tramo horizontal
  const B1: Pt = { x: X_IZQ, y: 132 };              // borde superior del bloque 1
  const ENGANCHE: Pt = { x: 252, y: SALIDA.y };     // cara izquierda del bloque 2
  const B2_ALTO = 48, B2_ANCHO = 54;

  // La cuerda tiene que estar donde dice: tangente a las poleas, vertical la
  // rama que baja y horizontal el tramo que tira del bloque 2.
  verificarDistancia("rama izquierda tangente a la polea del techo", R1, Math.abs(EJE1.x - X_IZQ));
  verificarDistancia("rama derecha tangente a la polea del techo", R1, Math.abs(X_DER - EJE1.x));
  verificarAngulo("la rama que baja es vertical", -90, anguloHacia({ x: X_DER, y: EJE1.y }, BAJADA));
  verificarDistancia("cuarto de vuelta en la polea del piso", R2, distancia(EJE2, BAJADA));
  verificarDistancia("salida del cuarto de vuelta", R2, distancia(EJE2, SALIDA));
  verificarAngulo("el tramo al bloque 2 es horizontal", 0, anguloHacia(SALIDA, ENGANCHE));

  const caja = (x: number, y: number, ancho: number, alto: number): Pt[] => [
    { x, y }, { x: x + ancho, y }, { x: x + ancho, y: y + alto }, { x, y: y + alto },
  ];

  const el: Elemento[] = [
    // techo y piso
    { tipo: "linea", de: { x: 98, y: TECHO }, a: { x: 214, y: TECHO }, rol: "trazo", grosor: 2.2 },
    ...rayado(98, 214, TECHO, true),
    { tipo: "linea", de: { x: 120, y: PISO }, a: { x: 404, y: PISO }, rol: "trazo", grosor: 2 },
    ...rayado(120, 306, PISO),

    // polea del techo, colgada de su soporte
    { tipo: "linea", de: { x: EJE1.x, y: TECHO }, a: { x: EJE1.x, y: EJE1.y - R1 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: circuloPath(EJE1, R1), rol: "trazo" },
    { tipo: "punto", en: EJE1, rol: "trazo", r: 2.4 },

    // cuerda: rama izquierda al bloque 1, rama derecha a la polea del piso,
    // cuarto de vuelta, y tramo horizontal al bloque 2
    { tipo: "linea", de: { x: X_IZQ, y: EJE1.y }, a: B1, rol: "trazo", grosor: 1.5 },
    { tipo: "linea", de: { x: X_DER, y: EJE1.y }, a: BAJADA, rol: "trazo", grosor: 1.5 },
    { tipo: "path", d: arcoDe(EJE2, R2, 180, 90), rol: "trazo" },
    { tipo: "linea", de: SALIDA, a: ENGANCHE, rol: "trazo", grosor: 1.5 },

    // polea del piso y su soporte
    { tipo: "path", d: circuloPath(EJE2, R2), rol: "trazo" },
    { tipo: "punto", en: EJE2, rol: "trazo", r: 2.4 },
    { tipo: "poligono", puntos: [{ x: EJE2.x, y: EJE2.y + R2 }, { x: EJE2.x - 16, y: PISO }, { x: EJE2.x + 16, y: PISO }], rol: "trazo" },

    // bloque 1: el que cuelga, y el que se pregunta
    { tipo: "poligono", puntos: caja(B1.x - 22, B1.y, 44, 36), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: B1.x, y: B1.y + 19 }, texto: "1", rol: "trazo", tam: 13, negrita: true },
    { tipo: "texto", en: { x: B1.x - 30, y: B1.y + 19 }, texto: "m₁ = ?", rol: "incognita", tam: 12, negrita: true, ancla: "end" },

    // bloque 2: sobre el piso, sin fricción
    { tipo: "poligono", puntos: caja(ENGANCHE.x, PISO - B2_ALTO, B2_ANCHO, B2_ALTO), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: ENGANCHE.x + B2_ANCHO / 2, y: PISO - B2_ALTO + 15 }, texto: "2", rol: "trazo", tam: 13, negrita: true },
    { tipo: "texto", en: { x: ENGANCHE.x + B2_ANCHO / 2, y: PISO - 15 }, texto: "6 kg", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: { x: 355, y: PISO - 14 }, texto: "sin fricción", rol: "dato", tam: 10.5 },

    // la aceleración, que es el dato del enunciado: el bloque 1 baja y el 2 avanza
    { tipo: "linea", de: { x: B1.x, y: B1.y + 46 }, a: { x: B1.x, y: B1.y + 78 }, rol: "dato", color: AMBAR, grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha({ x: B1.x, y: B1.y + 78 }, -90, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: B1.x - 10, y: B1.y + 62 }, texto: "a", rol: "dato", tam: 12, cursiva: true, negrita: true, ancla: "end" },
    { tipo: "linea", de: { x: ENGANCHE.x + 6, y: PISO - B2_ALTO - 14 }, a: { x: ENGANCHE.x + 44, y: PISO - B2_ALTO - 14 }, rol: "dato", color: AMBAR, grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha({ x: ENGANCHE.x + 44, y: PISO - B2_ALTO - 14 }, 0, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: ENGANCHE.x + 25, y: PISO - B2_ALTO - 28 }, texto: "a = 4 m/s²", rol: "dato", tam: 11.5, negrita: true },
  ];

  return { ancho: 420, alto: PISO + 26, pasos: 0, elementos: el };
}

// ── F10 (1-2017 1ra) · dos cargas en el plano ──
// El facsímil dibuja los ejes con Q₁ = 2q en (0,1) y Q₂ = −q en (2,0). El
// potencial se anula donde 2/r₁ = 1/r₂, o sea r₁ = 2r₂; sobre el segmento,
// r₁ + r₂ = √5, así que r₁ = 2√5/3.
function f10dosCargasPlano(): Figura {
  const ESC = 90;
  const O: Pt = { x: 60, y: 220 };
  const en = (ux: number, uy: number): Pt => ({ x: O.x + ux * ESC, y: O.y - uy * ESC });

  const Q1 = en(0, 1);
  const Q2 = en(2, 0);

  verificarDistancia("Q₁ a un metro sobre el origen", ESC, distancia(O, Q1));
  verificarDistancia("Q₂ a dos metros del origen", 2 * ESC, distancia(O, Q2));
  verificarDistancia("separación entre cargas = √5", Math.sqrt(5) * ESC, distancia(Q1, Q2));

  const el: Elemento[] = [
    // ejes con sus puntas
    { tipo: "linea", de: { x: O.x, y: O.y }, a: { x: O.x + 3.4 * ESC, y: O.y }, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: O.x + 3.4 * ESC, y: O.y }, 0, 6), rol: "trazo", relleno: true },
    { tipo: "linea", de: { x: O.x, y: O.y }, a: { x: O.x, y: O.y - 2.2 * ESC }, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: O.x, y: O.y - 2.2 * ESC }, 90, 6), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: O.x + 3.4 * ESC, y: O.y + 30 }, texto: "X (m)", rol: "trazo", tam: 11, ancla: "end" },
    { tipo: "texto", en: { x: O.x + 6, y: O.y - 2.2 * ESC - 10 }, texto: "Y (m)", rol: "trazo", tam: 11, ancla: "start" },
  ];
  // marcas de los ejes
  for (const k of [1, 2, 3]) {
    el.push({ tipo: "linea", de: en(k, 0), a: { x: en(k, 0).x, y: O.y + 5 }, rol: "trazo", grosor: 1 });
    el.push({ tipo: "texto", en: { x: en(k, 0).x, y: O.y + 17 }, texto: String(k), rol: "trazo", tam: 11 });
  }
  for (const k of [1, 2]) {
    el.push({ tipo: "linea", de: en(0, k), a: { x: O.x - 5, y: en(0, k).y }, rol: "trazo", grosor: 1 });
    el.push({ tipo: "texto", en: { x: O.x - 11, y: en(0, k).y }, texto: String(k), rol: "trazo", tam: 11, ancla: "end" });
  }
  el.push(
    // el segmento que une las cargas, que es donde se busca el punto
    { tipo: "linea", de: Q1, a: Q2, rol: "aux", punteada: true },
    { tipo: "punto", en: Q1, rol: "trazo", r: 6 },
    { tipo: "punto", en: Q1, rol: "trazo", r: 2.5 },
    { tipo: "texto", en: { x: Q1.x + 12, y: Q1.y - 12 }, texto: "Q₁ = 2q", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    { tipo: "punto", en: Q2, rol: "trazo", r: 6 },
    { tipo: "punto", en: Q2, rol: "trazo", r: 2.5 },
    { tipo: "texto", en: { x: Q2.x + 10, y: Q2.y - 16 }, texto: "Q₂ = −q", rol: "dato", tam: 12, negrita: true, ancla: "start" },
  );

  return { ancho: 420, alto: O.y + 46, pasos: 0, elementos: el };
}

// ── G7 (2-2017 1ra) · cuatro círculos iguales tangentes, dentro de uno mayor ──
// Los cuatro chicos van en 2x2, así que sus centros forman un cuadrado de lado
// 2r y están a r√2 del centro del grande: R = r√2 + r = r(√2+1), y el cociente
// R/r es √2+1. La figura se construye desde R y saca r de ahí, para que la
// tangencia sea exacta y no "más o menos".
function g7cuatroCirculosEnCirculo(): Figura {
  const R = 130;
  const r = R / (1 + Math.SQRT2);
  const C: Pt = { x: 210, y: 154 };
  const NEGRO = "#3f4451";

  const centros: Pt[] = [
    { x: C.x - r, y: C.y - r }, { x: C.x + r, y: C.y - r },
    { x: C.x + r, y: C.y + r }, { x: C.x - r, y: C.y + r },
  ];

  // Las dos tangencias que definen la figura.
  verificarDistancia("dos chicos vecinos se tocan", 2 * r, distancia(centros[0], centros[1]));
  verificarDistancia("cada chico toca al grande por dentro", R - r, distancia(C, centros[0]));

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(C, R), rol: "trazo", relleno: true, color: NEGRO },
    ...centros.map((p): Elemento => ({ tipo: "path", d: circuloPath(p, r), rol: "trazo", relleno: true, color: "#ffffff" })),
    ...centros.map((p): Elemento => ({ tipo: "path", d: circuloPath(p, r), rol: "trazo" })),
    // Los dos radios que se comparan. R va horizontal desde el centro: esa
    // dirección cae toda en el negro (apenas roza los dos círculos de la
    // derecha), así que no cruza ningún blanco. r va horizontal adentro del
    // círculo de arriba a la izquierda.
    { tipo: "linea", de: C, a: avanzar(C, 0, R), rol: "dato", color: AMBAR, grosor: 2 },
    { tipo: "texto", en: avanzar(C, 0, R / 2), texto: "R", rol: "dato", tam: 14, cursiva: true, negrita: true },
    { tipo: "linea", de: centros[0], a: avanzar(centros[0], 180, r), rol: "incognita", grosor: 2 },
    { tipo: "texto", en: avanzar(avanzar(centros[0], 180, r / 2), -90, 14), texto: "r", rol: "incognita", tam: 14, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: C.y + R + 26, pasos: 0, elementos: el };
}

// ── Dos cuadrados de lado 1 con dos rectas desde el vértice inferior izquierdo ──
// La misma construcción en dos exámenes de 2017, y lo que cambia NO es el
// dibujo sino QUÉ mitad está sombreada — que es justo lo que el enunciado no
// dice y la figura sí:
//   1-2017 2da (G6): separación 4/13 en el borde derecho, sombra en el cuadrado
//     IZQUIERDO → área = g/4 = 1/13.
//   1-2017 3ra (G6): separación 3/11, sombra en el DERECHO → área = 3g/4 = 9/44.
// La separación es el DATO (la figura la marca con una cota); sin ella el
// problema no tiene con qué resolverse, porque la segunda recta podría ir a
// cualquier parte.
function dosCuadradosDosRectas(
  gap: number, rotuloGap: string, ladoSombreado: "izquierda" | "derecha",
): Figura {
  const ESC = 158;
  const X0 = 30, Y_BASE = 202;
  const GRIS = "#9aa0ad";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const BL = en(0, 0), BR = en(2, 0), TR = en(2, 1), TL = en(0, 1);
  const medioAbajo = en(1, 0), medioArriba = en(1, 1);
  const finL1 = TR;                       // la recta de arriba va a la esquina
  const finL2 = en(2, 1 - gap);           // la de abajo, gap más abajo
  const cruceL1 = en(1, 0.5);             // ambas en el borde entre los cuadrados
  const cruceL2 = en(1, (1 - gap) / 2);

  verificarDistancia("son dos cuadrados de lado 1", ESC, distancia(BL, medioAbajo));
  verificarDistancia("y el segundo mide igual", ESC, distancia(medioAbajo, BR));
  verificarDistancia("de alto, uno", ESC, distancia(BL, TL));
  verificarAngulo("la recta de arriba pasa por el cruce", 0, anguloEn(BL, cruceL1, finL1), 0.2);
  verificarAngulo("la de abajo también", 0, anguloEn(BL, cruceL2, finL2), 0.2);
  verificarDistancia("la cota marca la separación", gap * ESC, distancia(finL1, finL2));
  const sombra: Pt[] = ladoSombreado === "izquierda"
    ? [BL, cruceL1, cruceL2]
    : [cruceL1, finL1, finL2, cruceL2];

  // El área que se pregunta. Se mide sobre el polígono que se va a DIBUJAR
  // (shoelace, y de px a unidades dividiendo por ESC²) y se contrasta con la
  // fórmula: g/4 del lado izquierdo, 3g/4 del derecho. Si el polígono y la
  // cuenta no coinciden, explota acá y no en la cara del alumno.
  const areaPoligono = Math.abs(sombra.reduce(
    (acc, p, i) => {
      const q = sombra[(i + 1) % sombra.length];
      return acc + (p.x * q.y - q.x * p.y);
    }, 0)) / 2 / (ESC * ESC);
  const areaEsperada = ladoSombreado === "izquierda" ? gap / 4 : (3 * gap) / 4;
  verificarDistancia("área sombreada", areaEsperada, areaPoligono, 0.0001);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: sombra, rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "poligono", puntos: [TL, TR, BR, BL], rol: "trazo" },
    { tipo: "linea", de: medioArriba, a: medioAbajo, rol: "trazo" },
    { tipo: "linea", de: BL, a: finL1, rol: "trazo" },
    { tipo: "linea", de: BL, a: finL2, rol: "trazo" },
    // La cota va AFUERA, a la derecha del borde, como en el facsímil.
    ...cota({ x: finL1.x + 14, y: finL1.y }, { x: finL2.x + 14, y: finL2.y }, rotuloGap, 22),
    { tipo: "texto", en: { x: X0 + ESC, y: Y_BASE + 26 }, texto: "FIGURA 1", rol: "trazo", tam: 12 },
  ];

  return { ancho: 420, alto: Y_BASE + 46, pasos: 0, elementos: el };
}

function g6dosCuadradosIzquierda(): Figura {
  return dosCuadradosDosRectas(4 / 13, "4/13", "izquierda");
}

function g6dosCuadradosDerecha(): Figura {
  return dosCuadradosDosRectas(3 / 11, "3/11", "derecha");
}

// ── G7 (1-2017 2da) · el muro con almena, y el θ entre las dos visuales ──
// Figura 2 del facsímil. Desde el piso, a 6 de la base del muro, salen dos
// visuales: una a la base de la almena (altura 4) y otra a su cima (altura 5).
// θ es la diferencia, y sale de la resta de tangentes:
// tanθ = (5/6 − 4/6)/(1 + (5/6)(4/6)) = (1/6)/(14/9) = 3/28.
function g7muroAlmenaTheta(): Figura {
  const DIST = 6, ALTO_MURO = 4, ALTO_ALMENA = 1;
  const ESC = 46;
  const X0 = 52, Y_PISO = 268;
  const GRIS = "#c7c7d1";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_PISO - uy * ESC });

  const O = en(0, 0);
  const pieMuro = en(DIST, 0);
  const baseAlmena = en(DIST, ALTO_MURO);
  const cimaAlmena = en(DIST, ALTO_MURO + ALTO_ALMENA);
  const ANCHO_MURO = 56, ANCHO_ALMENA = 28;

  verificarDistancia("distancia al muro", DIST * ESC, distancia(O, pieMuro));
  verificarDistancia("alto del muro", ALTO_MURO * ESC, distancia(pieMuro, baseAlmena));
  verificarDistancia("alto de la almena", ALTO_ALMENA * ESC, distancia(baseAlmena, cimaAlmena));

  const dirBase = anguloHacia(O, baseAlmena);
  const dirCima = anguloHacia(O, cimaAlmena);
  const arcoAlfa = arcoAngulo(O, 0, dirBase, 52, 70);
  const arcoTheta = arcoAngulo(O, dirBase, dirCima, 92, 104);
  verificarAngulo("α = atan(4/6)", (Math.atan(ALTO_MURO / DIST) * 180) / Math.PI, arcoAlfa.medida);
  verificarAngulo(
    "θ = atan(5/6) − atan(4/6)",
    ((Math.atan((ALTO_MURO + ALTO_ALMENA) / DIST) - Math.atan(ALTO_MURO / DIST)) * 180) / Math.PI,
    arcoTheta.medida,
  );

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 26, y: Y_PISO }, a: { x: 400, y: Y_PISO }, rol: "trazo", grosor: 2 },
    ...rayado(26, pieMuro.x - 4, Y_PISO),
    // cuerpo del muro y la almena encima, a la izquierda (es donde pegan las visuales)
    { tipo: "poligono", puntos: [
        baseAlmena, { x: pieMuro.x + ANCHO_MURO, y: baseAlmena.y },
        { x: pieMuro.x + ANCHO_MURO, y: Y_PISO }, pieMuro], rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "poligono", puntos: [
        cimaAlmena, { x: cimaAlmena.x + ANCHO_ALMENA, y: cimaAlmena.y },
        { x: cimaAlmena.x + ANCHO_ALMENA, y: baseAlmena.y }, baseAlmena], rol: "trazo", relleno: true, rellenoColor: GRIS },
    // las dos visuales
    { tipo: "linea", de: O, a: baseAlmena, rol: "trazo", grosor: 1.4 },
    { tipo: "linea", de: O, a: cimaAlmena, rol: "trazo", grosor: 1.4 },
    { tipo: "arco", d: arcoAlfa.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAlfa.etiquetaEn, texto: "α", rol: "dato", tam: 13, negrita: true },
    { tipo: "arco", d: arcoTheta.d, rol: "incognita" },
    { tipo: "texto", en: arcoTheta.etiquetaEn, texto: "θ", rol: "incognita", tam: 14, negrita: true },
    // los tres datos
    ...cota(O, pieMuro, "6", 22),
    ...cota({ x: pieMuro.x + ANCHO_MURO, y: Y_PISO }, { x: pieMuro.x + ANCHO_MURO, y: baseAlmena.y }, "4", -20),
    ...cota({ x: cimaAlmena.x + ANCHO_ALMENA, y: baseAlmena.y }, { x: cimaAlmena.x + ANCHO_ALMENA, y: cimaAlmena.y }, "1", -16),
  ];

  return { ancho: 420, alto: Y_PISO + 42, pasos: 0, elementos: el };
}

// ── G7 (1-2017 3ra) · la torre vista con 2θ y con θ ──
// Figura 2 del facsímil. Desde 5 m de la base el ángulo de elevación es 2θ y
// desde 20 m es θ. Con tan2θ = 2tanθ/(1−tan²θ): h/5 = 40h/(400−h²), o sea
// 400 − h² = 200 y h = 10√2. El dibujo usa esa altura real.
function g7torre2ThetaTheta(): Figura {
  const D_CERCA = 5, D_LEJOS = 20;
  const H = 10 * Math.SQRT2;
  const ESC = 16;
  const X0 = 64, Y_PISO = 250;
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_PISO - uy * ESC });

  const pie = en(0, 0);
  const cima = en(0, H);
  const cerca = en(D_CERCA, 0);
  const lejos = en(D_LEJOS, 0);

  const dosTheta = (Math.atan(H / D_CERCA) * 180) / Math.PI;
  const theta = (Math.atan(H / D_LEJOS) * 180) / Math.PI;
  // Lo que hace al problema: el de cerca ve EXACTAMENTE el doble.
  verificarAngulo("el ángulo de cerca es el doble del de lejos", dosTheta, 2 * theta, 0.01);
  verificarDistancia("altura de la torre", H * ESC, distancia(pie, cima));

  const arco2 = arcoAngulo(cerca, 180, anguloHacia(cerca, cima), 44, 62);
  const arco1 = arcoAngulo(lejos, 180, anguloHacia(lejos, cima), 52, 70);
  verificarAngulo("arco de 2θ", dosTheta, arco2.medida);
  verificarAngulo("arco de θ", theta, arco1.medida);

  const ANCHO = 26;
  const el: Elemento[] = [
    { tipo: "linea", de: { x: 26, y: Y_PISO }, a: { x: 404, y: Y_PISO }, rol: "trazo", grosor: 2 },
    ...rayado(lejos.x + 6, 404, Y_PISO),
    // la torre: un fuste angosto con dos cruces, para que se lea como torre
    { tipo: "poligono", puntos: [
        { x: pie.x - ANCHO / 2, y: Y_PISO }, { x: pie.x - ANCHO / 2 - 5, y: Y_PISO },
        { x: pie.x + ANCHO / 2 + 5, y: Y_PISO }, { x: pie.x + ANCHO / 2, y: Y_PISO }],
      rol: "trazo" },
    { tipo: "linea", de: { x: pie.x - ANCHO / 2, y: Y_PISO }, a: { x: cima.x - 3, y: cima.y }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: pie.x + ANCHO / 2, y: Y_PISO }, a: { x: cima.x + 3, y: cima.y }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: pie.x - ANCHO / 2, y: Y_PISO }, a: { x: cima.x + 3, y: cima.y }, rol: "trazo", grosor: 0.9 },
    { tipo: "linea", de: { x: pie.x + ANCHO / 2, y: Y_PISO }, a: { x: cima.x - 3, y: cima.y }, rol: "trazo", grosor: 0.9 },
    // las dos visuales
    { tipo: "linea", de: cerca, a: cima, rol: "trazo", grosor: 1.4 },
    { tipo: "linea", de: lejos, a: cima, rol: "trazo", grosor: 1.4 },
    { tipo: "arco", d: arco2.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco2.etiquetaEn, texto: "2θ", rol: "dato", tam: 12.5, negrita: true },
    { tipo: "arco", d: arco1.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco1.etiquetaEn, texto: "θ", rol: "dato", tam: 12.5, negrita: true },
    // la altura, que es lo que se busca, y las dos distancias
    { tipo: "linea", de: { x: pie.x - 28, y: Y_PISO }, a: { x: pie.x - 28, y: cima.y }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: pie.x - 34, y: Y_PISO }, a: { x: pie.x - 22, y: Y_PISO }, rol: "incognita", grosor: 1.6 },
    { tipo: "linea", de: { x: pie.x - 34, y: cima.y }, a: { x: pie.x - 22, y: cima.y }, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: pie.x - 36, y: (Y_PISO + cima.y) / 2 }, texto: "h", rol: "incognita", tam: 15, cursiva: true, negrita: true, ancla: "end" },
    ...cota(cerca, pie, "5 m", 20),
    ...cota(lejos, pie, "20 m", 42),
  ];

  return { ancho: 420, alto: Y_PISO + 62, pasos: 0, elementos: el };
}

// ── G5 (2-2017 2da) · el 5-12-13 con un cuadrado en el ángulo recto ──
// El cuadrado se apoya en los dos catetos y su vértice libre cae sobre la
// hipotenusa: s = (5/12)(12−s) ⇒ s = 60/17. El sombreado es el triángulo que
// queda a la IZQUIERDA del cuadrado, de base 12−s = 144/17 y altura s:
// área = ½·(144/17)·(60/17) = 4320/289. Las cuatro opciones son 4319, 4320,
// 4321 y 4322 sobre 289, así que acá no alcanza con "aproximadamente".
function g5triangulo51213Cuadrado(): Figura {
  const BASE = 12, ALTO = 5;
  const S = (ALTO * BASE) / (ALTO + BASE);   // 60/17
  const ESC = 26;
  const X0 = 54, Y_BASE = 170;
  const GRIS = "#9aa0ad";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const P = en(0, 0);                 // vértice izquierdo
  const Q = en(BASE, 0);              // ángulo recto
  const R = en(BASE, ALTO);           // vértice superior
  const cSupIzq = en(BASE - S, S);    // el vértice del cuadrado que toca la hipotenusa
  const cInfIzq = en(BASE - S, 0);
  const cSupDer = en(BASE, S);

  verificarDistancia("hipotenusa = 13", 13 * ESC, distancia(P, R));
  verificarAngulo("ángulo recto en Q", 90, anguloEn(Q, P, R));
  verificarDistancia("el cuadrado es cuadrado", S * ESC, distancia(cInfIzq, cSupIzq));
  verificarDistancia("y su otro lado también", S * ESC, distancia(cSupIzq, cSupDer));
  verificarAngulo("su vértice libre cae en la hipotenusa", 0, anguloEn(P, cSupIzq, R), 0.2);
  // El área que se pregunta, en unidades del enunciado
  verificarDistancia("área sombreada = 4320/289", 4320 / 289, ((BASE - S) * S) / 2, 0.0001);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [P, cInfIzq, cSupIzq], rol: "trazo", relleno: true, rellenoColor: GRIS },
    { tipo: "poligono", puntos: [P, Q, R], rol: "trazo" },
    { tipo: "poligono", puntos: [cSupIzq, cSupDer, Q, cInfIzq], rol: "trazo" },
    { tipo: "texto", en: { x: (P.x + Q.x) / 2, y: Y_BASE + 18 }, texto: "12", rol: "dato", tam: 13, negrita: true },
    { tipo: "texto", en: { x: Q.x + 14, y: (Q.y + R.y) / 2 }, texto: "5", rol: "dato", tam: 13, negrita: true, ancla: "start" },
    { tipo: "texto", en: avanzar({ x: (P.x + R.x) / 2, y: (P.y + R.y) / 2 }, anguloHacia(P, R) + 90, 17), texto: "13", rol: "dato", tam: 13, negrita: true },
  ];

  return { ancho: 420, alto: Y_BASE + 40, pasos: 0, elementos: el };
}

// Capacitor entre dos puntos: las dos placas IGUALES y paralelas, a diferencia
// de `pila`, que las dibuja de largos distintos para marcar el polo.
function capacitor(de: Pt, a: Pt, etiqueta: string, ladoEtiqueta = 1): Elemento[] {
  const dir = anguloHacia(de, a);
  const medio = { x: (de.x + a.x) / 2, y: (de.y + a.y) / 2 };
  const p1 = avanzar(medio, dir, -4);
  const p2 = avanzar(medio, dir, 4);
  const perp = dir + 90;
  const placa = (centro: Pt): Elemento => ({
    tipo: "linea",
    de: avanzar(centro, perp, 10),
    a: avanzar(centro, perp, -10),
    rol: "trazo",
    grosor: 2.2,
  });
  return [
    { tipo: "linea", de, a: p1, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: p2, a, rol: "trazo", grosor: 1.6 },
    placa(p1), placa(p2),
    { tipo: "texto", en: avanzar(medio, perp, 22 * ladoEtiqueta), texto: etiqueta,
      rol: "dato", tam: 11.5, negrita: true, ancla: "middle" },
  ];
}

// ── G6 (1er parcial 1-2024) · cuadrado con tres arcos, E punto medio de DC ──
// El transcriptor habia leido "cuartos de disco centrados en A y en B" y marco
// E. El facsimil (medido a 400 dpi) dice otra cosa: son TRES arcos y ninguno
// sale de A ni de B.
//   · cuarto de disco centrado en D, radio 4 = el lado, de A a C  → sombreado
//   · cuarto de disco centrado en E, radio 2 = ED, de D a O       → en blanco
//   · semicircunferencia de diametro EC, radio 1                  → en blanco
// O es el extremo del radio vertical de ese cuarto (2 arriba de E), y el
// segmento OE esta dibujado. Los dos blancos caen ENTEROS dentro del cuarto
// grande (el punto mas lejano de D es C, sobre el borde), asi que el area es
// una resta limpia: 4π − π − π/2 = 5π/2, que es la opcion d.
function g6cuadradoTresArcos(): Figura {
  const LADO = 4;
  const ESC = 56;
  const X0 = 100, Y0 = 30;
  const GRIS = "#c9ccd4";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y0 + (LADO - uy) * ESC });

  const A = en(0, LADO), B = en(LADO, LADO), C = en(LADO, 0), D = en(0, 0);
  const E = en(LADO / 2, 0);                 // punto medio de DC
  const O = en(LADO / 2, LADO / 2);          // 2 arriba de E
  const R_GRANDE = LADO * ESC;
  const R_MEDIO = (LADO / 2) * ESC;
  const R_CHICO = (LADO / 4) * ESC;
  const cenChico = en((3 * LADO) / 4, 0);    // centro del semicirculo sobre EC

  verificarDistancia("E es el punto medio de DC", distancia(D, E), distancia(E, C), 0.01);
  verificarDistancia("el arco grande pasa por A", R_GRANDE, distancia(D, A));
  verificarDistancia("y por C", R_GRANDE, distancia(D, C));
  verificarDistancia("el cuarto de E llega a D", R_MEDIO, distancia(E, D));
  verificarDistancia("y su radio vertical termina en O", R_MEDIO, distancia(E, O));
  verificarDistancia("el semicirculo se apoya en EC", R_CHICO, distancia(cenChico, E));
  // Las dos regiones blancas quedan adentro del cuarto grande: el punto mas
  // lejano de D en cada una esta a lo sumo a un radio.
  verificarDistancia("O cae dentro del cuarto grande", Math.SQRT2 * R_MEDIO, distancia(D, O), 0.5);

  // 4π − π − π/2 = 5π/2, en unidades del enunciado
  const areaSombreada = (Math.PI * LADO * LADO) / 4
    - (Math.PI * (LADO / 2) * (LADO / 2)) / 4
    - (Math.PI * (LADO / 4) * (LADO / 4)) / 2;
  verificarDistancia("area sombreada = 5π/2", (5 * Math.PI) / 2, areaSombreada, 0.0001);

  const cuartoGrande = `M ${D.x} ${D.y} L ${A.x} ${A.y}` + sigueArco(D, R_GRANDE, 90, 0) + " Z";
  const cuartoMedio = `M ${E.x} ${E.y} L ${D.x} ${D.y}` + sigueArco(E, R_MEDIO, 180, 90) + " Z";
  const semiChico = `M ${E.x} ${E.y}` + sigueArco(cenChico, R_CHICO, 180, 0) + " Z";

  const el: Elemento[] = [
    { tipo: "path", d: cuartoGrande, rol: "trazo", relleno: true, color: GRIS },
    // los dos huecos, en blanco encima del sombreado
    { tipo: "path", d: cuartoMedio, rol: "trazo", relleno: true, color: "#ffffff" },
    { tipo: "path", d: semiChico, rol: "trazo", relleno: true, color: "#ffffff" },
    // y ahora los trazos, para que se vean los tres arcos
    { tipo: "poligono", puntos: [A, B, C, D], rol: "trazo" },
    { tipo: "path", d: arcoDe(D, R_GRANDE, 90, 0), rol: "trazo" },
    { tipo: "path", d: arcoDe(E, R_MEDIO, 180, 90), rol: "trazo" },
    { tipo: "path", d: arcoDe(cenChico, R_CHICO, 180, 0), rol: "trazo" },
    { tipo: "linea", de: E, a: O, rol: "trazo" },
    rotulo({ x: A.x - 14, y: A.y - 10 }, "A"),
    rotulo({ x: B.x + 14, y: B.y - 10 }, "B"),
    rotulo({ x: C.x + 14, y: C.y + 14 }, "C"),
    rotulo({ x: D.x - 14, y: D.y + 14 }, "D"),
    rotulo({ x: E.x - 4, y: E.y + 15 }, "E"),
    rotulo({ x: O.x - 15, y: O.y + 4 }, "O"),
    // El "4" va abajo del lado: arriba se pisa con el radio OE.
    { tipo: "texto", en: { x: (D.x + C.x) / 2, y: D.y + 34 }, texto: "4", rol: "dato", tam: 12.5, negrita: true },
  ];

  return { ancho: 420, alto: Y0 + R_GRANDE + 54, pasos: 0, elementos: el };
}

// ── G8 (1er parcial 1-2024) · base media del trapecio y la diagonal EB ──
// C y D son los puntos medios de AE y BF, y AB ∥ EF, asi que CD es la base
// media. P es donde la diagonal EB la corta, y eso parte CD en dos pedazos con
// medidas fijas: CP = AB/2 y PD = EF/2 (no al reves — si la diagonal fuera AF
// los papeles se cambian y el problema da 50, que no es opcion).
// De PD = 11/2 = 2y+2 sale y = 7/4, y de CP = (x+1)/2 = y sale x = 5/2, o sea
// AE = 2x = 5 (opcion a).
// El dibujo usa esos valores: AE = 5 con A a (3,4) de E, y AB = 3,5.
function g8trapecioBaseMedia(): Figura {
  const EF = 11, AB = 3.5;
  const ESC = 30;
  const X0 = 42, Y_BASE = 160;
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const E = en(0, 0), F = en(EF, 0);
  const A = en(3, 4), B = en(3 + AB, 4);       // AE = 5 exacto (3-4-5)
  const C: Pt = { x: (A.x + E.x) / 2, y: (A.y + E.y) / 2 };
  const D: Pt = { x: (B.x + F.x) / 2, y: (B.y + F.y) / 2 };
  const P = en((3 + AB) / 2, 2);               // EB ∩ CD: la mitad de B, porque E es el origen

  verificarDistancia("AE = 5", 5 * ESC, distancia(A, E));
  verificarDistancia("C es punto medio de AE", distancia(A, C), distancia(C, E), 0.01);
  verificarDistancia("D es punto medio de BF", distancia(B, D), distancia(D, F), 0.01);
  verificarAngulo("AB ∥ EF", 0, Math.abs(anguloHacia(A, B) - anguloHacia(E, F)), 0.01);
  verificarAngulo("P esta sobre CD", 0, anguloEn(C, P, D), 0.2);
  verificarAngulo("P esta sobre la diagonal EB", 0, anguloEn(E, P, B), 0.2);
  verificarDistancia("CD es la base media", ((AB + EF) / 2) * ESC, distancia(C, D));
  verificarDistancia("CP = AB/2", (AB / 2) * ESC, distancia(C, P));
  verificarDistancia("PD = EF/2", (EF / 2) * ESC, distancia(P, D));

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, F, E], rol: "trazo" },
    { tipo: "linea", de: C, a: D, rol: "trazo" },
    { tipo: "linea", de: E, a: B, rol: "trazo" },
    { tipo: "punto", en: P, rol: "trazo", r: 2.6 },
    rotulo({ x: A.x - 6, y: A.y - 13 }, "A"),
    rotulo({ x: B.x + 6, y: B.y - 13 }, "B"),
    rotulo({ x: C.x - 14, y: C.y - 2 }, "C"),
    rotulo({ x: D.x + 14, y: D.y - 2 }, "D"),
    rotulo({ x: E.x - 13, y: E.y + 12 }, "E"),
    rotulo({ x: F.x + 13, y: F.y + 12 }, "F"),
    rotulo({ x: P.x - 3, y: P.y + 15 }, "P", "trazo", 12),
    // los datos del enunciado, cada uno sobre su segmento
    { tipo: "texto", en: { x: (A.x + B.x) / 2, y: A.y - 13 }, texto: "x + 1", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: { x: (C.x + P.x) / 2 + 6, y: C.y + 15 }, texto: "y", rol: "dato", tam: 12, cursiva: true, negrita: true },
    { tipo: "texto", en: { x: (P.x + D.x) / 2, y: C.y - 12 }, texto: "2y + 2", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: { x: (E.x + F.x) / 2, y: E.y + 18 }, texto: "11", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 }, anguloHacia(A, C) + 90, 19), texto: "x", rol: "dato", tam: 12, cursiva: true, negrita: true },
    { tipo: "texto", en: avanzar({ x: (C.x + E.x) / 2, y: (C.y + E.y) / 2 }, anguloHacia(C, E) + 90, 19), texto: "x", rol: "dato", tam: 12, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: Y_BASE + 40, pasos: 0, elementos: el };
}

// ── G9 (1er parcial 1-2024) · los angulos de la circunferencia ──
// La figura fija todo con dos arcos de 60°. Poniendo los cuatro puntos sobre
// la circunferencia en 120° (P1, arriba izq), 60° (P2, arriba der), 240° (P3,
// abajo izq) y 300° (P4, abajo der):
//   · P1P2 sale horizontal y P1P3 vertical (por simetria), y P2P3 es DIAMETRO
//     (60° y 240° son opuestos), que es lo que hace que el angulo en P1 sea
//     recto — el cuadradito del facsimil.
//   · arco P1P2 (arriba) = 60° y arco P3P4 (abajo) = 60°, los dos rotulados.
// De ahi: x = 60 (central), u = 180−60 = 120, w = 60 (inscrito sobre el arco
// P1P3 de 120°), y = 30 (inscrito sobre el arco P1P2 de 60°) y z = 90.
// 2x + y − w − 3u = 120 + 30 − 60 − 360 = −270, la opcion c.
function g9circunferenciaAngulos(): Figura {
  const R = 116;
  const O: Pt = { x: 206, y: 158 };
  const P1 = avanzar(O, 120, R), P2 = avanzar(O, 60, R);
  const P3 = avanzar(O, 240, R), P4 = avanzar(O, 300, R);

  verificarAngulo("P1P2 horizontal", 0, Math.abs(anguloHacia(P1, P2)), 0.01);
  verificarAngulo("P1P3 vertical", 90, Math.abs(anguloHacia(P1, P3)), 0.01);
  verificarAngulo("P2P3 es diametro", 180, anguloEn(O, P2, P3), 0.01);
  verificarAngulo("angulo recto en P1", 90, anguloEn(P1, P2, P3));
  verificarAngulo("x = 60 central", 60, anguloEn(O, P3, P4));
  verificarAngulo("u = 120 central", 120, anguloEn(O, P2, P4));
  verificarAngulo("w = 60 inscrito en P2", 60, anguloEn(P2, P1, P3));
  verificarAngulo("y = 30 inscrito en P3", 30, anguloEn(P3, P1, P2));

  const arcoX = arcoAngulo(O, anguloHacia(O, P3), anguloHacia(O, P4), 34, 50);
  const arcoU = arcoAngulo(O, anguloHacia(O, P4), anguloHacia(O, P2), 52, 68);
  const arcoW = arcoAngulo(P2, anguloHacia(P2, P1), anguloHacia(P2, P3), 30, 44);
  const arcoY = arcoAngulo(P3, anguloHacia(P3, P2), anguloHacia(P3, P1), 30, 44);

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "linea", de: P1, a: P2, rol: "trazo" },
    { tipo: "linea", de: P1, a: P3, rol: "trazo" },
    { tipo: "linea", de: P2, a: P3, rol: "trazo" },
    { tipo: "linea", de: O, a: P4, rol: "trazo" },
    { tipo: "punto", en: O, rol: "trazo", r: 2.2 },
    { tipo: "cuadradoRecto", d: cuadradoRecto(P1, anguloHacia(P1, P2), anguloHacia(P1, P3), 11), rol: "trazo" },
    // los dos arcos de 60° que son el dato
    { tipo: "texto", en: avanzar(O, 90, R + 17), texto: "60°", rol: "dato", tam: 12.5, negrita: true },
    { tipo: "texto", en: avanzar(O, 270, R + 17), texto: "60°", rol: "dato", tam: 12.5, negrita: true },
    // las incognitas
    { tipo: "arco", d: arcoX.d, rol: "incognita" },
    { tipo: "texto", en: arcoX.etiquetaEn, texto: "x", rol: "incognita", tam: 13, cursiva: true, negrita: true },
    { tipo: "arco", d: arcoU.d, rol: "incognita" },
    { tipo: "texto", en: arcoU.etiquetaEn, texto: "u", rol: "incognita", tam: 13, cursiva: true, negrita: true },
    { tipo: "arco", d: arcoW.d, rol: "incognita" },
    { tipo: "texto", en: arcoW.etiquetaEn, texto: "w", rol: "incognita", tam: 13, cursiva: true, negrita: true },
    { tipo: "arco", d: arcoY.d, rol: "incognita" },
    { tipo: "texto", en: arcoY.etiquetaEn, texto: "y", rol: "incognita", tam: 13, cursiva: true, negrita: true },
    { tipo: "texto", en: avanzar(P1, -50, 30), texto: "z", rol: "incognita", tam: 13, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: O.y + R + 34, pasos: 0, elementos: el };
}

// ── G6 (1er parcial 2-2024) · L1 ∥ L2 cortadas por una transversal ──
// La transversal es horizontal y las dos paralelas bajan hacia la derecha. En
// cada cruce los cuatro angulos van en el mismo orden: arriba-izq, arriba-der,
// abajo-izq, abajo-der. Por correspondencia r = 5x−30, y por par lineal
// x + r = 180, de donde 6x = 210 y x = 35. Despues s = y = r = 145 (y es
// opuesto por el vertice a r, y s le corresponde), asi que 2x + s = 215.
function g6paralelasTransversal(): Figura {
  const X = 35;                       // el x que sale del sistema
  const INCL = 180 - X;               // direccion de las paralelas hacia arriba
  const Y_T = 152;                    // la transversal
  const V1: Pt = { x: 150, y: Y_T };
  const V2: Pt = { x: 262, y: Y_T };
  const LARGO = 104;

  const arribaL1 = avanzar(V1, INCL, LARGO), abajoL1 = avanzar(V1, INCL - 180, LARGO);
  const arribaL2 = avanzar(V2, INCL, LARGO), abajoL2 = avanzar(V2, INCL - 180, LARGO);

  verificarAngulo("x en el cruce con L1", X, anguloEn(V1, { x: V1.x - 60, y: Y_T }, arribaL1));
  verificarAngulo("L1 ∥ L2", 0, Math.abs(anguloHacia(V1, arribaL1) - anguloHacia(V2, arribaL2)), 0.01);
  verificarAngulo("5x−30 es el de arriba a la derecha", 5 * X - 30,
    anguloEn(V2, { x: V2.x + 60, y: Y_T }, arribaL2));

  // Los cuatro rotulos de cada cruce, en sus cuadrantes
  const rotulos = (V: Pt, arriba: Pt, izq: string, der: string, abIzq: string, abDer: string): Elemento[] => {
    const dirArriba = anguloHacia(V, arriba);
    return [
      { tipo: "texto", en: avanzar(V, (180 + dirArriba) / 2, 32), texto: izq, rol: "dato", tam: 13, cursiva: true, negrita: true },
      { tipo: "texto", en: avanzar(V, dirArriba / 2, 40), texto: der, rol: "dato", tam: 13, cursiva: true, negrita: true },
      { tipo: "texto", en: avanzar(V, (180 + dirArriba) / 2 - 180, 32), texto: abIzq, rol: "dato", tam: 13, cursiva: true, negrita: true },
      { tipo: "texto", en: avanzar(V, dirArriba / 2 - 180, 32), texto: abDer, rol: "dato", tam: 13, cursiva: true, negrita: true },
    ];
  };

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 40, y: Y_T }, a: { x: 388, y: Y_T }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: arribaL1, a: abajoL1, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: arribaL2, a: abajoL2, rol: "trazo", grosor: 1.6 },
    ...rotulos(V1, arribaL1, "x", "r", "y", "q"),
    ...rotulos(V2, arribaL2, "p", "5x − 30°", "s", "k"),
    rotulo(avanzar(abajoL1, anguloHacia(V1, abajoL1), 14), "L₁"),
    rotulo(avanzar(abajoL2, anguloHacia(V2, abajoL2), 14), "L₂"),
  ];

  return { ancho: 420, alto: Y_T + LARGO + 40, pasos: 0, elementos: el };
}

// ── G8 (1er parcial 2-2024) · las lunas de Hipocrates ──
// AB es el diametro de C3 (10 cm) y C esta sobre esa semicircunferencia, asi
// que el angulo en C es recto (Thales). Con AC = 8 sale BC = 6 (el 6-8-10).
// C1 y C2 son las semicircunferencias sobre los catetos, hacia afuera.
// Lo sombreado son las dos lunas, y el clasico: como π·4²/2 + π·3²/2 = π·5²/2,
// las lunas suman exactamente el area del triangulo, 8·6/2 = 24 cm².
// Se dibuja pintando las dos medias lunas de gris y tapando despues con blanco
// el semidisco grande: lo que queda gris es justo lo de afuera.
function g8lunasHipocrates(): Figura {
  const AB = 10, AC = 8;
  const BC = Math.sqrt(AB * AB - AC * AC);      // 6
  const ESC = 31;
  const X0 = 44, Y_BASE = 214;
  const GRIS = "#c9ccd4";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  // C por interseccion: x = (AB² + AC² − BC²)/(2·AB)
  const cx = (AB * AB + AC * AC - BC * BC) / (2 * AB);
  const cy = Math.sqrt(AC * AC - cx * cx);
  const A = en(0, 0), B = en(AB, 0), C = en(cx, cy);
  const M3: Pt = { x: (A.x + B.x) / 2, y: A.y };
  const M1: Pt = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const M2: Pt = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
  const R3 = (AB / 2) * ESC, R1 = (AC / 2) * ESC, R2 = (BC / 2) * ESC;

  verificarDistancia("AC = 8", AC * ESC, distancia(A, C));
  verificarDistancia("BC = 6", BC * ESC, distancia(B, C));
  verificarAngulo("angulo recto en C (Thales)", 90, anguloEn(C, A, B));
  verificarDistancia("C esta sobre C3", R3, distancia(M3, C), 0.5);
  // Lo que hace que las lunas den el area del triangulo
  verificarDistancia("los dos semidiscos chicos suman el grande",
    (Math.PI * R3 * R3) / 2, (Math.PI * R1 * R1) / 2 + (Math.PI * R2 * R2) / 2, 1);
  verificarDistancia("las lunas valen el triangulo", (AC * BC) / 2, (AC * BC) / 2, 0.0001);

  // Cada semidisco chico va hacia AFUERA del triangulo: el sentido del arco se
  // elige con el vertice opuesto, asi que es imposible pandearlo para adentro.
  const semi = (M: Pt, R: number, P: Pt, Q: Pt, opuesto: Pt): string => {
    const aP = anguloHacia(M, P), aQ = anguloHacia(M, Q);
    const haciaOpuesto = anguloHacia(M, opuesto);
    // dos caminos de P a Q; se toma el que NO pase por el lado del opuesto
    const porArriba = ((aQ - aP) % 360 + 360) % 360;
    const medio = aP + porArriba / 2;
    const dif = Math.abs((((medio - haciaOpuesto) % 360) + 540) % 360 - 180);
    const a2 = dif > 90 ? aP + porArriba : aP + porArriba - 360;
    return `M ${P.x.toFixed(2)} ${P.y.toFixed(2)}` + sigueArco(M, R, aP, a2) + " Z";
  };

  const el: Elemento[] = [
    { tipo: "path", d: semi(M1, R1, A, C, B), rol: "trazo", relleno: true, color: GRIS },
    { tipo: "path", d: semi(M2, R2, C, B, A), rol: "trazo", relleno: true, color: GRIS },
    // el semidisco grande, en blanco, deja solo las dos lunas grises
    { tipo: "path", d: `M ${A.x} ${A.y}` + sigueArco(M3, R3, 180, 0) + " Z", rol: "trazo", relleno: true, color: "#ffffff" },
    { tipo: "path", d: arcoDe(M3, R3, 180, 0), rol: "trazo" },
    { tipo: "path", d: semi(M1, R1, A, C, B), rol: "trazo" },
    { tipo: "path", d: semi(M2, R2, C, B, A), rol: "trazo" },
    { tipo: "poligono", puntos: [A, B, C], rol: "trazo" },
    rotulo({ x: A.x - 13, y: A.y + 13 }, "A"),
    rotulo({ x: B.x + 13, y: B.y + 13 }, "B"),
    rotulo({ x: C.x + 13, y: C.y - 10 }, "C"),
    // Los rotulos de las dos lunas van ADENTRO de cada luna: afuera del arco
    // se salen del lienzo por arriba.
    rotulo(avanzar(M1, anguloHacia(B, C), R1 - 26), "C₁", "dato", 12),
    rotulo(avanzar(M2, anguloHacia(A, C), R2 - 22), "C₂", "dato", 12),
    rotulo({ x: M3.x - 30, y: M3.y - R3 / 2 }, "C₃", "dato", 12),
    { tipo: "texto", en: avanzar({ x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 }, anguloHacia(A, C) - 90, 15), texto: "8", rol: "dato", tam: 12.5, negrita: true },
    ...cota(A, B, "10", 24),
  ];

  return { ancho: 420, alto: Y_BASE + 46, pasos: 0, elementos: el };
}

// ── G9 (1er parcial 2-2024) · trapecio con los lados en 4 partes iguales ──
// Con AB y IJ paralelas, el segmento a la fraccion t del recorrido mide
// AB + t(IJ − AB). Los puntos parten los lados en cuartos, asi que
// CD = (3·AB + IJ)/4 y EF = (AB + IJ)/2. Contra los datos
// CD = (3a+b)/4 y EF = (a+b)/2 sale AB = a y por lo tanto IJ = b (opcion d).
// El dibujo usa AB = 4 y IJ = 9 para que se lea como el facsimil; los valores
// no importan, lo que importa es que los tres segmentos esten en los cuartos
// exactos y paralelos.
function g9trapecioCuartos(): Figura {
  const AB = 4, IJ = 9, ALTO = 4;
  const ESC = 36;
  const X0 = 48, Y_BASE = 176;
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const I = en(0, 0), J = en(IJ, 0);
  const A = en((IJ - AB) / 2, ALTO), B = en((IJ + AB) / 2, ALTO);
  // los puntos a 1/4, 2/4 y 3/4 de A hacia I (y de B hacia J)
  const p = (desde: Pt, hasta: Pt, k: number): Pt => ({
    x: desde.x + ((hasta.x - desde.x) * k) / 4,
    y: desde.y + ((hasta.y - desde.y) * k) / 4,
  });
  const C = p(A, I, 1), E = p(A, I, 2), G = p(A, I, 3);
  const D = p(B, J, 1), F = p(B, J, 2), H = p(B, J, 3);

  verificarAngulo("AB ∥ IJ", 0, Math.abs(anguloHacia(A, B) - anguloHacia(I, J)), 0.01);
  for (const [n, s, t] of [["CD", C, D], ["EF", E, F], ["GH", G, H]] as [string, Pt, Pt][]) {
    verificarAngulo(`${n} es paralelo a la base`, 0, Math.abs(anguloHacia(s, t) - anguloHacia(I, J)), 0.01);
  }
  verificarDistancia("AC es un cuarto de AI", distancia(A, I) / 4, distancia(A, C), 0.01);
  verificarDistancia("CD = (3·AB + IJ)/4", ((3 * AB + IJ) / 4) * ESC, distancia(C, D), 0.01);
  verificarDistancia("EF = (AB + IJ)/2", ((AB + IJ) / 2) * ESC, distancia(E, F), 0.01);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, J, I], rol: "trazo" },
    { tipo: "linea", de: C, a: D, rol: "trazo" },
    { tipo: "linea", de: E, a: F, rol: "trazo" },
    { tipo: "linea", de: G, a: H, rol: "trazo" },
    ...([["A", A, -1], ["C", C, -1], ["E", E, -1], ["G", G, -1], ["I", I, -1],
      ["B", B, 1], ["D", D, 1], ["F", F, 1], ["H", H, 1], ["J", J, 1]] as [string, Pt, number][])
      .map(([t, q, lado]): Elemento => rotulo({ x: q.x + lado * 14, y: q.y }, t, "trazo", 12)),
    { tipo: "texto", en: { x: (C.x + D.x) / 2, y: C.y - 12 }, texto: "(3a + b)/4", rol: "dato", tam: 11, negrita: true },
    { tipo: "texto", en: { x: (E.x + F.x) / 2, y: E.y - 12 }, texto: "(a + b)/2", rol: "dato", tam: 11, negrita: true },
    { tipo: "texto", en: { x: (I.x + J.x) / 2, y: I.y + 18 }, texto: "IJ = ?", rol: "incognita", tam: 12.5, negrita: true },
  ];

  return { ancho: 420, alto: Y_BASE + 40, pasos: 0, elementos: el };
}

// ── G6 (final 1-2024) · DE ∥ CB con D punto medio de AC ──
// AD = DC = 15, asi que D es el punto medio y el triangulo ADE es semejante al
// ACB con razon 1/2: DE = CB/2, o sea (x+2)/3 = x/2 y x = 4 (opcion d).
//
// OJO, ESTE DIBUJO NO ESTA A ESCALA, y es a proposito. Con AC = 30 y CB = x = 4
// el triangulo real es una astilla de 7,5 a 1 donde no entra ninguna etiqueta —
// el propio facsimil lo dibuja esquematico. Lo que SI es exacto acá es la
// topologia, que es lo que el alumno tiene que leer de la figura: D es el punto
// medio de AC y DE es paralelo a CB, las dos cosas verificadas. Las longitudes
// van rotuladas, no medidas.
function g6thalesDeParaleloCb(): Figura {
  const A: Pt = { x: 96, y: 216 };
  const B: Pt = { x: 346, y: 216 };
  const C: Pt = { x: 268, y: 40 };
  const D: Pt = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };   // punto medio exacto
  // E sobre AB con DE ∥ CB: por Thales, E es el punto medio de AB
  const E: Pt = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  verificarDistancia("D es el punto medio de AC", distancia(A, D), distancia(D, C), 0.01);
  verificarAngulo("DE ∥ CB", 0, Math.abs(anguloHacia(D, E) - anguloHacia(C, B)), 0.01);
  verificarDistancia("y entonces DE = CB/2", distancia(C, B) / 2, distancia(D, E), 0.01);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, C, B], rol: "trazo" },
    { tipo: "linea", de: D, a: E, rol: "trazo" },
    rotulo({ x: C.x + 4, y: C.y - 14 }, "C"),
    rotulo({ x: D.x - 15, y: D.y - 6 }, "D"),
    rotulo({ x: A.x - 12, y: A.y + 13 }, "A"),
    rotulo({ x: E.x, y: E.y + 15 }, "E"),
    rotulo({ x: B.x + 12, y: B.y + 13 }, "B"),
    { tipo: "texto", en: avanzar({ x: (D.x + C.x) / 2, y: (D.y + C.y) / 2 }, anguloHacia(D, C) + 90, 15), texto: "15", rol: "dato", tam: 12.5, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + D.x) / 2, y: (A.y + D.y) / 2 }, anguloHacia(A, D) + 90, 15), texto: "15", rol: "dato", tam: 12.5, negrita: true },
    { tipo: "texto", en: avanzar({ x: (D.x + E.x) / 2, y: (D.y + E.y) / 2 }, anguloHacia(D, E) + 90, 36), texto: "(x + 2)/3", rol: "dato", tam: 11, negrita: true },
    { tipo: "texto", en: avanzar({ x: (C.x + B.x) / 2, y: (C.y + B.y) / 2 }, anguloHacia(C, B) - 90, 15), texto: "x", rol: "incognita", tam: 14, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: A.y + 40, pasos: 0, elementos: el };
}

// ── F19 (2do parcial 1-2024) · la red de capacitores ──
// Es la que la bitacora marcaba como imposible ("no se sabe la topologia"). El
// facsimil a 400 dpi la resuelve: entre a y d hay un bloque con DOS ramas en
// paralelo — arriba dos C en serie, abajo un 2C — y de d a b va otro 2C.
//   bloque = (C/2) ∥ 2C = 5C/2 ;  total = (5C/2 en serie con 2C) = 10C/9
// Con C = 9 μF son 10 μF, la opcion d. La marcada era 54 μF = 6C, que es lo que
// da suponer los cuatro en paralelo: el distractor del ejercicio.
function f19redCapacitores(): Figura {
  const A_X = 44, B_Y = 246, D_X = 348;
  const L = 130, R = 254;                 // lados del bloque
  const Y_MED = 108;                      // la altura de a y del nodo derecho
  const Y_SUP = 52, Y_INF = 164;          // ramas de arriba y abajo del bloque
  const a: Pt = { x: A_X, y: Y_MED };
  const b: Pt = { x: A_X, y: B_Y };
  const d: Pt = { x: D_X, y: Y_MED + 52 };

  verificarAngulo("a entra horizontal al bloque", 0, anguloHacia(a, { x: L, y: Y_MED }));
  verificarAngulo("b sale horizontal", 0, anguloHacia(b, { x: D_X, y: B_Y }));
  // 10C/9: con C = 9 μF, 10 μF
  const C = 9;
  const bloque = (C / 2) + 2 * C;
  const total = 1 / (1 / bloque + 1 / (2 * C));
  verificarDistancia("la red equivale a 10 μF", 10, total, 0.0001);

  const el: Elemento[] = [
    // el bloque: riel izquierdo y derecho
    { tipo: "linea", de: { x: L, y: Y_SUP }, a: { x: L, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: R, y: Y_SUP }, a: { x: R, y: Y_INF }, rol: "trazo", grosor: 1.6 },
    // rama de arriba: dos C en serie
    ...capacitor({ x: L, y: Y_SUP }, { x: (L + R) / 2, y: Y_SUP }, "C"),
    ...capacitor({ x: (L + R) / 2, y: Y_SUP }, { x: R, y: Y_SUP }, "C"),
    // rama de abajo: un 2C
    ...capacitor({ x: L, y: Y_INF }, { x: R, y: Y_INF }, "2C"),
    // los cables de a y de b, y el nodo d
    { tipo: "linea", de: a, a: { x: L, y: Y_MED }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: R, y: Y_MED }, a: { x: D_X, y: Y_MED }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: { x: D_X, y: Y_MED }, a: { x: D_X, y: B_Y }, rol: "trazo", grosor: 1.6 },
    ...capacitor(b, { x: D_X, y: B_Y }, "2C"),
    { tipo: "punto", en: a, rol: "trazo", r: 4 },
    { tipo: "punto", en: b, rol: "trazo", r: 4 },
    { tipo: "punto", en: d, rol: "trazo", r: 4 },
    rotulo({ x: a.x, y: a.y - 16 }, "a"),
    rotulo({ x: b.x, y: b.y - 16 }, "b"),
    rotulo({ x: d.x + 15, y: d.y }, "d"),
    { tipo: "texto", en: { x: 210, y: B_Y + 30 }, texto: "cada C = 9,00 μF", rol: "dato", tam: 11.5, negrita: true },
  ];

  return { ancho: 420, alto: B_Y + 48, pasos: 0, elementos: el };
}

// Desvío del paralelismo entre dos rectas, en grados y siempre en [0, 90].
// Comparar `anguloHacia` contra `anguloHacia` a secas da 180 cuando las dos
// van paralelas pero recorridas en sentidos OPUESTOS, que es igual de paralelo:
// de ahí que haya que plegar el ángulo a módulo 180 y quedarse con el menor.
function desvioParalelas(a1: Pt, a2: Pt, b1: Pt, b2: Pt): number {
  const d = Math.abs((((anguloHacia(a1, a2) - anguloHacia(b1, b2)) % 180) + 180) % 180);
  return Math.min(d, 180 - d);
}

// Cruce de dos rectas dadas por dos puntos cada una. Hacía falta para las
// figuras donde el punto que se pregunta es una intersección y no un vértice:
// `hastaY` solo sirve cuando la otra recta es horizontal.
function cruce(a1: Pt, a2: Pt, b1: Pt, b2: Pt): Pt {
  const d1x = a2.x - a1.x, d1y = a2.y - a1.y;
  const d2x = b2.x - b1.x, d2y = b2.y - b1.y;
  const den = d1x * d2y - d1y * d2x;
  if (Math.abs(den) < 1e-9) throw new Error("cruce: las dos rectas son paralelas, no se cortan");
  const t = ((b1.x - a1.x) * d2y - (b1.y - a1.y) * d2x) / den;
  return { x: a1.x + t * d1x, y: a1.y + t * d1y };
}

// ── G7 (1-2018 2da) · α en el cruce de dos cuerdas, con AB ∥ RT ──
// El ángulo entre dos cuerdas que se cortan adentro vale la SEMISUMA de los dos
// arcos opuestos que abarca. Nombrando los arcos en sentido horario desde T
// (t = TC, c = CR, r = RA, a = AB, b = BT):
//   · AB ∥ RT obliga a r = b (dos paralelas cortan arcos iguales),
//   · ∡AOC = 94° es el arco CA que pasa por R, o sea c + r = 94.
// Entonces α = (t + r + a)/2, y como t + c + r + a + b = 360 con c = 94 − r y
// b = r, queda t + a + r = 266 y α = 133° — la opción A, sin importar cuánto
// mida cada arco por separado. El dibujo elige r = 45, c = 49, t = 66, a = 155.
function g7cuerdasAbParalelaRt(): Figura {
  const R = 128;
  const O: Pt = { x: 206, y: 162 };
  // posiciones en grados antihorarios, construidas desde los arcos elegidos
  const P = { R: 0, C: 49, T: 115, B: 160, A: 315 };
  const pR = avanzar(O, P.R, R), pC = avanzar(O, P.C, R);
  const pT = avanzar(O, P.T, R), pB = avanzar(O, P.B, R), pA = avanzar(O, P.A, R);

  // Las dos condiciones del enunciado, verificadas sobre el dibujo
  verificarAngulo("AB ∥ RT", 0, desvioParalelas(pA, pB, pT, pR), 0.01);
  verificarAngulo("∡AOC = 94°", 94, anguloEn(O, pA, pC));

  const X = cruce(pT, pR, pB, pC);            // donde se cortan las dos cuerdas
  const arcoAlfa = arcoAngulo(X, anguloHacia(X, pT), anguloHacia(X, pC), 30, 46);
  verificarAngulo("α = 133°", 133, arcoAlfa.medida, 0.2);

  const arco94 = arcoAngulo(O, anguloHacia(O, pA), anguloHacia(O, pC), 30, 46);
  verificarAngulo("el arco del dato marca 94°", 94, arco94.medida);

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "linea", de: pT, a: pR, rol: "trazo" },
    { tipo: "linea", de: pB, a: pC, rol: "trazo" },
    { tipo: "linea", de: pB, a: pA, rol: "trazo" },
    { tipo: "linea", de: O, a: pC, rol: "trazo" },
    { tipo: "linea", de: O, a: pA, rol: "trazo" },
    { tipo: "punto", en: O, rol: "trazo", r: 2.2 },
    { tipo: "punto", en: X, rol: "incognita", r: 2.6 },
    { tipo: "arco", d: arco94.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco94.etiquetaEn, texto: "94°", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arcoAlfa.d, rol: "incognita" },
    { tipo: "texto", en: arcoAlfa.etiquetaEn, texto: "α", rol: "incognita", tam: 14, negrita: true },
    rotulo(avanzar(O, P.T, R + 15), "T"),
    rotulo(avanzar(O, P.C, R + 15), "C"),
    rotulo(avanzar(O, P.R, R + 15), "R"),
    rotulo(avanzar(O, P.B, R + 15), "B"),
    rotulo(avanzar(O, P.A, R + 16), "A"),
    rotulo({ x: O.x - 15, y: O.y + 4 }, "O"),
  ];

  return { ancho: 420, alto: O.y + R + 30, pasos: 0, elementos: el };
}

// ── G7 (1-2018 3ra) y G6 (1-2019 3ra) · pentágono regular con una tangente ──
// LA MISMA figura en los dos exámenes: se compararon las dos imágenes antes de
// compartir el dibujo (la lección del lote 2017, donde dos que parecían iguales
// no lo eran). Acá sí coinciden: mismo pentágono, misma tangente en el vértice
// de arriba a la izquierda, mismos X e Y.
//
// Con arcos de 72° entre vértices consecutivos:
//   · X es el cruce de dos secantes (el lado V1V5 prolongado y el lado de abajo
//     V3V4 prolongado): vale (arco lejano − arco cercano)/2 = (144 − 72)/2 = 36°.
//   · Y es el cruce de la TANGENTE en V2 con ese mismo lado de abajo:
//     (216 − 72)/2 = 72°.
// x + y = 108°, la opción A.
function g7pentagonoTangente(): Figura {
  const R = 82;
  const O: Pt = { x: 170, y: 130 };
  const ANG = [90, 162, 234, 306, 18];              // V1..V5, antihorario
  const [V1, V2, V3, V4, V5] = ANG.map((a) => avanzar(O, a, R));
  const PALO = "#f3e6dd";

  verificarDistancia("el pentágono es regular", distancia(V1, V2), distancia(V2, V3), 0.01);
  verificarDistancia("y de lado parejo", distancia(V3, V4), distancia(V4, V5), 0.01);

  // la tangente en V2: perpendicular al radio OV2
  const dirTan = 162 - 90;
  const tanA = avanzar(V2, dirTan, 62), tanB = avanzar(V2, dirTan - 180, 130);
  verificarAngulo("la tangente es perpendicular al radio", 90, anguloEn(V2, O, tanA));

  // los dos puntos de afuera, sobre la prolongación del lado de abajo
  const baseIzq = { x: 44, y: V3.y }, baseDer = { x: 396, y: V3.y };
  const Y = cruce(tanA, tanB, V3, V4);
  const X = cruce(V1, V5, V3, V4);

  const arcoY = arcoAngulo(Y, anguloHacia(Y, V4), anguloHacia(Y, V2), 34, 50);
  const arcoX = arcoAngulo(X, anguloHacia(X, V5), anguloHacia(X, V4), 34, 50);
  verificarAngulo("y = 72°", 72, arcoY.medida, 0.1);
  verificarAngulo("x = 36°", 36, arcoX.medida, 0.1);
  verificarAngulo("x + y = 108°", 108, arcoX.medida + arcoY.medida, 0.2);

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "poligono", puntos: [V1, V2, V3, V4, V5], rol: "trazo", relleno: true, rellenoColor: PALO },
    // el lado de abajo prolongado, y el lado V1V5 prolongado hasta X
    { tipo: "linea", de: baseIzq, a: baseDer, rol: "trazo" },
    { tipo: "linea", de: V1, a: X, rol: "trazo" },
    // la tangente
    { tipo: "linea", de: tanA, a: Y, rol: "trazo" },
    { tipo: "texto", en: avanzar(tanA, dirTan, 12), texto: "t", rol: "trazo", tam: 14, negrita: true },
    { tipo: "punto", en: V2, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: O, rol: "trazo", r: 2.2 },
    { tipo: "texto", en: { x: O.x + 14, y: O.y - 4 }, texto: "O", rol: "trazo", tam: 12, negrita: true, ancla: "start" },
    { tipo: "arco", d: arcoY.d, rol: "incognita" },
    { tipo: "texto", en: arcoY.etiquetaEn, texto: "y", rol: "incognita", tam: 13, cursiva: true, negrita: true },
    { tipo: "arco", d: arcoX.d, rol: "incognita" },
    { tipo: "texto", en: arcoX.etiquetaEn, texto: "x", rol: "incognita", tam: 13, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(V3.y + 48), pasos: 0, elementos: el };
}

// ── G5 (1-2023 3ra) · dos triángulos rectángulos y el triangulito negro ──
// Los dos catetos verticales miden 28 (izquierda) y 45 (derecha), y la base
// total 148. Las tangentes dadas fijan dónde cae cada hipotenusa sobre la base:
//   tan α = 7/15 = 28/60  → el pie del izquierdo está a 60 del extremo izquierdo
//   tan β = 9/20 = 45/100 → el pie del derecho está a 100 del extremo derecho,
//                           o sea a 148 − 100 = 48
// Los dos pies se pasan uno al otro, y ese solapamiento es la base del
// triangulito negro: b = 60 − 48 = 12 (opción A). No hace falta el punto donde
// se cruzan las hipotenusas, pero el dibujo lo necesita y sale de `cruce`.
function g5dosTriangulosBaseNegra(): Figura {
  const BASE = 148, IZQ = 28, DER = 45;
  const PIE_IZQ = IZQ * (15 / 7);            // 60
  const PIE_DER = BASE - DER * (20 / 9);     // 48
  const ESC = 2.15;
  const X0 = 46, Y_BASE = 148;
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  const izqAbajo = en(0, 0), izqArriba = en(0, IZQ);
  const derAbajo = en(BASE, 0), derArriba = en(BASE, DER);
  const pieIzq = en(PIE_IZQ, 0), pieDer = en(PIE_DER, 0);
  const apex = cruce(izqArriba, pieIzq, derArriba, pieDer);

  verificarDistancia("cateto izquierdo = 28", IZQ * ESC, distancia(izqAbajo, izqArriba));
  verificarDistancia("cateto derecho = 45", DER * ESC, distancia(derAbajo, derArriba));
  verificarDistancia("base total = 148", BASE * ESC, distancia(izqAbajo, derAbajo));
  verificarAngulo("tan α = 7/15", (Math.atan(7 / 15) * 180) / Math.PI,
    anguloEn(izqArriba, { x: izqArriba.x + 60, y: izqArriba.y }, pieIzq));
  verificarAngulo("tan β = 9/20", (Math.atan(9 / 20) * 180) / Math.PI,
    anguloEn(derArriba, { x: derArriba.x - 60, y: derArriba.y }, pieDer));
  verificarDistancia("la base negra mide 12", 12 * ESC, distancia(pieDer, pieIzq));

  const arcoA = arcoAngulo(izqArriba, 0, anguloHacia(izqArriba, pieIzq), 40, 54);
  const arcoB = arcoAngulo(derArriba, 180, anguloHacia(derArriba, pieDer), 40, 56);

  const el: Elemento[] = [
    { tipo: "linea", de: izqAbajo, a: derAbajo, rol: "trazo", grosor: 1.6 },
    { tipo: "poligono", puntos: [izqAbajo, izqArriba, pieIzq], rol: "trazo" },
    { tipo: "poligono", puntos: [derAbajo, derArriba, pieDer], rol: "trazo" },
    // el triangulito negro: el solapamiento de las dos bases
    { tipo: "poligono", puntos: [pieDer, pieIzq, apex], rol: "trazo", relleno: true, rellenoColor: "#1a1a2e" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(izqAbajo, 0, 90, 9), rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(derAbajo, 180, 90, 9), rol: "trazo" },
    { tipo: "texto", en: { x: izqArriba.x - 12, y: (izqAbajo.y + izqArriba.y) / 2 }, texto: "28", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: derArriba.x + 12, y: (derAbajo.y + derArriba.y) / 2 }, texto: "45", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    { tipo: "arco", d: arcoA.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoA.etiquetaEn, texto: "α", rol: "dato", tam: 13, negrita: true },
    { tipo: "arco", d: arcoB.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoB.etiquetaEn, texto: "β", rol: "dato", tam: 13, negrita: true },
    { tipo: "texto", en: { x: (pieDer.x + pieIzq.x) / 2, y: Y_BASE + 16 }, texto: "b", rol: "incognita", tam: 14, cursiva: true, negrita: true },
    ...cota(izqAbajo, derAbajo, "148", -34),
  ];

  return { ancho: 420, alto: Y_BASE + 56, pasos: 0, elementos: el };
}

// ── G7 (1-2023 3ra) · cinco cuadrados en escalera con una diagonal ──
// Los cuadrados de lado 5, 4, 3, 2 y 1 se apoyan en la misma base, en ese
// orden, y una sola recta va de la punta de arriba del primero (0,5) a la
// esquina de abajo del último (15,0). Lo sombreado es la franja entre los
// techos y esa recta.
//
// Sale de dos maneras y conviene tener las dos: sumando los cinco trapecios da
// 25/6 + 16/3 + 9/2 + 8/3 + 5/6 = 35/2; y de una, el área de la escalera menos
// el triángulo bajo la recta: (25+16+9+4+1) − ½·15·5 = 55 − 37,5 = 35/2. Es la
// opción C. La verificación de abajo mide el POLÍGONO que se dibuja.
function g7cincoCuadradosEscalera(): Figura {
  const LADOS = [5, 4, 3, 2, 1];
  const ANCHO_TOTAL = LADOS.reduce((a, b) => a + b, 0);   // 15
  const ESC = 22;
  const X0 = 46, Y_BASE = 152;
  const GRIS = "#9aa0ad";
  const en = (ux: number, uy: number): Pt => ({ x: X0 + ux * ESC, y: Y_BASE - uy * ESC });

  // bordes de cada cuadrado
  const bordes: number[] = [0];
  for (const l of LADOS) bordes.push(bordes[bordes.length - 1] + l);

  // la escalera, de la punta de arriba a la esquina de abajo del último
  const escalera: Pt[] = [];
  LADOS.forEach((l, i) => {
    escalera.push(en(bordes[i], l));
    escalera.push(en(bordes[i + 1], l));
  });
  escalera.push(en(ANCHO_TOTAL, 0));
  const recta: [Pt, Pt] = [en(0, LADOS[0]), en(ANCHO_TOTAL, 0)];

  verificarDistancia("la recta arranca en la punta del primer cuadrado", 0,
    distancia(recta[0], en(0, LADOS[0])), 0.01);
  verificarDistancia("y termina en la esquina de abajo del ultimo", 0,
    distancia(recta[1], en(ANCHO_TOTAL, 0)), 0.01);
  // El área del polígono que se va a dibujar, en unidades del enunciado
  const areaPoligono = Math.abs(escalera.reduce((acc, p, i) => {
    const q = escalera[(i + 1) % escalera.length];
    return acc + (p.x * q.y - q.x * p.y);
  }, 0)) / 2 / (ESC * ESC);
  verificarDistancia("área sombreada = 35/2", 35 / 2, areaPoligono, 0.0001);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: escalera, rol: "trazo", relleno: true, rellenoColor: GRIS },
    ...LADOS.map((l, i): Elemento => ({
      tipo: "poligono",
      puntos: [en(bordes[i], l), en(bordes[i + 1], l), en(bordes[i + 1], 0), en(bordes[i], 0)],
      rol: "trazo",
    })),
    { tipo: "linea", de: recta[0], a: recta[1], rol: "trazo", grosor: 1.8 },
    ...LADOS.map((l, i): Elemento => ({
      tipo: "texto",
      en: { x: en((bordes[i] + bordes[i + 1]) / 2, 0).x, y: Y_BASE + 17 },
      texto: String(l), rol: "dato", tam: 12, negrita: true,
    })),
  ];

  return { ancho: 420, alto: Y_BASE + 40, pasos: 0, elementos: el };
}

// ── G7 (2do parcial 2-2008) · dos cuerdas que se cruzan adentro ──
// AO·OB = CO·OD (potencia del punto): 4·9 = 36, y con CO = 4·OD queda
// 4·OD² = 36, OD = 3 y CO = 12 (opción d).
// La circunferencia no se elige a ojo: los cuatro puntos fijan sus distancias
// a O y el centro sale del CRUCE de las dos mediatrices, con los cuatro radios
// verificados. Así es imposible dibujar cuatro puntos que no sean concíclicos.
function g7dosCuerdasPotencia(): Figura {
  const AO = 4, OB = 9, OD = 3, CO = 4 * OD;     // 12
  const ESC = 13;
  const O: Pt = { x: 212, y: 220 };
  const A = avanzar(O, 205, AO * ESC);
  const B = avanzar(O, 25, OB * ESC);
  const C = avanzar(O, 135, CO * ESC);
  const D = avanzar(O, -45, OD * ESC);

  verificarDistancia("potencia del punto", AO * OB, CO * OD, 0.0001);

  // centro = cruce de las mediatrices de AB y de CD
  const medio = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const mAB = medio(A, B), mCD = medio(C, D);
  const centro = cruce(
    mAB, avanzar(mAB, anguloHacia(A, B) + 90, 100),
    mCD, avanzar(mCD, anguloHacia(C, D) + 90, 100),
  );
  const R = distancia(centro, A);
  for (const [n, p] of [["B", B], ["C", C], ["D", D]] as [string, Pt][]) {
    verificarDistancia(`${n} sobre la circunferencia`, R, distancia(centro, p), 0.5);
  }
  verificarDistancia("O queda adentro", 0, Math.max(0, distancia(centro, O) - R + 1), 0.01);

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(centro, R), rol: "trazo" },
    { tipo: "linea", de: A, a: B, rol: "trazo" },
    { tipo: "linea", de: C, a: D, rol: "trazo" },
    { tipo: "punto", en: O, rol: "trazo", r: 2.6 },
    ...[["A", A, 200], ["B", B, 20], ["C", C, 130], ["D", D, -50]].map(
      ([t, p, a]) => rotulo(avanzar(p as Pt, a as number, 15), t as string)),
    { tipo: "texto", en: avanzar(O, -120, 15), texto: "O", rol: "trazo", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (O.x + B.x) / 2, y: (O.y + B.y) / 2 }, anguloHacia(O, B) + 90, 14), texto: "9", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (O.x + A.x) / 2, y: (O.y + A.y) / 2 }, anguloHacia(O, A) - 90, 14), texto: "4", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar(avanzar(O, anguloHacia(O, C), CO * ESC * 0.62), anguloHacia(O, C) + 90, 26), texto: "CO = 4·OD", rol: "incognita", tam: 11, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(centro.y + R + 28), pasos: 0, elementos: el };
}

// ── G6 (2do examen de ingreso 1-2012) · el diámetro AOB y el ángulo ADC ──
// AOB es diámetro, así que el arco de A a B por el lado de C mide 180°. Con
// ∡BOC = 40° (central) ese arco BC vale 40°, y el arco AC que NO contiene a D
// es 180 + 40 = 220°. El inscrito en D vale la mitad: ∡ADC = 110° (opción C).
function g6diametroAobAnguloAdc(): Figura {
  const R = 116;
  const O: Pt = { x: 208, y: 152 };
  const A = avanzar(O, 150, R);
  const B = avanzar(O, 330, R);      // diametralmente opuesto a A
  const C = avanzar(O, 10, R);       // 40° desde B, contando hacia arriba
  const D = avanzar(O, 75, R);

  verificarAngulo("AOB es diámetro", 180, anguloEn(O, A, B), 0.01);
  verificarAngulo("∡BOC = 40°", 40, anguloEn(O, B, C));
  verificarAngulo("∡ADC = 110°", 110, anguloEn(D, A, C), 0.2);

  const arco40 = arcoAngulo(O, anguloHacia(O, B), anguloHacia(O, C), 32, 48);
  const arcoAdc = arcoAngulo(D, anguloHacia(D, A), anguloHacia(D, C), 30, 46);

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "linea", de: A, a: B, rol: "trazo" },
    { tipo: "linea", de: O, a: C, rol: "trazo" },
    { tipo: "linea", de: A, a: D, rol: "trazo" },
    { tipo: "linea", de: D, a: C, rol: "trazo" },
    { tipo: "linea", de: A, a: C, rol: "trazo" },
    { tipo: "punto", en: O, rol: "trazo", r: 2.2 },
    { tipo: "arco", d: arco40.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco40.etiquetaEn, texto: "40°", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "arco", d: arcoAdc.d, rol: "incognita" },
    { tipo: "texto", en: arcoAdc.etiquetaEn, texto: "?", rol: "incognita", tam: 14, negrita: true },
    rotulo(avanzar(O, 150, R + 15), "A"),
    rotulo(avanzar(O, 330, R + 15), "B"),
    rotulo(avanzar(O, 10, R + 15), "C"),
    rotulo(avanzar(O, 75, R + 15), "D"),
    { tipo: "texto", en: avanzar(O, 250, 16), texto: "O", rol: "trazo", tam: 12, negrita: true },
  ];

  return { ancho: 420, alto: O.y + R + 30, pasos: 0, elementos: el };
}

// ── G7 (1er parcial 2-2014) · el segmento circular de 60° y radio 5 ──
// Lo sombreado es el SEGMENTO: el sector de 60° menos el triángulo que forman
// los dos radios con la cuerda. Como el ángulo central es 60°, ese triángulo
// es equilátero de lado 5.
//   sector = (60/360)·π·5² = 25π/6 ;  triángulo = (√3/4)·5² = 25√3/4
//   segmento = 25π/6 − 25√3/4  (opción C)
function g7sector60Segmento(): Figura {
  const RADIO_CM = 5, ABERTURA = 60;
  const A1 = 15, A2 = A1 + ABERTURA;
  const R = 106;
  const O: Pt = { x: 200, y: 168 };
  const GRIS = "#9aa0ad";
  const P1 = avanzar(O, A1, R), P2 = avanzar(O, A2, R);

  verificarDistancia("los dos radios miden igual", distancia(O, P1), distancia(O, P2), 0.01);
  verificarAngulo("la abertura es de 60°", ABERTURA, anguloEn(O, P1, P2));
  // con 60° el triángulo de los dos radios y la cuerda es equilátero
  verificarDistancia("la cuerda mide lo mismo que el radio", R, distancia(P1, P2), 0.5);
  const segmento = (Math.PI * RADIO_CM * RADIO_CM * ABERTURA) / 360
    - (Math.sqrt(3) / 4) * RADIO_CM * RADIO_CM;
  verificarDistancia("segmento = 25π/6 − 25√3/4",
    (25 * Math.PI) / 6 - (25 * Math.sqrt(3)) / 4, segmento, 0.0001);

  const arcoAbertura = arcoAngulo(O, A1, A2, 30, 46);

  const el: Elemento[] = [
    // el segmento sombreado: la cuerda y el arco de vuelta
    { tipo: "path", d: `M ${P1.x.toFixed(2)} ${P1.y.toFixed(2)}` + sigueArco(O, R, A1, A2) + " Z", rol: "trazo", relleno: true, color: GRIS },
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "linea", de: O, a: P1, rol: "trazo" },
    { tipo: "linea", de: O, a: P2, rol: "trazo" },
    { tipo: "linea", de: P1, a: P2, rol: "trazo" },
    { tipo: "punto", en: O, rol: "trazo", r: 2.2 },
    { tipo: "arco", d: arcoAbertura.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoAbertura.etiquetaEn, texto: "60°", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: avanzar({ x: (O.x + P1.x) / 2, y: (O.y + P1.y) / 2 }, A1 - 90, 14), texto: "5 cm", rol: "dato", tam: 11, negrita: true },
    { tipo: "texto", en: avanzar(O, A1 + ABERTURA / 2, R + 34), texto: "A", rol: "incognita", tam: 14, cursiva: true, negrita: true },
  ];

  return { ancho: 420, alto: O.y + R + 30, pasos: 0, elementos: el };
}

// ── G7 (1-2015 2da opción) · las diagonales y BE − ED ──
// Con AB ∥ DC los triángulos ABE y CDE son semejantes, así que E parte LAS DOS
// diagonales en la misma razón: BE/ED = AE/EC = 8/3. Con BD = 5 sale
// BE = 40/11, ED = 15/11 y BE − ED = 25/11 (opción A).
// El dibujo se construye desde E con esas cuatro distancias, y por eso el
// paralelismo sale solo: es consecuencia de la razón, no algo que haya que
// acomodar a ojo.
function g7diagonalesBeMenosEd(): Figura {
  const AE = 8, EC = 3, BD = 5;
  const BE = (BD * AE) / (AE + EC);      // 40/11
  const ED = BD - BE;                    // 15/11
  const ESC = 30;
  const E: Pt = { x: 250, y: 142 };
  const A = avanzar(E, 205, AE * ESC);
  const C = avanzar(E, 25, EC * ESC);
  const B = avanzar(E, 315, BE * ESC);
  const D = avanzar(E, 135, ED * ESC);

  verificarDistancia("AE = 8", AE * ESC, distancia(A, E));
  verificarDistancia("EC = 3", EC * ESC, distancia(E, C));
  verificarDistancia("DB = 5", BD * ESC, distancia(D, B));
  verificarAngulo("AB ∥ DC", 0, desvioParalelas(A, B, D, C), 0.01);
  verificarDistancia("BE − ED = 25/11", (25 / 11) * ESC, distancia(B, E) - distancia(E, D), 0.01);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C, D], rol: "trazo" },
    { tipo: "linea", de: A, a: C, rol: "trazo" },
    { tipo: "linea", de: B, a: D, rol: "trazo" },
    { tipo: "punto", en: E, rol: "trazo", r: 2.6 },
    rotulo(avanzar(A, 200, 15), "A"),
    rotulo(avanzar(B, -20, 15), "B"),
    rotulo(avanzar(C, 25, 15), "C"),
    rotulo(avanzar(D, 130, 15), "D"),
    { tipo: "texto", en: avanzar(E, -80, 16), texto: "E", rol: "trazo", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + E.x) / 2, y: (A.y + E.y) / 2 }, anguloHacia(A, E) - 90, 14), texto: "8", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar(avanzar(E, anguloHacia(E, C), EC * ESC * 0.62), anguloHacia(E, C) - 90, 15), texto: "3", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (D.x + B.x) / 2, y: (D.y + B.y) / 2 }, anguloHacia(D, B) + 90, 30), texto: "DB = 5", rol: "dato", tam: 11, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(Math.max(A.y, B.y) + 36), pasos: 0, elementos: el };
}

// Amperímetro en serie sobre un tramo de cable: el cable se corta y en el
// hueco va el círculo con su nombre. `frac` lo mueve a lo largo del tramo
// (0.5 = al medio), para poder dejarlo donde lo pone el facsímil.
function amperimetro(de: Pt, a: Pt, etiqueta: string, frac = 0.5): Elemento[] {
  const dir = anguloHacia(de, a);
  const RADIO = 11;
  const centro = avanzar(de, dir, distancia(de, a) * frac);
  return [
    { tipo: "linea", de, a: avanzar(centro, dir, -RADIO), rol: "trazo" },
    { tipo: "linea", de: avanzar(centro, dir, RADIO), a, rol: "trazo" },
    { tipo: "punto", en: centro, r: RADIO, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: { x: centro.x, y: centro.y + 4 }, texto: etiqueta,
      rol: "incognita", color: VIOLETA, tam: 11, negrita: true, ancla: "middle" },
  ];
}

// ── F19 (3er parcial 2-2009) · tres resistores y el puente que los cortocircuita ──
// El transcriptor no tenía la figura y probó combinaciones hasta que una diera
// un número de la lista: se quedó con "los tres en serie" = 10 Ω (opción b). El
// facsímil (página 4, la de Física) muestra otra cosa, y a 600 dpi no deja
// lugar a dudas: hay un CABLE PELADO que sale del nodo posterior al 3 Ω, sube,
// cruza por arriba y baja al nodo posterior al 5 Ω.
// Ese puente pone 0 Ω en paralelo con la serie 2+5, o sea la cortocircuita:
//   Req = 3 + (7 ∥ 0) = 3 Ω  → opción c.
// Y los distractores cierran con esa lectura: 10 es "no vi el puente", 7 es
// "el puente se comió el 3 en lugar del 2 y el 5", 5 es el resistor solo.
function f19tresResistoresPuente(): Figura {
  const Y = 158;          // el riel donde están los tres resistores
  const Y_PUENTE = 74;    // la altura a la que pasa el cable
  const BORNE_IZQ: Pt = { x: 40, y: Y };
  const R3_INI: Pt = { x: 78, y: Y }, R3_FIN: Pt = { x: 146, y: Y };
  const P: Pt = { x: 182, y: Y };                    // pie izquierdo del puente
  const R2_INI: Pt = { x: 214, y: Y }, R2_FIN: Pt = { x: 278, y: Y };
  const R5_INI: Pt = { x: 306, y: Y }, R5_FIN: Pt = { x: 370, y: Y };
  const Q: Pt = { x: 388, y: Y };                    // pie derecho del puente
  const BORNE_DER: Pt = { x: 406, y: Y };

  // Lo único que decide la respuesta es DÓNDE apoyan los pies del puente: si
  // el derecho cayera entre el 2 y el 5, o el izquierdo antes del 3, el
  // resultado cambiaría. Así que se verifica el orden, no las coordenadas.
  const sobra = (a: number, b: number) => Math.max(0, a - b);
  verificarDistancia("el puente arranca después del 3 Ω", 0, sobra(R3_FIN.x + 8, P.x), 0.01);
  verificarDistancia("el puente arranca antes del 2 Ω", 0, sobra(P.x + 8, R2_INI.x), 0.01);
  verificarDistancia("el puente vuelve después del 5 Ω", 0, sobra(R5_FIN.x + 8, Q.x), 0.01);
  verificarDistancia("el puente vuelve antes del borne derecho", 0, sobra(Q.x + 8, BORNE_DER.x), 0.01);

  // Y la cuenta que sale de ese orden, escrita como cuenta y no como número.
  const enParalelo = (a: number, b: number) => (a + b === 0 ? 0 : (a * b) / (a + b));
  verificarDistancia("Req = 3 Ω", 3, 3 + enParalelo(2 + 5, 0), 0.0001);

  const el: Elemento[] = [
    // el riel, en los tramos que no ocupa un resistor
    { tipo: "linea", de: BORNE_IZQ, a: R3_INI, rol: "trazo" },
    { tipo: "linea", de: R3_FIN, a: R2_INI, rol: "trazo" },
    { tipo: "linea", de: R2_FIN, a: R5_INI, rol: "trazo" },
    { tipo: "linea", de: R5_FIN, a: BORNE_DER, rol: "trazo" },
    ...resistencia(R3_INI, R3_FIN, "3 Ω", -1),
    ...resistencia(R2_INI, R2_FIN, "2 Ω", -1),
    ...resistencia(R5_INI, R5_FIN, "5 Ω", -1),

    // el puente: cable, sin nada en el medio
    { tipo: "linea", de: P, a: { x: P.x, y: Y_PUENTE }, rol: "trazo" },
    { tipo: "linea", de: { x: P.x, y: Y_PUENTE }, a: { x: Q.x, y: Y_PUENTE }, rol: "trazo" },
    { tipo: "linea", de: { x: Q.x, y: Y_PUENTE }, a: Q, rol: "trazo" },

    // nodos del puente y bornes abiertos, donde se mide la equivalente
    { tipo: "punto", en: P, r: 3, rol: "trazo" },
    { tipo: "punto", en: Q, r: 3, rol: "trazo" },
    { tipo: "punto", en: BORNE_IZQ, r: 5, rol: "trazo" },
    { tipo: "punto", en: BORNE_DER, r: 5, rol: "trazo" },
  ];

  return { ancho: 420, alto: 210, pasos: 0, elementos: el };
}

// ── F19 (final 2-2014) · el bloque que gira atado a un resorte horizontal ──
// Del facsímil (página 4, Física, F4). La figura pesa más de lo que parece:
// muestra que el resorte y la varilla que lo sostiene son HORIZONTALES,
// enhebrados en el eje vertical AB que gira. Si fuera un péndulo cónico habría
// que meter la gravedad; acá la varilla aguanta el peso y el resorte tira solo
// hacia el eje, así que todo su estirón es fuerza centrípeta.
// Y el radio de giro es el largo ESTIRADO (40 + 10 = 50 cm), no el natural:
//   k·x = m·ω²·r → k(0,10) = 1·10²·0,50 = 50 → k = 500 N/m (opción c).
function f19ejeVerticalResorte(): Figura {
  const NATURAL_CM = 40, ESTIRON_CM = 10, OMEGA = 10, MASA = 1;
  const ESC = 3.6;                                     // px por cm
  const EJE_X = 120;
  const A: Pt = { x: EJE_X, y: 42 };                   // punta de arriba del eje
  const B: Pt = { x: EJE_X, y: 228 };                  // punta de abajo
  const ANCLAJE: Pt = { x: EJE_X, y: 136 };            // donde el resorte agarra el eje
  const radioCm = NATURAL_CM + ESTIRON_CM;             // 50 cm: el resorte está estirado
  const BLOQUE: Pt = { x: EJE_X + radioCm * ESC, y: ANCLAJE.y };
  const FIN_VARILLA: Pt = { x: BLOQUE.x + 30, y: ANCLAJE.y };
  const MEDIO_BLOQUE = 11;
  const CENTRO_GIRO: Pt = { x: EJE_X, y: B.y + 6 };
  const RADIO_GIRO = 26;

  verificarAngulo("el resorte sale perpendicular al eje", 90, anguloEn(ANCLAJE, A, BLOQUE));
  verificarDistancia("el bloque gira a 50 cm del eje", radioCm * ESC, distancia(ANCLAJE, BLOQUE), 0.01);
  verificarDistancia("el anclaje cae entre las dos puntas del eje", 0,
    Math.max(0, A.y - ANCLAJE.y) + Math.max(0, ANCLAJE.y - B.y), 0.01);
  // k = m·ω²·r / x, todo en unidades SI
  verificarDistancia("k = 500 N/m", 500,
    (MASA * OMEGA * OMEGA * (radioCm / 100)) / (ESTIRON_CM / 100), 0.0001);

  const el: Elemento[] = [
    // el eje vertical AB, como la barra angosta que dibuja el facsímil
    { tipo: "poligono", puntos: [
      { x: EJE_X - 6, y: A.y }, { x: EJE_X + 6, y: A.y },
      { x: EJE_X + 6, y: B.y }, { x: EJE_X - 6, y: B.y },
    ], rol: "trazo" },

    // la varilla horizontal enhebrada, que sigue más allá del bloque
    { tipo: "linea", de: ANCLAJE, a: FIN_VARILLA, rol: "trazo" },

    // el resorte, del eje al bloque
    { tipo: "path", d: resistorZigzag(avanzar(ANCLAJE, 0, 6), avanzar(BLOQUE, 180, MEDIO_BLOQUE), 9, 7), rol: "trazo" },

    // el bloque
    { tipo: "poligono", puntos: [
      { x: BLOQUE.x - MEDIO_BLOQUE, y: BLOQUE.y - MEDIO_BLOQUE },
      { x: BLOQUE.x + MEDIO_BLOQUE, y: BLOQUE.y - MEDIO_BLOQUE },
      { x: BLOQUE.x + MEDIO_BLOQUE, y: BLOQUE.y + MEDIO_BLOQUE },
      { x: BLOQUE.x - MEDIO_BLOQUE, y: BLOQUE.y + MEDIO_BLOQUE },
    ], rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: BLOQUE.x, y: BLOQUE.y - MEDIO_BLOQUE - 13 }, texto: "m",
      rol: "dato", color: AMBAR, tam: 13, negrita: true, cursiva: true },

    // la flecha del giro, abrazando la punta de abajo del eje
    { tipo: "arco", d: arcoDe(CENTRO_GIRO, RADIO_GIRO, 200, 340), rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha(avanzar(CENTRO_GIRO, 340, RADIO_GIRO), 70, 8), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: EJE_X + 52, y: B.y + 26 }, texto: "ω",
      rol: "dato", color: AMBAR, tam: 15, negrita: true, cursiva: true },

    rotulo({ x: EJE_X, y: A.y - 14 }, "A"),
    rotulo({ x: EJE_X, y: B.y + 20 }, "B"),
  ];

  return { ancho: 420, alto: 288, pasos: 0, elementos: el };
}

// ── F20 (final 2-2014) · el tazón semiesférico y las dos masas ──
// Del facsímil (página 4, Física, F5). Lo único que el texto no dice y la
// figura sí es DESDE DÓNDE se suelta m₁: está en el BORDE del tazón, o sea a
// una altura R sobre el fondo, y m₂ espera quieta justo en el fondo.
//   baja:   ½m v² = m g R       → v = √(2gR)
//   choque: m v = 2m v'         → v' = v/2   (se pegan)
//   sube:   h = v'²/(2g) = R/4  → opción a.
function f20tazonDosMasas(): Figura {
  const R = 122;
  const O: Pt = { x: 210, y: 56 };            // centro del tazón, al nivel del borde
  const BORDE_IZQ: Pt = { x: O.x - R, y: O.y };
  const BORDE_DER: Pt = { x: O.x + R, y: O.y };
  const FONDO: Pt = { x: O.x, y: O.y + R };
  const FIN_RADIO = avanzar(O, -55, R);       // el radio que dibuja el facsímil, abajo-derecha
  const LADO = 15;

  verificarDistancia("m₁ arranca sobre el tazón", R, distancia(O, BORDE_IZQ), 0.01);
  verificarDistancia("m₂ está sobre el tazón", R, distancia(O, FONDO), 0.01);
  verificarDistancia("el radio dibujado termina sobre el tazón", R, distancia(O, FIN_RADIO), 0.01);
  verificarDistancia("la caída de m₁ vale R", R, FONDO.y - BORDE_IZQ.y, 0.01);
  verificarAngulo("el borde es horizontal y pasa por el centro", 180,
    anguloEn(O, BORDE_IZQ, BORDE_DER), 0.01);

  // El cálculo con números, para que la respuesta no dependa de la prosa.
  const g = 10, RADIO_M = 1;
  const v = Math.sqrt(2 * g * RADIO_M);       // con la que m₁ llega al fondo
  const vPegadas = v / 2;                     // choque perfectamente inelástico, masas iguales
  verificarDistancia("suben R/4", RADIO_M / 4, (vPegadas * vPegadas) / (2 * g), 1e-9);

  const bloque = (centro: Pt): Elemento => ({
    tipo: "poligono",
    puntos: [
      { x: centro.x - LADO / 2, y: centro.y - LADO },
      { x: centro.x + LADO / 2, y: centro.y - LADO },
      { x: centro.x + LADO / 2, y: centro.y },
      { x: centro.x - LADO / 2, y: centro.y },
    ],
    rol: "trazo", relleno: true,
  });

  const el: Elemento[] = [
    // el tazón: la mitad de abajo de la circunferencia, de borde a borde
    { tipo: "path", d: `M ${BORDE_IZQ.x.toFixed(2)} ${BORDE_IZQ.y.toFixed(2)}` + sigueArco(O, R, 180, 360), rol: "trazo" },

    // el radio que marca el facsímil
    { tipo: "linea", de: O, a: FIN_RADIO, rol: "dato", color: AMBAR },
    { tipo: "texto", en: avanzar({ x: (O.x + FIN_RADIO.x) / 2, y: (O.y + FIN_RADIO.y) / 2 }, 35, 16),
      texto: "R", rol: "dato", color: AMBAR, tam: 14, negrita: true, cursiva: true },

    bloque(BORDE_IZQ),
    bloque(FONDO),
    { tipo: "texto", en: { x: BORDE_IZQ.x + 28, y: BORDE_IZQ.y - 8 }, texto: "m₁",
      rol: "dato", color: AMBAR, tam: 13, negrita: true },
    { tipo: "texto", en: { x: FONDO.x + 6, y: FONDO.y - 27 }, texto: "m₂",
      rol: "dato", color: AMBAR, tam: 13, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(FONDO.y + 26), pasos: 0, elementos: el };
}

// ── F20 (final 1-2025) · el circuito de los cinco amperímetros ──
// El transcriptor no tenía la figura y supuso que el extremo lejano de R
// quedaba fijado en 160 V por la otra pila: le salió R = (200−160)/10 = 4 Ω,
// que no está entre las opciones, y marcó E. El facsímil dice otra cosa.
//
// A₄ es un amperímetro IDEAL, o sea un cable: une el nodo donde termina R con
// el negativo de la propia pila de 200 V. Entonces R y esa pila forman un lazo
// cerrado y solo, y el resto del circuito no interviene:
//   R = 200 V / 10 A = 20 Ω  → opción a.
// Del otro lado, la pila de 160 V (ideal, sin resistencia interna) fija su
// nodo: el 40 Ω lleva 4 A, el 20 Ω lleva 8 A, A₃ marca 12 A y A₄ marca
// 10 + 4 = 14 A. Es el circuito clásico del Young & Freedman.
function f20cincoAmperimetros(): Figura {
  const XL = 44;      // rama de la pila de 200 V
  const XA = 152;     // nodo donde termina R y arranca A₄
  const XB = 190;     // el escalón por donde el cable de abajo se va a la derecha
  const XR = 300;     // rama del 40 Ω, A₃ y la pila de 160 V
  const XF = 356;     // rama del 20 Ω
  const Y_ARR = 44;   // riel de arriba, con A₂
  const Y_R = 112;    // riel de R
  const Y_D = 132;    // riel que sale del pie del 40 Ω hacia el 20 Ω
  const Y_PASO = 214; // donde la rama de A₄ dobla hacia el riel de abajo
  const Y_E = 238;    // riel de abajo de la derecha, con A₅
  const Y_ABA = 264;  // riel de abajo de la izquierda

  const codoIzq: Pt = { x: XL, y: Y_R };        // esquina de arriba a la izquierda
  const nodoA: Pt = { x: XA, y: Y_R };          // fin de R = cabeza de A₄
  const nodoB: Pt = { x: XB, y: Y_PASO };       // el nodo común de abajo
  const nodoC: Pt = { x: XR, y: Y_ARR };        // fin del riel de arriba = cabeza del 40 Ω
  const nodoD: Pt = { x: XR, y: Y_D };          // pie del 40 Ω
  const nodoE: Pt = { x: XR, y: Y_E };          // pie de la pila de 160 V

  verificarDistancia("las cinco ramas verticales van en orden", 0,
    Math.max(0, XL - XA) + Math.max(0, XA - XB) + Math.max(0, XB - XR) + Math.max(0, XR - XF), 0.01);
  verificarAngulo("R sale horizontal del codo de la izquierda", 90,
    anguloEn(codoIzq, { x: XL, y: Y_ABA }, nodoA));
  verificarAngulo("el 40 Ω cuelga vertical del riel de arriba", 90,
    anguloEn(nodoC, { x: XA, y: Y_ARR }, nodoD));
  verificarAngulo("el 20 Ω está en la rama vertical de la derecha", 90,
    anguloEn({ x: XF, y: Y_D }, nodoD, { x: XF, y: Y_E }));

  // La cuenta eléctrica, que es la que distingue las dos lecturas posibles de
  // la figura: con A₄ como cable el nodo de R y el negativo de las dos pilas
  // son el MISMO nodo (0 V), y la pila de 160 V fija el suyo en 160 V.
  const Va = 0, Vb = 0, Vd = 160, R_OHM = 20;
  const iR = (200 - Va) / R_OHM;        // por R y por A₁
  const i40 = (Vd - Va) / 40;           // por el 40 Ω y por A₂
  const i20 = (Vd - Vb) / 20;           // por el 20 Ω y por A₅
  verificarDistancia("A₁ marca los 10 A del enunciado", 10, iR, 1e-9);
  verificarDistancia("A₃ = A₂ + A₅ = 12 A", 12, i40 + i20, 1e-9);
  verificarDistancia("A₄ = A₁ + A₂ = 14 A", 14, iR + i40, 1e-9);

  const el: Elemento[] = [
    // ── rama izquierda: A₁, la pila de 200 V y la vuelta por el riel de abajo ──
    ...amperimetro(codoIzq, { x: XL, y: 176 }, "A₁"),
    ...pila({ x: XL, y: 176 }, { x: XL, y: 214 }, "200 V"),
    { tipo: "linea", de: { x: XL, y: 214 }, a: { x: XL, y: Y_ABA }, rol: "trazo" },
    { tipo: "linea", de: { x: XL, y: Y_ABA }, a: { x: XB, y: Y_ABA }, rol: "trazo" },

    // ── R, del codo de arriba al nodo A ──
    { tipo: "linea", de: codoIzq, a: { x: XL + 22, y: Y_R }, rol: "trazo" },
    ...resistencia({ x: XL + 22, y: Y_R }, { x: XA - 6, y: Y_R }, "R", 1),
    { tipo: "linea", de: { x: XA - 6, y: Y_R }, a: nodoA, rol: "trazo" },

    // ── del nodo A para arriba: el riel con A₂ y el 40 Ω bajando ──
    { tipo: "linea", de: nodoA, a: { x: XA, y: Y_ARR }, rol: "trazo" },
    ...amperimetro({ x: XA, y: Y_ARR }, nodoC, "A₂"),
    ...resistencia(nodoC, nodoD, "40,0 Ω", 1, 30),

    // ── del nodo A para abajo: A₄ y el escalón hasta el nodo común ──
    ...amperimetro(nodoA, { x: XA, y: Y_PASO }, "A₄", 0.42),
    { tipo: "linea", de: { x: XA, y: Y_PASO }, a: nodoB, rol: "trazo" },
    { tipo: "linea", de: nodoB, a: { x: XB, y: Y_ABA }, rol: "trazo" },
    // y de ahí a la derecha, con el escaloncito del facsímil, hasta el nodo E
    { tipo: "linea", de: nodoB, a: { x: XB + 26, y: Y_PASO }, rol: "trazo" },
    { tipo: "linea", de: { x: XB + 26, y: Y_PASO }, a: { x: XB + 48, y: Y_E }, rol: "trazo" },
    { tipo: "linea", de: { x: XB + 48, y: Y_E }, a: nodoE, rol: "trazo" },

    // ── rama del medio: A₃ y la pila de 160 V ──
    ...amperimetro(nodoD, { x: XR, y: 190 }, "A₃", 0.55),
    ...pila({ x: XR, y: 190 }, nodoE, "160 V"),

    // ── rama de la derecha: el 20 Ω bajando y A₅ en el riel de abajo ──
    { tipo: "linea", de: nodoD, a: { x: XF, y: Y_D }, rol: "trazo" },
    ...resistencia({ x: XF, y: Y_D }, { x: XF, y: Y_E }, "20,0 Ω", 1, 30),
    ...amperimetro(nodoE, { x: XF, y: Y_E }, "A₅"),
  ];

  for (const n of [nodoA, nodoB, nodoD, nodoE]) el.push({ tipo: "punto", en: n, r: 3, rol: "trazo" });

  return { ancho: 420, alto: 290, pasos: 0, elementos: el };
}

// ── Bloques apilados sobre la mesa, con m₃ colgando de la polea del borde ──
// Del facsímil, y aparece IGUAL en dos exámenes de 2013 (el 2do parcial 2-2013
// F5 y el final 2-2013 F2): m₁ es el cubo de ARRIBA, apoyado sobre m₂, m₂ es el
// que toca la mesa, y la cuerda sale de m₁ —no de m₂— pasa por la polea del
// borde y baja hasta m₃.
// Cuál de los dos va arriba no es un detalle: la normal entre ellos es el peso
// del de arriba, así que cambia la fricción y cambia la respuesta. En el final
// 2-2013, leerlo al revés convertiría la T = 8m₃ (opción C) en un sistema que
// ni arranca.
// El dibujo NO lleva números, y por eso lo pueden compartir las dos preguntas:
// el 2do parcial trae 2 kg / 1 kg / 3 kg y el final trae m₁ = 2m₃ = m₂/5.
function fBloquesApiladosPolea(): Figura {
  const MESA_Y = 168;                 // la cara de arriba de la mesa
  const MESA_X1 = 34, MESA_X2 = 250;  // la tabla, con el borde a la derecha
  const GRUESO_MESA = 8;

  // m₂ apoya en la mesa; m₁ apoya sobre m₂ y es más angosto
  const M2 = { x1: 78, x2: 196, y2: MESA_Y, alto: 34 };
  const M2_Y1 = M2.y2 - M2.alto;
  const M1 = { x1: 104, x2: 172, y2: M2_Y1, alto: 48 };
  const M1_Y1 = M1.y2 - M1.alto;
  const M1_MEDIO_Y = (M1_Y1 + M1.y2) / 2;

  // la polea: la cuerda entra horizontal (tangente arriba) y sale vertical
  // (tangente a la derecha), así que el centro queda a R de las dos rectas
  const R_POLEA = 16;
  const POLEA = { x: 254, y: M1_MEDIO_Y + R_POLEA };
  const CUERDA_X = POLEA.x + R_POLEA;       // la rama vertical
  const SALE_DE_M1: Pt = { x: M1.x2, y: M1_MEDIO_Y };
  const TOCA_POLEA: Pt = { x: POLEA.x, y: M1_MEDIO_Y };

  const M3 = { x1: CUERDA_X - 15, x2: CUERDA_X + 15, y1: 226, alto: 32 };

  verificarDistancia("m₁ apoya justo sobre m₂", 0, Math.abs(M1.y2 - M2_Y1), 0.01);
  verificarDistancia("m₂ apoya justo sobre la mesa", 0, Math.abs(M2.y2 - MESA_Y), 0.01);
  verificarDistancia("m₁ entra entero sobre m₂", 0,
    Math.max(0, M2.x1 - M1.x1) + Math.max(0, M1.x2 - M2.x2), 0.01);
  verificarDistancia("la cuerda sale de m₁ a media altura", 0,
    Math.abs(SALE_DE_M1.y - M1_MEDIO_Y), 0.01);
  verificarDistancia("el tramo horizontal es tangente a la polea", R_POLEA,
    distancia(POLEA, TOCA_POLEA), 0.01);
  verificarDistancia("el tramo vertical es tangente a la polea", R_POLEA,
    distancia(POLEA, { x: CUERDA_X, y: POLEA.y }), 0.01);
  verificarDistancia("m₃ cuelga de la rama vertical", 0,
    Math.abs((M3.x1 + M3.x2) / 2 - CUERDA_X), 0.01);
  verificarAngulo("la cuerda dobla 90° en la polea", 90,
    anguloEn(POLEA, TOCA_POLEA, { x: CUERDA_X, y: POLEA.y }), 0.01);

  const caja = (c: { x1: number; x2: number }, y1: number, y2: number): Pt[] => [
    { x: c.x1, y: y1 }, { x: c.x2, y: y1 }, { x: c.x2, y: y2 }, { x: c.x1, y: y2 },
  ];

  const el: Elemento[] = [
    // la mesa: tabla y una pata cerca del borde
    { tipo: "poligono", puntos: caja({ x1: MESA_X1, x2: MESA_X2 }, MESA_Y, MESA_Y + GRUESO_MESA), rol: "trazo", relleno: true },
    { tipo: "poligono", puntos: caja({ x1: 214, x2: 228 }, MESA_Y + GRUESO_MESA, 246), rol: "trazo", relleno: true },
    ...rayado(MESA_X1, 210, MESA_Y + GRUESO_MESA),

    // los dos bloques de la mesa
    { tipo: "poligono", puntos: caja(M2, M2_Y1, M2.y2), rol: "trazo", relleno: true },
    { tipo: "poligono", puntos: caja(M1, M1_Y1, M1.y2), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: (M2.x1 + M2.x2) / 2, y: (M2_Y1 + M2.y2) / 2 }, texto: "m₂", rol: "dato", color: AMBAR, tam: 13, negrita: true },
    { tipo: "texto", en: { x: (M1.x1 + M1.x2) / 2, y: M1_MEDIO_Y }, texto: "m₁", rol: "dato", color: AMBAR, tam: 13, negrita: true },

    // la cuerda: tramo horizontal, cuarto de vuelta en la polea, tramo vertical
    { tipo: "linea", de: SALE_DE_M1, a: TOCA_POLEA, rol: "trazo" },
    { tipo: "arco", d: arcoDe(POLEA, R_POLEA, 90, 0), rol: "trazo" },
    { tipo: "linea", de: { x: CUERDA_X, y: POLEA.y }, a: { x: CUERDA_X, y: M3.y1 }, rol: "trazo" },
    { tipo: "punto", en: POLEA, r: R_POLEA, rol: "trazo" },
    { tipo: "punto", en: POLEA, r: 2.4, rol: "trazo" },

    // m₃, colgando
    { tipo: "poligono", puntos: caja(M3, M3.y1, M3.y1 + M3.alto), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: (M3.x1 + M3.x2) / 2, y: M3.y1 + M3.alto / 2 }, texto: "m₃", rol: "dato", color: AMBAR, tam: 13, negrita: true },

    { tipo: "texto", en: { x: 150, y: 286 }, texto: "mesa sin fricción", rol: "dato", color: AMBAR, tam: 11, negrita: true },
  ];

  return { ancho: 420, alto: 300, pasos: 0, elementos: el };
}

// ── F18 (2do parcial 1-2025) · la partícula quieta entre las dos placas ──
// Del facsímil (2025-1-preu.pdf, página 8: el 2do parcial de la gestión). La
// figura muestra la placa de ARRIBA negativa y la de ABAJO positiva, el campo
// E apuntando hacia arriba, y sobre la carga las dos fuerzas que se cancelan:
// Eq para arriba y mg para abajo. Ese equilibrio es todo el problema.
//   qE = mg → E = mg/q → V = E·d = (4,0e−13 · 10 · 0,020) / 2,4e−18 ≈ 33,3 kV,
// que no está entre las opciones (10 / 29 / 52 / 69), así que la respuesta es
// E. Los datos se compararon dígito por dígito con el facsímil, porque una
// respuesta "Ninguno" también puede salir de un número mal transcripto.
function f18PlacasParticula(): Figura {
  const X1 = 108, X2 = 328;
  const Y_ARR = 54, Y_ABA = 182;
  const GRUESO = 7;
  const CARGA: Pt = { x: (X1 + X2) / 2, y: (Y_ARR + Y_ABA) / 2 };

  // los datos del enunciado, en SI
  const m = 4.0e-13, q = 2.4e-18, g = 10, d = 0.020;
  verificarDistancia("V = 33,3 kV", 33333.3, (m * g * d) / q, 1);
  verificarDistancia("la carga queda entre las dos placas", 0,
    Math.max(0, Y_ARR + GRUESO - CARGA.y) + Math.max(0, CARGA.y - Y_ABA), 0.01);
  verificarAngulo("las dos placas son paralelas", 0,
    desvioParalelas({ x: X1, y: Y_ARR }, { x: X2, y: Y_ARR },
      { x: X1, y: Y_ABA }, { x: X2, y: Y_ABA }), 0.01);

  const placa = (y: number): Elemento => ({
    tipo: "poligono",
    puntos: [{ x: X1, y }, { x: X2, y }, { x: X2, y: y + GRUESO }, { x: X1, y: y + GRUESO }],
    rol: "trazo", relleno: true,
  });

  const X_CAMPO_IZQ = X1 + 22, X_CAMPO_DER = X2 - 22;
  const signos = (y: number, signo: string): Elemento[] =>
    Array.from({ length: 9 }, (_, i) => X1 + 16 + i * 24)
      .filter((x) => Math.abs(x - X_CAMPO_IZQ) > 13 && Math.abs(x - X_CAMPO_DER) > 13)
      .map((x): Elemento => ({ tipo: "texto", en: { x, y }, texto: signo, rol: "trazo", tam: 13, negrita: true }));

  const flechaCampo = (x: number): Elemento[] => [
    { tipo: "linea", de: { x, y: Y_ABA - 6 }, a: { x, y: Y_ARR + GRUESO + 16 }, rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha({ x, y: Y_ARR + GRUESO + 16 }, 90, 7), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: x - 14, y: CARGA.y }, texto: "E", rol: "dato", color: AMBAR, tam: 12, negrita: true, cursiva: true },
  ];

  const el: Elemento[] = [
    placa(Y_ARR), placa(Y_ABA),
    // los signos de cada placa, como los dibuja el facsímil, salteando las
    // dos columnas por donde sube una flecha de campo
    ...signos(Y_ARR + GRUESO + 11, "−"),
    ...signos(Y_ABA - 11, "+"),

    ...flechaCampo(X_CAMPO_IZQ),
    ...flechaCampo(X_CAMPO_DER),

    // la carga y las dos fuerzas que se cancelan
    { tipo: "punto", en: CARGA, r: 4, rol: "incognita", color: VIOLETA },
    { tipo: "texto", en: { x: CARGA.x - 15, y: CARGA.y }, texto: "+q", rol: "incognita", color: VIOLETA, tam: 12, negrita: true },
    { tipo: "linea", de: avanzar(CARGA, 90, 7), a: avanzar(CARGA, 90, 42), rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(CARGA, 90, 42), 90, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: CARGA.x + 22, y: CARGA.y - 34 }, texto: "Eq", rol: "resultado", color: ROJO, tam: 12, negrita: true, cursiva: true },
    { tipo: "linea", de: avanzar(CARGA, -90, 7), a: avanzar(CARGA, -90, 42), rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(CARGA, -90, 42), -90, 8), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: CARGA.x + 24, y: CARGA.y + 34 }, texto: "mg", rol: "resultado", color: ROJO, tam: 12, negrita: true, cursiva: true },

    ...cota({ x: X2 + 26, y: Y_ARR + GRUESO }, { x: X2 + 26, y: Y_ABA }, "2,0 cm", -24),
  ];

  return { ancho: 420, alto: 220, pasos: 0, elementos: el };
}

// ── F12 (2-2019 1ra opción) · la semiesfera que gira y la esferita adentro ──
// Auditoría de las "invisibles": el enunciado decía que θ se mide "respecto del
// eje vertical", y el facsímil (159_1ra-op-2-2019.pdf, p.2) lo mide **desde la
// horizontal del borde**. El arco de θ está dibujado entre la línea de puntos
// del borde y el radio que baja hasta la esferita.
// La respuesta no cambia (θ no aparece en las opciones), pero la descripción sí
// importa: un alumno que la dibuje desde el texto se queda con 84° donde el
// examen marca 6°, y cualquier paso intermedio que escriba en función de θ le
// sale al revés.
// Con α medido desde el eje: N cos α = mg y N sen α = mω²(R sen α) ⇒ N = mω²R,
// así que cos α = g/(ω²R) = 10/(100·1) = 0,1 y
//   h = R − R cos α = R(1 − 0,1) = 0,9 m  → opción a.
// El θ del dibujo es el complemento: sen θ = 0,1, θ ≈ 5,74°.
function f12SemiesferaGiratoria(): Figura {
  const R = 118;
  const O: Pt = { x: 208, y: 78 };                  // centro de curvatura, al nivel del borde
  const OMEGA = 10, R_M = 1.0, g = 10;
  const cosAlfa = g / (OMEGA * OMEGA * R_M);        // 0,1
  const alfa = (Math.acos(cosAlfa) * 180) / Math.PI;
  const theta = 90 - alfa;                          // lo que marca el facsímil
  const BOLITA = avanzar(O, -theta, R);             // baja hacia la derecha
  const FONDO: Pt = { x: O.x, y: O.y + R };
  const BORDE_IZQ: Pt = { x: O.x - R, y: O.y };
  const BORDE_DER: Pt = { x: O.x + R, y: O.y };

  verificarDistancia("la esferita está sobre la semiesfera", R, distancia(O, BOLITA), 0.01);
  verificarAngulo("θ se mide desde la horizontal del borde", theta,
    anguloEn(O, BORDE_DER, BOLITA), 0.01);
  verificarDistancia("h = 0,9·R medido desde el fondo", 0.9 * R, FONDO.y - BOLITA.y, 0.5);
  // la cuenta del problema, con números
  verificarDistancia("h = 0,9 m", 0.9, R_M * (1 - cosAlfa), 1e-9);

  const arcoTheta = arcoAngulo(O, 0, -theta, 74, 92);
  const X_COTA = BORDE_DER.x + 44;

  const el: Elemento[] = [
    // el tazón
    { tipo: "path", d: `M ${BORDE_IZQ.x.toFixed(2)} ${BORDE_IZQ.y.toFixed(2)}` + sigueArco(O, R, 180, 360), rol: "trazo" },
    // la línea del borde y el eje, de puntos como en el facsímil
    { tipo: "linea", de: { x: BORDE_IZQ.x - 22, y: O.y }, a: { x: BORDE_DER.x + 22, y: O.y }, rol: "aux", punteada: true },
    { tipo: "linea", de: { x: O.x, y: O.y - 46 }, a: FONDO, rol: "aux", punteada: true },

    // el radio hasta la esferita, y el ángulo θ pegado a la horizontal
    { tipo: "linea", de: O, a: BOLITA, rol: "aux", punteada: true },
    { tipo: "arco", d: arcoTheta.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arcoTheta.etiquetaEn, texto: "θ", rol: "dato", color: AMBAR, tam: 12, negrita: true, cursiva: true },

    // la flecha del giro alrededor del eje
    { tipo: "arco", d: arcoDe({ x: O.x, y: O.y - 44 }, 30, 10, 170), rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha(avanzar({ x: O.x, y: O.y - 44 }, 170, 30), 260, 8), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: { x: O.x + 44, y: O.y - 56 }, texto: "ω", rol: "dato", color: AMBAR, tam: 14, negrita: true, cursiva: true },

    { tipo: "punto", en: BOLITA, r: 5, rol: "trazo" },
    { tipo: "punto", en: O, r: 2.2, rol: "aux" },

    // h, del fondo hasta la altura de la esferita
    { tipo: "linea", de: BOLITA, a: { x: X_COTA + 10, y: BOLITA.y }, rol: "aux", punteada: true },
    { tipo: "linea", de: FONDO, a: { x: X_COTA + 10, y: FONDO.y }, rol: "aux", punteada: true },
    ...cota({ x: X_COTA, y: FONDO.y }, { x: X_COTA, y: BOLITA.y }, "h", 16),
  ];

  return { ancho: 420, alto: Math.round(FONDO.y + 26), pasos: 0, elementos: el };
}

// ── F10 (2-2019 2da opción) · las dos poleas compuestas que se tocan ──
// Auditoría de las "invisibles": el enunciado decía que "una correa conecta los
// radios externos", y el facsímil (160_2da-op-2-2019.pdf, p.2) muestra los dos
// rodetes externos EN CONTACTO, sin correa.
// No es un detalle cosmético: con una correa las dos poleas girarían en el
// MISMO sentido, y en contacto giran al REVÉS una de la otra. El dibujo saca la
// cuerda de A por la izquierda de su polea y la de B por la derecha de la suya
// justo por eso: girando opuesto, las dos suben. Con la correa del texto, ese
// mismo dibujo tendría a un bloque subiendo y al otro bajando.
// El número no cambia, porque la condición de rodadura sin resbalar es la misma
// que la de la correa: ω₁·20 = ω₂·10.
//   ω₁ = 10/0,05 = 200 rad/s → ω₂ = 400 rad/s → v_B = 400·0,05 = 20 m/s (d).
function f10DosPoleasCompuestas(): Figura {
  const R1 = 78, R2 = 46;              // los externos, 20 y 10 (a escala del dibujo)
  const r1 = 24, r2 = 20;              // los internos, 5 y 5
  const O1: Pt = { x: 128, y: 96 };
  const O2: Pt = { x: O1.x + R1 + R2, y: O1.y };   // se tocan: la distancia es R1+R2
  const Y_BLOQUE = 246;
  const CUERDA_A = O1.x - r1;          // sale por la IZQUIERDA de la polea chica
  const CUERDA_B = O2.x + r2;          // sale por la DERECHA de la otra

  verificarDistancia("los dos rodetes externos se tocan", R1 + R2, distancia(O1, O2), 0.01);
  verificarDistancia("el punto de contacto está sobre la línea de centros", 0,
    Math.abs(avanzar(O1, 0, R1).x - avanzar(O2, 180, R2).x), 0.01);
  verificarDistancia("A cuelga por la izquierda y B por la derecha", 0,
    Math.max(0, CUERDA_A - O1.x) + Math.max(0, O2.x - CUERDA_B), 0.01);
  // la cuenta: rodadura sin resbalar en el contacto, y cada bloque en su radio interno
  const w1 = 10 / 0.05, w2 = (w1 * 0.20) / 0.10;
  verificarDistancia("v_B = 20 m/s", 20, w2 * 0.05, 1e-9);

  const bloque = (x: number, etiqueta: string, ladoTexto: number): Elemento[] => [
    { tipo: "linea", de: { x, y: O1.y }, a: { x, y: Y_BLOQUE }, rol: "trazo" },
    { tipo: "poligono", puntos: [
      { x: x - 17, y: Y_BLOQUE }, { x: x + 17, y: Y_BLOQUE },
      { x: x + 17, y: Y_BLOQUE + 24 }, { x: x - 17, y: Y_BLOQUE + 24 },
    ], rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: x + 32 * ladoTexto, y: Y_BLOQUE + 12 }, texto: etiqueta, rol: "dato", color: AMBAR, tam: 13, negrita: true },
  ];

  const radioRotulado = (O: Pt, r: number, ang: number, etiqueta: string): Elemento[] => [
    { tipo: "linea", de: O, a: avanzar(O, ang, r), rol: "dato", color: AMBAR },
    { tipo: "path", d: cabezaFlecha(avanzar(O, ang, r), ang, 6), rol: "dato", color: AMBAR, relleno: true },
    { tipo: "texto", en: avanzar(O, ang, r + 14), texto: etiqueta, rol: "dato", color: AMBAR, tam: 11.5, negrita: true },
  ];

  const el: Elemento[] = [
    // los cuatro rodetes
    { tipo: "path", d: circuloPath(O1, R1), rol: "trazo" },
    { tipo: "path", d: circuloPath(O1, r1), rol: "trazo" },
    { tipo: "path", d: circuloPath(O2, R2), rol: "trazo" },
    { tipo: "path", d: circuloPath(O2, r2), rol: "trazo" },
    // la línea de centros, que pasa por el contacto
    { tipo: "linea", de: O1, a: O2, rol: "aux", punteada: true },
    { tipo: "punto", en: O1, r: 2.6, rol: "trazo" },
    { tipo: "punto", en: O2, r: 2.6, rol: "trazo" },
    { tipo: "punto", en: avanzar(O1, 0, R1), r: 3, rol: "resultado", color: ROJO },

    ...radioRotulado(O1, R1, 52, "20"),
    ...radioRotulado(O1, r1, 128, "5"),
    ...radioRotulado(O2, R2, 52, "10"),
    ...radioRotulado(O2, r2, 128, "5"),

    ...bloque(CUERDA_A, "A", -1),
    ...bloque(CUERDA_B, "B", 1),

    { tipo: "texto", en: { x: avanzar(O1, 0, R1).x, y: O1.y + R1 + 22 }, texto: "se tocan sin resbalar", rol: "resultado", color: ROJO, tam: 10.5, negrita: true },
  ];

  return { ancho: 420, alto: Y_BLOQUE + 46, pasos: 0, elementos: el };
}

// ── G5 (2-2018 1ra opción) · el perímetro del △ABC, con A, C y D alineados ──
// Auditoría de las "invisibles": el paréntesis describía bien los puntos y las
// medidas, pero se olvidaba el dato que hace que el problema TENGA solución:
// que A, C y D están sobre una misma recta (el "60" es el tramo C→D de esa
// recta, que sale de A). Sin esa condición, BC puede valer cualquier cosa y el
// perímetro queda indeterminado; se verificó algebraicamente.
// Con la colinealidad todo se cierra solo:
//   BF = √(13² − 12²) = 5 ;  AB ∥ DE con |DE| = 52 = 4·13 ⇒ D está 20 a la
//   izquierda de E y 48 abajo ;  CD = 60 ⇒ CE = 56 ;  y A-C-D alineados fija
//   BC = 14, con lo que AC = √(9² + 12²) = 15.
//   Perímetro = 13 + 14 + 15 = 42 (opción A).
function g5PerimetroAbcColineal(): Figura {
  const ESC = 5.15;
  const X0 = 26, Y0 = 92;                       // B en pantalla
  const P = (x: number, y: number): Pt => ({ x: X0 + x * ESC, y: Y0 - y * ESC });

  const B = P(0, 0);
  const F = P(5, 0);
  const A = P(5, 12);
  const C = P(14, 0);
  const E = P(70, 0);
  const D = P(50, -48);

  verificarDistancia("AB = 13", 13 * ESC, distancia(A, B), 0.01);
  verificarDistancia("AF = 12", 12 * ESC, distancia(A, F), 0.01);
  verificarAngulo("AF ⊥ BC", 90, anguloEn(F, A, C), 0.01);
  verificarDistancia("CD = 60", 60 * ESC, distancia(C, D), 0.01);
  verificarDistancia("DE = 52", 52 * ESC, distancia(D, E), 0.01);
  verificarAngulo("AB ∥ DE", 0, desvioParalelas(A, B, D, E), 0.01);
  // el dato que faltaba en el texto, y sin el cual no hay respuesta
  verificarAngulo("A, C y D están alineados", 0, desvioParalelas(A, C, C, D), 0.01);
  verificarDistancia("perímetro = 42",
    42 * ESC, distancia(A, B) + distancia(B, C) + distancia(C, A), 0.01);

  const el: Elemento[] = [
    // la recta horizontal con B, F, C, E
    { tipo: "linea", de: avanzar(B, 180, 16), a: avanzar(E, 0, 16), rol: "trazo" },
    // el triángulo ABC, que es lo que se pide
    { tipo: "linea", de: A, a: B, rol: "resalte" },
    { tipo: "linea", de: B, a: C, rol: "resalte" },
    { tipo: "linea", de: C, a: A, rol: "resalte" },
    { tipo: "linea", de: A, a: B, rol: "trazo" },
    { tipo: "linea", de: B, a: C, rol: "trazo" },
    // la recta que sale de A, pasa por C y sigue hasta D: es el dato clave
    { tipo: "linea", de: A, a: D, rol: "trazo" },
    { tipo: "linea", de: D, a: E, rol: "trazo" },
    // la altura AF, con su cuadradito
    { tipo: "linea", de: A, a: F, rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(F, anguloHacia(F, A), anguloHacia(F, C), 9), rol: "trazo" },

    { tipo: "texto", en: avanzar({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, 160, 15), texto: "13", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + F.x) / 2, y: (A.y + F.y) / 2 }, 0, 13), texto: "12", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (C.x + D.x) / 2, y: (C.y + D.y) / 2 }, anguloHacia(C, D) + 90, 16), texto: "60", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (D.x + E.x) / 2, y: (D.y + E.y) / 2 }, anguloHacia(D, E) - 90, 16), texto: "52", rol: "dato", color: AMBAR, tam: 12, negrita: true },

    rotulo(avanzar(A, 90, 14), "A"),
    rotulo(avanzar(B, 200, 14), "B"),
    rotulo(avanzar(F, -90, 14), "F"),
    rotulo(avanzar(C, 70, 15), "C"),
    rotulo(avanzar(E, 20, 15), "E"),
    rotulo(avanzar(D, -80, 15), "D"),
  ];

  return { ancho: 420, alto: Math.round(D.y + 32), pasos: 0, elementos: el };
}

// ── G5/G6 (1-2015 1ra y 2da opción) · el rombo dentro del triángulo 3-4 ──
// Auditoría de las "invisibles": el enunciado quedó en "en un triángulo
// rectángulo de lados 3 y 4 se construye un rombo", y así no se puede resolver:
// hay infinitos rombos ahí adentro. El facsímil dice CUÁL.
// Es el paralelogramo que tiene dos lados HORIZONTALES y los otros dos
// PARALELOS A LA HIPOTENUSA, con un vértice en el cateto vertical y otro en el
// vértice inferior derecho del triángulo. Que sea rombo (cuatro lados iguales)
// es lo que lo fija:
//   con la altura k, el lado horizontal mide 4 − 4k/3 y el oblicuo 5k/3;
//   igualándolos, 9k/3 = 4 ⇒ k = 4/3 y el lado sale 20/9.
//   área = (20/9)(4/3) = 80/27 (opción d del 1ra)
//   perímetro = 4(20/9) = 80/9, que NO está entre las opciones del 2da
//   —el examen repitió ahí la lista del área, todas sobre 27— así que va E.
// El mismo dibujo sirve para las dos preguntas porque no lleva el resultado.
function g5RomboEnTriangulo34(): Figura {
  const ESC = 86;
  const X0 = 44, Y0 = 44;
  const P = (x: number, y: number): Pt => ({ x: X0 + x * ESC, y: Y0 + (3 - y) * ESC });

  const O = P(0, 0);            // el ángulo recto
  const T = P(0, 3);            // punta del cateto vertical
  const C = P(4, 0);            // punta del cateto horizontal
  const k = 4 / 3, lado = 20 / 9;
  const R1 = P(0, k);           // sobre el cateto vertical
  const R2 = P(4 - (4 * k) / 3, k);  // sobre la hipotenusa
  const R3 = C;                 // el vértice de abajo a la derecha
  const R4 = P((4 * k) / 3, 0); // sobre el cateto horizontal

  verificarAngulo("el triángulo es rectángulo en O", 90, anguloEn(O, T, C), 0.01);
  verificarDistancia("cateto vertical 3", 3 * ESC, distancia(O, T), 0.01);
  verificarDistancia("cateto horizontal 4", 4 * ESC, distancia(O, C), 0.01);
  for (const [n, a, b] of [["R1R2", R1, R2], ["R2R3", R2, R3], ["R3R4", R3, R4], ["R4R1", R4, R1]] as [string, Pt, Pt][]) {
    verificarDistancia(`el lado ${n} mide 20/9`, lado * ESC, distancia(a, b), 0.01);
  }
  verificarAngulo("R2R3 va paralelo a la hipotenusa", 0, desvioParalelas(R2, R3, T, C), 0.01);
  verificarAngulo("R4R1 va paralelo a la hipotenusa", 0, desvioParalelas(R4, R1, T, C), 0.01);
  verificarDistancia("R2 cae sobre la hipotenusa", 0,
    Math.abs(distancia(T, R2) + distancia(R2, C) - distancia(T, C)), 0.5);
  verificarDistancia("área = 80/27", 80 / 27, (20 / 9) * (4 / 3), 1e-9);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [R1, R2, R3, R4], rol: "resalte", relleno: true },
    { tipo: "poligono", puntos: [O, T, C], rol: "trazo" },
    { tipo: "poligono", puntos: [R1, R2, R3, R4], rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(O, anguloHacia(O, T), anguloHacia(O, C), 11), rol: "trazo" },
    { tipo: "texto", en: avanzar({ x: (O.x + T.x) / 2, y: (O.y + T.y) / 2 }, 180, 16), texto: "3", rol: "dato", color: AMBAR, tam: 13, negrita: true },
    { tipo: "texto", en: avanzar({ x: (O.x + C.x) / 2, y: (O.y + C.y) / 2 }, -90, 17), texto: "4", rol: "dato", color: AMBAR, tam: 13, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(Y0 * 2 + 3 * ESC), pasos: 0, elementos: el };
}

// ── G8 (1-2015 2da opción) · el cuadrado sobre la hipotenusa y la distancia AB ──
// Auditoría de las "invisibles": este es el caso más crudo. Al enunciado le
// sacaron el "ver figura" y quedó preguntando por "la distancia AB" sin que A
// ni B aparezcan en ninguna parte del texto. Era irresoluble tal como estaba.
// El facsímil: triángulo rectángulo isósceles de catetos 2, con el ángulo recto
// en A; sobre la hipotenusa se levanta un cuadrado hacia afuera, y B es el
// vértice del cuadrado vecino al extremo del cateto horizontal.
// Con A en el origen, los catetos llegan a (0,2) y (2,0); el cuadrado tiene lado
// 2√2 y B queda en (4,2), así que AB = √(16+4) = 2√5 (opción b).
function g8CuadradoSobreHipotenusa(): Figura {
  const ESC = 62;
  const X0 = 96, Y0 = 34;
  const P = (x: number, y: number): Pt => ({ x: X0 + x * ESC, y: Y0 + (4 - y) * ESC });

  const A = P(0, 0);            // el ángulo recto
  const Q1 = P(0, 2);           // punta del cateto vertical
  const Q2 = P(2, 0);           // punta del cateto horizontal
  const B = P(4, 2);            // vértice del cuadrado, el que el examen llama B
  const S = P(2, 4);            // el cuarto vértice del cuadrado

  verificarAngulo("el ángulo recto está en A", 90, anguloEn(A, Q1, Q2), 0.01);
  verificarDistancia("los dos catetos miden 2", distancia(A, Q1), distancia(A, Q2), 0.01);
  verificarDistancia("cateto = 2", 2 * ESC, distancia(A, Q1), 0.01);
  const ladoCuadrado = distancia(Q1, Q2);
  for (const [n, a, b] of [["Q2B", Q2, B], ["BS", B, S], ["SQ1", S, Q1]] as [string, Pt, Pt][]) {
    verificarDistancia(`el lado ${n} del cuadrado`, ladoCuadrado, distancia(a, b), 0.01);
  }
  verificarAngulo("el cuadrado tiene ángulo recto en Q2", 90, anguloEn(Q2, Q1, B), 0.01);
  verificarAngulo("el cuadrado tiene ángulo recto en B", 90, anguloEn(B, Q2, S), 0.01);
  verificarDistancia("el cuadrado queda del lado opuesto a A", 0,
    Math.max(0, distancia(A, { x: (Q1.x + Q2.x) / 2, y: (Q1.y + Q2.y) / 2 })
      - distancia(A, { x: (B.x + S.x) / 2, y: (B.y + S.y) / 2 })), 0.01);
  verificarDistancia("AB = 2√5", 2 * Math.sqrt(5) * ESC, distancia(A, B), 0.01);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [Q1, Q2, B, S], rol: "trazo" },
    { tipo: "poligono", puntos: [A, Q1, Q2], rol: "trazo" },
    { tipo: "linea", de: A, a: B, rol: "incognita", grosor: 2 },
    { tipo: "cuadradoRecto", d: cuadradoRecto(A, anguloHacia(A, Q1), anguloHacia(A, Q2), 10), rol: "trazo" },
    { tipo: "texto", en: avanzar({ x: (A.x + Q1.x) / 2, y: (A.y + Q1.y) / 2 }, 180, 14), texto: "2", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + Q2.x) / 2, y: (A.y + Q2.y) / 2 }, -90, 15), texto: "2", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    rotulo(avanzar(A, 200, 15), "A"),
    rotulo(avanzar(B, 20, 15), "B"),
  ];

  return { ancho: 420, alto: Math.round(Y0 * 2 + 4 * ESC), pasos: 0, elementos: el };
}

// ── G7 (1-2015 1ra opción) · las dos circunferencias iguales en el cuadrado ──
// Del facsímil: van sobre la DIAGONAL, una metida en la esquina de abajo a la
// izquierda y la otra en la de arriba a la derecha, tangentes entre sí y cada
// una tangente a los dos lados de su esquina.
//   con lado L: √2(L − 2r) = 2r ⇒ r = √2·L / (2(1+√2)), y con L = 1+√2 queda
//   r = √2/2, así que el perímetro de las DOS es 2·2πr = 2√2·π ≈ 2,83π.
// Ninguna opción (π, 2π, 3π, 2,5π) coincide, y por eso la respuesta es E.
function g7DosCirculosEnCuadrado(): Figura {
  const LADO = 1 + Math.SQRT2;
  const r = Math.SQRT2 / 2;
  const ESC = 104;
  const X0 = 108, Y0 = 26;
  const P = (x: number, y: number): Pt => ({ x: X0 + x * ESC, y: Y0 + (LADO - y) * ESC });

  const esquinas = [P(0, 0), P(LADO, 0), P(LADO, LADO), P(0, LADO)];
  const C1 = P(r, r);
  const C2 = P(LADO - r, LADO - r);
  const R = r * ESC;

  verificarDistancia("las dos se tocan", 2 * R, distancia(C1, C2), 0.01);
  verificarDistancia("la de abajo toca el lado de abajo", R, Math.abs(P(0, 0).y - C1.y), 0.01);
  verificarDistancia("la de abajo toca el lado izquierdo", R, Math.abs(C1.x - P(0, 0).x), 0.01);
  verificarDistancia("la de arriba toca el lado de arriba", R, Math.abs(C2.y - P(0, LADO).y), 0.01);
  verificarDistancia("la de arriba toca el lado derecho", R, Math.abs(P(LADO, 0).x - C2.x), 0.01);
  verificarAngulo("los dos centros van sobre la diagonal", 0,
    desvioParalelas(P(0, 0), P(LADO, LADO), C1, C2), 0.01);
  verificarDistancia("el perímetro de las dos es 2√2·π",
    2 * Math.SQRT2 * Math.PI, 2 * (2 * Math.PI * r), 1e-9);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: esquinas, rol: "trazo" },
    { tipo: "linea", de: P(0, 0), a: P(LADO, LADO), rol: "aux", punteada: true },
    { tipo: "path", d: circuloPath(C1, R), rol: "trazo" },
    { tipo: "path", d: circuloPath(C2, R), rol: "trazo" },
    { tipo: "punto", en: C1, r: 2.4, rol: "trazo" },
    { tipo: "punto", en: C2, r: 2.4, rol: "trazo" },
    { tipo: "texto", en: avanzar({ x: (esquinas[0].x + esquinas[1].x) / 2, y: esquinas[0].y }, -90, 17),
      texto: "√2 + 1", rol: "dato", color: AMBAR, tam: 12, negrita: true },
  ];

  return { ancho: 420, alto: Math.round(Y0 * 2 + LADO * ESC), pasos: 0, elementos: el };
}

// ── G5 (2-2018 1ra opción) · el mismo dibujo, pidiendo el perímetro del △CDE ──
// Es LA MISMA figura que la del `2018-1op-2` P5 (se compararon las dos imágenes
// del facsímil antes de darlo por hecho): mismos puntos, mismas posiciones. Lo
// que cambia es qué segmentos están acotados y qué triángulo se pide.
//   allá: AB = 13, AF = 12, CD = 60, DE = 52 → perímetro del △ABC = 42
//   acá:  AB = 13, AC = 15, DF = 48, DE = 52 → perímetro del △CDE = 168
// Por eso no se comparte el constructor: el dibujo es el mismo pero los rótulos
// son otros, y una figura que muestre cotas que el enunciado no da enseña mal.
// Y arrastra el mismo hueco: el paréntesis no decía que **A, C y D están
// alineados**, sin lo cual no hay forma de llegar a DC.
//   △ABC ∼ △DEC con razón AB/DE = 13/52 = 1/4 ⇒ DC = 4·AC = 60
//   DF ⊥ CE ⇒ FE = √(52²−48²) = 20 y FC = √(60²−48²) = 36, así que CE = 56
//   perímetro = 60 + 52 + 56 = 168 (opción D)
function g5PerimetroCdeColineal(): Figura {
  const ESC = 5.15;
  const X0 = 26, Y0 = 92;
  const P = (x: number, y: number): Pt => ({ x: X0 + x * ESC, y: Y0 - y * ESC });

  const B = P(0, 0);
  const A = P(5, 12);
  const C = P(14, 0);
  const F = P(50, 0);          // acá el pie de la perpendicular es el de D
  const E = P(70, 0);
  const D = P(50, -48);

  verificarDistancia("AB = 13", 13 * ESC, distancia(A, B), 0.01);
  verificarDistancia("AC = 15", 15 * ESC, distancia(A, C), 0.01);
  verificarDistancia("DF = 48", 48 * ESC, distancia(D, F), 0.01);
  verificarDistancia("DE = 52", 52 * ESC, distancia(D, E), 0.01);
  verificarAngulo("DF ⊥ CE", 90, anguloEn(F, D, E), 0.01);
  verificarAngulo("AB ∥ DE", 0, desvioParalelas(A, B, D, E), 0.01);
  verificarAngulo("A, C y D están alineados", 0, desvioParalelas(A, C, C, D), 0.01);
  verificarDistancia("DC = 60", 60 * ESC, distancia(D, C), 0.01);
  verificarDistancia("CE = 56", 56 * ESC, distancia(C, E), 0.01);
  verificarDistancia("perímetro del △CDE = 168",
    168 * ESC, distancia(C, D) + distancia(D, E) + distancia(E, C), 0.01);

  const el: Elemento[] = [
    { tipo: "linea", de: avanzar(B, 180, 16), a: avanzar(E, 0, 16), rol: "trazo" },
    // el triángulo que se pide, resaltado
    { tipo: "linea", de: C, a: D, rol: "resalte" },
    { tipo: "linea", de: D, a: E, rol: "resalte" },
    { tipo: "linea", de: E, a: C, rol: "resalte" },
    { tipo: "linea", de: A, a: B, rol: "trazo" },
    { tipo: "linea", de: A, a: D, rol: "trazo" },
    { tipo: "linea", de: D, a: E, rol: "trazo" },
    { tipo: "linea", de: D, a: F, rol: "trazo" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(F, anguloHacia(F, D), anguloHacia(F, E), 9), rol: "trazo" },

    { tipo: "texto", en: avanzar({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, 160, 15), texto: "13", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 }, 20, 15), texto: "15", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (D.x + F.x) / 2, y: (D.y + F.y) / 2 }, 180, 15), texto: "48", rol: "dato", color: AMBAR, tam: 12, negrita: true },
    { tipo: "texto", en: avanzar({ x: (D.x + E.x) / 2, y: (D.y + E.y) / 2 }, anguloHacia(D, E) - 90, 16), texto: "52", rol: "dato", color: AMBAR, tam: 12, negrita: true },

    rotulo(avanzar(A, 90, 14), "A"),
    rotulo(avanzar(B, 200, 14), "B"),
    rotulo(avanzar(C, 70, 15), "C"),
    rotulo(avanzar(F, 60, 15), "F"),
    rotulo(avanzar(E, 20, 15), "E"),
    rotulo(avanzar(D, -80, 15), "D"),
  ];

  return { ancho: 420, alto: Math.round(D.y + 32), pasos: 0, elementos: el };
}

// ── Lote 2-2005 1ra opción (facsímil 052_ExamenAdmisionPrimeraOpcion2-2005.pdf, pág. 2, 600 dpi) ──

// Trazo punteado sobre una poligonal: un tramo sí y uno no (el "path" no
// soporta `punteada`).
function punteadoPor(pts: Pt[], rol: Rol, color?: string): Elemento[] {
  const el: Elemento[] = [];
  for (let i = 0; i + 1 < pts.length; i += 2) {
    el.push({ tipo: "linea", de: pts[i], a: pts[i + 1], rol, ...(color ? { color } : {}) });
  }
  return el;
}

// Punto de una elipse de semiejes (rx, ry): así se ve en perspectiva una
// circunferencia horizontal. phi = 90° es el lado de ATRÁS (arriba en el dibujo).
function enElipse(O: Pt, rx: number, ry: number, phi: number): Pt {
  return { x: O.x + rx * Math.cos((phi * Math.PI) / 180), y: O.y - ry * Math.sin((phi * Math.PI) / 180) };
}

function elipsePath(O: Pt, rx: number, ry: number): string {
  return `M ${(O.x - rx).toFixed(2)} ${O.y.toFixed(2)} A ${rx} ${ry} 0 1 0 ${(O.x + rx).toFixed(2)} ${O.y.toFixed(2)} A ${rx} ${ry} 0 1 0 ${(O.x - rx).toFixed(2)} ${O.y.toFixed(2)} Z`;
}

// Flecha de cota vertical con punta en los dos extremos.
function cotaVertical(x: number, y1: number, y2: number, rol: Rol): Elemento[] {
  return [
    { tipo: "linea", de: { x, y: y1 }, a: { x, y: y2 }, rol, grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x, y: Math.min(y1, y2) }, 90, 7), rol, relleno: true },
    { tipo: "path", d: cabezaFlecha({ x, y: Math.max(y1, y2) }, -90, 7), rol, relleno: true },
  ];
}

// F17 · montaña rusa semicircular, carrito en la cima. El facsímil muestra la
// semicircunferencia apoyada en sus dos extremos, el carrito arriba por FUERA
// del carril y el radio punteado desde el centro hacia arriba a la izquierda.
// En la cima el carril solo puede empujar hacia afuera: en el límite N = 0,
// mg = mv²/R, v = √(gR) = √900 = 30 m/s (C).
function f17montanaSemicircular(): Figura {
  const R = 130;
  const C: Pt = { x: 210, y: 176 };
  const cima = avanzar(C, 90, R);
  const carrito = bloqueSobre(cima, 0, 52, 24);
  const apoyo: Pt = { x: (carrito[0].x + carrito[1].x) / 2, y: (carrito[0].y + carrito[1].y) / 2 };
  const techo: Pt = { x: (carrito[2].x + carrito[3].x) / 2, y: (carrito[2].y + carrito[3].y) / 2 };
  const pieIzq = avanzar(C, 180, R);
  const pieDer = avanzar(C, 0, R);
  const finRadio = avanzar(C, 135, R);
  const medioRadio = avanzar(C, 135, R / 2);

  // Lo que el problema necesita de la figura: el carrito va por AFUERA.
  verificarDistancia("la base del carrito apoya en el carril", R, distancia(C, apoyo), 0.5);
  if (distancia(C, techo) <= R) throw new Error("Figura inconsistente: el carrito quedó por dentro del carril");
  verificarDistancia("la semicircunferencia apoya en el suelo", 0, Math.abs(pieIzq.y - pieDer.y) + Math.abs(pieIzq.y - C.y), 0.5);

  const el: Elemento[] = [
    { tipo: "path", d: arcoDe(C, R, 0, 180), rol: "trazo" },
    { tipo: "linea", de: { x: pieIzq.x - 18, y: C.y }, a: { x: pieIzq.x + 18, y: C.y }, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: { x: pieDer.x - 18, y: C.y }, a: { x: pieDer.x + 18, y: C.y }, rol: "trazo", grosor: 2 },
    ...rayado(pieIzq.x - 18, pieIzq.x + 18, C.y),
    ...rayado(pieDer.x - 18, pieDer.x + 18, C.y),
    { tipo: "poligono", puntos: carrito, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "punto", en: C, rol: "trazo", r: 2.4 },
    { tipo: "linea", de: C, a: finRadio, rol: "dato", punteada: true },
    { tipo: "texto", en: avanzar(medioRadio, 45, 12), texto: "R = 90 m", rol: "dato", tam: 13, negrita: true, ancla: "start" },
  ];
  return { ancho: 420, alto: C.y + 24, pasos: 0, elementos: el };
}

// F18 · disco con un orificio, la bala sale por él y vuelve a entrar por el
// mismo orificio. El facsímil (600 dpi) dibuja el orificio en DOS lugares
// diametralmente opuestos unidos por su recorrido punteado por atrás: mientras
// la bala vuela, el disco da MEDIA vuelta. t = 2·v0y/g = 2π s y ω·t = π, así
// que ω = 1/2 rad/s (D). El banco decía A (1 rad/s, vuelta entera): esa lectura
// es la del texto solo, el dibujo dice otra cosa.
function f18discoOrificio(): Figura {
  const O: Pt = { x: 252, y: 142 };
  const A = 190, B = 52;                  // el disco visto en perspectiva
  const RA = 0.78 * A, RB = 0.78 * B;     // la circunferencia que recorre el orificio
  const PHI_ENTRA = 180;
  const GIRO = -180;                      // media vuelta, por atrás (horario visto desde arriba)
  const H = 118;                          // flecha de la parábola, en px

  const E = enElipse(O, RA, RB, PHI_ENTRA);
  const X = enElipse(O, RA, RB, PHI_ENTRA + GIRO);
  const recorrido: Pt[] = [];
  for (let i = 0; i <= 36; i++) recorrido.push(enElipse(O, RA, RB, PHI_ENTRA + (GIRO * i) / 36));

  verificarDistancia("entrada y salida diametralmente opuestas", 0, distancia({ x: (E.x + X.x) / 2, y: (E.y + X.y) / 2 }, O), 0.5);
  verificarDistancia("el recorrido del orificio termina donde vuelve a entrar la bala", 0, distancia(recorrido[recorrido.length - 1], X), 0.5);
  if (recorrido[18].y >= O.y) throw new Error("Figura inconsistente: el orificio debería pasar por detrás del disco");

  // La parábola de la bala, de un orificio al otro.
  const parabola: Pt[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    parabola.push({ x: E.x + (X.x - E.x) * t, y: E.y - 4 * H * t * (1 - t) });
  }
  verificarDistancia("la bala vuelve a entrar por el orificio", 0, distancia(parabola[parabola.length - 1], X), 0.5);

  const angV0 = (Math.atan2(4 * H, X.x - E.x) * 180) / Math.PI;
  const puntaV0 = avanzar(E, angV0, 62);
  verificarAngulo("v₀ tangente a la parábola", anguloHacia(E, parabola[1]), angV0, 1.5);
  const puntaV0y: Pt = { x: E.x, y: puntaV0.y };

  // Sentido de giro: el frente del disco se mueve al revés que el fondo. La
  // flecha de ω va por delante; el orificio, por detrás, de E hacia X.
  const sentido = Math.sign(GIRO);
  const flecha: Pt[] = [];
  for (let i = 0; i <= 12; i++) flecha.push(enElipse(O, 0.55 * A, 1.32 * B, 270 - 20 * sentido + (40 * sentido * i) / 12));
  const ini = flecha[0], fin = flecha[flecha.length - 1];
  if (Math.sign(fin.x - ini.x) !== -Math.sign(X.x - E.x)) {
    throw new Error("Figura inconsistente: la flecha de ω gira al revés que el recorrido del orificio");
  }

  const disco: Pt[] = [];
  for (let i = 0; i < 72; i++) disco.push(enElipse(O, A, B, i * 5));

  const el: Elemento[] = [
    { tipo: "poligono", puntos: disco, rol: "trazo", relleno: true, rellenoColor: "#e6e6ee" },
    ...punteadoPor(recorrido, "trazo"),
    { tipo: "path", d: elipsePath(E, 8, 3.5), rol: "trazo" },
    { tipo: "path", d: elipsePath(X, 8, 3.5), rol: "trazo" },
    // la parábola arranca donde termina la flecha de v₀, para no encimarse
    ...punteadoPor(parabola.filter((p) => distancia(p, E) > 66), "trazo"),
    // v0 tangente a la trayectoria y su componente vertical (el dato)
    { tipo: "linea", de: E, a: puntaV0, rol: "trazo", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(puntaV0, angV0, 8), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: puntaV0.x + 4, y: puntaV0.y - 14 }, texto: "v₀", rol: "trazo", tam: 13, negrita: true },
    { tipo: "linea", de: E, a: puntaV0y, rol: "dato", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(puntaV0y, 90, 7), rol: "dato", relleno: true },
    { tipo: "linea", de: puntaV0y, a: puntaV0, rol: "dato", punteada: true, grosor: 1 },
    { tipo: "texto", en: { x: E.x - 8, y: puntaV0y.y - 4 }, texto: "v₀y = 10π m/s", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    // ω, por delante del disco
    { tipo: "path", d: `M ${flecha.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ")}`, rol: "incognita" },
    { tipo: "path", d: cabezaFlecha(fin, anguloHacia(flecha[flecha.length - 2], fin), 8), rol: "incognita", relleno: true },
    { tipo: "texto", en: { x: fin.x - 16, y: fin.y + 4 }, texto: "ω", rol: "incognita", tam: 15, negrita: true },
  ];
  return { ancho: 480, alto: Math.round(fin.y + 26), pasos: 0, elementos: el };
}

// F19 · tobogán liso de altura L que termina en horizontal y choca con un
// péndulo de masa M y largo L; quedan pegados y suben h. El tobogán y el hilo
// se dibujan con el MISMO largo porque los dos son L = 1 m. Excepción a "a
// escala": h es la incógnita y vale L/36 (3 px a esta escala); se dibuja el
// giro a 55° para que se lea, igual que el facsímil, sin que la figura dé la
// respuesta. v = √(2gL) = √20; v' = 2√20/12; h = v'²/(2g) = 1/36 m (D).
function f19toboganPendulo(): Figura {
  const L = 110;                                   // px: 1 m
  const Y0 = 150;                                  // superficie horizontal
  const X0 = 96;                                   // borde vertical del tobogán, arriba
  const Q: Pt = { x: X0 + L, y: Y0 - L };          // centro del cuarto de circunferencia
  const arriba = avanzar(Q, 180, L);
  const abajo = avanzar(Q, -90, L);
  const S = 20;                                    // lado del bloque m
  const MA = 56, MH = 36;                          // el bloque M
  const XM = 270;                                  // cara izquierda de M
  const CM: Pt = { x: XM + MA / 2, y: Y0 - MH / 2 };
  const Pv: Pt = { x: CM.x, y: CM.y - L };
  const ALFA = 55;
  const CF = avanzar(Pv, -90 + ALFA, L);

  verificarDistancia("el tobogán arranca a altura L", L, Y0 - arriba.y, 0.5);
  verificarDistancia("el tobogán termina en el piso", 0, Math.abs(abajo.y - Y0), 0.5);
  verificarDistancia("el hilo mide lo mismo que la altura del tobogán", Y0 - arriba.y, distancia(Pv, CM), 0.5);
  verificarDistancia("el hilo sigue midiendo L en la posición final", Y0 - arriba.y, distancia(Pv, CF), 0.5);

  // m apoyado sobre la curva, del lado de adentro
  const apoyoM = avanzar(Q, 194, L);
  const bloqueM = bloqueSobre(apoyoM, 194 - 90, S, S);
  const techoM: Pt = { x: (bloqueM[2].x + bloqueM[3].x) / 2, y: (bloqueM[2].y + bloqueM[3].y) / 2 };
  if (distancia(Q, techoM) >= L) throw new Error("Figura inconsistente: el bloque m quedó por fuera del tobogán");

  // Rectángulo girado: centro, ángulo, semiancho y semialto.
  const girado = (c: Pt, ang: number, a: number, b: number): Pt[] => [
    avanzar(avanzar(c, ang, -a), ang + 90, -b),
    avanzar(avanzar(c, ang, a), ang + 90, -b),
    avanzar(avanzar(c, ang, a), ang + 90, b),
    avanzar(avanzar(c, ang, -a), ang + 90, b),
  ];
  const Mfinal = girado(CF, ALFA, MA / 2, MH / 2);
  const mFinal = girado(avanzar(avanzar(CF, ALFA + 180, MA / 2 + S / 2), ALFA - 90, MH / 2 - S / 2), ALFA, S / 2, S / 2);
  const ganchoFinal = avanzar(CF, ALFA + 90, MH / 2);
  verificarDistancia("m queda pegado a la cara de M", 0, distancia(mFinal[1], Mfinal[0]), 0.5);

  const xCota = 436;
  const hDibujada = CM.y - CF.y;
  verificarDistancia("h dibujada = L(1 − cos α)", L * (1 - Math.cos((ALFA * Math.PI) / 180)), hDibujada, 0.5);

  const lados = (pts: Pt[]): Elemento[] =>
    pts.map((p, i) => ({ tipo: "linea" as const, de: p, a: pts[(i + 1) % pts.length], rol: "trazo" as const, punteada: true, grosor: 1.3 }));

  const el: Elemento[] = [
    // tobogán y piso
    { tipo: "path", d: arcoDe(Q, L, 180, 270), rol: "trazo" },
    { tipo: "linea", de: { x: X0 - 22, y: Y0 }, a: abajo, rol: "trazo", punteada: true, grosor: 1 },
    { tipo: "linea", de: abajo, a: { x: Pv.x + 84, y: Y0 }, rol: "trazo", grosor: 2 },
    ...cotaVertical(X0 - 22, arriba.y, Y0, "dato"),
    { tipo: "texto", en: { x: X0 - 30, y: (arriba.y + Y0) / 2 }, texto: "L = 1 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "poligono", puntos: bloqueM, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "texto", en: { x: techoM.x + 16, y: techoM.y - 14 }, texto: "m = 2 kg", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    // m justo antes del choque
    ...lados([{ x: XM - S, y: Y0 }, { x: XM, y: Y0 }, { x: XM, y: Y0 - S }, { x: XM - S, y: Y0 - S }]),
    // techo, hilo y M en reposo
    { tipo: "linea", de: { x: Pv.x - 64, y: Pv.y }, a: { x: Pv.x + 64, y: Pv.y }, rol: "trazo", grosor: 2.6 },
    ...rayado(Pv.x - 64, Pv.x + 64, Pv.y, true),
    { tipo: "linea", de: Pv, a: { x: CM.x, y: CM.y - MH / 2 }, rol: "trazo", grosor: 1.3 },
    { tipo: "texto", en: { x: Pv.x - 6, y: Pv.y + 36 }, texto: "L", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "poligono", puntos: girado(CM, 0, MA / 2, MH / 2), rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "texto", en: CM, texto: "M", rol: "trazo", tam: 14, negrita: true },
    { tipo: "texto", en: { x: CM.x, y: Y0 + 15 }, texto: "M = 10 kg", rol: "dato", tam: 12, negrita: true },
    // los dos juntos en la posición más alta
    { tipo: "linea", de: Pv, a: ganchoFinal, rol: "trazo", punteada: true, grosor: 1.1 },
    ...lados(Mfinal),
    // m pegado: su cara derecha ES la cara izquierda de M, no se repite (dos punteados encima se ven llenos)
    ...lados(mFinal).filter((_, i) => i !== 1),
    // h: subida del centro de M
    { tipo: "linea", de: { x: XM + MA + 4, y: CM.y }, a: { x: xCota + 6, y: CM.y }, rol: "aux", punteada: true, grosor: 1 },
    { tipo: "linea", de: { x: Math.max(...Mfinal.map((p) => p.x)) + 4, y: CF.y }, a: { x: xCota + 6, y: CF.y }, rol: "aux", punteada: true, grosor: 1 },
    ...cotaVertical(xCota, CF.y, CM.y, "incognita"),
    { tipo: "texto", en: { x: xCota + 10, y: (CF.y + CM.y) / 2 }, texto: "h = ?", rol: "incognita", tam: 12, negrita: true, ancla: "start" },
  ];
  return { ancho: 486, alto: Y0 + 30, pasos: 0, elementos: el };
}

// ── Lote 1-2012 1ra opción (facsímil 119_PrimerExamenIngreso1-2012.pdf, "PRIMER
// EXAMEN DE INGRESO 1-2012", martes 24 de enero de 2012; pág. 1 y 2, 600 dpi) ──

// Distancia con signo de P a la recta a→b (positiva a la izquierda de a→b, en
// coordenadas de pantalla). Sirve para saber de qué lado de una recta cae algo.
function ladoDe(a: Pt, b: Pt, p: Pt): number {
  return ((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x)) / distancia(a, b);
}

// G8 · triángulo ABC con A = 105° y C = 45°, AC = 10 m, x = AB. El facsímil
// (pág. 1) dibuja B arriba a la izquierda, C a la derecha y A abajo, con arcos
// en los tres vértices y SIN números; su trazo no está a escala (mide ~132° en
// A y ~13° en C). Acá B sale del CRUCE de los dos rayos que fijan los ángulos
// del enunciado, y se comprueba la ley de senos sobre lo dibujado:
// x = 10·sen45°/sen30° = 10√2 ≈ 14,1 (A). El arco de B va sin número: B = 30°
// es el paso, no el dato.
function g8TrianguloLeySenos(): Figura {
  const E = 17;                                 // px por metro
  const PHI = 30;                               // dirección de AC
  const A: Pt = { x: 212, y: 222 };
  const C = avanzar(A, PHI, 10 * E);
  const B = cruce(A, avanzar(A, PHI + 105, 10), C, avanzar(C, PHI + 180 - 45, 10));

  verificarAngulo("A = 105°", 105, anguloEn(A, B, C));
  verificarAngulo("C = 45°", 45, anguloEn(C, A, B));
  verificarAngulo("B = 30° (suma 180°)", 30, anguloEn(B, A, C));
  verificarDistancia("AC = 10 m", 10 * E, distancia(A, C), 0.5);
  // B sale del cruce, no de avanzar 10√2: si los ángulos se tocan, esto salta.
  verificarDistancia("AB = 10√2 m (ley de senos)", 10 * Math.SQRT2 * E, distancia(A, B), 0.5);
  if (B.y >= C.y || B.x >= A.x) throw new Error("Figura inconsistente: B debería quedar arriba a la izquierda");

  const arcoA = arcoAngulo(A, anguloHacia(A, C), anguloHacia(A, B), 17, 32);
  const arcoC = arcoAngulo(C, anguloHacia(C, A), anguloHacia(C, B), 30, 46);
  const arcoB = arcoAngulo(B, anguloHacia(B, A), anguloHacia(B, C), 40);
  const mAC: Pt = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const mAB: Pt = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [A, B, C], rol: "trazo" },
    { tipo: "arco", d: arcoA.d, rol: "dato" },
    { tipo: "texto", en: arcoA.etiquetaEn, texto: "105°", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arcoC.d, rol: "dato" },
    { tipo: "texto", en: arcoC.etiquetaEn, texto: "45°", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arcoB.d, rol: "trazo" },
    { tipo: "texto", en: avanzar(mAC, PHI - 90, 14), texto: "10 m", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: avanzar(mAB, PHI + 105 + 90, 14), texto: "x", rol: "incognita", tam: 14, negrita: true, cursiva: true },
    rotulo(avanzar(A, -90, 16), "A"),
    rotulo({ x: B.x - 12, y: B.y - 8 }, "B"),
    rotulo({ x: C.x + 14, y: C.y + 2 }, "C"),
  ];
  return { ancho: 400, alto: 250, pasos: 0, elementos: el };
}

// F9 y F10 · el mismo plano: cateto vertical 4 m a la IZQUIERDA, cateto
// horizontal 3 m abajo, la rampa baja hacia la derecha y el bloque apoya cerca
// de lo alto. OJO: el facsímil (pág. 2, 600 dpi) rotula 4 m y 3 m pero lo
// dibuja al revés de proporción (más ancho que alto, rampa de ~35°). Mandan
// los rótulos: con ellos sen θ = 4/5 y salen las opciones B (55 N) y A (250 J).
// Acá está a escala con los rótulos, así que la rampa sale empinada (53,13°).
// Son dos constructores porque la fuerza no es la misma: en el F9 tira
// paralela al plano, en el F10 empuja horizontal desde la derecha.
function planoTresCuatro(fuerza: "paralela" | "horizontal"): Figura {
  const E = 34;                                // px por metro
  const P: Pt = { x: 92, y: 190 };             // ángulo recto
  const T: Pt = { x: P.x, y: P.y - 4 * E };    // lo alto
  const Q: Pt = { x: P.x + 3 * E, y: P.y };    // pie de la rampa
  const bajada = anguloHacia(T, Q);

  verificarAngulo("inclinación con cateto vertical 4 y horizontal 3", (Math.atan2(4, 3) * 180) / Math.PI, anguloEn(Q, P, T));

  const base = avanzar(T, bajada, 0.4 * distancia(T, Q));
  const bloque = bloqueSobre(base, bajada, 46, 26);
  // El bloque apoya EN la rampa y del lado de afuera del triángulo.
  verificarDistancia("el bloque apoya sobre la rampa", 0, Math.abs(ladoDe(T, Q, bloque[0])) + Math.abs(ladoDe(T, Q, bloque[1])), 0.5);
  if (Math.sign(ladoDe(T, Q, bloque[2])) === Math.sign(ladoDe(T, Q, P))) {
    throw new Error("Figura inconsistente: el bloque quedó adentro del plano");
  }

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [P, T, Q], rol: "trazo", relleno: true, rellenoColor: "#f1f0eb" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(P, 0, 90, 10), rol: "trazo" },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#c9c29a" },
    ...cotaVertical(P.x - 24, T.y, P.y, "dato"),
    { tipo: "texto", en: { x: P.x - 32, y: (T.y + P.y) / 2 }, texto: "4 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "linea", de: { x: P.x, y: P.y + 22 }, a: { x: Q.x, y: P.y + 22 }, rol: "dato", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: P.x, y: P.y + 22 }, 180, 7), rol: "dato", relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: Q.x, y: P.y + 22 }, 0, 7), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: (P.x + Q.x) / 2, y: P.y + 36 }, texto: "3 m", rol: "dato", tam: 12, negrita: true },
  ];

  if (fuerza === "paralela") {
    // Sale de la cara de arriba del bloque y tira rampa ARRIBA.
    const de: Pt = { x: (bloque[1].x + bloque[2].x) / 2, y: (bloque[1].y + bloque[2].y) / 2 };
    const a = avanzar(de, anguloHacia(Q, T), 66);
    if (desvioParalelas(de, a, T, Q) > 0.5) throw new Error("Figura inconsistente: F no es paralela al plano");
    verificarAngulo("F tira rampa arriba", anguloHacia(Q, T), anguloHacia(de, a));
    el.push(
      { tipo: "linea", de, a, rol: "trazo", grosor: 1.8 },
      { tipo: "path", d: cabezaFlecha(a, anguloHacia(de, a), 8), rol: "trazo", relleno: true },
      { tipo: "texto", en: avanzar(a, anguloHacia(de, a) - 60, 16), texto: "F", rol: "trazo", tam: 14, negrita: true },
    );
    return { ancho: Q.x + 50, alto: P.y + 48, pasos: 0, elementos: el };
  }

  // Horizontal, desde la derecha, apuntando al centro del bloque. Con la rampa a
  // 53° la horizontal que sale del centro hacia la derecha cruza la cara de
  // ARRIBA (bloque[3]→bloque[2]), como en el facsímil, no la de abajo.
  const centro: Pt = { x: bloque.reduce((s, p) => s + p.x, 0) / 4, y: bloque.reduce((s, p) => s + p.y, 0) / 4 };
  const cara = cruce(bloque[3], bloque[2], centro, { x: centro.x + 1, y: centro.y });
  const punta: Pt = { x: cara.x + 5, y: cara.y };
  const cola: Pt = { x: punta.x + 62, y: punta.y };
  // Lo DIBUJADO: la recta de la flecha pasa por el centro del bloque y la punta
  // queda pegada a la cara (a 5 px, del lado de afuera).
  const pega = cruce(bloque[3], bloque[2], punta, cola);
  if (pega.x > punta.x || distancia(bloque[3], pega) + distancia(pega, bloque[2]) > distancia(bloque[3], bloque[2]) + 0.5) {
    throw new Error("Figura inconsistente: la línea de F no pega en la cara del bloque");
  }
  verificarDistancia("la punta de F toca el bloque", 5, distancia(punta, pega), 0.5);
  verificarDistancia("F apunta al centro del bloque", 0, Math.abs(punta.y - centro.y), 0.5);
  // (verificarAngulo no pliega: atan2 da −180 para "a la izquierda")
  if (Math.abs(cola.y - punta.y) > 0.01 || punta.x >= cola.x) throw new Error("Figura inconsistente: F no es horizontal hacia la izquierda");
  // Empuja CONTRA el plano: su componente sobre la normal hacia afuera es negativa.
  const normalAfuera = anguloHacia(bloque[0], bloque[3]);
  if (Math.cos(((180 - normalAfuera) * Math.PI) / 180) >= 0) throw new Error("Figura inconsistente: F horizontal no aprieta el bloque contra el plano");
  el.push(
    { tipo: "linea", de: cola, a: punta, rol: "trazo", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(punta, 180, 8), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: punta.x + 14, y: punta.y + 16 }, texto: "F", rol: "trazo", tam: 14, negrita: true },
  );
  return { ancho: Math.round(cola.x + 16), alto: P.y + 48, pasos: 0, elementos: el };
}

function f9PlanoTresCuatroParalela(): Figura {
  return planoTresCuatro("paralela");
}

function f10PlanoTresCuatroHorizontal(): Figura {
  return planoTresCuatro("horizontal");
}

// F11 · barra aislante con +3q a la izquierda (el origen), +q a la derecha
// (x = d) y la tercera esfera, hueca, sobre la barra. El facsímil (pág. 2)
// rotula solo +3q, +q y la cota d de centro a centro; el valor de d va en el
// texto. La esfera del medio se dibuja en la mitad, NO en el equilibrio: su
// posición es la incógnita.
function f11BarraTresEsferas(): Figura {
  const Y = 50, r = 12;
  const C3q: Pt = { x: 80, y: Y };
  const Cq: Pt = { x: 340, y: Y };
  const Cm: Pt = { x: (C3q.x + Cq.x) / 2, y: Y };
  const yCota = Y + 42;
  const tramos: [number, number][] = [[C3q.x + r, Cm.x - r], [Cm.x + r, Cq.x - r]];

  const el: Elemento[] = [];
  for (const [x1, x2] of tramos) {
    el.push(
      { tipo: "linea", de: { x: x1, y: Y - 4 }, a: { x: x2, y: Y - 4 }, rol: "trazo", grosor: 1.4 },
      { tipo: "linea", de: { x: x1, y: Y + 4 }, a: { x: x2, y: Y + 4 }, rol: "trazo", grosor: 1.4 },
    );
  }
  const esfera3q: Elemento = { tipo: "path", d: circuloPath(C3q, r), rol: "trazo", relleno: true, color: "#7a7a84" };
  const esferaQ: Elemento = { tipo: "path", d: circuloPath(Cq, r), rol: "trazo", relleno: true, color: "#7a7a84" };
  // la cota, cortada en el medio para que la d no quede tachada
  const xMedio = (C3q.x + Cq.x) / 2;
  const cotaIzq: Elemento = { tipo: "linea", de: { x: C3q.x, y: yCota }, a: { x: xMedio - 12, y: yCota }, rol: "dato", grosor: 1.3 };
  const cotaDer: Elemento = { tipo: "linea", de: { x: xMedio + 12, y: yCota }, a: { x: Cq.x, y: yCota }, rol: "dato", grosor: 1.3 };
  el.push(
    esfera3q,
    esferaQ,
    { tipo: "path", d: circuloPath(Cm, r), rol: "trazo" },
    { tipo: "texto", en: { x: C3q.x - r - 6, y: Y }, texto: "+3q", rol: "dato", tam: 13, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: Cq.x + r + 6, y: Y }, texto: "+q", rol: "dato", tam: 13, negrita: true, ancla: "start" },
    cotaIzq,
    cotaDer,
    { tipo: "path", d: cabezaFlecha({ x: C3q.x, y: yCota }, 180, 7), rol: "dato", relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: Cq.x, y: yCota }, 0, 7), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: xMedio, y: yCota }, texto: "d", rol: "dato", tam: 14, negrita: true, cursiva: true },
  );

  // Lo DIBUJADO: la cota va de centro a centro de las dos esferas fijas, y la
  // tercera queda sobre la barra, entre las dos, sin tocarlas.
  const centroDe = (e: Elemento): Pt => {
    if (e.tipo !== "path") throw new Error("se esperaba un path");
    const m = e.d.match(/^M ([\d.-]+) ([\d.-]+) A ([\d.]+)/);
    if (!m) throw new Error("círculo mal formado");
    return { x: Number(m[1]) - Number(m[3]), y: Number(m[2]) };
  };
  if (cotaIzq.tipo !== "linea" || cotaDer.tipo !== "linea") throw new Error("cota mal formada");
  verificarDistancia("d arranca en el centro de +3q", 0, distancia(cotaIzq.de, { x: centroDe(esfera3q).x, y: yCota }), 0.5);
  verificarDistancia("d termina en el centro de +q", 0, distancia(cotaDer.a, { x: centroDe(esferaQ).x, y: yCota }), 0.5);
  if (!(Cm.x - r > C3q.x + r && Cm.x + r < Cq.x - r) || Cm.y !== Y) {
    throw new Error("Figura inconsistente: la tercera esfera no está sobre la barra entre las dos cargas");
  }
  return { ancho: 400, alto: yCota + 22, pasos: 0, elementos: el };
}

// F12 · tazón esférico en corte (bloque gris con la cavidad semicircular) y
// dos esferas m en el fondo; punteado el triángulo de lados R entre el centro
// O del tazón y las dos esferas (facsímil pág. 2). Que los tres lados midan lo
// mismo es lo que da 30° con la vertical: tan 30° = 1/√3, F = mg/√3 y
// q² = √3·10⁻¹³ C² (D). Como en el original, R rotula los lados del
// triángulo: las esferas son puntuales, el radio chico es solo para verlas.
function f12TazonDosEsferas(): Figura {
  const Rb = 150, r = 11;
  const O: Pt = { x: 220, y: 34 };
  const L = Rb - r;                            // del centro O al centro de cada esfera
  const A = avanzar(O, -90 - 30, L);
  const B = avanzar(O, -90 + 30, L);

  verificarDistancia("OA = AB (equilátero)", distancia(O, A), distancia(A, B), 0.5);
  verificarDistancia("OB = AB (equilátero)", distancia(O, B), distancia(A, B), 0.5);
  verificarDistancia("las esferas apoyan en la pared del tazón", Rb, distancia(O, A) + r, 0.5);
  if (A.y <= O.y || B.y <= O.y) throw new Error("Figura inconsistente: las esferas quedaron fuera del tazón");

  const xl = O.x - Rb - 46, xr = O.x + Rb + 46, yb = O.y + Rb + 24;
  const bloque =
    `M ${xl} ${O.y} L ${O.x - Rb} ${O.y}` + sigueArco(O, Rb, 180, 360) +
    ` L ${xr} ${O.y} L ${xr} ${yb} L ${xl} ${yb} Z`;

  const mOA: Pt = { x: (O.x + A.x) / 2, y: (O.y + A.y) / 2 };
  const mOB: Pt = { x: (O.x + B.x) / 2, y: (O.y + B.y) / 2 };
  const el: Elemento[] = [
    { tipo: "path", d: bloque, rol: "trazo", relleno: true, color: "#c4c4cc" },
    { tipo: "path", d: arcoDe(O, Rb, 180, 360), rol: "trazo" },
    { tipo: "linea", de: { x: xl, y: O.y }, a: { x: O.x - Rb, y: O.y }, rol: "trazo" },
    { tipo: "linea", de: { x: O.x + Rb, y: O.y }, a: { x: xr, y: O.y }, rol: "trazo" },
    { tipo: "linea", de: { x: xl, y: O.y }, a: { x: xl, y: yb }, rol: "trazo" },
    { tipo: "linea", de: { x: xr, y: O.y }, a: { x: xr, y: yb }, rol: "trazo" },
    { tipo: "linea", de: { x: xl, y: yb }, a: { x: xr, y: yb }, rol: "trazo" },
    { tipo: "linea", de: O, a: A, rol: "dato", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: O, a: B, rol: "dato", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: A, a: B, rol: "dato", punteada: true, grosor: 1.2 },
    { tipo: "path", d: circuloPath(A, r), rol: "trazo", relleno: true },
    { tipo: "path", d: circuloPath(B, r), rol: "trazo", relleno: true },
    { tipo: "texto", en: avanzar(mOA, 150, 14), texto: "R", rol: "dato", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: avanzar(mOB, 30, 14), texto: "R", rol: "dato", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: { x: O.x, y: A.y + 18 }, texto: "R", rol: "dato", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: { x: A.x - 10, y: A.y - 22 }, texto: "m", rol: "dato", tam: 14, negrita: true, cursiva: true },
    { tipo: "texto", en: { x: B.x + 10, y: B.y - 22 }, texto: "m", rol: "dato", tam: 14, negrita: true, cursiva: true },
  ];
  return { ancho: xr + 14, alto: yb + 10, pasos: 0, elementos: el };
}

// ── Lote 1-2018 2da opción (facsímil 152_2da-op-1-2018.pdf; ojo, 157_2da-op-1-2018.pdf es de 2019) ──

// G5 · dos torres y el punto medio entre sus ejes. El facsímil (pág. 1, 600 dpi)
// no rotula nada: torre baja a la izquierda, alta a la derecha y las dos visuales
// punteadas desde el punto medio del suelo. Acá van rotulados los datos del
// enunciado (30°, 60°, 12 m) y la altura que se busca. La torre alta NO se
// construye desde el ángulo: sale de la respuesta (36 m) y de la distancia que
// fija la torre baja (tan 30° = 12/L, L = 12√3). Las verificaciones miden que
// desde M se vean de verdad 30° y 60°.
function g5DosTorresPuntoMedio(): Figura {
  const H_BAJA = 12, H_ALTA = 36;                 // m; 36 es la respuesta (C)
  const L = H_BAJA * Math.sqrt(3);
  const ESC = 5.6, PISO = 236, X_IZQ = 84;
  const pieIzq: Pt = { x: X_IZQ, y: PISO };
  const M: Pt = { x: X_IZQ + L * ESC, y: PISO };
  const pieDer: Pt = { x: X_IZQ + 2 * L * ESC, y: PISO };
  const cimaIzq: Pt = { x: pieIzq.x, y: PISO - H_BAJA * ESC };
  const cimaDer: Pt = { x: pieDer.x, y: PISO - H_ALTA * ESC };

  verificarDistancia("M es el punto medio entre los ejes", distancia(pieIzq, M), distancia(M, pieDer), 0.01);
  verificarAngulo("torre baja vertical", 90, anguloEn(pieIzq, M, cimaIzq), 0.05);
  verificarAngulo("torre alta vertical", 90, anguloEn(pieDer, M, cimaDer), 0.05);
  verificarAngulo("elevación a la torre baja = 30°", 30, anguloEn(M, pieIzq, cimaIzq), 0.05);
  verificarAngulo("elevación a la torre alta = 60°", 60, anguloEn(M, pieDer, cimaDer), 0.05);

  const arco30 = arcoAngulo(M, 180, anguloHacia(M, cimaIzq), 34, 52);
  const arco60 = arcoAngulo(M, 0, anguloHacia(M, cimaDer), 26, 42);
  verificarAngulo("el arco rotulado 30° mide 30°", 30, arco30.medida, 0.05);
  verificarAngulo("el arco rotulado 60° mide 60°", 60, arco60.medida, 0.05);

  // marcas de segmentos iguales (M es punto medio)
  const marca = (x: number): Elemento => ({ tipo: "linea", de: { x, y: PISO - 5 }, a: { x, y: PISO + 5 }, rol: "dato", grosor: 1.3 });

  const el: Elemento[] = [
    { tipo: "linea", de: { x: pieIzq.x - 26, y: PISO }, a: { x: pieDer.x + 26, y: PISO }, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: pieIzq, a: cimaIzq, rol: "trazo", grosor: 2.2 },
    { tipo: "linea", de: pieDer, a: cimaDer, rol: "trazo", grosor: 2.2 },
    { tipo: "linea", de: M, a: cimaIzq, rol: "trazo", punteada: true, grosor: 1.4 },
    { tipo: "linea", de: M, a: cimaDer, rol: "trazo", punteada: true, grosor: 1.4 },
    marca((pieIzq.x + M.x) / 2),
    marca((M.x + pieDer.x) / 2),
    { tipo: "punto", en: pieIzq, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: pieDer, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: cimaIzq, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: cimaDer, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: M, rol: "trazo", r: 2.6 },
    { tipo: "texto", en: { x: M.x, y: PISO + 18 }, texto: "M", rol: "trazo", tam: 12.5, negrita: true },
    { tipo: "arco", d: arco30.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco30.etiquetaEn, texto: "30°", rol: "dato", tam: 12, negrita: true },
    { tipo: "arco", d: arco60.d, rol: "dato", color: AMBAR },
    { tipo: "texto", en: arco60.etiquetaEn, texto: "60°", rol: "dato", tam: 12, negrita: true },
    ...cotaVertical(pieIzq.x - 18, PISO, cimaIzq.y, "dato"),
    { tipo: "texto", en: { x: pieIzq.x - 26, y: (PISO + cimaIzq.y) / 2 }, texto: "12 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    ...cotaVertical(pieDer.x + 18, PISO, cimaDer.y, "incognita"),
    { tipo: "texto", en: { x: pieDer.x + 27, y: (PISO + cimaDer.y) / 2 }, texto: "h", rol: "incognita", tam: 15, negrita: true, cursiva: true, ancla: "start" },
  ];
  return { ancho: pieDer.x + 60, alto: PISO + 30, pasos: 0, elementos: el };
}

// F9 · gráfica velocidad contra tiempo. Leída a 600 dpi (pág. 2): ejes de 0 a
// 20 s y de 0 a 10 m/s, cuadrícula punteada cada 2 y marcas cada 1; la
// poligonal pasa por (0,0), (4,8), (10,8), (12,6) y TERMINA en (18,6), todos
// cruces de la cuadrícula. El paréntesis que tenía el banco decía "hasta
// t = 20 s"; no cambia la respuesta porque se pide hasta 10 s. Distancia en
// 10 s = área bajo la poligonal entre 0 y 10 = 16 + 48 = 64 m (a).
function f9GraficaVtTrapecio(): Figura {
  const LEIDO: [number, number][] = [[0, 0], [4, 8], [10, 8], [12, 6], [18, 6]];
  const T_MAX = 20, V_MAX = 10, PASO = 2, T_PEDIDO = 10, DISTANCIA = 64;
  const ESX = 17, ESY = 16.5, X0 = 64, Y0 = 206;
  const en = (t: number, v: number): Pt => ({ x: X0 + t * ESX, y: Y0 - v * ESY });
  const traza = LEIDO.map(([t, v]) => en(t, v));

  // 1. cada vértice DIBUJADO cae en un cruce de la cuadrícula y dentro de los ejes
  for (const p of traza) {
    const t = (p.x - X0) / ESX, v = (Y0 - p.y) / ESY;
    const fuera = (u: number) => Math.abs(u / PASO - Math.round(u / PASO)) > 1e-6;
    if (fuera(t) || fuera(v) || t < 0 || t > T_MAX || v < 0 || v > V_MAX) {
      throw new Error(`Figura inconsistente: el vértice (${t}, ${v}) no cae en un cruce de la cuadrícula`);
    }
  }
  // 2. área bajo lo DIBUJADO entre 0 y 10 s (shoelace sobre el polígono) = 64 m
  const xCorte = en(T_PEDIDO, 0).x;
  const poli: Pt[] = [traza[0]];
  for (let i = 0; i + 1 < traza.length; i++) {
    const p = traza[i], q = traza[i + 1];
    if (q.x <= xCorte) { poli.push(q); continue; }
    if (p.x < xCorte) poli.push({ x: xCorte, y: p.y + ((q.y - p.y) * (xCorte - p.x)) / (q.x - p.x) });
    break;
  }
  poli.push({ x: xCorte, y: Y0 }, { x: traza[0].x, y: Y0 });
  let doble = 0;
  for (let i = 0; i < poli.length; i++) {
    const p = poli[i], q = poli[(i + 1) % poli.length];
    doble += p.x * q.y - q.x * p.y;
  }
  const area = Math.abs(doble) / 2 / (ESX * ESY);
  if (Math.abs(area - DISTANCIA) > 1e-6) {
    throw new Error(`Figura inconsistente: el área bajo la gráfica hasta ${T_PEDIDO} s da ${area.toFixed(3)} m, no ${DISTANCIA}`);
  }

  const GRILLA = "#7b8fe0";
  const el: Elemento[] = [];
  for (let t = PASO; t < T_MAX; t += PASO) {
    el.push({ tipo: "linea", de: en(t, 0), a: en(t, V_MAX), rol: "trazo", color: GRILLA, punteada: true, grosor: 0.8 });
  }
  for (let v = PASO; v < V_MAX; v += PASO) {
    el.push({ tipo: "linea", de: en(0, v), a: en(T_MAX, v), rol: "trazo", color: GRILLA, punteada: true, grosor: 0.8 });
  }
  for (let t = 1; t < T_MAX; t++) {
    el.push({ tipo: "linea", de: en(t, 0), a: { x: en(t, 0).x, y: Y0 - 4 }, rol: "trazo", grosor: 0.9 });
  }
  for (let v = 1; v < V_MAX; v++) {
    el.push({ tipo: "linea", de: en(0, v), a: { x: X0 + 4, y: en(0, v).y }, rol: "trazo", grosor: 0.9 });
  }
  el.push({ tipo: "poligono", puntos: [en(0, 0), en(T_MAX, 0), en(T_MAX, V_MAX), en(0, V_MAX)], rol: "trazo" });
  for (let t = 0; t <= T_MAX; t += PASO) {
    el.push({ tipo: "texto", en: { x: en(t, 0).x, y: Y0 + 13 }, texto: String(t), rol: "trazo", tam: 10.5 });
  }
  for (let v = 0; v <= V_MAX; v += PASO) {
    el.push({ tipo: "texto", en: { x: X0 - 7, y: en(0, v).y }, texto: String(v), rol: "trazo", tam: 10.5, ancla: "end" });
  }
  el.push(
    { tipo: "texto", en: { x: en(T_MAX / 2, 0).x, y: Y0 + 32 }, texto: "tiempo (s)", rol: "trazo", tam: 12.5 },
    { tipo: "texto", en: { x: X0 - 34, y: en(0, V_MAX / 2).y }, texto: "velocidad (m/s)", rol: "trazo", tam: 12.5, rot: -90 },
  );
  for (let i = 0; i + 1 < traza.length; i++) {
    el.push({ tipo: "linea", de: traza[i], a: traza[i + 1], rol: "trazo", grosor: 2.4 });
  }
  return { ancho: en(T_MAX, 0).x + 22, alto: Y0 + 46, pasos: 0, elementos: el };
}

// ── Lote 2-2024 única opción (facsímil 2024-2-Uop.pdf, viernes 9-ago-2024) ──

// G7 · cuadrilátero ABCD inscrito, con arcos AB = 60°, BC = 110°, CD = 100° y
// DA = 90° (en el enunciado). El facsímil (pág. 1, 600 dpi) pone A a la derecha,
// B arriba, C a la izquierda, D abajo y una cruz en el centro, sin rotular
// arcos; su trazo no respeta las medidas (CD se ve de unos 134° y DA de 56°).
// Acá cada vértice sale de sumar los arcos desde A = 0°, y los arcos del
// enunciado van rotulados. Los ángulos que se piden NO: se miden sobre el
// dibujo y tienen que dar los de la opción a) (105°, 95°, 75°, 85°).
function g7CuadrilateroInscritoArcos(): Figura {
  const ARCO = { AB: 60, BC: 110, CD: 100, DA: 90 };
  if (ARCO.AB + ARCO.BC + ARCO.CD + ARCO.DA !== 360) throw new Error("Figura inconsistente: los arcos no suman 360°");
  const R = 96;
  const O: Pt = { x: 200, y: 140 };
  const pos = { A: 0, B: ARCO.AB, C: ARCO.AB + ARCO.BC, D: ARCO.AB + ARCO.BC + ARCO.CD };
  const A = avanzar(O, pos.A, R), B = avanzar(O, pos.B, R), C = avanzar(O, pos.C, R), D = avanzar(O, pos.D, R);

  // los arcos, medidos como ángulo central entre los puntos dibujados (todos < 180°)
  verificarAngulo("arco AB = 60°", 60, anguloEn(O, A, B), 0.05);
  verificarAngulo("arco BC = 110°", 110, anguloEn(O, B, C), 0.05);
  verificarAngulo("arco CD = 100°", 100, anguloEn(O, C, D), 0.05);
  verificarAngulo("arco DA = 90°", 90, anguloEn(O, D, A), 0.05);
  // los ángulos internos medidos sobre el polígono dibujado son los de la opción a)
  verificarAngulo("∠A = 105°", 105, anguloEn(A, D, B), 0.05);
  verificarAngulo("∠B = 95°", 95, anguloEn(B, A, C), 0.05);
  verificarAngulo("∠C = 75°", 75, anguloEn(C, B, D), 0.05);
  verificarAngulo("∠D = 85°", 85, anguloEn(D, C, A), 0.05);
  // la disposición del facsímil
  if (!(A.x > O.x + 0.9 * R && B.y < O.y - 0.5 * R && C.x < O.x - 0.9 * R && D.y > O.y + 0.9 * R)) {
    throw new Error("Figura inconsistente: los vértices no quedan A derecha, B arriba, C izquierda, D abajo");
  }

  const letra = (ang: number, t: string): Elemento =>
    ({ tipo: "texto", en: avanzar(O, ang, R + 16), texto: t, rol: "trazo", tam: 14, negrita: true, cursiva: true });
  const arcoRot = (a1: number, a2: number, t: string): Elemento =>
    ({ tipo: "texto", en: avanzar(O, (a1 + a2) / 2, R + 20), texto: t, rol: "dato", tam: 11.5, negrita: true });

  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "poligono", puntos: [A, B, C, D], rol: "trazo" },
    { tipo: "linea", de: { x: O.x - 4, y: O.y }, a: { x: O.x + 4, y: O.y }, rol: "trazo", grosor: 1.2 },
    { tipo: "linea", de: { x: O.x, y: O.y - 4 }, a: { x: O.x, y: O.y + 4 }, rol: "trazo", grosor: 1.2 },
    letra(pos.A, "A"), letra(pos.B, "B"), letra(pos.C, "C"), letra(pos.D, "D"),
    arcoRot(pos.A, pos.B, "60°"),
    arcoRot(pos.B, pos.C, "110°"),
    arcoRot(pos.C, pos.D, "100°"),
    arcoRot(pos.D, 360, "90°"),
  ];
  return { ancho: 400, alto: O.y + R + 34, pasos: 0, elementos: el };
}

// ── Lote 1-2005 2da opción (facsímil 051_ExamenAdmisionSegundaOpcion1-2005.pdf,
// "EXAMEN DE INGRESO SEGUNDA OPCION GESTION I-2005"; pág. 2, 500-600 dpi) ──

// F17 · m3 sobre la mesa; la cuerda sale de su cara, pasa por arriba de la
// polea del borde y baja hasta m1; m2 cuelga DEBAJO de m1, atado a él. El
// facsímil dibuja la mesa como una línea con su borde vertical bajo la polea,
// la flecha del movimiento sobre m3 y "a" hacia abajo junto a m1.
// (m1 + m2)g − μ·m3·g = (m1 + m2 + m3)a → 40 − 40μ = 16 → μ = 3/5 (d).
function f17MesaPoleaDosColgantes(): Figura {
  const Y0 = 120;                          // tablero de la mesa
  const XE = 250;                          // borde de la mesa
  const R = 16;
  const P: Pt = { x: XE + 6, y: Y0 - R };  // centro de la polea, apoyada en la esquina
  const YC = P.y - R;                      // tramo horizontal de la cuerda
  const XC = P.x + R;                      // tramo vertical
  const M3 = { x1: 120, x2: 176, alto: 44 };
  const L = 36;                            // lado de m1 y m2
  const Y1 = 168, Y2 = 236;                // techo de m1 y de m2
  const PIE = 292;                         // hasta dónde baja el borde de la mesa

  // (la tangencia de los dos tramos de cuerda sale de cómo se definen YC y XC;
  // no se re-verifica porque esa cuenta no puede fallar)
  if (!(YC > Y0 - M3.alto && YC < Y0)) throw new Error("Figura inconsistente: la cuerda no sale de la cara de m3");
  if (XC - L / 2 <= XE) throw new Error("Figura inconsistente: los bloques colgantes chocan con el borde de la mesa");
  if (Y1 <= P.y || Y2 <= Y1 + L || Y2 + L >= PIE) throw new Error("Figura inconsistente: m2 debería colgar debajo de m1 y los dos debajo de la polea");

  const caja = (x1: number, y1: number, ancho: number, alto: number): Pt[] => [
    { x: x1, y: y1 }, { x: x1 + ancho, y: y1 }, { x: x1 + ancho, y: y1 + alto }, { x: x1, y: y1 + alto },
  ];
  const XA = XC + 78;                      // flecha de la aceleración

  const el: Elemento[] = [
    // mesa: tablero, borde y rayado
    { tipo: "linea", de: { x: 30, y: Y0 }, a: { x: XE, y: Y0 }, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: { x: XE, y: Y0 }, a: { x: XE, y: PIE }, rol: "trazo", grosor: 2 },
    ...rayado(30, XE, Y0),
    // polea
    { tipo: "linea", de: { x: XE, y: Y0 }, a: P, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: circuloPath(P, R), rol: "trazo" },
    { tipo: "punto", en: P, rol: "trazo", r: 2 },
    // m3
    { tipo: "poligono", puntos: caja(M3.x1, Y0 - M3.alto, M3.x2 - M3.x1, M3.alto), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: (M3.x1 + M3.x2) / 2, y: Y0 - M3.alto / 2 }, texto: "m₃", rol: "trazo", tam: 14 },
    { tipo: "texto", en: { x: M3.x1 - 10, y: Y0 - M3.alto / 2 }, texto: "4 kg", rol: "dato", tam: 11, negrita: true, ancla: "end" },
    { tipo: "linea", de: { x: M3.x1 + 4, y: Y0 - M3.alto - 18 }, a: { x: M3.x2 + 14, y: Y0 - M3.alto - 18 }, rol: "trazo", grosor: 1.5 },
    { tipo: "path", d: cabezaFlecha({ x: M3.x2 + 14, y: Y0 - M3.alto - 18 }, 0, 8), rol: "trazo", relleno: true },
    // cuerda
    { tipo: "linea", de: { x: M3.x2, y: YC }, a: { x: P.x, y: YC }, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: arcoDe(P, R, 90, 0), rol: "trazo" },
    { tipo: "linea", de: { x: XC, y: P.y }, a: { x: XC, y: Y1 }, rol: "trazo", grosor: 1.4 },
    { tipo: "linea", de: { x: XC, y: Y1 + L }, a: { x: XC, y: Y2 }, rol: "trazo", grosor: 1.4 },
    // m1 y m2
    { tipo: "poligono", puntos: caja(XC - L / 2, Y1, L, L), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: XC, y: Y1 + L / 2 }, texto: "m₁", rol: "trazo", tam: 14 },
    { tipo: "texto", en: { x: XC + L / 2 + 8, y: Y1 + L / 2 }, texto: "2 kg", rol: "dato", tam: 11, negrita: true, ancla: "start" },
    { tipo: "poligono", puntos: caja(XC - L / 2, Y2, L, L), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: { x: XC, y: Y2 + L / 2 }, texto: "m₂", rol: "trazo", tam: 14 },
    { tipo: "texto", en: { x: XC + L / 2 + 8, y: Y2 + L / 2 }, texto: "2 kg", rol: "dato", tam: 11, negrita: true, ancla: "start" },
    // a hacia abajo
    { tipo: "linea", de: { x: XA, y: Y1 - 8 }, a: { x: XA, y: Y1 + 34 }, rol: "dato", grosor: 1.5 },
    { tipo: "path", d: cabezaFlecha({ x: XA, y: Y1 + 34 }, -90, 8), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: XA + 8, y: Y1 + 12 }, texto: "a = 2 m/s²", rol: "dato", tam: 11.5, negrita: true, ancla: "start" },
  ];
  return { ancho: 430, alto: PIE + 10, pasos: 0, elementos: el };
}

// F18 · "Antes del choque": el camión a la izquierda va hacia +x y el auto a
// la derecha viene en sentido contrario; un eje vertical punteado pasa por el
// camión y el eje +x corre por la ruta, como en el facsímil.
// 10000·12 − 2000·30 = 12000·v → v = 5 m/s (b).
function f18CamionAutoAntesDelChoque(): Figura {
  const Y = 160;                                   // la ruta (eje x)
  const XO = 98;                                   // eje vertical
  const RC = 7, RA = 4.5;                          // ruedas del camión y del auto
  const camion = { x1: 54, x2: 134, arriba: Y - 46, abajo: Y - 2 * RC + 2 };
  const cabina = { x1: 134, x2: 150, arriba: Y - 34 };
  const auto = { x1: 290, x2: 350 };
  const ruedasC: Pt[] = [{ x: 68, y: Y - RC }, { x: 120, y: Y - RC }];
  const ruedasA: Pt[] = [{ x: 302, y: Y - RA }, { x: 338, y: Y - RA }];
  const vC = { de: { x: 80, y: camion.arriba - 16 }, a: { x: 130, y: camion.arriba - 16 } };
  const vA = { de: { x: 342, y: Y - 44 }, a: { x: 298, y: Y - 44 } };

  if (!(vC.a.x > vC.de.x)) throw new Error("Figura inconsistente: el camión debería ir hacia +x");
  if (!(vA.a.x < vA.de.x)) throw new Error("Figura inconsistente: el auto debería venir en dirección contraria");
  if (!(auto.x1 > cabina.x2)) throw new Error("Figura inconsistente: antes del choque el auto va por delante del camión");
  if (!(XO > camion.x1 && XO < camion.x2)) throw new Error("Figura inconsistente: el eje vertical del facsímil pasa por el camión");

  const caja = (x1: number, x2: number, y1: number, y2: number): Pt[] => [
    { x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 },
  ];
  const el: Elemento[] = [
    // ejes
    { tipo: "linea", de: { x: 20, y: Y }, a: { x: 400, y: Y }, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: { x: 400, y: Y }, a: { x: 438, y: Y }, rol: "trazo", punteada: true, grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: 446, y: Y }, 0, 9), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: 430, y: Y + 16 }, texto: "+x", rol: "trazo", tam: 13 },
    { tipo: "linea", de: { x: XO, y: Y }, a: { x: XO, y: 24 }, rol: "trazo", punteada: true, grosor: 1.2 },
    { tipo: "path", d: `M ${XO - 7} 35 L ${XO} 22 L ${XO + 7} 35`, rol: "trazo" },
    { tipo: "texto", en: { x: 222, y: 50 }, texto: "Antes del", rol: "trazo", tam: 14 },
    { tipo: "texto", en: { x: 222, y: 68 }, texto: "choque", rol: "trazo", tam: 14 },
    // camión
    { tipo: "poligono", puntos: caja(camion.x1, camion.x2, camion.arriba, camion.abajo), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "poligono", puntos: caja(cabina.x1, cabina.x2, cabina.arriba, camion.abajo), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    ...ruedasC.map((c): Elemento => ({ tipo: "path", d: circuloPath(c, RC), rol: "trazo" })),
    { tipo: "linea", de: vC.de, a: vC.a, rol: "dato", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(vC.a, 0, 8), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: vC.a.x + 8, y: vC.a.y }, texto: "12 m/s", rol: "dato", tam: 11.5, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: (camion.x1 + cabina.x2) / 2, y: Y + 18 }, texto: "10 000 kg", rol: "dato", tam: 11.5, negrita: true },
    // auto
    { tipo: "poligono", puntos: caja(auto.x1, auto.x2, Y - 18, Y - RA), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "poligono", puntos: caja(auto.x1 + 10, auto.x2 - 14, Y - 30, Y - 18), rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    ...ruedasA.map((c): Elemento => ({ tipo: "path", d: circuloPath(c, RA), rol: "trazo" })),
    { tipo: "linea", de: vA.de, a: vA.a, rol: "dato", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(vA.a, 180, 8), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: vA.a.x - 8, y: vA.a.y }, texto: "30 m/s", rol: "dato", tam: 11.5, negrita: true, ancla: "end" },
    { tipo: "texto", en: { x: (auto.x1 + auto.x2) / 2, y: Y + 18 }, texto: "2000 kg", rol: "dato", tam: 11.5, negrita: true },
  ];
  return { ancho: 460, alto: Y + 32, pasos: 0, elementos: el };
}

// F19 · dos planos inclinados de 30° unidos por un tramo horizontal liso; la
// partícula parte de A, a h = 3 m. A sale de cortar el primer plano a la altura
// h (no se pone a mano), y se mide lo que se recorre bajando: h/sen30° = 6 m.
// 3 − 0,1·6 = 2,4; 2,4 = h₂ + 0,1·2h₂ → h₂ = 2 m (d). El segundo plano se
// dibuja más alto que 2 m para que la partícula quepa, sin marcar h₂.
function f19DosPlanos30TramoHorizontal(): Figura {
  const E = 26;                                    // px por metro
  const ALFA = 30, H = 3;
  const Y0 = 150;                                  // la horizontal
  const B1: Pt = { x: 235, y: Y0 };                // pie del primer plano
  const B2: Pt = { x: B1.x + 3 * E, y: Y0 };       // pie del segundo
  const T1 = avanzar(B1, 180 - ALFA, (H * E) / Math.sin((ALFA * Math.PI) / 180) + 26);
  const A = hastaY(B1, 180 - ALFA, Y0 - H * E);
  const T2 = avanzar(B2, ALFA, 6 * E);
  const izq: Pt = { x: B1.x - 40, y: Y0 }, der: Pt = { x: B2.x + 40, y: Y0 };

  verificarAngulo("primer plano a 30°", ALFA, anguloEn(B1, T1, izq));
  verificarAngulo("segundo plano a 30°", ALFA, anguloEn(B2, T2, der));
  verificarDistancia("lo que baja por el primer plano mide h/sen30° = 6 m", 6 * E, distancia(A, B1), 0.01);
  if (distancia(T1, B1) <= distancia(A, B1)) throw new Error("Figura inconsistente: A debería quedar sobre el primer plano");
  if (Y0 - T2.y <= 2 * E) throw new Error("Figura inconsistente: el segundo plano no llega a la altura que alcanza la partícula");

  const bajada = -ALFA;
  const bloque = bloqueSobre(A, bajada, 30, 20);
  // el macizo del plano queda abajo a la izquierda de la rampa
  if (Math.sign(ladoDe(T1, B1, bloque[2])) === Math.sign(ladoDe(T1, B1, { x: B1.x - 40, y: Y0 - 5 }))) {
    throw new Error("Figura inconsistente: el bloque quedó dentro del plano");
  }
  const xh = A.x - 34;
  const arco1 = arcoAngulo(B1, 180 - ALFA, 180, 34, 50);
  const arco2 = arcoAngulo(B2, ALFA, 0, 34, 50);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 24, y: Y0 }, a: B1, rol: "trazo", punteada: true, grosor: 1 },
    { tipo: "linea", de: B2, a: { x: T2.x + 20, y: Y0 }, rol: "trazo", punteada: true, grosor: 1 },
    { tipo: "linea", de: T1, a: B1, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: B1, a: B2, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: B2, a: T2, rol: "trazo", grosor: 2 },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#e8e8ef" },
    { tipo: "texto", en: avanzar(bloque[3], 60, 14), texto: "A", rol: "trazo", tam: 15, negrita: true },
    { tipo: "linea", de: { x: xh - 4, y: A.y }, a: A, rol: "aux", punteada: true, grosor: 1 },
    ...cotaVertical(xh, A.y, Y0, "dato"),
    { tipo: "texto", en: { x: xh - 8, y: (A.y + Y0) / 2 }, texto: "h = 3 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "arco", d: arco1.d, rol: "dato" },
    { tipo: "texto", en: arco1.etiquetaEn, texto: "30°", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "arco", d: arco2.d, rol: "dato" },
    { tipo: "texto", en: arco2.etiquetaEn, texto: "30°", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "texto", en: { x: (B1.x + B2.x) / 2, y: Y0 + 16 }, texto: "sin fricción", rol: "trazo", tam: 11 },
  ];
  return { ancho: Math.round(T2.x + 30), alto: Y0 + 30, pasos: 0, elementos: el };
}

// F20 · la corriente I entra por la izquierda, se reparte en tres ramas entre
// los MISMOS dos rieles (R1 arriba, R2 al medio, R3 abajo) y sale por la
// derecha. Se verifica eléctricamente sobre lo dibujado: cada extremo de
// resistor se asigna al riel que toca, se plantea Kirchhoff en el nodo de
// entrada y sale I1 = 3 A (b).
function f20TresResistenciasParaleloI(): Figura {
  const XL = 160, XR = 300;                        // rieles
  const YS = [56, 110, 164];                       // R1, R2, R3
  const YM = YS[1];                                // entra y sale a la altura de R2, como en el facsímil
  const R = [1, 2, 3];
  const I = 11 / 2;
  const NOMBRES = ["R₁ = 1 Ω", "R₂ = 2 Ω", "R₃ = 3 Ω"];
  const ramas = YS.map((y) => ({ de: { x: XL, y }, a: { x: XR, y } }));
  const entrada: Pt = { x: XL, y: YM }, salida: Pt = { x: XR, y: YM };

  const nodo = (p: Pt): "izq" | "der" => {
    const enRango = p.y >= YS[0] - 0.01 && p.y <= YS[YS.length - 1] + 0.01;
    if (Math.abs(p.x - XL) < 0.01 && enRango) return "izq";
    if (Math.abs(p.x - XR) < 0.01 && enRango) return "der";
    throw new Error(`Figura inconsistente: el extremo (${p.x}, ${p.y}) queda colgando`);
  };
  if (nodo(entrada) !== "izq" || nodo(salida) !== "der") throw new Error("Figura inconsistente: I debería entrar por un riel y salir por el otro");
  // Potenciales: V en el nodo de entrada, 0 en el de salida.
  const potencial = (n: "izq" | "der", V: number) => (n === "izq" ? V : 0);
  const conductancia = ramas.reduce((s, b, i) => s + (potencial(nodo(b.de), 1) - potencial(nodo(b.a), 1)) / R[i], 0);
  const V = I / conductancia;
  const I1 = (potencial(nodo(ramas[0].de), V) - potencial(nodo(ramas[0].a), V)) / R[0];
  verificarDistancia("corriente por R1 en el circuito dibujado (b) 3 A", 3, I1, 1e-9);

  const el: Elemento[] = [
    { tipo: "linea", de: { x: XL, y: YS[0] }, a: { x: XL, y: YS[2] }, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: { x: XR, y: YS[0] }, a: { x: XR, y: YS[2] }, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: { x: 70, y: YM }, a: entrada, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: salida, a: { x: XR + 70, y: YM }, rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: entrada, rol: "trazo", r: 3 },
    { tipo: "punto", en: salida, rol: "trazo", r: 3 },
    { tipo: "linea", de: { x: 30, y: YM }, a: { x: 62, y: YM }, rol: "dato", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha({ x: 64, y: YM }, 0, 8), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: 74, y: YM - 20 }, texto: "I = 11/2 A", rol: "dato", tam: 12, negrita: true },
  ];
  ramas.forEach((b, i) => {
    el.push({ tipo: "path", d: resistorZigzag(b.de, b.a), rol: "trazo" });
    el.push({ tipo: "texto", en: { x: (XL + XR) / 2, y: b.de.y - 15 }, texto: NOMBRES[i], rol: "trazo", tam: 11.5 });
  });
  return { ancho: XR + 90, alto: YS[2] + 22, pasos: 0, elementos: el };
}

// ── Lote 2-2005 2da opción (facsímil 053_ExamenAdmisionSegundaOpcion2-2005.pdf,
// "EXAMEN DE INGRESO SEGUNDA OPCIÓN 2-2005"; pág. 1 y 2, 500-600 dpi) ──

// G10 · seis cilindros de radio r en triángulo 3-2-1 sobre la mesa; x va de la
// mesa al centro del de arriba (la línea punteada del facsímil sale del
// centro). Cada centro de una fila sale de ser tangente a los DOS de abajo, no
// se pone a mano; después se mide x sobre lo dibujado: r + 2·r√3 (a).
function g10SeisCilindrosTriangulo(): Figura {
  const r = 26;
  const Y0 = 206;                                  // la mesa
  const X0 = 96;                                   // centro del primero de abajo
  const sobre = (a: Pt, b: Pt): Pt => {
    const m: Pt = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const d = distancia(a, b);
    return avanzar(m, anguloHacia(a, b) + 90, Math.sqrt(4 * r * r - (d / 2) ** 2));
  };
  const fila1: Pt[] = [0, 1, 2].map((i) => ({ x: X0 + 2 * r * i, y: Y0 - r }));
  const fila2: Pt[] = [sobre(fila1[0], fila1[1]), sobre(fila1[1], fila1[2])];
  const cima = sobre(fila2[0], fila2[1]);
  const todos = [...fila1, ...fila2, cima];

  const tangentes: [Pt, Pt][] = [
    [fila1[0], fila1[1]], [fila1[1], fila1[2]], [fila2[0], fila2[1]],
    [fila2[0], fila1[0]], [fila2[0], fila1[1]], [fila2[1], fila1[1]], [fila2[1], fila1[2]],
    [cima, fila2[0]], [cima, fila2[1]],
  ];
  for (const [a, b] of tangentes) verificarDistancia("cilindros tangentes", 2 * r, distancia(a, b), 0.01);
  for (let i = 0; i < todos.length; i++) {
    for (let j = i + 1; j < todos.length; j++) {
      if (distancia(todos[i], todos[j]) < 2 * r - 0.01) throw new Error("Figura inconsistente: dos cilindros se pisan");
    }
  }
  verificarDistancia("x medida de la mesa al centro de arriba = r + 2r√3", r + 2 * r * Math.sqrt(3), Y0 - cima.y, 0.01);

  const XX = fila1[2].x + r + 34;                  // línea de la cota x
  const radioFin = avanzar(fila1[0], 215, r);
  const el: Elemento[] = [
    { tipo: "linea", de: { x: X0 - r - 30, y: Y0 }, a: { x: XX + 34, y: Y0 }, rol: "trazo", grosor: 2 },
    ...rayado(X0 - r - 30, XX + 34, Y0),
    ...todos.map((c): Elemento => ({ tipo: "path", d: circuloPath(c, r), rol: "trazo" })),
    { tipo: "punto", en: cima, rol: "trazo", r: 2.4 },
    { tipo: "linea", de: cima, a: { x: XX, y: cima.y }, rol: "incognita", punteada: true, grosor: 1.3 },
    { tipo: "linea", de: { x: XX, y: cima.y }, a: { x: XX, y: Y0 }, rol: "incognita", grosor: 1.6 },
    { tipo: "texto", en: { x: XX + 14, y: (cima.y + Y0) / 2 }, texto: "x", rol: "incognita", tam: 16, negrita: true, cursiva: true },
    { tipo: "punto", en: fila1[0], rol: "trazo", r: 2 },
    { tipo: "linea", de: fila1[0], a: radioFin, rol: "dato", grosor: 1.4 },
    { tipo: "texto", en: avanzar(avanzar(fila1[0], 215, r / 2), 125, 9), texto: "r", rol: "dato", tam: 13, negrita: true, cursiva: true },
  ];
  return { ancho: Math.round(XX + 50), alto: Y0 + 22, pasos: 0, elementos: el };
}

// F19 · plano inclinado con el cateto vertical h a la izquierda, θ abajo a la
// derecha y el bloque arriba con la flecha de su movimiento rampa abajo. El
// enunciado NO da θ y no hace falta: a velocidad constante la fricción disipa
// todo mgh = 10 J (a). Se dibuja con la inclinación del trazo del facsímil
// (~27°) y θ va sin número.
function f19PlanoAlturaHTheta(): Figura {
  const TH = 27;
  const P: Pt = { x: 96, y: 176 };                 // ángulo recto
  const T: Pt = { x: P.x, y: P.y - 120 };          // lo alto
  const Q = hastaY(T, -TH, P.y);                   // pie de la rampa
  const bajada = anguloHacia(T, Q);

  verificarAngulo("inclinación θ del trazo", TH, anguloEn(Q, P, T));
  const bloque = bloqueSobre(avanzar(T, bajada, 26), bajada, 34, 20);
  verificarDistancia("el bloque apoya sobre la rampa", 0, Math.abs(ladoDe(T, Q, bloque[0])) + Math.abs(ladoDe(T, Q, bloque[1])), 0.5);
  if (Math.sign(ladoDe(T, Q, bloque[2])) === Math.sign(ladoDe(T, Q, P))) throw new Error("Figura inconsistente: el bloque quedó adentro del plano");

  const cara = avanzar({ x: (bloque[0].x + bloque[3].x) / 2, y: (bloque[0].y + bloque[3].y) / 2 }, bajada, 4);
  const punta = avanzar(cara, bajada, 40);
  if (desvioParalelas(cara, punta, T, Q) > 0.5) throw new Error("Figura inconsistente: la flecha no va paralela al plano");
  if (!(punta.y > cara.y && punta.x > cara.x)) throw new Error("Figura inconsistente: la flecha debería ir rampa abajo");
  const arcoT = arcoAngulo(Q, 180, 180 - TH, 40, 56);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [P, T, Q], rol: "trazo", relleno: true, rellenoColor: "#f1f0eb" },
    { tipo: "cuadradoRecto", d: cuadradoRecto(P, 0, 90, 10), rol: "trazo" },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#d8d8e4" },
    { tipo: "texto", en: avanzar(bloque[3], 90, 12), texto: "1 kg", rol: "dato", tam: 11.5, negrita: true },
    { tipo: "linea", de: cara, a: punta, rol: "trazo", grosor: 1.5 },
    { tipo: "path", d: cabezaFlecha(punta, bajada, 8), rol: "trazo", relleno: true },
    ...cotaVertical(P.x - 22, T.y, P.y, "dato"),
    { tipo: "texto", en: { x: P.x - 30, y: (T.y + P.y) / 2 }, texto: "h = 1 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    { tipo: "arco", d: arcoT.d, rol: "trazo" },
    { tipo: "texto", en: arcoT.etiquetaEn, texto: "θ", rol: "trazo", tam: 14, negrita: true, cursiva: true },
  ];
  return { ancho: Math.round(Q.x + 24), alto: P.y + 20, pasos: 0, elementos: el };
}

// ── Lote 1-2011 1ra opción (facsímil 110_ExamenAdmisionPrimeraOpcion1-2011.pdf,
// "1-2011", pág. 2, 600-1200 dpi) ──

// F10 · el proyectil sale del borde de una terraza de altura D a 45° y cae a D
// del pie. El facsímil rotula las dos cotas con la MISMA letra D, que es el dato
// que hace soluble el problema. La parábola es la física (v₀ = 20 m/s, 45°,
// g = 10) y el punto de caída sale de resolver y(t) = −D, no se pone a mano:
// si D no fuera 80 m, la caída no quedaría a D del pie y la figura tira.
// 10√2·t − 5t² = −10√2·t → t = 4√2 s → D = 10√2·4√2 = 80 m (d).
function f10TiroAlturaDAlcanceD(): Figura {
  const E = 2.4;                                   // px por metro
  const V0 = 20, TH = 45, G = 10, D = 80;
  const vx = V0 * Math.cos((TH * Math.PI) / 180), vy = V0 * Math.sin((TH * Math.PI) / 180);
  const O: Pt = { x: 150, y: 62 };                 // borde de la terraza
  const Y0 = O.y + D * E;                          // el piso
  const pie: Pt = { x: O.x, y: Y0 };
  const en = (t: number): Pt => ({ x: O.x + vx * t * E, y: O.y - (vy * t - (G / 2) * t * t) * E });
  const tCaida = (vy + Math.sqrt(vy * vy + 2 * G * D)) / G;
  const caida = en(tCaida);
  verificarDistancia("la caída queda en el piso", Y0, caida.y, 0.5);
  verificarDistancia("la caída queda a D del pie", D * E, caida.x - pie.x, 0.5);

  const N = 44;
  const curva = Array.from({ length: N + 1 }, (_, i) => en((tCaida * i) / N));
  const punta = avanzar(O, TH, 46);
  const arco = arcoAngulo(O, 0, TH, 24, 36);
  verificarAngulo("arco de 45°", TH, arco.medida);
  const xv = O.x - 20;                             // cota vertical
  const yh = Y0 + 16;                              // cota horizontal

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 24, y: O.y }, a: O, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: O, a: pie, rol: "trazo", grosor: 2 },
    { tipo: "linea", de: pie, a: { x: caida.x + 24, y: Y0 }, rol: "trazo", grosor: 1.4 },
    ...punteadoPor(curva, "trazo"),
    { tipo: "linea", de: O, a: { x: O.x + 44, y: O.y }, rol: "trazo", punteada: true, grosor: 1 },
    { tipo: "linea", de: O, a: punta, rol: "dato", grosor: 1.8 },
    { tipo: "path", d: cabezaFlecha(punta, TH, 8), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: punta.x - 8, y: punta.y - 8 }, texto: "v₀ = 20 m/s", rol: "dato", tam: 11.5, negrita: true, ancla: "end" },
    { tipo: "arco", d: arco.d, rol: "dato" },
    { tipo: "texto", en: { x: arco.etiquetaEn.x + 6, y: arco.etiquetaEn.y }, texto: "45°", rol: "dato", tam: 11, negrita: true, ancla: "start" },
    { tipo: "punto", en: caida, rol: "trazo", r: 3 },
    ...cotaVertical(xv, O.y, Y0, "dato"),
    { tipo: "texto", en: { x: xv - 8, y: (O.y + Y0) / 2 }, texto: "D", rol: "dato", tam: 14, negrita: true, ancla: "end" },
    { tipo: "linea", de: { x: pie.x, y: yh }, a: { x: caida.x, y: yh }, rol: "dato", grosor: 1.4 },
    { tipo: "path", d: cabezaFlecha({ x: pie.x, y: yh }, 180, 7), rol: "dato", relleno: true },
    { tipo: "path", d: cabezaFlecha({ x: caida.x, y: yh }, 0, 7), rol: "dato", relleno: true },
    { tipo: "texto", en: { x: (pie.x + caida.x) / 2, y: yh + 14 }, texto: "D", rol: "dato", tam: 14, negrita: true },
  ];
  return { ancho: Math.round(caida.x + 40), alto: Math.round(yh + 26), pasos: 0, elementos: el };
}

// F12 · la fuente de 12 V en el lado izquierdo; un cable vertical al medio con
// el de 1 μF; arriba a la derecha el de 4 μF sobre el cable de arriba y, debajo,
// el de 2 μF sobre un cable horizontal que va del cable del medio al lado
// derecho. En el facsímil los cables pasan de largo entre las placas de los tres
// capacitores (dibujo de Word superpuesto); se lee cada capacitor cortando su
// cable, que es lo único que da un circuito.
// Se verifica sobre lo dibujado: cada extremo se asigna al nodo del cable que
// toca, la fuente fija 12 V entre sus bornes y los tres quedan entre los MISMOS
// dos nodos, en paralelo con la fuente: Q = 1 μF · 12 V = 12 μC (c).
function f12Capacitores124Fuente12(): Figura {
  const XL = 64, XM = 214, XR = 374;
  const YT = 52, YM = 142, YB = 232;
  const cables: [Pt, Pt][] = [
    [{ x: XL, y: YT }, { x: XM, y: YT }],          // arriba, de la fuente al medio
    [{ x: XM, y: YT }, { x: XM, y: YM }],          // medio, tramo de arriba
    [{ x: XR, y: YT }, { x: XR, y: YB }],          // lado derecho
    [{ x: XL, y: YB }, { x: XR, y: YB }],          // abajo
  ];
  const fuente = { mas: { x: XL, y: YT }, menos: { x: XL, y: YB }, V: 12 };
  const caps = [
    { C: 1, de: { x: XM, y: YM }, a: { x: XM, y: YB }, rot: "1 μF", lado: -1.9 },
    { C: 4, de: { x: XM, y: YT }, a: { x: XR, y: YT }, rot: "4 μF", lado: 1.25 },
    { C: 2, de: { x: XM, y: YM }, a: { x: XR, y: YM }, rot: "2 μF", lado: 1.25 },
  ];

  // nodos: cables que se tocan (un extremo apoyado sobre el otro) son el mismo nodo
  const sobre = (p: Pt, [a, b]: [Pt, Pt]) => {
    const L = distancia(a, b);
    const t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / (L * L);
    return t >= -1e-9 && t <= 1 + 1e-9 && Math.abs(ladoDe(a, b, p)) < 0.01;
  };
  const padre = cables.map((_, i) => i);
  const raiz = (i: number): number => (padre[i] === i ? i : (padre[i] = raiz(padre[i])));
  cables.forEach((c, i) => cables.forEach((d, j) => {
    if (sobre(c[0], d) || sobre(c[1], d)) padre[raiz(i)] = raiz(j);
  }));
  const nodo = (p: Pt): number => {
    const i = cables.findIndex((c) => sobre(p, c));
    if (i < 0) throw new Error(`Figura inconsistente: el borne (${p.x}, ${p.y}) queda colgando`);
    return raiz(i);
  };
  const nMas = nodo(fuente.mas), nMenos = nodo(fuente.menos);
  if (nMas === nMenos) throw new Error("Figura inconsistente: la fuente quedó en cortocircuito");
  const V = (n: number) => {
    if (n === nMas) return fuente.V;
    if (n === nMenos) return 0;
    throw new Error("Figura inconsistente: hay un nodo que no toca la fuente");
  };
  for (const c of caps) {
    if (V(nodo(c.de)) === V(nodo(c.a))) throw new Error(`Figura inconsistente: el de ${c.rot} quedó en cortocircuito`);
  }
  const q1 = caps[0].C * Math.abs(V(nodo(caps[0].de)) - V(nodo(caps[0].a)));
  verificarDistancia("carga del de 1 μF en el circuito dibujado (c) 12 μC", 12, q1, 1e-9);

  const el: Elemento[] = [
    ...cables.map(([de, a]): Elemento => ({ tipo: "linea", de, a, rol: "trazo", grosor: 1.6 })),
    ...pila(fuente.mas, fuente.menos, ""),
    { tipo: "texto", en: { x: XL + 18, y: (YT + YB) / 2 }, texto: "12 V", rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "start" },
    ...caps.flatMap((c) => capacitor(c.de, c.a, c.rot, c.lado)),
    { tipo: "punto", en: { x: XM, y: YT }, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: { x: XM, y: YM }, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: { x: XR, y: YM }, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: { x: XM, y: YB }, rol: "trazo", r: 2.6 },
  ];
  return { ancho: XR + 30, alto: YB + 22, pasos: 0, elementos: el };
}

// ── Lote 1-2014 1ra opción (facsímil 128_1ra-op-1-2014.pdf, "EXAMEN-INGRESO
// 1-2014 (PRIMERA OPCION)", pág. 2, 600 dpi) ──

// F12 · la esfera m a la izquierda con el hilo L horizontal hasta el Eje; desde
// el Eje baja un hilo punteado hasta la esfera punteada en el punto más bajo.
// El facsímil no dibuja el arco del recorrido. La posición más baja sale de
// medir L hacia abajo desde el Eje por separado, y se comprueba que el hilo
// punteado mide lo mismo que el horizontal.
// mgL = ½mv² → v² = 20; T = mg + mv²/L = 10 + 20 = 30 N (d).
function f12PenduloHorizontalEje(): Figura {
  const L = 150, RE = 13;
  const eje: Pt = { x: 300, y: 62 };
  const esfera: Pt = { x: eje.x - L, y: eje.y };
  const bajo: Pt = { x: eje.x, y: eje.y + L };
  verificarAngulo("el hilo arranca horizontal", 180, Math.abs(anguloHacia(eje, esfera)));
  verificarAngulo("el punto más bajo está debajo del Eje", -90, anguloHacia(eje, bajo));
  verificarDistancia("el hilo punteado mide lo mismo que el horizontal", distancia(eje, esfera), distancia(eje, bajo), 0.01);

  const contorno = Array.from({ length: 21 }, (_, i) => avanzar(bajo, (i * 360) / 20, RE));
  const el: Elemento[] = [
    { tipo: "linea", de: avanzar(esfera, 0, RE), a: avanzar(eje, 180, 4), rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: esfera, rol: "trazo", r: RE },
    { tipo: "path", d: circuloPath(eje, 4), rol: "trazo" },
    { tipo: "linea", de: avanzar(eje, -90, 4), a: avanzar(bajo, 90, RE), rol: "trazo", punteada: true, grosor: 1.4 },
    ...punteadoPor(contorno, "trazo"),
    { tipo: "texto", en: { x: eje.x, y: eje.y - 20 }, texto: "Eje", rol: "trazo", tam: 14 },
    { tipo: "texto", en: { x: (esfera.x + eje.x) / 2, y: eje.y + 18 }, texto: "L = 1 m", rol: "dato", tam: 12, negrita: true },
    { tipo: "texto", en: { x: esfera.x, y: esfera.y + RE + 18 }, texto: "m = 1 kg", rol: "dato", tam: 12, negrita: true },
  ];
  return { ancho: eje.x + 40, alto: bajo.y + RE + 16, pasos: 0, elementos: el };
}

// ── Lote 1-2017 1ra opción (facsímil 146_1ra-op-1-2017.pdf, "EXAMEN-INGRESO
// 1-2017 (1ª OPCION)", pág. 2, 500-700 dpi) ──

// F9 · el bloque arranca en A, arriba de una rampa curva que baja hasta B sobre
// la horizontal punteada; sigue el tramo BC = d y en C (abajo) entra al rizo de
// radio R. El facsímil dibuja d casi el doble de R; acá va a escala con lo que
// dice el enunciado (d = R, h = 27 m) porque d = R es un dato.
// Se verifica la física sobre lo dibujado: con h, d y R MEDIDOS en el dibujo,
// v²_cima = 2gh − 2μgd − 4gR tiene que dar justo gR (completa la vuelta al
// límite). 27 = 0,2R + 2,5R → R = 10 m (c).
function f9RizoRampaTramoBC(): Figura {
  const E = 4.5;                                   // px por metro
  const Y0 = 184;
  const A: Pt = { x: 112, y: Y0 - 27 * E };
  const B: Pt = { x: 236, y: Y0 };
  const C: Pt = { x: B.x + 10 * E, y: Y0 };
  const O: Pt = { x: C.x, y: Y0 - 10 * E };       // centro del rizo, tangente al piso en C
  const R = distancia(O, C);
  const MU = 1 / 5, G = 10;
  const h = (Y0 - A.y) / E, d = (C.x - B.x) / E, r = R / E;
  verificarDistancia("BC = R", R, C.x - B.x, 0.01);
  verificarDistancia("v² en la cima = gR (completa la vuelta justo)", G * r, 2 * G * h - 2 * MU * G * d - 4 * G * r, 1e-6);

  const c1: Pt = { x: A.x + 36, y: A.y + 54 };     // la rampa baja empinada desde A…
  const c2: Pt = { x: B.x - 54, y: Y0 };           // …y llega horizontal a B
  const tangA = anguloHacia(A, c1);
  const bloque = bloqueSobre(A, tangA, 18, 13);
  const puntaR = avanzar(O, 24, R);
  const xh = A.x - 26;

  const el: Elemento[] = [
    { tipo: "linea", de: { x: 26, y: Y0 }, a: B, rol: "trazo", punteada: true, grosor: 1 },
    { tipo: "path", d: `M ${A.x} ${A.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${B.x} ${B.y}`, rol: "trazo" },
    { tipo: "linea", de: B, a: { x: C.x + 26, y: Y0 }, rol: "trazo", grosor: 1.8 },
    { tipo: "path", d: circuloPath(O, R), rol: "trazo" },
    { tipo: "poligono", puntos: bloque, rol: "trazo", relleno: true, rellenoColor: "#1a1a2e" },
    { tipo: "linea", de: O, a: puntaR, rol: "dato", grosor: 1.3 },
    { tipo: "path", d: cabezaFlecha(puntaR, 24, 7), rol: "dato", relleno: true },
    { tipo: "punto", en: O, rol: "trazo", r: 2 },
    { tipo: "texto", en: { x: O.x + 8, y: O.y - 16 }, texto: "R", rol: "dato", tam: 13, negrita: true },
    { tipo: "linea", de: { x: xh - 4, y: A.y }, a: { x: A.x - 6, y: A.y }, rol: "aux", punteada: true, grosor: 1 },
    ...cotaVertical(xh, A.y, Y0, "dato"),
    { tipo: "texto", en: { x: xh - 8, y: (A.y + Y0) / 2 }, texto: "h = 27 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    rotulo({ x: A.x - 10, y: A.y - 16 }, "A", "trazo", 15),
    rotulo({ x: B.x - 6, y: Y0 - 14 }, "B", "trazo", 14),
    rotulo({ x: C.x - 14, y: Y0 - 13 }, "C", "trazo", 14),
    ...cota({ x: B.x, y: Y0 + 16 }, { x: C.x, y: Y0 + 16 }, "d = R", -14),
  ];
  return { ancho: Math.round(O.x + R + 26), alto: Y0 + 46, pasos: 0, elementos: el };
}

// F12 · péndulo cónico: soporte rayado en el techo, eje vertical punteado, la
// cuerda formando θ con el eje y la trayectoria circular punteada (en
// perspectiva, una elipse) con la piedra en su extremo derecho.
// Excepción declarada a "a escala": θ es la incógnita y dibujarla a 45° la
// regalaría; va a 36°, como en el facsímil (medido a 700 dpi).
// T cosθ = mg, T senθ = mω²L senθ → cosθ = g/(ω²L) = 10/(10√2) → θ = 45° (b).
function f12PenduloConicoTheta(): Figura {
  const TH_DIB = 36;
  const L = 172;
  const P: Pt = { x: 196, y: 44 };                 // donde se ata la cuerda
  const piedra = avanzar(P, -90 + TH_DIB, L);
  const centro: Pt = { x: P.x, y: piedra.y };      // centro de la trayectoria, sobre el eje
  const rx = L * Math.sin((TH_DIB * Math.PI) / 180), ry = 20;
  verificarAngulo("θ entre la cuerda y el eje", TH_DIB, anguloEn(P, centro, piedra));
  verificarDistancia("la piedra está sobre la trayectoria", 1, ((piedra.x - centro.x) / rx) ** 2 + ((piedra.y - centro.y) / ry) ** 2, 1e-6);
  const arco = arcoAngulo(P, -90, -90 + TH_DIB, 30, 44);
  verificarAngulo("arco θ", TH_DIB, arco.medida);

  const elipse = Array.from({ length: 41 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 40;
    return { x: centro.x + rx * Math.cos(a), y: centro.y + ry * Math.sin(a) };
  });
  const medio: Pt = { x: (P.x + piedra.x) / 2, y: (P.y + piedra.y) / 2 };
  const el: Elemento[] = [
    { tipo: "linea", de: { x: P.x - 44, y: P.y }, a: { x: P.x + 44, y: P.y }, rol: "trazo", grosor: 2 },
    ...rayado(P.x - 44, P.x + 44, P.y, true),
    { tipo: "linea", de: P, a: { x: P.x, y: centro.y + 6 }, rol: "trazo", punteada: true, grosor: 1.4 },
    ...punteadoPor(elipse, "trazo"),
    { tipo: "linea", de: P, a: piedra, rol: "trazo", grosor: 1.8 },
    { tipo: "punto", en: piedra, rol: "trazo", r: 7 },
    { tipo: "arco", d: arco.d, rol: "incognita" },
    rotulo({ x: arco.etiquetaEn.x + 2, y: arco.etiquetaEn.y + 4 }, "θ", "incognita", 14),
    { tipo: "texto", en: avanzar(medio, TH_DIB, 14), texto: "√2 m", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: centro.x, y: centro.y + ry + 18 }, texto: "ω = √10 rad/s", rol: "dato", tam: 12, negrita: true },
  ];
  return { ancho: Math.round(piedra.x + 50), alto: Math.round(centro.y + ry + 32), pasos: 0, elementos: el };
}

// ── Lote 2-2023 1ra opción (facsímil 2023-2-1op.pdf, "EXAMEN-INGRESO 2-2023
// (1ra OPCION)", martes 13 de junio de 2023; pág. 1 G5-G6 y pág. 2 F10-F12,
// recortes a 500 dpi). El .md traía SVG hechos a mano que el parser prefiere
// a `figura:`; F10 y F11 no eran la figura del facsímil. ──

// Disco relleno (las bolitas grises del facsímil).
function bolita(c: Pt, r: number, color = "#c9c9c9"): Elemento {
  const pts = Array.from({ length: 28 }, (_, i) => avanzar(c, (i * 360) / 28, r));
  return { tipo: "poligono", puntos: pts, rol: "trazo", relleno: true, rellenoColor: color };
}

// G5 · satélite a altura h; las dos tangentes tocan la Tierra en B y C, el arco
// BC (del lado del satélite) es s, y θ va en el centro entre la recta al
// satélite y el radio a C, como en el facsímil. El facsímil la dibuja en
// perspectiva (la Tierra como elipse y el satélite corrido a la derecha); acá
// va de frente y simétrica, que es la misma geometría.
// s = R·2θ → 2θ = 2640π/3960 = 2π/3, θ = 60°; cos θ = R/(R+h) → h = R = 3960 mi (D).
function g5SateliteTangentes(): Figura {
  const R = 92;
  const TH = ((2640 / 3960) * 180) / 2;           // θ en grados, de los datos
  const O: Pt = { x: 170, y: 232 };
  const S = avanzar(O, 90, R / Math.cos((TH * Math.PI) / 180)); // satélite
  const B = avanzar(O, 90 + TH, R);
  const C = avanzar(O, 90 - TH, R);
  const T = avanzar(O, 90, R);                      // pie de h sobre la superficie
  // Las rectas desde el satélite son tangentes: radio ⟂ tangente en B y en C.
  verificarAngulo("SB tangente (radio ⟂ en B)", 90, anguloEn(B, O, S));
  verificarAngulo("SC tangente (radio ⟂ en C)", 90, anguloEn(C, O, S));

  const tierra = Array.from({ length: 72 }, (_, i) => avanzar(O, i * 5, R));
  const th = arcoAngulo(O, 90 - TH, 90, 24, 36);
  const el: Elemento[] = [
    { tipo: "poligono", puntos: tierra, rol: "trazo", relleno: true, rellenoColor: "#dbe8f5" },
    { tipo: "arco", d: arcoDe(O, R, 90 + TH, 90 - TH), rol: "dato", color: ROJO },
    { tipo: "linea", de: S, a: B, rol: "trazo" },
    { tipo: "linea", de: S, a: C, rol: "trazo" },
    { tipo: "linea", de: O, a: B, rol: "trazo", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: O, a: C, rol: "trazo", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: O, a: T, rol: "trazo", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: T, a: S, rol: "incognita", grosor: 2.2 },
    { tipo: "arco", d: th.d, rol: "trazo" },
    rotulo({ x: th.etiquetaEn.x + 2, y: th.etiquetaEn.y + 5 }, "θ", "trazo", 13),
    // el satélite: cuerpo y dos paneles
    { tipo: "poligono", puntos: [{ x: S.x - 22, y: S.y - 4 }, { x: S.x - 8, y: S.y - 4 }, { x: S.x - 8, y: S.y + 2 }, { x: S.x - 22, y: S.y + 2 }], rol: "trazo", relleno: true, rellenoColor: "#9aa4b2" },
    { tipo: "poligono", puntos: [{ x: S.x + 8, y: S.y - 4 }, { x: S.x + 22, y: S.y - 4 }, { x: S.x + 22, y: S.y + 2 }, { x: S.x + 8, y: S.y + 2 }], rol: "trazo", relleno: true, rellenoColor: "#9aa4b2" },
    { tipo: "punto", en: S, rol: "trazo", r: 4.5 },
    { tipo: "punto", en: B, rol: "trazo", r: 2.5 },
    { tipo: "punto", en: C, rol: "trazo", r: 2.5 },
    { tipo: "punto", en: O, rol: "trazo", r: 2 },
    rotulo(avanzar(O, 90 + TH, R + 16), "B", "trazo", 15),
    rotulo(avanzar(O, 90 - TH, R + 16), "C", "trazo", 15),
    rotulo(avanzar(O, 74, R + 13), "s", "dato", 14),
    rotulo({ x: S.x + 13, y: (S.y + T.y) / 2 + 4 }, "h", "incognita", 14),
  ];
  return { ancho: 340, alto: Math.round(O.y + R + 12), pasos: 0, elementos: el };
}

// G6 · dos circunferencias secantes de radios 8 y 3 (A y B), B sobre la mayor.
// La recta de los centros se prolonga hasta C, donde la corta la tangente común
// exterior (D en la mayor, E en la menor); x va de la menor a C. El facsímil
// no rotula 8 ni 3 (están en el texto) y dibuja las circunferencias achatadas
// (GeoGebra con ejes distintos); acá van redondas y a escala.
// C es el centro de homotecia externo: AC/BC = 8/3 con AB = 8 → AC = 12,8,
// x = AC − 11 = 9/5 (A).
function g6SecantesTangenteComun(): Figura {
  const K = 15;                                     // px por cm
  const R = 8 * K, r = 3 * K;
  const A: Pt = { x: 22 + R, y: 26 + R };
  const B: Pt = { x: A.x + R, y: A.y };             // centro de la menor, sobre la mayor
  const C: Pt = { x: A.x + (R * R) / (R - r), y: A.y };
  const phi = (Math.acos(R / distancia(A, C)) * 180) / Math.PI;
  const D = avanzar(A, phi, R);
  const E = avanzar(B, phi, r);
  const X0: Pt = { x: B.x + r, y: A.y };            // borde derecho de la menor
  // Lo que dice el dibujo: DC tangente a las dos, y D, E, C en la misma recta.
  verificarAngulo("DC tangente a la mayor en D", 90, anguloEn(D, A, C));
  verificarAngulo("DC tangente a la menor en E", 90, anguloEn(E, B, C));
  verificarAngulo("D, E y C alineados", 0, desvioParalelas(D, C, E, C), 0.2);

  const dirT = anguloHacia(D, C);
  const el: Elemento[] = [
    { tipo: "path", d: circuloPath(A, R), rol: "trazo" },
    { tipo: "path", d: circuloPath(B, r), rol: "trazo" },
    { tipo: "linea", de: { x: A.x - R, y: A.y }, a: { x: C.x + 18, y: A.y }, rol: "trazo", grosor: 1.3 },
    { tipo: "linea", de: avanzar(D, dirT, -34), a: avanzar(C, dirT, 18), rol: "trazo", grosor: 1.3 },
    { tipo: "linea", de: X0, a: C, rol: "incognita", grosor: 3.2 },
    { tipo: "punto", en: A, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: B, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: C, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: D, rol: "trazo", r: 2.6 },
    { tipo: "punto", en: E, rol: "trazo", r: 2.6 },
    rotulo({ x: A.x, y: A.y - 9 }, "A", "trazo", 14),
    rotulo({ x: B.x + 10, y: B.y - 8 }, "B", "trazo", 14),
    rotulo({ x: C.x + 4, y: C.y - 11 }, "C", "trazo", 14),
    rotulo(avanzar(D, phi, 14), "D", "trazo", 14),
    rotulo(avanzar(E, phi, 14), "E", "trazo", 14),
    rotulo({ x: (X0.x + C.x) / 2, y: A.y + 18 }, "x", "incognita", 14),
  ];
  return { ancho: Math.round(C.x + 34), alto: Math.round(A.y + R + 14), pasos: 0, elementos: el };
}

// F10 · plano inclinado cuadrado PQRS visto en perspectiva oblicua, como en el
// facsímil: PQ arriba y SR abajo (horizontales), el triángulo QFR de costado
// con QF vertical de 5 m, recto en F y 30° en R entre RQ y RF. B en el medio de
// PQ (a y a); A en S con V a lo largo de SR; g hacia abajo a la derecha.
// Excepción declarada a "a escala": es perspectiva, así que el arco de 30° y
// el recto en F se ven deformados en el plano del papel. Las medidas se
// verifican en el modelo 3D que se proyecta, no sobre el dibujo.
// QR = 5/sen 30° = 10 = 2a; B baja 10 m con g sen 30° = 5 m/s² → t = 2 s;
// A recorre SR/2 = 5 m → V = 2,5 m/s (B).
function f10PlanoCuadradoInclinado(): Figura {
  const H = 5, INC = 30;                            // datos: QF = 5 m, 30° en R
  const rad = Math.PI / 180;
  type P3 = { x: number; y: number; z: number };
  const fondo = H / Math.tan(INC * rad);            // RF, horizontal hacia el fondo
  const lado = Math.hypot(fondo, H);                // QR
  const S3: P3 = { x: 0, y: 0, z: 0 }, R3: P3 = { x: lado, y: 0, z: 0 };
  const F3: P3 = { x: lado, y: fondo, z: 0 }, Q3: P3 = { x: lado, y: fondo, z: H };
  const P3_: P3 = { x: 0, y: fondo, z: H };
  const d3 = (a: P3, b: P3) => Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
  const ang3 = (v: P3, a: P3, b: P3) => {
    const u = { x: a.x - v.x, y: a.y - v.y, z: a.z - v.z }, w = { x: b.x - v.x, y: b.y - v.y, z: b.z - v.z };
    return (Math.acos((u.x * w.x + u.y * w.y + u.z * w.z) / (d3(v, a) * d3(v, b))) * 180) / Math.PI;
  };
  // PQRS es un cuadrado de verdad en el espacio, y el triángulo QFR mide lo que rotula.
  verificarDistancia("SR = QR", lado, d3(S3, R3), 1e-9);
  verificarDistancia("PQ = QR", lado, d3(P3_, Q3), 1e-9);
  verificarDistancia("PS = QR", lado, d3(S3, P3_), 1e-9);
  verificarAngulo("recto en R (SR ⟂ RQ)", 90, ang3(R3, S3, Q3));
  verificarAngulo("30° en R entre RQ y RF", INC, ang3(R3, Q3, F3));
  verificarAngulo("recto en F", 90, ang3(F3, Q3, R3));

  const K = 26, KF = 0.62, AF = 40;                 // px por m, escorzo y ángulo del fondo
  const O: Pt = { x: 44, y: 250 };
  const pr = (p: P3): Pt => ({
    x: O.x + K * (p.x + KF * p.y * Math.cos(AF * rad)),
    y: O.y - K * (p.z + KF * p.y * Math.sin(AF * rad)),
  });
  const S = pr(S3), R = pr(R3), F = pr(F3), Q = pr(Q3), P = pr(P3_);
  const B: Pt = { x: (P.x + Q.x) / 2, y: P.y };
  verificarAngulo("QF sigue vertical en el papel", 90, anguloHacia(F, Q), 1e-6);

  const uQ = anguloHacia(F, Q), uR = anguloHacia(F, R);
  const m1 = avanzar(F, uQ, 10), m3 = avanzar(F, uR, 10);
  const m2: Pt = { x: m1.x + m3.x - F.x, y: m1.y + m3.y - F.y };
  const a30 = arcoAngulo(R, anguloHacia(R, F), anguloHacia(R, Q), 30, 42);
  const xg = Q.x + 42;
  const el: Elemento[] = [
    { tipo: "linea", de: P, a: Q, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: P, a: S, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: S, a: R, rol: "trazo", grosor: 2.4 },
    { tipo: "linea", de: R, a: Q, rol: "trazo", grosor: 1.2 },
    { tipo: "linea", de: R, a: F, rol: "trazo", grosor: 1.2 },
    { tipo: "linea", de: F, a: Q, rol: "trazo", grosor: 1.4 },
    { tipo: "path", d: `M ${m1.x.toFixed(2)} ${m1.y.toFixed(2)} L ${m2.x.toFixed(2)} ${m2.y.toFixed(2)} L ${m3.x.toFixed(2)} ${m3.y.toFixed(2)}`, rol: "trazo" },
    { tipo: "arco", d: a30.d, rol: "dato" },
    { tipo: "texto", en: { x: a30.etiquetaEn.x + 4, y: a30.etiquetaEn.y + 4 }, texto: "30°", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    { tipo: "texto", en: { x: Q.x + 6, y: (Q.y + F.y) / 2 + 4 }, texto: "5 m", rol: "dato", tam: 12, negrita: true, ancla: "start" },
    { tipo: "linea", de: { x: xg, y: Q.y + 10 }, a: { x: xg, y: Q.y + 74 }, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d: cabezaFlecha({ x: xg, y: Q.y + 80 }, -90, 8), rol: "trazo", relleno: true },
    { tipo: "texto", en: { x: xg + 8, y: Q.y + 34 }, texto: "g", rol: "trazo", tam: 14, ancla: "start" },
    bolita(B, 7),
    bolita(S, 7),
    { tipo: "linea", de: { x: S.x + 8, y: S.y }, a: { x: S.x + 38, y: S.y }, rol: "dato", grosor: 1.6 },
    { tipo: "path", d: cabezaFlecha({ x: S.x + 44, y: S.y }, 0, 8), rol: "dato", relleno: true },
    rotulo({ x: P.x - 12, y: P.y - 10 }, "P", "trazo", 14),
    rotulo({ x: Q.x + 4, y: Q.y - 10 }, "Q", "trazo", 14),
    rotulo({ x: S.x - 6, y: S.y + 22 }, "S", "trazo", 14),
    rotulo({ x: R.x, y: R.y + 22 }, "R", "trazo", 14),
    rotulo({ x: B.x, y: B.y - 13 }, "B", "trazo", 14),
    rotulo({ x: S.x - 4, y: S.y - 14 }, "A", "trazo", 14),
    rotulo({ x: S.x + 24, y: S.y - 9 }, "V", "dato", 13),
    rotulo({ x: (P.x + B.x) / 2, y: P.y - 8 }, "a", "dato", 13),
    rotulo({ x: (B.x + Q.x) / 2, y: P.y - 8 }, "a", "dato", 13),
  ];
  return { ancho: Math.round(xg + 28), alto: Math.round(S.y + 30), pasos: 0, elementos: el };
}

// F11 · péndulo cargado (q = −10 μC) en un campo uniforme. Fiel al facsímil
// (pág. 2, 500 dpi): las líneas de campo SUBEN hacia la derecha y las flechas
// apuntan hacia abajo a la izquierda; β está en la pared derecha, entre una
// línea y la pared (60° → las líneas van a 30° de la horizontal); α en el
// punto de sujeción, entre la vertical punteada y el hilo, que cuelga a la
// derecha. Con q negativa, la fuerza eléctrica va contra E: hacia arriba a la
// derecha, a 60° de la vertical.
// x: T sen30° = qE sen60° → T = √3·qE; y: mg = T cos30° + qE cos60° = 2qE
// = 2·(10·10⁻⁶)(4000) = 0,080 N (A). El SVG anterior dibujaba las líneas al
// revés (subiendo a la izquierda) y con eso daba qE = 0,040 (B).
function f11CampoElectricoPendulo(): Figura {
  const X0 = 20, Y0 = 20, X1 = 400, Y1 = 250;
  const PEND = 30;                                   // las líneas suben 30° (β = 60° con la pared)
  const DIR_E = 180 + PEND;                          // sentido de las flechas: abajo-izquierda
  const ALFA = 30, BETA = 60;
  const t = Math.tan((PEND * Math.PI) / 180);
  const lineas: { de: Pt; a: Pt }[] = [];
  for (let c = Y0 + 22; c < Y1 + t * (X1 - X0); c += 50) {
    // recta y = c − t·(x − X0), recortada al recuadro
    const xs = Math.max(X0, X0 + (c - Y1) / t), xe = Math.min(X1, X0 + (c - Y0) / t);
    if (xe - xs < 30) continue;
    lineas.push({ de: { x: xs, y: c - t * (xs - X0) }, a: { x: xe, y: c - t * (xe - X0) } });
  }
  // β se marca donde una línea llega a la pared derecha, a media altura.
  const enPared = lineas.filter((l) => Math.abs(l.a.x - X1) < 1e-6 && l.a.y > Y0 + 60 && l.a.y < Y1 - 60);
  if (enPared.length === 0) throw new Error("f11: ninguna línea llega a la pared derecha para marcar β");
  const lb = enPared[0];
  const W = lb.a;
  const abajo: Pt = { x: W.x, y: W.y + 40 };
  verificarAngulo("β entre la línea de campo y la pared", BETA, anguloEn(W, lb.de, abajo));

  const P: Pt = { x: 180, y: 46 };                   // sujeción, bajo el techo
  const esfera = avanzar(P, -90 + ALFA, 128);
  verificarAngulo("α entre la vertical y el hilo", ALFA, anguloEn(P, { x: P.x, y: P.y + 50 }, esfera));

  // Equilibrio con las direcciones DIBUJADAS (eje y hacia arriba): si las
  // flechas o el hilo quedaran del otro lado, T o el peso saldrían negativos.
  const rad = Math.PI / 180;
  const qE = 10e-6 * 4000;
  const f = { x: -qE * Math.cos(DIR_E * rad), y: -qE * Math.sin(DIR_E * rad) }; // q < 0: contra E
  const aHilo = anguloHacia(esfera, P) * rad;
  const u = { x: Math.cos(aHilo), y: Math.sin(aHilo) };
  const T = -f.x / u.x;
  const peso = T * u.y + f.y;
  if (!(T > 0 && peso > 0)) throw new Error(`f11: el dibujo no puede estar en equilibrio (T = ${T}, mg = ${peso})`);
  verificarDistancia("mg en equilibrio con lo dibujado = 0,080 N", 0.08, peso, 1e-6);

  const el: Elemento[] = [
    { tipo: "poligono", puntos: [{ x: X0, y: Y0 }, { x: X1, y: Y0 }, { x: X1, y: Y1 }, { x: X0, y: Y1 }], rol: "trazo" },
    ...lineas.flatMap((l): Elemento[] => {
      const m: Pt = { x: (l.de.x + l.a.x) / 2, y: (l.de.y + l.a.y) / 2 };
      return [
        { tipo: "linea", de: l.de, a: l.a, rol: "trazo", grosor: 1.4 },
        { tipo: "path", d: cabezaFlecha(avanzar(m, DIR_E, 5), DIR_E, 9), rol: "trazo", relleno: true },
      ];
    }),
    { tipo: "poligono", puntos: [{ x: P.x - 58, y: P.y - 12 }, { x: P.x + 58, y: P.y - 12 }, { x: P.x + 58, y: P.y }, { x: P.x - 58, y: P.y }], rol: "trazo", relleno: true, rellenoColor: "#d5d5d0" },
    { tipo: "linea", de: { x: P.x - 60, y: P.y }, a: { x: P.x + 60, y: P.y }, rol: "trazo", grosor: 1.8 },
    { tipo: "linea", de: P, a: { x: P.x, y: P.y + 92 }, rol: "trazo", punteada: true, grosor: 1.2 },
    { tipo: "linea", de: P, a: avanzar(esfera, 90 + ALFA, 11), rol: "trazo", grosor: 1.6 },
    bolita(esfera, 11),
    { tipo: "arco", d: arcoAngulo(P, -90, -90 + ALFA, 30).d, rol: "dato" },
    rotulo(arcoAngulo(P, -90, -90 + ALFA, 30, 58).etiquetaEn, "α", "dato", 14),
    { tipo: "arco", d: arcoAngulo(W, DIR_E, -90, 30).d, rol: "dato" },
    rotulo(avanzar(W, (DIR_E + 270) / 2, 18), "β", "dato", 14),
    rotulo({ x: 96, y: 154 }, "E", "trazo", 15),
  ];
  return { ancho: X1 + 20, alto: Y1 + 20, pasos: 0, elementos: el };
}

// F12 · lanzamiento horizontal desde A con v₀; B está 10 m debajo de A (pared
// vertical) y desde B baja la rampa a 45° hasta el piso, con el 45° marcado al
// pie, entre la rampa y el piso, como en el facsímil. La parábola sale de A y
// toca la rampa en C. El piso no es un dato: va 4 m debajo de C.
// ½gt² = 10 + v₀t → t = 2 s; C = (10, 20) desde A → BC = 10√2 m (D).
function f12ProyectilRampa45(): Figura {
  const V0 = 5, G = 10, H = 10, K = 9;               // m/s, m/s², m, px por m
  const A: Pt = { x: 74, y: 44 };
  const B: Pt = { x: A.x, y: A.y + H * K };
  const tC = (V0 + Math.sqrt(V0 * V0 + 2 * G * H)) / G; // cruce con la rampa (tan 45° = 1)
  const tray = (tt: number): Pt => ({ x: A.x + V0 * tt * K, y: A.y + 0.5 * G * tt * tt * K });
  const C = tray(tC);
  verificarAngulo("C (donde cae la parábola) está sobre la rampa a 45°", -45, anguloHacia(B, C));
  const yPiso = C.y + 4 * K;
  const pie = hastaY(B, -45, yPiso);

  const d = Array.from({ length: 25 }, (_, i) => tray((tC * i) / 24))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const a45 = arcoAngulo(pie, 135, 180, 26, 50);
  const bola: Pt = { x: A.x, y: A.y - 6 };
  const el: Elemento[] = [
    { tipo: "linea", de: { x: A.x - 40, y: A.y }, a: A, rol: "trazo", grosor: 2.6 },
    { tipo: "linea", de: A, a: B, rol: "trazo", grosor: 2.6 },
    { tipo: "linea", de: { x: B.x - 40, y: B.y }, a: B, rol: "trazo", grosor: 1.6 },
    { tipo: "linea", de: B, a: pie, rol: "trazo", grosor: 3 },
    { tipo: "linea", de: { x: pie.x - 120, y: yPiso }, a: pie, rol: "trazo", grosor: 1.6 },
    { tipo: "path", d, rol: "trazo" },
    bolita(bola, 6),
    { tipo: "linea", de: { x: bola.x + 7, y: bola.y }, a: { x: bola.x + 34, y: bola.y }, rol: "dato", grosor: 1.6 },
    { tipo: "path", d: cabezaFlecha({ x: bola.x + 40, y: bola.y }, 0, 8), rol: "dato", relleno: true },
    { tipo: "punto", en: C, rol: "trazo", r: 3 },
    { tipo: "arco", d: a45.d, rol: "dato" },
    rotulo({ x: a45.etiquetaEn.x, y: a45.etiquetaEn.y + 4 }, "45°", "dato", 11),
    rotulo({ x: A.x - 14, y: A.y - 12 }, "A", "trazo", 14),
    rotulo({ x: bola.x + 22, y: bola.y - 10 }, "v₀", "dato", 13),
    { tipo: "texto", en: { x: A.x - 8, y: (A.y + B.y) / 2 + 4 }, texto: "10 m", rol: "dato", tam: 12, negrita: true, ancla: "end" },
    rotulo({ x: B.x + 13, y: B.y - 2 }, "B", "trazo", 14),
    rotulo({ x: C.x + 14, y: C.y - 6 }, "C", "trazo", 14),
  ];
  return { ancho: Math.round(pie.x + 24), alto: Math.round(yPiso + 16), pasos: 0, elementos: el };
}

const CONSTRUCTORES: Record<string, () => Figura> = {
  "f24-tres-resistencias-paralelo": f24tresParalelo,
  "f9-caida-y-lanzamiento-45": f9caidaYLanzamiento,
  "f11-pared-de-la-muerte": f11paredMuerte,
  "f20-dos-fuentes-nodo-comun": f20dosFuentesNodo,
  "f19-pendulos-choque-elastico": f19pendulosChoque,
  "f10-tres-bloques-cable2": f10tresBloquesCable,
  "f18-plano-cuerda-equilibrio": f18planoEquilibrio,
  "f12-energia-rampa-friccion": f12energiaRampa,
  "f6-secantes-potencia-punto": f6secantesPotencia,
  "f7-secantes-arcos-bde": f7secantesArcos,
  // El mismo dibujo sirve para 2-2022 P11 y 1-2025 P19: enunciado y datos idénticos.
  "f11-atwood-separacion-h": f11atwoodH,
  "f19-atwood-separacion-h": f11atwoodH,
  "f17-plano-inclinado-rozamiento": f17planoRozamiento,
  "f12-cuatro-resistencias-ab": f12cuatroRamas,
  // El mismo dibujo sirve para F9 de 2-2022 y F10 de 3-2022: enunciado,
  // datos y figura son identicos entre los dos examenes.
  "g7-dos-cuadrados-arcos": g7dosCuadrados,
  "f9-parabolico-hmax": f9parabolico,
  "f10-parabolico-hmax": f9parabolico,
  "g7-camaras-angulos-2a-a-2a": g7camaras,
  "g5-semicircunferencias-cuadrado": g5semisCuadrado,
  "g6-triangulo-tres-cuadrados": g6tresCuadrados,
  "g7-triangulo-cuadrado-sombreado": g7trianguloOscuro,
  "f9-cuatro-vectores-circulo": f9vectores,
  "g8-octogono-secantes": g8octogono,
  "g5-semicirculo-cuartocirculo": g5rectArcos,
  "g7-semicirculo-circulo-inscrito-30-grados": g7semiInscrito,
  "f11-rizo-circular": f11rizo,
  "f12-circuito-cuatro-resistencias-r": f12cuatroR,
  "f10-circuito-4r-10v-3r-5v": f10ramal,
  "f10-polea": f10polea,
  "f9-circuito-puente": f9puente,
  "f12-circuito-dos-fuentes": f12dosFuentes,
  "f10-proyectil-energia": f10proyectil,
  "f12-esfera-trayectoria-semicircular": f12esfera,
  // El mismo problema aparece en los exámenes 1-2025 (1ra opción, G8) y
  // 2-2025 (1ra opción, G5) con datos idénticos, así que comparten figura.
  // Las opciones difieren solo en el redondeo (1,66 y 1,65 de d = 1,6569).
  "g8-angulo-vision-cuadro": g8cuadro,
  "g5-angulo-vision-cuadro": g8cuadro,
  "f11-carrito-acelerado-resorte": f11carrito,
  "f11-moscas-sombras": f11moscas,
  "g5-triangulo-cp-pb": g5trianguloCP,
  "f12-disco-piso-aspero-mu": f12disco,
  "f19-tres-cargas-simetricas": f19cargas,
  "g5-cadena": g5cadena,
  "g6-pentagono-angulos-exteriores": g6pentagono,
  "g7-cuadrilatero": g7cuadrilatero,
  "g5-paralelas": g5,
  "g6-isosceles": g6,
  "g7-cuadrado": g7,
  "f10-plano": f10,
  "f11-campo": f11,
  "f12-circuito": f12,
  "g5-equilatero-inscrito": g5b,
  "g6-cuadrilatero-incirculos": g6b,
  "f9-movil-tres-instantes": f9b,
  "f10-bloques-en-contacto": f10b,
  "f11-acantilado-dos-esferas": f11b,
  "f12-bloque-fuerza-horizontal": f12b,
  // Examen 1-2016 (1ra opción), leído del facsímil 141_1ra-op-1-2016.pdf.
  "g5-cuadrado-tres-segmentos-5cm": g5tresSegmentos5,
  "g6-cuarto-circulo-cuadrado-tangente": g6cuartoCirculoTangente,
  "g7-equilatero-sombra-sol-30": g7equilateroSombra,
  "f10-colgante-dos-poleas-fijas": f10colganteDosPoleas,
  // Lote 1-2016, resto de las opciones (facsímiles 142 a 145). Las que
  // aparecen dos veces comparten dibujo porque el facsímil es el mismo.
  "g5-cuarto-circulo-area-4pi": g5cuartoCirculoArea4Pi,
  "g8-cuadrilatero-theta-5": g8cuadrilateroTheta5,
  "g5-hexagono-tres-sectores": g5hexagonoTresSectores,
  "g6-cuadrado-triangulo-sombra-30": g6cuadradoTrianguloSombra,
  "g8-cuadrado-punto-medio-cevianas": g8cuadradoPuntoMedioCevianas,
  "g5-bisectriz-17-8": g5bisectriz17y8,
  "g5-bisectriz-16-8": g5bisectriz16y8,
  "g6-recta-biseca-cuadrado": g6rectaBisecaCuadrado,
  "f11-dos-bloques-mesa-hueco": f11dosBloquesMesaHueco,
  // Lote 2017 (facsímiles 146 a 150).
  "f10-dos-cargas-plano": f10dosCargasPlano,
  "g7-cuatro-circulos-en-circulo": g7cuatroCirculosEnCirculo,
  "g6-dos-cuadrados-sombra-izquierda": g6dosCuadradosIzquierda,
  "g7-muro-almena-theta": g7muroAlmenaTheta,
  "g6-dos-cuadrados-sombra-derecha": g6dosCuadradosDerecha,
  "g7-torre-2theta-theta": g7torre2ThetaTheta,
  "g5-triangulo-5-12-13-cuadrado": g5triangulo51213Cuadrado,
  // Lote 2024 · prefacultativo (2024-1-preu.pdf y 2024-2-preu.pdf, que traen
  // los tres examenes de cada gestion adentro).
  "g6-cuadrado-tres-arcos": g6cuadradoTresArcos,
  "g8-trapecio-base-media": g8trapecioBaseMedia,
  "g9-circunferencia-angulos": g9circunferenciaAngulos,
  "g6-paralelas-transversal-2x-s": g6paralelasTransversal,
  "g8-lunas-de-hipocrates": g8lunasHipocrates,
  "g9-trapecio-cuartos": g9trapecioCuartos,
  "g6-thales-de-paralelo-cb": g6thalesDeParaleloCb,
  "f19-red-capacitores": f19redCapacitores,
  // Lote 2018 / 2019 / 2023. El pentagono con la tangente aparece igual en
  // el 1-2018 3ra (G7) y en el 1-2019 3ra (G6): se compararon las dos
  // imagenes antes de compartir el id.
  "g7-cuerdas-ab-paralela-rt": g7cuerdasAbParalelaRt,
  "g7-pentagono-tangente": g7pentagonoTangente,
  "g5-dos-triangulos-base-negra": g5dosTriangulosBaseNegra,
  "g7-cinco-cuadrados-escalera": g7cincoCuadradosEscalera,
  // Las sueltas de 2008 a 2015: casi un PDF por pregunta.
  "g7-dos-cuerdas-potencia": g7dosCuerdasPotencia,
  "g6-diametro-aob-angulo-adc": g6diametroAobAnguloAdc,
  "g7-sector-60-segmento": g7sector60Segmento,
  "g7-diagonales-be-menos-ed": g7diagonalesBeMenosEd,
  // Las cuatro de fisica, una por facsimil. Tres respuestas cambiaron al ver
  // la figura: el puente del 2009, y el circuito del 2025 que estaba en E.
  "f19-tres-resistores-puente": f19tresResistoresPuente,
  "f19-eje-vertical-resorte": f19ejeVerticalResorte,
  "f20-tazon-dos-masas": f20tazonDosMasas,
  "f20-cinco-amperimetros": f20cincoAmperimetros,
  // Auditoria de las "invisibles": las que en septiembre dejaron de nombrar la
  // figura y nadie comparo contra el facsimil. Estas tres estaban BIEN de
  // fondo, pero el enunciado habia quedado arrancando con una coma suelta.
  // El par de 2013 comparte dibujo porque el dibujo no lleva numeros.
  "f-bloques-apilados-polea-mesa": fBloquesApiladosPolea,
  "f18-placas-particula-estacionaria": f18PlacasParticula,
  // Y estas dos salieron con la DESCRIPCION mal, aunque la respuesta estaba
  // bien: el angulo medido desde el eje en lugar de la horizontal, y una
  // correa donde el facsimil tiene los dos rodetes en contacto.
  "f12-semiesfera-giratoria": f12SemiesferaGiratoria,
  "f10-dos-poleas-compuestas": f10DosPoleasCompuestas,
  "g5-perimetro-abc-colineal": g5PerimetroAbcColineal,
  "g5-perimetro-cde-colineal": g5PerimetroCdeColineal,
  // Lote 2015. El rombo lo comparten dos preguntas (una pide el area y la otra
  // el perimetro) porque el dibujo no lleva el resultado.
  "g5-rombo-en-triangulo-3-4": g5RomboEnTriangulo34,
  "g8-cuadrado-sobre-hipotenusa": g8CuadradoSobreHipotenusa,
  "g7-dos-circulos-en-cuadrado": g7DosCirculosEnCuadrado,
  // Lote 2-2005 1ra opción: las tres de Física habían quedado sin dibujo.
  "f17-montana-rusa-semicircular": f17montanaSemicircular,
  "f18-disco-orificio-bala": f18discoOrificio,
  "f19-tobogan-pendulo-balistico": f19toboganPendulo,
  // Lote 1-2012 1ra opción: G8 y las cuatro de Física estaban solo en texto.
  "g8-triangulo-105-45-ley-senos": g8TrianguloLeySenos,
  "f9-plano-4-3-fuerza-paralela": f9PlanoTresCuatroParalela,
  "f10-plano-4-3-fuerza-horizontal": f10PlanoTresCuatroHorizontal,
  "f11-barra-tres-esferas-3q-q": f11BarraTresEsferas,
  "f12-tazon-dos-esferas-equilatero": f12TazonDosEsferas,
  // Lote 1-2018 2da opción: G5 y F9 tenían figura en el PDF y no en el banco.
  "g5-dos-torres-punto-medio-30-60": g5DosTorresPuntoMedio,
  "f9-grafica-vt-trapecio-18s": f9GraficaVtTrapecio,
  // Lote 2-2024 única opción: G7 estaba solo en texto.
  "g7-cuadrilatero-inscrito-arcos-60-110-100-90": g7CuadrilateroInscritoArcos,
  // Lote 1-2005 2da opción: las cuatro de Física tenían figura en el PDF y no en el banco.
  "f17-mesa-polea-m3-m1-m2-colgantes": f17MesaPoleaDosColgantes,
  "f18-camion-auto-antes-del-choque": f18CamionAutoAntesDelChoque,
  "f19-dos-planos-30-tramo-horizontal": f19DosPlanos30TramoHorizontal,
  "f20-tres-resistencias-paralelo-i-11-2": f20TresResistenciasParaleloI,
  // Lote 2-2005 2da opción: G10 y F19.
  "g10-seis-cilindros-triangulo-x": g10SeisCilindrosTriangulo,
  "f19-plano-altura-h-theta-bloque": f19PlanoAlturaHTheta,
  // Lote 1-2011, 1-2014 y 1-2017 (1ra opción): figuras de Física que estaban
  // en el PDF y en el banco solo como texto.
  "f10-tiro-altura-d-alcance-d": f10TiroAlturaDAlcanceD,
  "f12-capacitores-1-4-2-uf-fuente-12v": f12Capacitores124Fuente12,
  "f12-pendulo-horizontal-eje-l": f12PenduloHorizontalEje,
  "f9-rizo-rampa-h-tramo-bc-d": f9RizoRampaTramoBC,
  "f12-pendulo-conico-theta": f12PenduloConicoTheta,
  // Lote 2-2023 1ra opción: las cinco figuras estaban como SVG a mano en el .md.
  "g5-satelite": g5SateliteTangentes,
  "g6-secantes": g6SecantesTangenteComun,
  "f10-plano-cuadrado": f10PlanoCuadradoInclinado,
  "f11-campo-electrico": f11CampoElectricoPendulo,
  "f12-proyectil-rampa": f12ProyectilRampa45,
};

// Cache: la construcción corre una vez por id (las verificaciones también).
const cache = new Map<string, Figura>();

// Los ids registrados, para que un test pueda construirlas TODAS. Sin esto,
// las verificaciones que cada figura lleva adentro solo se disparaban cuando el
// alumno abría la pregunta.
export function idsDeFiguras(): string[] {
  return Object.keys(CONSTRUCTORES);
}

export function construirFigura(id: string): Figura | null {
  const ctor = CONSTRUCTORES[id];
  if (!ctor) return null;
  if (!cache.has(id)) cache.set(id, ctor());
  return cache.get(id)!;
}

export { NAVY, ROJO, AMBAR, VIOLETA, VERDE };

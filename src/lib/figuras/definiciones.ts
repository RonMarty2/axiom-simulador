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
  incirculo,
  resistorZigzag,
  verificarAngulo,
  verificarDistancia,
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
// Reconstruida contra el PDF real (19-jul-2026): NO son sentidos horizontales
// opuestos — es una esfera lanzada HORIZONTAL (30 m/s) y la otra lanzada
// hacia ABAJO (20 m/s), ambas desde el mismo punto/altura, simultáneas.
function f11b(): Figura {
  const borde: Pt = { x: 180, y: 70 };
  const bola1: Pt = { x: 200, y: 70 };
  const bola2: Pt = { x: 235, y: 70 };
  const el: Elemento[] = [
    { tipo: "poligono", puntos: [{ x: 20, y: 70 }, borde, { x: 180, y: 270 }, { x: 20, y: 270 }], rol: "trazo", relleno: true, rellenoColor: "#c7c7d1" },
    { tipo: "punto", en: bola1, rol: "trazo", r: 7 },
    { tipo: "punto", en: bola2, rol: "trazo", r: 7 },
    // esfera 1: lanzamiento HORIZONTAL a 30 m/s
    { tipo: "linea", de: avanzar(bola1, 0, 10), a: avanzar(bola1, 0, 80), rol: "resultado", color: ROJO, grosor: 2 },
    { tipo: "path", d: cabezaFlecha(avanzar(bola1, 0, 80), 0, 7), rol: "resultado", color: ROJO, relleno: true },
    { tipo: "texto", en: { x: bola1.x + 40, y: bola1.y - 14 }, texto: "30 m/s", rol: "resultado", color: ROJO, tam: 12, negrita: true },
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

const CONSTRUCTORES: Record<string, () => Figura> = {
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

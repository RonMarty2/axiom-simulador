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
function resistencia(de: Pt, a: Pt, etiqueta: string, ladoEtiqueta = 1): Elemento[] {
  const dir = anguloHacia(de, a);
  const medio = { x: (de.x + a.x) / 2, y: (de.y + a.y) / 2 };
  return [
    { tipo: "path", d: resistorZigzag(de, a, 6, 5), rol: "trazo" },
    { tipo: "texto", en: avanzar(medio, dir + 90, 18 * ladoEtiqueta), texto: etiqueta, rol: "dato", color: AMBAR, tam: 11.5, negrita: true, ancla: "middle" },
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
// opción, F12): son TRES ramas en paralelo — una R arriba, dos R en serie al
// medio, una R abajo. Esa topología da Req = 2R/5 = 2 Ω con R = 5 Ω.
function f12cuatroR(): Figura {
  const IZQ = 96, DER = 330;
  const ARRIBA = 54, MEDIO = 112, ABAJO = 170;
  const a: Pt = { x: IZQ - 34, y: MEDIO };
  const b: Pt = { x: DER + 34, y: MEDIO };

  const el: Elemento[] = [
    // verticales que unen las tres ramas
    { tipo: "linea", de: { x: IZQ, y: ARRIBA }, a: { x: IZQ, y: ABAJO }, rol: "trazo" },
    { tipo: "linea", de: { x: DER, y: ARRIBA }, a: { x: DER, y: ABAJO }, rol: "trazo" },
    { tipo: "linea", de: a, a: { x: IZQ, y: MEDIO }, rol: "trazo" },
    { tipo: "linea", de: { x: DER, y: MEDIO }, a: b, rol: "trazo" },

    // rama de arriba: una R
    ...resistencia({ x: IZQ, y: ARRIBA }, { x: DER, y: ARRIBA }, "R", -1),
    // rama del medio: dos R en serie
    ...resistencia({ x: IZQ, y: MEDIO }, { x: (IZQ + DER) / 2, y: MEDIO }, "R", -1),
    ...resistencia({ x: (IZQ + DER) / 2, y: MEDIO }, { x: DER, y: MEDIO }, "R", -1),
    // rama de abajo: una R
    ...resistencia({ x: IZQ, y: ABAJO }, { x: DER, y: ABAJO }, "R", 1),

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

const CONSTRUCTORES: Record<string, () => Figura> = {
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

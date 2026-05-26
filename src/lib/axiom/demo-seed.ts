// Preguntas de PRUEBA para validar el flujo. Todas llevan el tag DEMO_TAG para
// poder borrarlas de un clic desde el panel admin ("Borrar datos de prueba").
//
// Cubren los 3 tipos que el simulador sabe mostrar y calificar:
//   - seleccion_simple (opción múltiple A/B/C/D)
//   - verdadero_falso
//   - completar (el alumno escribe la respuesta)
// E incluyen fórmulas matemáticas con $...$ para verificar el render.

import type { PreguntaBanco } from "./types";

export const DEMO_TAG = "demo_prueba";

type DemoPregunta = Omit<PreguntaBanco, "id" | "numero">;

const ANIO = new Date().getFullYear();

function mc(
  facultad: string, area: string, tema: string, enunciado: string,
  opciones: [string, string, string, string], correcta: string, explicacion: string,
  dificultad: PreguntaBanco["dificultad"] = "medio"
): DemoPregunta {
  return {
    universidad: "UMSS", facultad, anio: ANIO, area, tema, dificultad,
    enunciado,
    opciones: [
      { letra: "A", texto: opciones[0] },
      { letra: "B", texto: opciones[1] },
      { letra: "C", texto: opciones[2] },
      { letra: "D", texto: opciones[3] },
    ],
    respuesta_correcta: correcta,
    explicacion,
    tipo: "seleccion_simple",
    tags: [DEMO_TAG],
  };
}

function vf(
  facultad: string, area: string, tema: string, enunciado: string,
  esVerdadero: boolean, explicacion: string
): DemoPregunta {
  return {
    universidad: "UMSS", facultad, anio: ANIO, area, tema, dificultad: "facil",
    enunciado,
    opciones: [
      { letra: "A", texto: "Verdadero" },
      { letra: "B", texto: "Falso" },
    ],
    respuesta_correcta: esVerdadero ? "A" : "B",
    explicacion,
    tipo: "verdadero_falso",
    tags: [DEMO_TAG],
  };
}

function llenar(
  facultad: string, area: string, tema: string, enunciado: string,
  respuestas: string[], explicacion: string
): DemoPregunta {
  return {
    universidad: "UMSS", facultad, anio: ANIO, area, tema, dificultad: "medio",
    enunciado,
    opciones: [],
    respuesta_correcta: respuestas.join(", "),
    espacios_completar: respuestas,
    explicacion,
    tipo: "completar",
    tags: [DEMO_TAG],
  };
}

export function preguntasDemo(): DemoPregunta[] {
  return [
    // ── ECONÓMICAS ────────────────────────────────────────────────
    mc("economicas", "matematicas", "ecuaciones", "Si $2x + 6 = 20$, ¿cuánto vale $x$?",
      ["$5$", "$7$", "$13$", "$10$"], "B", "$2x = 14 \\Rightarrow x = 7$.", "facil"),
    mc("economicas", "economicas", "oferta_demanda", "Si baja el precio de un bien normal, su cantidad demandada generalmente:",
      ["Aumenta", "Disminuye", "No cambia", "Se vuelve cero"], "A", "Por la ley de la demanda, a menor precio mayor cantidad demandada."),
    vf("economicas", "economicas", "inflacion", "La inflación es la subida generalizada y sostenida de los precios.", true,
      "Esa es la definición de inflación."),
    llenar("economicas", "verbal", "sinonimos", "Un sinónimo de la palabra 'escaso' es ___.",
      ["limitado"], "Escaso significa poco o limitado."),

    // ── INGENIERÍA ────────────────────────────────────────────────
    mc("ingenieria", "matematicas", "radicales", "Simplifica $\\sqrt{\\frac{49}{16}}$:",
      ["$\\frac{7}{4}$", "$\\frac{4}{7}$", "$\\frac{49}{4}$", "$\\frac{7}{16}$"], "A",
      "$\\sqrt{\\frac{49}{16}} = \\frac{\\sqrt{49}}{\\sqrt{16}} = \\frac{7}{4}$."),
    mc("ingenieria", "fisica", "cinematica", "Un auto a $60$ km/h recorre $120$ km. ¿Cuánto tarda?",
      ["1 hora", "2 horas", "3 horas", "30 min"], "B", "$t = d/v = 120/60 = 2$ horas."),
    vf("ingenieria", "quimica", "atomos", "El agua tiene la fórmula química $H_2O$.", true,
      "El agua está formada por 2 hidrógenos y 1 oxígeno."),
    llenar("ingenieria", "matematicas", "potencias", "El resultado de $2^{3}$ es ___.",
      ["8"], "$2^3 = 2 \\times 2 \\times 2 = 8$."),

    // ── MEDICINA ──────────────────────────────────────────────────
    mc("medicina", "biologia", "celula", "El orgánulo encargado de producir energía en la célula es:",
      ["Núcleo", "Mitocondria", "Ribosoma", "Membrana"], "B", "La mitocondria produce ATP (energía)."),
    vf("medicina", "biologia", "sistema_circulatorio", "El corazón humano tiene cuatro cavidades.", true,
      "Dos aurículas y dos ventrículos."),
    llenar("medicina", "biologia", "anatomia", "La arteria más grande del cuerpo humano es la ___.",
      ["aorta"], "La aorta sale del ventrículo izquierdo y distribuye sangre al cuerpo."),
    llenar("medicina", "quimica", "ph", "Una solución con pH menor a 7 se considera ___.",
      ["acida"], "Por debajo de 7 la solución es ácida; por encima, básica."),

    // ── DERECHO ───────────────────────────────────────────────────
    mc("derecho", "civica", "constitucion", "La norma jurídica de mayor jerarquía en Bolivia es:",
      ["Una ley", "Un decreto", "La Constitución", "Un reglamento"], "C",
      "La Constitución Política del Estado está por encima de toda otra norma."),
    vf("derecho", "historia", "independencia", "Bolivia declaró su independencia en 1825.", true,
      "El 6 de agosto de 1825."),
    llenar("derecho", "civica", "poderes", "El poder del Estado encargado de hacer las leyes es el poder ___.",
      ["legislativo"], "El poder legislativo (Asamblea) crea las leyes."),
  ];
}

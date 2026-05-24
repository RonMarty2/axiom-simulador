import { NextRequest, NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";
import { axiomPDF } from "@/lib/axiom/pdf-builder";
import { llamarIA, extraerJSON } from "@/lib/aiProvider";
import type { PlanPersonalizado, PreguntaBanco, Simulador } from "@/lib/axiom/types";

interface DiaPlan {
  dia: number;
  tema: string;
  tiempo_minutos: number;
  ejercicios: number;
  descripcion: string;
}

interface PlanPersonalizadoInternal extends PlanPersonalizado {
  dias: DiaPlan[];
  pdf_url?: string;
}

interface CreatePlanRequest {
  simuladorId: string;
  usuarioId?: string;
}

interface CreatePlanResponse {
  plan: PlanPersonalizadoInternal;
}

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Economía",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  general: "General",
};

function preguntasFalladas(
  simulador: Simulador
): { area: string; tema: string; enunciado: string }[] {
  const preguntas: PreguntaBanco[] = simulador.preguntas ?? [];
  const respuestas = simulador.respuestas_usuario ?? {};
  return preguntas
    .filter((p) => respuestas[p.id] !== p.respuesta_correcta)
    .map((p) => ({
      area: p.area,
      tema: p.tema,
      enunciado: p.enunciado.slice(0, 160),
    }));
}

function detectarAreaDebil(
  simulador: Simulador
): string {
  const desglose = simulador.desglose ?? {};
  const entries = Object.entries(desglose);
  if (entries.length === 0) return "matematicas";
  return entries.sort(([, a], [, b]) => (a as number) - (b as number))[0][0];
}

function planFallback(areaDebilLabel: string): DiaPlan[] {
  return [
    {
      dia: 1,
      tema: `${areaDebilLabel} — repaso de conceptos base`,
      tiempo_minutos: 30,
      ejercicios: 10,
      descripcion: "Revisa los conceptos fundamentales antes de avanzar.",
    },
    {
      dia: 2,
      tema: `${areaDebilLabel} — problemas intermedios`,
      tiempo_minutos: 40,
      ejercicios: 8,
      descripcion: "Practica con ejercicios de nivel medio.",
    },
    {
      dia: 3,
      tema: `${areaDebilLabel} — simulacro corto`,
      tiempo_minutos: 50,
      ejercicios: 6,
      descripcion: "Aplica todo en un mini simulacro tipo examen.",
    },
  ];
}

async function generarPlanConIA(
  simulador: Simulador,
  areaDebil: string
): Promise<DiaPlan[]> {
  const falladas = preguntasFalladas(simulador);
  if (falladas.length === 0) {
    // No falló nada: plan de "afianzamiento" sobre su área más débil del desglose
    return planFallback(ETIQUETAS_AREA[areaDebil] ?? areaDebil);
  }

  // Agrupa preguntas falladas por tema para que la IA vea la concentración
  const conteo: Record<string, { area: string; cantidad: number; ejemplos: string[] }> = {};
  for (const f of falladas) {
    if (!conteo[f.tema]) {
      conteo[f.tema] = { area: f.area, cantidad: 0, ejemplos: [] };
    }
    conteo[f.tema].cantidad++;
    if (conteo[f.tema].ejemplos.length < 2) {
      conteo[f.tema].ejemplos.push(f.enunciado);
    }
  }

  const resumenErrores = Object.entries(conteo)
    .sort(([, a], [, b]) => b.cantidad - a.cantidad)
    .slice(0, 6)
    .map(([tema, info]) => {
      const ejemplosTxt = info.ejemplos
        .map((e, i) => `  Ejemplo ${i + 1}: "${e}"`)
        .join("\n");
      return `- Tema "${tema}" (área ${info.area}) — ${info.cantidad} errores:\n${ejemplosTxt}`;
    })
    .join("\n");

  const system = [
    "Eres un tutor académico boliviano experto en preparación para el examen de ingreso a la UMSS Facultad de Ciencias Económicas.",
    "Tu trabajo es analizar los errores específicos del estudiante y crear un plan de estudio de exactamente 3 días, MUY personalizado a sus fallos reales.",
    "",
    "REGLAS:",
    "- Cada día debe atacar errores concretos del estudiante, no temas genéricos.",
    "- Día 1: repaso de conceptos donde más falló. Día 2: práctica intermedia. Día 3: simulacro corto.",
    "- Tiempo razonable: 25-60 minutos por día.",
    "- Cantidad de ejercicios: 4-12 por día.",
    "- Descripción concreta: qué hacer ese día (no decir genérico, sí decir 'practicar X tipo de problema').",
    "- Español neutro boliviano (tuteo, NO voseo argentino).",
    "",
    "Devuelve SOLO JSON válido sin markdown:",
  ].join("\n");

  const user = [
    `El estudiante acaba de completar un simulacro con nota ${simulador.nota_final ?? "?"}/100.`,
    `Su área más débil del desglose es: ${ETIQUETAS_AREA[areaDebil] ?? areaDebil}.`,
    "",
    "ERRORES CONCRETOS DEL EXAMEN (ordenados por frecuencia):",
    resumenErrores,
    "",
    "Devuelve EXACTAMENTE este JSON:",
    "{",
    '  "dias": [',
    "    {",
    '      "dia": 1,',
    '      "tema": "Texto breve del tema del día",',
    '      "tiempo_minutos": 30,',
    '      "ejercicios": 8,',
    '      "descripcion": "Qué hacer ese día, concreto y accionable (1-2 frases)."',
    "    }",
    "  ]",
    "}",
    "",
    "El array dias debe tener exactamente 3 entradas.",
  ].join("\n");

  try {
    const { text } = await llamarIA(system, user, 2500);
    const json = extraerJSON(text);
    if (!json || !Array.isArray((json as { dias?: unknown }).dias)) {
      throw new Error("IA no devolvió 'dias'");
    }
    const dias = (json as { dias: Partial<DiaPlan>[] }).dias.slice(0, 3);
    const normalizados: DiaPlan[] = dias.map((d, i) => ({
      dia: typeof d.dia === "number" ? d.dia : i + 1,
      tema: String(d.tema ?? `Día ${i + 1}`).slice(0, 120),
      tiempo_minutos: Math.max(15, Math.min(90, Number(d.tiempo_minutos) || 30)),
      ejercicios: Math.max(3, Math.min(15, Number(d.ejercicios) || 8)),
      descripcion: String(d.descripcion ?? "").slice(0, 400),
    }));
    if (normalizados.length < 3) {
      // Si la IA dio menos de 3, completar con fallback
      const faltan = 3 - normalizados.length;
      const fb = planFallback(ETIQUETAS_AREA[areaDebil] ?? areaDebil);
      for (let i = 0; i < faltan; i++) {
        normalizados.push(fb[normalizados.length]);
      }
    }
    return normalizados;
  } catch (e) {
    console.warn("[plan-personalizado] IA falló, usando fallback:", e);
    return planFallback(ETIQUETAS_AREA[areaDebil] ?? areaDebil);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: CreatePlanRequest = await req.json();
    const { simuladorId, usuarioId } = body;

    if (!simuladorId) {
      return NextResponse.json(
        { error: "simuladorId is required" },
        { status: 400 }
      );
    }

    const simulador = await axiomDB.getSimuladorById(simuladorId);
    if (!simulador) {
      return NextResponse.json(
        { error: "Simulador not found" },
        { status: 404 }
      );
    }

    const areaDebil = detectarAreaDebil(simulador);
    const dias = await generarPlanConIA(simulador, areaDebil);

    const plan: PlanPersonalizadoInternal = {
      id: `plan-${Date.now()}`,
      simulador_id: simuladorId,
      usuario_id: usuarioId || simulador.usuario_id || "demo-user",
      area_debil: ETIQUETAS_AREA[areaDebil] ?? areaDebil,
      dias,
      generado: new Date().toISOString(),
    };

    try {
      const pdfBuffer = axiomPDF.generatePlanPDF(plan);
      const pdfUrl = await axiomPDF.savePlanToStorage(pdfBuffer, plan.id);
      plan.pdf_url = pdfUrl;
    } catch (pdfError) {
      console.warn("PDF generation failed, continuing without PDF:", pdfError);
    }

    const savedPlan = await axiomDB.createPlan(plan);

    const response: CreatePlanResponse = {
      plan: savedPlan as PlanPersonalizadoInternal,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}

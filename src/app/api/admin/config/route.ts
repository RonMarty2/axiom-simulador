import { NextRequest, NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";
import type { ExamenConfig } from "@/lib/axiom/types";

export async function GET() {
  try {
    const config: ExamenConfig = {
      id: "umss-2026-01",
      nombre: "UMSS Examen de Ingreso 2026",
      areas: [
        { nombre: "Matemáticas", cantidad: 40, ponderacion: 0.33 },
        { nombre: "Económicas", cantidad: 30, ponderacion: 0.33 },
        { nombre: "Verbal", cantidad: 30, ponderacion: 0.34 },
      ],
      tiempo_minutos: 180,
      activo: true,
      creado: new Date().toISOString(),
    };
    return NextResponse.json({ config });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const config = await axiomDB.createConfig(body);
    return NextResponse.json({ config }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create config" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const config = await axiomDB.updateConfig(id, updates);
    return NextResponse.json({ config });
  } catch {
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 }
    );
  }
}

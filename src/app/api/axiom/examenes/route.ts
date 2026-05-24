import { NextResponse } from "next/server";
import { listarMetadata } from "@/lib/axiom/banco-loader";

export async function GET() {
  try {
    const examenes = await listarMetadata();
    return NextResponse.json({ examenes });
  } catch (error) {
    console.error("[api/axiom/examenes] error:", error);
    return NextResponse.json(
      { error: "Error cargando banco de examenes" },
      { status: 500 }
    );
  }
}

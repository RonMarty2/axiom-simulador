import { NextRequest, NextResponse } from "next/server";

// Ranking real: empieza vacío. Cuando haya usuarios reales registrando notas
// via POST, se irán acumulando. Mantenemos in-memory hasta migrar a Supabase.
// (Nada de datos falsos: mostrar nombres inventados rompe la credibilidad.)

interface RankingEntry {
  id: string;
  usuario_id: string;
  nombre: string;
  email: string;
  nota: number;
  fecha: string;
}

const rankingStore: RankingEntry[] = [];

export async function GET(_request: NextRequest) {
  try {
    const top = rankingStore
      .slice()
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 5)
      .map((item) => ({
        id: item.usuario_id,
        nombre: item.nombre,
        email: item.email,
        nota: item.nota,
      }));
    return NextResponse.json({ ranking: top });
  } catch (error) {
    console.error("Error fetching ranking:", error);
    return NextResponse.json({ ranking: [], error: "Failed to fetch ranking" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuario_id, nombre, email, nota } = body;

    if (!usuario_id || !nombre || !email || nota === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingIndex = rankingStore.findIndex(
      (r) => r.usuario_id === usuario_id
    );
    if (existingIndex >= 0) {
      if (nota > rankingStore[existingIndex].nota) {
        rankingStore[existingIndex].nota = nota;
        rankingStore[existingIndex].fecha = new Date().toISOString();
      }
    } else {
      rankingStore.push({
        id: `rank-${Date.now()}-${Math.random()}`,
        usuario_id,
        nombre,
        email,
        nota,
        fecha: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Score recorded successfully",
    });
  } catch (error) {
    console.error("Error recording score:", error);
    return NextResponse.json(
      { error: "Failed to record score" },
      { status: 500 }
    );
  }
}

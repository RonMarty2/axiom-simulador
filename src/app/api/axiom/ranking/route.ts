import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

// Ranking real: empieza vacío. Cuando haya usuarios reales registrando notas
// via POST, se irán acumulando. Mantenemos in-memory hasta migrar a Supabase.
// (Nada de datos falsos: mostrar nombres inventados rompe la credibilidad.)

interface RankingEntry {
  id: string;
  usuario_id: string;
  nombre: string;
  nota: number;
  fecha: string;
}

const rankingStore: RankingEntry[] = [];

export async function GET(_request: NextRequest) {
  try {
    // Top 5 público: solo nombre y nota. NO devolvemos email (era fuga) ni
    // usuario_id (facilitaba enumeración cruzada).
    const top = rankingStore
      .slice()
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 5)
      .map((item) => ({
        nombre: item.nombre,
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
    // Tomamos identidad de la SESIÓN, no del body. Así nadie puede inventar
    // nombre/usuario_id ajenos y meter notas falsas o suplantar.
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Necesitas estar logueado para entrar al ranking" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const nota = Number(body?.nota);
    if (!Number.isFinite(nota) || nota < 0 || nota > 100) {
      return NextResponse.json({ error: "Nota inválida" }, { status: 400 });
    }

    const existingIndex = rankingStore.findIndex(
      (r) => r.usuario_id === user.id
    );
    if (existingIndex >= 0) {
      if (nota > rankingStore[existingIndex].nota) {
        rankingStore[existingIndex].nota = nota;
        rankingStore[existingIndex].fecha = new Date().toISOString();
      }
    } else {
      rankingStore.push({
        id: `rank-${Date.now()}-${Math.random()}`,
        usuario_id: user.id,
        nombre: user.nombre,
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

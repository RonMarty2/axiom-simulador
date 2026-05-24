import { NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/lib/api-auth";
import { parseExamenMD } from "@/lib/axiom/banco-parser";

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    throw err;
  }

  try {
    const { contenido } = (await req.json()) as { contenido?: string };
    if (!contenido) {
      return NextResponse.json({ error: "Falta 'contenido'" }, { status: 400 });
    }
    try {
      const examen = parseExamenMD(contenido);
      return NextResponse.json({ ok: true, examen });
    } catch (parseErr) {
      return NextResponse.json({
        ok: false,
        error: parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
}

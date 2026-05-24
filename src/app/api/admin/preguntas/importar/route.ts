import { NextRequest, NextResponse } from "next/server";
import { importarBulk } from "@/lib/axiom/preguntas-store";
import { parsearImport, type FormatoImport, type DefaultsImport } from "@/lib/axiom/import-parsers";
import { isAdmin } from "@/lib/session-mock";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { formato, texto, defaults } = body as {
      formato: FormatoImport;
      texto: string;
      defaults: DefaultsImport;
    };
    if (!formato || !texto || !defaults) {
      return NextResponse.json(
        { error: "Faltan campos: formato, texto, defaults" },
        { status: 400 }
      );
    }
    const preguntas = parsearImport(formato, texto, defaults);
    if (preguntas.length === 0) {
      return NextResponse.json(
        { error: "No se pudo extraer ninguna pregunta del texto" },
        { status: 400 }
      );
    }
    const resultado = await importarBulk(preguntas);
    return NextResponse.json({
      ...resultado,
      parseadas: preguntas.length,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error importando" },
      { status: 400 }
    );
  }
}

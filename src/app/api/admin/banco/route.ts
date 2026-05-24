import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/lib/api-auth";
import { invalidarCache, listarMetadata } from "@/lib/axiom/banco-loader";
import { parseExamenMD } from "@/lib/axiom/banco-parser";

const BANCO_DIR = path.join(process.cwd(), "data", "examenes");

function sanitize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

export async function GET() {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    throw err;
  }

  try {
    const metadata = await listarMetadata();
    const enriquecida = await Promise.all(
      metadata.map(async (m) => {
        const ruta = path.join(
          BANCO_DIR,
          m.universidad.toLowerCase(),
          m.facultad.toLowerCase(),
          `${m.anio}.md`
        );
        const stat = await fs.stat(ruta).catch(() => null);
        return {
          ...m,
          archivo: ruta.replace(process.cwd(), ""),
          bytes: stat?.size ?? 0,
          modificado: stat?.mtime?.toISOString() ?? null,
        };
      })
    );
    return NextResponse.json({ examenes: enriquecida });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
}

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
    if (!contenido?.trim()) {
      return NextResponse.json({ error: "Falta 'contenido'" }, { status: 400 });
    }

    // Parsea para validar y deducir metadata del frontmatter
    let examen;
    try {
      examen = parseExamenMD(contenido);
    } catch (parseErr) {
      return NextResponse.json(
        {
          error: `Error parseando MD: ${
            parseErr instanceof Error ? parseErr.message : String(parseErr)
          }`,
        },
        { status: 400 }
      );
    }

    const universidad = sanitize(examen.universidad);
    const facultad = sanitize(examen.facultad);
    const anio = examen.anio;

    if (!universidad || !facultad || !anio) {
      return NextResponse.json(
        { error: "Frontmatter incompleto (universidad/facultad/anio)" },
        { status: 400 }
      );
    }

    const dirDestino = path.join(BANCO_DIR, universidad, facultad);
    await fs.mkdir(dirDestino, { recursive: true });
    const archivoDestino = path.join(dirDestino, `${anio}.md`);
    await fs.writeFile(archivoDestino, contenido, "utf-8");

    invalidarCache();

    return NextResponse.json({
      ok: true,
      archivo: archivoDestino.replace(process.cwd(), ""),
      examen_id: `${universidad}-${facultad}-${anio}`,
      total_preguntas: examen.preguntas.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error guardando" },
      { status: 500 }
    );
  }
}

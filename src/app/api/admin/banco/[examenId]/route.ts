import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/lib/api-auth";
import { invalidarCache } from "@/lib/axiom/banco-loader";

const BANCO_DIR = path.join(process.cwd(), "data", "examenes");

function parsearId(id: string): { universidad: string; facultad: string; anio: number } | null {
  // Formato esperado: <uni>-<fac>-<anio>
  // Limitación: no soporta facultades con guiones (los habría que escapar)
  const parts = id.split("-");
  if (parts.length < 3) return null;
  const anio = parseInt(parts[parts.length - 1], 10);
  if (!anio || anio < 1900 || anio > 9999) return null;
  // El primer segmento es universidad; el resto (excepto el último) es facultad
  const universidad = parts[0].toLowerCase();
  const facultad = parts.slice(1, -1).join("-").toLowerCase();
  return { universidad, facultad, anio };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ examenId: string }> }
) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    throw err;
  }

  const { examenId } = await params;
  const parsed = parsearId(examenId);
  if (!parsed) {
    return NextResponse.json({ error: "ID de examen inválido" }, { status: 400 });
  }

  const ruta = path.join(
    BANCO_DIR,
    parsed.universidad,
    parsed.facultad,
    `${parsed.anio}.md`
  );

  try {
    const contenido = await fs.readFile(ruta, "utf-8");
    return NextResponse.json({
      examen_id: examenId,
      universidad: parsed.universidad,
      facultad: parsed.facultad,
      anio: parsed.anio,
      contenido,
    });
  } catch {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ examenId: string }> }
) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    throw err;
  }

  const { examenId } = await params;
  const parsed = parsearId(examenId);
  if (!parsed) {
    return NextResponse.json({ error: "ID de examen inválido" }, { status: 400 });
  }

  const ruta = path.join(
    BANCO_DIR,
    parsed.universidad,
    parsed.facultad,
    `${parsed.anio}.md`
  );

  try {
    await fs.unlink(ruta);
    invalidarCache();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error && "code" in err && err.code === "ENOENT"
            ? "Archivo no encontrado"
            : err instanceof Error
            ? err.message
            : "Error eliminando",
      },
      { status: 500 }
    );
  }
}

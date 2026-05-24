import { NextRequest, NextResponse } from "next/server";
import { obtenerPlantilla, type FormatoImport } from "@/lib/axiom/import-parsers";

const EXT: Record<FormatoImport, string> = {
  json: "json",
  markdown: "md",
  csv: "csv",
  gift: "txt",
  aiken: "txt",
  texto: "txt",
};

const MIME: Record<FormatoImport, string> = {
  json: "application/json",
  markdown: "text/markdown",
  csv: "text/csv",
  gift: "text/plain",
  aiken: "text/plain",
  texto: "text/plain",
};

export async function GET(req: NextRequest) {
  const formato = (req.nextUrl.searchParams.get("formato") || "json") as FormatoImport;
  const descargar = req.nextUrl.searchParams.get("descargar") === "1";
  const contenido = obtenerPlantilla(formato);

  if (descargar) {
    return new NextResponse(contenido, {
      headers: {
        "Content-Type": MIME[formato],
        "Content-Disposition": `attachment; filename="axiom-plantilla.${EXT[formato]}"`,
      },
    });
  }
  return NextResponse.json({ formato, contenido });
}

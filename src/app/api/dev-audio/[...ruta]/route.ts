import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";

// Endpoint local para servir los MP3 de Medicina en desarrollo.
// En produccion queda bloqueado con 404 y los audios salen de R2.
export const runtime = "nodejs";

const BASE_DIR = path.resolve(
  process.cwd(),
  "examenes pasados",
  "MEDICINA",
  "LIBROS DE MEDICINA",
  "AUDIOS_MEDICINA_UMSS",
);

function rutaDentroDeBase(archivo: string): boolean {
  const baseConSep = BASE_DIR.endsWith(path.sep) ? BASE_DIR : BASE_DIR + path.sep;
  if (process.platform === "win32") {
    return archivo.toLowerCase().startsWith(baseConSep.toLowerCase());
  }
  return archivo.startsWith(baseConSep);
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ ruta: string[] }> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "No disponible" }, { status: 404 });
  }

  const { ruta } = await context.params;
  if (!Array.isArray(ruta) || ruta.length === 0) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  for (const seg of ruta) {
    if (
      !seg ||
      seg === "." ||
      seg === ".." ||
      seg.includes("/") ||
      seg.includes("\\") ||
      seg.includes("\0")
    ) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
  }

  const archivo = path.resolve(BASE_DIR, ...ruta);
  if (!rutaDentroDeBase(archivo) || !archivo.toLowerCase().endsWith(".mp3")) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  let stat: fs.Stats;
  try {
    stat = await fs.promises.stat(archivo);
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  if (!stat.isFile()) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const total = stat.size;
  const rangeHeader = req.headers.get("range");

  if (rangeHeader) {
    const coincidencia = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
    if (!coincidencia || (coincidencia[1] === "" && coincidencia[2] === "")) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${total}` },
      });
    }

    let start: number;
    let end: number;
    if (coincidencia[1] === "") {
      const sufijo = Number(coincidencia[2]);
      if (!Number.isInteger(sufijo) || sufijo <= 0) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${total}` },
        });
      }
      start = Math.max(0, total - sufijo);
      end = total - 1;
    } else {
      start = Number(coincidencia[1]);
      end = coincidencia[2] ? Math.min(Number(coincidencia[2]), total - 1) : total - 1;
    }

    if (
      !Number.isInteger(start) ||
      !Number.isInteger(end) ||
      start < 0 ||
      end < start ||
      start >= total
    ) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${total}` },
      });
    }

    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(archivo, { start, end });
    const cuerpo = Readable.toWeb(stream) as unknown as ReadableStream;

    return new NextResponse(cuerpo, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  }

  const stream = fs.createReadStream(archivo);
  const cuerpo = Readable.toWeb(stream) as unknown as ReadableStream;

  return new NextResponse(cuerpo, {
    status: 200,
    headers: {
      "Accept-Ranges": "bytes",
      "Content-Length": String(total),
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}

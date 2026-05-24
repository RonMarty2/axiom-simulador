import { NextResponse } from "next/server";
import {
  listarFacultades,
  listarMetadata,
  listarTemas,
} from "@/lib/axiom/banco-loader";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const universidad = url.searchParams.get("universidad") ?? "UMSS";
  const facultad = url.searchParams.get("facultad") ?? null;

  const todasMetadata = await listarMetadata();
  const examenesFiltrados = todasMetadata.filter(
    (e) =>
      e.universidad.toLowerCase() === universidad.toLowerCase() &&
      (facultad ? e.facultad.toLowerCase() === facultad.toLowerCase() : true)
  );

  const facultades = await listarFacultades(universidad);

  const respuesta: {
    universidad: string;
    facultad: string | null;
    facultades: string[];
    examenes: typeof examenesFiltrados;
    temas?: { tema: string; area: string; cantidad: number }[];
  } = {
    universidad,
    facultad,
    facultades,
    examenes: examenesFiltrados,
  };

  if (facultad) {
    respuesta.temas = await listarTemas(universidad, facultad);
  }

  return NextResponse.json(respuesta);
}

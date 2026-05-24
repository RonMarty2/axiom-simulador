import { NextRequest, NextResponse } from "next/server";
import { getMaterias, getMateriasFacultad } from "@/lib/data-store";

export async function GET(req: NextRequest) {
  const facultad = req.nextUrl.searchParams.get("facultad");
  if (facultad) {
    const materias = await getMateriasFacultad(facultad);
    return NextResponse.json({ materias });
  }
  const todas = await getMaterias();
  return NextResponse.json({ materias_por_facultad: todas });
}

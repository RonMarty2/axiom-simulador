import { NextResponse } from "next/server";
import { getFacultades } from "@/lib/data-store";

export async function GET() {
  const facultades = await getFacultades();
  return NextResponse.json({ facultades });
}

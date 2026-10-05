import { NextRequest, NextResponse } from "next/server";
import { getComprobante, getPagos } from "@/lib/data-store";
import { getCurrentUser, isAdmin } from "@/lib/session";

// La foto del comprobante la ve el admin y el alumno que la subió, nadie más.
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!(await isAdmin())) {
    const u = await getCurrentUser();
    if (!u) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    const pago = (await getPagos()).find((p) => p.id === id);
    if (!pago || pago.usuario_id !== u.id) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  const imagen = await getComprobante(id);
  const m = imagen?.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!m) return NextResponse.json({ error: "Sin comprobante" }, { status: 404 });
  return new NextResponse(Buffer.from(m[2], "base64"), {
    headers: { "Content-Type": m[1], "Cache-Control": "private, max-age=3600" },
  });
}

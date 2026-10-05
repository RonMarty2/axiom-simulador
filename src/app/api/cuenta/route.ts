import { NextRequest, NextResponse } from "next/server";
import { eliminarUsuario } from "@/lib/data-store";
import { clearSession, getCurrentUser, isAdmin, isTester } from "@/lib/session";

// El alumno borra su propia cuenta (lo prometen los Términos y la Política de
// Privacidad). Hay que escribir BORRAR para confirmar. No se borran cuentas de
// admin ni la del dueño desde acá.
export async function DELETE(req: NextRequest) {
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body.confirmar !== "BORRAR") {
    return NextResponse.json({ error: "Escribe BORRAR para confirmar" }, { status: 400 });
  }
  if ((await isAdmin()) || (await isTester())) {
    return NextResponse.json({ error: "Esta cuenta no se puede borrar desde aquí" }, { status: 403 });
  }
  await eliminarUsuario(u.id);
  await clearSession();
  return NextResponse.json({ ok: true });
}

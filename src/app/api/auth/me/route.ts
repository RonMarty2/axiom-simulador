import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser, isAdmin, isTester, SESSION_COOKIE, verificarTokenSesion } from "@/lib/session";

export async function GET() {
  const usuario = await getCurrentUser();
  const admin = await isAdmin();
  const tester = await isTester();

  // Si hay JWT real, incluir picture y rol
  let session = null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) session = await verificarTokenSesion(token);

  return NextResponse.json({
    usuario,
    admin,
    tester,
    rol: admin ? "docente" : "estudiante",
    picture: session?.picture,
    autenticado_google: !!session,
  });
}

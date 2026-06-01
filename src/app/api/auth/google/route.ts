import { NextRequest, NextResponse } from "next/server";
import { urlAuthGoogle } from "@/lib/session";

const OAUTH_STATE_COOKIE = "axiom_oauth_state";

export async function GET(req: NextRequest) {
  // El redirect URI debe matchear EXACTAMENTE al configurado en Google Cloud Console.
  // Lo armamos del host actual para que funcione en localhost, vercel.app y dominio propio.
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = req.headers.get("host") ?? url.host;
  const redirectUri = `${proto}://${host}/api/auth/callback/google`;

  if (!process.env.GOOGLE_CLIENT_ID) {
    return NextResponse.json(
      { error: "Google OAuth no configurado. Falta GOOGLE_CLIENT_ID en variables de entorno." },
      { status: 500 }
    );
  }

  // Generar state aleatorio y guardarlo en cookie httpOnly. El callback lo
  // comparará contra el ?state= que devuelva Google. Esto bloquea login CSRF.
  const state = crypto.randomUUID();
  const res = NextResponse.redirect(urlAuthGoogle(redirectUri, state));
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600, // 10 min para completar el login
  });
  return res;
}

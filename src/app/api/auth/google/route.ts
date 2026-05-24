import { NextRequest, NextResponse } from "next/server";
import { urlAuthGoogle } from "@/lib/session";

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

  return NextResponse.redirect(urlAuthGoogle(redirectUri));
}

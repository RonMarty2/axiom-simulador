import { NextResponse, type NextRequest } from "next/server";

// Único trabajo de este middleware: pasarle la ruta pedida a los layouts de
// servidor. Un layout de App Router no recibe el pathname por ningún lado, y
// los guards de /aprende y /laminas lo necesitan para saber QUÉ lección o
// lámina se está abriendo.
//
// A propósito NO hace la verificación de plan acá: eso vive en los layouts,
// que corren en Node. El middleware corre en el Edge Runtime y `data-store.ts`
// importa `fs/promises`, así que la consulta de suscripciones no puede correr
// en este contexto.
export const RUTA_HEADER = "x-axiom-ruta";

export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set(RUTA_HEADER, req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/aprende/:path*", "/laminas/:path*"],
};

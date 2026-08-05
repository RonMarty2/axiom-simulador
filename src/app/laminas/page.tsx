"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import type { Facultad, Usuario } from "@/lib/data-store";
import { LAMINAS, obtenerFacultadLaminas } from "@/lib/axiom/laminas";
import { LIENZO } from "../aprende/_components/lienzo";

export default function LaminasPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => {
      if (!me.usuario) { router.push("/login"); return; }
      if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
      setUsuario(me.usuario);
      fetch("/api/facultades").then((r) => r.json()).then((f) => {
        const fac = (f.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
        setFacultad(fac ?? null);
        setLoading(false);
      });
    });
  }, [router]);

  if (loading || !usuario) return <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;

  const facultadLaminas = usuario.facultad_objetivo ? obtenerFacultadLaminas(usuario.facultad_objetivo) : undefined;

  return (
    <div style={{ minHeight: "100vh", background: LIENZO.bg }}>
      <AppHeader />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 60px" }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: LIENZO.accent, fontWeight: 700, marginBottom: 6 }}>
          {facultad?.nombre ?? "Tu facultad"} · Contenido premium
        </div>
        <h1 className="font-crimson" style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 600, color: LIENZO.fg, margin: "0 0 10px" }}>
          Láminas de Repaso
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim, maxWidth: 560, margin: "0 0 32px" }}>
          Fichas visuales que enseñan un concepto de cero, con demostración paso a paso, ejemplo resuelto y ejercicio para practicar. Agrupadas en módulos — elegí uno para ver sus láminas.
        </p>

        {!facultadLaminas && (
          <div style={{ padding: 24, border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 12, color: LIENZO.fgDim, fontSize: 14 }}>
            Todavía no hay láminas para tu facultad — arrancamos por Ingeniería, el resto viene después.
          </div>
        )}

        {facultadLaminas?.modulos.map((modulo) => {
          const publicadas = modulo.laminas.filter((l) => l.publicada).length;
          const disponible = publicadas > 0;
          const contenido = (
            <>
              <div style={{ flex: 1 }}>
                <div className="font-crimson" style={{ fontSize: 18, fontWeight: 600, color: LIENZO.fg, marginBottom: 4 }}>
                  {modulo.titulo}
                </div>
                <div style={{ fontSize: 13, color: LIENZO.fgFaint }}>
                  {modulo.laminas.length} lámina{modulo.laminas.length === 1 ? "" : "s"}
                  {disponible ? ` · ${publicadas} disponible${publicadas === 1 ? "" : "s"}` : " · próximamente"}
                </div>
              </div>
              {disponible && (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={LIENZO.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              )}
            </>
          );
          const estiloFila: React.CSSProperties = {
            display: "flex", alignItems: "center", gap: 12,
            padding: "16px 18px", borderRadius: 12,
            border: `1px solid ${LIENZO.fgFaint}55`,
            marginBottom: 10, textDecoration: "none",
            opacity: disponible ? 1 : 0.55,
          };
          return disponible ? (
            <Link key={modulo.slug} href={`/laminas/${modulo.slug}`} style={estiloFila}>
              {contenido}
            </Link>
          ) : (
            <div key={modulo.slug} style={estiloFila}>{contenido}</div>
          );
        })}
      </main>
    </div>
  );
}

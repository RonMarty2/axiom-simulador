"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import type { Usuario } from "@/lib/data-store";
import { obtenerFacultadLaminas, obtenerModulo } from "@/lib/axiom/laminas";
import { LIENZO } from "../../aprende/_components/lienzo";

export default function ModuloLaminasPage() {
  const router = useRouter();
  const params = useParams<{ modulo: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => {
      if (!me.usuario) { router.push("/login"); return; }
      if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
      setUsuario(me.usuario);
      setLoading(false);
    });
  }, [router]);

  if (loading || !usuario) return <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;

  const facultadLaminas = usuario.facultad_objetivo ? obtenerFacultadLaminas(usuario.facultad_objetivo) : undefined;
  const modulo = usuario.facultad_objetivo ? obtenerModulo(usuario.facultad_objetivo, params.modulo) : undefined;

  if (!facultadLaminas || !modulo) {
    return (
      <div style={{ minHeight: "100vh", background: LIENZO.bg }}>
        <AppHeader />
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
          <p style={{ color: LIENZO.fgDim }}>No encontramos este módulo.</p>
          <Link href="/laminas" style={{ color: LIENZO.accent }}>← Volver a Láminas</Link>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: LIENZO.bg }}>
      <AppHeader />
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px" }}>
        <Link href="/laminas" style={{ color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          ← Láminas
        </Link>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: LIENZO.fgFaint, fontWeight: 700, margin: "16px 0 6px" }}>
          {facultadLaminas.areaLabel}
        </div>
        <h1 className="font-crimson" style={{ fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 600, color: LIENZO.fg, margin: "0 0 24px" }}>
          {modulo.titulo}
        </h1>

        {modulo.laminas.map((lamina, i) => {
          const estiloFila: React.CSSProperties = {
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px", borderRadius: 12,
            border: `1px solid ${LIENZO.fgFaint}55`,
            marginBottom: 8, textDecoration: "none",
            opacity: lamina.publicada ? 1 : 0.5,
          };
          const contenido = (
            <>
              <span style={{
                flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
                background: lamina.publicada ? LIENZO.accent : LIENZO.fgFaint, color: "#fff",
                fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i + 1}
              </span>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: LIENZO.fg }}>
                {lamina.titulo}
              </div>
              <span style={{ fontSize: 12, color: LIENZO.fgFaint, flexShrink: 0 }}>
                {lamina.publicada ? "→" : "Próximamente"}
              </span>
            </>
          );
          return lamina.publicada ? (
            <Link key={lamina.slug} href={`/laminas/${modulo.slug}/${lamina.slug}`} style={estiloFila}>
              {contenido}
            </Link>
          ) : (
            <div key={lamina.slug} style={estiloFila}>{contenido}</div>
          );
        })}
      </main>
    </div>
  );
}

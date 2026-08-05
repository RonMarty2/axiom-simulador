"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import type { HistorialExamen } from "@/lib/data-store";

export default function HistorialPage() {
  const router = useRouter();
  const [historial, setHistorial] = useState<HistorialExamen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) { router.push("/login"); return; }
      fetch("/api/historial").then((r) => r.json()).then((h) => {
        setHistorial(h.historial ?? []);
        setLoading(false);
      });
    });
  }, [router]);

  if (loading) return <Cargando />;

  const promedioMes = (() => {
    const mes = new Date().toISOString().slice(0, 7);
    const delMes = historial.filter((h) => h.fecha.startsWith(mes));
    if (delMes.length === 0) return 0;
    return Math.round(delMes.reduce((s, h) => s + h.nota, 0) / delMes.length);
  })();

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>📚 Mis exámenes</h1>
          <p style={{ color: "var(--fg-muted)" }}>Todos los simulacros que has hecho. Toca cualquiera para volver a ver la resolución.</p>
          <p style={{ color: "var(--fg-muted)", fontSize: 13, marginTop: 4 }}>{historial.length} exámenes completados · Promedio este mes: {promedioMes}/100</p>
        </div>

        {historial.length === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>📚</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>Aún no hay exámenes</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, marginBottom: 18 }}>Haz tu primer simulacro para ver tu progreso.</p>
            <Link href="/practicar" style={{ display: "inline-block", padding: "12px 24px", background: "var(--accent)", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
              Empezar simulacro
            </Link>
          </div>
        ) : (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)" }}>
                  <th style={th()}>Fecha</th>
                  <th style={th()}>Tipo</th>
                  <th style={th()}>Facultad</th>
                  <th style={th()}>Nota</th>
                  <th style={th()}>Correctas</th>
                  <th style={th()}>Tiempo</th>
                  <th style={th()}></th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => (
                  <tr key={h.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={td()}>{new Date(h.fecha).toLocaleDateString("es-BO", { day: "numeric", month: "short" })}</td>
                    <td style={td()}><strong>{modoLabel(h.modo)}</strong>{h.anio_examen && <span style={{ color: "var(--fg-muted)" }}> · {h.anio_examen}</span>}</td>
                    <td style={td()}><span style={{ textTransform: "capitalize" }}>{h.facultad}</span></td>
                    <td style={{ ...td(), fontWeight: 800, color: h.nota >= 70 ? "#059669" : h.nota >= 50 ? "#d97706" : "#dc2626" }}>{h.nota}</td>
                    <td style={td()}>{h.correctas} / {h.correctas + h.incorrectas + h.sin_responder}</td>
                    <td style={td()}>{Math.round(h.tiempo_segundos / 60)} min</td>
                    <td style={{ ...td(), textAlign: "right" }}>
                      {h.simulador_id ? (
                        <Link href={`/simulador/${h.simulador_id}/resultados`} style={{ padding: "6px 12px", background: "var(--accent)", color: "white", borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                          Ver resolución →
                        </Link>
                      ) : (
                        <span style={{ fontSize: 11, color: "var(--fg-muted)" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function th(): React.CSSProperties {
  return { padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.06em" };
}
function td(): React.CSSProperties {
  return { padding: "12px 16px", color: "var(--fg-primary)" };
}
function modoLabel(modo: string): string {
  return ({ examen_real: "Examen real", mixto: "Mixto", predictivo: "Simulacro inteligente", por_tema: "Por tema", mis_errores: "Mis errores", ia_generado: "Simulacro inteligente" } as Record<string, string>)[modo] ?? modo;
}

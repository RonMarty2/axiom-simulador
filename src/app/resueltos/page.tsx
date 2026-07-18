"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import type { Facultad, Usuario } from "@/lib/data-store";
import type { ExamenMetadata } from "@/lib/axiom/types";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biología",
  civica: "Cívica",
  historia: "Historia",
  general: "General",
};

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el listado).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

export default function ResueltosPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [examenes, setExamenes] = useState<ExamenMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => {
      if (!me.usuario) { router.push("/login"); return; }
      if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
      setUsuario(me.usuario);
      Promise.all([
        fetch("/api/facultades").then((r) => r.json()),
        fetch("/api/axiom/examenes").then((r) => r.json()),
      ]).then(([f, e]) => {
        const fac = (f.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
        setFacultad(fac ?? null);
        // Filtrar a los exámenes de la facultad del usuario
        const propios = (e.examenes ?? []).filter((x: ExamenMetadata) => x.facultad === me.usuario.facultad_objetivo);
        setExamenes(propios);
        setLoading(false);
      });
    });
  }, [router]);

  if (loading || !usuario) return <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 36, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>
            📚 Exámenes resueltos
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Examen oficial completo + solución paso a paso de cada pregunta.{" "}
            {facultad && <>Mostrando exámenes de <strong style={{ color: facultad.color }}>{facultad.nombre_corto}</strong>.</>}
          </p>
        </div>

        {examenes.length === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>📭</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>Aún no hay exámenes resueltos</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14 }}>
              Pronto vamos a publicar los exámenes pasados de {facultad?.nombre_corto ?? "tu facultad"} con su solución completa.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {examenes
              .sort((a, b) => (b.anio - a.anio) || (b.fecha_examen ?? "").localeCompare(a.fecha_examen ?? ""))
              .map((ex) => (
              <Link
                key={ex.id}
                href={`/resueltos/${ex.id}`}
                style={{
                  display: "block",
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  padding: 22,
                  textDecoration: "none",
                  border: `1px solid ${facultad?.color ?? "var(--border)"}30`,
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Examen oficial · {ex.anio}
                    </div>
                    <div className="font-crimson" style={{ fontSize: 22, fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1.2 }}>
                      {ex.opcion ?? "Examen"}
                    </div>
                    {ex.fecha_examen && (
                      <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>
                        📅 {formatearFecha(ex.fecha_examen)}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 32 }}>{facultad?.emoji ?? "📄"}</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 14 }}>
                  {ex.universidad} · {ex.total_preguntas} preguntas · {ex.duracion_minutos} min
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {ex.areas_resumen.slice(0, 4).map((a) => (
                    <span key={a.area} style={{
                      fontSize: 10, padding: "3px 8px",
                      background: `${facultad?.color ?? "#6366F1"}15`,
                      color: facultad?.color ?? "var(--accent)",
                      borderRadius: 999, fontWeight: 700, textTransform: "uppercase",
                    }}>
                      {ETIQUETAS_AREA[a.area] ?? a.area} · {a.cantidad}
                    </span>
                  ))}
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 700, color: facultad?.color ?? "var(--accent)",
                }}>
                  Ver solución paso a paso →
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginTop: 28, padding: 16, background: "rgba(99,102,241,0.06)", borderRadius: 12, border: "1px solid rgba(99,102,241,0.2)" }}>
          <div style={{ fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.5 }}>
            <strong>💡 ¿Cómo usar esta sección?</strong> Entra a un examen, lee la pregunta e intenta resolverla mentalmente. Después click en <em>&ldquo;Ver respuesta&rdquo;</em> para ver la solución detallada paso a paso. Es la mejor forma de aprender de exámenes reales.
          </div>
        </div>
      </div>
    </div>
  );
}

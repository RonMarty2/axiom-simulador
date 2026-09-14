"use client";

import { useEffect, useState } from "react";
import Icono from "../components/Icono";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import type { Facultad, Usuario } from "@/lib/data-store";
import type { ExamenMetadata } from "@/lib/axiom/types";
import { ETIQUETAS_AREA } from "@/lib/axiom/areas";

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
  // "admision" = Exámenes de Ingreso (default). "parcial_curso" = Parciales/
  // Finales del Curso Propedéutico/Pre-Facultativo — categoría separada a
  // pedido explícito: no deben mezclarse en el mismo listado.
  const [vista, setVista] = useState<"admision" | "parcial_curso">("admision");
  // Años plegados/abiertos del acordeón. Por defecto solo el año mas reciente
  // de la vista actual queda abierto (evita una lista km de larga cuando el
  // banco crezca a 150+ examenes).
  const [aniosAbiertos, setAniosAbiertos] = useState<Set<number>>(new Set());

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

  useEffect(() => {
    const anios = examenes.filter((x) => (x.categoria ?? "admision") === vista).map((x) => x.anio);
    if (anios.length > 0) setAniosAbiertos(new Set([Math.max(...anios)]));
  }, [vista, examenes]);

  if (loading || !usuario) return <Cargando />;

  const examenesVista = examenes.filter((x) => (x.categoria ?? "admision") === vista);
  const hayParciales = examenes.some((x) => x.categoria === "parcial_curso");

  const gruposPorAnio = Array.from(
    examenesVista.reduce((mapa, ex) => {
      if (!mapa.has(ex.anio)) mapa.set(ex.anio, []);
      mapa.get(ex.anio)!.push(ex);
      return mapa;
    }, new Map<number, ExamenMetadata[]>())
  )
    .sort((a, b) => b[0] - a[0])
    .map(([anio, exs]) => [
      anio,
      exs.sort((a, b) => (b.fecha_examen ?? "").localeCompare(a.fecha_examen ?? "")),
    ] as [number, ExamenMetadata[]]);

  function toggleAnio(anio: number) {
    setAniosAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(anio)) next.delete(anio); else next.add(anio);
      return next;
    });
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 36, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icono nombre="aprende" tamano={26} /> Exámenes resueltos</span>
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Examen oficial completo + solución paso a paso de cada pregunta.{" "}
            {facultad && <>Mostrando exámenes de <strong style={{ color: facultad.color }}>{facultad.nombre_corto}</strong>.</>}
          </p>
        </div>

        {hayParciales && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {(["admision", "parcial_curso"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${vista === v ? (facultad?.color ?? "var(--accent)") : "var(--border)"}`,
                  background: vista === v ? `${facultad?.color ?? "var(--accent)"}15` : "transparent",
                  color: vista === v ? (facultad?.color ?? "var(--accent)") : "var(--fg-muted)",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {v === "admision" ? <><Icono nombre="birrete" tamano={14} /> Exámenes de Admisión</> : <><Icono nombre="documento" tamano={14} /> Parciales de Curso Propedéutico</>}
              </button>
            ))}
          </div>
        )}

        {examenesVista.length === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "var(--fg-muted)" }}><Icono nombre="documento" tamano={52} grosor={1.4} /></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>Aún no hay exámenes resueltos</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14 }}>
              Pronto vamos a publicar los exámenes pasados de {facultad?.nombre_corto ?? "tu facultad"} con su solución completa.
            </p>
          </div>
        ) : (
          <div className="resueltos-wrap">
            {gruposPorAnio.map(([anio, exs]) => {
              const abierto = aniosAbiertos.has(anio);
              return (
                <div key={anio} className={`resueltos-grupo${abierto ? " abierto" : ""}`}>
                  <button type="button" className="resueltos-anio-header" onClick={() => toggleAnio(anio)}>
                    <span className="resueltos-anio-header-izq">
                      <span className="font-crimson resueltos-anio-num">{anio}</span>
                      <span className="resueltos-anio-count">{exs.length} examen{exs.length === 1 ? "" : "es"}</span>
                    </span>
                    <span className="resueltos-anio-chev">▸</span>
                  </button>
                  {abierto && (
                    <div className="resueltos-anio-body">
                      {exs.map((ex) => (
                        <Link key={ex.id} href={`/resueltos/${ex.id}`} className="resueltos-fila">
                          <div className="resueltos-fila-linea">
                            <div className="resueltos-fila-titulo-col">
                              <span className="resueltos-fila-titulo">{ex.titulo ?? ex.opcion ?? "Examen"}</span>
                            </div>
                            <div className="resueltos-fila-meta">
                              {ex.fecha_examen ? `${formatearFecha(ex.fecha_examen)} · ` : ""}{ex.total_preguntas} preg · {ex.duracion_minutos} min
                            </div>
                            <div className="resueltos-fila-chips">
                              {ex.areas_resumen.slice(0, 4).map((a) => (
                                <span
                                  key={a.area}
                                  className="resueltos-chip"
                                  style={{ background: `${facultad?.color ?? "var(--accent)"}15`, color: facultad?.color ?? "var(--accent)" }}
                                >
                                  {ETIQUETAS_AREA[a.area] ?? a.area} · {a.cantidad}
                                </span>
                              ))}
                              {ex.areas_resumen.length > 4 && (
                                <span
                                  className="resueltos-chip"
                                  style={{ background: `${facultad?.color ?? "var(--accent)"}15`, color: facultad?.color ?? "var(--accent)" }}
                                >
                                  +{ex.areas_resumen.length - 4}
                                </span>
                              )}
                            </div>
                            <div className="resueltos-fila-flecha">→</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 28, padding: 16, background: "var(--accent-soft)", borderRadius: 12, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.5 }}>
            <strong><Icono nombre="idea" tamano={15} /> ¿Cómo usar esta sección?</strong> Entra a un examen, lee la pregunta e intenta resolverla mentalmente. Después click en <em>&ldquo;Ver respuesta&rdquo;</em> para ver la solución detallada paso a paso. Es la mejor forma de aprender de exámenes reales.
          </div>
        </div>
      </div>
    </div>
  );
}

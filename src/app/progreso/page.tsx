"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import Icono from "../components/Icono";
import { etiquetaArea } from "@/lib/axiom/areas";
import type { HistorialExamen } from "@/lib/data-store";

// Pantalla de evolución: los números y la tendencia. El listado completo de
// simulacros vive en /historial, que es su propia pantalla — acá no se repite.
//
// Esta página venía de un prototipo y tenía un problema serio: pedía
// /api/axiom/progreso/estadisticas?usuario_id=demo-user, con el id escrito a
// mano, así que TODOS los alumnos veían las estadísticas del usuario de
// demostración en vez de las suyas. Además el desglose estaba clavado a
// matemáticas/economicas/verbal, que son las áreas de Económicas: a alguien de
// Ingeniería no le correspondía ninguna. Ahora se arma sobre /api/historial,
// que ya resuelve el usuario por sesión y devuelve las áreas reales de cada
// examen. El endpoint viejo se borró.

function colorPorNota(n: number): string {
  if (n >= 70) return "var(--green)";
  if (n >= 50) return "#d97706";
  return "#dc2626";
}

function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.slice(0, 10).split("-").map(Number);
  if (!anio || !mes || !dia) return iso;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]}`;
}

export default function ProgresoPage() {
  const router = useRouter();
  const [historial, setHistorial] = useState<HistorialExamen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) { router.push("/login"); return; }
      fetch("/api/historial").then((r) => r.json()).then((h) => {
        setHistorial(h.historial ?? []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }).catch(() => setLoading(false));
  }, [router]);

  // Más viejo primero: la curva se lee de izquierda a derecha en el tiempo.
  const cronologico = useMemo(
    () => [...historial].sort((a, b) => a.fecha.localeCompare(b.fecha)),
    [historial],
  );

  const stats = useMemo(() => {
    if (cronologico.length === 0) return null;
    const notas = cronologico.map((h) => h.nota);
    const promedio = Math.round(notas.reduce((s, n) => s + n, 0) / notas.length);
    // Comparación honesta: solo tiene sentido con al menos dos exámenes.
    const primera = notas[0];
    const ultima = notas[notas.length - 1];
    return {
      total: notas.length,
      promedio,
      mejor: Math.max(...notas),
      evolucion: notas.length >= 2 ? ultima - primera : null,
    };
  }, [cronologico]);

  // Promedio por área sobre todos los exámenes. Las áreas salen de los datos,
  // no de una lista fija, así que funciona para cualquier carrera.
  const porArea = useMemo(() => {
    const suma = new Map<string, { total: number; veces: number }>();
    for (const h of cronologico) {
      for (const [area, pct] of Object.entries(h.desglose ?? {})) {
        const prev = suma.get(area) ?? { total: 0, veces: 0 };
        suma.set(area, { total: prev.total + pct, veces: prev.veces + 1 });
      }
    }
    return [...suma.entries()]
      .map(([area, { total, veces }]) => ({ area, pct: Math.round(total / veces) }))
      .sort((a, b) => a.pct - b.pct);
  }, [cronologico]);

  if (loading) return <Cargando />;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <Icono nombre="grafico" tamano={27} /> Mi progreso
            </span>
          </h1>
          <p style={{ color: "var(--fg-muted)" }}>Cómo vienes rindiendo simulacro a simulacro.</p>
        </div>

        {!stats ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "var(--fg-muted)" }}>
              <Icono nombre="grafico" tamano={52} grosor={1.4} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>Todavía no hay nada que medir</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, marginBottom: 18 }}>
              Haz tu primer simulacro y acá vas a ver cómo evolucionas.
            </p>
            <Link href="/practicar" style={{ display: "inline-block", padding: "12px 24px", background: "var(--accent)", color: "var(--accent-fg)", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
              Empezar simulacro
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
              <Tarjeta titulo="Simulacros" valor={String(stats.total)} />
              <Tarjeta titulo="Promedio" valor={`${stats.promedio}`} sufijo="/100" color={colorPorNota(stats.promedio)} />
              {/* El color sale de la nota, no del rótulo: "Mejor nota" en verde
                  con un 0 adentro se lee como si 0 estuviera bien. */}
              <Tarjeta titulo="Mejor nota" valor={`${stats.mejor}`} sufijo="/100" color={colorPorNota(stats.mejor)} />
              {stats.evolucion !== null && (
                <Tarjeta
                  titulo="Desde el primero"
                  valor={`${stats.evolucion > 0 ? "+" : ""}${stats.evolucion}`}
                  color={stats.evolucion > 0 ? "var(--green)" : stats.evolucion < 0 ? "#dc2626" : "var(--fg-muted)"}
                />
              )}
            </div>

            {cronologico.length >= 2 && <Curva historial={cronologico} />}

            {porArea.length > 0 && (
              <section style={{ marginTop: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>Cómo te va en cada área</h2>
                <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 14 }}>
                  Promedio de todos tus simulacros. De lo más flojo a lo más firme.
                </p>
                <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                  {porArea.map(({ area, pct }) => (
                    <div key={area}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                        <span style={{ color: "var(--fg-primary)", fontWeight: 600 }}>{etiquetaArea(area)}</span>
                        <span style={{ color: colorPorNota(pct), fontWeight: 800 }}>{pct}%</span>
                      </div>
                      <div style={{ height: 8, background: "var(--bg-subtle)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${Math.max(pct, 2)}%`, height: "100%", background: colorPorNota(pct), borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div style={{ marginTop: 28, textAlign: "center" }}>
              <Link href="/historial" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
                Ver los {stats.total} simulacros uno por uno →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Tarjeta({ titulo, valor, sufijo, color }: { titulo: string; valor: string; sufijo?: string; color?: string }) {
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
      <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{titulo}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: color ?? "var(--fg-primary)", lineHeight: 1 }}>
        {valor}
        {sufijo && <span style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 600 }}>{sufijo}</span>}
      </div>
    </div>
  );
}

// Curva de notas en SVG puro: son pocos puntos y no justifica una librería de
// gráficos en el bundle que el alumno baja al celular.
function Curva({ historial }: { historial: HistorialExamen[] }) {
  const ANCHO = 900, ALTO = 200, PAD = 34;
  const puntos = historial.map((h, i) => {
    const x = PAD + (i * (ANCHO - PAD * 2)) / Math.max(historial.length - 1, 1);
    const y = ALTO - PAD - (h.nota / 100) * (ALTO - PAD * 2);
    return { x, y, h };
  });
  const linea = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <section>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>Tu evolución</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 14 }}>Cada punto es un simulacro, del más viejo al más nuevo.</p>
      <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: 14, overflowX: "auto" }}>
        <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} style={{ width: "100%", minWidth: 320, height: "auto", display: "block" }}>
          {/* Referencia de aprobación */}
          {[0, 50, 100].map((n) => {
            const y = ALTO - PAD - (n / 100) * (ALTO - PAD * 2);
            return (
              <g key={n}>
                <line x1={PAD} y1={y} x2={ANCHO - PAD} y2={y} stroke="var(--border)" strokeWidth={1} strokeDasharray={n === 50 ? "5 4" : undefined} />
                <text x={PAD - 8} y={y + 4} textAnchor="end" fontSize={11} fill="var(--fg-muted)">{n}</text>
              </g>
            );
          })}
          <path d={linea} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {puntos.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill={colorPorNota(p.h.nota)} stroke="var(--bg-card)" strokeWidth={2} />
              <title>{`${p.h.nota}/100 · ${formatearFecha(p.h.fecha)}`}</title>
            </g>
          ))}
          {/* Solo el primero y el último llevan fecha: con muchos simulacros
              las etiquetas se pisan entre sí. */}
          {[puntos[0], puntos[puntos.length - 1]].map((p, i) => (
            <text key={i} x={p.x} y={ALTO - 8} textAnchor={i === 0 ? "start" : "end"} fontSize={11} fill="var(--fg-muted)">
              {formatearFecha(p.h.fecha)}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

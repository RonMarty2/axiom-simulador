"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import Icono, { iconoFacultad } from "../components/Icono";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import { guardarSimulador } from "@/lib/sim-storage";
import { esPago } from "@/lib/plan";
import type { Facultad, Usuario, Materia } from "@/lib/data-store";
import type {
  ConfiguracionSimulacion,
  ModoSimulacion,
  Dificultad,
} from "@/lib/axiom/types";

interface ExamenMini {
  id: string;
  anio: number;
  total_preguntas: number;
  opcion?: string;
  titulo?: string;
  fecha_examen?: string;
}

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el selector).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

function PracticarInner() {
  const router = useRouter();
  const params = useSearchParams();
  const modoInicial = (params.get("modo") as ModoSimulacion | null) ?? null;

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<string>("");
  const [modo, setModo] = useState<ModoSimulacion | "">(modoInicial ?? "");
  const [examenes, setExamenes] = useState<ExamenMini[]>([]);
  const [examenId, setExamenId] = useState<string | null>(null);
  const [tema, setTema] = useState<string>("");
  const [dificultad, setDificultad] = useState<Dificultad>("medio");
  const [errores, setErrores] = useState(0);
  const [temasReforzar, setTemasReforzar] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [creando, setCreando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarUpgrade, setMostrarUpgrade] = useState(false);

  useEffect(() => {
    fetch("/api/axiom/errores").then((r) => r.json()).then((d) => {
      setErrores(d.total ?? 0);
      setTemasReforzar(d.temas_reforzar ?? []);
    }).catch(() => {});
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/facultades").then((r) => r.json()),
    ]).then(([me, f]) => {
      if (!me.usuario) {
        router.push("/login");
        return;
      }
      if (!me.usuario.facultad_objetivo) {
        router.push("/onboarding");
        return;
      }
      setUsuario(me.usuario);
      // Solo la facultad del usuario — no contaminamos con otras carreras
      const propia = (f.facultades ?? []).filter((x: Facultad) => x.id === me.usuario.facultad_objetivo);
      setFacultades(propia);
      setFacultadSeleccionada(me.usuario.facultad_objetivo);
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (!facultadSeleccionada) return;
    fetch(`/api/axiom/banco/info?universidad=UMSS&facultad=${facultadSeleccionada}`)
      .then((r) => r.json())
      .then((d) => setExamenes(d.examenes ?? []));
    fetch(`/api/materias?facultad=${facultadSeleccionada}`)
      .then((r) => r.json())
      .then((d) => setMaterias(d.materias ?? []));
  }, [facultadSeleccionada]);

  const facultadObj = facultades.find((f) => f.id === facultadSeleccionada);

  const empezar = async () => {
    if (!modo) return;
    setCreando(true);
    setError(null);
    setMostrarUpgrade(false);
    try {
      const temasParaReforzar = modo === "mis_errores" ? temasReforzar : undefined;
      const config: ConfiguracionSimulacion = {
        modo: modo as ModoSimulacion,
        universidad: "UMSS",
        facultad: facultadSeleccionada,
        ...(examenId ? { examen_id: examenId } : {}),
        ...(tema ? { tema } : {}),
        // La cantidad de preguntas la define el formato de la facultad, no el usuario.
        ...(modo === "ia_generado" || modo === "mis_errores" ? { dificultad } : {}),
        ...(temasParaReforzar?.length ? { temas_reforzar: temasParaReforzar } : {}),
      };
      const r = await fetch("/api/axiom/simulador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await r.json();
      if (!r.ok) {
        if (data.upgrade) setMostrarUpgrade(true);
        throw new Error(data.error ?? "Error");
      }
      guardarSimulador(data.simulador);
      router.push(`/simulador/${data.simulador.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setCreando(false);
    }
  };

  if (loading) return <Cargando />;

  const esPagoUser = esPago(usuario?.plan);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>Nuevo simulacro</h1>
          <p style={{ color: "var(--fg-muted)" }}>Configura tu examen de práctica</p>
        </div>

        {/* FACULTAD ACTUAL (no editable aquí; se cambia en /cuenta) */}
        {(() => {
          const fac = facultades.find((x) => x.id === usuario?.facultad_objetivo);
          if (!fac) return null;
          return (
            <div style={{
              background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
              color: "var(--accent-fg)", borderRadius: 14, padding: "16px 20px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ display: "flex" }}><Icono nombre={iconoFacultad(fac.id)} tamano={32} grosor={1.7} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estás postulando a</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{fac.nombre_corto}</div>
              </div>
              <Link
                href="/cambiar-facultad"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "rgba(255,255,255,0.2)", color: "var(--accent-fg)", textDecoration: "none", borderRadius: 999, fontSize: 12, fontWeight: 700 }}
              >
                <Icono nombre="candado" tamano={12} /> Cambiar
              </Link>
            </div>
          );
        })()}

        {/* PASO 1: Modo */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, marginBottom: 16, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", marginBottom: 10, letterSpacing: "0.08em" }}>PASO 1 · TIPO DE PRÁCTICA</div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { v: "examen_real" as const, icono: "documento" as const, t: "Examen real", d: "Un examen pasado completo, tal cual fue tomado" },
              { v: "mixto" as const, icono: "mezclar" as const, t: "Mixto", d: "Preguntas aleatorias de varios años" },
              { v: "por_tema" as const, icono: "etiqueta" as const, t: "Por tema", d: "Solo preguntas de un tema específico" },
              { v: "mis_errores" as const, icono: "errores" as const, t: "Mis errores (Premium)", d: errores === 0 ? "Completa un examen para guardar errores" : `Repasa donde fallaste (${errores} guardados)`, disabled: errores === 0 || !esPagoUser, premium: true },
              { v: "ia_generado" as const, icono: "chispa" as const, t: "Simulacro inteligente (Premium)", d: "La IA arma un examen nuevo, parecido al que probablemente caiga este año, basado en los pasados.", disabled: !esPagoUser, premium: true },
            ].map((m) => (
              <button
                key={m.v}
                onClick={() => !m.disabled && setModo(m.v)}
                disabled={m.disabled}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: 14, cursor: m.disabled ? "not-allowed" : "pointer",
                  border: modo === m.v ? `2px solid var(--accent)` : "1px solid var(--border)",
                  background: modo === m.v ? "var(--accent-soft)" : "transparent",
                  opacity: m.disabled ? 0.4 : 1,
                  borderRadius: 10, textAlign: "left",
                }}
              >
                <span style={{ display: "flex", color: modo === m.v ? "var(--accent)" : "var(--fg-muted)" }}>
                  <Icono nombre={m.icono} tamano={22} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>
                    {m.t}
                    {m.premium && !esPagoUser && <span style={{ display: "flex", color: "var(--fg-muted)" }}><Icono nombre="candado" tamano={13} /></span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{m.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PASO 2: Detalles según modo */}
        {modo && (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, marginBottom: 16, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", marginBottom: 10, letterSpacing: "0.08em" }}>PASO 2 · DETALLES</div>

            {modo === "examen_real" && (
              <div>
                <label style={lbl()}>Elegí el examen exacto (año, opción y fecha)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {examenes.length === 0 && <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>No hay exámenes cargados para esta facultad.</div>}
                  {examenes
                    .slice()
                    .sort((a, b) => (b.anio - a.anio) || (b.fecha_examen ?? "").localeCompare(a.fecha_examen ?? ""))
                    .map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setExamenId(e.id)}
                      style={{
                        ...pill(examenId === e.id),
                        display: "flex", flexDirection: "column", alignItems: "flex-start",
                        textAlign: "left", padding: "10px 16px", gap: 2,
                      }}
                    >
                      <span style={{ fontWeight: 800 }}>
                        {e.anio} · {e.opcion ?? "Examen"}
                      </span>
                      <span style={{ fontSize: 11, opacity: 0.75, fontWeight: 500 }}>
                        {e.fecha_examen ? formatearFecha(e.fecha_examen) : ""} · {e.total_preguntas} preguntas
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modo === "por_tema" && (
              <div>
                <label style={lbl()}>Tema / materia</label>
                <select value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14 }}>
                  <option value="">Selecciona...</option>
                  {materias.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre} ({m.area})</option>
                  ))}
                </select>
              </div>
            )}

            {(modo === "mixto" || modo === "predictivo") && (
              <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "12px 14px", background: "var(--bg-subtle)", borderRadius: 10, fontSize: 13, color: "var(--fg-muted)" }}>
                <span style={{ display: "flex", paddingTop: 1 }}><Icono nombre="info" tamano={15} /></span>
                <span>Este simulacro seguirá el <strong>formato oficial de {facultadObj?.nombre_corto ?? "tu facultad"}</strong>: {facultadObj?.preguntas_examen ?? "—"} preguntas en {facultadObj?.duracion_minutos ?? "—"} minutos.</span>
              </div>
            )}
            {modo === "por_tema" && (
              <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "12px 14px", background: "var(--bg-subtle)", borderRadius: 10, fontSize: 13, color: "var(--fg-muted)" }}>
                <span style={{ display: "flex", paddingTop: 1 }}><Icono nombre="info" tamano={15} /></span>
                <span>Incluye todas las preguntas disponibles de ese tema.</span>
              </div>
            )}

            {(modo === "ia_generado" || modo === "mis_errores") && (
              <div style={{ marginTop: 14 }}>
                <label style={lbl()}>Dificultad</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["facil", "medio", "dificil"] as Dificultad[]).map((d) => (
                    <button key={d} onClick={() => setDificultad(d)} style={pill(dificultad === d)}>
                      {d === "facil" ? "Fácil" : d === "medio" ? "Medio" : "Difícil"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div style={{ padding: 14, background: mostrarUpgrade ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 10, color: mostrarUpgrade ? "#b45309" : "#b91c1c", fontSize: 14, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icono nombre={mostrarUpgrade ? "candado" : "alerta"} tamano={15} /> {error}
            </div>
            {mostrarUpgrade && (
              <Link href="/precios" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "8px 18px", background: "var(--accent)", color: "var(--accent-fg)", borderRadius: 10, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>
                Ver planes Premium <Icono nombre="flecha" tamano={14} />
              </Link>
            )}
          </div>
        )}

        <button
          onClick={empezar}
          disabled={!modo || creando || (modo === "examen_real" && !examenId) || (modo === "por_tema" && !tema)}
          style={{
            width: "100%", padding: 16, background: "var(--accent)",
            color: "var(--accent-fg)", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800,
            cursor: "pointer", opacity: (!modo || creando) ? 0.5 : 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {creando ? "Preparando examen..." : <>Empezar simulacro de {facultadObj?.nombre_corto ?? ""} <Icono nombre="flecha" tamano={18} /></>}
        </button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <BackLink href="/dashboard" label="Volver al inicio" />
        </div>
      </div>
    </div>
  );
}

function lbl(): React.CSSProperties {
  return { display: "block", fontSize: 13, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 8 };
}
function pill(active: boolean): React.CSSProperties {
  return {
    padding: "8px 16px", borderRadius: 999, border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
    background: active ? "var(--accent)" : "transparent", color: active ? "white" : "var(--fg-primary)",
    fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
  };
}

export default function PracticarPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <PracticarInner />
    </Suspense>
  );
}

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import {
  contarErrores,
  obtenerTemasReforzar,
} from "@/lib/axiom/errores-storage";
import { guardarSimulador } from "@/lib/sim-storage";
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
  const [anio, setAnio] = useState<number | null>(null);
  const [tema, setTema] = useState<string>("");
  const [cantidad, setCantidad] = useState(20);
  const [dificultad, setDificultad] = useState<Dificultad>("medio");
  const [errores, setErrores] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creando, setCreando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setErrores(contarErrores());
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
    try {
      const temasReforzar = modo === "mis_errores" ? obtenerTemasReforzar(8) : undefined;
      const config: ConfiguracionSimulacion = {
        modo: modo as ModoSimulacion,
        universidad: "UMSS",
        facultad: facultadSeleccionada,
        ...(anio ? { anio } : {}),
        ...(tema ? { tema } : {}),
        ...(modo !== "examen_real" ? { cantidad_preguntas: cantidad } : {}),
        ...(modo === "ia_generado" || modo === "mis_errores" ? { dificultad } : {}),
        ...(temasReforzar?.length ? { temas_reforzar: temasReforzar } : {}),
      };
      const r = await fetch("/api/axiom/simulador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      guardarSimulador(data.simulador);
      router.push(`/simulador/${data.simulador.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setCreando(false);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Cargando...</div>;

  const planPermiteTodas = usuario?.plan === "pro" || usuario?.plan === "premium";
  const requierePremium = modo === "ia_generado";
  const planPermiteIA = usuario?.plan === "premium";

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>📝 Nuevo simulacro</h1>
          <p style={{ color: "var(--fg-muted)" }}>Configura tu examen de práctica</p>
        </div>

        {/* FACULTAD ACTUAL (no editable aquí; se cambia en /cuenta) */}
        {(() => {
          const fac = facultades.find((x) => x.id === usuario?.facultad_objetivo);
          if (!fac) return null;
          return (
            <div style={{
              background: `linear-gradient(135deg, ${fac.color}, ${fac.color_secundario})`,
              color: "white", borderRadius: 14, padding: "16px 20px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ fontSize: 36 }}>{fac.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estás postulando a</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{fac.nombre_corto}</div>
              </div>
              <Link href="/cuenta" style={{ padding: "6px 14px", background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                Cambiar
              </Link>
            </div>
          );
        })()}

        {/* PASO 1: Modo */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, marginBottom: 16, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", marginBottom: 10, letterSpacing: "0.08em" }}>PASO 1 · TIPO DE PRÁCTICA</div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { v: "examen_real" as const, emoji: "📜", t: "Examen real", d: "Un examen pasado completo, tal cual fue tomado" },
              { v: "mixto" as const, emoji: "🎲", t: "Mixto", d: "Preguntas aleatorias de varios años" },
              { v: "predictivo" as const, emoji: "🔮", t: "Predictivo", d: "Pondera los temas por frecuencia histórica" },
              { v: "por_tema" as const, emoji: "🎯", t: "Por tema", d: "Solo preguntas de un tema específico" },
              { v: "mis_errores" as const, emoji: "🔥", t: "Mis errores", d: `Repasa donde fallaste (${errores} guardados)`, disabled: errores === 0 },
              { v: "ia_generado" as const, emoji: "⚡", t: "IA infinita (Premium)", d: "Preguntas frescas creadas en el momento", disabled: !planPermiteIA, premium: true },
            ].map((m) => (
              <button
                key={m.v}
                onClick={() => !m.disabled && setModo(m.v)}
                disabled={m.disabled}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: 14, cursor: m.disabled ? "not-allowed" : "pointer",
                  border: modo === m.v ? `2px solid var(--accent)` : "1px solid var(--border)",
                  background: modo === m.v ? `rgba(99,102,241,0.06)` : "transparent",
                  opacity: m.disabled ? 0.4 : 1,
                  borderRadius: 10, textAlign: "left",
                }}
              >
                <span style={{ fontSize: 24 }}>{m.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{m.t} {m.premium && !planPermiteIA && <span style={{ color: "#f59e0b" }}>🔒</span>}</div>
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
                <label style={lbl()}>Año del examen</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {examenes.length === 0 && <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>No hay exámenes cargados para esta facultad.</div>}
                  {examenes.map((e) => (
                    <button key={e.anio} onClick={() => setAnio(e.anio)} style={pill(anio === e.anio)}>
                      {e.anio} ({e.total_preguntas} preg)
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

            {(modo === "mixto" || modo === "predictivo" || modo === "por_tema" || modo === "ia_generado" || modo === "mis_errores") && (
              <div style={{ marginTop: 14 }}>
                <label style={lbl()}>Cantidad de preguntas</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[10, 15, 20, 30, 50].map((n) => (
                    <button key={n} onClick={() => setCantidad(n)} style={pill(cantidad === n)}>{n}</button>
                  ))}
                </div>
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
          <div style={{ padding: 14, background: "rgba(239,68,68,0.1)", borderRadius: 10, color: "#b91c1c", fontSize: 14, marginBottom: 14 }}>⚠️ {error}</div>
        )}

        <button
          onClick={empezar}
          disabled={!modo || creando || (modo === "examen_real" && !anio) || (modo === "por_tema" && !tema)}
          style={{
            width: "100%", padding: 16, background: facultadObj?.color ?? "var(--accent)",
            color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800,
            cursor: "pointer", opacity: (!modo || creando) ? 0.5 : 1,
          }}
        >
          {creando ? "Preparando examen..." : `🚀 Empezar simulacro de ${facultadObj?.nombre_corto ?? ""}`}
        </button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/dashboard" style={{ color: "var(--fg-muted)", fontSize: 13, textDecoration: "none" }}>← Volver al inicio</Link>
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
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Cargando...</div>}>
      <PracticarInner />
    </Suspense>
  );
}

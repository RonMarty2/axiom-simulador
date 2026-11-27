"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { esPago } from "@/lib/plan";
import { PRECIOS_BOB } from "@/lib/precios";
import { tieneAudiolibro } from "@/lib/audio-medicina";
import {
  EVENTO_PROGRESO_LECCIONES,
  contarCompletadasEnBloque,
  leerLeccionesCompletadas,
  leerMapaEscenas,
} from "@/lib/axiom/progreso-lecciones";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import Icono from "../components/Icono";
import type { Facultad, Usuario } from "@/lib/data-store";

// ─────────────────────────────────────────────────────────────────────────────
// El catálogo de "Aprende paso a paso" es distinto por facultad (cada una
// tiene su propio examen de admisión con áreas distintas). Ver
// BLOQUES_POR_FACULTAD más abajo. Las lecciones de Física, Química y
// Geometría-Trigonometría (módulos FIS-*/QUI-*/GT-*) ya estaban escritas
// desde antes pero nunca habían sido conectadas a ningún índice — un
// usuario de Ingeniería veía el catálogo de Económicas en su lugar. Se
// detectó y corrigió en esta sesión.
// ─────────────────────────────────────────────────────────────────────────────

import {
  BLOQUES_POR_FACULTAD,
  type Bloque,
  type Unidad,
} from "@/lib/axiom/catalogo-aprende";

const ALIAS_BLOQUE_POR_FACULTAD: Record<string, string[]> = {
  economicas: ["fundamentos"],
  matematicas: ["razonamiento-matematico"],
  "comprension-lectora": ["razonamiento-verbal-logico"],
  "biologia-celular": ["biologia"],
};

function resolverBloqueParam(bloques: Bloque[], param: string | null): string | null {
  if (!param) return null;
  const limpio = param.trim().toLowerCase();
  if (!limpio) return null;
  const exacto = bloques.find((b) => b.id === limpio);
  if (exacto) return exacto.id;
  const aliases = ALIAS_BLOQUE_POR_FACULTAD[limpio] ?? [];
  const porAlias = bloques.find((b) => aliases.includes(b.id));
  return porAlias?.id ?? null;
}

// Chevron (flecha) hacia abajo, dibujada en SVG para que se vea nítida y NO
// parezca un exponente como el carácter "⌃". Rota 180° al abrir la sección.
function Chevron({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AprendePage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [totalExamenes, setTotalExamenes] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [completadas, setCompletadas] = useState<string[]>([]);
  const [escenasEnCurso, setEscenasEnCurso] = useState<Record<string, number>>({});
  const usuarioId = usuario?.id ?? null;
  const [bloquesAbiertos, setBloquesAbiertos] = useState<Record<string, boolean>>({});
  const bloqueInicializadoRef = useRef(false);

  useEffect(() => {
    const sincronizar = () => {
      setCompletadas(leerLeccionesCompletadas(usuarioId));
      setEscenasEnCurso(leerMapaEscenas(usuarioId));
    };
    sincronizar();
    window.addEventListener(EVENTO_PROGRESO_LECCIONES, sincronizar);
    window.addEventListener("focus", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO_PROGRESO_LECCIONES, sincronizar);
      window.removeEventListener("focus", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, [usuarioId]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((me) => {
        if (!me.usuario) { router.push("/login"); return; }
        if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
        setUsuario(me.usuario);
        fetch("/api/facultades")
          .then((r) => r.json())
          .then((f) => {
            const fac = (f.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
            setFacultad(fac ?? null);
            const nExamenes = (fac as { examenes?: number } | undefined)?.examenes;
            setTotalExamenes(nExamenes || null);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => {
        // Si falla la red, igual mostramos el contenido gratis (no colgamos la pantalla).
        // El usuario queda como "no premium" hasta que /api/auth/me responda.
        setLoading(false);
      });
  }, [router]);

  const bloques = usuario?.facultad_objetivo ? BLOQUES_POR_FACULTAD[usuario.facultad_objetivo] : undefined;
  const completadasSet = useMemo(() => new Set(completadas), [completadas]);

  useEffect(() => {
    if (loading || !bloques || bloques.length === 0 || bloqueInicializadoRef.current) return;
    bloqueInicializadoRef.current = true;
    const param = new URLSearchParams(window.location.search).get("bloque");
    const destino = resolverBloqueParam(bloques, param);
    if (destino) {
      setBloquesAbiertos({ [destino]: true });
      const timer = window.setTimeout(() => {
        document.getElementById(`bloque-${destino}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    setBloquesAbiertos({ [bloques[0].id]: true });
  }, [loading, bloques]);

  if (loading) return <Cargando />;

  const usuarioEsPremium = esPago(usuario?.plan);
  const alternarBloque = (id: string) => {
    setBloquesAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <header style={{
        padding: "20px clamp(16px, 3vw, 24px)", borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)", backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <BackLink href="/dashboard" label="Volver" />
          <h1 className="font-crimson" style={{
            fontSize: 36, fontWeight: 800, color: "var(--fg-primary)",
            lineHeight: 1.15, margin: "8px 0 4px",
          }}>
            Aprende paso a paso
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Las áreas del examen de admisión · {facultad?.nombre_corto ?? "tu facultad"}
          </p>

          {!usuarioEsPremium && bloques && (
            <div style={{
              marginTop: 16, padding: "14px 18px",
              background: "var(--accent-soft)",
              borderRadius: 14, border: "1.5px solid var(--accent)",
              display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            }}>
              <span style={{ display: "flex", color: "var(--accent)" }}>
                <Icono nombre="chispa" tamano={22} />
              </span>
              <div style={{ flex: 1, minWidth: "min(200px, 100%)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>
                  Plan gratis: Unidad 01 de cada área desbloqueada
                </div>
                <div style={{ fontSize: 13, color: "var(--fg-secondary)", marginTop: 2 }}>
                  Leer los exámenes pasados es gratis. Con un plan activo se abren todas las unidades y la explicación paso a paso de {totalExamenes ? (totalExamenes === 1 ? "el examen real" : `los ${totalExamenes} exámenes reales`) : "los exámenes reales"}.
                </div>
              </div>
              <Link href="/precios" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minHeight: 44, padding: "10px 18px", background: "var(--accent)", color: "white",
                borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 13.5,
                boxShadow: "var(--shadow-sm)",
              }}>
                Ver planes desde Bs {Math.min(PRECIOS_BOB.pro, PRECIOS_BOB.premium)} →
              </Link>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "28px clamp(16px, 3vw, 20px) 100px" }}>
        {!bloques && (
          <div style={{
            padding: "30px 24px", background: "var(--bg-card)",
            borderRadius: 14, border: "1px dashed var(--border)",
            textAlign: "center", color: "var(--fg-muted)",
          }}>
            Todavía estamos preparando las lecciones para tu facultad.
          </div>
        )}
        {bloques?.map((b, bi) => (
          <BloqueArea
            key={b.id}
            bloque={b}
            indice={bi + 1}
            esPremium={usuarioEsPremium}
            abierto={Boolean(bloquesAbiertos[b.id])}
            onToggle={() => alternarBloque(b.id)}
            completadasSet={completadasSet}
            escenasEnCurso={escenasEnCurso}
          />
        ))}
      </main>
    </div>
  );
}

function BloqueArea({
  bloque,
  indice,
  esPremium,
  abierto,
  onToggle,
  completadasSet,
  escenasEnCurso,
}: {
  bloque: Bloque;
  indice: number;
  esPremium: boolean;
  abierto: boolean;
  onToggle: () => void;
  completadasSet: Set<string>;
  escenasEnCurso: Record<string, number>;
}) {
  const tieneContenido = bloque.unidades.length > 0;
  // Un solo acento para TODAS las áreas. Antes el área 1 era celeste y las
  // demás degradaban al violeta de la paleta anterior al rediseño: pintar cada
  // cosa de un color distinto es justo lo que el rediseño vino a sacar (misma
  // decisión que se tomó con las tarjetas de facultad, ver bitácora §11).
  const color = "var(--accent)";
  const colorGradient = "var(--accent-hover)";
  const totalLecciones = bloque.unidades.reduce((acc, u) => acc + u.lecciones.length, 0);
  const slugsBloque = bloque.unidades
    .flatMap((u) => u.lecciones)
    .map((l) => l.slug)
    .filter((s): s is string => Boolean(s));
  const avance = contarCompletadasEnBloque(slugsBloque, completadasSet);

  return (
    <motion.section
      id={`bloque-${bloque.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: indice * 0.1 }}
      style={{ marginBottom: 32, scrollMarginTop: 16 }}
    >
      {/* Cabecera del área (clickeable) */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          minHeight: 44, padding: "20px clamp(16px, 3vw, 24px)",
          background: `linear-gradient(135deg, ${color}, ${colorGradient})`,
          borderRadius: 18, color: "white",
          boxShadow: "var(--shadow-md)", marginBottom: abierto ? 16 : 0,
          boxSizing: "border-box",
        }}
        aria-expanded={abierto}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 11, fontWeight: 800, background: "rgba(255,255,255,0.25)",
                padding: "3px 10px", borderRadius: 8, letterSpacing: 1.2,
              }}>ÁREA {indice}</span>
              {tieneContenido && (
                <span style={{
                  fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.18)",
                  padding: "3px 10px", borderRadius: 8, letterSpacing: 0.6,
                }}>{bloque.unidades.length} unidades · {totalLecciones} lecciones</span>
              )}
            </div>
            <h2 className="font-crimson" style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {bloque.titulo}
            </h2>
            <p style={{ fontSize: 14, opacity: 0.95, marginTop: 6, marginBottom: 0 }}>
              {bloque.descripcion}
            </p>
            {tieneContenido && avance.total > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  gap: 8, fontSize: 12, fontWeight: 700, marginBottom: 6,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  <span>{avance.hechas}/{avance.total} completadas</span>
                  <span>{avance.porcentaje}%</span>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    height: 4, width: "100%", borderRadius: 999,
                    background: "rgba(255,255,255,0.28)", overflow: "hidden",
                  }}
                >
                  <div style={{
                    height: "100%", width: `${avance.porcentaje}%`,
                    background: "#ffffff", borderRadius: 999,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>
            )}
          </div>
          <motion.span
            animate={{ rotate: abierto ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ flexShrink: 0, opacity: 0.9, display: "flex" }}
          >
            <Chevron size={22} color="white" />
          </motion.span>
        </div>
      </button>

      {/* Cuerpo del área */}
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: 16 }}>
              {!tieneContenido ? (
                <div style={{
                  padding: "30px 24px", background: "var(--bg-card)",
                  borderRadius: 14, border: "1px dashed var(--border)",
                  textAlign: "center", color: "var(--fg-muted)",
                }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: "var(--fg-muted)" }}>
                    <Icono nombre="herramienta" tamano={28} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Próximamente</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Estamos preparando las lecciones de esta área. Mientras tanto, puedes practicar con los simulacros.
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {bloque.unidades.map((u) => (
                    <UnidadCard key={u.numero} unidad={u} esPremium={esPremium} completadasSet={completadasSet} escenasEnCurso={escenasEnCurso} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function UnidadCard({
  unidad,
  esPremium,
  completadasSet,
  escenasEnCurso,
}: {
  unidad: Unidad;
  esPremium: boolean;
  completadasSet: Set<string>;
  escenasEnCurso: Record<string, number>;
}) {
  const esGratis = unidad.numero === "01";
  const accesible = esGratis || esPremium;
  // Default: TODAS cerradas. El usuario abre solo lo que le interesa.
  const [abierto, setAbierto] = useState(false);

  return (
    <section style={{
      background: "var(--bg-card)", borderRadius: 14,
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden",
    }}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          minHeight: 44, padding: "16px clamp(14px, 3vw, 18px)", boxSizing: "border-box",
        }}
        aria-expanded={abierto}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11, fontWeight: 800, color: accesible ? "var(--accent)" : "var(--fg-muted)",
            background: "var(--bg-subtle)", padding: "4px 10px", borderRadius: 8, letterSpacing: 1,
          }}>UNIDAD {unidad.numero}</span>
          <h3 className="font-crimson" style={{
            fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", margin: 0, flex: "1 1 180px", minWidth: 0,
          }}>{unidad.titulo}</h3>
          {!accesible && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 800, color: "var(--dib-amber-800)",
              background: "linear-gradient(135deg, var(--dib-amber-200), var(--dib-amber-300))",
              padding: "4px 10px", borderRadius: 8, letterSpacing: 0.6,
            }}>
              <Icono nombre="candado" tamano={12} />
              PREMIUM
            </span>
          )}
          {esGratis && (
            <span style={{
              fontSize: 11, fontWeight: 800, color: "var(--dib-emerald-800)",
              background: "linear-gradient(135deg, var(--dib-emerald-100), var(--dib-emerald-200))",
              padding: "4px 10px", borderRadius: 8, letterSpacing: 0.6,
            }}>GRATIS</span>
          )}
          <span style={{
            fontSize: 12, color: "var(--fg-muted)", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
          }}>
            <span style={{
              background: "var(--bg-subtle)", borderRadius: 999,
              padding: "3px 9px", whiteSpace: "nowrap",
            }}>
              {unidad.lecciones.length} {unidad.lecciones.length === 1 ? "lección" : "lecciones"}
            </span>
            <motion.span
              animate={{ rotate: abierto ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex" }}
            >
              <Chevron size={16} color="var(--fg-muted)" />
            </motion.span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <ul style={{
              listStyle: "none", padding: "0 clamp(14px, 3vw, 18px) 18px", margin: 0,
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {unidad.lecciones.map((l, i) => {
                const conAudiolibro = tieneAudiolibro(l.slug);
                const completada = Boolean(l.slug && completadasSet.has(l.slug));
                const enCurso = Boolean(l.slug && !completada && (escenasEnCurso[l.slug] ?? 0) > 0);
                if (accesible && l.slug) {
                  return (
                    <li key={i}>
                      <Link href={`/aprende/${l.slug}`} style={leccionEstilo("activa")}>
                        <span style={{ flex: "1 1 160px", minWidth: 0 }}>{l.titulo}</span>
                        <span style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                          {enCurso && (
                            <span style={tagAudiolibroEstilo}>En curso</span>
                          )}
                          {completada && (
                            <span style={tagCompletadaEstilo}>✓ Completada</span>
                          )}
                          {conAudiolibro && (<span style={tagAudiolibroEstilo}>Audiolibro</span>)}
                          {l.tags?.map((t) => (<span key={t} style={tagEstilo}>{t}</span>))}
                          <span style={{ color: "var(--accent)", fontWeight: 700 }}>→</span>
                        </span>
                      </Link>
                    </li>
                  );
                }
                if (!accesible) {
                  return (
                    <li key={i}>
                      <Link href="/precios" style={leccionEstilo("bloqueada")}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 160px", minWidth: 0 }}>
                          <span style={{ opacity: 0.8, display: "inline-flex", color: "var(--dib-amber-800)", flexShrink: 0 }}>
                            <Icono nombre="candado" tamano={15} />
                          </span>
                          <span style={{ minWidth: 0 }}>{l.titulo}</span>
                        </span>
                        <span style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                          {conAudiolibro && (<span style={tagAudiolibroEstilo}>Audiolibro</span>)}
                          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--dib-amber-800)", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
                            DESBLOQUEAR →
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={i}>
                    <div style={leccionEstilo("proximamente")}>
                      <span style={{ flex: "1 1 160px", minWidth: 0 }}>{l.titulo}</span>
                      <span style={{ fontSize: 12, color: "var(--fg-muted)", fontWeight: 600 }}>Próximamente</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const leccionEstilo = (variante: "activa" | "bloqueada" | "proximamente"): React.CSSProperties => ({
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap",
  minHeight: 44, padding: "12px 14px", borderRadius: 10,
  background: variante === "activa" ? "var(--bg-base)" :
              variante === "bloqueada" ? "var(--dib-amber-50)" :
              "transparent",
  border: variante === "activa" ? "1px solid var(--border)" :
          variante === "bloqueada" ? "1px solid var(--dib-amber-200)" :
          "1px dashed transparent",
  color: variante === "activa" ? "var(--fg-primary)" :
         variante === "bloqueada" ? "var(--dib-amber-900)" :
         "var(--fg-muted)",
  textDecoration: "none", fontSize: 15, fontWeight: 600,
  cursor: variante === "proximamente" ? "default" : "pointer",
  transition: "background 0.2s",
});

const tagEstilo: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--accent)",
  background: "rgba(99, 102, 241, 0.1)",
  padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5,
};

const tagAudiolibroEstilo: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--accent)",
  background: "var(--accent-soft)",
  border: "1px solid var(--border)",
  padding: "3px 8px", borderRadius: 6, letterSpacing: 0.4,
  whiteSpace: "nowrap",
};

const tagCompletadaEstilo: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--ok, var(--green))",
  background: "var(--green-bg)",
  border: "1px solid var(--green-border)",
  padding: "3px 8px", borderRadius: 6, letterSpacing: 0.3,
  whiteSpace: "nowrap",
};

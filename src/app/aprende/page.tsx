"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { esPago } from "@/lib/plan";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
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
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Cargando />;

  const usuarioEsPremium = esPago(usuario?.plan);
  const bloques = usuario?.facultad_objetivo ? BLOQUES_POR_FACULTAD[usuario.facultad_objetivo] : undefined;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <header style={{
        padding: "20px 24px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)", backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <BackLink href="/dashboard" label="Volver" />
          <h1 className="font-crimson" style={{
            fontSize: 36, fontWeight: 800, color: "var(--fg-primary)",
            margin: "8px 0 4px",
          }}>
            Aprende paso a paso
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Las áreas del examen de admisión · {facultad?.nombre_corto ?? "tu facultad"}
          </p>

          {!usuarioEsPremium && bloques && (
            <div style={{
              marginTop: 14, padding: "12px 16px",
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              borderRadius: 12, border: "1px solid #fbbf24",
              display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 20 }}>🔓</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#78350f" }}>
                  Plan gratis: Unidad 01 de cada área desbloqueada
                </div>
                <div style={{ fontSize: 13, color: "#92400e" }}>
                  Hazte Premium para acceder al resto del contenido.
                </div>
              </div>
              <Link href="/precios" style={{
                padding: "8px 16px", background: "#f59e0b", color: "white",
                borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14,
              }}>
                Ver planes →
              </Link>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "28px 24px" }}>
        {!bloques && (
          <div style={{
            padding: "30px 24px", background: "var(--bg-card)",
            borderRadius: 14, border: "1px dashed var(--border)",
            textAlign: "center", color: "var(--fg-muted)",
          }}>
            Todavía no hay lecciones para tu facultad. Arrancamos por Ingeniería y Economía, el resto viene después.
          </div>
        )}
        {bloques?.map((b, bi) => (
          <BloqueArea key={b.id} bloque={b} indice={bi + 1} esPremium={usuarioEsPremium} />
        ))}
      </main>
    </div>
  );
}

function BloqueArea({ bloque, indice, esPremium }: { bloque: Bloque; indice: number; esPremium: boolean }) {
  const tieneContenido = bloque.unidades.length > 0;
  // Un solo acento para TODAS las áreas. Antes el área 1 era celeste y las
  // demás degradaban al violeta de la paleta anterior al rediseño: pintar cada
  // cosa de un color distinto es justo lo que el rediseño vino a sacar (misma
  // decisión que se tomó con las tarjetas de facultad, ver bitácora §11).
  const color = "var(--accent)";
  const colorGradient = "var(--accent-hover)";
  const [abierto, setAbierto] = useState(false);
  const totalLecciones = bloque.unidades.reduce((acc, u) => acc + u.lecciones.length, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: indice * 0.1 }}
      style={{ marginBottom: 32 }}
    >
      {/* Cabecera del área (clickeable) */}
      <button
        onClick={() => setAbierto((v) => !v)}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          padding: "20px 24px",
          background: `linear-gradient(135deg, ${color}, ${colorGradient})`,
          borderRadius: abierto ? "18px 18px 18px 18px" : 18, color: "white",
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
                  fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.15)",
                  padding: "3px 10px", borderRadius: 8, letterSpacing: 0.6,
                }}>{bloque.unidades.length} unidades · {totalLecciones} lecciones</span>
              )}
            </div>
            <h2 className="font-crimson" style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {bloque.titulo}
            </h2>
            <p style={{ fontSize: 14, opacity: 0.92, marginTop: 6, marginBottom: 0 }}>
              {bloque.descripcion}
            </p>
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
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🚧</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Contenido en desarrollo</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Estamos preparando las lecciones de esta área. Mientras tanto, puedes practicar con los simulacros.
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {bloque.unidades.map((u) => (
                    <UnidadCard key={u.numero} unidad={u} esPremium={esPremium} />
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

function UnidadCard({ unidad, esPremium }: { unidad: Unidad; esPremium: boolean }) {
  const esGratis = unidad.numero === "01";
  const accesible = esGratis || esPremium;
  // Default: TODAS cerradas. El usuario abre solo lo que le interesa.
  const [abierto, setAbierto] = useState(false);

  return (
    <section style={{
      background: "var(--bg-card)", borderRadius: 14,
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)", opacity: accesible ? 1 : 0.85,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setAbierto((v) => !v)}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          padding: 18, boxSizing: "border-box",
        }}
        aria-expanded={abierto}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11, fontWeight: 800, color: accesible ? "var(--accent)" : "var(--fg-muted)",
            background: "var(--bg-subtle)", padding: "4px 10px", borderRadius: 8, letterSpacing: 1,
          }}>UNIDAD {unidad.numero}</span>
          <h3 className="font-crimson" style={{
            fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", margin: 0, flex: 1, minWidth: 180,
          }}>{unidad.titulo}</h3>
          {!accesible && (
            <span style={{
              fontSize: 11, fontWeight: 800, color: "#92400e",
              background: "linear-gradient(135deg, #fde68a, #fcd34d)",
              padding: "4px 10px", borderRadius: 8, letterSpacing: 0.6,
            }}>🔒 SOLO PREMIUM</span>
          )}
          {esGratis && (
            <span style={{
              fontSize: 11, fontWeight: 800, color: "#065f46",
              background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
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
              listStyle: "none", padding: "0 18px 18px", margin: 0,
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {unidad.lecciones.map((l, i) => {
                if (accesible && l.slug) {
                  return (
                    <li key={i}>
                      <Link href={`/aprende/${l.slug}`} style={leccionEstilo("activa")}>
                        <span>{l.titulo}</span>
                        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ opacity: 0.6 }}>🔒</span>
                          {l.titulo}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5 }}>
                          DESBLOQUEAR →
                        </span>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={i}>
                    <div style={leccionEstilo("proximamente")}>
                      <span>{l.titulo}</span>
                      <span style={{ fontSize: 12, color: "var(--border)", fontWeight: 600 }}>próximamente</span>
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
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "12px 14px", borderRadius: 10,
  background: variante === "activa" ? "var(--bg-base)" :
              variante === "bloqueada" ? "#fffbeb" :
              "transparent",
  border: variante === "activa" ? "1px solid var(--border)" :
          variante === "bloqueada" ? "1px solid #fde68a" :
          "1px dashed transparent",
  color: variante === "activa" ? "var(--fg-primary)" :
         variante === "bloqueada" ? "#78350f" :
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

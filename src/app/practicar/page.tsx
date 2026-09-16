"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import Icono, { iconoFacultad, type NombreIcono } from "../components/Icono";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import { guardarSimulador } from "@/lib/sim-storage";
import { esPago } from "@/lib/plan";
import { etiquetarExamen } from "@/lib/axiom/etiqueta-examen";
import { etiquetaArea } from "@/lib/axiom/areas";
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
  categoria?: string;
}

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el selector).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

// Ya estando dentro de la pantalla de un año y de su grupo, un título como
// "Cuarto Parcial · Curso Propedéutico (Gestión 2-2006)" repite tres veces lo
// que el alumno acaba de tocar y se come dos renglones del celular. El nombre
// del curso lo dice el encabezado del grupo, así que acá sobra; en /examenes
// no hay ese encabezado y por eso `etiquetarExamen` no lo saca por su cuenta.
const SUFIJO_CURSO = /\s*·\s*[^·]*\bCurso\b[^·]*$/iu;

function partesExamen(e: ExamenMini): { titulo: string; detalle: string } {
  const { principal, secundaria } = etiquetarExamen(e.titulo, e.opcion);
  const titulo = principal.replace(SUFIJO_CURSO, "").trim();
  const detalle = [
    secundaria,
    e.fecha_examen ? formatearFecha(e.fecha_examen) : null,
    `${e.total_preguntas} preguntas`,
  ].filter(Boolean).join(" · ");
  return { titulo: titulo || principal, detalle };
}

const MODOS: {
  v: ModoSimulacion;
  icono: NombreIcono;
  t: string;
  d: string;
  // A qué nivel lleva el toque. null = no necesita más datos y arranca directo.
  siguiente: "anio" | "tema" | "dificultad" | null;
  premium?: boolean;
  // Qué se le dice a /precios que quiso hacer el alumno, para que la pantalla
  // ofrezca el upgrade que corresponde en vez de la lista de planes a secas.
  motivo?: string;
}[] = [
  { v: "examen_real", icono: "documento", t: "Examen real", d: "Un examen pasado completo, tal cual fue tomado", siguiente: "anio" },
  { v: "mixto", icono: "mezclar", t: "Mixto", d: "Preguntas aleatorias de varios años", siguiente: null },
  { v: "por_tema", icono: "etiqueta", t: "Por tema", d: "Solo preguntas de un tema específico", siguiente: "tema" },
  { v: "mis_errores", icono: "errores", t: "Mis errores", d: "Repasa donde fallaste", siguiente: "dificultad", premium: true, motivo: "errores" },
  { v: "ia_generado", icono: "chispa", t: "Simulacro inteligente", d: "La IA arma un examen nuevo, parecido al que probablemente caiga este año", siguiente: "dificultad", premium: true, motivo: "ia-infinita" },
];

function PracticarInner() {
  const router = useRouter();
  const params = useSearchParams();
  const modo = (params.get("modo") as ModoSimulacion | null) ?? null;
  const anioParam = params.get("anio");

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<string>("");
  const [examenes, setExamenes] = useState<ExamenMini[]>([]);
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

  const facultadObj = facultades.find((f) => f.id === usuario?.facultad_objetivo);

  // Un año por fila en vez de los 139 exámenes de corrido: el banco de
  // Ingeniería cubre 20 gestiones con hasta 12 exámenes cada una.
  const porAnio = useMemo(() => {
    const mapa = new Map<number, ExamenMini[]>();
    for (const e of examenes) {
      const lista = mapa.get(e.anio) ?? [];
      lista.push(e);
      mapa.set(e.anio, lista);
    }
    return [...mapa.entries()].sort((a, b) => b[0] - a[0]);
  }, [examenes]);

  const irA = (query: string) => router.push(`/practicar${query}`);

  const empezar = async (config: ConfiguracionSimulacion) => {
    setCreando(true);
    setError(null);
    setMostrarUpgrade(false);
    try {
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

  const base = (extra: Partial<ConfiguracionSimulacion>): ConfiguracionSimulacion => ({
    modo: modo as ModoSimulacion,
    universidad: "UMSS",
    facultad: facultadSeleccionada,
    ...extra,
  });

  if (loading) return <Cargando />;

  const esPagoUser = esPago(usuario?.plan);

  const aviso =
    modo === "por_tema" ? "Incluye todas las preguntas disponibles de ese tema."
    : modo === "ia_generado" && facultadObj
      ? `Seguirá el formato oficial de ${facultadObj.nombre_corto}: ${facultadObj.preguntas_examen ?? "—"} preguntas en ${facultadObj.duracion_minutos ?? "—"} minutos.`
    : modo === "mis_errores" && errores > 0 ? `Se arma con las ${errores} preguntas que tienes guardadas como error.`
    : null;

  // Cada nivel declara a dónde vuelve y qué está eligiendo el alumno. El "atrás"
  // es un link a la URL del nivel anterior, así que el gesto del sistema y el
  // botón de la pantalla hacen exactamente lo mismo.
  // `padre` es la miga de pan. No es decoración: a /practicar se entra también
  // por link directo (desde /errores con ?modo=mis_errores, por ejemplo), y ahí
  // el alumno cae en un nivel interior sin haber visto nunca la lista de modos.
  // Sin esta línea, los otros cuatro modos dejan de existir para él.
  const nivel = (() => {
    if (!modo) {
      return { volverA: "/dashboard", padre: null, titulo: "Nuevo simulacro", sub: "Elige cómo quieres practicar" };
    }
    const m = MODOS.find((x) => x.v === modo);
    const raiz = { label: "Nuevo simulacro", href: "/practicar" };
    if (modo === "examen_real" && anioParam) {
      return {
        volverA: "/practicar?modo=examen_real",
        padre: { label: "Examen real", href: "/practicar?modo=examen_real" },
        titulo: anioParam,
        sub: "Toca el examen que quieres rendir",
      };
    }
    if (modo === "examen_real") {
      return { volverA: "/practicar", padre: raiz, titulo: "Examen real", sub: "Elige la gestión" };
    }
    if (modo === "por_tema") {
      return { volverA: "/practicar", padre: raiz, titulo: "Por tema", sub: "Toca el tema que quieres practicar" };
    }
    return { volverA: "/practicar", padre: raiz, titulo: m?.t ?? "Simulacro", sub: "Elige la dificultad" };
  })();

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <BackLink href={nivel.volverA} label="Volver" />
          <div style={{ minWidth: 0 }}>
            {nivel.padre && (
              <Link
                href={nivel.padre.href}
                style={{
                  display: "inline-block", fontSize: 10.5, fontWeight: 800,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--accent)", textDecoration: "none", marginBottom: 1,
                }}
              >
                {nivel.padre.label}
              </Link>
            )}
            <h1 className="font-crimson" style={{ fontSize: 27, fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1.15 }}>
              {nivel.titulo}
            </h1>
            <p style={{ color: "var(--fg-muted)", fontSize: 13.5 }}>{nivel.sub}</p>
          </div>
        </div>

        {/* La facultad solo hace falta verla en el primer nivel: más adentro ya
            se sabe en qué se está, y el banner robaba la pantalla completa. */}
        {!modo && facultadObj && (
          <div style={{
            background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
            color: "var(--accent-fg)", borderRadius: 14, padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ display: "flex" }}><Icono nombre={iconoFacultad(facultadObj.id)} tamano={28} grosor={1.7} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estas postulando a</div>
              <div style={{ fontSize: 19, fontWeight: 800 }}>{facultadObj.nombre_corto}</div>
            </div>
            <Link
              href="/cambiar-facultad"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "rgba(255,255,255,0.2)", color: "var(--accent-fg)", textDecoration: "none", borderRadius: 999, fontSize: 12, fontWeight: 700 }}
            >
              <Icono nombre="candado" tamano={12} /> Cambiar
            </Link>
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

        {/* NIVEL 1 · tipo de práctica */}
        {!modo && (
          <Lista>
            {MODOS.map((m) => {
              const bloqueado = m.premium && !esPagoUser;
              const sinErrores = m.v === "mis_errores" && errores === 0;
              // Si está bloqueado, el mensaje que le sirve al alumno es el del
              // candado, no el de "todavía no tenés errores guardados": lo
              // primero que tiene que resolver es el plan.
              const detalle = bloqueado ? m.d
                : m.v === "mis_errores" && errores > 0 ? `Repasa donde fallaste (${errores} guardados)`
                : sinErrores ? "Completa un examen para guardar errores"
                : m.d;
              return (
                <Fila
                  key={m.v}
                  icono={m.icono}
                  titulo={m.t}
                  detalle={detalle}
                  candado={bloqueado}
                  // Bloqueado NO es disabled: se ve atenuado y con candado,
                  // pero se puede tocar y lleva a /precios. El alumno acaba de
                  // decir qué quería; es el mejor momento para ofrecerlo.
                  atenuado={bloqueado}
                  disabled={!bloqueado && sinErrores}
                  // Mixto no necesita ningún dato más: pedirle un paso extra al
                  // alumno para confirmar lo que ya eligió es el scroll que
                  // estamos sacando.
                  onClick={() => {
                    if (bloqueado) { router.push(`/precios?motivo=${m.motivo ?? "limite"}`); return; }
                    if (m.siguiente) irA(`?modo=${m.v}`); else empezar(base({ modo: m.v }));
                  }}
                />
              );
            })}
          </Lista>
        )}

        {/* NIVEL 2 · gestión */}
        {modo === "examen_real" && !anioParam && (
          <Lista>
            {porAnio.length === 0 && <Vacio>No hay exámenes cargados para esta facultad.</Vacio>}
            {porAnio.map(([anio, lista]) => (
              <Fila
                key={anio}
                titulo={String(anio)}
                detalle={`${lista.length} ${lista.length === 1 ? "examen" : "exámenes"}`}
                onClick={() => irA(`?modo=examen_real&anio=${anio}`)}
              />
            ))}
          </Lista>
        )}

        {/* NIVEL 3 · el examen. Acá el toque ya arranca. */}
        {modo === "examen_real" && anioParam && (() => {
          const delAnio = examenes.filter((e) => e.anio === Number(anioParam));
          // El banco marca los parciales con `categoria: "parcial_curso"` y a
          // los de admisión con "admision" (la completa el loader, no el
          // frontmatter): agrupar por "no tiene categoría" dejaba vacío el
          // primer grupo y todo caía en el segundo.
          const grupos: [string, ExamenMini[]][] = [
            ["Examen de ingreso", delAnio.filter((e) => e.categoria !== "parcial_curso")],
            ["Curso propedéutico · PRE-U", delAnio.filter((e) => e.categoria === "parcial_curso")],
          ];
          return (
            <>
              {delAnio.length === 0 && <Vacio>No hay exámenes de esa gestión.</Vacio>}
              {grupos.map(([etiqueta, lista]) => lista.length === 0 ? null : (
                <div key={etiqueta} style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                    {etiqueta}
                  </div>
                  {/* Sin reordenar: el banco ya los lista en orden lógico
                      (Primer, Segundo, Tercer, Cuarto parcial). Alfabético
                      ponía "Cuarto" antes que "Primero". */}
                  <Lista>
                    {lista.map((e) => {
                      const { titulo, detalle } = partesExamen(e);
                      return (
                        <Fila
                          key={e.id}
                          icono="documento"
                          titulo={titulo}
                          detalle={detalle}
                          onClick={() => empezar(base({ modo: "examen_real", examen_id: e.id }))}
                        />
                      );
                    })}
                  </Lista>
                </div>
              ))}
            </>
          );
        })()}

        {/* NIVEL 2 · tema */}
        {modo === "por_tema" && (
          <Lista>
            {materias.length === 0 && <Vacio>No hay temas cargados para esta facultad.</Vacio>}
            {materias.map((m) => (
              <Fila
                key={m.id}
                icono="etiqueta"
                titulo={m.nombre}
                detalle={etiquetaArea(m.area)}
                onClick={() => empezar(base({ modo: "por_tema", tema: m.id }))}
              />
            ))}
          </Lista>
        )}

        {/* NIVEL 2 · dificultad */}
        {(modo === "ia_generado" || modo === "mis_errores") && (
          <Lista>
            {([
              ["facil", "Fácil", "Para agarrar confianza"],
              ["medio", "Medio", "El nivel del examen real"],
              ["dificil", "Difícil", "Las más duras del banco"],
            ] as [Dificultad, string, string][]).map(([v, t, d]) => (
              <Fila
                key={v}
                titulo={t}
                detalle={d}
                onClick={() => empezar(base({
                  modo,
                  dificultad: v,
                  ...(modo === "mis_errores" && temasReforzar.length ? { temas_reforzar: temasReforzar } : {}),
                }))}
              />
            ))}
          </Lista>
        )}

        {/* Solo donde es cierto. "Mis errores" arma el examen con lo que fallaste,
            así que NO sigue el formato oficial: prometérselo era mentirle. */}
        {aviso && (
          <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "12px 14px", background: "var(--bg-subtle)", borderRadius: 10, fontSize: 13, color: "var(--fg-muted)" }}>
            <span style={{ display: "flex", paddingTop: 1 }}><Icono nombre="info" tamano={15} /></span>
            <span>{aviso}</span>
          </div>
        )}
      </div>

      {/* Sin esto, tocar una fila no da ninguna señal hasta que carga el examen:
          el alumno vuelve a tocar y dispara dos simulacros. */}
      {creando && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(26, 31, 46, 0.55)", backdropFilter: "blur(2px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "20px 28px", fontWeight: 700, color: "var(--fg-primary)" }}>
            Preparando tu examen...
          </div>
        </div>
      )}
    </div>
  );
}

function Lista({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>;
}

function Vacio({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "var(--fg-muted)", fontSize: 13, padding: "8px 2px" }}>{children}</div>;
}

function Fila({
  titulo, detalle, icono, onClick, disabled, candado, atenuado,
}: {
  titulo: string;
  detalle?: string;
  icono?: NombreIcono;
  onClick: () => void;
  disabled?: boolean;
  candado?: boolean;
  // Se ve apagado pero SÍ se puede tocar (un modo de pago que lleva a /precios).
  // Sin esto, "apagado" y "no se puede tocar" eran la misma cosa.
  atenuado?: boolean;
}) {
  return (
    <button
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", gap: 13, width: "100%",
        padding: "14px 16px", textAlign: "left",
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : atenuado ? 0.62 : 1,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {icono && (
        <span style={{ display: "flex", color: "var(--accent)", flexShrink: 0 }}>
          <Icono nombre={icono} tamano={22} />
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 700, color: "var(--fg-primary)" }}>
          {titulo}
          {candado && <Icono nombre="candado" tamano={13} />}
        </span>
        {detalle && (
          <span style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginTop: 2 }}>
            {detalle}
          </span>
        )}
      </span>
      <span style={{ display: "flex", color: "var(--fg-faint, var(--fg-muted))", flexShrink: 0, opacity: 0.6 }}>
        <Icono nombre="chevron" tamano={18} />
      </span>
    </button>
  );
}

export default function PracticarPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <PracticarInner />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import Icono, { type NombreIcono } from "../components/Icono";
import type { Usuario, Facultad, HistorialExamen } from "@/lib/data-store";
import { esPago, inicioSemanaISO, textoProximaRenovacion, LIMITE_SEMANAL_PASADAS, LIMITE_SEMANAL_PRONOSTICADAS } from "@/lib/plan";
import { diasConPractica, textoConstancia } from "@/lib/refuerzo";
import { etiquetaArea } from "@/lib/axiom/areas";
import { bloqueDeArea } from "@/lib/axiom/progreso-lecciones";

interface ErroresResumen {
  para_hoy?: number;
  total?: number;
}

interface SeccionDebil {
  seccion: string;
  promedio: number;
  intentos: number;
}

interface DebilidadesResumen {
  secciones?: SeccionDebil[];
}

/** Días de calendario entre hoy (hora local) y una fecha AAAA-MM-DD. Negativo si ya pasó. */
function diasHasta(fechaIso: string): number {
  const [y, m, d] = fechaIso.split("-").map(Number);
  const hoy = new Date();
  const msDia = 86400000;
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) / msDia);
}

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [historial, setHistorial] = useState<HistorialExamen[]>([]);
  const [erroresData, setErroresData] = useState<ErroresResumen | null>(null);
  const [debilidadesData, setDebilidadesData] = useState<DebilidadesResumen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/historial").then((r) => r.json()).catch(() => ({ historial: [] })),
      fetch("/api/facultades").then((r) => r.json()).catch(() => ({ facultades: [] })),
      fetch("/api/axiom/errores").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch("/api/axiom/debilidades").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]).then(([me, hist, fac, errRes, debRes]) => {
      if (!me.usuario) {
        router.push("/login");
        return;
      }
      // Si el usuario no eligió facultad todavía, mandarlo a onboarding
      if (!me.usuario.facultad_objetivo) {
        router.push("/onboarding");
        return;
      }
      setUsuario(me.usuario);
      setHistorial(hist.historial ?? []);
      const f = (fac.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
      setFacultad(f ?? null);
      setErroresData(errRes);
      setDebilidadesData(debRes);
      setLoading(false);
    }).catch(() => {
      // Si /api/auth/me falla por red, evitamos dejar la pantalla colgada en "Cargando..."
      setError(true);
      setLoading(false);
    });
  }, [router]);

  if (error) {
    return (
      <div style={{ padding: 40, minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
        <span style={{ color: "var(--accent)" }}><Icono nombre="alerta" tamano={40} grosor={1.6} /></span>
        <p style={{ color: "var(--fg-muted)", fontSize: 16, maxWidth: 320 }}>No pudimos conectar con el servidor. Revisa tu conexión a internet.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "11px 26px", background: "var(--accent)", color: "var(--accent-fg)", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (loading || !usuario) return <Cargando />;

  const ultimos = historial.slice(0, 5);
  // Plan gratis: 2 simulacros pasados + 2 predictivos por semana (salen de LIMITE_SEMANAL_*).
  const limiteSemanal = LIMITE_SEMANAL_PASADAS + LIMITE_SEMANAL_PRONOSTICADAS;
  const desdeSemana = inicioSemanaISO();
  const examenesEstaSemana = historial.filter((h) => h.fecha >= desdeSemana).length;
  const esGratis = !esPago(usuario.plan);
  const limiteAlcanzado = esGratis && examenesEstaSemana >= limiteSemanal;
  const restantes = Math.max(0, limiteSemanal - examenesEstaSemana);
  const diasPractica7 = diasConPractica(
    historial.map((h) => h.fecha),
    new Date().toISOString(),
  );
  const lineaConstancia = textoConstancia(diasPractica7);
  const diasParaExamen = facultad?.fecha_examen ? diasHasta(facultad.fecha_examen) : null;

  const erroresParaHoy = typeof erroresData?.para_hoy === "number" ? erroresData.para_hoy : 0;
  const areaDebil = (debilidadesData?.secciones ?? [])
    .filter((s) => typeof s.promedio === "number" && s.promedio < 70)
    .sort((a, b) => a.promedio - b.promedio)[0] ?? null;

  const guiaDiaria: {
    titulo: string;
    descripcion: string;
    ctaLabel: string;
    ctaHref: string;
    secLabel?: string;
    secHref?: string;
  } = limiteAlcanzado
    ? {
        titulo: "Llegaste al límite del plan gratis",
        descripcion: `Hiciste ${examenesEstaSemana} simulacros esta semana. Se renueva ${textoProximaRenovacion()}. Pásate a Premium para tenerlos ilimitados.`,
        ctaLabel: "Mejorar plan",
        ctaHref: "/precios",
      }
    : erroresParaHoy > 0
      ? {
          titulo: `Tienes ${erroresParaHoy} ${erroresParaHoy === 1 ? "error pendiente" : "errores pendientes"} por repasar hoy`,
          descripcion:
            diasParaExamen !== null && diasParaExamen > 0
              ? `Repasar tus errores recientes fija el concepto antes del examen (${diasParaExamen === 1 ? "falta 1 día" : `faltan ${diasParaExamen} días`}).`
              : diasParaExamen === 0
                ? "Repasar tus errores recientes fija el concepto justo a tiempo para tu examen de hoy."
                : "Repasar tus errores recientes fija el concepto antes del examen y evita repetir los mismos fallos.",
          ctaLabel: "Repasar errores",
          ctaHref: "/errores",
          secLabel: "Ir a lecciones",
          secHref: "/aprende",
        }
      : areaDebil
        ? {
            titulo: `Refuerza ${etiquetaArea(areaDebil.seccion)} (${areaDebil.promedio}%)`,
            descripcion: "Repasa la teoría de esta área y luego ponla a prueba con 10 preguntas.",
            ctaLabel: "Estudiar esta área",
            ctaHref: `/aprende?bloque=${bloqueDeArea(areaDebil.seccion)}`,
            secLabel: "Empezar simulacro",
            secHref: "/practicar",
          }
        : {
            titulo: "¿Listo para tu siguiente simulacro?",
            descripcion: `Tienes ${esGratis ? `${restantes} simulacros gratis` : "simulacros ilimitados"} esta semana${esGratis ? ` (se renueva ${textoProximaRenovacion()})` : ""}.`,
            ctaLabel: "Empezar simulacro",
            ctaHref: "/practicar",
            secLabel: "Ir a lecciones",
            secHref: "/aprende",
          };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(18px, 3vw, 32px) clamp(16px, 3vw, 24px)" }}>
        {/* Saludo + números de un vistazo. Antes eran cuatro tarjetas grandes
            apiladas que en móvil ocupaban media pantalla para mostrar cuatro
            cifras; ahora van en una sola fila separada por líneas. */}
        <div className="ax-dash-cabecera" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          <div>
            <h1 className="font-crimson" style={{ fontSize: 34, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>
              Buenas, {usuario.nombre.split(" ")[0]}
            </h1>
            <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
              Postulas a <strong style={{ color: "var(--fg-primary)" }}>{facultad?.nombre_corto}</strong>. Sigue practicando.
            </p>
            {facultad?.fecha_examen && (
              <p style={{ color: "var(--fg-muted)", fontSize: 13.5, marginTop: 2 }}>
                Examen de admisión: {new Date(facultad.fecha_examen + "T12:00:00").toLocaleDateString("es-BO", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
            {lineaConstancia && (
              <p style={{ color: "var(--accent)", fontSize: 13.5, fontWeight: 600, marginTop: 4, fontVariantNumeric: "lining-nums" }}>
                {lineaConstancia}
              </p>
            )}
          </div>

          <div className={`ax-cifras${diasParaExamen !== null && diasParaExamen >= 0 ? " ax-cifras-5" : ""}`} style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6 }}>
            {diasParaExamen !== null && diasParaExamen >= 0 && (
              <Cifra label="Días al examen" valor={diasParaExamen} color="var(--accent)" />
            )}
            <Cifra label="Exámenes" valor={usuario.examenes_completados} />
            <Cifra label="Mejor nota" valor={usuario.mejor_nota} color="var(--green)" />
            <Cifra label="Promedio" valor={usuario.nota_promedio} />
            <Cifra label="Esta semana" valor={examenesEstaSemana} />
          </div>
        </div>

        {/* Pieza dominante: una sola acción clara, en tinta sólida */}
        <div style={{
          background: limiteAlcanzado ? "#fbf1e1" : "var(--bg-card)",
          border: `1px solid ${limiteAlcanzado ? "#7d4a12" : "var(--border)"}`,
          borderLeft: `5px solid ${limiteAlcanzado ? "#7d4a12" : "var(--accent)"}`,
          borderRadius: 8, padding: "20px clamp(16px, 3vw, 26px)", color: "var(--fg-primary)", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: limiteAlcanzado ? "#7d4a12" : "var(--accent)", marginBottom: 10 }}>
              {limiteAlcanzado ? "Límite semanal alcanzado" : "Tu próximo paso"}
            </div>
            <h2 className="font-crimson" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
              {guiaDiaria.titulo}
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--fg-muted)" }}>
              {guiaDiaria.descripcion}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px 16px", flexWrap: "wrap" }}>
            <Link href={guiaDiaria.ctaHref} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
              minHeight: 44, padding: "11px 22px", background: "var(--accent)", color: "var(--accent-fg)",
              borderRadius: 4, textDecoration: "none", fontWeight: 700, fontSize: 15,
            }}>
              {guiaDiaria.ctaLabel}
              <Icono nombre="flecha" tamano={16} grosor={2.4} />
            </Link>
            {guiaDiaria.secLabel && guiaDiaria.secHref && (
              <Link href={guiaDiaria.secHref} style={{
                display: "inline-flex", alignItems: "center", minHeight: 44, padding: "8px 4px",
                color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 3,
                fontWeight: 600, fontSize: 14,
              }}>
                {guiaDiaria.secLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Últimos exámenes + Acciones rápidas. En móvil apila ambas (1 columna);
            en pantallas >= 720px va lado a lado (2 columnas). */}
        <div className="ax-dash-grid" style={{ display: "grid", gap: 20 }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)" }}>Últimos exámenes</h3>
              <Link href="/historial" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Ver todo →</Link>
            </div>
            {ultimos.length === 0 && (
              <div style={{ textAlign: "center", padding: 30, color: "var(--fg-muted)", fontSize: 14 }}>
                Aún no has hecho ningún examen. <Link href="/practicar" style={{ color: "var(--accent)", textDecoration: "underline" }}>Empieza ahora</Link>.
              </div>
            )}
            {ultimos.map((h) => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="font-crimson" style={{ width: 46, fontSize: 24, fontWeight: 700, marginRight: 12, color: h.nota >= 70 ? "var(--green)" : h.nota >= 50 ? "#c07a2a" : "#b3341f" }}>
                  {h.nota}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-primary)" }}>
                    {modoLabel(h.modo)} {h.anio_examen ? `· Examen ${h.anio_examen}` : ""}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {new Date(h.fecha).toLocaleDateString("es-BO", { day: "numeric", month: "short", year: "numeric" })} · {h.correctas}/{h.correctas + h.incorrectas + h.sin_responder} correctas
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
            <Acceso href="/practicar" icono="practicar" titulo="Practicar" detalle="Elige cómo practicar" />
            <Acceso href="/aprende" icono="aprende" titulo="Lecciones" detalle="Estudia la teoría paso a paso" />
            <Acceso href="/debilidades" icono="grafico" titulo="Mis debilidades" detalle="Mira qué áreas reforzar" />
            <Acceso href="/errores" icono="errores" titulo="Mis errores" detalle="Repasa lo que fallaste" />
            <Acceso href="/ranking" icono="ranking" titulo="Ranking" detalle="Top 10 global" />
            <Acceso href="/cuenta" icono="cuenta" titulo="Mi cuenta" detalle={`Plan ${usuario.plan}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// El número va pegado al fondo de la columna: así las etiquetas de dos
// palabras pueden partirse en móvil sin desalinear las cifras entre sí.
function Cifra({ label, valor, color }: { label: string; valor: string | number; color?: string }) {
  return (
    <div style={{ padding: "14px 18px", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8 }}>
      <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.3 }}>{label}</div>
      <div className="font-crimson" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: color ?? "var(--fg-primary)" }}>{valor}</div>
    </div>
  );
}

function Acceso({ href, icono, titulo, detalle }: { href: string; icono: NombreIcono; titulo: string; detalle: string }) {
  return (
    <Link
      href={href}
      style={{
        background: "var(--bg-card)", borderRadius: 6, minHeight: 44, padding: "14px 16px", textDecoration: "none",
        display: "flex", alignItems: "center", gap: 13, border: "1px solid var(--border)",
      }}
    >
      <span style={{ color: "var(--accent)", display: "flex" }}>
        <Icono nombre={icono} tamano={20} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{titulo}</span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginTop: 1 }}>{detalle}</span>
      </span>
      <span style={{ color: "var(--border-hover)", display: "flex" }}>
        <Icono nombre="chevron" tamano={16} grosor={2} />
      </span>
    </Link>
  );
}

function modoLabel(modo: string): string {
  return ({
    examen_real: "Examen anterior",
    mixto: "Mezcla de años",
    predictivo: "Simular examen de ingreso",
    por_tema: "Por tema",
    mis_errores: "Mis errores",
    ia_generado: "Simulacro inteligente",
  } as Record<string, string>)[modo] ?? modo;
}

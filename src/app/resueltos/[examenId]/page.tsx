"use client";

import { useEffect, useState } from "react";
import Icono, { iconoFacultad } from "../../components/Icono";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import BackLink from "../../components/BackLink";
import Cargando from "../../components/Cargando";
import MathText from "../../components/MathText";
import FiguraExamen, { FiguraSVGLibre } from "../../components/FiguraExamen";
import SolucionPasos from "../../components/SolucionPasos";
import type { ExamenBanco, PreguntaBanco } from "@/lib/axiom/types";
import type { Facultad } from "@/lib/data-store";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  aritmetica_algebra: "Aritmética-Álgebra",
  geometria_trigonometria: "Geometría-Trigonometría",
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

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el detalle).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

export default function ExamenResueltoPage() {
  const router = useRouter();
  const params = useParams();
  const examenId = params.examenId as string;

  const [examen, setExamen] = useState<ExamenBanco | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [reveladas, setReveladas] = useState<Set<string>>(new Set());
  const [areaActiva, setAreaActiva] = useState<string>("__todas__");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => {
      if (!me.usuario) { router.push("/login"); return; }
      Promise.all([
        fetch(`/api/axiom/examenes/${examenId}`).then((r) => r.json()),
        fetch("/api/facultades").then((r) => r.json()),
      ]).then(([e, f]) => {
        const ex: ExamenBanco | null = e.examen ?? null;
        setExamen(ex);
        if (ex) {
          const fac = (f.facultades ?? []).find((x: Facultad) => x.id === ex.facultad);
          setFacultad(fac ?? null);
        }
        setLoading(false);
      });
    });
  }, [examenId, router]);

  if (loading) return <Cargando texto="Cargando examen…" />;
  if (!examen) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <AppHeader />
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, textAlign: "center" }}>
          <h2>Examen no encontrado</h2>
          <BackLink href="/resueltos" label="Volver al listado" />
        </div>
      </div>
    );
  }

  const togglePregunta = (id: string) => {
    const nuevas = new Set(reveladas);
    if (nuevas.has(id)) nuevas.delete(id);
    else nuevas.add(id);
    setReveladas(nuevas);
  };

  const revelarTodas = () => setReveladas(new Set(examen.preguntas.map((p) => p.id)));
  const ocultarTodas = () => setReveladas(new Set());

  // Agrupar por área para tabs
  const areasUnicas: string[] = [];
  examen.preguntas.forEach((p) => { if (!areasUnicas.includes(p.area)) areasUnicas.push(p.area); });

  const preguntasFiltradas = areaActiva === "__todas__"
    ? examen.preguntas
    : examen.preguntas.filter((p) => p.area === areaActiva);

  const color = facultad?.color ?? "#6366F1";

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />

      {/* Hero del examen */}
      <div style={{
        background: `linear-gradient(135deg, ${color}, ${facultad?.color_secundario ?? color})`,
        color: "white",
        padding: "28px clamp(14px, 5vw, 24px)",
      }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <BackLink href="/resueltos" label="Volver a exámenes resueltos" variant="dark" />
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 3vw, 18px)", marginTop: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}><Icono nombre={facultad ? iconoFacultad(facultad.id) : "documento"} tamano={44} grosor={1.6} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Examen oficial · {examen.universidad} · {examen.anio}
              </div>
              <h1 className="font-crimson" style={{ fontSize: "clamp(22px, 6vw, 32px)", fontWeight: 800, marginTop: 2, lineHeight: 1.15, textWrap: "balance" }}>
                {examen.titulo ?? `${facultad?.nombre_corto ?? examen.facultad} ${examen.anio}${examen.opcion ? ` · ${examen.opcion}` : ""}`}
              </h1>
              <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6 }}>
                {examen.fecha_examen && <><Icono nombre="calendario" tamano={13} /> {formatearFecha(examen.fecha_examen)} · </>}
                {examen.preguntas.length} preguntas · {examen.duracion_minutos} min · resuelto paso a paso
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px" }}>
        {/* Controles superiores */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
          {/* Filtro por área */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              onClick={() => setAreaActiva("__todas__")}
              style={{
                padding: "6px 14px", borderRadius: 999,
                border: areaActiva === "__todas__" ? `2px solid ${color}` : "1px solid var(--border)",
                background: areaActiva === "__todas__" ? `${color}15` : "var(--bg-card)",
                color: areaActiva === "__todas__" ? color : "var(--fg-primary)",
                fontWeight: 700, fontSize: 12, cursor: "pointer",
              }}
            >
              Todas · {examen.preguntas.length}
            </button>
            {areasUnicas.map((a) => {
              const cuantas = examen.preguntas.filter((p) => p.area === a).length;
              const activa = areaActiva === a;
              return (
                <button
                  key={a}
                  onClick={() => setAreaActiva(a)}
                  style={{
                    padding: "6px 14px", borderRadius: 999,
                    border: activa ? `2px solid ${color}` : "1px solid var(--border)",
                    background: activa ? `${color}15` : "var(--bg-card)",
                    color: activa ? color : "var(--fg-primary)",
                    fontWeight: 700, fontSize: 12, cursor: "pointer",
                  }}
                >
                  {ETIQUETAS_AREA[a] ?? a} · {cuantas}
                </button>
              );
            })}
          </div>
          {/* Acción global */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={reveladas.size === examen.preguntas.length ? ocultarTodas : revelarTodas}
              style={{
                padding: "8px 16px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--bg-card)",
                fontWeight: 700, fontSize: 12, cursor: "pointer", color: "var(--fg-primary)",
              }}
            >
              {reveladas.size === examen.preguntas.length ? <><Icono nombre="ojoTachado" tamano={14} /> Ocultar todas</> : <><Icono nombre="ojo" tamano={14} /> Revelar todas</>}
            </button>
          </div>
        </div>

        {/* Lista de preguntas */}
        <div style={{ display: "grid", gap: 14 }}>
          {preguntasFiltradas.map((p, i) => {
            const numeroGlobal = examen.preguntas.findIndex((x) => x.id === p.id) + 1;
            const revelada = reveladas.has(p.id);
            return <PreguntaResuelta key={p.id} pregunta={p} numero={numeroGlobal} revelada={revelada} onToggle={() => togglePregunta(p.id)} colorFac={color} />;
          })}
        </div>

        {preguntasFiltradas.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>
            No hay preguntas en esta área.
          </div>
        )}
      </div>
    </div>
  );
}

function PreguntaResuelta({
  pregunta, numero, revelada, onToggle, colorFac,
}: {
  pregunta: PreguntaBanco;
  numero: number;
  revelada: boolean;
  onToggle: () => void;
  colorFac: string;
}) {
  return (
    <div style={{
      background: "var(--bg-card)",
      borderRadius: 14,
      border: revelada ? `2px solid ${colorFac}` : "1px solid var(--border)",
      padding: 22,
      transition: "all 0.2s",
    }}>
      {/* Cabecera */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{
          flexShrink: 0,
          width: 36, height: 36, borderRadius: "50%",
          background: colorFac, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800,
        }}>{numero}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 10, padding: "2px 8px", background: `${colorFac}15`, color: colorFac, borderRadius: 999, fontWeight: 800, textTransform: "uppercase" }}>
              {ETIQUETAS_AREA[pregunta.area] ?? pregunta.area}
            </span>
            <span style={{ fontSize: 10, padding: "2px 8px", background: "var(--bg-subtle)", color: "var(--fg-muted)", borderRadius: 999, fontWeight: 700, textTransform: "uppercase" }}>
              {pregunta.tema}
            </span>
            <span style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 700, textTransform: "uppercase",
              background: pregunta.dificultad === "facil" ? "#10b98115" : pregunta.dificultad === "medio" ? "#f59e0b15" : "#ef444415",
              color: pregunta.dificultad === "facil" ? "#059669" : pregunta.dificultad === "medio" ? "#d97706" : "#dc2626",
            }}>
              {pregunta.dificultad === "facil" ? "Fácil" : pregunta.dificultad === "medio" ? "Medio" : "Difícil"}
            </span>
          </div>
          <div style={{ fontSize: 16, color: "var(--fg-primary)", lineHeight: 1.5, fontWeight: 500 }}>
            <MathText block>{pregunta.enunciado}</MathText>
          </div>
        </div>
      </div>

      {/* Figura del enunciado. Prioridad: SVG que vino en el propio .md
          (exámenes generados en lote por otra IA) > figura del motor de
          geometría (cuando aún no revela; al revelar, la del motor se anima
          dentro del reproductor de pasos). */}
      {pregunta.figura_svg ? (
        <FiguraSVGLibre svg={pregunta.figura_svg} />
      ) : (
        pregunta.figura && !revelada && <FiguraExamen id={pregunta.figura} />
      )}

      {/* Opciones */}
      <div style={{ display: "grid", gap: 6, marginBottom: 14 }}>
        {pregunta.opciones.map((op) => {
          const esCorrecta = op.letra === pregunta.respuesta_correcta;
          const muestraColor = revelada && esCorrecta;
          return (
            <div
              key={op.letra}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 12px", borderRadius: 10,
                border: muestraColor ? "2px solid #10b981" : "1px solid var(--border)",
                background: muestraColor ? "rgba(16,185,129,0.08)" : "var(--bg-card)",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 26, height: 26, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                background: muestraColor ? "#10b981" : "var(--bg-subtle)",
                color: muestraColor ? "white" : "var(--fg-primary)",
                border: muestraColor ? "none" : "1px solid var(--border)",
              }}>
                {op.letra}
              </span>
              <span style={{ flex: 1, fontSize: 14, color: "var(--fg-primary)" }}>
                <MathText>{op.texto}</MathText>
              </span>
              {muestraColor && (
                <span style={{ fontSize: 11, padding: "3px 8px", background: "#10b981", color: "white", borderRadius: 999, fontWeight: 800, whiteSpace: "nowrap" }}>
                  ✓ CORRECTA
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón revelar / Explicación */}
      {!revelada ? (
        <button
          onClick={onToggle}
          style={{
            width: "100%", padding: "10px 16px",
            background: colorFac, color: "white",
            border: "none", borderRadius: 10,
            fontWeight: 800, fontSize: 13, cursor: "pointer",
          }}
        >
          <Icono nombre="ojo" tamano={15} /> Ver respuesta y explicación paso a paso
        </button>
      ) : (
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <Icono nombre="idea" tamano={15} /> Solución paso a paso
            </div>
            <button onClick={onToggle} style={{ fontSize: 11, color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer" }}>
              Ocultar
            </button>
          </div>
          {pregunta.explicacion ? (
            <SolucionPasos
              explicacion={pregunta.explicacion}
              figura={pregunta.figura_svg ? undefined : pregunta.figura}
              colorFac={colorFac}
            />
          ) : (
            <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.7 }}>
              {pregunta.figura && <FiguraExamen id={pregunta.figura} />}
              <span style={{ color: "var(--fg-muted)", fontStyle: "italic" }}>
                Esta pregunta aún no tiene explicación detallada. La respuesta correcta es{" "}
                <strong style={{ color: "#10b981" }}>{pregunta.respuesta_correcta}</strong>.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

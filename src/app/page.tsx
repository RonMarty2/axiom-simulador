"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppHeader from "./components/AppHeader";
import Icono, { iconoFacultad } from "./components/Icono";
import type { FacultadConBanco } from "@/lib/data-store";

// Componente de fracción matemática real (estándar AXIOM · nunca barra diagonal /)
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      verticalAlign: "middle",
      fontSize: "0.88em",
      lineHeight: 1,
      margin: "0 0.25em",
    }}>
      <span style={{ padding: "0 0.2em" }}>{n}</span>
      <span style={{ width: "100%", borderTop: "1.5px solid currentColor", margin: "3px 0" }} />
      <span style={{ padding: "0 0.2em" }}>{d}</span>
    </span>
  );
}

// Preguntas interactivas para la demo en vivo en el Hero (Impeccable: demostrar el producto en funcionamiento)
interface OpcionDemo {
  id: string;
  texto: React.ReactNode;
  correcta: boolean;
}

interface PreguntaItem {
  facultad: string;
  gestion: string;
  pregunta: string;
  cita: React.ReactNode;
  opciones: OpcionDemo[];
  explicacion: React.ReactNode;
}

const PREGUNTAS_DEMO: Record<string, PreguntaItem> = {
  medicina: {
    facultad: "Medicina · Morfofunción",
    gestion: "Parcial Oficial 2025",
    pregunta: "En relación a la Hemostasia, se afirma que:",
    cita: "«Cuando se dañan las venas y vénulas, el músculo liso de sus paredes se contrae inmediatamente produciendo el espasmo vascular.»",
    opciones: [
      { id: "A", texto: "Es una afirmación VERDADERA", correcta: false },
      { id: "B", texto: "Es una afirmación FALSA", correcta: true },
      { id: "C", texto: "Solo ocurre si hay hemorragia externa", correcta: false },
      { id: "D", texto: "Ninguno", correcta: false },
    ],
    explicacion: "El espasmo vascular ocurre únicamente en arterias y arteriolas, nunca en venas ni vénulas (Tortora, cap. 19). Una sola palabra cambió todo el sentido.",
  },
  economicas: {
    facultad: "Ciencias Económicas · Matemáticas",
    gestion: "Examen Oficial 2023",
    pregunta: "Al simplificar la expresión algebraica:",
    cita: (
      <span style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
        <i>E</i>&nbsp;=&nbsp;
        <Frac n={<><i>x</i><sup>2</sup> − 9</>} d={<><i>x</i> + 3</>} />
        &nbsp;&nbsp;para&nbsp;&nbsp;<i>x</i> ≠ −3
      </span>
    ),
    opciones: [
      { id: "A", texto: <span style={{ whiteSpace: "nowrap" }}><i>x</i> + 3</span>, correcta: false },
      { id: "B", texto: <span style={{ whiteSpace: "nowrap" }}><i>x</i> − 3</span>, correcta: true },
      { id: "C", texto: <span style={{ whiteSpace: "nowrap" }}><i>x</i><sup>2</sup> − 3</span>, correcta: false },
      { id: "D", texto: "Ninguno", correcta: false },
    ],
    explicacion: (
      <span>
        Diferencia de cuadrados: <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}><i>x</i><sup>2</sup> − 9 = (<i>x</i> + 3)(<i>x</i> − 3)</span>.
        <br />
        Al simplificar con el denominador <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>(<i>x</i> + 3)</span>, el resultado exacto es <span style={{ whiteSpace: "nowrap", fontWeight: 700, color: "var(--accent)" }}><i>x</i> − 3</span>.
      </span>
    ),
  },
  tecnologia: {
    facultad: "Tecnología / Ingeniería · Física",
    gestion: "Curso Prefacultativo 2024",
    pregunta: "En el Movimiento Rectilíneo Uniformemente Variado (MRUV):",
    cita: "«Si la velocidad y la aceleración tienen signos opuestos, el móvil está...»",
    opciones: [
      { id: "A", texto: "Acelerando hacia el origen", correcta: false },
      { id: "B", texto: "Frenando (movimiento retardado)", correcta: true },
      { id: "C", texto: "En reposo instantáneo", correcta: false },
      { id: "D", texto: "Ninguno", correcta: false },
    ],
    explicacion: "Cuando aceleración y velocidad tienen signos contrarios, los vectores se oponen, reduciendo la rapidez: el móvil frena.",
  },
};

type CarreraDemo = keyof typeof PREGUNTAS_DEMO;

// Banners ilustrados por facultad (generados con el sistema visual editorial)
const BANNERS_FACULTADES: Record<string, string> = {
  medicina: "/images/facultades/medicina.jpg",
  economicas: "/images/facultades/economicas.jpg",
  ingenieria: "/images/facultades/ingenieria.jpg",
  tecnologia: "/images/facultades/ingenieria.jpg",
  derecho: "/images/facultades/derecho.jpg",
};


const FAQS_LANDING = [
  {
    q: "¿Los exámenes del simulador son realmente los que tomó la UMSS?",
    a: "Sí. Cada uno de los 139 exámenes del banco es un facsímil oficial recopilado y contrastado con las convocatorias reales de la UMSS (Medicina, Tecnología, Ciencias Económicas y Derecho). Cada ejercicio indica el año y la gestión en que fue tomado.",
  },
  {
    q: "¿Por qué AXIOM es más efectivo que las fotocopias de la calle Jordan o Sucre?",
    a: "Las fotocopias callejeras suelen traer errores y claves dudosas escritas a bolígrafo, y no te entrenan bajo presión. En San Simón tienes solo 90 segundos por pregunta. AXIOM te entrena con cronómetro idéntico al examen, con la opción trampa «Ninguno» y explicaciones paso a paso sin saltarse operaciones.",
  },
  {
    q: "¿Puedo probar la plataforma gratis antes de pagar?",
    a: "Sí. Puedes registrarte sin costo y dar un simulacro de diagnóstico completo para medir tu puntaje actual y detectar tus puntos ciegos antes de decidir.",
  },
  {
    q: "¿Cómo se realiza el pago en Bolivia mediante QR Simple?",
    a: "Pagas directamente desde la app móvil de cualquier banco del país (Banco Unión, BCP, BNB, Mercantil, Fie, Banco Sol, etc.) o en USDT. Tu cuenta se activa tras verificar el comprobante.",
  },
  {
    q: "¿Funciona en cualquier celular sin instalar aplicaciones pesadas?",
    a: "Sí. AXIOM es una Progressive Web App (PWA) de alta velocidad. Funciona en Chrome o Safari en cualquier celular Android, iPhone o computadora, ocupa menos de 2 MB y puedes guardarla en tu pantalla de inicio.",
  },
];

export default function LandingPage() {
  const [facultades, setFacultades] = useState<FacultadConBanco[]>([]);
  const [carreraSel, setCarreraSel] = useState<CarreraDemo>("medicina");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null);
  const [segundos, setSegundos] = useState(89 * 60 + 45);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null); // 89:45 cronometro

  // Al alternar carrera en la demo de la landing, el tema visual muta de inmediato al color de la facultad
  useEffect(() => {
    const facId = carreraSel === "tecnologia" ? "ingenieria" : carreraSel;
    document.documentElement.setAttribute("data-facultad", facId);
  }, [carreraSel]);

  useEffect(() => {
    fetch("/api/facultades")
      .then((r) => r.json())
      .then((d) => setFacultades(d.facultades ?? []))
      .catch(() => {});
  }, []);

  // Reloj regresivo sutil para dar la sensacion real del examen oficial
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatoTiempo = (totalSeg: number) => {
    const min = Math.floor(totalSeg / 60);
    const seg = totalSeg % 60;
    return `${min}:${seg < 10 ? "0" : ""}${seg}`;
  };

  const totalExamenes = facultades.reduce((acc, f) => acc + (f.examenes || 0), 0) || 150;
  const preguntaActual = PREGUNTAS_DEMO[carreraSel];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <AppHeader />

      {/* ═══ HERO SPLIT (Modo Persuade · Impeccable + Humanizer) ═══ */}
      <section style={{ padding: "50px 24px 70px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div>
            {/* Eyebrow local de autoridad */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, background: "var(--accent)", transform: "rotate(45deg)" }}></span>
              Hecho en Cochabamba para la UMSS
            </div>

            <h1 className="font-crimson" style={{ fontSize: "clamp(38px, 5.2vw, 64px)", fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.025em" }}>
              Los {totalExamenes} exámenes reales que tomó la UMSS.<br />
              <span style={{ color: "var(--accent)" }}>Resueltos paso a paso.</span>
            </h1>

            <p style={{ fontSize: 18, color: "var(--fg-secondary)", lineHeight: 1.55, marginBottom: 32, maxWidth: 540 }}>
              No es un curso genérico de internet. Son los exámenes oficiales tomados entre 2005 y 2025 en Medicina, Económicas y Tecnología, con la opción trampa <strong style={{ color: "var(--fg-primary)" }}>«Ninguno»</strong> y el tiempo exacto que te da la facultad.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 32px",
                  background: "var(--accent)",
                  color: "var(--accent-fg)",
                  textDecoration: "none",
                  borderRadius: 14,
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: "var(--shadow-md)",
                }}
              >
                Probar simulacro gratis <Icono nombre="flecha" tamano={18} />
              </Link>
              <a
                href="#facultades"
                style={{
                  padding: "16px 28px",
                  background: "var(--bg-card)",
                  color: "var(--fg-primary)",
                  textDecoration: "none",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  border: "1.5px solid var(--border)",
                }}
              >
                Ver los {totalExamenes} exámenes
              </a>
            </div>

            {/* Hechos de credibilidad verificables */}
            <div style={{ display: "flex", gap: 28, marginTop: 42, paddingTop: 28, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1 }}>{totalExamenes}</div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>Exámenes oficiales</div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>2005–2025</div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>Historial completo</div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>Gratis el primer examen</div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: El producto funcionando en vivo (Working Form) */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "2px solid var(--border)",
                borderRadius: 24,
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              {/* Barra superior de pestañas por carrera */}
              <div style={{ display: "flex", background: "var(--bg-subtle)", borderBottom: "1.5px solid var(--border)", padding: "8px 12px", gap: 8 }}>
                {[
                  { id: "medicina" as const, label: "Medicina" },
                  { id: "economicas" as const, label: "Económicas" },
                  { id: "tecnologia" as const, label: "Ingeniería" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setCarreraSel(tab.id);
                      setOpcionSeleccionada(null);
                    }}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: carreraSel === tab.id ? "var(--bg-card)" : "transparent",
                      color: carreraSel === tab.id ? "var(--fg-primary)" : "var(--fg-muted)",
                      fontWeight: carreraSel === tab.id ? 700 : 500,
                      fontSize: 13,
                      cursor: "pointer",
                      boxShadow: carreraSel === tab.id ? "var(--shadow-sm)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Cabecera del examen */}
              <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "var(--accent)", textTransform: "uppercase" }}>
                    {preguntaActual.facultad}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>{preguntaActual.gestion}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--bg-subtle)", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}>
                  <span>⏱</span> {formatoTiempo(segundos)}
                </div>
              </div>

              {/* Cuerpo de la pregunta */}
              <div style={{ padding: "24px" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-primary)", marginBottom: 8 }}>
                  {preguntaActual.pregunta}
                </div>
                <div
                  className="font-crimson"
                  style={{
                    fontSize: 19,
                    fontStyle: "italic",
                    background: "var(--bg-subtle)",
                    borderLeft: "3.5px solid var(--accent)",
                    padding: "12px 16px",
                    borderRadius: "0 10px 10px 0",
                    marginBottom: 20,
                    lineHeight: 1.4,
                  }}
                >
                  {preguntaActual.cita}
                </div>

                {/* Opciones interactivas */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {preguntaActual.opciones.map((op) => {
                    const seleccionada = opcionSeleccionada === op.id;
                    let borde = "var(--border)";
                    let fondo = "var(--bg-card)";
                    let textoColor = "var(--fg-primary)";

                    if (opcionSeleccionada) {
                      if (op.correcta) {
                        borde = "var(--green-border)";
                        fondo = "var(--green-bg)";
                        textoColor = "var(--green)";
                      } else if (seleccionada) {
                        borde = "var(--error)";
                        fondo = "var(--error-light)";
                        textoColor = "var(--error)";
                      }
                    }

                    return (
                      <button
                        key={op.id}
                        onClick={() => setOpcionSeleccionada(op.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: `1.5px solid ${borde}`,
                          background: fondo,
                          color: textoColor,
                          fontSize: 14,
                          fontWeight: seleccionada ? 700 : 500,
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: `1.5px solid ${borde}`,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {op.id}
                        </span>
                        <span>{op.texto}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback inmediato al seleccionar */}
                {opcionSeleccionada && (
                  <div
                    style={{
                      marginTop: 20,
                      padding: 16,
                      borderRadius: 12,
                      background: preguntaActual.opciones.find((o) => o.id === opcionSeleccionada)?.correcta ? "var(--green-bg)" : "var(--error-light)",
                      border: `1.5px solid ${preguntaActual.opciones.find((o) => o.id === opcionSeleccionada)?.correcta ? "var(--green-border)" : "var(--error)"}`,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: preguntaActual.opciones.find((o) => o.id === opcionSeleccionada)?.correcta ? "var(--green)" : "var(--error)" }}>
                      {preguntaActual.opciones.find((o) => o.id === opcionSeleccionada)?.correcta ? "✓ ¡Respuesta Correcta!" : "✕ ¡Cuidado con la trampa!"}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--fg-secondary)" }}>
                      {preguntaActual.explicacion}
                    </div>
                  </div>
                )}
              </div>

              {/* Pie de la tarjeta interactiva */}
              <div style={{ padding: "14px 24px", background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                  {opcionSeleccionada ? "Así de claro te explica AXIOM cada pregunta." : "Haz clic en una opción para probar el simulador."}
                </span>
                <Link href="/login" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}>
                  Ver examen completo →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ SECCIÓN FACULTADES (UMSS) ═══ */}
      <section id="facultades" style={{ padding: "70px 24px", background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
              Contenido oficial por carrera
            </div>
            <h2 className="font-crimson" style={{ fontSize: 42, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Elige tu facultad en la San Simón
            </h2>
            <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 620, margin: "0 auto" }}>
              Cada facultad tiene su propio formato, tiempos y temarios específicos.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {facultades.map((f) => {
              const lista = f.examenes > 0;
              const bannerImg = BANNERS_FACULTADES[f.id];
              const cuerpo = (
                <>
                  {bannerImg && (
                    <div
                      style={{
                        margin: "-24px -24px 18px -24px",
                        height: 120,
                        overflow: "hidden",
                        borderRadius: "16px 16px 0 0",
                        borderBottom: "1.5px solid var(--border)",
                        background: "var(--bg-subtle)",
                        position: "relative",
                      }}
                    >
                      <img
                        src={bannerImg}
                        alt={f.nombre_corto}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ color: lista ? "var(--accent)" : "var(--fg-muted)", display: "inline-flex" }}>
                      <Icono nombre={iconoFacultad(f.id)} tamano={34} grosor={1.6} />
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: lista ? "var(--accent-soft)" : "var(--bg-subtle)",
                        color: lista ? "var(--accent)" : "var(--fg-muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {lista ? `${f.examenes} exámenes` : "En digitalización"}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 21, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>
                    {f.nombre_corto}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5, marginBottom: 16, minHeight: 56 }}>
                    {f.descripcion}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {f.areas.map((a) => (
                      <span key={a} style={{ fontSize: 10, padding: "3px 8px", background: "var(--bg-base)", color: "var(--fg-secondary)", borderRadius: 6, fontWeight: 700, border: "1px solid var(--border)" }}>
                        {a}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: lista ? "var(--accent)" : "var(--fg-muted)" }}>
                    {lista ? <>Entrar al banco <Icono nombre="flecha" tamano={15} /></> : <>Próximamente disponible</>}
                  </div>
                </>
              );

              const estilo: React.CSSProperties = {
                background: "var(--bg-card)",
                borderRadius: 18,
                padding: 24,
                textDecoration: "none",
                border: "1.5px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                display: "block",
                transition: "transform 0.15s, box-shadow 0.15s",
              };

              return lista ? (
                <Link key={f.id} href={`/login?facultad=${f.id}`} style={estilo}>
                  {cuerpo}
                </Link>
              ) : (
                <div key={f.id} style={{ ...estilo, opacity: 0.8 }}>
                  {cuerpo}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ POR QUÉ AXIOM NO ES OTRA FOTOCOPIA MÁS (Corey Haines + Humanizer) ═══ */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Diferencia con las academias tradicionales
          </div>
          <h2 className="font-crimson" style={{ fontSize: 40, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 14 }}>
            ¿Por qué no basta con fotocopias de la calle Jordan?
          </h2>
          <p style={{ fontSize: 16, color: "var(--fg-muted)", maxWidth: 640, margin: "0 auto" }}>
            El examen de la UMSS no se pierde por falta de estudio, sino por falta de velocidad y caer en preguntas trampa.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            {
              t: "Facsímiles oficiales verificados",
              d: "Sin respuestas dudosas escritas a bolígrafo. Cada examen fue transcrito y contrastado con los patrones originales firmados por los coordinadores de la UMSS.",
            },
            {
              t: "Resolución «como a lápiz»",
              d: "No saltamos operaciones. Cada ejercicio te muestra la fórmula, el reemplazo término por término y la simplificación final paso a paso.",
            },
            {
              t: "Cronómetro y presión de tiempo",
              d: "Tienes exactamente 90 segundos por pregunta, igual que en el aula magna. Entrenas la mente para responder rápido sin dudar.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1.5px solid var(--border)",
                borderRadius: 20,
                padding: "32px 28px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, marginBottom: 18 }}>
                0{i + 1}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 10 }}>
                {item.t}
              </h3>
              <p style={{ fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.6 }}>
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      
      {/* ═══ PREGUNTAS FRECUENTES (SEO FAQPage Schema + Objeciones CEO) ═══ */}
      <section style={{ padding: "60px 24px 80px", maxWidth: 880, margin: "0 auto" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS_LANDING.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            }),
          }}
        />
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Dudas resueltas
          </div>
          <h2 className="font-crimson" style={{ fontSize: 38, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>
            Preguntas Frecuentes sobre la Admisión UMSS
          </h2>
          <p style={{ fontSize: 15, color: "var(--fg-muted)" }}>
            Todo lo que necesitas saber sobre el banco oficial, la plataforma y el simulador.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS_LANDING.map((faq, idx) => {
            const estaAbierta = faqAbierta === idx;
            return (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "all 0.15s ease",
                }}
              >
                <button
                  onClick={() => setFaqAbierta(estaAbierta ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--fg-primary)",
                  }}
                >
                  <span style={{ paddingRight: 16 }}>{faq.q}</span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      color: "var(--accent)",
                      transform: estaAbierta ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    +
                  </span>
                </button>
                {estaAbierta && (
                  <div
                    style={{
                      padding: "0 22px 20px",
                      fontSize: 14.5,
                      color: "var(--fg-secondary)",
                      lineHeight: 1.6,
                      borderTop: "1px dashed var(--border)",
                      paddingTop: 14,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA FINAL (Riesgo cero · Transparencia total) ═══ */}
      <section style={{ padding: "70px 24px", background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-crimson" style={{ fontSize: 44, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 16 }}>
            Empieza a practicar hoy. Es gratis.
          </h2>
          <p style={{ fontSize: 17, color: "var(--fg-muted)", marginBottom: 32, lineHeight: 1.5 }}>
            Da tu primer examen diagnóstico en 15 minutos y detecta en qué temas estás fallando antes del día del examen oficial.
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              background: "var(--accent)",
              color: "var(--accent-fg)",
              textDecoration: "none",
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 700,
              boxShadow: "var(--shadow-md)",
            }}
          >
            Crear cuenta y dar simulacro gratis <Icono nombre="flecha" tamano={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px 24px", textAlign: "center", color: "var(--fg-muted)", fontSize: 13, borderTop: "1px solid var(--border)" }}>
        © 2026 AXIOM · Simulador de exámenes UMSS · Hecho en Cochabamba, Bolivia
        <div style={{ marginTop: 10, display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/terminos" style={{ color: "var(--fg-muted)", textDecoration: "underline" }}>Términos y Condiciones</Link>
          <Link href="/privacidad" style={{ color: "var(--fg-muted)", textDecoration: "underline" }}>Política de Privacidad</Link>
        </div>
      </footer>
    </div>
  );
}

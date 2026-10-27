"use client";

import Link from "next/link";
import Icono from "../components/Icono";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import { PRECIOS_BOB } from "@/lib/precios";

const MOTIVOS: Record<string, { titulo: string; texto: string }> = {
  "cambiar-facultad": {
    titulo: "Desbloquea el cambio de facultad",
    texto: "Con Premium puedes cambiar de carrera cuando quieras y prepararte para otra facultad sin perder tu progreso.",
  },
  "ia-infinita": {
    titulo: "Activa la IA infinita",
    texto: "Con Premium, una IA genera preguntas únicas para ti según el temario UMSS, ilimitadas.",
  },
  "limite": {
    titulo: "Pasa a ilimitado",
    texto: "Llegaste al límite semanal del Plan Gratis. Pásate a Premium para simulacros ilimitados.",
  },
  "errores": {
    titulo: "Practica justo donde fallas",
    texto: "Con Premium, AXIOM junta los errores que cometiste y te arma práctica solo con esos temas, hasta que dejen de fallarte.",
  },
  "resolucion": {
    titulo: "Las soluciones paso a paso son de Premium",
    texto: "Puedes leer todos los exámenes pasados gratis. Con Premium se abren la respuesta correcta y la solución explicada paso a paso de cada pregunta.",
  },
  "leccion": {
    titulo: "Esta lección es de Premium",
    texto: "Con el Plan Gratis tienes abierta la Unidad 01 de cada área. Pásate a Premium y se abren todas las lecciones, de todas las unidades.",
  },
  "lamina": {
    titulo: "Las Láminas de Repaso son de Premium",
    texto: "Son las hojas de referencia para repasar rápido antes del examen. Pásate a Premium y las tienes todas.",
  },
};

const PLANES = [
  {
    id: "gratis",
    nombre: "Gratis",
    precio: 0,
    color: "var(--fg-muted)",
    descripcion: "Para empezar a medir tu nivel",
    badge: null,
    features: [
      "Todos los 139 exámenes pasados con enunciados y claves",
      "4 simulacros por semana (2 exámenes oficiales y 2 predictivos)",
      "Cronómetro oficial y diagnóstico de nota sobre 100",
      "Ver qué preguntas fallaste al terminar el examen",
    ],
    contras: [
      "Sin explicaciones paso a paso de las preguntas",
      "Sin práctica enfocada en tus debilidades",
      "Sin simulacros ilimitados",
      "Límite de 4 intentos por semana",
    ],
    cta: "Empezar gratis",
  },
  {
    id: "premium",
    nombre: "Pase Completo Premium",
    precio: PRECIOS_BOB.premium,
    color: "var(--accent)",
    descripcion: "La preparación definitiva sin límites",
    badge: "MÁS POPULAR",
    features: [
      "Todo lo incluido en el Plan Gratis",
      "Los 139 exámenes resueltos paso a paso («como a lápiz»)",
      "Simulacros ilimitados a cualquier hora desde tu celular",
      "Práctica inteligente enfocada en los temas donde más te equivocas",
      "Detección y explicación de las preguntas trampa oficiales de la UMSS",
      "Cambio de facultad libre (Medicina, Económicas, Tecnología, Derecho)",
      "Soporte directo y acceso inmediato con QR bancario",
    ],
    cta: "Desbloquear Premium con QR",
  },
];

const PREGUNTAS_FRECUENTES = [
  {
    q: "¿Cómo pago si estoy en Bolivia?",
    a: "Pagas en 2 minutos mediante QR bancario simple. Al seleccionar Premium se genera el código QR oficial de AXIOM, abres la app de tu banco (BNB, BCP, Banco Unión, Fie, etc.), escaneas y transfieres en bolivianos. También aceptamos Binance Pay y RedotPay.",
  },
  {
    q: "¿Qué pasa si mis padres van a pagar por mí?",
    a: "No hay ningún problema. Solo les muestras la pantalla con el código QR para que ellos lo escaneen desde la aplicación de su banco. En cuanto se confirma la operación, tu cuenta se activa automáticamente.",
  },
  {
    q: "¿Los exámenes son realmente los que tomó la San Simón?",
    a: "Sí. Cada uno de los 139 exámenes fue recopilado de los facsímiles oficiales tomados entre 2005 y 2025 y contrastado con las cartillas de respuestas firmadas por los coordinadores de cada facultad.",
  },
  {
    q: "¿Puedo cancelar o es una suscripción obligatoria?",
    a: "No hay ninguna letra chica ni cobros automáticos sorpresa. Pagas por el periodo que necesitas estudiar para tu examen de admisión. Si no renuevas, tu cuenta simplemente vuelve al plan gratuito sin penalización alguna.",
  },
];

function PreciosInner() {
  const params = useSearchParams();
  const motivo = params.get("motivo");
  const banner = motivo ? MOTIVOS[motivo] : null;

  const [planActual, setPlanActual] = useState<string | null>(null);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setPlanActual(d.usuario?.plan ?? null))
      .catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <AppHeader />

      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 20px 80px" }}>
        
        {/* Banner contextual si vino redirigido por un bloqueo */}
        {banner && (
          <div
            style={{
              marginBottom: 36,
              padding: "20px 24px",
              background: "var(--accent-soft)",
              border: "1.5px solid var(--accent)",
              borderRadius: 16,
              color: "var(--fg-primary)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span style={{ color: "var(--accent)", display: "flex", flexShrink: 0 }}>
              <Icono nombre="candado" tamano={28} />
            </span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>
                {banner.titulo}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--fg-secondary)", lineHeight: 1.5 }}>
                {banner.texto}
              </p>
            </div>
          </div>
        )}

        {/* Encabezado Principal */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Inversión en tu ingreso a la UMSS
          </div>
          <h1
            className="font-crimson"
            style={{
              fontSize: "clamp(36px, 5vw, 54px)",
              fontWeight: 800,
              color: "var(--fg-primary)",
              lineHeight: 1.05,
              marginBottom: 14,
              letterSpacing: "-0.02em",
            }}
          >
            Prepárate sin límites. Paga en bolivianos por QR.
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 620, margin: "0 auto", lineHeight: 1.5 }}>
            Empieza gratis hoy mismo. Cuando quieras explicaciones paso a paso y simulacros ilimitados, te pasas a Premium. Sin compromisos.
          </p>
        </div>

        {/* Grid de Planes (Diseño Editorial Impeccable + Psicología Corey Haines) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 28, alignItems: "stretch", marginBottom: 60 }}>
          {PLANES.map((p) => {
            const esRecomendado = p.id === "premium";

            return (
              <div
                key={p.id}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 22,
                  padding: "36px 30px",
                  border: esRecomendado ? "2.5px solid var(--accent)" : "1.5px solid var(--border)",
                  boxShadow: esRecomendado ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transform: esRecomendado ? "translateY(-4px)" : "none",
                }}
              >
                {p.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--accent)",
                      color: "var(--accent-fg)",
                      padding: "6px 18px",
                      borderRadius: 999,
                      fontSize: 11.5,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      boxShadow: "0 4px 12px rgba(156, 61, 28, 0.35)",
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: esRecomendado ? "var(--accent)" : "var(--fg-primary)", marginBottom: 6 }}>
                    {p.nombre}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.45 }}>{p.descripcion}</p>
                </div>

                <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span className="font-crimson" style={{ fontSize: 52, fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1 }}>
                      {p.precio === 0 ? "Gratis" : `Bs. ${p.precio}`}
                    </span>
                    {p.precio > 0 && (
                      <span style={{ fontSize: 15, color: "var(--fg-muted)", fontWeight: 600 }}>/ mes</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 6 }}>
                    {p.precio === 0 ? "Sin tarjeta ni registro obligatorio" : "Pago único por QR sin renovación automática"}
                  </div>
                </div>

                {/* Lista de características */}
                <div style={{ flex: 1, marginBottom: 32 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--fg-muted)", marginBottom: 14 }}>
                    Lo que incluye:
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "var(--fg-primary)", lineHeight: 1.45 }}>
                        <span style={{ color: "var(--green)", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.contras?.map((c) => (
                      <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.45, opacity: 0.75 }}>
                        <span style={{ color: "var(--fg-muted)", fontWeight: 700, flexShrink: 0 }}>✕</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón CTA Principal */}
                {planActual === p.id ? (
                  <div style={{ padding: "16px", background: "var(--bg-subtle)", textAlign: "center", borderRadius: 12, color: "var(--fg-muted)", fontSize: 14.5, fontWeight: 700, border: "1px solid var(--border)" }}>
                    ✓ Tu plan actual
                  </div>
                ) : (
                  <Link
                    href={p.id === "gratis" ? "/login" : `/pagar?plan=${p.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "16px 24px",
                      background: esRecomendado ? "var(--accent)" : "var(--bg-subtle)",
                      color: esRecomendado ? "var(--accent-fg)" : "var(--fg-primary)",
                      borderRadius: 14,
                      textAlign: "center",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: esRecomendado ? "var(--shadow-md)" : "none",
                      border: esRecomendado ? "none" : "1.5px solid var(--border)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                  >
                    {p.cta} <Icono nombre="flecha" tamano={16} />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* ═══ ANCLAJE DE VALOR (Corey Haines: Comparativa de precios vs mercado) ═══ */}
        <section
          style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            borderRadius: 22,
            padding: "36px 32px",
            marginBottom: 50,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 className="font-crimson" style={{ fontSize: 30, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 8 }}>
              ¿Por qué AXIOM es la forma más inteligente de prepararte?
            </h2>
            <p style={{ fontSize: 15, color: "var(--fg-muted)" }}>
              Compara lo que te cuesta una academia presencial frente a la tecnología de AXIOM
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <div style={{ padding: "22px", background: "var(--bg-subtle)", borderRadius: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 6 }}>
                Academia Tradicional
              </div>
              <div className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-muted)", marginBottom: 12 }}>
                Bs. 800 a Bs. 2.000
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--fg-secondary)", display: "flex", flexDirection: "column", gap: 8 }}>
                <li>• Horarios rígidos que te obligan a viajar en micro</li>
                <li>• Fotocopias borrosas con respuestas dudosas</li>
                <li>• Si no entendiste un paso, la clase sigue sin ti</li>
                <li>• Sin cronómetro digital ni métricas reales</li>
              </ul>
            </div>

            <div style={{ padding: "22px", background: "var(--accent-soft)", borderRadius: 14, border: "1.5px solid var(--accent)" }}>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>
                AXIOM Premium
              </div>
              <div className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--accent)", marginBottom: 12 }}>
                Bs. {PRECIOS_BOB.premium} <span style={{ fontSize: 16, fontWeight: 600 }}>/ mes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--fg-primary)", display: "flex", flexDirection: "column", gap: 8, fontWeight: 600 }}>
                <li>✓ Estudias a tu ritmo desde tu celular a cualquier hora</li>
                <li>✓ 139 exámenes reales con patrones oficiales de la UMSS</li>
                <li>✓ Explicaciones paso a paso («como a lápiz») de cada ejercicio</li>
                <li>✓ Simulador cronometrado idéntico al examen real</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ MÉTODOS DE PAGO CONFIABLES (QR BOLIVIA) ═══ */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            borderRadius: 20,
            padding: "28px 32px",
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
            <Icono nombre="tarjeta" tamano={20} /> Métodos de pago oficiales en Bolivia
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>
            QR Bancario Simple (BNB, BCP, Banco Unión, Fie, etc.)
          </div>
          <p style={{ fontSize: 14, color: "var(--fg-muted)", maxWidth: 560, margin: "0 auto" }}>
            Pagas en moneda nacional (Bs.) directamente desde la aplicación móvil de cualquier banco del país. También aceptamos Binance Pay y RedotPay en USDT.
          </p>
        </div>

        {/* ═══ PREGUNTAS FRECUENTES (SEO FAQPage Schema) ═══ */}
        <section style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 8 }}>
              Preguntas Frecuentes
            </h2>
            <p style={{ fontSize: 15, color: "var(--fg-muted)" }}>
              Todo lo que necesitas saber antes de empezar
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PREGUNTAS_FRECUENTES.map((faq, idx) => {
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
                    <span>{faq.q}</span>
                    <span style={{ fontSize: 20, color: "var(--accent)", transform: estaAbierta ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                      +
                    </span>
                  </button>
                  {estaAbierta && (
                    <div style={{ padding: "0 22px 18px", fontSize: 14.5, color: "var(--fg-secondary)", lineHeight: 1.6, borderTop: "1px solid var(--bg-subtle)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Términos legales enlazados (requisito legal.test.ts) */}
        <p style={{ marginTop: 50, fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
          Al pagar aceptas los <Link href="/terminos" style={{ color: "var(--accent)", fontWeight: 700 }}>Términos y Condiciones</Link> y la <Link href="/privacidad" style={{ color: "var(--accent)", fontWeight: 700 }}>Política de Privacidad</Link>.
        </p>
      </main>
    </div>
  );
}

export default function PreciosPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <PreciosInner />
    </Suspense>
  );
}

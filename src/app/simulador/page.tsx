"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icono from "../components/Icono";
import BackLink from "../components/BackLink";

type Modo = "ia_generado" | "examen_real";
type Dificultad = "facil" | "medio" | "dificil";

export default function SimuladorCreatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modo, setModo] = useState<Modo>("ia_generado");
  const [cantidad, setCantidad] = useState<number>(20);
  const [dificultad, setDificultad] = useState<Dificultad>("medio");
  const [facultad, setFacultad] = useState<string>("economicas");
  const [nombreFacultad, setNombreFacultad] = useState<string>("Ciencias Económicas");
  const [aniosDisponibles, setAniosDisponibles] = useState<number[]>([2023]);
  const [anioSeleccionado, setAnioSeleccionado] = useState<number>(2023);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((me) => {
        const facId = me.usuario?.facultad_objetivo || "economicas";
        setFacultad(facId);

        fetch("/api/facultades")
          .then((r) => r.json())
          .then((fd) => {
            const fac = (fd.facultades ?? []).find((f: { id: string; nombre: string }) => f.id === facId);
            if (fac) setNombreFacultad(fac.nombre);
          })
          .catch(() => {});

        fetch("/api/axiom/examenes")
          .then((r) => r.json())
          .then((ed) => {
            const propios = (ed.examenes ?? []).filter((e: { facultad: string }) => e.facultad === facId);
            const anios = Array.from(
              new Set<number>(propios.map((e: { anio: number }) => Number(e.anio)).filter(Boolean))
            ).sort((a, b) => b - a);

            if (anios.length > 0) {
              setAniosDisponibles(anios);
              setAnioSeleccionado(anios[0]);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const handleCrear = async () => {
    setLoading(true);
    setError(null);

    const config =
      modo === "ia_generado"
        ? {
            modo: "ia_generado" as const,
            universidad: "UMSS",
            facultad,
            cantidad_preguntas: cantidad,
            dificultad,
          }
        : {
            modo: "examen_real" as const,
            universidad: "UMSS",
            facultad,
            anio: anioSeleccionado,
          };

    try {
      const res = await fetch("/api/axiom/simulador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Error creando simulador");
        setLoading(false);
        return;
      }
      window.location.href = `/simulador/${data.simulador.id}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de red");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "44px 20px 100px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            className="font-crimson"
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "var(--fg-primary)",
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Nuevo simulacro
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
            Examen de admisión · <strong>UMSS {nombreFacultad}</strong>
          </p>
        </div>

        {/* Selector de modo */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              color: "var(--fg-muted)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            ¿Cómo quieres practicar?
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <button
              type="button"
              onClick={() => setModo("ia_generado")}
              style={{
                textAlign: "left",
                padding: "18px 20px",
                borderRadius: 14,
                border:
                  modo === "ia_generado"
                    ? "2px solid var(--accent)"
                    : "1.5px solid var(--border)",
                background:
                  modo === "ia_generado"
                    ? "var(--accent-soft)"
                    : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <Icono nombre="chispa" tamano={21} />
                <strong style={{ fontSize: 16, color: "var(--fg-primary)" }}>
                  Examen generado por IA (recomendado)
                </strong>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    padding: "3px 8px",
                    background: "rgba(34,197,94,0.15)",
                    color: "#15803d",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  NUEVO
                </span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--fg-muted)", lineHeight: 1.5 }}>
                Preguntas frescas creadas sobre el temario oficial de la UMSS. Cada examen es único,
                adaptado a la distribución real de tu facultad.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setModo("examen_real")}
              style={{
                textAlign: "left",
                padding: "18px 20px",
                borderRadius: 14,
                border:
                  modo === "examen_real"
                    ? "2px solid var(--accent)"
                    : "1.5px solid var(--border)",
                background:
                  modo === "examen_real"
                    ? "var(--accent-soft)"
                    : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <Icono nombre="documento" tamano={21} />
                <strong style={{ fontSize: 16, color: "var(--fg-primary)" }}>
                  Examen oficial de admisión UMSS
                </strong>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--fg-muted)", lineHeight: 1.5 }}>
                Prueba oficial tomada por la facultad, con las preguntas exactas y tiempo oficial.
                Ideal para medir tu nivel real hoy.
              </p>
            </button>
          </div>
        </div>

        {/* Configuración IA */}
        {modo === "ia_generado" && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1.5px solid var(--border)",
              borderRadius: 14,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                    marginBottom: 8,
                  }}
                >
                  ¿Cuántas preguntas?
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[10, 20, 30, 50].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCantidad(n)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        border:
                          cantidad === n
                            ? "1.5px solid var(--accent)"
                            : "1px solid var(--border)",
                        background:
                          cantidad === n ? "var(--accent)" : "transparent",
                        color: cantidad === n ? "white" : "var(--fg-primary)",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 6 }}>
                  Tiempo estimado: {Math.max(15, cantidad * 2)} minutos
                </p>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                    marginBottom: 8,
                  }}
                >
                  Dificultad
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(["facil", "medio", "dificil"] as Dificultad[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDificultad(d)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        border:
                          dificultad === d
                            ? "1.5px solid var(--accent)"
                            : "1px solid var(--border)",
                        background:
                          dificultad === d ? "var(--accent)" : "transparent",
                        color: dificultad === d ? "white" : "var(--fg-primary)",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                    >
                      {d === "facil" ? "Fácil" : d === "medio" ? "Medio" : "Difícil"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuración Examen Real */}
        {modo === "examen_real" && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1.5px solid var(--border)",
              borderRadius: 14,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--fg-primary)",
                marginBottom: 10,
              }}
            >
              Selecciona la convocatoria oficial:
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {aniosDisponibles.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAnioSeleccionado(a)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border:
                      anioSeleccionado === a
                        ? "1.5px solid var(--accent)"
                        : "1px solid var(--border)",
                    background:
                      anioSeleccionado === a ? "var(--accent)" : "transparent",
                    color: anioSeleccionado === a ? "white" : "var(--fg-primary)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Gestión {a}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 10 }}>
              Examen oficial recopilado y contrastado con los patrones originales de la UMSS.
            </p>
          </div>
        )}

        {/* Aviso de error o puente de conversión (CRO) */}
        {error && (
          <div
            role="alert"
            style={{
              background: "var(--accent-soft)",
              border: "1.5px solid var(--accent)",
              borderRadius: 14,
              padding: "16px 20px",
              color: "var(--fg-primary)",
              fontSize: 14,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icono nombre="alerta" tamano={18} />
              <span style={{ fontWeight: 600 }}>{error}</span>
            </div>
            {(error.includes("Premium") || error.includes("plan") || error.includes("límite")) && (
              <Link
                href="/precios"
                style={{
                  padding: "8px 18px",
                  background: "var(--accent)",
                  color: "white",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Ver planes desde Bs 49 →
              </Link>
            )}
          </div>
        )}

        <button
          onClick={handleCrear}
          disabled={loading}
          type="button"
          className="btn-primary"
          style={{
            width: "100%",
            padding: "16px",
            fontSize: 16,
            background: loading
              ? "var(--bg-subtle)"
              : "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: 12,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
            boxShadow: loading
              ? "none"
              : "var(--shadow-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              {modo === "ia_generado"
                ? "La IA está creando tu examen..."
                : "Preparando examen..."}
            </>
          ) : modo === "ia_generado" ? (
            "Generar mi examen ahora"
          ) : (
            `Comenzar examen oficial ${anioSeleccionado}`
          )}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--fg-muted)",
            marginTop: 12,
          }}
        >
          {modo === "ia_generado"
            ? "Generar puede tomar 20-40 segundos. La IA escribe preguntas únicas para ti."
            : "Empezarás de inmediato con el cronómetro oficial corriendo."}
        </p>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <BackLink href="/" label="Volver al inicio" />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

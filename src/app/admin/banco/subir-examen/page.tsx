"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";
import BackLink from "../../../components/BackLink";

interface Resumen {
  id: string;
  titulo: string;
  anio: number;
  opcion: string | null;
  total_preguntas: number;
  por_area: Record<string, number>;
  preguntas_con_figura: string[];
  avisos: string[];
}

interface RespuestaValidar {
  ok?: boolean;
  error?: string;
  error_parseo?: string;
  resumen?: Resumen;
  puede_guardar?: boolean;
  guardado?: boolean;
  ya_existe?: boolean;
  archivo?: string;
  error_guardado?: string;
}

export default function SubirExamenPage() {
  const router = useRouter();
  const [contenido, setContenido] = useState("");
  const [resultado, setResultado] = useState<RespuestaValidar | null>(null);
  const [trabajando, setTrabajando] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) router.push("/login");
    });
  }, [router]);

  const llamar = async (guardar: boolean, sobrescribir = false) => {
    setTrabajando(true);
    try {
      const r = await fetch("/api/admin/examenes/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido, guardar, sobrescribir }),
      });
      setResultado(await r.json());
    } catch (e) {
      setResultado({ error: e instanceof Error ? e.message : "Error de red" });
    } finally {
      setTrabajando(false);
    }
  };

  const res = resultado;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <BackLink href="/admin/banco" label="Volver al banco" />
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>📥 Subir examen resuelto</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 20, lineHeight: 1.6 }}>
          Pega acá lo que te devolvió la IA con el <Link href="/admin/banco/plantillas" style={{ color: "var(--accent)", fontWeight: 700 }}>megaprompt</Link>.
          Se valida con el mismo parser del banco: si tiene errores de formato los ves al instante, y si está bien lo guardas y aparece en Resueltos.
        </p>

        <textarea
          value={contenido}
          onChange={(e) => { setContenido(e.target.value); setResultado(null); }}
          placeholder={"Pega acá el Markdown completo del examen (empieza con ---\\nuniversidad: UMSS\\n...)"}
          style={{
            width: "100%", minHeight: 260, padding: 14,
            background: "var(--bg-card)", color: "var(--fg-primary)",
            border: "1px solid var(--border)", borderRadius: 12,
            fontFamily: "ui-monospace, monospace", fontSize: 12, lineHeight: 1.5,
            resize: "vertical",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => llamar(false)}
            disabled={trabajando || contenido.trim().length === 0}
            style={{ padding: "10px 20px", background: "var(--fg-primary)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 800, opacity: trabajando || !contenido.trim() ? 0.5 : 1 }}
          >
            {trabajando ? "Validando…" : "🔎 Validar"}
          </button>
          {res?.ok && res.resumen && res.puede_guardar && !res.guardado && (
            <button
              onClick={() => llamar(true, res.ya_existe === true)}
              disabled={trabajando}
              style={{ padding: "10px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 800 }}
            >
              {res.ya_existe ? "⚠️ Ya existe — sobrescribir" : "💾 Guardar en el banco"}
            </button>
          )}
        </div>

        {/* Error de parseo */}
        {res && (res.error_parseo || res.error) && (
          <div style={{ marginTop: 16, padding: 16, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>❌ No se pudo procesar</div>
            <div style={{ fontSize: 13, color: "var(--fg-primary)", fontFamily: "ui-monospace, monospace" }}>{res.error_parseo ?? res.error}</div>
            <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>
              Vuelve a la IA, pegale este error y pedile que corrija el formato (sin cambiar el contenido).
            </div>
          </div>
        )}

        {/* Resumen OK */}
        {res?.ok && res.resumen && (
          <div style={{ marginTop: 16, padding: 18, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: "#059669", marginBottom: 10 }}>✅ Formato válido</div>
            <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.8 }}>
              <div><strong>{res.resumen.titulo}</strong> · {res.resumen.anio}{res.resumen.opcion ? ` · ${res.resumen.opcion}` : ""}</div>
              <div>{res.resumen.total_preguntas} preguntas · id: <code style={{ background: "var(--bg-subtle)", padding: "1px 6px", borderRadius: 4 }}>{res.resumen.id}</code></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0" }}>
                {Object.entries(res.resumen.por_area).map(([a, n]) => (
                  <span key={a} style={{ fontSize: 11, padding: "3px 10px", background: "rgba(99,102,241,0.10)", color: "var(--accent)", borderRadius: 999, fontWeight: 700 }}>
                    {a} · {n}
                  </span>
                ))}
              </div>
              {res.resumen.preguntas_con_figura.length > 0 && (
                <div style={{ fontSize: 13 }}>
                  🖼️ Preguntas con figura (las dibuja Claude con el motor): {res.resumen.preguntas_con_figura.join(" · ")}
                </div>
              )}
            </div>
            {res.resumen.avisos.length > 0 && (
              <div style={{ marginTop: 10, padding: 12, background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 10 }}>
                <div style={{ fontWeight: 800, color: "#d97706", fontSize: 13, marginBottom: 4 }}>⚠️ Avisos (revisar antes de guardar)</div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.6 }}>
                  {res.resumen.avisos.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}
            {res.guardado && res.archivo && (
              <div style={{ marginTop: 12, padding: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.35)", borderRadius: 10, fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.7 }}>
                💾 Guardado en <code style={{ background: "var(--bg-subtle)", padding: "1px 6px", borderRadius: 4 }}>{res.archivo}</code>.
                Ya aparece en <Link href="/resueltos" style={{ color: "var(--accent)", fontWeight: 700 }}>Resueltos</Link> (esperá ~1 min o reiniciá el servidor).
                <br />Siguiente paso: doble clic en <strong>SUBIR</strong> para mandarlo a GitHub, y avisale a Claude que lo revise, dibuje las figuras y lo integre.
              </div>
            )}
            {res.error_guardado && (
              <div style={{ marginTop: 12, fontSize: 13, color: "#d97706" }}>{res.error_guardado}</div>
            )}
            {res.ya_existe && !res.guardado && (
              <div style={{ marginTop: 12, fontSize: 13, color: "#d97706" }}>
                Ya existe un examen con ese id ({res.archivo}). Si quieres reemplazarlo, toca &ldquo;sobrescribir&rdquo;.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

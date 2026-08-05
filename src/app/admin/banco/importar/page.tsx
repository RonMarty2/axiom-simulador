"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";
import BackLink from "../../../components/BackLink";
import type { Facultad } from "@/lib/data-store";

type Formato = "csv" | "json" | "markdown" | "gift" | "aiken" | "texto";

const FORMATOS: { id: Formato; nombre: string; emoji: string; desc: string; ejemplo: string }[] = [
  { id: "csv", nombre: "CSV (Excel)", emoji: "📊", desc: "Exporta de Excel/Google Sheets. Columnas: enunciado, A, B, C, D, respuesta...", ejemplo: "Ideal para gente que ya tiene preguntas en Excel" },
  { id: "json", nombre: "JSON", emoji: "{ }", desc: "Formato programático. Pídeselo a ChatGPT/Claude.", ejemplo: "Mejor para que la IA te genere lotes grandes" },
  { id: "markdown", nombre: "Markdown (Axiom)", emoji: "📝", desc: "Formato propio de Axiom con frontmatter YAML. Soporta fórmulas KaTeX.", ejemplo: "El que usa el banco interno" },
  { id: "gift", nombre: "GIFT (Moodle)", emoji: "🎁", desc: "Si vienes de Moodle. Soporta opción múltiple, V/F, etc.", ejemplo: "::Título:: Pregunta {=correcta ~incorrecta}" },
  { id: "aiken", nombre: "Aiken (Moodle simple)", emoji: "📋", desc: "Formato Moodle más simple. Una pregunta por bloque + ANSWER:", ejemplo: "Pregunta\\nA) ...\\nB) ...\\nANSWER: B" },
  { id: "texto", nombre: "Texto plano", emoji: "📄", desc: "Formato libre. Marca la correcta con * o (correcta).", ejemplo: "Para pegar texto sin formato" },
];

export default function ImportarPage() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [formato, setFormato] = useState<Formato>("csv");
  const [texto, setTexto] = useState("");
  const [defaults, setDefaults] = useState<{
    universidad: string;
    facultad: string;
    anio: number;
    dificultad: "facil" | "medio" | "dificil";
  }>({
    universidad: "UMSS",
    facultad: "economicas",
    anio: new Date().getFullYear(),
    dificultad: "medio",
  });
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ creadas: number; parseadas: number; errores: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      fetch("/api/facultades").then((r) => r.json()).then((f) => setFacultades(f.facultades ?? []));
    });
  }, [router]);

  const cargarPlantilla = async () => {
    const r = await fetch(`/api/admin/preguntas/plantilla?formato=${formato}`);
    const d = await r.json();
    setTexto(d.contenido);
  };

  const enviar = async () => {
    setEnviando(true);
    setError(null);
    setResultado(null);
    try {
      const r = await fetch("/api/admin/preguntas/importar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formato, texto, defaults }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      setResultado(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setEnviando(false);
    }
  };

  const formatoActual = FORMATOS.find((f) => f.id === formato)!;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <BackLink href="/admin/banco" label="Volver al banco" />
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>📥 Importar preguntas en lote</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>Pega tu archivo o copia el texto. Soporta 6 formatos distintos.</p>

        {/* Selector de formato */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--fg-primary)" }}>1. Elige el formato de tu archivo</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {FORMATOS.map((f) => (
              <button key={f.id} onClick={() => setFormato(f.id)} style={{
                padding: 14, textAlign: "left", cursor: "pointer",
                border: formato === f.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: formato === f.id ? "rgba(99,102,241,0.06)" : "var(--bg-card)",
                borderRadius: 10,
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{f.emoji}</div>
                <div style={{ fontWeight: 700, color: "var(--fg-primary)", fontSize: 14 }}>{f.nombre}</div>
                <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 4 }}>{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Defaults */}
        <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--fg-primary)" }}>2. Datos por defecto (se aplican a preguntas que no los traigan)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <select value={defaults.facultad} onChange={(e) => setDefaults({ ...defaults, facultad: e.target.value })} style={inp()}>
              {facultades.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.nombre_corto}</option>)}
            </select>
            <input type="number" value={defaults.anio} onChange={(e) => setDefaults({ ...defaults, anio: parseInt(e.target.value, 10) || 2024 })} style={inp()} placeholder="Año" />
            <select value={defaults.dificultad} onChange={(e) => setDefaults({ ...defaults, dificultad: e.target.value as "facil" | "medio" | "dificil" })} style={inp()}>
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}>3. Pega tu contenido aquí</div>
            <button onClick={cargarPlantilla} style={{ padding: "4px 12px", background: "transparent", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
              📄 Cargar ejemplo {formatoActual.nombre}
            </button>
          </div>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={18}
            placeholder={`Pega aquí tu archivo ${formatoActual.nombre}... o pulsa "Cargar ejemplo"`}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid var(--border)", fontFamily: "ui-monospace, monospace", fontSize: 12.5, resize: "vertical", background: "var(--bg-subtle)", color: "var(--fg-primary)" }}
          />
        </div>

        {error && (
          <div style={{ padding: 14, background: "rgba(239,68,68,0.1)", color: "#b91c1c", borderRadius: 10, marginBottom: 14 }}>⚠️ {error}</div>
        )}

        {resultado && (
          <div style={{ padding: 16, background: resultado.creadas > 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 10, marginBottom: 14 }}>
            <div style={{ fontWeight: 800, color: resultado.creadas > 0 ? "#059669" : "#b91c1c", marginBottom: 6 }}>
              {resultado.creadas > 0 ? "✓ Importación exitosa" : "⚠️ Sin preguntas creadas"}
            </div>
            <div style={{ fontSize: 14 }}>
              Parseadas: <strong>{resultado.parseadas}</strong> · Creadas: <strong>{resultado.creadas}</strong>
              {resultado.errores.length > 0 && <span> · Errores: <strong>{resultado.errores.length}</strong></span>}
            </div>
            {resultado.creadas > 0 && (
              <Link href="/admin/banco" style={{ display: "inline-block", marginTop: 8, color: "var(--accent)", fontWeight: 700, fontSize: 13 }}>
                Ver banco actualizado →
              </Link>
            )}
          </div>
        )}

        <button
          onClick={enviar}
          disabled={enviando || !texto.trim()}
          style={{ width: "100%", padding: 14, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: enviando || !texto.trim() ? 0.5 : 1 }}
        >
          {enviando ? "Importando..." : `📥 Importar ${formatoActual.nombre}`}
        </button>

        {/* Tip */}
        <div style={{ marginTop: 24, padding: 16, background: "rgba(99,102,241,0.06)", borderRadius: 10, border: "1px solid rgba(99,102,241,0.2)" }}>
          <div style={{ fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>💡 Tip: usa ChatGPT/Claude para crear lotes grandes</div>
          <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5 }}>
            Ve a <Link href="/admin/banco/plantillas" style={{ color: "var(--accent)" }}>Plantillas para IA</Link>, descarga el formato que quieras, y pégaselo a ChatGPT con el prompt: <em>&ldquo;Genera 50 preguntas más con este mismo formato sobre [tu tema]&rdquo;</em>.
          </div>
        </div>
      </div>
    </div>
  );
}

function inp(): React.CSSProperties {
  return { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 13, background: "var(--bg-card)", color: "var(--fg-primary)" };
}

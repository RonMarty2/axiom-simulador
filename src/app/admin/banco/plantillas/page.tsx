"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";

type Formato = "csv" | "json" | "markdown" | "gift" | "aiken" | "texto";

const FORMATOS: { id: Formato; nombre: string; emoji: string; ext: string; ideal: string; prompt: string }[] = [
  {
    id: "csv",
    nombre: "CSV (Excel)",
    emoji: "📊",
    ext: "csv",
    ideal: "Si tienes Excel/Google Sheets",
    prompt: "Genérame 30 preguntas de selección múltiple sobre [TU TEMA] en formato CSV. Columnas: enunciado, A, B, C, D, respuesta (letra), area, tema, dificultad (facil/medio/dificil), explicacion. Sin texto adicional, solo el CSV.",
  },
  {
    id: "json",
    nombre: "JSON",
    emoji: "{ }",
    ext: "json",
    ideal: "Mejor formato para que IA te genere lotes grandes con fórmulas",
    prompt: `Genérame un array JSON con 30 preguntas sobre [TU TEMA]. Cada pregunta debe tener este formato exacto:
{
  "facultad": "ingenieria",
  "anio": 2025,
  "area": "matematicas",
  "tema": "derivadas",
  "dificultad": "medio",
  "tipo": "seleccion_simple",
  "enunciado": "Calcular la derivada de $f(x) = 3x^2$",
  "opciones": [{"letra":"A","texto":"$6x$"},{"letra":"B","texto":"$3x$"},{"letra":"C","texto":"$x^2$"},{"letra":"D","texto":"$6$"}],
  "respuesta_correcta": "A",
  "explicacion": "Por regla de potencia"
}
Usa $...$ para fórmulas en línea y $$...$$ para fórmulas en bloque. Responde SOLO el JSON, sin código markdown ni texto extra.`,
  },
  {
    id: "markdown",
    nombre: "Markdown Axiom",
    emoji: "📝",
    ext: "md",
    ideal: "El formato propio. Soporta KaTeX perfecto.",
    prompt: `Genérame un archivo Markdown con 30 preguntas sobre [TU TEMA] en formato Axiom. Empieza con frontmatter YAML (universidad, facultad, anio, duracion_minutos, total_preguntas, ponderacion). Cada pregunta así:

## Pregunta N
area: matematicas
tema: derivadas
dificultad: medio

Enunciado con $fórmulas$

- A) opción 1
- B) opción 2
- C) opción 3
- D) opción 4

**respuesta:** B
**explicacion:** explicación`,
  },
  {
    id: "gift",
    nombre: "GIFT (Moodle)",
    emoji: "🎁",
    ext: "txt",
    ideal: "Si tienes preguntas en Moodle",
    prompt: `Genérame 30 preguntas en formato GIFT de Moodle sobre [TU TEMA]. Ejemplo:

::Titulo:: Enunciado de la pregunta? {
  =opción correcta
  ~opción incorrecta 1
  ~opción incorrecta 2
  ~opción incorrecta 3
}

Para V/F usa {TRUE} o {FALSE}. Separa cada pregunta con una línea en blanco.`,
  },
  {
    id: "aiken",
    nombre: "Aiken (Moodle simple)",
    emoji: "📋",
    ext: "txt",
    ideal: "Formato Moodle más simple, sin sintaxis rara",
    prompt: `Genérame 30 preguntas en formato Aiken sobre [TU TEMA]. Una pregunta por bloque, así:

¿Pregunta?
A) opción uno
B) opción dos
C) opción tres
D) opción cuatro
ANSWER: B

Separa cada pregunta con línea en blanco.`,
  },
  {
    id: "texto",
    nombre: "Texto plano",
    emoji: "📄",
    ext: "txt",
    ideal: "Formato libre y flexible",
    prompt: `Genérame 30 preguntas en texto plano sobre [TU TEMA]. Una pregunta por bloque, así:

¿Pregunta?
A) opción uno
B) opción dos *
C) opción tres
D) opción cuatro

La opción correcta lleva un asterisco (*) al final. Separa cada pregunta con línea en blanco.`,
  },
];

export default function PlantillasPage() {
  const router = useRouter();
  const [copiado, setCopiado] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) router.push("/login");
    });
  }, [router]);

  const descargar = (formato: Formato) => {
    window.open(`/api/admin/preguntas/plantilla?formato=${formato}&descargar=1`, "_blank");
  };

  const copiarPrompt = async (formato: Formato) => {
    const f = FORMATOS.find((x) => x.id === formato)!;
    await navigator.clipboard.writeText(f.prompt);
    setCopiado(formato);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <Link href="/admin/banco" style={{ color: "var(--fg-muted)", fontSize: 14, textDecoration: "none" }}>← Volver al banco</Link>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>📄 Plantillas para crear bancos con IA</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>
          Descarga el ejemplo y/o copia el prompt para pedirle a ChatGPT, Claude o Gemini que te genere preguntas. Después las importas con un click.
        </p>

        <div style={{ display: "grid", gap: 14 }}>
          {FORMATOS.map((f) => (
            <div key={f.id} style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 28 }}>{f.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--fg-primary)" }}>{f.nombre}</div>
                  <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>{f.ideal}</div>
                </div>
                <button onClick={() => descargar(f.id)} style={{ padding: "8px 14px", background: "var(--accent)", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  ⬇ Descargar .{f.ext}
                </button>
              </div>

              <details style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 14 }}>
                <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--fg-primary)", fontSize: 14, marginBottom: 8 }}>
                  💬 Ver prompt listo para ChatGPT/Claude
                </summary>
                <pre style={{ marginTop: 10, padding: 12, background: "var(--bg-card)", borderRadius: 8, fontSize: 12, color: "var(--fg-primary)", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "ui-monospace, monospace", lineHeight: 1.5 }}>
                  {f.prompt}
                </pre>
                <button onClick={() => copiarPrompt(f.id)} style={{ marginTop: 8, padding: "8px 14px", background: "var(--fg-primary)", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  {copiado === f.id ? "✓ Copiado!" : "📋 Copiar prompt"}
                </button>
              </details>
            </div>
          ))}
        </div>

        {/* Como usar */}
        <div style={{ marginTop: 30, padding: 20, background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.06))", borderRadius: 14, border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12 }}>🎯 Cómo usar las plantillas</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 1.7, color: "var(--fg-primary)", fontSize: 14 }}>
            <li>Descarga la plantilla del formato que prefieras (CSV es lo más fácil, JSON es lo mejor para fórmulas).</li>
            <li>Abre ChatGPT / Claude / Gemini y pega el prompt de arriba (cambia <code style={{ background: "var(--bg-subtle)", padding: "1px 6px", borderRadius: 4 }}>[TU TEMA]</code> por lo que quieras: &ldquo;cálculo diferencial UMSS&rdquo;, &ldquo;anatomía humana&rdquo;, etc.).</li>
            <li>Copia la respuesta de la IA.</li>
            <li>Vuelve a <Link href="/admin/banco/importar" style={{ color: "var(--accent)", fontWeight: 700 }}>Importar</Link>, pega el texto y dale &ldquo;Importar&rdquo;.</li>
            <li>Las preguntas aparecen en tu banco listas para usar en simulacros.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

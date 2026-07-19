"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";

type Formato = "csv" | "json" | "markdown" | "gift" | "aiken" | "texto";

// Prompt estrella: pedirle a otra IA un examen oficial COMPLETO resuelto al
// detalle (paso a paso + figuras descritas), en el formato exacto del banco
// de examenes (data/examenes/). Es lo mismo que hacemos a mano al cargar un
// examen: transcribir fiel, resolver con pasos que enseñan, y describir cada
// figura para dibujarla despues con el motor de geometria.
const PROMPT_EXAMEN_RESUELTO = `Actuá como un profesor experto en exámenes de ingreso universitario (nivel preuniversitario boliviano, UMSS). Te voy a pasar un examen de ingreso en PDF o como fotos. Tu tarea es transcribirlo y resolverlo COMPLETO en el siguiente formato Markdown exacto — no cambies la estructura ni los nombres de los campos.

FORMATO (el archivo empieza con este frontmatter):

---
universidad: UMSS
facultad: ingenieria
anio: [año del examen, ej 2024]
opcion: [a qué convocatoria pertenece, ej "2da Opción"; si no lo indica, "1ra Opción"]
titulo: [ej "Examen de Ingreso 2-2024 (2da Opción)"]
fecha_examen: [AAAA-MM-DD si aparece en el PDF]
duracion_minutos: [normalmente 120]
total_preguntas: [cantidad total]
ponderacion:
  [area_1]: [peso decimal, ej 0.20]
  [area_2]: [peso decimal]
(una línea por cada área que separe el examen — mirá cómo lo divide REALMENTE el PDF: Aritmética-Álgebra y Geometría-Trigonometría suelen ser DOS áreas distintas)
---

Después, cada pregunta así (separadas por una línea con solo "---"):

## Pregunta N
area: [snake_case, ej: aritmetica_algebra, geometria_trigonometria, fisica, quimica, biologia — EXACTO igual a una clave de ponderacion]
tema: [corto y específico, ej: promedios-digitos, binomio-newton, angulos-paralelas]
dificultad: facil | medio | dificil
figura: [SOLO si depende de un dibujo: un id corto tipo "g1-triangulo"; si no hay figura, no pongas esta línea]

[Enunciado fiel al PDF. Fórmulas complejas (fracciones, ecuaciones, barras) en LaTeX entre $: $\\dfrac{3x^3}{y^2}$, $\\overline{ab}$. Exponentes simples (a², x³) pueden ir como texto.]

[SI hay figura, agregá antes de las opciones un párrafo:
FIGURA: descripción PRECISA en palabras de TODO lo que se ve — qué líneas hay, cuáles son paralelas, posición relativa de cada vértice (arriba/abajo/izquierda/derecha), qué ángulos están marcados y EN QUÉ vértice exacto, qué letras rotulan qué punto, si hay ángulo recto marcado y dónde, hacia dónde baja/sube cada plano. Sé exhaustivo: el dibujo se va a reconstruir desde tu descripción.]

- A) [opción]
- B) [opción]
- C) [opción]
- D) [opción]
- E) Ninguno

**respuesta:** [letra A-E]
**explicacion:** [primera oración: el planteo/idea general]
Paso 1 · [primer paso concreto, con las cuentas mostradas]
Paso 2 · [siguiente paso]
Paso 3 · [los que hagan falta]
Respuesta: [letra].

REGLAS:
1. NO inventes datos. Si algo no se lee bien en el PDF, escribí "VERIFICAR: [qué]" en la explicación en vez de adivinar.
2. VERIFICÁ tu respuesta: resolvé la pregunta y confirmá que el resultado coincide con la letra que marcás. Si no coincide con ninguna opción, marcá E) Ninguno y explicá por qué.
3. Los pasos deben ENSEÑAR: si hay un atajo o técnica que acorta el camino, mencionalo.
4. El area de cada pregunta debe existir EXACTO como clave en ponderacion.
5. Devolvé el archivo COMPLETO de una sola vez.`;

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

  const copiarPromptExamen = async () => {
    await navigator.clipboard.writeText(PROMPT_EXAMEN_RESUELTO);
    setCopiado("examen-resuelto");
    setTimeout(() => setCopiado(null), 2000);
  };

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

        {/* Plantilla estrella: examen oficial resuelto completo */}
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(168,85,247,0.10))", borderRadius: 14, padding: 20, border: "2px solid var(--accent)", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 28 }}>⭐</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--fg-primary)" }}>Examen oficial resuelto (formato AXIOM completo)</div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>
                Para pasarle a otra IA un PDF de examen pasado y que te devuelva TODO: transcripción fiel, solución paso a paso que enseña, fórmulas en LaTeX y figuras descritas al detalle. Es exactamente el formato de los exámenes de la sección Resueltos.
              </div>
            </div>
          </div>
          <details style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 14 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--fg-primary)", fontSize: 14 }}>
              💬 Ver prompt completo (adjuntá el PDF del examen al pegarlo)
            </summary>
            <pre style={{ marginTop: 10, padding: 12, background: "var(--bg-card)", borderRadius: 8, fontSize: 12, color: "var(--fg-primary)", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "ui-monospace, monospace", lineHeight: 1.5, maxHeight: 400, overflowY: "auto" }}>
              {PROMPT_EXAMEN_RESUELTO}
            </pre>
            <button onClick={copiarPromptExamen} style={{ marginTop: 8, padding: "8px 14px", background: "var(--accent)", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              {copiado === "examen-resuelto" ? "✓ Copiado!" : "📋 Copiar prompt"}
            </button>
          </details>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.6 }}>
            El resultado se guarda como archivo en <code style={{ background: "var(--bg-subtle)", padding: "1px 6px", borderRadius: 4 }}>data/examenes/umss/[facultad]/</code> (pasáselo a Claude para que lo revise, dibuje las figuras con el motor de geometría y lo integre).
          </div>
        </div>

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

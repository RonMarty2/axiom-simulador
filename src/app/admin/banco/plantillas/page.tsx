"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";

type Formato = "csv" | "json" | "markdown" | "gift" | "aiken" | "texto";

// UN solo megaprompt para todo: examen oficial completo desde un PDF, o lote
// de preguntas de practica por tema. Ambos modos devuelven el MISMO formato
// Markdown AXIOM, con la regla de oro de ensenar (micro-recordatorios de cada
// propiedad usada) y figuras descritas al detalle para el motor de geometria.
const MEGAPROMPT = `Actuá como un profesor experto en exámenes de ingreso a la universidad (nivel preuniversitario boliviano, UMSS). Vas a generar contenido para AXIOM, un simulador de exámenes. Trabajás en uno de estos dos modos según lo que te pida:

MODO A — EXAMEN OFICIAL COMPLETO: si te adjunto un PDF o fotos de un examen de ingreso real, transcribilo FIEL y resolvelo COMPLETO.
MODO B — PREGUNTAS DE PRÁCTICA: si te pido "N preguntas sobre [tema]", generá ese lote de preguntas nuevas, del estilo y nivel real del examen de ingreso.

En los DOS modos la salida es EXACTAMENTE este formato Markdown — no cambies la estructura ni los nombres de los campos, y devolvé el archivo COMPLETO de una sola vez:

---
universidad: UMSS
facultad: ingenieria
anio: [año del examen; en MODO B, el año actual]
opcion: [MODO A: a qué convocatoria pertenece, ej "2da Opción" (si el PDF no lo dice, "1ra Opción"). MODO B: omití esta línea]
titulo: [MODO A: ej "Examen de Ingreso 2-2024 (2da Opción)". MODO B: ej "Práctica · Ángulos entre paralelas"]
fecha_examen: [MODO A: AAAA-MM-DD si aparece en el PDF. MODO B: omití esta línea]
duracion_minutos: [MODO A: la del examen, normalmente 120. MODO B: 2 minutos por pregunta]
total_preguntas: [cantidad total]
ponderacion:
  [area_1]: [peso decimal, ej 0.20]
  [area_2]: [peso decimal]
(una línea por cada área. MODO A: mirá cómo divide REALMENTE el PDF — Aritmética-Álgebra y Geometría-Trigonometría suelen ser DOS áreas distintas, no una. MODO B: una sola área con peso 1.0)
---

Después, cada pregunta así (separadas por una línea con solo "---"):

## Pregunta N
area: [snake_case, ej: aritmetica_algebra, geometria_trigonometria, fisica, quimica, biologia — EXACTO igual a una clave de ponderacion]
tema: [corto y específico, ej: promedios-digitos, binomio-newton, angulos-paralelas — NO algo genérico como "algebra"]
dificultad: facil | medio | dificil
figura: [SOLO si la pregunta depende de un dibujo: un id corto tipo "g1-triangulo"; si no hay figura, no pongas esta línea]

[Enunciado. MODO A: transcripto fiel al PDF. Fórmulas complejas (fracciones, ecuaciones completas, identidades, números con barra) en LaTeX entre signos $: $\\dfrac{3x^3}{y^2}$, $\\overline{ab}$, $\\left(\\dfrac{a}{b}\\right)^{12}$. Exponentes simples sobre una sola letra (a², x³) pueden ir como texto normal.]

[SI la pregunta tiene figura, agregá antes de las opciones un párrafo:
FIGURA: descripción PRECISA y exhaustiva en palabras de TODO lo que se ve — qué líneas hay, cuáles son paralelas, posición relativa de cada vértice (arriba/abajo/izquierda/derecha), hacia dónde sube o baja cada plano o segmento, qué ángulos están marcados y EN QUÉ vértice exacto, qué letras rotulan qué punto, si hay algún ángulo recto marcado y dónde. El dibujo se reconstruye con un motor de geometría a partir de tu descripción: si describís mal una posición relativa, el dibujo sale mal. Mejor que sobre detalle.]

- A) [opción]
- B) [opción]
- C) [opción]
- D) [opción]
- E) Ninguno

**respuesta:** [letra A-E]
**explicacion:** [primera oración: el planteo, la idea general para encarar el problema]
Paso 1 · [primer paso concreto, con las cuentas mostradas]
Paso 2 · [siguiente paso]
Paso 3 · [los que hagan falta]
Respuesta: [letra].

REGLAS (valen para los dos modos):
1. MODO A: NO inventes ni un solo dato del examen. Si algo no se lee con claridad en el PDF (un número borroso, una figura poco nítida), escribí "VERIFICAR: [qué no se lee]" en la explicación en vez de adivinar.
2. VERIFICÁ tu propia respuesta antes de escribirla: resolvé la pregunta paso a paso y confirmá que el resultado coincide con la letra que marcás. Si tu cálculo no coincide con ninguna opción, marcá E) Ninguno y explicá por qué — no fuerces una respuesta que no cierra. (Los exámenes UMSS usan "Ninguno" como respuesta real varias veces, con opciones "con pinta de correctas" para cazar al que no calcula.)
3. Los pasos deben ENSEÑAR, no solo mostrar la cuenta. REGLA DE ORO: si un paso usa un teorema o propiedad (ángulos alternos internos, correspondientes, suma de ángulos de un triángulo, Pitágoras, regla de tres, ley de gases, etc.), recordá en UNA frase qué dice esa propiedad ANTES de usarla — el alumno no tiene por qué tenerla fresca. Ejemplo: en vez de "por alternos internos vale 40°", escribí "recordá: cuando una recta corta a dos paralelas, los ángulos entre las paralelas a lados opuestos son iguales (forman una Z); por eso este ángulo también vale 40°". Si además hay un atajo o técnica que acorta el camino frente al método "a lo bruto", mencionalo.
4. El area de cada pregunta debe existir EXACTO como clave en ponderacion.
5. Español boliviano neutro, claro, sin adornos.`;

const FORMATOS: { id: Formato; nombre: string; ext: string }[] = [
  { id: "csv", nombre: "CSV (Excel)", ext: "csv" },
  { id: "json", nombre: "JSON", ext: "json" },
  { id: "markdown", nombre: "Markdown Axiom", ext: "md" },
  { id: "gift", nombre: "GIFT (Moodle)", ext: "txt" },
  { id: "aiken", nombre: "Aiken (Moodle)", ext: "txt" },
  { id: "texto", nombre: "Texto plano", ext: "txt" },
];

export default function PlantillasPage() {
  const router = useRouter();
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) router.push("/login");
    });
  }, [router]);

  const descargar = (formato: Formato) => {
    window.open(`/api/admin/preguntas/plantilla?formato=${formato}&descargar=1`, "_blank");
  };

  const copiarMegaprompt = async () => {
    await navigator.clipboard.writeText(MEGAPROMPT);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <Link href="/admin/banco" style={{ color: "var(--fg-muted)", fontSize: 14, textDecoration: "none" }}>← Volver al banco</Link>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>🧠 Megaprompt para crear contenido con IA</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>
          Un solo prompt para todo: copialo, pegalo en ChatGPT / Claude / Gemini, y adjuntá el PDF del examen (o pedile N preguntas de un tema). Lo que devuelva se importa acá con un click.
        </p>

        {/* EL megaprompt */}
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(168,85,247,0.10))", borderRadius: 14, padding: 20, border: "2px solid var(--accent)", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 28 }}>⭐</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--fg-primary)" }}>Megaprompt AXIOM (el único que necesitás)</div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>
                Cubre los dos usos: <strong>examen oficial completo</strong> (le adjuntás el PDF y te devuelve todo transcripto y resuelto paso a paso) y <strong>preguntas de práctica</strong> (le pedís &ldquo;20 preguntas sobre ángulos entre paralelas&rdquo;). Siempre en el formato exacto de AXIOM: soluciones que enseñan, fórmulas en LaTeX y figuras descritas al detalle.
              </div>
            </div>
            <button onClick={copiarMegaprompt} style={{ padding: "10px 18px", background: "var(--accent)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 800, whiteSpace: "nowrap" }}>
              {copiado ? "✓ Copiado!" : "📋 Copiar megaprompt"}
            </button>
          </div>
          <details style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 14 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--fg-primary)", fontSize: 14 }}>
              👁️ Ver el megaprompt completo
            </summary>
            <pre style={{ marginTop: 10, padding: 12, background: "var(--bg-card)", borderRadius: 8, fontSize: 12, color: "var(--fg-primary)", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "ui-monospace, monospace", lineHeight: 1.5, maxHeight: 440, overflowY: "auto" }}>
              {MEGAPROMPT}
            </pre>
          </details>
        </div>

        {/* Como usar */}
        <div style={{ padding: 20, background: "rgba(99,102,241,0.06)", borderRadius: 14, border: "1px solid var(--border)", marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>🎯 Cómo se usa</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 1.7, color: "var(--fg-primary)", fontSize: 14 }}>
            <li><strong>Copiá el megaprompt</strong> y pegalo en ChatGPT / Claude / Gemini.</li>
            <li><strong>Modo examen:</strong> adjuntá el PDF (o fotos) del examen pasado. <strong>Modo práctica:</strong> escribí abajo del prompt &ldquo;dame 20 preguntas sobre [tema]&rdquo;.</li>
            <li>Pegá la respuesta de la IA en <Link href="/admin/banco/subir-examen" style={{ color: "var(--accent)", fontWeight: 700 }}>Subir examen</Link>: se valida sola, se guarda en el banco, y con doble clic en <strong>SUBIR</strong> viaja a GitHub para que Claude la revise, dibuje las figuras con el motor de geometría y la integre. (Las preguntas de práctica sueltas también se pueden pegar en <Link href="/admin/banco/importar" style={{ color: "var(--accent)", fontWeight: 700 }}>Importar</Link>.)</li>
          </ol>
        </div>

        {/* Formatos legacy, solo descargas */}
        <details style={{ background: "var(--bg-card)", borderRadius: 14, padding: 18, border: "1px solid var(--border)" }}>
          <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--fg-primary)", fontSize: 14 }}>
            📦 ¿Ya tenés preguntas hechas en otro formato? (Excel, Moodle, JSON…)
          </summary>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: "10px 0 12px" }}>
            Descargá el ejemplo del formato que uses para ver cómo estructurarlo, y después pegá tus preguntas en <Link href="/admin/banco/importar" style={{ color: "var(--accent)", fontWeight: 700 }}>Importar</Link>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FORMATOS.map((f) => (
              <button key={f.id} onClick={() => descargar(f.id)} style={{ padding: "8px 14px", background: "var(--bg-subtle)", color: "var(--fg-primary)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                ⬇ {f.nombre} (.{f.ext})
              </button>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

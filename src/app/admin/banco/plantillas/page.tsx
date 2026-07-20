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
const MEGAPROMPT = `Actuá como un profesor experto en exámenes de ingreso a la universidad UMSS (nivel preuniversitario boliviano). Tu trabajo: transcribir y resolver COMPLETO el examen del PDF (o fotos) adjunto, produciendo un archivo de texto en el formato EXACTO que te doy abajo.

IMPORTANTE: ese archivo lo va a leer un PROGRAMA, no una persona. Si cambiás el nombre de un campo, un símbolo de la estructura o el orden de las partes, el programa lo rechaza. No inventes, no resumas, no "mejores" nada del original.

========== FICHA DEL EXAMEN (ya completada por el usuario — copiala TAL CUAL al encabezado, no la cambies) ==========
anio: [COMPLETAR — ej: 2024]
opcion: [COMPLETAR — ej: 1ra Opción / 2da Opción / 3ra Opción / Versión B]
fecha_examen: [COMPLETAR si se conoce — formato AAAA-MM-DD; si no se conoce, escribir NO SE SABE]
========== FIN DE LA FICHA ==========

REGLAS INQUEBRANTABLES (leelas dos veces antes de empezar):

1. FIDELIDAD TOTAL. Transcribí cada enunciado y cada opción EXACTAMENTE como aparece en el PDF. Sin sinónimos, sin redondeos, sin reordenar opciones. Si el PDF dice sen 37° = 3/5, escribí 3/5 (no 0,6). Si una opción dice "NINGUNO", escribí "Ninguno".

2. NO ADIVINES NUNCA. Si un número, palabra o parte de una figura no se lee con claridad, escribí "VERIFICAR: [qué cosa no se lee]" dentro de la explicación de esa pregunta y seguí con la siguiente. Preferimos un hueco marcado a un dato inventado.

3. EL PROBLEMA ES EL QUE MUESTRA LA FIGURA, NO EL QUE TE SUENA PARECIDO. Antes de resolver una pregunta con dibujo, mirá el dibujo y declarà qué es (¿una masa colgando de un hilo? ¿un bloque sobre un plano? ¿un circuito?). Error real que ya pasó: una IA resolvió "bloque sobre plano inclinado" cuando la figura mostraba un PÉNDULO colgando de un hilo; el número final coincidía de casualidad y el error casi queda. Enunciado, figura y solución tienen que contar EL MISMO problema.

4. VERIFICÁ CADA RESPUESTA ANTES DE MARCARLA. Resolvé la pregunta paso a paso y confirmá que TU resultado coincide con la opción que marcás. Si no coincide con NINGUNA opción, la respuesta es E (Ninguno) — NO fuerces tu resultado hacia la opción "más parecida". En estos exámenes "Ninguno" es respuesta correcta REAL varias veces (en un solo examen nos pasó 3 veces): las demás opciones están elegidas a propósito "con pinta de correctas" para cazar al que no confía en su cálculo.

5. LAS EXPLICACIONES ENSEÑAN, NO SOLO MUESTRAN LA CUENTA. Cada vez que un paso use un teorema o propiedad (ángulos alternos internos, correspondientes, ángulo exterior, suma de ángulos de un triángulo, Pitágoras, regla de tres, presión osmótica, balanceo redox, lo que sea), recordá en UNA frase qué dice esa propiedad ANTES de usarla — el alumno no tiene por qué tenerla fresca. Ejemplo: en vez de "por alternos internos vale 40°", escribí "recordá: cuando una recta corta a dos paralelas, los ángulos que quedan entre las paralelas a lados opuestos son iguales (forman una Z); por eso este ángulo también vale 40°". Si existe un atajo que ahorra tiempo frente al método largo, decilo explícitamente ("atajo: ...").

6. Español boliviano neutro, claro, sin adornos.

========== FORMATO EXACTO DEL ARCHIVO ==========
El archivo empieza con este encabezado (entre las dos líneas de ---), usando los datos de la FICHA:

---
universidad: UMSS
facultad: ingenieria
anio: [el de la ficha]
opcion: [el de la ficha]
titulo: Examen de Ingreso [numero]-[anio] ([opcion])
fecha_examen: [el de la ficha en AAAA-MM-DD; si la ficha dice NO SE SABE, NO escribas esta línea]
duracion_minutos: [la del examen; si el PDF no la dice, 120]
total_preguntas: [cantidad total de preguntas del examen]
ponderacion:
  [area_1]: [peso decimal, ej 0.20]
  [area_2]: [peso decimal]
---

Sobre "ponderacion": una línea por cada ÁREA/SECCIÓN que el PDF realmente tenga, con dos espacios de sangría. Mirá los títulos de sección del PDF: en la UMSS, Aritmética-Álgebra y Geometría-Trigonometría suelen ser DOS secciones distintas (no una sola "matemáticas"). Los nombres de área van en snake_case: aritmetica_algebra, geometria_trigonometria, fisica, quimica, biologia. Los pesos deben sumar 1.0 (si el PDF no indica pesos, repartí igual entre las áreas).

Después del encabezado, CADA pregunta va así (separadas entre sí por una línea que contenga solo tres guiones: ---):

## Pregunta N
area: [snake_case, EXACTAMENTE igual a una clave de ponderacion]
tema: [específico y corto en kebab-case, ej: promedios-digitos, binomio-newton, angulos-paralelas — prohibido poner algo genérico como "algebra"]
dificultad: facil | medio | dificil
figura: [SOLO si la pregunta tiene dibujo: un id corto único, ej "g3-triangulo". Si NO tiene dibujo, NO escribas esta línea]

[Enunciado transcripto fiel. Notación matemática: fórmulas complejas entre signos de dólar — fracciones $\\dfrac{3x^3}{y^2}$, número de dos cifras con barra $\\overline{ab}$, binomios con potencia $\\left(\\dfrac{a}{b}\\right)^{12}$, vectores $\\vec{E}$. Exponentes simples sobre una letra (a², x³) y subíndices químicos (C₆H₁₂O₆) pueden ir como texto normal. PROHIBIDO cortar una fórmula con un salto de línea: cada $...$ abre y cierra en la MISMA línea.]

[SOLO si la pregunta tiene dibujo, agregá acá este bloque:
FIGURA: descripción exhaustiva, elemento por elemento, como si se la dictaras a un dibujante ciego que nunca vio el PDF: (a) qué objeto es la escena (péndulo, plano inclinado, triángulo, circuito...); (b) cada línea o segmento y hacia dónde va (sube/baja, izquierda/derecha), y qué es paralelo a qué; (c) cada ángulo marcado: en QUÉ vértice exacto está y ENTRE QUÉ dos líneas; (d) marcas especiales: arcos, cuadraditos de ángulo recto (y dónde), líneas punteadas (y hacia qué lado se extienden), flechas (y hacia dónde apuntan), rayitas de soporte, bandas o zonas sombreadas; (e) cada letra o número rotulado y al lado de qué elemento está; (f) también lo que NO tiene: si la bolita no lleva etiqueta, decilo. El dibujo se va a reconstruir SOLO con tu texto: si describís mal una posición relativa, sale mal.]

- A) [opción tal cual el PDF]
- B) [opción]
- C) [opción]
- D) [opción]
- E) [opción — en estos exámenes suele ser "Ninguno"]

**respuesta:** [una letra A-E]
**explicacion:** [primera oración: el planteo, la idea general para encarar]
Paso 1 · [primer paso concreto con las cuentas mostradas, recordando la propiedad que usa (regla 5)]
Paso 2 · [siguiente paso]
Paso 3 · [los que hagan falta; numerá siempre "Paso N ·" con ese punto medio]
Respuesta: [letra].

ATENCIÓN a estos detalles del formato, que el programa valida:
- El bloque de explicación va TODO en líneas consecutivas SIN líneas en blanco adentro (una línea en blanco corta la explicación).
- "**respuesta:**" y "**explicacion:**" van en minúscula, con los asteriscos dobles exactamente así.
- Las opciones empiezan con "- " (guión y espacio) y la letra con paréntesis: "- A) ".
- NO envuelvas el archivo en \`\`\` ni agregues comentarios fuera del formato.

========== ENTREGA ==========
- Si podés, entregá el archivo COMPLETO en una sola respuesta.
- Si el examen es demasiado largo para tu límite de respuesta: entregá primero el encabezado + las preguntas 1 a 5, y cuando el usuario escriba "seguí", continuá con las 5 siguientes SIN repetir el encabezado y manteniendo la numeración. Nunca cortes una pregunta por la mitad.

========== AUTOCHEQUEO (verificalo ANTES de responder; si algo falla, corregilo) ==========
□ La cantidad de bloques "## Pregunta" coincide con total_preguntas.
□ Toda pregunta tiene 5 opciones (A-E), su **respuesta:** y su **explicacion:**.
□ El "area" de cada pregunta existe EXACTO como clave dentro de ponderacion.
□ En cada línea, la cantidad de signos $ es PAR (ninguna fórmula quedó abierta).
□ Ninguna explicación llega a un resultado distinto de la letra que marcaste.
□ Toda pregunta con dibujo tiene su línea "figura:" y su bloque "FIGURA:".
□ No usaste \`\`\` ni agregaste texto fuera del formato.`;

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

"use client";

import { useState } from "react";
import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";

// Lámina "Teorema del Resto" — módulo "Teorema del Resto y división de
// polinomios", 3ra de 5. Formato de tarjetas (v5) — ver BITÁCORA §4.5.
// Mismo contenido didáctico ya aprobado (v4), re-cortado en una tarjeta por
// idea: cada Paso de la demostración es su propia tarjeta en vez de un
// bloque más en un scroll. El ejercicio de "Practicalo vos" es una pregunta
// real del banco (2024-final-1-2024.md, Pregunta 4).
export default function TeoremaDelRestoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <p className="font-crimson" style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
          ¿Sabías que podés saber el resto de una división de polinomios sin dividir? Basta con reemplazar un número.
        </p>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya sabés",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: 15.5, lineHeight: 1.6 }}>
            Esto no es un tema nuevo — es la división con resto que aprendiste en la primaria, aplicada a polinomios en vez de números.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <PartePuente valor="17" etiqueta="dividendo" />
              <span className="font-crimson" style={{ fontSize: 21 }}>÷</span>
              <PartePuente valor="5" etiqueta="divisor" />
              <span className="font-crimson" style={{ fontSize: 21 }}>=</span>
              <PartePuente valor="3" etiqueta="cociente" />
              <span style={{ color: LIENZO.fgDim, fontSize: 14 }}>resto</span>
              <PartePuente valor="2" etiqueta="resto" color={LIENZO.accent} />
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${LIENZO.fgFaint}`, fontSize: 13.5, color: LIENZO.fgDim, lineHeight: 1.6 }}>
              O escrito de otra forma: <b style={{ color: LIENZO.fg }}>17 = 5 × 3 + 2</b>. Un <b style={{ color: LIENZO.fg }}>polinomio P(x)</b> es lo mismo que 17, un <b style={{ color: LIENZO.fg }}>Q(x)</b> es lo mismo que el 3, y dividir entre <b style={{ color: LIENZO.fg }}>(x − a)</b> es lo mismo que dividir entre 5.
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 1 de 4",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
            Traducido a polinomios, &quot;P(x) dividido entre (x−a) da cociente Q(x) y resto R&quot; se escribe así:
          </p>
          <div style={{ margin: "8px 0 4px", fontSize: 19, textAlign: "center" }}>
            <MathText block>{"$P(x) = (x - a) \\cdot Q(x) + R$"}</MathText>
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim }}>Es la misma frase que 17 = 5 × 3 + 2, con letras en vez de números.</div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 2 de 4",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
            Ojo con esto, porque es la clave de todo: esa igualdad no es algo que resolvés una sola vez para un x en particular. Es cierta <b>para cualquier x que se te ocurra</b> — siempre, sin excepción. Es un hecho fijo, como 17 = 5×3+2 es un hecho fijo que no depende de nada.
          </p>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 3 de 4",
      contenido: (
        <PasoCard n={3}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
            Como vale para cualquier x, también tiene que valer si elegís meter, a propósito, x = a. ¿Por qué justo ese número y no otro? Porque es el único que hace que (x − a) se vuelva cero:
          </p>
          <div style={{ margin: "8px 0 0", fontSize: 19, textAlign: "center" }}>
            <MathText block>{"$P(a) = (a - a) \\cdot Q(a) + R$"}</MathText>
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 4 de 4",
      contenido: (
        <div>
          <PasoCard n={4}>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
              Y cero por cualquier cosa es cero, así que ese pedazo entero desaparece de la cuenta, sin importar cómo sea Q(x):
            </p>
            <div style={{ margin: "8px 0 0", fontSize: 19, textAlign: "center" }}>
              <MathText block>{"$P(a) = 0 + R$"}</MathText>
            </div>
          </PasoCard>
          <div style={{
            marginTop: 16, textAlign: "center",
            padding: "12px 0", borderTop: `1px solid ${LIENZO.fgFaint}`, borderBottom: `1px solid ${LIENZO.fgFaint}`,
          }}>
            <span style={{ display: "block", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: LIENZO.fgFaint, marginBottom: 6 }}>
              Por lo tanto
            </span>
            <span style={{ fontSize: 22 }}><MathText>{"$R = P(a)$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 12, fontSize: 15, lineHeight: 1.6 }}>
            Hallar el resto de dividir <MathText>{"$P(x) = x^3 + 2x^2 - 5x + 3$"}</MathText> entre <MathText>{"$(x - 2)$"}</MathText>.
          </p>
          <LineaEjemplo glosa="¿Qué valor anula al divisor?" eq={"$x - 2 = 0 \\rightarrow x = 2$"} />
          <LineaEjemplo glosa="Evaluá P ahí" eq="$P(2) = (2)^3 + 2(2)^2 - 5(2) + 3$" />
          <LineaEjemplo glosa="" eq="$P(2) = 8 + 8 - 10 + 3$" />
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${LIENZO.fgFaint}`, fontSize: 16, color: LIENZO.ok }}>
            Resto = 9 — sin dividir nada, igual que sabíamos que 17÷5 da resto 2 sin necesitar el cociente 3.
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · error común",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
          Si el divisor es <b>(x + a)</b>, el número que lo anula es <b>x = −a</b>, no +a. Dividir entre (x + 3) es evaluar en x = −3. No memorices &quot;evaluá en el número de al lado&quot; — preguntate siempre &quot;¿qué valor hace cero al paréntesis?&quot;, como en el Paso 3.
        </p>
      ),
    },
    {
      etiqueta: "La misma idea, en otras formas",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <CasoLista nombre="Divisor con coeficiente" eq={"$P(x) \\div (2x - 1)$"}>
            Mismo razonamiento: igualá a cero y despejá — 2x−1=0 → x=1/2 — y evaluá P(1/2).
          </CasoLista>
          <CasoLista nombre="Divisibilidad exacta" eq="$P(a) = 0$">
            Si el resto da cero, (x−a) divide exacto a P(x) — igual que 15÷5 da resto 0. Es el mismo teorema, se llama Teorema del Factor.
          </CasoLista>
          <CasoLista nombre="Dato disfrazado" eq={'"da resto 4"'} ultimo>
            Un enunciado que dice esto ya te está regalando la ecuación P(a) = 4, aunque no lo diga con esas palabras.
          </CasoLista>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta="Hallar el residuo de dividir el polinomio f(x) = x⁴ + 2x³ − 7x² − 8x + 12, entre x + 1."
          opciones={["4", "8", "12", "16", "Ninguno"]}
          correcta={2}
          explicacion={'El divisor es (x + 1) → anula en x = −1 (no +1, por el "Ojo"). f(−1) = 1 − 2 − 7 + 8 + 12 = 12.'}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="teorema-del-resto"
      moduloTitulo="Teorema del Resto y división de polinomios"
      titulo="Teorema del Resto"
      posicion="Lámina 3 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/polinomios-grado", titulo: "Qué es un polinomio y sus operaciones básicas" }}
      teAbrePuertaA={{ href: "/laminas/binomio-de-newton", titulo: "Binomio de Newton" }}
    />
  );
}

function TarjetaPractica({
  pregunta, opciones, correcta, explicacion,
}: {
  pregunta: string; opciones: string[]; correcta: number; explicacion: string;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const rev = sel !== null;
  return (
    <div>
      <p style={{ fontSize: 15, fontWeight: 600, color: LIENZO.fg, margin: "0 0 14px", lineHeight: 1.5 }}>{pregunta}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opciones.map((op, j) => {
          const isOk = j === correcta, isSel = sel === j;
          const borde = !rev ? LIENZO.fgFaint : isOk ? LIENZO.ok : isSel ? LIENZO.bad : LIENZO.fgFaint;
          return (
            <button
              key={j}
              onClick={() => !rev && setSel(j)}
              disabled={rev}
              style={{
                padding: "10px 14px", textAlign: "left",
                background: !rev ? "transparent" : isOk ? `${LIENZO.ok}18` : isSel ? `${LIENZO.bad}18` : "transparent",
                border: `1.5px solid ${borde}`, borderRadius: 10,
                fontSize: 14, fontWeight: 600, color: LIENZO.fg,
                cursor: rev ? "default" : "pointer",
              }}
            >
              {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
            </button>
          );
        })}
      </div>
      {rev && (
        <div style={{ marginTop: 12, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
          {explicacion}
        </div>
      )}
    </div>
  );
}

function PasoCard({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
        background: LIENZO.accent, color: "#fff", fontSize: 12, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {n}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function PartePuente({ valor, etiqueta, color }: { valor: string; etiqueta: string; color?: string }) {
  return (
    <span className="font-crimson" style={{ textAlign: "center", color: color ?? LIENZO.fg, fontSize: 21 }}>
      {valor}
      <span style={{ display: "block", fontFamily: "var(--font-atkinson), sans-serif", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 0.5, color: LIENZO.fgDim, marginTop: 3 }}>
        {etiqueta}
      </span>
    </span>
  );
}

function LineaEjemplo({ glosa, eq }: { glosa: string; eq: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, fontSize: 14.5 }}>
      <span style={{ color: LIENZO.fgDim, fontSize: 12.5, flexShrink: 0, width: 130 }}>{glosa}</span>
      <MathText>{eq}</MathText>
    </div>
  );
}

function CasoLista({ nombre, eq, children, ultimo }: { nombre: string; eq: string; children: React.ReactNode; ultimo?: boolean }) {
  return (
    <div style={{ padding: "12px 0", borderTop: `1px solid ${LIENZO.fgFaint}55`, borderBottom: ultimo ? `1px solid ${LIENZO.fgFaint}55` : undefined }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: 14.5 }}>{nombre}</span>
        <span style={{ fontSize: 14.5, color: LIENZO.fgDim }}>
          <MathText>{eq}</MathText>
        </span>
      </div>
      <p style={{ fontSize: 13.5, color: LIENZO.fgDim, margin: 0 }}>{children}</p>
    </div>
  );
}

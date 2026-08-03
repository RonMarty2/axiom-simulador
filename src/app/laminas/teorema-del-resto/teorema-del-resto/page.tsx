"use client";

import LaminaShell from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import {
  Hook, Puente, Paso, Cuidado, Ejemplo, PracticaFinal,
} from "../../../aprende/_components/pedagogia";
import { LIENZO } from "../../../aprende/_components/lienzo";

// Lámina "Teorema del Resto" — módulo "Teorema del Resto y división de
// polinomios", 3ra de 5. Contenido y estructura porteados 1:1 del mockup v4
// aprobado por Ronald (BITÁCORA §4.5). El ejercicio de "Practicalo vos" es
// una pregunta real del banco (2024-final-1-2024.md, Pregunta 4) — el banco
// es mapa de qué se pregunta, no guion, pero acá sí se reutiliza tal cual
// porque encaja perfecto con la lección (divisor x+a, dificultad fácil).
export default function TeoremaDelRestoPage() {
  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="teorema-del-resto"
      moduloTitulo="Teorema del Resto y división de polinomios"
      titulo="Teorema del Resto"
      posicion="Lámina 3 de 5"
      necesitasAntes={{ href: "/laminas/polinomios-grado", titulo: "Qué es un polinomio y sus operaciones básicas" }}
      teAbrePuertaA={{ href: "/laminas/binomio-de-newton", titulo: "Binomio de Newton" }}
    >
      <Hook>
        ¿Sabías que podés saber el resto de una división de polinomios sin dividir? Basta con reemplazar un número.
      </Hook>

      <Puente>
        <p style={{ margin: "0 0 14px" }}>
          Esto no es un tema nuevo — es la división con resto que aprendiste en la primaria, aplicada a polinomios en vez de números.
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
          fontFamily: "var(--font-crimson), serif", fontSize: 24, flexWrap: "wrap", margin: "14px 0 10px",
        }}>
          <PartePuente valor="17" etiqueta="dividendo" />
          <span>÷</span>
          <PartePuente valor="5" etiqueta="divisor" />
          <span>=</span>
          <PartePuente valor="3" etiqueta="cociente" />
          <span style={{ color: LIENZO.fgDim, fontSize: 15, fontFamily: "var(--font-atkinson), sans-serif" }}>resto</span>
          <PartePuente valor="2" etiqueta="resto" color={LIENZO.accent} />
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${LIENZO.fgFaint}`, fontSize: 15, textAlign: "center", color: LIENZO.fgDim }}>
          O escrito de otra forma: <b style={{ color: LIENZO.fg }}>17 = 5 × 3 + 2</b>. Un <b style={{ color: LIENZO.fg }}>polinomio P(x)</b> es lo mismo que 17, un <b style={{ color: LIENZO.fg }}>Q(x)</b> es lo mismo que el 3, y dividir entre <b style={{ color: LIENZO.fg }}>(x − a)</b> es lo mismo que dividir entre 5. Todo el teorema sale de escribir esa misma frase con letras.
        </div>
      </Puente>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: LIENZO.accent, marginBottom: 12 }}>
          Por qué funciona
        </div>
        <div style={{ position: "relative", paddingLeft: 4 }}>
          <Paso n={1}>
            <p style={{ margin: 0 }}>Traducido a polinomios, &quot;P(x) dividido entre (x−a) da cociente Q(x) y resto R&quot; se escribe así:</p>
            <div style={{ margin: "6px 0 4px", fontSize: 17 }}>
              <MathText block>{"$P(x) = (x - a) \\cdot Q(x) + R$"}</MathText>
            </div>
            <div style={{ fontSize: 13, color: LIENZO.fgDim }}>Es la misma frase que 17 = 5 × 3 + 2, con letras en vez de números.</div>
          </Paso>
          <Paso n={2}>
            <p style={{ margin: 0 }}>
              Ojo con esto, porque es la clave de todo: esa igualdad no es algo que resolvés una sola vez para un x en particular. Es cierta <b>para cualquier x que se te ocurra</b> — siempre, sin excepción. Es un hecho fijo, como 17 = 5×3+2 es un hecho fijo que no depende de nada.
            </p>
          </Paso>
          <Paso n={3}>
            <p style={{ margin: 0 }}>
              Como vale para cualquier x, también tiene que valer si elegís meter, a propósito, x = a. ¿Por qué justo ese número y no otro? Porque es el único que hace que (x − a) se vuelva cero:
            </p>
            <div style={{ margin: "6px 0 0", fontSize: 17 }}>
              <MathText block>{"$P(a) = (a - a) \\cdot Q(a) + R$"}</MathText>
            </div>
          </Paso>
          <Paso n={4}>
            <p style={{ margin: 0 }}>Y cero por cualquier cosa es cero, así que ese pedazo entero desaparece de la cuenta, sin importar cómo sea Q(x):</p>
            <div style={{ margin: "6px 0 0", fontSize: 17 }}>
              <MathText block>{"$P(a) = 0 + R$"}</MathText>
            </div>
          </Paso>
        </div>
        <div style={{
          marginTop: 20, fontFamily: "var(--font-crimson), serif", fontSize: 22, textAlign: "center",
          padding: "14px 0", borderTop: `1px solid ${LIENZO.fgFaint}`, borderBottom: `1px solid ${LIENZO.fgFaint}`,
        }}>
          <span style={{ display: "block", fontFamily: "var(--font-atkinson), sans-serif", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: LIENZO.fgFaint, marginBottom: 6 }}>
            Por lo tanto
          </span>
          <MathText>{"$R = P(a)$"}</MathText>
        </div>
        <p style={{ marginTop: 14, fontSize: 14, color: LIENZO.fgDim }}>
          Dato extra: R nunca tiene x adentro, es siempre un número fijo — por eso este único cálculo alcanza para conocerlo del todo, ni más ni menos que el resto de una división común.
        </p>
      </div>

      <Ejemplo titulo="Aplicándolo">
        <p style={{ marginBottom: 14 }}>
          Hallar el resto de dividir <MathText>{"$P(x) = x^3 + 2x^2 - 5x + 3$"}</MathText> entre <MathText>{"$(x - 2)$"}</MathText>.
        </p>
        <LineaEjemplo glosa="¿Qué valor anula al divisor?" eq={"$x - 2 = 0 \\rightarrow x = 2$"} />
        <LineaEjemplo glosa="Evaluá P ahí" eq="$P(2) = (2)^3 + 2(2)^2 - 5(2) + 3$" />
        <LineaEjemplo glosa="" eq="$P(2) = 8 + 8 - 10 + 3$" />
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${LIENZO.fgFaint}`, fontFamily: "var(--font-crimson), serif", fontSize: 19, color: LIENZO.ok }}>
          Resto = 9 — sin dividir nada, igual que sabíamos que 17÷5 da resto 2 sin necesitar el cociente 3.
        </div>
      </Ejemplo>

      <Cuidado>
        Si el divisor es <b>(x + a)</b>, el número que lo anula es <b>x = −a</b>, no +a. Dividir entre (x + 3) es evaluar en x = −3. No memorices &quot;evaluá en el número de al lado&quot; — preguntate siempre &quot;¿qué valor hace cero al paréntesis?&quot;, como en el Paso 3 de arriba.
      </Cuidado>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: LIENZO.ok, marginBottom: 10 }}>
          La misma idea, en otras formas
        </div>
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

      <PracticaFinal
        ejercicios={[
          {
            p: "Hallar el residuo de dividir el polinomio f(x) = x⁴ + 2x³ − 7x² − 8x + 12, entre x + 1.",
            o: ["4", "8", "12", "16", "Ninguno"],
            c: 2,
            ex: "El divisor es (x + 1) → anula en x = −1 (no +1, por el \"Ojo\" de arriba). f(−1) = 1 − 2 − 7 + 8 + 12 = 12.",
          },
        ]}
      />
    </LaminaShell>
  );
}

function PartePuente({ valor, etiqueta, color }: { valor: string; etiqueta: string; color?: string }) {
  return (
    <span style={{ textAlign: "center", color: color ?? LIENZO.fg }}>
      {valor}
      <span style={{ display: "block", fontFamily: "var(--font-atkinson), sans-serif", fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: LIENZO.fgDim, marginTop: 4 }}>
        {etiqueta}
      </span>
    </span>
  );
}

function LineaEjemplo({ glosa, eq }: { glosa: string; eq: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8, fontSize: 15.5 }}>
      <span style={{ color: LIENZO.fgDim, fontSize: 13.5, flexShrink: 0, width: 150 }}>{glosa}</span>
      <MathText>{eq}</MathText>
    </div>
  );
}

function CasoLista({ nombre, eq, children, ultimo }: { nombre: string; eq: string; children: React.ReactNode; ultimo?: boolean }) {
  return (
    <div style={{ padding: "14px 0", borderTop: `1px solid ${LIENZO.fgFaint}55`, borderBottom: ultimo ? `1px solid ${LIENZO.fgFaint}55` : undefined }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{nombre}</span>
        <span style={{ fontFamily: "var(--font-crimson), serif", fontSize: 15.5, color: LIENZO.fgDim }}>
          <MathText>{eq}</MathText>
        </span>
      </div>
      <p style={{ fontSize: 14, color: LIENZO.fgDim, margin: 0 }}>{children}</p>
    </div>
  );
}

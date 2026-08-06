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
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés saber el resto de una división de polinomios sin dividir?
          </p>
          <FlujoGancho />
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya sabés",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Esto ya lo sabés hacer: es la división con resto de la primaria.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <PartePuente valor="17" etiqueta="dividendo" />
              <span className="font-crimson" style={{ fontSize: 20 }}>÷</span>
              <PartePuente valor="5" etiqueta="divisor" />
              <span className="font-crimson" style={{ fontSize: 20 }}>=</span>
              <PartePuente valor="3" etiqueta="cociente" />
              <span className="font-crimson" style={{ fontSize: 20, color: LIENZO.fgFaint }}>,</span>
              <PartePuente valor="2" etiqueta="resto" color={LIENZO.accent} />
            </div>
          </div>
          <p style={{ margin: "14px 0 4px", fontSize: 12.5, color: LIENZO.fgDim, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
            Ahora ponele nombre nuevo a cada papel:
          </p>
          <div>
            <FilaRol rol="Lo que se divide" conocido="17" nuevo="P(x)" />
            <FilaRol rol="Entre qué se divide" conocido="5" nuevo="(x − a)" />
            <FilaRol rol="El resultado entero" conocido="3" nuevo="Q(x)" />
            <FilaRol rol="Lo que sobra" conocido="2" nuevo="R" ultimo />
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Nada cambia salvo el nombre. Por eso <MathText>{"$P(x)$"}</MathText> hace el mismo papel que el 17: es lo que se está dividiendo, ni más ni menos.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 1 de 4",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Traducido a polinomios, la misma frase de siempre: dividendo = divisor × cociente + resto.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ opacity: 0.5, fontSize: 15 }}><MathText>{"$17 = 5 \\times 3 + 2$"}</MathText></div>
            <FlechaMini abajo />
            <div style={{ fontSize: 19 }}><MathText>{"$P(x) = (x - a) \\cdot Q(x) + R$"}</MathText></div>
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 2 de 4",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.6 }}>
            Ojo, es la clave de todo: esa igualdad no es de un x en particular. <b>Vale para cualquier x</b>, siempre. Es un hecho fijo, tal como <MathText>{"$17 = 5 \\times 3 + 2$"}</MathText> no depende de nada.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["x = 1", "x = 7", "x = a", "x = cualquiera"].map((v) => (
              <span key={v} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "6px 10px", borderRadius: 999, background: `${LIENZO.ok}15`, border: `1px solid ${LIENZO.ok}55`,
                fontSize: 12.5, color: LIENZO.fg,
              }}>
                <MathText>{`$${v}$`}</MathText>
                <span style={{ color: LIENZO.ok, fontWeight: 700 }}>✓</span>
              </span>
            ))}
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 3 de 4",
      contenido: (
        <PasoCard n={3}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Como vale para cualquier x, también vale si elegís meter, a propósito, <MathText>{"$x=a$"}</MathText>. Es el único valor que hace cero al paréntesis:
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 10 }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 16 }}><MathText>{"$(x - a)$"}</MathText></div>
            <FlechaMini abajo />
            <div style={{ fontSize: 9, color: LIENZO.fgDim, textTransform: "uppercase", marginBottom: 2 }}>metés x = a</div>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 16 }}><MathText>{"$(a - a)$"}</MathText></div>
            <FlechaMini abajo />
            <div style={{ padding: "8px 16px", borderRadius: 10, background: `${LIENZO.accent}15`, border: `1.5px solid ${LIENZO.accent}`, fontWeight: 700, fontSize: 16 }}>
              <MathText>{"$0$"}</MathText>
            </div>
          </div>
          <div style={{ fontSize: 19, textAlign: "center" }}>
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
            <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
              Cero por cualquier cosa es cero, así que ese pedazo entero desaparece, sin importar cómo sea Q(x):
            </p>
            <div style={{ fontSize: 19, textAlign: "center" }}>
              <MathText>{"$P(a) =$"}</MathText>
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ opacity: 0.35 }}><MathText>{"$(a - a) \\cdot Q(a)$"}</MathText></span>
                <span style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-6deg)" }} />
              </span>
              <MathText>{"$\\ + R$"}</MathText>
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
          <p style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
            Hallar el resto de dividir <MathText>{"$P(x) = x^3 + 2x^2 - 5x + 3$"}</MathText> entre <MathText>{"$(x - 2)$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="¿Qué valor anula al divisor?" eq={"$x - 2 = 0 \\rightarrow x = 2$"} />
            <LineaEjemplo glosa="Evaluá P ahí" eq="$P(2) = (2)^3 + 2(2)^2 - 5(2) + 3$" />
            <LineaEjemplo glosa="" eq="$P(2) = 8 + 8 - 10 + 3$" />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$R = 9$"}</MathText></span>
            <span style={{ fontSize: 12, color: LIENZO.fgDim }}>sin dividir nada</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · error común",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.6 }}>
            El signo de adentro del paréntesis cambia el valor que anula. No memorices &quot;el de al lado&quot;. Preguntate siempre: &quot;¿qué valor hace cero esto?&quot;.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}55`, textAlign: "center" }}>
              <div style={{ fontSize: 16 }}><MathText>{"$(x - 2)$"}</MathText></div>
              <FlechaMini abajo />
              <div style={{ fontSize: 16, color: LIENZO.ok, fontWeight: 700 }}><MathText>{"$x = 2$"}</MathText></div>
            </div>
            <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}55`, textAlign: "center" }}>
              <div style={{ fontSize: 16 }}><MathText>{"$(x + 3)$"}</MathText></div>
              <FlechaMini abajo />
              <div style={{ fontSize: 16, color: LIENZO.bad, fontWeight: 700 }}><MathText>{"$x = -3$"}</MathText></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "También funciona con coeficiente",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            La idea de siempre no cambia: buscá el valor que anula al divisor. Si el divisor tiene un coeficiente, lo buscás igual.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 10 }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 15 }}>
              <MathText>{"$(x - a) = 0 \\rightarrow x = a$"}</MathText>
            </div>
            <FlechaMini abajo />
            <div style={{ fontSize: 9, color: LIENZO.fgDim, textTransform: "uppercase", marginBottom: 2 }}>mismo truco, con coeficiente</div>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`, fontSize: 15 }}>
              <MathText>{"$2x - 1 = 0 \\rightarrow x = \\tfrac{1}{2}$"}</MathText>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Para hallar el resto de <MathText>{"$P(x) \\div (2x-1)$"}</MathText>, evaluás <MathText>{"$P(\\tfrac{1}{2})$"}</MathText>. Mismo teorema, un paso extra al principio.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cuando el resto da exactamente cero",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Así como 15÷5 da resto 0 (división exacta), a veces R también da cero:
          </p>
          <div style={{ textAlign: "center", padding: "14px 0", background: LIENZO.bgSoft, borderRadius: 12, marginBottom: 10, fontSize: 20 }}>
            <MathText>{"$P(a) = 0$"}</MathText>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            Ahí <MathText>{"$(x-a)$"}</MathText> divide exacto a <MathText>{"$P(x)$"}</MathText>, sin sobrar nada. Es el mismo teorema, con nombre propio para este caso: <b>Teorema del Factor</b>.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Un dato escondido en palabras",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            A veces el examen no te da la ecuación armada. Te la esconde en una frase:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 16px", marginBottom: 10 }}>
            <p className="font-crimson" style={{ margin: "0 0 8px", fontSize: 14, fontStyle: "italic", color: LIENZO.fgDim, textAlign: "center" }}>
              &quot;Al dividir P(x) entre (x−3), el resto da 4.&quot;
            </p>
            <FlechaMini abajo />
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 17 }}>
              <MathText>{"$P(3) = 4$"}</MathText>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Es la misma idea del Teorema del Resto (<MathText>{"$R = P(a)$"}</MathText>): el enunciado te regala el valor de R, disfrazado de oración.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar el residuo de dividir el polinomio $f(x) = x^4 + 2x^3 - 7x^2 - 8x + 12$, entre $x + 1$."}
          opciones={["4", "8", "12", "16", "Ninguno"]}
          correcta={2}
          explicacion={"El divisor es $(x + 1)$, anula en $x = -1$ (no +1, por el \"Ojo\"). $f(-1) = 1 - 2 - 7 + 8 + 12 = 12$."}
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
      <p style={{ fontSize: 15, fontWeight: 600, color: LIENZO.fg, margin: "0 0 14px", lineHeight: 1.5 }}><MathText>{pregunta}</MathText></p>
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
          <MathText>{explicacion}</MathText>
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

function FlechaMini({ abajo }: { abajo?: boolean }) {
  return (
    <svg
      width="18" height="14" viewBox="0 0 24 16" fill="none" stroke={LIENZO.fgFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={abajo ? { transform: "rotate(90deg)", display: "block", margin: "2px auto" } : undefined}
    >
      <path d="M2 8h18M14 2l6 6-6 6" />
    </svg>
  );
}

// Visual del gancho: muestra la idea completa de un vistazo — dividir se
// tacha, evaluar en un punto queda resaltado — antes de explicar nada.
function FlujoGancho() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${LIENZO.fgFaint}`, opacity: 0.55 }}>
          <MathText>{"$P(x) \\div (x-a)$"}</MathText>
          <div style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-8deg)" }} />
        </div>
        <FlechaMini />
        <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
          <MathText>{"$P(a)$"}</MathText>
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 10.5, color: LIENZO.fgDim, textTransform: "uppercase", letterSpacing: 0.4 }}>
        <span>sin dividir nada</span>
        <span>con un solo cálculo</span>
      </div>
    </div>
  );
}

// Fila de "traducción por rol" del Puente — en vez de declarar "P(x) es lo
// mismo que 17", muestra el papel que cumple cada uno y deja que la
// correspondencia se vea, no que se declare.
function FilaRol({ rol, conocido, nuevo, ultimo }: { rol: string; conocido: string; nuevo: string; ultimo?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
      borderTop: `1px solid ${LIENZO.fgFaint}33`,
      borderBottom: ultimo ? `1px solid ${LIENZO.fgFaint}33` : undefined,
    }}>
      <div style={{ flex: 1, fontSize: 12.5, color: LIENZO.fgDim }}>{rol}</div>
      <div className="font-crimson" style={{ fontSize: 16, minWidth: 44, textAlign: "center", color: LIENZO.fg }}>{conocido}</div>
      <FlechaMini />
      <div className="font-crimson" style={{ fontSize: 16, minWidth: 56, textAlign: "center", color: LIENZO.accent, fontWeight: 700 }}>{nuevo}</div>
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
    <div style={{ marginBottom: 8, fontSize: 15, overflowX: "auto" }}>
      {glosa && <div style={{ color: LIENZO.fgDim, fontSize: 12.5, marginBottom: 2 }}>{glosa}</div>}
      <MathText>{eq}</MathText>
    </div>
  );
}


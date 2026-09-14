"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Inecuaciones racionales" — módulo "Inecuaciones", 2da y
// última de 2.
export default function InecuacionesRacionalesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que multiplicar en cruz una inecuación racional sin saber el signo del denominador te puede dar una respuesta al revés?
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>nunca multipliques cruzado</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>pasa todo a un lado</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya sabes",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ya sabes hallar el signo de una inecuación cuadrática mirando sus raíces. Una racional se resuelve igual, pero con los &quot;puntos críticos&quot; de numerador Y denominador juntos.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\dfrac{p(x)}{q(x)} \\gtrless 0$"}</MathText>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Pasa todo a un solo lado y combina en UNA fracción</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Marca los puntos críticos: raíces del numerador (se incluyen) y del denominador (SIEMPRE se excluyen)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Prueba el signo de la fracción en cada intervalo entre puntos críticos</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            La inecuación <MathText>{"$3<\\dfrac{3x-1}{x-5}$"}</MathText> tiene por solución:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Todo a un lado, una sola fracción" eq={"$\\dfrac{(3x-1)-3(x-5)}{x-5} > 0 \\ \\Rightarrow\\ \\dfrac{14}{x-5} > 0$"} />
            <LineaEjemplo glosa="El numerador (14) siempre es positivo: positiva cuando el denominador también lo es" eq={"$x - 5 > 0$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x > 5$"}</MathText></span>
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
            Multiplicar en cruz sin saber el signo de <MathText>{"$(x-5)$"}</MathText> es el error más común: si fuera negativo, la desigualdad se daría vuelta y el resultado sería otro.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\dfrac{14}{x-5}>0$", abajo: "$x>5$" }}
            incorrecto={{ arriba: "$3(x-5)<3x-1$", abajo: "$\\text{(mal, cruza sin saber signo)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con dos fracciones",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Hallar el conjunto solución de <MathText>{"$\\dfrac{1}{x-1}<\\dfrac{1}{x+1}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Todo a un lado, común denominador" eq={"$\\dfrac{(x+1)-(x-1)}{(x-1)(x+1)} < 0 \\ \\Rightarrow\\ \\dfrac{2}{x^2-1} < 0$"} />
            <LineaEjemplo glosa="Numerador (2) siempre positivo: negativa cuando el denominador es negativo" eq={"$x^2-1 < 0 \\ \\Rightarrow\\ -1 < x < 1$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$-1 < x < 1$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"El conjunto solución de $\\dfrac{1+x}{1-x}\\geq1$ es:"}
          opciones={["$x>1$", "$0\\leq x<1$", "$x<1$", "$-1\\leq x<1$", "Ninguno"]}
          correcta={1}
          explicacion={"$\\dfrac{(1+x)-(1-x)}{1-x}\\geq0 \\Rightarrow \\dfrac{2x}{1-x}\\geq0$. Puntos críticos: $x=0$ (numerador, se incluye) y $x=1$ (denominador, se excluye). Analizando signos: $0\\leq x<1$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="inecuaciones"
      moduloTitulo="Inecuaciones"
      titulo="Inecuaciones racionales"
      posicion="Lámina 2 de 2"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/inecuaciones/inecuaciones-lineales-y-cuadraticas", titulo: "Inecuaciones lineales y cuadráticas" }}
      teAbrePuertaA={{ href: "/laminas/planteo-verbal-general", titulo: "Planteo verbal general" }}
    />
  );
}

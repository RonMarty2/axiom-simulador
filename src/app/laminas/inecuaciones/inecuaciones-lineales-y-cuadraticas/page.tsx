"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Inecuaciones lineales y cuadráticas" — módulo
// "Inecuaciones", 1ra de 2. El banco no tiene preguntas etiquetadas
// como inecuación lineal pura (tipo ax+b>c); el ejemplo de "Arrancamos
// de algo que ya sabés" es autoría propia para dar ese puente básico,
// documentado acá. El resto de la lámina se apoya en preguntas reales
// de inecuaciones cuadráticas, que sí están bien representadas.
export default function InecuacionesLinealesYCuadraticasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que multiplicar una inecuación por un número negativo da vuelta la desigualdad?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$-x > 3$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$x < -3$"}</MathText>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya sabés",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ya sabés despejar una ecuación lineal. Con una inecuación es igual, salvo por una regla extra: si multiplicás o dividís por un número negativo, la desigualdad se da vuelta.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$2x-3>5 \\ \\Rightarrow\\ 2x>8 \\ \\Rightarrow\\ x>4$"}</MathText>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace (cuadráticas)",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Pasá todo a un lado: <MathText>{"$ax^2+bx+c \\gtrless 0$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Hallá las raíces: son los puntos donde la parábola cruza el eje</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si abre hacia arriba: negativa ENTRE las raíces, positiva AFUERA (y al revés si abre hacia abajo)</span>
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
            El intervalo solución de <MathText>{"$x^2-3x-4<0$"}</MathText> es:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Factorizando, raíces en x=4 y x=-1" eq={"$(x-4)(x+1) < 0$"} />
            <LineaEjemplo glosa="Abre hacia arriba (a>0): negativa entre las raíces" eq={"$-1 < x < 4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$-1 < x < 4$"}</MathText></span>
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
            Confundir cuándo la expresión es negativa (entre las raíces) con cuándo es positiva (afuera) es el error más común, sobre todo si te olvidás de mirar el signo de <MathText>{"$a$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(x-4)(x+1)<0$", abajo: "$-1<x<4$" }}
            incorrecto={{ arriba: "$(x-4)(x+1)<0$", abajo: "$x<-1\\ \\text{o}\\ x>4\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Cuando la desigualdad es al revés",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Una de las soluciones de <MathText>{"$2x^2-9>3x$"}</MathText> es:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Todo a un lado: 2x²-3x-9>0. Raíces: x=3 y x=-1,5" eq={"$2x^2-3x-9 > 0$"} />
            <LineaEjemplo glosa="Abre hacia arriba: positiva AFUERA de las raíces" eq={"$x < -1{,}5 \\ \\text{o}\\ x > 3$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$(3, +\\infty)$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Determinar todos los valores de $x$ tal que $\\sqrt{6x-x^2}$ esté definida como número real."}
          opciones={["$(0,6)$", "$[0,6]$", "$(-6,6)$", "$[-6,6]$", "Ninguno"]}
          correcta={1}
          explicacion={"El radicando debe ser $\\geq0$: $6x-x^2\\geq0 \\Rightarrow x(6-x)\\geq0$. Esto ocurre para $0\\leq x\\leq6$ (los extremos se incluyen porque ahí el radicando vale exactamente 0)."}
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
      titulo="Inecuaciones lineales y cuadráticas"
      posicion="Lámina 1 de 2"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/inecuaciones/inecuaciones-racionales", titulo: "Inecuaciones racionales" }}
    />
  );
}

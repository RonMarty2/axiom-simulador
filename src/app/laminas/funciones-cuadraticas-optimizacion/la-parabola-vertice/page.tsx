"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "La parábola: vértice y eje de simetría" — módulo "Funciones
// cuadráticas: optimización", 1ra de 2. El banco tiene poca cobertura
// de vértice "puro" (solo 2 preguntas reales, una de ellas usando el
// vértice como paso intermedio de un análisis de monotonía); el
// ejercicio de "Practicalo vos" es autoría propia por esa razón,
// documentado acá en vez de forzar una cita del banco poco ajustada.
export default function LaParabolaVerticePage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que toda parábola tiene un único punto más alto o más bajo, y podés hallarlo sin graficar nada?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$y=ax^2+bx+c$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$x=-\\dfrac{b}{2a}$"}</MathText>
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
            Ya sabés que el signo de <MathText>{"$a$"}</MathText> te dice hacia dónde abre la parábola. Ese mismo signo te dice si el vértice es un máximo o un mínimo.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$a>0$"}</MathText> → abre hacia arriba → el vértice es un MÍNIMO
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$a<0$"}</MathText> → abre hacia abajo → el vértice es un MÁXIMO
            </div>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identificá <MathText>{"$a$"}</MathText>, <MathText>{"$b$"}</MathText> y <MathText>{"$c$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Calculá <MathText>{"$x=-\\dfrac{b}{2a}$"}</MathText>: esa es la coordenada del vértice y también el eje de simetría</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Reemplazá ese <MathText>{"$x$"}</MathText> en la función para hallar el valor máximo o mínimo</span>
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
            En la función cuadrática <MathText>{"$y=-x^2+x+2$"}</MathText>, calcular el máximo valor de &quot;y&quot; y el correspondiente valor de &quot;x&quot; que lo genera.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=-1, b=1" eq={"$x = -\\dfrac{1}{2(-1)} = \\dfrac12$"} />
            <LineaEjemplo glosa="" eq={"$y = -\\left(\\dfrac12\\right)^2 + \\dfrac12 + 2 = \\dfrac94$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\left(\\dfrac12, \\dfrac94\\right)$"}</MathText></span>
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
            Olvidarse del signo negativo en <MathText>{"$x=-\\dfrac{b}{2a}$"}</MathText> es el error más común, sobre todo cuando <MathText>{"$b$"}</MathText> ya es negativo y los dos signos se confunden.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$y=-x^2+x+2$", abajo: "$x=-\\dfrac{1}{-2}=\\dfrac12$" }}
            incorrecto={{ arriba: "$y=-x^2+x+2$", abajo: "$x=\\dfrac{1}{-2}=-\\dfrac12\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "El vértice también ordena la parábola",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La función <MathText>{"$f(x)=x^2-4x$"}</MathText> es creciente en el conjunto de valores <MathText>{"$x$"}</MathText> tales que:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Vértice: a=1, b=-4" eq={"$x = -\\dfrac{-4}{2(1)} = 2$"} />
            <LineaEjemplo glosa="a>0: abre hacia arriba, crece a la derecha del vértice" eq={"$x \\geq 2$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x \\geq 2$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar el vértice de $f(x)=x^2-6x+5$."}
          opciones={["$(3,-4)$", "$(3,4)$", "$(-3,-4)$", "$(6,-4)$", "Ninguno"]}
          correcta={0}
          explicacion={"$x=-\\dfrac{-6}{2(1)}=3$. $f(3)=9-18+5=-4$. Vértice: $(3,-4)$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="funciones-cuadraticas-optimizacion"
      moduloTitulo="Funciones cuadráticas: optimización"
      titulo="La parábola: vértice y eje de simetría"
      posicion="Lámina 1 de 2"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/funciones-cuadraticas-optimizacion/optimizacion-aplicada", titulo: "Optimización aplicada" }}
    />
  );
}

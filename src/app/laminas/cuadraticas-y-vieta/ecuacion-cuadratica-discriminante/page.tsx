"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuación cuadrática y discriminante" — módulo "Ecuaciones
// cuadráticas y relaciones de Vieta", 1ra de 5. Construida en formato de
// tarjetas aplicando reglas 1-12 desde el primer borrador.
export default function EcuacionCuadraticaDiscriminantePage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés saber cuántas soluciones reales tiene una ecuación cuadrática sin resolverla, mirando un solo número?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$ax^2+bx+c=0$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$b^2-4ac$"}</MathText>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya viste",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            La fórmula general para resolver una cuadrática ya la conocés. Fijate bien qué hay adentro de la raíz cuadrada.
          </p>
          <div style={{ textAlign: "center", padding: "14px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 19 }}>
            <MathText>{"$x = \\dfrac{-b \\pm \\sqrt{\\,b^2-4ac\\,}}{2a}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Esa parte de adentro, <MathText>{"$b^2-4ac$"}</MathText>, se llama <b>discriminante</b>. De su signo depende todo lo que pasa afuera.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Todo se reduce a una pregunta: <MathText>{"$\\sqrt{\\,b^2-4ac\\,}$"}</MathText>, ¿existe como número real, y da dos resultados o uno?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 14, minWidth: 70 }}><MathText>{"$\\Delta > 0$"}</MathText></span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>la raíz existe y el <MathText>{"$\\pm$"}</MathText> da dos valores distintos</span>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: LIENZO.ok, whiteSpace: "nowrap" }}>2 raíces</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 14, minWidth: 70 }}><MathText>{"$\\Delta = 0$"}</MathText></span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>la raíz de 0 es 0, el <MathText>{"$\\pm$"}</MathText> no cambia nada</span>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: LIENZO.accent, whiteSpace: "nowrap" }}>1 raíz</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}44` }}>
              <span style={{ fontSize: 14, minWidth: 70 }}><MathText>{"$\\Delta < 0$"}</MathText></span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>no existe raíz cuadrada real de un negativo</span>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: LIENZO.bad, whiteSpace: "nowrap" }}>0 raíces</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
            ¿Cuántas soluciones reales tiene <MathText>{"$2x^2 - 3x - 5 = 0$"}</MathText>?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="a=2, b=-3, c=-5" eq={"$\\Delta = (-3)^2 - 4(2)(-5)$"} />
            <LineaEjemplo glosa="" eq={"$\\Delta = 9 + 40 = 49$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\Delta = 49 > 0$"}</MathText></span>
            <span style={{ fontSize: 12, color: LIENZO.fgDim }}>dos raíces reales</span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Y como <MathText>{"$49$"}</MathText> es cuadrado perfecto, salen números enteros: <MathText>{"$x = 2.5$"}</MathText> y <MathText>{"$x = -1$"}</MathText>.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · error común",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.6 }}>
            Cuando <MathText>{"$a$"}</MathText> o <MathText>{"$c$"}</MathText> son negativos, hay que poner paréntesis al reemplazar. Sin ellos, el signo de <MathText>{"$-4ac$"}</MathText> sale mal.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$-4(2)(-5)$", abajo: "$+40$" }}
            incorrecto={{ arriba: "$-4 \\cdot 2 \\cdot -5$", abajo: "$-40$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Sin resolver nada, solo contando",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            La gracia del discriminante es esta: contestás &quot;cuántas soluciones reales tiene&quot; sin resolver la ecuación entera.
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Sin resolver, ¿cuántas soluciones reales tiene <MathText>{"$3x^2 + 2x + 5 = 0$"}</MathText>?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=3, b=2, c=5" eq={"$\\Delta = (2)^2 - 4(3)(5)$"} />
            <LineaEjemplo glosa="" eq={"$\\Delta = 4 - 60 = -56$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.bad}15`, border: `1.5px solid ${LIENZO.bad}`,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: LIENZO.bad }}><MathText>{"$\\Delta < 0$"}</MathText>: ninguna solución real</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Qué de lo siguiente es cierto para la parábola $y = -4x^2 + 20x - 25$?"}
          opciones={[
            "Se abre hacia abajo, con 2 abscisas en el origen",
            "Se abre hacia abajo, sin abscisas en el origen",
            "Se abre hacia abajo, con 1 abscisa en el origen",
            "Se abre a la izquierda",
            "Ninguno",
          ]}
          correcta={2}
          explicacion={"$a=-4<0$, se abre hacia abajo. Discriminante: $b^2-4ac=20^2-4(-4)(-25)=400-400=0$. Con $\\Delta=0$ hay exactamente una raíz real (doble), en $x=5/2$: la parábola toca el eje x en un solo punto."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="cuadraticas-y-vieta"
      moduloTitulo="Ecuaciones cuadráticas y relaciones de Vieta"
      titulo="Ecuación cuadrática y discriminante"
      posicion="Lámina 1 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/factorizacion-productos-notables", titulo: "Factorización y productos notables" }}
      teAbrePuertaA={{ href: "/laminas/cuadraticas-y-vieta", titulo: "Relaciones de Vieta" }}
    />
  );
}

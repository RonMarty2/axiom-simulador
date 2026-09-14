"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones cúbicas (Vieta extendido)" — módulo "Ecuaciones
// cuadráticas y relaciones de Vieta", 5ta y última de 5.
export default function EcuacionesCubicasVietaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            Vieta no es solo para cuadráticas. Con una ecuación cúbica, tres raíces te regalan tres relaciones, sin resolver nada.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$ax^3+bx^2+cx+d=0$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>3 relaciones gratis</span>
            </div>
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
            Con dos raíces multiplicabas dos paréntesis. Con tres raíces, es el mismo truco, con un paréntesis más.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$(x-r_1)(x-r_2)(x-r_3) = 0$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Al multiplicar los tres, aparecen tres combinaciones distintas de las raíces, una por cada coeficiente.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.6 }}>
            Para <MathText>{"$ax^3+bx^2+cx+d=0$"}</MathText>, comparando coeficiente a coeficiente:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 11.5, color: LIENZO.fgDim }}>suma</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}><MathText>{"$r_1+r_2+r_3 = -\\tfrac{b}{a}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 11.5, color: LIENZO.fgDim }}>suma de a pares</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}><MathText>{"$r_1r_2+r_1r_3+r_2r_3 = \\tfrac{c}{a}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 11.5, color: LIENZO.fgDim }}>producto</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}><MathText>{"$r_1r_2r_3 = -\\tfrac{d}{a}$"}</MathText></span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Las raíces de <MathText>{"$x^3-6x^2+11x-6=0$"}</MathText> son <MathText>{"$1$"}</MathText>, <MathText>{"$2$"}</MathText> y <MathText>{"$3$"}</MathText>. Comprobemos las tres relaciones.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Suma: a=1, b=-6" eq="$1+2+3 = 6 = -(-6)$" />
            <LineaEjemplo glosa="Suma de a pares: c=11" eq={"$1{\\cdot}2+1{\\cdot}3+2{\\cdot}3 = 11$"} />
            <LineaEjemplo glosa="Producto: d=-6" eq={"$1{\\cdot}2{\\cdot}3 = 6 = -(-6)$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: LIENZO.ok }}>Las tres relaciones cierran ✓</span>
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
            Los signos alternan: menos, más, menos. No son todas con el mismo signo que en la cuadrática.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$r_1r_2r_3$", abajo: "$-d/a$" }}
            incorrecto={{ arriba: "$r_1r_2r_3$", abajo: "$d/a$" }}
          />
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La suma de a pares es la única de las tres que NO lleva signo extra: es <MathText>{"$+c/a$"}</MathText> directamente.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Sin resolverla",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Examen UMSS: el producto de las tres raíces de <MathText>{"$6x^3-29x^2+44x-21=0$"}</MathText> es:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=6, d=-21" eq={"$r_1r_2r_3 = -\\dfrac{-21}{6}$"} />
            <LineaEjemplo glosa="" eq={"$r_1r_2r_3 = \\dfrac{21}{6} = \\dfrac{7}{2}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\tfrac{7}{2}$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ni factorizar, ni buscar raíces racionales. Dos coeficientes alcanzan.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Determina la suma de las raíces del polinomio $p(x) = x^3 - 5x^2 - x + 5$."}
          opciones={["$5$", "$7$", "$3$", "$6$", "Ninguno"]}
          correcta={0}
          explicacion={"Por Vieta: suma de raíces $=-b/a$. Acá $a=1,\\ b=-5$, entonces suma $=-(-5)/1=5$."}
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
      titulo="Ecuaciones cúbicas (Vieta extendido)"
      posicion="Lámina 5 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/cuadraticas-y-vieta/relaciones-de-vieta", titulo: "Relaciones de Vieta" }}
      teAbrePuertaA={{ href: "/laminas/sistemas-de-ecuaciones", titulo: "Sistemas de ecuaciones" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Qué es una expresión racional y cómo simplificarla" — módulo
// "Ecuaciones y expresiones racionales", 1ra de 4.
export default function ExpresionRacionalYSimplificacionPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que una fracción con x se simplifica exactamente igual que una fracción de números?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\dfrac{6}{8} = \\dfrac{3}{4}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>=</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\dfrac{x^2-4}{x-2} = x+2$"}</MathText>
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
            Para simplificar <MathText>{"$6/8$"}</MathText>, buscas un factor común en arriba y abajo, y lo cancelas.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$\\dfrac{6}{8} = \\dfrac{2 \\cdot 3}{2 \\cdot 4} = \\dfrac{3}{4}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Una expresión racional es lo mismo, pero arriba y abajo son polinomios en vez de números. El factor común ahora es un polinomio.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Una expresión racional es un cociente de dos polinomios, <MathText>{"$\\dfrac{P(x)}{Q(x)}$"}</MathText>. Hay una condición que nunca se puede saltar:
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$Q(x) \\neq 0$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            No se puede dividir entre cero, ni con números ni con polinomios. Todo valor de <MathText>{"$x$"}</MathText> que anule al denominador queda excluido del dominio.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Simplificar <MathText>{"$\\dfrac{x^2-4}{x-2}$"}</MathText> e indicar el dominio.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Factorizando el numerador (diferencia de cuadrados)" eq="$x^2-4 = (x-2)(x+2)$" />
            <LineaEjemplo glosa="Cancelando el factor común" eq={"$\\dfrac{(x-2)(x+2)}{x-2} = x+2$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x+2$"}</MathText></span>
            <span style={{ fontSize: 13, color: LIENZO.fgDim }}>con <MathText>{"$x \\neq 2$"}</MathText></span>
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
            Solo se cancela lo que multiplica a TODO el numerador y a TODO el denominador. No se puede cancelar un término que está sumando.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\dfrac{x(x+3)}{x}$", abajo: "$x+3$" }}
            incorrecto={{ arriba: "$\\dfrac{x+3}{x}$", abajo: "$3$" }}
          />
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            En el caso de la derecha, la <MathText>{"$x$"}</MathText> del denominador no es un factor del numerador completo. No hay nada para cancelar.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cuando hay que combinar varias",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Simplificar <MathText>{"$E = \\dfrac{3}{2x+2} - \\dfrac{1}{4x-4} - \\dfrac{4}{8-8x^2}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Factorizando cada denominador" eq={"$2x{+}2=2(x{+}1),\\ \\ 4x{-}4=4(x{-}1)$"} />
            <LineaEjemplo glosa="" eq="$8-8x^2=-8(x-1)(x+1)$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Recién ahí, con los tres denominadores factorizados, se puede armar un común denominador y combinar.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = \\dfrac{5}{4(x+1)}$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Simplificar $\\dfrac{x^2-9}{x^2-x-6}$."}
          opciones={["$\\dfrac{x+3}{x+2}$", "$\\dfrac{x+3}{x-2}$", "$\\dfrac{x-3}{x+2}$", "$x+3$", "Ninguno"]}
          correcta={0}
          explicacion={"Factorizando: $x^2-9=(x-3)(x+3)$ y $x^2-x-6=(x-3)(x+2)$. Cancelando el factor común $(x-3)$: $\\dfrac{x+3}{x+2}$, con $x \\neq 3$ y $x \\neq -2$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="ecuaciones-racionales"
      moduloTitulo="Ecuaciones y expresiones racionales"
      titulo="Qué es una expresión racional y cómo simplificarla"
      posicion="Lámina 1 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/factorizacion-productos-notables", titulo: "Factorización y productos notables" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-racionales", titulo: "Ecuaciones racionales" }}
    />
  );
}

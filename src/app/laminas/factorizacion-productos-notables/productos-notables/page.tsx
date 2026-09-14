"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Productos notables" — módulo "Factorización y productos
// notables", 1ra de 3.
export default function ProductosNotablesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes reconocer un binomio al cuadrado escondido en una expresión larga, sin desarrollar nada?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$a^2+2ab+b^2$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$(a+b)^2$"}</MathText>
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
            Ya sabes multiplicar dos binomios término a término. Los productos notables son solo tres resultados que conviene memorizar para no tener que desarrollar cada vez.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$(a\\pm b)^2 = a^2 \\pm 2ab + b^2$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$(a+b)(a-b) = a^2 - b^2$"}</MathText>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Un cuadrado de binomio SIEMPRE tiene tres términos: los dos cuadrados y el doble producto en el medio.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Una diferencia de cuadrados SIEMPRE tiene solo dos términos, sin doble producto: el del medio se cancela.</span>
            </div>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Reconocer cuál patrón aparece te ahorra desarrollar la cuenta entera.
          </p>
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
            Si <MathText>{"$a=1$"}</MathText>, la expresión <MathText>{"$E=\\dfrac{(x-a)^2+2(x^2-a^2)+(x+a)^2}{(x+a)^2-(x-a)^2}$"}</MathText> se reduce a:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Numerador: (x-a)²+(x+a)²=2x²+2a², más 2(x²-a²)" eq={"$4x^2$"} />
            <LineaEjemplo glosa="Denominador: diferencia de cuadrados de (x+a) y (x-a)" eq={"$4ax$"} />
            <LineaEjemplo glosa="E = 4x²/4ax = x/a, con a=1" eq={"$E = x$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = x$"}</MathText></span>
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
            Olvidarse del doble producto del medio, escribiendo <MathText>{"$a^2+b^2$"}</MathText> en vez de <MathText>{"$a^2+2ab+b^2$"}</MathText>, es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(a+b)^2$", abajo: "$a^2+2ab+b^2$" }}
            incorrecto={{ arriba: "$(a+b)^2$", abajo: "$a^2+b^2\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Reconociendo un binomio escondido",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Si <MathText>{"$a+b+c=4$"}</MathText>, hallar <MathText>{"$E$"}</MathText>:
          </p>
          <div style={{ textAlign: "center", padding: "8px 0 12px", overflowX: "auto", fontSize: 14 }}>
            <MathText>{"$E=a^2+a(2b-1)+b^2+b(2c-1)+c^2+c(2a-1)$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Distribuyendo y separando los términos lineales" eq={"$E = (a^2{+}b^2{+}c^2{+}2ab{+}2bc{+}2ca) - (a{+}b{+}c)$"} />
            <LineaEjemplo glosa="El paréntesis grande es (a+b+c)², un producto notable de tres términos" eq={"$E = (a{+}b{+}c)^2 - (a{+}b{+}c) = 4^2 - 4$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>12</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Simplificar: $\\dfrac{(ax+by)^2+(ay-bx)^2}{x^2+y^2}$"}
          opciones={["$x^2+y^2$", "$a^2+b^2$", "$ax+by$", "$ay+by$", "Ninguno"]}
          correcta={1}
          explicacion={"Desarrollando ambos cuadrados, el término cruzado $2abxy$ se cancela entre los dos, y queda $(a^2+b^2)(x^2+y^2)$. Dividiendo entre $x^2+y^2$: $a^2+b^2$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="factorizacion-productos-notables"
      moduloTitulo="Factorización y productos notables"
      titulo="Productos notables"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/factorizacion-productos-notables/factorizacion-basica", titulo: "Factorización: casos básicos" }}
    />
  );
}

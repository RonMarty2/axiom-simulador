"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Reparto proporcional" — módulo "Regla de tres y reparto
// proporcional", 3ra y última de 3. El banco solo tiene reparto
// proporcional DIRECTO ("proporcional a"); no hay preguntas de reparto
// inverso ni compuesto, así que esta lámina se enfoca en el directo.
export default function RepartoProporcionalPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que repartir 738 &quot;en la relación 32 a 9&quot; es en realidad dividir en 41 partes iguales?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$738 \\text{ en } 32{:}9$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$576 \\text{ y } 162$"}</MathText>
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
            Ya sabes que una razón como &quot;32 a 9&quot; se puede escribir con una misma constante <MathText>{"$k$"}</MathText>: las partes son <MathText>{"$32k$"}</MathText> y <MathText>{"$9k$"}</MathText>. Repartir proporcionalmente es hallar ese <MathText>{"$k$"}</MathText>.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$32k + 9k = \\text{total}$"}</MathText>
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>1. Suma</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>las partes de la razón, para saber en cuántas partes iguales se divide el total</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>2. Divide</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>el total entre esa suma: eso vale una &quot;parte&quot; (el valor de <MathText>{"$k$"}</MathText>)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>3. Multiplica</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>cada número de la razón por ese valor: esa es cada porción</span>
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
            Se reparte 738 en forma directamente proporcional a dos cantidades que están en la relación de 32 a 9. Hallar el menor número.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="El total se divide en 32+9=41 partes iguales" eq={"$738 \\div 41 = 18$"} />
            <LineaEjemplo glosa="El menor número corresponde a la menor proporción (9)" eq={"$18 \\times 9 = 162$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>162</span>
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
            Dividir el total entre la CANTIDAD de partes (2, porque son dos números) en vez de entre la SUMA de la razón es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$738 \\div (32{+}9)$", abajo: "$= 18$" }}
            incorrecto={{ arriba: "$738 \\div 2$", abajo: "$= 369\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con una condición extra",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Las edades de Javier, César y Miguel son proporcionales a 2, 3 y 4. Dentro de 9 años sus edades serán proporcionales a 7, 9 y 11. Hallar la edad de Miguel.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Edades hoy: 2k, 3k, 4k. En 9 años, proporcionales a 7, 9, 11" eq={"$\\dfrac{2k+9}{7} = \\dfrac{3k+9}{9}$"} />
            <LineaEjemplo glosa="Multiplicando en cruz" eq={"$9(2k+9) = 7(3k+9) \\ \\Rightarrow\\ k=6$"} />
            <LineaEjemplo glosa="Edad de Miguel hoy" eq={"$4k = 4(6) = 24$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>24 años</span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Acá <MathText>{"$k$"}</MathText> ya no sale de dividir un total: sale de una condición extra del problema. La idea de fondo es la misma.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Un arquitecto gana el doble de un maestro albañil y el triple de su ayudante. Entre los tres perciben 3300 Bs. ¿Cuánto gana el arquitecto?"}
          opciones={["600", "900", "2000", "1800", "Ninguno"]}
          correcta={3}
          explicacion={"Sea $A$ el sueldo del arquitecto: el maestro gana $A/2$ y el ayudante $A/3$. $A+\\dfrac{A}{2}+\\dfrac{A}{3}=3300 \\Rightarrow \\dfrac{11A}{6}=3300 \\Rightarrow A=1800$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="regla-de-tres-y-reparto"
      moduloTitulo="Regla de tres y reparto proporcional"
      titulo="Reparto proporcional"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/regla-de-tres-y-reparto/regla-de-tres-compuesta", titulo: "Regla de tres compuesta" }}
      teAbrePuertaA={{ href: "/laminas/binomio-de-newton", titulo: "Binomio de Newton" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Factorización: casos básicos" — módulo "Factorización y
// productos notables", 2da de 3.
export default function FactorizacionBasicaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que factorizar es simplemente multiplicar al revés?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$ab+ac$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$a(b+c)$"}</MathText>
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
            Ya sabes distribuir: <MathText>{"$a(b+c)=ab+ac$"}</MathText>. Factorizar es reconocer ese patrón al revés, y también reconocer los productos notables de la lámina anterior escritos hacia atrás.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$a^2-b^2 = (a+b)(a-b)$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$a^2\\pm2ab+b^2 = (a\\pm b)^2$"}</MathText>
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 86 }}>Factor común</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>saca lo que se repite en TODOS los términos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 86 }}>Agrupación</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>arma grupos con un factor común cada uno, y saca el que quede en común entre grupos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 86 }}>Trinomio</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>en <MathText>{"$x^2+bx+c$"}</MathText>, busca dos números que sumen <MathText>{"$b$"}</MathText> y multipliquen <MathText>{"$c$"}</MathText></span>
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
          <p style={{ marginBottom: 8, fontSize: 13.5, lineHeight: 1.6 }}>
            Al factorizar el polinomio, la suma de sus 5 factores es:
          </p>
          <div style={{ textAlign: "center", padding: "6px 0 10px", overflowX: "auto", fontSize: 13.5 }}>
            <MathText>{"$4a^3x^2+8a^2x^3-2a^2x-a^3+4ax^4-ax^2$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Agrupando por potencias de a, sale (4x²-1) como factor común" eq={"$(4x^2{-}1)\\left[a^3{+}2a^2x{+}ax^2\\right]$"} />
            <LineaEjemplo glosa="a²+2ax+x²=(a+x)² y 4x²-1=(2x-1)(2x+1)" eq={"$a(2x{-}1)(2x{+}1)(a{+}x)(a{+}x)$"} />
            <LineaEjemplo glosa="Sumando los 5 factores: a, (2x-1), (2x+1), (a+x), (a+x)" eq={"$a + (2x{-}1) + (2x{+}1) + (a{+}x) + (a{+}x)$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$6x + 3a$"}</MathText></span>
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
            Empezar a agrupar o buscar productos notables SIN antes sacar el factor común es el error más frecuente: casi siempre esconde el patrón que buscas.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$4x^2{-}4x$", abajo: "$4x(x{-}1)$" }}
            incorrecto={{ arriba: "$4x^2{-}4x$", abajo: "$\\text{buscar notable directo (mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Diferencia de cuadrados aplicada",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La diferencia de los cuadrados de dos números pares consecutivos es 324. Hallar el número mayor.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="n = mayor, n-2 = menor. n²-(n-2)² es diferencia de cuadrados" eq={"$(n-(n{-}2))(n+(n{-}2)) = 324$"} />
            <LineaEjemplo glosa="" eq={"$2(2n-2) = 324 \\ \\Rightarrow\\ n = 82$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>82</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Simplificar: $\\dfrac{x^3+4x^2+x-6}{x^3+x^2-14x-24}$"}
          opciones={["$x+1$", "$\\dfrac{x-4}{x+1}$", "$\\dfrac{x-1}{x-4}$", "$\\dfrac{x+1}{x+4}$", "Ninguno"]}
          correcta={2}
          explicacion={"Numerador: $x^3+4x^2+x-6=(x-1)(x+2)(x+3)$. Denominador: $x^3+x^2-14x-24=(x+2)(x-4)(x+3)$. Cancelando $(x+2)(x+3)$ en común: $\\dfrac{x-1}{x-4}$."}
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
      titulo="Factorización: casos básicos"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/factorizacion-productos-notables/productos-notables", titulo: "Productos notables" }}
      teAbrePuertaA={{ href: "/laminas/factorizacion-productos-notables/factorizacion-casos-especiales", titulo: "Factorización: casos especiales" }}
    />
  );
}

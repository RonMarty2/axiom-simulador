"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Leyes de exponentes y simplificación de radicales" —
// módulo "Exponentes y radicales: simplificación", única lámina del
// módulo. Enfocada en SIMPLIFICAR expresiones (no en resolver
// ecuaciones exponenciales/irracionales, que ya están cubiertas en
// otros módulos).
export default function LeyesDeExponentesYRadicalesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes simplificar una expresión gigante sacando factor común de una potencia, sin calcular ningún valor numérico?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$2^{n+4}+36\\cdot2^{n-2}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>factor común 2ⁿ</span>
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
            Ya sabes las leyes básicas de exponentes; el truco de esta lámina es usarlas para REDUCIR una expresión larga a algo simple.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$a^m \\cdot a^n = a^{m+n}$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$a^m / a^n = a^{m-n}$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$(a^m)^n = a^{mn}$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$a^{-n} = 1/a^n$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si una misma base aparece con distintos exponentes, saca factor común la potencia MENOR</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Lo que queda son números comunes: suma, resta o divide como siempre</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>La potencia factor común se cancela entre numerador y denominador</span>
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
            El valor de la siguiente expresión es:
          </p>
          <div style={{ textAlign: "center", padding: "6px 0 10px", overflowX: "auto", fontSize: 13.5 }}>
            <MathText>{"$E=\\dfrac{2^{n+4}+36(2^{n-2})}{2^{n+5}-2(2^{n+3})-4(2^{n+1})-6(2^{n-1})}$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Factorizando 2ⁿ en cada término del numerador y denominador" eq={"$\\dfrac{(16+9)\\cdot2^n}{(32-16-8-3)\\cdot2^n}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>5</span>
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
            Confundir exponente negativo con signo negativo (creer que <MathText>{"$a^{-n}=-a^n$"}</MathText>) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$2^{-3}$", abajo: "$= \\dfrac{1}{8}$" }}
            incorrecto={{ arriba: "$2^{-3}$", abajo: "$= -8\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Simplificando radicales",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La misma idea de &quot;sacar factor común&quot; aplica a radicales: extraé los cuadrados perfectos escondidos y agrupa los términos semejantes.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="2a√(50b²c) = 2a·5b√(2c)" eq={"$10ab\\sqrt{2c}$"} />
            <LineaEjemplo glosa="5c√(27a²b) = 5c·3a√(3b)" eq={"$15ac\\sqrt{3b}$"} />
            <LineaEjemplo glosa="Agrupando todos los términos semejantes del enunciado completo" eq={"$16ac\\sqrt{3b} - 2ab\\sqrt{2c}$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$16ac\\sqrt{3b} - 2ab\\sqrt{2c}$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Racionalizar, simplificar y hallar el valor de $E=\\dfrac{1}{\\sqrt2+1}+\\dfrac{2}{\\sqrt3-1}-\\dfrac{1}{\\sqrt3+\\sqrt2}$."}
          opciones={["$\\sqrt3$", "$-2$", "$2\\sqrt2$", "$\\sqrt2$", "Ninguno"]}
          correcta={2}
          explicacion={"Racionalizando cada término con su conjugado: $\\dfrac{1}{\\sqrt2+1}=\\sqrt2-1$; $\\dfrac{2}{\\sqrt3-1}=\\sqrt3+1$; $\\dfrac{1}{\\sqrt3+\\sqrt2}=\\sqrt3-\\sqrt2$. Sumando: $(\\sqrt2-1)+(\\sqrt3+1)-(\\sqrt3-\\sqrt2)=2\\sqrt2$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="exponentes-y-radicales"
      moduloTitulo="Exponentes y radicales: simplificación"
      titulo="Leyes de exponentes y simplificación de radicales"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/problemas-de-moviles", titulo: "Problemas de móviles" }}
    />
  );
}

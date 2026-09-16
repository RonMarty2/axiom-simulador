"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Cambio de base" — módulo "Logaritmos y exponenciales", 3ra
// de 8.
export default function CambioDeBasePage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes convertir un logaritmo de cualquier base a otra base que te convenga?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\log_{16}(x)$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\dfrac{\\log_2(x)}{4}$"}</MathText>
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
            Ya sabes que <MathText>{"$\\log_b(b^n)=n$"}</MathText>. La fórmula de cambio de base es una generalización de esa misma idea.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\log_b(x) = \\dfrac{\\log_c(x)}{\\log_c(b)}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            <MathText>{"$c$"}</MathText> puede ser CUALQUIER base que te convenga.
          </p>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si las bases son potencias de un mismo número, convierte todo a esa base común</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}><MathText>{"$\\log_{b^n}(x)=\\dfrac{\\log_b(x)}{n}$"}</MathText>: dividir entre el exponente de la base</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Suma/opera los términos ya en la misma base</span>
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
            Determinar el valor de &quot;x&quot; en: <MathText>{"$\\log_{16}(x)+\\log_4(x)+\\log_2(x)=7$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Todo en base 2: 16=2⁴, 4=2²" eq={"$\\dfrac{\\log_2 x}{4} + \\dfrac{\\log_2 x}{2} + \\log_2 x = 7$"} />
            <LineaEjemplo glosa="Sacando factor común log₂(x)" eq={"$\\log_2(x)\\times\\dfrac74 = 7 \\ \\Rightarrow\\ \\log_2(x)=4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>x = 16</span>
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
            Dividir entre la base en vez de entre el EXPONENTE de la base común es el error más común: <MathText>{"$16=2^4$"}</MathText>, así que se divide entre 4, no entre 16.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\log_{16}(x)$", abajo: "$\\log_2(x)/4$" }}
            incorrecto={{ arriba: "$\\log_{16}(x)$", abajo: "$\\log_2(x)/16\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con logaritmos anidados",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Determinar el valor de <MathText>{"$P = \\dfrac{1}{1+\\log_a bc} + \\dfrac{1}{1+\\log_b ac} + \\dfrac{1}{1+\\log_c ab}$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="1=log_a(a), entonces 1+log_a(bc)=log_a(abc), y así con los otros dos" eq={"$P = \\dfrac{1}{\\log_a(abc)} + \\dfrac{1}{\\log_b(abc)} + \\dfrac{1}{\\log_c(abc)}$"} />
            <LineaEjemplo glosa="Cambio de base: 1/log_a(N)=log_N(a)" eq={"$P = \\log_{abc}a + \\log_{abc}b + \\log_{abc}c = \\log_{abc}(abc)$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>P = 1</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Sabiendo que $\\log_a(\\log_a b)-\\log_a(\\log_a c)=1$, calcular $E=\\log_a(\\log_b a)-\\log_a(\\log_c a)$."}
          opciones={["-1", "1", "2", "0", "Ninguno"]}
          correcta={0}
          explicacion={"Sea $X=\\log_a b$, $Y=\\log_a c$. El dato da $\\log_a(X/Y)=1 \\Rightarrow X/Y=a$. Como $\\log_b a=1/X$ y $\\log_c a=1/Y$: $E=\\log_a(Y/X)=\\log_a(1/a)=-1$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="logaritmos-y-exponenciales"
      moduloTitulo="Logaritmos y exponenciales"
      titulo="Cambio de base"
      posicion="Lámina 3 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/propiedades-de-logaritmos", titulo: "Propiedades de los logaritmos" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-exponenciales", titulo: "Ecuaciones exponenciales" }}
    />
  );
}

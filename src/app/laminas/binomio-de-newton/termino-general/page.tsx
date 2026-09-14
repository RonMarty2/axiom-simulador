"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Término general" — módulo "Binomio de Newton", 2da de 3.
export default function TerminoGeneralPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes hallar el término número 100 de un desarrollo sin escribir los 99 anteriores?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>&quot;el 6to término&quot;</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$k=5$"}</MathText>
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
            Ya conoces la fórmula del término general: <MathText>{"$T_{k+1}=\\binom{n}{k}a^{n-k}b^k$"}</MathText>. Lo único nuevo acá es leer bien el subíndice.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$T_1 \\to k{=}0 \\qquad T_2 \\to k{=}1 \\qquad T_3 \\to k{=}2$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El término que ocupa la posición <MathText>{"$p$"}</MathText> siempre tiene <MathText>{"$k=p-1$"}</MathText>.
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Convierte &quot;posición <MathText>{"$p$"}</MathText>&quot; en <MathText>{"$k=p-1$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Reemplaza <MathText>{"$k$"}</MathText> en <MathText>{"$T_{k+1}=\\binom{n}{k}a^{n-k}b^k$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Simplifica el número combinatorio, la potencia numérica y las variables por separado</span>
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
            Encontrar el cuarto término del desarrollo de <MathText>{"$\\left(\\dfrac{x}{2}-\\dfrac{2}{x}\\right)^6$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Cuarto término → k=3" eq={"$T_4 = \\binom{6}{3}\\left(\\dfrac{x}{2}\\right)^{3}\\left(-\\dfrac{2}{x}\\right)^{3}$"} />
            <LineaEjemplo glosa="" eq={"$T_4 = 20 \\cdot \\dfrac{x^3}{8} \\cdot \\left(-\\dfrac{8}{x^3}\\right) = 20\\times(-1)$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>−20</span>
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
            Usar <MathText>{"$k=4$"}</MathText> para el &quot;cuarto término&quot; (en vez de <MathText>{"$k=3$"}</MathText>) es el error más común: el primer término ya usa <MathText>{"$k=0$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{4to término}$", abajo: "$k=3$" }}
            incorrecto={{ arriba: "$\\text{4to término}$", abajo: "$k=4\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Al revés: hallar n",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            En el binomio <MathText>{"$\\left(\\sqrt{x}+\\dfrac{1}{\\sqrt[3]{x}}\\right)^n$"}</MathText>, determine <MathText>{"$n$"}</MathText> sabiendo que el séptimo término es de primer grado.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Séptimo término → k=6. Exponente de x del término general" eq={"$\\dfrac{n-6}{2} - \\dfrac{6}{3} = 1$"} />
            <LineaEjemplo glosa="" eq={"$\\dfrac{n-6}{2} = 3 \\ \\Rightarrow\\ n = 12$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>n = 12</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"El sexto término (contando de izquierda a derecha) en el desarrollo de $\\dfrac{x^{50}-y^{30}}{x^5-y^3}$ es igual a:"}
          opciones={["$x^{20}y^{15}$", "$x^{22}y^{15}$", "$x^{20}y^{17}$", "$x^{15}y^{18}$", "Ninguno"]}
          correcta={0}
          explicacion={"Con $a=x^5$, $b=y^3$: $\\dfrac{a^{10}-b^{10}}{a-b}=\\sum_{k=0}^{9}a^{9-k}b^k$. El sexto término es $k=5$: $x^{5(9-5)}y^{3(5)}=x^{20}y^{15}$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="binomio-de-newton"
      moduloTitulo="Binomio de Newton"
      titulo="Término general"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/binomio-de-newton/que-es-el-binomio-de-newton", titulo: "Qué es y coeficientes binomiales" }}
      teAbrePuertaA={{ href: "/laminas/binomio-de-newton/termino-independiente-o-central", titulo: "Término independiente / central" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Término independiente / central" — módulo "Binomio de
// Newton", 3ra y última de 3.
export default function TerminoIndependienteOCentralPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que en un desarrollo binomial hay un único término &quot;sin x&quot;, y puedes encontrarlo directo?
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>exponente de x = 0 → independiente</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>término del medio → central</span>
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
            Ya sabes armar el término general <MathText>{"$T_{k+1}=\\binom{n}{k}a^{n-k}b^k$"}</MathText> y despejar su exponente de <MathText>{"$x$"}</MathText>. Ahora, en vez de fijar <MathText>{"$k$"}</MathText>, fijas una CONDICIÓN sobre ese exponente.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Independiente: exponente de <MathText>{"$x$"}</MathText> = 0
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Central: con <MathText>{"$n$"}</MathText> par hay <MathText>{"$n{+}1$"}</MathText> términos (impar), y el del medio es único
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90 }}>Independiente</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>arma el exponente de <MathText>{"$x$"}</MathText> en función de <MathText>{"$k$"}</MathText>, igualalo a 0 y despeja <MathText>{"$k$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90 }}>Central</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>con <MathText>{"$n$"}</MathText> par, el término del medio es el <MathText>{"$\\left(\\frac{n}{2}+1\\right)$"}</MathText>-ésimo, o sea <MathText>{"$k=\\frac{n}{2}$"}</MathText></span>
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
            Hallar el término independiente de <MathText>{"$x$"}</MathText> en el desarrollo de <MathText>{"$\\left(2x^2+\\dfrac{1}{4x^8}\\right)^{15}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Exponente de x del término general: 2(15-k) - 8k" eq={"$30 - 10k = 0 \\ \\Rightarrow\\ k = 3$"} />
            <LineaEjemplo glosa="Coeficiente con k=3" eq={"$\\binom{15}{3}\\dfrac{2^{12}}{4^3} = 455 \\times 64$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>29120</span>
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
            Olvidarse del signo negativo dentro del paréntesis, como en <MathText>{"$(-2)^k$"}</MathText>, es el error más común: si <MathText>{"$k$"}</MathText> es par el signo queda positivo, pero si es impar queda negativo.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(-2)^6$", abajo: "$= 64$" }}
            incorrecto={{ arriba: "$(-2)^6$", abajo: "$= -64\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "El término central",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Hallar el término central del desarrollo del binomio <MathText>{"$\\left(\\sqrt{y}-\\dfrac{1}{y^3}\\right)^8$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="n=8 par → 9 términos → el central es el 5to, k=4" eq={"$T_5 = \\binom{8}{4}(\\sqrt{y})^{4}\\left(-\\dfrac{1}{y^3}\\right)^{4}$"} />
            <LineaEjemplo glosa="Exponente de y: (8-4)/2 - 3(4)" eq={"$= 2 - 12 = -10$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$70y^{-10}$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar el término independiente en el desarrollo del binomio: $\\left(x^2-\\dfrac{2}{x}\\right)^9$"}
          opciones={["$t_i=3576$", "$t_i=5367$", "$t_i=6357$", "$t_i=5376$", "Ninguno"]}
          correcta={3}
          explicacion={"$T_{k+1}=\\binom{9}{k}(-2)^k x^{18-3k}$. Independiente: $18-3k=0 \\Rightarrow k=6$. $\\binom{9}{6}=84$, $(-2)^6=64$ (par, positivo). $84\\times64=5376$."}
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
      titulo="Término independiente / central"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/binomio-de-newton/termino-general", titulo: "Término general" }}
      teAbrePuertaA={{ href: "/laminas/funciones-racionales", titulo: "Funciones racionales" }}
    />
  );
}

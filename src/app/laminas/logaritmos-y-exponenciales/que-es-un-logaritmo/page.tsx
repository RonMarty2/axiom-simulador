"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "¿Qué es un logaritmo?" — módulo "Logaritmos y
// exponenciales", 1ra de 8.
export default function QueEsUnLogaritmoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un logaritmo es simplemente la pregunta &quot;¿a qué exponente hay que elevar la base?&quot;?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$2^3=8$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\log_2 8 = 3$"}</MathText>
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
            Ya sabes que una potencia relaciona base, exponente y resultado. El logaritmo es esa misma relación, pero despejando el exponente.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\log_b(N) = k \\ \\Longleftrightarrow\\ b^k = N$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La base <MathText>{"$b$"}</MathText> debe ser positiva y distinta de 1.
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Escribe el argumento como una potencia de la misma base</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El logaritmo es directamente ese exponente: <MathText>{"$\\log_b(b^n)=n$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Recuerda los casos especiales: <MathText>{"$\\log_b(1)=0$"}</MathText> y <MathText>{"$\\log_b(b)=1$"}</MathText></span>
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
            Determinar el valor de: <MathText>{"$E=\\log_4(16)+\\log_4\\left(\\dfrac14\\right)+\\log_4(1)$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="16=4², 1/4=4⁻¹, log de 1 es siempre 0" eq={"$E = 2 + (-1) + 0$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>1</span>
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
            Olvidarse de que <MathText>{"$\\log_b(1)=0$"}</MathText> SIEMPRE, sin importar la base, es el error más común: cualquier base elevada a 0 da 1.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\log_4(1)$", abajo: "$= 0$" }}
            incorrecto={{ arriba: "$\\log_4(1)$", abajo: "$= 1\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con dos ecuaciones logarítmicas",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Si <MathText>{"$\\log_{a-1}(x+1)=1$"}</MathText> y <MathText>{"$\\log_{x+2}(x+8)=2$"}</MathText>, hallar <MathText>{"$a+x$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Aplicando la definición a cada ecuación" eq={"$a-1 = x+1 \\qquad (x+2)^2 = x+8$"} />
            <LineaEjemplo glosa="La segunda da x=1 ó x=-4; se descarta x=-4 (base negativa inválida)" eq={"$x = 1 \\ \\Rightarrow\\ a = 3$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>a + x = 4</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Cuál de las siguientes afirmaciones es FALSA?"}
          opciones={[
            "En todo sistema el logaritmo de la unidad es igual a cero",
            "La base de un sistema de logaritmos no puede ser negativa",
            "Si la razón es mayor que la unidad entonces la progresión geométrica es creciente",
            "Si la razón es positiva entonces la progresión aritmética es creciente",
          ]}
          correcta={2}
          explicacion={"A, B y D son ciertas. C es falsa: si $r>1$ pero el primer término es negativo (ej. $a_1=-1, r=2$: $-1,-2,-4,-8,...$), la progresión en realidad decrece."}
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
      titulo="¿Qué es un logaritmo?"
      posicion="Lámina 1 de 8"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/propiedades-de-logaritmos", titulo: "Propiedades de los logaritmos" }}
    />
  );
}

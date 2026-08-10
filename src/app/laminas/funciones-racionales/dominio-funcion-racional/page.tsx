"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Dominio de funciones racionales" — módulo "Funciones
// racionales", 1ra de 2. El banco no tiene un ejemplo "limpio" de
// dominio de p(x)/q(x) sin radicales; las dos preguntas usadas
// combinan la fracción con una raíz, así que el ejercicio de
// "Practicalo vos" es autoría propia (documentado acá) para cubrir el
// caso más simple y directo del tema.
export default function DominioFuncionRacionalPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que el dominio de una función racional es &quot;todos los reales, menos los que la rompen&quot;?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\text{denominador} = 0$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.bad}15`, border: `1.5px solid ${LIENZO.bad}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>se excluye del dominio</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya sabés",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ya sabés que dividir entre cero no existe. Una función racional es una fracción de polinomios, así que el dominio es todo <MathText>{"$\\mathbb{R}$"}</MathText> excepto donde el denominador se anula.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$f(x)=\\dfrac{1}{x-3}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            <MathText>{"$x=3$"}</MathText> anula el denominador, así que el dominio es <MathText>{"$\\mathbb{R} \\setminus \\{3\\}$"}</MathText>.
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Igualá el denominador a cero: <MathText>{"$q(x)=0$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resolvé esa ecuación: esas raíces se EXCLUYEN</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si además hay una raíz en el numerador o denominador, sumá esa condición (el radicando <MathText>{"$\\geq 0$"}</MathText>, o <MathText>{"$> 0$"}</MathText> si está abajo)</span>
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
            Hallar el dominio de la función <MathText>{"$f(x)=\\dfrac{\\sqrt{x}}{2x^2+x-1}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="La raíz del numerador exige x≥0" eq={"$x \\geq 0$"} />
            <LineaEjemplo glosa="El denominador no puede anularse" eq={"$2x^2+x-1=0 \\ \\Rightarrow\\ x=\\dfrac12 \\text{ o } x=-1$"} />
            <LineaEjemplo glosa="Solo x=1/2 cae dentro de x≥0; se excluye" eq={"$[0,\\infty) \\setminus \\left\\{\\dfrac12\\right\\}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\left[0,\\dfrac12\\right[ \\cup \\left]\\dfrac12,\\infty\\right[$"}</MathText></span>
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
            Buscar los ceros del NUMERADOR en vez del denominador es el error más común: los ceros del numerador dan raíces de la función (donde vale 0), no restricciones de dominio.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$q(x)=0$", abajo: "$\\text{se excluye}$" }}
            incorrecto={{ arriba: "$p(x)=0$", abajo: "$\\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con una raíz en el denominador",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Hallar el dominio de la función: <MathText>{"$f(x)=\\dfrac{2x-2}{\\sqrt{15-x-6x^2}}$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Si la raíz está en el denominador, el radicando debe ser ESTRICTAMENTE positivo" eq={"$15-x-6x^2 > 0 \\ \\Leftrightarrow\\ 6x^2+x-15 < 0$"} />
            <LineaEjemplo glosa="Raíces: x=3/2 y x=-5/3, parábola hacia arriba → negativa entre medio" eq={"$-\\dfrac53 < x < \\dfrac32$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$-\\dfrac53 < x < \\dfrac32$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar el dominio de $f(x)=\\dfrac{x+1}{x^2-9}$."}
          opciones={["$\\mathbb{R}\\setminus\\{3,-3\\}$", "$\\mathbb{R}\\setminus\\{-1\\}$", "$\\mathbb{R}\\setminus\\{3\\}$", "$\\mathbb{R}\\setminus\\{9\\}$", "Ninguno"]}
          correcta={0}
          explicacion={"El denominador se anula en $x^2-9=0 \\Rightarrow x=\\pm3$. El numerador no impone restricciones (no es una raíz de x). Dominio: $\\mathbb{R}\\setminus\\{3,-3\\}$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="funciones-racionales"
      moduloTitulo="Funciones racionales"
      titulo="Dominio de funciones racionales"
      posicion="Lámina 1 de 2"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/funciones-racionales/asintotas", titulo: "Asíntotas" }}
    />
  );
}

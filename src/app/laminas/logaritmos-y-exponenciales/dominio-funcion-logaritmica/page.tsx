"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Dominio de funciones logarítmicas" — módulo "Logaritmos y
// exponenciales", 7ma de 8.
export default function DominioFuncionLogaritmicaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un logaritmo nunca puede &quot;ver&quot; un número negativo, ni siquiera el cero?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\text{argumento} \\leq 0$"}</MathText>
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
            Ya sabés que el logaritmo solo está definido para argumentos positivos. Para hallar el dominio de <MathText>{"$f(x)=\\log_b(g(x))$"}</MathText>, esa es la única condición a plantear.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\log_b(g(x)) \\ \\text{definido} \\ \\Longleftrightarrow\\ g(x) > 0$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Planteá el argumento ESTRICTAMENTE mayor a cero</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resolvé esa inecuación (lineal, cuadrática o racional)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si hay varios logaritmos, el dominio es la INTERSECCIÓN de todas las condiciones</span>
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
            Determine el dominio de la función <MathText>{"$f(x)=\\ln(4x-x^2)$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="El argumento debe ser positivo" eq={"$4x-x^2 > 0$"} />
            <LineaEjemplo glosa="Factorizando: x(4-x)>0, positiva entre las raíces 0 y 4" eq={"$0 < x < 4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>(0, 4)</span>
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
            Usar <MathText>{"$\\geq$"}</MathText> en vez de <MathText>{"$>$"}</MathText> es el error más común: el logaritmo no está definido en cero, así que los extremos del intervalo SIEMPRE quedan abiertos.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$4x-x^2>0$", abajo: "$(0,4)\\ \\text{abierto}$" }}
            incorrecto={{ arriba: "$4x-x^2\\geq0$", abajo: "$[0,4]\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con dos logaritmos",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Un subconjunto del dominio de <MathText>{"$f(x)=\\log_3 x(x-5)-\\log_3\\dfrac{x+3}{x-3}$"}</MathText> es:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Primer argumento positivo" eq={"$x(x-5)>0 \\ \\Rightarrow\\ x<0 \\text{ o } x>5$"} />
            <LineaEjemplo glosa="Segundo argumento positivo" eq={"$\\dfrac{x+3}{x-3}>0 \\ \\Rightarrow\\ x<-3 \\text{ o } x>3$"} />
            <LineaEjemplo glosa="Intersección de ambas condiciones" eq={"$(-\\infty,-3) \\cup (5,\\infty)$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>(5, ∞)</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar el dominio de la función: $\\log\\left(\\dfrac{3}{x}-1\\right)$"}
          opciones={["$0\\leq x\\leq3$", "$x>0$", "$x>3$", "$0<x<3$", "Ninguno"]}
          correcta={3}
          explicacion={"El argumento debe ser positivo: $\\dfrac3x-1>0 \\Rightarrow \\dfrac{3-x}{x}>0$. Esto se cumple cuando numerador y denominador tienen el mismo signo, es decir $0<x<3$."}
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
      titulo="Dominio de funciones logarítmicas"
      posicion="Lámina 7 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-logaritmicas-complejas", titulo: "Ecuaciones logarítmicas complejas" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/crecimiento-y-decaimiento", titulo: "Aplicaciones: crecimiento y decaimiento" }}
    />
  );
}

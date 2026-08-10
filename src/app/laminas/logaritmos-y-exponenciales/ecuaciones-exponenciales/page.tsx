"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones exponenciales" — módulo "Logaritmos y
// exponenciales", 4ta de 8.
export default function EcuacionesExponencialesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que si dos potencias de la misma base son iguales, sus exponentes también lo son?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$7^{a}=7^{b}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$a = b$"}</MathText>
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
            Ya sabés escribir un número como potencia de otro (por ejemplo <MathText>{"$49=7^2$"}</MathText>). En una ecuación exponencial, el objetivo es dejar ambos lados con la MISMA base.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$a^x = a^y \\ \\Longleftrightarrow\\ x = y$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Escribí todas las potencias en una misma base</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Igualá los exponentes y resolvé la ecuación resultante</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si aparecen dos términos con el mismo exponente variable, probá sustituir <MathText>{"$y=a^x$"}</MathText></span>
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
            Hallar &quot;x&quot;: <MathText>{"$7^{3x+4}=49^{2x-3}$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="49=7², distribuyendo el exponente" eq={"$7^{3x+4} = 7^{2(2x-3)} = 7^{4x-6}$"} />
            <LineaEjemplo glosa="Misma base: igualo exponentes" eq={"$3x+4 = 4x-6$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>x = 10</span>
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
            Olvidarse de DISTRIBUIR el exponente exterior al reescribir la base es el error más común: <MathText>{"$49^{2x-3}=7^{2(2x-3)}$"}</MathText>, no <MathText>{"$7^{2x-3}$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$49^{2x-3}=7^{?}$", abajo: "$7^{2(2x-3)}$" }}
            incorrecto={{ arriba: "$49^{2x-3}=7^{?}$", abajo: "$7^{2x-3}\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con sustitución",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Resolver: <MathText>{"$25^x+5^{x+1}=750$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="25^x=(5^x)², 5^(x+1)=5·5^x. Con y=5^x" eq={"$y^2+5y-750=0$"} />
            <LineaEjemplo glosa="La raíz negativa y=-30 se descarta (5^x>0)" eq={"$y=25 \\ \\Rightarrow\\ 5^x=5^2$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>x = 2</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver la ecuación exponencial: $7(3^{x+1})-5^{x+2}=3^{x+4}-5^{x+3}$"}
          opciones={["2", "-1", "1", "-2", "Ninguno"]}
          correcta={1}
          explicacion={"Reagrupando: $7\\cdot3^{x+1}-3^{x+4}=5^{x+2}-5^{x+3}$. Factorizando: $-20\\cdot3^{x+1}=-4\\cdot5^{x+2} \\Rightarrow 3^{x+1}=5^{x+1}$. Como las bases son distintas, el exponente debe ser 0: $x+1=0 \\Rightarrow x=-1$."}
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
      titulo="Ecuaciones exponenciales"
      posicion="Lámina 4 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/cambio-de-base", titulo: "Cambio de base" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-logaritmicas-simples", titulo: "Ecuaciones logarítmicas simples" }}
    />
  );
}

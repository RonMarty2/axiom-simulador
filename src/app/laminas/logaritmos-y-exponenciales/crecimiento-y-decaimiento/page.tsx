"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Aplicaciones: crecimiento y decaimiento" — módulo "Logaritmos
// y exponenciales", 8va y última de 8.
export default function CrecimientoYDecaimientoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que poblaciones, intereses y enfriamientos comparten la MISMA fórmula exponencial?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$A=P\\,e^{rt}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>despejar t pide ln</span>
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
            Ya sabes despejar una exponencial aplicando logaritmo natural en ambos lados. Estos problemas solo aplican esa idea a una fórmula con sentido físico.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$A = P\\,e^{rt} \\ \\Longrightarrow\\ t = \\dfrac{\\ln(A/P)}{r}$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identifica el valor inicial, la tasa y lo que preguntan</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aisla la exponencial y aplica ln en ambos lados</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si hay una temperatura ambiente (enfriamiento), restala ANTES de aislar la exponencial</span>
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
            La población de una ciudad fue 112000 en 1998 y crece a una tasa relativa del 4% anual. ¿En qué año llega a 200000?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Modelo de crecimiento exponencial continuo" eq={"$200000 = 112000\\,e^{0.04t}$"} />
            <LineaEjemplo glosa="Aplicando ln en ambos lados" eq={"$t = \\dfrac{\\ln(25/14)}{0.04} \\approx 14{,}5$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>año 2012</span>
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
            Olvidarse de dividir entre la tasa <MathText>{"$r$"}</MathText> después de aplicar el logaritmo es el error más común: el ln solo baja el exponente, no despeja <MathText>{"$t$"}</MathText> por sí solo.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$e^{0.04t}=\\frac{25}{14}$", abajo: "$t=\\ln(25/14)/0.04$" }}
            incorrecto={{ arriba: "$e^{0.04t}=\\frac{25}{14}$", abajo: "$t=\\ln(25/14)\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Interés compuesto continuo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Se invierten $1000 al 4% anual, capitalizado en forma continua (<MathText>{"$A=Pe^{rt}$"}</MathText>). ¿Cuánto tiempo tarda en llegar a $4000?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Aislando la exponencial" eq={"$4000=1000e^{0.04t} \\ \\Rightarrow\\ 4=e^{0.04t}$"} />
            <LineaEjemplo glosa="Aplicando ln en ambos lados" eq={"$\\ln4 = 0.04t$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$t = 25\\ln4$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Una taza de café a 200°F se coloca en un ambiente de 70°F. Si $T=70+150e^{-0.05x}$, hallar el instante $x$ en que $T=100$°F."}
          opciones={["$20\\ln(5)$", "$20\\ln(1/5)$", "$70\\ln(1/5)$", "$70\\ln(5)$", "Ninguno"]}
          correcta={0}
          explicacion={"$100=70+150e^{-0.05x} \\Rightarrow e^{-0.05x}=1/5$. Aplicando ln: $-0.05x=\\ln(1/5)=-\\ln5 \\Rightarrow x=\\dfrac{\\ln5}{0.05}=20\\ln5$."}
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
      titulo="Aplicaciones: crecimiento y decaimiento"
      posicion="Lámina 8 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/dominio-funcion-logaritmica", titulo: "Dominio de funciones logarítmicas" }}
      teAbrePuertaA={{ href: "/laminas/progresiones/progresion-aritmetica", titulo: "Progresión aritmética" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Qué es un polinomio: grado absoluto y relativo" — módulo
// "Polinomios: grado y definiciones", única lámina del módulo.
export default function QueEsUnPolinomioPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un mismo término tiene DOS grados distintos: uno absoluto y uno para cada variable?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$3x^2y^3$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>absoluto 5, relativo a x: 2</span>
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
            Ya sabes que un polinomio es una suma de términos con exponentes enteros no negativos. El grado mide &quot;qué tan grande&quot; es cada término.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Grado ABSOLUTO de un término: suma de todos sus exponentes
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Grado RELATIVO a una variable: el exponente de esa variable sola
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Calcula el grado absoluto de CADA término (sumando exponentes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El grado absoluto DEL POLINOMIO es el MAYOR entre todos los términos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El grado relativo a una variable es el MAYOR exponente de esa variable, entre todos los términos</span>
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
            El polinomio de grado absoluto 11, con diferencia 7 entre el grado relativo a <MathText>{"$x$"}</MathText> y el relativo a <MathText>{"$y$"}</MathText>:
          </p>
          <div style={{ textAlign: "center", padding: "6px 0 10px", overflowX: "auto", fontSize: 14 }}>
            <MathText>{"$P(x,y)=2x^{n+3}y^{m-2} - 4x^{n+2}y^{m-3} + 3$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Grado absoluto = mayor suma de exponentes: n+m+1=11" eq={"$n + m = 10$"} />
            <LineaEjemplo glosa="Grado rel. x=n+3, grado rel. y=m-2; su diferencia es 7" eq={"$(n+3)-(m-2) = 7 \\ \\Rightarrow\\ n-m = 2$"} />
            <LineaEjemplo glosa="Resolviendo el sistema: n=6, m=4" eq={"$\\text{grado relativo a } x = n+3 = 9$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>9</span>
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
            Confundir grado absoluto (suma de TODOS los exponentes) con grado relativo (el exponente de UNA sola variable) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$3x^2y^3$", abajo: "$\\text{gr. absoluto} = 2+3 = 5$" }}
            incorrecto={{ arriba: "$3x^2y^3$", abajo: "$\\text{gr. absoluto} = 2\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Polinomio homogéneo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            En un polinomio homogéneo, TODOS los términos tienen el mismo grado absoluto. Calcular la suma de coeficientes de <MathText>{"$P(x,y)$"}</MathText>:
          </p>
          <div style={{ textAlign: "center", padding: "6px 0 12px", overflowX: "auto", fontSize: 13.5 }}>
            <MathText>{"$P(x,y)=3px^{n^2-5}y^{12}+5(p-q)x^py^q+(13q+4)x^{n^2}y^{3n-14}$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Igualando grados del 1er y 3er término: n²+7=n²+3n-14" eq={"$n = 7 \\ \\Rightarrow\\ \\text{grado} = 56 \\ \\Rightarrow\\ p+q=56$"} />
            <LineaEjemplo glosa="Suma de coeficientes: evaluar en x=1, y=1" eq={"$3p+5(p-q)+(13q+4) = 8(p+q)+4 = 452$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>452</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Calcular $m$ para que $P=3x^{m+1}y^{n-3}+7x^{m+2}y^{n-1}+11x^{m+3}y^{n-2}$ tenga grado absoluto 8 y grado relativo a $y$ igual a 5."}
          opciones={["1", "6", "7", "5", "Ninguno"]}
          correcta={0}
          explicacion={"Grados absolutos: $m+n-2$, $m+n+1$, $m+n+1$; el mayor es $m+n+1=8 \\Rightarrow m+n=7$. Grado relativo a $y$: mayor exponente entre $n-3,n-1,n-2$ es $n-1=5 \\Rightarrow n=6$. Entonces $m=7-6=1$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="polinomios-grado"
      moduloTitulo="Polinomios: grado y definiciones"
      titulo="Qué es un polinomio: grado absoluto y relativo"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/problemas-de-cifras", titulo: "Problemas de cifras y dígitos" }}
    />
  );
}

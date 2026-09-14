"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Asíntotas" — módulo "Funciones racionales", 2da y última de
// 2. El banco solo tiene preguntas de asíntota OBLICUA (grado del
// numerador = grado del denominador + 1); no hay ninguna de asíntota
// horizontal pura, así que esa clasificación general se explica como
// teoría (Puente) pero los ejemplos con "Examen UMSS" son todos de
// oblicua, tal como aparecen en el banco real.
export default function AsintotasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que lejos del cero, una función racional se parece cada vez más a una recta?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$x \\to \\pm\\infty$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>se pega a una recta</span>
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
            Ya sabes que los ceros del denominador dan las asíntotas VERTICALES (son el dominio excluido, vistas &quot;de costado&quot;). Comparando los grados de numerador y denominador salen las otras:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              grado(num) <MathText>{"$<$"}</MathText> grado(den) → horizontal <MathText>{"$y=0$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              grado(num) = grado(den) → horizontal <MathText>{"$y=\\frac{a}{b}$"}</MathText> (cociente de coeficientes principales)
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              grado(num) = grado(den)+1 → asíntota OBLICUA
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace (oblicua)",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Divide el numerador entre el denominador (división de polinomios)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El COCIENTE (sin el resto) es la recta de la asíntota</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El resto, dividido entre el denominador, tiende a 0 cuando <MathText>{"$x\\to\\pm\\infty$"}</MathText></span>
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
            Hallar la asíntota oblicua de la función <MathText>{"$f(x)=\\dfrac{x^2-2x-8}{x}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Dividiendo cada término entre x" eq={"$f(x) = x - 2 - \\dfrac{8}{x}$"} />
            <LineaEjemplo glosa="Cuando x→±∞, el término -8/x tiende a 0" eq={"$y = x - 2$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$y = x - 2$"}</MathText></span>
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
            Incluir el resto de la división como si fuera parte de la asíntota es el error más común: la asíntota es solo el cociente, el resto es justamente lo que desaparece.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$f(x)=x-2-\\dfrac{8}{x}$", abajo: "$y=x-2$" }}
            incorrecto={{ arriba: "$f(x)=x-2-\\dfrac{8}{x}$", abajo: "$y=x-2-\\dfrac{8}{x}\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Evaluando la asíntota",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La función <MathText>{"$y=\\dfrac{x^2-4x-5}{x-3}$"}</MathText> tiene una asíntota inclinada. El valor que toma dicha asíntota para <MathText>{"$x=5$"}</MathText> es:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Dividiendo el polinomio" eq={"$y = (x-1) - \\dfrac{8}{x-3}$"} />
            <LineaEjemplo glosa="La asíntota es y=x-1, evaluada en x=5" eq={"$y_{asíntota} = 5 - 1$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>4</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"La ordenada donde cortan la asíntota vertical positiva a la asíntota inclinada de $f(x)=\\dfrac{x^3+2x^2-2x+1}{x^2-4}$ es:"}
          opciones={["2", "-2", "4", "-4", "Ninguno"]}
          correcta={2}
          explicacion={"Asíntota vertical positiva: $x^2-4=0 \\Rightarrow x=2$. Dividiendo: $y=x+2-\\dfrac{2x+9}{x^2-4}$, así que la asíntota inclinada es $y=x+2$. En $x=2$: $y=2+2=4$."}
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
      titulo="Asíntotas"
      posicion="Lámina 2 de 2"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/funciones-racionales/dominio-funcion-racional", titulo: "Dominio de funciones racionales" }}
      teAbrePuertaA={{ href: "/laminas/porcentajes-mezclas-interes", titulo: "Porcentajes, mezclas e interés" }}
    />
  );
}

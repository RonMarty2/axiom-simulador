"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Permutaciones y conteo" — módulo "Combinatoria básica",
// única lámina del módulo. El banco solo tiene 3 preguntas de
// combinatoria, todas del mismo subtipo (permutación de dígitos con
// primera/última cifra fija); no hay ninguna de combinaciones (nCr)
// ni de principio multiplicativo puro. Las cards de "Arrancamos..." y
// "Combinaciones" usan ejemplos propios para cubrir esos huecos,
// documentado acá.
export default function PermutacionesYConteoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés contar TODAS las formas de ordenar algo sin escribirlas una por una?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>3 remeras, 2 pantalones</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>6 outfits</span>
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
            Ya sabés que si una elección tiene varios pasos independientes, multiplicás las opciones de cada paso: el principio multiplicativo.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$3 \\text{ remeras} \\times 2 \\text{ pantalones} = 6 \\text{ outfits}$"}</MathText>
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 96 }}>Permutación</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>ordenar TODOS los <MathText>{"$n$"}</MathText> elementos: <MathText>{"$n!$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 96 }}>Var. parcial</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>ordenar <MathText>{"$r$"}</MathText> de <MathText>{"$n$"}</MathText>, IMPORTA el orden: <MathText>{"$P(n,r)=\\frac{n!}{(n-r)!}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 96 }}>Combinación</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>elegir <MathText>{"$r$"}</MathText> de <MathText>{"$n$"}</MathText>, NO importa el orden: <MathText>{"$C(n,r)=\\frac{n!}{r!(n-r)!}$"}</MathText></span>
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
            ¿Cuántos números de 5 cifras que empiecen por 1 y terminen por 8 se pueden formar con los dígitos 1,2,3,4,5,6,7,8, sin repetir?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="1 y 8 quedan fijos; quedan 6 dígitos para las 3 posiciones centrales" eq={"$P(6,3) = 6\\times5\\times4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>120</span>
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
            Usar combinación cuando el orden SÍ importa (o al revés) es el error más común: formar números es siempre permutación, porque 234 y 432 son números distintos.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{formar un número}$", abajo: "$\\text{permutación}$" }}
            incorrecto={{ arriba: "$\\text{formar un número}$", abajo: "$\\text{combinación (mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Combinaciones",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Ejemplo propio
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            De un grupo de 5 personas, ¿de cuántas formas se eligen 2 para un comité (sin distinguir cargos)?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="No importa el orden: elegir a Ana y Beto es lo mismo que elegir a Beto y Ana" eq={"$C(5,2) = \\dfrac{5!}{2!\\,3!} = \\dfrac{5\\times4}{2\\times1}$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>10 comités posibles</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Cuántos números de 4 cifras que empiecen con 1 y terminen en 5 se pueden formar con los dígitos 1,2,3,4,5 (cada uno se usa una sola vez)?"}
          opciones={["6", "10", "12", "20", "Ninguno"]}
          correcta={0}
          explicacion={"1 y 5 quedan fijos en los extremos. Quedan $\\{2,3,4\\}$ para las 2 posiciones centrales, sin repetir: $3\\times2=6$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="combinatoria-basica"
      moduloTitulo="Combinatoria básica"
      titulo="Permutaciones y conteo"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/problemas-de-edades", titulo: "Problemas de edades" }}
    />
  );
}

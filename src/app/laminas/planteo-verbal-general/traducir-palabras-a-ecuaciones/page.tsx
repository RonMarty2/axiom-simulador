"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Traducir un problema verbal a ecuaciones" — módulo
// "Planteo verbal general", única lámina del módulo. Cubre el
// arquetipo genérico de "número(s) desconocido(s) + relación verbal",
// sin superponerse con los módulos específicos de edades, mezclas,
// trabajo combinado, móviles o reparto de costos.
export default function TraducirPalabrasAEcuacionesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que cada frase de un problema verbal tiene una traducción algebraica directa?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>&quot;el doble de un número&quot;</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$2x$"}</MathText>
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
            Ya sabes resolver ecuaciones y sistemas. Lo nuevo es reconocer estas frases típicas:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;la suma de dos números&quot; → <MathText>{"$x+y$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;el mayor dividido entre el menor da cociente q y residuo r&quot; → <MathText>{"$\\text{mayor} = q\\cdot\\text{menor} + r$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;números consecutivos&quot; → <MathText>{"$n,\\ n{+}1,\\ n{+}2,\\ ...$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Nombrá con una letra cada cantidad desconocida</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Traduce cada frase del enunciado a una ecuación, una por una</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resuelve el sistema y verifica el resultado contra el enunciado original</span>
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
            La suma de dos números es 77; si el mayor se divide por el menor, el cociente es 2 y el residuo es 8. Hallar el número mayor.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=mayor, b=menor: a+b=77 y a=2b+8" eq={"$2b+8+b = 77 \\ \\Rightarrow\\ 3b = 69 \\ \\Rightarrow\\ b = 23$"} />
            <LineaEjemplo glosa="" eq={"$a = 77 - 23 = 54$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>54</span>
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
            Olvidarse del residuo al traducir una división (escribir <MathText>{"$a=2b$"}</MathText> en vez de <MathText>{"$a=2b+8$"}</MathText>) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{mayor} = 2\\cdot\\text{menor} + 8$", abajo: "$a = 2b+8$" }}
            incorrecto={{ arriba: "$\\text{mayor} = 2\\cdot\\text{menor}$", abajo: "$a=2b\\ \\text{(mal, sin residuo)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Reusando un producto notable",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La suma de dos números es 18 y la de sus cuadrados es 180. Hallar el producto de los números.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="x+y=18, x²+y²=180. Elevando la suma al cuadrado" eq={"$(x+y)^2 = x^2+2xy+y^2 = 324$"} />
            <LineaEjemplo glosa="Reemplazando x²+y²=180" eq={"$180 + 2xy = 324 \\ \\Rightarrow\\ xy = 72$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>72</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Encontrar el mayor número de 3 números enteros consecutivos pares, cuya suma de cuadrados es 596."}
          opciones={["12", "14", "16", "18", "Ninguno"]}
          correcta={2}
          explicacion={"Con los pares centrados en $n$: $(n-2)^2+n^2+(n+2)^2=3n^2+8=596 \\Rightarrow n^2=196 \\Rightarrow n=14$. Los números son 12, 14, 16; el mayor es 16."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="planteo-verbal-general"
      moduloTitulo="Planteo verbal general"
      titulo="Traducir un problema verbal a ecuaciones"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/polinomios-grado", titulo: "Polinomios: grado y definiciones" }}
    />
  );
}

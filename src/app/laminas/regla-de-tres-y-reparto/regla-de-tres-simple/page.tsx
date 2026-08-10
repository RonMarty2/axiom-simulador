"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Regla de tres simple" — módulo "Regla de tres y reparto
// proporcional", 1ra de 3.
export default function ReglaDeTresSimplePage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que hay dos reglas de tres, no una? Usar la fórmula equivocada te da la respuesta al revés.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>una sube, la otra sube → DIRECTA</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>una sube, la otra baja → INVERSA</span>
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
            Ya sabés qué es una proporción: dos razones iguales. La regla de tres solo decide DÓNDE va la incógnita según cómo se relacionan las magnitudes.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44`, textAlign: "center" }}>
              <MathText>{"$\\text{DIRECTA}:\\ \\dfrac{a_1}{b_1}=\\dfrac{a_2}{b_2}$"}</MathText>
            </div>
            <div style={{ padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44`, textAlign: "center" }}>
              <MathText>{"$\\text{INVERSA}:\\ a_1 b_1 = a_2 b_2$"}</MathText>
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 62 }}>DIRECTA</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>el cociente entre las dos magnitudes es constante: armá dos razones iguales</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 62 }}>INVERSA</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>el producto entre las dos magnitudes es constante: igualá los dos productos</span>
            </div>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El paso que decide todo es preguntarte: si una magnitud aumenta, ¿la otra aumenta o disminuye?
          </p>
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
            Un móvil recorre 500 metros en 10 minutos, con velocidad constante. ¿Qué tiempo necesitará para recorrer los siguientes 300 metros manteniendo su velocidad?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Más metros, más tiempo → proporción directa" eq={"$\\dfrac{500}{10} = \\dfrac{300}{t}$"} />
            <LineaEjemplo glosa="" eq={"$t = \\dfrac{300 \\times 10}{500} = 6$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>6 minutos</span>
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
            Armar la proporción directa cuando en realidad es inversa (o al revés) es el error más común. Preguntate primero qué pasa con una magnitud cuando la otra crece.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$8\\text{ obreros}\\to6\\text{ días};\\ 4\\text{ obreros}\\to d$", abajo: "$8\\times6=4\\times d\\ \\Rightarrow\\ d=12$" }}
            incorrecto={{ arriba: "$8\\text{ obreros}\\to6\\text{ días};\\ 4\\text{ obreros}\\to d$", abajo: "$\\dfrac{8}{6}=\\dfrac{4}{d}\\ \\Rightarrow\\ d=3$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Y la inversa",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            En una guarnición de 1300 hombres se tienen víveres para 120 días. Si se desea que los víveres duren 10 días más, ¿cuántos hombres habrá que retirar?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Más días con los mismos víveres → menos hombres: proporción inversa" eq={"$1300 \\times 120 = h \\times 130$"} />
            <LineaEjemplo glosa="" eq={"$h = \\dfrac{156000}{130} = 1200$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>1300 − 1200 = 100 hombres a retirar</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"En 12 días, 8 obreros han hecho los 2/3 de una obra. Se retirarán 6 obreros. ¿Cuántos días demorarán los obreros restantes para terminar la obra?"}
          opciones={["24", "15", "96", "48", "Ninguno"]}
          correcta={0}
          explicacion={"$8\\text{ obreros}\\times12\\text{ días}=96$ obrero-días $=\\dfrac23$ de la obra, así que la obra completa pide $144$ obrero-días y faltan $144-96=48$. Con $8-6=2$ obreros: $48\\div2=24$ días."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="regla-de-tres-y-reparto"
      moduloTitulo="Regla de tres y reparto proporcional"
      titulo="Regla de tres simple"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/regla-de-tres-y-reparto/regla-de-tres-compuesta", titulo: "Regla de tres compuesta" }}
    />
  );
}

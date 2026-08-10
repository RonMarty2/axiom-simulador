"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo, PasoCard } from "../../_components/dispositivos";

// Lámina "Regla de tres compuesta" — módulo "Regla de tres y reparto
// proporcional", 2da de 3.
export default function ReglaDeTresCompuestaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés encadenar varias reglas de tres simples en una sola ecuación, con tres o más magnitudes a la vez?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>hombres, horas, metros...</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>una sola ecuación</span>
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
            Ya sabés distinguir directa de inversa entre DOS magnitudes. En la compuesta hay tres o más: aplicás esa misma pregunta a cada una, por separado, contra la incógnita.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              más hombres → menos días <b>(inversa)</b>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              más horas por día → menos días <b>(inversa)</b>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              más metros a avanzar → más días <b>(directa)</b>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PasoCard n={1}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>Elegí cuál magnitud es la incógnita (por ejemplo, días).</p>
          </PasoCard>
          <PasoCard n={2}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>Para cada otra magnitud, preguntate: si ella aumenta, ¿la incógnita aumenta (directa) o disminuye (inversa)?</p>
          </PasoCard>
          <PasoCard n={3}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>Armá una sola ecuación: las directas quedan &quot;derecho&quot;, las inversas se invierten (van cruzadas).</p>
          </PasoCard>
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
            3 hombres trabajando 10 días a 8 horas diarias avanzan 80m de una obra. ¿Cuántos días necesitan 5 hombres, 6 horas diarias, para avanzar 60m?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Hombres y horas: inversas a los días. Metros: directa. Todo entra en un mismo cociente" eq={"$\\dfrac{3\\times10\\times8}{80} = \\dfrac{5\\times d\\times6}{60}$"} />
            <LineaEjemplo glosa="" eq={"$3 = 0.5d \\ \\Rightarrow\\ d = 6$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>6 días</span>
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
            Tratar una magnitud como directa cuando en realidad es inversa (o al revés) arruina toda la ecuación, aunque el resto esté bien planteado.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{más horas/día} \\to \\text{menos días}$", abajo: "$\\text{INVERSA}$" }}
            incorrecto={{ arriba: "$\\text{más horas/día} \\to \\text{menos días}$", abajo: "$\\text{DIRECTA (mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con víveres y raciones",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Una guarnición de 1600 hombres tiene víveres para 10 días a razón de 3 raciones diarias cada hombre. Si se refuerzan con 400 hombres, ¿cuántos días duran los víveres si cada hombre toma 2 raciones diarias?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Total de raciones disponibles, fijo" eq={"$1600 \\times 10 \\times 3 = 48000$"} />
            <LineaEjemplo glosa="Nuevos hombres y raciones diarias" eq={"$48000 = 2000 \\times d \\times 2$"} />
            <LineaEjemplo glosa="" eq={"$d = \\dfrac{48000}{4000} = 12$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>12 días</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"15 obreros pueden realizar una obra en 30 días. Luego de 10 días de trabajo se aumentan 5 obreros más. ¿En cuántos días (a partir de ese momento) terminarán la obra?"}
          opciones={["10", "15", "6", "12", "Ninguno"]}
          correcta={1}
          explicacion={"Trabajo total $=15\\times30=450$ obrero-días. En los primeros 10 días se avanzó $15\\times10=150$; falta $450-150=300$. Con $15+5=20$ obreros: $300/20=15$ días."}
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
      titulo="Regla de tres compuesta"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/regla-de-tres-y-reparto/regla-de-tres-simple", titulo: "Regla de tres simple" }}
      teAbrePuertaA={{ href: "/laminas/regla-de-tres-y-reparto/reparto-proporcional", titulo: "Reparto proporcional" }}
    />
  );
}

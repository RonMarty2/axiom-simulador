"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Problemas de trabajo combinado" — módulo "Trabajo
// combinado", única lámina del módulo.
export default function ProblemasDeTrabajoCombinadoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que cuando dos personas trabajan juntas, lo que se suma NO son los tiempos, sino las rapideces?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>5h y 10h</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>juntos: 3h20m</span>
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
            Ya sabés que si algo tarda <MathText>{"$a$"}</MathText> horas en completarse, en una hora se hace <MathText>{"$1/a$"}</MathText> del trabajo: esa es su rapidez, o tasa de trabajo.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{t}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            <MathText>{"$t$"}</MathText> es el tiempo que tardan trabajando juntos.
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Convertí cada tiempo individual en una tasa: <MathText>{"$1/\\text{tiempo}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Sumá las tasas de todos los que trabajan a la vez</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El tiempo combinado es el INVERSO de esa tasa total</span>
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
            Luis pinta su casa solo en 5 horas; su hijo, solo, en 10 horas. Si pintan juntos, ¿cuánto tardan?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Tasas: 1/5 y 1/10 de casa por hora" eq={"$\\dfrac15 + \\dfrac{1}{10} = \\dfrac{2}{10}+\\dfrac{1}{10} = \\dfrac{3}{10}$"} />
            <LineaEjemplo glosa="Tiempo = inverso de la tasa combinada" eq={"$t = \\dfrac{10}{3} = 3\\dfrac13\\text{ h} = 3\\text{h}\\,20\\text{m}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>3h 20m</span>
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
            Sumar o promediar los TIEMPOS directamente, en vez de sumar las tasas, es el error más común: dos grifos de 6h y 3h llenan una piscina en 2h, no en 4,5h.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\dfrac16+\\dfrac13=\\dfrac12$", abajo: "$t=2\\text{h}$" }}
            incorrecto={{ arriba: "$\\dfrac{6+3}{2}$", abajo: "$4{,}5\\text{h (mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Cuando falta un dato",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Un tanque se llena con un grifo en 20 minutos. Tras 5 minutos abierto, se abre un segundo grifo y el tanque se llena en 3 minutos más. ¿En cuánto tiempo lo llenaría el segundo grifo solo?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="En los primeros 5 min, el primer grifo llenó 5/20=1/4 del tanque" eq={"$3\\left(\\dfrac{1}{20}+\\dfrac1t\\right) = \\dfrac34$"} />
            <LineaEjemplo glosa="" eq={"$\\dfrac{3}{t} = \\dfrac34-\\dfrac{3}{20} = \\dfrac{3}{5} \\ \\Rightarrow\\ t=5$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>5 minutos</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Mario tarda 4h solo, Lena tarda una hora más que Carla. Juntos entregan todo en 40% del tiempo que tarda Carla sola. ¿Cuánto tarda Carla sola?"}
          opciones={["2 h", "3 h", "3.5 h", "2.5 h", "Ninguno"]}
          correcta={1}
          explicacion={"Sea $c$ el tiempo de Carla. Lena tarda $c+1$, Mario 4. Tasa conjunta $=\\dfrac14+\\dfrac1c+\\dfrac1{c+1}$, y el tiempo conjunto es $0{,}4c$. Igualando y resolviendo: $c^2-c-6=0 \\Rightarrow (c-3)(c+2)=0$. Como $c>0$, $c=3$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="trabajo-combinado"
      moduloTitulo="Trabajo combinado"
      titulo="Problemas de trabajo combinado"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/inecuaciones", titulo: "Inecuaciones" }}
    />
  );
}

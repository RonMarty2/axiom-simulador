"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Problemas de cifras (notación posicional)" — módulo
// "Problemas de cifras y dígitos", única lámina del módulo.
export default function ProblemasDeCifrasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un número de dos cifras se puede escribir como una fórmula algebraica, no solo como &quot;ab&quot;?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\overline{ab}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$10a+b$"}</MathText>
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
            Ya sabés que en notación posicional, cada dígito vale distinto según su lugar. Eso es justo lo que hay que traducir a álgebra.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\overline{ab} = 10a+b$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\overline{hab} = 100h+10a+b$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Nombrá cada cifra con una letra (centenas, decenas, unidades)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Traducí cada condición del enunciado a una ecuación entre esas letras</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si el problema invierte las cifras, escribí también esa versión con el valor posicional cambiado</span>
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
            La suma de los dígitos de un número de dos cifras es 9. Si los dígitos se invierten, el número resultante excede en 9 al original. ¿Cuál es el número?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=decena, b=unidad: a+b=9" eq={"$a+b = 9$"} />
            <LineaEjemplo glosa="Invertido menos original: (10b+a)-(10a+b)=9" eq={"$b-a = 1$"} />
            <LineaEjemplo glosa="Sumando ambas: 2b=10" eq={"$b = 5,\\ a = 4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>45</span>
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
            Escribir el número como <MathText>{"$a+b$"}</MathText> en vez de <MathText>{"$10a+b$"}</MathText> es el error más común: olvidarse el valor posicional deshace todo el planteo.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\overline{ab}$", abajo: "$10a+b$" }}
            incorrecto={{ arriba: "$\\overline{ab}$", abajo: "$a+b\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con una razón entre los números",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La decena de un número de dos cifras excede en 2 a la unidad. Al invertir, el original entre el invertido da 7/4. Hallar la suma de los cubos de las cifras.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a=decena, b=unidad: a=b+2" eq={"$\\dfrac{10a+b}{10b+a} = \\dfrac74 \\ \\Rightarrow\\ a = 2b$"} />
            <LineaEjemplo glosa="Combinando a=b+2 y a=2b" eq={"$b = 2,\\ a = 4$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$2^3+4^3 = 72$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Un número de tres cifras: la unidad excede en 5 a la centena; la decena excede en 1 a la centena; la unidad es el doble de la suma de decena y centena. Determinar el número."}
          opciones={["146", "136", "126", "116", "Ninguno"]}
          correcta={2}
          explicacion={"$h$=centena, $t$=decena, $u$=unidad: $u=h+5$, $t=h+1$, $u=2(t+h)$. Sustituyendo: $h+5=2(h+1+h)=4h+2 \\Rightarrow h=1$, $t=2$, $u=6$. Número: 126."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="problemas-de-cifras"
      moduloTitulo="Problemas de cifras y dígitos"
      titulo="Problemas de cifras (notación posicional)"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/exponentes-y-radicales", titulo: "Exponentes y radicales: simplificación" }}
    />
  );
}

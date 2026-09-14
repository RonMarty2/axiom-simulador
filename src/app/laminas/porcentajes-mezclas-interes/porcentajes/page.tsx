"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Porcentajes" — módulo "Porcentajes, mezclas e interés", 1ra
// de 3.
export default function PorcentajesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que tres descuentos de 25%, 40% y 20% NO suman un descuento del 85%?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>25% + 40% + 20%</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>≠</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>85% de descuento</span>
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
            Ya sabes que un aumento del 25% multiplica por <MathText>{"$1{,}25$"}</MathText>, y un descuento del 15% multiplica por <MathText>{"$0{,}85$"}</MathText>. Cuando hay varios cambios seguidos, los factores se MULTIPLICAN entre sí, no se suman los porcentajes.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\text{aumenta 25\\%} \\to \\times 1{,}25$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\text{baja 15\\%} \\to \\times 0{,}85$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Convierte cada cambio en su factor: aumento <MathText>{"$p\\%$"}</MathText> → <MathText>{"$\\times(1+\\frac{p}{100})$"}</MathText>, descuento → <MathText>{"$\\times(1-\\frac{p}{100})$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Multiplica todos los factores en orden, uno tras otro</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>El factor final te dice qué queda; <MathText>{"$100\\%$"}</MathText> menos eso es el cambio total</span>
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
            Hacer tres descuentos sucesivos del 25%, 40% y 20%. Determinar el equivalente del descuento total.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Factor que queda tras cada descuento" eq={"$0{,}75 \\times 0{,}60 \\times 0{,}80 = 0{,}36$"} />
            <LineaEjemplo glosa="Queda el 36%; el descuento total equivalente es" eq={"$100\\% - 36\\% = 64\\%$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>64%</span>
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
            Sumar los porcentajes directamente (25%+40%+20%=85%) es el error más común: cada descuento se aplica sobre lo que YA quedó del anterior, no sobre el original.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$0{,}75\\times0{,}60\\times0{,}80$", abajo: "$64\\%\\ \\text{de descuento}$" }}
            incorrecto={{ arriba: "$25\\%+40\\%+20\\%$", abajo: "$85\\%\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Porcentaje de lo que queda",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Juan tiene un monto <MathText>{"$M$"}</MathText> y cancela dos deudas: la primera es el 60% de <MathText>{"$M$"}</MathText>; la segunda, el 40% de lo que le queda. ¿Con qué porcentaje de <MathText>{"$M$"}</MathText> se queda?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Primer pago 60%, le queda 40% de M" eq={"$M - 0{,}60M = 0{,}40M$"} />
            <LineaEjemplo glosa="Segundo pago: 40% de lo que quedó (no de M)" eq={"$0{,}40M - 0{,}40(0{,}40M) = 0{,}24M$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>24% de M</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Juan compra una casa en 32000 Bs, luego la ofrece a la venta en 25% más de su precio original. Un comprador consigue una rebaja del 15% del precio ofrecido. ¿Cuál es el precio de venta final?"}
          opciones={["34000 Bs", "44000 Bs", "24000 Bs", "54000 Bs", "Ninguno"]}
          correcta={0}
          explicacion={"Precio de oferta: $32000\\times1{,}25=40000$ Bs. Precio final: $40000\\times(1-0{,}15)=40000\\times0{,}85=34000$ Bs."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="porcentajes-mezclas-interes"
      moduloTitulo="Porcentajes, mezclas e interés"
      titulo="Porcentajes"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/porcentajes-mezclas-interes/mezclas", titulo: "Problemas de mezclas" }}
    />
  );
}

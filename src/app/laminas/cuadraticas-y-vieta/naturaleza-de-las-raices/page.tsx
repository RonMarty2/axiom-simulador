"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo } from "../../_components/dispositivos";

// Lámina "Naturaleza de las raíces" — módulo "Ecuaciones cuadráticas y
// relaciones de Vieta", 4ta de 5. Profundiza la lámina de discriminante:
// no solo CUÁNTAS raíces hay, sino de qué TIPO son.
export default function NaturalezaDeLasRaicesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            El discriminante no solo dice cuántas raíces hay. También dice de qué tipo son: racionales, irracionales o complejas.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["racionales", "irracionales", "complejas"].map((v) => (
              <span key={v} style={{
                padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft,
                fontSize: 12.5, color: LIENZO.fgDim, fontWeight: 600,
              }}>
                {v}
              </span>
            ))}
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
            Ya sabés que el signo de <MathText>{"$\\Delta$"}</MathText> dice cuántas raíces reales hay. Falta un detalle: cuando <MathText>{"$\\Delta > 0$"}</MathText>, todavía hay dos casos posibles adentro de la raíz cuadrada.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$\\sqrt{\\Delta}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            ¿Esa raíz cuadrada da un número exacto, o queda con radical?
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Con <MathText>{"$a,b,c$"}</MathText> racionales:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}44` }}>
              <span style={{ fontSize: 13, minWidth: 78 }}><MathText>{"$\\Delta < 0$"}</MathText></span>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>no hay raíz real de un negativo</span>
              <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: LIENZO.bad, whiteSpace: "nowrap" }}>complejas conjugadas</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, minWidth: 78 }}><MathText>{"$\\Delta = 0$"}</MathText></span>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>una sola raíz, racional</span>
              <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: LIENZO.accent, whiteSpace: "nowrap" }}>racional doble</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, minWidth: 78 }}><MathText>{"$\\Delta > 0$"}</MathText></span>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>cuadrado perfecto</span>
              <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: LIENZO.ok, whiteSpace: "nowrap" }}>racionales</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, minWidth: 78 }}><MathText>{"$\\Delta > 0$"}</MathText></span>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>no es cuadrado perfecto</span>
              <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: LIENZO.warn, whiteSpace: "nowrap" }}>irracionales conjugadas</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            Tres ecuaciones, tres naturalezas distintas, sin resolver ninguna entera:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
            <LineaEjemplo glosa="x²−5x+6=0 → Δ=1, cuadrado perfecto" eq={"$x=2 \\text{ y } x=3\\ \\text{(racionales)}$"} />
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
            <LineaEjemplo glosa="x²−2x−1=0 → Δ=8, no es cuadrado perfecto" eq={"$x = 1 \\pm \\sqrt{2}\\ \\text{(irracionales)}$"} />
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "10px 14px" }}>
            <LineaEjemplo glosa="x²−4x+8=0 → Δ=−16" eq={"$x = 2 \\pm 2i\\ \\text{(complejas)}$"} />
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
            <MathText>{"$\\Delta > 0$"}</MathText> no significa automáticamente &quot;raíces bonitas&quot;. Hay que revisar si <MathText>{"$\\Delta$"}</MathText> es cuadrado perfecto antes de asumir que las raíces son enteras o racionales.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 140px", padding: "10px 12px", borderRadius: 12, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}55`, textAlign: "center" }}>
              <MathText>{"$\\Delta = 9$"}</MathText>
              <div style={{ fontSize: 10, color: LIENZO.ok, marginTop: 4 }}>cuadrado perfecto, racionales</div>
            </div>
            <div style={{ flex: "1 1 140px", padding: "10px 12px", borderRadius: 12, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}55`, textAlign: "center" }}>
              <MathText>{"$\\Delta = 8$"}</MathText>
              <div style={{ fontSize: 10, color: LIENZO.warn, marginTop: 4 }}>positivo, pero irracionales</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "También sirve al revés",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Examen UMSS: hallar la ecuación de segundo grado con raíces <MathText>{"$2+2i$"}</MathText> y <MathText>{"$2-2i$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Suma (por Vieta, i se cancela)" eq="$(2{+}2i)+(2{-}2i) = 4$" />
            <LineaEjemplo glosa="Producto (diferencia de cuadrados)" eq="$(2{+}2i)(2{-}2i) = 4 - 4i^2 = 8$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x^2 - 4x + 8 = 0$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Es la misma ecuación de la tarjeta &quot;Aplicándolo&quot;: ahí calculaste que sus raíces eran complejas, acá partís de esas raíces y llegás de vuelta a la ecuación.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Sin resolverla, ¿qué tipo de raíces tiene $x^2 - 6x + 9 = 0$?"}
          opciones={[
            "Una raíz racional doble",
            "Dos raíces racionales distintas",
            "Dos raíces irracionales conjugadas",
            "Dos raíces complejas conjugadas",
            "Ninguno",
          ]}
          correcta={0}
          explicacion={"$a=1,\\ b=-6,\\ c=9$. $\\Delta=(-6)^2-4(1)(9)=36-36=0$. Con $\\Delta=0$ hay una sola raíz, racional (doble): $x=3$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="cuadraticas-y-vieta"
      moduloTitulo="Ecuaciones cuadráticas y relaciones de Vieta"
      titulo="Naturaleza de las raíces"
      posicion="Lámina 4 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/cuadraticas-y-vieta/ecuacion-cuadratica-discriminante", titulo: "Ecuación cuadrática y discriminante" }}
      teAbrePuertaA={{ href: "/laminas/cuadraticas-y-vieta", titulo: "Ecuaciones cúbicas (Vieta extendido)" }}
    />
  );
}

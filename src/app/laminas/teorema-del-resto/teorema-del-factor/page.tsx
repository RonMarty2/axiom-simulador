"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import {
  TarjetaPractica, PasoCard, FlechaMini, LineaEjemplo, ComparacionOjo,
} from "../../_components/dispositivos";

// Lámina "Teorema del Factor" — módulo "Teorema del Resto y división de
// polinomios", 4ta de 5. Construida ya directamente en formato de tarjetas
// (v5) aplicando reglas 1-12 de BITÁCORA §4.5 desde el primer borrador. Es
// el corolario directo de Teorema del Resto (R = P(a)) para el caso R = 0,
// así que el Puente conecta con esa lámina en vez de arrancar de cero.
export default function TeoremaDelFactorPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés confirmar si <MathText>{"$(x-a)$"}</MathText> es un factor de un polinomio con un solo cálculo, sin dividir nada?
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ position: "relative", padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${LIENZO.fgFaint}`, opacity: 0.55 }}>
                <MathText>{"$P(x) \\div (x-a)$"}</MathText>
                <div style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-8deg)" }} />
              </div>
              <FlechaMini />
              <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
                <MathText>{"$P(a) = 0 \\ ?$"}</MathText>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 10.5, color: LIENZO.fgDim, textTransform: "uppercase", letterSpacing: 0.4 }}>
              <span>sin dividir nada</span>
              <span>con un solo cálculo</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de algo que ya viste",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ya sabés esto de la lámina anterior: el resto de dividir <MathText>{"$P(x)$"}</MathText> entre <MathText>{"$(x-a)$"}</MathText> es, siempre,
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, marginBottom: 14, fontSize: 20 }}>
            <MathText>{"$R = P(a)$"}</MathText>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 14.5, lineHeight: 1.6 }}>
            Esta lámina es una sola pregunta sobre ese hecho: <b>¿y si ese resto da exactamente cero?</b>
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 16, opacity: 0.55 }}>
              <MathText>{"$R = P(a)$"}</MathText>
            </div>
            <FlechaMini abajo />
            <div style={{ padding: "8px 16px", borderRadius: 10, background: `${LIENZO.accent}15`, border: `1.5px solid ${LIENZO.accent}`, fontWeight: 700, fontSize: 16 }}>
              <MathText>{"$P(a) = 0$"}</MathText>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 1 de 2",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            La igualdad de siempre era <MathText>{"$P(x) = (x-a)\\cdot Q(x) + R$"}</MathText>. Si <MathText>{"$R = 0$"}</MathText>, ese pedazo se va entero:
          </p>
          <div style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
            <MathText>{"$P(x) = (x-a) \\cdot Q(x) +$"}</MathText>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ opacity: 0.35 }}><MathText>{"$\\ R$"}</MathText></span>
              <span style={{ position: "absolute", left: -2, right: -2, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-6deg)" }} />
            </span>
          </div>
          <div style={{ fontSize: 19, textAlign: "center" }}>
            <MathText block>{"$P(x) = (x-a) \\cdot Q(x)$"}</MathText>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Sin resto, la división es exacta: <MathText>{"$(x-a)$"}</MathText> divide a <MathText>{"$P(x)$"}</MathText> sin que sobre nada. Por definición, eso es ser un <b>factor</b>.
          </p>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 2 de 2",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Y funciona al revés también. Si ya sabés que <MathText>{"$(x-a)$"}</MathText> es un factor, es porque la división da exacta, sin resto:
          </p>
          <div style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
            <MathText block>{"$P(x) = (x-a) \\cdot Q(x)$"}</MathText>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Compará contra la igualdad general y el resto tiene que ser cero:
          </p>
          <div style={{
            marginTop: 4, textAlign: "center",
            padding: "12px 0", borderTop: `1px solid ${LIENZO.fgFaint}`, borderBottom: `1px solid ${LIENZO.fgFaint}`,
          }}>
            <span style={{ display: "block", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: LIENZO.fgFaint, marginBottom: 6 }}>
              Va en los dos sentidos
            </span>
            <span style={{ fontSize: 20 }}>
              <MathText>{"$(x-a) \\text{ es factor de } P(x)$"}</MathText>
            </span>
            <div style={{ margin: "4px 0" }}><FlechaMini abajo /><div style={{ fontSize: 9, color: LIENZO.fgDim, textTransform: "uppercase", marginTop: -6 }}>equivale a</div></div>
            <span style={{ fontSize: 22, fontWeight: 700, color: LIENZO.accent }}>
              <MathText>{"$P(a) = 0$"}</MathText>
            </span>
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
            ¿Es <MathText>{"$(x-3)$"}</MathText> un factor de <MathText>{"$P(x) = x^3 - 4x^2 + x + 6$"}</MathText>?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="¿Qué valor anula al posible factor?" eq={"$x - 3 = 0 \\rightarrow x = 3$"} />
            <LineaEjemplo glosa="Evaluá P ahí" eq="$P(3) = (3)^3 - 4(3)^2 + 3 + 6$" />
            <LineaEjemplo glosa="" eq="$P(3) = 27 - 36 + 3 + 6$" />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$P(3) = 0$"}</MathText></span>
            <span style={{ fontSize: 12, color: LIENZO.fgDim }}>sí, es factor</span>
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
            Si <MathText>{"$x=3$"}</MathText> es raíz, el factor se escribe con el signo opuesto: <MathText>{"$(x-3)$"}</MathText>, no <MathText>{"$(x+3)$"}</MathText>. Es el mismo cuidado con el signo de la lámina anterior, ahora al revés: de la raíz al factor.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$x = 3 \\text{ es raíz}$", abajo: "$(x - 3)$" }}
            incorrecto={{ arriba: "$x = 3 \\text{ es raíz}$", abajo: "$(x + 3)$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "También sirve para hallar un parámetro desconocido",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Si te dicen que una división <b>da exacta</b> pero falta un coeficiente, es la misma idea usada al revés: armás la ecuación con <MathText>{"$P(a)=0$"}</MathText> y despejás el dato que falta.
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Calcular <MathText>{"$m$"}</MathText> para que <MathText>{"$(6x^3 - 3x^2 - mx - 6) \\div (2x - 3)$"}</MathText> sea exacta.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="¿Qué valor anula al divisor?" eq={"$2x - 3 = 0 \\rightarrow x = \\tfrac{3}{2}$"} />
            <LineaEjemplo glosa="Para que sea exacta, evaluado ahí tiene que dar 0" eq={"$6(\\tfrac{3}{2})^3 - 3(\\tfrac{3}{2})^2 - m(\\tfrac{3}{2}) - 6 = 0$"} />
            <LineaEjemplo glosa="" eq={"$20.25 - 6.75 - \\tfrac{3m}{2} - 6 = 0$"} />
            <LineaEjemplo glosa="" eq={"$7.5 = \\tfrac{3m}{2}$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$m = 5$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Es el primer paso para factorizar",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Volvamos al <MathText>{"$P(x) = x^3 - 4x^2 + x + 6$"}</MathText> de antes. Ya confirmaste que <MathText>{"$(x-3)$"}</MathText> es un factor, así que podés escribirlo así, con el resto del polinomio adentro de <MathText>{"$Q(x)$"}</MathText>:
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, marginBottom: 12, fontSize: 17 }}>
            <MathText>{"$P(x) = (x-3) \\cdot Q(x)$"}</MathText>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, color: LIENZO.fgDim, lineHeight: 1.6 }}>
            La próxima lámina (división sintética) te enseña a hallar ese <MathText>{"$Q(x)$"}</MathText> rápido. Acá, adelanto del resultado completo:
          </p>
          <div style={{
            padding: "12px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`, textAlign: "center",
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: LIENZO.ok }}>
              <MathText>{"$P(x) = (x-3)(x-2)(x+1)$"}</MathText>
            </span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Cada factor te regala una raíz gratis: <MathText>{"$x = 3,\\ x = 2,\\ x = -1$"}</MathText>. Confirmar un factor con este teorema es el punto de partida de toda factorización de polinomios de grado alto.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Cuál de los siguientes es un factor de $h(x) = x^3 + 2x^2 - x - 2$?"}
          opciones={["$(x - 1)$", "$(x - 2)$", "$(x + 3)$", "$(x - 3)$", "Ninguno"]}
          correcta={0}
          explicacion={"Probá cada candidato en $h$. Con $x=1$: $h(1) = 1 + 2 - 1 - 2 = 0$, así que $(x-1)$ es factor. (También lo son $(x+1)$ y $(x+2)$, pero no están entre las opciones.)"}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="teorema-del-resto"
      moduloTitulo="Teorema del Resto y división de polinomios"
      titulo="Teorema del Factor"
      posicion="Lámina 4 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/teorema-del-resto/teorema-del-resto", titulo: "Teorema del Resto" }}
      teAbrePuertaA={{ href: "/laminas/teorema-del-resto/aplicaciones-teorema-resto", titulo: "Aplicaciones combinadas" }}
    />
  );
}

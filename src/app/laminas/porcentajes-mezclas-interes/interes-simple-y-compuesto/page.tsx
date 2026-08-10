"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Interés simple y compuesto" — módulo "Porcentajes, mezclas
// e interés", 3ra y última de 3.
export default function InteresSimpleYCompuestoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que el interés simple crece siempre lo mismo cada año, pero el compuesto crece cada vez más?
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>simple → suma constante</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>compuesto → se multiplica</span>
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
            Ya sabés que un aumento del <MathText>{"$r\\%$"}</MathText> multiplica por <MathText>{"$(1+r)$"}</MathText>. El interés compuesto es justamente aplicar ese factor una y otra vez, año tras año.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\text{simple: } I = C \\cdot r \\cdot t$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$\\text{compuesto: } A = C(1+r)^t$"}</MathText>
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
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 68 }}>Simple</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>el interés de cada período se calcula SIEMPRE sobre el capital inicial</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 68 }}>Compuesto</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>el interés de cada período se calcula sobre el monto YA ACUMULADO (capital + interés previo)</span>
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
            La fortuna de un comerciante es actualmente 540000. Durante 3 años consecutivos ha aumentado cada año la mitad de lo que era al principio de ese año. ¿Cuál fue la fortuna primitiva?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Cada año se multiplica por 1,5 (aumenta compuesto)" eq={"$F_0 \\times 1{,}5^3 = 540000$"} />
            <LineaEjemplo glosa="" eq={"$F_0 = \\dfrac{540000}{3{,}375} = 160000$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>160000</span>
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
            Multiplicar el crecimiento por período (en vez de elevarlo a una potencia) es el error más común cuando la situación es de interés compuesto.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$F_0 \\times 1{,}5^3$", abajo: "$\\text{compuesto}$" }}
            incorrecto={{ arriba: "$F_0 \\times (1{,}5 \\times 3)$", abajo: "$\\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Interés simple con dos tasas",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Carlos invirtió 24000 Bs. Un primer monto gana 4,5% anual y el resto gana 4% anual. Después de un año, el interés total fue 1050 Bs. ¿Cuánto invirtió en el primer monto?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="x = primer monto, (24000-x) = resto" eq={"$0{,}045x + 0{,}04(24000-x) = 1050$"} />
            <LineaEjemplo glosa="" eq={"$0{,}005x = 90 \\ \\Rightarrow\\ x = 18000$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>18000 Bs</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Un hombre invierte sus ahorros en dos cuentas: 6% y 10% de interés simple anual. Pone el doble en la de menor rendimiento (6%). El interés anual ganado en ambas es 3520 Bs. ¿Cuánto tenía en total?"}
          opciones={["16000", "36000", "48000", "32000", "Ninguno"]}
          correcta={2}
          explicacion={"Sea $x$ el monto al 10% y $2x$ el monto al 6%: $0{,}06(2x)+0{,}10(x)=0{,}22x=3520 \\Rightarrow x=16000$. Total: $2x+x=3(16000)=48000$."}
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
      titulo="Interés simple y compuesto"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/porcentajes-mezclas-interes/mezclas", titulo: "Problemas de mezclas" }}
      teAbrePuertaA={{ href: "/laminas/factorizacion-productos-notables", titulo: "Factorización y productos notables" }}
    />
  );
}

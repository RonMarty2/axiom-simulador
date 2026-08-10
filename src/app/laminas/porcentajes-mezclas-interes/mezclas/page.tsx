"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Problemas de mezclas" — módulo "Porcentajes, mezclas e
// interés", 2da de 3.
export default function MezclasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que cuando sacás parte de una mezcla, también te llevás parte de lo que tenía disuelto?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>sacás mezcla</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.bad}15`, border: `1.5px solid ${LIENZO.bad}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>también se va soluto</span>
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
            Ya sabés que concentración es una razón: <MathText>{"$\\text{soluto}/\\text{volumen total}$"}</MathText>. Lo clave en mezclas es llevar la cuenta de cuánto soluto puro hay, no solo del volumen.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\text{soluto} = \\text{concentración} \\times \\text{volumen}$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Calculá el soluto puro que hay al principio</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si sacás <MathText>{"$x$"}</MathText> litros de mezcla, restá lo que esos <MathText>{"$x$"}</MathText> litros se llevan de soluto</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Sumá lo que agregás, e igualá el soluto final con la concentración objetivo</span>
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
            Un recipiente contiene 16 litros de una mezcla con 20% de anticongelante. Se saca una parte y se reemplaza por anticongelante puro para llegar al 25%. ¿Cuántos litros hay que reemplazar?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Anticongelante inicial" eq={"$0{,}20 \\times 16 = 3{,}2$"} />
            <LineaEjemplo glosa="Sacás x litros (se van 0,20x) y agregás x litros puros" eq={"$3{,}2 - 0{,}20x + x = 4$"} />
            <LineaEjemplo glosa="" eq={"$0{,}80x = 0{,}8 \\ \\Rightarrow\\ x = 1$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>1 litro</span>
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
            Olvidarse de restar el soluto que se va con la mezcla sacada (contar solo lo que se agrega) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$3{,}2 - 0{,}20x + x$", abajo: "$\\text{resta lo que se va}$" }}
            incorrecto={{ arriba: "$3{,}2 + x$", abajo: "$\\text{(mal, sin restar)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Diluir con agua",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Un depósito tiene 20 litros de alcohol al 40%. ¿Cuántos litros hay que sustituir por agua para bajar al 18%?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Alcohol inicial" eq={"$20 \\times 0{,}40 = 8$"} />
            <LineaEjemplo glosa="Sacás x litros de mezcla (se van 0,40x), el volumen total sigue en 20" eq={"$\\dfrac{8 - 0{,}40x}{20} = 0{,}18$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>11 litros</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"La cantidad $k$ de litros de alcohol puro que se deben añadir a 10 litros de una solución de alcohol al 20% para obtener una solución al 25% verifica:"}
          opciones={["$k<\\dfrac54$", "$\\dfrac54\\le k<\\dfrac43$", "$\\dfrac43\\le k<\\dfrac32$", "$k\\ge\\dfrac32$", "Ninguno"]}
          correcta={0}
          explicacion={"Alcohol inicial: $10\\times0{,}20=2$. Al añadir $k$ litros puros: $\\dfrac{2+k}{10+k}=0{,}25 \\Rightarrow 2+k=2{,}5+0{,}25k \\Rightarrow k=\\dfrac23$. Como $\\dfrac23<\\dfrac54$, se cumple la opción A."}
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
      titulo="Problemas de mezclas"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/porcentajes-mezclas-interes/porcentajes", titulo: "Porcentajes" }}
      teAbrePuertaA={{ href: "/laminas/porcentajes-mezclas-interes/interes-simple-y-compuesto", titulo: "Interés simple y compuesto" }}
    />
  );
}

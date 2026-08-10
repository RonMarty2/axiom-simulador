"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Progresión geométrica" — módulo "Progresiones", 3ra de 6.
export default function ProgresionGeometricaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que multiplicar SIEMPRE por el mismo número genera una fila en cadena?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$2,\\ 6,\\ 18,\\ 54,\\ldots$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$r=3$"}</MathText>
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
            Ya sabés multiplicar un número varias veces. Una progresión geométrica (PG) es justamente eso: cada término sale del anterior multiplicándolo SIEMPRE por la misma razón <MathText>{"$r$"}</MathText>.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$a_n = a_1 \\cdot r^{\\,n-1}$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identificá el primer término <MathText>{"$a_1$"}</MathText> y la razón <MathText>{"$r$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si te dan dos términos, dividilos para cancelar <MathText>{"$a_1$"}</MathText> y despejar <MathText>{"$r$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplicá <MathText>{"$a_n=a_1r^{n-1}$"}</MathText> para el término que buscás</span>
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
            El sexto término de una PG es 4 y el décimo término es 1/4. Calcular el primer término.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Divido para cancelar a₁ y hallar r" eq={"$\\dfrac{a_{10}}{a_6}=r^4=\\dfrac{1/4}{4}=\\dfrac1{16} \\ \\Rightarrow\\ r=\\pm\\dfrac12$"} />
            <LineaEjemplo glosa="Con r=1/2, despejo a₁ desde a₆" eq={"$a_6=a_1r^5=4 \\ \\Rightarrow\\ a_1=4\\times32=128$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>a₁ = 128</span>
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
            Olvidarse de que una potencia PAR tiene dos raíces reales es el error más común: <MathText>{"$r^4=1/16$"}</MathText> admite <MathText>{"$r=1/2$"}</MathText> Y <MathText>{"$r=-1/2$"}</MathText>, hay que revisar cuál corresponde.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$r^4=\\frac1{16}$", abajo: "$r=\\pm\\frac12$" }}
            incorrecto={{ arriba: "$r^4=\\frac1{16}$", abajo: "$r=\\frac12\\ \\text{(mal, falta el otro signo)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con exponente impar",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            El primer término de una PG es -2/81 y el octavo término es 54. Hallar la razón.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a₈ = a₁ · r⁷" eq={"$r^7=\\dfrac{a_8}{a_1}=\\dfrac{54}{-2/81}=-2187$"} />
            <LineaEjemplo glosa="2187=3⁷, y como el exponente es impar la raíz es única" eq={"$r=-3$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>r = -3</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"En una progresión geométrica, el cuarto término es 2 y el octavo término es 32. Determinar el primer término."}
          opciones={["1/5", "1/3", "1/2", "1/4", "Ninguno"]}
          correcta={3}
          explicacion={"$r^4=\\dfrac{a_8}{a_4}=\\dfrac{32}{2}=16 \\Rightarrow r=2$ (tomamos la raíz positiva). $a_4=a_1r^3=2 \\Rightarrow a_1=\\dfrac{2}{8}=\\dfrac14$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="progresiones"
      moduloTitulo="Progresiones"
      titulo="Progresión geométrica"
      posicion="Lámina 3 de 6"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/progresiones/suma-progresion-aritmetica", titulo: "Suma de una progresión aritmética" }}
      teAbrePuertaA={{ href: "/laminas/progresiones/suma-progresion-geometrica-finita", titulo: "Suma de una progresión geométrica finita" }}
    />
  );
}

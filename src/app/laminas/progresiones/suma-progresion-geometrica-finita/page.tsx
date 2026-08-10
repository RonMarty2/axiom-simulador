"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Suma de una progresión geométrica finita" — módulo
// "Progresiones", 4ta de 6.
export default function SumaProgresionGeometricaFinitaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que sumar una PG completa tiene una fórmula cerrada, sin sumar término por término?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$1,2,4,8,\\ldots$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$S_4=15$"}</MathText>
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
            Ya sabés el término general de una PG. Sumar los primeros <MathText>{"$n$"}</MathText> términos tiene esta fórmula cerrada, válida siempre que <MathText>{"$r\\neq1$"}</MathText>.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$S_n = \\dfrac{a_1(r^n-1)}{r-1}$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identificá <MathText>{"$a_1$"}</MathText>, <MathText>{"$r$"}</MathText> y lo que buscás (la suma o <MathText>{"$n$"}</MathText>)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplicá <MathText>{"$S_n=\\dfrac{a_1(r^n-1)}{r-1}$"}</MathText> con signos consistentes</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si buscás <MathText>{"$n$"}</MathText>, despejá la potencia y expresala como <MathText>{"$r$"}</MathText> elevado a algo</span>
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
            Dada la PG 3, -6, 12, -24, ...; ¿cuántos términos hay que sumar para obtener 513?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="PG con a₁=3, r=-2. Simplifico la fórmula" eq={"$S_n=\\dfrac{3((-2)^n-1)}{-2-1}=1-(-2)^n$"} />
            <LineaEjemplo glosa="Igualando a 513" eq={"$1-(-2)^n=513 \\ \\Rightarrow\\ (-2)^n=-512=(-2)^9$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>n = 9</span>
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
            Mezclar las dos formas equivalentes de la fórmula es el error más común: <MathText>{"$(1-r^n)$"}</MathText> va con denominador <MathText>{"$(1-r)$"}</MathText>, no con <MathText>{"$(r-1)$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$S_n=\\frac{a_1(r^n-1)}{r-1}$", abajo: "$\\text{signos consistentes}$" }}
            incorrecto={{ arriba: "$S_n=\\frac{a_1(1-r^n)}{r-1}$", abajo: "$\\text{(mal, signos mezclados)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con una razón entre sumas",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La suma de seis términos de una PG es igual a 9 veces la suma de los tres primeros términos. Hallar la razón.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="S₆=9S₃, cancelando a₁/(r-1) y usando u=r³" eq={"$r^6-1=9(r^3-1)$"} />
            <LineaEjemplo glosa="Factorizando (u-1)(u+1)=9(u-1), con r≠1" eq={"$r^3+1=9 \\ \\Rightarrow\\ r^3=8$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>r = 2</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Cuántos términos hay en una progresión geométrica que empieza en 3, tiene razón 4, y la suma de esos términos es 1023?"}
          opciones={["4", "6", "8", "9", "Ninguno"]}
          correcta={4}
          explicacion={"$S_n=\\dfrac{3(4^n-1)}{4-1}=4^n-1$. Igualando: $4^n-1=1023 \\Rightarrow 4^n=1024=4^5 \\Rightarrow n=5$. Ese valor no figura entre las opciones A a D."}
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
      titulo="Suma de una progresión geométrica finita"
      posicion="Lámina 4 de 6"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/progresiones/progresion-geometrica", titulo: "Progresión geométrica" }}
      teAbrePuertaA={{ href: "/laminas/progresiones/suma-progresion-geometrica-infinita", titulo: "Suma de una progresión geométrica infinita" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Suma de una progresión geométrica infinita" — módulo
// "Progresiones", 5ta de 6.
//
// El banco de exámenes UMSS no tiene NINGUNA pregunta de serie
// geométrica infinita (S=a1/(1-r), |r|<1): se revisó todo el banco
// (ingeniería y económicas) buscando "infinito/infinita", "converge",
// fracciones generatrices de decimales periódicos y notación de barra,
// sin encontrar coincidencias — todas las "sumas de PG" del banco son
// finitas. Por eso los tres ejemplos de esta lámina son de autoría
// propia, verificados a mano (fracciones generatrices clásicas y una
// serie con razón negativa).
export default function SumaProgresionGeometricaInfinitaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que sumar INFINITOS términos puede dar un número finito, si se van achicando?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$1+\\dfrac12+\\dfrac14+\\dfrac18+\\cdots$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$S=2$"}</MathText>
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
            Ya sabes que si <MathText>{"$|r|<1$"}</MathText>, las potencias <MathText>{"$r^n$"}</MathText> se achican cada vez más. En la fórmula de la suma finita, ese término desaparece y queda un valor límite.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$S = \\dfrac{a_1}{1-r}\\,,\\quad |r|<1$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Verifica que <MathText>{"$|r|<1$"}</MathText> (si no, la serie no tiene suma)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identifica <MathText>{"$a_1$"}</MathText> y <MathText>{"$r$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica <MathText>{"$S=\\dfrac{a_1}{1-r}$"}</MathText></span>
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
            Fracción generatriz
          </p>
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            Expresar <MathText>{"$0{,}3333\\ldots$"}</MathText> como fracción, usando que es una PG infinita.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="0,333...=3/10+3/100+3/1000+... es una PG con a₁=3/10, r=1/10" eq={"$S=\\dfrac{3/10}{1-1/10}=\\dfrac{3/10}{9/10}$"} />
            <LineaEjemplo glosa="Simplificando la fracción" eq={"$S=\\dfrac39=\\dfrac13$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>0,333... = 1/3</span>
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
            Usar la fórmula sin chequear <MathText>{"$|r|<1$"}</MathText> es el error más común: si la razón es 1 o mayor (en valor absoluto), la serie NO converge y no tiene suma.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$|r|<1$", abajo: "$S=\\frac{a_1}{1-r}\\ \\text{existe}$" }}
            incorrecto={{ arriba: "$|r|\\geq1$", abajo: "$\\text{no converge (mal usarla)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con razón negativa",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Serie geométrica infinita
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Hallar la suma de la serie <MathText>{"$8-4+2-1+\\cdots$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a₁=8, r=-1/2. Verifico: |r|=1/2<1, converge" eq={"$S=\\dfrac{8}{1-(-1/2)}=\\dfrac{8}{3/2}$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>S = 16/3</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar la fracción generatriz de $0{,}7777\\ldots$"}
          opciones={["7/9", "7/10", "70/99", "7/99", "Ninguno"]}
          correcta={0}
          explicacion={"$0{,}7777\\ldots=\\dfrac{7}{10}+\\dfrac{7}{100}+\\cdots$ es una PG infinita con $a_1=7/10$, $r=1/10$. $S=\\dfrac{7/10}{1-1/10}=\\dfrac{7/10}{9/10}=\\dfrac79$."}
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
      titulo="Suma de una progresión geométrica infinita"
      posicion="Lámina 5 de 6"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/progresiones/suma-progresion-geometrica-finita", titulo: "Suma de una progresión geométrica finita" }}
      teAbrePuertaA={{ href: "/laminas/progresiones/progresiones-aplicadas", titulo: "Progresiones aplicadas a problemas" }}
    />
  );
}

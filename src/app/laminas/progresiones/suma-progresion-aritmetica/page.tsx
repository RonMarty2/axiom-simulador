"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Suma de una progresión aritmética" — módulo "Progresiones",
// 2da de 6.
export default function SumaProgresionAritmeticaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que sumar una PA entera es tan fácil como promediar sus dos extremos?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\dfrac{a_1+a_n}{2}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>×</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$n$"}</MathText>
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
            Ya sabes promediar dos números. La suma de una PA es exactamente eso: el promedio del primer y último término, multiplicado por la cantidad de términos.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$S_n = \\dfrac{n}{2}(a_1+a_n)$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si no tienes <MathText>{"$a_n$"}</MathText>, hallalo primero con <MathText>{"$a_n=a_1+(n-1)d$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica <MathText>{"$S_n=\\dfrac n2(a_1+a_n)$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si te dan la suma y piden <MathText>{"$n$"}</MathText>, planteá la ecuación resultante y descarta la raíz negativa</span>
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
            Se colocan asientos en filas: la primera tiene 20, la segunda 23, la tercera 26, y así en PA. Si en total hay 819 asientos, ¿cuántas filas se formaron?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="PA con a₁=20, d=3. Planteo la suma" eq={"$S_n=\\dfrac n2[2(20)+(n-1)3]=819$"} />
            <LineaEjemplo glosa="Resolviendo la cuadrática, se descarta la raíz negativa" eq={"$3n^2+37n-1638=0 \\ \\Rightarrow\\ n=18$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>18 filas</span>
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
            Olvidarse de dividir entre 2 es el error más común: la suma es el PROMEDIO de los extremos por la cantidad de términos, no la suma directa de los extremos.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$S_n=\\frac n2(a_1+a_n)$", abajo: "$\\text{promedio} \\times n$" }}
            incorrecto={{ arriba: "$S_n=n(a_1+a_n)$", abajo: "$\\text{(mal, falta} \\div 2\\text{)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con solo los extremos",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            ¿Cuántos medios aritméticos hay que interpolar entre 17 y 67 para que la suma total (con los extremos) sea 462?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="No hace falta la razón: con los extremos alcanza" eq={"$S=\\dfrac{17+67}{2}(k+2)=462$"} />
            <LineaEjemplo glosa="Despejando la cantidad de medios k" eq={"$42(k+2)=462 \\ \\Rightarrow\\ k=9$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>9 medios aritméticos</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Un teatro tiene 15 asientos en la primera fila, 18 en la segunda, 21 en la tercera, y así en PA. Si el teatro tiene capacidad de 285 asientos, ¿cuántas filas debe considerar el diseño?"}
          opciones={["10", "20", "19", "29", "Ninguno"]}
          correcta={0}
          explicacion={"$S_n=\\dfrac n2[2(15)+(n-1)3]=285 \\Rightarrow n^2+9n-190=0 \\Rightarrow n=10$ (se descarta la raíz negativa)."}
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
      titulo="Suma de una progresión aritmética"
      posicion="Lámina 2 de 6"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/progresiones/progresion-aritmetica", titulo: "Progresión aritmética" }}
      teAbrePuertaA={{ href: "/laminas/progresiones/progresion-geometrica", titulo: "Progresión geométrica" }}
    />
  );
}

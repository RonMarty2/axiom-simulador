"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Progresión aritmética" — módulo "Progresiones", 1ra de 6.
export default function ProgresionAritmeticaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que sumar SIEMPRE el mismo número genera una fila predecible de términos?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$2,\\ 5,\\ 8,\\ 11,\\ldots$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$d=3$"}</MathText>
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
            Ya sabes sumar un número fijo varias veces. Una progresión aritmética (PA) es justamente eso: cada término sale del anterior sumándole SIEMPRE la misma razón <MathText>{"$d$"}</MathText>.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$a_n = a_1 + (n-1)\\,d$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identifica el primer término <MathText>{"$a_1$"}</MathText> y la razón <MathText>{"$d$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si no te dan <MathText>{"$d$"}</MathText> directo, plantéala con dos términos conocidos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica <MathText>{"$a_n=a_1+(n-1)d$"}</MathText> para el término que buscas</span>
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
            El primer término de una PA es 8 y el décimo término es -64. Hallar el quinto término.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Uso a₁₀ para hallar d" eq={"$a_{10}=a_1+9d \\ \\Rightarrow\\ -64=8+9d \\ \\Rightarrow\\ d=-8$"} />
            <LineaEjemplo glosa="Ahora hallo a₅ con d ya conocido" eq={"$a_5 = 8+4(-8) = -24$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>a₅ = -24</span>
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
            Usar <MathText>{"$n$"}</MathText> en vez de <MathText>{"$n-1$"}</MathText> es el error más común: el término 10 lleva la razón sumada 9 veces, no 10.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$a_{10}=a_1+9d$", abajo: "$n-1=9\\ \\checkmark$" }}
            incorrecto={{ arriba: "$a_{10}=a_1+10d$", abajo: "$\\text{(mal, sin restar 1)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Progresión aritmética aplicada",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Las ganancias anuales durante 10 años están en PA. El primer año se ganó 200 Bs y el décimo año 3800 Bs. La ganancia G del quinto año verifica:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Con a₁₀ hallo la razón" eq={"$3800=200+9d \\ \\Rightarrow\\ d=400$"} />
            <LineaEjemplo glosa="G es el quinto término" eq={"$G=200+4(400)=1800$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>1750 &lt; G &lt; 1850</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Determinar el término 42 de la progresión aritmética $100,\\ 97,\\ 94,\\ldots$"}
          opciones={["-17", "-21", "-23", "-25", "Ninguno"]}
          correcta={2}
          explicacion={"$a_1=100$, $d=97-100=-3$. $a_{42}=100+41(-3)=100-123=-23$."}
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
      titulo="Progresión aritmética"
      posicion="Lámina 1 de 6"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/progresiones/suma-progresion-aritmetica", titulo: "Suma de una progresión aritmética" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "MCD y MCM" — módulo "Divisores, MCD y MCM", 2da de 3.
export default function McdYMcmPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que el MCD y el MCM se leen directo de la factorización en primos, sin probar números al tanteo?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$12,\\ 18$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\text{MCD}=6,\\ \\text{MCM}=36$"}</MathText>
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
            Recuerda la lámina anterior: cualquier número se descompone en primos con exponentes. El MCD y el MCM son solo comparar esos exponentes entre dos números.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$12 = 2^2 \\times 3^1 \\qquad 18 = 2^1 \\times 3^2$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Los mismos primos (2 y 3), con distinto exponente en cada número.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 46 }}>MCD</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>toma, de cada primo común, el exponente MENOR</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 46 }}>MCM</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>toma, de todos los primos (comunes o no), el exponente MAYOR</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Hallar el MCD y el MCM de <MathText>{"$12$"}</MathText> y <MathText>{"$18$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="12 = 2² × 3¹, 18 = 2¹ × 3²" eq={"$\\text{MCD}: 2^{\\min(2,1)} \\times 3^{\\min(1,2)} = 2^1 \\times 3^1$"} />
            <LineaEjemplo glosa="" eq={"$\\text{MCM}: 2^{\\max(2,1)} \\times 3^{\\max(1,2)} = 2^2 \\times 3^2$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>MCD = 6</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>MCM = 36</span>
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
            Confundir cuál es cuál es el error más común: el MCD achica (exponente menor), el MCM agranda (exponente mayor).
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{MCD}(12,18)$", abajo: "$2^{\\min}3^{\\min}=6$" }}
            incorrecto={{ arriba: "$\\text{MCD}(12,18)$", abajo: "$2^{\\max}3^{\\max}=36$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Una relación útil",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            El producto de dos números <MathText>{"$A$"}</MathText> y <MathText>{"$B$"}</MathText> es <MathText>{"$486$"}</MathText>, y su MCD es <MathText>{"$9$"}</MathText>. Hallar el mayor, <MathText>{"$A$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="A=9p, B=9q, con p y q coprimos" eq={"$A \\cdot B = 81pq = 486 \\ \\Rightarrow\\ pq=6$"} />
            <LineaEjemplo glosa="Pares coprimos con producto 6: (6,1) y (3,2)" eq={"$A = 9 \\times 3 = 27$"} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            <MathText>{"$\\text{MCD} \\times \\text{MCM} = A \\times B$"}</MathText> siempre, pero acá alcanza con el producto y el MCD.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$A = 27$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"El MCD de dos números es 12 y su MCM es 420. Si la diferencia entre ambos es menor que 30, uno de los números es:"}
          opciones={["$84$", "$48$", "$70$", "$66$", "Ninguno"]}
          correcta={0}
          explicacion={"Con $12m$ y $12n$ coprimos: $12mn=420 \\Rightarrow mn=35$. Pares coprimos: $(1,35)$ y $(5,7)$. Con $(5,7)$: números $60$ y $84$, diferencia $24<30$ ✓. Con $(1,35)$: diferencia $408$, no cumple. Los números son $60$ y $84$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="divisores-mcd-mcm"
      moduloTitulo="Divisores, MCD y MCM"
      titulo="MCD y MCM"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/divisores-mcd-mcm/factorizacion-prima-y-divisores", titulo: "Factorización prima y número de divisores" }}
      teAbrePuertaA={{ href: "/laminas/divisores-mcd-mcm", titulo: "Aplicaciones (reparto, encuentros periódicos)" }}
    />
  );
}

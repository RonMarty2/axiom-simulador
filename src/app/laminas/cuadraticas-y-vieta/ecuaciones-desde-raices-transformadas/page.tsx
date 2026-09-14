"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Construir ecuaciones desde raíces transformadas" — módulo
// "Ecuaciones cuadráticas y relaciones de Vieta", 3ra de 5.
export default function EcuacionesDesdeRaicesTransformadasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes construir una ecuación con &quot;el doble de las raíces&quot; de otra, sin averiguar cuáles son esas raíces?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$x^2-5x+6=0$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>ecuación con raíces dobles</span>
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
            En la lámina anterior viste que con la suma y el producto de las raíces alcanza para reconstruir toda la ecuación.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$x^2 - (\\text{suma})x + (\\text{producto}) = 0$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Si transformas las raíces (el doble, más 3, al cuadrado), lo único que cambia es la suma y el producto nuevos. La receta es la misma.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Las raíces de <MathText>{"$x^2-5x+6=0$"}</MathText> son <MathText>{"$2$"}</MathText> y <MathText>{"$3$"}</MathText>. Construir la ecuación cuyas raíces son el <b>doble</b> de esas: <MathText>{"$4$"}</MathText> y <MathText>{"$6$"}</MathText>, sin usarlas directamente.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Por Vieta, original" eq={"$r_1+r_2=5, \\quad r_1 r_2=6$"} />
            <LineaEjemplo glosa="Nueva suma: 2r₁+2r₂ = 2(r₁+r₂)" eq="$2(5) = 10$" />
            <LineaEjemplo glosa="Nuevo producto: (2r₁)(2r₂) = 4·r₁r₂" eq="$4(6) = 24$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x^2 - 10x + 24 = 0$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Verificación directa: raíces 4 y 6 dan suma 10 y producto 24. Coincide.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · error común",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.6 }}>
            Si cada raíz se multiplica por <MathText>{"$k$"}</MathText>, la suma escala por <MathText>{"$k$"}</MathText>, pero el producto escala por <MathText>{"$k^2$"}</MathText>, no por <MathText>{"$k$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(2r_1)(2r_2)$", abajo: "$4\\,r_1r_2$" }}
            incorrecto={{ arriba: "$(2r_1)(2r_2)$", abajo: "$2\\,r_1r_2$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "También funciona en general",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Examen UMSS: si <MathText>{"$x^2+ax+a=0$"}</MathText> tiene raíces reales, hallar la ecuación cuyas raíces son el doble de las originales.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Por Vieta, original" eq={"$r_1+r_2=-a, \\quad r_1r_2=a$"} />
            <LineaEjemplo glosa="Nueva suma y producto" eq={"$2(-a)=-2a, \\quad 4(a)=4a$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x^2 + 2ax + 4a = 0$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Mismo método, con letras en vez de números. No hace falta que la ecuación original tenga coeficientes numéricos.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Las raíces de $x^2-4x+3=0$ son $r_1$ y $r_2$. ¿Cuál es la ecuación cuyas raíces son $r_1+1$ y $r_2+1$?"}
          opciones={["$x^2-6x+8=0$", "$x^2-4x+8=0$", "$x^2-6x+3=0$", "$x^2-8x+6=0$", "Ninguno"]}
          correcta={0}
          explicacion={"Por Vieta: $r_1+r_2=4$, $r_1r_2=3$. Nueva suma $=(r_1{+}1)+(r_2{+}1)=(r_1{+}r_2)+2=6$. Nuevo producto $=(r_1{+}1)(r_2{+}1)=r_1r_2+(r_1{+}r_2)+1=3+4+1=8$. Ecuación: $x^2-6x+8=0$."}
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
      titulo="Construir ecuaciones desde raíces transformadas"
      posicion="Lámina 3 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/cuadraticas-y-vieta/relaciones-de-vieta", titulo: "Relaciones de Vieta" }}
      teAbrePuertaA={{ href: "/laminas/cuadraticas-y-vieta", titulo: "Naturaleza de las raíces" }}
    />
  );
}

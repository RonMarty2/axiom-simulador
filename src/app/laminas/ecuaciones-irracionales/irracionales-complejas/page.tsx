"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Irracionales complejas (radicales anidados)" — módulo
// "Ecuaciones e inecuaciones irracionales", 3ra y última de 3.
export default function IrracionalesComplejasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que algunas ecuaciones con raíces necesitan elevar al cuadrado dos veces para resolverse del todo?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\sqrt{11x-6}=\\sqrt{4x+5}-\\sqrt{x-1}$"}</MathText>
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
            Ya sabés aislar una raíz y elevar al cuadrado. La diferencia acá es que, después de elevar al cuadrado una vez, todavía queda otra raíz sin eliminar.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 13 }}>
            <span>elevás</span>
            <span style={{ color: LIENZO.fgFaint }}>↓</span>
            <span>queda una raíz</span>
            <span style={{ color: LIENZO.fgFaint }}>↓</span>
            <span>aislás de nuevo</span>
            <span style={{ color: LIENZO.fgFaint }}>↓</span>
            <span>elevás de nuevo</span>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Mismo procedimiento de siempre, repetido una vez más.
          </p>
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
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Resolver <MathText>{"$\\sqrt{11x-6}=\\sqrt{4x+5}-\\sqrt{x-1}$"}</MathText>. Dominio: <MathText>{"$x \\geq 1$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Elevando al cuadrado (queda una raíz sola)" eq={"$11x-6 = 5x+4 - 2\\sqrt{(4x{+}5)(x{-}1)}$"} />
            <LineaEjemplo glosa="Aislando esa raíz" eq={"$\\sqrt{(4x{+}5)(x{-}1)} = 5-3x$"} />
            <LineaEjemplo glosa="Elevando al cuadrado otra vez" eq="$5x^2-31x+30=0$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La fórmula general da <MathText>{"$x=5$"}</MathText> o <MathText>{"$x=6/5$"}</MathText>.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = 6/5$"}</MathText></span>
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
            Con dos elevaciones al cuadrado, el riesgo de solución extraña se duplica. Acá <MathText>{"$x=5$"}</MathText> resuelve la ecuación elevada, pero viola una condición que apareció al aislar la raíz: <MathText>{"$5-3x \\geq 0$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$x=6/5$", abajo: "$\\text{cumple } x\\leq 5/3$" }}
            incorrecto={{ arriba: "$x=5$", abajo: "$\\text{viola } x\\leq 5/3$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Cuando la misma raíz se repite",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Resolver <MathText>{"$\\dfrac{x}{x-1}-40=6\\sqrt{\\dfrac{x}{x-1}}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Sustituyendo u = √(x/(x-1)), u≥0" eq={"$u^2-40=6u \\ \\Rightarrow\\ (u-10)(u+4)=0$"} />
            <LineaEjemplo glosa="u=-4 se descarta por negativo. Con u=10" eq="$x/(x-1) = 100$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La misma expresión repetida se vuelve una sola letra, y la ecuación se convierte en una cuadrática común.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = 100/99$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver $\\sqrt{x+7} - \\sqrt{x} = 1$."}
          opciones={["$x=9$", "$x=6$", "$x=3$", "$x=16$", "Ninguno"]}
          correcta={0}
          explicacion={"Aislando: $\\sqrt{x+7}=1+\\sqrt{x}$. Elevando al cuadrado: $x+7=1+2\\sqrt{x}+x \\Rightarrow 6=2\\sqrt{x} \\Rightarrow \\sqrt{x}=3 \\Rightarrow x=9$. Verificación: $\\sqrt{16}-\\sqrt{9}=4-3=1$ ✓."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="ecuaciones-irracionales"
      moduloTitulo="Ecuaciones e inecuaciones irracionales"
      titulo="Irracionales complejas"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/ecuaciones-irracionales/racionalizacion", titulo: "Racionalización" }}
      teAbrePuertaA={{ href: "/laminas/divisores-mcd-mcm", titulo: "Divisores, MCD y MCM" }}
    />
  );
}

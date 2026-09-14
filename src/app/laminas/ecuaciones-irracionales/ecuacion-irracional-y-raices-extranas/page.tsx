"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuación irracional y raíces extrañas" — módulo "Ecuaciones e
// inecuaciones irracionales", 1ra de 3.
export default function EcuacionIrracionalYRaicesExtranasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que elevar al cuadrado una ecuación puede crear una solución falsa que no estaba en la ecuación original?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\sqrt{x+3}=x-3$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.warn}15`, border: `1.5px solid ${LIENZO.warn}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>una de las dos &quot;soluciones&quot; es falsa</span>
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
            Elevar al cuadrado no siempre se puede deshacer sin cuidado. Fíjate:
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$(-2)^2 = 4 = (2)^2$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Dos números distintos, <MathText>{"$-2$"}</MathText> y <MathText>{"$2$"}</MathText>, dan el mismo cuadrado. Al elevar al cuadrado una ecuación con raíces, puede pasar lo mismo: aparece una solución de más.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "1. Aisla la raíz de un lado de la ecuación",
              "2. Elevá al cuadrado los dos lados completos",
              "3. Resuelve la ecuación que queda",
              "4. Verifica CADA solución en la ecuación ORIGINAL (no en la elevada)",
            ].map((t) => (
              <div key={t} style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Resolver <MathText>{"$\\sqrt{x+3} = x-3$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Elevando al cuadrado" eq="$x+3 = (x-3)^2 = x^2-6x+9$" />
            <LineaEjemplo glosa="Reordenando" eq={"$x^2-7x+6=0 \\ \\Rightarrow\\ (x-6)(x-1)=0$"} />
            <LineaEjemplo glosa="" eq={"$x=6 \\text{ o } x=1$"} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Verificando en la ORIGINAL: <MathText>{"$x=6$"}</MathText>: <MathText>{"$\\sqrt9=3$"}</MathText> y <MathText>{"$6-3=3$"}</MathText> ✓. <MathText>{"$x=1$"}</MathText>: <MathText>{"$\\sqrt4=2$"}</MathText> pero <MathText>{"$1-3=-2$"}</MathText> ✗.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = 6$"}</MathText></span>
            <span style={{ fontSize: 12, color: LIENZO.fgDim, marginLeft: 10 }}>(<MathText>{"$x=1$"}</MathText> es extraña)</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · error común",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Hallar la suma de raíces de <MathText>{"$x-\\sqrt{x}-2=0$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="u=√x (por definición, u≥0)" eq={"$u^2-u-2=0 \\ \\Rightarrow\\ (u-2)(u+1)=0$"} />
          </div>
          <p style={{ margin: "10px 0 10px", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El error más común es aceptar las dos soluciones de <MathText>{"$u$"}</MathText> sin revisar la condición <MathText>{"$u \\geq 0$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$u=2$", abajo: "$\\text{válida, } x=4$" }}
            incorrecto={{ arriba: "$u=-1$", abajo: "$\\text{imposible: } \\sqrt{x}\\geq 0$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "A veces no hay ninguna solución",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.6 }}>
            <MathText>{"$\\dfrac{1}{\\sqrt{x+2}}-\\dfrac{1}{\\sqrt{x-2}}=\\dfrac{1}{\\sqrt{x-3}}-\\dfrac{1}{\\sqrt{x+3}}$"}</MathText>, con dominio <MathText>{"$x>3$"}</MathText>.
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.6 }}>
            Antes de elevar nada al cuadrado, mira los signos: para <MathText>{"$x>3$"}</MathText>, el lado izquierdo siempre da negativo, y el derecho siempre da positivo.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.bad}15`, border: `1.5px solid ${LIENZO.bad}`,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: LIENZO.bad }}>negativo = positivo, nunca. No hay solución.</span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Mirar el signo antes de elevar al cuadrado ahorra páginas enteras de álgebra.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Hallar $x$: $\\sqrt{x}+\\sqrt{x+5}=\\dfrac{10}{\\sqrt{x}}$."}
          opciones={["$4$", "$2$", "$16$", "$20$", "Ninguno"]}
          correcta={0}
          explicacion={"Multiplicando por $\\sqrt{x}$: $x+\\sqrt{x(x+5)}=10 \\Rightarrow \\sqrt{x^2+5x}=10-x$. Elevando al cuadrado: $x^2+5x=100-20x+x^2 \\Rightarrow 25x=100 \\Rightarrow x=4$. Verificación: $\\sqrt4+\\sqrt9=2+3=5$ y $10/\\sqrt4=5$ ✓."}
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
      titulo="Ecuación irracional y raíces extrañas"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/cuadraticas-y-vieta/ecuacion-cuadratica-discriminante", titulo: "Ecuación cuadrática y discriminante" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-irracionales", titulo: "Racionalización" }}
    />
  );
}

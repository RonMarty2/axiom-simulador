"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones literales (despeje)" — módulo "Ecuaciones y
// expresiones racionales", 3ra de 4.
export default function EcuacionesLiteralesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes despejar una incógnita aunque la ecuación tenga puras letras, no solo números?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$3x+5=11$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$ax+b=c$"}</MathText>
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
            Para despejar <MathText>{"$x$"}</MathText> en <MathText>{"$3x+5=11$"}</MathText>, restas 5 y divides entre 3. El único cambio en una ecuación literal es que los números 3 y 5 ahora son letras.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$ax + b = c \\ \\Rightarrow\\ x = \\dfrac{c-b}{a}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Tratas a las demás letras (<MathText>{"$a$"}</MathText>, <MathText>{"$b$"}</MathText>, <MathText>{"$c$"}</MathText>) como si fueran números conocidos, solo que no sabes cuánto valen.
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
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            Resolver <MathText>{"$\\dfrac{a-x}{a}-\\dfrac{b-x}{b}=\\dfrac{2(a-b)}{ab}$"}</MathText> para <MathText>{"$x$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicando todo por ab" eq="$b(a{-}x) - a(b{-}x) = 2(a-b)$" />
            <LineaEjemplo glosa="Expandiendo (ab se cancela)" eq="$-bx + ax = 2(a-b)$" />
            <LineaEjemplo glosa="Factorizando x" eq="$x(a-b) = 2(a-b)$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = 2$"}</MathText></span>
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
            Para pasar de <MathText>{"$x(a-b)=2(a-b)$"}</MathText> a <MathText>{"$x=2$"}</MathText> dividiste entre <MathText>{"$(a-b)$"}</MathText>. Esa división solo vale si <MathText>{"$(a-b) \\neq 0$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$x(a-b)=2(a-b)$", abajo: "$x=2, \\text{ si } a\\neq b$" }}
            incorrecto={{ arriba: "$x(a-b)=2(a-b)$", abajo: "$x=2 \\text{ siempre}$" }}
          />
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Igual que no puedes dividir entre 0 con números, no puedes dividir entre una letra sin saber que es distinta de cero.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "A veces hay que expandir primero",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Resolver <MathText>{"$a(x+b)-(x+a)^2=-x^2$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Expandiendo el cuadrado" eq="$ax+ab-(x^2+2ax+a^2)=-x^2$" />
            <LineaEjemplo glosa="Los términos x² se cancelan a ambos lados" eq="$ax+ab-2ax-a^2=0$" />
            <LineaEjemplo glosa="Factorizando -a" eq="$-a(x-b+a)=0$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Como <MathText>{"$a \\neq 0$"}</MathText>, lo que queda entre paréntesis tiene que ser cero.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = b - a$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolviendo $\\dfrac{a+1}{b}=\\dfrac{b+1}{a}+\\dfrac{a-1}{b}-\\dfrac{b}{a}$ para la variable $b$, se obtiene que $b$ vale:"}
          opciones={["$2a$", "$4a$", "$-2a$", "$-4a$", "Ninguno"]}
          correcta={0}
          explicacion={"Agrupando los términos con denominador $b$ de un lado y los de denominador $a$ del otro: $\\dfrac{(a+1)-(a-1)}{b}=\\dfrac{(b+1)-b}{a} \\Rightarrow \\dfrac{2}{b}=\\dfrac{1}{a} \\Rightarrow b=2a$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="ecuaciones-racionales"
      moduloTitulo="Ecuaciones y expresiones racionales"
      titulo="Ecuaciones literales (despeje)"
      posicion="Lámina 3 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/ecuaciones-racionales/ecuaciones-racionales", titulo: "Ecuaciones racionales" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-racionales", titulo: "Fracciones parciales" }}
    />
  );
}

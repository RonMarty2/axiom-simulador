"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Fracciones parciales" — módulo "Ecuaciones y expresiones
// racionales", 4ta y última de 4. Sin pregunta real en el banco UMSS
// Ingeniería para este tema puntual (no aparece etiquetado); ejemplos
// propios, verificados a mano por sustitución antes de escribirlos.
export default function FraccionesParcialesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes deshacer la suma de fracciones que aprendiste a combinar, partiendo una fracción en piezas simples?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\dfrac{7x+3}{(x+1)(x+2)}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\dfrac{-4}{x+1}+\\dfrac{11}{x+2}$"}</MathText>
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
            En la lámina de ecuaciones racionales combinaste dos fracciones en una, con común denominador. Acá haces exactamente el camino inverso.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\dfrac{A}{x+1}+\\dfrac{B}{x+2}\\ \\longleftrightarrow\\ \\dfrac{7x+3}{(x+1)(x+2)}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El trabajo es encontrar qué números son <MathText>{"$A$"}</MathText> y <MathText>{"$B$"}</MathText>.
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
              "1. El denominador ya está factorizado en piezas lineales distintas",
              "2. Proponé una fracción con letra (A, B...) por cada factor",
              "3. Multiplica todo por el denominador común, para borrar las fracciones",
              "4. Reemplaza x por la raíz de cada factor: eso anula todos los términos menos uno",
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
            Descomponer <MathText>{"$\\dfrac{7x+3}{(x+1)(x+2)}$"}</MathText> en fracciones parciales.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Proponiendo A y B, multiplicando por (x+1)(x+2)" eq="$7x+3 = A(x+2) + B(x+1)$" />
            <LineaEjemplo glosa="x=-1 (raíz del primer factor): anula a B" eq={"$7(-1)+3 = A(1) \\Rightarrow A=-4$"} />
            <LineaEjemplo glosa="x=-2 (raíz del segundo factor): anula a A" eq={"$7(-2)+3 = B(-1) \\Rightarrow B=11$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\dfrac{-4}{x+1} + \\dfrac{11}{x+2}$"}</MathText></span>
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
            Para anular el término con <MathText>{"$B$"}</MathText>, hay que usar la raíz del factor <MathText>{"$(x+1)$"}</MathText>, que es <MathText>{"$x=-1$"}</MathText>, no <MathText>{"$x=1$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(x+1) = 0$", abajo: "$x = -1$" }}
            incorrecto={{ arriba: "$(x+1) = 0$", abajo: "$x = 1$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Cuando un factor se repite",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Si el factor aparece elevado al cuadrado, hace falta un término extra: uno con el factor simple, y otro con el factor al cuadrado.
          </p>
          <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 10, fontSize: 14, marginBottom: 10 }}>
            <MathText>{"$\\dfrac{3x+5}{(x+1)^2} = \\dfrac{A}{x+1} + \\dfrac{B}{(x+1)^2}$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicando por (x+1)²" eq="$3x+5 = A(x+1) + B$" />
            <LineaEjemplo glosa="x=-1: anula el término con A" eq={"$3(-1)+5 = B \\Rightarrow B=2$"} />
            <LineaEjemplo glosa="Comparando el coeficiente de x" eq="$A = 3$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Un solo término <MathText>{"$A/(x+1)$"}</MathText> no hubiera alcanzado para representar toda la fracción original.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Si $\\dfrac{5x+10}{(x-1)(x+4)} = \\dfrac{A}{x-1} + \\dfrac{B}{x+4}$, ¿cuánto vale $A$?"}
          opciones={["$3$", "$2$", "$5$", "$10$", "Ninguno"]}
          correcta={0}
          explicacion={"Multiplicando por $(x-1)(x+4)$: $5x+10=A(x+4)+B(x-1)$. Con $x=1$ (raíz de $x-1$): $5(1)+10=15=A(5) \\Rightarrow A=3$."}
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
      titulo="Fracciones parciales"
      posicion="Lámina 4 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/ecuaciones-racionales/ecuaciones-literales", titulo: "Ecuaciones literales (despeje)" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-irracionales", titulo: "Ecuaciones e inecuaciones irracionales" }}
    />
  );
}

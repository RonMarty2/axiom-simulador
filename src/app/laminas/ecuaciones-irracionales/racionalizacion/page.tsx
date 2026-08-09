"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Racionalización" — módulo "Ecuaciones e inecuaciones
// irracionales", 2da de 3.
export default function RacionalizacionPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés sacar una raíz del denominador, multiplicando por la forma justa de 1?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\dfrac{1}{\\sqrt2}$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\dfrac{\\sqrt2}{2}$"}</MathText>
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
            Multiplicar por <MathText>{"$\\sqrt2/\\sqrt2$"}</MathText> no cambia el valor (es multiplicar por 1), pero sí cambia cómo se ve.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$\\dfrac{1}{\\sqrt2} \\cdot \\dfrac{\\sqrt2}{\\sqrt2} = \\dfrac{\\sqrt2}{2}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La raíz sigue estando, pero ahora arriba, no abajo. Esa es toda la idea de racionalizar.
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
              "Si el denominador es una sola raíz: multiplicá por esa misma raíz arriba y abajo",
              "Si el denominador es una suma o resta con raíces: multiplicá por el conjugado (mismos términos, signo del medio cambiado)",
              "El conjugado convierte la resta en una diferencia de cuadrados, y la raíz desaparece de abajo",
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
            Racionalizar <MathText>{"$\\dfrac{1}{\\sqrt5-2}$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Multiplicando por el conjugado, arriba y abajo" eq={"$\\dfrac{1}{\\sqrt5-2} \\cdot \\dfrac{\\sqrt5+2}{\\sqrt5+2}$"} />
            <LineaEjemplo glosa="El denominador es diferencia de cuadrados" eq={"$= \\dfrac{\\sqrt5+2}{5-4}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$\\sqrt5+2$"}</MathText></span>
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
            El conjugado se multiplica arriba Y abajo. Multiplicarlo solo en el denominador cambia el valor de la expresión.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\dfrac{1}{\\sqrt5-2}\\cdot\\dfrac{\\sqrt5+2}{\\sqrt5+2}$", abajo: "$\\sqrt5+2$" }}
            incorrecto={{ arriba: "$\\dfrac{1}{(\\sqrt5-2)(\\sqrt5+2)}$", abajo: "$\\dfrac{1}{1}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Para qué sirve en serio",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Evaluar <MathText>{"$E=\\dfrac{x-5}{\\sqrt{x-4}-\\sqrt{3x-14}}$"}</MathText> en <MathText>{"$x=5$"}</MathText>. Directo da <MathText>{"$0/0$"}</MathText>, indeterminado.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Racionalizando con el conjugado del denominador" eq={"$E = \\dfrac{(x-5)(\\sqrt{x-4}+\\sqrt{3x-14})}{(x-4)-(3x-14)}$"} />
            <LineaEjemplo glosa="El denominador se simplifica a -2(x-5), que cancela con arriba" eq={"$E = -\\dfrac{\\sqrt{x-4}+\\sqrt{3x-14}}{2}$"} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ahora sí se puede evaluar en <MathText>{"$x=5$"}</MathText> sin dividir entre cero.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = -1$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Racionalizar $\\dfrac{1}{\\sqrt7-\\sqrt5}$."}
          opciones={["$\\dfrac{\\sqrt7+\\sqrt5}{2}$", "$\\sqrt7+\\sqrt5$", "$\\dfrac{\\sqrt7-\\sqrt5}{2}$", "$\\dfrac{1}{2}$", "Ninguno"]}
          correcta={0}
          explicacion={"Multiplicando por el conjugado: $\\dfrac{1}{\\sqrt7-\\sqrt5}\\cdot\\dfrac{\\sqrt7+\\sqrt5}{\\sqrt7+\\sqrt5}=\\dfrac{\\sqrt7+\\sqrt5}{7-5}=\\dfrac{\\sqrt7+\\sqrt5}{2}$."}
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
      titulo="Racionalización"
      posicion="Lámina 2 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/ecuaciones-irracionales/ecuacion-irracional-y-raices-extranas", titulo: "Ecuación irracional y raíces extrañas" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-irracionales", titulo: "Irracionales complejas" }}
    />
  );
}

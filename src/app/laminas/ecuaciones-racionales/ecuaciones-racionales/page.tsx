"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones racionales" — módulo "Ecuaciones y expresiones
// racionales", 2da de 4.
export default function EcuacionesRacionalesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que al resolver una ecuación racional, a veces encontrás una &quot;solución&quot; que en realidad no es válida?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>resolvés la ecuación</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.warn}15`, border: `1.5px solid ${LIENZO.warn}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>verificás contra el dominio</span>
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
            Recordá la lámina anterior: en toda expresión racional, el denominador nunca puede ser cero. Esa regla no desaparece cuando la expresión pasa a ser parte de una ecuación.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\dfrac{1}{x-2} - \\dfrac{1}{x-1} = \\dfrac{1}{6}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Antes de resolver nada, ya sabés que <MathText>{"$x \\neq 2$"}</MathText> y <MathText>{"$x \\neq 1$"}</MathText>.
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
              "1. Anotá qué valores están prohibidos (los que anulan algún denominador)",
              "2. Multiplicá toda la ecuación por el común denominador, para que desaparezcan las fracciones",
              "3. Resolvé la ecuación que queda (lineal o cuadrática)",
              "4. Descartá cualquier solución que coincida con un valor prohibido del paso 1",
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
          <p style={{ marginBottom: 10, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Hallar <MathText>{"$E=x_1+x_2$"}</MathText> de <MathText>{"$\\dfrac{1}{x-2}-\\dfrac{1}{x-1}=\\dfrac{1}{6}$"}</MathText>. Prohibidos: <MathText>{"$x \\neq 1, 2$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Combinando el lado izquierdo" eq={"$\\dfrac{(x-1)-(x-2)}{(x-2)(x-1)} = \\dfrac{1}{6}$"} />
            <LineaEjemplo glosa="El numerador se simplifica a 1" eq="$(x-2)(x-1) = 6$" />
            <LineaEjemplo glosa="Expandiendo y resolviendo" eq={"$x^2-3x-4=0 \\ \\Rightarrow\\ x=4 \\text{ o } x=-1$"} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ninguna de las dos coincide con un valor prohibido: ambas son válidas.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = 4 + (-1) = 3$"}</MathText></span>
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
            <MathText>{"$\\dfrac{x+5}{x-2}=\\dfrac{6}{x+2}+\\dfrac{28}{x^2-4}$"}</MathText>. Prohibidos: <MathText>{"$x \\neq \\pm 2$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicando por (x-2)(x+2) y resolviendo" eq={"$x^2+x-6=0 \\ \\Rightarrow\\ x=2 \\text{ o } x=-3$"} />
          </div>
          <p style={{ margin: "10px 0 10px", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El olvido más común es entregar las dos soluciones sin filtrarlas.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$x=-3$", abajo: "$\\text{válida}$" }}
            incorrecto={{ arriba: "$x=2$", abajo: "$\\text{prohibida, se descarta}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Y sirven para modelar problemas reales",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.6 }}>
            Un tren recorre 24 km. Si hubiera ido 2 km/h más lento, habría tardado 2 horas más. ¿Cuánto tardó?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="v = velocidad real, tiempo = distancia/velocidad" eq={"$\\dfrac{24}{v-2} - \\dfrac{24}{v} = 2$"} />
            <LineaEjemplo glosa="Combinando y despejando" eq={"$v(v-2) = 24 \\ \\Rightarrow\\ v=6 \\text{ km/h}$"} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La otra raíz, <MathText>{"$v=-4$"}</MathText>, se descarta porque una velocidad no puede ser negativa.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$t = 24/6 = 4 \\text{ h}$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver $\\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 2$."}
          opciones={["Ninguna solución válida", "$x=3$", "$x=-3$", "$x=6$", "$x=0$"]}
          correcta={0}
          explicacion={"Multiplicando por $(x-3)$: $x = 3 + 2(x-3) \\Rightarrow x = 2x-3 \\Rightarrow x=3$. Pero $x=3$ anula el denominador original: es una solución prohibida. La ecuación no tiene ninguna solución válida."}
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
      titulo="Ecuaciones racionales"
      posicion="Lámina 2 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/ecuaciones-racionales/expresion-racional-y-simplificacion", titulo: "Qué es una expresión racional y cómo simplificarla" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-racionales", titulo: "Ecuaciones literales" }}
    />
  );
}

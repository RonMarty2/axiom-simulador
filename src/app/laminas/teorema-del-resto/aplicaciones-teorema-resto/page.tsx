"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Aplicaciones combinadas" — módulo "Teorema del Resto y división de
// polinomios", 5ta y última de 5 (las otras 4 ya publicadas). Es el cierre
// del módulo: el problema principal es una pregunta REAL del banco
// (2007-parcial1-1-2007, Pregunta con tema division-polinomios-divisibilidad)
// elegida a propósito porque combina, en un solo ejercicio, las 3 láminas
// anteriores: factorizar un divisor de grado 2 (División de polinomios),
// Teorema del Factor (dos veces) y resolver el sistema resultante.
export default function AplicacionesTeoremaRestoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            En el examen real nunca te piden una sola idea sola. Te dan un problema que junta dos o tres de las herramientas que ya aprendiste en este módulo.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["División", "Ruffini", "Teo. Resto", "Teo. Factor"].map((v) => (
              <span key={v} style={{
                padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft,
                fontSize: 12.5, color: LIENZO.fgDim, fontWeight: 600,
              }}>
                {v}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "center", margin: "10px 0", fontSize: 20, color: LIENZO.fgFaint }}>↓</div>
          <div style={{ textAlign: "center", padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>un solo problema, todo junto</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de lo que ya sabés",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Cuando el divisor es de grado 2, el primer movimiento es siempre el mismo: factorizarlo en dos factores lineales, como en la lámina de división.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Divisor de grado 2" eq="$Q(x) = x^2 + x - 2$" />
            <LineaEjemplo glosa="Factorizado" eq="$Q(x) = (x-1)(x+2)$" />
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ahí es donde entran el Teorema del Resto y el Teorema del Factor: uno por cada raíz.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "El problema real",
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 13.5, color: LIENZO.fgDim, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS, Ingeniería
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7 }}>
            Determinar <MathText>{"$E = m^2 + n^2$"}</MathText> para que <MathText>{"$P(x) = x^4 + 3x^3 - 5x^2 + mx - n$"}</MathText> sea divisible entre <MathText>{"$Q(x) = x^2 + x - 2$"}</MathText>.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Paso 1 · Factorizar el divisor",
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Igual que antes: buscás los dos valores que anulan a <MathText>{"$Q(x)$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Factorizando" eq="$x^2+x-2 = (x-1)(x+2)$" />
            <LineaEjemplo glosa="Raíces" eq={"$x = 1 \\quad \\text{y} \\quad x = -2$"} />
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Que <MathText>{"$P(x)$"}</MathText> sea divisible entre <MathText>{"$Q(x)$"}</MathText> completo significa que es divisible entre los dos factores a la vez.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Paso 2 · Teorema del Factor, dos veces",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Cada raíz te da su propia ecuación: si <MathText>{"$(x-1)$"}</MathText> y <MathText>{"$(x+2)$"}</MathText> son factores, entonces <MathText>{"$P(1)=0$"}</MathText> y <MathText>{"$P(-2)=0$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="En x = 1" eq="$1 + 3 - 5 + m - n = 0$" />
            <LineaEjemplo glosa="" eq="$m - n = 1$" />
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px", marginTop: 10 }}>
            <LineaEjemplo glosa="En x = -2 (cuidado con los signos)" eq="$16 - 24 - 20 - 2m - n = 0$" />
            <LineaEjemplo glosa="" eq="$2m + n = -28$" />
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Paso 3 · Resolver el sistema",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Dos ecuaciones, dos incógnitas. De la primera, <MathText>{"$m = n+1$"}</MathText>, y reemplazás en la segunda.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Sustituyendo" eq="$2(n+1) + n = -28$" />
            <LineaEjemplo glosa="" eq="$3n = -30$" />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$n = -10$"}</MathText></span>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$m = -9$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Paso 4 · Responder lo que piden",
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            Ojo: <MathText>{"$m$"}</MathText> y <MathText>{"$n$"}</MathText> no eran la respuesta final. Piden <MathText>{"$E = m^2+n^2$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="" eq="$E = (-9)^2 + (-10)^2$" />
            <LineaEjemplo glosa="" eq="$E = 81 + 100$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = 181$"}</MathText></span>
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
            Al evaluar en un número negativo, el signo del resultado depende de si el exponente es par o impar. Es donde más se pierden puntos en estos problemas.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(-2)^4$", abajo: "$16$" }}
            incorrecto={{ arriba: "$(-2)^3$", abajo: "$-8$" }}
          />
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Exponente par, resultado positivo. Exponente impar, conserva el signo del número. Revisá cada término por separado antes de sumar.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Dado $Q(x) = x^5 - 4x^4 + px^3 - qx^2 + x - 1$, al dividirlo entre $(x+1)$ el residuo es 1, y al dividirlo entre $(x-1)$ el residuo es 3. Hallar $p$."}
          opciones={["$1$", "$-1$", "$-7$", "$7$", "Ninguno"]}
          correcta={1}
          explicacion={"Por Teorema del Resto: $Q(-1)=1 \\Rightarrow -1-4-p-q-1-1=1 \\Rightarrow p+q=-8$. Y $Q(1)=3 \\Rightarrow 1-4+p-q+1-1=3 \\Rightarrow p-q=6$. Sumando ambas ecuaciones: $2p=-2 \\Rightarrow p=-1$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="teorema-del-resto"
      moduloTitulo="Teorema del Resto y división de polinomios"
      titulo="Aplicaciones combinadas"
      posicion="Lámina 5 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/teorema-del-resto/teorema-del-factor", titulo: "Teorema del Factor" }}
      teAbrePuertaA={{ href: "/laminas/cuadraticas-y-vieta", titulo: "Ecuaciones cuadráticas y relaciones de Vieta" }}
    />
  );
}

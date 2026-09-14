"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, PasoCard, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Sistemas lineales 2×2" — módulo "Sistemas de ecuaciones", 1ra de
// 4. Construida en formato de tarjetas aplicando reglas 1-12 desde el
// primer borrador.
export default function SistemasLineales2x2Page() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes hacer &quot;desaparecer&quot; una de las dos incógnitas con solo sumar bien las dos ecuaciones?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>2 ecuaciones, 2 incógnitas</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>1 ecuación, 1 incógnita</span>
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
            Una sola ecuación con una sola incógnita ya sabes resolverla. El truco de un sistema es reducirlo a eso.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$5y = 10 \\ \\Rightarrow\\ y = 2$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            La pregunta es cómo pasar de dos incógnitas a una sola, sin perder información en el camino.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 1 de 2",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Si multiplicas una ecuación entera por un número, sigue siendo la misma igualdad. Eliges el número para que una incógnita quede con coeficientes opuestos en las dos ecuaciones.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Ecuación 2, multiplicada por 3" eq={"$x - y = 1 \\ \\Rightarrow\\ 3x - 3y = 3$"} />
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Por qué funciona · Paso 2 de 2",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Sumando las dos ecuaciones término a término, la incógnita con signos opuestos se cancela sola.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="" eq="$2x + 3y = 12$" />
            <LineaEjemplo glosa="+" eq="$3x - 3y = 3$" />
            <LineaEjemplo glosa="Sumando (la y se cancela)" eq="$5x = 15$" />
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Resolver el sistema completo: <MathText>{"$2x+3y=12$"}</MathText> y <MathText>{"$x-y=1$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Despejando x de la 2da ecuación" eq="$x = y+1$" />
            <LineaEjemplo glosa="Sustituyendo en la 1ra" eq="$2(y+1) + 3y = 12$" />
            <LineaEjemplo glosa="" eq={"$5y + 2 = 12 \\ \\Rightarrow\\ y = 2$"} />
            <LineaEjemplo glosa="Volviendo a x = y+1" eq="$x = 3$" />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x = 3,\\ y = 2$"}</MathText></span>
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
            Al multiplicar una ecuación por un número negativo (o al restar en vez de sumar), hay que cambiar el signo de TODOS los términos, no solo del que quieres cancelar.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$-1 \\cdot (x-y=1)$", abajo: "$-x+y=-1$" }}
            incorrecto={{ arriba: "$-1 \\cdot (x-y=1)$", abajo: "$-x-y=1$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Un dato escondido en palabras",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Examen UMSS: en el sistema <MathText>{"$3x-k=5y$"}</MathText>, <MathText>{"$2x+3y=3k+1$"}</MathText>, hallar <MathText>{"$k$"}</MathText> para que <MathText>{"$x$"}</MathText> exceda a <MathText>{"$y$"}</MathText> en 3 unidades.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="La frase esconde" eq="$x = y+3$" />
            <LineaEjemplo glosa="Sustituyendo en la 1ra" eq={"$3(y{+}3)-k=5y \\ \\Rightarrow\\ y=\\dfrac{9-k}{2}$"} />
            <LineaEjemplo glosa="Sustituyendo en la 2da" eq={"$2(y{+}3)+3y=3k{+}1 \\ \\Rightarrow\\ y=\\dfrac{3k-5}{5}$"} />
            <LineaEjemplo glosa="Igualando ambas expresiones de y" eq={"$\\dfrac{9-k}{2}=\\dfrac{3k-5}{5}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$k = 5$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver el sistema $3x + 2y = 16$, $x + y = 7$. ¿Cuánto vale $x$?"}
          opciones={["$2$", "$5$", "$3$", "$4$", "Ninguno"]}
          correcta={0}
          explicacion={"De la 2da ecuación: $y=7-x$. Sustituyendo: $3x+2(7-x)=16 \\Rightarrow x+14=16 \\Rightarrow x=2$ (y $y=5$)."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="sistemas-de-ecuaciones"
      moduloTitulo="Sistemas de ecuaciones"
      titulo="Sistemas lineales 2×2"
      posicion="Lámina 1 de 4"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/sistemas-de-ecuaciones", titulo: "Sistemas lineales 3×3 y más" }}
    />
  );
}

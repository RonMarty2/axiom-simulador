"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import {
  TarjetaPractica, PasoCard, FlechaMini, FilaRol, LineaEjemplo,
} from "../../_components/dispositivos";

// Lámina "División de polinomios" — módulo "Teorema del Resto y división de
// polinomios", 1ra de 5 (las últimas dos, 3 y 4, ya estaban publicadas —
// esta es la base que faltaba). Construida en formato de tarjetas aplicando
// reglas 1-12 desde el primer borrador. A diferencia de Teorema del
// Resto/Factor (una demostración corta), acá el contenido ES un
// procedimiento de varios pasos — se anclan los pasos 1 a 1 contra la
// división numérica de toda la vida, ya que es literalmente el mismo
// algoritmo con otro nombre.
export default function DivisionDePolinomiosPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que dividir polinomios es exactamente el mismo procedimiento que ya usabas para dividir números grandes a mano?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ padding: "12px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <div className="font-crimson" style={{ fontSize: 18 }}>754 ÷ 3</div>
              <div style={{ fontSize: 9.5, color: LIENZO.fgDim, textTransform: "uppercase", marginTop: 4 }}>ya lo sabes hacer</div>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>=</span>
            <div style={{ padding: "12px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`, textAlign: "center" }}>
              <MathText>{"$(2x^3{+}3x^2{-}4x{+}1) \\div (x{+}2)$"}</MathText>
              <div style={{ fontSize: 9.5, color: LIENZO.fgDim, textTransform: "uppercase", marginTop: 4 }}>mismo algoritmo</div>
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
            Repasemos <MathText>{"$754 \\div 3$"}</MathText> como en la primaria: bajas un dígito, repartes lo más grande posible, multiplicas, restas, repites.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px", marginBottom: 12 }}>
            <LineaEjemplo glosa="7 entre 3 da 2, sobran 1. Bajas el 5: queda 15" eq={"$7 \\rightarrow 2,\\ \\text{resto } 1\\ \\rightarrow\\ 15$"} />
            <LineaEjemplo glosa="15 entre 3 da 5, sobran 0. Bajas el 4: queda 4" eq={"$15 \\rightarrow 5,\\ \\text{resto } 0\\ \\rightarrow\\ 4$"} />
            <LineaEjemplo glosa="4 entre 3 da 1, sobran 1. No queda nada más que bajar" eq={"$4 \\rightarrow 1,\\ \\text{resto } 1$"} />
          </div>
          <div style={{
            marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$754 = 3 \\times 251 + 1$"}</MathText></span>
          </div>
          <p style={{ margin: "12px 0 4px", fontSize: 12.5, color: LIENZO.fgDim, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
            Con polinomios es la misma coreografía:
          </p>
          <FilaRol rol="Repartir lo más grande posible" conocido="7÷3" nuevo="término÷término" />
          <FilaRol rol="Multiplicar y restar" conocido="7−(3×2)" nuevo="igual" />
          <FilaRol rol="Bajar y repetir" conocido="bajas el 5" nuevo="igual" ultimo />
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 1 de 3",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Divide el término líder del dividendo entre el término líder del divisor. Eso es el primer término del cociente.
          </p>
          <div style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
            <MathText>{"$2x^3 \\div x = 2x^2$"}</MathText>
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 13.5, lineHeight: 1.6 }}>
            Multiplica TODO el divisor por ese término y restaselo al dividendo:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicas" eq="$2x^2(x+2) = 2x^3 + 4x^2$" />
            <LineaEjemplo glosa="Restas al dividendo" eq="$(2x^3{+}3x^2{-}4x{+}1) - (2x^3{+}4x^2)$" />
            <LineaEjemplo glosa="" eq="$= -x^2 - 4x + 1$" />
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 2 de 3",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Repites exactamente lo mismo, ahora con lo que quedó (<MathText>{"$-x^2-4x+1$"}</MathText>) en vez del dividendo original.
          </p>
          <div style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
            <MathText>{"$-x^2 \\div x = -x$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicas" eq="$-x(x+2) = -x^2 - 2x$" />
            <LineaEjemplo glosa="Restas" eq="$(-x^2{-}4x{+}1) - (-x^2{-}2x)$" />
            <LineaEjemplo glosa="" eq="$= -2x + 1$" />
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 3 de 3",
      contenido: (
        <div>
          <PasoCard n={3}>
            <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
              Una vuelta más con <MathText>{"$-2x+1$"}</MathText>:
            </p>
            <div style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
              <MathText>{"$-2x \\div x = -2$"}</MathText>
            </div>
            <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
              <LineaEjemplo glosa="Multiplicas" eq="$-2(x+2) = -2x - 4$" />
              <LineaEjemplo glosa="Restas" eq="$(-2x{+}1) - (-2x{-}4)$" />
              <LineaEjemplo glosa="" eq="$= 5$" />
            </div>
          </PasoCard>
          <p style={{ margin: "12px 0 8px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El <MathText>{"$5$"}</MathText> que quedó es de grado 0, menor que el grado 1 del divisor. Ahí parás: no hay más para bajar.
          </p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$Q(x) = 2x^2 - x - 2$"}</MathText></span>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$R = 5$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
            Todo resultado de una división se puede comprobar igual que en la primaria: dividendo = divisor × cociente + resto.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Divisor × cociente" eq="$(x+2)(2x^2-x-2)$" />
            <LineaEjemplo glosa="Multiplicando todo" eq="$= 2x^3 + 3x^2 - 4x - 4$" />
            <LineaEjemplo glosa="Más el resto" eq="$2x^3 + 3x^2 - 4x - 4 + 5$" />
            <LineaEjemplo glosa="" eq="$= 2x^3 + 3x^2 - 4x + 1$" />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>Coincide con el dividendo original ✓</span>
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
            Si el dividendo se &quot;saltea&quot; un grado, hay que escribirlo igual con coeficiente 0. Si no, te desalineas y el resultado sale mal.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}55`, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: LIENZO.fgDim, textTransform: "uppercase", marginBottom: 6 }}>correcto</div>
              <MathText block>{"$x^3 + 0x^2 + 0x - 8$"}</MathText>
            </div>
            <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}55`, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: LIENZO.fgDim, textTransform: "uppercase", marginBottom: 6 }}>salteado</div>
              <MathText block>{"$x^3 - 8$"}</MathText>
            </div>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Los dos son el mismo polinomio, pero solo el de la izquierda tiene un lugar marcado para cada potencia. Escribilo así antes de empezar a dividir.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "También funciona con un divisor no tan simple",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            El algoritmo no cambia si el divisor tiene coeficiente. Cada &quot;repartir&quot; se hace contra ese coeficiente, nada más.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Término líder entre término líder" eq={"$2x^2 \\div 2x = x$"} />
            <LineaEjemplo glosa="Multiplicas y restas" eq={"$(2x^2{+}x{-}3) - x(2x-1)$"} />
            <LineaEjemplo glosa="" eq="$= 2x - 3$" />
            <LineaEjemplo glosa="Otra vuelta" eq={"$2x \\div 2x = 1$"} />
            <LineaEjemplo glosa="" eq={"$(2x{-}3) - 1(2x-1) = -2$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$Q(x) = x + 1$"}</MathText></span>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$R = -2$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            De <MathText>{"$(2x^2+x-3) \\div (2x-1)$"}</MathText>. A veces los términos del cociente salen con fracción, no pasa nada, sigues igual.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Al dividir $P(x) = x^3 - 3x^2 + 5x - 6$ entre $(x - 2)$, el cociente es:"}
          opciones={["$x^2 - x + 3$", "$x^2 + x + 3$", "$x^2 - x - 3$", "$x^2 - 3x + 3$", "Ninguno"]}
          correcta={0}
          explicacion={"Paso 1: $x^3 \\div x = x^2$, resta deja $-x^2+5x-6$. Paso 2: $-x^2 \\div x = -x$, resta deja $3x-6$. Paso 3: $3x \\div x = 3$, resta deja $0$. Cociente $x^2-x+3$, resto $0$ (división exacta)."}
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
      titulo="División de polinomios"
      posicion="Lámina 1 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/polinomios-grado", titulo: "Qué es un polinomio: grado absoluto y relativo" }}
      teAbrePuertaA={{ href: "/laminas/teorema-del-resto", titulo: "División sintética (Ruffini)" }}
    />
  );
}

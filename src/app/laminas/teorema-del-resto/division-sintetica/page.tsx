"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import {
  TarjetaPractica, FlechaMini, LineaEjemplo, ComparacionOjo, TablaRuffini,
} from "../../_components/dispositivos";

// Lámina "División sintética (Ruffini)" — módulo "Teorema del Resto y
// división de polinomios", 2da de 5 (1, 3 y 4 ya publicadas). El Puente y el
// ejemplo principal reusan EL MISMO polinomio de "División de polinomios"
// (2x³+3x²−4x+1 entre x+2) a propósito: el lector ya sabe que el resultado
// es Q(x)=2x²−x−2, R=5, así que acá ve que Ruffini es el mismo algoritmo,
// no uno nuevo, solo anotado más corto.
export default function DivisionSinteticaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que hay una versión resumida de la división que ya aprendiste, que te da cociente y resto juntos en una tabla chiquita?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative", padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${LIENZO.fgFaint}`, opacity: 0.55 }}>
              <span style={{ fontSize: 13 }}>división larga, paso a paso</span>
              <div style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-8deg)" }} />
            </div>
            <FlechaMini />
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>una tabla de 3 filas</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arrancamos de lo que ya sabes",
      colorEtiqueta: LIENZO.fgDim,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ruffini no es un truco nuevo. Es la división larga de la lámina anterior, anotada distinto: en vez de escribir cada término con su x, anotas solo los coeficientes.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$(2x^3+3x^2-4x+1) \\div (x+2)$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El mismo que dividiste entero en la lámina pasada. Vas a llegar exactamente al mismo resultado, en menos espacio.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Divisor <MathText>{"$(x+2)$"}</MathText>: el valor que va en la tabla es <MathText>{"$a=-2$"}</MathText> (el que anula al divisor). Los coeficientes del dividendo van arriba.
          </p>
          <TablaRuffini
            a="$a=-2$"
            coeficientes={["$2$", "$3$", "$-4$", "$1$"]}
            productos={["", "$-4$", "$2$", "$4$"]}
            sumas={["$2$", "$-1$", "$-2$", "$5$"]}
          />
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px", marginTop: 12 }}>
            <LineaEjemplo glosa="Bajas el primer coeficiente tal cual" eq="$2$" />
            <LineaEjemplo glosa="Multiplicas por a y sumas al siguiente" eq="$3 + (2)(-2) = -1$" />
            <LineaEjemplo glosa="Repites" eq="$-4 + (-1)(-2) = -2$" />
            <LineaEjemplo glosa="Repites una vez más" eq="$1 + (-2)(-2) = 5$" />
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Se lee igual que antes",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            La fila de abajo son los coeficientes del cociente, con un grado menos que el dividendo, y el último número es el resto.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Los coeficientes 2, -1, -2 son" eq="$Q(x) = 2x^2 - x - 2$" />
            <LineaEjemplo glosa="El último número" eq="$R = 5$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: LIENZO.ok }}>Igual que con la división larga ✓</span>
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
            El valor que va en la tabla es el que anula al divisor, no el número que aparece escrito en él. Para <MathText>{"$(x+2)$"}</MathText>, es <MathText>{"$-2$"}</MathText>, no <MathText>{"$2$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$(x + 2)$", abajo: "$a = -2$" }}
            incorrecto={{ arriba: "$(x + 2)$", abajo: "$a = 2$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>
            Dividir <MathText>{"$P(x) = x^4 - 5x^2 + 4$"}</MathText> entre <MathText>{"$(x-2)$"}</MathText>. Ojo con los grados que faltan: hay que anotar los coeficientes <MathText>{"$1,\\ 0,\\ {-5},\\ 0,\\ 4$"}</MathText>, con los ceros incluidos.
          </p>
          <TablaRuffini
            a="$a=2$"
            coeficientes={["$1$", "$0$", "$-5$", "$0$", "$4$"]}
            productos={["", "$2$", "$4$", "$-2$", "$-4$"]}
            sumas={["$1$", "$2$", "$-1$", "$-2$", "$0$"]}
          />
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$Q(x) = x^3+2x^2-x-2,\\ R=0$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Resto 0: por el Teorema del Factor, <MathText>{"$(x-2)$"}</MathText> es un factor exacto de <MathText>{"$P(x)$"}</MathText>.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Solo funciona así",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.6 }}>
            Ruffini es un atajo, no reemplaza a la división larga en todos los casos. Solo sirve cuando el divisor es de la forma <MathText>{"$(x-a)$"}</MathText>: grado 1 y coeficiente principal 1.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 130px", padding: "10px 12px", borderRadius: 12, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}55`, textAlign: "center" }}>
              <MathText>{"$(x - 5)$"}</MathText>
              <div style={{ fontSize: 10, color: LIENZO.ok, marginTop: 4 }}>sirve Ruffini</div>
            </div>
            <div style={{ flex: "1 1 130px", padding: "10px 12px", borderRadius: 12, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}55`, textAlign: "center" }}>
              <MathText>{"$(2x - 1)$"}</MathText>
              <div style={{ fontSize: 10, color: LIENZO.bad, marginTop: 4 }}>división larga</div>
            </div>
            <div style={{ flex: "1 1 130px", padding: "10px 12px", borderRadius: 12, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}55`, textAlign: "center" }}>
              <MathText>{"$(x^2 + 1)$"}</MathText>
              <div style={{ fontSize: 10, color: LIENZO.bad, marginTop: 4 }}>división larga</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Al dividir $P(x) = x^3 + x^2 - 4x - 4$ entre $(x+1)$ por división sintética, el cociente es:"}
          opciones={["$x^2 - 4$", "$x^2 + 4$", "$x^2 - x - 4$", "$x^2 + x - 4$", "Ninguno"]}
          correcta={0}
          explicacion={"Divisor $(x+1)$, entonces $a=-1$. Coeficientes $1,1,-4,-4$. Bajas 1. $1+(1)(-1)=0$. $-4+(0)(-1)=-4$. $-4+(-4)(-1)=0$. Fila resultado: $1,0,-4\\ |\\ 0$, así que $Q(x)=x^2-4$, resto $0$."}
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
      titulo="División sintética (Ruffini)"
      posicion="Lámina 2 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/teorema-del-resto/division-de-polinomios", titulo: "División de polinomios" }}
      teAbrePuertaA={{ href: "/laminas/teorema-del-resto/teorema-del-resto", titulo: "Teorema del Resto" }}
    />
  );
}

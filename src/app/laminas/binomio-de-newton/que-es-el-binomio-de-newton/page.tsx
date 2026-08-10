"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Qué es y coeficientes binomiales" — módulo "Binomio de
// Newton", 1ra de 3.
export default function QueEsElBinomioDeNewtonPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés expandir un binomio elevado a la séptima sin multiplicarlo siete veces, usando solo números combinatorios?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$(a+b)^n$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\binom{n}{k}$"}</MathText>
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
            Ya viste <MathText>{"$(a+b)^2=a^2+2ab+b^2$"}</MathText>. Fijate en los coeficientes: 1, 2, 1.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$(a+b)^3 = a^3+3a^2b+3ab^2+b^3$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Los coeficientes <MathText>{"$1,3,3,1$"}</MathText> son exactamente <MathText>{"$\\binom{3}{0},\\binom{3}{1},\\binom{3}{2},\\binom{3}{3}$"}</MathText>.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$(a+b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k$"}</MathText>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              El desarrollo tiene <MathText>{"$n+1$"}</MathText> términos.
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              El exponente de <MathText>{"$a$"}</MathText> baja de <MathText>{"$n$"}</MathText> a <MathText>{"$0$"}</MathText>; el de <MathText>{"$b$"}</MathText> sube de <MathText>{"$0$"}</MathText> a <MathText>{"$n$"}</MathText>.
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Cada término se llama <MathText>{"$T_{k+1}=\\binom{n}{k}a^{n-k}b^k$"}</MathText>.
            </div>
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
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            El coeficiente numérico del término <MathText>{"$x^3y^4$"}</MathText> en el desarrollo de <MathText>{"$(2x+y)^7$"}</MathText> vale:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Igualamos con el exponente de y (no el de x): k=4" eq={"$\\binom{7}{4}(2x)^{7-4}y^4 = \\binom{7}{4}(2x)^3 y^4$"} />
            <LineaEjemplo glosa="No te olvides del 2³ que viene de (2x)³" eq={"$35 \\times 2^3 = 35 \\times 8 = 280$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>280</span>
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
            Calcular solo el número combinatorio y olvidarse de la potencia que acompaña al término (acá, el 2³) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\binom{7}{4}\\times 2^3$", abajo: "$= 280$" }}
            incorrecto={{ arriba: "$\\binom{7}{4}$", abajo: "$= 35\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Suma de todos los coeficientes",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            En el desarrollo del binomio <MathText>{"$(x-2y)^6$"}</MathText>, el valor de la suma <MathText>{"$s$"}</MathText> de los coeficientes numéricos verifica:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Truco: la suma de coeficientes se obtiene poniendo 1 en cada variable" eq={"$s = (1-2(1))^6 = (-1)^6$"} />
            <LineaEjemplo glosa="" eq={"$s = 1$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>s = 1</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"En el desarrollo de $(x+a)^n$ se sabe que el coeficiente del término $x^r$ es igual al coeficiente del término $x^{r+2}$. Encuentre una relación entre $a, n$ y $r$."}
          opciones={[
            "$a^2=\\dfrac{(n-r+1)(n-r)}{(r-2)(r-1)}$",
            "$a^2=\\dfrac{(r-2)(r-1)}{(n+r+2)(n+r+1)}$",
            "$a^2=\\dfrac{(n-r)(n+r-1)}{(r-2)(r-3)}$",
            "$a^2=\\dfrac{(n-r)(n-r-1)}{(r+2)(r+1)}$",
            "Ninguno",
          ]}
          correcta={3}
          explicacion={"El coeficiente de $x^r$ es $\\binom{n}{r}a^{n-r}$ y el de $x^{r+2}$ es $\\binom{n}{r+2}a^{n-r-2}$. Igualando: $a^2=\\dfrac{\\binom{n}{r+2}}{\\binom{n}{r}}=\\dfrac{(n-r)(n-r-1)}{(r+2)(r+1)}$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="binomio-de-newton"
      moduloTitulo="Binomio de Newton"
      titulo="Qué es y coeficientes binomiales"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/binomio-de-newton/termino-general", titulo: "Término general" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo, FlechaMini } from "../../_components/dispositivos";

// Lámina "Relaciones de Vieta" — módulo "Ecuaciones cuadráticas y
// relaciones de Vieta", 2da de 5. El ejemplo principal reusa a propósito
// la misma ecuación de "Ecuación cuadrática y discriminante"
// (2x²−3x−5=0, raíces ya conocidas 2.5 y −1) para que el lector verifique
// Vieta contra un resultado que ya vio, no uno nuevo que debe confiar a ciegas.
export default function RelacionesDeVietaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que puedes saber la suma y el producto de las raíces de una cuadrática sin resolverla?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative", padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${LIENZO.fgFaint}`, opacity: 0.55 }}>
              <span style={{ fontSize: 13 }}>resolver la ecuación entera</span>
              <div style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 2, background: LIENZO.bad, transform: "rotate(-8deg)" }} />
            </div>
            <FlechaMini />
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>leer dos números de la ecuación</span>
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
            Si conoces las dos raíces <MathText>{"$r_1$"}</MathText> y <MathText>{"$r_2$"}</MathText> de una cuadrática, ya sabes reconstruirla:
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 17 }}>
            <MathText>{"$(x-r_1)(x-r_2) = 0$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Vieta es simplemente mirar qué pasa cuando multiplicas ese paréntesis.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Multiplica el paréntesis de la lámina de división y compara, término a término, con la forma general.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Multiplicando" eq="$(x-r_1)(x-r_2) = x^2 - (r_1{+}r_2)x + r_1 r_2$" />
            <LineaEjemplo glosa="Comparando con" eq={"$x^2 + \\tfrac{b}{a}x + \\tfrac{c}{a} = 0$"} />
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6 }}>
            Los coeficientes tienen que coincidir uno a uno:
          </p>
          <div style={{
            marginTop: 8, display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>suma de raíces</span>
              <span style={{ fontSize: 16, fontWeight: 700 }}><MathText>{"$r_1+r_2 = -\\tfrac{b}{a}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 12, color: LIENZO.fgDim }}>producto de raíces</span>
              <span style={{ fontSize: 16, fontWeight: 700 }}><MathText>{"$r_1 \\cdot r_2 = \\tfrac{c}{a}$"}</MathText></span>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Aplicándolo",
      contenido: (
        <div>
          <p style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
            La misma ecuación de la lámina anterior: <MathText>{"$2x^2 - 3x - 5 = 0$"}</MathText>. Ya sabes que sus raíces son <MathText>{"$2.5$"}</MathText> y <MathText>{"$-1$"}</MathText>. Comprobemos Vieta contra eso.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Suma, sin resolver: a=2, b=-3" eq={"$r_1+r_2 = -\\tfrac{-3}{2} = 1.5$"} />
            <LineaEjemplo glosa="Producto: c=-5" eq={"$r_1 \\cdot r_2 = \\tfrac{-5}{2} = -2.5$"} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: LIENZO.ok }}>2.5 + (−1) = 1.5 ✓</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: LIENZO.ok }}>2.5 × (−1) = −2.5 ✓</span>
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
            La suma lleva un signo menos que se olvida fácil. No es <MathText>{"$b/a$"}</MathText>, es <MathText>{"$-b/a$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$r_1+r_2$", abajo: "$-b/a$" }}
            incorrecto={{ arriba: "$r_1+r_2$", abajo: "$b/a$" }}
          />
          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El producto no lleva signo extra: <MathText>{"$r_1 \\cdot r_2 = c/a$"}</MathText> tal cual.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Más allá de suma y producto",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Examen UMSS: determinar <MathText>{"$p$"}</MathText> en <MathText>{"$x^2 - 6x + 4 + p = 0$"}</MathText>, sabiendo que la diferencia de sus raíces es <MathText>{"$2$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Por Vieta" eq={"$r_1+r_2 = 6, \\quad r_1 r_2 = 4+p$"} />
            <LineaEjemplo glosa="Identidad útil" eq="$(r_1-r_2)^2 = (r_1+r_2)^2 - 4r_1r_2$" />
            <LineaEjemplo glosa="Reemplazando" eq="$2^2 = 6^2 - 4(4+p)$" />
            <LineaEjemplo glosa="" eq="$4 = 20 - 4p$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$p = 4$"}</MathText></span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ni siquiera hizo falta calcular <MathText>{"$r_1$"}</MathText> y <MathText>{"$r_2$"}</MathText> por separado.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"¿Cuáles son la suma y el producto de las raíces de $3x^2 + 5x - 2 = 0$, sin resolverla?"}
          opciones={[
            "Suma $= -5/3$, producto $= -2/3$",
            "Suma $= 5/3$, producto $= -2/3$",
            "Suma $= -5/3$, producto $= 2/3$",
            "Suma $= 5/3$, producto $= 2/3$",
            "Ninguno",
          ]}
          correcta={0}
          explicacion={"$a=3,\\ b=5,\\ c=-2$. Suma $=-b/a=-5/3$. Producto $=c/a=-2/3$. El error típico es olvidar el signo menos de la suma."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="cuadraticas-y-vieta"
      moduloTitulo="Ecuaciones cuadráticas y relaciones de Vieta"
      titulo="Relaciones de Vieta"
      posicion="Lámina 2 de 5"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/cuadraticas-y-vieta/ecuacion-cuadratica-discriminante", titulo: "Ecuación cuadrática y discriminante" }}
      teAbrePuertaA={{ href: "/laminas/cuadraticas-y-vieta", titulo: "Construir ecuaciones desde raíces transformadas" }}
    />
  );
}

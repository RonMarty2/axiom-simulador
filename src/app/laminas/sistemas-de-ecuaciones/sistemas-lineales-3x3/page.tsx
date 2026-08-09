"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, PasoCard, LineaEjemplo } from "../../_components/dispositivos";

// Lámina "Sistemas lineales 3×3 y más" — módulo "Sistemas de ecuaciones",
// 2da de 4.
export default function SistemasLineales3x3Page() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un sistema de 3 ecuaciones se resuelve con la misma idea que uno de 2, solo un paso más largo?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>3 ecuaciones, 3 incógnitas</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>2×2 que ya sabés resolver</span>
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
            En la lámina anterior combinaste 2 ecuaciones para que una incógnita se cancele. Acá hacés lo mismo dos veces, con la misma incógnita, contra dos parejas distintas de ecuaciones.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\text{Ec. 1 y 2} \\to \\text{elimina } z$"}</MathText>
            <div style={{ margin: "4px 0" }} />
            <MathText>{"$\\text{Ec. 1 y 3} \\to \\text{elimina } z$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Quedan dos ecuaciones nuevas, con solo <MathText>{"$x$"}</MathText> e <MathText>{"$y$"}</MathText>: un sistema 2×2 de la lámina pasada.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 1 de 3",
      contenido: (
        <PasoCard n={1}>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Elegís una incógnita para eliminar primero (acá, <MathText>{"$z$"}</MathText>) y la cancelás contra dos parejas de ecuaciones distintas.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Ec. 1 + Ec. 3 (la z se cancela)" eq="$(x{+}4y{-}z) + (3x{-}2y{+}z) = 6+2$" />
            <LineaEjemplo glosa="" eq="$4x + 2y = 8$" />
          </div>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 2 de 3",
      contenido: (
        <PasoCard n={2}>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Repetís con otra pareja de ecuaciones, eliminando la misma incógnita.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="De Ec. 1: z = x+4y-6. Sustituyendo en Ec. 2" eq="$2x+5y-7(x{+}4y{-}6) = -9$" />
            <LineaEjemplo glosa="" eq="$5x + 23y = 51$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Ahora hay dos ecuaciones nuevas, sin <MathText>{"$z$"}</MathText>: un sistema 2×2 común y corriente.
          </p>
        </PasoCard>
      ),
    },
    {
      etiqueta: "Cómo se hace · Paso 3 de 3",
      contenido: (
        <div>
          <PasoCard n={3}>
            <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
              Resolvés el 2×2 igual que en la lámina anterior, y volvés hacia atrás para la última incógnita.
            </p>
            <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
              <LineaEjemplo glosa="De 4x+2y=8: y=4-2x. Sustituyendo en 5x+23y=51" eq={"$5x + 23(4{-}2x) = 51 \\ \\Rightarrow\\ x=1$"} />
            </div>
          </PasoCard>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x=1,\\ y=2,\\ z=3$"}</MathText></span>
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
            El sistema resuelto en los pasos anteriores era este. Determinar <MathText>{"$E=x+y+z$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="" eq="$x+4y-z=6$" />
            <LineaEjemplo glosa="" eq="$2x+5y-7z=-9$" />
            <LineaEjemplo glosa="" eq="$3x-2y+z=2$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$E = 1+2+3 = 6$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Y con más incógnitas todavía",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Con 4 incógnitas la idea no cambia, pero a veces ni hace falta eliminar: si una ecuación ya tiene pocas incógnitas, se puede despejar en cadena.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="La más simple: solo tiene y, u" eq="$4y-3u=2$" />
            <LineaEjemplo glosa="Con esa y, la siguiente ecuación da x" eq="$x-3y+3u=0$" />
            <LineaEjemplo glosa="Con x, la siguiente da z" eq="$2x-3z-u=2$" />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Antes de lanzarte a eliminar a lo bruto, fijate si alguna ecuación ya te regala un despeje directo.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver el sistema $x+y+z=6$, $2x-y+z=3$, $x+2y-z=2$. ¿Cuánto vale $z$?"}
          opciones={["$3$", "$1$", "$2$", "$4$", "Ninguno"]}
          correcta={0}
          explicacion={"De Ec.3, $z=x+2y-2$. Sustituyendo en Ec.1: $2x+3y=8$. Sustituyendo en Ec.2: $3x+y=5 \\Rightarrow y=5-3x$. Reemplazando en $2x+3y=8$: $2x+3(5-3x)=8 \\Rightarrow x=1$. Entonces $y=2$ y $z=1+4-2=3$."}
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
      titulo="Sistemas lineales 3×3 y más"
      posicion="Lámina 2 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/sistemas-de-ecuaciones/sistemas-lineales-2x2", titulo: "Sistemas lineales 2×2" }}
      teAbrePuertaA={{ href: "/laminas/sistemas-de-ecuaciones", titulo: "Sistemas no lineales" }}
    />
  );
}

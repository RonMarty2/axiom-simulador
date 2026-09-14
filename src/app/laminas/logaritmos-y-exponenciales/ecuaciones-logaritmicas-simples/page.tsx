"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones logarítmicas simples" — módulo "Logaritmos y
// exponenciales", 5ta de 8.
export default function EcuacionesLogaritmicasSimplesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que una ecuación con un solo logaritmo se resuelve volviendo a la definición?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\log_b(x)=c$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$x=b^c$"}</MathText>
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
            Ya sabes la definición del logaritmo. Cuando queda UN solo logaritmo igualado a un número, aplicarla directo despeja la incógnita.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$\\log_b(f(x)) = c \\ \\Longleftrightarrow\\ f(x) = b^c$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            El argumento <MathText>{"$f(x)$"}</MathText> siempre debe quedar positivo.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si hay dos logaritmos restados, combinalos en uno con las propiedades</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica la definición para quitar el logaritmo</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resuelve y VERIFICÁ que el argumento original quede positivo</span>
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
            Hallar &quot;x&quot; en: <MathText>{"$\\log_{\\sqrt3}(x^2+3x-7)=2$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Por definición: argumento = base²" eq={"$x^2+3x-7 = (\\sqrt3)^2 = 3$"} />
            <LineaEjemplo glosa="x=-5 ó x=2, ambas dan argumento positivo. Entre las opciones del examen" eq={"$(x+5)(x-2)=0$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>x = 2</span>
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
            No verificar que CADA raíz de la ecuación dé un argumento positivo es el error más común: una raíz algebraicamente válida puede no ser solución del logaritmo.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\log[x(x{-}3)]=1,\\ x=-2$", abajo: "$x{-}3=-5{<}0\\ \\text{se descarta}$" }}
            incorrecto={{ arriba: "$\\log[x(x{-}3)]=1,\\ x=-2$", abajo: "$\\text{aceptar sin verificar (mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Combinando dos logaritmos",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            La solución de <MathText>{"$\\log_5(x+1)-\\log_5(x-1)=2$"}</MathText> verifica:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Resta de logs = log del cociente" eq={"$\\log_5\\left(\\dfrac{x+1}{x-1}\\right) = 2 \\ \\Rightarrow\\ \\dfrac{x+1}{x-1} = 25$"} />
            <LineaEjemplo glosa="Dominio exige x>1; 13/12 ≈ 1,083 lo cumple" eq={"$x = \\dfrac{13}{12}$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>1 &lt; x &lt; 3</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Si $\\log_{(a+1)}(x+1)=2$ y $\\log_{(a+2)}(x+8)=2$, ¿cuánto vale $a+x$?"}
          opciones={["3", "9", "10", "18", "Ninguno"]}
          correcta={2}
          explicacion={"Por definición: $(a+1)^2=x+1$ y $(a+2)^2=x+8$. Restando: $(a+2)^2-(a+1)^2=7 \\Rightarrow 2a+3=7 \\Rightarrow a=2$. Con $a=2$: $9=x+1 \\Rightarrow x=8$. $a+x=10$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="logaritmos-y-exponenciales"
      moduloTitulo="Logaritmos y exponenciales"
      titulo="Ecuaciones logarítmicas simples"
      posicion="Lámina 5 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-exponenciales", titulo: "Ecuaciones exponenciales" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-logaritmicas-complejas", titulo: "Ecuaciones logarítmicas complejas" }}
    />
  );
}

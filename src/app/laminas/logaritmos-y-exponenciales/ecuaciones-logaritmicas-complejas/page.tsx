"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Ecuaciones logarítmicas complejas" — módulo "Logaritmos y
// exponenciales", 6ta de 8.
export default function EcuacionesLogaritmicasComplejasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que hasta un número suelto se puede convertir en logaritmo para combinarlo con los demás?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$1$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\log_{10}(10)$"}</MathText>
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
            Ya sabes combinar sumas y restas de logaritmos en uno solo. Cuando hay VARIOS logaritmos con distintas operaciones, esa combinación se hace en varios pasos.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Un número suelto <MathText>{"$k$"}</MathText> se escribe como <MathText>{"$\\log_b(b^k)$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Después, todo el lado se combina en UN solo logaritmo
            </div>
          </div>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Convierte cualquier número suelto en un logaritmo de la misma base</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Combina todo en un solo logaritmo por lado, e iguala los argumentos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resuelve y descarta toda raíz que viole el dominio</span>
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
            La solución de <MathText>{"$\\log(x+2)+\\log(x-1)=1$"}</MathText> (base 10) es un número entero:
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Dominio: x+2>0 y x-1>0, es decir x>1" eq={"$\\log[(x+2)(x-1)] = 1 \\ \\Rightarrow\\ (x+2)(x-1)=10$"} />
            <LineaEjemplo glosa="x²+x-12=0 da x=-4 ó x=3. Se descarta x=-4 (no cumple x>1)" eq={"$x = 3$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>positivo impar</span>
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
            Convertir el número suelto a la base equivocada es el error más común: <MathText>{"$1$"}</MathText> es <MathText>{"$\\log_{10}(10)$"}</MathText> solo si el logaritmo original es en base 10.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\log(x)=1$", abajo: "$\\log(x)=\\log(10)$" }}
            incorrecto={{ arriba: "$\\log(x)=1$", abajo: "$\\log(x)=\\log(1)\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Con un sistema de ecuaciones",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Del sistema <MathText>{"$x+y=65$"}</MathText>, <MathText>{"$\\log x+\\log y=3$"}</MathText>, hallar un valor de &quot;x&quot;.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="log x + log y = log(xy) = 3" eq={"$xy = 10^3 = 1000$"} />
            <LineaEjemplo glosa="x, y son raíces de t²-65t+1000=0" eq={"$(x,y) = (40,25) \\text{ ó } (25,40)$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>x = 25 (o x = 40)</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Si $x$ es solución de $\\log_{\\sqrt2}(2x-3)+\\log_{\\sqrt2}(2x+2)$ $=4+\\log_{\\sqrt2}(2x)$, hallar $E=x^2-3x+5$."}
          opciones={["8", "5", "3", "4", "Ninguno"]}
          correcta={1}
          explicacion={"$4=\\log_{\\sqrt2}\\big((\\sqrt2)^4\\big)=\\log_{\\sqrt2}(4)$. Combinando: $(2x-3)(2x+2)=4(2x)$. Resolviendo: $2x^2-5x-3=0 \\Rightarrow x=3$ (se descarta $x=-0{,}5$ por dominio $x>1{,}5$). $E=9-9+5=5$."}
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
      titulo="Ecuaciones logarítmicas complejas"
      posicion="Lámina 6 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/ecuaciones-logaritmicas-simples", titulo: "Ecuaciones logarítmicas simples" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/dominio-funcion-logaritmica", titulo: "Dominio de funciones logarítmicas" }}
    />
  );
}

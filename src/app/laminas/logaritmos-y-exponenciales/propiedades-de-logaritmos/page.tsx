"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Propiedades de los logaritmos" — módulo "Logaritmos y
// exponenciales", 2da de 8.
export default function PropiedadesDeLogaritmosPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que un logaritmo convierte multiplicaciones en sumas?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\log(ab)$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\log(a)+\\log(b)$"}</MathText>
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
            Ya sabes que las potencias de igual base se suman al multiplicarse. Los logaritmos heredan exactamente esa estructura.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$\\log(ab) = \\log(a) + \\log(b)$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$\\log(a/b) = \\log(a) - \\log(b)$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              <MathText>{"$\\log(a^n) = n\\log(a)$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Escribe raíces como exponentes fraccionarios: <MathText>{"$\\sqrt[n]{b^m}=b^{m/n}$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica <MathText>{"$\\log_b(b^n)=n$"}</MathText> a cada término por separado</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Suma/resta los números resultantes</span>
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
            Determinar el valor de: <MathText>{"$E=\\log_b(b)+3\\log_b\\left(\\dfrac1b\\right)+\\log_b(1)$"}</MathText>
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="log_b(b)=1, log_b(1/b)=log_b(b⁻¹)=-1, log_b(1)=0" eq={"$E = 1 + 3(-1) + 0$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>-2</span>
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
            Confundir <MathText>{"$\\log(a/b)$"}</MathText> con <MathText>{"$\\log(a)/\\log(b)$"}</MathText> es el error más común: la resta de logaritmos NO es una división de logaritmos.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\log(a/b)$", abajo: "$\\log(a)-\\log(b)$" }}
            incorrecto={{ arriba: "$\\log(a/b)$", abajo: "$\\log(a)/\\log(b)\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Comparando expresiones",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Si <MathText>{"$a=2(\\log7-\\log5)$"}</MathText> y <MathText>{"$b=3\\left(\\dfrac12\\log9-\\dfrac13\\log8\\right)$"}</MathText>, comparar <MathText>{"$a$"}</MathText> y <MathText>{"$b$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a = log(7/5)² = log(1,96)" eq={"$a = \\log(1{,}96)$"} />
            <LineaEjemplo glosa="b = log(9^1,5) - log8 = log27 - log8 = log(27/8)" eq={"$b = \\log(3{,}375)$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>a es menor que b</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Determinar el valor de: $E=\\log_5\\sqrt{125}+\\log_{11}\\sqrt[3]{121}+\\dfrac{5}{6}$"}
          opciones={["5", "4", "2", "3", "Ninguno"]}
          correcta={3}
          explicacion={"$\\log_5\\sqrt{125}=\\log_5 5^{3/2}=\\dfrac32$. $\\log_{11}\\sqrt[3]{121}=\\log_{11}11^{2/3}=\\dfrac23$. $E=\\dfrac32+\\dfrac23+\\dfrac56=\\dfrac{9+4+5}{6}=3$."}
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
      titulo="Propiedades de los logaritmos"
      posicion="Lámina 2 de 8"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/logaritmos-y-exponenciales/que-es-un-logaritmo", titulo: "¿Qué es un logaritmo?" }}
      teAbrePuertaA={{ href: "/laminas/logaritmos-y-exponenciales/cambio-de-base", titulo: "Cambio de base" }}
    />
  );
}

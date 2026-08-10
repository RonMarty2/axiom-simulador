"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Factorización prima y número de divisores" — módulo
// "Divisores, MCD y MCM", 1ra de 3.
export default function FactorizacionPrimaYDivisoresPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que podés contar TODOS los divisores de un número sin listarlos uno por uno?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>1, 2, 4, 5, 7...</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>una multiplicación, listo</span>
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
            Con <MathText>{"$12$"}</MathText> es fácil listar a mano: <MathText>{"$1,2,3,4,6,12$"}</MathText>, seis divisores. Fijate qué pasa si lo escribís en factores primos.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 16 }}>
            <MathText>{"$12 = 2^2 \\times 3^1$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Los exponentes son <MathText>{"$2$"}</MathText> y <MathText>{"$1$"}</MathText>. Sumándoles uno a cada uno y multiplicando: <MathText>{"$(2{+}1)(1{+}1)=6$"}</MathText>. Coincide con la lista de recién.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Por qué funciona",
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            Si <MathText>{"$n = p_1^{e_1} \\cdot p_2^{e_2} \\cdots p_k^{e_k}$"}</MathText>, la cantidad de divisores de <MathText>{"$n$"}</MathText> es:
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 17 }}>
            <MathText>{"$(e_1{+}1)(e_2{+}1)\\cdots(e_k{+}1)$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Cada divisor se arma eligiendo, para cada primo, cuántas veces entra (de 0 a su exponente máximo). Por eso cada exponente suma una opción más: la de no usarlo.
          </p>
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
            ¿Cuántos divisores tiene <MathText>{"$140$"}</MathText>?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 14, padding: "14px 16px" }}>
            <LineaEjemplo glosa="Factorizando" eq={"$140 = 2^2 \\cdot 5 \\cdot 7$"} />
            <LineaEjemplo glosa="Sumando 1 a cada exponente y multiplicando" eq={"$(2{+}1)(1{+}1)(1{+}1) = 3 \\times 2 \\times 2$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}>12 divisores</span>
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
            La fórmula usa <MathText>{"$(e+1)$"}</MathText>, no el exponente solo. Olvidarse del +1 es el error más común del tema.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$140=2^2 \\cdot 5 \\cdot 7$", abajo: "$(2{+}1)(1{+}1)(1{+}1)=12$" }}
            incorrecto={{ arriba: "$140=2^2 \\cdot 5 \\cdot 7$", abajo: "$2 \\times 1 \\times 1 = 2$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Contar solo una parte",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>
            ¿Cuántos divisores PARES tiene <MathText>{"$140$"}</MathText> (la misma factorización de antes)?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Divisores totales (ya calculado)" eq="$12$" />
            <LineaEjemplo glosa="Divisores impares: los que no usan el 2, o sea divisores de 5×7" eq="$(1{+}1)(1{+}1) = 4$" />
            <LineaEjemplo glosa="Divisores pares = totales menos impares" eq="$12 - 4 = 8$" />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>8 divisores pares</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Determinar la cantidad de divisores de $180$."}
          opciones={["$18$", "$12$", "$16$", "$20$", "Ninguno"]}
          correcta={0}
          explicacion={"$180=2^2\\times3^2\\times5^1$. Cantidad de divisores $=(2{+}1)(2{+}1)(1{+}1)=3\\times3\\times2=18$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="divisores-mcd-mcm"
      moduloTitulo="Divisores, MCD y MCM"
      titulo="Factorización prima y número de divisores"
      posicion="Lámina 1 de 3"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/divisores-mcd-mcm", titulo: "MCD y MCM" }}
    />
  );
}

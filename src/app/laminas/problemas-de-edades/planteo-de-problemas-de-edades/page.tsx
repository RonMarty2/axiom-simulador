"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Planteo de problemas de edades" — módulo "Problemas de
// edades", única lámina del módulo. Cierra el área Aritmética-Álgebra
// de Ingeniería (24/24 módulos).
export default function PlanteoDeProblemasDeEdadesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que &quot;hace X años&quot; y &quot;dentro de X años&quot; mueven las edades de TODAS las personas del problema por igual?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>hace 8 años</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$P{-}8,\\ S{-}8$"}</MathText>
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
            Ya sabés plantear ecuaciones a partir de un enunciado. Con edades, lo nuevo es fijar la edad ACTUAL de cada persona con una letra, y sumar o restar según el momento.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;hace X años&quot; → edad actual <MathText>{"$-\\,X$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;dentro de X años&quot; → edad actual <MathText>{"$+\\,X$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Nombrá la edad ACTUAL de cada persona con una letra</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Traducí cada condición temporal a una ecuación, aplicando el mismo desplazamiento a TODAS las personas involucradas</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Resolvé el sistema y verificá reconstruyendo cada condición del enunciado</span>
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
            Hallar la edad de un padre, sabiendo que hace 8 años su edad fue el cuádruple de la de su hijo; dentro de 12 años solo será el doble.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="F=padre, S=hijo (edades actuales). Hace 8 años" eq={"$F-8 = 4(S-8)$"} />
            <LineaEjemplo glosa="Dentro de 12 años" eq={"$F+12 = 2(S+12)$"} />
            <LineaEjemplo glosa="Resolviendo el sistema: S=18" eq={"$F = 4(18)-24 = 48$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>48 años</span>
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
            Restar o sumar los años a UNA sola persona, dejando la otra con su edad actual, es el error más común: el tiempo pasa igual para todos.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{hace 8 años}$", abajo: "$F{-}8,\\ S{-}8$" }}
            incorrecto={{ arriba: "$\\text{hace 8 años}$", abajo: "$F{-}8,\\ S\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "El acertijo clásico",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            &quot;Tengo el doble de la edad que vos tenías cuando yo tenía la edad que vos tenés. La suma de nuestras edades es 42.&quot; ¿Cuál será la suma cuando vos tengas la edad que yo tengo?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="A, M edades actuales. 'Cuando A tenía la edad de M' fue hace (A-M) años" eq={"$A = 2(2M-A) \\ \\Rightarrow\\ 3A=4M$"} />
            <LineaEjemplo glosa="Con A+M=42: M=18, A=24. Faltan 24-18=6 años" eq={"$(24{+}6)+(18{+}6) = 54$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>54</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Dentro de 11 años, la edad de Pedro será la mitad del cuadrado de la edad que tenía hace 13 años. Halle la suma de los dígitos del año en que nació (el examen es del año 2017)."}
          opciones={["24", "25", "26", "27", "Ninguno"]}
          correcta={1}
          explicacion={"$x+11=\\dfrac12(x-13)^2 \\Rightarrow x^2-28x+147=0 \\Rightarrow x=21$ ó $x=7$ (se descarta, da edad negativa hace 13 años). Con $x=21$: nació en $2017-21=1996$. Suma de dígitos: $1+9+9+6=25$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="problemas-de-edades"
      moduloTitulo="Problemas de edades"
      titulo="Planteo de problemas de edades"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/combinatoria-basica/permutaciones-y-conteo", titulo: "Permutaciones y conteo" }}
    />
  );
}

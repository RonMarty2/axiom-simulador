"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Optimización aplicada" — módulo "Funciones cuadráticas:
// optimización", 2da y última de 2.
export default function OptimizacionAplicadaPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que &quot;área máxima&quot;, &quot;ganancia máxima&quot; e &quot;ingreso máximo&quot; se resuelven con el mismo truco: el vértice de una parábola?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>problema de palabras</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>vértice de una parábola</span>
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
            Ya sabés hallar el vértice con <MathText>{"$x=-\\dfrac{b}{2a}$"}</MathText>. Lo nuevo acá es armar VOS la función cuadrática a partir de un enunciado, antes de aplicar esa fórmula.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 14, fontWeight: 600 }}>
            <span>variable</span>
            <span style={{ color: LIENZO.fgFaint }}>↓</span>
            <span>función a optimizar</span>
            <span style={{ color: LIENZO.fgFaint }}>↓</span>
            <span>vértice</span>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Elegí una variable para lo que cambia (un lado, un descuento, una cantidad)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Escribí lo que querés maximizar/minimizar en función de esa variable</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Hallá el vértice y traducí el resultado de vuelta al problema original</span>
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
            Un hombre tiene 40 pies de alambre para cercar un jardín rectangular. La cerca va solo en tres lados; su casa es el cuarto lado. Determine el área máxima que puede cercar.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="x = cada lado perpendicular a la casa; el paralelo mide 40-2x" eq={"$A(x) = x(40-2x) = 40x - 2x^2$"} />
            <LineaEjemplo glosa="Vértice: máximo en x=10, lado paralelo = 40-20=20" eq={"$x = -\\dfrac{40}{2(-2)} = 10$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>200 pies²</span>
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
            Quedarse con el valor de <MathText>{"$x$"}</MathText> del vértice y olvidarse de traducirlo a lo que el problema realmente pregunta (acá, el ÁREA, no el lado) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$x=10 \\to A=10\\times20$", abajo: "$200\\ \\text{pies}^2$" }}
            incorrecto={{ arriba: "$x=10$", abajo: "$10\\ \\text{(mal, no es la respuesta)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Ingreso máximo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            El ingreso por vender <MathText>{"$x$"}</MathText> unidades está dado por <MathText>{"$R(x)=80x-0{,}4x^2$"}</MathText> (en dólares). ¿Cuál es el ingreso máximo?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Vértice" eq={"$x = -\\dfrac{80}{2(-0{,}4)} = 100$"} />
            <LineaEjemplo glosa="" eq={"$R(100) = 80(100) - 0{,}4(100)^2 = 8000 - 4000$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>4000</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Un estadio aloja 55000 espectadores. Con boleto a 10 dólares, la asistencia promedio es 27000. Por cada dólar que se reduce el precio, la asistencia sube en 3000. ¿Qué precio maximiza el ingreso?"}
          opciones={["6.5", "7.5", "8.5", "9.5", "Ninguno"]}
          correcta={3}
          explicacion={"Precio $=10-x$, asistencia $=27000+3000x$. $R(x)=(10-x)(27000+3000x)$, vértice en $x=-\\dfrac{3000}{2(-3000)}=0{,}5$. Precio óptimo: $10-0{,}5=9{,}5$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="funciones-cuadraticas-optimizacion"
      moduloTitulo="Funciones cuadráticas: optimización"
      titulo="Optimización aplicada"
      posicion="Lámina 2 de 2"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/funciones-cuadraticas-optimizacion/la-parabola-vertice", titulo: "La parábola: vértice y eje de simetría" }}
      teAbrePuertaA={{ href: "/laminas/trabajo-combinado", titulo: "Trabajo combinado" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Factorización: casos especiales" — módulo "Factorización y
// productos notables", 3ra y última de 3. El banco no tiene ningún
// caso de aspa doble (confirmado por búsqueda exhaustiva); esta
// lámina se enfoca en aspa simple (a≠1), suma/diferencia de cubos, y
// la técnica de sumar-y-restar para forzar una diferencia de
// cuadrados (Sophie Germain), que sí están bien representados.
export default function FactorizacionCasosEspecialesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que a veces conviene sumar y restar algo para forzar un patrón que no estaba a la vista?
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>aspa simple → ax²+bx+c</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>suma/resta cubos</span>
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
            Ya sabes factorizar <MathText>{"$x^2+bx+c$"}</MathText> buscando dos números. La aspa simple extiende esa idea a <MathText>{"$ax^2+bx+c$"}</MathText>, cuando el coeficiente de <MathText>{"$x^2$"}</MathText> no es 1.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$a^3+b^3 = (a+b)(a^2-ab+b^2)$"}</MathText>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
              <MathText>{"$a^3-b^3 = (a-b)(a^2+ab+b^2)$"}</MathText>
            </div>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Cómo se hace (aspa simple)",
      contenido: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.accent}12`, border: `1.5px solid ${LIENZO.accent}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>1.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Busca dos parejas de números cuyo producto dé <MathText>{"$a$"}</MathText> y <MathText>{"$c$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Multiplica en cruz y suma: ese resultado tiene que dar <MathText>{"$b$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Si no da, prueba otra pareja de factores hasta que cierre</span>
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
          <p style={{ marginBottom: 8, fontSize: 13.5, lineHeight: 1.6 }}>
            Resolver:
          </p>
          <div style={{ textAlign: "center", padding: "6px 0 10px", overflowX: "auto", fontSize: 14 }}>
            <MathText>{"$\\dfrac{2}{2y^2+7y+3}-\\dfrac{1}{2y^2+11y+5}=\\dfrac{1}{y^2+8y+15}$"}</MathText>
          </div>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Aspa simple en cada trinomio (a=2 se reparte entre los factores)" eq={"$2y^2{+}7y{+}3=(2y{+}1)(y{+}3)$"} />
            <LineaEjemplo glosa="" eq={"$2y^2{+}11y{+}5=(2y{+}1)(y{+}5)$"} />
            <LineaEjemplo glosa="Multiplicando todo por (2y+1)(y+3)(y+5)" eq={"$2(y{+}5) - (y{+}3) = (2y{+}1)$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>y = 6</span>
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
            En la diferencia de cubos, usar el signo equivocado en el trinomio (poner <MathText>{"$+ab$"}</MathText> en vez de <MathText>{"$-ab$"}</MathText>) es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$a^3-b^3$", abajo: "$(a-b)(a^2+ab+b^2)$" }}
            incorrecto={{ arriba: "$a^3-b^3$", abajo: "$(a-b)(a^2-ab+b^2)\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Suma y diferencia de cubos",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Si <MathText>{"$x-y=4$"}</MathText> y <MathText>{"$xy=3$"}</MathText>, hallar <MathText>{"$E=x^3-y^3$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Identidad alternativa: (x-y)³+3xy(x-y), útil cuando ya tienes x-y y xy" eq={"$E = 4^3 + 3(3)(4)$"} />
            <LineaEjemplo glosa="" eq={"$E = 64 + 36 = 100$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>100</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Un factor de $E=4x^4+8x^2y^4+9y^8$ es:"}
          opciones={[
            "$2x^2+3y^4-2xy^2$",
            "$2x^2+3y^4$",
            "$2x^2+y^4$",
            "$2x^2+4y^4+2xy^4$",
            "Ninguno",
          ]}
          correcta={0}
          explicacion={"$4x^4+9y^8=(2x^2)^2+(3y^4)^2$ casi es un cuadrado perfecto, pero el doble producto sería $12x^2y^4$ y el enunciado trae $8x^2y^4$. Sumando y restando $4x^2y^4$: $(2x^2+3y^4)^2-(2xy^2)^2=(2x^2+3y^4+2xy^2)(2x^2+3y^4-2xy^2)$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="factorizacion-productos-notables"
      moduloTitulo="Factorización y productos notables"
      titulo="Factorización: casos especiales"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/factorizacion-productos-notables/factorizacion-basica", titulo: "Factorización: casos básicos" }}
      teAbrePuertaA={{ href: "/laminas/funciones-cuadraticas-optimizacion", titulo: "Funciones cuadráticas: optimización" }}
    />
  );
}

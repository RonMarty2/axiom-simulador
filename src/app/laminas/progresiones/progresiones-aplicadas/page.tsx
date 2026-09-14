"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Progresiones aplicadas a problemas" — módulo "Progresiones",
// 6ta y última de 6. Cierra el módulo y el área completa.
export default function ProgresionesAplicadasPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que muchos problemas de la vida real esconden una PA o una PG disfrazada?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>problema real</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$\\text{PA o PG}$"}</MathText>
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
            Ya sabes reconocer cuándo algo suma siempre lo mismo (PA) o multiplica siempre lo mismo (PG). El paso extra en un problema aplicado es TRADUCIR el enunciado a esa estructura.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Un valor fijo que se SUMA cada vez → progresión aritmética
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Un valor fijo que se MULTIPLICA cada vez → progresión geométrica
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identifica si el patrón suma (PA) o multiplica (PG) un valor fijo</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Traduce los datos del problema a <MathText>{"$a_1$"}</MathText>, <MathText>{"$d$"}</MathText> o <MathText>{"$r$"}</MathText>, y <MathText>{"$n$"}</MathText></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Aplica la fórmula de término general o de suma según lo que pidan</span>
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
            Se contrata a un obrero para buscar fósiles, pagándole una suma por el primero y DUPLICANDO ese pago por cada fósil nuevo. Encuentra 8 fósiles y recibe 2040 Bs. ¿Cuánto le pagaron por el primer fósil?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Duplicar cada vez es una PG de razón 2, con 8 términos" eq={"$S=a\\cdot\\dfrac{2^8-1}{2-1}=255a$"} />
            <LineaEjemplo glosa="Despejando el pago del primer fósil" eq={"$255a=2040 \\ \\Rightarrow\\ a=8$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>8 Bs</span>
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
            Al contar cuántos términos hay (por ejemplo, de 50 bajando de 2 en 2 hasta 24), olvidarse de sumar 1 al final es el error más común.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$n=\\frac{24-50}{-2}+1$", abajo: "$n=14$" }}
            incorrecto={{ arriba: "$n=\\frac{24-50}{-2}$", abajo: "$n=13\\ \\text{(mal, sin} +1\\text{)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Ladrillos apilados",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Un albañil apila ladrillos: la base tiene 50, la segunda capa 48, la tercera 46, y así hasta que la capa superior tiene 24. ¿Cuántos ladrillos apiló en total?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="PA con a₁=50, d=-2, hasta aₙ=24. Cuento las capas" eq={"$n=\\dfrac{24-50}{-2}+1=14$"} />
            <LineaEjemplo glosa="Sumo las 14 capas" eq={"$S=\\dfrac{14(50+24)}{2}=518$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>518 ladrillos</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Un muchacho gana 1 boliviano el primer día, 2 el segundo, 4 el tercero, 8 el cuarto, duplicando cada día. ¿Cuánto ganará en total en 12 días?"}
          opciones={["$2^{12}-1$", "$2^{12}-2$", "$2^{12}-3$", "$2^{12}-4$", "Ninguno"]}
          correcta={0}
          explicacion={"Las ganancias diarias son $1,2,4,\\ldots,2^{11}$ (PG con $r=2$, 12 términos). $S=2^0+2^1+\\cdots+2^{11}=2^{12}-1$."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="progresiones"
      moduloTitulo="Progresiones"
      titulo="Progresiones aplicadas a problemas"
      posicion="Lámina 6 de 6"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/progresiones/suma-progresion-geometrica-infinita", titulo: "Suma de una progresión geométrica infinita" }}
      teAbrePuertaA={{ href: "/laminas/teorema-del-resto/division-de-polinomios", titulo: "División de polinomios" }}
    />
  );
}

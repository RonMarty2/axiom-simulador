"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Sistemas aplicados a problemas de planteo" — módulo "Sistemas de
// ecuaciones", 4ta y última de 4. Cierra el módulo: ya sabés resolver
// cualquier sistema (2×2, 3×3, no lineal); lo que falta es traducir un
// problema real a ecuaciones.
export default function SistemasAplicadosAPlanteoPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            La parte difícil de estos problemas casi nunca es resolver el sistema. Es armarlo bien.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <span style={{ fontSize: 13 }}>un párrafo con datos</span>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>un sistema que ya sabes resolver</span>
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
            Todo lo que necesitas para resolver el sistema ya lo tienes de las tres láminas anteriores. Lo nuevo es un método fijo para armarlo.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "1. Nombrá cada cantidad desconocida con una letra",
              "2. Traduce cada frase del problema en una ecuación",
              "3. Resuelve el sistema (2×2, 3×3, o con cambio de variable)",
              "4. Contestá exactamente lo que preguntan, no cualquier letra",
            ].map((t) => (
              <div key={t} style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
                {t}
              </div>
            ))}
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
            Las entradas de un circo cuestan 60 para adulto y 40 para niño. Una familia pagó 320 por 6 boletos. ¿Cuántos boletos de adulto compró?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="a = adultos, c = niños" eq="$a + c = 6$" />
            <LineaEjemplo glosa="Gasto total" eq="$60a + 40c = 320$" />
            <LineaEjemplo glosa="De la 1ra: c=6-a. Sustituyendo" eq="$60a + 40(6{-}a) = 320$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$a = 4$"}</MathText></span>
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
            Examen UMSS: una bolsa tiene 255 Bs en monedas de 2 y 5 Bs, con 19 monedas más de 2 que de 5. Piden las monedas de 5.
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.6 }}>
            Con <MathText>{"$x$"}</MathText> = monedas de 5, la solución da <MathText>{"$x=31$"}</MathText> y monedas de 2 <MathText>{"$=50$"}</MathText>.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{piden monedas de 5}$", abajo: "$31$" }}
            incorrecto={{ arriba: "$\\text{piden monedas de 5}$", abajo: "$50$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "A veces el sistema no se ve tan directo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.6 }}>
            Mario compró libros idénticos por 600 Bs. Con ¼ menos de libros, por el mismo dinero, cada uno le habría costado 2 Bs más. ¿Cuánto cuestan 4 libros al precio original?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="n libros, precio p" eq={"$n \\cdot p = 600$"} />
            <LineaEjemplo glosa="¾ de los libros, precio p+2, mismo gasto" eq={"$\\tfrac{3}{4}n(p+2) = 600$"} />
            <LineaEjemplo glosa="Multiplicando por 4/3" eq="$n(p+2) = 800$" />
            <LineaEjemplo glosa="Expandiendo y usando np=600" eq="$600 + 2n = 800$" />
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            No es lineal a simple vista, pero <MathText>{"$np=600$"}</MathText> funciona igual que un cambio de variable: sustituyendo, sale <MathText>{"$n=100$"}</MathText>, <MathText>{"$p=6$"}</MathText>.
          </p>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$4 \\times 6 = 24 \\text{ Bs}$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Mary tiene 3 dólares en monedas de 5, 10 y 25 centavos. Tiene el doble de monedas de 10¢ que de 25¢, y 5 monedas más de 5¢ que de 10¢. ¿Cuántas monedas de 10¢ tiene?"}
          opciones={["$10$", "$5$", "$15$", "$20$", "Ninguno"]}
          correcta={0}
          explicacion={"Sea $q$ = monedas de 25¢. Monedas de 10¢: $2q$. Monedas de 5¢: $2q+5$. Valor total en centavos: $5(2q{+}5)+10(2q)+25q=300 \\Rightarrow 55q=275 \\Rightarrow q=5$. Monedas de 10¢ $=2q=10$."}
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
      titulo="Sistemas aplicados a problemas de planteo"
      posicion="Lámina 4 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/sistemas-de-ecuaciones/sistemas-no-lineales", titulo: "Sistemas no lineales" }}
      teAbrePuertaA={{ href: "/laminas/ecuaciones-racionales", titulo: "Ecuaciones y expresiones racionales" }}
    />
  );
}

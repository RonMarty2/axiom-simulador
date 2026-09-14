"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Sistemas no lineales" — módulo "Sistemas de ecuaciones", 3ra de
// 4. La idea central es "linealizar": convertir un sistema con raíces,
// recíprocos o cuadrados en uno lineal común, con un cambio de variable.
export default function SistemasNoLinealesPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que muchos sistemas &quot;no lineales&quot; en realidad son un sistema lineal disfrazado?
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: LIENZO.bgSoft, textAlign: "center" }}>
              <MathText>{"$\\tfrac{1}{x}+\\tfrac{1}{y}=5$"}</MathText>
            </div>
            <span style={{ fontSize: 18, color: LIENZO.fgFaint }}>→</span>
            <div style={{ padding: "10px 18px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}` }}>
              <MathText>{"$a+b=5$"}</MathText>
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
            Ya sabes resolver sistemas lineales de 2 y hasta 3 incógnitas. El único paso nuevo acá es ANTES de eso: ponerle un nombre nuevo a la parte complicada.
          </p>
          <div style={{ textAlign: "center", padding: "12px 0", background: LIENZO.bgSoft, borderRadius: 12, fontSize: 15 }}>
            <MathText>{"$a = \\tfrac{1}{x}, \\quad b = \\tfrac{1}{y}, \\quad c = \\tfrac{1}{z}$"}</MathText>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
            Con esos nombres nuevos, el sistema queda lineal, tal cual lo aprendiste.
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
          <p style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.6 }}>
            Calcular <MathText>{"$y$"}</MathText> en el sistema <MathText>{"$\\tfrac{1}{x}+\\tfrac{1}{y}=5$"}</MathText>, <MathText>{"$\\tfrac{1}{x}+\\tfrac{1}{z}=6$"}</MathText>, <MathText>{"$\\tfrac{1}{y}+\\tfrac{1}{z}=7$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Cambio de variable: a=1/x, b=1/y, c=1/z" eq={"$a+b=5,\\ \\ a+c=6,\\ \\ b+c=7$"} />
            <LineaEjemplo glosa="Sumando las tres" eq={"$2(a+b+c)=18 \\ \\Rightarrow\\ a+b+c=9$"} />
            <LineaEjemplo glosa="Restando (a+c) de esa suma" eq="$b = 9 - 6 = 3$" />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$b = \\tfrac{1}{y} = 3 \\ \\Rightarrow\\ y = \\tfrac{1}{3}$"}</MathText></span>
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
            El cambio de variable resuelve el sistema en <MathText>{"$a,b,c$"}</MathText>, no en <MathText>{"$x,y,z$"}</MathText>. Falta el último paso: volver atrás.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$b = 3$", abajo: "$y = 1/3$" }}
            incorrecto={{ arriba: "$b = 3$", abajo: "$y = 3$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "También funciona con raíces",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Resolver <MathText>{"$5\\sqrt{x}-3\\sqrt{y}=3$"}</MathText>, <MathText>{"$25x-9y=81$"}</MathText>. Hallar <MathText>{"$E=x+y$"}</MathText>.
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Cambio de variable: u=√x, v=√y" eq={"$5u-3v=3, \\quad 25u^2-9v^2=81$"} />
            <LineaEjemplo glosa="La 2da es diferencia de cuadrados" eq="$(5u-3v)(5u+3v)=81$" />
            <LineaEjemplo glosa="Como 5u-3v=3" eq={"$3(5u+3v)=81 \\ \\Rightarrow\\ 5u+3v=27$"} />
            <LineaEjemplo glosa="Sumando con 5u-3v=3" eq={"$10u=30 \\ \\Rightarrow\\ u=3,\\ v=4$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}><MathText>{"$x=u^2=9,\\ y=v^2=16,\\ E=25$"}</MathText></span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú",
      contenido: (
        <TarjetaPractica
          pregunta={"Resolver el sistema $\\tfrac{1}{x}+\\tfrac{1}{y}=7$, $\\tfrac{1}{x}-\\tfrac{1}{y}=3$. ¿Cuánto vale $x$?"}
          opciones={["$1/5$", "$5$", "$1/2$", "$2$", "Ninguno"]}
          correcta={0}
          explicacion={"Con $a=1/x,\\ b=1/y$: $a+b=7$, $a-b=3$. Sumando: $2a=10 \\Rightarrow a=5$. Como $a=1/x=5$, entonces $x=1/5$."}
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
      titulo="Sistemas no lineales"
      posicion="Lámina 3 de 4"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/sistemas-de-ecuaciones/sistemas-lineales-3x3", titulo: "Sistemas lineales 3×3 y más" }}
      teAbrePuertaA={{ href: "/laminas/sistemas-de-ecuaciones", titulo: "Sistemas aplicados a problemas de planteo" }}
    />
  );
}

"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Aplicaciones (reparto, encuentros periódicos)" — módulo
// "Divisores, MCD y MCM", 3ra y última de 3.
export default function AplicacionesMcdMcmPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            El MCM dice cuándo dos cosas que se repiten vuelven a coincidir. El MCD dice el pedazo más grande que reparte todo sin que sobre nada.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>encuentros periódicos → MCM</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>reparto máximo → MCD</span>
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
            Ya sabés calcular MCD y MCM de la lámina anterior. Lo nuevo acá es reconocer, en un problema con palabras, cuál de los dos hace falta.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;¿Cuándo vuelven a coincidir/encontrarse?&quot; → MCM
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              &quot;¿Cuál es el tamaño máximo de cada parte, sin que sobre?&quot; → MCD
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
            Tres ciclistas arrancan juntos: dan una vuelta en 10, 11 y 12 minutos. ¿Después de cuántas horas vuelven a pasar juntos por la salida?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Coincidir de nuevo = MCM de los períodos" eq={"$\\text{mcm}(10,11,12) = 2^2 \\times 3 \\times 5 \\times 11$"} />
            <LineaEjemplo glosa="" eq={"$= 660 \\text{ minutos}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>660 min = 11 horas</span>
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
            Usar MCD donde el problema pide MCM (o al revés) es el error más común de esta lámina. Fijate qué pregunta el enunciado, no solo qué números da.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{¿cuándo coinciden?}$", abajo: "$\\text{MCM}$" }}
            incorrecto={{ arriba: "$\\text{¿cuándo coinciden?}$", abajo: "$\\text{MCD}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Y con reparto máximo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Repartir el aceite de tres barriles (210, 300 y 420 litros) en envases iguales, lo más grandes posible, sin desperdiciar. ¿Cuántos envases hacen falta?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Envase más grande posible = MCD de los tres" eq={"$\\text{mcd}(210,300,420) = 2 \\times 3 \\times 5 = 30$"} />
            <LineaEjemplo glosa="Envases por barril" eq={"$210/30{=}7,\\ \\ 300/30{=}10,\\ \\ 420/30{=}14$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>7 + 10 + 14 = 31 envases</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Tres aviones salen de la misma ciudad: el primero cada 8 días, el segundo cada 10, el tercero cada 20. Salen juntos el 3 de enero. ¿En qué fecha vuelven a salir juntos?"}
          opciones={["12 de febrero", "6 de febrero", "8 de febrero", "10 de febrero", "Ninguno"]}
          correcta={0}
          explicacion={"$\\text{mcm}(8,10,20)=2^3\\times5=40$ días. Enero tiene $31-3=28$ días restantes después del 3, así que $40-28=12$ caen en febrero: 12 de febrero."}
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
      titulo="Aplicaciones (reparto, encuentros periódicos)"
      posicion="Lámina 3 de 3"
      diapositivas={diapositivas}
      necesitasAntes={{ href: "/laminas/divisores-mcd-mcm/mcd-y-mcm", titulo: "MCD y MCM" }}
      teAbrePuertaA={{ href: "/laminas/regla-de-tres-y-reparto", titulo: "Regla de tres y reparto proporcional" }}
    />
  );
}

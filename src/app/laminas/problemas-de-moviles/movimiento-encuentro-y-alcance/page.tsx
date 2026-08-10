"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import MathText from "../../../components/MathText";
import { LIENZO } from "../../../aprende/_components/lienzo";
import { TarjetaPractica, LineaEjemplo, ComparacionOjo } from "../../_components/dispositivos";

// Lámina "Movimiento, encuentro y alcance (MRU)" — módulo "Problemas
// de móviles", única lámina del módulo. Algunas preguntas del banco
// UMSS que resuelven este patrón (dos móviles a velocidad constante)
// están catalogadas bajo el área de Física del examen real, aunque la
// técnica es puramente aritmética (d=v·t, sin aceleración); se citan
// igual por ser matemáticamente idénticas al patrón pedido acá.
export default function MovimientoEncuentroYAlcancePage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Pensá esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 20px" }}>
            ¿Sabías que con dos móviles, sumás o restás las velocidades según hacia dónde vaya cada uno?
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>al encuentro → se suman</span>
            <span style={{ padding: "8px 12px", borderRadius: 999, background: LIENZO.bgSoft, fontSize: 12.5, fontWeight: 600 }}>mismo sentido → se restan</span>
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
            Ya sabés que en velocidad constante, <MathText>{"$d = v \\cdot t$"}</MathText>. Con dos móviles, lo nuevo es pensar en la velocidad RELATIVA entre ambos.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Van uno hacia el otro: la distancia se cierra a <MathText>{"$v_1+v_2$"}</MathText>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 10, background: LIENZO.bgSoft, fontSize: 12.5 }}>
              Van en el mismo sentido: la ventaja se cierra a <MathText>{"$|v_1-v_2|$"}</MathText>
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
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Decidí si es encuentro (sumar) o alcance (restar)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>2.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Identificá la distancia que hay que cerrar (separación inicial, o ventaja del que va adelante)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: `${LIENZO.warn}12`, border: `1.5px solid ${LIENZO.warn}44` }}>
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 22 }}>3.</span>
              <span style={{ fontSize: 12.5, color: LIENZO.fgDim }}>Dividí esa distancia entre la velocidad relativa</span>
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
            Un auto a 60 km/h pasa por A cuando otro a 40 km/h pasa por B, 95 km a la derecha, mismo sentido. ¿En cuánto tiempo el primero alcanza al segundo?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Mismo sentido: velocidad relativa = diferencia" eq={"$60 - 40 = 20 \\text{ km/h}$"} />
            <LineaEjemplo glosa="Distancia a cerrar: 95 km" eq={"$T = \\dfrac{95}{20} = 4{,}75 \\text{ h} = 285 \\text{ min}$"} />
          </div>
          <div style={{
            marginTop: 12, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>285 minutos</span>
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
            Sumar las velocidades en un problema de alcance (mismo sentido), en vez de restarlas, es el error más común: infla la velocidad relativa y te da un tiempo mucho menor al real.
          </p>
          <ComparacionOjo
            correcto={{ arriba: "$\\text{mismo sentido}$", abajo: "$60-40=20$" }}
            incorrecto={{ arriba: "$\\text{mismo sentido}$", abajo: "$60+40=100\\ \\text{(mal)}$" }}
          />
        </div>
      ),
    },
    {
      etiqueta: "Cuando van al encuentro",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>
            Examen UMSS
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6 }}>
            Un carguero va a 15 m/s hacia el oeste, un auto a 30 m/s hacia el este, separados 500 m. ¿En cuánto tiempo se cruzan?
          </p>
          <div style={{ background: LIENZO.bgSoft, borderRadius: 12, padding: "12px 14px" }}>
            <LineaEjemplo glosa="Van uno hacia el otro: velocidad relativa = suma" eq={"$15 + 30 = 45 \\text{ m/s}$"} />
            <LineaEjemplo glosa="" eq={"$t = \\dfrac{500}{45} \\approx 11{,}1 \\text{ s}$"} />
          </div>
          <div style={{
            marginTop: 10, textAlign: "center",
            padding: "10px 16px", borderRadius: 12, background: `${LIENZO.ok}15`, border: `1.5px solid ${LIENZO.ok}`,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok }}>≈ 11,1 segundos</span>
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practicalo vos",
      contenido: (
        <TarjetaPractica
          pregunta={"Un pasajero perdió el ómnibus que salió hace 5 minutos y toma un taxi para alcanzarlo. Ómnibus a 60 km/h, taxi a 90 km/h, misma trayectoria. ¿En cuántos minutos lo alcanza?"}
          opciones={["7.5", "10", "15", "20", "Ninguno"]}
          correcta={1}
          explicacion={"Ventaja del ómnibus al salir el taxi: $60\\times\\dfrac{5}{60}=5$ km. Igualando posiciones: $90t=5+60t \\Rightarrow 30t=5 \\Rightarrow t=\\dfrac16$ h $=10$ min."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Ingeniería"
      areaLabel="Aritmética-Álgebra"
      moduloSlug="problemas-de-moviles"
      moduloTitulo="Problemas de móviles"
      titulo="Movimiento, encuentro y alcance (MRU)"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
      teAbrePuertaA={{ href: "/laminas/combinatoria-basica", titulo: "Combinatoria básica" }}
    />
  );
}

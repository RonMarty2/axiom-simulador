"use client";

import LaminaShell, { type LaminaDiapositiva } from "../../_components/LaminaShell";
import { LIENZO, Pizarra } from "../../../aprende/_components/lienzo";
import { TarjetaPractica } from "../../_components/dispositivos";

// Lámina "Hemostasia y vasos sanguíneos" — módulo "Morfofunción · Sistema cardiovascular y hemostasia".
// Base: Saladin, Anatomía y Fisiología (caps. 18 y 20), temario PSA 2027.

const caja = (color: string): React.CSSProperties => ({
  padding: "10px 12px", borderRadius: 10,
  background: `${color}12`, border: `1.5px solid ${color}55`,
  fontSize: 13, lineHeight: 1.55,
});

export default function HemostasiaYVasosPage() {
  const diapositivas: LaminaDiapositiva[] = [
    {
      etiqueta: "Piensa esto",
      colorEtiqueta: LIENZO.warn,
      contenido: (
        <div>
          <p className="font-crimson" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 16px" }}>
            Te cortas un dedo y la sangre sale. Un minuto después, casi se detuvo. ¿Qué pasó dentro del vaso para que eso ocurra?
          </p>
          <div style={caja(LIENZO.accent)}>
            Tu cuerpo cierra la herida en tres pasos seguidos: el vaso se contrae, las plaquetas tapan y la fibrina refuerza el tapón. Esa secuencia se llama hemostasia, y la PSA suele preguntarla junto con la diferencia entre arterias y venas.
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Arteria frente a vena",
      contenido: (
        <div>
          <Pizarra alto={290}>
            <svg width="100%" height="100%" viewBox="0 0 360 290" preserveAspectRatio="xMidYMid meet">
              {/* Arteria */}
              <circle cx={95} cy={90} r={64} fill={LIENZO.fgFaint} opacity={0.35} />
              <circle cx={95} cy={90} r={52} fill={LIENZO.bad} opacity={0.3} />
              <circle cx={95} cy={90} r={24} fill={LIENZO.warn} opacity={0.35} />
              <circle cx={95} cy={90} r={17} fill="#fff" stroke={LIENZO.fgDim} strokeWidth={1.2} />
              {/* Vena */}
              <circle cx={265} cy={90} r={64} fill={LIENZO.fgFaint} opacity={0.35} />
              <circle cx={265} cy={90} r={57} fill={LIENZO.accent} opacity={0.3} />
              <circle cx={265} cy={90} r={52} fill={LIENZO.warn} opacity={0.35} />
              <circle cx={265} cy={90} r={46} fill="#fff" stroke={LIENZO.fgDim} strokeWidth={1.2} />
              {/* Válvula de la vena */}
              <path d="M 240 105 Q 265 70 290 105" fill="none" stroke={LIENZO.fg} strokeWidth={2.5} />

              <text x={95} y={186} textAnchor="middle" fill={LIENZO.bad} fontSize={14} fontWeight={700}>ARTERIA</text>
              <text x={95} y={208} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Pared gruesa</text>
              <text x={95} y={228} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Mucho músculo liso</text>
              <text x={95} y={248} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Alta presión</text>
              <text x={95} y={268} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Sin válvulas</text>

              <text x={265} y={186} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>VENA</text>
              <text x={265} y={208} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Pared delgada</text>
              <text x={265} y={228} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Poco músculo liso</text>
              <text x={265} y={248} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Baja presión</text>
              <text x={265} y={268} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Con válvulas</text>
            </svg>
          </Pizarra>
          <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.55, color: LIENZO.fgDim }}>
            Las capas, de adentro hacia afuera, son la túnica íntima, la media (músculo liso) y la externa. La media es lo que más cambia entre arteria y vena.
          </p>
        </div>
      ),
    },
    {
      etiqueta: "Ojo · trampa clásica del examen",
      colorEtiqueta: LIENZO.bad,
      contenido: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
            El espasmo vascular (la contracción inmediata del vaso lesionado) ocurre en las <strong>arterias y arteriolas</strong>, porque ahí está el músculo liso grueso. No en las venas.
          </p>
          <div style={caja(LIENZO.ok)}>
            <strong>Correcto:</strong> «Cuando se dañan las arterias y arteriolas, el músculo liso de sus paredes se contrae de inmediato (espasmo vascular).»
          </div>
          <div style={caja(LIENZO.bad)}>
            <strong>Incorrecto:</strong> «Cuando se dañan las venas y vénulas, el músculo liso de sus paredes se contrae de inmediato.» Una sola palabra cambiada lo vuelve falso.
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Las 3 fases de la hemostasia",
      contenido: (
        <Pizarra alto={300}>
          <svg width="100%" height="100%" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet">
            <rect x={14} y={14} width={332} height={72} rx={9} fill={LIENZO.warn} opacity={0.14} stroke={LIENZO.warn} strokeWidth={1.5} />
            <text x={26} y={40} fill={LIENZO.warn} fontSize={14} fontWeight={700}>1. ESPASMO VASCULAR</text>
            <text x={26} y={62} fill={LIENZO.fg} fontSize={13}>El vaso se contrae y reduce la pérdida.</text>
            <line x1={180} y1={86} x2={180} y2={106} stroke={LIENZO.fgDim} strokeWidth={2} />

            <rect x={14} y={108} width={332} height={72} rx={9} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.5} />
            <text x={26} y={134} fill={LIENZO.accent} fontSize={14} fontWeight={700}>2. TAPÓN PLAQUETARIO</text>
            <text x={26} y={156} fill={LIENZO.fg} fontSize={13}>Las plaquetas se adhieren y se agregan.</text>
            <line x1={180} y1={180} x2={180} y2={200} stroke={LIENZO.fgDim} strokeWidth={2} />

            <rect x={14} y={202} width={332} height={72} rx={9} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={26} y={228} fill={LIENZO.ok} fontSize={14} fontWeight={700}>3. COAGULACIÓN</text>
            <text x={26} y={250} fill={LIENZO.fg} fontSize={13}>Fibrinógeno pasa a fibrina (malla).</text>
          </svg>
        </Pizarra>
      ),
    },
    {
      etiqueta: "Tapón plaquetario y coagulación",
      contenido: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={caja(LIENZO.accent)}>
            <strong>Tapón:</strong> la plaqueta se adhiere al colágeno expuesto con ayuda del factor de von Willebrand, se activa (emite seudópodos) y atrae más plaquetas.
          </div>
          <div style={caja(LIENZO.warn)}>
            <strong>Dos vías:</strong> la extrínseca (rápida, la inicia el factor tisular) y la intrínseca (más lenta, empieza con el factor XII) llegan a la misma vía común.
          </div>
          <div style={caja(LIENZO.ok)}>
            <strong>Vía común:</strong> factor X activado, luego protrombina pasa a trombina, y la trombina convierte el fibrinógeno soluble en fibrina insoluble. Todo necesita calcio (Ca²⁺).
          </div>
          <div style={caja(LIENZO.bad)}>
            <strong>Vitamina K:</strong> el hígado la usa para fabricar los factores II, VII, IX y X. Sin ella, la coagulación falla.
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Después del coágulo",
      colorEtiqueta: LIENZO.ok,
      contenido: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={caja(LIENZO.ok)}>
            <strong>Fibrinólisis:</strong> cuando el vaso ya sanó, la plasmina disuelve la fibrina y el coágulo desaparece.
          </div>
          <div style={caja(LIENZO.warn)}>
            <strong>Trombo:</strong> coágulo que se forma dentro de un vaso y se queda en su lugar.
          </div>
          <div style={caja(LIENZO.bad)}>
            <strong>Émbolo:</strong> cualquier masa que viaja por la sangre (un trombo desprendido, por ejemplo) y puede tapar un vaso más pequeño lejos de donde nació.
          </div>
        </div>
      ),
    },
    {
      etiqueta: "Practícalo tú · 1",
      contenido: (
        <TarjetaPractica
          pregunta={"Un vaso sanguíneo se lesiona y se contrae de inmediato (espasmo vascular). ¿En qué estructuras ocurre principalmente esta respuesta?"}
          opciones={[
            "En las venas y vénulas, porque tienen válvulas",
            "En las arterias y arteriolas, por su túnica media muscular",
            "Solo en los capilares, porque no tienen músculo",
            "En todos los vasos por igual, sin diferencias de pared",
          ]}
          correcta={1}
          explicacion={"El espasmo depende del músculo liso. Las arterias y arteriolas tienen la túnica media más gruesa; las venas tienen poco músculo y por eso no son el sitio típico del espasmo."}
        />
      ),
    },
    {
      etiqueta: "Practícalo tú · 2",
      contenido: (
        <TarjetaPractica
          pregunta={"Una persona con déficit de vitamina K tiende a sangrar más. ¿Cuál es la explicación?"}
          opciones={[
            "No se forman plaquetas en la médula ósea",
            "Falla el espasmo vascular de las arterias",
            "La plasmina disuelve el coágulo demasiado rápido",
            "El hígado no fabrica bien los factores II, VII, IX y X, que dependen de esa vitamina",
          ]}
          correcta={3}
          explicacion={"La vitamina K es necesaria para que el hígado sintetice los factores II, VII, IX y X. Sin ellos, la vía común de coagulación se enlentece y el coágulo se forma mal."}
        />
      ),
    },
  ];

  return (
    <LaminaShell
      facultadLabel="Medicina"
      areaLabel="Morfofunción"
      moduloSlug="morfofuncion-cardiovascular"
      moduloTitulo="Sistema cardiovascular y hemostasia"
      titulo="Hemostasia y vasos sanguíneos"
      posicion="Lámina 1 de 1"
      diapositivas={diapositivas}
    />
  );
}

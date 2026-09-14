"use client";

import { useState, useEffect, useMemo } from "react";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MED-07"
      tituloUnidad="Sistema cardiovascular · Corazón y vasos"
      escenas={[
        { titulo: "Sangre · líquido vital", componente: EscSangre },
        { titulo: "Corazón · anatomía", componente: EscCorazon },
        { titulo: "Ciclo cardíaco", componente: EscCiclo },
        { titulo: "Simulador · corazón latiendo", componente: EscSimCorazon },
        { titulo: "Vasos sanguíneos · arterias, venas, capilares", componente: EscVasos },
        { titulo: "Circulación mayor y menor", componente: EscCirculacion },
        { titulo: "Presión arterial", componente: EscPresion },
        { titulo: "Simulador · gasto cardíaco", componente: EscSimGasto },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscSimCorazon() {
  const [fc, setFc] = useState(75);
  const [t, setT] = useState(0);

  useEffect(() => {
    const period = 60000 / fc;
    const id = setInterval(() => {
      setT((prev) => (prev + 50) % period);
    }, 50);
    return () => clearInterval(id);
  }, [fc]);

  const period = 60000 / fc;
  const phase = t / period;
  const sistolePhase = phase < 0.35 ? phase / 0.35 : 0;
  const scale = phase < 0.35 ? 1 - 0.15 * Math.sin(sistolePhase * Math.PI) : 1;
  const fase = phase < 0.1 ? "Sístole auricular" : phase < 0.35 ? "Sístole ventricular" : "Diástole";
  const colorFase = phase < 0.1 ? LIENZO.warn : phase < 0.35 ? LIENZO.bad : "#06b6d4";

  return (
    <EscenaRica>
      <Titulo>Simulador · ver el corazón latiendo</Titulo>

      <Parrafo>
        Ajusta la frecuencia cardíaca y observa cómo cambia el ritmo de contracción.
        Bradicardia (&lt;60), normal (60-100), taquicardia (&gt;100).
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Frecuencia cardíaca: <span style={{ color: "#60a5fa" }}>{fc} lpm</span>
          </label>
          <input
            type="range" min={40} max={180} step={1} value={fc}
            onChange={(e) => setFc(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.7, marginTop: 4 }}>
            <span style={{ color: fc < 60 ? "#06b6d4" : "#475569" }}>Bradicardia</span>
            <span style={{ color: fc >= 60 && fc <= 100 ? "#10b981" : "#475569" }}>Normal</span>
            <span style={{ color: fc > 100 ? "#ef4444" : "#475569" }}>Taquicardia</span>
          </div>
        </div>

        <svg viewBox="0 0 400 200" width="100%" height="220">
          <path
            d={`M 200 90
                C 200 60, 150 50, 130 80
                C 110 110, 150 145, 200 175
                C 250 145, 290 110, 270 80
                C 250 50, 200 60, 200 90 Z`}
            fill="#ef4444"
            opacity={0.6}
            stroke="#dc2626"
            strokeWidth={2}
            transform={`translate(200 115) scale(${scale}) translate(-200 -115)`}
            style={{ transition: "transform 50ms linear" }}
          />
          <text x={200} y={125} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>♥</text>
        </svg>

        <div style={{ padding: 10, background: "#1e293b", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 11, opacity: 0.7 }}>Fase actual</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colorFase }}>{fase}</div>
          <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>
            Período del ciclo: {(period / 1000).toFixed(2)} s
          </div>
        </div>
      </div>

      <Cuidado>
        Prueba fc=40: en deportistas entrenados es normal (corazón más eficiente).
        Prueba fc=180: en ejercicio intenso o emergencia. Sostener taquicardia
        reduce el llenado ventricular y baja el gasto cardíaco.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSimGasto() {
  const [fc, setFc] = useState(75);
  const [vs, setVs] = useState(70);
  const gc = useMemo(() => fc * vs, [fc, vs]);
  const gcL = (gc / 1000).toFixed(2);

  return (
    <EscenaRica>
      <Titulo>Simulador · gasto cardíaco</Titulo>

      <Parrafo>
        <strong>Gasto cardíaco (GC)</strong> = FC × Volumen sistólico.
        Es el volumen de sangre que el corazón expulsa por minuto. Normal: ~5 L/min.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#f59e0b" }}>
            Frecuencia cardíaca (FC) = {fc} lpm
          </label>
          <input type="range" min={40} max={200} step={1} value={fc}
            onChange={(e) => setFc(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#f59e0b" }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#10b981" }}>
            Volumen sistólico (VS) = {vs} mL
          </label>
          <input type="range" min={30} max={150} step={1} value={vs}
            onChange={(e) => setVs(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#10b981" }} />
        </div>

        <div style={{ padding: 14, background: "#1e293b", borderRadius: 8, textAlign: "center", border: "2px solid #60a5fa" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>GC = FC × VS</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#60a5fa", fontFamily: "var(--font-crimson), serif" }}>
            {gc.toLocaleString()} mL/min = {gcL} L/min
          </div>
          <div style={{ fontSize: 11, marginTop: 6,
            color: gc < 4000 ? "#06b6d4" : gc > 8000 ? "#ef4444" : "#10b981" }}>
            {gc < 4000 ? "Bajo (shock?)" : gc > 8000 ? "Elevado (ejercicio)" : "Rango normal"}
          </div>
        </div>
      </div>

      <Mnemotecnia>
        <strong>"GC = FC × VS."</strong> En ejercicio sube FC y VS; en shock cae uno o ambos.
        El cuerpo compensa: si baja VS, sube FC para mantener GC.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSangre() {
  return (
    <EscenaRica>
      <Titulo>Sangre · 5 litros que dan vida</Titulo>

      <Hook>
        Tienes ~5 L de sangre. Cada gota tiene 5 millones de glóbulos rojos.
        Una sola gota va y vuelve por todo tu cuerpo en menos de 1 minuto.
        Total: ~7.000 L de sangre se mueven al día.
      </Hook>

      <Definicion termino="Componentes de la sangre">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Plasma (55%):</strong> agua, proteínas (albúmina, fibrinógeno), sales, glucosa, hormonas.</li>
          <li><strong>Elementos formes (45%):</strong>
            <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
              <li>Eritrocitos (glóbulos rojos): transportan O₂ (hemoglobina con Fe).</li>
              <li>Leucocitos (blancos): defensa inmune.</li>
              <li>Plaquetas: coagulación.</li>
            </ul>
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Composición de la sangre (en tubo centrifugado)
          </text>
          <g transform="translate(280, 50)">
            <rect width={160} height={50} fill="#fbbf24" opacity={0.5} stroke="#d97706" strokeWidth={1.5} />
            <text x={80} y={32} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={700}>Plasma 55%</text>
            <line y1={50} x1={0} x2={160} y2={50} stroke={LIENZO.fg} strokeWidth={0.5} strokeDasharray="3 2" />
            <rect y={50} width={160} height={6} fill="#fff" stroke="#a78bfa" strokeWidth={1} />
            <text x={170} y={56} fill="#a78bfa" fontSize={9}>capa leucocitos+plaquetas (1%)</text>
            <rect y={56} width={160} height={44} fill="#ef4444" opacity={0.6} stroke="#dc2626" strokeWidth={1.5} />
            <text x={80} y={84} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>Eritrocitos 45%</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        En altura (La Paz, Potosí), el cuerpo produce MÁS glóbulos rojos
        (poliglobulia) para compensar la baja PO₂. Por eso los habitantes
        andinos tienen hematocrito más alto que el del nivel del mar.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCorazon() {
  return (
    <EscenaRica>
      <Titulo>Corazón · músculo de 4 cámaras</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 cámaras + 4 válvulas
          </text>
          {/* corazón */}
          <g transform="translate(240, 50)">
            {/* aurícula derecha */}
            <rect x={0} y={0} width={100} height={70} fill="#3b82f6" opacity={0.3} stroke="#3b82f6" strokeWidth={1.5} />
            <text x={50} y={35} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={700}>Aurícula</text>
            <text x={50} y={50} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={700}>derecha</text>
            <text x={50} y={64} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>(sangre venosa)</text>
            {/* aurícula izquierda */}
            <rect x={140} y={0} width={100} height={70} fill="#ef4444" opacity={0.3} stroke="#ef4444" strokeWidth={1.5} />
            <text x={190} y={35} textAnchor="middle" fill="#ef4444" fontSize={11} fontWeight={700}>Aurícula</text>
            <text x={190} y={50} textAnchor="middle" fill="#ef4444" fontSize={11} fontWeight={700}>izquierda</text>
            {/* ventrículo derecho */}
            <rect x={0} y={80} width={100} height={100} fill="#3b82f6" opacity={0.5} stroke="#3b82f6" strokeWidth={1.5} />
            <text x={50} y={120} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>Ventrículo</text>
            <text x={50} y={138} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>derecho</text>
            <text x={50} y={158} textAnchor="middle" fill="#fff" fontSize={10}>→ pulmones</text>
            {/* ventrículo izquierdo */}
            <rect x={140} y={80} width={100} height={100} fill="#ef4444" opacity={0.5} stroke="#ef4444" strokeWidth={1.5} />
            <text x={190} y={120} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>Ventrículo</text>
            <text x={190} y={138} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>izquierdo</text>
            <text x={190} y={158} textAnchor="middle" fill="#fff" fontSize={10}>→ cuerpo</text>
            {/* válvulas */}
            <text x={50} y={78} textAnchor="middle" fill={LIENZO.warn} fontSize={9}>v. tricúspide</text>
            <text x={190} y={78} textAnchor="middle" fill={LIENZO.warn} fontSize={9}>v. mitral</text>
          </g>

          {/* Leyenda */}
          <text x={530} y={70} fill={LIENZO.fg} fontSize={12} fontWeight={600}>4 válvulas:</text>
          <text x={530} y={90} fill={LIENZO.fg} fontSize={11}>• Tricúspide (AD↔VD)</text>
          <text x={530} y={108} fill={LIENZO.fg} fontSize={11}>• Pulmonar (VD→art. pulm.)</text>
          <text x={530} y={126} fill={LIENZO.fg} fontSize={11}>• Mitral o bicúspide (AI↔VI)</text>
          <text x={530} y={144} fill={LIENZO.fg} fontSize={11}>• Aórtica (VI→aorta)</text>
          <text x={530} y={180} fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">Impiden retroceso</text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Aurículas reciben; ventrículos expulsan."</strong> Derecho =
        sangre venosa (azul, hacia pulmón). Izquierdo = sangre arterial (roja,
        hacia cuerpo).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCiclo() {
  return (
    <EscenaRica>
      <Titulo>Ciclo cardíaco · sístole y diástole</Titulo>

      <Definicion termino="Ciclo cardíaco">
        Una secuencia completa de contracción y relajación del corazón. Dura
        ~0.8 segundos en reposo (75 latidos/min).
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fases del ciclo cardíaco
          </text>
          {[
            { x: 90, t: "1. Diástole", d: "relajación · llenado", c: "#06b6d4" },
            { x: 290, t: "2. Sístole auricular", d: "aurículas se contraen", c: LIENZO.warn },
            { x: 490, t: "3. Sístole ventricular", d: "ventrículos expulsan sangre", c: LIENZO.bad },
          ].map((f, i) => (
            <g key={i} transform={`translate(${f.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={110} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={f.c} fontSize={12} fontWeight={700}>{f.t}</text>
              <text x={80} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{f.d}</text>
            </g>
          ))}
          <text x={360} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Los sonidos cardíacos &quot;lub-dub&quot; vienen del cierre de las válvulas
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Sistema de conducción cardíaco">
        Marcapasos natural:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Nódulo sinoauricular (SA):</strong> el marcapasos. En AD.</li>
          <li><strong>Nódulo auriculoventricular (AV):</strong> retransmite.</li>
          <li><strong>Haz de His + fibras de Purkinje:</strong> llevan la señal a los ventrículos.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"SA → AV → His → Purkinje."</strong> El camino del impulso
        cardíaco.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscVasos() {
  return (
    <EscenaRica>
      <Titulo>Vasos sanguíneos · 3 tipos</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Comparación arterias / capilares / venas
          </text>
          {["Característica", "Arterias", "Capilares", "Venas"].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 165} y={40} width={163} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={30 + i * 165 + 81} y={59} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Dirección", a: "Sale del corazón", c2: "Intercambio", v: "Vuelve al corazón" },
            { c: "Pared", a: "Gruesa, elástica", c2: "1 capa de células", v: "Delgada" },
            { c: "Presión", a: "Alta", c2: "Media", v: "Baja" },
            { c: "Válvulas", a: "No", c2: "No", v: "Sí (evitan reflujo)" },
            { c: "Color (típico)", a: "Roja (O₂)", c2: "—", v: "Azulada (CO₂)" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.a, row.c2, row.v].map((v, j) => (
                <g key={j}>
                  <rect x={30 + j * 165} y={68 + i * 33} width={163} height={33} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={30 + j * 165 + 81} y={88 + i * 33} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Importante:</strong> "arteria = sangre con O₂" es FALSO. La
        arteria pulmonar lleva sangre venosa (sin O₂) al pulmón. Lo correcto:
        "arteria = SALE del corazón".
      </Cuidado>
    </EscenaRica>
  );
}

function EscCirculacion() {
  return (
    <EscenaRica>
      <Titulo>Circulación doble · mayor y menor</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            2 circuitos en serie
          </text>
          <g transform="translate(80, 50)">
            <rect width={280} height={170} fill="#06b6d4" opacity={0.1} stroke="#06b6d4" strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill="#06b6d4" fontSize={13} fontWeight={700}>MENOR (pulmonar)</text>
            <text x={140} y={50} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>oxigena la sangre</text>
            <text x={20} y={80} fill={LIENZO.fg} fontSize={11}>VD → arteria pulmonar →</text>
            <text x={20} y={100} fill={LIENZO.fg} fontSize={11}>pulmones (O₂ entra, CO₂ sale)</text>
            <text x={20} y={120} fill={LIENZO.fg} fontSize={11}>→ venas pulmonares → AI</text>
            <text x={140} y={148} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">corta y de baja presión</text>
          </g>
          <g transform="translate(380, 50)">
            <rect width={280} height={170} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>MAYOR (sistémica)</text>
            <text x={140} y={50} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>distribuye al cuerpo</text>
            <text x={20} y={80} fill={LIENZO.fg} fontSize={11}>VI → aorta → todo el cuerpo</text>
            <text x={20} y={100} fill={LIENZO.fg} fontSize={11}>(O₂ y nutrientes a tejidos)</text>
            <text x={20} y={120} fill={LIENZO.fg} fontSize={11}>→ venas cavas → AD</text>
            <text x={140} y={148} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">larga y de alta presión</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Menor = pulmonar (corazón → pulmón → corazón). Mayor =
        sistémica (corazón → cuerpo → corazón)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPresion() {
  return (
    <EscenaRica>
      <Titulo>Presión arterial</Titulo>

      <Definicion termino="Presión arterial">
        Fuerza con que la sangre presiona las paredes arteriales. Se expresa
        en mmHg con 2 valores:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Sistólica:</strong> máxima, durante contracción del VI.</li>
          <li><strong>Diastólica:</strong> mínima, en relajación.</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Valores referenciales
          </text>
          {[
            { x: 90, t: "Hipotensión", v: "&lt;90/60", c: "#06b6d4" },
            { x: 280, t: "Normal", v: "120/80", c: LIENZO.ok },
            { x: 470, t: "Hipertensión", v: "≥140/90", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={85} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}
                fontFamily="var(--font-crimson), serif" dangerouslySetInnerHTML={{ __html: p.v.replace("&lt;", "&lt;") }}>
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Hipertensión:</strong> 1 de cada 3 adultos. Riesgo de infarto,
        ACV, daño renal. Factores: sal, sedentarismo, estrés, herencia. Es la
        "asesina silenciosa" porque no da síntomas.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Las arterias siempre llevan O₂'">
        <strong>Realidad:</strong> arteria = SALE del corazón. La arteria
        pulmonar lleva sangre SIN oxigenar al pulmón.
      </Misconception>

      <Misconception titulo="Error 2 · 'El lado izquierdo del corazón está a tu izquierda'">
        <strong>Realidad:</strong> a la izquierda DEL paciente (a tu derecha
        si lo mirás de frente).
      </Misconception>

      <Misconception titulo="Error 3 · 'En altura tienes menos glóbulos rojos'">
        <strong>Realidad:</strong> al revés. Por la baja PO₂, el cuerpo
        produce MÁS eritrocitos (poliglobulia).
      </Misconception>

      <Resumen>
        Sangre = plasma + eritrocitos + leucocitos + plaquetas. Corazón: 4
        cámaras + 4 válvulas. Ciclo: sístole (contracción) ↔ diástole
        (relajación). Marcapasos: SA. Vasos: arterias (salen), venas (vuelven),
        capilares (intercambio). Circulación menor (pulmonar) y mayor
        (sistémica). PA normal: 120/80.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es el marcapasos natural del corazón?"
        opciones={["Nódulo AV", "Nódulo SA", "Haz de His", "Fibras de Purkinje"]}
        correctaIdx={1}
        explicacion="El nódulo sinoauricular (SA) en la aurícula derecha marca el ritmo."
      />

      <AutoCheck
        pregunta="¿Qué válvula separa la aurícula izquierda del ventrículo izquierdo?"
        opciones={["Tricúspide", "Mitral", "Pulmonar", "Aórtica"]}
        correctaIdx={1}
        explicacion="La mitral (o bicúspide). La tricúspide está en el lado derecho."
      />

      <AutoCheck
        pregunta="¿Qué cámara recibe sangre venosa de las venas cavas?"
        opciones={["AI", "AD", "VI", "VD"]}
        correctaIdx={1}
        explicacion="La aurícula derecha recibe sangre venosa (sin O₂) por las venas cavas."
      />

      <AutoCheck
        pregunta="¿En qué tipo de vaso se produce el intercambio de gases con los tejidos?"
        opciones={["arterias", "arteriolas", "capilares", "venas"]}
        correctaIdx={2}
        explicacion="Los capilares tienen una sola capa celular: ideal para intercambio."
      />
    </EscenaRica>
  );
}

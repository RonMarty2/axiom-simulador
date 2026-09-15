"use client";

import React, { useState, useMemo } from "react";
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
      unidad="BIO-04"
      tituloUnidad="Genética mendeliana · Herencia y cruzas"
      escenas={[
        { titulo: "Mendel y el origen de la genética", componente: EscMendel },
        { titulo: "Vocabulario clave · gen, alelo, genotipo, fenotipo", componente: EscVocab },
        { titulo: "Primera ley · uniformidad", componente: EscLey1 },
        { titulo: "Segunda ley · segregación", componente: EscLey2 },
        { titulo: "Simulador · cuadro de Punnett", componente: EscSimulador },
        { titulo: "Tercera ley · independencia (dihíbrido)", componente: EscLey3 },
        { titulo: "Herencia ligada al sexo", componente: EscSexo },
        { titulo: "Grupos sanguíneos · ABO y Rh", componente: EscABO },
        { titulo: "Problemas tipo examen", componente: EscExamen },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscMendel() {
  return (
    <EscenaRica>
      <Titulo>Mendel · el monje que descifró la herencia</Titulo>

      <Hook>
        En 1865, Gregor Mendel publicó sus experimentos con guisantes. Nadie le
        prestó atención. Murió en el olvido. 35 años después, lo redescubrieron
        y se convirtió en el padre de la genética. Su clave: tratar la herencia
        como matemática.
      </Hook>

      <Definicion termino="Gregor Mendel (1822–1884)">
        Monje agustino austríaco. Estudió la herencia en 28.000 plantas de
        guisantes (Pisum sativum). Concluyó que los rasgos se heredan en
        unidades discretas (lo que hoy llamamos GENES).
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Por qué guisantes? Las 7 características que estudió
          </text>
          {[
            { c: "Color flor", v: "violeta/blanco" },
            { c: "Forma semilla", v: "lisa/rugosa" },
            { c: "Color semilla", v: "amarillo/verde" },
            { c: "Color vaina", v: "verde/amarillo" },
            { c: "Forma vaina", v: "llena/contraída" },
            { c: "Posición flor", v: "axial/terminal" },
            { c: "Tamaño tallo", v: "alto/enano" },
          ].map((t, i) => (
            <g key={i} transform={`translate(${80 + (i % 4) * 150}, ${i < 4 ? 55 : 115})`}>
              <text fill={LIENZO.accent} fontSize={11} fontWeight={700}>{t.c}:</text>
              <text y={16} fill={LIENZO.fg} fontSize={11}>{t.v}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Cruza, cuenta, calcula."</strong> Mendel cruzaba plantas
        puras, contaba los descendientes y calculaba proporciones. Su gran
        invento: ver la herencia como probabilidad.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscVocab() {
  return (
    <EscenaRica>
      <Titulo>Vocabulario clave (sí o sí)</Titulo>

      <Definicion termino="Gen">
        Fragmento de ADN que codifica una característica. Ej: gen del color
        de ojos.
      </Definicion>

      <Definicion termino="Alelo">
        Las distintas versiones de un mismo gen. Ej: el gen "color de ojos"
        tiene alelos para café (B) y azul (b).
      </Definicion>

      <Definicion termino="Genotipo">
        Combinación de alelos que tiene un individuo. Ej: BB, Bb, bb.
      </Definicion>

      <Definicion termino="Fenotipo">
        La característica VISIBLE. Lo que se EXPRESA. Ej: ojos cafés u ojos
        azules.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de genotipo
          </text>
          {[
            { x: 100, t: "Homocigoto dominante", g: "AA", f: "fenotipo dominante", c: LIENZO.ok },
            { x: 290, t: "Heterocigoto", g: "Aa", f: "fenotipo dominante", c: LIENZO.warn },
            { x: 480, t: "Homocigoto recesivo", g: "aa", f: "fenotipo recesivo", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={120} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={60} textAnchor="middle" fill={p.c} fontSize={28} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{p.g}</text>
              <text x={80} y={90} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.f}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Convención de letras">
        Mayúscula = alelo DOMINANTE. Minúscula = alelo RECESIVO.<br />
        Ej: A (color amarillo, dominante) y a (verde, recesivo).
      </Definicion>

      <Cuidado>
        <strong>Dominante NO significa "mejor".</strong> Solo significa que
        se EXPRESA cuando hay un solo alelo. El recesivo se "esconde" hasta
        que aparezcan dos copias.
      </Cuidado>
    </EscenaRica>
  );
}

function EscLey1() {
  return (
    <EscenaRica>
      <Titulo>1ª Ley · Uniformidad de los híbridos</Titulo>

      <Definicion termino="Ley de uniformidad">
        Cuando se cruzan dos progenitores HOMOCIGOTOS PUROS para un carácter
        (uno AA, otro aa), TODOS los descendientes (F1) son HETEROCIGOTOS (Aa)
        y muestran el fenotipo dominante.
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cruza: AA × aa → 100% Aa
          </text>
          {/* P (padres) */}
          <g transform="translate(150, 60)">
            <rect width={80} height={50} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={2} rx={6} />
            <text x={40} y={20} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>Padre 1</text>
            <text x={40} y={40} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}
              fontFamily="var(--font-crimson), serif">AA</text>
          </g>
          <text x={250} y={92} fontSize={18} fill={LIENZO.fg}>×</text>
          <g transform="translate(290, 60)">
            <rect width={80} height={50} fill={LIENZO.bad} opacity={0.2} stroke={LIENZO.bad} strokeWidth={2} rx={6} />
            <text x={40} y={20} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>Padre 2</text>
            <text x={40} y={40} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}
              fontFamily="var(--font-crimson), serif">aa</text>
          </g>

          {/* flecha */}
          <line x1={250} x2={250} y1={120} y2={160} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#l1arr)" />
          <text x={260} y={143} fill={LIENZO.accent} fontSize={11}>cruza</text>

          {/* F1 */}
          <g transform="translate(180, 170)">
            <rect width={160} height={50} fill={LIENZO.warn} opacity={0.2} stroke={LIENZO.warn} strokeWidth={2} rx={6} />
            <text x={80} y={20} textAnchor="middle" fill={LIENZO.warn} fontSize={11} fontWeight={700}>F1 (100% heterocigotos)</text>
            <text x={80} y={40} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}
              fontFamily="var(--font-crimson), serif">Aa</text>
          </g>

          {/* Fenotipo: dominante */}
          <g transform="translate(450, 170)">
            <text fill={LIENZO.fg} fontSize={13} fontWeight={700}>Fenotipo:</text>
            <text y={18} fill={LIENZO.ok} fontSize={12}>100% dominante</text>
            <text y={34} fill={LIENZO.fgDim} fontSize={11}>(porque tienen una A)</text>
          </g>

          <defs>
            <marker id="l1arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Cruza flores rojas puras (RR) con blancas puras (rr). ¿Cómo es la F1?">
        Padres: RR × rr<br />
        Gametos: R, R × r, r<br />
        F1: <strong>100% Rr</strong> → todas rojas (R domina sobre r)
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Los puros dan híbridos uniformes."</strong> Esta es la idea
        clave de la 1ª ley.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscLey2() {
  return (
    <EscenaRica>
      <Titulo>2ª Ley · Segregación de los alelos</Titulo>

      <Definicion termino="Ley de segregación">
        Al cruzar dos individuos HETEROCIGOTOS (Aa × Aa), los alelos se
        separan al formar gametos. Resultado en F2:<br /><br />
        <strong>Genotipo:</strong> 1 AA : 2 Aa : 1 aa<br />
        <strong>Fenotipo:</strong> 3 dominantes : 1 recesivo
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cuadro de Punnett · Aa × Aa
          </text>
          {/* gametos arriba */}
          <text x={300} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>A</text>
          <text x={380} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>a</text>
          {/* gametos izquierda */}
          <text x={230} y={120} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>A</text>
          <text x={230} y={200} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>a</text>

          {/* Celdas cuadradas de verdad: eran 80×60, o sea rectángulos, en algo
              que se llama "cuadro" de Punnett. */}
          {[
            { x: 260, y: 75, t: "AA", c: LIENZO.ok },
            { x: 340, y: 75, t: "Aa", c: LIENZO.warn },
            { x: 260, y: 155, t: "Aa", c: LIENZO.warn },
            { x: 340, y: 155, t: "aa", c: LIENZO.bad },
          ].map((q, i) => (
            <g key={i}>
              <rect x={q.x} y={q.y} width={80} height={80} fill={q.c} opacity={0.2} stroke={q.c} strokeWidth={2} />
              <text x={q.x + 40} y={q.y + 48} textAnchor="middle" fill={q.c} fontSize={18} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{q.t}</text>
            </g>
          ))}

          {/* Resultados */}
          <g transform="translate(460, 90)">
            <text fill={LIENZO.fg} fontSize={13} fontWeight={700}>Genotipo:</text>
            <text y={20} fill={LIENZO.ok} fontSize={12}>1/4 AA</text>
            <text y={36} fill={LIENZO.warn} fontSize={12}>2/4 Aa</text>
            <text y={52} fill={LIENZO.bad} fontSize={12}>1/4 aa</text>
            <text y={80} fill={LIENZO.fg} fontSize={13} fontWeight={700}>Fenotipo:</text>
            <text y={100} fill={LIENZO.fg} fontSize={12}>3 dominante : 1 recesivo</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"3:1 fenotípico, 1:2:1 genotípico."</strong> Es la proporción
        más importante de toda la genética mendeliana.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSimulador() {
  const [a1, setA1] = useState<"A" | "a">("A");
  const [a2, setA2] = useState<"A" | "a">("a");
  const [b1, setB1] = useState<"A" | "a">("A");
  const [b2, setB2] = useState<"A" | "a">("a");

  const cells = useMemo(() => {
    const g1 = [a1, a2];
    const g2 = [b1, b2];
    const grid: string[][] = [];
    for (const x of g1) {
      const row: string[] = [];
      for (const y of g2) {
        const sorted = [x, y].sort((p, q) => (p === "A" ? -1 : 1)).join("");
        row.push(sorted);
      }
      grid.push(row);
    }
    const flat = grid.flat();
    const AA = flat.filter((c) => c === "AA").length;
    const Aa = flat.filter((c) => c === "Aa").length;
    const aa = flat.filter((c) => c === "aa").length;
    return { grid, AA, Aa, aa };
  }, [a1, a2, b1, b2]);

  return (
    <EscenaRica>
      <Titulo>Simulador · cuadro de Punnett</Titulo>

      <Parrafo>
        Elige el genotipo de cada padre y mira los descendientes.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Padre 1</div>
            <div style={{ display: "flex", gap: 6 }}>
              <SelectorAlelo v={a1} onChange={setA1} />
              <SelectorAlelo v={a2} onChange={setA2} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Padre 2</div>
            <div style={{ display: "flex", gap: 6 }}>
              <SelectorAlelo v={b1} onChange={setB1} />
              <SelectorAlelo v={b2} onChange={setB2} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 4, fontFamily: "var(--font-crimson), serif" }}>
          <div></div>
          <div style={{ background: "#1e293b", padding: 8, textAlign: "center", borderRadius: 4, fontWeight: 700 }}>{b1}</div>
          <div style={{ background: "#1e293b", padding: 8, textAlign: "center", borderRadius: 4, fontWeight: 700 }}>{b2}</div>
          {[a1, a2].map((rA, i) => (
            <React.Fragment key={`row${i}`}>
              <div style={{ background: "#1e293b", padding: 8, textAlign: "center", borderRadius: 4, fontWeight: 700 }}>{rA}</div>
              {cells.grid[i].map((c, j) => {
                const color = c === "AA" ? "#10b981" : c === "Aa" ? "#f59e0b" : "#ef4444";
                return (
                  <div key={`c${i}${j}`} style={{
                    background: `${color}33`, border: `2px solid ${color}`,
                    padding: 12, textAlign: "center", borderRadius: 4,
                    fontWeight: 700, fontSize: 18, color,
                  }}>{c}</div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 14, padding: 12, background: "#1e293b", borderRadius: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Resultado:</div>
          <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
            <span style={{ color: "#10b981" }}>{cells.AA}/4 AA</span>
            <span style={{ color: "#f59e0b" }}>{cells.Aa}/4 Aa</span>
            <span style={{ color: "#ef4444" }}>{cells.aa}/4 aa</span>
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>
            Fenotipo: {cells.AA + cells.Aa}/4 dominante : {cells.aa}/4 recesivo
          </div>
        </div>
      </div>
    </EscenaRica>
  );
}

function SelectorAlelo({ v, onChange }: { v: "A" | "a"; onChange: (v: "A" | "a") => void }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {(["A", "a"] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            width: 36, height: 36,
            background: v === opt ? (opt === "A" ? "#10b981" : "#ef4444") : "#1e293b",
            color: v === opt ? "#0f172a" : "#cbd5e1",
            border: "1px solid #475569", borderRadius: 6,
            cursor: "pointer", fontWeight: 700, fontSize: 16,
            fontFamily: "var(--font-crimson), serif",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function EscLey3() {
  return (
    <EscenaRica>
      <Titulo>3ª Ley · Independencia de caracteres</Titulo>

      <Definicion termino="Ley de la transmisión independiente">
        Los alelos de DOS o más genes se distribuyen INDEPENDIENTEMENTE durante
        la formación de gametos (siempre que estén en cromosomas distintos).
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cruza dihíbrida F1 × F1: AaBb × AaBb → F2 = 9:3:3:1
          </text>
          {[
            { x: 90, t: "9/16", f: "amarillo + liso", c: LIENZO.ok, sub: "A_B_" },
            { x: 250, t: "3/16", f: "amarillo + rugoso", c: LIENZO.warn, sub: "A_bb" },
            { x: 410, t: "3/16", f: "verde + liso", c: "#06b6d4", sub: "aaB_" },
            { x: 570, t: "1/16", f: "verde + rugoso", c: LIENZO.bad, sub: "aabb" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={150} height={115} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={65} y={32} textAnchor="middle" fill={p.c} fontSize={20} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{p.t}</text>
              <text x={65} y={56} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.f}</text>
              <text x={65} y={90} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}
                fontFamily="var(--font-crimson), serif">{p.sub}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <WorkedExample titulo="Mendel cruzó guisantes AaBb × AaBb. ¿De 320 descendientes, ¿cuántos son aabb?">
        Proporción aabb = 1/16<br />
        320 × (1/16) = <strong>20 individuos aabb</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"9 : 3 : 3 : 1"</strong> es a la dihíbrida lo que "3:1" es a
        la monohíbrida.
      </Mnemotecnia>

      <Cuidado>
        Esta ley NO se cumple si los genes están LIGADOS (en el mismo
        cromosoma cerca uno del otro). Ahí aparecen los conceptos de
        recombinación.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSexo() {
  return (
    <EscenaRica>
      <Titulo>Herencia ligada al sexo</Titulo>

      <Hook>
        ¿Por qué el daltonismo y la hemofilia son MÁS frecuentes en varones?
        Porque sus genes están en el cromosoma X, y los varones tienen un solo
        X (XY).
      </Hook>

      <Definicion termino="Cromosomas sexuales">
        En humanos:<br />
        Mujer: <strong>XX</strong> (dos cromosomas X)<br />
        Varón: <strong>XY</strong> (un X, un Y)
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Daltonismo (gen recesivo en X)
          </text>
          {[
            { x: 80, sx: "X^A X^A", f: "mujer NORMAL", c: LIENZO.ok },
            { x: 230, sx: "X^A X^a", f: "mujer PORTADORA sana", c: LIENZO.warn },
            { x: 380, sx: "X^a X^a", f: "mujer ENFERMA", c: LIENZO.bad },
            { x: 530, sx: "X^A Y", f: "varón normal", c: LIENZO.ok, y: 130 },
            { x: 80, sx: "X^a Y", f: "varón ENFERMO", c: LIENZO.bad, y: 130 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 50})`}>
              <rect x={-10} y={0} width={130} height={70} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={55} y={28} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{p.sx}</text>
              <text x={55} y={50} textAnchor="middle" fill={p.c} fontSize={11}>{p.f}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="¿Por qué los varones se enferman más?">
        Solo tienen UN cromosoma X. Si ese X tiene el alelo malo, no hay otro
        para compensar (el Y es más chico y no tiene los mismos genes). Las
        mujeres pueden ser PORTADORAS sanas si tienen un X normal y otro
        afectado.
      </Definicion>

      <WorkedExample titulo="Mujer portadora (X^A X^a) × varón normal (X^A Y). ¿Probabilidad de hijos enfermos?">
        Gametos madre: X^A o X^a<br />
        Gametos padre: X^A o Y<br />
        Combinaciones: X^A X^A, X^A X^a, X^A Y, X^a Y<br />
        Solo X^a Y (varón) está enfermo → <strong>1/4 enfermo (50% de los varones)</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Hijo varón hereda el problema X de la mamá; los varones no
        portan."</strong> Patrón típico de hemofilia, daltonismo, distrofia
        muscular de Duchenne.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscABO() {
  return (
    <EscenaRica>
      <Titulo>Grupos sanguíneos · ABO y Rh</Titulo>

      <Definicion termino="Sistema ABO">
        Gen con 3 alelos: I^A, I^B (codominantes) e i (recesivo). Da 4
        fenotipos diferentes.
      </Definicion>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 grupos sanguíneos y sus genotipos
          </text>
          {[
            { x: 90, t: "A", g: "I^A I^A o I^A i", c: "#ef4444" },
            { x: 250, t: "B", g: "I^B I^B o I^B i", c: "#3b82f6" },
            { x: 410, t: "AB", g: "I^A I^B", c: "#a78bfa" },
            { x: 570, t: "O", g: "i i", c: "#84cc16" },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x}, 55)`}>
              <circle cx={70} cy={40} r={36} fill={b.c} opacity={0.3} stroke={b.c} strokeWidth={2.5} />
              <text x={70} y={48} textAnchor="middle" fill={b.c} fontSize={26} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{b.t}</text>
              <text x={70} y={100} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{b.g}</text>
            </g>
          ))}
          <g transform="translate(80, 170)">
            <text fill={LIENZO.fg} fontSize={11}>
              <tspan fill={LIENZO.ok} fontWeight={700}>Donante universal:</tspan> O- (sin antígenos)
            </text>
            <text y={18} fill={LIENZO.fg} fontSize={11}>
              <tspan fill={LIENZO.accent} fontWeight={700}>Receptor universal:</tspan> AB+ (sin anticuerpos)
            </text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Codominancia">
        Cuando los dos alelos se EXPRESAN simultáneamente. En AB, ambos antígenos
        (A y B) aparecen en los glóbulos rojos. Es distinto de la dominancia
        clásica.
      </Definicion>

      <Definicion termino="Factor Rh">
        Otro gen, con 2 alelos: Rh⁺ (dominante) y Rh⁻ (recesivo). Por eso dices
        "A+", "O-", etc. Importante en transfusiones y embarazo.
      </Definicion>

      <WorkedExample titulo="Madre A (I^A i) × padre B (I^B i). ¿Qué grupos sanguíneos pueden tener los hijos?">
        Gametos madre: I^A o i<br />
        Gametos padre: I^B o i<br />
        Combinaciones: I^A I^B (AB), I^A i (A), I^B i (B), i i (O)<br />
        <strong>4 grupos posibles: AB, A, B, O</strong> (cada uno con 25%)
      </WorkedExample>
    </EscenaRica>
  );
}

function EscExamen() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen FCyT UMSS</Titulo>

      <WorkedExample titulo="EXAMEN: Cruza guisantes Aa × aa. ¿Proporción fenotípica de F1?">
        Gametos: A o a × a, a<br />
        F1: 1/2 Aa, 1/2 aa<br />
        Fenotipo: <strong>50% dominante : 50% recesivo</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: Pareja heterocigota Aa × Aa tiene 4 hijos. ¿Probabilidad de que TODOS sean dominantes?">
        Probabilidad de uno dominante = 3/4<br />
        Probabilidad de los 4 = (3/4)⁴ = 81/256 ≈ <strong>31.6%</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: Madre I^A i × padre I^B i. ¿Probabilidad de hijo tipo O?">
        Solo combinación i i (genotipo O).<br />
        P(i de madre) = 1/2; P(i de padre) = 1/2<br />
        P(O) = 1/2 × 1/2 = <strong>1/4 = 25%</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: ¿Qué porcentaje de mujeres daltónicas en hijas de portadora X^A X^a × varón normal X^A Y?">
        Hijas: X^A X^A (1/4 total) y X^A X^a (1/4 total) = ambas SANAS.<br />
        <strong>0% mujeres daltónicas</strong> en esta cruza.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Dominante = más común'">
        <strong>Pensar:</strong> que el alelo dominante siempre está en más
        gente.<br />
        <strong>Realidad:</strong> NO. Dominante = se expresa con 1 copia. Pero
        puede ser raro en la población. Ej: en humanos, el alelo de "6 dedos"
        es dominante pero rarísimo.
      </Misconception>

      <Misconception titulo="Error 2 · 'Confundir genotipo con fenotipo'">
        <strong>Pensar:</strong> que se piden lo mismo.<br />
        <strong>Realidad:</strong> Genotipo = combinación de alelos (AA, Aa, aa).
        Fenotipo = expresión visible (alto/bajo, rojo/blanco).
      </Misconception>

      <Misconception titulo="Error 3 · 'Una mujer XX no puede tener daltonismo'">
        <strong>Pensar:</strong> que solo varones se enferman.<br />
        <strong>Realidad:</strong> es RARO pero POSIBLE: necesita ambos X
        afectados (X^a X^a). Es padre daltónico + madre portadora.
      </Misconception>

      <Misconception titulo="Error 4 · 'Los hijos heredan del padre lo del padre'">
        <strong>Pensar:</strong> que cada característica viene de un solo
        progenitor.<br />
        <strong>Realidad:</strong> cada característica recibe un alelo de cada
        padre. La sumatoria de ambos determina el fenotipo.
      </Misconception>

      <Resumen>
        Mendel: 1ª ley uniformidad (AA × aa → 100% Aa), 2ª ley segregación
        (Aa × Aa → 3:1), 3ª ley independencia (dihíbrido 9:3:3:1). Ligado al
        sexo: cromosoma X transmite daltonismo y hemofilia (varones más
        afectados). ABO: codominancia + 3 alelos = 4 fenotipos.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la proporción fenotípica esperada al cruzar Aa × Aa?"
        opciones={["1:1", "3:1", "1:2:1", "9:3:3:1"]}
        correctaIdx={1}
        explicacion="Monohíbrida heterocigota: 3 dominantes : 1 recesivo."
      />

      <AutoCheck
        pregunta="Si ambos padres son Aa, ¿qué % de hijos serán homocigotos recesivos (aa)?"
        opciones={["25%", "50%", "75%", "100%"]}
        correctaIdx={0}
        explicacion="1/4 = 25% según la 2ª ley."
      />

      <AutoCheck
        pregunta="Padre tipo O × madre tipo AB. ¿Qué grupos pueden tener los hijos?"
        opciones={["solo O", "solo AB", "A o B", "A, B, AB u O"]}
        correctaIdx={2}
        explicacion="Padre ii × madre I^A I^B → I^A i (A) o I^B i (B). Nunca O ni AB."
      />

      <AutoCheck
        pregunta="¿Por qué los varones se afectan más por la hemofilia?"
        opciones={[
          "Tienen sangre más débil",
          "El gen está en el cromosoma Y",
          "Solo tienen un cromosoma X",
          "Tienen menos plaquetas",
        ]}
        correctaIdx={2}
        explicacion="El gen de la hemofilia está en X. Como los varones (XY) tienen solo un X, si está afectado no tienen otro X para compensar."
      />

      <AutoCheck
        pregunta="En la cruza dihíbrida AaBb × AaBb, ¿qué proporción de descendientes muestra fenotipo recesivo en AMBOS genes?"
        opciones={["1/4", "9/16", "1/16", "3/16"]}
        correctaIdx={2}
        explicacion="9:3:3:1 → solo 1/16 es aabb (recesivo en ambos)."
      />
    </EscenaRica>
  );
}

"use client";

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
      unidad="BIO-07"
      tituloUnidad="Ecología y medio ambiente"
      escenas={[
        { titulo: "Ecología · de qué se trata", componente: EscIntro },
        { titulo: "Niveles supraindividuales", componente: EscNiveles },
        { titulo: "Factores bióticos y abióticos", componente: EscFactores },
        { titulo: "Relaciones entre especies", componente: EscRelaciones },
        { titulo: "Cadenas y redes tróficas", componente: EscTroficas },
        { titulo: "Pirámides ecológicas", componente: EscPiramides },
        { titulo: "Ciclos biogeoquímicos (C, N, H₂O)", componente: EscCiclos },
        { titulo: "Problemas ambientales · panorama global", componente: EscProblemas },
        { titulo: "Medio ambiente y conservación en Bolivia", componente: EscBolivia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Ecología · la ciencia de las relaciones</Titulo>

      <Hook>
        Si desaparecieran TODOS los humanos, el planeta seguiría perfectamente.
        Si desaparecieran las abejas, en pocos años se colapsaría la
        agricultura. La ecología estudia esas conexiones invisibles que
        sostienen la vida.
      </Hook>

      <Definicion termino="Ecología (Haeckel, 1869)">
        Ciencia que estudia las relaciones de los seres vivos entre sí y con
        su medio ambiente. Del griego <em>oikos</em> (casa) + <em>logos</em>
        (estudio).
      </Definicion>

      <Conexion>
        La ecología conecta TODOS los temas anteriores: las biomoléculas
        (Unidad 2) circulan en los ciclos biogeoquímicos; la energía celular
        (Unidad 5) sostiene las cadenas tróficas; las especies (Unidad 6)
        se relacionan en ecosistemas.
      </Conexion>

      <Mnemotecnia>
        <strong>"Eco-logía"</strong>: estudio de la "casa" (el ambiente). Todo
        organismo es inquilino de algún hogar.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscNiveles() {
  return (
    <EscenaRica>
      <Titulo>Niveles de organización supraindividuales</Titulo>

      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 720 310" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Del individuo a la biosfera
          </text>
          {[
            { t: "Individuo", d: "un ser vivo", c: "#3b82f6" },
            { t: "Población", d: "individuos de UNA especie en un lugar", c: "#06b6d4" },
            { t: "Comunidad", d: "varias poblaciones en un lugar (biocenosis)", c: "#10b981" },
            { t: "Ecosistema", d: "comunidad + ambiente físico (biotopo)", c: "#84cc16" },
            { t: "Bioma", d: "conjunto de ecosistemas similares", c: "#eab308" },
            { t: "Biosfera", d: "todos los ecosistemas del planeta", c: "#f59e0b" },
          ].map((n, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 42})`}>
              <rect x={0} y={0} width={580 - i * 20} height={32} fill={n.c} opacity={0.2} stroke={n.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={20} fill={n.c} fontSize={12} fontWeight={700}>{i + 1}. {n.t}</text>
              <text x={140} y={20} fill={LIENZO.fg} fontSize={11}>{n.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Biotopo y biocenosis">
        <strong>Biotopo:</strong> medio físico (agua, suelo, aire, temperatura).<br />
        <strong>Biocenosis:</strong> comunidad de seres vivos.<br />
        Juntos: <strong>ecosistema</strong> = biotopo + biocenosis.
      </Definicion>

      <Mnemotecnia>
        <strong>"De a uno (individuo) a todos (biosfera)."</strong> Cada nivel
        es un grupo del anterior + algo más.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFactores() {
  return (
    <EscenaRica>
      <Titulo>Factores · bióticos vs abióticos</Titulo>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Lo vivo y lo no vivo del ecosistema
          </text>
          <g transform="translate(80, 55)">
            <rect width={280} height={130} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>BIÓTICOS</text>
            <text x={140} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">(lo vivo)</text>
            <text x={140} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Productores (plantas)</text>
            <text x={140} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Consumidores (animales)</text>
            <text x={140} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Descomponedores (bact., hongos)</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={280} height={130} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>ABIÓTICOS</text>
            <text x={140} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">(lo no vivo)</text>
            <text x={140} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Físicos: T, luz, presión, viento</text>
            <text x={140} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Químicos: O₂, CO₂, sales, pH</text>
            <text x={140} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Geológicos: suelo, rocas</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Hábitat y nicho">
        <strong>Hábitat:</strong> el lugar donde vive un organismo (la
        "dirección"). Ej: el bosque de pinos.<br />
        <strong>Nicho ecológico:</strong> el papel funcional que cumple (el
        "trabajo"). Ej: depredador nocturno carnívoro.
      </Definicion>

      <Mnemotecnia>
        <strong>"Hábitat = dirección; Nicho = profesión."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscRelaciones() {
  return (
    <EscenaRica>
      <Titulo>Relaciones entre especies</Titulo>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 720 300" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿A quién beneficia / perjudica la relación?
          </text>
          {[
            { c: "Mutualismo", a: "+ / +", ej: "abeja-flor, líquenes", col: LIENZO.ok },
            { c: "Comensalismo", a: "+ / 0", ej: "rémora-tiburón", col: "#06b6d4" },
            { c: "Inquilinismo", a: "+ / 0", ej: "ave nido en árbol", col: "#0ea5e9" },
            { c: "Depredación", a: "+ / −", ej: "puma caza vicuña", col: LIENZO.bad },
            { c: "Parasitismo", a: "+ / −", ej: "garrapata-perro", col: LIENZO.warn },
            { c: "Competencia", a: "− / −", ej: "leones por presa", col: "#dc2626" },
            { c: "Amensalismo", a: "0 / −", ej: "Penicillium → bacterias", col: "#7c3aed" },
          ].map((r, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 32})`}>
              <rect width={580} height={26} fill={r.col} opacity={0.1} stroke={r.col} strokeWidth={1} rx={4} />
              <text x={15} y={17} fill={r.col} fontSize={12} fontWeight={700}>{r.c}</text>
              <text x={170} y={17} fill={LIENZO.fg} fontSize={12} fontFamily="var(--font-crimson), serif">{r.a}</text>
              <text x={290} y={17} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{r.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Convenciones de signos">
        <strong>+</strong> = la especie se beneficia | <strong>−</strong> =
        se perjudica | <strong>0</strong> = no le afecta.<br /><br />
        Ejemplo: <em>mutualismo</em> (+/+) = ambas se benefician.
      </Definicion>

      <Mnemotecnia>
        <strong>"Mutualismo ganan los dos; depredación uno gana y otro muere;
        parasitismo gana viviendo del otro; competencia ambos pierden."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscTroficas() {
  return (
    <EscenaRica>
      <Titulo>Cadenas y redes tróficas · ¿quién come a quién?</Titulo>

      <Definicion termino="Cadena trófica">
        Secuencia lineal en la que cada eslabón es comido por el siguiente. La
        energía y materia fluyen del SOL hacia los descomponedores.
      </Definicion>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Niveles tróficos
          </text>
          {[
            { x: 80, t: "Productor", e: "1°", c: "#22c55e", ej: "planta" },
            { x: 220, t: "Consumidor I", e: "2°", c: "#eab308", ej: "vicuña" },
            { x: 360, t: "Consumidor II", e: "3°", c: "#f59e0b", ej: "puma" },
            { x: 500, t: "Consumidor III", e: "4°", c: "#ef4444", ej: "cóndor (carroñero)" },
            { x: 640, t: "Descomponedor", e: "", c: "#a78bfa", ej: "bacteria, hongo" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x - 60}, 55)`}>
              <rect width={120} height={70} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={60} y={20} textAnchor="middle" fill={p.c} fontSize={11} fontWeight={700}>{p.t}</text>
              <text x={60} y={40} textAnchor="middle" fill={p.c} fontSize={14} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{p.e}</text>
              <text x={60} y={58} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
          {/* flechas */}
          {[140, 280, 420, 560].map((x, i) => (
            <line key={i} x1={x} x2={x + 20} y1={90} y2={90} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#trArr)" />
          ))}

          <text x={360} y={160} textAnchor="middle" fill={LIENZO.warn} fontSize={12} fontWeight={600}>
            Regla del 10%: cada nivel solo retiene 10% de la energía del anterior
          </text>
          <text x={360} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>
            (el 90% se pierde como calor, respiración o no asimilado)
          </text>
          <text x={360} y={210} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>
            Por eso hay POCOS depredadores top y MUCHOS productores.
          </text>

          <defs>
            <marker id="trArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Red trófica">
        En la realidad, los organismos comen y son comidos por MUCHAS especies.
        Las cadenas se entrelazan formando RED. Si quitas una especie, toda
        la red se desequilibra.
      </Definicion>

      <Cuidado>
        Los descomponedores cierran el ciclo: devuelven los nutrientes al
        suelo. Sin ellos, los muertos y desechos se acumularían y la vida
        no continuaría.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPiramides() {
  return (
    <EscenaRica>
      <Titulo>Pirámides ecológicas</Titulo>

      <Definicion termino="Pirámide ecológica">
        Representación gráfica de la cantidad de organismos, biomasa o energía
        en cada nivel trófico. Casi siempre tiene forma de pirámide
        (productores en la base).
      </Definicion>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 tipos de pirámides
          </text>
          {[
            { x: 110, t: "N° de individuos", base: "muchos productores", n: "Números" },
            { x: 360, t: "Biomasa (kg/m²)", base: "más masa de productores", n: "Biomasa" },
            { x: 610, t: "Energía (kcal)", base: "100% en el sol", n: "Energía" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 60)`}>
              <text x={0} y={0} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{p.n}</text>
              {/* pirámide */}
              {[
                { y: 30, w: 30, c: "#ef4444" },
                { y: 50, w: 50, c: "#f59e0b" },
                { y: 75, w: 80, c: "#eab308" },
                { y: 105, w: 120, c: "#22c55e" },
              ].map((nv, j) => (
                <rect key={j} x={-nv.w / 2} y={nv.y} width={nv.w} height={20}
                  fill={nv.c} opacity={0.5} stroke={nv.c} strokeWidth={1.5} />
              ))}
              <text x={0} y={150} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.t}</text>
              <text x={0} y={166} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9} fontStyle="italic">{p.base}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La pirámide de ENERGÍA siempre tiene esa forma (regla del 10%). Las
        otras dos a veces se INVIERTEN: ej. un solo árbol grande (biomasa
        grande) con miles de insectos (números grandes).
      </Cuidado>
    </EscenaRica>
  );
}

function EscCiclos() {
  return (
    <EscenaRica>
      <Titulo>Ciclos biogeoquímicos · C, N, H₂O</Titulo>

      <Definicion termino="Ciclo biogeoquímico">
        Movimiento cíclico de un elemento o compuesto entre los seres vivos
        (BIO), las rocas y suelos (GEO) y la química del agua y aire (QUÍMICO).
        La materia no se crea ni se destruye: se RECICLA.
      </Definicion>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ciclo del Carbono (simplificado)
          </text>
          {/* Atmósfera */}
          <g transform="translate(280, 40)">
            <rect width={160} height={45} fill="#0ea5e9" opacity={0.2} stroke="#0ea5e9" strokeWidth={1.5} rx={6} />
            <text x={80} y={28} textAnchor="middle" fill="#0ea5e9" fontSize={12} fontWeight={700}>CO₂ atmosférico</text>
          </g>
          {/* Plantas */}
          <g transform="translate(80, 130)">
            <rect width={130} height={40} fill="#22c55e" opacity={0.2} stroke="#22c55e" strokeWidth={1.5} rx={6} />
            <text x={65} y={25} textAnchor="middle" fill="#22c55e" fontSize={11} fontWeight={700}>Plantas</text>
          </g>
          {/* Animales */}
          <g transform="translate(290, 130)">
            <rect width={130} height={40} fill="#f59e0b" opacity={0.2} stroke="#f59e0b" strokeWidth={1.5} rx={6} />
            <text x={65} y={25} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>Animales</text>
          </g>
          {/* Combustibles */}
          <g transform="translate(500, 130)">
            <rect width={150} height={40} fill="#374151" opacity={0.5} stroke="#374151" strokeWidth={1.5} rx={6} />
            <text x={75} y={25} textAnchor="middle" fill="#374151" fontSize={11} fontWeight={700}>Combustibles fósiles</text>
          </g>

          {/* flechas */}
          <line x1={300} x2={150} y1={85} y2={130} stroke="#22c55e" strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={200} y={100} fill="#22c55e" fontSize={11} fontWeight={600}>Fotosíntesis</text>

          <line x1={210} x2={290} y1={150} y2={150} stroke="#374151" strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={250} y={143} fill="#374151" fontSize={10}>comer</text>

          <line x1={140} x2={300} y1={130} y2={85} stroke="#ef4444" strokeWidth={2} markerEnd="url(#cArr)" />
          <line x1={355} x2={365} y1={130} y2={85} stroke="#ef4444" strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={420} y={100} fill="#ef4444" fontSize={11} fontWeight={600}>Respiración</text>

          <line x1={575} x2={400} y1={130} y2={85} stroke="#dc2626" strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={500} y={110} fill="#dc2626" fontSize={11} fontWeight={600}>Combustión</text>

          <defs>
            <marker id="cArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Tres ciclos clave">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Ciclo del C:</strong> CO₂ ↔ fotosíntesis ↔ respiración ↔
            combustión.</li>
          <li><strong>Ciclo del N:</strong> N₂ atmosférico (78%) → fijación por
            bacterias del suelo (Rhizobium) → plantas → animales → muerte →
            desnitrificación → N₂.</li>
          <li><strong>Ciclo del agua:</strong> evaporación + transpiración →
            condensación (nubes) → precipitación → escurrimiento → mar.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Fotosíntesis fija; respiración devuelve; combustión libera
        rápido."</strong> Las 3 grandes vías del carbono.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas ambientales actuales</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            6 problemas globales clave
          </text>
          {[
            { t: "Calentamiento global", c: "#ef4444", d: "↑ CO₂, CH₄ por combustibles fósiles" },
            { t: "Cambio climático", c: "#f59e0b", d: "consecuencia: clima extremo, sequías" },
            { t: "Capa de ozono", c: "#a78bfa", d: "CFCs destruyen O₃; mayor UV" },
            { t: "Deforestación", c: "#7c3aed", d: "↓ pulmones del planeta, biodiversidad" },
            { t: "Contaminación", c: "#06b6d4", d: "agua, aire, suelo (plásticos, residuos)" },
            { t: "Pérdida biodiversidad", c: "#ec4899", d: "6ª extinción masiva en curso" },
          ].map((p, i) => (
            <g key={i} transform={`translate(80, ${55 + i * 30})`}>
              <rect width={580} height={24} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1} rx={4} />
              <text x={15} y={16} fill={p.c} fontSize={12} fontWeight={700}>{p.t}:</text>
              <text x={220} y={16} fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
          <text x={360} y={245} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={600}>
            Las 3 R: REDUCIR → REUTILIZAR → RECICLAR
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Efecto invernadero">
        Proceso NATURAL: ciertos gases (CO₂, CH₄, H₂O) atrapan el calor que
        devuelve la Tierra. Mantienen la temperatura habitable.<br /><br />
        PROBLEMA: el aumento por actividad humana lo intensifica → calentamiento
        global.
      </Definicion>

      <Cuidado>
        Bolivia es uno de los países <strong>más vulnerables</strong> al cambio
        climático: glaciares de los Andes que se derriten (Chacaltaya
        desapareció en 2009), sequías en el Chaco, inundaciones en el Beni.
      </Cuidado>
    </EscenaRica>
  );
}

function EscBolivia() {
  return (
    <EscenaRica>
      <Titulo>Medio ambiente y conservación en Bolivia</Titulo>

      <Definicion termino="Áreas protegidas (SERNAP)">
        Bolivia cuenta con 22 áreas protegidas nacionales que cubren el 17%
        del territorio.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Madidi (La Paz, Beni):</strong> uno de los parques más
            biodiversos del mundo.</li>
          <li><strong>Amboró (Santa Cruz):</strong> ecotonos andino-amazónicos.</li>
          <li><strong>TIPNIS (Cochabamba, Beni):</strong> Territorio Indígena y
            Parque Nacional Isiboro-Sécure.</li>
          <li><strong>Eduardo Avaroa (Potosí):</strong> Salar de Uyuni, lagunas
            altiplánicas.</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 ecorregiones de Bolivia
          </text>
          {[
            { x: 90, t: "Amazonía", c: "#16a34a", d: "Pando, Beni, norte La Paz" },
            { x: 240, t: "Chaco", c: "#ca8a04", d: "Tarija, Santa Cruz, Chuquisaca" },
            { x: 390, t: "Andes/Altiplano", c: "#3b82f6", d: "La Paz, Oruro, Potosí" },
            { x: 540, t: "Cerrado", c: "#e11d48", d: "Santa Cruz oriente" },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x}, 50)`}>
              <rect x={-10} y={0} width={140} height={90} fill={e.c} opacity={0.1} stroke={e.c} strokeWidth={1.5} rx={8} />
              <text x={60} y={22} textAnchor="middle" fill={e.c} fontSize={12} fontWeight={700}>{e.t}</text>
              <text x={60} y={56} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{e.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Ley de la Madre Tierra (2010, 2012)">
        Bolivia tiene una legislación pionera que reconoce derechos a la
        naturaleza. La Pachamama no es solo recurso: es sujeto de derecho.
      </Definicion>

      <Mnemotecnia>
        <strong>"Bolivia tiene 4 ecorregiones, 22 áreas protegidas, 14% de la
        biodiversidad mundial."</strong> Información típica del examen.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Calentamiento = cambio climático'">
        <strong>Pensar:</strong> que son sinónimos.<br />
        <strong>Realidad:</strong> calentamiento global es la CAUSA (más T
        promedio); cambio climático es la CONSECUENCIA (clima extremo, sequías,
        más huracanes).
      </Misconception>

      <Misconception titulo="Error 2 · 'La energía se recicla en el ecosistema'">
        <strong>Pensar:</strong> que la energía circula como la materia.<br />
        <strong>Realidad:</strong> la energía FLUYE (sol → productor →
        consumidores → calor), no se recicla. La materia SÍ se recicla.
      </Misconception>

      <Misconception titulo="Error 3 · 'Las plantas son las únicas productoras'">
        <strong>Pensar:</strong> que solo plantas hacen fotosíntesis.<br />
        <strong>Realidad:</strong> algas (Protista) y cianobacterias también.
        De hecho, el mayor productor del planeta son las algas marinas, no la
        Amazonía.
      </Misconception>

      <Misconception titulo="Error 4 · 'Nicho ecológico = hábitat'">
        <strong>Pensar:</strong> que son lo mismo.<br />
        <strong>Realidad:</strong> hábitat = DÓNDE vive (espacio físico). Nicho
        = QUÉ HACE (función, dieta, horario, relaciones).
      </Misconception>

      <Resumen>
        Ecología: relaciones de seres vivos entre sí y con el ambiente. 6
        niveles (individuo → biosfera). Factores bióticos (vivos) + abióticos
        (no vivos). 7 relaciones interespecíficas. Cadenas tróficas con regla
        del 10%. Ciclos C, N, H₂O. Bolivia: megadiverso, 4 ecorregiones,
        22 áreas protegidas.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué nivel de organización agrupa todos los individuos de UNA especie en un lugar?"
        opciones={["Comunidad", "Población", "Ecosistema", "Bioma"]}
        correctaIdx={1}
        explicacion="Población = individuos de la misma especie. Comunidad = varias poblaciones."
      />

      <AutoCheck
        pregunta="¿Qué tipo de relación es la entre garrapata y perro?"
        opciones={["Mutualismo", "Comensalismo", "Parasitismo", "Competencia"]}
        correctaIdx={2}
        explicacion="La garrapata se beneficia (alimentación); el perro se perjudica (enfermedades)."
      />

      <AutoCheck
        pregunta="Si un productor recibe 10.000 kcal del sol, ¿cuántas llegan al consumidor secundario?"
        opciones={["10.000", "1.000", "100", "10"]}
        correctaIdx={2}
        explicacion="Regla del 10%: 10.000 → 1.000 (consumidor I) → 100 (consumidor II)."
      />

      <AutoCheck
        pregunta="¿Qué proceso DEVUELVE el CO₂ a la atmósfera?"
        opciones={["fotosíntesis", "respiración", "fijación de nitrógeno", "transpiración"]}
        correctaIdx={1}
        explicacion="La respiración libera CO₂. La fotosíntesis lo absorbe."
      />

      <AutoCheck
        pregunta="¿Cuál es el bioma boliviano del Beni y Pando?"
        opciones={["Chaco", "Andes", "Amazonía", "Cerrado"]}
        correctaIdx={2}
        explicacion="Beni y Pando están en la Amazonía boliviana, junto con el norte de La Paz."
      />
    </EscenaRica>
  );
}

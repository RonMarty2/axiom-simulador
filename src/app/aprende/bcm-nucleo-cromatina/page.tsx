"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Parrafo,
  Definicion,
  Puente,
  PorQue,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Misconception,
  Mnemotecnia,
  Conexion,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="BCM-09"
      tituloUnidad="El núcleo y la cromatina"
      escenas={[
        { titulo: "Arquitectura del núcleo y envoltura nuclear", componente: EscArquitecturaEnvoltura },
        { titulo: "Poro nuclear y transporte con Ran-GTP", componente: EscPoroYTransporte },
        { titulo: "Nucleosomas, histonas y empaquetamiento", componente: EscEmpaquetamientoADN },
        { titulo: "Eucromatina, heterocromatina y cromosoma", componente: EscCromatinaYCromosoma },
        { titulo: "El nucléolo y la matriz nuclear", componente: EscNucleoloYMatriz },
        { titulo: "Replicación, telomerasa y reparación del ADN", componente: EscReplicacionYReparacion },
        { titulo: "Lo que más se pregunta y práctica final", componente: EscPractica },
      ]}
    />
  );
}

/* ---------------- Escena 1 ---------------- */

function EscArquitecturaEnvoltura() {
  return (
    <EscenaRica>
      <Titulo>Arquitectura del núcleo y la envoltura nuclear</Titulo>

      <Hook>
        ¿Cómo logra una célula humana guardar unos 2 metros de ADN dentro de un
        núcleo de apenas 5 micrómetros de diámetro sin que se forme un nudo
        imposible de desenredar y, al mismo tiempo, abrir la página exacta que
        necesita leer en cada momento?
      </Hook>

      <Puente>
        Imagina una biblioteca central con puertas vigiladas y estanterías bien
        rotuladas. Si metieras un rollo larguísimo de papel suelto en una caja
        minúscula, se rompería y nadie encontraría una frase. La célula resuelve
        ese problema encerrando el ADN tras una doble membrana con accesos
        regulados, sosteniéndolo por dentro con un armazón fibroso y plegándolo
        en niveles ordenados.
      </Puente>

      <Definicion termino="El núcleo eucariota y sus componentes">
        El núcleo contiene la mayor parte del material genético celular y es el
        lugar donde ocurren la <strong>replicación</strong> y la{" "}
        <strong>transcripción</strong> (mientras que la síntesis de proteínas
        sucede en el citoplasma). La presencia de una{" "}
        <strong>envoltura nuclear</strong> que separa el núcleo del citoplasma es
        una de las diferencias fundamentales entre células eucariotas y
        procariotas.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Escala del genoma humano:</strong> el genoma nuclear
            haploide (más de 3.000 millones de nucleótidos, unos 3.200 Mb) mide
            aproximadamente <strong>1 metro</strong> dividido en 23 fragmentos.
            En las células somáticas diploides hay dos copias: unos{" "}
            <strong>2 metros</strong> de ADN en 46 fragmentos dentro de un núcleo
            de unos <strong>5 μm</strong> de diámetro.
          </li>
          <li>
            <strong>Contenido interno:</strong> <strong>cromatina</strong> (ADN
            asociado a proteínas que se condensa en cromosomas durante la
            división), uno o más <strong>nucléolos</strong> (síntesis de ARN
            ribosómico), <strong>nucleoplasma</strong> (matriz líquida) y{" "}
            <strong>matriz nuclear</strong> (red de fibras proteicas que da
            soporte interno).
          </li>
        </ul>
      </Definicion>

      <Parrafo>
        Observa en el corte transversal cómo se organizan las dos membranas de la
        envoltura nuclear, su continuidad con el retículo endoplasmático rugoso
        (RER) y el soporte interno de la lámina nuclear:
      </Parrafo>

      <Pizarra alto={248}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 248"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Corte transversal de la envoltura nuclear: membrana nuclear externa con ribosomas unida al RER, espacio perinuclear, poro nuclear, membrana nuclear interna, lámina nuclear y cromatina periférica"
        >
          <rect x={0} y={0} width={360} height={248} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Capas de la envoltura nuclear
          </text>

          <text x={20} y={40} fill={LIENZO.fgDim} fontSize={13} fontWeight={600}>
            Citoplasma
          </text>
          <text x={312} y={39} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            RER
          </text>

          {/* Espacio perinuclear y luz del RER */}
          <rect x={20} y={64} width={126} height={32} fill={LIENZO.bg} />
          <rect x={202} y={64} width={138} height={32} fill={LIENZO.bg} />
          <rect x={282} y={58} width={58} height={16} rx={5} fill={LIENZO.bg} />

          {/* Membrana nuclear externa (MNE) continua con RER */}
          <path
            d="M 20 64 L 146 64 C 154 64 154 96 146 96 L 20 96"
            fill="none"
            stroke={LIENZO.fg}
            strokeWidth={2}
          />
          <path
            d="M 340 96 L 202 96 C 194 96 194 64 202 64 L 282 64 L 282 58 L 340 58"
            fill="none"
            stroke={LIENZO.fg}
            strokeWidth={2}
          />

          {/* Ribosomas en MNE y RER */}
          {[36, 62, 88, 114, 134, 218, 244, 268, 296, 322].map((rxPos) => (
            <circle
              key={rxPos}
              cx={rxPos}
              cy={rxPos >= 282 ? 53 : 59}
              r={3.2}
              fill={LIENZO.warn}
            />
          ))}

          {/* Complejo del poro nuclear en el centro */}
          <rect
            x={152}
            y={56}
            width={44}
            height={48}
            rx={8}
            fill={LIENZO.accent}
            opacity={0.18}
            stroke={LIENZO.accent}
            strokeWidth={1.8}
          />
          <text x={174} y={85} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Poro
          </text>

          {/* Lámina nuclear bajo la MNI */}
          <rect x={20} y={102} width={124} height={9} rx={3} fill={LIENZO.ok} opacity={0.28} stroke={LIENZO.ok} strokeWidth={1.4} />
          <rect x={204} y={102} width={136} height={9} rx={3} fill={LIENZO.ok} opacity={0.28} stroke={LIENZO.ok} strokeWidth={1.4} />

          {/* Cromatina periférica anclada */}
          <path
            d="M 34 111 Q 48 132 68 111 Q 88 134 108 111 Q 124 128 136 111"
            fill="none"
            stroke={LIENZO.fgDim}
            strokeWidth={1.8}
          />
          <path
            d="M 218 111 Q 238 134 258 111 Q 278 132 298 111 Q 316 128 332 111"
            fill="none"
            stroke={LIENZO.fgDim}
            strokeWidth={1.8}
          />

          <text x={20} y={145} fill={LIENZO.fgDim} fontSize={13} fontWeight={600}>
            Nucleoplasma
          </text>

          {/* Leyenda inferior sin solapamientos */}
          <line x1={16} y1={154} x2={344} y2={154} stroke={LIENZO.fgFaint} strokeWidth={1} />

          <circle cx={24} cy={170} r={4.5} fill={LIENZO.warn} />
          <text x={36} y={175} fill={LIENZO.fg} fontSize={13}>
            MNE con ribosomas (unida al RER)
          </text>

          <rect x={19} y={187} width={10} height={10} rx={2} fill={LIENZO.bg} stroke={LIENZO.fg} strokeWidth={1.4} />
          <text x={36} y={197} fill={LIENZO.fg} fontSize={13}>
            Espacio perinuclear (luz del RER)
          </text>

          <rect x={19} y={209} width={10} height={10} rx={2} fill={LIENZO.ok} opacity={0.4} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={36} y={219} fill={LIENZO.fg} fontSize={13}>
            MNI + lámina nuclear (láminas)
          </text>

          <line x1={18} y1={236} x2={30} y2={236} stroke={LIENZO.fgDim} strokeWidth={2.2} />
          <text x={36} y={241} fill={LIENZO.fgDim} fontSize={13}>
            Cromatina periférica anclada
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Envoltura nuclear y lámina nuclear">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Membrana nuclear externa (MNE):</strong> está recubierta de{" "}
            <strong>ribosomas</strong> y fusionada al{" "}
            <strong>retículo endoplasmático rugoso (RER)</strong>. Por eso el
            interior del RER y el espacio intermembrana (perinuclear) se hallan
            comunicados.
          </li>
          <li>
            <strong>Membrana nuclear interna (MNI):</strong> se une a la{" "}
            <strong>lámina nuclear</strong>, formada por distintos tipos de
            proteínas fibrosas llamadas <strong>láminas</strong> (
            <strong>láminas A, B y C</strong>), muy relacionadas con los
            filamentos intermedios del citoesqueleto. Forman dímeros que se
            ensamblan en filamentos; aportan soporte mecánico, anclan la
            cromatina periférica y son esenciales para la replicación y la
            regulación de la expresión génica.
          </li>
          <li>
            <strong>Desensamblaje y reensamblaje en mitosis:</strong> durante la{" "}
            <strong>prometafase</strong>, las láminas sufren{" "}
            <strong>fosforilación</strong>, se desensamblan y se rompe la
            envoltura nuclear. En la <strong>telofase</strong>, se{" "}
            <strong>desfosforilan</strong>, vuelven a formar filamentos y la
            envoltura nuclear se reconstruye.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Enfermedades por mutaciones en la lámina nuclear (Calvo Cap. 7)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Distrofia muscular de Emery-Dreifuss</strong> (autosómica
            dominante): mutaciones en el gen que codifica las{" "}
            <strong>láminas A y C</strong>. Cursa con alteraciones de músculos
            esqueléticos, contracturas tempranas en cuello, codos y tendones de
            Aquiles, y defectos de conducción cardíaca. Mutaciones en este gen
            también causan ciertas cardiomiopatías idiopáticas familiares y
            lipodistrofias familiares parciales.
          </li>
          <li>
            <strong>Progeria de Hutchinson-Gilford:</strong> enfermedad muy rara
            asociada a mutaciones en heterocigosis surgidas <em>de novo</em> en
            el gen de la <strong>lámina A</strong>. Produce senilidad precoz con
            clínica desde el primer año de vida; el 90 % de los pacientes muere
            por trastornos cardiovasculares graves alrededor de los 13 años.
          </li>
        </ul>
      </Definicion>

      <Conexion>
        Las láminas nucleares pertenecen a la familia de los filamentos
        intermedios estudiada en la lección del citoesqueleto.
      </Conexion>
    </EscenaRica>
  );
}

/* ---------------- Escena 2 ---------------- */

function EscPoroYTransporte() {
  return (
    <EscenaRica>
      <Titulo>El complejo del poro nuclear y el transporte con Ran-GTP</Titulo>

      <Puente>
        En la escena anterior viste que la envoltura nuclear separa el ADN del
        citoplasma como la pared de una biblioteca central. Pero una biblioteca
        sellada no sirve de nada si nadie puede entrar con herramientas ni sacar
        copias: piensa en una aduana con dos carriles, uno libre para paquetes
        diminutos y otro con pase de seguridad para cargas grandes. Ese filtro
        en la célula es el complejo del poro nuclear.
      </Puente>

      <Parrafo>
        El núcleo fabrica ARN que debe salir al citoplasma para la traducción, y
        el citoplasma fabrica proteínas que deben entrar al núcleo para la
        replicación y la transcripción. Una célula tiene alrededor de{" "}
        <strong>2.000 poros nucleares</strong>, pero esa cifra cambia según su
        actividad sintética: abundan en <strong>ovocitos y hepatocitos</strong> y
        son escasos en <strong>linfocitos inactivos y espermatozoides</strong>.
      </Parrafo>

      <Definicion termino="Estructura y selectividad del complejo del poro nuclear (NPC)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Tamaño y simetría:</strong> el <strong>NPC</strong> es uno
            de los mayores complejos proteicos celulares (~<strong>30 veces</strong>{" "}
            un ribosoma). Tiene forma cilíndrica con{" "}
            <strong>simetría octogonal</strong>, unos <strong>145 nm</strong> de
            diámetro y unos <strong>80 nm</strong> de largo a través de la
            membrana.
          </li>
          <li>
            <strong>Nucleoporinas (Nup):</strong> reúne{" "}
            <strong>más de 50 proteínas diferentes</strong>. Aproximadamente la
            mitad posee dominios hélice α y láminas β, y la otra mitad carece de
            estructura secundaria ordenada y contiene{" "}
            <strong>repeticiones Phe-Gly (FG)</strong>.
          </li>
          <li>
            <strong>Difusión pasiva:</strong> iones, moléculas pequeñas (menores
            de <strong>9 nm</strong> de diámetro) y proteínas de masa inferior a{" "}
            <strong>50 kDa</strong> atraviesan el poro libremente en ambas
            direcciones.
          </li>
          <li>
            <strong>Transporte activo selectivo:</strong> proteínas, ARN y
            ribonucleoproteínas mayores de 9 nm o de 50 kDa requieren energía,
            señales específicas y cambios conformacionales del canal central.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Señales NLS y NES, importinas, exportinas y gradiente de Ran">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Señal de localización nuclear (NLS):</strong> etiqueta que
            dirige proteínas al núcleo. La primera se identificó en 1984 en el{" "}
            <strong>antígeno T del virus SV40</strong> (94 kDa): 7 aminoácidos
            básicos (<code>Pro-Lys-Lys-Lys-Arg-Lys-Val</code>, posiciones 126 a
            132; mutar Lys-128 bloquea su entrada). Las más frecuentes son{" "}
            <strong>NLS bipartitas</strong>, como la de la{" "}
            <strong>nucleoplasmina</strong> (<code>Lys-Arg</code>, 10
            aminoácidos espaciadores y <code>Lys-Lys-Lys-Lys</code>).
          </li>
          <li>
            <strong>Señal de exportación nuclear (NES):</strong> secuencia
            específica reconocida por las <strong>exportinas</strong> para sacar
            proteínas del núcleo al citoplasma. Los <strong>ARN</strong> salen
            también mediante transporte activo con Ran formando complejos de{" "}
            <strong>ribonucleoproteína (RNP)</strong>.
          </li>
          <li>
            <strong>Interruptor Ran (GTPasa):</strong>{" "}
            <strong>Ran-GEF</strong> (factor intercambiador de guanina) está en
            el <strong>núcleo</strong> y transforma Ran-GDP en{" "}
            <strong>Ran-GTP</strong> (abundante en el núcleo).{" "}
            <strong>Ran-GAP</strong> (proteína activadora de GTPasa) está en el{" "}
            <strong>citoplasma</strong> e hidroliza GTP a GDP + Pi (abundante{" "}
            <strong>Ran-GDP</strong> en el citoplasma). Ese gradiente determina
            la dirección del transporte.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={300}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 300"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Ciclo de importación y exportación nuclear mediado por el gradiente de Ran-GTP en el núcleo (Ran-GEF) y Ran-GDP en el citoplasma (Ran-GAP)"
        >
          <defs>
            <marker id="arrImpNucleo" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
            <marker id="arrExpCito" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>

          <rect x={0} y={0} width={360} height={300} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Ciclo del gradiente Ran-GTP / Ran-GDP
          </text>

          {/* Zona superior: Citoplasma */}
          <text x={180} y={44} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            CITOPLASMA · Ran-GAP → Ran-GDP
          </text>

          {/* Caja izquierda superior: Importación inicio */}
          <rect x={16} y={56} width={148} height={54} rx={8} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={90} y={78} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Importina + NLS
          </text>
          <text x={90} y={98} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            cruza el poro
          </text>

          {/* Caja derecha superior: Exportación liberación */}
          <rect x={196} y={56} width={148} height={54} rx={8} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={270} y={78} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Ran-GAP hidroliza
          </text>
          <text x={270} y={98} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            y suelta la carga
          </text>

          {/* Envoltura nuclear con dos poros */}
          <line x1={16} y1={140} x2={64} y2={140} stroke={LIENZO.fg} strokeWidth={2.4} />
          <line x1={16} y1={154} x2={64} y2={154} stroke={LIENZO.fg} strokeWidth={2.4} />
          <line x1={116} y1={140} x2={244} y2={140} stroke={LIENZO.fg} strokeWidth={2.4} />
          <line x1={116} y1={154} x2={244} y2={154} stroke={LIENZO.fg} strokeWidth={2.4} />
          <line x1={296} y1={140} x2={344} y2={140} stroke={LIENZO.fg} strokeWidth={2.4} />
          <line x1={296} y1={154} x2={344} y2={154} stroke={LIENZO.fg} strokeWidth={2.4} />
          <rect x={152} y={134} width={56} height={26} rx={6} fill={LIENZO.bgSoft} />
          <text x={180} y={152} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            NPC
          </text>

          {/* Flechas a través de los poros */}
          <line x1={90} y1={114} x2={90} y2={178} stroke={LIENZO.accent} strokeWidth={2.2} markerEnd="url(#arrImpNucleo)" />
          <line x1={270} y1={180} x2={270} y2={116} stroke={LIENZO.ok} strokeWidth={2.2} markerEnd="url(#arrExpCito)" />

          {/* Caja izquierda inferior: Importación liberación */}
          <rect x={16} y={184} width={148} height={70} rx={8} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={90} y={205} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Ran-GTP se une
          </text>
          <text x={90} y={224} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            libera la carga
          </text>
          <text x={90} y={243} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Importina sale
          </text>

          {/* Caja derecha inferior: Exportación inicio */}
          <rect x={196} y={184} width={148} height={70} rx={8} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={270} y={205} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Exportina + NES
          </text>
          <text x={270} y={224} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            + Ran-GTP unidos
          </text>
          <text x={270} y={243} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            salen del núcleo
          </text>

          {/* Zona inferior: Núcleo */}
          <text x={180} y={282} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            NÚCLEO · Ran-GEF → Ran-GTP
          </text>
        </svg>
      </Pizarra>

      <PorQue>
        Fíjate en el efecto opuesto de <strong>Ran-GTP</strong> dentro del
        núcleo: sobre la <strong>importina</strong> provoca la{" "}
        <strong>disociación</strong> para soltar la carga importada (y luego el
        complejo Ran-GTP-importina sale al citoplasma, donde Ran-GAP hidroliza
        GTP y reinicia el ciclo). Sobre la <strong>exportina</strong>, en cambio,
        Ran-GTP <strong>favorece la unión</strong> a la carga con NES para
        sacarla al citoplasma, donde Ran-GAP la libera.
      </PorQue>

      <Definicion termino="Patologías asociadas al complejo del poro nuclear">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cáncer hematológico:</strong> translocaciones somáticas de{" "}
            <strong>NUP98</strong> (cromosoma 11) originan proteínas quiméricas
            con repeticiones FG capaces de reclutar factores de transcripción,
            causando mielodisplasias y leucemia mieloide aguda. Alteraciones en{" "}
            <strong>NUP214</strong> (cromosoma 9) aparecen en mielodisplasias,
            leucemia mieloide aguda y más del 5 % de las leucemias agudas
            linfoblásticas T.
          </li>
          <li>
            <strong>Cirrosis biliar primaria:</strong> enfermedad hepática
            crónica autoinmune (destrucción de conductos biliares intrahepáticos
            y colestasis). Los pacientes generan con frecuencia autoanticuerpos
            frente a <strong>NUP62, NUP180 y gp210</strong>, empleados como
            marcadores diagnósticos.
          </li>
        </ul>
      </Definicion>

      <AutoCheck
        pregunta="Durante la importación nuclear de una proteína con señal NLS, ¿qué ocurre cuando el complejo importina-carga entra al núcleo y encuentra alta concentración de Ran-GTP?"
        opciones={[
          "Ran-GAP nuclear hidroliza el GTP y fija la importina a la lámina nuclear",
          "Ran-GTP refuerza la unión entre la importina y la proteína carga para devolver ambas al citoplasma",
          "Ran-GTP se une a la importina, favorece la disociación del complejo y libera la proteína carga en el núcleo",
          "La proteína atraviesa el poro por difusión pasiva porque toda molécula con NLS mide menos de 9 nm",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · Ubica cada regulador: Ran-GEF actúa en el núcleo (mantiene alto Ran-GTP) y Ran-GAP actúa en el citoplasma (mantiene alto Ran-GDP). Paso 2 · Aplica el efecto de Ran-GTP sobre la importina: en el núcleo, Ran-GTP se une a la importina y promueve la disociación del complejo para liberar la carga. Paso 3 · Después el complejo Ran-GTP-importina sale al citoplasma, donde Ran-GAP hidroliza el GTP y deja libre a la importina."
      />
    </EscenaRica>
  );
}

/* ---------------- Escena 3 ---------------- */

function EscEmpaquetamientoADN() {
  return (
    <EscenaRica>
      <Titulo>Empaquetamiento del ADN: nucleosomas, histonas y condensación</Titulo>

      <Puente>
        Imagina que tienes un cable de dos metros y debes guardarlo en una caja
        del tamaño de una semilla sin que se anude ni se rompa. Si lo enrollas
        ordenadamente en carretes pequeños, luego juntas esos carretes en
        espirales más gruesas y los fijas a un soporte, cabe sin problema y
        puedes desenrollar justo el tramo que necesitas. Así empaqueta la célula
        su ADN formando la cromatina.
      </Puente>

      <Parrafo>
        El ADN nuclear no flota desnudo: se asocia a proteínas histonas y no
        histonas formando la <strong>cromatina</strong>. Durante la interfase la
        cromatina está relativamente dispersa para poder transcribirse y
        replicarse; en la división celular alcanza su condensación máxima
        formando los cromosomas visibles al microscopio óptico.
      </Parrafo>

      <Definicion termino="Histonas y nivel 1 · El nucleosoma (fibra de 11 nm)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Histonas:</strong> proteínas básicas (cargadas
            positivamente) de <strong>102 a 135 aminoácidos</strong>, muy
            conservadas en la evolución. En los espermatozoides son sustituidas
            por <strong>protaminas</strong>, proteínas básicas que permiten una
            compactación todavía mayor.
          </li>
          <li>
            <strong>Octámero central (core):</strong> se ensambla al unirse un
            tetrámero de <strong>2 H3 + 2 H4</strong> con otro tetrámero formado
            por <strong>dos dímeros H2A-H2B</strong> (ocho moléculas en total).
          </li>
          <li>
            <strong>Nucleosoma y fibra de 11 nm:</strong> unas{" "}
            <strong>146 pb</strong> de ADN se enrollan en una{" "}
            <strong>superhélice levógira de 1,75 vueltas</strong> alrededor del
            octámero. Entre dos nucleosomas consecutivos quedan{" "}
            <strong>50 a 70 pb</strong> de ADN espaciador. En conjunto, unos{" "}
            <strong>200 pb</strong> ocupan <strong>11 nm</strong> (aspecto de
            cuentas de collar), reduciendo la longitud del ADN unas{" "}
            <strong>6 veces</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Niveles 2 y 3 · Solenoide de 30 nm, asas de 300 nm y cromátida">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Nivel 2 · Fibra de 30 nm (solenoide):</strong> la fibra de
            11 nm se vuelve a enrollar con unos{" "}
            <strong>6 nucleosomas por vuelta</strong>, logrando un
            empaquetamiento de <strong>40 veces</strong>. La estabiliza la
            quinta histona, la <strong>histona H1</strong> (histona de unión),
            que separa los núcleos de nucleosomas adyacentes y está menos
            conservada evolutivamente.
          </li>
          <li>
            <strong>Nivel 3 · Fibra de 300 nm (asas sobre andamiaje):</strong>{" "}
            la fibra de 30 nm forma asas ancladas por secuencias ricas en A y T
            llamadas <strong>SAR</strong> (<em>scaffold attachment regions</em>)
            a un andamiaje proteico (<em>scaffold</em>) de proteínas no histonas:{" "}
            <strong>Sc1</strong> (idéntica a la{" "}
            <strong>topoisomerasa II</strong>) y <strong>Sc2</strong> (llamadas
            también <strong>condensinas</strong>). El empaquetamiento alcanza
            unas <strong>2.000 veces</strong>.
          </li>
          <li>
            <strong>Condensación mitótica (600 a 700 nm):</strong> durante la
            mitosis, la fibra de 300 nm se condensa de nuevo para formar una
            fibra de <strong>600 a 700 nm</strong> o <strong>cromátida</strong>,
            con un empaquetamiento máximo final de <strong>10.000 veces</strong>{" "}
            (cada cromosoma metafásico duplicado reúne dos cromátidas hermanas).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={320}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 320"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Niveles de empaquetamiento del ADN: doble hélice, nucleosoma de 11 nm (6x), solenoide de 30 nm con H1 (40x), asas de 300 nm sobre andamiaje Sc1 y Sc2 (2000x) y cromátida mitótica de 600 a 700 nm (10000x)"
        >
          <rect x={0} y={0} width={360} height={320} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Niveles de empaquetamiento del ADN
          </text>

          {/* Fila 1: Doble hélice */}
          <path d="M 24 56 Q 38 44 52 56 Q 66 68 80 56 Q 94 44 108 56 Q 120 66 130 56" fill="none" stroke={LIENZO.fg} strokeWidth={1.8} />
          <path d="M 24 56 Q 38 68 52 56 Q 66 44 80 56 Q 94 68 108 56 Q 120 46 130 56" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.5} />
          <text x={144} y={53} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            ADN doble hélice
          </text>
          <text x={144} y={71} fill={LIENZO.fgDim} fontSize={13}>
            2 m en 46 fragmentos
          </text>

          {/* Fila 2: Fibra 11 nm */}
          <line x1={22} y1={112} x2={132} y2={112} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          {[38, 76, 114].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy={112} r={11} fill={LIENZO.accent} opacity={0.22} stroke={LIENZO.accent} strokeWidth={1.6} />
              <circle cx={cx} cy={112} r={5} fill={LIENZO.accent} />
            </g>
          ))}
          <text x={144} y={108} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            11 nm · Nucleosoma
          </text>
          <text x={144} y={126} fill={LIENZO.fgDim} fontSize={13}>
            146 pb (1,75 v.) · 6×
          </text>

          {/* Fila 3: Fibra 30 nm */}
          <rect x={24} y={154} width={106} height={26} rx={12} fill={LIENZO.warn} opacity={0.14} stroke={LIENZO.warn} strokeWidth={1.6} />
          {[38, 54, 70, 86, 102, 118].map((cx, i) => (
            <circle key={cx} cx={cx} cy={i % 2 === 0 ? 163 : 172} r={6} fill={LIENZO.warn} opacity={0.75} />
          ))}
          <text x={144} y={163} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            30 nm · Solenoide
          </text>
          <text x={144} y={181} fill={LIENZO.fgDim} fontSize={13}>
            Histona H1 · 6 nuc · 40×
          </text>

          {/* Fila 4: Asas 300 nm */}
          <line x1={26} y1={236} x2={128} y2={236} stroke={LIENZO.ok} strokeWidth={3.2} />
          {[42, 66, 90, 114].map((cx) => (
            <path
              key={cx}
              d={`M ${cx - 8} 236 C ${cx - 14} 206 ${cx + 14} 206 ${cx + 8} 236`}
              fill="none"
              stroke={LIENZO.ok}
              strokeWidth={1.7}
            />
          ))}
          <text x={144} y={220} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            300 nm · Asas + SAR
          </text>
          <text x={144} y={238} fill={LIENZO.fgDim} fontSize={13}>
            Sc1 (topo II), Sc2 · 2000×
          </text>

          {/* Fila 5: Cromátida 600 a 700 nm */}
          <rect x={54} y={262} width={16} height={46} rx={8} fill={LIENZO.accent} opacity={0.25} stroke={LIENZO.accent} strokeWidth={1.8} />
          <rect x={80} y={262} width={16} height={46} rx={8} fill={LIENZO.accent} opacity={0.25} stroke={LIENZO.accent} strokeWidth={1.8} />
          <circle cx={75} cy={282} r={5.5} fill={LIENZO.fg} />
          <text x={144} y={280} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            600 a 700 nm c/cromátida
          </text>
          <text x={144} y={298} fill={LIENZO.fgDim} fontSize={13}>
            Mitosis · 10 000×
          </text>

          {/* Separadores sutiles */}
          {[84, 141, 196, 252].map((yLine) => (
            <line key={yLine} x1={16} y1={yLine} x2={344} y2={yLine} stroke={LIENZO.fgFaint} strokeWidth={1} />
          ))}
        </svg>
      </Pizarra>

      <Parrafo>
        La unión entre el ADN y los nucleosomas es dinámica: los{" "}
        <strong>complejos remodeladores nucleosómicos</strong> deslizan el
        octámero, lo transfieren o remodelan el nucleosoma para dejar accesible
        el ADN a la transcripción. Cuando pasa la horquilla de replicación, los{" "}
        <strong>tetrámeros H3-H4</strong> antiguos permanecen unidos a cualquiera
        de las dos moléculas hijas mientras los{" "}
        <strong>dímeros H2A-H2B</strong> se liberan y se reparten, lo que permite
        propagar las modificaciones químicas de las histonas a la cromatina nueva.
      </Parrafo>

      <AutoCheck
        pregunta="Respecto a la estructura del nucleosoma y la fibra de 30 nm en Calvo Cap. 7, ¿qué combinación es correcta?"
        opciones={[
          "El octámero reúne 2 H2A, 2 H2B, 2 H3 y 2 H4 rodeados por unas 146 pb (1,75 vueltas), y la histona H1 estabiliza el solenoide de 30 nm",
          "La histona H1 forma parte del octámero central junto con H2A, H2B y H3, mientras H4 actúa como histona de unión",
          "La fibra de 11 nm ya alcanza un empaquetamiento de 40 veces y la fibra de 30 nm solo aparece durante la metafase",
          "Las asas de 300 nm se fijan al andamiaje mediante protaminas y proteínas importinas",
        ]}
        correctaIdx={0}
        explicacion="Paso 1 · Revisa el octámero central: son ocho histonas (tetrámero H3-H4 más dos dímeros H2A-H2B) rodeadas por unas 146 pb en 1,75 vueltas (fibra de 11 nm, reducción de 6 veces). Paso 2 · Ubica la histona H1: queda fuera del octámero y estabiliza el solenoide de 30 nm (unos 6 nucleosomas por vuelta, 40 veces). Paso 3 · Descarta la última: las protaminas sustituyen histonas en espermatozoides, y el andamiaje de 300 nm usa Sc1 (topoisomerasa II) y Sc2 (condensinas) sobre secuencias SAR."
      />
    </EscenaRica>
  );
}

/* ---------------- Escena 4 ---------------- */

function EscCromatinaYCromosoma() {
  return (
    <EscenaRica>
      <Titulo>Eucromatina, heterocromatina, código de histonas y cromosoma</Titulo>

      <Puente>
        Ahora que ya sabes cómo se enrolla el ADN sobre los nucleosomas, piensa
        en un libro de recetas que comparten todas tus células: una neurona y una
        célula del hígado tienen el mismo libro, pero dejan abiertas distintas
        páginas y mantienen cerradas con broche las que no usan. En el núcleo,
        abrir o cerrar esas regiones depende de marcas químicas en las histonas
        y del grado de compactación de la cromatina.
      </Puente>

      <Parrafo>
        Todas las células somáticas de tu cuerpo llevan el mismo genoma, pero una
        neurona y un hepatocito leen páginas distintas. La llave para abrir o
        cerrar cada región del ADN está en las modificaciones químicas de las
        histonas y en el grado de compactación de la cromatina.
      </Parrafo>

      <Definicion termino="El código de histonas y su regulación enzimática">
        Las histonas del octámero poseen colas aminoterminales accesibles donde
        las <strong>lisinas</strong> pueden acetilarse o metilarse y las{" "}
        <strong>serinas</strong> pueden fosforilarse:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Acetilación (HAT, acetiltransferasas de histonas):</strong>{" "}
            disminuye la carga positiva de las lisinas, reduce su afinidad por el
            ADN (cargado negativamente), abre la cromatina y favorece la{" "}
            <strong>activación transcripcional</strong>. Las proteínas con{" "}
            <strong>bromodominios</strong> reconocen histonas acetiladas.
          </li>
          <li>
            <strong>Desacetilación (HDAC, desacetilasas de histonas):</strong>{" "}
            ejerce el efecto contrario, compacta la cromatina y se asocia a{" "}
            <strong>transcripción reprimida</strong>.
          </li>
          <li>
            <strong>Metilación y fosforilación:</strong> la metilación puede
            asociarse tanto a cromatina activa como reprimida según el residuo
            modificado (es reconocida por proteínas con{" "}
            <strong>cromodominios</strong>). La fosforilación de la cola
            aminoterminal de la <strong>histona H3</strong> es máxima en los
            cromosomas mitóticos.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Eucromatina, heterocromatina y corpúsculo de Barr">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Eucromatina:</strong> porción mayoritaria en interfase,
            descondensada, de tinción débil y dispersa en el núcleo; contiene los{" "}
            <strong>genes transcripcionalmente activos</strong>.
          </li>
          <li>
            <strong>Heterocromatina:</strong> permanece muy condensada en
            interfase, se tiñe intensamente (por ejemplo, con colorante de{" "}
            <strong>Feulgen</strong>), suele ubicarse junto a la membrana
            nuclear, <strong>no se transcribe</strong> y se replica más tarde en
            fase S.
          </li>
          <li>
            <strong>Constitutiva vs. facultativa:</strong> la{" "}
            <strong>constitutiva</strong> está siempre condensada en todos los
            tipos celulares (secuencias repetitivas alrededor de centrómeros,
            regiones subteloméricas, brazos cortos de acrocéntricos y zonas no
            expresadas del cromosoma Y). La <strong>facultativa</strong> cambia
            según el tipo celular.
          </li>
          <li>
            <strong>Corpúsculo de Barr (cromatina sexual):</strong> ejemplo
            clásico de heterocromatina facultativa junto a la membrana nuclear en
            células de hembras de mamíferos (XX). Uno de los dos cromosomas X se
            inactiva al azar al inicio del desarrollo embrionario (paterno Xp o
            materno Xm) para compensar la dosis génica (el X tiene más de 1.000
            genes y el Y menos de 100). Depende del locus <strong>XIC</strong> y
            del ARN no codificante <strong>XIST</strong> (un 10 % del X permanece
            activo). Se hereda por clones generando <strong>mosaicos</strong>{" "}
            (como en la retina de portadoras de daltonismo), pero revierte en las
            células germinales (ovocitos). En síndrome de Turner (45,X) no hay
            corpúsculo de Barr; en Klinefelter (47,XXY) se inactiva un X.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={285}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 285"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Comparación entre eucromatina abierta por HAT y heterocromatina compactada por HDAC, junto con las partes del cromosoma metafásico: telómero, brazo p, centrómero, cinetocoro, brazo q y dos cromátidas"
        >
          <rect x={0} y={0} width={360} height={285} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Cromatina activa vs. cromosoma
          </text>

          {/* Divisor vertical */}
          <line x1={164} y1={34} x2={164} y2={272} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Panel izquierdo superior: Eucromatina */}
          <text x={86} y={48} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Eucromatina
          </text>
          <path d="M 20 76 Q 38 62 56 76 Q 74 90 92 76 Q 110 62 128 76 Q 142 86 152 76" fill="none" stroke={LIENZO.ok} strokeWidth={1.8} />
          {[32, 72, 112, 144].map((cx) => (
            <circle key={cx} cx={cx} cy={76} r={7} fill={LIENZO.ok} opacity={0.25} stroke={LIENZO.ok} strokeWidth={1.4} />
          ))}
          <text x={86} y={108} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            HAT (acetila)
          </text>
          <text x={86} y={128} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Laxa · activa
          </text>

          <line x1={20} y1={144} x2={152} y2={144} stroke={LIENZO.fgFaint} strokeWidth={1} />

          {/* Panel izquierdo inferior: Heterocromatina */}
          <text x={86} y={166} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Heterocromatina
          </text>
          {[42, 58, 74, 90, 106, 122].map((cx, idx) => (
            <circle key={cx} cx={cx} cy={idx % 2 === 0 ? 186 : 196} r={7.5} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
          ))}
          <text x={86} y={224} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={600}>
            HDAC (compacta)
          </text>
          <text x={86} y={244} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Densa · inactiva
          </text>
          <text x={86} y={264} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Ej: cuerpo Barr
          </text>

          {/* Panel derecho: Cromosoma metafásico */}
          {/* Cromátida izquierda */}
          <rect x={180} y={54} width={16} height={70} rx={8} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.6} />
          <rect x={180} y={136} width={16} height={114} rx={8} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.6} />
          {/* Cromátida derecha */}
          <rect x={204} y={54} width={16} height={70} rx={8} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.6} />
          <rect x={204} y={136} width={16} height={114} rx={8} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.6} />

          {/* Telómeros en extremos */}
          <rect x={180} y={54} width={16} height={10} rx={5} fill={LIENZO.warn} opacity={0.65} />
          <rect x={204} y={54} width={16} height={10} rx={5} fill={LIENZO.warn} opacity={0.65} />
          <rect x={180} y={240} width={16} height={10} rx={5} fill={LIENZO.warn} opacity={0.65} />
          <rect x={204} y={240} width={16} height={10} rx={5} fill={LIENZO.warn} opacity={0.65} />

          {/* Centrómero y cinetocoros */}
          <circle cx={200} cy={130} r={7} fill={LIENZO.accent} />
          <line x1={176} y1={122} x2={176} y2={138} stroke={LIENZO.ok} strokeWidth={3.2} />
          <line x1={224} y1={122} x2={224} y2={138} stroke={LIENZO.ok} strokeWidth={3.2} />

          {/* Etiquetas derecha */}
          <line x1={222} y1={59} x2={232} y2={59} stroke={LIENZO.warn} strokeWidth={1.2} />
          <text x={236} y={64} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Telómero
          </text>

          <line x1={222} y1={94} x2={232} y2={94} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <text x={236} y={99} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Brazo p
          </text>

          <line x1={226} y1={130} x2={232} y2={130} stroke={LIENZO.accent} strokeWidth={1.2} />
          <text x={236} y={134} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Centrómero
          </text>
          <text x={236} y={152} fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            + cinetocoro
          </text>

          <line x1={222} y1={196} x2={232} y2={196} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <text x={236} y={201} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Brazo q
          </text>

          <text x={236} y={248} fill={LIENZO.fgDim} fontSize={13}>
            2 cromátidas
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Territorios cromosómicos, estructura del cromosoma y cariotipo">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Territorios cromosómicos:</strong> en interfase, cada
            cromosoma ocupa una región nuclear no solapante y bastante estática,
            recorrida por canales que permiten el acceso transcripcional. Los
            cromosomas <strong>ricos en genes</strong> tienden al centro del
            núcleo y los pobres en genes a la periferia. La proximidad entre
            territorios explica translocaciones recurrentes como{" "}
            <strong>t(9;22)</strong> (cromosoma <strong>Philadelphia</strong> en
            leucemia mieloide crónica) y <strong>t(15;17)</strong> (leucemia
            promielocítica aguda).
          </li>
          <li>
            <strong>Partes del cromosoma metafásico:</strong> la especie humana
            tiene <strong>2n = 46</strong> cromosomas (22 pares de autosomas más
            XX homogamético en mujeres o XY heterogamético en varones;{" "}
            <strong>n = 23</strong> en gametos). Tras replicarse, cada cromosoma
            consta de dos <strong>cromátidas hermanas</strong> unidas por{" "}
            <strong>cohesinas</strong> en el <strong>centrómero</strong>{" "}
            (constricción primaria, rico en <strong>ADN satélite alfa</strong> de
            171 pb). A cada lado del centrómero se une el{" "}
            <strong>cinetocoro</strong>, donde se anclan los microtúbulos del
            huso.
          </li>
          <li>
            <strong>Brazos y clasificación:</strong> el brazo corto{" "}
            <strong>p</strong> (<em>petit</em>) se coloca arriba y el brazo largo{" "}
            <strong>q</strong> abajo. Según el centrómero existen cromosomas{" "}
            <strong>metacéntricos</strong>, <strong>submetacéntricos</strong>,{" "}
            <strong>acrocéntricos</strong> (brazo p muy pequeño: 13, 14, 15, 21 y
            22) y <strong>telocéntricos</strong> (no aparecen en humanos con
            genotipo normal). Los extremos son los <strong>telómeros</strong>{" "}
            (secuencia <strong>5&apos;-TTAGGG-3&apos;</strong> repetida entre 3 y
            20 kb), que evitan fusiones y degradación.
          </li>
          <li>
            <strong>Citogenética convencional, cariotipo y bandeo (ISCN):</strong>{" "}
            la <strong>citogenética convencional</strong> analiza el número y la
            estructura de los cromosomas mediante el cariotipo: las células
            cultivadas se estimulan con <strong>fitohemaglutinina</strong> y se
            tratan con <strong>colchicina</strong>, que{" "}
            <strong>despolimeriza (disgrega) las fibras del huso mitótico</strong>{" "}
            para detener las células en metafase. El método más usado es el de{" "}
            <strong>bandas G</strong> (tripsina + Giemsa; las bandas oscuras
            corresponden a cromatina más densa y replicación tardía), además de{" "}
            <strong>Q</strong> (quinacrina, zonas AT), <strong>R</strong>{" "}
            (reverso de G), <strong>C</strong> (heterocromatina constitutiva en
            centrómeros) y <strong>T</strong> (telómeros). Los autosomas se
            agrupan de la <strong>A a la G</strong>. Las alteraciones numéricas
            de uno o más cromosomas se llaman <strong>aneuploidías</strong>: las
            únicas trisomías autosómicas viables son <strong>21 (Down)</strong>,{" "}
            <strong>18 (Edwards)</strong> y <strong>13 (Patau)</strong>; la
            única monosomía viable es <strong>45,X (Turner)</strong>, y en
            varones destaca <strong>47,XXY (Klinefelter)</strong>.
          </li>
        </ul>
      </Definicion>

      <AutoCheck
        pregunta="¿Cuál de las siguientes afirmaciones sobre la regulación de histonas, la heterocromatina y el cromosoma metafásico es correcta?"
        opciones={[
          "Las desacetilasas de histonas (HDAC) abren la cromatina y activan la transcripción",
          "Los varones con cariotipo normal 46,XY presentan un corpúsculo de Barr bien definido junto a la membrana nuclear",
          "Los cromosomas telocéntricos son los más abundantes en el cariotipo humano normal",
          "La acetilación de lisinas por HAT reduce la carga positiva de las histonas, relaja la cromatina y facilita la transcripción",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · Revisa las enzimas de histonas: las HAT acetilan lisinas, neutralizan carga positiva, reducen la afinidad por el ADN negativo y abren la cromatina; las HDAC hacen lo opuesto y reprimen la transcripción. Paso 2 · Comprueba el corpúsculo de Barr: es un cromosoma X inactivado, presente en 46,XX y 47,XXY, pero ausente en 46,XY y 45,X. Paso 3 · Recuerda la morfología humana: no existen cromosomas telocéntricos en el genotipo humano normal."
      />
    </EscenaRica>
  );
}

/* ---------------- Escena 5 ---------------- */

function EscNucleoloYMatriz() {
  return (
    <EscenaRica>
      <Titulo>El nucléolo, la matriz nuclear y los dominios nucleares</Titulo>

      <Puente>
        Ya conoces cómo se organiza el ADN en cromosomas y territorios dentro
        del núcleo. Ahora imagina que dentro de esa biblioteca existe una
        imprenta especializada que trabaja sin descanso fabricando las máquinas
        encargadas de leer los mensajes: ese taller interno sin membrana es el
        nucléolo, sostenido junto al resto de dominios por el armazón de la
        matriz nuclear.
      </Puente>

      <Parrafo>
        Además de la cromatina, el núcleo en interfase posee una subestructura
        interna que mantiene su forma y concentra las fábricas de ARN. El
        <strong> nucléolo</strong> es la región más densa visible al microscopio
        y el lugar donde se sintetiza y procesa el{" "}
        <strong>ARN ribosómico (ARNr)</strong>.
      </Parrafo>

      <Definicion termino="Matriz nuclear y otros cuerpos nucleares">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Matriz nuclear:</strong> red compleja de proteínas y ARN que
            ayuda a sostener la forma del núcleo. Las fibras de cromatina se unen
            a ella mediante secuencias específicas de ADN llamadas{" "}
            <strong>regiones de unión a la matriz (MAR)</strong>.
          </li>
          <li>
            <strong>Cuerpos de Cajal:</strong> dominios donde se sintetizan y
            maduran las ribonucleoproteínas nucleares pequeñas (
            <strong>snRNP</strong>).
          </li>
          <li>
            <strong>Cuerpos PML (en anillo):</strong> localizan la proteína de la
            leucemia promielocítica (<strong>PML</strong>). En la translocación{" "}
            <strong>t(15;17)</strong> se fusionan los genes <strong>PML</strong>{" "}
            y <strong>RARA</strong> (receptor del ácido retinoico) y los cuerpos
            PML dejan de formarse; el tratamiento con{" "}
            <strong>ácido retinoico</strong> restaura su formación normal.
          </li>
          <li>
            <strong>Otros dominios descritos:</strong>{" "}
            <strong>fibrillas de pericromatina</strong> (ARN naciente),{" "}
            <strong>cuerpos de rotura</strong> (poliadenilación y rotura del ARN)
            y <strong>conjuntos granulares de intercromatina</strong> (corte y
            empalme o <em>splicing</em> del ARN).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="El nucléolo: NOR, tres subdominios y ensamblaje de ribosomas">
        El nucléolo carece de membrana, desaparece en <strong>profase</strong> y
        reaparece como cuerpos prenucleolares en <strong>telofase</strong> (ciclo
        del nucléolo). En la célula eucariota se organiza en tres subdominios
        funcionales:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Regiones organizadoras nucleolares (NOR):</strong> los genes
            del ARNr están agrupados en tándem en los brazos cortos de los cinco
            pares de cromosomas acrocéntricos:{" "}
            <strong>13, 14, 15, 21 y 22</strong>.
          </li>
          <li>
            <strong>Centro fibrilar (CF):</strong> aloja las NOR y la{" "}
            <strong>ARN polimerasa I</strong>, encargada de transcribir el
            precursor <strong>pre-ARNr 45S</strong> (que origina los ARNr{" "}
            <strong>18S, 5,8S y 28S</strong>).
          </li>
          <li>
            <strong>Componente fibrilar denso (CFD):</strong> rodea al CF; aquí
            las <strong>snoRNP</strong> modifican y procesan el pre-ARNr 45S.
          </li>
          <li>
            <strong>Componente granular (CG):</strong> región granular donde
            ocurre la maduración final y el ensamblaje de las subunidades
            prerribosómicas.
          </li>
          <li>
            <strong>ARNr 5S (fuera del nucléolo):</strong> se transcribe en el
            nucleoplasma por la <strong>ARN polimerasa III</strong> y luego
            entra al nucléolo para incorporarse a la subunidad mayor.
          </li>
          <li>
            <strong>Subunidades 40S y 60S:</strong> el ARNr <strong>18S</strong>{" "}
            junto con proteínas ribosómicas forma la{" "}
            <strong>subunidad menor 40S</strong>; los ARNr{" "}
            <strong>28S, 5,8S y 5S</strong> junto con proteínas ribosómicas
            forman la <strong>subunidad mayor 60S</strong>. Ambas se exportan
            por separado al citoplasma y se unen al iniciar la traducción.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={310}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 310"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Subdominios del nucléolo: centro fibrilar con NOR y ARN polimerasa I, componente fibrilar denso de maduración, componente granular de ensamblaje con ARNr 5S de ARN polimerasa III, y salida separada de subunidades 40S y 60S"
        >
          <defs>
            <marker id="arrNucSub" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          <rect x={0} y={0} width={360} height={310} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Nucléolo y ensamblaje ribosómico
          </text>

          {/* Círculos concéntricos del nucléolo */}
          <circle cx={106} cy={110} r={70} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.6} />
          <circle cx={106} cy={110} r={46} fill={LIENZO.warn} opacity={0.18} stroke={LIENZO.warn} strokeWidth={1.6} />
          <circle cx={106} cy={110} r={22} fill={LIENZO.ok} opacity={0.26} stroke={LIENZO.ok} strokeWidth={1.6} />

          <text x={106} y={115} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            CF
          </text>
          <text x={106} y={80} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            CFD
          </text>
          <text x={106} y={171} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            CG
          </text>

          {/* Líneas guía hacia la derecha */}
          <line x1={126} y1={102} x2={194} y2={58} stroke={LIENZO.ok} strokeWidth={1.2} />
          <line x1={151} y1={108} x2={194} y2={108} stroke={LIENZO.warn} strokeWidth={1.2} />
          <line x1={168} y1={142} x2={194} y2={158} stroke={LIENZO.accent} strokeWidth={1.2} />

          {/* Etiquetas de los tres subdominios */}
          <text x={200} y={56} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            CF: NOR · Pol I
          </text>
          <text x={200} y={74} fill={LIENZO.fgDim} fontSize={13}>
            Pre-ARNr 45S
          </text>

          <text x={200} y={106} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            CFD: madura
          </text>
          <text x={200} y={124} fill={LIENZO.fgDim} fontSize={13}>
            18S, 5,8S, 28S
          </text>

          <text x={200} y={156} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            CG: ensambla
          </text>
          <text x={200} y={174} fill={LIENZO.fgDim} fontSize={13}>
            + 5S (Pol III)
          </text>

          {/* Flechas hacia las subunidades */}
          <line x1={94} y1={182} x2={90} y2={212} stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#arrNucSub)" />
          <line x1={134} y1={182} x2={252} y2={212} stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#arrNucSub)" />

          {/* Subunidad 40S */}
          <rect x={16} y={218} width={148} height={76} rx={8} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={90} y={240} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Subunidad 40S
          </text>
          <text x={90} y={260} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            ARNr 18S
          </text>
          <text x={90} y={280} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            + proteínas
          </text>

          {/* Subunidad 60S */}
          <rect x={196} y={218} width={148} height={76} rx={8} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={270} y={240} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Subunidad 60S
          </text>
          <text x={270} y={260} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            28S + 5,8S + 5S
          </text>
          <text x={270} y={280} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            + proteínas
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Recuerda los cinco pares de cromosomas acrocéntricos con NOR en dos
        grupos seguidos: <strong>13, 14, 15</strong> y <strong>21, 22</strong>.
        Y para las polimerasas: la <strong>Pol I</strong> transcribe el{" "}
        <strong>45S dentro</strong> del nucléolo; la <strong>Pol III</strong>{" "}
        transcribe el <strong>5S fuera</strong> del nucléolo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

/* ---------------- Escena 6 ---------------- */

function EscReplicacionYReparacion() {
  return (
    <EscenaRica>
      <Titulo>Replicación del ADN, telomerasa y reparación genómica</Titulo>

      <Puente>
        Antes de que una célula se divida en dos, cada hija necesita una copia
        exacta del manual genético completo, igual que al fotocopiar un libro de
        miles de páginas sin perder los márgenes y corrigiendo cualquier error
        que aparezca en el papel. Para lograrlo, el núcleo combina una copia
        semiconservativa muy precisa con varios equipos de reparación del ADN.
      </Puente>

      <Parrafo>
        Durante la <strong>fase S</strong> de la interfase la célula duplica todo
        su ADN y sintetiza nuevas histonas de forma acoplada. La tasa de error es
        extraordinariamente baja (<strong>10⁻⁹ a 10⁻¹¹</strong> mutaciones por
        nucleótido incorporado en cada división humana) gracias a la actividad
        correctora de las polimerasas y a los sistemas de reparación.
      </Parrafo>

      <Definicion termino="Replicación semiconservativa, orígenes y enzimas de la horquilla">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Modelo semiconservativo (Meselson y Stahl, 1958):</strong>{" "}
            cada doble hélice hija conserva una hebra parental y una hebra recién
            sintetizada (se descartaron los modelos conservativo y dispersivo).
          </li>
          <li>
            <strong>Orígenes múltiples y bidireccionales:</strong> en eucariotas
            existen cientos o miles de orígenes de replicación regulados por
            complejos como <strong>ORC</strong> (<em>origin recognition complex</em>)
            para que cada origen se active una sola vez por ciclo. En cada origen
            se forma una <strong>burbuja de replicación</strong> con{" "}
            <strong>dos horquillas</strong> que avanzan en direcciones opuestas.
          </li>
          <li>
            <strong>Apertura y estabilización:</strong> las{" "}
            <strong>helicasas</strong> separan la doble hélice, las{" "}
            <strong>topoisomerasas</strong> relajan la tensión por
            superenrollamiento y las proteínas de unión a ADN monocatenario{" "}
            <strong>SSBP</strong> (como <strong>RPA</strong> en eucariotas)
            estabilizan las hebras abiertas.
          </li>
          <li>
            <strong>Cebador y elongación 5&apos; → 3&apos;:</strong> ninguna ADN
            polimerasa inicia la síntesis <em>de novo</em>; necesita un{" "}
            <strong>cebador (primer) de ARN</strong> fabricado por una{" "}
            <strong>primasa</strong> (en eucariotas es una subunidad de la{" "}
            <strong>ADN polimerasa α</strong>, que sintetiza ~10 nt de ARN más
            20 a 30 nt de ADN iniciador). La elongación ocurre siempre en sentido{" "}
            <strong>5&apos; → 3&apos;</strong> añadiendo dNTP al 3&apos;-OH libre
            con actividad correctora <strong>exonucleasa 3&apos; → 5&apos;</strong>.
            La síntesis principal corresponde a la{" "}
            <strong>ADN polimerasa III</strong> en procariotas y a la{" "}
            <strong>ADN polimerasa δ</strong> en eucariotas.
          </li>
          <li>
            <strong>Hebra líder vs. hebra retrasada:</strong> como las dos
            cadenas molde del ADN son <strong>antiparalelas</strong> (una corre{" "}
            <strong>3&apos; → 5&apos;</strong> y la otra{" "}
            <strong>5&apos; → 3&apos;</strong>) y la polimerasa solo elonga{" "}
            5&apos; → 3&apos;, la molde 3&apos; → 5&apos; se copia de manera{" "}
            <strong>continua</strong> con un solo cebador (
            <strong>hebra conductora o líder</strong>). La molde 5&apos; →
            3&apos; se copia de manera <strong>semidiscontinua</strong> en{" "}
            <strong>fragmentos de Okazaki</strong> (100 a 150 nt en eucariotas;
            1.000 a 2.000 nt en procariotas; <strong>hebra retrasada</strong>).
            Luego se retiran los cebadores, se rellenan los huecos (ADN pol I en
            procariotas; ADN pol δ en eucariotas) y la{" "}
            <strong>ADN ligasa</strong> sella los fragmentos.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={285}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 285"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Horquilla de replicación: topoisomerasa por delante, helicasa en el vértice, proteínas SSB o RPA, hebra líder continua en sentido 5 prima a 3 prima y hebra rezagada semidiscontinua con cebadores de primasa, fragmentos de Okazaki y ADN ligasa"
        >
          <defs>
            <marker id="arrRepOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
            <marker id="arrRepOka" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
          </defs>

          <rect x={0} y={0} width={360} height={285} rx={10} fill={LIENZO.bgSoft} />
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Horquilla de replicación (5&apos; → 3&apos;)
          </text>

          {/* Doble hélice parental aún cerrada (derecha) */}
          <line x1={232} y1={126} x2={342} y2={126} stroke={LIENZO.fg} strokeWidth={2.2} />
          <line x1={232} y1={142} x2={342} y2={142} stroke={LIENZO.fg} strokeWidth={2.2} />
          {[250, 268, 286, 304, 322].map((px) => (
            <line key={px} x1={px} y1={126} x2={px} y2={142} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          ))}

          {/* Topoisomerasa */}
          <rect x={294} y={116} width={22} height={36} rx={6} fill={LIENZO.warn} opacity={0.22} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={342} y={96} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Topoisomerasa
          </text>
          <line x1={305} y1={102} x2={305} y2={116} stroke={LIENZO.warn} strokeWidth={1.2} />

          {/* Hebras molde abiertas */}
          <path d="M 28 72 L 182 72 L 228 126" fill="none" stroke={LIENZO.fg} strokeWidth={2} />
          <path d="M 28 198 L 182 198 L 228 142" fill="none" stroke={LIENZO.fg} strokeWidth={2} />
          <text x={16} y={76} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>3&apos;</text>
          <text x={16} y={202} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>5&apos;</text>

          {/* Helicasa en el vértice */}
          <polygon points="214,134 236,120 236,148" fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={236} y1={140} x2={278} y2={175} stroke={LIENZO.accent} strokeWidth={1.2} />
          <text x={342} y={180} textAnchor="end" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Helicasa
          </text>

          {/* Proteínas SSB / RPA sobre cadena sencilla */}
          {[190, 200, 210].map((sx, idx) => (
            <circle key={sx} cx={sx} cy={189 - idx * 12} r={4.2} fill={LIENZO.warn} />
          ))}
          <line x1={200} y1={181} x2={280} y2={224} stroke={LIENZO.warn} strokeWidth={1.2} />
          <text x={342} y={228} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            SSB / RPA
          </text>

          {/* Hebra líder continua */}
          <rect x={30} y={84} width={14} height={6} rx={2} fill={LIENZO.warn} />
          <line x1={44} y1={87} x2={192} y2={87} stroke={LIENZO.ok} strokeWidth={2.4} markerEnd="url(#arrRepOk)" />
          <text x={16} y={92} fill={LIENZO.ok} fontSize={13} fontWeight={700}>5&apos;</text>
          <text x={110} y={54} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Líder continua (5&apos;→3&apos;)
          </text>

          {/* Hebra rezagada: 2 fragmentos de Okazaki con cebadores */}
          <rect x={168} y={180} width={14} height={6} rx={2} fill={LIENZO.warn} />
          <line x1={168} y1={183} x2={116} y2={183} stroke={LIENZO.accent} strokeWidth={2.4} markerEnd="url(#arrRepOka)" />

          <rect x={96} y={180} width={14} height={6} rx={2} fill={LIENZO.warn} />
          <line x1={96} y1={183} x2={38} y2={183} stroke={LIENZO.accent} strokeWidth={2.4} markerEnd="url(#arrRepOka)" />

          <text x={112} y={224} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Rezagada · Okazaki
          </text>
          <text x={112} y={244} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Ligasa une fragmentos
          </text>

          {/* Pie explicativo */}
          <line x1={16} y1={256} x2={344} y2={256} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <rect x={28} y={266} width={14} height={6} rx={2} fill={LIENZO.warn} />
          <text x={48} y={274} fill={LIENZO.fgDim} fontSize={13}>
            Cebador (primasa) · Polimerasa 5&apos;→3&apos;
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="El problema de los extremos y la telomerasa">
        Al retirar el último cebador de ARN en el extremo 5&apos; de la hebra
        retrasada de un cromosoma lineal, ninguna ADN polimerasa dispone de un
        3&apos;-OH previo para rellenar el hueco, por lo que el cromosoma se
        acortaría en cada división. La <strong>telomerasa</strong> es una{" "}
        <strong>ribonucleoproteína</strong> que lleva un pequeño{" "}
        <strong>ARN molde</strong> propio para añadir las repeticiones
        teloméricas (en humanos, <strong>5&apos;-TTAGGG-3&apos;</strong>). En la
        mayoría de las células somáticas su actividad es muy baja o nula (reloj
        biológico asociado al envejecimiento celular), mientras que en muchas
        células neoplásicas está aumentada, favoreciendo su inmortalización.
      </Definicion>

      <Definicion termino="Mecanismos principales de reparación del ADN (Calvo Cap. 7)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Reversión directa:</strong> enzimas como{" "}
            <strong>MGMT</strong> (O6-alquilguanina alquiltransferasa) o
            fotoliasas (en procariotas y algunos eucariotas) revierten la lesión
            sin cortar la hebra.
          </li>
          <li>
            <strong>Bases desapareadas (MMR, mismatch repair):</strong> corrige
            emparejamientos erróneos (por tautomería, errores de polimerasa,
            deslizamiento o desaminación de citosinas metiladas a timina).
            Reconoce el bucle en la hebra recién sintetizada (en{" "}
            <em>E. coli</em> la cadena vieja está metilada y la nueva aún no),
            corta el tramo y lo rellena usando la cadena vieja como molde.
          </li>
          <li>
            <strong>Escisión de bases (BER):</strong> corrige bases dañadas por
            agentes químicos o hidrólisis espontánea (~10.000 purinas perdidas al
            día). Una <strong>ADN-glucosilasa</strong> retira la base creando un{" "}
            <strong>sitio AP</strong>, una <strong>AP endonucleasa</strong>{" "}
            elimina el azúcar dañado, una ADN polimerasa (pol I en procariotas;{" "}
            <strong>pol β</strong> en eucariotas) rellena el hueco y la{" "}
            <strong>ADN ligasa</strong> sella el enlace.
          </li>
          <li>
            <strong>Escisión de nucleótidos (NER):</strong> repara daños más
            generales que distorsionan la doble hélice, como los{" "}
            <strong>dímeros de pirimidina</strong> por luz UV. Un complejo
            enzimático detecta la distorsión estructural, separa las dos cadenas
            de la región dañada y corta el esqueleto azúcar-fosfato de la cadena
            dañada a ambos lados de la lesión; luego rellena la ADN polimerasa y
            sella la ADN ligasa. Sus mutaciones causan{" "}
            <strong>xeroderma pigmentosum</strong> (fotosensibilidad,
            inestabilidad cromosómica y mayor riesgo de cáncer de piel) y{" "}
            <strong>síndrome de Cockayne</strong>.
          </li>
          <li>
            <strong>Roturas bicatenarias (DSB):</strong> causadas por radiaciones
            ionizantes, replicación, meiosis o reorganización V(D)J de
            inmunoglobulinas. Se reparan por{" "}
            <strong>recombinación homóloga (HR)</strong> (usa una doble cadena
            homóloga intacta como molde mediante estructuras de{" "}
            <strong>Holliday</strong>) o por{" "}
            <strong>fusión no homóloga de extremos (NHEJ)</strong> (une extremos
            sin molde; esencial en la reorganización V(D)J de linfocitos; sus
            mutaciones causan{" "}
            <strong>inmunodeficiencia combinada severa, SCID</strong> o síndrome
            del niño burbuja).
          </li>
        </ul>
      </Definicion>

      <AutoCheck
        pregunta="Un paciente presenta fotosensibilidad extrema y alto riesgo de cáncer de piel por incapacidad de reparar dímeros de pirimidina inducidos por luz ultravioleta (xeroderma pigmentosum). ¿Qué vía de reparación del ADN está afectada y cómo actúa normalmente?"
        opciones={[
          "BER (escisión de bases): retira una sola base mediante ADN-glucosilasa y AP endonucleasa",
          "NER (escisión de nucleótidos): detecta la distorsión de la doble hélice, separa las cadenas, corta el esqueleto azúcar-fosfato a ambos lados de la lesión, rellena con ADN polimerasa y sella con ADN ligasa",
          "NHEJ (fusión no homóloga de extremos): une roturas bicatenarias sin molde y su fallo causa síndrome del niño burbuja",
          "MMR (bases desapareadas): reconoce los bucles de la hebra recién sintetizada tras la replicación, corta el tramo alterado y lo rellena usando la cadena vieja como molde",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Identifica la lesión: los dímeros de pirimidina causados por luz UV deforman la estructura de la doble hélice. Paso 2 · Empareja lesión y vía: la reparación por escisión de nucleótidos (NER) detecta estas distorsiones estructurales, separa las dos cadenas de la región dañada, corta el esqueleto azúcar-fosfato a ambos lados de la lesión, rellena el hueco con ADN polimerasa y sella el enlace con ADN ligasa. Paso 3 · Confirma la clínica: mutaciones en NER se asocian a xeroderma pigmentosum y síndrome de Cockayne, mientras que fallos en NHEJ originan SCID."
      />
    </EscenaRica>
  );
}

/* ---------------- Escena 7 ---------------- */

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y práctica final</Titulo>

      <Puente>
        Ya recorriste el camino completo: desde las puertas de la envoltura
        nuclear y el empaquetamiento en nucleosomas hasta el nucléolo, el
        cariotipo, la replicación y la reparación del ADN. Antes de poner a
        prueba lo aprendido, repasa las trampas clásicas de examen para que
        ningún detalle te haga dudar.
      </Puente>

      <Misconception titulo="Error 1 · 'La histona H1 forma parte del octámero del nucleosoma'">
        <strong>Realidad:</strong> el octámero central reúne solo ocho moléculas:
        un tetrámero <strong>H3-H4</strong> más dos dímeros{" "}
        <strong>H2A-H2B</strong>, rodeados por unas 146 pb en 1,75 vueltas (fibra
        de 11 nm). La <strong>histona H1</strong> es la quinta histona (de
        unión), queda por fuera del octámero y estabiliza el solenoide de{" "}
        <strong>30 nm</strong>.
      </Misconception>

      <Misconception titulo="Error 2 · 'Ran-GTP mantiene unida la importina a su carga dentro del núcleo'">
        <strong>Realidad:</strong> ocurre exactamente lo contrario. Dentro del
        núcleo (donde <strong>Ran-GEF</strong> mantiene alto Ran-GTP), la unión
        de <strong>Ran-GTP disocia</strong> a la importina para liberar la carga
        importada, mientras que <strong>favorece la unión</strong> de la
        exportina con su carga portadora de NES para sacarla al citoplasma.
      </Misconception>

      <Misconception titulo="Error 3 · 'Todos los ARNr se transcriben en el nucléolo por la ARN polimerasa I'">
        <strong>Realidad:</strong> en el centro fibrilar del nucléolo la{" "}
        <strong>ARN polimerasa I</strong> transcribe el pre-ARNr{" "}
        <strong>45S</strong> (origen de 18S, 5,8S y 28S) a partir de las NOR de
        los cromosomas acrocéntricos 13, 14, 15, 21 y 22. El{" "}
        <strong>ARNr 5S</strong> es la gran excepción: se transcribe{" "}
        <strong>fuera del nucléolo</strong> por la{" "}
        <strong>ARN polimerasa III</strong> y luego entra al nucléolo para
        unirse a la subunidad 60S.
      </Misconception>

      <Cuidado>
        No mezcles las vías de reparación ni sus cuadros clínicos: <strong>BER</strong>{" "}
        repara bases alteradas o sitios AP (ADN-glucosilasa, AP endonucleasa y{" "}
        <strong>ADN pol β</strong> en eucariotas); <strong>NER</strong> repara
        distorsiones como dímeros de pirimidina y su fallo causa{" "}
        <strong>xeroderma pigmentosum</strong> y <strong>síndrome de Cockayne</strong>;
        y en roturas bicatenarias, <strong>HR</strong> usa molde homólogo
        mientras <strong>NHEJ</strong> une extremos sin molde y su fallo provoca{" "}
        <strong>SCID</strong> (síndrome del niño burbuja).
      </Cuidado>

      <Mnemotecnia>
        Tres reglas cortas para repasar antes del examen:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Niveles de cromatina:</strong> 11 nm (6×) · 30 nm (40×) ·
            300 nm (2.000×) · 600 a 700 nm (10.000×).
          </li>
          <li>
            <strong>Gradiente Ran:</strong> <strong>GEF</strong> en el{" "}
            <strong>G</strong>enoma (núcleo, genera Ran-GTP);{" "}
            <strong>GAP</strong> afuera en el cito<strong>P</strong>lasma
            (hidroliza a Ran-GDP).
          </li>
          <li>
            <strong>NOR acrocéntricos:</strong> <strong>13, 14, 15</strong> y{" "}
            <strong>21, 22</strong>.
          </li>
        </ul>
      </Mnemotecnia>

      <Resumen>
        <strong>Síntesis clave de la unidad:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14.5 }}>
          <li>
            <strong>Envoltura y lámina:</strong> MNE con ribosomas unida al RER;
            MNI unida a la lámina nuclear (láminas fibrosas). Fosforilación en
            prometafase rompe la envoltura; desfosforilación en telofase la
            reconstruye. Lámina A/C: Emery-Dreifuss; lámina A: progeria de
            Hutchinson-Gilford.
          </li>
          <li>
            <strong>NPC y Ran:</strong> simetría octogonal (~145 × 80 nm), más de
            50 nucleoporinas (repeticiones FG). Pasivo &lt; 9 nm o &lt; 50 kDa;
            activo con NLS/NES, importinas/exportinas y gradiente Ran-GTP
            (núcleo, Ran-GEF) / Ran-GDP (citoplasma, Ran-GAP).
          </li>
          <li>
            <strong>Cromatina y cromosoma:</strong> nucleosoma (146 pb, 1,75
            vueltas, 11 nm), solenoide con H1 (30 nm), asas SAR sobre Sc1/Sc2
            (300 nm), cromátida (600 a 700 nm). HAT acetila (activa); HDAC
            compacta (reprime). Corpúsculo de Barr (XIC/XIST). Humano 2n = 46;
            centrómero con ADN satélite alfa (171 pb); telómeros 5&apos;-TTAGGG-3&apos;.
          </li>
          <li>
            <strong>Nucléolo y matriz:</strong> matriz nuclear ancla cromatina por
            MAR. Nucléolo sin membrana (CF, CFD, CG); Pol I → 45S (18S, 5,8S,
            28S); Pol III → 5S fuera del nucléolo. Subunidades 40S y 60S salen
            por separado.
          </li>
          <li>
            <strong>Replicación y reparación:</strong> semiconservativa,
            bidireccional, 5&apos; → 3&apos;; líder continua y rezagada en
            fragmentos de Okazaki; telomerasa (ribonucleoproteína con ARN molde);
            reparación por reversión directa, MMR, BER, NER, HR y NHEJ.
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="Respecto a la envoltura nuclear y la lámina nuclear, ¿qué afirmación coincide con Calvo Cap. 7?"
        opciones={[
          "La membrana nuclear externa tiene ribosomas y se continúa con el RER, mientras la lámina nuclear se fosforila en prometafase provocando su desensamblaje",
          "La membrana nuclear interna está cubierta de ribosomas y se fosforila en telofase para reconstruir la envoltura",
          "La progeria de Hutchinson-Gilford se debe a mutaciones en la histona H1 que impiden formar el solenoide de 30 nm",
          "La lámina nuclear está formada por cadenas de nucleoporinas con repeticiones FG",
        ]}
        correctaIdx={0}
        explicacion="Paso 1 · Distingue las dos membranas: la externa lleva ribosomas y se fusiona con el RER (comparten lumen con el espacio perinuclear), mientras la interna se une a la lámina nuclear. Paso 2 · Revisa el ciclo mitótico: las láminas se fosforilan en prometafase (se desensamblan) y se desfosforilan en telofase (se reensamblan). Paso 3 · Confirma la clínica: la progeria de Hutchinson-Gilford se asocia a mutaciones de novo en el gen de la lámina A."
      />

      <AutoCheck
        pregunta="Sobre la arquitectura del complejo del poro nuclear (NPC) y sus alteraciones clínicas, ¿qué enunciado es correcto?"
        opciones={[
          "Permite la difusión pasiva libre de cualquier proteína de hasta 200 kDa sin gasto energético",
          "El número de poros nucleares es idéntico en linfocitos inactivos y en ovocitos porque no cambia con la actividad celular",
          "Presenta simetría octogonal (~145 nm de diámetro), contiene más de 50 nucleoporinas y los autoanticuerpos frente a NUP62, NUP180 y gp210 son marcadores de cirrosis biliar primaria",
          "Las moléculas de ARN salen del núcleo como cadenas desnudas sin proteínas ni participación de Ran",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · Comprueba dimensiones y umbral pasivo: el NPC tiene simetría octogonal (~145 × 80 nm), más de 50 nucleoporinas y solo permite difusión pasiva por debajo de 9 nm o 50 kDa. Paso 2 · Revisa la fisiología: el número de poros aumenta en células muy activas (ovocitos, hepatocitos) y los ARN salen formando complejos RNP con participación de Ran. Paso 3 · Verifica los marcadores clínicos: NUP62, NUP180 y gp210 generan autoanticuerpos diagnósticos en la cirrosis biliar primaria."
      />

      <AutoCheck
        pregunta="Al comparar la organización del nucléolo y los cuerpos nucleares, ¿qué relación es verdadera?"
        opciones={[
          "El ARNr 5S se transcribe en el centro fibrilar del nucléolo por la ARN polimerasa I a partir de los cromosomas 13 a 15",
          "Las NOR se ubican en los brazos cortos de los cromosomas acrocéntricos 13, 14, 15, 21 y 22, y la subunidad 60S ensambla ARNr 28S, 5,8S y 5S con proteínas ribosómicas",
          "Los cuerpos de Cajal son exclusivos de la replicación del ADN satélite alfa del centrómero",
          "Las subunidades ribosómicas 40S y 60S se ensamblan juntas en el nucléolo formando el ribosoma completo antes de cruzar el poro nuclear",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Ubica las NOR y cada polimerasa: los genes de pre-ARNr 45S (18S, 5,8S y 28S) están en los brazos cortos de los acrocéntricos 13, 14, 15, 21 y 22 y los transcribe la ARN pol I en el centro fibrilar; el ARNr 5S se transcribe fuera del nucléolo por la ARN pol III. Paso 2 · Comprueba el ensamblaje: la subunidad 40S reúne ARNr 18S con proteínas ribosómicas y la 60S reúne 28S, 5,8S y 5S con proteínas ribosómicas, y ambas se exportan por separado. Paso 3 · Recuerda que los cuerpos de Cajal participan en la síntesis de snRNP."
      />

      <AutoCheck
        pregunta="Durante la citogenética convencional y el análisis del cariotipo, ¿qué técnica y qué hallazgo se emparejan correctamente?"
        opciones={[
          "La fitohemaglutinina despolimeriza el huso mitótico para detener las células en telofase",
          "Las bandas C tiñen exclusivamente la eucromatina más activa y rica en genes",
          "En humanos normales existen cuatro monosomías autosómicas viables",
          "La colchicina detiene la mitosis en metafase, las bandas C marcan heterocromatina constitutiva (centrómeros) y la única monosomía viable en humanos es 45,X (síndrome de Turner)",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · Separa la función de cada reactivo: la fitohemaglutinina estimula la entrada en división y la colchicina disgrega el huso para acumular las células en metafase. Paso 2 · Revisa el bandeo: las bandas C marcan heterocromatina constitutiva (sobre todo centrómeros). Paso 3 · Comprueba la viabilidad de aneuploidías: solo sobreviven tres trisomías autosómicas (13, 18 y 21) y una única monosomía (45,X, síndrome de Turner)."
      />

      <AutoCheck
        pregunta="En la horquilla de replicación eucariota, ¿por qué la hebra retrasada se sintetiza de forma semidiscontinua en fragmentos de Okazaki?"
        opciones={[
          "Porque la helicasa solo puede abrir una de las dos hebras del ADN cada vez",
          "Porque la ADN polimerasa delta carece de actividad exonucleasa correctora 3' → 5'",
          "Porque las dos hebras molde son antiparalelas y toda ADN polimerasa solo elonga en sentido 5' → 3' a partir de un cebador de ARN",
          "Porque en eucariotas existe un único origen de replicación circular igual que en bacterias",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · Recuerda la regla de toda ADN polimerasa: solo añade desoxinucleótidos al extremo 3'-OH libre (elongación 5' → 3') y requiere un cebador de ARN sintetizado por la primasa. Paso 2 · Aplica la antiparalelidad: la molde 3' → 5' se copia de forma continua (hebra líder), pero la molde 5' → 3' obliga a iniciar múltiples cebadores y copiar en fragmentos de Okazaki (100 a 150 nt en eucariotas). Paso 3 · Luego se retiran los cebadores, se rellenan los huecos y la ADN ligasa sella los fragmentos."
      />

      <AutoCheck
        pregunta="¿Qué afirmación integra correctamente la función de la telomerasa y la reparación de roturas bicatenarias (DSB)?"
        opciones={[
          "La telomerasa es una ADN ligasa sin ARN que actúa en todas las células somáticas con máxima actividad",
          "La telomerasa es una ribonucleoproteína con ARN molde que mantiene las repeticiones 5'-TTAGGG-3', y las roturas bicatenarias se reparan por recombinación homóloga (HR) o fusión no homóloga de extremos (NHEJ)",
          "La fusión no homóloga de extremos (NHEJ) exige una cromátida homóloga intacta y su mutación origina xeroderma pigmentosum",
          "La vía BER repara las roturas bicatenarias uniendo directamente los extremos libres sin molde, y su mutación es la causa principal de la inmunodeficiencia combinada severa (SCID)",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Verifica la telomerasa: es una ribonucleoproteína cuyo pequeño ARN sirve de guía y molde para añadir repeticiones 5'-TTAGGG-3' en los extremos cromosómicos; en la mayoría de las células somáticas su actividad es muy baja o nula. Paso 2 · Verifica las roturas bicatenarias (DSB): se reparan por recombinación homóloga (HR, con molde homólogo y estructuras de Holliday) o por fusión no homóloga de extremos (NHEJ, sin molde; esencial en la reorganización V(D)J y mutada en la inmunodeficiencia combinada severa SCID)."
      />
    </EscenaRica>
  );
}

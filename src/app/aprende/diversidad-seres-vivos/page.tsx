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
      unidad="BIO-06"
      tituloUnidad="Diversidad de seres vivos · Taxonomía y reinos"
      escenas={[
        { titulo: "Biodiversidad · panorama", componente: EscIntro },
        { titulo: "Taxonomía · clasificación jerárquica", componente: EscTaxonomia },
        { titulo: "Nomenclatura binomial · Linneo", componente: EscBinomial },
        { titulo: "Los 5 reinos clásicos", componente: EscReinos },
        { titulo: "Monera · bacterias", componente: EscMonera },
        { titulo: "Protista · protozoos y algas", componente: EscProtista },
        { titulo: "Fungi · hongos", componente: EscFungi },
        { titulo: "Plantae · plantas", componente: EscPlantae },
        { titulo: "Animalia · vertebrados e invertebrados", componente: EscAnimalia },
        { titulo: "Biodiversidad en Bolivia", componente: EscBolivia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Biodiversidad · la increíble variedad de la vida</Titulo>

      <Hook>
        Se han descrito ~1.8 millones de especies, pero se estima que existen
        entre 8 y 30 millones. Bolivia tiene 14% de toda la biodiversidad del
        planeta — está entre los 10 países más megadiversos del mundo.
      </Hook>

      <Definicion termino="Biodiversidad">
        Variedad de seres vivos que habitan la Tierra. Se mide a tres niveles:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li><strong>Genética:</strong> variedad de genes dentro de cada especie.</li>
          <li><strong>De especies:</strong> número de especies distintas en un lugar.</li>
          <li><strong>De ecosistemas:</strong> variedad de hábitats y comunidades.</li>
        </ul>
      </Definicion>

      <Definicion termino="Especie">
        Conjunto de individuos que pueden reproducirse entre sí y dar
        descendencia FÉRTIL. Es la unidad básica de la clasificación.
      </Definicion>

      <Mnemotecnia>
        <strong>"Caballo × Burra = Mula (estéril) → distinta especie."</strong>
        Si la cría es estéril, los padres son especies diferentes.
      </Mnemotecnia>

      <Conexion>
        La biodiversidad es producto de la EVOLUCIÓN por selección natural
        (Darwin) y la herencia genética (Mendel — Unidad 4).
      </Conexion>
    </EscenaRica>
  );
}

function EscTaxonomia() {
  return (
    <EscenaRica>
      <Titulo>Taxonomía · ordenar la vida</Titulo>

      <Definicion termino="Taxonomía">
        Ciencia que clasifica y nombra a los seres vivos. La jerarquía clásica
        tiene 8 niveles, del más amplio al más específico.
      </Definicion>

      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 720 310" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Categorías taxonómicas (ejemplo: humano)
          </text>
          {[
            { t: "Dominio", ej: "Eukarya", c: "#3b82f6" },
            { t: "Reino", ej: "Animalia", c: "#06b6d4" },
            { t: "Filo", ej: "Chordata (con notocorda)", c: "#10b981" },
            { t: "Clase", ej: "Mammalia (mama, pelo)", c: "#84cc16" },
            { t: "Orden", ej: "Primates", c: "#eab308" },
            { t: "Familia", ej: "Hominidae", c: "#f59e0b" },
            { t: "Género", ej: "Homo", c: "#f97316" },
            { t: "Especie", ej: "sapiens", c: "#ef4444" },
          ].map((n, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 30})`}>
              <rect x={0} y={0} width={580 - i * 25} height={24} fill={n.c} opacity={0.2} stroke={n.c} strokeWidth={1.5} rx={4} />
              <text x={10} y={16} fill={n.c} fontSize={12} fontWeight={700}>{n.t}</text>
              <text x={140} y={16} fill={LIENZO.fg} fontSize={11} fontStyle="italic">{n.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Don Real, Filomena Crea Otra Familia Generosa Especial"</strong>
        — Dominio, Reino, Filo, Clase, Orden, Familia, Género, Especie. O en
        inglés "Did King Phillip Come Over For Good Soup".
      </Mnemotecnia>

      <Cuidado>
        A mayor jerarquía (Dominio), más diferencias entre los integrantes.
        A menor (Especie), más parecidos. Dos especies del mismo género
        comparten más rasgos que dos de distinto reino.
      </Cuidado>
    </EscenaRica>
  );
}

function EscBinomial() {
  return (
    <EscenaRica>
      <Titulo>Nomenclatura binomial · el invento de Linneo</Titulo>

      <Definicion termino="Nomenclatura binomial (Linneo, 1735)">
        Cada especie tiene un nombre científico formado por DOS palabras en
        latín:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Género</strong> (mayúscula inicial)</li>
          <li><strong>Especie</strong> (todo minúscula)</li>
        </ul>
        Ambas SIEMPRE en cursiva o subrayadas.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ejemplos de nomenclatura binomial
          </text>
          {[
            { c: "Humano", n: "Homo sapiens" },
            { c: "Perro doméstico", n: "Canis lupus familiaris" },
            { c: "Llama (Bolivia)", n: "Lama glama" },
            { c: "Quinua (Bolivia)", n: "Chenopodium quinoa" },
            { c: "Cóndor andino", n: "Vultur gryphus" },
            { c: "Bacteria E. coli", n: "Escherichia coli" },
          ].map((e, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 25})`}>
              <text fill={LIENZO.fgDim} fontSize={12}>{e.c}:</text>
              <text x={220} fill={LIENZO.accent} fontSize={13} fontStyle="italic" fontWeight={600}>{e.n}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Género Mayúscula, especie minúscula, ambos cursiva."</strong>
        Forma correcta: <em>Homo sapiens</em>, no Homo Sapiens ni homo sapiens.
      </Mnemotecnia>

      <Cuidado>
        Una vez introducido el nombre completo, se puede abreviar el género:
        <em> Homo sapiens</em> → <em>H. sapiens</em>. Pero la primera vez SIEMPRE
        completo.
      </Cuidado>
    </EscenaRica>
  );
}

function EscReinos() {
  return (
    <EscenaRica>
      <Titulo>Los 5 reinos clásicos (Whittaker, 1969)</Titulo>

      <Pizarra alto={270}>
        <svg width="100%" height="100%" viewBox="0 0 720 270" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Comparación de los 5 reinos
          </text>
          {["Reino", "Tipo célula", "Nutrición", "N° células", "Ejemplo"].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 132} y={40} width={130} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={30 + i * 132 + 65} y={59} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            ["Monera", "Procariota", "Variada", "Unicelular", "Bacterias"],
            ["Protista", "Eucariota", "Variada", "Uni o pluri", "Amebas, algas"],
            ["Fungi", "Eucariota", "Heterótrofa (absorción)", "Pluricelular*", "Hongos, levaduras"],
            ["Plantae", "Eucariota", "Autótrofa (foto)", "Pluricelular", "Plantas"],
            ["Animalia", "Eucariota", "Heterótrofa (ingestión)", "Pluricelular", "Animales"],
          ].map((row, i) => (
            <g key={i}>
              {row.map((v, j) => (
                <g key={j}>
                  <rect x={30 + j * 132} y={68 + i * 35} width={130} height={35} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={30 + j * 132 + 65} y={90 + i * 35} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
          <text x={360} y={255} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">
            *Levaduras son unicelulares pero también Fungi.
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Tipos de nutrición">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Autótrofo:</strong> fabrica su comida (fotosíntesis o quimiosíntesis).</li>
          <li><strong>Heterótrofo:</strong> consume otros organismos.</li>
          <li><strong>Por ingestión:</strong> traga partículas (animales).</li>
          <li><strong>Por absorción:</strong> digiere fuera y absorbe (hongos).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Monera procariota; los demás eucariotas. Plantas autótrofas;
        animales y hongos heterótrofos."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMonera() {
  return (
    <EscenaRica>
      <Titulo>Reino Monera · bacterias y arqueas</Titulo>

      <Definicion termino="Monera">
        Únicos seres procariotas. Sin núcleo, sin organelos membranosos. ADN
        circular libre en citoplasma. SIEMPRE unicelulares.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Forma de las bacterias
          </text>
          {[
            { x: 100, t: "Cocos", d: "esféricas", ej: "Streptococcus" },
            { x: 290, t: "Bacilos", d: "bastones", ej: "E. coli, Bacillus" },
            { x: 480, t: "Espirilos", d: "espiral", ej: "Treponema (sífilis)" },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x}, 55)`}>
              <rect x={-10} y={0} width={160} height={85} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={70} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{b.t}</text>
              <text x={70} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{b.d}</text>
              <text x={70} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{b.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Importancia">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Beneficiosas:</strong> flora intestinal (Lactobacillus),
            fermentación de yogur, descomposición, fijación de nitrógeno (Rhizobium).</li>
          <li><strong>Patógenas:</strong> tuberculosis, neumonía, salmonelosis,
            sífilis, cólera, tétanos.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscProtista() {
  return (
    <EscenaRica>
      <Titulo>Reino Protista · "los otros"</Titulo>

      <Definicion termino="Protistas">
        Eucariotas que no son ni planta, ni animal, ni hongo. Muy
        heterogéneos. La mayoría son unicelulares, algunos pluricelulares
        simples.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Subgrupos de protistas
          </text>
          {[
            { x: 90, t: "Protozoos", d: "heterótrofos (animal-like)", ej: "ameba, paramecio" },
            { x: 290, t: "Algas", d: "autótrofas (plant-like)", ej: "diatomeas, algas verdes" },
            { x: 490, t: "Mohos mucilaginosos", d: "fungi-like", ej: "Physarum" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={170} height={90} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={75} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={75} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{p.d}</text>
              <text x={75} y={72} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Plasmodium</strong> (que causa la MALARIA) es un protozoario.
        En Bolivia, Beni y Pando son zonas malarígenas. Otros patógenos
        protistas: <em>Trypanosoma cruzi</em> (mal de Chagas, frecuente en
        zonas chaqueñas).
      </Cuidado>
    </EscenaRica>
  );
}

function EscFungi() {
  return (
    <EscenaRica>
      <Titulo>Reino Fungi · hongos</Titulo>

      <Definicion termino="Hongos (Fungi)">
        Eucariotas heterótrofos por ABSORCIÓN. Pared celular de QUITINA (no
        celulosa). Cuerpo formado por hifas que forman el micelio.
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de hongos
          </text>
          {[
            { x: 90, t: "Levaduras", d: "unicelulares (fermentación)", ej: "Saccharomyces (pan, cerveza)" },
            { x: 290, t: "Mohos", d: "pluricelulares (hifas)", ej: "Penicillium (penicilina)" },
            { x: 490, t: "Setas", d: "cuerpos fructíferos", ej: "champiñones, amanitas" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={170} height={100} fill={LIENZO.warn} opacity={0.08} stroke={LIENZO.warn} strokeWidth={1.5} rx={8} />
              <text x={75} y={22} textAnchor="middle" fill={LIENZO.warn} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={75} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{p.d}</text>
              <text x={75} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Papel ecológico">
        Junto con las bacterias, son los principales DESCOMPONEDORES del
        planeta. Sin ellos, los nutrientes no volverían al suelo.
      </Definicion>

      <Mnemotecnia>
        <strong>"Pared de QUITINA → Fungi"</strong>. Plantas tienen celulosa;
        hongos tienen quitina (igual que el exoesqueleto de los insectos).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPlantae() {
  return (
    <EscenaRica>
      <Titulo>Reino Plantae · plantas</Titulo>

      <Definicion termino="Plantas">
        Eucariotas AUTÓTROFAS (fotosíntesis). Pared celular de CELULOSA.
        Pluricelulares. Cloroplastos con clorofila.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación principal de plantas
          </text>
          {[
            { x: 90, t: "Briofitas", d: "sin vasos", ej: "musgos, hepáticas" },
            { x: 90, t: "Pteridofitas", d: "con vasos, sin semilla", ej: "helechos", y: 100 },
            { x: 380, t: "Gimnospermas", d: "semilla desnuda", ej: "pino, ciprés" },
            { x: 380, t: "Angiospermas", d: "semilla en fruto + flor", ej: "rosas, manzano, maíz", y: 100 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 50})`}>
              <rect x={-10} y={0} width={260} height={75} fill="#22c55e" opacity={0.08} stroke="#22c55e" strokeWidth={1.5} rx={8} />
              <text x={120} y={22} textAnchor="middle" fill="#22c55e" fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={120} y={40} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{p.d}</text>
              <text x={120} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Briofitas no tienen vasos; pteridofitas tienen vasos pero no
        semilla; gimnospermas tienen semilla pero no flor; angiospermas tienen
        flor y fruto."</strong> Cada grupo agrega un avance evolutivo.
      </Mnemotecnia>

      <Definicion termino="Angiospermas en 2 grupos">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Monocotiledóneas:</strong> 1 cotiledón, hojas paralelas,
            flores múltiplos de 3. Maíz, trigo, palma.</li>
          <li><strong>Dicotiledóneas:</strong> 2 cotiledones, hojas ramificadas,
            flores múltiplos de 4 o 5. Rosa, frejol, manzano.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscAnimalia() {
  return (
    <EscenaRica>
      <Titulo>Reino Animalia · animales</Titulo>

      <Definicion termino="Animales">
        Eucariotas pluricelulares, heterótrofos por INGESTIÓN. SIN pared
        celular ni cloroplastos. Con sistema nervioso y movimiento.
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            División fundamental: invertebrados vs vertebrados
          </text>
          {/* Invertebrados */}
          <g transform="translate(60, 40)">
            <rect width={290} height={200} fill={LIENZO.bad} opacity={0.08} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={145} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>INVERTEBRADOS (95%)</text>
            <text x={145} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>SIN columna vertebral</text>
            {[
              { t: "Poríferos", ej: "esponjas" },
              { t: "Cnidarios", ej: "medusas, corales" },
              { t: "Platelmintos", ej: "tenia, planaria" },
              { t: "Nematodos", ej: "lombriz intestinal" },
              { t: "Anélidos", ej: "lombriz de tierra" },
              { t: "Moluscos", ej: "caracol, pulpo" },
              { t: "Artrópodos*", ej: "insectos, arañas, cangrejos" },
              { t: "Equinodermos", ej: "estrella de mar" },
            ].map((g, i) => (
              <g key={i} transform={`translate(15, ${60 + i * 17})`}>
                <text fill={LIENZO.fg} fontSize={10} fontWeight={600}>{g.t}:</text>
                <text x={100} fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{g.ej}</text>
              </g>
            ))}
            <text x={145} y={205} textAnchor="middle" fill={LIENZO.warn} fontSize={9}>*Artrópodos = + del 80% de animales</text>
          </g>
          {/* Vertebrados */}
          <g transform="translate(380, 40)">
            <rect width={290} height={200} fill={LIENZO.ok} opacity={0.08} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={145} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>VERTEBRADOS (5%)</text>
            <text x={145} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>CON columna vertebral</text>
            {[
              { t: "Peces", ej: "trucha, atún" },
              { t: "Anfibios", ej: "rana, salamandra" },
              { t: "Reptiles", ej: "tortuga, lagarto, serpiente" },
              { t: "Aves", ej: "cóndor, gallina" },
              { t: "Mamíferos", ej: "humano, llama, vicuña" },
            ].map((g, i) => (
              <g key={i} transform={`translate(15, ${65 + i * 25})`}>
                <text fill={LIENZO.fg} fontSize={11} fontWeight={600}>{g.t}:</text>
                <text x={90} fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{g.ej}</text>
              </g>
            ))}
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Mamíferos (los más cercanos a nosotros)">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Pelo o pelaje.</li>
          <li>Glándulas mamarias.</li>
          <li>Sangre caliente (homeotermos).</li>
          <li>Mayoría vivíparos (excepto ornitorrinco y equidna).</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscBolivia() {
  return (
    <EscenaRica>
      <Titulo>Biodiversidad en Bolivia · país megadiverso</Titulo>

      <Definicion termino="Bolivia · top 10 megadiverso mundial">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>~14% de la biodiversidad mundial.</li>
          <li>4 ecorregiones: Amazonía, Chaco, Andes, Cerrado.</li>
          <li>~22 áreas protegidas (SERNAP).</li>
          <li>Más de 20.000 especies de plantas y 380 de mamíferos.</li>
        </ul>
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Especies emblemáticas de Bolivia
          </text>
          {[
            { x: 90, ne: "Cóndor andino", lat: "Vultur gryphus" },
            { x: 90, ne: "Llama", lat: "Lama glama", y: 95 },
            { x: 90, ne: "Vicuña", lat: "Vicugna vicugna", y: 140 },
            { x: 400, ne: "Jaguar", lat: "Panthera onca" },
            { x: 400, ne: "Quinua", lat: "Chenopodium quinoa", y: 95 },
            { x: 400, ne: "Bufeo (delfín rosado)", lat: "Inia boliviensis", y: 140 },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x}, ${e.y || 50})`}>
              <text fill={LIENZO.fg} fontSize={12} fontWeight={700}>{e.ne}</text>
              <text y={18} fill={LIENZO.accent} fontSize={11} fontStyle="italic">{e.lat}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Bolivia tiene especies <strong>endémicas</strong> (solo viven aquí):
        bufeo del Beni (Inia boliviensis), titi del altiplano, parabachas
        bolivianas. Su conservación es responsabilidad ciudadana.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Los hongos son plantas'">
        <strong>Pensar:</strong> que los hongos son vegetales.<br />
        <strong>Realidad:</strong> son un reino aparte (Fungi). No tienen
        clorofila ni hacen fotosíntesis; absorben nutrientes ya digeridos.
        Pared celular de QUITINA, no celulosa.
      </Misconception>

      <Misconception titulo="Error 2 · 'Especies del mismo género pueden cruzarse fértilmente'">
        <strong>Pensar:</strong> que comparten especie por compartir género.<br />
        <strong>Realidad:</strong> el género solo significa parentesco cercano.
        Caballo (Equus caballus) y burro (Equus asinus) son del mismo género,
        pero su cría (mula) es ESTÉRIL → especies distintas.
      </Misconception>

      <Misconception titulo="Error 3 · 'Bacterias y arqueas son lo mismo'">
        <strong>Pensar:</strong> que todas las procariotas son bacterias.<br />
        <strong>Realidad:</strong> hay 2 dominios procariotas: Bacteria y
        Archaea. Las arqueas viven en ambientes extremos (volcanes, salinas,
        intestinos).
      </Misconception>

      <Misconception titulo="Error 4 · 'Todos los animales son vertebrados'">
        <strong>Pensar:</strong> que vertebrados son la mayoría.<br />
        <strong>Realidad:</strong> 95% de los animales son INVERTEBRADOS (sin
        columna). Insectos solos = más del 80% de las especies animales.
      </Misconception>

      <Resumen>
        Taxonomía: Dominio → Reino → Filo → Clase → Orden → Familia → Género
        → Especie. Nomenclatura binomial en latín (cursiva). 5 reinos: Monera,
        Protista, Fungi, Plantae, Animalia. Bolivia: top 10 megadiverso.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la unidad básica de la clasificación?"
        opciones={["Reino", "Familia", "Género", "Especie"]}
        correctaIdx={3}
        explicacion="La especie es el nivel más específico y la unidad básica."
      />

      <AutoCheck
        pregunta="¿Qué reino tiene pared celular de quitina?"
        opciones={["Monera", "Plantae", "Fungi", "Protista"]}
        correctaIdx={2}
        explicacion="Los hongos tienen quitina; las plantas, celulosa; las bacterias, peptidoglicano."
      />

      <AutoCheck
        pregunta="¿Cuál es la forma correcta de escribir el nombre científico?"
        opciones={["homo sapiens", "Homo Sapiens", "Homo sapiens", "HOMO SAPIENS"]}
        correctaIdx={2}
        explicacion="Género en mayúscula, especie en minúscula, ambos en cursiva."
      />

      <AutoCheck
        pregunta="¿Qué grupo NO pertenece al reino Animalia?"
        opciones={["esponjas", "medusas", "algas", "estrellas de mar"]}
        correctaIdx={2}
        explicacion="Las algas son Protista. Esponjas, medusas y estrellas son invertebrados (Animalia)."
      />

      <AutoCheck
        pregunta="¿Cuál es el principal rasgo distintivo de los mamíferos?"
        opciones={["sangre fría", "huevos", "pelo y glándulas mamarias", "branquias"]}
        correctaIdx={2}
        explicacion="Pelo y glándulas mamarias (que dan nombre al grupo) son diagnósticos."
      />
    </EscenaRica>
  );
}

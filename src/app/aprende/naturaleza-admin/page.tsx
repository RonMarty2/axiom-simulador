"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Conceptos fundamentales de la administración"
      escenas={[
        { titulo: "Qué es la administración", componente: Esc01 },
        { titulo: "Importancia en las organizaciones", componente: Esc02 },
        { titulo: "Administración vs. gestión", componente: Esc03 },
        { titulo: "Los 3 niveles", componente: Esc04 },
        { titulo: "Concepto de empresa y tipos", componente: Esc05 },
        { titulo: "La empresa como sistema abierto", componente: Esc06 },
        { titulo: "Recursos del sistema", componente: Esc07 },
        { titulo: "Empresa y su entorno", componente: Esc08 },
        { titulo: "Práctica final", componente: Esc09 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es la administración?</Titulo>
      <Hook>
        Toda <strong>organización con más de 2 personas</strong> necesita administración. Una
        cancha de fútbol callejero, una junta vecinal, un emprendimiento de saltañas, la UMSS, el
        Banco Mundial: todas administran. No es solo "para empresas grandes".
      </Hook>
      <Definicion termino="administración">
        Proceso que implica <strong>planificar, organizar, integrar personal, dirigir y controlar</strong>
        los recursos de una organización para alcanzar objetivos específicos de manera <strong>eficiente
        y eficaz</strong>.
      </Definicion>
      <Parrafo>
        Es una disciplina fundamental en las ciencias sociales aplicadas. Proporciona las herramientas y
        técnicas para gestionar organizaciones de cualquier sector: empresas, ONG, instituciones
        públicas, equipos deportivos, hospitales.
      </Parrafo>

      <Mnemotecnia>
        <strong>"POIDC"</strong>: las 5 funciones administrativas en orden:<br />
        <strong>P</strong>laneación · <strong>O</strong>rganización ·
        <strong> I</strong>ntegración de personal · <strong>D</strong>irección ·
        <strong> C</strong>ontrol.<br /><br />
        Cada función será una unidad completa en el Bloque 1 Unidad 4. Memoriza la secuencia: el
        examen UMSS suele pedir "qué función NO es parte de la administración".
      </Mnemotecnia>

      <Misconception titulo="Eficiente ≠ eficaz">
        <strong>Eficaz</strong> = lograr el objetivo (hacer lo correcto).<br />
        <strong>Eficiente</strong> = lograrlo con el mínimo de recursos (hacerlo bien).<br />
        Una empresa puede ser eficaz pero ineficiente (logra metas gastando mucho), o eficiente pero
        ineficaz (ahorra mucho pero no llega). Lo ideal: ambas.
      </Misconception>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Importancia en las organizaciones</Titulo>
      <Parrafo>
        La administración es vital para el éxito de cualquier organización porque:
      </Parrafo>
      <Resumen>
        • Asegura la <strong>utilización óptima</strong> de los recursos.<br />
        • Facilita la <strong>coordinación</strong> entre departamentos.<br />
        • Fomenta la <strong>innovación</strong> y la adaptación al entorno cambiante.<br />
        • Contribuye al logro de <strong>metas</strong> a corto y largo plazo.
      </Resumen>
      <Cuidado>
        Sin administración efectiva, las organizaciones enfrentan ineficiencias, desmotivación del
        personal y dificultades para competir.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Administración vs. gestión</Titulo>
      <Parrafo>
        Aunque a menudo se usan como sinónimos, son conceptualmente distintas:
      </Parrafo>
      <Resumen>
        <strong>Administración</strong>: diseña y planifica las estrategias. Define el <strong>QUÉ</strong> y
        el <strong>POR QUÉ</strong>.<br /><br />
        <strong>Gestión</strong>: implementa y ejecuta esas estrategias. Define el <strong>CÓMO</strong>.
      </Resumen>
      <Ejemplo>
        Administración: "este año queremos abrir 3 nuevas sucursales para captar el mercado del sur".<br />
        Gestión: "Pedro coordina la apertura, María contrata al personal, el equipo de marketing lanza la
        campaña".
      </Ejemplo>

      <CasoBolivia>
        Empresa boliviana <strong>Cervecería Boliviana Nacional (CBN)</strong>:<br />
        • <strong>Administración:</strong> "el directorio decide entrar al mercado de bebidas sin
        alcohol con la marca Maltín".<br />
        • <strong>Gestión:</strong> los gerentes de producción y ventas en La Paz/Santa Cruz
        ejecutan el plan: contratan distribuidores, organizan campañas, ajustan logística.<br /><br />
        En el examen, "administración" suele asociarse a directorio/CEO y "gestión" a
        gerentes/coordinadores.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los 3 niveles de administración</Titulo>
      <Resumen>
        <strong>1. Administración estratégica</strong>: largo plazo. Define visión, misión y objetivos
        generales. Analiza entorno externo e interno. La hace la alta dirección.<br /><br />
        <strong>2. Administración táctica</strong>: corto y mediano plazo. Implementa las estrategias
        del nivel anterior. Coordina recursos. La hacen gerencias de nivel medio.<br /><br />
        <strong>3. Administración operativa</strong>: actividades diarias y tareas rutinarias. Garantiza
        la eficiencia en la producción de bienes y servicios.
      </Resumen>
      <PorQue>
        Los tres niveles trabajan en cascada: lo estratégico decide a dónde vamos, lo táctico decide
        cómo llegamos en concreto, lo operativo lo hace.
      </PorQue>

      <WorkedExample titulo="Los 3 niveles en una salteñería de La Paz">
        Salteñería "Doña Pancha", 4 locales.<br /><br />

        <strong>Nivel estratégico</strong> (Doña Pancha + 1 socio, horizonte 3-5 años):<br />
        "Queremos ser la cadena #1 de salteñas en Bolivia. Abrir 10 locales en 3 años. Vender por
        delivery en Cochabamba".<br /><br />

        <strong>Nivel táctico</strong> (gerentes de operaciones y marketing, horizonte 6-18 meses):<br />
        "Este año abrimos 3 locales en Cochabamba. Contratamos a 2 nuevos chefs. Lanzamos app móvil.
        Renegociamos contrato con proveedor de carne".<br /><br />

        <strong>Nivel operativo</strong> (encargados de local, horizonte día/semana):<br />
        "Hoy se hacen 600 salteñas. Juana arma, Pedro hornea, Luis atiende caja. A las 8 AM se
        abren puertas".<br /><br />

        <strong>En cascada:</strong> sin el operativo no se venden salteñas hoy; sin el táctico
        no se abre nuevo local este año; sin el estratégico no se sabe a dónde va la cadena en 5 años.
      </WorkedExample>

      <Conexion>
        Estos 3 niveles van a reaparecer en la unidad de <em>Planeación</em>: la planeación
        estratégica, táctica y operativa se corresponden exactamente con estos niveles.
      </Conexion>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Concepto de empresa</Titulo>
      <Definicion termino="empresa">
        Entidad organizada que combina recursos <strong>humanos, financieros, tecnológicos y materiales</strong>
        para producir bienes o servicios, satisfacer necesidades del mercado y generar beneficios.
      </Definicion>
      <Resumen>
        <strong>Tipos de empresas:</strong><br /><br />
        • <strong>Públicas</strong>: propiedad del Estado, orientadas al servicio público.<br />
        • <strong>Privadas</strong>: propiedad de individuos o grupos privados con fines de lucro.<br />
        • <strong>Mixtas</strong>: combinan capital público y privado.<br />
        • <strong>Multinacionales</strong>: operan en múltiples países, aprovechando ventajas globales.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>La empresa como sistema abierto</Titulo>
      <Definicion termino="sistema abierto">
        Una organización es un sistema abierto porque <strong>interactúa continuamente con su entorno</strong>:
        recibe insumos, los transforma internamente y devuelve productos o servicios.
      </Definicion>
      <Parrafo>
        Esa interacción implica que las empresas deben <strong>adaptarse</strong> a cambios en factores
        económicos, sociales, tecnológicos y legales para mantener su competitividad y sostenibilidad.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Recursos del sistema empresarial</Titulo>
      <Resumen>
        <strong>Recursos humanos</strong>: el personal. Su gestión eficaz es crucial.<br /><br />
        <strong>Recursos financieros</strong>: capital para operar, invertir y expandirse.<br /><br />
        <strong>Recursos tecnológicos</strong>: herramientas y tecnologías que mejoran la productividad.<br /><br />
        <strong>Recursos materiales</strong>: insumos físicos utilizados en la producción.
      </Resumen>
      <PorQue>
        La <strong>interrelación</strong> entre estos cuatro componentes determina la capacidad de la
        empresa para alcanzar sus objetivos. Ningún recurso, solo, logra nada.
      </PorQue>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <Titulo>La empresa y su entorno</Titulo>
      <Parrafo>
        La empresa <strong>no opera en aislamiento</strong>. Está influenciada por factores externos:
      </Parrafo>
      <Resumen>
        • Economía (PIB, inflación, tipo de cambio).<br />
        • Competencia (otras empresas del sector).<br />
        • Regulaciones gubernamentales.<br />
        • Tendencias culturales y tecnológicas.
      </Resumen>
      <Cuidado>
        Una gestión efectiva implica <strong>monitorear</strong> estos factores, <strong>anticipar</strong>
        cambios y <strong>adaptar</strong> estrategias para minimizar riesgos y aprovechar oportunidades.
      </Cuidado>

      <Mnemotecnia>
        <strong>"PESTEL"</strong> es el marco más usado para analizar el entorno empresarial:<br />
        <strong>P</strong>olítico · <strong>E</strong>conómico · <strong>S</strong>ocial ·
        <strong> T</strong>ecnológico · <strong>E</strong>cológico · <strong>L</strong>egal.<br /><br />
        En Bolivia, "Político" y "Legal" pesan mucho (cambios de gobierno, normativa SIN). Memoriza
        las 6 letras: el examen suele preguntar "¿cuál NO es un factor del entorno?".
      </Mnemotecnia>

      <Misconception titulo="Entorno ≠ solo competidores">
        Muchos creen que "entorno" es solo la competencia. NO. El entorno incluye factores que la
        empresa no controla pero que la afectan: política, economía, regulación, tecnología, cultura
        y medio ambiente. La competencia es solo uno de varios elementos.
      </Misconception>
    </EscenaRica>
  );
}

function Esc09() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Las funciones administrativas básicas son:", o: [
          "planificar y vender",
          "planificar, organizar, integrar personal, dirigir, controlar",
          "ganar dinero",
          "auditar, registrar, publicar",
        ], c: 1, ex: "5 funciones que veremos en detalle en la Unidad 4." },
        { p: "Decir 'qué y por qué' corresponde a:", o: [
          "gestión", "administración", "ejecución", "supervisión",
        ], c: 1, ex: "Administración = diseño. Gestión = ejecución (cómo)." },
        { p: "Las decisiones de largo plazo y visión corresponden al nivel:", o: [
          "operativo", "táctico", "estratégico", "logístico",
        ], c: 2, ex: "Visión, misión, objetivos generales = nivel estratégico." },
        { p: "Una empresa de capital público + privado se llama:", o: [
          "pública", "mixta", "multinacional", "privada",
        ], c: 1, ex: "Mixtas combinan ambas fuentes de capital." },
        { p: "La empresa como sistema ABIERTO significa que:", o: [
          "todos pueden entrar a trabajar",
          "interactúa permanentemente con su entorno",
          "no tiene jefes",
          "publica sus estados financieros",
        ], c: 1, ex: "Recibe insumos, transforma, devuelve productos. Y se adapta al entorno." },
      ]} />
    </EscenaRica>
  );
}

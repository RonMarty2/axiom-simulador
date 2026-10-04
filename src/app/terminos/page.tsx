import type { Metadata } from "next";
import { LegalPagina, Seccion, Lista, Contacto } from "../components/LegalPagina";
import { LEGAL } from "@/lib/legal";
import { PRECIOS_BOB, PRECIOS_USDT, formatearBs } from "@/lib/precios";

export const metadata: Metadata = {
  title: "Términos y Condiciones | AXIOM",
  description: "Las reglas de uso de AXIOM: cuentas, planes, pagos, reembolsos y uso del contenido.",
};

export default function TerminosPage() {
  return (
    <LegalPagina
      titulo="Términos y Condiciones"
      resumen="Resumen en corto: AXIOM te ayuda a prepararte para el examen de admisión de la UMSS. Tienes un plan gratis y uno de pago mensual. Pagas a mano y activamos tu acceso. El contenido es para tu estudio personal. No podemos prometerte que ingreses, porque eso depende de ti. Lo que sigue es el detalle."
      otra={{ href: "/privacidad", texto: "Ver la Política de Privacidad" }}
    >
      <Seccion n={1} titulo="Qué es AXIOM y qué no es">
        <p>
          AXIOM es un servicio educativo en línea con lecciones, láminas de repaso y simuladores de examen para
          preparar la admisión a la Universidad Mayor de San Simón (UMSS), en {LEGAL.ciudad}, {LEGAL.pais}.
        </p>
        <p>
          AXIOM es un servicio <strong>independiente</strong>. No es un sitio oficial de la UMSS ni cuenta con su
          aval. Los exámenes pasados que ves en la biblioteca son de gestiones anteriores y se incluyen con fines
          de estudio. Las respuestas correctas y las resoluciones paso a paso las elaboramos nosotros.
        </p>
        <p>
          <strong>Pueden tener errores.</strong> Revisamos el banco con cuidado, pero una respuesta puede estar mal
          o una pregunta puede haber perdido un dibujo. Si encuentras algo así, avísanos y lo corregimos. El
          contenido generado con inteligencia artificial puede equivocarse con más facilidad: verifícalo antes de
          darlo por bueno.
        </p>
        <p>
          AXIOM no garantiza que ingreses a la universidad ni que obtengas una nota determinada. Es una herramienta
          de práctica; el resultado depende de tu estudio.
        </p>
      </Seccion>

      <Seccion n={2} titulo="Tu cuenta">
        <p>
          Entras con tu cuenta de Google y se crea tu cuenta de AXIOM. Para usarla debes ser mayor de 18 años. Si
          eres menor, necesitas el permiso de tu madre, padre o tutor, que se hace responsable de que uses el
          servicio de acuerdo con estos términos.
        </p>
        <Lista items={[
          "La cuenta es personal: no la compartas ni la prestes. Si el acceso pagado se usa entre varias personas, podemos suspenderlo.",
          "Eres responsable de lo que se haga desde tu cuenta de Google y desde tu dispositivo.",
          "Danos datos verdaderos. Si usas el nombre de otra persona para engañar, podemos cerrar la cuenta.",
        ]} />
      </Seccion>

      <Seccion n={3} titulo="Planes y precios">
        <p>
          Hay un <strong>plan Gratis</strong> y un <strong>plan Premium</strong>. Qué incluye cada uno se describe en
          la página de Precios, y esa descripción forma parte de estos términos.
        </p>
        <Lista items={[
          <>Premium cuesta <strong>{formatearBs(PRECIOS_BOB.premium)} por mes, por facultad</strong>. Cada facultad es un producto mensual independiente con su propia fecha de vencimiento.</>,
          <>Cambiar de facultad cuesta <strong>{formatearBs(PRECIOS_BOB.cambioFacultad)}</strong>, salvo que ya tengas pagada la facultad a la que cambias.</>,
          "Cada pago te da acceso por un mes desde que lo aprobamos. No hay renovación automática: nunca cobramos solos. Cuando vence, vuelves al plan Gratis hasta que pagues de nuevo.",
          "Podemos cambiar los precios y los planes. Un cambio no afecta al mes que ya pagaste; se aplica al siguiente pago.",
        ]} />
      </Seccion>

      <Seccion n={4} titulo="Cómo se paga">
        <p>
          El pago es manual. Pagas con QR bancario (en bolivianos) o con Binance Pay o RedotPay (en USDT, un dólar
          digital), y luego registras el pago en AXIOM con el número de comprobante. Nosotros verificamos que el
          dinero llegó y recién entonces activamos tu acceso. Esto puede tomar algún tiempo, sobre todo fuera de
          horario. En USDT, Premium cuesta {PRECIOS_USDT.premium} USDT y el cambio de facultad {PRECIOS_USDT.cambioFacultad} USDT.
        </p>
        <Lista items={[
          "Si el pago no llega, el monto no coincide o el comprobante es falso, lo rechazamos y no se activa el acceso.",
          "Presentar un pago falso o un comprobante alterado es motivo de cierre de la cuenta.",
          "Un pago en cripto no se puede deshacer: revisa el destinatario y el monto antes de confirmar. Las comisiones de tu banco o plataforma corren por tu cuenta.",
          "Nunca te pediremos la clave de tu banco ni de tus cuentas de cripto. Si alguien te las pide a nombre de AXIOM, no es AXIOM.",
        ]} />
      </Seccion>

      <Seccion n={5} titulo="Reembolsos">
        <p>
          Como el acceso se activa en cuanto aprobamos el pago y el contenido es digital, <strong>no devolvemos
          el dinero por cambio de opinión</strong> una vez activado. Sí lo devolvemos en estos casos:
        </p>
        <Lista items={[
          "Pagaste dos veces lo mismo.",
          "Pagaste, el pago nos llegó y no pudimos activar tu acceso.",
          "El servicio estuvo caído o con una falla grave durante buena parte de tu mes, y no pudiste usarlo.",
        ]} />
        <p>
          Pide la devolución dentro de los 7 días de tu pago, por el canal de contacto de abajo, con tu comprobante.
          Te respondemos y, si corresponde, devolvemos por el mismo medio con el que pagaste (en USDT si pagaste en USDT).
        </p>
      </Seccion>

      <Seccion n={6} titulo="Cómo puedes usar el contenido">
        <p>
          Las lecciones, láminas, animaciones, resoluciones y el banco armado por AXIOM son para tu estudio
          personal. Te damos una licencia personal, limitada y que no se puede transferir para usarlos mientras
          tengas tu cuenta. Está prohibido:
        </p>
        <Lista items={[
          "Copiar, descargar en masa, extraer con programas (scraping) o publicar el contenido, incluidas las respuestas y resoluciones.",
          "Venderlo, revenderlo o compartir tu acceso pagado con otras personas.",
          "Saltarte los límites del plan Gratis o las protecciones de acceso por medios técnicos.",
          "Atacar, sobrecargar o intentar entrar a partes del sistema que no son para ti.",
        ]} />
        <p>
          Los textos de los exámenes pasados pertenecen a sus titulares originales. AXIOM no reclama esos textos
          como suyos. Lo que es de AXIOM es lo que le agregó: el orden, las respuestas, las resoluciones, las
          lecciones, las láminas y el diseño.
        </p>
      </Seccion>

      <Seccion n={7} titulo="Cómo funciona el servicio">
        <p>
          Hacemos lo posible para que AXIOM esté disponible, pero no prometemos que funcione sin interrupciones ni
          sin errores. Puede haber mantenimiento, fallas de los proveedores que usamos o cambios en el contenido.
          Algunas funciones se apoyan en servicios de inteligencia artificial de terceros, que pueden fallar o
          cambiar.
        </p>
        <p>
          Podemos agregar, cambiar o quitar funciones. Si quitamos algo que pagaste y no te lo reponemos, aplica la
          sección de reembolsos.
        </p>
      </Seccion>

      <Seccion n={8} titulo="Suspender o cerrar una cuenta">
        <p>
          Podemos suspender o cerrar una cuenta que incumpla estos términos, con aviso cuando sea posible. Tú
          puedes dejar de usar AXIOM cuando quieras y pedirnos que borremos tu cuenta y tus datos, como explica la
          Política de Privacidad.
        </p>
      </Seccion>

      <Seccion n={9} titulo="Responsabilidad">
        <p>
          AXIOM se ofrece &ldquo;como está&rdquo;. En la medida en que la ley lo permita, no respondemos por daños
          indirectos ni por decisiones que tomes basándote en el contenido, y nuestra responsabilidad total por
          cualquier reclamo se limita a lo que hayas pagado en el mes en que ocurrió el problema. Esto no limita
          los derechos que la ley boliviana te reconoce como consumidor.
        </p>
      </Seccion>

      <Seccion n={10} titulo="Cambios a estos términos">
        <p>
          Podemos actualizar estos términos. Cuando lo hagamos cambiaremos la fecha de arriba y, si el cambio es
          importante, te avisaremos dentro de la aplicación. Si sigues usando AXIOM después del aviso, aceptas la
          versión nueva. Si no estás de acuerdo, puedes dejar de usarlo y pedir que borremos tu cuenta.
        </p>
      </Seccion>

      <Seccion n={11} titulo="Ley aplicable">
        <p>
          Estos términos se rigen por las leyes de {LEGAL.pais}. Para cualquier controversia, nos sometemos a los
          tribunales competentes de {LEGAL.ciudad}, sin perjuicio de los derechos que tengas como consumidor.
        </p>
      </Seccion>

      <Seccion n={12} titulo="Contacto">
        <Contacto />
      </Seccion>
    </LegalPagina>
  );
}

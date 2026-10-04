import type { Metadata } from "next";
import { LegalPagina, Seccion, Lista, Contacto } from "../components/LegalPagina";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad | AXIOM",
  description: "Qué datos guarda AXIOM, para qué los usa, con quién los comparte y cómo puedes pedir que los borremos.",
};

export default function PrivacidadPage() {
  return (
    <LegalPagina
      titulo="Política de Privacidad"
      resumen="Resumen en corto: entras con Google y guardamos tu nombre, tu correo y lo que haces dentro de AXIOM (tus simulacros, tus errores y tus pagos). No vendemos tus datos ni usamos publicidad. Tu nombre y tu mejor nota pueden aparecer en el ranking. Puedes pedir que borremos todo. Lo que sigue es el detalle."
      otra={{ href: "/terminos", texto: "Ver los Términos y Condiciones" }}
    >
      <Seccion n={1} titulo="De quién hablamos">
        <p>
          AXIOM es un servicio educativo independiente que opera desde {LEGAL.ciudad}, {LEGAL.pais}. Esta política
          explica qué datos personales tuyos guardamos al usarlo, para qué, y qué puedes hacer con ellos.
        </p>
      </Seccion>

      <Seccion n={2} titulo="Qué datos guardamos">
        <p><strong>Los que nos llegan de Google cuando entras:</strong></p>
        <Lista items={[
          "Tu nombre, tu correo y tu foto de perfil.",
          "Nada más. No vemos tu contraseña de Google ni accedemos a tu Gmail, tus contactos ni tus archivos: solo pedimos los permisos básicos de identidad.",
        ]} />
        <p><strong>Los que generas al usar AXIOM:</strong></p>
        <Lista items={[
          "La facultad a la que te preparas, tu plan y las fechas de vencimiento de tus suscripciones.",
          "Tus simulacros: qué preguntas viste, qué respondiste, tu nota, el tiempo que tardaste y el desglose por tema.",
          "Las preguntas que fallaste (para armarte práctica con tus errores) y las que marcaste.",
          "Tus estadísticas: exámenes completados, mejor nota y promedio.",
        ]} />
        <p><strong>Los de tus pagos:</strong></p>
        <Lista items={[
          "El plan, el monto, el método (Tigo Money, QR o transferencia), el número de comprobante que escribes, la fecha y si lo aprobamos o rechazamos.",
          "No guardamos números de tarjeta, claves del banco ni PIN. No tenemos acceso a tu cuenta bancaria ni a tu Tigo Money: solo vemos el comprobante que tú nos das.",
        ]} />
        <p><strong>Los técnicos:</strong></p>
        <Lista items={[
          "Una cookie de sesión para mantenerte con la sesión abierta (ver sección 6).",
          "Los datos que cualquier servidor web recibe al atenderte, como la dirección IP y el tipo de navegador. Los registra nuestro proveedor de alojamiento para operar y proteger el servicio.",
        ]} />
      </Seccion>

      <Seccion n={3} titulo="Para qué los usamos">
        <Lista items={[
          "Crear tu cuenta y mantener tu sesión.",
          "Darte el servicio: calificar tus simulacros, guardar tu progreso y armar práctica con tus errores.",
          "Verificar tus pagos y activar o terminar tu acceso.",
          "Mostrar el ranking (ver sección 5).",
          "Proteger el servicio de abusos y errores, y mejorar el contenido con estadísticas generales, por ejemplo qué preguntas fallan más alumnos.",
        ]} />
        <p>No usamos tus datos para publicidad ni los vendemos.</p>
      </Seccion>

      <Seccion n={4} titulo="Con quién los compartimos">
        <p>Para que AXIOM funcione usamos servicios de terceros, que reciben los datos que necesitan para su parte:</p>
        <Lista items={[
          "Google, para el inicio de sesión.",
          "Supabase, donde se guarda la base de datos.",
          "Vercel, donde se aloja la aplicación.",
          "Proveedores de inteligencia artificial, para las funciones que generan práctica o planes de estudio. A ellos les enviamos el contenido de las preguntas y los temas que fallaste. No les enviamos tu nombre ni tu correo.",
        ]} />
        <p>
          Estos servicios pueden tener sus servidores en otros países, así que tus datos pueden almacenarse o
          procesarse fuera de {LEGAL.pais}. Solo entregaremos tus datos a una autoridad si una orden legal
          competente nos obliga.
        </p>
      </Seccion>

      <Seccion n={5} titulo="El ranking">
        <p>
          El ranking de AXIOM es público para los usuarios y muestra el <strong>nombre de tu cuenta de Google y tu
          mejor nota</strong>. No muestra tu correo. Si no quieres aparecer, pídenos que te quitemos usando el
          contacto de abajo.
        </p>
      </Seccion>

      <Seccion n={6} titulo="Cookies y datos en tu dispositivo">
        <Lista items={[
          "Usamos una sola cookie, la de sesión. Es necesaria para que sigas dentro de tu cuenta, no se puede leer desde scripts de la página y dura 30 días.",
          "No usamos cookies de publicidad ni herramientas de análisis o seguimiento de terceros.",
          "Guardamos en tu navegador (almacenamiento local) el simulacro que tienes en curso, tus errores y si cerraste un aviso. Es para que no pierdas tu avance si se corta la conexión. Se borra si limpias los datos del sitio.",
        ]} />
      </Seccion>

      <Seccion n={7} titulo="Cuánto tiempo los guardamos">
        <p>
          Mientras tengas tu cuenta. Si pides que la borremos, eliminamos tus datos personales y tu historial. Podemos
          conservar los registros de pagos por el tiempo que haga falta para la contabilidad y para atender
          reclamos.
        </p>
      </Seccion>

      <Seccion n={8} titulo="Tus derechos">
        <p>Puedes pedirnos, en cualquier momento:</p>
        <Lista items={[
          "Saber qué datos tuyos tenemos y recibir una copia.",
          "Corregir los que estén mal.",
          "Que borremos tu cuenta y tus datos.",
          "Que dejemos de mostrarte en el ranking.",
        ]} />
        <p>
          Para cualquiera de estos pedidos usa el contacto de abajo, desde el correo con el que entras a AXIOM, para
          poder confirmar que eres tú. Te respondemos lo antes posible. Además, la Constitución de {LEGAL.pais}
          reconoce tu derecho a la privacidad y a la protección de tus datos.
        </p>
      </Seccion>

      <Seccion n={9} titulo="Menores de edad">
        <p>
          Muchos alumnos que se preparan para la admisión tienen menos de 18 años. Si eres menor, usa AXIOM con el
          permiso de tu madre, padre o tutor. Ellos también pueden escribirnos para pedir que revisemos o borremos
          tus datos. No pedimos datos de menores más allá de los que pide el inicio de sesión de Google y los que
          generas al estudiar.
        </p>
      </Seccion>

      <Seccion n={10} titulo="Seguridad">
        <p>
          La conexión a AXIOM va cifrada, el acceso a la base de datos está restringido y la cookie de sesión está
          protegida. Ningún sistema es invulnerable, así que no podemos prometerte una seguridad absoluta. Si
          detectamos un problema que afecte tus datos, te lo avisaremos.
        </p>
      </Seccion>

      <Seccion n={11} titulo="Cambios a esta política">
        <p>
          Si cambiamos algo importante, actualizaremos la fecha de arriba y te avisaremos dentro de la aplicación.
        </p>
      </Seccion>

      <Seccion n={12} titulo="Contacto">
        <Contacto />
      </Seccion>
    </LegalPagina>
  );
}

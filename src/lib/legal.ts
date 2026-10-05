// Datos de las páginas legales (/terminos y /privacidad), en UN solo lugar.
//
// Por qué existe: la fecha de vigencia y los datos de contacto aparecen en las
// dos páginas y los pide también la tienda de Android el día que se publique la
// app. Si cambian, se cambian acá y no en dos textos largos.
//
// Si `titular` y los dos canales de contacto estuvieran en null, las páginas
// mostrarían un aviso en la sección de contacto en vez de un canal real, y un
// alumno no tendría cómo pedir un reembolso ni que borren sus datos.

export const LEGAL = {
  servicio: "AXIOM",
  // Quien presta el servicio y recibe los pagos: Ronald, a título personal
  // (no hay razón social; "Axiom SRL" era un dato de demostración y ya no está).
  // Si algún día se constituye una empresa, cambiar `titular` y revisar los
  // Términos con un abogado.
  titular: "Ronald Martinez Jimenes" as string | null,
  correo: null as string | null,
  // Lo dio Ronald el 5-oct-2026 junto con su nombre. Se asume que es su WhatsApp.
  whatsapp: "+591 64805522" as string | null,
  // Fecha de la última revisión de ambos textos. Se actualiza a mano cuando
  // se cambia el contenido de cualquiera de los dos.
  vigencia: "5 de octubre de 2026",
  ciudad: "Cochabamba",
  pais: "Bolivia",
} as const;

export function hayContacto(): boolean {
  return Boolean(LEGAL.correo || LEGAL.whatsapp);
}

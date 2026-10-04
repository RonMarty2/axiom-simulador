// Datos de las páginas legales (/terminos y /privacidad), en UN solo lugar.
//
// Por qué existe: la fecha de vigencia y los datos de contacto aparecen en las
// dos páginas y los pide también la tienda de Android el día que se publique la
// app. Si cambian, se cambian acá y no en dos textos largos.
//
// PENDIENTE DE RONALD (bitácora §8, Crítico): completar `titular` y al menos
// uno de `correo` / `whatsapp` ANTES de habilitar los cobros. Mientras estén en
// null, las páginas muestran un aviso en la sección de contacto en vez de un
// canal real, y un alumno no tiene cómo pedir que borren sus datos.

export const LEGAL = {
  servicio: "AXIOM",
  // Nombre completo o razón social de quien presta el servicio y recibe los
  // pagos. Hoy no hay un dato real: "Axiom SRL" de /pagar es de demostración.
  titular: null as string | null,
  correo: null as string | null,
  whatsapp: null as string | null,
  // Fecha de la última revisión de ambos textos. Se actualiza a mano cuando
  // se cambia el contenido de cualquiera de los dos.
  vigencia: "4 de octubre de 2026",
  ciudad: "Cochabamba",
  pais: "Bolivia",
} as const;

export function hayContacto(): boolean {
  return Boolean(LEGAL.correo || LEGAL.whatsapp);
}

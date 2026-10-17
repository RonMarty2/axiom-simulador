// Pestañas de la zona de pruebas de Ronald (SOLO DESARROLLO: cada pagina da 404 si NODE_ENV !== "development").
// Para sumar una prueba nueva: agregar una fila aqui, crear su pagina (con `if (process.env.NODE_ENV !== "development") notFound()`
// y <PestanasDev actual="su-id" /> arriba) y, si guarda observaciones, usar /api/dev/observaciones.
export const PESTANAS = [{ id: "animaciones", titulo: "Animaciones", ruta: "/prueba-animacion" }] as const;
export type IdPestana = (typeof PESTANAS)[number]["id"];

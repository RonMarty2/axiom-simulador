// Iniciales para los avatares. Un solo lugar: ignora lo que no empieza con letra
// (por ejemplo «(tester)» daba «R(» en vez de «R»).
export function iniciales(nombre: string | null | undefined): string {
  return (nombre ?? "")
    .split(/\s+/)
    .filter((p) => /^\p{L}/u.test(p))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

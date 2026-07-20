// Sanitizador para los dibujos SVG que vienen en los .md de exámenes
// (generados por otras IAs vía el megaprompt). Solo dejamos pasar formas de
// dibujo: nada de scripts, eventos, imágenes externas ni embebidos raros.

const ETIQUETAS_PROHIBIDAS = /<\s*\/?\s*(script|foreignObject|iframe|object|embed|image|video|audio|animate|set|use)\b[^>]*>/gi;
const ATRIBUTOS_EVENTO = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const HREFS = /\s(?:href|xlink:href)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JAVASCRIPT_URI = /javascript\s*:/gi;

export function sanitizarSVG(crudo: string | undefined | null): string | null {
  if (!crudo) return null;
  const recortado = crudo.trim();
  if (!/^<svg[\s>]/i.test(recortado) || !/<\/svg>\s*$/i.test(recortado)) return null;
  let s = recortado;
  s = s.replace(ETIQUETAS_PROHIBIDAS, "");
  s = s.replace(ATRIBUTOS_EVENTO, "");
  s = s.replace(HREFS, "");
  s = s.replace(JAVASCRIPT_URI, "");
  return s;
}

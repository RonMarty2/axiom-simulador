// El parser de MathText, separado del componente a propósito: MathText.tsx
// importa el CSS de KaTeX y es "use client", así que no se puede cargar desde
// un test de node. Acá adentro no hay React ni CSS, y math-parse.test.ts lo
// prueba directo.

export type Segmento =
  | { tipo: "texto"; contenido: string }
  | { tipo: "negrita"; contenido: string }
  | { tipo: "inline"; contenido: string }
  | { tipo: "display"; contenido: string };

// $$...$$ primero, si no cualquier $...$ que no cruce un renglón.
const MATEMATICA = /(\$\$([^$]+)\$\$|\$([^$\n]+)\$)/g;

// Las explicaciones del banco vienen escritas en markdown y usan **negrita**
// para marcar el paso que destraba el ejercicio ("La clave:", "Ojo con la
// opción A"). Como acá no hay parser de markdown, los asteriscos se le
// mostraban crudos al alumno: 58 explicaciones del banco decían literalmente
// "**La clave:**" con los asteriscos a la vista.
//
// Va SOLO sobre los tramos de texto, nunca sobre lo que está entre $: dentro
// de una fórmula, ** es el exponente de un exponente y KaTeX lo tiene que ver
// tal cual.
const NEGRITA = /\*\*([^*\n]+)\*\*/g;

export function parsearMath(texto: string): Segmento[] {
  const resultado: Segmento[] = [];
  let ultimoIdx = 0;
  let match: RegExpExecArray | null;
  MATEMATICA.lastIndex = 0;

  while ((match = MATEMATICA.exec(texto)) !== null) {
    if (match.index > ultimoIdx) {
      empujarTexto(resultado, texto.slice(ultimoIdx, match.index));
    }
    if (match[2] !== undefined) {
      resultado.push({ tipo: "display", contenido: match[2] });
    } else {
      resultado.push({ tipo: "inline", contenido: match[3] });
    }
    ultimoIdx = match.index + match[0].length;
  }

  if (ultimoIdx < texto.length) {
    empujarTexto(resultado, texto.slice(ultimoIdx));
  }

  return resultado;
}

function empujarTexto(salida: Segmento[], tramo: string): void {
  let desde = 0;
  let m: RegExpExecArray | null;
  NEGRITA.lastIndex = 0;

  while ((m = NEGRITA.exec(tramo)) !== null) {
    if (m.index > desde) {
      salida.push({ tipo: "texto", contenido: tramo.slice(desde, m.index) });
    }
    salida.push({ tipo: "negrita", contenido: m[1] });
    desde = m.index + m[0].length;
  }

  if (desde < tramo.length) {
    salida.push({ tipo: "texto", contenido: tramo.slice(desde) });
  }
}

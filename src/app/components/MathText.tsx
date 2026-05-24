"use client";

import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface MathTextProps {
  children: string;
  className?: string;
  block?: boolean;
}

type Segmento =
  | { tipo: "texto"; contenido: string }
  | { tipo: "inline"; contenido: string }
  | { tipo: "display"; contenido: string };

export default function MathText({ children, className, block }: MathTextProps) {
  const segmentos = useMemo(() => parsearMath(children ?? ""), [children]);

  const Wrapper: "div" | "span" = block ? "div" : "span";

  return (
    <Wrapper className={className}>
      {segmentos.map((seg, i) => {
        if (seg.tipo === "texto") {
          return (
            <span key={i} style={{ whiteSpace: "pre-wrap" }}>
              {seg.contenido}
            </span>
          );
        }
        const html = katex.renderToString(seg.contenido, {
          displayMode: seg.tipo === "display",
          throwOnError: false,
          strict: "ignore",
          output: "html",
        });
        return seg.tipo === "display" ? (
          <span
            key={i}
            className="block my-3 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
        );
      })}
    </Wrapper>
  );
}

function parsearMath(texto: string): Segmento[] {
  const resultado: Segmento[] = [];
  const regex = /(\$\$([^$]+)\$\$|\$([^$\n]+)\$)/g;
  let ultimoIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(texto)) !== null) {
    if (match.index > ultimoIdx) {
      resultado.push({
        tipo: "texto",
        contenido: texto.slice(ultimoIdx, match.index),
      });
    }
    if (match[2] !== undefined) {
      resultado.push({ tipo: "display", contenido: match[2] });
    } else {
      resultado.push({ tipo: "inline", contenido: match[3] });
    }
    ultimoIdx = match.index + match[0].length;
  }

  if (ultimoIdx < texto.length) {
    resultado.push({ tipo: "texto", contenido: texto.slice(ultimoIdx) });
  }

  return resultado;
}

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
          // whiteSpace:nowrap — sin esto, KaTeX arma la fórmula con varios
          // <span> internos (uno por token) y el navegador podía cortar la
          // línea A MITAD de una expresión ("x + 1" partido en "x +" / "1"),
          // se leía como una fórmula incompleta.
          //
          // maxWidth + overflowX — consecuencia del nowrap: una fórmula en
          // línea más ancha que la pantalla no se podía partir y se salía del
          // celular, tapada por el borde de la tarjeta. En el examen 2023 de
          // Económicas había expresiones de 541px en una pantalla de 375. Con
          // esto, la fórmula larga se scrollea sola en vez de perderse.
          // verticalAlign:bottom porque un contenedor de scroll alinea por su
          // borde inferior: sin esto las fórmulas cortas quedan montadas
          // sobre el renglón.
          //
          // overflowY:hidden es obligatorio, no decorativo: por spec, si un
          // eje deja de ser `visible` el otro pasa a `auto` solo, y cualquier
          // fracción (que es más alta que el renglón) se ganaba una barra de
          // scroll VERTICAL al lado. Se veía una rayita junto a cada 11/31.
          <span
            key={i}
            // El padding/margen que se cancelan es el truco clásico de KaTeX:
            // los vlist internos sobresalen unos 6px de la caja, y al volverse
            // contenedor de scroll eso se recortaba (se comía el techo de una
            // fracción o un exponente). El padding agranda la caja lo justo y
            // el margen negativo devuelve el espacio, así el renglón no se
            // separa.
            style={{
              whiteSpace: "nowrap", display: "inline-block", maxWidth: "100%",
              overflowX: "auto", overflowY: "hidden", verticalAlign: "bottom",
              paddingTop: 6, paddingBottom: 6, marginTop: -6, marginBottom: -6,
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
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

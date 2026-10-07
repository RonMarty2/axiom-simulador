"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MathText from "../components/MathText";
import Tex from "./Tex";
import type { Demo, Fusion as FusionDatos } from "./datos";

const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const boton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid var(--border, #d8d0c0)",
  background: "var(--bg-card)",
  color: "var(--fg-primary)",
  fontSize: 14,
  cursor: "pointer",
};

// Estilo de una parte de fraccion (numerador o denominador); marcada = resaltada.
function parteEstilo(marcada: boolean): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "0 6px",
    borderRadius: 8,
    background: marcada ? "var(--accent-soft)" : "transparent",
    boxShadow: marcada ? "0 0 0 2px var(--accent)" : "0 0 0 0 transparent",
    transition: "background 0.3s, box-shadow 0.3s",
  };
}

interface Leyenda {
  texto: string;
  porque?: string;
  regla?: string;
}

export type ModoRegla = "resolver" | "ensenar";

// modo "resolver" (ejercicio resuelto): la regla va dentro del "¿Por qué?".
// modo "ensenar" (leccion): la regla va destacada, en su propio recuadro.
export default function Fusion({ demo, modo = "resolver" }: { demo: Demo; modo?: ModoRegla }) {
  const total = demo.estados.length;
  const [idx, setIdx] = useState(0);
  const [leyenda, setLeyenda] = useState<Leyenda>({ texto: demo.intro });
  const [marcados, setMarcados] = useState<string[]>([]);
  const [nuevos, setNuevos] = useState<string[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [jugando, setJugando] = useState(false);

  const idxRef = useRef(0);
  const ocupadoRef = useRef(false);
  const cancelar = useRef(false);
  const celdas = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    cancelar.current = false;
    return () => {
      cancelar.current = true;
    };
  }, []);

  const factorTiempo = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1);

  // Las piezas marcadas se acercan al centro del grupo y se desvanecen.
  // Con `ancla`, el destino es esa ficha (que se queda) y al final late una vez.
  async function juntar(f: FusionDatos, k: number) {
    const els = f.desde.map((id) => celdas.current[id]).filter((e): e is HTMLElement => !!e);
    if (els.length === 0 || k === 0) return;
    if (f.modo === "tachar") {
      await Promise.all(
        els.map(async (el) => {
          el.style.position = "relative";
          const raya = document.createElement("span");
          raya.style.cssText =
            "position:absolute;left:-2px;top:50%;height:3px;width:0;border-radius:2px;background:var(--accent);transform:rotate(-14deg);transform-origin:left center;pointer-events:none";
          el.appendChild(raya);
          await animate(raya, { width: ["0%", "104%"] }, { duration: 0.6, ease: "easeOut" });
          await animate(el, { opacity: [1, 0], scale: [1, 0.8] }, { duration: 0.5, delay: 0.25 });
        })
      );
      return;
    }
    const rects = els.map((e) => e.getBoundingClientRect());
    const elAncla = f.ancla ? celdas.current[f.ancla] : null;
    const rAncla = elAncla?.getBoundingClientRect();
    const cx = rAncla
      ? rAncla.left + rAncla.width / 2
      : rects.reduce((s, r) => s + r.left + r.width / 2, 0) / rects.length;
    await Promise.all(
      els.map((el, j) => {
        const c = rects[j].left + rects[j].width / 2;
        return animate(
          el,
          { x: [0, cx - c, cx - c], scale: [1, 1, 0.5], opacity: [1, 1, 0] },
          { duration: 0.9, ease: "easeInOut", times: [0, 0.65, 1] }
        );
      })
    );
    if (elAncla) await animate(elAncla, { scale: [1, 1.3, 1] }, { duration: 0.45, ease: "easeOut" });
  }

  async function avanzar() {
    if (ocupadoRef.current || idxRef.current >= total - 1) return;
    ocupadoRef.current = true;
    setOcupado(true);
    const i = idxRef.current;
    const t = demo.transiciones[i];
    const k = factorTiempo();

    setNuevos([]);
    setLeyenda({ texto: t.texto, porque: t.porque, regla: t.regla });

    const marcas = [
      ...t.fusiones.flatMap((f) => (f.ancla ? [...f.desde, f.ancla] : f.desde)),
      ...(t.brotes ?? []).map((b) => b.desde),
      ...(t.resaltar ?? []),
    ];
    if (marcas.length > 0) {
      setMarcados(marcas);
      await esperar(1100 * k);
      await Promise.all(t.fusiones.map((f) => juntar(f, k)));
      setMarcados([]);
    } else {
      await esperar(500 * k);
    }
    // de donde sale cada brote (se mide antes de cambiar de estado)
    const origenes = (t.brotes ?? []).map((b) => ({
      hacia: b.hacia,
      rect: celdas.current[b.desde]?.getBoundingClientRect() ?? null,
    }));

    const antes = new Map(demo.estados[i].map((f) => [f.id, f.tex]));
    setNuevos(demo.estados[i + 1].filter((f) => antes.get(f.id) !== f.tex).map((f) => f.id));
    idxRef.current = i + 1;
    setIdx(i + 1);
    if (origenes.length > 0 && k > 0) {
      // esperar a que la ficha nueva exista en pantalla y hacerla viajar desde su origen
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      origenes.forEach(({ hacia, rect }) => {
        const el = celdas.current[hacia];
        if (!el || !rect) return;
        const nr = el.getBoundingClientRect();
        animate(
          el,
          {
            x: [rect.left + rect.width / 2 - (nr.left + nr.width / 2), 0],
            y: [rect.top + rect.height / 2 - (nr.top + nr.height / 2), 0],
            scale: [0.4, 1],
            opacity: [0, 1],
          },
          { duration: 0.9, ease: "easeOut" }
        );
      });
    }
    await esperar(1300 * k);

    ocupadoRef.current = false;
    setOcupado(false);
  }

  function irA(n: number) {
    if (ocupadoRef.current) return;
    idxRef.current = n;
    setIdx(n);
    setNuevos([]);
    setMarcados([]);
    setLeyenda(
      n === 0
        ? { texto: demo.intro }
        : { texto: demo.transiciones[n - 1].texto, porque: demo.transiciones[n - 1].porque, regla: demo.transiciones[n - 1].regla }
    );
  }

  async function reproducir() {
    if (ocupadoRef.current) return;
    if (idxRef.current >= total - 1) {
      irA(0);
      await esperar(500);
    }
    setJugando(true);
    while (idxRef.current < total - 1 && !cancelar.current) {
      await avanzar();
      if (!cancelar.current) await esperar(600);
    }
    setJugando(false);
  }

  const estado = demo.estados[idx];

  return (
    <div>
      <div
        style={{
          position: "relative",
          minHeight: 120,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(24px, 7vw, 36px)",
          padding: estado.some((f) => f.debajo) ? "18px 4px 44px" : "18px 4px",
          transition: "padding 0.3s",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {estado.map((f, pos) => {
            const prevSup = pos > 0 && !!estado[pos - 1].sup;
            const marcado = marcados.includes(f.id);
            const nuevo = nuevos.includes(f.id);
            return (
              <motion.span
                key={f.id}
                layout="position"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{
                  layout: { duration: 0.7, ease: [0.45, 0, 0.25, 1] },
                  opacity: { duration: 0.3, delay: 0.1 },
                  scale: { type: "spring", stiffness: 240, damping: 12, delay: 0.1 },
                }}
                style={
                  f.sup
                    ? {
                        display: "inline-block",
                        position: "relative",
                        top: "-0.75em",
                        fontSize: "0.7em",
                        margin: prevSup ? "0 0 0 2px" : "0 3px 0 -10px",
                      }
                    : f.salto
                      ? { display: "block", flexBasis: "100%", textAlign: "center", margin: "22px 0 0" }
                      : { display: "inline-block", position: "relative", margin: f.pegado ? "0 4px 0 -10px" : "0 4px" }
                }
              >
                <span
                  ref={(el) => {
                    celdas.current[f.id] = el;
                  }}
                  style={{
                    display: "inline-block",
                    padding: f.sup ? "0 5px" : "2px 8px",
                    borderRadius: f.sup ? 8 : 12,
                    background: marcado ? "var(--accent-soft)" : "transparent",
                    boxShadow: marcado ? "0 0 0 2px var(--accent)" : "0 0 0 0 transparent",
                    color: nuevo ? "var(--accent)" : f.op ? "var(--fg-muted, #7a7a7a)" : "inherit",
                    fontWeight: nuevo ? 700 : 400,
                    transition: "background 0.3s, box-shadow 0.3s, color 0.6s",
                  }}
                >
                  {f.frac ? (
                    // fraccion con sus dos partes como piezas propias: se puede
                    // señalar, copiar y mover el numerador o el denominador
                    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", fontSize: "0.85em" }}>
                      <span
                        ref={(el) => {
                          celdas.current[`${f.id}.n`] = el;
                        }}
                        style={parteEstilo(marcados.includes(`${f.id}.n`))}
                      >
                        <Tex tex={f.frac.n} />
                      </span>
                      <span style={{ alignSelf: "stretch", height: 2, background: "currentColor", margin: "1px 0", borderRadius: 1 }} />
                      <span
                        ref={(el) => {
                          celdas.current[`${f.id}.d`] = el;
                        }}
                        style={parteEstilo(marcados.includes(`${f.id}.d`))}
                      >
                        <Tex tex={f.frac.d} />
                      </span>
                    </span>
                  ) : (
                    <Tex tex={f.tex} />
                  )}
                </span>
                {f.debajo && (
                  // etiqueta debajo de la pieza: no cambia la altura de la fila (va en posicion absoluta)
                  <span
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "0.46em",
                      whiteSpace: "nowrap",
                      marginTop: 2,
                      lineHeight: 1.1,
                    }}
                  >
                    <Tex tex={f.debajo} />
                  </span>
                )}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>

      <div style={{ minHeight: 78, padding: "10px 12px", borderRadius: 10, background: "var(--bg-subtle)" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={leyenda.texto}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-primary)" }}>
              <MathText>{leyenda.texto}</MathText>
            </div>
            {leyenda.porque && (
              <div style={{ fontSize: 13.5, marginTop: 4, color: "var(--fg-muted, #6b6b6b)" }}>
                <strong>¿Por qué?</strong> <MathText>{leyenda.porque}</MathText>
                {modo === "resolver" && leyenda.regla && (
                  <>
                    {" "}
                    <span style={{ color: "var(--fg-primary)" }}>
                      Regla: <MathText>{leyenda.regla}</MathText>
                    </span>
                  </>
                )}
              </div>
            )}
            {modo === "ensenar" && leyenda.regla && (
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "var(--bg-card)",
                  border: "2px solid var(--accent, #9a3a1a)",
                  fontSize: 16,
                  color: "var(--fg-primary)",
                }}
              >
                <strong style={{ fontSize: 12.5, color: "var(--fg-muted, #6b6b6b)" }}>Regla clave:</strong>{" "}
                <MathText>{leyenda.regla}</MathText>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
        <button style={boton} disabled={ocupado || jugando || idx === 0} onClick={() => irA(idx - 1)}>
          Atrás
        </button>
        <button style={boton} disabled={ocupado || jugando || idx >= total - 1} onClick={() => void avanzar()}>
          Siguiente
        </button>
        <button
          style={{ ...boton, background: "var(--accent)", color: "var(--accent-fg)", border: "none" }}
          disabled={ocupado || jugando}
          onClick={() => void reproducir()}
        >
          Reproducir todo
        </button>
        <button style={boton} disabled={ocupado || jugando || idx === 0} onClick={() => irA(0)}>
          Reiniciar
        </button>
        <span style={{ fontSize: 13, color: "var(--fg-muted, #6b6b6b)" }}>
          Paso {idx + 1} de {total}
        </span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { LIENZO } from "./lienzo";

// ─────────────────────────────────────────────────────────────────────────────
// Bloques de contenido pedagógico — estética LIENZO (3Blue1Brown):
//   · Fondo claro, texto navy, acento violeta. UNA idea por bloque.
//   · Sin tarjetas de colores chillones ni emojis decorativos.
//   · Etiquetas tipográficas finas en lugar de banners.
//   · Tipografía matemática (Crimson) para fórmulas y ejemplos.
//
// La API (nombres y props) se mantiene IGUAL que la versión anterior para que
// las ~19 lecciones que ya la usan no se rompan: solo cambia cómo se ve.
// ─────────────────────────────────────────────────────────────────────────────

// Etiqueta pequeña en mayúsculas que encabeza un bloque, sin banner de color.
function Etiqueta({ children, color = LIENZO.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase",
      fontWeight: 700, color, marginBottom: 6,
    }}>
      {children}
    </div>
  );
}

// Bloque base: barra fina a la izquierda + contenido. Reemplaza las cards.
function Bloque({
  acento, fondo, children,
}: { acento: string; fondo?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      borderLeft: `3px solid ${acento}`,
      background: fondo ?? "transparent",
      borderRadius: fondo ? 8 : 0,
      padding: fondo ? "12px 16px" : "2px 0 2px 16px",
      color: LIENZO.fg,
    }}>
      {children}
    </div>
  );
}

export function Titulo({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h2 className="font-crimson" style={{
      fontSize: "clamp(24px, 4.5vw, 34px)", fontWeight: 600,
      color: accent ?? LIENZO.fg, margin: "0 0 4px",
      lineHeight: 1.18, letterSpacing: "-0.01em", textAlign: "left",
    }}>
      {children}
    </h2>
  );
}

export function Parrafo({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "clamp(16px, 2.1vw, 18px)", lineHeight: 1.6,
      color: LIENZO.fgDim, margin: 0, maxWidth: 600,
    }}>
      {children}
    </p>
  );
}

export function Definicion({ termino, children }: { termino: string; children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.accent} fondo={LIENZO.bgSoft}>
      <Etiqueta>Definición · {termino}</Etiqueta>
      <div style={{ fontSize: 16, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

// PUENTE · Conexión obligatoria con algo que el lector ya sabe 100% de
// memoria, antes de meter notación nueva. Ver BITÁCORA §4.5 regla 1 — todas
// las Láminas de Repaso arrancan con esto.
export function Puente({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.fgDim} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.fgDim}>Arrancamos de algo que ya sabés</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

export function PorQue({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.warn} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.warn}>¿Por qué funciona?</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim }}>{children}</div>
    </Bloque>
  );
}

export function Ejemplo({ titulo = "Ejemplo", children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 12,
      padding: "14px 18px", background: "transparent",
      fontFamily: "var(--font-crimson), serif", color: LIENZO.fg,
    }}>
      <Etiqueta>{titulo}</Etiqueta>
      <div style={{ fontSize: 17, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function Paso({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{
        flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
        background: LIENZO.accent, color: "#fff", fontSize: 13, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-atkinson), sans-serif",
      }}>{n}</span>
      <div style={{ flex: 1, fontSize: 15, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </div>
  );
}

export function Cuidado({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.bad} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.bad}>Cuidado · error común</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim }}>{children}</div>
    </Bloque>
  );
}

export function Resumen({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.ok} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.ok}>Para recordar</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

// Wrapper de una escena: pila vertical alineada a la izquierda, con aire.
export function EscenaRica({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18,
        width: "100%", maxWidth: 660, margin: "0 auto",
        padding: "8px 4px", color: LIENZO.fg,
      }}
    >
      {children}
    </motion.div>
  );
}

// Bloque de "Práctica final" con N preguntas estilo opción múltiple.
// Reutilizable para todas las lecciones (evita ~70 líneas duplicadas).
export function PracticaFinal({ ejercicios }: {
  ejercicios: { p: string; o: string[]; c: number; ex: string }[];
}) {
  const [resp, setResp] = React.useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejercicios[+k].c === v).length;
  return (
    <>
      <Titulo>Práctica final</Titulo>
      <Parrafo>{ejercicios.length} preguntas para fijar lo visto:</Parrafo>
      {ejercicios.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{
            background: "transparent", border: `1px solid ${LIENZO.fgFaint}`,
            borderRadius: 14, padding: 16, maxWidth: 620, width: "100%",
          }}>
            <div style={{ fontSize: 11, letterSpacing: 1.4, color: LIENZO.accent, fontWeight: 700, marginBottom: 8 }}>
              PREGUNTA {i + 1}
            </div>
            <div style={{ fontSize: 15, color: LIENZO.fg, fontWeight: 600, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c, isSel = sel === j;
                const borde = !rev ? LIENZO.fgFaint : isOk ? LIENZO.ok : isSel ? LIENZO.bad : LIENZO.fgFaint;
                return (
                  <button key={j}
                    onClick={() => !rev && setResp({ ...resp, [i]: j })}
                    disabled={rev}
                    style={{
                      padding: "10px 14px", textAlign: "left",
                      background: !rev ? "#fff" : isOk ? "#ecfdf5" : isSel ? "#fef2f2" : "#fff",
                      border: `1.5px solid ${borde}`, borderRadius: 10,
                      fontSize: 14, fontWeight: 600, color: LIENZO.fg,
                      cursor: rev ? "default" : "pointer", transition: "all 0.15s",
                    }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && (
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: sel === e.c ? "#ecfdf5" : "#fef2f2",
                borderRadius: 8, fontSize: 13, color: LIENZO.fg, lineHeight: 1.5,
              }}>
                <strong style={{ color: sel === e.c ? LIENZO.ok : LIENZO.bad }}>
                  {sel === e.c ? "¡Correcto!" : "Veamos:"}
                </strong>{" "}{e.ex}
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(resp).length === ejercicios.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: 18, background: LIENZO.bgSoft, border: `2px solid ${LIENZO.ok}`,
            borderRadius: 14, maxWidth: 620, width: "100%", textAlign: "center",
          }}>
          <div style={{ fontSize: 22, color: LIENZO.ok, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            {ok} / {ejercicios.length} correctas
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LecturaQuiz — específico para Razonamiento Verbal/Lógico
//
// Muestra un texto de lectura (a la izquierda o arriba) y un grupo de preguntas
// (cada una con opciones múltiples). Al elegir, revela inmediatamente cuál es
// la correcta y por qué (explicación pedagógica de cada respuesta).
//
// El alumno puede VOLVER A LEER el texto en cualquier momento mientras
// contesta — clave en comprensión lectora.
// ─────────────────────────────────────────────────────────────────────────────
export type PreguntaLectura = {
  p: string;
  o: string[];
  c: number;
  ex: string;
};

export function LecturaQuiz({
  titulo,
  texto,
  preguntas,
  numero,
}: {
  titulo: string;
  texto: React.ReactNode;
  preguntas: PreguntaLectura[];
  numero?: number;
}) {
  const [resp, setResp] = React.useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => preguntas[+k].c === v).length;
  const completo = Object.keys(resp).length === preguntas.length;
  return (
    <div style={{
      width: "100%", maxWidth: 720,
      display: "flex", flexDirection: "column", gap: 18,
    }}>
      {/* Texto de la lectura */}
      <div style={{
        background: LIENZO.bgSoft,
        border: `1px solid ${LIENZO.fgFaint}`,
        borderRadius: 14, padding: "16px 20px",
      }}>
        {numero !== undefined && (
          <div style={{ fontSize: 11, letterSpacing: 1.4, color: LIENZO.accent, fontWeight: 700, marginBottom: 4 }}>
            LECTURA {numero}
          </div>
        )}
        <div className="font-crimson" style={{
          fontSize: 18, fontWeight: 600, color: LIENZO.fg, marginBottom: 10, lineHeight: 1.25,
        }}>
          {titulo}
        </div>
        <div style={{
          fontSize: 15, color: LIENZO.fg, lineHeight: 1.7,
          textAlign: "justify",
        }}>
          {texto}
        </div>
      </div>

      {/* Preguntas */}
      {preguntas.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{
            border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 14,
            padding: 16, width: "100%",
          }}>
            <div style={{
              fontSize: 11, letterSpacing: 1.4, color: LIENZO.accent,
              fontWeight: 700, marginBottom: 8,
            }}>
              PREGUNTA {i + 1}
            </div>
            <div style={{
              fontSize: 15, color: LIENZO.fg, fontWeight: 600, marginBottom: 12, lineHeight: 1.4,
            }}>
              {e.p}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c, isSel = sel === j;
                const borde = !rev ? LIENZO.fgFaint : isOk ? LIENZO.ok : isSel ? LIENZO.bad : LIENZO.fgFaint;
                return (
                  <button key={j}
                    onClick={() => !rev && setResp({ ...resp, [i]: j })}
                    disabled={rev}
                    style={{
                      padding: "10px 14px", textAlign: "left",
                      background: !rev ? "#fff" : isOk ? "#ecfdf5" : isSel ? "#fef2f2" : "#fff",
                      border: `1.5px solid ${borde}`, borderRadius: 10,
                      fontSize: 14, fontWeight: 500, color: LIENZO.fg,
                      cursor: rev ? "default" : "pointer", transition: "all 0.15s",
                      lineHeight: 1.4,
                    }}>
                    <span style={{ fontWeight: 700, color: borde, marginRight: 6 }}>
                      {String.fromCharCode(97 + j)})
                    </span>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && (
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: sel === e.c ? "#ecfdf5" : "#fef2f2",
                borderRadius: 8, fontSize: 13, color: LIENZO.fg, lineHeight: 1.55,
              }}>
                <strong style={{ color: sel === e.c ? LIENZO.ok : LIENZO.bad }}>
                  {sel === e.c ? "¡Correcto!" : "No es esa."}
                </strong>{" "}{e.ex}
              </div>
            )}
          </div>
        );
      })}

      {completo && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: 16, background: LIENZO.bgSoft,
            border: `2px solid ${LIENZO.ok}`, borderRadius: 14, textAlign: "center",
          }}>
          <div style={{ fontSize: 20, color: LIENZO.ok, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            {ok} / {preguntas.length} correctas
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim, marginTop: 4 }}>
            {ok === preguntas.length && "¡Excelente comprensión!"}
            {ok < preguntas.length && ok >= preguntas.length * 0.6 && "Buen trabajo. Releé las que fallaste."}
            {ok < preguntas.length * 0.6 && "Volvé a leer el texto con atención y revisá las explicaciones."}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componentes pedagógicos para "upgrade didáctico" de lecciones.
// Pensados para que CUALQUIER lección pueda usarlos sin animaciones nuevas:
// dan profundidad pedagógica reusable.
// ─────────────────────────────────────────────────────────────────────────────

// HOOK · Abre una escena con una pregunta o escenario, no con una definición.
// Atrapa la atención antes de soltar teoría.
export function Hook({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.warn} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.warn}>Pensá esto</Etiqueta>
      <div style={{ fontSize: 17, lineHeight: 1.6, color: LIENZO.fg, fontStyle: "italic", fontFamily: "var(--font-crimson), serif" }}>
        {children}
      </div>
    </Bloque>
  );
}

// CASO BOLIVIA · Ejemplo concreto con datos del país (Bs, salario mínimo,
// situaciones reales). Conecta la teoría con el mundo que el estudiante conoce.
export function CasoBolivia({ titulo = "Caso Bolivia", children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <Bloque acento="#0ea5e9" fondo={LIENZO.bgSoft}>
      <Etiqueta color="#0ea5e9">{titulo}</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

// MISCONCEPTION · Ataca errores típicos. "Muchos estudiantes creen X, pero en
// realidad…" — invierte la confusión antes de que se forme.
export function Misconception({ titulo = "Confusión común", children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.bad} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.bad}>{titulo}</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim }}>{children}</div>
    </Bloque>
  );
}

// MNEMOTECNIA · Truco para memorizar (acrónimo, regla, asociación visual).
export function Mnemotecnia({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.accent} fondo={LIENZO.bgSoft}>
      <Etiqueta>Truco para recordar</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

// CONEXION · Vínculo explícito con otra lección. "Esto te va a servir cuando…".
export function Conexion({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      padding: "10px 14px",
      background: "transparent",
      borderTop: `1px dashed ${LIENZO.fgFaint}`,
      borderBottom: `1px dashed ${LIENZO.fgFaint}`,
      fontSize: 13, color: LIENZO.fgDim, fontStyle: "italic",
      display: "flex", gap: 8, alignItems: "center",
    }}>
      <span style={{ color: LIENZO.accent, fontWeight: 700 }}>→</span>
      <span>{children}</span>
    </div>
  );
}

// WORKED EXAMPLE · Caso resuelto paso a paso. A diferencia de Ejemplo (que
// solo muestra un caso), aquí se explicitan los pasos del razonamiento.
export function WorkedExample({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      border: `1.5px solid ${LIENZO.accent}`, borderRadius: 12,
      padding: "14px 18px",
      background: `${LIENZO.accent}08`,
      fontFamily: "var(--font-crimson), serif", color: LIENZO.fg,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: 1.4, color: LIENZO.accent,
        fontWeight: 700, marginBottom: 4,
      }}>
        Caso resuelto
      </div>
      <div style={{ fontSize: 16, color: LIENZO.fg, fontWeight: 600, marginBottom: 8 }}>
        {titulo}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

// MiniQuiz inline · Una pregunta corta en medio de la escena, para chequear
// comprensión antes de avanzar. Más liviano que AutoCheck, sin tantos adornos.
export function MiniQuiz({
  pregunta, opciones, correctaIdx, explicacion,
}: {
  pregunta: string;
  opciones: string[];
  correctaIdx: number;
  explicacion: string;
}) {
  const [elegida, setElegida] = React.useState<number | null>(null);
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      padding: "12px 16px",
      background: LIENZO.bgSoft,
      borderRadius: 10,
      borderLeft: `3px solid ${LIENZO.warn}`,
    }}>
      <div style={{ fontSize: 11, letterSpacing: 1.4, color: LIENZO.warn, fontWeight: 700, marginBottom: 6 }}>
        Mini-check rápido
      </div>
      <div style={{ fontSize: 14, color: LIENZO.fg, fontWeight: 600, marginBottom: 10 }}>{pregunta}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {opciones.map((op, i) => {
          const sel = elegida === i, reveal = elegida !== null, ok = i === correctaIdx;
          const borde = !reveal ? LIENZO.fgFaint : ok ? LIENZO.ok : sel ? LIENZO.bad : LIENZO.fgFaint;
          return (
            <button key={i}
              onClick={() => elegida === null && setElegida(i)}
              disabled={reveal}
              style={{
                padding: "8px 12px", textAlign: "left",
                background: !reveal ? "#fff" : ok ? "#ecfdf5" : sel ? "#fef2f2" : "#fff",
                border: `1.5px solid ${borde}`, borderRadius: 8,
                fontSize: 13, fontWeight: 500, color: LIENZO.fg,
                cursor: reveal ? "default" : "pointer",
              }}>
              {op}{reveal && ok && " ✓"}{reveal && sel && !ok && " ✗"}
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <div style={{
          marginTop: 8, padding: "8px 10px",
          background: elegida === correctaIdx ? "#ecfdf5" : "#fef2f2",
          borderRadius: 6, fontSize: 12, color: LIENZO.fgDim, lineHeight: 1.5,
        }}>
          {explicacion}
        </div>
      )}
    </div>
  );
}

// ─── importar las primitivas que usamos arriba (Bloque, Etiqueta) ────────────
// (Las definiciones de Bloque y Etiqueta están al principio de este archivo.)

// Mini-check interactivo al final de una escena.
export function AutoCheck({
  pregunta, opciones, correctaIdx, explicacion,
}: {
  pregunta: string;
  opciones: string[];
  correctaIdx: number;
  explicacion: string;
}) {
  const [elegida, setElegida] = React.useState<number | null>(null);

  return (
    <div style={{
      width: "100%", maxWidth: 620,
      background: LIENZO.bgSoft, borderRadius: 14, padding: 16,
      border: `1px solid ${LIENZO.fgFaint}`,
    }}>
      <Etiqueta>¿Lo entendiste?</Etiqueta>
      <div style={{ fontSize: 16, color: LIENZO.fg, fontWeight: 600, marginBottom: 12 }}>
        {pregunta}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opciones.map((op, i) => {
          const sel = elegida === i;
          const reveal = elegida !== null;
          const ok = i === correctaIdx;
          const borde = !reveal ? LIENZO.fgFaint : ok ? LIENZO.ok : sel ? LIENZO.bad : LIENZO.fgFaint;
          return (
            <button key={i}
              onClick={() => elegida === null && setElegida(i)}
              disabled={reveal}
              style={{
                padding: "10px 14px", textAlign: "left",
                background: !reveal ? "#fff" : ok ? "#ecfdf5" : sel ? "#fef2f2" : "#fff",
                border: `1.5px solid ${borde}`,
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: LIENZO.fg, cursor: reveal ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {op}
              {reveal && ok && <span style={{ marginLeft: 8, color: LIENZO.ok }}>✓</span>}
              {reveal && sel && !ok && <span style={{ marginLeft: 8, color: LIENZO.bad }}>✗</span>}
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <div style={{
          marginTop: 10, padding: "10px 12px",
          background: elegida === correctaIdx ? "#ecfdf5" : "#fef2f2",
          borderRadius: 8, fontSize: 13, color: LIENZO.fg, lineHeight: 1.5,
        }}>
          <strong style={{ color: elegida === correctaIdx ? LIENZO.ok : LIENZO.bad }}>
            {elegida === correctaIdx ? "¡Correcto!" : "No es esa."}
          </strong>{" "}
          {explicacion}
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import {
  VELOCIDADES_AUDIO,
  claveProgresoAudio,
  construirUrlAudio,
  formatearTiempoAudio,
  parsearProgresoAudio,
  type AudiolibroUnidad,
  type ProgresoAudio,
} from "@/lib/audio-medicina";
import { LIENZO } from "./lienzo";

const escuchasProgreso = new Set<() => void>();

function suscribirProgreso(callback: () => void): () => void {
  escuchasProgreso.add(callback);
  if (typeof window === "undefined") {
    return () => {
      escuchasProgreso.delete(callback);
    };
  }
  const onStorage = () => callback();
  window.addEventListener("storage", onStorage);
  return () => {
    escuchasProgreso.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function leerProgresoCrudo(clave: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(clave);
  } catch {
    return null;
  }
}

function escribirProgreso(clave: string, progreso: ProgresoAudio): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(clave, JSON.stringify(progreso));
    for (const cb of escuchasProgreso) cb();
  } catch {
    // Si localStorage no esta disponible, el reproductor sigue operando sin persistir.
  }
}

function IconoAuriculares({ tamano = 20 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2" y="13" width="4" height="7" rx="2" />
      <rect x="18" y="13" width="4" height="7" rx="2" />
    </svg>
  );
}

function IconoPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  );
}

function IconoPausa() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export default function ReproductorAudiolibro({
  audiolibro,
}: {
  audiolibro: AudiolibroUnidad;
}) {
  const clave = claveProgresoAudio(audiolibro.slug);
  const totalPistas = audiolibro.pistas.length;

  const progresoCrudo = useSyncExternalStore(
    suscribirProgreso,
    () => leerProgresoCrudo(clave),
    () => null,
  );
  const progresoGuardado = parsearProgresoAudio(progresoCrudo, totalPistas);
  const tieneRetoma =
    progresoGuardado !== null &&
    (progresoGuardado.pistaIdx > 0 || progresoGuardado.tiempo >= 1);

  const [abierto, setAbierto] = useState(false);
  const [pistaIdx, setPistaIdx] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [velocidad, setVelocidad] = useState<number>(1);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tiempoPendienteRef = useRef<number | null>(null);
  const autoPlayRef = useRef(false);
  const ultimoGuardadoRef = useRef(0);

  const guardar = useCallback(
    (idx: number, segs: number, vel: number) => {
      escribirProgreso(clave, {
        pistaIdx: idx,
        tiempo: Math.max(0, Math.floor(segs)),
        velocidad: vel,
      });
      ultimoGuardadoRef.current = Date.now();
    },
    [clave],
  );

  const pistaActual = audiolibro.pistas[pistaIdx] ?? audiolibro.pistas[0];
  const urlAudio = pistaActual ? construirUrlAudio(pistaActual.rutaRelativa) : null;

  function abrirReproductor() {
    if (progresoGuardado) {
      setPistaIdx(progresoGuardado.pistaIdx);
      setTiempo(progresoGuardado.tiempo);
      setVelocidad(progresoGuardado.velocidad);
      tiempoPendienteRef.current =
        progresoGuardado.tiempo > 0 ? progresoGuardado.tiempo : null;
    } else {
      tiempoPendienteRef.current = null;
    }
    setErrorAudio(false);
    setAbierto(true);
  }

  function cerrarReproductor() {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    guardar(pistaIdx, audio ? audio.currentTime : tiempo, velocidad);
    setReproduciendo(false);
    setAbierto(false);
  }

  function alternarReproduccion() {
    const audio = audioRef.current;
    if (!audio) return;
    setErrorAudio(false);
    if (audio.paused) {
      audio.playbackRate = velocidad;
      audio.play().catch(() => {
        setReproduciendo(false);
      });
    } else {
      audio.pause();
    }
  }

  function saltarSegundos(delta: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const limite =
      Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : Infinity;
    const nuevo = Math.max(0, Math.min(limite, audio.currentTime + delta));
    audio.currentTime = nuevo;
    setTiempo(nuevo);
    guardar(pistaIdx, nuevo, velocidad);
  }

  function cambiarPosicion(e: React.ChangeEvent<HTMLInputElement>) {
    const nuevo = Number(e.target.value);
    if (!Number.isFinite(nuevo)) return;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = nuevo;
    }
    setTiempo(nuevo);
    guardar(pistaIdx, nuevo, velocidad);
  }

  function cambiarVelocidad(nuevaVel: number) {
    setVelocidad(nuevaVel);
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = nuevaVel;
    }
    guardar(pistaIdx, audio ? audio.currentTime : tiempo, nuevaVel);
  }

  function seleccionarPista(idx: number) {
    if (idx === pistaIdx) {
      alternarReproduccion();
      return;
    }
    tiempoPendienteRef.current = null;
    autoPlayRef.current = true;
    setErrorAudio(false);
    setPistaIdx(idx);
    setTiempo(0);
    setDuracion(0);
    guardar(idx, 0, velocidad);
  }

  function reintentar() {
    setErrorAudio(false);
    const audio = audioRef.current;
    if (!audio) return;
    autoPlayRef.current = true;
    audio.load();
  }

  function manejarMetadatos() {
    const audio = audioRef.current;
    if (!audio) return;
    const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
    setDuracion(dur);
    audio.playbackRate = velocidad;

    if (tiempoPendienteRef.current !== null) {
      const objetivo =
        dur > 0
          ? Math.min(tiempoPendienteRef.current, Math.max(0, dur - 1))
          : tiempoPendienteRef.current;
      if (objetivo > 0) {
        audio.currentTime = objetivo;
        setTiempo(objetivo);
      }
      tiempoPendienteRef.current = null;
    }

    if (autoPlayRef.current) {
      autoPlayRef.current = false;
      audio.play().catch(() => {
        setReproduciendo(false);
      });
    }
  }

  function manejarAvanceTiempo() {
    const audio = audioRef.current;
    if (!audio) return;
    const actual = audio.currentTime;
    setTiempo(actual);
    if (Date.now() - ultimoGuardadoRef.current >= 3000) {
      guardar(pistaIdx, actual, velocidad);
    }
  }

  function manejarPausa() {
    setReproduciendo(false);
    const audio = audioRef.current;
    if (audio) {
      guardar(pistaIdx, audio.currentTime, velocidad);
    }
  }

  function manejarFin() {
    if (pistaIdx < totalPistas - 1) {
      const siguiente = pistaIdx + 1;
      tiempoPendienteRef.current = null;
      autoPlayRef.current = true;
      setErrorAudio(false);
      setPistaIdx(siguiente);
      setTiempo(0);
      setDuracion(0);
      guardar(siguiente, 0, velocidad);
    } else {
      setReproduciendo(false);
      guardar(pistaIdx, 0, velocidad);
    }
  }

  if (!pistaActual) return null;

  if (!abierto) {
    return (
      <section
        aria-label="Audiolibro de la lección"
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: LIENZO.bgSoft,
          border: `1px solid ${LIENZO.fgFaint}`,
          borderRadius: 14,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: "1 1 200px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "var(--accent-soft)",
              color: LIENZO.accent,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconoAuriculares tamano={20} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: LIENZO.accent,
              }}
            >
              Audiolibro · {totalPistas} {totalPistas === 1 ? "parte" : "partes"}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: LIENZO.fg,
                lineHeight: 1.3,
                overflowWrap: "anywhere",
              }}
            >
              {audiolibro.libro}
            </div>
            <div
              style={{
                fontSize: 13,
                color: LIENZO.fgDim,
                lineHeight: 1.35,
                overflowWrap: "anywhere",
              }}
            >
              {audiolibro.capitulo}
            </div>
            {tieneRetoma && progresoGuardado && (
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: LIENZO.ok,
                  marginTop: 2,
                }}
              >
                Retomar Parte {progresoGuardado.pistaIdx + 1} ·{" "}
                {formatearTiempoAudio(progresoGuardado.tiempo)}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={abrirReproductor}
          style={{
            minHeight: 44,
            padding: "0 18px",
            borderRadius: 999,
            border: "none",
            background: LIENZO.accent,
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <IconoPlay />
          <span>{tieneRetoma ? "Continuar" : "Escuchar"}</span>
        </button>
      </section>
    );
  }

  return (
    <section
      aria-label="Reproductor de audiolibro"
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: LIENZO.bgSoft,
        border: `1px solid ${LIENZO.fgFaint}`,
        borderRadius: 16,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: "1 1 200px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--accent-soft)",
              color: LIENZO.accent,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconoAuriculares tamano={19} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: LIENZO.accent,
                lineHeight: 1.25,
              }}
            >
              {audiolibro.libro}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: LIENZO.fg,
                lineHeight: 1.3,
                overflowWrap: "anywhere",
              }}
            >
              {audiolibro.capitulo}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={cerrarReproductor}
          style={{
            minHeight: 44,
            padding: "0 14px",
            borderRadius: 999,
            border: `1px solid ${LIENZO.fgFaint}`,
            background: LIENZO.bg,
            color: LIENZO.fgDim,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Ocultar
        </button>
      </div>

      {!urlAudio ? (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 12,
            background: LIENZO.bg,
            border: `1px solid ${LIENZO.fgFaint}`,
            fontSize: 14,
            color: LIENZO.fgDim,
            lineHeight: 1.5,
          }}
        >
          El audiolibro estará disponible muy pronto en esta lección.
        </div>
      ) : (
        <>
          <audio
            ref={audioRef}
            src={urlAudio}
            preload="metadata"
            onLoadedMetadata={manejarMetadatos}
            onTimeUpdate={manejarAvanceTiempo}
            onPlay={() => {
              setReproduciendo(true);
              setErrorAudio(false);
            }}
            onPause={manejarPausa}
            onEnded={manejarFin}
            onError={() => {
              setReproduciendo(false);
              setErrorAudio(true);
            }}
          />

          <div
            style={{
              background: LIENZO.bg,
              border: `1px solid ${LIENZO.fgFaint}`,
              borderRadius: 12,
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: LIENZO.fgDim,
                }}
              >
                Parte {pistaActual.numero} de {totalPistas}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: LIENZO.fg,
                  lineHeight: 1.35,
                  marginTop: 2,
                  overflowWrap: "anywhere",
                }}
              >
                {pistaActual.titulo}
              </div>
            </div>

            {errorAudio && (
              <div
                role="alert"
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: LIENZO.bgSoft,
                  border: `1px solid ${LIENZO.bad}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 13, color: LIENZO.fg, lineHeight: 1.4, flex: "1 1 180px" }}>
                  No se pudo cargar este audio. Comprueba tu conexión e inténtalo de nuevo.
                </span>
                <button
                  type="button"
                  onClick={reintentar}
                  style={{
                    minHeight: 44,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: `1px solid ${LIENZO.accent}`,
                    background: "transparent",
                    color: LIENZO.accent,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Reintentar
                </button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <input
                type="range"
                aria-label="Posición del audio"
                min={0}
                max={duracion > 0 ? duracion : 0}
                step={0.5}
                value={duracion > 0 ? Math.min(tiempo, duracion) : 0}
                onChange={cambiarPosicion}
                disabled={duracion <= 0}
                style={{
                  width: "100%",
                  height: 32,
                  margin: 0,
                  accentColor: LIENZO.accent,
                  cursor: duracion > 0 ? "pointer" : "default",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: LIENZO.fgDim,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span>{formatearTiempoAudio(tiempo)}</span>
                <span>{formatearTiempoAudio(duracion)}</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => saltarSegundos(-15)}
                aria-label="Retroceder 15 segundos"
                style={{
                  minHeight: 44,
                  minWidth: 52,
                  padding: "0 10px",
                  borderRadius: 999,
                  border: `1px solid ${LIENZO.fgFaint}`,
                  background: LIENZO.bgSoft,
                  color: LIENZO.fg,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                -15 s
              </button>

              <button
                type="button"
                onClick={alternarReproduccion}
                style={{
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: "none",
                  background: LIENZO.accent,
                  color: "#ffffff",
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
              >
                {reproduciendo ? <IconoPausa /> : <IconoPlay />}
                <span>{reproduciendo ? "Pausar" : "Reproducir"}</span>
              </button>

              <button
                type="button"
                onClick={() => saltarSegundos(15)}
                aria-label="Adelantar 15 segundos"
                style={{
                  minHeight: 44,
                  minWidth: 52,
                  padding: "0 10px",
                  borderRadius: 999,
                  border: `1px solid ${LIENZO.fgFaint}`,
                  background: LIENZO.bgSoft,
                  color: LIENZO.fg,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                +15 s
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
                paddingTop: 4,
                borderTop: `1px solid ${LIENZO.fgFaint}`,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: LIENZO.fgDim,
                  marginRight: 4,
                }}
              >
                Velocidad
              </span>
              {VELOCIDADES_AUDIO.map((vel) => {
                const activa = velocidad === vel;
                return (
                  <button
                    key={vel}
                    type="button"
                    aria-pressed={activa}
                    onClick={() => cambiarVelocidad(vel)}
                    style={{
                      minHeight: 44,
                      minWidth: 48,
                      padding: "0 10px",
                      borderRadius: 10,
                      border: `1px solid ${activa ? LIENZO.accent : LIENZO.fgFaint}`,
                      background: activa ? LIENZO.accent : LIENZO.bgSoft,
                      color: activa ? "#ffffff" : LIENZO.fg,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {vel}x
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: LIENZO.fgDim,
                marginBottom: 8,
              }}
            >
              Partes del capítulo ({totalPistas})
            </div>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {audiolibro.pistas.map((pista, idx) => {
                const esActiva = idx === pistaIdx;
                return (
                  <li key={pista.id}>
                    <button
                      type="button"
                      onClick={() => seleccionarPista(idx)}
                      aria-current={esActiva ? "true" : undefined}
                      style={{
                        width: "100%",
                        minHeight: 44,
                        boxSizing: "border-box",
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: `1px solid ${esActiva ? LIENZO.accent : LIENZO.fgFaint}`,
                        background: esActiva ? "var(--accent-soft)" : LIENZO.bg,
                        color: LIENZO.fg,
                        textAlign: "left",
                        whiteSpace: "normal",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          minWidth: 28,
                          height: 28,
                          borderRadius: 8,
                          background: esActiva ? LIENZO.accent : LIENZO.bgSoft,
                          color: esActiva ? "#ffffff" : LIENZO.fgDim,
                          fontSize: 12,
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(pista.numero).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          minWidth: 0,
                          fontSize: 14,
                          fontWeight: esActiva ? 700 : 500,
                          lineHeight: 1.35,
                          whiteSpace: "normal",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {pista.titulo}
                      </span>
                      {esActiva && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: LIENZO.accent,
                            flexShrink: 0,
                          }}
                        >
                          {reproduciendo ? "Sonando" : "Activa"}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </>
      )}
    </section>
  );
}

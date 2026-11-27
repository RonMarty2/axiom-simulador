"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { extraerSlugAprende, obtenerAudiolibro } from "@/lib/audio-medicina";
import {
  guardarEscenaLeccion,
  leerEscenaLeccion,
  limpiarEscenaLeccion,
  marcarLeccionCompletada,
} from "@/lib/axiom/progreso-lecciones";
import { LIENZO } from "./lienzo";
import ReproductorAudiolibro from "./ReproductorAudiolibro";

export type Escena = {
  titulo: string;
  componente: React.ComponentType;
};

export type LeccionShellProps = {
  unidad: string;
  tituloUnidad: string;
  escenas: Escena[];
};

// Shell de lección en estética LIENZO (idéntica a Potenciación): fondo claro,
// header/footer sticky con blur, barra de progreso violeta.
export default function LeccionShell({ unidad, tituloUnidad, escenas }: LeccionShellProps) {
  const [i, setI] = useState(0);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [escenaCargada, setEscenaCargada] = useState(false);
  const interactuoRef = useRef(false);
  const pathname = usePathname();
  const slug = extraerSlugAprende(pathname);
  const audiolibro = slug ? obtenerAudiolibro(slug) : null;
  const indiceSeguro = Math.max(0, Math.min(escenas.length - 1, i));
  const EscenaComp = escenas[indiceSeguro].componente;
  const progreso = ((indiceSeguro + 1) / escenas.length) * 100;
  const esUltima = indiceSeguro === escenas.length - 1;

  // Identifica al usuario activo y restaura su última escena vista de esta lección.
  useEffect(() => {
    let cancelado = false;
    const aplicarSesion = (uid: string | null) => {
      if (cancelado) return;
      setUsuarioId(uid);
      if (slug && !interactuoRef.current) {
        setI(leerEscenaLeccion(slug, escenas.length, uid));
      }
      setEscenaCargada(true);
    };
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => aplicarSesion(typeof d?.usuario?.id === "string" ? d.usuario.id : null))
      .catch(() => aplicarSesion(null));
    return () => { cancelado = true; };
  }, [slug, escenas.length]);

  // Persiste la escena actual y marca completada al llegar a la última.
  useEffect(() => {
    if (!escenaCargada || !slug) return;
    guardarEscenaLeccion(slug, indiceSeguro, escenas.length, usuarioId);
    if (esUltima) {
      marcarLeccionCompletada(slug, usuarioId);
    }
  }, [escenaCargada, slug, indiceSeguro, escenas.length, usuarioId, esUltima]);

  const irAnterior = () => {
    interactuoRef.current = true;
    setI((v) => Math.max(0, v - 1));
  };

  const irSiguiente = () => {
    interactuoRef.current = true;
    setI((v) => Math.min(escenas.length - 1, v + 1));
  };

  const finalizarLeccion = () => {
    if (!slug) return;
    marcarLeccionCompletada(slug, usuarioId);
    limpiarEscenaLeccion(slug, usuarioId);
  };

  return (
    <div style={{ minHeight: "100vh", background: LIENZO.bg, display: "flex", flexDirection: "column", color: LIENZO.fg }}>
      <header style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.85)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <Link href="/aprende" style={{ display: "inline-flex", alignItems: "center", gap: 5, minHeight: 44, color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Lecciones
        </Link>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: LIENZO.fgFaint, marginBottom: 2 }}>
            Unidad {unidad} · {tituloUnidad}
          </div>
          <div className="font-crimson" style={{ fontSize: 17, fontWeight: 500, color: LIENZO.fg, letterSpacing: "-0.01em" }}>
            {escenas[indiceSeguro].titulo}
          </div>
        </div>
        <div style={{ fontSize: 12, color: LIENZO.fgFaint, fontWeight: 500 }}>
          {indiceSeguro + 1} / {escenas.length}
        </div>
      </header>

      <div style={{ height: 2, background: `${LIENZO.fgFaint}33` }}>
        <motion.div
          style={{ height: "100%", background: LIENZO.accent }}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <main style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
        padding: "40px 20px 120px",
      }}>
        {audiolibro && (
          <div style={{ width: "100%", maxWidth: 720, marginBottom: 24 }}>
            <ReproductorAudiolibro key={audiolibro.slug} audiolibro={audiolibro} />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={indiceSeguro}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="ax-leccion-escena"
            style={{ width: "100%", maxWidth: 720 }}
          >
            <EscenaComp />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{
        padding: "14px clamp(14px, 3vw, 20px)",
        borderTop: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.92)", backdropFilter: "blur(12px)",
        display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap",
        position: "sticky", bottom: 0,
      }}>
        <button
          onClick={irAnterior}
          disabled={indiceSeguro === 0}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            minHeight: 44, padding: "10px 18px", background: "transparent",
            border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 999,
            color: indiceSeguro === 0 ? LIENZO.fgFaint : LIENZO.fg,
            fontSize: 14, fontWeight: 500,
            cursor: indiceSeguro === 0 ? "not-allowed" : "pointer", opacity: indiceSeguro === 0 ? 0.5 : 1,
          }}
        >
          ← Anterior
        </button>
        {!esUltima ? (
          <button
            onClick={irSiguiente}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              minHeight: 44, padding: "10px 24px", background: LIENZO.accent,
              border: "none", borderRadius: 999, color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}
          >
            Siguiente →
          </button>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <Link
              href="/aprende"
              onClick={finalizarLeccion}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minHeight: 44, padding: "10px 18px", background: "transparent",
                border: `1px solid ${LIENZO.ok}`, borderRadius: 999,
                color: LIENZO.ok, fontSize: 14, fontWeight: 700, textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              ✓ Terminar
            </Link>
            <Link
              href="/practicar"
              onClick={finalizarLeccion}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minHeight: 44, padding: "10px 20px", background: LIENZO.accent,
                borderRadius: 999, color: "#fff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Practicar preguntas →
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
}

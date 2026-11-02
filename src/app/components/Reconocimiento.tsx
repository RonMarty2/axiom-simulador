"use client";

import { useEffect, useRef } from "react";
import { textoRefuerzo, type DecisionRefuerzo } from "@/lib/refuerzo";

const TOTAL_PARTICULAS = 52;
const DURACION_PARTICULAS_MS = 1900;
const GRAVEDAD = 210; // px/s^2

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotacion: number;
  vRotacion: number;
  tipo: "circulo" | "tira";
  radio: number;
  ancho: number;
  alto: number;
  color: string;
}

function renderizarTextoConCifras(texto: string) {
  const partes = texto.split(/(\d+(?:\s*%)?)/g);
  return partes.map((parte, idx) => {
    if (/^\d+(?:\s*%)?$/.test(parte)) {
      return (
        <span
          key={idx}
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--accent-claro)",
            fontVariantNumeric: "lining-nums",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {parte}
        </span>
      );
    }
    return <span key={idx}>{parte}</span>;
  });
}

export default function Reconocimiento({
  decision,
}: {
  decision: DecisionRefuerzo | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!decision) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(rect.width, 280);
    const h = Math.max(rect.height, 76);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const estiloRaiz = getComputedStyle(document.documentElement);
    const estiloCanvas = getComputedStyle(canvas);
    const accentClaro =
      estiloCanvas.getPropertyValue("--accent-claro").trim() ||
      estiloRaiz.getPropertyValue("--accent-claro").trim() ||
      "white";

    const colores = ["white", accentClaro, "#fbbf24"];
    const particulas: Particula[] = [];

    for (let i = 0; i < TOTAL_PARTICULAS; i++) {
      const angulo = -Math.PI * (0.12 + (i / TOTAL_PARTICULAS) * 0.76) + (Math.random() - 0.5) * 0.35;
      const rapidez = 55 + Math.random() * 115;
      const origenX = w * (0.15 + Math.random() * 0.7);
      const origenY = h * (0.25 + Math.random() * 0.45);
      particulas.push({
        x: origenX,
        y: origenY,
        vx: Math.cos(angulo) * rapidez * 0.75,
        vy: Math.sin(angulo) * rapidez - 20,
        rotacion: Math.random() * Math.PI * 2,
        vRotacion: (Math.random() - 0.5) * 7,
        tipo: i % 2 === 0 ? "circulo" : "tira",
        radio: 2 + Math.random() * 2.2,
        ancho: 6 + Math.random() * 4,
        alto: 2.2 + Math.random() * 1.4,
        color: colores[i % colores.length],
      });
    }

    let inicio: number | null = null;
    let ultimo: number | null = null;
    let rafId = 0;

    const animar = (ts: number) => {
      if (inicio === null) inicio = ts;
      if (ultimo === null) ultimo = ts;
      const transcurrido = ts - inicio;
      const dt = Math.min((ts - ultimo) / 1000, 0.05);
      ultimo = ts;

      ctx.clearRect(0, 0, w, h);

      if (transcurrido >= DURACION_PARTICULAS_MS) {
        return;
      }

      const progreso = transcurrido / DURACION_PARTICULAS_MS;
      const alpha = Math.max(0, 1 - Math.pow(progreso, 1.35));

      for (const p of particulas) {
        p.vy += GRAVEDAD * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotacion += p.vRotacion * dt;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        if (p.tipo === "circulo") {
          ctx.beginPath();
          ctx.arc(0, 0, p.radio, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.rotate(p.rotacion);
          ctx.fillRect(-p.ancho / 2, -p.alto / 2, p.ancho, p.alto);
        }
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(animar);
    };

    rafId = window.requestAnimationFrame(animar);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [decision]);

  if (!decision) return null;

  const texto = textoRefuerzo(decision);

  return (
    <div
      className="ax-reconocimiento-bloque relative mx-auto mt-5 flex max-w-xl items-center gap-3.5 overflow-hidden px-4 py-3.5 text-left"
      style={{
        background: "var(--accent)",
        color: "white",
        borderRadius: "16px",
        boxShadow:
          "0 14px 40px color-mix(in srgb, var(--accent) 60%, transparent), inset 0 1px 0 rgba(255,255,255,.15)",
      }}
    >
      <style>{`
        @keyframes ax-reconocimiento-entrada {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.94);
          }
          65% {
            opacity: 1;
            transform: translateY(-2px) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes ax-reconocimiento-brillo {
          0% {
            transform: translateX(-130%) skewX(-18deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(230%) skewX(-18deg);
            opacity: 0;
          }
        }
        .ax-reconocimiento-bloque {
          animation: ax-reconocimiento-entrada 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1 both;
        }
        .ax-reconocimiento-brillo {
          animation: ax-reconocimiento-brillo 1.1s ease-out 1 forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .ax-reconocimiento-bloque {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .ax-reconocimiento-brillo {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>

      <div
        className="ax-reconocimiento-brillo pointer-events-none absolute inset-y-0 left-0 w-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      <div
        className="relative flex flex-shrink-0 items-center justify-center rounded-full"
        style={{
          width: "44px",
          height: "44px",
          background: "rgba(255, 255, 255, 0.14)",
          border: "1px solid rgba(255, 255, 255, 0.24)",
          zIndex: 3,
        }}
        aria-hidden="true"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p
        className="relative m-0 min-w-0 flex-1 text-sm font-medium leading-snug text-white sm:text-[15px]"
        style={{ zIndex: 3 }}
      >
        {renderizarTextoConCifras(texto)}
      </p>
    </div>
  );
}

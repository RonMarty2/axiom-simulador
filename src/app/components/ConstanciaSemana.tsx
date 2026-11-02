"use client";

import { ultimos7Dias } from "@/lib/constancia";
import { textoConstancia } from "@/lib/refuerzo";

export default function ConstanciaSemana({
  fechas,
  ahoraISO,
}: {
  fechas: string[];
  ahoraISO: string;
}) {
  const dias = ultimos7Dias(fechas, ahoraISO);
  const practicados = dias.filter((d) => d.practicado).length;
  const texto = textoConstancia(practicados);

  if (practicados === 0 || !texto) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "14px 16px",
      }}
    >
      <style>{`
        @keyframes ax-constancia-hoy-entrada {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }
          65% {
            opacity: 1;
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .ax-constancia-hoy {
          animation: ax-constancia-hoy-entrada 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1 both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ax-constancia-hoy {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: 13.5,
          fontWeight: 600,
          color: "var(--fg-primary)",
          fontVariantNumeric: "lining-nums",
        }}
      >
        {texto}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        {dias.map((d) => (
          <div
            key={d.dia}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              flex: "1 1 0",
              maxWidth: 34,
            }}
          >
            <div
              className={d.hoy ? "ax-constancia-hoy" : undefined}
              style={{
                width: "100%",
                maxWidth: 34,
                aspectRatio: "1 / 1",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: d.practicado ? "var(--accent)" : "var(--bg-subtle)",
                border: d.practicado ? "none" : "1px solid var(--border)",
                outline: d.hoy ? "2px solid var(--accent)" : undefined,
                outlineOffset: d.hoy ? 2 : undefined,
                color: "white",
              }}
              aria-label={`${d.letra} ${d.dia}${d.practicado ? " practicado" : ""}${d.hoy ? " hoy" : ""}`}
            >
              {d.practicado && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: d.hoy ? 700 : 600,
                color: d.hoy ? "var(--fg-primary)" : "var(--fg-muted)",
                lineHeight: 1,
              }}
            >
              {d.letra}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

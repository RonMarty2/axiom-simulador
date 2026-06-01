import { ImageResponse } from "next/og";

// Ícono generado dinámicamente con la marca AXIOM (rayo + fondo violeta).
// Next.js sirve este archivo en /icon.png automáticamente.

export const runtime = "edge";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 360,
          color: "white",
        }}
      >
        ⚡
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

// Ícono optimizado para iOS (Apple touch icon).
// iOS exige 180x180 sin esquinas redondeadas (las recorta el sistema).

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 130,
          color: "white",
        }}
      >
        ⚡
      </div>
    ),
    { ...size },
  );
}

import type { MetadataRoute } from "next";

// Manifest del PWA — describe cómo se "instala" la app en el celular.
// Next.js sirve esto automáticamente en /manifest.webmanifest

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AXIOM — Simulador UMSS",
    short_name: "AXIOM",
    description:
      "Simulador de exámenes y lecciones animadas para preparación de admisión universitaria en Bolivia (UMSS).",
    start_url: "/dashboard",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f2f2f0",
    theme_color: "#6366f1",
    lang: "es",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["education", "productivity"],
  };
}

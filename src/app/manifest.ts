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
    // Sin `scope`, el alcance sale de `start_url` y queda a interpretación del
    // navegador. Si alguno lo lee como "/dashboard", entonces /aprende,
    // /practicar y /laminas quedan FUERA de la app instalada, y al navegar ahí
    // Chrome abre una barra con la URL encima. Declararlo explícito lo cierra.
    scope: "/",
    display: "standalone",
    // OJO: acá vivía `display_override: ["standalone", "minimal-ui"]`, puesto
    // para "forzar vista app". Hacía justo lo contrario: `minimal-ui` ES una
    // ventana CON barra de direcciones, así que era permiso explícito para
    // mostrar la barra que se queria evitar. Si standalone no se puede, que
    // decida el navegador; no le ofrecemos una barra nosotros.
    display_override: ["standalone"],
    orientation: "portrait",
    background_color: "#faf7f0",
    theme_color: "#1a1f2e",
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

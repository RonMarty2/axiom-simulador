"use client";

import dynamic from "next/dynamic";

// Mafs pesa ~15 KB gzip: se baja recien cuando la escena se dibuja, no con la leccion
const GraficaFuncionDiferida = dynamic(() => import("./GraficaFuncion"), {
  ssr: false,
  loading: () => <div style={{ height: 280, width: "100%", maxWidth: 620 }} />,
});

export default GraficaFuncionDiferida;

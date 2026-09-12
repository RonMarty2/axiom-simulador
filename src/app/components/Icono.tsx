// Set de íconos de la app. Reemplaza a los emojis que se usaban como
// iconografía: cada emoji traía su propia paleta (rojo, amarillo, azul) y
// peleaba con la del producto, además de renderizarse distinto en cada
// sistema operativo. Estos heredan el color del texto con currentColor.

export type NombreIcono =
  | "inicio" | "aprende" | "laminas" | "practicar" | "examenes"
  | "errores" | "ranking" | "cuenta" | "flecha" | "rayo"
  | "alerta" | "candado" | "chevron";

const TRAZOS: Record<NombreIcono, React.ReactNode> = {
  inicio: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  aprende: (
    <>
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </>
  ),
  laminas: (
    <>
      <path d="M12 2 2 7l10 5 10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  practicar: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  examenes: <path d="M18 20V10M12 20V4M6 20v-6" />,
  errores: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  ranking: (
    <>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    </>
  ),
  cuenta: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </>
  ),
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  rayo: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  alerta: (
    <>
      <path d="M12 3 2 20h20z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  candado: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  chevron: <path d="M9 6l6 6-6 6" />,
};

export default function Icono({
  nombre,
  tamano = 20,
  grosor = 1.9,
}: {
  nombre: NombreIcono;
  tamano?: number;
  grosor?: number;
}) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {TRAZOS[nombre]}
    </svg>
  );
}

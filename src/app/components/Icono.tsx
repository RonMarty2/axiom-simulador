// Set de íconos de la app. Reemplaza a los emojis que se usaban como
// iconografía: cada emoji traía su propia paleta (rojo, amarillo, azul) y
// peleaba con la del producto, además de renderizarse distinto en cada
// sistema operativo. Estos heredan el color del texto con currentColor.

export type NombreIcono =
  | "inicio" | "aprende" | "laminas" | "practicar" | "examenes"
  | "errores" | "ranking" | "cuenta" | "flecha" | "rayo"
  | "alerta" | "candado" | "chevron"
  // Facultades. El emoji de cada una vive en Supabase, pero no lo usamos
  // para dibujar: se mapea por id con iconoFacultad() para que el set sea
  // consistente y no dependa de un dato editable desde la base.
  | "economicas" | "ingenieria" | "medicina" | "derecho"
  | "documento" | "chispa" | "grafico" | "birrete"
  | "mas" | "probeta" | "herramienta";

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

  economicas: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-6" />
      <path d="M19 7h-3.2M19 7v3.2" />
    </>
  ),
  // Engranaje de dientes, no un círculo con rayos: con rayos rectos se leía
  // como un sol / control de brillo, no como ingeniería.
  ingenieria: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    </>
  ),
  medicina: <path d="M9.5 2.5h5v7h7v5h-7v7h-5v-7h-7v-5h7z" />,
  derecho: (
    <>
      <path d="M12 3.2v17.6M8 20.8h8M4.6 6.8h14.8" />
      <path d="M4.6 6.8 2 13.2h5.2zM19.4 6.8l-2.6 6.4H22z" />
    </>
  ),
  documento: (
    <>
      <path d="M14 2.6H6.8a1.8 1.8 0 0 0-1.8 1.8v15.2a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V7.6z" />
      <path d="M14 2.6v5h5" />
      <path d="M8.6 12.6h6.8M8.6 16.6h4.8" />
    </>
  ),
  chispa: <path d="M12 2.6l2.3 6.1 6.1 2.3-6.1 2.3L12 19.4l-2.3-6.1L3.6 11l6.1-2.3z" />,
  grafico: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7.5 16.5v-4M12 16.5v-8M16.5 16.5v-5.5" />
    </>
  ),
  birrete: (
    <>
      <path d="M12 3 1.8 8.2 12 13.4l10.2-5.2z" />
      <path d="M6 10.6v5.2c0 1.7 2.7 3.1 6 3.1s6-1.4 6-3.1v-5.2" />
    </>
  ),
  mas: <path d="M12 5.2v13.6M5.2 12h13.6" />,
  probeta: (
    <>
      <path d="M9.4 2.8v7.1L4.3 18a2 2 0 0 0 1.7 3h12a2 2 0 0 0 1.7-3l-5.1-8.1V2.8" />
      <path d="M8.2 2.8h7.6M7 14.6h10" />
    </>
  ),
  herramienta: <path d="M14.5 6.2a4.6 4.6 0 0 0 6 6l-8.4 8.4a2.4 2.4 0 0 1-3.4-3.4z" />,
};

// Cada facultad a su ícono. Antes se leía facultad.emoji de Supabase, que es
// un campo editable: bastaba con que alguien cargara otro emoji para que la
// iconografía del producto cambiara sola y volviera a quedar despareja.
const ICONO_POR_FACULTAD: Record<string, NombreIcono> = {
  economicas: "economicas",
  ingenieria: "ingenieria",
  medicina: "medicina",
  derecho: "derecho",
};

export function iconoFacultad(id: string): NombreIcono {
  return ICONO_POR_FACULTAD[id] ?? "birrete";
}

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

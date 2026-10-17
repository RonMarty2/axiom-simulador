import Link from "next/link";
import { PESTANAS, type IdPestana } from "./pestanas";

// Barra de pestañas de la zona de pruebas (solo desarrollo; la pagina que la usa ya da 404 en produccion)
export default function PestanasDev({ actual }: { actual: IdPestana }) {
  return (
    <nav aria-label="Pruebas de desarrollo" style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
      {PESTANAS.map((p) => (
        <Link
          key={p.id}
          href={p.ruta}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 14,
            textDecoration: "none",
            border: "1px solid var(--border, #d8d0c0)",
            background: p.id === actual ? "var(--accent, #9a3a1a)" : "var(--bg-card)",
            color: p.id === actual ? "#fff" : "var(--fg-primary)",
          }}
        >
          {p.titulo}
        </Link>
      ))}
    </nav>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import AppHeader from "./AppHeader";
import { LEGAL, hayContacto } from "@/lib/legal";

// Estructura común de /terminos y /privacidad: una columna de lectura cómoda,
// con el título, la fecha de vigencia y las secciones numeradas.

export function LegalPagina({
  titulo,
  resumen,
  otra,
  children,
}: {
  titulo: string;
  resumen: string;
  otra: { href: string; texto: string };
  children: ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 className="font-crimson" style={{ fontSize: 38, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 8 }}>
          {titulo}
        </h1>
        <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 18 }}>
          Última actualización: {LEGAL.vigencia}
        </p>
        <p style={{
          fontSize: 16, lineHeight: 1.65, color: "var(--fg-secondary)", marginBottom: 32,
          padding: "16px 18px", background: "var(--bg-subtle)", borderRadius: 12, border: "1px solid var(--border)",
        }}>
          {resumen}
        </p>
        {children}
        <p style={{ marginTop: 40, fontSize: 14 }}>
          <Link href={otra.href} style={{ color: "var(--accent)", fontWeight: 700 }}>{otra.texto}</Link>
        </p>
      </main>
    </div>
  );
}

export function Seccion({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 30 }}>
      <h2 className="font-crimson" style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 10 }}>
        {n}. {titulo}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--fg-secondary)", display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </section>
  );
}

export function Lista({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

// El canal de contacto sale de src/lib/legal.ts. Si todavía no está
// configurado, se dice con todas las letras en vez de dejar la sección vacía.
export function Contacto() {
  if (!hayContacto()) {
    return (
      <p>
        El canal de contacto para estos temas se publica en esta sección. Todavía no está habilitado, y no
        se cobrará ningún pago hasta que lo esté.
      </p>
    );
  }
  return (
    <>
      {LEGAL.titular && <p>Responsable del servicio: <strong>{LEGAL.titular}</strong>, {LEGAL.ciudad}, {LEGAL.pais}.</p>}
      <Lista items={[
        LEGAL.correo && <>Correo: <strong>{LEGAL.correo}</strong></>,
        LEGAL.whatsapp && <>WhatsApp: <strong>{LEGAL.whatsapp}</strong></>,
      ].filter(Boolean) as ReactNode[]} />
    </>
  );
}

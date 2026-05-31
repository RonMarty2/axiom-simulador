import Link from "next/link";

type Unidad = {
  numero: string;
  titulo: string;
  lecciones: { slug?: string; titulo: string; tags?: string[] }[];
};

const UNIDADES: Unidad[] = [
  {
    numero: "01", titulo: "Los números naturales, enteros, racionales y reales",
    lecciones: [
      { titulo: "Operaciones fundamentales" },
      { titulo: "MCD y MCM" },
      { slug: "potenciacion", titulo: "Potenciación y sus propiedades", tags: ["✨ Animada"] },
      { titulo: "Radicación y propiedades" },
      { titulo: "Operaciones con radicales" },
    ],
  },
  { numero: "02", titulo: "La proporcionalidad", lecciones: [
    { titulo: "Razones y proporciones" },
    { titulo: "Regla de tres · Interés simple" },
    { titulo: "Repartos proporcionales" },
  ] },
  { numero: "03", titulo: "Conceptos fundamentales de Álgebra", lecciones: [
    { titulo: "Expresiones algebraicas" },
    { titulo: "Factorización" },
    { titulo: "MCD y MCM algebraicos" },
  ] },
  { numero: "04", titulo: "Funciones y gráficas", lecciones: [
    { titulo: "Función lineal y cuadrática" },
    { titulo: "Dominio, rango y gráfica" },
  ] },
  { numero: "05", titulo: "Ecuaciones de primer grado", lecciones: [{ titulo: "Resolución y problemas" }] },
  { numero: "06", titulo: "Sistemas de ecuaciones lineales", lecciones: [{ titulo: "Sistemas 2×2 y 3×3" }] },
  { numero: "07", titulo: "Potenciación y radicación", lecciones: [{ titulo: "Teoría de exponentes" }] },
  { numero: "08", titulo: "Ecuaciones de segundo grado", lecciones: [{ titulo: "Métodos de resolución" }] },
  { numero: "09", titulo: "Desigualdades", lecciones: [{ titulo: "Inecuaciones lineales y cuadráticas" }] },
  { numero: "10", titulo: "Logaritmación", lecciones: [{ titulo: "Propiedades y ecuaciones" }] },
  { numero: "11", titulo: "Sucesiones y series", lecciones: [{ titulo: "Progresiones aritméticas y geométricas" }] },
];

export default function AprendePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <header style={{
        padding: "20px 24px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)", backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Link href="/dashboard" style={{ color: "var(--fg-muted)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
            ← Volver
          </Link>
          <h1 className="font-crimson" style={{
            fontSize: 36, fontWeight: 800, color: "var(--fg-primary)",
            margin: "8px 0 4px",
          }}>
            Aprende paso a paso
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Contenido mínimo de matemáticas · FCE-UMSS
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {UNIDADES.map((u) => (
            <section key={u.numero} style={{
              background: "var(--bg-card)", borderRadius: 16,
              border: "1px solid var(--border)", padding: 20,
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
                <span style={{
                  fontSize: 12, fontWeight: 800, color: "var(--accent)",
                  background: "var(--bg-subtle)", padding: "4px 10px", borderRadius: 8,
                  letterSpacing: 1,
                }}>UNIDAD {u.numero}</span>
                <h2 className="font-crimson" style={{
                  fontSize: 20, fontWeight: 700, color: "var(--fg-primary)", margin: 0,
                }}>{u.titulo}</h2>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {u.lecciones.map((l, i) => (
                  <li key={i}>
                    {l.slug ? (
                      <Link href={`/aprende/${l.slug}`} style={leccionEstilo(true)}>
                        <span>{l.titulo}</span>
                        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {l.tags?.map((t) => (
                            <span key={t} style={tagEstilo}>{t}</span>
                          ))}
                          <span style={{ color: "var(--accent)", fontWeight: 700 }}>→</span>
                        </span>
                      </Link>
                    ) : (
                      <div style={leccionEstilo(false)}>
                        <span>{l.titulo}</span>
                        <span style={{ fontSize: 12, color: "var(--border)", fontWeight: 600 }}>próximamente</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

const leccionEstilo = (activa: boolean): React.CSSProperties => ({
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "12px 14px", borderRadius: 10,
  background: activa ? "var(--bg-base)" : "transparent",
  border: activa ? "1px solid var(--border)" : "1px dashed transparent",
  color: activa ? "var(--fg-primary)" : "var(--fg-muted)",
  textDecoration: "none", fontSize: 15, fontWeight: 600,
  cursor: activa ? "pointer" : "default",
  transition: "background 0.2s",
});

const tagEstilo: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--accent)",
  background: "rgba(99, 102, 241, 0.1)",
  padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5,
};

// Estado de carga compartido en toda la app. En vez de un spinner genérico,
// son las 4 opciones de una pregunta (A B C D) "iluminándose" una por una en
// bucle — como si se estuviera resolviendo un examen — para que incluso la
// pantalla de carga se sienta como AXIOM (simulador de examen), no como
// cualquier app.
export default function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <div style={{
      minHeight: "50vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16, padding: 40,
    }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["A", "B", "C", "D"].map((letra, i) => (
          <div
            key={letra}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              border: "2px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "var(--fg-muted)",
              animation: "ax-opcion-carga 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.18}s`,
            }}
          >
            {letra}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 500 }}>{texto}</div>
    </div>
  );
}

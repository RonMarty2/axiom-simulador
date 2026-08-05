// Estado de carga compartido — antes cada página tenía su propio texto plano
// "Cargando..." sin estilo (a veces con puntos suspensivos ASCII "...", a
// veces con el carácter "…", pegado arriba a la izquierda de la pantalla).
// Reemplaza todos esos casos por un spinner sobrio + texto centrado.
export default function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <div style={{
      minHeight: "50vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 14, padding: 40,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%",
        border: "3px solid var(--border)", borderTopColor: "var(--accent)",
        animation: "spin 0.7s linear infinite",
      }} />
      <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 500 }}>{texto}</div>
    </div>
  );
}

import Generador from "./Generador";

export const metadata = { title: "Prueba de animación", robots: { index: false, follow: false } };

const tarjeta: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border, #e4dccb)",
  borderRadius: 14,
  padding: 16,
  marginBottom: 20,
};

// Esta página muestra SOLO lo que Ronald todavía no revisó. Lo ya aprobado sigue en el código y
// en los tests, pero se quita de aquí para no repetirlo. Cuando él apruebe algo, se quita de esta lista.
//
// Ya aprobado (7-oct-2026): potencias, raíces (exactas y con resto), ecuación de primer grado,
// suma y resta de fracciones, diferencia de cuadrados, suma de logaritmos (por significado y por
// propiedad), los 6 ejemplos escritos a mano de `datos.ts` y los dos modos de la regla.
export default function Pagina() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 64px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Prueba de animación · por revisar</h1>
      <p style={{ fontSize: 14, marginBottom: 20, color: "var(--fg-muted, #6b6b6b)" }}>
        Solo aparece lo que falta revisar. Puedes <strong>cambiar los números</strong> y la animación se arma sola. Pulsa
        «Siguiente» o «Reproducir todo».
      </p>

      <section style={tarjeta}>
        <Generador tipo="cuadratica" titulo="Ecuación de segundo grado (fórmula general)" inicial={["1", "-5", "6"]} />
      </section>
    </main>
  );
}

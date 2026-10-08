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
        <Generador tipo="lineal" titulo="CAMBIÓ · Ecuación de primer grado (el número viaja y queda de denominador)" inicial={["3", "2", "11"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="cuadrados" titulo="CAMBIÓ · Diferencia de cuadrados (fórmula con letras, paréntesis y ecuaciones paso a paso)" inicial={["3"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="fracciones" titulo="CAMBIÓ · Suma de fracciones (una fracción por paso, el multiplicador nace del denominador)" inicial={["1", "2", "1", "3", "+"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="potencia" titulo="CAMBIÓ · Potencias (se ven los factores y la multiplicación se vuelve suma)" inicial={["2", "3", "4"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="raiz" titulo="CAMBIÓ · Raíces (la raíz se abre en piezas y el índice viaja)" inicial={["2", "5", "2"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="raizResto" titulo="CAMBIÓ · Raíz con factor (12 = 4·3, cuadrado perfecto marcado)" inicial={["2", "2", "2", "3"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="logaritmos" titulo="CAMBIÓ · Suma de logaritmos (exponente viaja, comprobación con pasos)" inicial={["2", "4", "8"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="cuadratica" titulo="CAMBIÓ · Ecuación de segundo grado (cada letra vuela de su etiqueta a la fórmula, comprobación con pasos)" inicial={["1", "-2", "4", "0", "3", "-2"]} />
      </section>
    </main>
  );
}

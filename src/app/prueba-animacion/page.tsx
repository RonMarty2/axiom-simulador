import Fusion from "./Fusion";
import Generador from "./Generador";
import { DEMOS } from "./datos";

export const metadata = { title: "Prueba de animación", robots: { index: false, follow: false } };

const tarjeta: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border, #e4dccb)",
  borderRadius: 14,
  padding: 16,
  marginBottom: 20,
};

export default function Pagina() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 64px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Prueba de animación · versión 3</h1>
      <p style={{ fontSize: 14, marginBottom: 20, color: "var(--fg-muted, #6b6b6b)" }}>
        Las piezas que se operan se marcan, se juntan y se funden en el resultado; debajo dice qué se hizo y por qué, con las
        fórmulas bien escritas. En los tres primeros cuadros puedes <strong>cambiar los números</strong> y la animación se
        arma sola. Pulsa «Siguiente» o «Reproducir todo».
      </p>

      <section style={tarjeta}>
        <Generador tipo="cuadratica" titulo="NUEVO · Ecuación de segundo grado (fórmula general)" inicial={["1", "-5", "6"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="lineal" titulo="Ecuación de primer grado: ax + b = c (elige tú los números)" inicial={["3", "2", "11"]} />
      </section>

      <section style={tarjeta}>
        <Generador tipo="fracciones" titulo="Suma y resta de fracciones" inicial={["1", "2", "1", "3", "+"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="cuadrados" titulo="Diferencia de cuadrados: x² − k² = 0" inicial={["3"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="logaritmos" titulo="Suma de logaritmos de igual base" inicial={["2", "4", "8"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="potencia" titulo="Potencias de la misma base (elige tú los números)" inicial={["2", "3", "2"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="raiz" titulo="Raíces de cualquier índice (elige tú los números)" inicial={["4", "2", "2"]} />
      </section>
      <section style={tarjeta}>
        <Generador tipo="raizResto" titulo="Raíz no exacta: parte exacta por un resto (√12 = 2√3)" inicial={["2", "2", "2", "3"]} />
      </section>

      {DEMOS.map((d) => (
        <section key={d.titulo} style={tarjeta}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 2px" }}>{d.titulo}</h2>
          <Fusion demo={d} />
        </section>
      ))}
    </main>
  );
}

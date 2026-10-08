import { readFileSync } from "node:fs";
import Generador from "./Generador";
import { huella } from "./huellas";

export const metadata = { title: "Prueba de animación", robots: { index: false, follow: false } };

const tarjeta: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border, #e4dccb)",
  borderRadius: 14,
  padding: 16,
  marginBottom: 20,
};

// Esta pagina muestra SOLO lo que Ronald todavia no aprobo. El visto bueno vive en
// data/registro-visto-bueno.json con la huella de lo aprobado: si el generador cambia, vuelve a aparecer.
// Se aprueba con: node src/app/prueba-animacion/aprobar-animacion.ts <id>  (solo cuando Ronald lo dice).
const TARJETAS = [
  { id: "lineal", tipo: "lineal", titulo: "CAMBIÓ · Ecuación de primer grado (el número viaja y queda de denominador)", inicial: ["3", "2", "11"] },
  { id: "cuadrados", tipo: "cuadrados", titulo: "CAMBIÓ · Diferencia de cuadrados (fórmula con letras, paréntesis y ecuaciones paso a paso)", inicial: ["3"] },
  { id: "fracciones", tipo: "fracciones", titulo: "CAMBIÓ · Suma de fracciones (una fracción por paso, el multiplicador nace del denominador)", inicial: ["1", "2", "1", "3", "+"] },
  { id: "potencia", tipo: "potencia", titulo: "CAMBIÓ · Potencias (se ven los factores y la multiplicación se vuelve suma)", inicial: ["2", "3", "4"] },
  { id: "raiz", tipo: "raiz", titulo: "CAMBIÓ · Raíces (la raíz se abre en piezas y el índice viaja)", inicial: ["2", "5", "2"] },
  { id: "raiz-con-resto", tipo: "raizResto", titulo: "CAMBIÓ · Raíz con factor (12 = 4·3, cuadrado perfecto marcado)", inicial: ["2", "2", "2", "3"] },
  { id: "logaritmos", tipo: "logaritmos", titulo: "CAMBIÓ · Suma de logaritmos (exponente viaja, comprobación con pasos)", inicial: ["2", "4", "8"] },
  { id: "cuadratica", tipo: "cuadratica", titulo: "CAMBIÓ · Ecuación de segundo grado (cada letra vuela de su etiqueta a la fórmula, comprobación con pasos)", inicial: ["1", "-2", "4", "0", "3", "-2"] },
  { id: "mruv", tipo: "mruv", titulo: "NUEVO · Física: MRUV (la velocidad se triplica, se halla la aceleración)", inicial: ["3", "200", "10"] },
  { id: "charles", tipo: "charles", titulo: "NUEVO · Física: gases, ley de Charles (°C pasa a kelvin, las unidades se tachan)", inicial: ["20", "-33", "27"] },
  { id: "moles-atomos", tipo: "molesAtomos", titulo: "NUEVO · Química: moles de átomos en un compuesto (la masa molar se arma a la vista)", inicial: ["C6H12O6", "O", "30"] },
  { id: "estequiometria", tipo: "estequiometria", titulo: "NUEVO · Química: estequiometría (gramos a gramos con factores que se tachan)", inicial: ["formacion-agua", "H2", "H2O", "8", "g"] },
];

export const dynamic = "force-dynamic";

export default function Pagina() {
  const vb: Record<string, { huella: string }> = JSON.parse(readFileSync(process.cwd() + "/data/registro-visto-bueno.json", "utf8")).generadores;
  const aprobadas = TARJETAS.filter((t) => vb[t.id]?.huella === huella(t.id));
  const pendientes = TARJETAS.filter((t) => !aprobadas.includes(t));
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 64px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Prueba de animación · por revisar</h1>
      <p style={{ fontSize: 14, marginBottom: 12, color: "var(--fg-muted, #6b6b6b)" }}>
        Solo aparece lo que falta aprobar. Puedes <strong>cambiar los números</strong> y la animación se arma sola. Pulsa
        «Siguiente» o «Reproducir todo».
      </p>
      <p style={{ fontSize: 14, marginBottom: 20 }}>
        <strong>{pendientes.length}</strong> por revisar · <strong>{aprobadas.length}</strong> aprobadas ✓
        {aprobadas.length > 0 && <span style={{ color: "var(--fg-muted, #6b6b6b)" }}> ({aprobadas.map((t) => t.titulo.split(" · ").pop()?.split(" (")[0]).join(", ")})</span>}
      </p>
      {pendientes.length === 0 && <p style={{ fontSize: 15 }}>Todo está aprobado.</p>}
      {pendientes.map((t) => (
        <section key={t.id} style={tarjeta}>
          <Generador tipo={t.tipo as never} titulo={t.titulo} inicial={t.inicial} />
        </section>
      ))}
    </main>
  );
}

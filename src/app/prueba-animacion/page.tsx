import { readFileSync } from "node:fs";
import { notFound } from "next/navigation";
import PestanasDev from "../pruebas/PestanasDev";
import Generador from "./Generador";
import { huellaVistoBueno } from "./huellas";
import type { Tipo } from "./construir";
import { leer as leerCambios } from "./revisar-pasos";
import { estadoDe, leerObservaciones } from "./cola";

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
const TARJETAS: { tipo: Tipo; titulo: string; inicial: string[] }[] = [
  { tipo: "lineal", titulo: "CAMBIÓ · Ecuación de primer grado (el número viaja y queda de denominador)", inicial: ["3", "2", "11"] },
  { tipo: "cuadrados", titulo: "CAMBIÓ · Diferencia de cuadrados (fórmula con letras, paréntesis y ecuaciones paso a paso)", inicial: ["3"] },
  { tipo: "fracciones", titulo: "CAMBIÓ · Suma de fracciones (una fracción por paso, el multiplicador nace del denominador)", inicial: ["1", "2", "1", "3", "+"] },
  { tipo: "potencia", titulo: "CAMBIÓ · Potencias (se ven los factores y la multiplicación se vuelve suma)", inicial: ["2", "3", "4"] },
  { tipo: "raiz", titulo: "CAMBIÓ · Raíces (la raíz se abre en piezas y el índice viaja)", inicial: ["2", "5", "2"] },
  { tipo: "raizResto", titulo: "CAMBIÓ · Raíz con factor (12 = 4·3, cuadrado perfecto marcado)", inicial: ["2", "2", "2", "3"] },
  { tipo: "logaritmos", titulo: "CAMBIÓ · Suma de logaritmos (exponente viaja, comprobación con pasos)", inicial: ["2", "4", "8"] },
  { tipo: "cuadratica", titulo: "CAMBIÓ · Ecuación de segundo grado (cada letra vuela de su etiqueta a la fórmula, comprobación con pasos)", inicial: ["1", "-2", "4", "0", "3", "-2"] },
  { tipo: "mruv", titulo: "NUEVO · Física: MRUV (la velocidad se triplica, se halla la aceleración)", inicial: ["3", "200", "10"] },
  { tipo: "charles", titulo: "NUEVO · Física: gases, ley de Charles (°C pasa a kelvin, las unidades se tachan)", inicial: ["20", "-33", "27"] },
  { tipo: "molesAtomos", titulo: "NUEVO · Química: moles de átomos en un compuesto (la masa molar se arma a la vista)", inicial: ["C6H12O6", "O", "30"] },
  { tipo: "estequiometria", titulo: "NUEVO · Química: estequiometría (gramos a gramos con factores que se tachan)", inicial: ["formacion-agua", "H2", "H2O", "8", "g"] },
];

export const dynamic = "force-dynamic";

export default function Pagina() {
  // herramienta de Ronald como desarrollador: en produccion la pagina no existe para nadie
  if (process.env.NODE_ENV !== "development") notFound();
  const vb: Record<string, { huella: string }> = JSON.parse(readFileSync(process.cwd() + "/data/registro-visto-bueno.json", "utf8")).generadores;
  // una animacion a la vez: la primera de la fila (las rehechas van al final). Ver cola.ts
  const obs = leerObservaciones();
  const estados = TARJETAS.map((t) => ({ t, e: estadoDe(t.tipo, obs, vb[t.tipo]?.huella === huellaVistoBueno(t.tipo)) }));
  const aprobadas = estados.filter((x) => x.e.estado === "aprobada");
  const enRehacer = estados.filter((x) => x.e.estado === "en-rehacer");
  const fila = estados.filter((x) => x.e.estado === "por-revisar").sort((x, y) => Number(x.e.rehecha) - Number(y.e.rehecha));
  const actual = fila[0];
  // pasos corregidos que Ronald debe mirar (data/cambios-por-revisar.json, se edita con revisar-pasos.ts)
  const registro = leerCambios();
  const cambiosDe = (tipo: string) => registro.cambios.filter((c) => c.tipo === tipo).map(({ caso, paso, nota }) => ({ caso, paso, nota }));
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 64px" }}>
      <PestanasDev actual="animaciones" />
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Prueba de animación</h1>
      <p style={{ fontSize: 14, marginBottom: 20 }}>
        {actual ? <strong>{fila.length === 1 ? "Última por revisar" : `1 de ${fila.length} por revisar`}</strong> : <strong>No queda nada por revisar</strong>} · {aprobadas.length} aprobadas ✓
        {enRehacer.length > 0 && <span> · {enRehacer.length} en rehacer</span>}
      </p>
      {!actual && <p style={{ fontSize: 15 }}>{enRehacer.length > 0 ? "Lo que queda está en rehacer: vuelve cuando la IA lo corrija." : "Todo está aprobado."}</p>}
      {actual && (
        <section key={actual.t.tipo} style={tarjeta}>
          <p style={{ fontSize: 13, margin: "0 0 8px", color: "var(--fg-muted, #6b6b6b)" }}>
            Pulsa <strong>«Aprobar toda la animación»</strong> cuando la hayas visto completa: queda aprobado el tipo entero. «Está bien hasta aquí» solo deja una marca parcial.
          </p>
          <Generador tipo={actual.t.tipo} titulo={actual.t.titulo} inicial={actual.e.siguiente ?? actual.t.inicial} aprobados={actual.e.aprobados} cambios={cambiosDe(actual.t.tipo)} dev />
        </section>
      )}
    </main>
  );
}

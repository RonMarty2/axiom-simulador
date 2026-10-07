"use client";

import { useMemo, useState } from "react";
import Fusion from "./Fusion";
import {
  potenciaProducto,
  raizConFactor,
  raizGeneral,
  validarPotencia,
  validarRaiz,
  type Base,
} from "./generadores";

type Tipo = "potencia" | "raiz" | "raizResto";

const campo: React.CSSProperties = {
  width: 64,
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid var(--border, #d8d0c0)",
  background: "var(--bg-card)",
  color: "var(--fg-primary)",
  fontSize: 15,
};
const etiqueta: React.CSSProperties = { fontSize: 13, color: "var(--fg-muted, #6b6b6b)", display: "flex", flexDirection: "column", gap: 2 };

function Numero({ nombre, valor, onCambio }: { nombre: string; valor: string; onCambio: (v: string) => void }) {
  return (
    <label style={etiqueta}>
      {nombre}
      <input style={campo} value={valor} inputMode="numeric" onChange={(e) => onCambio(e.target.value)} />
    </label>
  );
}

// Panel con campos para elegir los numeros: la animacion se arma sola para
// cualquier base, exponente e indice dentro de los limites.
export default function Generador({ tipo, titulo, inicial }: { tipo: Tipo; titulo: string; inicial: string[] }) {
  const [v, setV] = useState<string[]>(inicial);
  const set = (i: number) => (x: string) => setV((a) => a.map((y, j) => (j === i ? x : y)));

  const resultado = useMemo(() => {
    const base: Base = v[0].trim().toLowerCase() === "x" ? "x" : Number(v[0]);
    const n1 = Number(v[1]);
    const n2 = Number(v[2]);
    if (tipo === "potencia") {
      const e = validarPotencia(base, n1, n2);
      return e ? { error: e } : { demo: potenciaProducto(base, n1, n2).demo };
    }
    if (tipo === "raiz") {
      const e = validarRaiz(base, n1, n2);
      return e ? { error: e } : { demo: raizGeneral(base, n1, n2).demo };
    }
    // raizResto: base^exponente por un resto c, indice k
    const c = Number(v[3]);
    const e = validarRaiz(base, n1, n2);
    if (e) return { error: e };
    if (base === "x") return { error: "Aquí la base debe ser un número." };
    if (n1 % n2 !== 0) return { error: "Para este ejemplo el índice debe dividir al exponente (por ejemplo 2 y 2, o 3 y 6)." };
    if (!Number.isInteger(c) || c < 2 || c > 99) return { error: "El resto debe ser un entero entre 2 y 99." };
    return { demo: raizConFactor(base, n1, n2, c).demo };
  }, [tipo, v]);

  const rotulos =
    tipo === "potencia"
      ? ["Base (número o x)", "Primer exponente", "Segundo exponente"]
      : tipo === "raiz"
        ? ["Base (número o x)", "Exponente", "Índice de la raíz"]
        : ["Base", "Exponente", "Índice de la raíz", "Lo que sobra"];

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{titulo}</h2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        {rotulos.map((r, i) => (
          <Numero key={r} nombre={r} valor={v[i]} onCambio={set(i)} />
        ))}
      </div>
      {"error" in resultado && resultado.error ? (
        <p style={{ fontSize: 14, color: "var(--accent)" }}>{resultado.error}</p>
      ) : (
        "demo" in resultado && resultado.demo && <Fusion key={v.join("|")} demo={resultado.demo} />
      )}
    </div>
  );
}

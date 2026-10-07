"use client";

import { useMemo, useState } from "react";
import Fusion, { type ModoRegla } from "./Fusion";
import {
  potenciaProducto,
  raizConFactor,
  raizGeneral,
  validarPotencia,
  validarRaiz,
  type Base,
} from "./generadores";
import {
  diferenciaCuadrados,
  ecuacionLineal,
  fracciones,
  sumaLogaritmos,
  validarCuadrados,
  validarEcuacionLineal,
  validarFracciones,
  validarLogaritmos,
} from "./generadores-algebra";
import { cuadratica, validarCuadratica } from "./generadores-cuadratica";

type Tipo = "potencia" | "raiz" | "raizResto" | "lineal" | "fracciones" | "cuadrados" | "logaritmos" | "cuadratica";

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
  const [modo, setModo] = useState<ModoRegla>("resolver");
  const set = (i: number) => (x: string) => setV((a) => a.map((y, j) => (j === i ? x : y)));

  const resultado = useMemo(() => {
    if (tipo === "cuadratica") {
      const [a1, b1, c1, a2, b2, c2] = v.map(Number);
      const e = validarCuadratica(a1, b1, c1, a2, b2, c2);
      return e ? { error: e } : { demo: cuadratica(a1, b1, c1, a2, b2, c2).demo };
    }
    if (tipo === "fracciones") {
      const [n1, d1, n2, d2] = [Number(v[0]), Number(v[1]), Number(v[2]), Number(v[3])];
      const e = validarFracciones(n1, d1, n2, d2);
      return e ? { error: e } : { demo: fracciones(n1, d1, n2, d2, v[4].trim() === "-").demo };
    }
    if (tipo === "cuadrados") {
      const k = Number(v[0]);
      const e = validarCuadrados(k);
      return e ? { error: e } : { demo: diferenciaCuadrados(k).demo };
    }
    if (tipo === "logaritmos") {
      const [b, m, n] = [Number(v[0]), Number(v[1]), Number(v[2])];
      const e = validarLogaritmos(b, m, n);
      return e ? { error: e } : { demo: sumaLogaritmos(b, m, n).demo };
    }
    if (tipo === "lineal") {
      const [a, b, c] = [Number(v[0]), Number(v[1]), Number(v[2])];
      const e = validarEcuacionLineal(a, b, c);
      return e ? { error: e } : { demo: ecuacionLineal(a, b, c).demo };
    }
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
    tipo === "cuadratica"
      ? ["Lado izq.: x²", "Lado izq.: x", "Lado izq.: número", "Lado der.: x²", "Lado der.: x", "Lado der.: número"]
      : tipo === "fracciones"
      ? ["Numerador 1", "Denominador 1", "Numerador 2", "Denominador 2", "Operación (+ o -)"]
      : tipo === "cuadrados"
        ? ["Número al cuadrado (3 para x² − 9)"]
        : tipo === "logaritmos"
          ? ["Base", "Primer número", "Segundo número"]
          : tipo === "lineal"
      ? ["Lo que multiplica a x", "Lo que se suma (con su signo)", "Lado derecho"]
      : tipo === "potencia"
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
      <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", fontSize: 13 }}>
        <span style={{ color: "var(--fg-muted, #6b6b6b)" }}>Se usa para:</span>
        {(["resolver", "ensenar"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setModo(m)}
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              border: "1px solid var(--border, #d8d0c0)",
              background: modo === m ? "var(--accent, #9a3a1a)" : "var(--bg-card)",
              color: modo === m ? "#fff" : "var(--fg-primary)",
              cursor: "pointer",
            }}
          >
            {m === "resolver" ? "Resolver un ejercicio" : "Enseñar el tema"}
          </button>
        ))}
      </div>
      {"error" in resultado && resultado.error ? (
        <p style={{ fontSize: 14, color: "var(--accent)" }}>{resultado.error}</p>
      ) : (
        "demo" in resultado && resultado.demo && <Fusion key={v.join("|") + modo} demo={resultado.demo} modo={modo} />
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Fusion, { type ModoRegla } from "./Fusion";
import { construir, type Tipo } from "./construir";
import { CASOS_POR_TIPO } from "./casos";

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

function Numero({ nombre, valor, onCambio, texto }: { nombre: string; valor: string; onCambio: (v: string) => void; texto?: boolean }) {
  return (
    <label style={etiqueta}>
      {nombre}
      <input style={campo} value={valor} inputMode={texto ? "text" : "numeric"} onChange={(e) => onCambio(e.target.value)} />
    </label>
  );
}

// Panel con campos para elegir los numeros: la animacion se arma sola para
// cualquier base, exponente e indice dentro de los limites.
export interface CambioVista {
  caso: string;
  paso: number;
  nota: string;
}

export default function Generador({ tipo, titulo, inicial, cambios = [] }: { tipo: Tipo; titulo: string; inicial: string[]; cambios?: CambioVista[] }) {
  const [v, setV] = useState<string[]>(inicial);
  const [modo, setModo] = useState<ModoRegla>("resolver");
  // salto directo a un paso corregido: se arma el caso y se abre ya en ese paso (despues se sigue con Siguiente)
  const [salto, setSalto] = useState<{ paso: number; id: number } | null>(null);
  const set = (i: number) => (x: string) => setV((a) => a.map((y, j) => (j === i ? x : y)));

  const resultado = useMemo(() => construir(tipo, v), [tipo, v]);

  const rotulos =
    tipo === "mruv"
      ? ["Veces que aumenta la velocidad (3 = triplica)", "Distancia (m)", "Tiempo (s)"]
      : tipo === "charles"
        ? ["Volumen inicial", "Temperatura inicial (°C)", "Temperatura final (°C)"]
        : tipo === "molesAtomos"
          ? ["Compuesto (C6H12O6)", "Elemento (O)", "Masa (g)"]
          : tipo === "estequiometria"
            ? ["Reacción (formacion-agua)", "Sustancia dada (H2)", "Sustancia pedida (H2O)", "Masa (g)", "Pide (g o mol)"]
    : tipo === "cuadratica"
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
      {cambios.length > 0 && (
        <div style={{ marginBottom: 12, padding: "8px 10px", borderRadius: 10, background: "var(--accent-soft)", fontSize: 13 }}>
          <strong>Lo que cambió (toca para ir directo al paso):</strong>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
            {cambios.map((c) => (
              <button
                key={`${c.caso}-${c.paso}`}
                onClick={() => {
                  const caso = CASOS_POR_TIPO[tipo].find((x) => x.nombre === c.caso);
                  if (caso) setV(caso.v);
                  setSalto({ paso: c.paso - 1, id: Date.now() });
                }}
                style={{ textAlign: "left", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border, #d8d0c0)", background: "var(--bg-card)", color: "var(--fg-primary)", cursor: "pointer" }}
              >
                <strong>Paso {c.paso}</strong> · {c.caso}: {c.nota}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10, alignItems: "center", fontSize: 13 }}>
        <span style={{ color: "var(--fg-muted, #6b6b6b)" }}>Casos a mirar:</span>
        {CASOS_POR_TIPO[tipo].map((c) => {
          const activo = c.v.join("|") === v.join("|");
          return (
            <button
              key={c.nombre}
              onClick={() => {
                setSalto(null);
                setV(c.v);
              }}
              style={{
                padding: "3px 9px",
                borderRadius: 8,
                border: "1px solid var(--border, #d8d0c0)",
                background: activo ? "var(--accent-soft)" : "var(--bg-card)",
                boxShadow: activo ? "0 0 0 1px var(--accent)" : "none",
                color: "var(--fg-primary)",
                cursor: "pointer",
              }}
            >
              {c.nombre}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        {rotulos.map((r, i) => (
          <Numero key={r} nombre={r} valor={v[i]} onCambio={set(i)} texto={tipo === "molesAtomos" ? i < 2 : tipo === "estequiometria" ? i < 3 || i === 4 : false} />
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
        "demo" in resultado && resultado.demo && (
          <Fusion key={v.join("|") + modo + (salto?.id ?? "")} demo={resultado.demo} modo={modo} clave={tipo} paso={salto?.paso} />
        )
      )}
    </div>
  );
}

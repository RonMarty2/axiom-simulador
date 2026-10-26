"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fusion, { type ModoRegla } from "./Fusion";
import { construir, CON_RAPIDA, type Tipo } from "./construir";
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
// campos de texto (no numericos) de los tipos nuevos
const TEXTO: Partial<Record<Tipo, (i: number) => boolean>> = {
  molaridad: (i) => i === 0,
  oxidacion: () => true,
  trigonometria: (i) => i === 1 || i === 3,
  pitagoras: (i) => i === 0,
  punnett: () => true,
  interes: (i) => i === 3,
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

// Panel SOLO DE DESARROLLO (`dev` lo pasa la pagina y esta solo existe con NODE_ENV=development): Ronald aprueba o anota
// desde aqui en vez de escribirle a la IA. Guarda en data/observaciones-ronald.json via /api/dev/observaciones.
function PanelDev({ tipo, valores, paso, total }: { tipo: Tipo; valores: string[]; paso: number; total: number }) {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const [listo, setListo] = useState(false);
  // proteccion contra el doble clic: al aprobar, la pagina pasa a la siguiente animacion y su boton queda en el mismo lugar
  useEffect(() => {
    const t = setTimeout(() => setListo(true), 1500);
    return () => clearTimeout(t);
  }, []);
  const enviar = async (estado: "bien" | "nota", todo = false) => {
    try {
      const r = await fetch("/api/dev/observaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, valores, paso, totalPasos: total, estado, texto, total: todo }),
      });
      const j = await r.json();
      if (!r.ok) return setAviso(j.error ?? "no se guardo");
      setAviso(estado === "nota" ? `Guardado: nota en el paso ${paso}.` : todo || paso === total ? "Aprobada." : `Guardado: bien hasta el paso ${paso} (los anteriores tambien). Para aprobarla toda pulsa «Aprobar toda la animación» (o llega al último paso).`);
      if (estado === "nota") setTexto("");
      // la pagina vuelve a calcular la fila: si esta animacion quedo aprobada o en rehacer, aparece la siguiente
      router.refresh();
    } catch {
      setAviso("No se pudo guardar (¿esta corriendo npm run dev?).");
    }
  };
  const b: React.CSSProperties = { padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border, #d8d0c0)", background: "var(--bg-card)", color: "var(--fg-primary)", cursor: "pointer", fontSize: 13 };
  return (
    <div style={{ marginTop: 10, padding: 10, borderRadius: 10, border: "1px dashed var(--accent, #9a3a1a)", fontSize: 13 }}>
      <strong>Solo desarrollo · paso {paso} de {total}</strong>
      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
        <button style={{ ...b, background: "var(--accent, #9a3a1a)", color: "#fff" }} disabled={!listo} onClick={() => enviar("bien", true)}>
          Aprobar toda la animación
        </button>
        <button style={b} disabled={!listo} onClick={() => enviar("bien")}>
          Está bien hasta aquí
        </button>
      </div>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Observación para este paso…"
        rows={2}
        style={{ width: "100%", marginTop: 6, padding: 6, borderRadius: 8, border: "1px solid var(--border, #d8d0c0)", background: "var(--bg-card)", color: "var(--fg-primary)", fontSize: 13 }}
      />
      <button style={{ ...b, marginTop: 4 }} disabled={!listo} onClick={() => enviar("nota")}>
        Enviar observación
      </button>
      {aviso && <div style={{ marginTop: 6 }}>{aviso}</div>}
    </div>
  );
}

export default function Generador({ tipo, titulo, inicial, cambios = [], dev = false, aprobados = [] }: { tipo: Tipo; titulo: string; inicial: string[]; cambios?: CambioVista[]; dev?: boolean; aprobados?: string[] }) {
  const [v, setV] = useState<string[]>(inicial);
  const [pasoActual, setPasoActual] = useState(1);
  const [modo, setModo] = useState<ModoRegla>("resolver");
  // los tipos con version rapida abren en ella: es lo que se escribe en un examen
  const [rapida, setRapida] = useState(true);
  const tieneRapida = CON_RAPIDA.includes(tipo);
  // salto directo a un paso corregido: se arma el caso y se abre ya en ese paso (despues se sigue con Siguiente)
  const [salto, setSalto] = useState<{ paso: number; id: number } | null>(null);
  const set = (i: number) => (x: string) => setV((a) => a.map((y, j) => (j === i ? x : y)));

  const resultado = useMemo(() => construir(tipo, v, tieneRapida && rapida), [tipo, v, tieneRapida, rapida]);

  const rotulos =
    tipo === "dinamica"
      ? ["Masa (kg)", "Fuerza que empuja (N)", "Fuerza en contra, 0 si no hay (N)"]
      : tipo === "tiro"
        ? ["Altura (m)", "Velocidad horizontal (m/s)"]
        : tipo === "molaridad"
          ? ["Soluto (NaOH, KOH, H2SO4, HNO3, C6H12O6, C2H6O, NH3, ZnSO4)", "Masa de soluto (g)", "Volumen de solución (L)"]
          : tipo === "oxidacion"
            ? ["Compuesto (KMnO4)", "Elemento a hallar (Mn)"]
            : tipo === "trigonometria"
              ? ["Ángulo (30, 45 o 60)", "Lado conocido (op, ady o hip)", "Medida del lado conocido", "Lado buscado (op, ady o hip)"]
              : tipo === "progresion"
                ? ["Primer término a1", "Diferencia d", "Posición n del término"]
                : tipo === "pitagoras"
                  ? ["Se busca (hipotenusa o cateto)", "Hipotenusa o cateto 1 (cm)", "Cateto 2 o el conocido (cm)"]
                  : tipo === "punnett"
                    ? ["Genotipo del padre 1 (Aa)", "Genotipo del padre 2 (Aa)"]
                    : tipo === "interes"
                      ? ["Capital C (Bs)", "Tasa anual r (%)", "Tiempo t", "Unidad (años o meses)"]
                      : tipo === "mruv"
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
              {aprobados.includes(c.v.join("|")) ? "✓ " : ""}
              {c.nombre}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        {rotulos.map((r, i) => (
          <Numero key={r} nombre={r} valor={v[i]} onCambio={set(i)} texto={TEXTO[tipo]?.(i) ?? (tipo === "molesAtomos" ? i < 2 : tipo === "estequiometria" ? i < 3 || i === 4 : false)} />
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
        {tieneRapida && (
          <>
            <span style={{ color: "var(--fg-muted, #6b6b6b)", marginLeft: 10 }}>Pasos:</span>
            {([true, false] as const).map((r) => (
              <button
                key={String(r)}
                onClick={() => setRapida(r)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--border, #d8d0c0)",
                  background: rapida === r ? "var(--accent, #9a3a1a)" : "var(--bg-card)",
                  color: rapida === r ? "#fff" : "var(--fg-primary)",
                  cursor: "pointer",
                }}
              >
                {r ? "Rápida" : "Explicada"}
              </button>
            ))}
          </>
        )}
      </div>
      {"error" in resultado && resultado.error ? (
        <p style={{ fontSize: 14, color: "var(--accent)" }}>{resultado.error}</p>
      ) : (
        "demo" in resultado && resultado.demo && (
          <Fusion key={v.join("|") + modo + (tieneRapida && rapida ? "r" : "") + (salto?.id ?? "")} demo={resultado.demo} modo={modo} clave={tipo} paso={salto?.paso} onPaso={dev ? (i) => setPasoActual(i + 1) : undefined} />
        )
      )}
      {dev && "demo" in resultado && resultado.demo && <PanelDev tipo={tipo} valores={v} paso={pasoActual} total={resultado.demo.estados.length} />}
    </div>
  );
}

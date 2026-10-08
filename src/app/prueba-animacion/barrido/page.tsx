"use client";

// Barrido de ancho: dibuja QUIETO cada paso de cada caso dificil (casos.ts) en una columna de 343 px (un celular de 375)
// y mide si algo se sale. No recorre animaciones: es instantaneo. Se usa asi:
//   /prueba-animacion/barrido?tipo=lineal   (un tipo por vez; sin ?tipo= lista los tipos)
// El resultado queda en window.__barrido (lo lee la sesion de Claude con javascript_tool) y en pantalla.
import { useEffect, useMemo, useState } from "react";
import Fusion from "../Fusion";
import { construir, type Tipo } from "../construir";
import { CASOS_POR_TIPO } from "../casos";

const ANCHO = 343;

export default function Barrido() {
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [informe, setInforme] = useState<string[]>([]);
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tipo");
    if (t && t in CASOS_POR_TIPO) setTipo(t as Tipo);
  }, []);

  const armados = useMemo(() => (tipo ? CASOS_POR_TIPO[tipo].map((c) => ({ c, r: construir(tipo, c.v) })) : []), [tipo]);

  useEffect(() => {
    if (!tipo) return;
    const t = setTimeout(() => {
      const malos: string[] = [];
      document.querySelectorAll<HTMLElement>("[data-barrido]").forEach((el) => {
        const lim = el.getBoundingClientRect().right + 1;
        let peor = 0;
        // los trazos de un svg (el signo de raiz de KaTeX mide miles de px pero el svg los recorta) no cuentan
        const cuenta = (h: Element) => !(h instanceof SVGElement && h.tagName.toLowerCase() !== "svg");
        el.querySelectorAll("*").forEach((h) => {
          if (!cuenta(h)) return;
          const r = h.getBoundingClientRect();
          if (r.width && r.right - lim > peor) peor = r.right - lim;
        });
        const izq = el.getBoundingClientRect().left - 1;
        el.querySelectorAll("*").forEach((h) => {
          if (!cuenta(h)) return;
          const r = h.getBoundingClientRect();
          if (r.width && izq - r.left > peor) peor = izq - r.left;
        });
        if (peor > 0) malos.push(`${el.dataset.barrido}: se sale ${Math.round(peor)} px`);
      });
      (window as unknown as { __barrido: string[] }).__barrido = malos;
      setInforme(malos);
    }, 2500);
    return () => clearTimeout(t);
  }, [tipo, armados]);

  if (!tipo)
    return (
      <main style={{ padding: 16 }}>
        <p>Elige un tipo: {Object.keys(CASOS_POR_TIPO).map((t) => (<a key={t} href={`?tipo=${t}`} style={{ marginRight: 12 }}>{t}</a>))}</p>
      </main>
    );
  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ fontSize: 18 }}>Barrido de ancho ({ANCHO} px): {tipo}</h1>
      <p id="informe" style={{ fontSize: 14 }}>{informe.length === 0 ? "midiendo…" : `${informe.length} paso(s) se salen`}</p>
      {armados.map(({ c, r }) =>
        "demo" in r ? (
          r.demo.estados.map((_, k) => (
            <div key={c.nombre + k} data-barrido={`${tipo} / ${c.nombre} / paso ${k + 1}`} style={{ width: ANCHO, border: "1px dashed #ccc", marginBottom: 8, overflow: "visible" }}>
              <Fusion demo={r.demo} paso={k} />
            </div>
          ))
        ) : (
          <p key={c.nombre}>{c.nombre}: {r.error}</p>
        )
      )}
    </main>
  );
}

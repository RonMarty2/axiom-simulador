"use client";

// EDITOR DE FIGURAS — la herramienta para ajustar las figuras SIN tocar
// código: elegís la figura, arrastrás cualquier elemento con el mouse hasta
// que quede como el PDF, y guardás. Podés cargar el recorte del PDF al lado
// (o superpuesto) para comparar. Los ajustes se guardan en
// data/figuras-overrides.json y viajan a GitHub con SUBIR.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import { ElementoSVG, type AjustesFiguras, type AjusteElemento } from "../../components/FiguraExamen";
import { construirFigura } from "@/lib/figuras/definiciones";
import { elementoVisible, type Elemento } from "@/lib/figuras/motor";

const IDS = ["g5-paralelas", "g6-isosceles", "g7-cuadrado", "f10-plano", "f11-campo", "f12-circuito"];

function descripcionElemento(e: Elemento, i: number): string {
  const pasos = e.desdePaso !== undefined ? ` (paso ${e.desdePaso}+)` : "";
  if (e.tipo === "texto") return `#${i} texto "${e.texto}"${pasos}`;
  return `#${i} ${e.tipo} · ${e.rol}${pasos}`;
}

export default function EditorFigurasPage() {
  const router = useRouter();
  const [figuraId, setFiguraId] = useState(IDS[0]);
  const [paso, setPaso] = useState(0);
  const [ajustes, setAjustes] = useState<AjustesFiguras>({});
  const [drag, setDrag] = useState<{ i: number; px: number; py: number; dx0: number; dy0: number } | null>(null);
  const [guardado, setGuardado] = useState<string | null>(null);
  const [refImg, setRefImg] = useState<string | null>(null);
  const [superponer, setSuperponer] = useState(false);
  const [opacidad, setOpacidad] = useState(0.45);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) router.push("/login");
    });
    fetch("/api/figuras/overrides").then((r) => r.json()).then((d) => setAjustes(d ?? {})).catch(() => {});
  }, [router]);

  const escena = construirFigura(figuraId);
  if (!escena) return null;
  const deFigura = ajustes[figuraId] ?? {};

  const setAjuste = (i: number, cambio: Partial<AjusteElemento>) => {
    setAjustes((prev) => {
      const fig = { ...(prev[figuraId] ?? {}) };
      const actual = { ...(fig[String(i)] ?? {}) , ...cambio };
      if (!actual.oculto && !(actual.dx ?? 0) && !(actual.dy ?? 0)) delete fig[String(i)];
      else fig[String(i)] = actual;
      return { ...prev, [figuraId]: fig };
    });
    setGuardado(null);
  };

  const escala = () => {
    const rect = svgRef.current?.getBoundingClientRect();
    return rect ? escena.ancho / rect.width : 1;
  };

  const onMove = (ev: React.PointerEvent) => {
    if (!drag) return;
    const k = escala();
    setAjuste(drag.i, {
      dx: Math.round(drag.dx0 + (ev.clientX - drag.px) * k),
      dy: Math.round(drag.dy0 + (ev.clientY - drag.py) * k),
    });
  };

  const guardar = async () => {
    const r = await fetch("/api/figuras/overrides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ajustes),
    });
    const d = await r.json();
    setGuardado(r.ok ? "ok" : (d.error ?? "error"));
  };

  const cargarImagen = (f: File | undefined) => {
    if (!f) return;
    setRefImg(URL.createObjectURL(f));
  };

  const elementosAjustados = Object.keys(deFigura);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
        <Link href="/admin/banco" style={{ color: "var(--fg-muted)", fontSize: 14, textDecoration: "none" }}>← Volver al banco</Link>
        <h1 className="font-crimson" style={{ fontSize: 30, fontWeight: 800, color: "var(--fg-primary)", marginTop: 8, marginBottom: 4 }}>🎨 Editor de figuras</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 18, fontSize: 14 }}>
          Arrastrá cualquier elemento con el mouse hasta que quede igual al PDF. Cargá el recorte del PDF para compararlo al lado o superpuesto. Al guardar, los ajustes valen para todos los alumnos (subilos con SUBIR).
        </p>

        {/* Controles */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
          <select value={figuraId} onChange={(e) => { setFiguraId(e.target.value); setPaso(0); }}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--fg-primary)", fontWeight: 700 }}>
            {IDS.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
          {escena.pasos > 0 && (
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: escena.pasos + 1 }, (_, p) => (
                <button key={p} onClick={() => setPaso(p)}
                  style={{ padding: "6px 12px", borderRadius: 8, border: paso === p ? "2px solid var(--accent)" : "1px solid var(--border)", background: paso === p ? "rgba(99,102,241,0.1)" : "var(--bg-card)", color: "var(--fg-primary)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  {p === 0 ? "Enunciado" : `Paso ${p}`}
                </button>
              ))}
            </div>
          )}
          <label style={{ padding: "8px 12px", borderRadius: 8, border: "1px dashed var(--border)", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--fg-muted)" }}>
            📎 Cargar recorte del PDF
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => cargarImagen(e.target.files?.[0])} />
          </label>
          {refImg && (
            <>
              <button onClick={() => setSuperponer((s) => !s)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: superponer ? "rgba(99,102,241,0.15)" : "var(--bg-card)", color: "var(--fg-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                {superponer ? "👓 Superpuesto" : "◫ Lado a lado"}
              </button>
              {superponer && (
                <input type="range" min={0.1} max={0.9} step={0.05} value={opacidad} onChange={(e) => setOpacidad(parseFloat(e.target.value))} />
              )}
            </>
          )}
          <button onClick={guardar}
            style={{ marginLeft: "auto", padding: "9px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "white", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            {guardado === "ok" ? "✓ Guardado" : "💾 Guardar ajustes"}
          </button>
        </div>
        {guardado && guardado !== "ok" && (
          <div style={{ marginBottom: 12, padding: 10, borderRadius: 8, background: "rgba(220,38,38,0.08)", color: "#dc2626", fontSize: 13 }}>{guardado}</div>
        )}

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Lienzo */}
          <div style={{ flex: "1 1 560px", minWidth: 380 }}>
            <div style={{ position: "relative", background: "var(--bg-subtle)", borderRadius: 12, border: "1px solid var(--border)", padding: 10 }}>
              <svg
                ref={svgRef}
                viewBox={`0 0 ${escena.ancho} ${escena.alto}`}
                width="100%"
                fontFamily="var(--font-crimson), Georgia, serif"
                style={{ display: "block", touchAction: "none" }}
                onPointerMove={onMove}
                onPointerUp={() => setDrag(null)}
                onPointerLeave={() => setDrag(null)}
              >
                {escena.elementos.map((e, i) => {
                  if (!elementoVisible(e, paso)) return null;
                  const aj = deFigura[String(i)];
                  if (aj?.oculto) return null;
                  return (
                    <g
                      key={i}
                      transform={aj && (aj.dx || aj.dy) ? `translate(${aj.dx ?? 0} ${aj.dy ?? 0})` : undefined}
                      style={{ cursor: "move" }}
                      onPointerDown={(ev) => {
                        ev.preventDefault();
                        setDrag({ i, px: ev.clientX, py: ev.clientY, dx0: aj?.dx ?? 0, dy0: aj?.dy ?? 0 });
                      }}
                    >
                      {/* zona de agarre más generosa para textos chicos */}
                      {e.tipo === "texto" && <circle cx={e.en.x} cy={e.en.y} r={14} fill="transparent" />}
                      <ElementoSVG e={e} paso={paso} />
                      {drag?.i === i && e.tipo === "texto" && (
                        <circle cx={e.en.x} cy={e.en.y} r={16} fill="none" stroke="var(--accent)" strokeDasharray="3 3" />
                      )}
                    </g>
                  );
                })}
              </svg>
              {refImg && superponer && (
                <img src={refImg} alt="PDF" style={{ position: "absolute", inset: 10, width: "calc(100% - 20px)", height: "calc(100% - 20px)", objectFit: "contain", opacity: opacidad, pointerEvents: "none" }} />
              )}
            </div>
            {refImg && !superponer && (
              <div style={{ marginTop: 10, background: "white", borderRadius: 12, border: "1px solid var(--border)", padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: 6 }}>Recorte del PDF (referencia)</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={refImg} alt="PDF" style={{ maxWidth: "100%" }} />
              </div>
            )}
          </div>

          {/* Panel de elementos */}
          <div style={{ flex: "0 1 330px", minWidth: 280, background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 14, maxHeight: 520, overflowY: "auto" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: 8 }}>
              Elementos ({escena.elementos.length}) · ajustados: {elementosAjustados.length}
            </div>
            {escena.elementos.map((e, i) => {
              const aj = deFigura[String(i)];
              const visible = elementoVisible(e, paso);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 6px", borderRadius: 6, background: aj ? "rgba(99,102,241,0.08)" : "transparent", opacity: visible ? 1 : 0.4, fontSize: 12, color: "var(--fg-primary)" }}>
                  <input
                    type="checkbox"
                    checked={!aj?.oculto}
                    onChange={(ev) => setAjuste(i, { oculto: !ev.target.checked })}
                    title="Mostrar / ocultar"
                  />
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {descripcionElemento(e, i)}
                  </span>
                  {aj && (aj.dx || aj.dy) ? (
                    <span style={{ fontSize: 10, color: "var(--fg-muted)" }}>({aj.dx ?? 0},{aj.dy ?? 0})</span>
                  ) : null}
                  {aj && (
                    <button onClick={() => setAjuste(i, { dx: 0, dy: 0, oculto: false })}
                      style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--fg-muted)", fontSize: 12 }} title="Restaurar">
                      ↺
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

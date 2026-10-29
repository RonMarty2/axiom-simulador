"use client";

// Grafica de una funcion con Mafs (MIT, docs/repos/mafs.md). Se carga diferida desde GraficaFuncionDiferida
// para que su peso solo lo baje quien abre la escena. Colores de LIENZO (clase ax-mafs en globals.css):
// las variables de Mafs se declaran sobre .MafsView y le ganan a las del contenedor.
import "mafs/core.css";
import { Mafs, Coordinates, Plot, Point, Text } from "mafs";
import { LIENZO } from "./lienzo";

type Lado = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
export type PuntoMarcado = { x: number; y: number; texto: string; color?: string; lado?: Lado };

export default function GraficaFuncion({ f, x, y, puntos = [], alto = 280 }: {
  f: (x: number) => number;
  x: [number, number];
  y: [number, number];
  puntos?: PuntoMarcado[];
  alto?: number;
}) {
  return (
    <div className="ax-mafs" style={{ width: "100%", maxWidth: 620, borderRadius: 12, overflow: "hidden", border: `1px solid ${LIENZO.fgFaint}` }}>
      {/* sin pan ni zoom: en celular el dedo tiene que poder bajar la pagina sin mover la grafica */}
      <Mafs height={alto} viewBox={{ x, y, padding: 0 }} preserveAspectRatio={false} pan={false} zoom={false}>
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        <Plot.OfX y={f} color={LIENZO.accent} weight={3} />
        {puntos.map((p) => (
          <g key={p.texto}>
            <Point x={p.x} y={p.y} color={p.color ?? LIENZO.ok} />
            <Text x={p.x} y={p.y} attach={p.lado ?? "ne"} attachDistance={16} size={14} color={p.color ?? LIENZO.ok}>
              {p.texto}
            </Text>
          </g>
        ))}
      </Mafs>
    </div>
  );
}

// Calcula pesos/preguntas de la ficha «curso-basico» desde los exámenes reales de Medicina.
import fs from "fs";
import path from "path";
const dir = "data/examenes/umss/medicina";
const pesos = {}; const preg = []; let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const fm = t.split("---")[1];
  const total = (t.match(/^## Pregunta/gm) ?? []).length; // preguntas realmente cargadas
  const pond = fm.split("ponderacion:")[1]?.split("\n").slice(1);
  for (const l of pond) { const m = /^\s+(\w+):\s*([\d.]+)/.exec(l); if (!m) break; pesos[m[1]] = (pesos[m[1]] ?? 0) + Number(m[2]); }
  preg.push(total); n++;
}
const areas = Object.entries(pesos).map(([id, s]) => ({ id, peso: Math.round((s / n) * 1000) / 1000 }));
console.log(JSON.stringify({ n, preg, areas, preguntas: Math.round(preg.reduce((a, b) => a + b, 0) / n) }));

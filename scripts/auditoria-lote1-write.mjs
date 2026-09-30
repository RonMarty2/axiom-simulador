/**
 * Escribe resultados del Lote 1 en auditoria-ingenieria.md + .json
 */
import fs from "fs";

const results = {
  "2025-1op-2-2025.md": {
    visual_humano: "BLOQUEANTE",
    notas:
      "PDF 20 preg (2025-2-1op.pdf) vs MD 15. Faltan A1,A2,G6,G8,G9. Subconjunto renumerado (A3→P1…). Figuras PDF ausentes: G6 semicírculos, G8 hex+pent, G9 helicóptero, F13 cañón/tanque, F15 resorte. Sin Paso N en las 15. Nota útil en P15 (van’t Hoff). NO apto como facsímil completo.",
    pdf: "2025-2-1op.pdf",
    n_pdf: 20,
    n_md: 15,
    flags: ["incompleto", "sin-pasos", "figs-pdf-ausentes"],
  },
  "2025-2op-2-2025.md": {
    visual_humano: "BLOQUEANTE",
    notas:
      "PDF 2025-2-2op.pdf trae versión ~20 ítems + bloque bio. MD solo 13 (subconjunto). Faltan A3, A5, G8–G10, F14, Q20. Sin figura. Sin Paso N. No es el examen completo.",
    pdf: "2025-2-2op.pdf",
    n_pdf: 20,
    n_md: 13,
    flags: ["incompleto", "sin-pasos"],
  },
  "2025-2op-2-2025-version-b.md": {
    visual_humano: "FIX-CONTENIDO",
    notas:
      "Solo 4 preguntas bio (B17–B20 del PDF 2op). Fragmento de la versión B, no examen standalone. Listado confuso. Integrar o etiquetar como complemento.",
    pdf: "2025-2-2op.pdf (bloque B)",
    n_pdf: 4,
    n_md: 4,
    flags: ["fragmento", "listado-confuso"],
  },
  "2025-3op-1-2025.md": {
    visual_humano: "BLOQUEANTE",
    notas:
      "PDF 2025-1-3op.pdf = 20 preg. MD = 12 (salta A1–A3 y G5–G8). Faltan figuras G6/G8. P5 menciona figura sin campo. 11/12 sin Paso N.",
    pdf: "2025-1-3op.pdf",
    n_pdf: 20,
    n_md: 12,
    flags: ["incompleto", "sin-pasos", "fig-faltante"],
  },
  "2024-1op-1-2024.md": {
    visual_humano: "FIX-FIGURA",
    notas:
      "Cobertura OK 20/20 vs 2024-1-1op.pdf. P5 figura g5-semicirculo-cuartocirculo HUÉRFANA (PDF tiene semicírculo+cuarto sombreado). P5 → E) Ninguno coherente. P17–20 bio sin Paso N. Resto con pasos sólidos.",
    pdf: "2024-1-1op.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["fig-huerfana", "bio-sin-pasos"],
  },
  "2024-2op-1-2024.md": {
    visual_humano: "FIX-FIGURA",
    notas:
      "Cobertura OK 20/20 vs 2024-1-2op.pdf. 3 figuras huérfanas: P5 g5-cadena, P7 g7-cuadrilatero, P10 f10-polea. Pasos existen; sin dibujo el alumno no valida. P17–20 bio sin Paso N.",
    pdf: "2024-1-2op.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["fig-huerfana-x3", "bio-sin-pasos"],
  },
  "2023-1op-1-2023.md": {
    visual_humano: "OK-TEXTO",
    notas:
      "Mejor del lote. 20/20 vs 1-op-1-2023.pdf. 6 figuras CON motor: g5-paralelas, g6-isosceles, g7-cuadrado, f10-plano, f11-campo, f12-circuito. PDF confirma G5/G6/G7. Pasos P1–16 excelentes. P17–20 bio sin Paso N. Pendiente spot-check UI de SVG vs PDF.",
    pdf: "1-op-1-2023.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["figuras-motor-ok", "bio-sin-pasos", "spotcheck-ui"],
  },
  "2023-1op-2-2023.md": {
    visual_humano: "FIX-FIGURA",
    notas:
      "20/20 vs 2023-2-1op.pdf. 5 figuras huérfanas: g5-satelite, g6-secantes, f10-plano-cuadrado, f11-campo-electrico, f12-proyectil-rampa. MD tiene descripciones largas pero motor no renderiza. Pasos P1–16 bien. P17–20 bio sin pasos.",
    pdf: "2023-2-1op.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["fig-huerfana-x5", "bio-sin-pasos"],
  },
  "2023-2op-1-2023.md": {
    visual_humano: "BLOQUEANTE",
    notas:
      "20/20 stems vs 2-op-1-2023.pdf. PEOR del lote. 5 figuras huérfanas + VERIFICAR sin respuesta en P5/P6/P7/P9/P12. PDF nítido SÍ muestra topologías (semicírculos, 3 cuadrados, triángulo sombreado, vectores 30°, circuito 12V/5V). Engaña al estudiante. Fix: re-resolver + dibujar.",
    pdf: "2-op-1-2023.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["verificares-sin-respuesta", "fig-huerfana-x5", "bloques-pedagogicos"],
  },
  "2023-2op-2-2023.md": {
    visual_humano: "FIX-FIGURA",
    notas:
      "20/20 vs 2023-2-2op.pdf. 4 figuras huérfanas: g5-triangulo-cp-pb, f9-circuito-puente, f10-proyectil-energia, f11-moscas-sombras. Explicaciones con pasos y respuestas (no provisorias). P17–20 sin pasos.",
    pdf: "2023-2-2op.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["fig-huerfana-x4", "bio-sin-pasos"],
  },
  "2023-3op-1-2023.md": {
    visual_humano: "FIX-FIGURA",
    notas:
      "20/20 vs 3-op-1-2023.pdf. P8 g8-octogono-secantes huérfana + VERIFICAR. P5 y P7 mencionan figura sin campo. Respuestas P5/P7 sí calculadas. Revisar provis P14/P15.",
    pdf: "3-op-1-2023.pdf",
    n_pdf: 20,
    n_md: 20,
    flags: ["fig-huerfana", "menc-sin-campo", "verificares"],
  },
};

const jpath = "data/research/umss/auditoria-ingenieria.json";
const j = JSON.parse(fs.readFileSync(jpath, "utf8"));
j.lote1 = {
  closed: "2026-07-29",
  scope: "admision 2023-2025 (11 MD)",
  summary: {
    BLOQUEANTE: 4,
    "FIX-FIGURA": 5,
    "FIX-CONTENIDO": 1,
    "OK-TEXTO": 1,
    OK: 0,
  },
  hallazgo_clave:
    "Los 3 exámenes 2025 de ingreso principales están INCOMPLETOS vs PDF (15/20, 13/20, 12/20). 2023-2op-1 es el peor por VERIFICAR sin respuesta en 5 ítems con figura. 2023-1op-1 es el mejor (6 figuras motor).",
  results,
};
for (const e of j.exams) {
  if (results[e.file]) {
    e.visual_humano = results[e.file].visual_humano;
    e.notas = results[e.file].notas;
    e.pdf = results[e.file].pdf;
    e.flags = results[e.file].flags;
  }
}
fs.writeFileSync(jpath, JSON.stringify(j, null, 2));

const body = [];
body.push("---");
body.push("");
body.push("## 8. Lote 1 — Admisión 2023–2025 (cerrado 2026-07-29)");
body.push("");
body.push("Auditoría humana PDF ↔ MD. **Sin fixes de contenido todavía.**");
body.push("");
body.push("### Resumen semáforo");
body.push("");
body.push("| Semáforo | Cant | Archivos |");
body.push("|----------|-----:|----------|");
body.push("| BLOQUEANTE | 4 | 2025-1op-2, 2025-2op-2, 2025-3op-1, 2023-2op-1 |");
body.push(
  "| FIX-FIGURA | 5 | 2024-1op-1, 2024-2op-1, 2023-1op-2, 2023-2op-2, 2023-3op-1 |"
);
body.push("| FIX-CONTENIDO | 1 | 2025-2op-2-version-b (fragmento bio) |");
body.push("| OK-TEXTO | 1 | 2023-1op-1 (mejor del lote; 6 figuras motor) |");
body.push("| OK | 0 | — |");
body.push("");
body.push("### Hallazgo #1 — Exámenes 2025 incompletos (crítico)");
body.push("");
body.push(
  "Los facsímiles PDF de ingreso 2025 tienen **20 preguntas**. Los MD cargados tienen **15 / 13 / 12**. No es solo visual: **faltan ítems enteros** (sobre todo geometría con figura)."
);
body.push("");
body.push("| MD | PDF | MD | PDF | Faltantes notorios |");
body.push("|----|-----|---:|----:|--------------------|");
body.push(
  "| 2025-1op-2-2025.md | 2025-2-1op.pdf | 15 | 20 | A1, A2, G6 semicírculos, G8 hex+pent, G9 helicóptero |"
);
body.push(
  "| 2025-2op-2-2025.md | 2025-2-2op.pdf | 13 | ~20 | A3, A5, G8–G10, F14, Q20 |"
);
body.push(
  "| 2025-3op-1-2025.md | 2025-1-3op.pdf | 12 | 20 | A1–A3, G5–G8, Q16… |"
);
body.push("");
body.push(
  "Además todas las explicaciones 2025 van **corridas** (sin Paso N)."
);
body.push("");
body.push("### Hallazgo #2 — Figuras sin motor");
body.push("");
body.push(
  "- 2024: `g5-semicirculo-cuartocirculo`, `g5-cadena`, `g7-cuadrilatero`, `f10-polea`"
);
body.push(
  "- 2023-1op-2: `g5-satelite`, `g6-secantes`, `f10-plano-cuadrado`, `f11-campo-electrico`, `f12-proyectil-rampa`"
);
body.push(
  "- 2023-2op-1: `g5-semicircunferencias-cuadrado`, `g6-triangulo-tres-cuadrados`, `g7-triangulo-cuadrado-sombreado`, `f9-cuatro-vectores-circulo`, `f12-circuito-dos-fuentes`"
);
body.push(
  "- 2023-2op-2: `g5-triangulo-cp-pb`, `f9-circuito-puente`, `f10-proyectil-energia`, `f11-moscas-sombras`"
);
body.push("- 2023-3op-1: `g8-octogono-secantes`");
body.push("- **OK:** 2023-1op-1 tiene 6 figuras en motor");
body.push("");
body.push("### Hallazgo #3 — 2023-2op-1 con VERIFICAR sin respuesta");
body.push("");
body.push(
  "P5/P6/P7/P9/P12 sin letra confiable; el PDF sí tiene las figuras. Bloqueante pedagógico."
);
body.push("");
body.push("### Detalle por examen");
body.push("");
for (const [file, r] of Object.entries(results)) {
  body.push(`#### \`${file}\` → **${r.visual_humano}**`);
  body.push("");
  body.push(`- PDF: \`${r.pdf}\` (${r.n_pdf} PDF / ${r.n_md} MD)`);
  body.push(`- Flags: ${r.flags.join(", ")}`);
  body.push(`- ${r.notas}`);
  body.push("");
}
body.push("### Backlog de fix (cuando abramos sprint)");
body.push("");
body.push(
  "1. Completar los 3 MD 2025 desde PDF (20/20) + Paso N + figuras faltantes."
);
body.push(
  "2. Re-resolver 2023-2op-1 P5/P6/P7/P9/P12 + 5 figuras motor."
);
body.push(
  "3. Motor SVG para huérfanas 2023-1op-2, 2023-2op-2, 2024-*."
);
body.push("4. Spot-check UI de 2023-1op-1 (candidato a primer OK).");
body.push("5. Unificar version-b 2025 en el listado.");
body.push("");
body.push("### Próximo lote humano");
body.push("");
body.push("Lote 2: admisión **2022 → 2020**.");
body.push("");

const mdPath = "data/research/umss/auditoria-ingenieria.md";
const mdLines = fs.readFileSync(mdPath, "utf8").split(/\n/);

const patched = mdLines.map((line) => {
  for (const [file, r] of Object.entries(results)) {
    if (line.includes("`" + file + "`") && line.includes("| PENDIENTE |")) {
      const short = r.notas.slice(0, 100).replace(/\|/g, "/") + "…";
      return line.replace(
        "| PENDIENTE |  |",
        "| **" + r.visual_humano + "** | " + short + " |"
      );
    }
  }
  return line;
});

const patched2 = patched.map((line) => {
  for (const file of Object.keys(results)) {
    if (line.includes("- [ ] `" + file + "`")) {
      return line.replace("- [ ]", "- [x]");
    }
  }
  return line;
});

// Avoid duplicating section 8 if re-run
const base = patched2.join("\n").replace(/\n## 8\. Lote 1[\s\S]*$/, "\n");
fs.writeFileSync(mdPath, base.replace(/\n+$/, "\n") + "\n" + body.join("\n"));
console.log("OK lote1 written");
console.log(JSON.stringify(j.lote1.summary, null, 2));

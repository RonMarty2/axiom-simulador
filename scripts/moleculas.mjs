// Dibuja cada molecula de data/moleculas.json como SVG fijo en public/moleculas/<id>.svg (plan de mejoras 5.2).
// Con smiles-drawer (MIT) dentro de Chrome via Playwright: el navegador mide bien el texto de las etiquetas, jsdom no.
// Asi el celular del alumno recibe una imagen chica y no baja la libreria (59 KB).
//   node scripts/moleculas.mjs
// Local usa el Chrome instalado; si no hay, el Chromium de Playwright (npx playwright install chromium).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const { moleculas } = JSON.parse(readFileSync("data/moleculas.json", "utf8"));
mkdirSync("public/moleculas", { recursive: true });

// colores de LIENZO (bitacora §4): carbono y enlaces en tinta, O terracota, N verde; fondo transparente
const TEMA = {
  C: "#1a1f2e", O: "#9c3d1c", N: "#1e5f4f", H: "#1a1f2e", S: "#b45309", P: "#b45309",
  F: "#1e5f4f", CL: "#1e5f4f", BR: "#9c3d1c", I: "#5a6072", BACKGROUND: "transparent",
};

const navegador = await chromium.launch({ channel: process.env.CI ? undefined : "chrome" });
const pagina = await navegador.newPage();
await pagina.setContent("<!doctype html><html><body></body></html>");
await pagina.addScriptTag({ path: "node_modules/smiles-drawer/dist/smiles-drawer.min.js" });

for (const m of moleculas) {
  const svg = await pagina.evaluate(({ smiles, tema }) => new Promise((ok, mal) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    el.setAttribute("width", "320");
    el.setAttribute("height", "220");
    document.body.appendChild(el);
    const dib = new SmilesDrawer.SvgDrawer({ width: 320, height: 220, bondThickness: 1.4, fontSizeLarge: 13, fontSizeSmall: 9, padding: 14, themes: { lienzo: tema } });
    SmilesDrawer.parse(smiles, (arbol) => {
      dib.draw(arbol, el, "lienzo");
      ok(new XMLSerializer().serializeToString(el));
      el.remove();
    }, (e) => mal(String(e)));
  }), { smiles: m.smiles, tema: TEMA });
  writeFileSync(`public/moleculas/${m.id}.svg`, svg);
  console.log(`${m.id}: ${svg.length} bytes`);
}
await navegador.close();

// Barrido de TODOS los tipos de animacion con Chrome sin ventana (CDP, WebSocket nativo de Node 24).
// Mide, por cada paso de cada caso dificil, si algo se sale del ancho de un celular o si dos etiquetas se montan.
// Hace falta el servidor de desarrollo corriendo (npm run dev, puerto 3001). Uso:
//   node scripts/barrido.mjs            -> todos los tipos
//   node scripts/barrido.mjs lineal     -> solo uno
// Sale con codigo 1 si algo falla.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3001";
const TIPOS = ["potencia", "raiz", "raizResto", "lineal", "fracciones", "cuadrados", "logaritmos", "cuadratica", "mruv", "charles", "estequiometria", "molesAtomos"];
const args = process.argv.slice(2);
const iEval = args.indexOf("--eval");
const EXPR = iEval >= 0 ? args.splice(iEval, 2)[1] : null; // --eval "<js>": evalua en la pagina cargada y lo imprime (investigar)
const pedidos = args;
const aMedir = pedidos.length ? pedidos : TIPOS;

const CHROME = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("No encuentro Chrome: define la variable CHROME con su ruta");

const PUERTO = 9333;
const perfil = mkdtempSync(join(tmpdir(), "barrido-"));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PUERTO}`, `--user-data-dir=${perfil}`, "--window-size=400,900", "about:blank"], { stdio: "ignore" });
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function conectar() {
  for (let i = 0; i < 40; i++) {
    try {
      const lista = await (await fetch(`http://127.0.0.1:${PUERTO}/json`)).json();
      const pag = lista.find((t) => t.type === "page");
      if (pag) return pag.webSocketDebuggerUrl;
    } catch {}
    await dormir(250);
  }
  throw new Error("Chrome no abrio el puerto de depuracion");
}

const ws = new WebSocket(await conectar());
await new Promise((r) => (ws.onopen = r));
let n = 0;
const espera = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && espera.has(d.id)) espera.get(d.id)(d);
};
const cdp = (method, params = {}) =>
  new Promise((r) => {
    const id = ++n;
    espera.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluar = async (expresion) => (await cdp("Runtime.evaluate", { expression: expresion, returnByValue: true })).result?.result?.value;

await cdp("Page.enable");
await cdp("Emulation.setDeviceMetricsOverride", { width: 400, height: 900, deviceScaleFactor: 1, mobile: false });

let fallos = 0;
for (const tipo of aMedir) {
  await cdp("Page.navigate", { url: `${BASE}/prueba-animacion/barrido?tipo=${tipo}` });
  let r;
  for (let i = 0; i < 80 && r === undefined; i++) {
    await dormir(500);
    r = await evaluar("window.__barrido");
  }
  if (r === undefined) {
    console.log(`${tipo}: SIN RESULTADO (no cargo)`);
    fallos++;
    continue;
  }
  if (EXPR) console.log(JSON.stringify(await evaluar(EXPR), null, 1));
  const salen = r.filter((x) => x.includes("se sale"));
  const montadas = r.filter((x) => x.includes("montadas"));
  console.log(`${tipo}: ${salen.length} se salen, ${montadas.length} con etiquetas montadas`);
  for (const x of r) console.log("   " + x);
  fallos += r.length;
}
ws.close();
chrome.kill();
process.exit(fallos ? 1 : 0);

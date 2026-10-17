// Reproduce una animacion COMPLETA en /prueba-animacion con Chrome sin ventana y avisa si la pagina tira errores.
// Sirve para comprobar que un cambio en Fusion.tsx no rompio el movimiento (el barrido solo mide pasos quietos).
//   node scripts/reproducir.mjs                 -> la animacion que este primera en la fila de Ronald
//   SEGUNDOS=40 node scripts/reproducir.mjs     -> cuanto esperar (por defecto 30)
//   SALIDA=<archivo.png>                        -> captura final
// Hace falta el servidor de desarrollo (npm run dev, puerto 3001). Sale con codigo 1 si hubo errores de consola o de pagina.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3001";
const SEGUNDOS = Number(process.env.SEGUNDOS ?? 30);
const SALIDA = process.env.SALIDA ?? join(tmpdir(), "reproducir-final.png");
const CHROME = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("No encuentro Chrome: define la variable CHROME con su ruta");

const PUERTO = 9335;
const perfil = mkdtempSync(join(tmpdir(), "reproducir-"));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PUERTO}`, `--user-data-dir=${perfil}`, "--hide-scrollbars", "--window-size=420,1400", "about:blank"], { stdio: "ignore" });
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
const errores = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && espera.has(d.id)) espera.get(d.id)(d);
  if (d.method === "Runtime.exceptionThrown") errores.push("excepcion: " + (d.params.exceptionDetails?.exception?.description ?? d.params.exceptionDetails?.text));
  if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") errores.push("console.error: " + d.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300));
};
const cdp = (method, params = {}) =>
  new Promise((r) => {
    const id = ++n;
    espera.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluar = async (expresion) => (await cdp("Runtime.evaluate", { expression: expresion, returnByValue: true })).result?.result?.value;

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Emulation.setDeviceMetricsOverride", { width: 420, height: 1400, deviceScaleFactor: 1, mobile: false });
await cdp("Page.navigate", { url: `${BASE}/prueba-animacion` });
await dormir(4000);
const titulo = await evaluar("document.querySelector('h2')?.textContent ?? 'sin animacion'");
console.log(`Animacion: ${titulo}`);
const clic = await evaluar("(() => { const b = [...document.querySelectorAll('button')].find((x) => /Reproducir todo/.test(x.textContent)); if (!b) return false; b.click(); return true; })()");
if (!clic) {
  console.log("No encuentro el boton «Reproducir todo»");
  process.exit(1);
}
let ultimo = "";
for (let s = 0; s < SEGUNDOS; s++) {
  await dormir(1000);
  const paso = await evaluar("[...document.querySelectorAll('*')].map((e) => e.children.length === 0 ? e.textContent : '').find((t) => /^Paso \\d+ de \\d+$/.test(t.trim())) ?? ''");
  if (paso !== ultimo) {
    ultimo = paso;
    process.stdout.write(`  ${paso}\n`);
  }
  if (/^Paso (\d+) de \1$/.test(paso.trim())) break;
}
const shot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
writeFileSync(SALIDA, Buffer.from(shot.result.data, "base64"));
console.log(`Captura final: ${SALIDA}`);
console.log(errores.length ? `ERRORES (${errores.length}):\n  ` + [...new Set(errores)].join("\n  ") : "Sin errores de consola ni de pagina");
ws.close();
chrome.kill();
process.exit(errores.length ? 1 : 0);

// Capturas de las animaciones para que la IA (o Ronald) las MIRE, sin abrir el navegador a mano.
// Usa Chrome sin ventana (CDP, igual que barrido.mjs) y la pagina /prueba-animacion/barrido, que dibuja QUIETO cada paso
// de cada caso en una columna de 343 px (un celular de 375). Hace falta el servidor de desarrollo (npm run dev, puerto 3001).
//   node scripts/capturas.mjs                  -> todos los tipos
//   node scripts/capturas.mjs mruv lineal      -> solo esos
//   node scripts/capturas.mjs mruv --todos     -> TODOS los pasos (por defecto solo los representativos)
//   SALIDA=<carpeta> para cambiar donde se guardan (por defecto <tmp>/capturas-animacion)
// Pasos representativos de cada caso: el primero, el ultimo, los 2 mas altos, y los que llevan etiqueta debajo (d, t, base...).
// Deja un indice.txt con el nombre de cada imagen, su paso y su alto, para elegir cuales mirar.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3001";
const SALIDA = process.env.SALIDA ?? join(tmpdir(), "capturas-animacion");
const TIPOS = ["potencia", "raiz", "raizResto", "lineal", "fracciones", "cuadrados", "logaritmos", "cuadratica", "mruv", "charles", "estequiometria", "molesAtomos", "dinamica", "tiro", "molaridad", "oxidacion", "trigonometria", "progresion", "pitagoras", "punnett", "interes"];
const args = process.argv.slice(2);
const todos = args.includes("--todos");
const pedidos = args.filter((a) => !a.startsWith("--"));
const aCapturar = pedidos.length ? pedidos : TIPOS;

const CHROME = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("No encuentro Chrome: define la variable CHROME con su ruta");

mkdirSync(SALIDA, { recursive: true });
const PUERTO = 9334;
const perfil = mkdtempSync(join(tmpdir(), "capturas-"));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PUERTO}`, `--user-data-dir=${perfil}`, "--hide-scrollbars", "--window-size=400,900", "about:blank"], { stdio: "ignore" });
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

const indice = [];
for (const tipo of aCapturar) {
  await cdp("Page.navigate", { url: `${BASE}/prueba-animacion/barrido?tipo=${tipo}` });
  let listo;
  for (let i = 0; i < 80 && listo === undefined; i++) {
    await dormir(500);
    listo = await evaluar("window.__barrido");
  }
  if (listo === undefined) {
    console.log(`${tipo}: no cargo`);
    continue;
  }
  // una fila por paso: [nombre, alto, tieneEtiqueta, x, y(pagina), ancho]
  const pasos = await evaluar(`[...document.querySelectorAll('[data-barrido]')].map(e => { const r = e.getBoundingClientRect(); return [e.getAttribute('data-barrido'), Math.round(r.height), !!e.querySelector('[data-etiqueta]'), r.left + scrollX, r.top + scrollY, r.width]; })`);
  const porCaso = new Map();
  for (const p of pasos) {
    const caso = p[0].split(" / ").slice(0, 2).join(" / ");
    if (!porCaso.has(caso)) porCaso.set(caso, []);
    porCaso.get(caso).push(p);
  }
  let guardadas = 0;
  for (const [caso, lista] of porCaso) {
    const altos = [...lista].sort((a, b) => b[1] - a[1]).slice(0, 2);
    // PASOS=26,27,28 -> solo esos pasos (de los casos que se piden); sirve para mirar un tramo sin capturar todo
    const soloPasos = process.env.PASOS ? process.env.PASOS.split(",").map((x) => `paso ${x.trim()}`) : null;
    const elegidos = soloPasos ? lista.filter((p) => soloPasos.includes(p[0].split(" / ")[2])) : todos ? lista : lista.filter((p, i) => i === 0 || i === lista.length - 1 || altos.includes(p) || p[2]);
    // las etiquetas aparecen en muchos pasos seguidos: se queda con una de cada tres para no inundar
    let sinEtiquetaVista = 0;
    for (const p of elegidos) {
      if (!todos && p[2] && p !== lista[0] && p !== lista[lista.length - 1] && !altos.includes(p) && sinEtiquetaVista++ % 3 !== 0) continue;
      const paso = p[0].split(" / ")[2].replace("paso ", "");
      const nombre = `${tipo}-${caso.split(" / ")[1].replace(/[^a-zA-Z0-9]+/g, "_")}-p${String(paso).padStart(2, "0")}.png`;
      const shot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: Math.max(0, p[3] - 4), y: p[4] - 4, width: p[5] + 8, height: p[1] + 8, scale: 1 } });
      writeFileSync(join(SALIDA, nombre), Buffer.from(shot.result.data, "base64"));
      indice.push(`${nombre}\t${caso}\tpaso ${paso}\t${p[1]} px${p[2] ? "\tcon etiqueta" : ""}`);
      guardadas++;
    }
  }
  console.log(`${tipo}: ${guardadas} capturas de ${pasos.length} pasos`);
}
writeFileSync(join(SALIDA, "indice.txt"), indice.join("\n") + "\n");
console.log(`Capturas en ${SALIDA} (indice.txt dice cual es cual)`);
ws.close();
chrome.kill();
process.exit(0);

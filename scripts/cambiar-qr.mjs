// Cambia el QR de un método de pago sin tocar código.
//
//   node scripts/cambiar-qr.mjs <metodo> <imagen> [--monto 100 | --sin-monto] [--vence 2026-12-31 | --sin-vencimiento]
//
// Métodos: qr_bancario, binance_pay, redotpay.
// Copia la imagen a public/pagos/ y actualiza src/lib/pagos-qr.json.
// Si no pasas --monto ni --vence, se conserva lo que ya había; con --sin-monto
// o --sin-vencimiento se borra (QR que sirve para cualquier monto / no vence).
// Después: git add, commit y subir a main (o decirle a Claude que lo suba).

import { copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const raiz = process.cwd();
const jsonRuta = join(raiz, "src/lib/pagos-qr.json");
const datos = JSON.parse(readFileSync(jsonRuta, "utf8"));
const [metodo, imagen, ...flags] = process.argv.slice(2);

function salir(msg) {
  console.error(msg);
  process.exit(1);
}

if (!metodo || !(metodo in datos)) salir(`Método inválido. Usa uno de: ${Object.keys(datos).join(", ")}`);
if (!imagen || !existsSync(imagen)) salir(`No encuentro la imagen: ${imagen ?? "(falta)"}`);
const ext = extname(imagen).toLowerCase();
if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) salir("La imagen debe ser png, jpg o webp.");

const valorDe = (flag) => {
  const i = flags.indexOf(flag);
  return i === -1 ? undefined : flags[i + 1];
};
const actual = datos[metodo];
let { monto, vence } = actual;

if (flags.includes("--sin-monto")) monto = null;
if (valorDe("--monto") !== undefined) {
  monto = Number(valorDe("--monto"));
  if (!Number.isFinite(monto) || monto <= 0) salir("--monto debe ser un número mayor que 0.");
}
if (flags.includes("--sin-vencimiento")) vence = null;
if (valorDe("--vence") !== undefined) {
  vence = valorDe("--vence");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(vence)) salir("--vence va como AAAA-MM-DD.");
}

// El nombre lleva la fecha para que el navegador no muestre el QR viejo cacheado.
const nombreArchivo = `${metodo}-${new Date().toISOString().slice(0, 10)}-${Date.now() % 100000}${ext === ".jpeg" ? ".jpg" : ext}`;
copyFileSync(imagen, join(raiz, "public/pagos", nombreArchivo));
const vieja = join(raiz, "public", actual.imagen);
if (existsSync(vieja)) unlinkSync(vieja);
datos[metodo] = { imagen: `/pagos/${nombreArchivo}`, monto, vence };
writeFileSync(jsonRuta, JSON.stringify(datos, null, 2) + "\n");

console.log(`${metodo}: QR cambiado -> public/pagos/${nombreArchivo}`);
console.log(`  monto grabado: ${monto ?? "ninguno (sirve para cualquier monto)"}`);
console.log(`  vence: ${vence ?? "no vence"}`);

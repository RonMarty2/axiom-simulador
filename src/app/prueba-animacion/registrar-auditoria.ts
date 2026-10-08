// Anota en data/registro-auditoria-pasos.json el resultado de auditar un generador.
//   node src/app/prueba-animacion/registrar-auditoria.ts iniciar
//   node src/app/prueba-animacion/registrar-auditoria.ts <id> <auditado|con-hallazgos|pendiente> "nota" [--independiente]
// Al marcar un generador, se guarda la huella ACTUAL de su salida: si despues cambia, el test pide re-auditar.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { huella, IDS } from "./huellas.ts";

const RUTA = new URL("../../../data/registro-auditoria-pasos.json", import.meta.url);

interface Entrada {
  estado: "pendiente" | "con-hallazgos" | "auditado";
  huella: string | null;
  fecha: string | null;
  nota: string;
}
interface Registro {
  _nota: string;
  generadores: Record<string, Entrada>;
}

const NOTA =
  "Registro de auditoria de pasos (auditor-de-pasos). Un generador 'auditado' guarda la huella de su salida: si el codigo cambia, el test frena y hay que re-auditar. 'pendiente' = nunca auditado con las reglas actuales; 'con-hallazgos' = se audito y quedan saltos por arreglar. Se edita SOLO con registrar-auditoria.ts.";

const leer = (): Registro => (existsSync(RUTA) ? JSON.parse(readFileSync(RUTA, "utf8")) : { _nota: NOTA, generadores: {} });
const guardar = (r: Registro) => writeFileSync(RUTA, JSON.stringify(r, null, 2) + "\n");

const INDEPENDIENTE = process.argv.includes("--independiente");
const [, , a, estado, nota = ""] = process.argv.filter((x) => x !== "--independiente");
const reg = leer();
reg._nota = NOTA;

if (a === "iniciar") {
  for (const id of IDS) reg.generadores[id] ??= { estado: "pendiente", huella: null, fecha: null, nota: "" };
  guardar(reg);
  console.log(`registrados ${IDS.length} generadores`);
} else if (estado === "auditado" && !INDEPENDIENTE) {
  // el que arregla un generador no se audita a si mismo: `auditado` lo pone solo un auditor independiente
  console.error("`auditado` exige --independiente (lo pone un auditor que NO escribio el arreglo). Usa con-hallazgos.");
  process.exit(1);
} else if (a && IDS.includes(a) && ["pendiente", "con-hallazgos", "auditado"].includes(estado)) {
  reg.generadores[a] = {
    estado: estado as Entrada["estado"],
    huella: estado === "pendiente" ? null : huella(a),
    fecha: new Date().toISOString().slice(0, 10),
    nota,
  };
  guardar(reg);
  console.log(`${a}: ${estado} (huella ${reg.generadores[a].huella})`);
} else {
  console.error(`uso: iniciar | <${IDS.join("|")}> <auditado|con-hallazgos|pendiente> "nota"`);
  process.exit(1);
}

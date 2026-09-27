// Mantiene iguales `agentes/` y `.claude/agents/`.
//
// Claude Code lee los agentes de `.claude/agents/`, pero Synology Drive no
// sincroniza carpetas que empiezan con punto: entre la PC y la laptop los
// agentes no viajaban. `agentes/` es visible, así que viaja por Synology y por
// git, y este script la copia adonde Claude Code la lee.
//
// Corre solo en `npm install` (ACTUALIZAR.bat), en `npm run dev` (INICIAR.bat)
// y al abrir una sesión de Claude Code (hook en .claude/settings.json).
//
// Por archivo gana el más nuevo, así una edición hecha directo en
// `.claude/agents/` tampoco se pierde. Nunca borra: para sacar un agente hay
// que borrarlo de las dos carpetas. Nunca falla: un error acá no puede frenar
// un install, un build de Vercel ni el arranque de la app.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, utimesSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const visible = join(raiz, "agentes");
const oculta = join(raiz, ".claude", "agents");

const listar = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : []);

// Se conserva la fecha del original: si la copia quedara con la fecha de hoy,
// la próxima corrida la vería "más nueva" y la mandaría de vuelta.
function copiar(de, a) {
  copyFileSync(de, a);
  const { atime, mtime } = statSync(de);
  utimesSync(a, atime, mtime);
}

try {
  mkdirSync(visible, { recursive: true });
  mkdirSync(oculta, { recursive: true });

  const cambios = [];
  for (const nombre of new Set([...listar(visible), ...listar(oculta)])) {
    const v = join(visible, nombre);
    const o = join(oculta, nombre);

    if (!existsSync(o)) {
      copiar(v, o);
      cambios.push(`${nombre} -> .claude/agents`);
    } else if (!existsSync(v)) {
      copiar(o, v);
      cambios.push(`${nombre} -> agentes`);
    } else if (!readFileSync(v).equals(readFileSync(o))) {
      if (statSync(o).mtimeMs > statSync(v).mtimeMs) {
        copiar(o, v);
        cambios.push(`${nombre} -> agentes (el de .claude/agents era mas nuevo)`);
      } else {
        copiar(v, o);
        cambios.push(`${nombre} -> .claude/agents`);
      }
    }
  }

  if (cambios.length) console.log(`Agentes sincronizados: ${cambios.join(", ")}`);
} catch (e) {
  console.warn(`No se pudieron sincronizar los agentes (${e.message}). No frena nada.`);
}

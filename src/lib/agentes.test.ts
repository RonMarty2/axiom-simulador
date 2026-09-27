import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Los agentes viven dos veces: en `agentes/` (visible, la que viaja por
// Synology) y en `.claude/agents/` (la que lee Claude Code). En la máquina los
// empareja `scripts/sincronizar-agentes.mjs`; en el repo tienen que llegar
// iguales, o una sesión en la nube, que no corre npm install, arranca con
// agentes viejos.

const VISIBLE = "agentes";
const OCULTA = join(".claude", "agents");

const listar = (dir: string) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")).sort() : [];

// Git en Windows puede cambiar los finales de línea de una copia y no de la otra.
const leer = (ruta: string) => readFileSync(ruta, "utf8").replace(/\r\n/g, "\n");

describe("agentes del proyecto", () => {
  test("hay agentes", () => {
    assert.ok(listar(VISIBLE).length > 0, "agentes/ está vacía o no existe");
  });

  test("agentes/ y .claude/agents/ tienen los mismos archivos con el mismo contenido", () => {
    const visibles = listar(VISIBLE);
    assert.deepEqual(
      listar(OCULTA),
      visibles,
      "las dos carpetas no tienen los mismos agentes: corré `node scripts/sincronizar-agentes.mjs` (o borrá el agente de las dos)",
    );
    const distintos = visibles.filter((f) => leer(join(VISIBLE, f)) !== leer(join(OCULTA, f)));
    assert.deepEqual(
      distintos,
      [],
      `estos agentes difieren entre las dos carpetas: ${distintos.join(", ")}. Corré \`node scripts/sincronizar-agentes.mjs\``,
    );
  });

  test("cada agente declara un name igual a su nombre de archivo", () => {
    const malos = listar(VISIBLE).filter((f) => {
      const m = leer(join(VISIBLE, f)).match(/^---\n[\s\S]*?^name:\s*(\S+)/m);
      return !m || m[1] !== f.replace(/\.md$/, "");
    });
    assert.deepEqual(malos, [], `frontmatter sin name o con otro nombre: ${malos.join(", ")}`);
  });
});

import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { medirDesbordes } from "./desborde.ts";
import conocidas from "./axe-conocidas.json" with { type: "json" };

// Rutas publicas: se prueban siempre (local y CI). Las que piden sesion redirigen a /login sin ella.
const PUBLICAS = ["/", "/login", "/precios", "/terminos", "/privacidad"];
// Con sesion: solo local, entrando con el login de desarrollo (en produccion no existe y se saltan).
const CON_SESION = ["/dashboard", "/aprende", "/practicar", "/cuenta", "/pagar", "/errores", "/progreso"];

// axe con TRINQUETE: cuantos elementos con falla tiene hoy cada ruta (axe-conocidas.json).
// Puede bajar, no subir. Si baja, el test lo dice para que se actualice el numero.
async function revisar(page: Page, ruta: string) {
  await page.waitForTimeout(1500); // animaciones de entrada: a mitad de un fundido axe ve colores que no son
  const d = await medirDesbordes(page);
  expect([...d.fuera, ...d.cortados], `desbordes en ${ruta}`).toEqual([]);
  expect(d.pagina, `la pagina ${ruta} se desplaza de costado`).toBeLessThanOrEqual(0);

  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const fallas = axe.violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(" ")}`));
  const tope = (conocidas as Record<string, number>)[ruta] ?? 0;
  if (fallas.length < tope) console.log(`[axe] ${ruta}: ${fallas.length} fallas, el tope es ${tope}: bajalo en axe-conocidas.json`);
  expect(fallas.length, `axe en ${ruta} (tope ${tope}):\n${fallas.join("\n")}`).toBeLessThanOrEqual(tope);
}

for (const ruta of PUBLICAS) {
  test(`publica ${ruta}`, async ({ page }) => {
    const r = await page.goto(ruta, { waitUntil: "networkidle" });
    expect(r?.status(), `${ruta} responde`).toBeLessThan(400);
    await revisar(page, ruta);
  });
}

test.describe("con sesion de estudiante (solo desarrollo)", () => {
  test.beforeEach(async ({ page }) => {
    const r = await page.goto("/api/auth/dev-login?rol=estudiante", { waitUntil: "networkidle" });
    test.skip(r?.status() === 404, "sin login de desarrollo (produccion)");
  });
  for (const ruta of CON_SESION) {
    test(`sesion ${ruta}`, async ({ page }) => {
      await page.goto(ruta, { waitUntil: "networkidle" });
      expect(new URL(page.url()).pathname, `${ruta} no deberia mandar a /login con sesion`).not.toBe("/login");
      await revisar(page, ruta);
    });
  }
});

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { medirDesbordes } from "./desborde.mjs";
const RUTAS = ["/", "/login", "/aprende", "/practicar", "/precios", "/prueba-animacion"];
for (const ruta of RUTAS) {
  test(`axiom ${ruta}`, async ({ page }) => {
    const errores = [];
    page.on("console", (m) => m.type() === "error" && errores.push(m.text().slice(0, 100)));
    const t0 = Date.now();
    const resp = await page.goto(ruta, { waitUntil: "networkidle", timeout: 90_000 });
    await page.waitForTimeout(800);
    const d = await medirDesbordes(page);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    console.log(`[${test.info().project.name}] ${ruta} ${resp.status()} ${Date.now() - t0}ms url=${page.url()}`);
    console.log(`   desborde pagina=${d.pagina}px fuera=${d.fuera.length} cortados=${d.cortados.length}`);
    for (const x of [...d.fuera, ...d.cortados].slice(0, 6)) console.log("     " + x);
    console.log(`   axe: ${axe.violations.map((v) => `${v.id}[${v.impact}](${v.nodes.length})`).join(", ") || "0"}`);
    if (errores.length) console.log(`   consola: ${errores.length} errores, ej: ${errores[0]}`);
  });
}
test("captura comparada /login", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("login.png", { fullPage: true });
});

import { defineConfig } from "@playwright/test";

// Pantallas del alumno en celular: desbordes (elemento por elemento) y accesibilidad (axe).
// Va aparte de `npm test` a proposito (plan de mejoras, regla 4): un fallo aca no frena lo que ya anda.
//   npm run test:pantallas
// Local: usa el servidor que este prendido en 3001 (el dev de Ronald) y el Chrome instalado, sin bajar navegadores.
// Si no hay servidor, levanta `npm run start` (hace falta un `npm run build` antes).
// CI: levanta el servidor de produccion y usa el Chromium que baja `npx playwright install chromium`.
const CI = !!process.env.CI;

export default defineConfig({
  testDir: ".",
  timeout: 120_000,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3001", channel: CI ? undefined : "chrome" },
  webServer: { command: "npm run start", url: "http://localhost:3001", reuseExistingServer: !CI, timeout: 180_000 },
  projects: [
    { name: "cel343", use: { viewport: { width: 343, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
    { name: "cel375", use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
});

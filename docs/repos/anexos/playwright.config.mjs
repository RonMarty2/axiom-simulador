import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./pruebas",
  timeout: 120_000,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3001", channel: "chrome" },
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.001 } },
  projects: [
    { name: "cel343", use: { viewport: { width: 343, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
    { name: "cel375", use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
});

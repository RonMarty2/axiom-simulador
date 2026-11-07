import { test, expect } from "@playwright/test";

interface FacultadConBanco {
  id: string;
  nombre: string;
  examenes: number;
}

interface ExamenMetadata {
  id: string;
  facultad: string;
  universidad: string;
  anio: number;
}

test.describe("simulacro oficial por facultad (desarrollo)", () => {
  test.beforeEach(async ({ page }) => {
    // Si la cuenta tiene facultad_objetivo (como estudiante), /api/axiom/simulador da 403
    // al pedir otra carrera. Con rol=admin, facultad_objetivo es null y permite cualquier facultad.
    const r = await page.goto("/api/auth/dev-login?rol=admin", { waitUntil: "networkidle" });
    test.skip(r?.status() === 404, "sin login de desarrollo (producción)");
  });

  test("arranca examen oficial y devuelve preguntas para cada facultad con banco", async ({ page }) => {
    const resFac = await page.request.get("/api/facultades");
    expect(resFac.ok(), "debe responder 200 en /api/facultades").toBeTruthy();
    const { facultades } = (await resFac.json()) as { facultades: FacultadConBanco[] };

    const resEx = await page.request.get("/api/axiom/examenes");
    expect(resEx.ok(), "debe responder 200 en /api/axiom/examenes").toBeTruthy();
    const { examenes } = (await resEx.json()) as { examenes: ExamenMetadata[] };

    let probadas = 0;
    for (const fac of facultades) {
      await test.step(`facultad ${fac.nombre} (${fac.id})`, async () => {
        const disponibles = examenes.filter((e) => e.facultad === fac.id);
        if (disponibles.length === 0) {
          return;
        }

        // Se toma el primer examen existente sin quemar años ni cantidades en código
        probadas++;
        const examen = disponibles[0];

        const config = {
          modo: "examen_real" as const,
          universidad: examen.universidad || "UMSS",
          facultad: fac.id,
          examen_id: examen.id,
          anio: examen.anio,
        };

        const resSim = await page.request.post("/api/axiom/simulador", {
          data: { config },
        });

        expect(resSim.status(), `el simulador para ${fac.id} debe responder 200`).toBe(200);

        const data = await resSim.json();
        expect(data.simulador, `debe existir el simulador creado para ${fac.id}`).toBeDefined();
        expect(
          data.simulador.preguntas?.length,
          `las preguntas para ${fac.id} deben ser mayores a cero`
        ).toBeGreaterThan(0);
      });
    }
    expect(probadas, "al menos una facultad con examenes se probo de verdad").toBeGreaterThan(0);
  });
});

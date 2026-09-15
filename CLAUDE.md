# Punto de entrada para asistentes IA

**Si sos una IA (Claude, GPT, etc.) trabajando en este repo, leé primero [BITACORA.md](./BITACORA.md).** Tiene TODO: identidad del proyecto, decisiones arquitectónicas, errores históricos, principios de animación, roadmap. En 10 minutos sabés dónde estás parado.

## Reglas de oro

1. **Leé, y después anotá.** Dos mitades, las dos obligatorias:
   - **Antes de escribir código:** `git fetch origin main` y leé la bitácora de ESA versión. Hay varias sesiones en paralelo y `main` se mueve mientras trabajás. Leerla al abrir la sesión no alcanza: el 15-sep una sesión reescribió un parseo que ya existía testeado en `main` porque no volvió a mirar (bitácora §7).
   - **Al terminar:** agregá a BITACORA.md lo que hiciste, en el mismo commit, y subilo a `main`. Ya no hace falta pedir permiso para agregar tu entrada; lo que sí necesita el OK de Ronald es **reescribir o borrar** lo que ya está escrito, o tocar decisiones y reglas.
2. **Idioma — ojo, son dos:**
   - **Código, comentarios, commits y docs (incluida esta bitácora):** español rioplatense informal. Es para Ronald y para quien lea el repo.
   - **TEXTO QUE VE EL ALUMNO (toda la UI, lecciones y láminas): TUTEO, nunca voseo.** Los alumnos son de Cochabamba: "puedes", no "podés"; "haz", no "hacé"; "tú", no "vos". La app estaba mitad y mitad y se normalizó entera el 13-sep-2026 (ver bitácora §11). Si agregás texto nuevo para el alumno, escribilo en tuteo.

   Sin emojis decorativos en código o docs (salvo en títulos de sección si ayudan a navegar).
3. **Estilo de respuesta:** corto, directo, sin adornos. Ronald valora más la honestidad que la presunción de saber todo. Si no estás seguro, decilo.
4. **Antes de tocar animaciones SVG:** leé §4 "Sistema visual" de la bitácora — hay lecciones aprendidas a fuerza de romper cosas.
5. **Antes de tocar PWA:** leé §5 — la OTA y la supresión del banner ya funcionan bien.

## Cómo retomar

```bash
npm install
npm run dev
```

Después: bitácora § 10 ("Cómo retomar el proyecto") tiene el orden de lectura.

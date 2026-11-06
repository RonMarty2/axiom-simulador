# Pedido a agy: revisar el cambio "apodo en el ranking" (solo leer, no editar)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md; el agente «verificador»: C:\SynologyDrive\SynologyDrive\axiom-simulador\agentes\verificador.md (usa la skill `verificador` si la tienes).

Contexto: hay alumnos menores. Decisión de Ronald (6-nov-2026): el ranking NO muestra el nombre real; cada alumno elige un apodo o aparece como "Alumno anónimo".

Archivos a leer (repo axiom-simulador):
- src/lib/apodo.ts y src/lib/apodo.test.ts
- src/app/api/usuarios/route.ts (público)
- src/app/api/perfil/apodo/route.ts (nuevo)
- src/app/api/axiom/ranking/route.ts
- src/app/ranking/page.tsx
- src/app/cuenta/page.tsx
- src/lib/data-store.ts (interface Usuario, getUsuarios, actualizarUsuario)
- supabase/migration-008-apodo.sql y supabase/schema.sql

Busca y responde:
1. ¿Queda ALGÚN lugar del código (src/) donde el nombre real (`.nombre` de Usuario) o el email lleguen a un endpoint público o a una pantalla que vean otros alumnos? Lista archivo:línea. (Pistas: grep `u.nombre`, `user.nombre`, `usuario.nombre` en src/app/api y en páginas públicas.)
2. ¿`/api/perfil/apodo` valida bien la entrada y exige sesión? ¿Se puede guardar algo que rompa la pantalla o que sea un nombre real disfrazado?
3. ¿Algún otro archivo usaba `id` o `plan` de la respuesta de `/api/usuarios` y ahora se rompe?
4. Textos nuevos para el alumno: ¿están todos en TUTEO (nunca voseo)?

Formato de la respuesta: lista numerada 1-4; en cada punto "OK" o los problemas con archivo:línea y la cita exacta. Nada de cambios al código.

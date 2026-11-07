# Pedido: test que arranque un simulacro por facultad

Lee y sigue las reglas de C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md (español informal en código, sin cifras de catálogo quemadas).

Contexto: `src/app/api/axiom/simulador/route.ts` (POST, body `{config}`), `src/lib/axiom/types.ts` (`ConfiguracionSimulacion`), `src/app/simulador/page.tsx` (cómo la pantalla arma `config`, incluido `examen_id` para el examen oficial) y `pruebas-pantallas/alumno.spec.ts` (Playwright, login de desarrollo en `/api/auth/dev-login?rol=...`; `/api/facultades` lista las facultades).

Tarea: proponer el archivo NUEVO `pruebas-pantallas/simulacro-por-facultad.spec.ts` (Playwright) que, con sesión de desarrollo (se salta si dev-login da 404), para CADA facultad que devuelva `/api/facultades` haga POST a `/api/axiom/simulador` con modo de examen oficial/pasado, elija un examen del año que exista, y compruebe que responde 200 con preguntas (>0). Sin números de catálogo escritos a mano. Si la API exige que la facultad sea la del usuario, dilo y propón cómo resolverlo (por ejemplo rol=admin).

Formato de respuesta: el archivo completo en un bloque de código, y debajo 3 líneas con supuestos o dudas. No edites nada.

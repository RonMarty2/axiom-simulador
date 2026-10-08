# Cobertura de animaciones: qué hay, qué falta y cómo se vigila

Nació el 9-oct-2026 de una duda de Ronald: *"¿y si en un ejercicio que no vi falta una animación y ni me doy cuenta?"*. Uno no puede quejarse de lo que no ve, así que la revisión no puede depender solo de su ojo.

## Dos redes de seguridad (automáticas)

1. **Detector de huecos** (`src/app/prueba-animacion/cobertura.ts`, vigilado por `cobertura.test.ts`, corre con `npm test`).
   Un **hueco** es un paso cuyo texto anuncia una operación (*sumamos, restamos, multiplicamos, dividimos, tachamos, calculamos, reemplazamos, sustituimos, simplificamos, elevamos, juntamos, pasamos*) pero que no mueve nada: ni fusión, ni brote, ni visita, ni una pieza que cambie de lugar o de signo (el arrastre de "pasar al otro lado" cuenta como movimiento). Estado al 9-oct: **0 huecos** en los 12 tipos con todos sus casos difíciles.
   - Se prueba con casos buenos y malos: atrapa "Sumamos..." con solo `resaltar`, y deja pasar fusión, brote, arrastre y los pasos que solo explican ("Reconocemos el patrón...").
   - Se corre a mano con `node src/app/prueba-animacion/cobertura.ts` (tabla de operaciones animadas por tipo, más los huecos) o con `--huecos` (solo huecos; sale con código 1 si hay).
2. **Las reglas de `revisar.ts` y `estilo.ts`** (nada aparece de la nada, un número por vez, dos números pegados, tachar la pieza exacta, texto del alumno). Corren sobre todos los casos de `casos.ts`.

Lo que **ninguna** red ve: un tipo de ejercicio que todavía no tiene generador. Para eso está la tabla de abajo.

## Qué tipos tienen animación hoy (12 generadores)

Potencias, raíces, raíz con factor, ecuación lineal, suma y resta de fracciones, diferencia de cuadrados, suma de logaritmos, ecuación de segundo grado, MRUV (Física), ley de Charles (Física), moles de átomos y estequiometría (Química). La lista viva está en `CASOS_POR_TIPO` (`casos.ts`).

## Qué NO tiene animación todavía (por frecuencia en el banco)

Tomado de `docs/plan-animaciones.md` §1 (qué cae más) contra los generadores de hoy. **Corrígelo al sumar un generador.**

| Materia | Tipos frecuentes sin generador |
|---|---|
| Física | Cinemática 1D restante (MRU, caída libre, encuentro), Dinámica (Newton, poleas), Tiro parabólico, Capacitores |
| Química | Soluciones y titulación, Redox y balanceo, Estructura atómica, Gases ideales (solo está Charles) |
| Matemática (Ingeniería) | Identidades y ecuaciones trigonométricas, Progresiones, Vieta y naturaleza de raíces |
| Geometría | Circunferencia, Polígonos, Triángulos, Segmentos y ángulos |
| Biología | Genética mendeliana |
| Económicas (Mat.) | Planteo de ecuaciones, Sistemas de ecuaciones, Funciones, Progresiones, Fracciones algebraicas, Ecuaciones irracionales, Regla de tres, Porcentajes e interés, Inecuaciones, Exponenciales |

## Cómo se usa (agentes)

- `animador-resolucion`: al terminar un tipo, corre `node src/app/prueba-animacion/cobertura.ts --huecos`; con huecos no lo da por terminado.
- `cronista`: al cerrar sesión, lista los tipos sin generador y los pasos que la sesión tocó, para que Ronald elija qué sigue.
- Ronald elige qué tipo animar; la tabla de arriba es el menú, no una orden.

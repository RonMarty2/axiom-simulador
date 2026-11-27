# CHECKLIST PSA-2027 Medicina (UMSS) · Actualizado 27-11-2026 14:42
Fuente: `LISTA_CONTENIDOS_PSA2027.pdf` (lista oficial). Conteo real de audiolibros medido por script sobre `_MOTOR_AUDIO/_AUDIO_V2`, `_cache_v2/*/manifiesto.json`, `docs/audio-bloques/plan/`, `docs/audio-bloques/aceptacion/` y `docs/audio-bloques/cortes_v2/`. Inventario de app y práctica verificado por `agy` (`20261127-082639_auditoria`) + conteo directo de `data/examenes/umss/medicina/`.

> **Regla de prioridad PSA 2027 (solo 39 capítulos):** EdS (5) → Biología Celular Calvo (14) → Morfofunción Saladin (20). Los **16 capítulos fuera del PSA 2027** (`Atlas_A`, `Atlas_B`, Calvo `01, 02, 02_Parte_2, 04, 16`, Saladin `02, 03, 04, 07, 11, 12, 24, 26, 29`) quedan congelados hasta cerrar los 39.
> **Nota importante sobre Audio NUEVO V2:** solo se cuentan como listos los capítulos cuyo `_AUDIO_V2` coincide al 100 % con el texto aprobado actual (verificado bloque a bloque contra `manifiesto.json`). Los WAV antiguos del 15–16 nov (Calvo `12, 13` y 13 capítulos de Saladin) corresponden a textos anteriores a la limpieza del 21–25 nov y **no cuentan** ni se cortan.

## Resumen audiolibros PSA 2027 (27-11-2026 13:32)
- **Texto aprobado 8/8 con plan listo:** **39 / 39** (EdS 5/5, Calvo 14/14, Saladin 20/20 — los 20 Saladin PSA auditados y limpios de columnas invertidas, encabezados `PARTE` y 20 superíndices de notas, con planes `--seco` y mapas 0 desajustes).
- **Audio NUEVO V2 armado (texto vigente):** **10 / 39** (EdS 5/5 + Calvo 5/14 [`03, 05, 06, 07*, 08*`] + Saladin 0/20). *Calvo `09` en **122/123 bloques** (falta solo `parte_123.wav`; vigilante PID 16996 esperando reposición de cuota diaria). `*` Calvo `07` y `08` preparados para regrabar solo bloque 1 sin nombre de autor (decisión A de Ronald, 26-11).*
- **Cortados y auditados en `cortes_v2` (APRUEBA):** **9 / 39** (EdS 5/5 = 35 pistas + Calvo `03, 05, 06, 07*` = 35 pistas; total 70 pistas, con `07` pendiente de actualizar `Completo` y `P01` tras bloque 1). *(Nada publicado en `AUDIOS_MEDICINA_UMSS` sin OK de Ronald).*

| Materia (lista) | Texto del libro / fuente | Audio viejo (publicado) | Audio NUEVO V2 (vigente, solo PSA 2027) | Preguntas (exámenes pasados + práctica) | En la app (`/aprende` y `/laminas`) |
|---|---|---|---|---|---|
| Morfofunción · Saladin, 20 caps (`1,5,6,8,9,10,13-23,25,27,28`) | SÍ los 20 (aprobados 8/8, con plan y mapas revisados) | SÍ los 20 (`Morfo_Cap_XX`) | **0 de 20** vigentes · FALTAN los 20 (13 tienen WAV viejo del 15–16 nov, se regraban por plan) | 443 (`morfofuncion`) + autoevaluación por cap. | 14 unidades en `/aprende` (ya existen Cap 5 `histologia` y Cap 16 `organos-sentidos`) + 3 láminas (`hemostasia-y-vasos`, `huesos-y-foramenes-craneales`, `articulaciones-sinoviales`, + `vertebras-y-medula-espinal`) |
| Biología Celular · Calvo, 14 caps (`3,5-15,17,18`) | SÍ los 14 (aprobados 8/8, con plan y mapas revisados) | SÍ los 14 | **5 de 14** vigentes (`03, 05, 06, 07*, 08*`; 4 cortados en `cortes_v2`, `07*` y `08*` en bloque 1 sin autor) · **1 grabando** (`09`) · **FALTAN 8** (`10, 11, 12, 13, 14, 15, 17, 18`) | 383 (`biologia_celular`) + banco autoevaluación | 8 unidades / 9 lecciones en `/aprende` (ya existen Cap 6 `bcm-especializaciones-membrana`, Cap 17 `bcm-respuesta-inmunitaria` y Cap 18 `bcm-celulas-madre`) + 4 láminas (`senalizacion-celular`, `ciclo-celular-y-mitosis`, `citoesqueleto-actina-y-microtubulos`, `mitocondria-y-atp-sintasa`) |
| Educación en Salud e Investigación · Partes I (p.2-31), II (p.32-73), III (p.84-189) | SÍ las 5 partes (`EdS_Parte1`, `2`, `3_1`, `3_2`, `3_3`; OCR hecho y texto aprobado) | NO | **5 de 5** vigentes armados y **5 de 5** cortados/aprobados en `cortes_v2/EdS/` (35 pistas) | 55 (`investigacion`) + banco práctica `medicina-psa-2027-eds.md` (**50 preg.** integradas en `preguntas-compartidas.json`, total 105) | 5 unidades en `/aprende` (Partes I, II y III Estadística descriptiva, sin Excel/SPSS) |
| Matemáticas · minedu `4096.pdf` p.38-45 | SÍ (`docs/psa-2027/4096_p29-45_texto.txt`, `MFQ_INVENTARIO.md`) | — | — | Banco práctica `medicina-psa-2027-mfq.md` (98 preg. MFQ) + compartidas desde Ingeniería | Bloque en `/aprende` con Geometría-Trigonometría + 7 unidades nuevas + láminas de Matemáticas |
| Física · `4096.pdf` p.29-34 | SÍ (`4096_p29-45_texto.txt`) | — | — | Incluido en `medicina-psa-2027-mfq.md` (98 preg. MFQ) + compartidas | Bloque en `/aprende` + 5 unidades nuevas |
| Química · `4096.pdf` p.34-38 | SÍ (`4096_p29-45_texto.txt`) | — | — | Incluido en `medicina-psa-2027-mfq.md` (98 preg. MFQ) + compartidas | Bloque en `/aprende` + 3 unidades nuevas |
| Comprensión lectora · 7 habilidades | SÍ | — | — | Banco práctica `medicina-psa-2027-lectura.md` (**60 preguntas** de textos de salud) | `/aprende/comprension-lectora-salud` (6 escenas, 7 habilidades) + 4 unidades verbales |

## PENDIENTE PRINCIPAL (solo PSA 2027)
1. **Audiolibros PSA 2027 (29 capítulos por cerrar + bloque 1 de Calvo 07 y 08):**
   - Regrabar solo bloque 1 sin autor de Calvo `07` y `08` (actualizar `Completo`/`P01` de `07` y cortar `08` completo).
   - Terminar de grabar, auditar y cortar Calvo `09` (en curso) → `10, 11, 12, 13, 14, 15, 17, 18` (8 caps).
   - Grabar, auditar y cortar los 20 capítulos de Saladin PSA (`01, 05, 06, 08, 09, 10, 13..23, 25, 27, 28`).
   - Reemplazar publicados (`AUDIOS_MEDICINA_UMSS`) y publicar nuevos **solo con OK de Ronald**.
2. **Banco de práctica Educación en Salud:** **CERRADO (27-11 14:42)** — `data/practica/medicina-psa-2027-eds.md` (50 preguntas, `20261127-142439_practica-eds` con `SEGUNDA.md` + muestreo Claude `APRUEBA`) integrado y enlazado en `data/preguntas-compartidas.json`.
3. **Audios en la app:** el reproductor ya está conectado en `src/lib/audio-medicina*.ts` y `ReproductorAudiolibro.tsx` (falta publicar/vincular los cortes V2 aprobados cuando Ronald dé el OK).

*Fuera del examen PSA 2027 (no priorizar ni gastar cuota hasta cerrar los 39): Saladin `2,3,4,7,11,12,24,26,29`, `Atlas_A`, `Atlas_B`; Calvo `1,2,2_Parte_2,4,16`; EdS Excel/SPSS (p.191-227).*

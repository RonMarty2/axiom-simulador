# Auditoría banco Ingeniería UMSS

> Generado automáticamente — Fase 0 inventario. **No incluye juicio visual humano** (ángulos, proporciones, legibilidad). Eso se llena en la columna `visual_humano` por lote.

**Fecha inventario:** 2026-07-29
**Alcance:** 126 exámenes (ingreso + parciales/finales). Modo: auditar y anotar; fix después.
**Prioridad de fix (cuando toque):** figuras/bloqueantes visuales → pasos → contenido.

---

## 1. Resumen global

| Métrica | Valor |
|---------|------:|
| Archivos MD | 126 |
| PDFs en `examenes pasados/` | 135 |
| Preguntas totales | 3211 |
| Con campo `figura:` | 38 |
| Figuras con motor OK | 12 |
| Figuras huérfanas (ID sin motor) | 26 |
| Mencionan figura sin campo | 94 |
| Sin `Paso N` en explicación | 327 |
| Marcadores provisorio/ambiguo | 39 |
| Respuesta sin opción matching | 0 |
| Figuras definidas en motor | 12 |

### Figuras en motor

- `f10-bloques-en-contacto`
- `f10-plano`
- `f11-acantilado-dos-esferas`
- `f11-campo`
- `f12-bloque-fuerza-horizontal`
- `f12-circuito`
- `f9-movil-tres-instantes`
- `g5-equilatero-inscrito`
- `g5-paralelas`
- `g6-cuadrilatero-incirculos`
- `g6-isosceles`
- `g7-cuadrado`

### Figuras referenciadas sin motor (huérfanas)

| ID figura | Usos |
|-----------|------|
| `f19-tres-cargas-simetricas` | 1 · 2005-1op-1-2005.md#P19 |
| `f12-circuito-cuatro-resistencias-r` | 1 · 2006-2op-1-2006.md#P12 |
| `g7-dos-cuadrados-arcos` | 1 · 2022-2op-2-2022.md#P7 |
| `f9-parabolico-hmax` | 1 · 2022-2op-2-2022.md#P9 |
| `f10-circuito-4r-10v-3r-5v` | 1 · 2022-2op-2-2022.md#P10 |
| `g7-camaras-angulos-2a-a-2a` | 1 · 2022-3op-2-2022.md#P7 |
| `f10-parabolico-hmax` | 1 · 2022-3op-2-2022.md#P10 |
| `g5-satelite` | 1 · 2023-1op-2-2023.md#P5 |
| `g6-secantes` | 1 · 2023-1op-2-2023.md#P6 |
| `f10-plano-cuadrado` | 1 · 2023-1op-2-2023.md#P10 |
| `f11-campo-electrico` | 1 · 2023-1op-2-2023.md#P11 |
| `f12-proyectil-rampa` | 1 · 2023-1op-2-2023.md#P12 |
| `g5-semicircunferencias-cuadrado` | 1 · 2023-2op-1-2023.md#P5 |
| `g6-triangulo-tres-cuadrados` | 1 · 2023-2op-1-2023.md#P6 |
| `g7-triangulo-cuadrado-sombreado` | 1 · 2023-2op-1-2023.md#P7 |
| `f9-cuatro-vectores-circulo` | 1 · 2023-2op-1-2023.md#P9 |
| `f12-circuito-dos-fuentes` | 1 · 2023-2op-1-2023.md#P12 |
| `g5-triangulo-cp-pb` | 1 · 2023-2op-2-2023.md#P5 |
| `f9-circuito-puente` | 1 · 2023-2op-2-2023.md#P9 |
| `f10-proyectil-energia` | 1 · 2023-2op-2-2023.md#P10 |
| `f11-moscas-sombras` | 1 · 2023-2op-2-2023.md#P11 |
| `g8-octogono-secantes` | 1 · 2023-3op-1-2023.md#P8 |
| `g5-semicirculo-cuartocirculo` | 1 · 2024-1op-1-2024.md#P5 |
| `g5-cadena` | 1 · 2024-2op-1-2024.md#P5 |
| `g7-cuadrilatero` | 1 · 2024-2op-1-2024.md#P7 |
| `f10-polea` | 1 · 2024-2op-1-2024.md#P10 |

### PDFs en carpeta (inventario crudo)

Hay **135** PDFs y **126** MD. El mapeo 1:1 no es trivial (nombres viejos `050_...` vs slugs `2005-1op-1-2005.md`). En auditoría humana se cruza por año/opción/tipo.

<details><summary>Lista completa de PDFs</summary>

- `050_ExamenAdmisionPrimerOpcion1-2005.pdf`
- `051_ExamenAdmisionSegundaOpcion1-2005.pdf`
- `052_ExamenAdmisionPrimeraOpcion2-2005.pdf`
- `053_ExamenAdmisionSegundaOpcion2-2005.pdf`
- `054_ExamenAdmisionPrimeraOpcion1-2006.pdf`
- `055_ExamenAdmisionSegundaOpcion1-2006.pdf`
- `056_PrimerParcialCursoPropedeutico1-2006.pdf`
- `057_SegundoParcialCursoPropedeutico1-2006.pdf`
- `058_TercerParcialCursoPropedeutico1-2006.pdf`
- `059_CuartoParcialCursoPropedeutico1-2006.pdf`
- `060_ExamenAdmisionUnicaOpcion2-2006.pdf`
- `061_PrimerParcialCursoPropedeutico2-2006.pdf`
- `062_SegundoParcialCursoPropedeutico2-2006.pdf`
- `063_TercerParcialCursoPropedeutico2-2006.pdf`
- `064_CuartoParcialCursoPropedeutico2-2006.pdf`
- `065_ExamenAdmisionPrimeraOpcion1-2007.pdf`
- `066_ExamenAdmisionSegundaOpcion1-2007.pdf`
- `067_PrimerParcialCursoPropedeutico1-2007.pdf`
- `068_SegundoParcialCursoPropedeutico1-2007.pdf`
- `069_TercerParcialCursoPropedeutico1-2007.pdf`
- `070_ExamenAdmisionUnicaOpcion2-2007.pdf`
- `071_PrimerParcialCursoPropedeutico2-2007.pdf`
- `072_SegundoParcialCursoPropedeutico2-2007.pdf`
- `073_TercerParcialCursoPropedeutico2-2007.pdf`
- `074_ExamenAdmisionPrimeraOpcion1-2008.pdf`
- `075_ExamenAdmisionSegundaOpcion1-2008.pdf`
- `076_PrimerParcialCursoPropedeutico1-2008.pdf`
- `077_SegundoParcialCursoPropedeutico1-2008.pdf`
- `078_TercerParcialCursoPropedeutico1-2008.pdf`
- `079_ExamenAdmisionUnicaOpcion2-2008.pdf`
- `080_PrimerParcialPrimerCursoPre-Facultativo2-2008.pdf`
- `081_SegundoParcialPrimerCursoPre-Facultativo2-2008.pdf`
- `082_TercerParcialPrimerCursoPre-Facultativo2-2008.pdf`
- `083_PrimerParcialSegundoCursoPre-Facultativo2-2008.pdf`
- `084_SegundoParcialSegundoCursoPre-Facultativo2-2008.pdf`
- `085_TercerParcialSegundoCursoPre-Facultativo2-2008.pdf`
- `086_ExamenAdmisionPrimeraOpcion1-2009.pdf`
- `087_ExamenAdmisionSegundaOpcion1-2009.pdf`
- `088_PrimerParcialCursoPre-Facultativo1-2009.pdf`
- `089_SegundoParcialCursoPre-Facultativo1-2009.pdf`
- `090_TercerParcialCursoPre-Facultativo1-2009.pdf`
- `091_ExamenAdmisionUnicaOpcion2-2009.pdf`
- `092_PrimerParcialPrimerCursoPre-Facultativo2-2009.pdf`
- `093_SegundoParcialPrimerCursoPre-Facultativo2-2009.pdf`
- `094_TercerParcialPrimerCursoPre-Facultativo2-2009.pdf`
- `095_PrimerParcialSegundoCursoPre-Facultativo2-2009.pdf`
- `096_SegundoParcialSegundoCursoPre-Facultativo2-2009.pdf`
- `097_TercerParcialSegundoCursoPre-Facultativo2-2009.pdf`
- `098_ExamenAdmisionPrimeraOpcion1-2010.pdf`
- `099_ExamenAdmisionSegundaOpcion1-2010.pdf`
- `1-op-1-2023.pdf`
- `1-op-2-2022.pdf`
- `100_PrimerParcialCursoPre-Facultativo1-2010.pdf`
- `101_SegundoParcialCursoPre-Facultativo1-2010.pdf`
- `102_TercerParcialCursoPre-Facultativo1-2010.pdf`
- `103_ExamenAdmisionUnicaOpcion2-2010.pdf`
- `104_PrimerParcialPrimerCursoPre-Facultativo2-2010.pdf`
- `105_SegundoParcialPrimerCursoPre-Facultativo2-2010.pdf`
- `106_ExamenFinalPrimerCursoPre-Facultativo2-2010.pdf`
- `107_PrimerParcialSegundoCursoPre-Facultativo2-2010.pdf`
- `108_SegundoParcialSegundoCursoPre-Facultativo2-2010.pdf`
- `109_ExamenFinalSegundoCursoPre-Facultativo2-2010.pdf`
- `110_ExamenAdmisionPrimeraOpcion1-2011.pdf`
- `111_ExamenAdmisionSegundaOpcion1-2011.pdf`
- `112_PrimerParcialCursoPre-Facultativo1-2011.pdf`
- `113_SegundoParcialCursoPre-Facultativo1-2011.pdf`
- `114_ExamenFinalCursoPre-Facultativo1-2011.pdf`
- `115_ExamenAdmisionUnicaOpcion2-2011.pdf`
- `116_PrimerParcialCursoPre-Facultativo2-2011.pdf`
- `117_SegundoParcialCursoPre-Facultativo2-2011.pdf`
- `118_Examenfinal.pdf`
- `119_PrimerExamenIngreso1-2012.pdf`
- `120_SegundoExamenIngreso1-2012.pdf`
- `121_PrimerParcialCursoPre-Facultativo2-2013.pdf`
- `122_SegundoParcialCursoPre-Facultativo1-2013.pdf`
- `124_ExamenAdmisionUnicaOpcion2-2013.pdf`
- `125_1erparcial2-2013.pdf`
- `126_2doparcial2-2013.pdf`
- `127_final2-2013.pdf`
- `128_1ra-op-1-2014.pdf`
- `129_2da-op-1-2014.pdf`
- `130_1erparcial1-2014.pdf`
- `131_2doparcial1-2014.pdf`
- `132_final1-2014.pdf`
- `133_unica2-2014.pdf`
- `134_1erparcial2-2014.pdf`
- `135_2doparcial2-2014.pdf`
- `136_final2-2014.pdf`
- `137_1ra-op-1-2015.pdf`
- `138_2da-op-1-2015.pdf`
- `139_1ra-op-2-2015.pdf`
- `140_2da-op-2-2015.pdf`
- `141_1ra-op-1-2016.pdf`
- `142_2da-op-1-2016.pdf`
- `143_2ra-op-1-2016.pdf`
- `144_1ra-op-2-2016.pdf`
- `145_2da-op-2-2016.pdf`
- `146_1ra-op-1-2017.pdf`
- `147_2da-op-1-2017.pdf`
- `148_3ra-op-1-2017.pdf`
- `149_1ra-op-2-2017.pdf`
- `150_2da-op-2-2017.pdf`
- `151_1ra-op-1-2018.pdf`
- `152_2da-op-1-2018.pdf`
- `153_3ra-op-1-2018.pdf`
- `154_1ra-op-2-2018.pdf`
- `155_2da-op-2-2018.pdf`
- `156_1ra-op-1-2018.pdf`
- `157_2da-op-1-2018.pdf`
- `158_3ra-op-1-2018.pdf`
- `159_1ra-op-2-2019.pdf`
- `160_2da-op-2-2019.pdf`
- `161_1ra-op-1-2020.pdf`
- `162_2da-op-1-2020.pdf`
- `163_3ra-op-1-2020.pdf`
- `2-op-1-2023.pdf`
- `2-op-2-2022.pdf`
- `2021-2022virffg.pdf`
- `2021-2022virffg_compressed.pdf`
- `2023-2-1op.pdf`
- `2023-2-2op.pdf`
- `2024-1-1op.pdf`
- `2024-1-2op.pdf`
- `2024-1-3op.pdf`
- `2024-1-preu.pdf`
- `2024-2-Uop.pdf`
- `2024-2-preu.pdf`
- `2025-1-1op.pdf`
- `2025-1-2op.pdf`
- `2025-1-3op.pdf`
- `2025-1-preu.pdf`
- `2025-2-1op.pdf`
- `2025-2-2op.pdf`
- `3-op-1-2023.pdf`
- `3-op-2-2022.pdf`

</details>

---

## 2. Leyenda semáforo (humano)

| Código | Significado |
|--------|-------------|
| `OK` | Fiel al PDF, pasos claros, figura bien o no hace falta |
| `OK-TEXTO` | Contenido bien; figura ausente o pobre pero usable |
| `FIX-FIGURA` | Dibujo mal/faltante/ID sin motor |
| `FIX-PASOS` | Explicación sin desglose o confusa en UI |
| `FIX-CONTENIDO` | Enunciado/opción/respuesta dudosa vs PDF |
| `BLOQUEANTE` | Respuesta mal o figura engañosa |
| `PENDIENTE` | Aún no auditado a ojo |

Columnas automáticas ya llenas; columnas `visual_humano` y `notas` se completan en lotes.

---

## 3. Planilla por examen

Orden: admisión por año descendente, luego parciales. `riesgo_auto` = score heurístico (figuras huérfanas, menciones sin figura, provisorios, errores de respuesta).

| # | archivo | cat | año | título / opción | #preg | ≠total | huecos | fig OK | fig huérf | menc.sin.fig | sin pasos | provis | bad resp | riesgo_auto | visual_humano | notas |
|--:|---------|-----|----:|-----------------|------:|:------:|--------|-------:|---------:|-------------:|----------:|-------:|---------:|------------:|:-------------:|-------|
| 1 | `2025-1op-2-2025.md` | admision | 2025 | Examen de Ingreso 2-2025 (1ra Opción) | 15 | ok | — | 0 | 0 | 0 | 15 | — | — | 5 | **BLOQUEANTE** | PDF 20 preg (2025-2-1op.pdf) vs MD 15. Faltan A1,A2,G6,G8,G9. Subconjunto renumerado (A3→P1…). Figur… |
| 2 | `2025-2op-2-2025-version-b.md` | admision | 2025 | Examen de Ingreso 2-2025 (2da Opción, Versión B — con Biología) | 4 | ok | — | 0 | 0 | 0 | 4 (P1,P2,P3,P4) | — | — | 4 | **FIX-CONTENIDO** | Solo 4 preguntas bio (B17–B20 del PDF 2op). Fragmento de la versión B, no examen standalone. Listado… |
| 3 | `2025-2op-2-2025.md` | admision | 2025 | Examen de Ingreso 2-2025 (2da Opción) | 13 | ok | — | 0 | 0 | 0 | 13 | — | — | 5 | **BLOQUEANTE** | PDF 2025-2-2op.pdf trae versión ~20 ítems + bloque bio. MD solo 13 (subconjunto). Faltan A3, A5, G8–… |
| 4 | `2025-3op-1-2025.md` | admision | 2025 | Examen de Ingreso 1-2025 (3ra Opción) | 12 | ok | — | 0 | 0 | 0 | 11 | — | — | 5 | **BLOQUEANTE** | PDF 2025-1-3op.pdf = 20 preg. MD = 12 (salta A1–A3 y G5–G8). Faltan figuras G6/G8. P5 menciona figur… |
| 5 | `2024-1op-1-2024.md` | admision | 2024 | Examen de Ingreso 1-2024 (1ra Opción) | 20 | ok | — | 0 | 1 (P5:g5-semicirculo-cuartocirculo) | 0 | 4 (P17,P18,P19,P20) | — | — | 7 | **FIX-FIGURA** | Cobertura OK 20/20 vs 2024-1-1op.pdf. P5 figura g5-semicirculo-cuartocirculo HUÉRFANA (PDF tiene sem… |
| 6 | `2024-2op-1-2024.md` | admision | 2024 | Examen de Ingreso 1-2024 (2da Opción) | 20 | ok | — | 0 | 3 (P5:g5-cadena; P7:g7-cuadrilatero; P10:f10-polea) | 0 | 4 (P17,P18,P19,P20) | — | — | 13 | **FIX-FIGURA** | Cobertura OK 20/20 vs 2024-1-2op.pdf. 3 figuras huérfanas: P5 g5-cadena, P7 g7-cuadrilatero, P10 f10… |
| 7 | `2023-1op-1-2023.md` | admision | 2023 | Examen de Ingreso 1-2023 (1ra Opción) | 20 | ok | — | 6 | 0 | 0 | 4 (P17,P18,P19,P20) | — | — | 4 | **OK-TEXTO** | Mejor del lote. 20/20 vs 1-op-1-2023.pdf. 6 figuras CON motor: g5-paralelas, g6-isosceles, g7-cuadra… |
| 8 | `2023-1op-2-2023.md` | admision | 2023 | Examen de Ingreso 2-2023 (1ra Opción) | 20 | ok | — | 0 | 5 (P5:g5-satelite; P6:g6-secantes; P10:f10-plano-cuadrado; P11:f11-campo-electrico; P12:f12-proyectil-rampa) | 0 | 3 (P17,P19,P20) | — | — | 18 | **FIX-FIGURA** | 20/20 vs 2023-2-1op.pdf. 5 figuras huérfanas: g5-satelite, g6-secantes, f10-plano-cuadrado, f11-camp… |
| 9 | `2023-2op-1-2023.md` | admision | 2023 | Examen de Ingreso 1-2023 (2da Opción) | 20 | ok | — | 0 | 5 (P5:g5-semicircunferencias-cuadrado; P6:g6-triangulo-tres-cuadrados; P7:g7-triangulo-cuadrado-sombreado; P9:f9-cuatro-vectores-circulo; P12:f12-circuito-dos-fuentes) | 0 | 8 (P5,P6,P7,P9,P12,P17,P18,P20) | P3,P5,P6,P7,P9,P12 | — | 32 | **BLOQUEANTE** | 20/20 stems vs 2-op-1-2023.pdf. PEOR del lote. 5 figuras huérfanas + VERIFICAR sin respuesta en P5/P… |
| 10 | `2023-2op-2-2023.md` | admision | 2023 | Examen de Ingreso 2-2023 (2da Opción) | 20 | ok | — | 0 | 4 (P5:g5-triangulo-cp-pb; P9:f9-circuito-puente; P10:f10-proyectil-energia; P11:f11-moscas-sombras) | 0 | 4 (P17,P18,P19,P20) | — | — | 16 | **FIX-FIGURA** | 20/20 vs 2023-2-2op.pdf. 4 figuras huérfanas: g5-triangulo-cp-pb, f9-circuito-puente, f10-proyectil-… |
| 11 | `2023-3op-1-2023.md` | admision | 2023 | Examen de Ingreso 1-2023 (3ra Opción) | 20 | ok | — | 0 | 1 (P8:g8-octogono-secantes) | 2 (P5,P7) | 4 (P8,P17,P18,P20) | P8,P14,P15 | — | 17 | **FIX-FIGURA** | 20/20 vs 3-op-1-2023.pdf. P8 g8-octogono-secantes huérfana + VERIFICAR. P5 y P7 mencionan figura sin… |
| 12 | `2022-1op-2-2022.md` | admision | 2022 | Examen de Ingreso 2-2022 (1ra Opción) | 20 | ok | — | 6 | 0 | 0 | 4 (P17,P18,P19,P20) | — | — | 4 | **OK-TEXTO** | MD 20 ≈PDF 19. Sin deuda visual crítica auto-detectada. PDF: 1-op-2-2022.pdf (count 19)… |
| 13 | `2022-2op-2-2022.md` | admision | 2022 | Examen de Ingreso 2-2022 (2da Opción) | 20 | ok | — | 0 | 3 (P7:g7-dos-cuadrados-arcos; P9:f9-parabolico-hmax; P10:f10-circuito-4r-10v-3r-5v) | 1 (P11) | 6 (P7,P9,P17,P18,P19,P20) | P7,P9 | — | 20 | **BLOQUEANTE** | VERIFICAR/provisorio en figuras: P7,9 6/20 sin Paso N Curador: priorizó contenido sobre figuras PDF:… |
| 14 | `2022-3op-2-2022.md` | admision | 2022 | Examen de Ingreso 2-2022 (3ra Opción) | 20 | ok | — | 0 | 2 (P7:g7-camaras-angulos-2a-a-2a; P10:f10-parabolico-hmax) | 0 | 6 (P7,P10,P17,P18,P19,P20) | P2,P7,P10 | — | 17 | **BLOQUEANTE** | VERIFICAR/provisorio en figuras: P7,10 6/20 sin Paso N Curador: priorizó contenido sobre figuras PDF… |
| 15 | `2020-1op-1-2020.md` | admision | 2020 | Examen de Ingreso 1-2020 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | P3,P18 | — | 4 | **FIX-CONTENIDO** | Provisorio: P3,18 PDF: 161_1ra-op-1-2020.pdf (count 16)… |
| 16 | `2020-2op-1-2020.md` | admision | 2020 | Examen de Ingreso 1-2020 (2da Opción) | 20 | ok | — | 0 | 0 | 1 (P12) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P12 PDF: 162_2da-op-1-2020.pdf (count 16)… |
| 17 | `2020-3op-1-2020.md` | admision | 2020 | Examen de Ingreso 1-2020 (3ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20 ≈PDF 16. Sin deuda visual crítica auto-detectada. PDF: 163_3ra-op-1-2020.pdf (count 16)… |
| 18 | `2019-1op-1-2019.md` | admision | 2019 | Examen de Ingreso 1-2019 (1ra Opción) | 20 | ok | — | 0 | 0 | 1 (P5) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P5… |
| 19 | `2019-1op-2-2019.md` | admision | 2019 | Examen de Ingreso 2-2019 (1ra Opción) | 20 | ok | — | 0 | 0 | 1 (P11) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P11 PDF: 159_1ra-op-2-2019.pdf (count 16)… |
| 20 | `2019-2op-1-2019.md` | admision | 2019 | Examen de Ingreso 1-2019 (2da Opción) | 20 | ok | — | 0 | 0 | 1 (P11) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P11… |
| 21 | `2019-2op-2-2019.md` | admision | 2019 | Examen de Ingreso 2-2019 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20 ≈PDF 16. Sin deuda visual crítica auto-detectada. PDF: 160_2da-op-2-2019.pdf (count 16)… |
| 22 | `2019-3op-1-2019.md` | admision | 2019 | Examen de Ingreso 1-2019 (3ra Opción) | 20 | ok | — | 0 | 0 | 1 (P6) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P6… |
| 23 | `2018-1op-1-2018.md` | admision | 2018 | Examen de Ingreso 1-2018 (1ra Opción) | 20 | ok | — | 0 | 0 | 2 (P5,P11) | 0 | — | — | 4 | **FIX-FIGURA** | Menc.sin.campo: P5,11 PDF: 151_1ra-op-1-2018.pdf (count 16)… |
| 24 | `2018-1op-2-2018.md` | admision | 2018 | Examen de Ingreso 2-2018 (1ra Opción) | 20 | ok | — | 0 | 0 | 3 (P3,P5,P8) | 0 | — | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P3,5,8 PDF: 154_1ra-op-2-2018.pdf (count 16)… |
| 25 | `2018-2op-1-2018.md` | admision | 2018 | Examen de Ingreso 1-2018 (2da Opción) | 20 | ok | — | 0 | 0 | 3 (P7,P9,P11) | 0 | P2 | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P7,9,11 PDF: 152_2da-op-1-2018.pdf (count 16)… |
| 26 | `2018-2op-2-2018.md` | admision | 2018 | Examen de Ingreso 2-2018 (2da Opción) | 20 | ok | — | 0 | 0 | 1 (P5) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P5 PDF: 155_2da-op-2-2018.pdf (count 16)… |
| 27 | `2018-3op-1-2018.md` | admision | 2018 | Examen de Ingreso 1-2018 (3ra Opción) | 20 | ok | — | 0 | 0 | 3 (P7,P9,P10) | 0 | — | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P7,9,10 PDF: 153_3ra-op-1-2018.pdf (count 19)… |
| 28 | `2017-1op-1-2017.md` | admision | 2017 | Examen de Ingreso 1-2017 (1ra Opción) | 20 | ok | — | 0 | 0 | 1 (P9) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P9 PDF: 146_1ra-op-1-2017.pdf (count 20)… |
| 29 | `2017-1op-2-2017.md` | admision | 2017 | Examen de Ingreso 2-2017 (1ra Opción) | 20 | ok | — | 0 | 0 | 2 (P7,P9) | 0 | — | — | 4 | **FIX-FIGURA** | Menc.sin.campo: P7,9 PDF: 149_1ra-op-2-2017.pdf (count 16)… |
| 30 | `2017-2op-1-2017.md` | admision | 2017 | Examen de Ingreso 1-2017 (2da Opción) | 20 | ok | — | 0 | 0 | 4 (P6,P7,P9,P11) | 0 | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P6,7,9,11 PDF: 147_2da-op-1-2017.pdf (count 16)… |
| 31 | `2017-2op-2-2017.md` | admision | 2017 | Examen de Ingreso 2-2017 (2da Opción) | 20 | ok | — | 0 | 0 | 3 (P5,P7,P12) | 0 | — | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P5,7,12 PDF: 150_2da-op-2-2017.pdf (count 16)… |
| 32 | `2017-3op-1-2017.md` | admision | 2017 | Examen de Ingreso 1-2017 (3ra Opción) | 20 | ok | — | 0 | 0 | 4 (P6,P7,P9,P11) | 0 | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P6,7,9,11 PDF: 148_3ra-op-1-2017.pdf (count 16)… |
| 33 | `2016-1op-1-2016.md` | admision | 2016 | Examen de Ingreso 1-2016 (1ra Opción) | 20 | ok | — | 0 | 0 | 4 (P5,P6,P7,P10) | 0 | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P5,6,7,10 PDF: 141_1ra-op-1-2016.pdf (count 14)… |
| 34 | `2016-1op-2-2016.md` | admision | 2016 | Examen de Ingreso 2-2016 (1ra Opción) | 20 | ok | — | 0 | 0 | 4 (P5,P6,P10,P11) | 3 (P17,P18,P20) | — | — | 11 | **FIX-FIGURA** | Menc.sin.campo: P5,6,10,11 PDF: 144_1ra-op-2-2016.pdf (count 12)… |
| 35 | `2016-2op-1-2016.md` | admision | 2016 | Examen de Ingreso 1-2016 (2da Opción) | 20 | ok | — | 0 | 0 | 2 (P5,P10) | 4 (P17,P18,P19,P20) | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P5,10 PDF: 142_2da-op-1-2016.pdf (count 20)… |
| 36 | `2016-2op-2-2016.md` | admision | 2016 | Examen de Ingreso 2-2016 (2da Opción) | 20 | ok | — | 0 | 0 | 3 (P5,P6,P11) | 2 (P18,P19) | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P5,6,11 PDF: 145_2da-op-2-2016.pdf (count 20)… |
| 37 | `2016-3op-1-2016.md` | admision | 2016 | Examen de Ingreso 1-2016 (3ra Opción) | 20 | ok | — | 0 | 0 | 5 (P5,P6,P8,P10,P11) | 0 | — | — | 10 | **FIX-FIGURA** | Menc.sin.campo: P5,6,8,10,11 PDF: 143_2ra-op-1-2016.pdf (count 20)… |
| 38 | `2015-1op-1-2015.md` | admision | 2015 | Examen de Ingreso 1-2015 | 20 | ok | — | 0 | 0 | 3 (P5,P7,P10) | 0 | — | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P5,7,10 PDF: 137_1ra-op-1-2015.pdf (count 20)… |
| 39 | `2015-1op-2-2015.md` | admision | 2015 | Examen de Ingreso 2-2015 (1ra Opción) | 20 | ok | — | 0 | 0 | 4 (P6,P7,P8,P12) | 0 | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P6,7,8,12 PDF: 139_1ra-op-2-2015.pdf (count 20)… |
| 40 | `2015-2op-1-2015.md` | admision | 2015 | Examen de Ingreso 1-2015 (Segunda Opción) | 20 | ok | — | 0 | 0 | 1 (P6) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P6 PDF: 138_2da-op-1-2015.pdf (count 20)… |
| 41 | `2015-2op-2-2015.md` | admision | 2015 | Examen de Ingreso 2-2015 (2da Opción) | 20 | ok | — | 0 | 0 | 2 (P5,P7) | 0 | — | — | 4 | **FIX-FIGURA** | Menc.sin.campo: P5,7 PDF: 140_2da-op-2-2015.pdf (count 19)… |
| 42 | `2014-1op-1-2014.md` | admision | 2014 | Examen de Ingreso 1-2014 | 20 | ok | — | 0 | 0 | 0 | 0 | P4 | — | 2 | **FIX-CONTENIDO** | Provisorio: P4 PDF: 128_1ra-op-1-2014.pdf (count 20)… |
| 43 | `2014-2op-1-2014.md` | admision | 2014 | Examen de Ingreso 1-2014 (Segunda Opción) | 20 | ok | — | 0 | 0 | 1 (P9) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P9 PDF: 129_2da-op-1-2014.pdf (count 20)… |
| 44 | `2014-unica-2-2014.md` | admision | 2014 | Examen de Ingreso 2-2014 | 20 | ok | — | 0 | 0 | 3 (P7,P10,P12) | 0 | — | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P7,10,12 PDF: 133_unica2-2014.pdf (count 20)… |
| 45 | `2013-unica-2-2013.md` | admision | 2013 | Examen de Ingreso 2-2013 | 20 | ok | — | 0 | 0 | 1 (P9) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P9 PDF: 124_ExamenAdmisionUnicaOpcion2-2013.pdf (count 20)… |
| 46 | `2012-1op-1-2012.md` | admision | 2012 | Primer Examen de Ingreso 1-2012 | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada. PDF: 119_PrimerExamenIngreso1-2012.pdf (count 11)… |
| 47 | `2012-2op-1-2012.md` | admision | 2012 | Segundo Examen de Ingreso 1-2012 | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada. PDF: 120_SegundoExamenIngreso1-2012.pdf (count 14)… |
| 48 | `2011-1op-1-2011.md` | admision | 2011 | Examen de Ingreso 1-2011 (1ra Opción) | 20 | ok | — | 0 | 0 | 1 (P10) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P10… |
| 49 | `2011-2op-1-2011.md` | admision | 2011 | Examen de Ingreso 1-2011 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 50 | `2011-unica-2-2011.md` | admision | 2011 | Examen de Ingreso 2-2011 · Única Opción | 20 | ok | — | 0 | 0 | 1 (P11) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P11… |
| 51 | `2010-1op-1-2010.md` | admision | 2010 | Examen de Ingreso 1-2010 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | P12 | — | 2 | **FIX-CONTENIDO** | Provisorio: P12… |
| 52 | `2010-2op-1-2010.md` | admision | 2010 | Examen de Ingreso 1-2010 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 53 | `2010-unica-2-2010.md` | admision | 2010 | Examen de Ingreso 2-2010 (Única Opción) | 20 | ok | — | 0 | 0 | 0 | 4 (P17,P18,P19,P20) | — | — | 4 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 54 | `2009-1op-1-2009.md` | admision | 2009 | Examen de Ingreso 1-2009 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 55 | `2009-2op-1-2009.md` | admision | 2009 | Examen de Ingreso 1-2009 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 56 | `2009-unica-2-2009.md` | admision | 2009 | Examen de Ingreso 2-2009 (Única Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 57 | `2008-1op-1-2008.md` | admision | 2008 | Examen de Ingreso 1-2008 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 58 | `2008-2op-1-2008.md` | admision | 2008 | Examen de Ingreso 1-2008 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 59 | `2008-unica-2-2008.md` | admision | 2008 | Examen de Ingreso 2-2008 (Única Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 60 | `2007-1op-1-2007.md` | admision | 2007 | Examen de Ingreso 1-2007 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 61 | `2007-2op-1-2007.md` | admision | 2007 | Examen de Ingreso 1-2007 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 62 | `2007-unica-2-2007.md` | admision | 2007 | Examen de Ingreso 2-2007 (Única Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 63 | `2006-1op-1-2006.md` | admision | 2006 | Examen de Ingreso 1-2006 (1ra Opción) | 20 | ok | — | 0 | 0 | 1 (P12) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P12… |
| 64 | `2006-2op-1-2006.md` | admision | 2006 | Examen de Ingreso 1-2006 (2da Opción) | 20 | ok | — | 0 | 1 (P12:f12-circuito-cuatro-resistencias-r) | 0 | 1 (P12) | P12 | — | 6 | **FIX-FIGURA** | Provisorio figura P12 Huérfanas: P12:f12-circuito-cuatro-resistencias-r PDF: 055_ExamenAdmisionSegun… |
| 65 | `2006-unica-2-2006.md` | admision | 2006 | Examen de Ingreso 2-2006 (Única Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 66 | `2005-1op-1-2005.md` | admision | 2005 | Examen de Ingreso 1-2005 (1ra Opción) | 20 | ok | — | 0 | 1 (P19:f19-tres-cargas-simetricas) | 1 (P18) | 0 | — | — | 5 | **FIX-FIGURA** | Huérfanas: P19:f19-tres-cargas-simetricas Menc.sin.campo: P18 Curador: priorizó contenido sobre figu… |
| 67 | `2005-1op-2-2005.md` | admision | 2005 | Examen de Ingreso 2-2005 (1ra Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 68 | `2005-2op-1-2005.md` | admision | 2005 | Examen de Ingreso 1-2005 (2da Opción) | 20 | ok | — | 0 | 0 | 2 (P17,P20) | 0 | P7 | — | 6 | **FIX-FIGURA** | Menc.sin.campo: P17,20 Curador: priorizó contenido sobre figuras PDF: 051_ExamenAdmisionSegundaOpcio… |
| 69 | `2005-2op-2-2005.md` | admision | 2005 | Examen de Ingreso 2-2005 (2da Opción) | 20 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 20. Sin deuda visual crítica auto-detectada.… |
| 70 | `2014-final-1-2014.md` | parcial_curso | 2014 | Examen Final · Curso Pre-Facultativo (Gestión 1-2014) | 30 | ok | — | 0 | 0 | 3 (P18,P19,P20) | 9 | — | — | 11 | **FIX-FIGURA** | Menc.sin.campo: P18,19,20 9/30 sin Paso N… |
| 71 | `2014-final-2-2014.md` | parcial_curso | 2014 | Examen Final · Curso Pre-Facultativo (Gestión 2-2014) | 30 | ok | — | 0 | 0 | 2 (P19,P20) | 4 (P23,P25,P27,P28) | — | — | 8 | **FIX-FIGURA** | Menc.sin.campo: P19,20… |
| 72 | `2014-parcial1-1-2014.md` | parcial_curso | 2014 | Primer Parcial · Curso Pre-Facultativo (Gestión 1-2014) | 30 | ok | — | 0 | 0 | 0 | 8 (P21,P22,P23,P24,P25,P28,P29,P30) | — | — | 5 | **OK-TEXTO** | 8/30 sin Paso N… |
| 73 | `2014-parcial1-2-2014.md` | parcial_curso | 2014 | Primer Parcial · Curso Pre-Facultativo (Gestión 2-2014) | 30 | ok | — | 0 | 0 | 0 | 8 (P21,P22,P23,P24,P25,P27,P28,P30) | — | — | 5 | **OK-TEXTO** | 8/30 sin Paso N… |
| 74 | `2014-parcial2-1-2014.md` | parcial_curso | 2014 | Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2014) | 30 | ok | — | 0 | 0 | 0 | 10 | — | — | 5 | **OK-TEXTO** | 10/30 sin Paso N… |
| 75 | `2014-parcial2-2-2014.md` | parcial_curso | 2014 | Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2014) | 30 | ok | — | 0 | 0 | 2 (P16,P19) | 9 | — | — | 9 | **FIX-FIGURA** | Menc.sin.campo: P16,19 9/30 sin Paso N… |
| 76 | `2013-final-2-2013.md` | parcial_curso | 2013 | Examen Final · Curso Pre-Facultativo (Gestión 2-2013) | 30 | ok | — | 0 | 0 | 1 (P17) | 9 | — | — | 7 | **FIX-FIGURA** | Menc.sin.campo: P17 9/30 sin Paso N… |
| 77 | `2013-parcial1-1-2013.md` | parcial_curso | 2013 | Primer Parcial · Curso Pre-Facultativo (Gestión 1-2013) | 30 | ok | — | 0 | 0 | 2 (P16,P19) | 8 (P21,P22,P23,P24,P25,P26,P28,P30) | — | — | 9 | **FIX-FIGURA** | Menc.sin.campo: P16,19 8/30 sin Paso N… |
| 78 | `2013-parcial1-2-2013.md` | parcial_curso | 2013 | Primer Parcial · Curso Pre-Facultativo (Gestión 2-2013) | 30 | ok | — | 0 | 0 | 1 (P18) | 7 (P21,P23,P24,P25,P27,P28,P30) | P30 | — | 9 | **FIX-FIGURA** | Menc.sin.campo: P18 7/30 sin Paso N… |
| 79 | `2013-parcial2-1-2013.md` | parcial_curso | 2013 | Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2013) | 30 | ok | — | 0 | 0 | 2 (P12,P17) | 10 | — | — | 9 | **FIX-FIGURA** | Menc.sin.campo: P12,17 10/30 sin Paso N… |
| 80 | `2013-parcial2-2-2013.md` | parcial_curso | 2013 | Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2013) | 30 | ok | — | 0 | 0 | 1 (P20) | 10 | P20 | — | 9 | **FIX-FIGURA** | Provisorio figura P20 Menc.sin.campo: P20 10/30 sin Paso N… |
| 81 | `2011-final-1-2011.md` | parcial_curso | 2011 | Examen Final · Curso Pre-Facultativo (Gestión 1-2011) | 34 | ok | — | 0 | 0 | 1 (P23) | 10 | — | — | 7 | **FIX-FIGURA** | Menc.sin.campo: P23 10/34 sin Paso N… |
| 82 | `2011-final-2-2011.md` | parcial_curso | 2011 | Examen Final · Curso Pre-Facultativo (Gestión 2-2011) | 30 | ok | — | 0 | 0 | 1 (P8) | 9 | — | — | 7 | **FIX-FIGURA** | Menc.sin.campo: P8 9/30 sin Paso N… |
| 83 | `2011-parcial1-1-2011.md` | parcial_curso | 2011 | Primer Parcial · Curso Pre-Facultativo (Gestión 1-2011) | 34 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 34. Sin deuda visual crítica auto-detectada.… |
| 84 | `2011-parcial1-2-2011.md` | parcial_curso | 2011 | Primer Parcial · Curso Pre-Facultativo (Gestión 2-2011) | 30 | ok | — | 0 | 0 | 0 | 7 (P21,P22,P23,P25,P26,P28,P30) | — | — | 5 | **OK-TEXTO** | 7/30 sin Paso N… |
| 85 | `2011-parcial2-1-2011.md` | parcial_curso | 2011 | Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2011) | 30 | ok | — | 0 | 0 | 0 | 10 | — | — | 5 | **OK-TEXTO** | 10/30 sin Paso N… |
| 86 | `2011-parcial2-2-2011.md` | parcial_curso | 2011 | Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2011) | 30 | ok | — | 0 | 0 | 0 | 10 | — | — | 5 | **OK-TEXTO** | 10/30 sin Paso N… |
| 87 | `2010-2curso-final-2-2010.md` | parcial_curso | 2010 | Examen Final · Segundo Curso Pre-Facultativo (Gestión 2-2010) | 34 | ok | — | 0 | 0 | 1 (P19) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P19… |
| 88 | `2010-2curso-parcial1-2-2010.md` | parcial_curso | 2010 | Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010) | 29 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 29. Sin deuda visual crítica auto-detectada.… |
| 89 | `2010-2curso-parcial2-2-2010.md` | parcial_curso | 2010 | Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010) | 25 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 25. Sin deuda visual crítica auto-detectada.… |
| 90 | `2010-final-2-2010.md` | parcial_curso | 2010 | Examen Final · Primer Curso Pre-Facultativo (Gestión 2-2010) | 34 | ok | — | 0 | 0 | 0 | 9 | — | — | 5 | **OK-TEXTO** | 9/34 sin Paso N… |
| 91 | `2010-parcial1-1-2010.md` | parcial_curso | 2010 | Primer Parcial · Curso Pre-Facultativo (Gestión 1-2010) | 25 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 25. Sin deuda visual crítica auto-detectada.… |
| 92 | `2010-parcial1-2-2010.md` | parcial_curso | 2010 | Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2010) | 25 | ok | — | 0 | 0 | 1 (P7) | 0 | P7 | — | 4 | **FIX-FIGURA** | Provisorio figura P7 Menc.sin.campo: P7… |
| 93 | `2010-parcial2-1-2010.md` | parcial_curso | 2010 | Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2010) | 25 | ok | — | 0 | 0 | 0 | 1 (P21) | — | — | 1 | **OK-TEXTO** | MD 25. Sin deuda visual crítica auto-detectada.… |
| 94 | `2010-parcial2-2-2010.md` | parcial_curso | 2010 | Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2010) | 25 | ok | — | 0 | 0 | 0 | 0 | P15 | — | 2 | **FIX-CONTENIDO** | Provisorio: P15… |
| 95 | `2010-parcial3-1-2010.md` | parcial_curso | 2010 | Tercer Parcial · Curso Pre-Facultativo (Gestión 1-2010) | 25 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 25. Sin deuda visual crítica auto-detectada.… |
| 96 | `2009-2curso-parcial1-2-2009.md` | parcial_curso | 2009 | Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 97 | `2009-2curso-parcial2-2-2009.md` | parcial_curso | 2009 | Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 98 | `2009-parcial1-1-2009.md` | parcial_curso | 2009 | Primer Parcial · Curso Pre-Facultativo (Gestión 1-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | P9 | — | 2 | **FIX-CONTENIDO** | Provisorio: P9… |
| 99 | `2009-parcial1-2-2009.md` | parcial_curso | 2009 | Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 100 | `2009-parcial2-1-2009.md` | parcial_curso | 2009 | Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 101 | `2009-parcial2-2-2009.md` | parcial_curso | 2009 | Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 102 | `2009-parcial3-1-2009.md` | parcial_curso | 2009 | Tercer Parcial · Curso Pre-Facultativo (Gestión 1-2009) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 103 | `2009-parcial3-2-2009.md` | parcial_curso | 2009 | Tercer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) | 30 | ok | — | 0 | 0 | 1 (P19) | 0 | — | — | 2 | **FIX-FIGURA** | Menc.sin.campo: P19… |
| 104 | `2008-2curso-parcial1-2-2008.md` | parcial_curso | 2008 | Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 105 | `2008-2curso-parcial2-2-2008.md` | parcial_curso | 2008 | Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 106 | `2008-2curso-parcial3-2-2008.md` | parcial_curso | 2008 | Tercer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 107 | `2008-parcial1-1-2008.md` | parcial_curso | 2008 | Primer Parcial · Curso Propedéutico (Gestión 1-2008) | 42 | ok | — | 0 | 0 | 0 | 0 | P7 | — | 2 | **FIX-CONTENIDO** | Provisorio: P7… |
| 108 | `2008-parcial1-2-2008.md` | parcial_curso | 2008 | Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) | 42 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 42. Sin deuda visual crítica auto-detectada.… |
| 109 | `2008-parcial2-1-2008.md` | parcial_curso | 2008 | Segundo Parcial · Curso Propedéutico (Gestión 1-2008) | 42 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 42. Sin deuda visual crítica auto-detectada.… |
| 110 | `2008-parcial2-2-2008.md` | parcial_curso | 2008 | Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) | 42 | ok | — | 0 | 0 | 2 (P6,P7) | 0 | — | — | 4 | **FIX-FIGURA** | Menc.sin.campo: P6,7… |
| 111 | `2008-parcial3-1-2008.md` | parcial_curso | 2008 | Tercer Parcial · Curso Propedéutico (Gestión 1-2008) | 42 | ok | — | 0 | 0 | 0 | 2 (P39,P42) | — | — | 2 | **OK-TEXTO** | MD 42. Sin deuda visual crítica auto-detectada.… |
| 112 | `2008-parcial3-2-2008.md` | parcial_curso | 2008 | Tercer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) | 30 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 30. Sin deuda visual crítica auto-detectada.… |
| 113 | `2007-parcial1-1-2007.md` | parcial_curso | 2007 | Primer Parcial · Curso Propedéutico (Gestión 1-2007) | 38 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 38. Sin deuda visual crítica auto-detectada.… |
| 114 | `2007-parcial1-2-2007.md` | parcial_curso | 2007 | Primer Parcial · Curso Propedéutico (Gestión 2-2007) | 42 | ok | — | 0 | 0 | 0 | 16 | — | — | 5 | **OK-TEXTO** | 16/42 sin Paso N… |
| 115 | `2007-parcial2-1-2007.md` | parcial_curso | 2007 | Segundo Parcial · Curso Propedéutico (Gestión 1-2007) | 38 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 38. Sin deuda visual crítica auto-detectada.… |
| 116 | `2007-parcial2-2-2007.md` | parcial_curso | 2007 | Segundo Parcial · Curso Propedéutico (Gestión 2-2007) | 36 | ok | — | 0 | 0 | 0 | 0 | P5 | — | 2 | **FIX-CONTENIDO** | Provisorio: P5… |
| 117 | `2007-parcial3-1-2007.md` | parcial_curso | 2007 | Tercer Parcial · Curso Propedéutico (Gestión 1-2007) | 38 | ok | — | 0 | 0 | 0 | 10 | — | — | 5 | **OK-TEXTO** | 10/38 sin Paso N… |
| 118 | `2007-parcial3-2-2007.md` | parcial_curso | 2007 | Tercer Parcial · Curso Propedéutico (Gestión 2-2007) | 36 | ok | — | 0 | 0 | 0 | 15 | — | — | 5 | **OK-TEXTO** | 15/36 sin Paso N… |
| 119 | `2006-parcial1-1-2006.md` | parcial_curso | 2006 | Primer Parcial · Curso Propedéutico (Gestión I-2006) | 38 | ok | — | 0 | 0 | 0 | 0 | P28 | — | 2 | **FIX-CONTENIDO** | Provisorio: P28… |
| 120 | `2006-parcial1-2-2006.md` | parcial_curso | 2006 | Primer Parcial · Curso Propedéutico (Gestión 2-2006) | 38 | ok | — | 0 | 0 | 0 | 5 (P32,P33,P35,P37,P38) | P4,P20,P34,P36 | — | 13 | **FIX-CONTENIDO** | Provisorio: P4,20,34,36… |
| 121 | `2006-parcial2-1-2006.md` | parcial_curso | 2006 | Segundo Parcial · Curso Propedéutico (Gestión I-2006) | 38 | ok | — | 0 | 0 | 0 | 10 | — | — | 5 | **OK-TEXTO** | 10/38 sin Paso N… |
| 122 | `2006-parcial2-2-2006.md` | parcial_curso | 2006 | Segundo Parcial · Curso Propedéutico (Gestión 2-2006) | 38 | ok | — | 0 | 0 | 0 | 0 | P9 | — | 2 | **FIX-CONTENIDO** | Provisorio: P9… |
| 123 | `2006-parcial3-1-2006.md` | parcial_curso | 2006 | Tercer Parcial · Curso Propedéutico (Gestión I-2006) | 38 | ok | — | 0 | 0 | 0 | 8 (P29,P30,P31,P32,P33,P34,P35,P37) | P2 | — | 7 | **FIX-CONTENIDO** | Provisorio: P2… |
| 124 | `2006-parcial3-2-2006.md` | parcial_curso | 2006 | Tercer Parcial · Curso Propedéutico (Gestión 2-2006) | 38 | ok | — | 0 | 0 | 0 | 0 | P5,P15,P28 | — | 6 | **FIX-CONTENIDO** | Provisorio: P5,15,28… |
| 125 | `2006-parcial4-1-2006.md` | parcial_curso | 2006 | Cuarto Parcial · Curso Propedéutico (Gestión I-2006) | 38 | ok | — | 0 | 0 | 0 | 9 | P21 | — | 7 | **FIX-CONTENIDO** | Provisorio: P21 9/38 sin Paso N… |
| 126 | `2006-parcial4-2-2006.md` | parcial_curso | 2006 | Cuarto Parcial · Curso Propedéutico (Gestión 2-2006) | 38 | ok | — | 0 | 0 | 0 | 0 | — | — | 0 | **OK-TEXTO** | MD 38. Sin deuda visual crítica auto-detectada.… |

---

## 4. Top riesgo automático (primeros 30 a mirar en fix)

| rank | archivo | riesgo | por qué |
|-----:|---------|-------:|---------|
| 1 | `2023-2op-1-2023.md` | 32 | 5 fig huérf, 6 provis, 8 sin pasos |
| 2 | `2022-2op-2-2022.md` | 20 | 3 fig huérf, 1 menc.sin.fig, 2 provis, 6 sin pasos |
| 3 | `2023-1op-2-2023.md` | 18 | 5 fig huérf, 3 sin pasos |
| 4 | `2023-3op-1-2023.md` | 17 | 1 fig huérf, 2 menc.sin.fig, 3 provis, 4 sin pasos |
| 5 | `2022-3op-2-2022.md` | 17 | 2 fig huérf, 3 provis, 6 sin pasos |
| 6 | `2023-2op-2-2023.md` | 16 | 4 fig huérf, 4 sin pasos |
| 7 | `2024-2op-1-2024.md` | 13 | 3 fig huérf, 4 sin pasos |
| 8 | `2006-parcial1-2-2006.md` | 13 | 4 provis, 5 sin pasos |
| 9 | `2016-1op-2-2016.md` | 11 | 4 menc.sin.fig, 3 sin pasos |
| 10 | `2014-final-1-2014.md` | 11 | 3 menc.sin.fig, 9 sin pasos |
| 11 | `2016-3op-1-2016.md` | 10 | 5 menc.sin.fig |
| 12 | `2014-parcial2-2-2014.md` | 9 | 2 menc.sin.fig, 9 sin pasos |
| 13 | `2013-parcial1-1-2013.md` | 9 | 2 menc.sin.fig, 8 sin pasos |
| 14 | `2013-parcial1-2-2013.md` | 9 | 1 menc.sin.fig, 1 provis, 7 sin pasos |
| 15 | `2013-parcial2-1-2013.md` | 9 | 2 menc.sin.fig, 10 sin pasos |
| 16 | `2013-parcial2-2-2013.md` | 9 | 1 menc.sin.fig, 1 provis, 10 sin pasos |
| 17 | `2018-2op-1-2018.md` | 8 | 3 menc.sin.fig, 1 provis |
| 18 | `2017-2op-1-2017.md` | 8 | 4 menc.sin.fig |
| 19 | `2017-3op-1-2017.md` | 8 | 4 menc.sin.fig |
| 20 | `2016-1op-1-2016.md` | 8 | 4 menc.sin.fig |
| 21 | `2016-2op-1-2016.md` | 8 | 2 menc.sin.fig, 4 sin pasos |
| 22 | `2016-2op-2-2016.md` | 8 | 3 menc.sin.fig, 2 sin pasos |
| 23 | `2015-1op-2-2015.md` | 8 | 4 menc.sin.fig |
| 24 | `2014-final-2-2014.md` | 8 | 2 menc.sin.fig, 4 sin pasos |
| 25 | `2024-1op-1-2024.md` | 7 | 1 fig huérf, 4 sin pasos |
| 26 | `2013-final-2-2013.md` | 7 | 1 menc.sin.fig, 9 sin pasos |
| 27 | `2011-final-1-2011.md` | 7 | 1 menc.sin.fig, 10 sin pasos |
| 28 | `2011-final-2-2011.md` | 7 | 1 menc.sin.fig, 9 sin pasos |
| 29 | `2006-parcial3-1-2006.md` | 7 | 1 provis, 8 sin pasos |
| 30 | `2006-parcial4-1-2006.md` | 7 | 1 provis, 9 sin pasos |

---

## 5. Detalle preguntas con deuda visual (auto)

### 5.1 Campo figura con ID sin motor

**`2024-1op-1-2024.md`**
- P5: `g5-semicirculo-cuartocirculo`

**`2024-2op-1-2024.md`**
- P5: `g5-cadena`
- P7: `g7-cuadrilatero`
- P10: `f10-polea`

**`2023-1op-2-2023.md`**
- P5: `g5-satelite`
- P6: `g6-secantes`
- P10: `f10-plano-cuadrado`
- P11: `f11-campo-electrico`
- P12: `f12-proyectil-rampa`

**`2023-2op-1-2023.md`**
- P5: `g5-semicircunferencias-cuadrado`
- P6: `g6-triangulo-tres-cuadrados`
- P7: `g7-triangulo-cuadrado-sombreado`
- P9: `f9-cuatro-vectores-circulo`
- P12: `f12-circuito-dos-fuentes`

**`2023-2op-2-2023.md`**
- P5: `g5-triangulo-cp-pb`
- P9: `f9-circuito-puente`
- P10: `f10-proyectil-energia`
- P11: `f11-moscas-sombras`

**`2023-3op-1-2023.md`**
- P8: `g8-octogono-secantes`

**`2022-2op-2-2022.md`**
- P7: `g7-dos-cuadrados-arcos`
- P9: `f9-parabolico-hmax`
- P10: `f10-circuito-4r-10v-3r-5v`

**`2022-3op-2-2022.md`**
- P7: `g7-camaras-angulos-2a-a-2a`
- P10: `f10-parabolico-hmax`

**`2006-2op-1-2006.md`**
- P12: `f12-circuito-cuatro-resistencias-r`

**`2005-1op-1-2005.md`**
- P19: `f19-tres-cargas-simetricas`

### 5.2 Mencionan figura en texto sin campo `figura:`

- `2023-3op-1-2023.md`: P5, P7
- `2022-2op-2-2022.md`: P11
- `2020-2op-1-2020.md`: P12
- `2019-1op-1-2019.md`: P5
- `2019-1op-2-2019.md`: P11
- `2019-2op-1-2019.md`: P11
- `2019-3op-1-2019.md`: P6
- `2018-1op-1-2018.md`: P5, P11
- `2018-1op-2-2018.md`: P3, P5, P8
- `2018-2op-1-2018.md`: P7, P9, P11
- `2018-2op-2-2018.md`: P5
- `2018-3op-1-2018.md`: P7, P9, P10
- `2017-1op-1-2017.md`: P9
- `2017-1op-2-2017.md`: P7, P9
- `2017-2op-1-2017.md`: P6, P7, P9, P11
- `2017-2op-2-2017.md`: P5, P7, P12
- `2017-3op-1-2017.md`: P6, P7, P9, P11
- `2016-1op-1-2016.md`: P5, P6, P7, P10
- `2016-1op-2-2016.md`: P5, P6, P10, P11
- `2016-2op-1-2016.md`: P5, P10
- `2016-2op-2-2016.md`: P5, P6, P11
- `2016-3op-1-2016.md`: P5, P6, P8, P10, P11
- `2015-1op-1-2015.md`: P5, P7, P10
- `2015-1op-2-2015.md`: P6, P7, P8, P12
- `2015-2op-1-2015.md`: P6
- `2015-2op-2-2015.md`: P5, P7
- `2014-2op-1-2014.md`: P9
- `2014-unica-2-2014.md`: P7, P10, P12
- `2013-unica-2-2013.md`: P9
- `2011-1op-1-2011.md`: P10
- `2011-unica-2-2011.md`: P11
- `2006-1op-1-2006.md`: P12
- `2005-1op-1-2005.md`: P18
- `2005-2op-1-2005.md`: P17, P20
- `2014-final-1-2014.md`: P18, P19, P20
- `2014-final-2-2014.md`: P19, P20
- `2014-parcial2-2-2014.md`: P16, P19
- `2013-final-2-2013.md`: P17
- `2013-parcial1-1-2013.md`: P16, P19
- `2013-parcial1-2-2013.md`: P18
- `2013-parcial2-1-2013.md`: P12, P17
- `2013-parcial2-2-2013.md`: P20
- `2011-final-1-2011.md`: P23
- `2011-final-2-2011.md`: P8
- `2010-2curso-final-2-2010.md`: P19
- `2010-parcial1-2-2010.md`: P7
- `2009-parcial3-2-2009.md`: P19
- `2008-parcial2-2-2008.md`: P6, P7

---

## 6. Protocolo de lotes (humano)

1. Tomar 5–10 filas `PENDIENTE` (empezar admisión 2025→ atrás).
2. Abrir PDF facsímil + MD + `/resueltos/[id]` en browser.
3. Llenar `visual_humano` y `notas`.
4. No fix en esta fase.
5. Cuando un bloque de años esté cerrado, sprint de fix ordenado por riesgo.

### Lote 1 sugerido (arrancar acá)

- [x] `2025-1op-2-2025.md` (riesgo_auto=5)
- [x] `2025-2op-2-2025-version-b.md` (riesgo_auto=4)
- [x] `2025-2op-2-2025.md` (riesgo_auto=5)
- [x] `2025-3op-1-2025.md` (riesgo_auto=5)
- [x] `2024-1op-1-2024.md` (riesgo_auto=7)
- [x] `2024-2op-1-2024.md` (riesgo_auto=13)
- [x] `2023-1op-1-2023.md` (riesgo_auto=4)
- [x] `2023-1op-2-2023.md` (riesgo_auto=18)
- [x] `2023-2op-1-2023.md` (riesgo_auto=32)
- [x] `2023-2op-2-2023.md` (riesgo_auto=16)
- [x] `2023-3op-1-2023.md` (riesgo_auto=17)

---

## 7. Contadores por categoría

| Cat | N | preg | fig ref | fig huérf | menc.sin | sin pasos |
|-----|--:|-----:|--------:|----------:|---------:|----------:|
| admision | 69 | 1344 | 38 | 26 | 73 | 104 |
| parcial_curso | 57 | 1867 | 0 | 0 | 21 | 223 |
| TOTAL | 126 | 3211 | 38 | 26 | 94 | 327 |
---

## 8. Lote 1 — Admisión 2023–2025 (cerrado 2026-07-29)

Auditoría humana PDF ↔ MD. **Sin fixes de contenido todavía.**

### Resumen semáforo

| Semáforo | Cant | Archivos |
|----------|-----:|----------|
| BLOQUEANTE | 4 | 2025-1op-2, 2025-2op-2, 2025-3op-1, 2023-2op-1 |
| FIX-FIGURA | 5 | 2024-1op-1, 2024-2op-1, 2023-1op-2, 2023-2op-2, 2023-3op-1 |
| FIX-CONTENIDO | 1 | 2025-2op-2-version-b (fragmento bio) |
| OK-TEXTO | 1 | 2023-1op-1 (mejor del lote; 6 figuras motor) |
| OK | 0 | — |

### Hallazgo #1 — Exámenes 2025 incompletos (crítico)

Los facsímiles PDF de ingreso 2025 tienen **20 preguntas**. Los MD cargados tienen **15 / 13 / 12**. No es solo visual: **faltan ítems enteros** (sobre todo geometría con figura).

| MD | PDF | MD | PDF | Faltantes notorios |
|----|-----|---:|----:|--------------------|
| 2025-1op-2-2025.md | 2025-2-1op.pdf | 15 | 20 | A1, A2, G6 semicírculos, G8 hex+pent, G9 helicóptero |
| 2025-2op-2-2025.md | 2025-2-2op.pdf | 13 | ~20 | A3, A5, G8–G10, F14, Q20 |
| 2025-3op-1-2025.md | 2025-1-3op.pdf | 12 | 20 | A1–A3, G5–G8, Q16… |

Además todas las explicaciones 2025 van **corridas** (sin Paso N).

### Hallazgo #2 — Figuras sin motor

- 2024: `g5-semicirculo-cuartocirculo`, `g5-cadena`, `g7-cuadrilatero`, `f10-polea`
- 2023-1op-2: `g5-satelite`, `g6-secantes`, `f10-plano-cuadrado`, `f11-campo-electrico`, `f12-proyectil-rampa`
- 2023-2op-1: `g5-semicircunferencias-cuadrado`, `g6-triangulo-tres-cuadrados`, `g7-triangulo-cuadrado-sombreado`, `f9-cuatro-vectores-circulo`, `f12-circuito-dos-fuentes`
- 2023-2op-2: `g5-triangulo-cp-pb`, `f9-circuito-puente`, `f10-proyectil-energia`, `f11-moscas-sombras`
- 2023-3op-1: `g8-octogono-secantes`
- **OK:** 2023-1op-1 tiene 6 figuras en motor

### Hallazgo #3 — 2023-2op-1 con VERIFICAR sin respuesta

P5/P6/P7/P9/P12 sin letra confiable; el PDF sí tiene las figuras. Bloqueante pedagógico.

### Detalle por examen

#### `2025-1op-2-2025.md` → **BLOQUEANTE**

- PDF: `2025-2-1op.pdf` (20 PDF / 15 MD)
- Flags: incompleto, sin-pasos, figs-pdf-ausentes
- PDF 20 preg (2025-2-1op.pdf) vs MD 15. Faltan A1,A2,G6,G8,G9. Subconjunto renumerado (A3→P1…). Figuras PDF ausentes: G6 semicírculos, G8 hex+pent, G9 helicóptero, F13 cañón/tanque, F15 resorte. Sin Paso N en las 15. Nota útil en P15 (van’t Hoff). NO apto como facsímil completo.

#### `2025-2op-2-2025.md` → **BLOQUEANTE**

- PDF: `2025-2-2op.pdf` (20 PDF / 13 MD)
- Flags: incompleto, sin-pasos
- PDF 2025-2-2op.pdf trae versión ~20 ítems + bloque bio. MD solo 13 (subconjunto). Faltan A3, A5, G8–G10, F14, Q20. Sin figura. Sin Paso N. No es el examen completo.

#### `2025-2op-2-2025-version-b.md` → **FIX-CONTENIDO**

- PDF: `2025-2-2op.pdf (bloque B)` (4 PDF / 4 MD)
- Flags: fragmento, listado-confuso
- Solo 4 preguntas bio (B17–B20 del PDF 2op). Fragmento de la versión B, no examen standalone. Listado confuso. Integrar o etiquetar como complemento.

#### `2025-3op-1-2025.md` → **BLOQUEANTE**

- PDF: `2025-1-3op.pdf` (20 PDF / 12 MD)
- Flags: incompleto, sin-pasos, fig-faltante
- PDF 2025-1-3op.pdf = 20 preg. MD = 12 (salta A1–A3 y G5–G8). Faltan figuras G6/G8. P5 menciona figura sin campo. 11/12 sin Paso N.

#### `2024-1op-1-2024.md` → **FIX-FIGURA**

- PDF: `2024-1-1op.pdf` (20 PDF / 20 MD)
- Flags: fig-huerfana, bio-sin-pasos
- Cobertura OK 20/20 vs 2024-1-1op.pdf. P5 figura g5-semicirculo-cuartocirculo HUÉRFANA (PDF tiene semicírculo+cuarto sombreado). P5 → E) Ninguno coherente. P17–20 bio sin Paso N. Resto con pasos sólidos.

#### `2024-2op-1-2024.md` → **FIX-FIGURA**

- PDF: `2024-1-2op.pdf` (20 PDF / 20 MD)
- Flags: fig-huerfana-x3, bio-sin-pasos
- Cobertura OK 20/20 vs 2024-1-2op.pdf. 3 figuras huérfanas: P5 g5-cadena, P7 g7-cuadrilatero, P10 f10-polea. Pasos existen; sin dibujo el alumno no valida. P17–20 bio sin Paso N.

#### `2023-1op-1-2023.md` → **OK-TEXTO**

- PDF: `1-op-1-2023.pdf` (20 PDF / 20 MD)
- Flags: figuras-motor-ok, bio-sin-pasos, spotcheck-ui
- Mejor del lote. 20/20 vs 1-op-1-2023.pdf. 6 figuras CON motor: g5-paralelas, g6-isosceles, g7-cuadrado, f10-plano, f11-campo, f12-circuito. PDF confirma G5/G6/G7. Pasos P1–16 excelentes. P17–20 bio sin Paso N. Pendiente spot-check UI de SVG vs PDF.

#### `2023-1op-2-2023.md` → **FIX-FIGURA**

- PDF: `2023-2-1op.pdf` (20 PDF / 20 MD)
- Flags: fig-huerfana-x5, bio-sin-pasos
- 20/20 vs 2023-2-1op.pdf. 5 figuras huérfanas: g5-satelite, g6-secantes, f10-plano-cuadrado, f11-campo-electrico, f12-proyectil-rampa. MD tiene descripciones largas pero motor no renderiza. Pasos P1–16 bien. P17–20 bio sin pasos.

#### `2023-2op-1-2023.md` → **BLOQUEANTE**

- PDF: `2-op-1-2023.pdf` (20 PDF / 20 MD)
- Flags: verificares-sin-respuesta, fig-huerfana-x5, bloques-pedagogicos
- 20/20 stems vs 2-op-1-2023.pdf. PEOR del lote. 5 figuras huérfanas + VERIFICAR sin respuesta en P5/P6/P7/P9/P12. PDF nítido SÍ muestra topologías (semicírculos, 3 cuadrados, triángulo sombreado, vectores 30°, circuito 12V/5V). Engaña al estudiante. Fix: re-resolver + dibujar.

#### `2023-2op-2-2023.md` → **FIX-FIGURA**

- PDF: `2023-2-2op.pdf` (20 PDF / 20 MD)
- Flags: fig-huerfana-x4, bio-sin-pasos
- 20/20 vs 2023-2-2op.pdf. 4 figuras huérfanas: g5-triangulo-cp-pb, f9-circuito-puente, f10-proyectil-energia, f11-moscas-sombras. Explicaciones con pasos y respuestas (no provisorias). P17–20 sin pasos.

#### `2023-3op-1-2023.md` → **FIX-FIGURA**

- PDF: `3-op-1-2023.pdf` (20 PDF / 20 MD)
- Flags: fig-huerfana, menc-sin-campo, verificares
- 20/20 vs 3-op-1-2023.pdf. P8 g8-octogono-secantes huérfana + VERIFICAR. P5 y P7 mencionan figura sin campo. Respuestas P5/P7 sí calculadas. Revisar provis P14/P15.

### Backlog de fix (cuando abramos sprint)

1. Completar los 3 MD 2025 desde PDF (20/20) + Paso N + figuras faltantes.
2. Re-resolver 2023-2op-1 P5/P6/P7/P9/P12 + 5 figuras motor.
3. Motor SVG para huérfanas 2023-1op-2, 2023-2op-2, 2024-*.
4. Spot-check UI de 2023-1op-1 (candidato a primer OK).
5. Unificar version-b 2025 en el listado.

### Próximo lote humano

Lote 2: admisión **2022 → 2020**.

---

## 9. Auditoría completa resto del banco (cerrado 2026-07-29)

> Solo anotación. **No se modificaron** `data/examenes/` ni el motor de figuras ni la app.

Método: Lote 1 (admisión 2023–2025) = revisión humana con PDF renderizado. Resto = semi-auto (flags MD: fig huérfana, mención sin campo, VERIFICAR/provisorio, sin Paso N) + mapeo PDF manual de años recientes + conteo pdfplumber (PDFs escaneados viejos suelen dar count 0 → no se usa para marcar incompleto).

### Resumen global (126)

| Semáforo | Cant |
|----------|-----:|
| BLOQUEANTE | 6 |
| FIX-FIGURA | 52 |
| FIX-PASOS | 0 |
| FIX-CONTENIDO | 14 |
| OK-TEXTO | 54 |
| OK | 0 |
| PENDIENTE | 0 |

### BLOQUEANTE

- `2025-1op-2-2025.md` (admision, 2025): PDF 20 preg (2025-2-1op.pdf) vs MD 15. Faltan A1,A2,G6,G8,G9. Subconjunto renumerado (A3→P1…). Figuras PDF ausentes: G6 semicírculos, G8 hex+pent, G9 helicóptero, F13 cañón/tanque, F15 resorte. Sin Paso N en las 15. Nota útil en P15 (van’t Hoff). NO apto como facsímil completo.
- `2025-2op-2-2025.md` (admision, 2025): PDF 2025-2-2op.pdf trae versión ~20 ítems + bloque bio. MD solo 13 (subconjunto). Faltan A3, A5, G8–G10, F14, Q20. Sin figura. Sin Paso N. No es el examen completo.
- `2025-3op-1-2025.md` (admision, 2025): PDF 2025-1-3op.pdf = 20 preg. MD = 12 (salta A1–A3 y G5–G8). Faltan figuras G6/G8. P5 menciona figura sin campo. 11/12 sin Paso N.
- `2023-2op-1-2023.md` (admision, 2023): 20/20 stems vs 2-op-1-2023.pdf. PEOR del lote. 5 figuras huérfanas + VERIFICAR sin respuesta en P5/P6/P7/P9/P12. PDF nítido SÍ muestra topologías (semicírculos, 3 cuadrados, triángulo sombreado, vectores 30°, circuito 12V/5V). Engaña al estudiante. Fix: re-resolver + dibujar.
- `2022-2op-2-2022.md` (admision, 2022): VERIFICAR/provisorio en figuras: P7,9 6/20 sin Paso N Curador: priorizó contenido sobre figuras PDF: 2-op-2-2022.pdf (count 20)
- `2022-3op-2-2022.md` (admision, 2022): VERIFICAR/provisorio en figuras: P7,10 6/20 sin Paso N Curador: priorizó contenido sobre figuras PDF: 3-op-2-2022.pdf (count 20)

### FIX-FIGURA

- `2024-1op-1-2024.md`: Cobertura OK 20/20 vs 2024-1-1op.pdf. P5 figura g5-semicirculo-cuartocirculo HUÉRFANA (PDF tiene semicírculo+cuarto sombreado). P5 → E) Ninguno coherente. P17–20 bio sin Paso N. Resto con pasos sólidos.
- `2024-2op-1-2024.md`: Cobertura OK 20/20 vs 2024-1-2op.pdf. 3 figuras huérfanas: P5 g5-cadena, P7 g7-cuadrilatero, P10 f10-polea. Pasos existen; sin dibujo el alumno no valida. P17–20 bio sin Paso N.
- `2023-1op-2-2023.md`: 20/20 vs 2023-2-1op.pdf. 5 figuras huérfanas: g5-satelite, g6-secantes, f10-plano-cuadrado, f11-campo-electrico, f12-proyectil-rampa. MD tiene descripciones largas pero motor no renderiza. Pasos P1–16 bien. P17–20 bio sin pasos.
- `2023-2op-2-2023.md`: 20/20 vs 2023-2-2op.pdf. 4 figuras huérfanas: g5-triangulo-cp-pb, f9-circuito-puente, f10-proyectil-energia, f11-moscas-sombras. Explicaciones con pasos y respuestas (no provisorias). P17–20 sin pasos.
- `2023-3op-1-2023.md`: 20/20 vs 3-op-1-2023.pdf. P8 g8-octogono-secantes huérfana + VERIFICAR. P5 y P7 mencionan figura sin campo. Respuestas P5/P7 sí calculadas. Revisar provis P14/P15.
- `2020-2op-1-2020.md`: Menc.sin.campo: P12 PDF: 162_2da-op-1-2020.pdf (count 16)
- `2019-1op-1-2019.md`: Menc.sin.campo: P5
- `2019-1op-2-2019.md`: Menc.sin.campo: P11 PDF: 159_1ra-op-2-2019.pdf (count 16)
- `2019-2op-1-2019.md`: Menc.sin.campo: P11
- `2019-3op-1-2019.md`: Menc.sin.campo: P6
- `2018-1op-1-2018.md`: Menc.sin.campo: P5,11 PDF: 151_1ra-op-1-2018.pdf (count 16)
- `2018-1op-2-2018.md`: Menc.sin.campo: P3,5,8 PDF: 154_1ra-op-2-2018.pdf (count 16)
- `2018-2op-1-2018.md`: Menc.sin.campo: P7,9,11 PDF: 152_2da-op-1-2018.pdf (count 16)
- `2018-2op-2-2018.md`: Menc.sin.campo: P5 PDF: 155_2da-op-2-2018.pdf (count 16)
- `2018-3op-1-2018.md`: Menc.sin.campo: P7,9,10 PDF: 153_3ra-op-1-2018.pdf (count 19)
- `2017-1op-1-2017.md`: Menc.sin.campo: P9 PDF: 146_1ra-op-1-2017.pdf (count 20)
- `2017-1op-2-2017.md`: Menc.sin.campo: P7,9 PDF: 149_1ra-op-2-2017.pdf (count 16)
- `2017-2op-1-2017.md`: Menc.sin.campo: P6,7,9,11 PDF: 147_2da-op-1-2017.pdf (count 16)
- `2017-2op-2-2017.md`: Menc.sin.campo: P5,7,12 PDF: 150_2da-op-2-2017.pdf (count 16)
- `2017-3op-1-2017.md`: Menc.sin.campo: P6,7,9,11 PDF: 148_3ra-op-1-2017.pdf (count 16)
- `2016-1op-1-2016.md`: Menc.sin.campo: P5,6,7,10 PDF: 141_1ra-op-1-2016.pdf (count 14)
- `2016-1op-2-2016.md`: Menc.sin.campo: P5,6,10,11 PDF: 144_1ra-op-2-2016.pdf (count 12)
- `2016-2op-1-2016.md`: Menc.sin.campo: P5,10 PDF: 142_2da-op-1-2016.pdf (count 20)
- `2016-2op-2-2016.md`: Menc.sin.campo: P5,6,11 PDF: 145_2da-op-2-2016.pdf (count 20)
- `2016-3op-1-2016.md`: Menc.sin.campo: P5,6,8,10,11 PDF: 143_2ra-op-1-2016.pdf (count 20)
- `2015-1op-1-2015.md`: Menc.sin.campo: P5,7,10 PDF: 137_1ra-op-1-2015.pdf (count 20)
- `2015-1op-2-2015.md`: Menc.sin.campo: P6,7,8,12 PDF: 139_1ra-op-2-2015.pdf (count 20)
- `2015-2op-1-2015.md`: Menc.sin.campo: P6 PDF: 138_2da-op-1-2015.pdf (count 20)
- `2015-2op-2-2015.md`: Menc.sin.campo: P5,7 PDF: 140_2da-op-2-2015.pdf (count 19)
- `2014-2op-1-2014.md`: Menc.sin.campo: P9 PDF: 129_2da-op-1-2014.pdf (count 20)
- `2014-final-1-2014.md`: Menc.sin.campo: P18,19,20 9/30 sin Paso N
- `2014-final-2-2014.md`: Menc.sin.campo: P19,20
- `2014-parcial2-2-2014.md`: Menc.sin.campo: P16,19 9/30 sin Paso N
- `2014-unica-2-2014.md`: Menc.sin.campo: P7,10,12 PDF: 133_unica2-2014.pdf (count 20)
- `2013-final-2-2013.md`: Menc.sin.campo: P17 9/30 sin Paso N
- `2013-parcial1-1-2013.md`: Menc.sin.campo: P16,19 8/30 sin Paso N
- `2013-parcial1-2-2013.md`: Menc.sin.campo: P18 7/30 sin Paso N
- `2013-parcial2-1-2013.md`: Menc.sin.campo: P12,17 10/30 sin Paso N
- `2013-parcial2-2-2013.md`: Provisorio figura P20 Menc.sin.campo: P20 10/30 sin Paso N
- `2013-unica-2-2013.md`: Menc.sin.campo: P9 PDF: 124_ExamenAdmisionUnicaOpcion2-2013.pdf (count 20)
- `2011-1op-1-2011.md`: Menc.sin.campo: P10
- `2011-final-1-2011.md`: Menc.sin.campo: P23 10/34 sin Paso N
- `2011-final-2-2011.md`: Menc.sin.campo: P8 9/30 sin Paso N
- `2011-unica-2-2011.md`: Menc.sin.campo: P11
- `2010-2curso-final-2-2010.md`: Menc.sin.campo: P19
- `2010-parcial1-2-2010.md`: Provisorio figura P7 Menc.sin.campo: P7
- `2009-parcial3-2-2009.md`: Menc.sin.campo: P19
- `2008-parcial2-2-2008.md`: Menc.sin.campo: P6,7
- `2006-1op-1-2006.md`: Menc.sin.campo: P12
- `2006-2op-1-2006.md`: Provisorio figura P12 Huérfanas: P12:f12-circuito-cuatro-resistencias-r PDF: 055_ExamenAdmisionSegundaOpcion1-2006.pdf (count 0)
- `2005-1op-1-2005.md`: Huérfanas: P19:f19-tres-cargas-simetricas Menc.sin.campo: P18 Curador: priorizó contenido sobre figuras PDF: 050_ExamenAdmisionPrimerOpcion1-2005.pdf (count 0)
- `2005-2op-1-2005.md`: Menc.sin.campo: P17,20 Curador: priorizó contenido sobre figuras PDF: 051_ExamenAdmisionSegundaOpcion1-2005.pdf (count 20)

### FIX-PASOS


### FIX-CONTENIDO

- `2025-2op-2-2025-version-b.md`: Solo 4 preguntas bio (B17–B20 del PDF 2op). Fragmento de la versión B, no examen standalone. Listado confuso. Integrar o etiquetar como complemento.
- `2020-1op-1-2020.md`: Provisorio: P3,18 PDF: 161_1ra-op-1-2020.pdf (count 16)
- `2014-1op-1-2014.md`: Provisorio: P4 PDF: 128_1ra-op-1-2014.pdf (count 20)
- `2010-1op-1-2010.md`: Provisorio: P12
- `2010-parcial2-2-2010.md`: Provisorio: P15
- `2009-parcial1-1-2009.md`: Provisorio: P9
- `2008-parcial1-1-2008.md`: Provisorio: P7
- `2007-parcial2-2-2007.md`: Provisorio: P5
- `2006-parcial1-1-2006.md`: Provisorio: P28
- `2006-parcial1-2-2006.md`: Provisorio: P4,20,34,36
- `2006-parcial2-2-2006.md`: Provisorio: P9
- `2006-parcial3-1-2006.md`: Provisorio: P2
- `2006-parcial3-2-2006.md`: Provisorio: P5,15,28
- `2006-parcial4-1-2006.md`: Provisorio: P21 9/38 sin Paso N

### OK-TEXTO por año

| cat:año | n |
|---------|--:|
| parcial_curso:2014 | 3 |
| parcial_curso:2011 | 4 |
| parcial_curso:2010 | 6 |
| parcial_curso:2009 | 6 |
| parcial_curso:2008 | 7 |
| parcial_curso:2007 | 5 |
| parcial_curso:2006 | 2 |
| admision:2023 | 1 |
| admision:2022 | 1 |
| admision:2020 | 1 |
| admision:2019 | 1 |
| admision:2012 | 2 |
| admision:2011 | 1 |
| admision:2010 | 2 |
| admision:2009 | 3 |
| admision:2008 | 3 |
| admision:2007 | 3 |
| admision:2006 | 1 |
| admision:2005 | 2 |

Total OK-TEXTO: **54**

### Limitaciones del resto semi-auto

- No re-renderiza cada PDF viejo escaneado (muchos count=0).
- No valida fidelidad numérica de cada enunciado vs facsímil.
- Un OK-TEXTO puede esconder error de contenido puntual; el fix sprint debe muestrear.
- Lote 1 humano (2023–2025) sigue siendo la referencia de calidad de método.

### Backlog de fix global

1. Completar MD 2025 incompletos (Lote 1).
2. Re-resolver todos los BLOQUEANTE (VERIFICAR + incompletos).
3. Motor SVG para todas las figuras huérfanas listadas.
4. Agregar figura: + dibujo a menciones sin campo.
5. Paso N en explicaciones corridas (parciales/2025).
6. Spot-check UI 2023-1op-1 (mejor del banco).

*Fin auditoría: inventario + Lote1 humano + resto semi-auto. Sin cambios de contenido.*

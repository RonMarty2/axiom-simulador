# Informe simple — ¿Los exámenes sirven o no?

Fecha: 2026-07-29  
Solo se **anotó** lo que hay. **No se corrigió nada** todavía.

---

## En una frase

El banco de Ingeniería tiene **126 exámenes** cargados.  
La mayoría se puede estudiar, pero **hay problemas de figuras y 6 exámenes mal de verdad**.  
Los peores son de **2025 y algunos 2022/2023** (justo los más recientes).

---

## Semáforo (cómo leerlo)

| Color | Significa | ¿Qué hace el estudiante? |
|-------|-----------|---------------------------|
| **ROJO** | Examen incompleto o con respuestas dudosas en figuras | Se confunde o le falta material |
| **NARANJA** | Falta el dibujo (figura) aunque el texto esté | Puede resolver a veces, pero no “ve” el problema |
| **AMARILLO** | Algún detalle dudoso o pasos feos | Usable con cuidado |
| **VERDE suave** | Texto y respuestas OK; sin deuda grave detectada | Sirve para practicar (puede faltar lindo visual) |

En el archivo largo esos colores se llaman:  
ROJO = BLOQUEANTE · NARANJA = FIX-FIGURA · AMARILLO = FIX-CONTENIDO / FIX-PASOS · VERDE = OK-TEXTO

---

## Números del banco (126 exámenes)

| Estado | Cantidad | En criollo |
|--------|----------|------------|
| ROJO | **6** | Hay que arreglar YA |
| NARANJA | **52** | Falta dibujo / figura |
| AMARILLO | **14** | Algo dudoso en el contenido |
| VERDE suave | **54** | Parecen bien a nivel texto |
| Verde perfecto | **0** | Ninguno revisado al 100% en la pantalla del simulador |

---

## Los 6 ROJOS (mirá estos primero)

### 1) Examen ingreso 2-2025 · 1ra opción
- Archivo del simulador: `2025-1op-2-2025.md`
- PDF: `examenes pasados/2025-2-1op.pdf`
- **Problema:** el PDF tiene **20** preguntas; en el simulador hay **15**. Faltan 5 (varias de geometría con dibujo).
- **Cómo verificar:** abrí el PDF y contá las preguntas. Después abrí ese examen en `/resueltos` y contá. No van a coincidir.

### 2) Examen ingreso 2-2025 · 2da opción
- Archivo: `2025-2op-2-2025.md`
- PDF: `examenes pasados/2025-2-2op.pdf`
- **Problema:** PDF ~20 preguntas; simulador **13**. Incompleto.
- Hay otro archivo chiquito (`…version-b.md`) con solo 4 de biología: es un **pedazo**, no un examen entero.

### 3) Examen ingreso 1-2025 · 3ra opción
- Archivo: `2025-3op-1-2025.md`
- PDF: `examenes pasados/2025-1-3op.pdf`
- **Problema:** PDF 20; simulador **12**. Incompleto.

### 4) Examen ingreso 1-2023 · 2da opción
- Archivo: `2023-2op-1-2023.md`
- PDF: `examenes pasados/2-op-1-2023.pdf`
- **Problema:** las preguntas con **figura** quedaron en “no estoy seguro / VERIFICAR” **sin respuesta confiable**. El PDF sí tiene los dibujos.
- **Cómo verificar:** en el MD buscá “VERIFICAR”. En el simulador vas a ver explicaciones que no cierran en una letra clara.

### 5) Examen ingreso 2-2022 · 2da opción
- Archivo: `2022-2op-2-2022.md`
- PDF: `examenes pasados/2-op-2-2022.pdf`
- **Problema:** figuras que no se dibujan + algunas respuestas “VERIFICAR”.

### 6) Examen ingreso 2-2022 · 3ra opción
- Archivo: `2022-3op-2-2022.md`
- PDF: `examenes pasados/3-op-2-2022.pdf`
- **Problema:** igual que el anterior (figuras + VERIFICAR).

---

## Qué significa “falta la figura” (los NARANJA)

En el examen real hay un **dibujo** (triángulo, circuito, polea, etc.).

En el simulador puede pasar una de estas:

1. El texto dice “ver la figura” pero **no hay dibujo**.
2. Hay un nombre de figura (`figura: g5-algo`) pero el motor **no la dibuja** (pantalla vacía).
3. Solo hay 12 figuras realmente programadas; el resto de IDs están “nombrados” pero no existen.

**Cómo verificar en 30 segundos:**
1. Abrí el PDF y buscá un dibujo.
2. Abrí el mismo examen en el simulador (`/resueltos`).
3. Si en el PDF hay dibujo y en la app no, es NARANJA (o ROJO si además la respuesta está dudosa).

---

## El que mejor está (ejemplo bueno)

**`2023-1op-1-2023.md`** (ingreso 1-2023, 1ra opción)  
PDF: `examenes pasados/1-op-1-2023.pdf`

- 20 preguntas = 20 del PDF  
- Tiene **6 figuras** que sí se dibujan en el sistema  
- Explicaciones paso a paso en la mayoría  

Sirve para comparar: “así se ve un examen bien cargado”.

---

## Cómo cruzar las 3 cosas (tu checklist)

Para **un** examen:

```
PDF  ←→  archivo .md  ←→  pantalla /resueltos
```

| Pregunta | Qué mirar |
|----------|-----------|
| ¿Está completo? | ¿Misma cantidad de preguntas PDF vs app? |
| ¿El enunciado es el mismo? | Mismos datos, mismas opciones A–E |
| ¿Hay figura? | Si el PDF tiene dibujo, ¿se ve en la app? |
| ¿Se entiende la solución? | ¿Aparecen pasos (Paso 1, Paso 2…)? ¿La respuesta es una letra clara? |

Si las 4 dan bien → ese examen sirve.  
Si falla 1 → anotá y listo (ya está en el informe largo con más detalle).

---

## Dónde están los archivos

| Qué | Dónde |
|-----|--------|
| **Este informe simple** | `data/research/umss/INFORME-SIMPLE.md` |
| Informe largo (técnico) | `data/research/umss/auditoria-ingenieria.md` |
| PDFs originales | `examenes pasados/` |
| Exámenes del simulador | `data/examenes/umss/ingenieria/` |
| Pantalla del estudiante | app → `/resueltos` (facultad Ingeniería) |

---

## Qué NO se hizo todavía

- No se completaron los 2025  
- No se dibujaron las figuras faltantes  
- No se reescribieron respuestas VERIFICAR  
- No se “arregló” nada en el simulador  

Solo se **miró y se anotó**.

---

## Orden recomendado si querés verificar a mano

1. Los **6 ROJOS** de arriba (1 por uno: PDF + app).  
2. El **bueno** 2023-1op-1 (para ver cómo debería verse).  
3. Cualquier otro que uses mucho con estudiantes.

Si algo del informe largo no cierra con lo que ves en el PDF o en la app, gana **lo que ves vos**: el PDF es la verdad y la app es lo que ve el alumno.

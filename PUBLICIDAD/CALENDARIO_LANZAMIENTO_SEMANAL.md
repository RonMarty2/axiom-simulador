# 📅 CALENDARIO DE CRECIMIENTO SEMANAL · AXIOM SIMULADOR UMSS
**Orquestado por `orquestador-crecimiento` con los 17 agentes especialistas.**

---

## 🎯 OBJETIVOS DE LA SEMANA
1. **Generación de Tráfico Orgánico:** Posicionarse en los 3 grupos de mayor densidad de postulantes en Cochabamba (Medicina, Tecnología y Ciencias Económicas).
2. **Activación de WhatsApp:** Explotar la tasa de apertura de los Estados de WhatsApp mediante micro-quizzes interactivos.
3. **Conversión a Registros en AXIOM:** Cada pieza conduce a una prueba gratuita de 15 minutos en `axiom-simulador.com`.

---

## 📊 MATRIZ SEMANAL DÍA POR DÍA

| Día | Hora Óptima (CBB) | Canal | Formato | Pieza Gráfica / Contenido | Objetivo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LUNES** | 12:30 PM | **Instagram Feed / FB** | Carrusel 4:5 (5 Láminas) | `medicina/carrusel/SLIDE_[1-5]_MEDICINA.png` | **Educación:** Trampa de Morfofunción (Arterias vs Vénulas). Guarda este post. |
| **LUNES** | 07:30 PM | **WhatsApp Status** | Historia 9:16 (Quiz) | `medicina/historias/HISTORIA_QUIZ_MEDICINA.png` | **Interacción:** ¿Pasarías el Curso Básico hoy? Encuesta interactiva. |
| **MARTES** | 08:00 AM | **WhatsApp Status** | Historia 9:16 (Solución) | `medicina/historias/HISTORIA_SOLUCION_MEDICINA.png` | **Conversión:** Revelación de respuesta B + Link al simulador de Medicina. |
| **MARTES** | 06:30 PM | **TikTok / Reels** | Video 9:16 (35 seg) | Guion 1: *«La trampa de Morfofunción en Medicina UMSS»* | **Alcance Viral:** Hook de alta retención para postulantes de salud. |
| **MIÉRCOLES** | 12:30 PM | **Instagram Feed / FB** | Carrusel 4:5 (5 Láminas) | `ingenieria/carrusel/SLIDE_[1-5]_INGENIERIA.png` | **Autoridad:** Error fatal al cancelar sen(x) en Trigonometría FCyT. |
| **MIÉRCOLES** | 08:00 PM | **Grupos WhatsApp FCyT** | Mensaje + Enlace | Copy 2 Tecnología + Enlace directo al simulador de Tecnología | **Tráfico Calificado:** Postulantes practicando con cronómetro en tiempo real. |
| **JUEVES** | 01:00 PM | **WhatsApp Status** | Historia 9:16 (Quiz) | `ingenieria/historias/HISTORIA_QUIZ_INGENIERIA.png` | **Interacción:** Reto de Trigonometría: ¿Cuántas soluciones tiene sen(2x)=sen(x)? |
| **JUEVES** | 07:00 PM | **TikTok / Reels** | Video 9:16 (40 seg) | Guion 2: *«El error de colegio en Álgebra que te deja fuera de Tecnología»* | **Viralidad:** Demostración paso a paso en libreta. |
| **VIERNES** | 12:30 PM | **Instagram Feed / FB** | Carrusel 4:5 (5 Láminas) | `economicas/carrusel/SLIDE_[1-5]_ECONOMICAS.png` | **Educación:** Microeconomía: Elasticidad precio de la demanda vs Ingreso total. |
| **VIERNES** | 07:30 PM | **WhatsApp Status** | Historia 9:16 (Quiz) | `economicas/historias/HISTORIA_QUIZ_ECONOMICAS.png` | **Interacción:** ¿El ingreso total sube o baja? Encuesta rápida. |
| **SÁBADO** | 10:00 AM | **WhatsApp Status** | Historia 9:16 (Solución) | `economicas/historias/HISTORIA_SOLUCION_ECONOMICAS.png` | **Conversión:** Matriz que nunca falla + CTA simulador Económicas. |
| **SÁBADO** | 03:00 PM | **TikTok / Reels** | Video 9:16 (30 seg) | Guion 3: *«La trampa de Microeconomía que el 70% marca mal»* | **Cierre de fin de semana:** Postulantes estudiando el sábado por la tarde. |
| **DOMINGO** | 07:00 PM | **Instagram / FB Feed** | Master Poster (4:5) | `ANUNCIO_FEED_MEDICINA.png` / `INGENIERIA` / `ECONOMICAS` | **Recordatorio Semanal:** "Empieza tu semana midiendo tu puntaje real en AXIOM". |

---

## 🛠️ CÓMO AJUSTAR O QUITAR EL AÑO EN TODAS LAS PIEZAS
Todo el sistema está conectado a `PUBLICIDAD/config_anuncios.json`:
- **Si no deseas colocar año (anuncio perenne):**
  ```json
  "anio": null
  ```
  *(El sistema imprimirá automáticamente "Admisión San Simón · Exámenes Reales" sin fecha).*
- **Si deseas cambiar al año 2026:**
  ```json
  "anio": "2026"
  ```
  *(El sistema imprimirá automáticamente "Admisión San Simón 2026").*
- **Para compilar todas las piezas con el nuevo año en 10 segundos:**
  ```bash
  python scripts/generar_anuncios.py
  ```

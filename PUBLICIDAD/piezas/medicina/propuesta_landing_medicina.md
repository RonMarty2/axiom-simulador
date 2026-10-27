# Propuesta de Optimización Web: Sección Medicina UMSS

> **Diseñado por:** `optimizador-landing` y `especialista-seo`
> **Ubicación:** Landing Page (`src/app/page.tsx`) y ruta `/simulador`
> **Objetivo:** Recibir el tráfico de redes sociales y convertir visitas en registros sin fricción.

---

## 1. Ajuste en el Hero Section (Arriba del pliegue / Above the Fold)
Actualmente la Landing muestra un texto genérico de bienvenida.
* **Propuesta de Selector Rápido de Facultad en la Landing:**
  Un grupo de 4 pestañas interactivas justo debajo del titular:
  `[ Medicina ]` · `[ Económicas ]` · `[ Tecnología ]` · `[ Derecho ]`

* **Cuando el usuario selecciona "Medicina":**
  * **Título H1 dinámico:** *"Simulador de Examen de Admisión · Facultad de Medicina UMSS"*
  * **Subtítulo:** *"Practica con el examen real de 100 preguntas del Curso Básico 2024-2025. Morfofunción y Biología Celular explicadas paso a paso."*
  * **Botón Principal (CTA):** `[ Probar Examen de Medicina Gratis ]` $\rightarrow$ Lleva directo a una muestra de 10 preguntas con cronómetro de 90 segundos por pregunta.

---

## 2. Optimización SEO (Metadatos para Google Bolivia)

```typescript
export const metadata = {
  title: 'Simulador Examen Medicina UMSS 2025 | Preguntas Reales y Solucionario - AXIOM',
  description: 'Entrena para el examen de admisión de la Facultad de Medicina Dr. Aurelio Meleán (UMSS Cochabamba). 100 preguntas oficiales de Morfofunción y Biología Celular resueltas.',
  keywords: [
    'examen admision medicina umss',
    'curso basico medicina san simon',
    'banco de preguntas medicina umss 2025',
    'simulador examen san simon cochabamba',
    'morfofuncion preguntas examen resueltas'
  ],
  openGraph: {
    title: '¿Listo para el examen de Medicina en la UMSS? Mide tu puntaje en AXIOM',
    description: 'Practica con el último examen oficial resuelto paso a paso.',
    images: ['/images/og-medicina-umss.jpg'],
  }
};
```

---

## 3. Elemento de Prueba Social (Credibilidad Inmediata)
Colocar una tarjeta destacada con los datos reales del examen de enero de 2025:
* *"100 preguntas oficiales digitalizadas"*.
* *"Ponderación 50% Morfofunción · 50% Biología Celular"*.
* *"Cronómetro calibrado a 90 minutos exactos"*.

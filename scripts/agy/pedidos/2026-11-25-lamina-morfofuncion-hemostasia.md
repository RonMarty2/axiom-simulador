# Pedido: Primera lámina visual de Morfofunción para Medicina PSA 2027 (Hemostasia y vasos sanguíneos)

Lee y sigue estas reglas antes de empezar:
- `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`
- Usa las skills/agentes del proyecto: `autor-laminas` (`agentes/autor-laminas.md`), `auditor-pantallas-movil` (`agentes/auditor-pantallas-movil.md`) y `verificador` (`agentes/verificador.md`).

## Contexto y objetivo
Ronald eligió crear la primera lámina visual propia de **Morfofunción** para Medicina PSA 2027 (de a una, para que él la revise antes de hacer las demás), siguiendo exactamente el formato tarjetas de `src/app/laminas/_components/` (lee una lámina publicada reciente en `src/app/laminas/` y `src/app/laminas/_components/` para copiar exactamente los componentes, imports y estructura sin inventar props).

## Reglas duras
- **SOLO puedes crear/modificar estos 2 archivos:**
  1. `src/app/laminas/morfofuncion-cardiovascular/hemostasia-y-vasos/page.tsx` (nuevo)
  2. `src/lib/axiom/laminas.ts` (agregar el módulo `"morfofuncion-cardiovascular"` al INICIO de `modulos` solo en la entrada `facultad: "medicina"`, sin tocar `ingenieria` ni `MODULOS_MATEMATICAS`).
- **Tuteo estricto** en todo texto visible (nunca voseo).
- **Cero emojis decorativos.**
- **Cero rastros de Ingeniería, FCyT, Económicas o PREU.**
- **Rigor biomédico (Saladin, Anatomía y Fisiología, Caps. 18 y 20):**
  - Diferencia estructural y funcional entre **arterias/arteriolas** (túnica media muscular gruesa, alta presión, **espasmo vascular**) y **venas/vénulas** (pared delgada, válvulas unidireccionales, baja presión, reservorio de sangre).
  - Trampa clásica de examen UMSS: el espasmo vascular ocurre en **arterias y arteriolas**, NO en venas y vénulas.
  - Las **3 fases de la hemostasia**: (1) Espasmo vascular (vasoconstricción inmediata + dolor/serotonina), (2) Formación del tapón plaquetario (adhesión con factor de von Willebrand, activación/seudópodos, agregación), (3) Coagulación (vía extrínseca rápida por factor tisular III + vía intrínseca por factor XII → vía común: factor X activado → protrombina a trombina → fibrinógeno soluble a malla de fibrina insoluble, dependiente de Ca²⁺ y vitamina K para síntesis hepática de factores II, VII, IX y X).
  - Fibrinólisis (plasmina disuelve el coágulo) y diferencia entre trombo y émbolo.
- **Dibujos SVG:** incluye al menos **2 diagramas SVG nítidos** con `viewBox="0 0 360 <alto>"` (`alto <= 350`), `fontSize >= 13`, paleta `LIENZO`, cero textos pisados o cortados:
  1. Comparación visual de corte transversal **Arteria vs. Vena** (túnica íntima, media, externa, luz y válvula).
  2. Diagrama de flujo de las **3 fases de la hemostasia y vía común de coagulación** (Protrombina → Trombina → Fibrinógeno → Fibrina).
- **Práctica:** incluye al menos 2 ejercicios interactivos de comprobación con 4 opciones, respuestas en índices distintos, y explicación clara paso a paso.

## Cambio exacto en `src/lib/axiom/laminas.ts`
- En la entrada `facultad: "medicina"`, cambia `areaLabel` a `"Morfofunción y Matemáticas"` y pon en `modulos`:
  ```ts
  [
    {
      slug: "morfofuncion-cardiovascular",
      titulo: "Morfofunción · Sistema cardiovascular y hemostasia",
      laminas: [
        { slug: "hemostasia-y-vasos", titulo: "Hemostasia y vasos sanguíneos (arterias, venas y coagulación)", publicada: true },
      ],
    },
    ...MODULOS_MATEMATICAS,
  ]
  ```
- NO modifiques la entrada de `ingenieria` ni `MODULOS_MATEMATICAS`.

## Criterios de cierre
- No toques ningún archivo fuera de los 2 permitidos.
- En tu respuesta final, resume en máx. 15 líneas las tarjetas creadas, los viewBox usados y las respuestas de los ejercicios.

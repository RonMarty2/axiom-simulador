# data/research · investigación por facultad / universidad

> Carpeta de archivos vivos donde se vuelca la información oficial sobre
> cada examen/curso de admisión que AXIOM podría cubrir.
> SIN un archivo de research completo, NO se diseña contenido confiable
> para esa facultad/universidad.

## Estado actual de la investigación

### UMSS (Cochabamba) — universidad base de AXIOM

| Facultad | Estado | Material disponible |
|---|---|---|
| Económicas | ✅ Implementado en producción | Examen 2023 reescrito al nivel real |
| Tecnología (FCyT) | 🟢 Research completo | 6 facsímiles oficiales analizados |
| Medicina | 🟢 Research del marco | Convocatoria + Reglamento oficial |
| Derecho | 🟡 Esqueleto | _pendiente material_ |
| Odontología | 🟡 Esqueleto | _pendiente material_ |
| Bioquímica-Farmacia | 🟡 Esqueleto | _pendiente material_ |
| Veterinaria-Zootecnia | 🟡 Esqueleto | _pendiente material_ |
| Agronomía (FCAPFyV) | 🟡 Esqueleto | _pendiente material_ |
| Arquitectura | 🟡 Esqueleto | _pendiente material_ |
| Humanidades-Educación | 🟡 Esqueleto | _pendiente material_ |

### Otras universidades públicas de Bolivia

| Universidad | Ciudad | Estado | Mercado estimado |
|---|---|---|---|
| UMSA | La Paz | 🟡 Esqueleto | 20-30k aspirantes/año |
| UAGRM | Santa Cruz | 🟡 Esqueleto | 25-40k aspirantes/año |
| UPEA | El Alto | 🟡 Esqueleto | 10-20k aspirantes/año |
| USFX | Sucre | 🟡 Esqueleto | 8-15k aspirantes/año |
| UTO | Oruro | 🟡 Esqueleto | 5-8k aspirantes/año |
| UAJMS | Tarija | 🟡 Esqueleto | 5-8k aspirantes/año |
| UATF | Potosí | 🟡 Esqueleto | 3-6k aspirantes/año |
| UAB | Trinidad | 🟡 Esqueleto | 1.5-3k aspirantes/año |
| UAP | Cobija | 🟡 Esqueleto | 0.5-1.5k aspirantes/año |

## Convención de carpetas

```
data/research/
├── README.md                 ← este archivo
├── _template.md              ← plantilla maestra para nuevas facultades
├── umss/                     ← Cochabamba (universidad base de AXIOM)
│   ├── tecnologia.md         ← FCyT, completo con 6 facsímiles
│   ├── medicina.md           ← marco completo de Curso Básico
│   ├── derecho.md            ← esqueleto
│   ├── odontologia.md        ← esqueleto
│   ├── bioquimica-farmacia.md ← esqueleto
│   ├── veterinaria-zootecnia.md ← esqueleto
│   ├── agronomia.md          ← esqueleto
│   ├── arquitectura.md       ← esqueleto
│   └── humanidades-educacion.md ← esqueleto
├── umsa/                     ← La Paz
├── uagrm/                    ← Santa Cruz
├── usfx/                     ← Sucre
├── uajms/                    ← Tarija
├── uto/                      ← Oruro
├── uatf/                     ← Potosí
├── upea/                     ← El Alto
├── uab/                      ← Trinidad (Beni)
└── uap/                      ← Cobija (Pando)
```

## Estados por sección dentro de cada archivo

- ✅ **Completo** — info verificada y suficiente.
- 🟢 **Avanzado** — la mayoría de info confirmada.
- 🟡 **Parcial** — algo de info, falta confirmar.
- ❌ **Vacío** — no hay info todavía.

Las secciones marcadas **(crítico)** son bloqueantes: sin ellas no se
puede construir contenido en serio para esa facultad.

## Cómo agregar una facultad o universidad nueva

1. Si es facultad de universidad existente: crear archivo en `data/research/{univ}/{facultad}.md`.
2. Si es universidad nueva: `mkdir data/research/{sigla-universidad}/` y crear README.md + archivos por facultad.
3. Copiar `_template.md` como base.
4. Llenar a medida que llegue info.
5. Cuando las secciones críticas estén ✅, generar la propuesta de roadmap.
6. Mover el roadmap al plan general (BITACORA.md § Roadmap).

## Plan estratégico maestro

Ver `PLAN-ESTRATEGICO.md` en esta misma carpeta para la priorización
recomendada de expansión de AXIOM.

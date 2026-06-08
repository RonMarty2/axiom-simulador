# data/research · investigación por facultad/universidad

> Carpeta de archivos vivos donde se vuelca la información oficial sobre
> cada examen/curso de admisión que AXIOM podría cubrir.
> SIN un archivo de research completo, NO se diseña contenido confiable
> para esa facultad/universidad.

## Convención de carpetas

```
data/research/
├── _template.md              ← plantilla maestra (no editar)
├── umss/                     ← Universidad Mayor de San Simón (Cochabamba)
│   ├── economicas.md
│   ├── medicina.md
│   ├── ingenieria.md
│   └── derecho.md
├── umsa/                     ← La Paz
├── uagrm/                    ← Santa Cruz
├── usfx/                     ← Sucre
├── uajms/                    ← Tarija
├── uto/                      ← Oruro
├── uatf/                     ← Potosí
├── upea/                     ← El Alto
├── uab/                      ← Beni
└── uap/                      ← Pando
```

## Estados por sección

Cada archivo de research tiene secciones con estado visible:

- ✅ **Completo** — info verificada y suficiente.
- 🟡 **Parcial** — algo de info, pero falta confirmar.
- ❌ **Vacío** — no hay info todavía.

Las secciones marcadas **(crítico)** son bloqueantes: sin ellas no se
puede empezar a construir contenido en serio.

## Cómo agregar una nueva facultad/universidad

1. Crear la carpeta (`mkdir data/research/{sigla-universidad}/`).
2. Copiar `_template.md` al nuevo archivo (`{facultad}.md`).
3. Llenar las secciones a medida que llegue info.
4. Cuando todas las críticas estén ✅, generar la propuesta de roadmap
   en la sección 8 del archivo.
5. Mover el roadmap al plan general (BITACORA.md § Roadmap).

## Fuentes recomendadas por universidad

(a completar a medida que se confirmen)

| Universidad | URL principal | Sistema de postulantes |
|---|---|---|
| UMSS | https://www.umss.edu.bo | http://websis.umss.edu.bo/serv_postulantes.asp |
| UMSA | https://www.umsa.bo | _por confirmar_ |
| UAGRM | https://www.uagrm.edu.bo | _por confirmar_ |
| USFX | https://www.usfx.bo | _por confirmar_ |
| UAJMS | https://www.uajms.edu.bo | _por confirmar_ |
| UTO | https://www.uto.edu.bo | _por confirmar_ |
| UATF | https://www.uatf.edu.bo | _por confirmar_ |
| UPEA | https://www.upea.bo | _por confirmar_ |
| UAB | https://www.uabjb.edu.bo | _por confirmar_ |
| UAP | https://www.uap.edu.bo | _por confirmar_ |

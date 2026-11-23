# -*- coding: utf-8 -*-
"""Propuesta de cortes por subtítulo para los 39 capítulos PSA 2027 (Paso 2 de PLAN_CORTE_POR_SUBTITULO.md).

Lee los mapas de títulos (EdS, Calvo y Saladin) y propone pistas de 5 a 15 min
(aceptable 3 a 20 min) respetando límites de subtítulo y excluyendo contenido no narrable.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


DIR_SCRIPT = Path(__file__).resolve().parent
DIR_MAPAS_DEFECTO = DIR_SCRIPT / "mapa_titulos"
RUTA_SALIDA_DEFECTO = DIR_SCRIPT / "propuesta_cortes_psa2027.md"

PALABRAS_POR_MIN = 150
OBJ_MIN_MIN = 5.0
OBJ_MAX_MIN = 15.0
ACEPTABLE_MIN_MIN = 3.0
ACEPTABLE_MAX_MIN = 20.0

OBJ_MIN_PALABRAS = int(OBJ_MIN_MIN * PALABRAS_POR_MIN)  # 750
OBJ_MAX_PALABRAS = int(OBJ_MAX_MIN * PALABRAS_POR_MIN)  # 2250
ACEPTABLE_MIN_PALABRAS = int(ACEPTABLE_MIN_MIN * PALABRAS_POR_MIN)  # 450
ACEPTABLE_MAX_PALABRAS = int(ACEPTABLE_MAX_MIN * PALABRAS_POR_MIN)  # 3000

EDS_PSA_PARTES: tuple[str, ...] = (
    "EdS_Parte1",
    "EdS_Parte2",
    "EdS_Parte3_1",
    "EdS_Parte3_2",
    "EdS_Parte3_3",
)
CALVO_PSA_CAPS: tuple[int, ...] = (3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18)
SALADIN_PSA_CAPS: tuple[int, ...] = (
    1, 5, 6, 8, 9, 10, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 25, 27, 28,
)


@dataclass
class NodoTitulo:
    nivel: int
    numero: str
    titulo: str
    inicio: int
    fin: int
    palabras: int
    hijos: list[NodoTitulo] = field(default_factory=list)

    def etiqueta(self) -> str:
        return f"{self.numero} {self.titulo}".strip() if self.numero else self.titulo


@dataclass
class UnidadCorte:
    etiquetas: list[str]
    inicio: int
    fin: int
    palabras: int
    nota: str = ""


@dataclass
class PartePropuesta:
    indice: int
    titulos: list[str]
    inicio: int
    fin: int
    palabras: int
    minutos: float
    nota: str = ""


@dataclass
class PropuestaCapitulo:
    clave: str
    nombre_mostrado: str
    libro: str
    titulo_capitulo: str
    palabras_totales: int
    palabras_narrables: int
    mapa_encontrado: bool
    partes: list[PartePropuesta] = field(default_factory=list)
    nota_general: str = ""


def _configurar_stdout_utf8() -> None:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def _catalogo_psa_2027() -> list[tuple[str, str, str, str]]:
    """Devuelve lista ordenada de los 39 capítulos PSA 2027: (clave, archivo_json, libro, nombre_mostrado)."""
    items: list[tuple[str, str, str, str]] = []
    for parte in EDS_PSA_PARTES:
        items.append((parte, f"{parte}.json", "EdS", parte))
    for cap in CALVO_PSA_CAPS:
        items.append((f"Calvo_tema_{cap:02d}", f"Calvo_tema_{cap:02d}.json", "Calvo", f"Tema_{cap:02d}_Biologia_Celular"))
    for cap in SALADIN_PSA_CAPS:
        items.append((f"Saladin_tema_{cap:02d}", f"Saladin_tema_{cap:02d}.json", "Saladin", f"Tema_{cap:02d}_Morfo_Saladin"))
    return items


def _calcular_tramos_narrables(
    titulos_raw: list[dict[str, Any]],
    palabras_texto: int,
) -> tuple[int, list[dict[str, Any]], list[tuple[int, int]]]:
    """Determina intervalos narrables [a, b) excluyendo secciones con narrable == False."""
    ubicados: list[dict[str, Any]] = []
    for idx, t in enumerate(titulos_raw):
        p = t.get("palabra")
        if p is None:
            continue
        p_int = max(0, min(int(p), palabras_texto))
        ubicados.append(
            {
                "orden": idx,
                "nivel": int(t.get("nivel") or 1),
                "numero": str(t.get("numero") or "").strip(),
                "titulo": str(t.get("titulo") or "").strip(),
                "palabra": p_int,
                "narrable": bool(t.get("narrable", True)),
            }
        )

    ubicados.sort(key=lambda x: (x["palabra"], x["orden"]))

    if not ubicados:
        return palabras_texto, [], [(0, palabras_texto)] if palabras_texto > 0 else []

    # Construir segmentos atómicos [p_i, p_{i+1}) para restar tramos narrable == False
    intervalos_narrables: list[tuple[int, int]] = []
    # Preámbulo [0, primer_titulo): narrable salvo que el propio capítulo empiece en sección no narrable en 0
    if ubicados[0]["palabra"] > 0:
        intervalos_narrables.append((0, ubicados[0]["palabra"]))

    for i, item in enumerate(ubicados):
        ini = item["palabra"]
        fin = ubicados[i + 1]["palabra"] if i + 1 < len(ubicados) else palabras_texto
        if item["narrable"] and fin > ini:
            intervalos_narrables.append((ini, fin))

    palabras_narrables = sum(b - a for a, b in intervalos_narrables)
    solo_narrables = [u for u in ubicados if u["narrable"]]
    return palabras_narrables, solo_narrables, intervalos_narrables


def _contar_narrables_en_rango(intervalos: list[tuple[int, int]], inicio: int, fin: int) -> int:
    if fin <= inicio:
        return 0
    total = 0
    for a, b in intervalos:
        if b <= inicio:
            continue
        if a >= fin:
            break
        solape = min(b, fin) - max(a, inicio)
        if solape > 0:
            total += solape
    return total


def _construir_bosque(
    titulos_narrables: list[dict[str, Any]],
    palabras_texto: int,
    intervalos_narrables: list[tuple[int, int]],
) -> list[NodoTitulo]:
    """Organiza títulos narrables ubicados en un bosque jerárquico sin perder palabras narrables."""
    if not titulos_narrables:
        return []

    n = len(titulos_narrables)
    nodos: list[NodoTitulo] = []
    for i, t in enumerate(titulos_narrables):
        ini = t["palabra"]
        # El ámbito de un título termina en el siguiente título de nivel <= el suyo
        fin = palabras_texto
        for j in range(i + 1, n):
            if titulos_narrables[j]["nivel"] <= t["nivel"]:
                fin = titulos_narrables[j]["palabra"]
                break
        nodos.append(
            NodoTitulo(
                nivel=t["nivel"],
                numero=t["numero"],
                titulo=t["titulo"],
                inicio=ini,
                fin=fin,
                palabras=0,
            )
        )

    # El primer nodo absorbe el preámbulo narrable [0, primer_titulo.inicio)
    nodos[0].inicio = 0

    # Enlazar padres e hijos respetando niveles
    raices: list[NodoTitulo] = []
    pila: list[NodoTitulo] = []
    for nodo in nodos:
        while pila and pila[-1].nivel >= nodo.nivel:
            pila.pop()
        if pila:
            pila[-1].hijos.append(nodo)
        else:
            raices.append(nodo)
        pila.append(nodo)

    # Calcular palabras narrables exactas de cada nodo dentro de [inicio, fin)
    def _asignar_palabras(nd: NodoTitulo) -> None:
        nd.palabras = _contar_narrables_en_rango(intervalos_narrables, nd.inicio, nd.fin)
        for h in nd.hijos:
            _asignar_palabras(h)

    for r in raices:
        _asignar_palabras(r)

    return raices


def _expandir_nodo(
    nodo: NodoTitulo,
    intervalos_narrables: list[tuple[int, int]],
    *,
    forzar_hijos: bool = False,
) -> list[UnidadCorte]:
    """Si un nodo supera 20 min (o se fuerza por vecino corto) y tiene hijos ubicados, baja al nivel inferior."""
    if not forzar_hijos and nodo.palabras <= ACEPTABLE_MAX_PALABRAS:
        return [
            UnidadCorte(
                etiquetas=[nodo.etiqueta()],
                inicio=nodo.inicio,
                fin=nodo.fin,
                palabras=nodo.palabras,
            )
        ]

    if not nodo.hijos:
        nota = ">20 min (sin sub-subtítulos)" if nodo.palabras > ACEPTABLE_MAX_PALABRAS else ""
        return [
            UnidadCorte(
                etiquetas=[nodo.etiqueta()],
                inicio=nodo.inicio,
                fin=nodo.fin,
                palabras=nodo.palabras,
                nota=nota,
            )
        ]

    unidades: list[UnidadCorte] = []
    primer_hijo = nodo.hijos[0]
    intro_pal = _contar_narrables_en_rango(intervalos_narrables, nodo.inicio, primer_hijo.inicio)

    if intro_pal >= ACEPTABLE_MIN_PALABRAS:
        unidades.append(
            UnidadCorte(
                etiquetas=[f"{nodo.etiqueta()} (introducción)"],
                inicio=nodo.inicio,
                fin=primer_hijo.inicio,
                palabras=intro_pal,
            )
        )
        intro_pendiente = 0
        inicio_extra = primer_hijo.inicio
    else:
        intro_pendiente = intro_pal
        inicio_extra = nodo.inicio

    for idx_h, hijo in enumerate(nodo.hijos):
        if idx_h == 0 and intro_pendiente > 0:
            hijo_ajustado = NodoTitulo(
                nivel=hijo.nivel,
                numero=hijo.numero,
                titulo=hijo.titulo,
                inicio=inicio_extra,
                fin=hijo.fin,
                palabras=hijo.palabras + intro_pendiente,
                hijos=hijo.hijos,
            )
            sub_u = _expandir_nodo(hijo_ajustado, intervalos_narrables)
            if sub_u:
                etq_padre = nodo.etiqueta()
                if etq_padre not in sub_u[0].etiquetas:
                    sub_u[0].etiquetas = [etq_padre] + sub_u[0].etiquetas
            unidades.extend(sub_u)
        else:
            unidades.extend(_expandir_nodo(hijo, intervalos_narrables))

    # Por si el último hijo no llegaba al fin del padre (no debería pasar, pero protege conservación)
    ultimo_fin = nodo.hijos[-1].fin
    cola_pal = _contar_narrables_en_rango(intervalos_narrables, ultimo_fin, nodo.fin)
    if cola_pal > 0 and unidades:
        unidades[-1].fin = nodo.fin
        unidades[-1].palabras += cola_pal

    return unidades


def _raices_a_expandir_por_vecino_corto(raices: list[NodoTitulo]) -> set[int]:
    """Marca raíces con hijos que conviene expandir para absorber un tramo corto vecino (< 3 min).

    Si una raíz corta (< ACEPTABLE_MIN_PALABRAS) precede o sigue a una raíz con hijos ubicados
    y juntar ambas raíces enteras supera ACEPTABLE_MAX_PALABRAS (3000), expandir esa raíz a sus
    hijos permite que _agrupar_unidades absorba el tramo corto sin dejar ningún audio huérfano.
    """
    forzar: set[int] = set()
    n = len(raices)
    if n < 2:
        return forzar

    # Hacia adelante: tramo corto inicial o aislado seguido de raíz con hijos
    i = 0
    while i < n:
        if raices[i].palabras < ACEPTABLE_MIN_PALABRAS:
            j = i
            suma_corta = 0
            while j < n and raices[j].palabras < ACEPTABLE_MIN_PALABRAS:
                suma_corta += raices[j].palabras
                j += 1
            if 0 < suma_corta < ACEPTABLE_MIN_PALABRAS and j < n:
                sig = raices[j]
                cabe_con_prev = (
                    i > 0
                    and raices[i - 1].palabras <= ACEPTABLE_MAX_PALABRAS
                    and (raices[i - 1].palabras + suma_corta) <= ACEPTABLE_MAX_PALABRAS
                )
                if (
                    not cabe_con_prev
                    and sig.hijos
                    and sig.palabras <= ACEPTABLE_MAX_PALABRAS
                    and (suma_corta + sig.palabras) > ACEPTABLE_MAX_PALABRAS
                ):
                    forzar.add(j)
            i = j
        else:
            i += 1

    # En simetría hacia atrás: tramo corto final (o aislado) precedido por raíz con hijos
    i = n - 1
    while i >= 0:
        if raices[i].palabras < ACEPTABLE_MIN_PALABRAS:
            j = i
            suma_corta = 0
            while j >= 0 and raices[j].palabras < ACEPTABLE_MIN_PALABRAS:
                suma_corta += raices[j].palabras
                j -= 1
            if 0 < suma_corta < ACEPTABLE_MIN_PALABRAS and j >= 0:
                prev = raices[j]
                cabe_con_sig = (
                    i + 1 < n
                    and raices[i + 1].palabras <= ACEPTABLE_MAX_PALABRAS
                    and (suma_corta + raices[i + 1].palabras) <= ACEPTABLE_MAX_PALABRAS
                )
                ya_resuelto_adelante = (i + 1) in forzar
                if (
                    not cabe_con_sig
                    and not ya_resuelto_adelante
                    and prev.hijos
                    and prev.palabras <= ACEPTABLE_MAX_PALABRAS
                    and (prev.palabras + suma_corta) > ACEPTABLE_MAX_PALABRAS
                ):
                    forzar.add(j)
            i = j
        else:
            i -= 1

    return forzar


def _agrupar_unidades(unidades: list[UnidadCorte]) -> list[PartePropuesta]:
    """Agrupa unidades consecutivas en partes de 5-15 min (hasta 20 min para evitar huérfanos < 3 min)."""
    if not unidades:
        return []

    grupos: list[UnidadCorte] = []
    n = len(unidades)

    for i, u in enumerate(unidades):
        if u.palabras == 0:
            # Unir títulos consecutivos sin texto propio al siguiente o al grupo actual
            if grupos and grupos[-1].palabras <= ACEPTABLE_MAX_PALABRAS:
                grupos[-1].etiquetas.extend(u.etiquetas)
                grupos[-1].fin = max(grupos[-1].fin, u.fin)
            else:
                grupos.append(
                    UnidadCorte(
                        etiquetas=list(u.etiquetas),
                        inicio=u.inicio,
                        fin=u.fin,
                        palabras=0,
                        nota=u.nota,
                    )
                )
            continue

        if u.palabras > ACEPTABLE_MAX_PALABRAS:
            grupos.append(
                UnidadCorte(
                    etiquetas=list(u.etiquetas),
                    inicio=u.inicio,
                    fin=u.fin,
                    palabras=u.palabras,
                    nota=u.nota or ">20 min (sin sub-subtítulos)",
                )
            )
            continue

        if not grupos or grupos[-1].palabras > ACEPTABLE_MAX_PALABRAS:
            grupos.append(
                UnidadCorte(
                    etiquetas=list(u.etiquetas),
                    inicio=u.inicio,
                    fin=u.fin,
                    palabras=u.palabras,
                    nota=u.nota,
                )
            )
            continue

        actual = grupos[-1]
        suma = actual.palabras + u.palabras
        sig = unidades[i + 1] if i + 1 < n else None

        debe_unir = False
        if suma <= OBJ_MAX_PALABRAS:
            debe_unir = True
        elif suma <= ACEPTABLE_MAX_PALABRAS:
            # Unir hasta 20 min si el actual quedaría < 3 min o si u quedaría huérfano < 3 min
            if actual.palabras < ACEPTABLE_MIN_PALABRAS:
                debe_unir = True
            elif u.palabras < ACEPTABLE_MIN_PALABRAS and (
                sig is None
                or sig.palabras > ACEPTABLE_MAX_PALABRAS
                or (u.palabras + sig.palabras) > ACEPTABLE_MAX_PALABRAS
            ):
                debe_unir = True

        if debe_unir:
            actual.etiquetas.extend(u.etiquetas)
            actual.fin = max(actual.fin, u.fin)
            actual.palabras = suma
        else:
            grupos.append(
                UnidadCorte(
                    etiquetas=list(u.etiquetas),
                    inicio=u.inicio,
                    fin=u.fin,
                    palabras=u.palabras,
                    nota=u.nota,
                )
            )

    # Pasada final: si la última parte quedó < 3 min y cabe con la anterior (<= 20 min), absorberla
    if (
        len(grupos) >= 2
        and grupos[-1].palabras < ACEPTABLE_MIN_PALABRAS
        and grupos[-2].palabras <= ACEPTABLE_MAX_PALABRAS
        and (grupos[-2].palabras + grupos[-1].palabras) <= ACEPTABLE_MAX_PALABRAS
    ):
        ult = grupos.pop()
        grupos[-1].etiquetas.extend(ult.etiquetas)
        grupos[-1].fin = max(grupos[-1].fin, ult.fin)
        grupos[-1].palabras += ult.palabras

    partes: list[PartePropuesta] = []
    for idx, g in enumerate(grupos, start=1):
        minutos = round(g.palabras / PALABRAS_POR_MIN, 1)
        nota = g.nota
        if not nota:
            if g.palabras > ACEPTABLE_MAX_PALABRAS:
                nota = ">20 min (sin sub-subtítulos)"
            elif g.palabras < ACEPTABLE_MIN_PALABRAS:
                nota = "<3 min (tramo aislado)"
        partes.append(
            PartePropuesta(
                indice=idx,
                titulos=g.etiquetas,
                inicio=g.inicio,
                fin=g.fin,
                palabras=g.palabras,
                minutos=minutos,
                nota=nota,
            )
        )
    return partes


def proponer_cortes_capitulo(
    mapa: dict[str, Any],
    *,
    clave: str | None = None,
    libro: str | None = None,
    nombre_mostrado: str | None = None,
) -> PropuestaCapitulo:
    """Calcula la propuesta de cortes para un capítulo a partir de su mapa de títulos."""
    cap_val = mapa.get("capitulo", "")
    clave_res = clave or str(cap_val)
    libro_res = libro or str(mapa.get("libro") or ("Calvo" if isinstance(cap_val, int) else "Desconocido"))
    nombre_res = nombre_mostrado or clave_res
    titulo_cap = str(mapa.get("titulo_capitulo") or nombre_res)
    palabras_totales = int(mapa.get("palabras_texto") or 0)
    titulos_raw = list(mapa.get("titulos") or [])

    palabras_narrables, titulos_narrables, intervalos_narrables = _calcular_tramos_narrables(
        titulos_raw, palabras_totales
    )

    if palabras_narrables == 0:
        return PropuestaCapitulo(
            clave=clave_res,
            nombre_mostrado=nombre_res,
            libro=libro_res,
            titulo_capitulo=titulo_cap,
            palabras_totales=palabras_totales,
            palabras_narrables=0,
            mapa_encontrado=True,
            partes=[],
            nota_general="Sin texto narrable",
        )

    # Regla 5: si el capítulo entero dura <= 15 min, queda en 1 sola pista («Completo»)
    if palabras_narrables <= OBJ_MAX_PALABRAS:
        minutos = round(palabras_narrables / PALABRAS_POR_MIN, 1)
        nota = "Completo (<=15 min)"
        if palabras_narrables < ACEPTABLE_MIN_PALABRAS:
            nota = "Completo (<3 min)"
        fin_cap = intervalos_narrables[-1][1] if intervalos_narrables else palabras_totales
        return PropuestaCapitulo(
            clave=clave_res,
            nombre_mostrado=nombre_res,
            libro=libro_res,
            titulo_capitulo=titulo_cap,
            palabras_totales=palabras_totales,
            palabras_narrables=palabras_narrables,
            mapa_encontrado=True,
            partes=[
                PartePropuesta(
                    indice=1,
                    titulos=["Completo"],
                    inicio=0,
                    fin=fin_cap,
                    palabras=palabras_narrables,
                    minutos=minutos,
                    nota=nota,
                )
            ],
        )

    if not titulos_narrables:
        minutos = round(palabras_narrables / PALABRAS_POR_MIN, 1)
        return PropuestaCapitulo(
            clave=clave_res,
            nombre_mostrado=nombre_res,
            libro=libro_res,
            titulo_capitulo=titulo_cap,
            palabras_totales=palabras_totales,
            palabras_narrables=palabras_narrables,
            mapa_encontrado=True,
            partes=[
                PartePropuesta(
                    indice=1,
                    titulos=["Completo"],
                    inicio=0,
                    fin=palabras_totales,
                    palabras=palabras_narrables,
                    minutos=minutos,
                    nota=">20 min (sin sub-subtítulos)" if palabras_narrables > ACEPTABLE_MAX_PALABRAS else "Sin títulos ubicados",
                )
            ],
            nota_general="Sin títulos narrables ubicados",
        )

    raices = _construir_bosque(titulos_narrables, palabras_totales, intervalos_narrables)
    forzar_expansion = _raices_a_expandir_por_vecino_corto(raices)
    unidades: list[UnidadCorte] = []
    for idx_r, raiz in enumerate(raices):
        unidades.extend(
            _expandir_nodo(
                raiz,
                intervalos_narrables,
                forzar_hijos=(idx_r in forzar_expansion),
            )
        )

    partes = _agrupar_unidades(unidades)
    return PropuestaCapitulo(
        clave=clave_res,
        nombre_mostrado=nombre_res,
        libro=libro_res,
        titulo_capitulo=titulo_cap,
        palabras_totales=palabras_totales,
        palabras_narrables=palabras_narrables,
        mapa_encontrado=True,
        partes=partes,
    )


def evaluar_catalogo_psa(dir_mapas: Path) -> list[PropuestaCapitulo]:
    """Carga los 39 mapas PSA 2027 desde dir_mapas y genera la propuesta de cortes para cada uno."""
    resultados: list[PropuestaCapitulo] = []
    for clave, archivo, libro, nombre_mostrado in _catalogo_psa_2027():
        ruta = dir_mapas / archivo
        if not ruta.is_file():
            resultados.append(
                PropuestaCapitulo(
                    clave=clave,
                    nombre_mostrado=nombre_mostrado,
                    libro=libro,
                    titulo_capitulo="(mapa faltante)",
                    palabras_totales=0,
                    palabras_narrables=0,
                    mapa_encontrado=False,
                    partes=[],
                    nota_general=f"Falta mapa: {archivo}",
                )
            )
            continue
        mapa = json.loads(ruta.read_text(encoding="utf-8"))
        resultados.append(
            proponer_cortes_capitulo(
                mapa,
                clave=clave,
                libro=libro,
                nombre_mostrado=nombre_mostrado,
            )
        )
    return resultados


def _formatear_titulos_celda(titulos: list[str], max_items: int = 6) -> str:
    limpios = [t.replace("|", "/") for t in titulos if t]
    if len(limpios) <= max_items:
        return "; ".join(limpios)
    return f"{limpios[0]} ... {limpios[-1]} ({len(limpios)} subtítulos)"


def _tabla_partes_md(prop: PropuestaCapitulo) -> list[str]:
    lineas = [
        "| Parte | Títulos incluidos | Palabras | Min. est. | Nota |",
        "|---|---|---:|---:|---|",
    ]
    if not prop.partes:
        lineas.append(f"| — | — | 0 | 0.0 | {prop.nota_general or 'Sin datos'} |")
        return lineas
    for p in prop.partes:
        etq_parte = "Completo" if p.titulos == ["Completo"] else f"P{p.indice:02d}"
        tits_str = _formatear_titulos_celda(p.titulos)
        nota = p.nota or "OK"
        lineas.append(f"| {etq_parte} | {tits_str} | {p.palabras} | {p.minutos:.1f} | {nota} |")
    return lineas


def renderizar_propuesta_markdown(propuestas: list[PropuestaCapitulo]) -> str:
    """Genera el informe Markdown completo para docs/audio-bloques/propuesta_cortes_psa2027.md."""
    encontrados = [p for p in propuestas if p.mapa_encontrado]
    faltantes = [p for p in propuestas if not p.mapa_encontrado]
    todas_partes = [pt for pr in encontrados for pt in pr.partes]
    en_rango = [
        pt for pt in todas_partes
        if ACEPTABLE_MIN_PALABRAS <= pt.palabras <= ACEPTABLE_MAX_PALABRAS
    ]
    en_objetivo = [
        pt for pt in todas_partes
        if OBJ_MIN_PALABRAS <= pt.palabras <= OBJ_MAX_PALABRAS
    ]
    largas = [
        (pr.nombre_mostrado, pt)
        for pr in encontrados
        for pt in pr.partes
        if pt.palabras > ACEPTABLE_MAX_PALABRAS
    ]
    cortas = [
        (pr.nombre_mostrado, pt)
        for pr in encontrados
        for pt in pr.partes
        if pt.palabras < ACEPTABLE_MIN_PALABRAS
    ]

    pct_rango = (100.0 * len(en_rango) / len(todas_partes)) if todas_partes else 0.0
    pct_obj = (100.0 * len(en_objetivo) / len(todas_partes)) if todas_partes else 0.0

    lineas: list[str] = [
        "# Propuesta de cortes por subtítulo — PSA 2027",
        "",
        f"Ritmo de referencia: **{PALABRAS_POR_MIN} palabras/min**. "
        f"Objetivo: **{OBJ_MIN_MIN:g} a {OBJ_MAX_MIN:g} min** ({OBJ_MIN_PALABRAS}–{OBJ_MAX_PALABRAS} palabras). "
        f"Rango aceptable: **{ACEPTABLE_MIN_MIN:g} a {ACEPTABLE_MAX_MIN:g} min** "
        f"({ACEPTABLE_MIN_PALABRAS}–{ACEPTABLE_MAX_PALABRAS} palabras).",
        "",
        "## Resumen ejecutivo",
        "",
        f"- **Capítulos PSA 2027:** {len(propuestas)} (mapas completos: {len(encontrados)}; faltantes: {len(faltantes)}).",
        f"- **Total de partes propuestas:** {len(todas_partes)}.",
        f"- **Dentro del rango aceptable (3–20 min):** {len(en_rango)} / {len(todas_partes)} ({pct_rango:.1f}%).",
        f"- **Dentro del objetivo ideal (5–15 min):** {len(en_objetivo)} / {len(todas_partes)} ({pct_obj:.1f}%).",
        f"- **Excepciones >20 min (sin sub-subtítulos):** {len(largas)}.",
        f"- **Excepciones <3 min:** {len(cortas)}.",
    ]

    if faltantes:
        lineas.append(f"- **Mapas faltantes:** {', '.join(f.clave for f in faltantes)}.")

    # Sección destacada al inicio para OK de Ronald
    lineas.extend(["", "## Muestra para OK de Ronald (2 capítulos)", ""])
    por_nombre = {p.nombre_mostrado: p for p in propuestas}
    for nombre_muestra, etiqueta_libro in (
        ("Tema_03_Biologia_Celular", "Calvo"),
        ("EdS_Parte3_1", "Educación en Salud"),
    ):
        prop_m = por_nombre.get(nombre_muestra)
        lineas.append(f"### {nombre_muestra} ({etiqueta_libro})")
        lineas.append("")
        if prop_m is None or not prop_m.mapa_encontrado:
            lineas.append(f"Mapa no encontrado para `{nombre_muestra}`.")
            lineas.append("")
            continue
        min_tot = prop_m.palabras_narrables / PALABRAS_POR_MIN
        lineas.append(
            f"**{prop_m.titulo_capitulo}** — {prop_m.palabras_narrables} palabras narrables "
            f"(~{min_tot:.1f} min) en {len(prop_m.partes)} parte(s)."
        )
        lineas.append("")
        lineas.extend(_tabla_partes_md(prop_m))
        lineas.append("")

    # Tabla resumen de los 39 capítulos PSA 2027
    lineas.extend(
        [
            "## Resumen por capítulo (39 capítulos PSA 2027)",
            "",
            "| Capítulo | Libro | Título | Palabras narr. | Min. est. | Partes | En 3–20 min | Excepciones |",
            "|---|---|---|---:|---:|---:|---:|---|",
        ]
    )
    for pr in propuestas:
        if not pr.mapa_encontrado:
            lineas.append(
                f"| {pr.nombre_mostrado} | {pr.libro} | (mapa faltante) | 0 | 0.0 | 0 | 0 | {pr.nota_general} |"
            )
            continue
        min_tot = pr.palabras_narrables / PALABRAS_POR_MIN
        ok_n = sum(
            1 for pt in pr.partes
            if ACEPTABLE_MIN_PALABRAS <= pt.palabras <= ACEPTABLE_MAX_PALABRAS
        )
        exc = [pt.nota for pt in pr.partes if pt.nota and not pt.nota.startswith("Completo (<=15")]
        exc_str = "; ".join(dict.fromkeys(exc)) if exc else "—"
        tit_limpio = pr.titulo_capitulo.replace("|", "/")
        lineas.append(
            f"| {pr.nombre_mostrado} | {pr.libro} | {tit_limpio} | {pr.palabras_narrables} | "
            f"{min_tot:.1f} | {len(pr.partes)} | {ok_n}/{len(pr.partes)} | {exc_str} |"
        )

    # Desglose completo de partes de cada capítulo
    lineas.extend(["", "## Desglose detallado por capítulo", ""])
    for pr in propuestas:
        min_tot = pr.palabras_narrables / PALABRAS_POR_MIN
        lineas.append(
            f"### {pr.nombre_mostrado} — {pr.titulo_capitulo} ({pr.libro}, {pr.palabras_narrables} pal., ~{min_tot:.1f} min)"
        )
        lineas.append("")
        lineas.extend(_tabla_partes_md(pr))
        lineas.append("")

    return "\n".join(lineas).rstrip() + "\n"


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Genera la propuesta de cortes por subtítulo para los 39 capítulos PSA 2027."
    )
    parser.add_argument(
        "--mapas",
        type=Path,
        default=DIR_MAPAS_DEFECTO,
        help="Carpeta con los JSON de mapas de títulos (por defecto docs/audio-bloques/mapa_titulos).",
    )
    parser.add_argument(
        "--salida",
        type=Path,
        default=RUTA_SALIDA_DEFECTO,
        help="Archivo Markdown de salida (por defecto docs/audio-bloques/propuesta_cortes_psa2027.md).",
    )
    args = parser.parse_args(argv)

    propuestas = evaluar_catalogo_psa(args.mapas)
    md = renderizar_propuesta_markdown(propuestas)
    args.salida.parent.mkdir(parents=True, exist_ok=True)
    args.salida.write_text(md, encoding="utf-8")

    encontrados = sum(1 for p in propuestas if p.mapa_encontrado)
    total_partes = sum(len(p.partes) for p in propuestas)
    en_rango = sum(
        1
        for p in propuestas
        for pt in p.partes
        if ACEPTABLE_MIN_PALABRAS <= pt.palabras <= ACEPTABLE_MAX_PALABRAS
    )
    print(
        f"Propuesta generada en {args.salida}: "
        f"{encontrados}/{len(propuestas)} capítulos con mapa, "
        f"{total_partes} partes ({en_rango} en 3-20 min)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

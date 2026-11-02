import { REFUERZO } from "./refuerzo-config.ts";
import { diaLaPaz } from "./refuerzo.ts";

export interface FilaRetencion {
  usuario_id: string;
  fecha: string;
}

export interface ConteoRetorno {
  activos: number;
  volvieron: number;
}

export interface EstadisticaSemanal {
  media: number;
  mediana: number;
  usuariosActivos: number;
}

export interface ResumenMetricas {
  usuariosActivos: number;
  minUsuariosParaLeer: number;
  insuficiente: boolean;
  mensaje: string;
  retornoDiaSiguiente: ConteoRetorno;
  retornoSemana: ConteoRetorno;
  bloquesPorSemana: EstadisticaSemanal;
  diasConPracticaSemana: EstadisticaSemanal;
}

const MS_POR_DIA = 86_400_000;

function msDia(diaYYYYMMDD: string): number {
  return Date.parse(`${diaYYYYMMDD}T00:00:00.000Z`);
}

function normalizarDiaLaPaz(isoODia: string): string | null {
  if (!isoODia || typeof isoODia !== "string") return null;
  const limpio = isoODia.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(limpio)) {
    return Number.isFinite(msDia(limpio)) ? limpio : null;
  }
  if (!Number.isFinite(Date.parse(limpio))) return null;
  return diaLaPaz(limpio);
}

export function semanaLaPaz(iso: string): string {
  const dia = normalizarDiaLaPaz(iso);
  if (!dia) return "";
  const ms = msDia(dia);
  const diaSemanaUTC = new Date(ms).getUTCDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  const diasDesdeLunes = (diaSemanaUTC + 6) % 7;
  return new Date(ms - diasDesdeLunes * MS_POR_DIA).toISOString().slice(0, 10);
}

function diasPorUsuario(filas: readonly FilaRetencion[]): Map<string, Set<string>> {
  const mapa = new Map<string, Set<string>>();
  for (const f of filas) {
    if (!f || typeof f.usuario_id !== "string" || !f.usuario_id.trim()) continue;
    const dia = normalizarDiaLaPaz(f.fecha);
    if (!dia) continue;
    let dias = mapa.get(f.usuario_id);
    if (!dias) {
      dias = new Set<string>();
      mapa.set(f.usuario_id, dias);
    }
    dias.add(dia);
  }
  return mapa;
}

function retornoEnVentana(
  filas: readonly FilaRetencion[],
  minDias: number,
  maxDias: number,
  diaD?: string,
): ConteoRetorno {
  const porUsuario = diasPorUsuario(filas);
  const diaBase = diaD !== undefined ? normalizarDiaLaPaz(diaD) : null;
  if (diaD !== undefined && !diaBase) {
    return { activos: 0, volvieron: 0 };
  }

  let activos = 0;
  let volvieron = 0;

  for (const diasSet of porUsuario.values()) {
    if (diaBase !== null) {
      if (!diasSet.has(diaBase)) continue;
      activos++;
      const msBase = msDia(diaBase);
      let volvio = false;
      for (const d of diasSet) {
        const diff = Math.round((msDia(d) - msBase) / MS_POR_DIA);
        if (diff >= minDias && diff <= maxDias) {
          volvio = true;
          break;
        }
      }
      if (volvio) volvieron++;
    } else {
      if (diasSet.size === 0) continue;
      activos++;
      const ordenados = [...diasSet].sort();
      let volvio = false;
      for (let i = 0; i < ordenados.length && !volvio; i++) {
        const msBase = msDia(ordenados[i]);
        for (let j = i + 1; j < ordenados.length; j++) {
          const diff = Math.round((msDia(ordenados[j]) - msBase) / MS_POR_DIA);
          if (diff >= minDias && diff <= maxDias) {
            volvio = true;
            break;
          }
        }
      }
      if (volvio) volvieron++;
    }
  }

  return { activos, volvieron };
}

export function retornoDiaSiguiente(
  filas: readonly FilaRetencion[],
  diaD?: string,
): ConteoRetorno {
  return retornoEnVentana(filas, 1, 1, diaD);
}

export function retornoSemana(
  filas: readonly FilaRetencion[],
  diaD?: string,
): ConteoRetorno {
  return retornoEnVentana(filas, 1, REFUERZO.ventanaDias, diaD);
}

function redondear2(n: number): number {
  return Math.round(n * 100) / 100;
}

function calcularMediaYMediana(valores: number[]): { media: number; mediana: number } {
  if (valores.length === 0) return { media: 0, mediana: 0 };
  const ordenados = [...valores].sort((a, b) => a - b);
  const suma = ordenados.reduce((acc, v) => acc + v, 0);
  const media = redondear2(suma / ordenados.length);
  const mitad = Math.floor(ordenados.length / 2);
  const mediana =
    ordenados.length % 2 === 1
      ? redondear2(ordenados[mitad])
      : redondear2((ordenados[mitad - 1] + ordenados[mitad]) / 2);
  return { media, mediana };
}

export function bloquesPorUsuarioActivoSemana(
  filas: readonly FilaRetencion[],
  semana?: string,
): EstadisticaSemanal {
  const semanaFiltro = semana !== undefined ? semanaLaPaz(semana) : null;
  const porUsuarioSemanas = new Map<string, Map<string, number>>();

  for (const f of filas) {
    if (!f || typeof f.usuario_id !== "string" || !f.usuario_id.trim()) continue;
    const dia = normalizarDiaLaPaz(f.fecha);
    if (!dia) continue;
    const sem = semanaLaPaz(dia);
    if (semanaFiltro !== null && sem !== semanaFiltro) continue;

    let semanasUsuario = porUsuarioSemanas.get(f.usuario_id);
    if (!semanasUsuario) {
      semanasUsuario = new Map<string, number>();
      porUsuarioSemanas.set(f.usuario_id, semanasUsuario);
    }
    semanasUsuario.set(sem, (semanasUsuario.get(sem) ?? 0) + 1);
  }

  const valoresPorUsuario: number[] = [];
  for (const semanasUsuario of porUsuarioSemanas.values()) {
    const conteos = [...semanasUsuario.values()];
    const promedioUsuario = conteos.reduce((a, b) => a + b, 0) / conteos.length;
    valoresPorUsuario.push(promedioUsuario);
  }

  const { media, mediana } = calcularMediaYMediana(valoresPorUsuario);
  return {
    media,
    mediana,
    usuariosActivos: valoresPorUsuario.length,
  };
}

export function diasConPracticaSemana(
  filas: readonly FilaRetencion[],
  semana?: string,
): EstadisticaSemanal {
  const semanaFiltro = semana !== undefined ? semanaLaPaz(semana) : null;
  const porUsuarioSemanas = new Map<string, Map<string, Set<string>>>();

  for (const f of filas) {
    if (!f || typeof f.usuario_id !== "string" || !f.usuario_id.trim()) continue;
    const dia = normalizarDiaLaPaz(f.fecha);
    if (!dia) continue;
    const sem = semanaLaPaz(dia);
    if (semanaFiltro !== null && sem !== semanaFiltro) continue;

    let semanasUsuario = porUsuarioSemanas.get(f.usuario_id);
    if (!semanasUsuario) {
      semanasUsuario = new Map<string, Set<string>>();
      porUsuarioSemanas.set(f.usuario_id, semanasUsuario);
    }
    let diasSemana = semanasUsuario.get(sem);
    if (!diasSemana) {
      diasSemana = new Set<string>();
      semanasUsuario.set(sem, diasSemana);
    }
    diasSemana.add(dia);
  }

  const valoresPorUsuario: number[] = [];
  for (const semanasUsuario of porUsuarioSemanas.values()) {
    const conteos = [...semanasUsuario.values()].map((s) => s.size);
    const promedioUsuario = conteos.reduce((a, b) => a + b, 0) / conteos.length;
    valoresPorUsuario.push(promedioUsuario);
  }

  const { media, mediana } = calcularMediaYMediana(valoresPorUsuario);
  return {
    media,
    mediana,
    usuariosActivos: valoresPorUsuario.length,
  };
}

export function resumenMetricas(filas: readonly FilaRetencion[]): ResumenMetricas {
  const m1 = retornoDiaSiguiente(filas);
  const m2 = retornoSemana(filas);
  const m3 = bloquesPorUsuarioActivoSemana(filas);
  const m4 = diasConPracticaSemana(filas);
  const usuariosActivos = m3.usuariosActivos;
  const insuficiente = usuariosActivos < REFUERZO.MIN_USUARIOS_PARA_LEER;

  return {
    usuariosActivos,
    minUsuariosParaLeer: REFUERZO.MIN_USUARIOS_PARA_LEER,
    insuficiente,
    mensaje: insuficiente ? "sin muestra suficiente" : "muestra suficiente",
    retornoDiaSiguiente: m1,
    retornoSemana: m2,
    bloquesPorSemana: m3,
    diasConPracticaSemana: m4,
  };
}

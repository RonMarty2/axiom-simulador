// Arma la animacion de un tipo a partir de los valores que escribe el alumno (o de un caso de casos.ts).
// La usan la tarjeta (Generador.tsx), el test de casos y la huella del visto bueno.
import type { Demo } from "./datos.ts";
import { potenciaProducto, raizConFactor, raizGeneral, validarPotencia, validarRaiz, type Base } from "./generadores.ts";
import { diferenciaCuadrados, ecuacionLineal, fracciones, sumaLogaritmos, validarCuadrados, validarEcuacionLineal, validarFracciones, validarLogaritmos } from "./generadores-algebra.ts";
import { cuadratica, validarCuadratica } from "./generadores-cuadratica.ts";
import { charles, mruvMultiplica, validarCharles, validarMruvMultiplica } from "./generadores-fisica.ts";
import { estequiometria, molesDeAtomos, validarEstequiometria, validarMolesDeAtomos } from "./generadores-quimica.ts";
import { dinamica, validarDinamica } from "./generadores-dinamica.ts";
import { tiroHorizontal, validarTiro } from "./generadores-tiro.ts";
import { molaridad, validarMolaridad } from "./generadores-soluciones.ts";
import { numeroOxidacion, validarOxidacion } from "./generadores-redox.ts";
import { trigonometria, validarTrigonometria } from "./generadores-trigonometria.ts";
import { progresionAritmetica, validarProgresion } from "./generadores-progresiones.ts";
import { pitagoras, validarPitagoras, type TipoPitagoras } from "./generadores-geometria.ts";
import { punnett, validarPunnett } from "./generadores-genetica.ts";
import { interesSimple, validarInteres, type UnidadTiempo } from "./generadores-economicas.ts";

export type Tipo = "potencia" | "raiz" | "raizResto" | "lineal" | "fracciones" | "cuadrados" | "logaritmos" | "cuadratica" | "mruv" | "charles" | "estequiometria" | "molesAtomos" | "dinamica" | "tiro" | "molaridad" | "oxidacion" | "trigonometria" | "progresion" | "pitagoras" | "punnett" | "interes";
export type Armado = { demo: Demo } | { error: string };

export function construir(tipo: Tipo, v: string[]): Armado {
  const n = v.map(Number);
  if (tipo === "dinamica") {
    const e = validarDinamica(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: dinamica(n[0], n[1], n[2]).demo };
  }
  if (tipo === "tiro") {
    const e = validarTiro(n[0], n[1]);
    return e ? { error: e } : { demo: tiroHorizontal(n[0], n[1]).demo };
  }
  if (tipo === "molaridad") {
    const e = validarMolaridad(v[0].trim(), n[1], n[2]);
    return e ? { error: e } : { demo: molaridad(v[0].trim(), n[1], n[2]).demo };
  }
  if (tipo === "oxidacion") {
    const e = validarOxidacion(v[0].trim(), v[1].trim());
    return e ? { error: e } : { demo: numeroOxidacion(v[0].trim(), v[1].trim()).demo };
  }
  if (tipo === "trigonometria") {
    const e = validarTrigonometria(n[0], v[1].trim(), n[2], v[3].trim());
    return e ? { error: e } : { demo: trigonometria(n[0], v[1].trim(), n[2], v[3].trim()).demo };
  }
  if (tipo === "progresion") {
    const e = validarProgresion(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: progresionAritmetica(n[0], n[1], n[2]).demo };
  }
  if (tipo === "pitagoras") {
    const t = (v[0].trim() === "cateto" ? "cateto" : "hipotenusa") as TipoPitagoras;
    const e = validarPitagoras(t, n[1], n[2]);
    return e ? { error: e } : { demo: pitagoras(t, n[1], n[2]).demo };
  }
  if (tipo === "punnett") {
    const e = validarPunnett(v[0].trim(), v[1].trim());
    return e ? { error: e } : { demo: punnett(v[0].trim(), v[1].trim()).demo };
  }
  if (tipo === "interes") {
    const u = (v[3].trim() === "años" ? "años" : "meses") as UnidadTiempo;
    const e = validarInteres(n[0], n[1], n[2], u);
    return e ? { error: e } : { demo: interesSimple(n[0], n[1], n[2], u).demo };
  }
  if (tipo === "mruv") {
    const e = validarMruvMultiplica(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: mruvMultiplica(n[0], n[1], n[2]).demo };
  }
  if (tipo === "charles") {
    const e = validarCharles(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: charles(n[0], n[1], n[2]).demo };
  }
  if (tipo === "molesAtomos") {
    const e = validarMolesDeAtomos(v[0].trim(), v[1].trim(), n[2]);
    return e ? { error: e } : { demo: molesDeAtomos(v[0].trim(), v[1].trim(), n[2]).demo };
  }
  if (tipo === "estequiometria") {
    const pide = v[4].trim() === "mol" ? "mol" : "g";
    const e = validarEstequiometria(v[0].trim(), v[1].trim(), v[2].trim(), n[3], pide);
    return e ? { error: e } : { demo: estequiometria(v[0].trim(), v[1].trim(), v[2].trim(), n[3], pide).demo };
  }
  if (tipo === "cuadratica") {
    const e = validarCuadratica(n[0], n[1], n[2], n[3], n[4], n[5]);
    return e ? { error: e } : { demo: cuadratica(n[0], n[1], n[2], n[3], n[4], n[5]).demo };
  }
  if (tipo === "fracciones") {
    const e = validarFracciones(n[0], n[1], n[2], n[3]);
    return e ? { error: e } : { demo: fracciones(n[0], n[1], n[2], n[3], v[4].trim() === "-").demo };
  }
  if (tipo === "cuadrados") {
    const e = validarCuadrados(n[0]);
    return e ? { error: e } : { demo: diferenciaCuadrados(n[0]).demo };
  }
  if (tipo === "logaritmos") {
    const e = validarLogaritmos(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: sumaLogaritmos(n[0], n[1], n[2]).demo };
  }
  if (tipo === "lineal") {
    const e = validarEcuacionLineal(n[0], n[1], n[2]);
    return e ? { error: e } : { demo: ecuacionLineal(n[0], n[1], n[2]).demo };
  }
  const base: Base = v[0].trim().toLowerCase() === "x" ? "x" : n[0];
  if (tipo === "potencia") {
    const e = validarPotencia(base, n[1], n[2]);
    return e ? { error: e } : { demo: potenciaProducto(base, n[1], n[2]).demo };
  }
  if (tipo === "raiz") {
    const e = validarRaiz(base, n[1], n[2]);
    return e ? { error: e } : { demo: raizGeneral(base, n[1], n[2]).demo };
  }
  // raizResto: base^exponente por un resto c, indice k
  const c = n[3];
  const e = validarRaiz(base, n[1], n[2]);
  if (e) return { error: e };
  if (base === "x") return { error: "Aquí la base debe ser un número." };
  if (n[1] % n[2] !== 0) return { error: "Para este ejemplo el índice debe dividir al exponente (por ejemplo 2 y 2, o 3 y 6)." };
  if (!Number.isInteger(c) || c < 2 || c > 99) return { error: "El resto debe ser un entero entre 2 y 99." };
  return { demo: raizConFactor(base, n[1], n[2], c).demo };
}

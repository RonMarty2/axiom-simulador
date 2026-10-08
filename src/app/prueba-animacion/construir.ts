// Arma la animacion de un tipo a partir de los valores que escribe el alumno (o de un caso de casos.ts).
// La usan la tarjeta (Generador.tsx), el test de casos y la huella del visto bueno.
import type { Demo } from "./datos.ts";
import { potenciaProducto, raizConFactor, raizGeneral, validarPotencia, validarRaiz, type Base } from "./generadores.ts";
import { diferenciaCuadrados, ecuacionLineal, fracciones, sumaLogaritmos, validarCuadrados, validarEcuacionLineal, validarFracciones, validarLogaritmos } from "./generadores-algebra.ts";
import { cuadratica, validarCuadratica } from "./generadores-cuadratica.ts";
import { charles, mruvMultiplica, validarCharles, validarMruvMultiplica } from "./generadores-fisica.ts";
import { estequiometria, molesDeAtomos, validarEstequiometria, validarMolesDeAtomos } from "./generadores-quimica.ts";

export type Tipo = "potencia" | "raiz" | "raizResto" | "lineal" | "fracciones" | "cuadrados" | "logaritmos" | "cuadratica" | "mruv" | "charles" | "estequiometria" | "molesAtomos";
export type Armado = { demo: Demo } | { error: string };

export function construir(tipo: Tipo, v: string[]): Armado {
  const n = v.map(Number);
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

// Casos DIFICILES por tipo de animacion: lo que hay que mirar ademas del ejemplo comodo.
// Un tipo no se aprueba por verse bien con 2+2: se aprueba si se ve bien con TODOS sus casos.
// Cada caso lleva los mismos valores que escribe el alumno en la tarjeta. El test (casos.test.ts)
// comprueba que todos validen y pasen `revisar`; el visto bueno guarda la huella de TODOS.
import type { Tipo } from "./construir.ts";

export interface Caso {
  nombre: string;
  v: string[];
}

export const CASOS_POR_TIPO: Record<Tipo, Caso[]> = {
  lineal: [
    { nombre: "normal", v: ["3", "2", "11"] },
    { nombre: "suma negativa", v: ["4", "-5", "7"] },
    { nombre: "x fraccionaria", v: ["4", "2", "8"] },
    { nombre: "x negativa", v: ["3", "2", "-4"] },
    { nombre: "numeros grandes", v: ["12", "-7", "89"] },
  ],
  cuadrados: [
    { nombre: "k = 3", v: ["3"] },
    { nombre: "k = 2", v: ["2"] },
    { nombre: "k grande", v: ["15"] },
  ],
  fracciones: [
    { nombre: "suma normal", v: ["1", "2", "1", "3", "+"] },
    { nombre: "un denominador multiplo del otro", v: ["1", "6", "1", "3", "+"] },
    { nombre: "resta que da 0", v: ["1", "4", "1", "4", "-"] },
    { nombre: "resta", v: ["3", "4", "5", "6", "-"] },
    { nombre: "resultado simplificable", v: ["1", "6", "1", "3", "-"] },
    { nombre: "numeros grandes", v: ["5", "12", "7", "8", "+"] },
  ],
  potencia: [
    { nombre: "numero", v: ["2", "3", "4"] },
    { nombre: "letra", v: ["x", "2", "3"] },
    { nombre: "exponentes grandes", v: ["2", "12", "12"] },
    { nombre: "exponente 1", v: ["5", "1", "4"] },
  ],
  raiz: [
    { nombre: "exacta", v: ["2", "4", "2"] },
    { nombre: "no exacta", v: ["2", "5", "2"] },
    { nombre: "letra", v: ["x", "6", "3"] },
    { nombre: "indice 3", v: ["3", "6", "3"] },
  ],
  raizResto: [
    { nombre: "12 = 4 por 3", v: ["2", "2", "2", "3"] },
    { nombre: "base 3", v: ["3", "2", "2", "5"] },
    { nombre: "indice 3", v: ["2", "6", "3", "3"] },
  ],
  logaritmos: [
    { nombre: "base 2", v: ["2", "4", "8"] },
    { nombre: "base 10", v: ["10", "10", "100"] },
    { nombre: "iguales", v: ["2", "2", "2"] },
    { nombre: "base 3", v: ["3", "9", "27"] },
    { nombre: "los dos iguales y no potencias de 2", v: ["5", "5", "25"] },
  ],
  cuadratica: [
    { nombre: "desordenada", v: ["1", "-2", "4", "0", "3", "-2"] },
    { nombre: "a distinto de 1 y c negativo", v: ["2", "2", "-4", "0", "0", "0"] },
    { nombre: "dos soluciones enteras", v: ["1", "-5", "6", "0", "0", "0"] },
    { nombre: "b positivo", v: ["1", "4", "3", "0", "0", "0"] },
    { nombre: "una sola solucion", v: ["1", "-4", "4", "0", "0", "0"] },
    { nombre: "c grande y negativo", v: ["1", "-1", "-12", "0", "0", "0"] },
    { nombre: "a grande", v: ["3", "-12", "9", "0", "0", "0"] },
  ],
  mruv: [
    { nombre: "triplica", v: ["3", "200", "10"] },
    { nombre: "duplica", v: ["2", "150", "10"] },
    { nombre: "quintuplica", v: ["5", "300", "4"] },
  ],
  charles: [
    { nombre: "temperatura bajo cero", v: ["20", "-33", "27"] },
    { nombre: "T2 es el cuadruple", v: ["10", "-173", "127"] },
    { nombre: "enfria", v: ["15", "27", "-123"] },
    { nombre: "temperaturas altas", v: ["2", "127", "227"] },
  ],
  molesAtomos: [
    { nombre: "glucosa", v: ["C6H12O6", "O", "30"] },
    { nombre: "agua", v: ["H2O", "H", "18"] },
    { nombre: "subindice 1", v: ["CaCO3", "Ca", "100"] },
    { nombre: "masa grande", v: ["H2SO4", "S", "980"] },
  ],
  estequiometria: [
    { nombre: "de g a g", v: ["formacion-agua", "H2", "H2O", "8", "g"] },
    { nombre: "a moles", v: ["formacion-agua", "H2", "H2O", "8", "mol"] },
    { nombre: "coeficientes 1 a 1", v: ["combustion-carbono", "C", "CO2", "12", "g"] },
    { nombre: "coeficientes grandes", v: ["combustion-propano", "C3H8", "CO2", "44", "g"] },
    { nombre: "numeros grandes", v: ["oxidacion-hierro", "Fe", "Fe2O3", "224", "g"] },
  ],
};

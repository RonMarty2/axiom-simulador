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
    // x = -3/2: el menos pasa de delante de la raya al numerador al reemplazar x (el auditor lo pidio como caso fijo, 17-oct)
    { nombre: "x fraccionaria negativa", v: ["4", "2", "-4"] },
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
  dinamica: [
    { nombre: "una fuerza", v: ["4", "20", "0"] },
    { nombre: "dos fuerzas opuestas", v: ["4", "30", "10"] },
    { nombre: "masa 1", v: ["1", "7", "0"] },
    { nombre: "a = 1 con dos fuerzas", v: ["5", "8", "3"] },
    { nombre: "extremo", v: ["50", "1000", "500"] },
  ],
  tiro: [
    { nombre: "base", v: ["45", "8"] },
    { nombre: "raiz mas larga", v: ["405", "50"] },
    { nombre: "caida corta, velocidad maxima", v: ["20", "50"] },
    { nombre: "velocidad minima", v: ["320", "1"] },
    { nombre: "cuadrado de un digito", v: ["180", "7"] },
  ],
  molaridad: [
    { nombre: "NaOH sin subindices", v: ["NaOH", "4", "1"] },
    { nombre: "dos decimales", v: ["KOH", "14", "1"] },
    { nombre: "molaridad con mas decimales", v: ["H2SO4", "49", "2"] },
    { nombre: "resultado entero", v: ["HNO3", "126", "2"] },
    { nombre: "masa igual a la masa molar", v: ["C6H12O6", "180", "1"] },
    { nombre: "masa molar grande y volumen alto", v: ["ZnSO4", "161", "10"] },
    { nombre: "glucosa", v: ["C6H12O6", "36", "2"] },
    { nombre: "achicar 12/40 (el 4 sale de los divisores)", v: ["NaOH", "12", "1"] },
    { nombre: "achicar 147/98 y ampliar 3/2 a 15/10", v: ["H2SO4", "147", "1"] },
  ],
  oxidacion: [
    { nombre: "permanganato", v: ["KMnO4", "Mn"] },
    { nombre: "dicromato", v: ["K2Cr2O7", "Cr"] },
    { nombre: "tiosulfato", v: ["Na2S2O3", "S"] },
    { nombre: "amoniaco (negativo)", v: ["NH3", "N"] },
    { nombre: "oxido nitroso", v: ["N2O", "N"] },
    { nombre: "acido perclorico", v: ["HClO4", "Cl"] },
  ],
  trigonometria: [
    { nombre: "incognita arriba", v: ["30", "hip", "10", "op"] },
    { nombre: "producto cruzado", v: ["30", "op", "7", "hip"] },
    { nombre: "coseno de 60", v: ["60", "ady", "9", "hip"] },
    { nombre: "coseno de 60, al reves", v: ["60", "hip", "8", "ady"] },
    { nombre: "tangente de 45", v: ["45", "ady", "9", "op"] },
    { nombre: "valor limite", v: ["30", "hip", "98", "op"] },
  ],
  progresion: [
    { nombre: "normal", v: ["3", "4", "10"] },
    { nombre: "d negativa", v: ["3", "-4", "10"] },
    { nombre: "restar un negativo", v: ["-5", "3", "6"] },
    { nombre: "todo negativo, extremos", v: ["-20", "-10", "30"] },
    { nombre: "a1 cero y n minimo", v: ["0", "1", "3"] },
    { nombre: "cruza el cero", v: ["-8", "3", "12"] },
  ],
  pitagoras: [
    { nombre: "terna minima", v: ["hipotenusa", "3", "4"] },
    { nombre: "catetos al reves", v: ["hipotenusa", "4", "3"] },
    { nombre: "resultado que termina en 0", v: ["hipotenusa", "30", "40"] },
    { nombre: "catetos de dos cifras", v: ["hipotenusa", "33", "56"] },
    { nombre: "buscar cateto", v: ["cateto", "13", "5"] },
    { nombre: "cateto buscado mas chico", v: ["cateto", "5", "4"] },
    { nombre: "limite", v: ["cateto", "100", "28"] },
  ],
  punnett: [
    { nombre: "clasico 1:2:1", v: ["Aa", "Aa"] },
    { nombre: "cruce prueba", v: ["Aa", "aa"] },
    { nombre: "todos heterocigotos", v: ["AA", "aa"] },
    { nombre: "solo dominantes", v: ["AA", "Aa"] },
    { nombre: "una sola clase", v: ["aa", "aa"] },
  ],
  interes: [
    { nombre: "18 meses simplifica", v: ["2000", "5", "18", "meses"] },
    { nombre: "meses que no simplifican", v: ["1200", "6", "5", "meses"] },
    { nombre: "24 meses = 2 años", v: ["1000", "10", "24", "meses"] },
    { nombre: "decimales", v: ["250", "5", "18", "meses"] },
    { nombre: "12 meses = 1 año", v: ["3000", "8", "12", "meses"] },
    { nombre: "1 mes (singular)", v: ["1200", "6", "1", "meses"] },
    { nombre: "menos de 1 Bs", v: ["120", "1", "1", "meses"] },
    { nombre: "decimal en años", v: ["250", "5", "3", "años"] },
    { nombre: "años sin conversion", v: ["2000", "5", "3", "años"] },
  ],
};

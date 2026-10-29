// Nombre de cada elemento para el texto del alumno. Una sola lista para quimica y redox:
// antes cada generador tenia la suya (12 y 17 elementos, mismos nombres en los comunes).
// Ojo: redox la usa ademas como lista de elementos permitidos (contarAtomos), asi que agregar uno lo habilita ahi.
export const NOMBRE_ELEMENTO: Record<string, string> = {
  H: "hidrógeno",
  C: "carbono",
  N: "nitrógeno",
  O: "oxígeno",
  Na: "sodio",
  Mg: "magnesio",
  Al: "aluminio",
  P: "fósforo",
  S: "azufre",
  Cl: "cloro",
  K: "potasio",
  Ca: "calcio",
  Cr: "cromo",
  Mn: "manganeso",
  Fe: "hierro",
  Cu: "cobre",
  Zn: "zinc",
};

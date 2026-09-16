"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="10"
      tituloUnidad="Secuencias numéricas y literales"
      escenas={[
        { titulo: "Qué es una secuencia lógica", componente: EscIntro },
        { titulo: "Los 3 tipos de secuencia", componente: EscTipos },
        { titulo: "Procedimiento · 5 pasos", componente: EscProcedimiento },
        { titulo: "Patrones más comunes (numérica)", componente: EscPatrones },
        { titulo: "Práctica · numéricas A", componente: EscNA },
        { titulo: "Práctica · numéricas B", componente: EscNB },
        { titulo: "Práctica · numéricas C (patrones avanzados)", componente: EscNC },
        { titulo: "Práctica · alfabéticas", componente: EscAlf },
        { titulo: "Práctica · mixtas (número + letra)", componente: EscMix },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

// Visualizador de secuencia con flecha que muestra el patrón
function SecuenciaConPatron({
  terminos, patron, color = LIENZO.accent,
}: { terminos: string[]; patron: string; color?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={140} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox="0 0 480 140"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {terminos.map((t, i) => {
            const x = 60 + i * Math.min(80, (360 / (terminos.length - 1)));
            return (
              <g key={i}>
                <text x={x} y={75} textAnchor="middle" fontSize="28"
                  fill={LIENZO.fg} fontWeight="600">{t}</text>
                {i < terminos.length - 1 && on && (
                  <g>
                    <motion.path
                      d={`M ${x + 18} 60 Q ${x + 40} 30 ${x + 62} 60`}
                      fill="none" stroke={color} strokeWidth="2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.15 }} />
                    <motion.text x={x + 40} y={32} textAnchor="middle" fontSize="13"
                      fill={color} fontWeight="600"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 + 0.3 }}>{patron}</motion.text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic", marginTop: 6 }}>
        {on ? `Patrón: ${patron} entre términos consecutivos` : "Toca para ver el patrón"}
      </div>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Secuencias lógicas</Titulo>
      <Definicion termino="secuencia lógica">
        Serie de elementos (números, letras o símbolos) que siguen un <strong>patrón o regla</strong>.
        El objetivo es identificar el patrón y predecir o completar los términos siguientes.
      </Definicion>
      <Parrafo>
        Es uno de los ejercicios más usados para medir <strong>razonamiento inductivo</strong>: ver casos
        particulares (los primeros términos) y deducir la regla general.
      </Parrafo>

      <Hook>
        En el examen UMSS aparecen entre <strong>5 y 10 secuencias</strong> (numéricas, alfabéticas,
        mixtas). Es de los temas con mejor relación esfuerzo/puntos: con 5-6 patrones memorizados
        resuelves casi todas en menos de 30 segundos cada una.
      </Hook>

      <Misconception titulo="Trampa · 'el primer patrón que vea es el bueno'">
        Mucha gente ve "+2" entre los primeros dos términos y elige sin verificar el resto. ERROR.
        Tienes que probar el patrón en TODAS las diferencias. Si "+2" funciona en t₂−t₁ pero no en
        t₃−t₂, no es el patrón. Verifica siempre con un término más.
      </Misconception>
    </EscenaRica>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>Los 3 tipos de secuencia</Titulo>
      <Resumen>
        <strong>1. Numéricas</strong>: los términos son números. Patrones: suma, resta, multiplicación,
        división, cuadrados, Fibonacci.<br />
        Ej: 2, 4, 6, 8, __ → +2 → 10
      </Resumen>
      <SecuenciaConPatron terminos={["2", "4", "6", "8", "10"]} patron="+2" />
      <Resumen>
        <strong>2. Alfabéticas</strong>: los términos son letras. Patrones: avanzar/retroceder N
        posiciones en el abecedario.<br />
        Ej: A, C, E, G, __ → +2 letras → I
      </Resumen>
      <SecuenciaConPatron terminos={["A", "C", "E", "G", "I"]} patron="+2" color={LIENZO.ok} />
      <Resumen>
        <strong>3. Mixtas</strong>: combinan número y letra. Patrones paralelos: el número sigue una
        regla y la letra otra.<br />
        Ej: 1A, 2B, 3C, 4D, __ → +1 y +1 → 5E
      </Resumen>
    </EscenaRica>
  );
}

function EscProcedimiento() {
  return (
    <EscenaRica>
      <Titulo>Procedimiento · 5 pasos</Titulo>
      <Resumen>
        <strong>1. Calcula la DIFERENCIA</strong> entre términos consecutivos: t₂ − t₁, t₃ − t₂, etc.<br />
        Si la diferencia es constante → patrón aditivo (suma fija).<br /><br />
        <strong>2. Si la diferencia no es constante, calcula la RAZÓN</strong>: t₂ / t₁, t₃ / t₂, etc.<br />
        Si es constante → patrón multiplicativo.<br /><br />
        <strong>3. Si tampoco hay razón constante, míralo COMO PATRÓN CRECIENTE</strong>: las diferencias
        forman su propia secuencia (1, 2, 3, 4 o 2, 4, 6, 8).<br /><br />
        <strong>4. Para alfabéticas, USA NÚMEROS</strong>: A=1, B=2, C=3, ..., Z=26. Busca el patrón en
        números, después convierte.<br /><br />
        <strong>5. Verifica con un término más:</strong> aplica tu regla y comprueba que el siguiente
        encaja.
      </Resumen>

      <Mnemotecnia>
        <strong>Orden de prueba "S-M-D-F"</strong>:<br />
        <strong>S</strong>uma constante (lo más común) → <strong>M</strong>ultiplicación constante
        → <strong>D</strong>iferencias crecientes (+1, +2, +3…) → <strong>F</strong>amilia especial
        (cuadrados, Fibonacci, alternancia).<br /><br />
        El 80% del examen se resuelve con S y M. Si fallan ambas, vas a D. Si falla, F.
      </Mnemotecnia>

      <WorkedExample titulo="Procedimiento paso a paso · '2, 6, 12, 20, 30, ?'">
        <strong>Paso 1 · Diferencias:</strong><br />
        6−2 = 4, 12−6 = 6, 20−12 = 8, 30−20 = 10.<br />
        <strong>NO constante</strong> (4, 6, 8, 10).<br /><br />

        <strong>Paso 2 · Razón:</strong><br />
        6/2 = 3, 12/6 = 2, 20/12 ≈ 1.67.<br />
        <strong>NO constante</strong>.<br /><br />

        <strong>Paso 3 · Diferencias de diferencias:</strong><br />
        Las diferencias son 4, 6, 8, 10 → forman su propia secuencia con +2 constante.<br />
        <strong>¡Encontrado!</strong> El patrón es "diferencias que crecen +2 cada vez".<br /><br />

        <strong>Paso 4 · Siguiente diferencia:</strong> 10 + 2 = <strong>12</strong>.<br /><br />

        <strong>Paso 5 · Resultado:</strong> 30 + 12 = <strong>42</strong>.<br /><br />

        <strong>Verificación bonus:</strong> esta secuencia es n(n+1): 1·2=2, 2·3=6, 3·4=12, 4·5=20,
        5·6=30, 6·7=42. ✓
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPatrones() {
  return (
    <EscenaRica>
      <Titulo>Patrones más comunes en números</Titulo>
      <Resumen>
        <strong>Aditivo constante</strong>: +2, +5, +7… (sumar siempre lo mismo).<br />
        <strong>Multiplicativo</strong>: ×2, ×3… (multiplicar siempre por lo mismo).<br />
        <strong>Aditivo creciente</strong>: +1, +2, +3, +4… (el incremento crece).<br />
        <strong>Cuadrados perfectos</strong>: 1, 4, 9, 16, 25 (n²).<br />
        <strong>Fibonacci</strong>: 1, 1, 2, 3, 5, 8 (cada término es la suma de los dos anteriores).<br />
        <strong>Alternancia</strong>: +3, −2, +3, −2 (dos operaciones que se turnan).
      </Resumen>
      <PorQue>
        Cuando una secuencia no encaja con suma ni multiplicación constante, prueba uno de los patrones
        avanzados antes de declararla "ninguna".
      </PorQue>

      <Mnemotecnia>
        <strong>Tabla de cuadrados y Fibonacci · memoriza estos números:</strong><br /><br />
        <strong>Cuadrados:</strong> 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.<br />
        Si ves esos números → es n².<br /><br />
        <strong>Fibonacci:</strong> 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.<br />
        Si ves esos números → cada uno es la suma de los 2 anteriores.<br /><br />
        Reconocerlos al toque te ahorra 30 segundos por pregunta.
      </Mnemotecnia>

      <Misconception titulo="Trampa de las alternancias">
        Si la secuencia parece "saltar" (subir, bajar, subir, bajar), no es errática: es
        <strong> alternancia</strong> (dos operaciones que se turnan). Mira las posiciones IMPARES
        por un lado y las PARES por otro. A veces son dos secuencias entrelazadas.
      </Misconception>
    </EscenaRica>
  );
}

function EscNA() {
  return (
    <EscenaRica>
      <Titulo>Práctica · numéricas A</Titulo>
      <PracticaFinal ejercicios={[
        { p: "13, 15, 17, 19, …", o: ["18", "22", "21", "20", "Ninguna"], c: 2, ex: "Suma constante +2. 19 + 2 = 21." },
        { p: "2, 4, 8, 16, …", o: ["24", "32", "30", "28", "Ninguna"], c: 1, ex: "Multiplicación constante ×2. 16 × 2 = 32." },
        { p: "5, 10, 15, 20, …", o: ["25", "24", "30", "28", "Ninguna"], c: 0, ex: "Suma constante +5. 20 + 5 = 25." },
        { p: "1, 1, 2, 3, 5, …", o: ["6", "7", "8", "9", "Ninguna"], c: 2, ex: "Fibonacci: cada término es la suma de los 2 anteriores. 3 + 5 = 8." },
        { p: "100, 90, 80, 70, …", o: ["65", "60", "55", "50", "Ninguna"], c: 1, ex: "Resta constante −10. 70 − 10 = 60." },
      ]} />
    </EscenaRica>
  );
}

function EscNB() {
  return (
    <EscenaRica>
      <Titulo>Práctica · numéricas B</Titulo>
      <PracticaFinal ejercicios={[
        { p: "3, 6, 12, 24, …", o: ["36", "48", "40", "42", "Ninguna"], c: 1, ex: "×2. 24 × 2 = 48." },
        { p: "7, 14, 28, 56, …", o: ["70", "84", "112", "98", "Ninguna"], c: 2, ex: "×2. 56 × 2 = 112." },
        { p: "9, 18, 27, 36, …", o: ["45", "40", "50", "42", "Ninguna"], c: 0, ex: "+9 constante. 36 + 9 = 45." },
        { p: "10, 20, 40, 80, …", o: ["100", "120", "160", "140", "Ninguna"], c: 2, ex: "×2. 80 × 2 = 160." },
        { p: "1, 3, 6, 10, …", o: ["15", "14", "16", "13", "Ninguna"], c: 0, ex: "Aditivo creciente +2, +3, +4, +5. 10 + 5 = 15." },
      ]} />
    </EscenaRica>
  );
}

function EscNC() {
  return (
    <EscenaRica>
      <Titulo>Práctica · numéricas avanzadas</Titulo>
      <PracticaFinal ejercicios={[
        { p: "1, 4, 9, 16, …", o: ["20", "25", "21", "22", "Ninguna"], c: 1, ex: "Cuadrados perfectos: 1², 2², 3², 4², 5² = 25." },
        { p: "2, 5, 10, 17, 26, …", o: ["35", "34", "37", "36", "Ninguna"], c: 2, ex: "Diferencias: 3, 5, 7, 9 (impares crecientes). Siguiente diferencia: 11. 26 + 11 = 37. (Equivale a n² + 1: 1+1, 4+1, 9+1, 16+1, 25+1, 36+1=37.)" },
        { p: "1, 2, 4, 7, 11, …", o: ["16", "17", "15", "14", "Ninguna"], c: 0, ex: "Aditivo creciente +1, +2, +3, +4, +5. 11 + 5 = 16." },
        { p: "7, 10, 8, 11, 9, 12, …", o: ["13", "10", "14", "11", "Ninguna"], c: 1, ex: "Alternancia +3, −2: 7(+3)10(−2)8(+3)11(−2)9(+3)12(−2)10. El siguiente término es 10." },
        { p: "8, 16, 32, 64, …", o: ["96", "128", "112", "100", "Ninguna"], c: 1, ex: "×2. 64 × 2 = 128." },
      ]} />
    </EscenaRica>
  );
}

function EscAlf() {
  return (
    <EscenaRica>
      <Titulo>Práctica · alfabéticas</Titulo>
      <Parrafo>
        Truco: <strong>convierte letras a números</strong> (A=1, B=2, C=3…) y aplica los mismos
        procedimientos.
      </Parrafo>
      <PracticaFinal ejercicios={[
        { p: "A, C, E, G, …", o: ["H", "I", "J", "K", "Ninguna"], c: 1, ex: "+2 (1, 3, 5, 7, 9 = I)." },
        { p: "Z, X, V, T, …", o: ["S", "R", "Q", "P", "Ninguna"], c: 1, ex: "−2 (26, 24, 22, 20, 18 = R)." },
        { p: "M, N, O, P, …", o: ["Q", "R", "S", "T", "Ninguna"], c: 0, ex: "+1 (la siguiente: Q)." },
        { p: "B, D, F, H, …", o: ["I", "J", "K", "L", "Ninguna"], c: 1, ex: "+2 (2, 4, 6, 8, 10 = J)." },
        { p: "Q, P, O, N, …", o: ["M", "L", "K", "J", "Ninguna"], c: 0, ex: "−1 (17, 16, 15, 14, 13 = M)." },
        { p: "C, F, I, L, …", o: ["M", "N", "O", "P", "Ninguna"], c: 2, ex: "+3 (3, 6, 9, 12, 15 = O)." },
        { p: "G, E, C, A, …", o: ["B", "D", "F", "H", "Ninguna"], c: 4, ex: "Retrocede −2: G(7), E(5), C(3), A(1). Después de A no queda letra válida (1 − 2 no existe) → Ninguna de las anteriores. Trampa clásica de UMSS." },
        { p: "E, H, K, N, …", o: ["O", "P", "Q", "R", "Ninguna"], c: 2, ex: "+3 (5, 8, 11, 14, 17 = Q)." },
      ]} />
    </EscenaRica>
  );
}

function EscMix() {
  return (
    <EscenaRica>
      <Titulo>Práctica · mixtas (número + letra)</Titulo>
      <Parrafo>
        Trata número y letra como dos secuencias paralelas. Cada una sigue su propia regla.
      </Parrafo>
      <PracticaFinal ejercicios={[
        { p: "1A, 2B, 3C, 4D, …", o: ["5E", "6F", "5F", "5D", "Ninguna"], c: 0, ex: "Número +1, letra +1. 5E." },
        { p: "A1, B2, C3, D4, …", o: ["E5", "E6", "F5", "D5", "Ninguna"], c: 0, ex: "Mismo patrón con orden invertido: E5." },
        { p: "2B, 4D, 6F, 8H, …", o: ["10J", "10I", "12J", "10H", "Ninguna"], c: 0, ex: "Número +2, letra +2. 10J." },
        { p: "3C, 6F, 9I, 12L, …", o: ["15O", "15N", "18O", "15M", "Ninguna"], c: 0, ex: "Número +3, letra +3. 15O." },
        { p: "1A, 3C, 5E, 7G, …", o: ["9I", "9H", "11I", "9J", "Ninguna"], c: 0, ex: "Número +2, letra +2. 9I." },
        { p: "4D, 8H, 12L, 16P, …", o: ["20T", "20S", "24T", "20R", "Ninguna"], c: 0, ex: "Número +4, letra +4. 20T." },
      ]} />
    </EscenaRica>
  );
}

function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Resumen</Titulo>
      <Resumen>
        <strong>1.</strong> Primero prueba DIFERENCIA CONSTANTE (suma fija). Es el patrón más simple.<br /><br />
        <strong>2.</strong> Si no encaja, prueba RAZÓN CONSTANTE (multiplicación fija).<br /><br />
        <strong>3.</strong> Si no encaja, mira las DIFERENCIAS ENTRE TÉRMINOS: a veces forman su propia
        secuencia (+1, +2, +3…).<br /><br />
        <strong>4.</strong> Para alfabéticas, traduce letras a números (A=1, B=2, …) y trabaja igual.<br /><br />
        <strong>5.</strong> Para mixtas, separa: el número sigue una regla, la letra otra. Resuelvelas
        por separado y combina.<br /><br />
        <strong>6.</strong> Si nada encaja, considerá Fibonacci, cuadrados perfectos o alternancia.
      </Resumen>
    </EscenaRica>
  );
}

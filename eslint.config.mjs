import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Sin FlatCompat. eslint-config-next ya exporta flat config nativo desde la
// 15.3, y envolverlo con FlatCompat lo rompía: al serializar la config, el
// plugin de react se referencia a sí mismo y ESLint moría con "Converting
// circular structure to JSON". Resultado: el lint no corría en ningún
// archivo, y Next 16 ya no lintea durante el build, así que no lo tapaba nada.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Apagada a propósito: marca comillas y apóstrofes en texto JSX, y en un
      // producto escrito en castellano eso son 1925 avisos sobre prosa normal
      // que React renderiza bien. Con la regla prendida tapaba los 16 avisos
      // de hooks, que sí eran bugs reales.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;

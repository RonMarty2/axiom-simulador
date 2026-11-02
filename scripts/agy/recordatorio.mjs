// Aviso automatico antes de lanzar un agente de Claude (hook PreToolUse, matcher Agent|Task).
// No bloquea nada: le recuerda a la sesion que antes de gastar Claude debe decidir si el trabajo es de agy.
// Origen: 1-nov-2026, Ronald: la regla existia y no se siguio. Ver agentes/ejecutor-agy.md ("Puerta obligatoria").
import { readFileSync } from "node:fs";

let tipo = "";
try {
  const entrada = JSON.parse(readFileSync(0, "utf8") || "{}");
  tipo = String(entrada?.tool_input?.subagent_type ?? "");
} catch {
  // sin entrada legible: igual se muestra el aviso
}

// Los agentes de Claude que SI tienen sentido por no poder hacerlo agy no necesitan el sermon completo, pero el aviso es corto.
const mensaje = [
  `ALTO antes de lanzar el agente de Claude${tipo ? ` «${tipo}»` : ""}: ¿esto lo puede hacer agy?`,
  "Regla de Ronald (CLAUDE.md, agentes/ejecutor-agy.md): Claude decide, revisa el DIFF y los CONTROLES y habla con Ronald; agy hace el resto.",
  "A agy (Flash 3.8 mecanico/lectura, Argon criterio): auditorias, inventarios, lecturas largas, buscar errores en muchos archivos, revisar piezas e imagenes, escribir o editar codigo, documentos y agentes.",
  "A un agente de Claude SOLO si necesita el navegador, hablar con Ronald o algo fuera del candado de agy.",
  "Si sigues con el agente de Claude, dile a Ronald en una linea por que agy no podia.",
].join("\n");

process.stdout.write(JSON.stringify({
  hookSpecificOutput: { hookEventName: "PreToolUse", additionalContext: mensaje },
}));

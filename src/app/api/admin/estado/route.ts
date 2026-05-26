import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { supabaseConfigurado } from "@/lib/supabase";
import { getUsuarios, getPagos } from "@/lib/data-store";
import { estadisticasBanco } from "@/lib/axiom/preguntas-store";
import { listarMetadata } from "@/lib/axiom/banco-loader";
import { AI_PROVIDERS, hasProviderKey } from "@/lib/aiProvider";

// Chequeo de estado del sistema (solo admin). Responde de forma fiable, en el
// entorno donde corre (producción incluida), si Supabase y la IA están
// conectados y cuántos datos hay.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }

  const supabase = supabaseConfigurado();

  // Conteos (si Supabase está conectado, estos números vienen de la base real).
  let usuarios = 0, pagos = 0, preguntasBanco = 0, examenes = 0;
  const errores: string[] = [];
  try { usuarios = (await getUsuarios()).length; } catch (e) { errores.push("usuarios: " + (e as Error).message); }
  try { pagos = (await getPagos()).length; } catch (e) { errores.push("pagos: " + (e as Error).message); }
  try { preguntasBanco = (await estadisticasBanco()).total; } catch (e) { errores.push("banco: " + (e as Error).message); }
  try { examenes = (await listarMetadata()).length; } catch (e) { errores.push("examenes: " + (e as Error).message); }

  // ¿Hay al menos una API key de IA configurada?
  const proveedoresIA = AI_PROVIDERS.filter((p) => p.id !== "lmstudio" && hasProviderKey(p.id)).map((p) => p.name);
  const iaConfigurada = proveedoresIA.length > 0;

  return NextResponse.json({
    supabase_conectado: supabase,
    almacenamiento: supabase ? "Supabase (permanente)" : "Archivos temporales (se borra al actualizar)",
    ia_configurada: iaConfigurada,
    proveedores_ia: proveedoresIA,
    conteos: { usuarios, pagos, preguntas_banco: preguntasBanco, examenes },
    errores,
    revisado: new Date().toISOString(),
  });
}

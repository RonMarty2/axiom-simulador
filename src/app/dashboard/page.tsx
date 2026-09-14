"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import Icono, { type NombreIcono } from "../components/Icono";
import type { Usuario, Facultad, HistorialExamen } from "@/lib/data-store";
import { esPago, inicioSemanaISO, textoProximaRenovacion } from "@/lib/plan";

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [historial, setHistorial] = useState<HistorialExamen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/historial").then((r) => r.json()).catch(() => ({ historial: [] })),
      fetch("/api/facultades").then((r) => r.json()).catch(() => ({ facultades: [] })),
    ]).then(([me, hist, fac]) => {
      if (!me.usuario) {
        router.push("/login");
        return;
      }
      // Si el usuario no eligió facultad todavía, mandarlo a onboarding
      if (!me.usuario.facultad_objetivo) {
        router.push("/onboarding");
        return;
      }
      setUsuario(me.usuario);
      setHistorial(hist.historial ?? []);
      const f = (fac.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
      setFacultad(f ?? null);
      setLoading(false);
    }).catch(() => {
      // Si /api/auth/me falla por red, evitamos dejar la pantalla colgada en "Cargando..."
      setError(true);
      setLoading(false);
    });
  }, [router]);

  if (error) {
    return (
      <div style={{ padding: 40, minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
        <span style={{ color: "var(--accent)" }}><Icono nombre="alerta" tamano={40} grosor={1.6} /></span>
        <p style={{ color: "var(--fg-muted)", fontSize: 16, maxWidth: 320 }}>No pudimos conectar con el servidor. Revisa tu conexión a internet.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "11px 26px", background: "var(--accent)", color: "var(--accent-fg)", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (loading || !usuario) return <Cargando />;

  const ultimos = historial.slice(0, 5);
  // Plan gratis: 2 simulacros pasados + 2 predictivos por semana (4 en total).
  const limiteSemanal = 4;
  const desdeSemana = inicioSemanaISO();
  const examenesEstaSemana = historial.filter((h) => h.fecha >= desdeSemana).length;
  const esGratis = !esPago(usuario.plan);
  const limiteAlcanzado = esGratis && examenesEstaSemana >= limiteSemanal;
  const restantes = Math.max(0, limiteSemanal - examenesEstaSemana);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px" }}>
        {/* Saludo + números de un vistazo. Antes eran cuatro tarjetas grandes
            apiladas que en móvil ocupaban media pantalla para mostrar cuatro
            cifras; ahora van en una sola fila separada por líneas. */}
        <div className="ax-dash-cabecera" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          <div>
            <h1 className="font-crimson" style={{ fontSize: 34, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>
              Buenas, {usuario.nombre.split(" ")[0]}
            </h1>
            <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
              Postulas a <strong style={{ color: "var(--fg-primary)" }}>{facultad?.nombre_corto}</strong>. Sigue practicando.
            </p>
          </div>

          <div className="ax-cifras" style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6 }}>
            <Cifra label="Exámenes" valor={usuario.examenes_completados} />
            <Cifra label="Mejor nota" valor={usuario.mejor_nota} color="var(--green)" />
            <Cifra label="Promedio" valor={usuario.nota_promedio} />
            <Cifra label="Esta semana" valor={examenesEstaSemana} />
          </div>
        </div>

        {/* Pieza dominante: una sola acción clara, en tinta sólida */}
        <div style={{
          background: limiteAlcanzado ? "#7d4a12" : "var(--fg-primary)",
          borderRadius: 8, padding: "28px 30px", color: "var(--bg-base)", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#c98a63", marginBottom: 10 }}>
              {limiteAlcanzado ? "Límite semanal alcanzado" : "Tu próximo paso"}
            </div>
            <h2 className="font-crimson" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
              {limiteAlcanzado ? "Llegaste al límite del plan gratis" : "¿Listo para tu siguiente simulacro?"}
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(250,247,240,0.75)" }}>
              {limiteAlcanzado
                ? `Hiciste ${examenesEstaSemana} simulacros esta semana. Se renueva ${textoProximaRenovacion()}. Pásate a Premium para tenerlos ilimitados.`
                : `Tienes ${esGratis ? `${restantes} simulacros gratis` : "simulacros ilimitados"} esta semana${esGratis ? ` (se renueva ${textoProximaRenovacion()})` : ""}.`}
            </p>
          </div>
          <Link href={limiteAlcanzado ? "/precios" : "/practicar"} style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "13px 26px", background: "var(--accent)", color: "var(--accent-fg)",
            borderRadius: 4, textDecoration: "none", fontWeight: 700, fontSize: 15,
          }}>
            {limiteAlcanzado ? "Mejorar plan" : "Empezar simulacro"}
            <Icono nombre="flecha" tamano={16} grosor={2.4} />
          </Link>
        </div>

        {/* Últimos exámenes + Acciones rápidas. En móvil apila ambas (1 columna);
            en pantallas >= 720px va lado a lado (2 columnas). */}
        <div className="ax-dash-grid" style={{ display: "grid", gap: 20 }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)" }}>Últimos exámenes</h3>
              <Link href="/historial" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Ver todo →</Link>
            </div>
            {ultimos.length === 0 && (
              <div style={{ textAlign: "center", padding: 30, color: "var(--fg-muted)", fontSize: 14 }}>
                Aún no has hecho ningún examen. <Link href="/practicar" style={{ color: "var(--accent)" }}>Empieza ahora</Link>.
              </div>
            )}
            {ultimos.map((h) => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="font-crimson" style={{ width: 46, fontSize: 24, fontWeight: 700, marginRight: 12, color: h.nota >= 70 ? "var(--green)" : h.nota >= 50 ? "#c07a2a" : "#b3341f" }}>
                  {h.nota}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-primary)" }}>
                    {modoLabel(h.modo)} {h.anio_examen ? `· Examen ${h.anio_examen}` : ""}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                    {new Date(h.fecha).toLocaleDateString("es-BO", { day: "numeric", month: "short", year: "numeric" })} · {h.correctas}/{h.correctas + h.incorrectas + h.sin_responder} correctas
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
            <Acceso href="/practicar" icono="practicar" titulo="Practicar" detalle="6 modos disponibles" />
            <Acceso href="/errores" icono="errores" titulo="Mis errores" detalle="Repasa lo que fallaste" />
            <Acceso href="/ranking" icono="ranking" titulo="Ranking" detalle="Top 10 global" />
            <Acceso href="/cuenta" icono="cuenta" titulo="Mi cuenta" detalle={`Plan ${usuario.plan}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// El número va pegado al fondo de la columna: así las etiquetas de dos
// palabras pueden partirse en móvil sin desalinear las cifras entre sí.
function Cifra({ label, valor, color }: { label: string; valor: string | number; color?: string }) {
  return (
    <div style={{ padding: "12px 22px", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 6 }}>
      <div style={{ fontSize: 10.5, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", lineHeight: 1.25 }}>{label}</div>
      <div className="font-crimson" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, color: color ?? "var(--fg-primary)" }}>{valor}</div>
    </div>
  );
}

function Acceso({ href, icono, titulo, detalle }: { href: string; icono: NombreIcono; titulo: string; detalle: string }) {
  return (
    <Link
      href={href}
      style={{
        background: "var(--bg-card)", borderRadius: 6, padding: "14px 16px", textDecoration: "none",
        display: "flex", alignItems: "center", gap: 13, border: "1px solid var(--border)",
      }}
    >
      <span style={{ color: "var(--accent)", display: "flex" }}>
        <Icono nombre={icono} tamano={20} />
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{titulo}</span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginTop: 1 }}>{detalle}</span>
      </span>
      <span style={{ color: "var(--border-hover)", display: "flex" }}>
        <Icono nombre="chevron" tamano={16} grosor={2} />
      </span>
    </Link>
  );
}

function modoLabel(modo: string): string {
  return ({
    examen_real: "Examen real",
    mixto: "Simulacro mixto",
    predictivo: "Simulacro inteligente",
    por_tema: "Por tema",
    mis_errores: "Mis errores",
    ia_generado: "Simulacro inteligente",
  } as Record<string, string>)[modo] ?? modo;
}

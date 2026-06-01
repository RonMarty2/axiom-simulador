"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
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
        <div style={{ fontSize: 44 }}>📡</div>
        <p style={{ color: "var(--fg-muted)", fontSize: 16, maxWidth: 320 }}>No pudimos conectar con el servidor. Revisá tu conexión a internet.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "10px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (loading || !usuario) return <div style={{ padding: 40, textAlign: "center" }}>Cargando...</div>;

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
        {/* Saludo */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 36, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>
            Hola, {usuario.nombre.split(" ")[0]} 👋
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Postulas a <strong style={{ color: facultad?.color ?? "var(--accent)" }}>{facultad?.nombre_corto}</strong>. Sigue practicando.
          </p>
        </div>

        {/* Stats principales */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
          <StatBox icon="📝" label="Exámenes hechos" valor={usuario.examenes_completados} color="#6366f1" />
          <StatBox icon="🏆" label="Mejor nota" valor={`${usuario.mejor_nota}/100`} color="#10b981" />
          <StatBox icon="📊" label="Nota promedio" valor={`${usuario.nota_promedio}/100`} color="#f59e0b" />
          <StatBox icon="🔥" label="Esta semana" valor={examenesEstaSemana} color="#ef4444" />
        </div>

        {/* CTA grande */}
        <div style={{
          background: limiteAlcanzado ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, var(--accent), #4f46e5)",
          borderRadius: 18, padding: 28, color: "white", marginBottom: 28, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h2 className="font-crimson" style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
              {limiteAlcanzado ? "Llegaste al límite semanal del plan gratis 🎯" : "¿Listo para tu siguiente simulacro?"}
            </h2>
            <p style={{ fontSize: 14, opacity: 0.92 }}>
              {limiteAlcanzado
                ? `Hiciste ${examenesEstaSemana} simulacros esta semana. Se renueva ${textoProximaRenovacion()}. Pásate a Premium para ilimitados.`
                : `Tienes ${esGratis ? `${restantes} simulacros gratis` : "simulacros ilimitados"} esta semana${esGratis ? ` (se renueva ${textoProximaRenovacion()})` : ""}.`}
            </p>
          </div>
          <Link href={limiteAlcanzado ? "/precios" : "/practicar"} style={{
            padding: "13px 26px", background: "white", color: limiteAlcanzado ? "#f59e0b" : "var(--accent)",
            borderRadius: 10, textDecoration: "none", fontWeight: 800, fontSize: 15,
          }}>
            {limiteAlcanzado ? "Mejorar plan →" : "Empezar simulacro →"}
          </Link>
        </div>

        {/* Últimos exámenes + Acciones rápidas */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
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
              <div key={h.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: h.nota >= 70 ? "#10b98115" : h.nota >= 50 ? "#f59e0b15" : "#ef444415", color: h.nota >= 70 ? "#059669" : h.nota >= 50 ? "#d97706" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginRight: 12 }}>
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

          <div style={{ display: "grid", gap: 12 }}>
            <Link href="/practicar" style={cardLink("#6366f1")}>
              <div style={{ fontSize: 28 }}>📝</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>Practicar</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>6 modos disponibles</div>
              </div>
            </Link>
            <Link href="/errores" style={cardLink("#ef4444")}>
              <div style={{ fontSize: 28 }}>🎯</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>Mis errores</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>Repasa lo que fallaste</div>
              </div>
            </Link>
            <Link href="/ranking" style={cardLink("#f59e0b")}>
              <div style={{ fontSize: 28 }}>🏆</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>Ranking</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>Top 10 global</div>
              </div>
            </Link>
            <Link href="/cuenta" style={cardLink("#10b981")}>
              <div style={{ fontSize: 28 }}>👤</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>Mi cuenta</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>Plan {usuario.plan}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, valor, color }: { icon: string; label: string; valor: string | number; color: string }) {
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 16, border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
        <div style={{ fontSize: 18 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{valor}</div>
    </div>
  );
}

function cardLink(_color: string): React.CSSProperties {
  return {
    background: "var(--bg-card)", borderRadius: 12, padding: 14, textDecoration: "none",
    display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--border)",
  };
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

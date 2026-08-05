"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import BackLink from "../../components/BackLink";

interface Estado {
  supabase_conectado: boolean;
  almacenamiento: string;
  ia_configurada: boolean;
  proveedores_ia: string[];
  conteos: { usuarios: number; pagos: number; preguntas_banco: number; examenes: number };
  errores: string[];
  revisado: string;
}

export default function AdminEstadoPage() {
  const router = useRouter();
  const [estado, setEstado] = useState<Estado | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargar = () => {
    setCargando(true);
    fetch("/api/admin/estado")
      .then((r) => r.json())
      .then((d) => setEstado(d.error ? null : d))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      cargar();
    });
  }, [router]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>🩺 Estado del sistema</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>Revisa de un vistazo si todo está conectado y listo para lanzar.</p>

        {cargando && <div style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>Revisando…</div>}

        {!cargando && estado && (
          <div style={{ display: "grid", gap: 14 }}>
            <Tarjeta
              ok={estado.supabase_conectado}
              titulo="Base de datos (Supabase)"
              okTexto="Conectada. Tus datos se guardan de forma permanente. ✅"
              malTexto="NO conectada. Los datos se borran al actualizar el sitio. Conéctala antes de lanzar."
              detalle={estado.almacenamiento}
            />
            <Tarjeta
              ok={estado.ia_configurada}
              titulo="Inteligencia Artificial"
              okTexto={`Configurada (${estado.proveedores_ia.join(", ")}). Los simulacros y planes con IA funcionan.`}
              malTexto="Sin API key de IA. Las funciones con IA (simulacros generados, planes) no funcionarán."
            />

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12 }}>📊 Datos cargados</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 12 }}>
                <Conteo label="Usuarios" valor={estado.conteos.usuarios} />
                <Conteo label="Pagos" valor={estado.conteos.pagos} />
                <Conteo label="Preguntas (banco)" valor={estado.conteos.preguntas_banco} />
                <Conteo label="Exámenes" valor={estado.conteos.examenes} />
              </div>
            </div>

            {estado.errores.length > 0 && (
              <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid #fca5a5", borderRadius: 14, padding: 16 }}>
                <div style={{ fontWeight: 800, color: "#b91c1c", marginBottom: 6 }}>⚠️ Avisos</div>
                {estado.errores.map((e, i) => <div key={i} style={{ fontSize: 13, color: "#b91c1c" }}>{e}</div>)}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={cargar} style={{ padding: "10px 18px", background: "var(--accent)", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>↻ Revisar de nuevo</button>
              <BackLink href="/admin" label="Volver al admin" />
            </div>
          </div>
        )}

        {!cargando && !estado && (
          <div style={{ padding: 20, background: "rgba(239,68,68,0.08)", borderRadius: 12, color: "#b91c1c" }}>
            No se pudo leer el estado. ¿Iniciaste sesión como admin?
          </div>
        )}
      </div>
    </div>
  );
}

function Tarjeta({ ok, titulo, okTexto, malTexto, detalle }: { ok: boolean; titulo: string; okTexto: string; malTexto: string; detalle?: string }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: `2px solid ${ok ? "#10b981" : "#ef4444"}`,
      borderRadius: 14, padding: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 22 }}>{ok ? "✅" : "❌"}</span>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)" }}>{titulo}</h3>
      </div>
      <p style={{ fontSize: 14, color: ok ? "#059669" : "#b91c1c", fontWeight: 600 }}>{ok ? okTexto : malTexto}</p>
      {detalle && <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4 }}>Almacenamiento: {detalle}</p>}
    </div>
  );
}

function Conteo({ label, valor }: { label: string; valor: number }) {
  return (
    <div style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 12, textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 900, color: "var(--fg-primary)" }}>{valor}</div>
      <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{label}</div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";

interface Stats {
  total_usuarios: number;
  usuarios_gratis: number;
  usuarios_pro: number;
  usuarios_premium: number;
  ingreso_total_bob: number;
  pagos_pendientes: number;
  total_examenes_completados: number;
  examenes_hoy: number;
  nota_promedio_global: number;
  total_facultades: number;
  por_facultad: Array<{ id: string; nombre: string; color: string; usuarios: number; examenes: number }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      fetch("/api/estadisticas-globales").then((r) => r.json()).then((s) => {
        setStats(s);
        setLoading(false);
      });
    });
  }, [router]);

  if (loading || !stats) return <div style={{ padding: 40, textAlign: "center" }}>Cargando dashboard...</div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>⚡ Panel de administración</h1>
          <p style={{ color: "var(--fg-muted)" }}>Resumen general de la plataforma</p>
        </div>

        {/* Stats principales */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
          <BigStat label="Ingresos totales" valor={`Bs. ${stats.ingreso_total_bob}`} change={`+Bs. 100 este mes`} color="#10b981" icon="💰" />
          <BigStat label="Usuarios totales" valor={stats.total_usuarios} change={`${stats.usuarios_premium} premium · ${stats.usuarios_pro} pro`} color="#6366f1" icon="👥" />
          <BigStat label="Exámenes completados" valor={stats.total_examenes_completados} change={`${stats.examenes_hoy} hoy`} color="#a855f7" icon="📝" />
          <BigStat label="Nota promedio" valor={`${stats.nota_promedio_global}/100`} change="global" color="#f59e0b" icon="📊" />
          <BigStat label="Pagos pendientes" valor={stats.pagos_pendientes} change={stats.pagos_pendientes > 0 ? "⚠ revisar" : "todo OK"} color={stats.pagos_pendientes > 0 ? "#ef4444" : "#6b7280"} icon="⏳" />
          <BigStat label="Facultades activas" valor={stats.total_facultades} change="con banco cargado" color="#06b6d4" icon="🏛️" />
        </div>

        {/* Distribución por facultad */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1px solid var(--border)", marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>Distribución por facultad</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {stats.por_facultad.map((f) => (
              <div key={f.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "var(--fg-primary)", textTransform: "capitalize" }}>{f.nombre}</span>
                  <span style={{ color: "var(--fg-muted)" }}>{f.usuarios} usuarios · {f.examenes} exámenes</span>
                </div>
                <div style={{ height: 8, background: "var(--bg-subtle)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${(f.usuarios / stats.total_usuarios) * 100}%`, height: "100%", background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          <AccesoRapido href="/admin/banco" emoji="📚" titulo="Banco de exámenes" descripcion="Subir, ver y editar archivos del banco" />
          <AccesoRapido href="/admin/facultades" emoji="🏛️" titulo="Facultades y materias" descripcion="Gestionar carreras y temas" />
          <AccesoRapido href="/admin/usuarios" emoji="👥" titulo="Usuarios" descripcion="Ver, editar, suspender cuentas" />
          <AccesoRapido href="/admin/pagos" emoji="💳" titulo="Pagos pendientes" descripcion={`${stats.pagos_pendientes} esperan aprobación`} alerta={stats.pagos_pendientes > 0} />
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, valor, change, color, icon }: { label: string; valor: string | number; change: string; color: string; icon: string }) {
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 18, border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
        <div style={{ fontSize: 20 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color, marginBottom: 4 }}>{valor}</div>
      <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{change}</div>
    </div>
  );
}

function AccesoRapido({ href, emoji, titulo, descripcion, alerta }: { href: string; emoji: string; titulo: string; descripcion: string; alerta?: boolean }) {
  return (
    <Link href={href} style={{
      background: alerta ? "rgba(239,68,68,0.06)" : "var(--bg-card)",
      borderRadius: 12, padding: 18, border: alerta ? "1px solid #ef4444" : "1px solid var(--border)",
      textDecoration: "none", display: "block",
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>{titulo}</div>
      <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{descripcion}</div>
      {alerta && <div style={{ marginTop: 8, fontSize: 12, color: "#dc2626", fontWeight: 700 }}>⚠ Requiere acción</div>}
    </Link>
  );
}

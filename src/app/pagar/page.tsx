"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import type { Facultad } from "@/lib/data-store";

type Metodo = "tigo_money" | "qr_bancario" | "transferencia";
type TipoPago = "plan" | "cambio_facultad";

function PagarInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") ?? "plan") as TipoPago;
  const plan = (params.get("plan") ?? "pro") as "pro" | "premium";
  const destinoFacultadId = params.get("destino") ?? "";

  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [destinoFac, setDestinoFac] = useState<Facultad | null>(null);
  const [metodo, setMetodo] = useState<Metodo>("tigo_money");
  const [referencia, setReferencia] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monto = tipo === "cambio_facultad" ? 50 : (plan === "premium" ? 100 : 50);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) router.push("/login");
    });
    if (tipo === "cambio_facultad" && destinoFacultadId) {
      fetch("/api/facultades").then((r) => r.json()).then((d) => {
        const list = (d.facultades ?? []) as Facultad[];
        setFacultades(list);
        setDestinoFac(list.find((f) => f.id === destinoFacultadId) ?? null);
      });
    }
  }, [router, tipo, destinoFacultadId]);

  const enviar = async () => {
    setEnviando(true);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        tipo,
        metodo,
        referencia: referencia || `${metodo.toUpperCase()}-${Date.now().toString().slice(-8)}`,
      };
      if (tipo === "plan") body.plan = plan;
      if (tipo === "cambio_facultad") body.destino_facultad = destinoFacultadId;

      const res = await fetch("/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setExito(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setEnviando(false);
    }
  };

  // Validación: si es cambio_facultad pero no llegó destino, error
  if (tipo === "cambio_facultad" && !destinoFacultadId) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <AppHeader />
        <div style={{ maxWidth: 540, margin: "60px auto", padding: 24, textAlign: "center" }}>
          <p style={{ color: "var(--fg-muted)", marginBottom: 12 }}>Falta indicar a qué facultad cambiar.</p>
          <BackLink href="/cambiar-facultad" label="Elegir facultad" />
        </div>
      </div>
    );
  }

  if (exito) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <AppHeader />
        <div style={{ maxWidth: 540, margin: "60px auto", padding: 24, textAlign: "center" }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 18, padding: 40, border: "2px solid #10b981" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>⏳</div>
            <h1 className="font-crimson" style={{ fontSize: 28, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>
              Pago registrado
            </h1>
            <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>
              Tu pago está pendiente de aprobación. El admin revisará tu comprobante en las próximas 24 horas y
              {tipo === "cambio_facultad"
                ? <> moverá tu cuenta a <strong>{destinoFac?.nombre_corto ?? "la nueva facultad"}</strong>.</>
                : <> activará tu plan <strong>{plan}</strong>.</>
              }
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Link href="/cuenta" style={{ padding: "12px 24px", background: "var(--accent)", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>Ver mi cuenta</Link>
              <Link href="/dashboard" style={{ padding: "12px 24px", background: "var(--bg-subtle)", color: "var(--fg-primary)", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>Volver al inicio</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Titular y subtítulo según tipo ───────────────────────────────────────
  const titulo = tipo === "cambio_facultad"
    ? `Cambiar a ${destinoFac?.nombre_corto ?? "nueva facultad"}`
    : `Pagar plan ${plan}`;
  const linkAtras = tipo === "cambio_facultad" ? "/cambiar-facultad" : "/precios";
  const linkAtrasTexto = tipo === "cambio_facultad" ? "Volver a elegir facultad" : "Volver a planes";

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 720, margin: "30px auto", padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <BackLink href={linkAtras} label={linkAtrasTexto} />
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 6 }}>
            {titulo}
          </h1>
          <p style={{ color: "var(--fg-muted)" }}>Total a pagar: <strong style={{ color: "var(--fg-primary)", fontSize: 22 }}>Bs. {monto}</strong></p>
        </div>

        {/* Resumen para cambio de facultad */}
        {tipo === "cambio_facultad" && destinoFac && (
          <div style={{
            padding: 18, marginBottom: 18,
            background: `linear-gradient(135deg, ${destinoFac.color}, ${destinoFac.color_secundario})`,
            color: "white", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 40 }}>{destinoFac.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em" }}>Te cambias a</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{destinoFac.nombre_corto}</div>
              <div style={{ fontSize: 12.5, opacity: 0.9 }}>{destinoFac.descripcion.slice(0, 90)}{destinoFac.descripcion.length > 90 ? "…" : ""}</div>
            </div>
          </div>
        )}

        {/* Seleccionar método */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>1. Elige el método de pago</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { id: "tigo_money", nombre: "Tigo Money", emoji: "📱", desc: "Pago vía celular Tigo · Bolivia" },
              { id: "qr_bancario", nombre: "QR Bancario", emoji: "🔲", desc: "Escanea el QR y paga desde tu app bancaria" },
              { id: "transferencia", nombre: "Transferencia bancaria", emoji: "🏦", desc: "Banco Unión / Mercantil / BNB" },
            ].map((m) => (
              <button key={m.id} onClick={() => setMetodo(m.id as Metodo)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: 14, textAlign: "left", cursor: "pointer",
                border: metodo === m.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: metodo === m.id ? "rgba(99,102,241,0.06)" : "transparent",
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 28 }}>{m.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "var(--fg-primary)", fontSize: 15 }}>{m.nombre}</div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{m.desc}</div>
                </div>
                {metodo === m.id && <div style={{ color: "var(--accent)", fontSize: 20 }}>✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Instrucciones según método */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>2. Realiza el pago</h3>
          {metodo === "tigo_money" && (
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-primary)" }}>
              📲 Envía <strong>Bs. {monto}</strong> al número Tigo Money:<br/>
              <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)", margin: "10px 0" }}>+591 6 7000-0000</div>
              <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>(Número de demostración. Cuando conectemos pagos reales, este número cambiará.)</span>
            </div>
          )}
          {metodo === "qr_bancario" && (
            <div style={{ textAlign: "center", fontSize: 14, color: "var(--fg-primary)" }}>
              <div style={{ display: "inline-block", padding: 20, background: "white", border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ width: 180, height: 180, background: "linear-gradient(45deg, #000 25%, #fff 25%, #fff 50%, #000 50%, #000 75%, #fff 75%)", backgroundSize: "20px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 14, background: "rgba(0,0,0,0.5)", padding: 8, borderRadius: 4 }}>QR DEMO</span>
                </div>
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: "var(--fg-muted)" }}>Escanea con tu app bancaria y paga Bs. {monto}</p>
            </div>
          )}
          {metodo === "transferencia" && (
            <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.8 }}>
              <div><strong>Banco:</strong> Banco Unión S.A.</div>
              <div><strong>Cuenta:</strong> 10000123456789</div>
              <div><strong>Titular:</strong> Axiom SRL</div>
              <div><strong>Monto:</strong> Bs. {monto}</div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 8 }}>(Datos de demostración.)</div>
            </div>
          )}
        </div>

        {/* Confirmar referencia */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>3. Número de comprobante</h3>
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Ej. TM-89472341 (opcional)"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14 }}
          />
          <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 6 }}>
            El admin verificará este código para {tipo === "cambio_facultad" ? "aplicar el cambio de facultad" : "aprobar tu plan"}.
          </p>
        </div>

        {error && (
          <div style={{ padding: 12, background: "rgba(239,68,68,0.1)", borderRadius: 10, color: "#b91c1c", fontSize: 14, marginBottom: 12 }}>⚠️ {error}</div>
        )}

        <button onClick={enviar} disabled={enviando} style={{
          width: "100%", padding: 16, background: "var(--accent)", color: "white",
          border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer",
        }}>
          {enviando ? "Enviando..." : `✓ Ya pagué Bs. ${monto}, registrar mi pago`}
        </button>
      </div>
    </div>
  );
}

export default function PagarPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <PagarInner />
    </Suspense>
  );
}

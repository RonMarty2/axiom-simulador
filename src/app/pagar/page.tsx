"use client";

import { useEffect, useState, Suspense } from "react";
import Icono, { iconoFacultad } from "../components/Icono";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import type { Facultad } from "@/lib/data-store";
import { formatearMonto, montoCambioFacultadEn, montoPlanEn } from "@/lib/precios";
import { METODOS_ACTIVOS, ORDEN_METODOS, metodoDisponible, qrVigente, type MetodoActivo } from "@/lib/pagos-config";

type TipoPago = "plan" | "cambio_facultad";

function PagarInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") ?? "plan") as TipoPago;
  const plan = (params.get("plan") ?? "pro") as "pro" | "premium";
  const destinoFacultadId = params.get("destino") ?? "";

  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [destinoFac, setDestinoFac] = useState<Facultad | null>(null);
  const [metodoElegido, setMetodoElegido] = useState<MetodoActivo | null>(null);
  // "Hoy", fijado al abrir la pantalla: decide si un QR con vencimiento sigue
  // sirviendo. Se lee una sola vez y no en cada render.
  const [hoy] = useState(() => new Date());
  const [referencia, setReferencia] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const [fotoError, setFotoError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se muestra lo mismo que el servidor va a cobrar: ver src/lib/precios.ts.
  // El monto depende del método, porque el QR bancario cobra en Bs. y Binance
  // Pay y RedotPay en USDT.
  const montoEn = (moneda: "BOB" | "USDT") =>
    tipo === "cambio_facultad" ? montoCambioFacultadEn(moneda) : montoPlanEn(plan, moneda);
  // Solo los métodos con los que se puede pagar este monto hoy (un QR con otro
  // monto grabado, o ya vencido, no se ofrece).
  const disponibles = ORDEN_METODOS
    .map((id) => METODOS_ACTIVOS[id])
    .filter((m) => metodoDisponible(m, montoEn(m.moneda), hoy));
  const cfg = disponibles.find((m) => m.id === metodoElegido) ?? disponibles[0];
  const metodo = cfg.id;
  const monto = montoEn(cfg.moneda);
  const textoMonto = formatearMonto(monto, cfg.moneda);

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

  // Reduce la foto en el navegador (el celular manda 4-8 MB): lado mayor 1200 px, JPEG.
  const elegirFoto = async (archivo: File | undefined) => {
    setFotoError(null);
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      setFotoError("Elige una imagen (foto o captura de pantalla).");
      return;
    }
    try {
      const bmp = await createImageBitmap(archivo);
      const escala = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bmp.width * escala);
      canvas.height = Math.round(bmp.height * escala);
      canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      setFoto(canvas.toDataURL("image/jpeg", 0.8));
    } catch {
      setFotoError("No pude leer esa imagen. Prueba con otra.");
    }
  };

  const enviar = async () => {
    setEnviando(true);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        tipo,
        metodo,
        // Si va vacía, el servidor arma una referencia por defecto.
        referencia: referencia.trim(),
      };
      if (foto) body.comprobante = foto;
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
          <div style={{ background: "var(--bg-card)", borderRadius: 18, padding: 40, border: "2px solid var(--green)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "var(--fg-muted)" }}><Icono nombre="reloj" tamano={52} grosor={1.4} /></div>
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
          <p style={{ color: "var(--fg-muted)" }}>Total a pagar: <strong style={{ color: "var(--fg-primary)", fontSize: 22 }}>{textoMonto}</strong></p>
        </div>

        {/* Resumen para cambio de facultad */}
        {tipo === "cambio_facultad" && destinoFac && (
          <div style={{
            padding: 18, marginBottom: 18,
            background: `linear-gradient(135deg, ${destinoFac.color}, ${destinoFac.color_secundario})`,
            color: "white", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ display: "flex" }}><Icono nombre={iconoFacultad(destinoFac.id)} tamano={34} grosor={1.7} /></div>
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
            {disponibles.map((m) => (
              <button key={m.id} onClick={() => setMetodoElegido(m.id)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: 14, textAlign: "left", cursor: "pointer",
                border: metodo === m.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: metodo === m.id ? "var(--accent-soft)" : "transparent",
                borderRadius: 12,
              }}>
                <div style={{ display: "flex", color: "var(--accent)" }}><Icono nombre={m.moneda === "BOB" ? "qr" : "tarjeta"} tamano={26} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "var(--fg-primary)", fontSize: 15 }}>{m.nombre}</div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{m.descripcion}</div>
                </div>
                {metodo === m.id && <div style={{ color: "var(--accent)", fontSize: 20 }}>✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Instrucciones según método */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>2. Realiza el pago</h3>
          <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.7 }}>
            <p>
              Paga exactamente <strong style={{ fontSize: 18 }}>{textoMonto}</strong>
              {cfg.moneda === "USDT" && <> (USDT es un dólar digital)</>}.
            </p>
            {cfg.destinatario && (
              <div style={{ margin: "12px 0", padding: "10px 14px", background: "var(--bg-subtle)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{cfg.destinatario.etiqueta}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.02em", wordBreak: "break-all" }}>{cfg.destinatario.valor}</div>
              </div>
            )}
            {qrVigente(cfg, monto, hoy) && (
              <div style={{ textAlign: "center", margin: "14px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cfg.qr}
                  alt={`Código QR para pagar con ${cfg.nombre}`}
                  style={{ width: "100%", maxWidth: 280, height: "auto", borderRadius: 12, border: "1px solid var(--border)" }}
                />
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <a href={cfg.qr} download style={{ color: "var(--accent)", fontWeight: 700 }}>Descargar la imagen del QR</a>
                </div>
                <p style={{ marginTop: 6, fontSize: 12.5, color: "var(--fg-muted)" }}>
                  Si pagas desde este mismo celular, descarga la imagen y busca en tu app la opción para leer un QR desde la galería.
                </p>
              </div>
            )}
            {cfg.irreversible && (
              <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>
                Un pago en cripto no se puede deshacer. Revisa el destinatario y el monto antes de confirmar. Las comisiones que cobre tu plataforma corren por tu cuenta.
              </p>
            )}
          </div>
        </div>

        {/* Confirmar referencia */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 14 }}>3. {cfg.referencia.etiqueta}</h3>
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder={`${cfg.referencia.ejemplo} (opcional)`}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14 }}
          />
          <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 6 }}>
            El admin verificará este código para {tipo === "cambio_facultad" ? "aplicar el cambio de facultad" : "aprobar tu plan"}.
          </p>
          <label style={{ display: "block", marginTop: 16, fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>
            Foto o captura del comprobante <span style={{ fontWeight: 500, color: "var(--fg-muted)" }}>(recomendado: así te aprobamos más rápido)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => elegirFoto(e.target.files?.[0])}
              style={{ display: "block", marginTop: 8, fontSize: 13 }}
            />
          </label>
          {fotoError && <p style={{ fontSize: 12.5, color: "#b91c1c", marginTop: 6 }}>{fotoError}</p>}
          {foto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={foto} alt="Vista previa del comprobante" style={{ marginTop: 10, maxWidth: "100%", maxHeight: 220, borderRadius: 10, border: "1px solid var(--border)" }} />
          )}
        </div>

        {error && (
          <div style={{ padding: 12, background: "rgba(239,68,68,0.1)", borderRadius: 10, color: "#b91c1c", fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Icono nombre="alerta" tamano={15} /> {error}</div>
        )}

        <button onClick={enviar} disabled={enviando} style={{
          width: "100%", padding: 16, background: "var(--accent)", color: "white",
          border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer",
        }}>
          {enviando ? "Enviando..." : `✓ Ya pagué ${textoMonto}, registrar mi pago`}
        </button>
        <p style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-muted)", textAlign: "center" }}>
          Al registrar tu pago aceptas los <Link href="/terminos" style={{ color: "var(--accent)", fontWeight: 700 }}>Términos y Condiciones</Link>, que incluyen
          cuándo se devuelve el dinero. Tus datos se tratan según la <Link href="/privacidad" style={{ color: "var(--accent)", fontWeight: 700 }}>Política de Privacidad</Link>.
        </p>
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

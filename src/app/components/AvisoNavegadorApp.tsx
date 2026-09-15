"use client";

import { useEffect, useState } from "react";
import Icono from "./Icono";

// Messenger, Instagram, Facebook y TikTok no abren los links en el navegador
// del celular: los abren adentro de la propia app, en un WebView con su barra
// de color arriba. Ahí la PWA no se puede instalar (esos WebView no disparan
// `beforeinstallprompt`) y el alumno no tiene cómo enterarse de que existe una
// app de verdad — solo ve una web con la barra de otra aplicación encima.
//
// Y ese es el camino NORMAL, no el raro: el link de AXIOM se reparte por esas
// apps. Sin este aviso, el alumno promedio nunca sale del WebView.
//
// Nota sobre WhatsApp en Android: usa Chrome Custom Tabs, que comparte el user
// agent de Chrome y no se puede distinguir desde acá. Ese caso no se detecta;
// el menú del propio Custom Tab sí ofrece "Abrir en Chrome".
const WEBVIEWS_IN_APP = /FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|BytedanceWebview|musical_ly|Line\//i;

const CLAVE = "axiom-aviso-navegador-visto";

function nombreDeLaApp(ua: string): string {
  if (/Messenger/i.test(ua)) return "Messenger";
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/BytedanceWebview|musical_ly/i.test(ua)) return "TikTok";
  if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return "Facebook";
  return "otra aplicación";
}

export default function AvisoNavegadorApp() {
  // Arranca oculto y solo se enciende en el efecto: el user agent no existe en
  // el servidor, y renderizarlo distinto en los dos lados rompe la hidratación.
  const [visible, setVisible] = useState(false);
  const [app, setApp] = useState("otra aplicación");

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (!WEBVIEWS_IN_APP.test(ua)) return;
    try {
      if (window.localStorage.getItem(CLAVE) === "1") return;
    } catch {
      // Modo incógnito o storage bloqueado: se muestra igual, es lo preferible.
    }
    setApp(nombreDeLaApp(ua));
    setVisible(true);
  }, []);

  if (!visible) return null;

  const cerrar = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(CLAVE, "1");
    } catch {
      // Si no se puede recordar, vuelve a aparecer. Molesta menos que no avisar.
    }
  };

  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: 11,
        padding: "13px 16px",
        background: "var(--accent-soft)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{ display: "flex", color: "var(--accent)", flexShrink: 0, paddingTop: 1 }}>
        <Icono nombre="celular" tamano={19} />
      </span>
      <div style={{ flex: 1, minWidth: 0, fontSize: 13, lineHeight: 1.45, color: "var(--fg-secondary)" }}>
        Estás viendo AXIOM dentro de {app}, por eso aparece esa barra de arriba.
        Para usarlo en pantalla completa, toca los tres puntos{" "}
        <strong style={{ color: "var(--fg-primary)" }}>⋮</strong> de esa barra y elige{" "}
        <strong style={{ color: "var(--fg-primary)" }}>Abrir en Chrome</strong>. Desde
        ahí puedes instalar AXIOM como app.
      </div>
      <button
        onClick={cerrar}
        aria-label="Entendido, cerrar aviso"
        style={{
          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          width: 26, height: 26, borderRadius: "50%",
          border: "none", background: "transparent", color: "var(--fg-muted)",
          cursor: "pointer", WebkitTapHighlightColor: "transparent",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

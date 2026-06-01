"use client";

import { useEffect } from "react";

// Componente que registra el service worker del PWA al cargar la app.
// No renderiza nada visualmente.

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return; // solo en producción

    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => {
          // Silenciar — si falla el SW, la app sigue funcionando como web normal.
          console.warn("[PWA] Service worker no registrado:", err);
        });
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}

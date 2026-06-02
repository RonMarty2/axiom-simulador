"use client";

import { useEffect } from "react";

// Componente cliente que:
//  1. Registra el service worker (offline + instalable).
//  2. Detecta si la app está corriendo como PWA standalone y aplica
//     una clase al <html> para que el CSS pueda forzar vista app.
//
// El paso 2 es un cinturón de seguridad: aunque el manifest define
// display:standalone, algunos navegadores (Chrome viejo, Android viejo,
// o usuarios con "Solicitar versión escritorio" forzado) pueden
// inyectar comportamiento de vista escritorio. Con la clase axiom-pwa
// el CSS puede forzar lo que necesitamos.

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 0. Ocultar el banner de instalación de la PWA en escritorio.
    //    El banner "Instalar app" lo dispara el propio navegador (Chrome/Edge)
    //    mediante el evento beforeinstallprompt. En PC/Mac lo prevenimos para
    //    que no aparezca; en móvil (Android e iOS) NO hacemos nada, así el
    //    navegador lo muestra igual que antes.
    //    (Nota: iOS Safari no dispara este evento — su "Agregar a inicio" es
    //    manual desde el menú Compartir y no se ve afectado.)
    const onBeforeInstallPrompt = (e: Event) => {
      const ua = window.navigator.userAgent;
      const isMobile = /Mobi|Mobile|Android|iPhone|iPad|iPod/.test(ua);
      if (!isMobile) {
        e.preventDefault(); // No mostrar el banner en PC/Mac
      }
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    // 1. Detectar y marcar modo PWA standalone (no depende del SW)
    const aplicarClase = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: fullscreen)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches ||
        // iOS Safari: usa propiedad propietaria
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      document.documentElement.classList.toggle("axiom-pwa", isStandalone);
    };

    aplicarClase();
    // Si el usuario alterna entre PWA y navegador, mantener clase sincronizada
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener?.("change", aplicarClase);

    // 2. Registrar service worker (solo producción)
    let cleanup: (() => void) | undefined;
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const onLoad = () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("[PWA] Service worker no registrado:", err);
        });
      };
      window.addEventListener("load", onLoad);
      cleanup = () => window.removeEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      mq.removeEventListener?.("change", aplicarClase);
      cleanup?.();
    };
  }, []);

  return null;
}

import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import PWARegister from "./components/PWARegister";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crimson",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "AXIOM - Simulador de examenes UMSS",
  description: "Simulador de examenes universitarios con IA para preparacion academica en Bolivia.",
  applicationName: "AXIOM",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AXIOM",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#4f46e5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body
        className={`${atkinson.variable} ${crimsonPro.variable} min-h-full font-atkinson flex flex-col`}
        suppressHydrationWarning
      >
        <section className="axiom-shell flex-1">{children}</section>
        <PWARegister />
      </body>
    </html>
  );
}

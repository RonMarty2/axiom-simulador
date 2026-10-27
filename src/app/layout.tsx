import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import PWARegister from "./components/PWARegister";
import BottomNav from "./components/BottomNav";
import AvisoNavegadorApp from "./components/AvisoNavegadorApp";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://axiom-simulador.com"),
  title: {
    default: "AXIOM — Simulador UMSS | Exámenes Reales Resueltos Paso a Paso",
    template: "%s | AXIOM — Simulador UMSS",
  },
  description:
    "Plataforma de preparación para el examen de admisión UMSS (Cochabamba). Más de 150 exámenes reales de Medicina, Tecnología, Ciencias Económicas y Derecho resueltos paso a paso.",
  keywords: [
    "examen admision umss 2025",
    "simulador umss cochabamba",
    "examenes pasados umss resueltos",
    "admision medicina umss",
    "facultad de tecnologia umss ingenieria",
    "ciencias economicas umss",
    "banco de preguntas umss",
    "preparacion examen san simon",
  ],
  authors: [{ name: "AXIOM — San Simón Cochabamba" }],
  creator: "AXIOM",
  publisher: "AXIOM",
  applicationName: "AXIOM",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AXIOM",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "/",
    siteName: "AXIOM — Simulador UMSS",
    title: "AXIOM — Simulador UMSS | Exámenes Reales Resueltos Paso a Paso",
    description:
      "Asegura tu ingreso a la UMSS. Practica con los 139 exámenes reales tomados en San Simón con cronómetro, simulador idéntico y explicaciones paso a paso.",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "AXIOM — Exámenes Reales UMSS Resueltos Paso a Paso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXIOM — Simulador UMSS | Exámenes Reales Resueltos",
    description:
      "139 exámenes reales de San Simón resueltos paso a paso. Medicina, Tecnología, Económicas y Derecho.",
    images: ["/images/og-share.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a1f2e" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1f2e" },
  ],
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://axiom-simulador.com/#organization",
      "name": "AXIOM — Simulador UMSS",
      "url": "https://axiom-simulador.com",
      "logo": "https://axiom-simulador.com/images/og-share.jpg",
      "description":
        "Plataforma de preparación para el examen de admisión a la Universidad Mayor de San Simón (UMSS) en Cochabamba, Bolivia.",
    },
    {
      "@type": "EducationalApplication",
      "@id": "https://axiom-simulador.com/#application",
      "name": "AXIOM Simulador UMSS",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "49",
        "priceCurrency": "BOB",
        "availability": "https://schema.org/InStock",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://axiom-simulador.com/#website",
      "url": "https://axiom-simulador.com",
      "name": "AXIOM — Simulador UMSS",
      "publisher": {
        "@id": "https://axiom-simulador.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${atkinson.variable} ${crimsonPro.variable} min-h-full font-atkinson flex flex-col`}
        suppressHydrationWarning
      >
        <AvisoNavegadorApp />
        <section className="axiom-shell flex-1">{children}</section>
        <BottomNav />
        <PWARegister />
      </body>
    </html>
  );
}

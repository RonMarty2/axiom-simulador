"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSectionNew from "./components/HeroSectionNew";
import QuickActionsNew from "./components/QuickActionsNew";
import StatsNew from "./components/StatsNew";
import PricingSectionAxiom from "./components/PricingSectionAxiom";
import CTANew from "./components/CTANew";

interface AuthUser {
  id: string;
  name: string;
  email?: string;
}

export default function AxiomLandingPage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const r = await fetch("/api/auth/me");
        if (r.ok) {
          const data = await r.json();
          setUser(data.user);
        }
      } catch (e) {
        console.error("Error loading user:", e);
      }
    };
    loadUser();
  }, []);

  return (
    <div className="axiom-page relative z-10 min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen w-full max-w-none flex-col items-stretch">
        <Header user={user} />

        <main className="relative mx-auto flex w-full max-w-none flex-col items-stretch">
          {/* Hero Section */}
          <HeroSectionNew />

          {/* Quick Actions - acceso directo a Practicar / Progreso / Examen IA */}
          <QuickActionsNew />

          {/* Stats - números reales del producto */}
          <StatsNew />

          {/* Precios - planes Gratis vs Premium */}
          <PricingSectionAxiom />

          {/* CTA Final */}
          <CTANew />
        </main>
      </div>
    </div>
  );
}

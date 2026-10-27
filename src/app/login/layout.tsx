import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | AXIOM — Simulador UMSS",
  description:
    "Entra a tu cuenta de AXIOM para dar simulacros de examen de admisión de la UMSS, medir tu puntaje y revisar tus solucionarios.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

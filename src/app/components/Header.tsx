"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
  user?: { name: string; id: string } | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/86 shadow-[0_10px_30px_rgba(24,24,70,0.05)] backdrop-blur-xl"
    >
      <div className="axiom-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4">
        <Link href="/" className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-black tracking-tight text-[#171545] sm:text-3xl"
          >
            AXIOM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-0.5 hidden text-xs text-neutral-500 sm:block"
          >
            Prepárate como si ya estuvieras
          </motion.p>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-violet-600 md:flex">
          <Link href="/examenes" className="transition-colors hover:text-[#171545]">
            Exámenes
          </Link>
          <Link href="/simulador" className="transition-colors hover:text-[#171545]">
            Simulador
          </Link>
          <Link href="/progreso" className="transition-colors hover:text-[#171545]">
            Progreso
          </Link>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex min-w-0 items-center justify-end gap-3"
        >
          {user && (
            <span className="hidden max-w-44 truncate text-sm font-medium text-neutral-600 lg:inline">
              {user.name}
            </span>
          )}
          <Link
            href="/login"
            className="hidden rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-sm transition-all hover:bg-neutral-50 sm:inline-flex"
          >
            Acceder
          </Link>
          <Link
            href="/simulador"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-all hover:scale-105 hover:bg-violet-700"
          >
            Empezar
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}

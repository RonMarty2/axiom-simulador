"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTANew() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden py-12 text-center sm:py-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="axiom-hero-center relative z-10 rounded-[2rem] bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-12 text-center shadow-[0_24px_70px_rgba(79,70,229,0.26)] sm:px-10">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-5 text-4xl font-black leading-tight text-white sm:text-5xl"
        >
          ¿Listo para tu examen?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
        >
          Tu siguiente simulador te espera. Practica ahora y obtén feedback instantáneo de IA que te ayudará a mejorar.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/simulador">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="axiom-pill bg-white text-violet-700 shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-all hover:bg-neutral-50"
            >
              Iniciar Simulador
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Secondary text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-white/80"
        >
          O continúa tu progreso anterior. No hay límite de intentos.
        </motion.p>
      </div>
    </motion.section>
  );
}

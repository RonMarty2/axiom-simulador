"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface StatItemProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  unit?: string;
  delay?: number;
}

function StatItem({ icon, label, value, unit, delay = 0 }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView || animated) return;

    let startTime: number;
    let animationFrame: number;
    const numValue = typeof value === "number" ? value : 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 2000, 1);
      setDisplayValue(Math.floor(numValue * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setAnimated(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, animated, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white/82 p-6 text-center shadow-[0_18px_44px_rgba(24,24,70,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
    >
      <motion.div
        className="mb-4 flex items-center justify-center"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      <motion.div
        className="mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: (delay || 0) + 0.2 }}
        viewport={{ once: true }}
      >
        <span className="text-5xl sm:text-6xl font-bold text-violet-600">
          {animated && typeof value === "number" ? displayValue : value}
        </span>
        {unit && <span className="text-2xl text-neutral-600 ml-1">{unit}</span>}
      </motion.div>

      <p className="text-neutral-600 font-medium text-sm">{label}</p>
    </motion.div>
  );
}

interface StatsNewProps {
  stats?: {
    simulaciones?: number;
    promedio?: number;
    tiempoEstudiado?: string;
  };
}

export default function StatsNew({ stats }: StatsNewProps) {
  const data = stats || {
    simulaciones: 14,
    promedio: 9.2,
    tiempoEstudiado: "12h 45m",
  };

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="axiom-section-title mb-10"
      >
        <h2 className="mb-3 text-4xl font-black text-[#171545] sm:text-5xl">
          Tu Progreso en Números
        </h2>
        <p className="text-lg text-neutral-600">
          Visualiza cómo estas avanzando hacia tu meta
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="axiom-container">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <StatItem
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-violet-500">
                <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            }
            label="Simuladores Completados"
            value={data.simulaciones || 0}
            delay={0}
          />
          <StatItem
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-500">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            }
            label="Nota Promedio"
            value={data.promedio || 0}
            unit="/100"
            delay={0.1}
          />
          <StatItem
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-500">
                <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 9v4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.5 2.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M12 2.5V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            }
            label="Tiempo Estudiado"
            value={data.tiempoEstudiado || "0h"}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

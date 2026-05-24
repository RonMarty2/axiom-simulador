"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroSectionNewProps {
  stats?: {
    estudiantes: number;
    promedio: number;
    maximo: number;
    aprobados: number;
  };
}

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number;
  to: number;
  duration?: number;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const current = from + (to - from) * progress;
      setValue(to % 1 === 0 ? Math.floor(current) : parseFloat(current.toFixed(2)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{value}</span>;
}

export default function HeroSectionNew({ stats }: HeroSectionNewProps) {
  const data = stats || {
    estudiantes: 53,
    promedio: 5.81,
    maximo: 14.33,
    aprobados: 20,
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative grid min-h-[720px] w-full place-items-center overflow-hidden py-16 text-center lg:min-h-[760px]"
    >
      <div className="axiom-hero-center relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/82 px-5 py-2 text-sm font-medium text-[#171545] shadow-sm backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Simulador academico con inteligencia artificial
        </div>
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.96] tracking-tight text-[#171545] sm:text-7xl lg:text-8xl">
            Domina tu
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              examen UMSS
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-violet-600 sm:text-xl"
        >
          Practica con simuladores reales, obtén feedback instantáneo de IA y prepárate como nunca antes.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Estudiantes", value: data.estudiantes, icon: "👥" },
            { label: "Promedio", value: data.promedio, icon: "📊" },
            { label: "Máximo", value: data.maximo, icon: "🏆" },
            { label: "Aprobados", value: data.aprobados, icon: "✅" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + idx * 0.1 }}
              className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white/78 p-4 shadow-[0_14px_36px_rgba(24,24,70,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl mb-2">{stat.icon}</span>
              <span className="text-3xl sm:text-4xl font-bold text-violet-600">
                <AnimatedCounter to={stat.value} duration={2} />
              </span>
              <span className="text-xs sm:text-sm text-neutral-600 mt-2 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/simulador">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 50px rgba(139, 92, 246, 0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="axiom-pill bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-all hover:bg-violet-700"
            >
              Comenzar Ahora
              <motion.span
                className="text-xl"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

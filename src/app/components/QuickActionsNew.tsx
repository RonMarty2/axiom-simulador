"use client";

import Link from "next/link";
import Icono from "./Icono";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface ActionProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  borderColor: string;
  delay?: number;
}

function ActionCardNew({
  href,
  icon,
  title,
  description,
  colorClass,
  borderColor,
  delay = 0,
}: ActionProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98 }}
          className={`group relative h-full min-h-56 cursor-pointer overflow-hidden rounded-2xl border ${borderColor} ${colorClass} p-6 shadow-[0_18px_44px_rgba(24,24,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7`}
        >
          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-violet-400"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Icon */}
            <motion.div
              className="mb-6 inline-flex w-fit rounded-xl p-3"
              whileHover={{ scale: 1.2, rotate: 6 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl">{icon}</span>
            </motion.div>

            {/* Title */}
            <h3 className="mb-3 text-2xl font-black text-neutral-900 transition-colors duration-300 group-hover:text-violet-600">
              {title}
            </h3>

            {/* Description */}
            <p className="mb-6 flex-1 text-neutral-600 leading-relaxed text-base">
              {description}
            </p>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 font-semibold text-violet-600"
              whileHover={{ gap: "12px" }}
              transition={{ duration: 0.2 }}
            >
              <span>Explorar</span>
              <motion.span
                className="text-2xl"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

const actions = [
  {
    href: "/examenes",
    icon: <Icono nombre="aprende" tamano={26} />,
    title: "Base de Exámenes",
    description: "Accede a exámenes resueltos de años anteriores y aprende de las mejores estrategias",
    colorClass: "bg-white/82 backdrop-blur-xl",
    borderColor: "border-blue-200/80",
  },
  {
    href: "/practicar",
    icon: <Icono nombre="play" tamano={26} />,
    title: "Practicar ahora",
    description: "Configura un simulacro: examen real, mixto, por tema o predictivo. Cronómetro y nota al final.",
    colorClass: "bg-white/82 backdrop-blur-xl",
    borderColor: "border-violet-200/80",
  },
  {
    href: "/progreso",
    icon: <Icono nombre="grafico" tamano={26} />,
    title: "Mi Progreso",
    description: "Visualiza tu evolución en el tiempo con gráficos y estadísticas detalladas",
    colorClass: "bg-white/82 backdrop-blur-xl",
    borderColor: "border-teal-200/80",
  },
  {
    href: "/progreso#plan",
    icon: <Icono nombre="errores" tamano={26} />,
    title: "Plan Personalizado",
    description: "Descubre tu ruta optimizada de preparación basada en IA y tu desempeño",
    colorClass: "bg-white/82 backdrop-blur-xl",
    borderColor: "border-amber-200/80",
  },
];

export default function QuickActionsNew() {
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
        <h2 className="mb-4 text-4xl font-black text-[#171545] sm:text-5xl">
          ¿Qué quieres hacer hoy?
        </h2>
        <p className="text-lg text-neutral-600">
          Elige tu camino hacia el éxito en el examen UMSS
        </p>
      </motion.div>

      {/* Grid 2x2 */}
      <div className="axiom-container">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {actions.map((action, idx) => (
            <ActionCardNew
              key={action.href}
              {...action}
              delay={0.1 + idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

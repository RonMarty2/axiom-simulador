"use client";

import { motion } from "framer-motion";
import Icono from "./Icono";

interface RankingUser {
  id: string;
  nombre: string;
  nota: number;
  racha?: number;
}

const rankColors = {
  1: {
    bg: "bg-white/82 backdrop-blur-xl",
    border: "border-amber-200/80",
    accent: "text-amber-600",
    badge: "bg-amber-100 text-amber-900",
  },
  2: {
    bg: "bg-white/82 backdrop-blur-xl",
    border: "border-slate-200/80",
    accent: "text-slate-600",
    badge: "bg-slate-100 text-slate-900",
  },
  3: {
    bg: "bg-white/82 backdrop-blur-xl",
    border: "border-orange-200/80",
    accent: "text-orange-600",
    badge: "bg-orange-100 text-orange-900",
  },
};

export default function RankingCardNew({
  user,
  position,
  delay = 0,
}: {
  user: RankingUser;
  position: 1 | 2 | 3;
  delay?: number;
}) {
  const colors = rankColors[position] || rankColors[3];
  // Oro/plata/bronce: en un ranking el color ES el dato, no decoración.
const COLOR_MEDALLA = ["#d99c1a", "#8d8d8d", "#b3702c"];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`group relative flex min-h-64 w-full flex-col overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-6 shadow-[0_18px_44px_rgba(24,24,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default sm:p-7`}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-violet-400"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />

      <div className="mb-6 flex items-start justify-between gap-4">
        {/* Medal + Position */}
        <div className="flex flex-col items-center">
          <span className="mb-2" style={{ color: COLOR_MEDALLA[position - 1] }}>
            <Icono nombre="medalla" tamano={34} grosor={1.7} />
          </span>
          <span className={`text-sm font-bold ${colors.accent}`}>#{position}</span>
        </div>

        {/* User info */}
        <div className="flex-1">
          {/* Avatar + Name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-white">
              {getInitials(user.nombre)}
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-900 text-sm">{user.nombre}</p>
              {user.racha && user.racha > 1 && (
                <p className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--accent)" }}><Icono nombre="racha" tamano={12} /> Racha x{user.racha}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Big score */}
      <div className="mb-4">
        <p className="text-5xl font-black text-violet-600 sm:text-6xl">{user.nota}</p>
        <p className="text-sm text-neutral-600 font-medium">/100</p>
      </div>

      {/* Trend indicator */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: (delay || 0) + 0.2 }}
      >
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
          ↑ En tendencia
        </span>
      </motion.div>
    </motion.div>
  );
}

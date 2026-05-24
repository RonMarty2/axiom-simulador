"use client";

import { motion } from "framer-motion";
import RankingCardNew from "./RankingCardNew";

interface RankingItem {
  id: string;
  nombre: string;
  email: string;
  nota: number;
  racha?: number;
}

interface RankingSectionNewProps {
  ranking: RankingItem[];
  currentUserId?: string;
}

export default function RankingSectionNew({
  ranking,
  currentUserId,
}: RankingSectionNewProps) {
  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3, 10);

  if (ranking.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full overflow-hidden py-12 sm:py-16"
    >
      <div className="axiom-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="axiom-section-title mb-10"
        >
          <div className="mb-4 flex justify-center">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-violet-500">
              <path d="M8 21h8M12 17v4M7 4H4a1 1 0 0 0-1 1v3c0 2.21 1.79 4 4 4h.5M17 4h3a1 1 0 0 1 1 1v3c0 2.21-1.79 4-4 4h-.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 4h10v8a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="mb-3 text-4xl font-black text-[#171545] sm:text-5xl">
            Top Simuladores
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Los mejores estudiantes del mes. ¿Puedes alcanzarlos?
          </p>
        </motion.div>

        {/* Top 3 Grid */}
        <div className="mx-auto mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {top3.map((user, idx) => (
            <RankingCardNew
              key={user.id}
              user={user}
              position={(idx + 1) as 1 | 2 | 3}
              delay={0.1 + idx * 0.1}
            />
          ))}
        </div>

        {/* Rest of participants */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                — Participantes Aprobados —
              </p>
            </div>

            <div className="space-y-3">
              {rest.map((user, idx) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 rounded-2xl border border-neutral-200/80 bg-white/82 p-4 shadow-[0_14px_36px_rgba(24,24,70,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    #{idx + 4}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm">{user.nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-violet-600">{user.nota}</p>
                    <p className="text-xs text-neutral-500">/100</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

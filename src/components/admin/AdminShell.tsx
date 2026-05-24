"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 40, delay = 80) {
  const [displayed, setDisplayed] = useState(text ? "" : "");
  const [done, setDone] = useState(!text);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      setDisplayed("");
      setDone(false);
      const id = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(id);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayed, done };
}

export function useCountUp(target: number, duration = 900, delay = 300) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (target === 0) {
      const id = requestAnimationFrame(() => setValue(0));
      return () => cancelAnimationFrame(id);
    }

    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      if (elapsed < delay) {
        raf.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, delay]);

  return value;
}

export function useStaggerVisible(index: number, baseDelay = 400, step = 80) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), baseDelay + step * index);
    return () => clearTimeout(timer);
  }, [index, baseDelay, step]);

  return visible;
}

export function StaggerRow({
  children,
  index,
  baseDelay = 400,
}: {
  children: React.ReactNode;
  index: number;
  baseDelay?: number;
}) {
  const visible = useStaggerVisible(index, baseDelay);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      {children}
    </div>
  );
}

const ADMIN_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');

  .adm {
    --adm-bg: rgba(7, 10, 15, 0.84);
    --adm-panel: rgba(15, 20, 28, 0.86);
    --adm-panel-strong: rgba(18, 24, 34, 0.96);
    --adm-panel-soft: rgba(24, 32, 44, 0.74);
    --adm-line: rgba(140, 154, 176, 0.16);
    --adm-line-strong: rgba(177, 190, 211, 0.28);
    --adm-text: #edf2fb;
    --adm-soft: #cbd5e1;
    --adm-muted: #8a97aa;
    --adm-dim: #64748b;
    --adm-accent: #d6dee9;
    --adm-accent-2: #93a4bd;
    --adm-danger: #f87171;
    --adm-warn: #fbbf24;
    --adm-ok: #7dd3a7;
    --adm-glow: #00c2ff;
    --adm-glow-rgb: 0, 194, 255;
    font-family: 'IBM Plex Mono', ui-monospace, monospace !important;
    color: var(--adm-text);
  }

  .adm * {
    font-family: inherit;
  }

  .adm-shell {
    position: relative;
  }

  .adm-shell::before {
    content: "";
    position: absolute;
    inset: -24px -24px auto -24px;
    height: 160px;
    background:
      linear-gradient(180deg, rgba(0, 194, 255, 0.06), transparent),
      radial-gradient(circle at 10% 0%, rgba(0, 194, 255, 0.08), transparent 40%);
    pointer-events: none;
  }

  .adm-kpi-num {
    text-shadow:
      0 0 20px rgba(var(--adm-glow-rgb), 0.45),
      0 0 50px rgba(var(--adm-glow-rgb), 0.18);
    color: #ffffff !important;
  }

  @keyframes adm-live-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(125, 211, 167, 0.5); }
    50%       { box-shadow: 0 0 0 5px rgba(125, 211, 167, 0); }
  }

  .adm-live-dot {
    animation: adm-live-pulse 2.2s ease-in-out infinite;
  }

  @keyframes adm-glow-flicker {
    0%, 100% { opacity: 0.85; }
    45%      { opacity: 1; }
    55%      { opacity: 0.9; }
  }

  .adm-glow-text {
    color: var(--adm-glow);
    text-shadow: 0 0 12px rgba(var(--adm-glow-rgb), 0.6);
    animation: adm-glow-flicker 4s ease-in-out infinite;
  }

  .adm-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--adm-accent-2);
  }

  .adm-muted {
    font-size: 10px;
    color: var(--adm-muted);
  }

  .adm-caption {
    font-size: 11px;
    color: var(--adm-soft);
    line-height: 1.55;
  }

  .adm-card,
  .adm-surface {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0)),
      var(--adm-panel);
    border: 1px solid var(--adm-line);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 8px 24px rgba(0, 0, 0, 0.32);
  }

  .adm-card-strong {
    background: var(--adm-panel-strong);
    border: 1px solid var(--adm-line-strong);
  }

  .adm-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--adm-line);
  }

  .adm-row:last-child {
    border-bottom: none;
  }

  .adm-btn {
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid var(--adm-line);
    background: rgba(255, 255, 255, 0.02);
    color: var(--adm-soft);
    cursor: pointer;
    padding: 8px 14px;
    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  }

  .adm-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--adm-line-strong);
    color: var(--adm-text);
    transform: translateY(-1px);
  }

  .adm-btn-active,
  .adm-btn-primary {
    background: linear-gradient(180deg, rgba(0, 194, 255, 0.14), rgba(0, 194, 255, 0.06));
    border-color: rgba(0, 194, 255, 0.38);
    color: var(--adm-glow);
    box-shadow: 0 0 14px rgba(var(--adm-glow-rgb), 0.12), inset 0 1px 0 rgba(var(--adm-glow-rgb), 0.12);
  }

  .adm-btn-primary:hover:not(:disabled) {
    background: linear-gradient(180deg, rgba(0, 194, 255, 0.2), rgba(0, 194, 255, 0.1));
    border-color: rgba(0, 194, 255, 0.55);
    box-shadow: 0 0 20px rgba(var(--adm-glow-rgb), 0.22);
  }

  .adm-btn-primary:disabled {
    opacity: 0.42;
    cursor: not-allowed;
    transform: none;
  }

  .adm-btn-danger {
    color: #fecaca;
    border-color: rgba(248, 113, 113, 0.26);
    background: rgba(127, 29, 29, 0.14);
  }

  .adm-btn-danger:hover {
    border-color: rgba(248, 113, 113, 0.42);
    background: rgba(127, 29, 29, 0.22);
    color: #ffe1e1;
  }

  .adm-input,
  .adm-select,
  .adm-textarea {
    font-family: inherit;
    font-size: 12px;
    border: 1px solid var(--adm-line);
    background: rgba(8, 12, 18, 0.65);
    color: var(--adm-text);
    outline: none;
    transition: border-color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
  }

  .adm-input::placeholder,
  .adm-textarea::placeholder {
    color: var(--adm-dim);
  }

  .adm-input:focus,
  .adm-select:focus,
  .adm-textarea:focus {
    border-color: rgba(214, 222, 233, 0.34);
    background: rgba(10, 15, 22, 0.92);
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.08);
  }

  .adm-input {
    padding: 10px 12px;
    width: 100%;
  }

  .adm-select {
    padding: 9px 10px;
    cursor: pointer;
    width: 100%;
  }

  .adm-select option {
    background: #0b1018;
    color: #edf2fb;
  }

  .adm-textarea {
    padding: 10px 12px;
    width: 100%;
    resize: vertical;
    line-height: 1.7;
  }

  .adm-badge-ok,
  .adm-badge-warn,
  .adm-badge-err {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border: 1px solid;
  }

  .adm-badge-ok {
    color: var(--adm-ok);
    background: rgba(20, 83, 45, 0.22);
    border-color: rgba(125, 211, 167, 0.24);
  }

  .adm-badge-warn {
    color: #fde68a;
    background: rgba(113, 63, 18, 0.24);
    border-color: rgba(251, 191, 36, 0.24);
  }

  .adm-badge-err {
    color: #fecaca;
    background: rgba(127, 29, 29, 0.22);
    border-color: rgba(248, 113, 113, 0.24);
  }

  .adm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .adm-table th {
    text-align: left;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--adm-muted);
    padding: 10px 12px;
    border-bottom: 1px solid var(--adm-line);
  }

  .adm-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(140, 154, 176, 0.1);
    color: var(--adm-soft);
    vertical-align: middle;
  }

  .adm-table tr:last-child td {
    border-bottom: none;
  }

  .adm-table tr:hover td {
    background: rgba(255, 255, 255, 0.025);
  }

  @keyframes adm-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .adm-cursor {
    display: inline-block;
    animation: adm-blink 1s step-end infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .adm-cursor {
      animation: none;
    }
  }
`;

function AdminHeader({
  title,
  code,
  subtitle,
}: {
  title: string;
  code: string;
  subtitle?: string;
}) {
  const { displayed, done } = useTypewriter(title, 48, 100);

  return (
    <div
      className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8 pb-5"
      style={{ borderBottom: "1px solid rgba(140, 154, 176, 0.16)" }}
    >
      <div className="max-w-3xl">
        <div className="adm-label mb-2">[{code}]</div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: "#edf2fb", lineHeight: 1, margin: 0 }}>
          {displayed}
          {!done && <span className="adm-cursor">_</span>}
        </h1>
        {subtitle ? <p className="adm-caption mt-3">{subtitle}</p> : null}
      </div>
      <div className="adm-card adm-card-strong px-4 py-3 min-w-[220px]">
        <div className="adm-label mb-2">estado de mando</div>
        <div className="flex items-center gap-2 text-[12px]" style={{ color: "#edf2fb" }}>
          <span className="adm-live-dot inline-block h-2 w-2 rounded-full" style={{ background: "#7dd3a7" }} />
          Control operativo en linea
        </div>
      </div>
    </div>
  );
}

interface AdminShellProps {
  title: string;
  code: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AdminShell({ title, code, subtitle, children }: AdminShellProps) {
  return (
    <div className="adm adm-shell">
      <style>{ADMIN_CSS}</style>
      <AdminHeader title={title} code={code} subtitle={subtitle} />
      {children}
    </div>
  );
}

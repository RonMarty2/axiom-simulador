"""Reemplaza hex escritos a mano por var(--...) en .tsx. Uso: tokenizar_colores.py <raiz> [--aplicar] [--tokens salida.css]
Sin --aplicar solo informa (ensayo). Conserva el mismo valor: la paleta nueva vale lo mismo que el hex que reemplaza."""
import re, sys, pathlib, collections

APP = {  # colores de la app -> token que ya existe
    "faf7f0": "--bg-base", "f2ece0": "--bg-subtle", "c9bda3": "--border-hover", "9c3d1c": "--accent",
    "5a6072": "--fg-muted", "1e5f4f": "--green", "1a1f2e": "--fg-primary", "ffffff": "--bg-card",
}
TW = {  # paleta de dibujos (nombre Tailwind) -> hex actual
    "emerald-50": "ecfdf5", "emerald-100": "d1fae5", "emerald-200": "a7f3d0", "emerald-300": "6ee7b7",
    "emerald-500": "10b981", "emerald-600": "059669", "emerald-700": "047857", "emerald-800": "065f46",
    "red-50": "fef2f2", "red-100": "fee2e2", "red-200": "fecaca", "red-300": "fca5a5", "red-400": "f87171",
    "red-500": "ef4444", "red-600": "dc2626", "red-900": "7f1d1d",
    "amber-50": "fffbeb", "amber-100": "fef3c7", "amber-200": "fde68a", "amber-300": "fcd34d", "amber-400": "fbbf24",
    "amber-500": "f59e0b", "amber-600": "d97706", "amber-700": "b45309", "amber-800": "92400e", "amber-900": "78350f",
    "blue-400": "60a5fa", "blue-500": "3b82f6", "blue-800": "1e40af", "cyan-500": "06b6d4", "sky-500": "0ea5e9",
    "violet-400": "a78bfa", "violet-500": "8b5cf6", "violet-600": "7c3aed", "violet-700": "6d28d9",
    "purple-500": "a855f7", "pink-500": "ec4899", "rose-600": "e11d48",
    "slate-200": "e2e8f0", "slate-300": "cbd5e1", "slate-400": "94a3b8", "slate-600": "475569",
    "slate-800": "1e293b", "slate-900": "0f172a", "gray-200": "e5e7eb", "gray-400": "9ca3af", "gray-700": "374151",
    "neutral-100": "f5f5f5", "green-500": "22c55e", "green-600": "16a34a", "green-700": "15803d",
    "lime-500": "84cc16", "yellow-500": "eab308", "yellow-600": "ca8a04", "yellow-700": "a16207",
    "orange-400": "fb923c", "orange-500": "f97316", "orange-600": "ea580c",
}
MAPA = {h: f"var({t})" for h, t in APP.items()}
MAPA.update({h: f"var(--dib-{n})" for n, h in TW.items()})

HEX = re.compile(r"#([0-9a-fA-F]{6})\b")
ARB = re.compile(r"\b(text|bg|border|fill|stroke|from|to|via|ring|shadow|outline|divide|decoration|accent|caret)-\[var\((--[a-z0-9-]+)\)\]")

def main():
    raiz = pathlib.Path(sys.argv[1]); aplicar = "--aplicar" in sys.argv
    tokens_out = sys.argv[sys.argv.index("--tokens") + 1] if "--tokens" in sys.argv else None
    sin_mapa = collections.Counter(); usados = collections.Counter(); archivos = 0; especiales = []
    for f in sorted(raiz.rglob("*.tsx")):
        if "Conflict" in f.name: continue
        s = f.read_text(encoding="utf-8"); orig = s
        def rep(m):
            h = m.group(1).lower()
            if h not in MAPA:
                sin_mapa[h] += 1; return m.group(0)
            usados[h] += 1; return MAPA[h]
        s = HEX.sub(rep, s)
        # clases arbitrarias de Tailwind: text-[var(--x)] es ambiguo -> text-[color:var(--x)]
        def arb(m):
            if m.group(1) in ("shadow",): return m.group(0)
            return f"{m.group(1)}-[color:var({m.group(2)})]"
        s2 = ARB.sub(arb, s)
        if s2 != s:
            especiales.append(str(f)); s = s2
        if s != orig:
            archivos += 1
            if aplicar: f.write_text(s, encoding="utf-8", newline="")
    print(f"archivos con cambios: {archivos} | reemplazos: {sum(usados.values())} | colores sin mapa: {dict(sin_mapa)}")
    print(f"archivos con clase arbitraria Tailwind a revisar: {len(especiales)}", *especiales[:10], sep="\n  ")
    if tokens_out:
        usadosTW = sorted({h for h in usados if h not in APP})
        inv = {h: n for n, h in TW.items()}
        lineas = ["  /* Paleta de dibujos de láminas y lecciones (06-11). Un solo lugar: cambiar un valor cambia todos los dibujos. */"]
        lineas += [f"  --dib-{inv[h]}: #{h};" for h in sorted(usadosTW, key=lambda x: inv[x])]
        pathlib.Path(tokens_out).write_text("\n".join(lineas) + "\n", encoding="utf-8")
        print("tokens escritos en", tokens_out, f"({len(usadosTW)})")

main()

// Detector reutilizable: desborde de pagina + elementos que se salen del viewport + texto recortado (scrollWidth > clientWidth con overflow hidden/ellipsis).
export async function medirDesbordes(page) {
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const pagina = document.documentElement.scrollWidth - vw;
    const fuera = [], cortados = [];
    const nombre = (e) => e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/).slice(0, 2).join(".") : "");
    for (const e of document.querySelectorAll("body *")) {
      if (e instanceof SVGElement && e.tagName.toLowerCase() !== "svg") continue; // trazos de KaTeX (leccion 08-oct)
      const r = e.getBoundingClientRect();
      if (!r.width) continue;
      const cs = getComputedStyle(e);
      if (cs.position === "fixed" && r.right <= vw + 1) continue;
      const derecha = cs.overflowX === "visible" ? Math.max(r.right, r.left + e.scrollWidth) : r.right;
      if (derecha > vw + 1 || r.left < -1) {
        // solo el mas externo: si el padre ya se sale, no repetir
        const p = e.parentElement?.getBoundingClientRect();
        if (!p || (p.right <= vw + 1 && p.left >= -1) || e.parentElement.scrollWidth <= e.parentElement.clientWidth + 1) fuera.push(`${nombre(e)} sale ${Math.round(Math.max(derecha - vw, -r.left))}px «${(e.textContent || "").trim().slice(0, 40)}»`);
      }
      if (e.scrollWidth > e.clientWidth + 1 && e.clientWidth > 0 && /hidden|clip/.test(cs.overflowX) && (e.textContent || "").trim())
        cortados.push(`${nombre(e)} recorta ${e.scrollWidth - e.clientWidth}px «${(e.textContent || "").trim().slice(0, 40)}»`);
    }
    return { vw, pagina, fuera, cortados };
  });
}

import os
import base64

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPTS_DIR)
UGC_DIR = os.path.join(BASE_DIR, "PUBLICIDAD", "motion", "ugc-medicina")

def to_b64(path):
    with open(path, "rb") as f:
        return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")

b64_1 = to_b64(os.path.join(UGC_DIR, "shot1.jpg"))
b64_2 = to_b64(os.path.join(UGC_DIR, "shot2.jpg"))
b64_3 = to_b64(os.path.join(UGC_DIR, "shot3.jpg"))

html_content = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>UGC Medicina UMSS - Google Neural</title>
<meta name="viewport" content="width=1080">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,700;0,800;1,700;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {{
  --bg: #090c12;
  --accent: #881337;
  --accent-light: #fda4af;
  --paper: #faf7f0;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ width: 1080px; height: 1920px; overflow: hidden; background: var(--bg); }}
body {{ font-family: "Atkinson Hyperlegible", sans-serif; color: #ffffff; }}

#stage {{
  position: relative; width: 1080px; height: 1920px; overflow: hidden;
}}

/* Capas de fotos */
.shot-layer {{
  position: absolute; left: 0; top: 0; width: 1080px; height: 1920px;
  background-size: cover; background-position: center; will-change: transform, opacity;
}}
.vignette {{
  position: absolute; left: 0; top: 0; width: 1080px; height: 1920px;
  background: linear-gradient(180deg, rgba(9,12,18,0.7) 0%, rgba(9,12,18,0.1) 35%, rgba(9,12,18,0.2) 60%, rgba(9,12,18,0.85) 100%);
  pointer-events: none; z-index: 10;
}}

/* Header superior */
.header-tag {{
  position: absolute; left: 60px; top: 120px; z-index: 20;
  display: inline-flex; align-items: center; gap: 12px;
  background: rgba(9,12,18,0.75); backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.2); border-radius: 999px;
  padding: 12px 28px; font-size: 22px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: #e2e8f0;
}}
.dot {{ width: 12px; height: 12px; border-radius: 50%; background: var(--accent); }}

/* Caja de subtítulo cinemático */
.caption-box {{
  position: absolute; left: 60px; bottom: 220px; width: 960px; z-index: 20;
  text-align: center;
}}
.sub-card {{
  display: inline-block; background: rgba(9,12,18,0.82); backdrop-filter: blur(16px);
  border: 2px solid rgba(255,255,255,0.18); border-radius: 28px;
  padding: 32px 44px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  max-width: 940px;
}}
.sub-text {{
  font-family: "Crimson Pro", Georgia, serif; font-size: 48px; line-height: 1.18;
  font-weight: 800; color: #ffffff;
}}
.sub-text em {{
  color: var(--accent-light); font-style: italic; text-decoration: underline;
  text-decoration-color: var(--accent); text-underline-offset: 6px;
}}

/* Tarjeta final CTA */
.final-cta {{
  position: absolute; left: 60px; top: 720px; width: 960px; z-index: 30;
  background: var(--paper); color: #1a1f2e; border-radius: 36px;
  padding: 56px 48px; text-align: center; box-shadow: 0 30px 90px rgba(0,0,0,0.8);
  border: 3px solid var(--accent);
}}
.final-title {{
  font-family: "Crimson Pro", Georgia, serif; font-size: 58px; font-weight: 800;
  line-height: 1.08; color: #1a1f2e; margin-bottom: 16px;
}}
.final-sub {{
  font-size: 26px; color: #64748b; margin-bottom: 32px;
}}
.final-btn {{
  background: var(--accent); color: #ffffff; font-size: 30px; font-weight: 800;
  padding: 22px 52px; border-radius: 18px; display: inline-block;
  box-shadow: 0 12px 36px rgba(136,19,55,0.5);
}}
</style>
</head>
<body>
<div id="stage">
  <div class="shot-layer" id="s1" style="background-image: url('{b64_1}');"></div>
  <div class="shot-layer" id="s2" style="background-image: url('{b64_2}');"></div>
  <div class="shot-layer" id="s3" style="background-image: url('{b64_3}');"></div>
  <div class="vignette"></div>

  <div class="header-tag" id="htag">
    <span class="dot"></span> Curso Básico Medicina · San Simón
  </div>

  <div class="caption-box" id="captions">
    <div class="sub-card">
      <div class="sub-text" id="sub_content">...</div>
    </div>
  </div>

  <div class="final-cta" id="cta_box" style="opacity: 0; pointer-events: none;">
    <div class="final-title">Entrena con exámenes reales de Medicina UMSS</div>
    <div class="final-sub">Cronómetro oficial de 90 minutos y soluciones paso a paso</div>
    <div class="final-btn">Prueba gratis en axiom-simulador.com 👉</div>
  </div>
</div>

<script>
window.renderReady = true;

const $ = id => document.getElementById(id);
function clamp(v, min=0, max=1) {{ return Math.min(Math.max(v, min), max); }}
function prog(t, s, d) {{ return clamp((t - s) / d); }}
function eo(p) {{ return 1 - Math.pow(1 - p, 3); }}

function render(t) {{
  const s1 = $('s1');
  const s2 = $('s2');
  const s3 = $('s3');

  // Shot 1: 0 a 10s (La frustración)
  const p1 = clamp(t / 10.0);
  s1.style.transform = `scale(${{1.0 + 0.08 * p1}})`;
  if (t < 9.5) {{
    s1.style.opacity = 1;
  }} else if (t < 10.5) {{
    const fade = prog(t, 9.5, 1.0);
    s1.style.opacity = 1 - fade;
  }} else {{
    s1.style.opacity = 0;
  }}

  // Shot 2: 10 a 19s (Descubriendo AXIOM de perfil)
  const p2 = clamp((t - 10.0) / 9.0);
  s2.style.transform = `scale(${{1.08 - 0.07 * p2}})`;
  if (t >= 9.5 && t < 18.5) {{
    const fadeIn = prog(t, 9.5, 1.0);
    s2.style.opacity = fadeIn;
  }} else if (t >= 18.5 && t < 19.5) {{
    const fadeOut = prog(t, 18.5, 1.0);
    s2.style.opacity = 1 - fadeOut;
  }} else {{
    s2.style.opacity = 0;
  }}

  // Shot 3: 19s en adelante (Alivio y éxito)
  const p3 = clamp((t - 19.0) / 9.0);
  s3.style.transform = `scale(${{1.0 + 0.06 * p3}})`;
  if (t >= 18.5) {{
    const fadeIn = prog(t, 18.5, 1.0);
    s3.style.opacity = fadeIn;
  }} else {{
    s3.style.opacity = 0;
  }}

  // Subtítulos sincronizados palabra por palabra con voz Aoede
  const sub = $('sub_content');
  if (t < 4.2) {{
    sub.innerHTML = "Son las <em>11 de la noche</em> repasando Morfofunción...";
  }} else if (t < 8.6) {{
    sub.innerHTML = "Y tus fotocopias <em>ni siquiera explican</em> por qué esa es la respuesta.";
  }} else if (t < 13.8) {{
    sub.innerHTML = "El <strong>80% reprueba</strong> por estudiar de memoria sin entender las trampas.";
  }} else if (t < 19.0) {{
    sub.innerHTML = "Deja las copias borrosas y entrena con <em>exámenes oficiales</em> resueltos paso a paso.";
  }} else if (t < 23.5) {{
    sub.innerHTML = "Simulador con el <em>cronómetro real</em> de San Simón.";
  }} else {{
    sub.innerHTML = "Prueba gratis hoy en <strong>axiom-simulador.com</strong>";
  }}

  // Tarjeta de cierre CTA a los 23s
  const cta = $('cta_box');
  if (t >= 23.0) {{
    const pCta = eo(prog(t, 23.0, 0.8));
    cta.style.opacity = pCta;
    cta.style.transform = `translateY(${{(1 - pCta) * 40}}px) scale(${{0.95 + 0.05 * pCta}})`;
  }} else {{
    cta.style.opacity = 0;
  }}
}}
</script>
</body>
</html>
"""

with open(os.path.join(UGC_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(html_content)

print("[OK] index.html generado en:", os.path.join(UGC_DIR, "index.html"))

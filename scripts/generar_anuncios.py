"""
MOTOR MODULAR DE PUBLICIDAD AXIOM
Lee `PUBLICIDAD/config_anuncios.json` y compila afiches y piezas verticales
en calidad 2x Retina para feed (4:5) y stories/WhatsApp (9:16).
"""
import asyncio
import base64
import json
import os
from playwright.async_api import async_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(BASE_DIR, "PUBLICIDAD", "config_anuncios.json")
BRAIN_DIR = r"C:\Users\lmigu\.gemini\antigravity\brain\ab22cc8d-1b02-4c44-96b6-e6606c26f079"
OUTPUT_DIR = os.path.join(BASE_DIR, "PUBLICIDAD", "piezas")

KATEX_SCRIPTS = """
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
<script>
  window.onload = function() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ]
      });
    }
  };
</script>
"""

def to_base64(filename):
    for candidate in [
        os.path.join(BRAIN_DIR, filename),
        os.path.join(BASE_DIR, "public", "images", "facultades", filename),
        filename
    ]:
        if os.path.exists(candidate):
            with open(candidate, "rb") as f:
                data = f.read()
            ext = os.path.splitext(candidate)[1].lower()
            mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png"
            return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"
    return ""

def render_html(item, format_type="feed"):
    b64 = to_base64(item["foto_fondo"])
    tag_anio = f"Admisión San Simón {item['anio']}" if item.get("anio") else "Admisión San Simón · Exámenes Reales"
    
    height = 1350 if format_type == "feed" else 1920
    bg_height = 800 if format_type == "feed" else 1050
    margin_top_hero = "130px" if format_type == "feed" else "180px"
    
    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,700;0,800;1,700;1,800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
{KATEX_SCRIPTS}
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  width: 1080px;
  height: {height}px;
  background: #0d1017;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}
.bg-layer {{
  position: absolute;
  top: 0; left: 0; width: 1080px; height: {bg_height}px;
  z-index: 1; overflow: hidden;
}}
.bg-img {{
  width: 100%; height: 100%; object-fit: cover; object-position: center 25%;
  filter: contrast(1.08) brightness(0.82) saturate(1.05);
}}
.bg-gradient {{
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, 
    rgba(13, 16, 23, 0.45) 0%, 
    rgba(13, 16, 23, 0.25) 30%, 
    rgba(13, 16, 23, 0.75) 65%, 
    #0d1017 100%
  );
}}
.content {{
  position: relative; z-index: 2; padding: 56px 64px 60px;
  height: 100%; display: flex; flex-direction: column; justify-content: space-between;
}}
.top-bar {{ display: flex; justify-content: space-between; align-items: center; }}
.brand {{
  font-family: 'Crimson Pro', Georgia, serif; font-size: 34px; font-weight: 800;
  letter-spacing: 0.08em; color: #ffffff; display: flex; align-items: center; gap: 12px;
}}
.brand-dot {{
  width: 10px; height: 10px; background: {item['accent_color']};
  border-radius: 50%; box-shadow: 0 0 14px {item['accent_glow']};
}}
.umss-tag {{
  background: rgba(13, 16, 23, 0.65); backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.16); color: #f1f5f9; font-size: 14px;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;
  padding: 8px 20px; border-radius: 8px;
}}
.headline-section {{ margin-top: {margin_top_hero}; max-width: 950px; }}
.headline {{
  font-family: 'Crimson Pro', Georgia, serif; font-size: 68px; line-height: 1.05;
  font-weight: 800; letter-spacing: -0.025em; color: #ffffff;
  text-shadow: 0 4px 28px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6);
}}
.headline em {{
  font-style: italic; color: {item['accent_subtle']}; text-decoration: underline;
  text-decoration-color: {item['accent_color']}; text-underline-offset: 8px;
}}
.subheadline {{
  font-size: 22px; line-height: 1.45; color: #e2e8f0; margin-top: 16px;
  max-width: 900px; text-shadow: 0 2px 12px rgba(0,0,0,0.7);
}}
.exam-card {{
  background: #faf7f0; border-radius: 20px; padding: 34px 40px; color: #1a1f2e;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3);
  margin-top: 24px; position: relative;
}}
.exam-header {{
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1.5px solid #e3dac8; padding-bottom: 14px; margin-bottom: 18px;
}}
.exam-meta {{ font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: {item['accent_color']}; }}
.exam-chrono {{ font-size: 14px; font-weight: 700; color: #64748b; }}
.question-body {{ font-size: 23px; line-height: 1.4; color: #1e293b; margin-bottom: 20px; }}
.trap-reveal {{
  background: #fff5f5; border: 1.5px solid #fed7d7; border-radius: 14px;
  padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
}}
.stamp {{
  background: {item['sello_bg']}; color: {item['sello_color']}; font-family: 'Crimson Pro', Georgia, serif;
  font-size: 20px; font-weight: 800; letter-spacing: 0.08em; padding: 8px 18px;
  border-radius: 6px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}}
.trap-explanation {{ font-size: 18px; color: #2d3748; line-height: 1.35; }}
.trap-explanation strong {{ color: {item['accent_color']}; font-weight: 700; }}
.footer-bar {{
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 28px; padding-top: 16px;
}}
.proof-title {{ font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em; }}
.proof-sub {{ font-size: 16px; color: #94a3b8; margin-top: 3px; }}
.cta-pill {{
  background: {item['accent_color']}; color: #ffffff; font-size: 20px; font-weight: 700;
  padding: 18px 36px; border-radius: 12px; display: inline-flex; align-items: center;
  gap: 10px; box-shadow: 0 10px 28px {item['accent_glow']};
}}
</style>
</head>
<body>
  <div class="bg-layer">
    <img class="bg-img" src="{b64}">
    <div class="bg-gradient"></div>
  </div>
  <div class="content">
    <div class="top-bar">
      <div class="brand">AXIOM <span class="brand-dot"></span> <span style="font-size: 20px; font-weight: 400; color: #cbd5e1; margin-left: 4px;">{item['facultad_label']}</span></div>
      <div class="umss-tag">{tag_anio}</div>
    </div>
    <div class="headline-section">
      <h1 class="headline">{item['titular']}</h1>
      <p class="subheadline">{item['subtitular']}</p>
    </div>
    <div class="exam-card">
      <div class="exam-header">
        <span class="exam-meta">{item['examen_meta']}</span>
        <span class="exam-chrono">{item['examen_tiempo']}</span>
      </div>
      <div class="question-body">{item['pregunta_html']}</div>
      <div class="trap-reveal">
        <div class="stamp">{item['sello_texto']}</div>
        <div class="trap-explanation">{item['explicacion_html']}</div>
      </div>
    </div>
    <div class="footer-bar">
      <div class="proof-text">
        <div class="proof-title">{item['prueba_titulo']}</div>
        <div class="proof-sub">{item['prueba_sub']}</div>
      </div>
      <div class="cta-pill">{item['cta_texto']}</div>
    </div>
  </div>
</body>
</html>"""

async def generar():
    if not os.path.exists(CONFIG_PATH):
        print("No se encontró", CONFIG_PATH)
        return
        
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)
        
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for item in cfg.get("anuncios", []):
            fac = item["facultad_id"]
            
            # 1. Feed 4:5 (1080 x 1350)
            page_feed = await browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
            await page_feed.set_content(render_html(item, "feed"))
            await page_feed.wait_for_timeout(800)
            
            path_feed = os.path.join(OUTPUT_DIR, fac, f"ANUNCIO_FEED_{fac.upper()}.png")
            os.makedirs(os.path.dirname(path_feed), exist_ok=True)
            await page_feed.screenshot(path=path_feed)
            print(f"[FEED 4:5 OK] -> {path_feed}")
            await page_feed.close()
            
            # 2. Historia / Story 9:16 (1080 x 1920)
            page_story = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
            await page_story.set_content(render_html(item, "story"))
            await page_story.wait_for_timeout(800)
            
            path_story = os.path.join(OUTPUT_DIR, fac, f"HISTORIA_STORY_{fac.upper()}.png")
            await page_story.screenshot(path=path_story)
            print(f"[STORY 9:16 OK] -> {path_story}")
            await page_story.close()
            
        await browser.close()
        print("\nTodos los afiches modulares han sido generados exitosamente.")

if __name__ == "__main__":
    asyncio.run(generar())

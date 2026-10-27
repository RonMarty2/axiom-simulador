"""
GENERADOR DE HISTORIAS INTERACTIVAS / ESTADOS DE WHATSAPP (9:16 - 1080x1920)
Diseñado con 'creador-historias' y 'director-arte-coherencia':
- Respeta zonas seguras (Top 220px libre de avatares, Bottom 260px libre de barra de chat).
- Simula tarjetas de sticker de votación interactiva para estados de WhatsApp y Stories de IG/FB.
- 2 historias por facultad: Lámina 1 = Pregunta/Quiz, Lámina 2 = Solución/CTA.
"""
import asyncio
import os
import base64
from playwright.async_api import async_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAIN_DIR = r"C:\Users\lmigu\.gemini\antigravity\brain\ab22cc8d-1b02-4c44-96b6-e6606c26f079"
OUT_DIR = os.path.join(BASE_DIR, "PUBLICIDAD", "piezas")

def to_base64(filename):
    for c in [os.path.join(BRAIN_DIR, filename), os.path.join(BASE_DIR, "public", "images", "facultades", filename)]:
        if os.path.exists(c):
            with open(c, "rb") as f:
                data = f.read()
            ext = os.path.splitext(c)[1].lower()
            mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png"
            return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"
    return ""

def base_story_css(accent_color, light_tint):
    return f"""
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1080px; height: 1920px; background: #0c0f17;
      font-family: 'Atkinson Hyperlegible', sans-serif; color: #ffffff;
      position: relative; overflow: hidden; display: flex; flex-direction: column;
      padding: 240px 64px 280px 64px; justify-content: space-between;
    }}
    .bg-glow {{
      position: absolute; width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, {accent_color} 0%, rgba(0,0,0,0) 70%);
      opacity: 0.25; top: 15%; right: -100px; z-index: 1; pointer-events: none;
    }}
    .header-badge {{
      display: inline-flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
      padding: 10px 22px; border-radius: 999px; font-size: 18px; font-weight: 700;
      color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.1em;
      align-self: flex-start; z-index: 10;
    }}
    .dot {{ width: 10px; height: 10px; border-radius: 50%; background: {accent_color}; }}
    .content-area {{ z-index: 10; margin-top: 30px; }}
    .story-h1 {{
      font-family: 'Crimson Pro', serif; font-size: 64px; line-height: 1.12;
      font-weight: 800; color: #ffffff; margin-bottom: 24px;
    }}
    .story-h1 em {{ color: {light_tint}; font-style: italic; }}
    .quiz-card {{
      background: #faf7f0; color: #1a1f2e; border-radius: 24px; padding: 40px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.6); margin-top: 24px;
    }}
    .quiz-q {{
      font-size: 26px; font-weight: 700; line-height: 1.4; color: #1e293b; margin-bottom: 28px;
    }}
    .quiz-option {{
      background: #ffffff; border: 2px solid #e2e8f0; border-radius: 14px;
      padding: 18px 24px; font-size: 22px; font-weight: 700; color: #334155;
      margin-bottom: 14px; display: flex; align-items: center; gap: 16px;
    }}
    .quiz-letter {{
      width: 38px; height: 38px; border-radius: 50%; background: #f1f5f9;
      display: flex; align-items: center; justify-content: center; font-size: 18px; color: #475569;
    }}
    .correct-opt {{
      background: #ecfdf5; border-color: #10b981; color: #065f46;
    }}
    .correct-opt .quiz-letter {{ background: #10b981; color: #ffffff; }}
    .poll-hint {{
      margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 12px;
      background: rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 20px;
      font-size: 20px; font-weight: 700; color: #f8fafc;
    }}
    .solution-box {{
      background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.15);
      border-radius: 20px; padding: 32px 36px; margin-top: 24px;
    }}
    .solution-title {{ font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }}
    .solution-body {{ font-size: 21px; line-height: 1.5; color: #cbd5e1; }}
    .cta-card {{
      background: {accent_color}; color: #ffffff; border-radius: 16px;
      padding: 24px 32px; text-align: center; margin-top: 32px;
    }}
    .cta-txt {{ font-size: 24px; font-weight: 800; font-family: 'Crimson Pro', serif; }}
    .cta-link {{ font-size: 19px; opacity: 0.9; margin-top: 6px; font-weight: 700; }}
    """

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # ══════════════════════════════════════════════════════════
        # MEDICINA
        # ══════════════════════════════════════════════════════════
        med_dir = os.path.join(OUT_DIR, "medicina", "historias")
        os.makedirs(med_dir, exist_ok=True)
        
        # Story 1: Quiz
        h1_med = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#881337', '#fda4af')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Examen de Medicina UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">¿Pasarías el <em>Curso Básico</em> hoy?</h1>
          <div class="quiz-card">
            <div class="quiz-q">¿En qué estructura ocurre de forma inmediata el <strong>espasmo vascular</strong> tras un daño vascular?</div>
            <div class="quiz-option"><span class="quiz-letter">A</span> En las vénulas y capilares</div>
            <div class="quiz-option"><span class="quiz-letter">B</span> En las arterias y arteriolas</div>
            <div class="quiz-option"><span class="quiz-letter">C</span> En las venas cavas</div>
            <div class="quiz-option"><span class="quiz-letter">D</span> En todos los vasos por igual</div>
          </div>
          <div class="poll-hint">👆 Toca para responder en la encuesta</div>
        </div>
        <div style="font-size:18px; color:#94a3b8; text-align:center; z-index:10;">Pregunta de Morfofunción · San Simón</div>
        </body></html>"""

        # Story 2: Solución
        h2_med = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#881337', '#fda4af')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Respuesta Oficial UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">La respuesta correcta es la <em>B</em>.</h1>
          <div class="quiz-card" style="padding: 24px 32px;">
            <div class="quiz-option correct-opt" style="margin-bottom:0;"><span class="quiz-letter">✓</span> B) En las arterias y arteriolas</div>
          </div>
          <div class="solution-box">
            <div class="solution-title">🩸 Justificación Oficial:</div>
            <div class="solution-body">El músculo liso circular se contrae para reducir la pérdida de sangre a alta presión. Las vénulas no poseen la capa muscular suficiente para desarrollar este mecanismo reflejo.</div>
          </div>
          <div class="cta-card">
            <div class="cta-txt">Practica 100 preguntas reales de Medicina</div>
            <div class="cta-link">Desliza o escribe al WhatsApp para entrar al simulador</div>
          </div>
        </div>
        <div style="font-size:18px; color:#cbd5e1; text-align:center; z-index:10;">axiom-simulador.com/medicina</div>
        </body></html>"""

        for name, html in [("HISTORIA_QUIZ_MEDICINA.png", h1_med), ("HISTORIA_SOLUCION_MEDICINA.png", h2_med)]:
            pg = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
            await pg.set_content(html)
            await pg.wait_for_timeout(350)
            dest = os.path.join(med_dir, name)
            await pg.screenshot(path=dest)
            print(f"[STORY MED] OK -> {dest}")
            await pg.close()

        # ══════════════════════════════════════════════════════════
        # INGENIERÍA
        # ══════════════════════════════════════════════════════════
        ing_dir = os.path.join(OUT_DIR, "ingenieria", "historias")
        os.makedirs(ing_dir, exist_ok=True)

        h1_ing = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#9c3d1c', '#fdba74')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Examen de Tecnología UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">Reto rápido de <em>Trigonometría</em></h1>
          <div class="quiz-card">
            <div class="quiz-q">¿Cuántas soluciones reales tiene la ecuación <strong>sen(2x) = sen(x)</strong> en el intervalo <strong>[0, 2π)</strong>?</div>
            <div class="quiz-option"><span class="quiz-letter">A</span> Solo 2 soluciones</div>
            <div class="quiz-option"><span class="quiz-letter">B</span> Exactamente 3 soluciones</div>
            <div class="quiz-option"><span class="quiz-letter">C</span> Exactamente 4 soluciones</div>
            <div class="quiz-option"><span class="quiz-letter">D</span> Infinitas soluciones</div>
          </div>
          <div class="poll-hint">👆 Vota antes de ver la solución</div>
        </div>
        <div style="font-size:18px; color:#94a3b8; text-align:center; z-index:10;">Facultad de Ciencias y Tecnología · UMSS</div>
        </body></html>"""

        h2_ing = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#9c3d1c', '#fdba74')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Solución FCyT UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">La respuesta correcta es la <em>C</em>.</h1>
          <div class="quiz-card" style="padding: 24px 32px;">
            <div class="quiz-option correct-opt" style="margin-bottom:0;"><span class="quiz-letter">✓</span> C) Exactamente 4 soluciones</div>
          </div>
          <div class="solution-box">
            <div class="solution-title">📐 Resolución Paso a Paso:</div>
            <div class="solution-body">sen(x)(2·cos(x) - 1) = 0<br>1) sen(x)=0 → x = 0, x = π<br>2) cos(x)=1/2 → x = π/3, x = 5π/3<br>Total = <strong>4 soluciones</strong>. (Si dividías entre sen(x), perdías 2).</div>
          </div>
          <div class="cta-card">
            <div class="cta-txt">Simula tu examen de Tecnología con tiempo real</div>
            <div class="cta-link">Entra a axiom-simulador.com/ingenieria</div>
          </div>
        </div>
        <div style="font-size:18px; color:#cbd5e1; text-align:center; z-index:10;">Banco con más de 200 ejercicios resueltos</div>
        </body></html>"""

        for name, html in [("HISTORIA_QUIZ_INGENIERIA.png", h1_ing), ("HISTORIA_SOLUCION_INGENIERIA.png", h2_ing)]:
            pg = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
            await pg.set_content(html)
            await pg.wait_for_timeout(350)
            dest = os.path.join(ing_dir, name)
            await pg.screenshot(path=dest)
            print(f"[STORY ING] OK -> {dest}")
            await pg.close()

        # ══════════════════════════════════════════════════════════
        # ECONÓMICAS
        # ══════════════════════════════════════════════════════════
        eco_dir = os.path.join(OUT_DIR, "economicas", "historias")
        os.makedirs(eco_dir, exist_ok=True)

        h1_eco = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#047857', '#6ee7b7')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Admisión Económicas UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">Reto de <em>Microeconomía</em></h1>
          <div class="quiz-card">
            <div class="quiz-q">Si la demanda de un bien es <strong>elástica</strong> (|Ep| &gt; 1) y el precio sube un 15%, ¿qué le ocurre al <strong>ingreso total</strong> del productor?</div>
            <div class="quiz-option"><span class="quiz-letter">A</span> Aumenta un 15%</div>
            <div class="quiz-option"><span class="quiz-letter">B</span> Disminuye</div>
            <div class="quiz-option"><span class="quiz-letter">C</span> Se mantiene constante</div>
            <div class="quiz-option"><span class="quiz-letter">D</span> No se puede determinar</div>
          </div>
          <div class="poll-hint">👆 Pon a prueba tu criterio económico</div>
        </div>
        <div style="font-size:18px; color:#94a3b8; text-align:center; z-index:10;">Facultad de Ciencias Económicas · UMSS</div>
        </body></html>"""

        h2_eco = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
        <style>{base_story_css('#047857', '#6ee7b7')}</style></head><body>
        <div class="bg-glow"></div>
        <div class="header-badge"><span class="dot"></span> Clave Económicas UMSS</div>
        <div class="content-area">
          <h1 class="story-h1">La respuesta correcta es la <em>B</em>.</h1>
          <div class="quiz-card" style="padding: 24px 32px;">
            <div class="quiz-option correct-opt" style="margin-bottom:0;"><span class="quiz-letter">✓</span> B) Disminuye</div>
          </div>
          <div class="solution-box">
            <div class="solution-title">📊 Razón Técnica:</div>
            <div class="solution-body">En demanda elástica, la caída porcentual en la cantidad consumida es mayor que el incremento del precio. La pérdida por ventas perdidas supera la ganancia del precio más alto.</div>
          </div>
          <div class="cta-card">
            <div class="cta-txt">Entrena para Administración, Contaduría y Economía</div>
            <div class="cta-link">Ingresa a axiom-simulador.com/economicas</div>
          </div>
        </div>
        <div style="font-size:18px; color:#cbd5e1; text-align:center; z-index:10;">Exámenes pasados reales de la San Simón</div>
        </body></html>"""

        for name, html in [("HISTORIA_QUIZ_ECONOMICAS.png", h1_eco), ("HISTORIA_SOLUCION_ECONOMICAS.png", h2_eco)]:
            pg = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
            await pg.set_content(html)
            await pg.wait_for_timeout(350)
            dest = os.path.join(eco_dir, name)
            await pg.screenshot(path=dest)
            print(f"[STORY ECO] OK -> {dest}")
            await pg.close()

        await browser.close()
        print("\n¡Todas las historias interactivas de WhatsApp generadas exitosamente!")

if __name__ == "__main__":
    asyncio.run(run())

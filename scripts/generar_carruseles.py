"""
GENERADOR COMPLETO DE CARRUSELES EDITORIALES PARA INSTAGRAM / FACEBOOK
Genera 5 láminas en alta resolución (1080x1350 px, @2x) para cada facultad:
- Medicina (Borgoña Doctoral #881337)
- Ingeniería / Tecnología (Terracota #9c3d1c)
- Ciencias Económicas (Verde Esmeralda #047857)
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

def base_slide_css(accent_color, accent_subtle):
    return f"""
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1080px; height: 1350px; background: #0d1017;
      font-family: 'Atkinson Hyperlegible', sans-serif; color: #ffffff;
      position: relative; overflow: hidden; display: flex; flex-direction: column;
      justify-content: space-between; padding: 64px 72px;
    }}
    .slide-header {{
      display: flex; justify-content: space-between; align-items: center; z-index: 10;
    }}
    .slide-brand {{
      font-family: 'Crimson Pro', serif; font-size: 32px; font-weight: 800;
      color: #ffffff; letter-spacing: 0.06em; display: flex; align-items: center; gap: 10px;
    }}
    .brand-dot {{ width: 10px; height: 10px; background: {accent_color}; border-radius: 50%; }}
    .slide-counter {{
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
      color: #cbd5e1; font-size: 15px; font-weight: 700; padding: 6px 16px; border-radius: 999px;
    }}
    .slide-body {{
      position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column;
      justify-content: center;
    }}
    .slide-title {{
      font-family: 'Crimson Pro', serif; font-size: 64px; line-height: 1.08;
      font-weight: 800; letter-spacing: -0.025em; color: #ffffff; margin-bottom: 24px;
    }}
    .slide-title em {{
      color: {accent_subtle}; font-style: italic; text-decoration: underline;
      text-decoration-color: {accent_color}; text-underline-offset: 6px;
    }}
    .slide-p {{
      font-size: 26px; line-height: 1.45; color: #cbd5e1; max-width: 900px;
    }}
    .slide-footer {{
      display: flex; justify-content: space-between; align-items: center; z-index: 10;
      border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px;
    }}
    .footer-hint {{ font-size: 18px; color: #94a3b8; font-weight: 700; display: flex; align-items: center; gap: 8px; }}
    .swipe-pill {{
      background: {accent_color}; color: #ffffff; font-size: 18px; font-weight: 700;
      padding: 12px 24px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;
    }}
    """

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # ══════════════════════════════════════════════════════════
        # 1. MEDICINA (Borgoña Doctoral #881337)
        # ══════════════════════════════════════════════════════════
        med_b64 = to_base64("umss_medical_student_editorial_1793063508972.jpg")
        med_dir = os.path.join(OUT_DIR, "medicina", "carrusel")
        os.makedirs(med_dir, exist_ok=True)
        
        slides_med = [
            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#881337', '#fda4af')}
            .hero-bg {{ position: absolute; top: 0; left: 0; width: 1080px; height: 1350px; object-fit: cover; filter: brightness(0.38) contrast(1.1); z-index: 1; }}
            </style></head><body>
            <img class="hero-bg" src="{med_b64}">
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Medicina UMSS</div>
              <div class="slide-counter">1 / 5</div>
            </div>
            <div class="slide-body">
              <h1 class="slide-title">Por qué el 80% reprueba Morfofunción en <em>una sola palabra</em>.</h1>
              <p class="slide-p">El Curso Básico de Medicina tiene 3.000 postulantes para 250 cupos. La San Simón no perdona errores de lectura rápida.</p>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Caso real de examen oficial</div>
              <div class="swipe-pill">Desliza para ver la trampa 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#881337', '#fda4af')}
            .error-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 18px; padding: 36px 40px; margin-top: 20px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }}
            .error-tag {{ font-size: 14px; font-weight: 700; color: #881337; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }}
            .error-quote {{ font-size: 26px; line-height: 1.4; color: #1e293b; margin-bottom: 16px; font-style: italic; }}
            .error-stamp {{ background: #fff1f2; border: 1.5px solid #fecdd3; color: #881337; font-weight: 700; font-size: 20px; padding: 12px 20px; border-radius: 8px; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Morfofunción</div>
              <div class="slide-counter">2 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">La trampa del <em>espasmo vascular</em></h2>
              <div class="error-box">
                <div class="error-tag">Pregunta de Examen Parcial UMSS</div>
                <div class="error-quote">«Cuando se dañan las <strong>venas y vénulas</strong>, el músculo liso se contrae en forma inmediata (espasmo vascular)...»</div>
                <div class="error-stamp">¿Verdadero o Falso? El 85% marcó VERDADERO sin dudar.</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">¿Por qué está mal?</div>
              <div class="swipe-pill">Mira la explicación 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#881337', '#fda4af')}
            .card-grid {{ display: flex; flex-direction: column; gap: 18px; margin-top: 16px; }}
            .card-item {{ background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px 28px; }}
            .card-h {{ font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 10px; }}
            .card-p {{ font-size: 19px; line-height: 1.4; color: #cbd5e1; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Resolución</div>
              <div class="slide-counter">3 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">La respuesta es <em>FALSA</em>.</h2>
              <div class="card-grid">
                <div class="card-item">
                  <div class="card-h">🩸 Ocurre en arterias y arteriolas</div>
                  <div class="card-p">El espasmo vascular protege contra la hemorragia a alta presión. Las vénulas carecen de la túnica media suficiente para este reflejo.</div>
                </div>
                <div class="card-item">
                  <div class="card-h">⚠️ El método San Simón</div>
                  <div class="card-p">Los docentes colocan definiciones 95% textuales del libro pero cambian una palabra clave al inicio para anular tu puntaje.</div>
                </div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Regla de oro</div>
              <div class="swipe-pill">Siguiente lámina 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#881337', '#fda4af')}
            .golden-box {{ background: linear-gradient(135deg, rgba(136,19,55,0.3) 0%, rgba(20,22,31,0.6) 100%); border: 1.5px solid #881337; border-radius: 18px; padding: 36px 40px; margin-top: 16px; }}
            .golden-h {{ font-family: 'Crimson Pro', serif; font-size: 38px; font-weight: 800; color: #fda4af; margin-bottom: 12px; }}
            .golden-p {{ font-size: 22px; line-height: 1.45; color: #ffffff; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Método</div>
              <div class="slide-counter">4 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">Cómo estudiar para <em>no caer</em></h2>
              <div class="golden-box">
                <div class="golden-h">Regla de las 3 lecturas</div>
                <div class="golden-p">1. Lee primero el sujeto anatómico (¿vaso, célula o tejido?).<br>2. Comprueba el verbo fisiológico.<br>3. Desconfía si la afirmación suena 'demasiado obvia'.</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Entrena bajo tiempo</div>
              <div class="swipe-pill">Ver cómo practicar 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#881337', '#fda4af')}
            .cta-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 20px; padding: 44px 40px; margin-top: 16px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }}
            .cta-h {{ font-family: 'Crimson Pro', serif; font-size: 42px; font-weight: 800; color: #1a1f2e; margin-bottom: 10px; }}
            .cta-sub {{ font-size: 20px; color: #64748b; margin-bottom: 24px; }}
            .cta-btn {{ background: #881337; color: #ffffff; font-size: 22px; font-weight: 700; padding: 18px 36px; border-radius: 12px; display: inline-block; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Medicina UMSS</div>
              <div class="slide-counter">5 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">No estudies de memoria.<br>Entrena con <em>exámenes reales</em>.</h2>
              <div class="cta-box">
                <div class="cta-h">100 preguntas oficiales de Medicina</div>
                <div class="cta-sub">Simulador con el tiempo cronometrado exacto de San Simón</div>
                <div class="cta-btn">Prueba gratis en axiom-simulador.com</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">💾 Guarda este post para repasar</div>
              <div style="font-weight:700; color:#cbd5e1;">axiom-simulador.com</div>
            </div></body></html>"""
        ]

        for idx, slide_html in enumerate(slides_med, start=1):
            pg = await browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
            await pg.set_content(slide_html)
            await pg.wait_for_timeout(400)
            dest = os.path.join(med_dir, f"SLIDE_{idx}_MEDICINA.png")
            await pg.screenshot(path=dest)
            print(f"[CARRUSEL MED] Slide {idx} OK -> {dest}")
            await pg.close()

        # ══════════════════════════════════════════════════════════
        # 2. INGENIERÍA / TECNOLOGÍA (Terracota #9c3d1c)
        # ══════════════════════════════════════════════════════════
        ing_b64 = to_base64("bolivian_engineering_student_umss_editorial_negspace_1793063527941.jpg")
        ing_dir = os.path.join(OUT_DIR, "ingenieria", "carrusel")
        os.makedirs(ing_dir, exist_ok=True)

        slides_ing = [
            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#9c3d1c', '#fdba74')}
            .hero-bg {{ position: absolute; top: 0; left: 0; width: 1080px; height: 1350px; object-fit: cover; filter: brightness(0.38) contrast(1.1); z-index: 1; }}
            </style></head><body>
            <img class="hero-bg" src="{ing_b64}">
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Tecnología UMSS</div>
              <div class="slide-counter">1 / 5</div>
            </div>
            <div class="slide-body">
              <h1 class="slide-title">El error en Trigonometría que te cuesta el <em>ingreso a Tecnología</em>.</h1>
              <p class="slide-p">En Álgebra y Trigonometría de la UMSS, el 75% de las notas desaprobadas no se deben a no saber la fórmula, sino a olvidar las restricciones de dominio.</p>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Caso real Examen de Ingreso</div>
              <div class="swipe-pill">Desliza para ver el problema 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#9c3d1c', '#fdba74')}
            .error-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 18px; padding: 36px 40px; margin-top: 20px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }}
            .error-tag {{ font-size: 14px; font-weight: 700; color: #9c3d1c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }}
            .error-quote {{ font-size: 26px; line-height: 1.4; color: #1e293b; margin-bottom: 16px; font-family: monospace; font-weight: bold; }}
            .error-stamp {{ background: #fff7ed; border: 1.5px solid #ffedd5; color: #9c3d1c; font-weight: 700; font-size: 20px; padding: 12px 20px; border-radius: 8px; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Trigonometría</div>
              <div class="slide-counter">2 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">La simplificación <em>traicionera</em></h2>
              <div class="error-box">
                <div class="error-tag">Pregunta de Examen Tipo · FCyT</div>
                <div class="error-quote">Resolver para x ∈ [0, 2π):<br>sen(2x) = sen(x)</div>
                <div class="error-stamp">Error fatal: Cancelar sen(x) a ambos lados dividiendo entre sen(x).</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">¿Por qué perdiste puntos?</div>
              <div class="swipe-pill">Ver la solución correcta 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#9c3d1c', '#fdba74')}
            .card-grid {{ display: flex; flex-direction: column; gap: 18px; margin-top: 16px; }}
            .card-item {{ background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px 28px; }}
            .card-h {{ font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 6px; }}
            .card-p {{ font-size: 19px; line-height: 1.4; color: #cbd5e1; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Demostración</div>
              <div class="slide-counter">3 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">Al dividir, <em>pierdes soluciones</em>.</h2>
              <div class="card-grid">
                <div class="card-item">
                  <div class="card-h">⛔ El error común</div>
                  <div class="card-p">Si divides entre sen(x), asumes que sen(x) ≠ 0. Pierdes de inmediato las soluciones x = 0 y x = π.</div>
                </div>
                <div class="card-item">
                  <div class="card-h">✅ La forma rigurosa de San Simón</div>
                  <div class="card-p">Iguala a cero y factoriza:<br>sen(x)(2·cos(x) - 1) = 0<br>Soluciones: sen(x)=0 o cos(x)=1/2. Total: 4 soluciones completas.</div>
                </div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">El criterio del docente</div>
              <div class="swipe-pill">Siguiente lámina 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#9c3d1c', '#fdba74')}
            .golden-box {{ background: linear-gradient(135deg, rgba(156,61,28,0.3) 0%, rgba(20,22,31,0.6) 100%); border: 1.5px solid #9c3d1c; border-radius: 18px; padding: 36px 40px; margin-top: 16px; }}
            .golden-h {{ font-family: 'Crimson Pro', serif; font-size: 38px; font-weight: 800; color: #fdba74; margin-bottom: 12px; }}
            .golden-p {{ font-size: 22px; line-height: 1.45; color: #ffffff; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Estrategia</div>
              <div class="slide-counter">4 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">En Tecnología UMSS: <em>Jamás dividas variables</em></h2>
              <div class="golden-box">
                <div class="golden-h">Protocolo FCyT</div>
                <div class="golden-p">1. Pasa todo al primer miembro e iguala a cero.<br>2. Extrae factor común siempre.<br>3. Analiza cada factor por separado.<br>4. Verifica el intervalo solicitado en el enunciado.</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Asegura tu 100</div>
              <div class="swipe-pill">Ver cómo practicar 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#9c3d1c', '#fdba74')}
            .cta-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 20px; padding: 44px 40px; margin-top: 16px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }}
            .cta-h {{ font-family: 'Crimson Pro', serif; font-size: 42px; font-weight: 800; color: #1a1f2e; margin-bottom: 10px; }}
            .cta-sub {{ font-size: 20px; color: #64748b; margin-bottom: 24px; }}
            .cta-btn {{ background: #9c3d1c; color: #ffffff; font-size: 22px; font-weight: 700; padding: 18px 36px; border-radius: 12px; display: inline-block; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Tecnología UMSS</div>
              <div class="slide-counter">5 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">Entrena con el rigor de la <em>Facultad de Tecnología</em>.</h2>
              <div class="cta-box">
                <div class="cta-h">Banco oficial de Matemáticas y Física</div>
                <div class="cta-sub">Exámenes pasados resueltos paso a paso con fórmulas completas</div>
                <div class="cta-btn">Prueba gratis en axiom-simulador.com</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">💾 Guarda este post para tu examen</div>
              <div style="font-weight:700; color:#cbd5e1;">axiom-simulador.com</div>
            </div></body></html>"""
        ]

        for idx, slide_html in enumerate(slides_ing, start=1):
            pg = await browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
            await pg.set_content(slide_html)
            await pg.wait_for_timeout(400)
            dest = os.path.join(ing_dir, f"SLIDE_{idx}_INGENIERIA.png")
            await pg.screenshot(path=dest)
            print(f"[CARRUSEL ING] Slide {idx} OK -> {dest}")
            await pg.close()

        # ══════════════════════════════════════════════════════════
        # 3. CIENCIAS ECONÓMICAS (Verde Esmeralda #047857)
        # ══════════════════════════════════════════════════════════
        eco_b64 = to_base64("umss_economics_student_study_1793063517413.jpg")
        eco_dir = os.path.join(OUT_DIR, "economicas", "carrusel")
        os.makedirs(eco_dir, exist_ok=True)

        slides_eco = [
            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#047857', '#6ee7b7')}
            .hero-bg {{ position: absolute; top: 0; left: 0; width: 1080px; height: 1350px; object-fit: cover; filter: brightness(0.38) contrast(1.1); z-index: 1; }}
            </style></head><body>
            <img class="hero-bg" src="{eco_b64}">
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Económicas UMSS</div>
              <div class="slide-counter">1 / 5</div>
            </div>
            <div class="slide-body">
              <h1 class="slide-title">La trampa de Microeconomía que el 70% <em>marca mal</em> en Económicas.</h1>
              <p class="slide-p">En el examen de admisión a Ciencias Económicas de la UMSS, la relación entre elasticidad e ingreso total es la pregunta trampa por excelencia.</p>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Pregunta Oficial de Admisión</div>
              <div class="swipe-pill">Desliza para ver la pregunta 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#047857', '#6ee7b7')}
            .error-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 18px; padding: 36px 40px; margin-top: 20px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }}
            .error-tag {{ font-size: 14px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }}
            .error-quote {{ font-size: 26px; line-height: 1.4; color: #1e293b; margin-bottom: 16px; font-style: italic; }}
            .error-stamp {{ background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #047857; font-weight: 700; font-size: 20px; padding: 12px 20px; border-radius: 8px; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Microeconomía</div>
              <div class="slide-counter">2 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">¿Qué ocurre cuando sube el precio?</h2>
              <div class="error-box">
                <div class="error-tag">Pregunta de Examen Pasado · UMSS</div>
                <div class="error-quote">«Si la demanda de un bien es <strong>elástica</strong> (|Ep| &gt; 1) y el precio sube un 10%, el ingreso total del productor...»</div>
                <div class="error-stamp">La mayoría marca: "AUMENTA porque el precio subió". ¡Grave error!</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">¿Por qué disminuye?</div>
              <div class="swipe-pill">Ver la explicación técnica 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#047857', '#6ee7b7')}
            .card-grid {{ display: flex; flex-direction: column; gap: 18px; margin-top: 16px; }}
            .card-item {{ background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px 28px; }}
            .card-h {{ font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 6px; }}
            .card-p {{ font-size: 19px; line-height: 1.4; color: #cbd5e1; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Demostración</div>
              <div class="slide-counter">3 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">La respuesta correcta: <em>DISMINUYE</em>.</h2>
              <div class="card-grid">
                <div class="card-item">
                  <div class="card-h">📉 El efecto cantidad supera al precio</div>
                  <div class="card-p">Al ser elástica, la cantidad demandada cae en una proporción mayor que el aumento de precio (por ejemplo, cae 20%). El ingreso total cae.</div>
                </div>
                <div class="card-item">
                  <div class="card-h">💡 La intuición económica</div>
                  <div class="card-p">Los consumidores son altamente sensibles. Pierdes más clientes de lo que ganas por el mayor precio unitario.</div>
                </div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Matriz mnemotécnica</div>
              <div class="swipe-pill">Siguiente lámina 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#047857', '#6ee7b7')}
            .golden-box {{ background: linear-gradient(135deg, rgba(4,120,87,0.3) 0%, rgba(20,22,31,0.6) 100%); border: 1.5px solid #047857; border-radius: 18px; padding: 36px 40px; margin-top: 16px; }}
            .golden-h {{ font-family: 'Crimson Pro', serif; font-size: 38px; font-weight: 800; color: #6ee7b7; margin-bottom: 12px; }}
            .golden-p {{ font-size: 22px; line-height: 1.45; color: #ffffff; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Síntesis</div>
              <div class="slide-counter">4 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">La matriz que <em>nunca falla</em></h2>
              <div class="golden-box">
                <div class="golden-h">Regla de Oro en San Simón</div>
                <div class="golden-p">
                  • <strong>Demanda Elástica (|Ep| &gt; 1):</strong> Precio e Ingreso se mueven en sentido CONTRARIO.<br><br>
                  • <strong>Demanda Inelástica (|Ep| &lt; 1):</strong> Precio e Ingreso se mueven en el MISMO sentido.
                </div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">Asegura tu cupo</div>
              <div class="swipe-pill">Ver cómo entrenar 👉</div>
            </div></body></html>""",

            f"""<!DOCTYPE html><html><head><meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,800;1,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
            <style>{base_slide_css('#047857', '#6ee7b7')}
            .cta-box {{ background: #faf7f0; color: #1a1f2e; border-radius: 20px; padding: 44px 40px; margin-top: 16px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }}
            .cta-h {{ font-family: 'Crimson Pro', serif; font-size: 42px; font-weight: 800; color: #1a1f2e; margin-bottom: 10px; }}
            .cta-sub {{ font-size: 20px; color: #64748b; margin-bottom: 24px; }}
            .cta-btn {{ background: #047857; color: #ffffff; font-size: 22px; font-weight: 700; padding: 18px 36px; border-radius: 12px; display: inline-block; }}
            </style></head><body>
            <div class="slide-header">
              <div class="slide-brand">AXIOM <span class="brand-dot"></span> Económicas UMSS</div>
              <div class="slide-counter">5 / 5</div>
            </div>
            <div class="slide-body">
              <h2 class="slide-title">Ingresa a Administración, Contaduría o Economía a la primera.</h2>
              <div class="cta-box">
                <div class="cta-h">Banco con 120 preguntas de Económicas</div>
                <div class="cta-sub">Microeconomía, Macroeconomía y Matemáticas Financieras reales</div>
                <div class="cta-btn">Prueba gratis en axiom-simulador.com</div>
              </div>
            </div>
            <div class="slide-footer">
              <div class="footer-hint">💾 Guarda este post para repasar</div>
              <div style="font-weight:700; color:#cbd5e1;">axiom-simulador.com</div>
            </div></body></html>"""
        ]

        for idx, slide_html in enumerate(slides_eco, start=1):
            pg = await browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
            await pg.set_content(slide_html)
            await pg.wait_for_timeout(400)
            dest = os.path.join(eco_dir, f"SLIDE_{idx}_ECONOMICAS.png")
            await pg.screenshot(path=dest)
            print(f"[CARRUSEL ECO] Slide {idx} OK -> {dest}")
            await pg.close()

        await browser.close()
        print("\n¡15 Láminas de Carrusel generadas exitosamente para Medicina, Ingeniería y Económicas!")

if __name__ == "__main__":
    asyncio.run(run())

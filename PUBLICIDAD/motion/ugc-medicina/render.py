import sys
import os
import asyncio
from playwright.async_api import async_playwright

FPS = 30
DUR = 27.9
HERE = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(HERE, "frames")
PREV_DIR = os.path.join(HERE, "prev")

async def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "full"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1080, "height": 1920})
        
        file_url = "file:///" + os.path.join(HERE, "index.html").replace("\\", "/")
        await page.goto(file_url)
        await page.wait_for_function("window.renderReady === true")
        await page.evaluate("document.fonts.ready")
        await page.wait_for_timeout(600)
        
        if mode == "prev":
            os.makedirs(PREV_DIR, exist_ok=True)
            # 6 momentos clave del video
            timestamps = [2.0, 6.0, 11.5, 16.0, 21.0, 25.5]
            for t in timestamps:
                await page.evaluate(f"render({t})")
                out_file = os.path.join(PREV_DIR, f"preview_ugc_t_{t:04.1f}s.png")
                await page.screenshot(path=out_file)
                print(f"[PREVIEW] Frame t={t:.1f}s -> {out_file}")
        else:
            os.makedirs(FRAMES_DIR, exist_ok=True)
            total_frames = int(DUR * FPS)
            print(f"[RENDER UGC] Iniciando captura de {total_frames} frames a 30fps...")
            for i in range(total_frames):
                t = i / FPS
                await page.evaluate(f"render({t})")
                frame_path = os.path.join(FRAMES_DIR, f"f_{i:04d}.png")
                await page.screenshot(path=frame_path)
                if i % 90 == 0:
                    print(f"[RENDER UGC] Frame {i}/{total_frames} ({i/FPS:.1f}s)...")
            print("[RENDER UGC] Todos los frames capturados exitosamente.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

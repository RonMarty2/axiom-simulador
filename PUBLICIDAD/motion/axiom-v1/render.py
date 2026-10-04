import sys, os
from playwright.sync_api import sync_playwright
from warp import t_of_T, DUR
FPS=30
out=sys.argv[1] if len(sys.argv)>1 else "frames"
only=[float(x) for x in sys.argv[2:]]
os.makedirs(out,exist_ok=True)
here=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.goto("file:///"+here.replace("\\","/")+"/index.html"); pg.wait_for_function("window.renderReady===true")
    pg.evaluate("document.body.classList.add('noph')"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(800)
    if only:
        for t in only:
            pg.evaluate(f"render({t})"); pg.screenshot(path=f"{out}/t_{t:05.1f}.png")
    else:
        n=int(DUR*FPS)
        for i in range(n):
            pg.evaluate(f"render({t_of_T(i/FPS)})"); pg.screenshot(path=f"{out}/f_{i:04d}.png")
    b.close()

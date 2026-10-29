"""Compara la salida markdown de una herramienta contra fragmentos que el banco ya tiene.
Uso: python comparar.py <md_2025> <md_2016>
Normaliza LaTeX (espacios, \dfrac, llaves de un caracter, grados) y busca cada fragmento.
"""
import re
import sys


def norm(s: str) -> str:
    s = re.sub(r"\(data:image/[^)]{50,}\)", "(IMG)", s)
    s = s.replace("\\dfrac", "\\frac").replace("\\tfrac", "\\frac")
    s = s.replace("\\left", "").replace("\\right", "").replace("\\displaystyle", "")
    s = re.sub(r"\\(mathrm|text|operatorname|mathit|mathbf|boldsymbol)\s*\{([^{}]*)\}", r"\2", s)
    s = re.sub(r"\\(sin|cos|tan|ln|log)(?![a-zA-Z])", r"\1", s)
    s = s.replace("\\quad", "").replace("\\xrightarrow{}", "→")
    s = s.replace("\\,", "").replace("\\;", "").replace("\\!", "").replace("~", "")
    s = re.sub(r"\s+", "", s)
    for _ in range(3):
        s = re.sub(r"\{(\\?\w)\}", r"\1", s)
    s = re.sub(r"\^\{?\\circ\}?|\^\{?0\}?|\^\{?o\}?|°|º", "°", s)
    s = s.replace("\\cdot", "").replace("\\times", "")
    s = s.replace("\\rightarrow", "→").replace("\\to", "→").replace("\\longrightarrow", "→")
    s = s.replace("−", "-").replace("–", "-")
    return s.lower()


CHECKS_2025 = [
    ("A1 E=(x^-1+11)/x", r"\frac{x^{-1}+11}{x}"),
    ("A1 ecuacion", r"\frac{3}{4x^2-1}-\frac{1}{2x+1}=\frac{3}{2x-1}"),
    ("A2 logaritmos", r"\log_2(x+1)+\log_2(3x-5)=\log_2(5x-3)+2"),
    ("A3 raices", r"\sqrt{2-3x}+\sqrt{11+3x}=5"),
    ("A4 exponencial", r"\frac{e^y-1}{2-3e^y}=\frac{2}{7}"),
    ("A4 opcion ln(12/11)", r"\ln(\frac{12}{11})"),
    ("G5 opcion sqrt3/2", r"\frac{\sqrt{3}}{2}"),
    ("G7 opcion B", r"x^2+y^2-10x+9=0"),
    ("G8 texto", "Una persona cuyos ojos están a 1.2 metros del suelo"),
    ("H encabezado fecha", "Jueves, 23 de enero del 2025"),
]

CHECKS_2016 = [
    ("A1 ecuacion", r"x^2+bx+c=0"),
    ("A1 opcion sqrt(c-q)", r"\sqrt{c-q}"),
    ("A2 asintota f(x)", r"\frac{x^2-2x-8}{x}"),
    ("A2 texto tildes", "asíntota oblicua"),
    ("A3 ingreso", r"80x-0.4x^2"),
    ("A4 polinomio", r"2x^4+4x^3-4x^2-6x+4=0"),
    ("G5 texto", "se traza la bisectriz de un ángulo"),
    ("G7 ecuacion", r"\sin(2x)+\sin(4x)=0"),
    ("G8 opcion B", r"\frac{65\sin(67^\circ)\tan(23^\circ)}{\sin(103^\circ)}"),
    ("F9 opcion a 3sqrt14", r"3\sqrt{14}"),
    ("F9 vector v", r"\vec{v}"),
    ("F10 opcion 5/2", r"\frac{5}{2}"),
    ("F12 opcion 100/11", r"\frac{100}{11}"),
    ("Q13 pi r^2 h", r"\pi r^2h"),
    ("Q14 tabla 109", "109"),
    ("Q15 Cu(NO3)2", r"Cu(NO_3)_2"),
    ("Q16 Al2(SO4)3", r"Al_2(SO_4)_3"),
    ("B19 texto", "Alteración del hábitat"),
]


def correr(path, checks):
    txt = open(path, encoding="utf-8", errors="replace").read()
    n = norm(txt)
    ok = 0
    for nombre, frag in checks:
        hit = norm(frag) in n or norm(frag).replace("{", "").replace("}", "") in n.replace("{", "").replace("}", "")
        ok += hit
        print(("  OK  " if hit else "  --  ") + nombre)
    print(f"  {ok}/{len(checks)}")
    return ok


if __name__ == "__main__":
    a, b = sys.argv[1], sys.argv[2]
    print("== 2025 (digital, Cambria Math):", a)
    correr(a, CHECKS_2025)
    print("== 2016 (p1 escaneo, p2 Word viejo):", b)
    correr(b, CHECKS_2016)

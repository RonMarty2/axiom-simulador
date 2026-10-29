"""Comprueba una cuenta con herramientas, en vez de "creerla". Solo desarrollo: lo usan los agentes
(resolutor-exacto, analista-resolucion, redactor-explicaciones, verificador) antes de escribir un resultado.

Instalacion, una vez por maquina (ruta corta: con la del scratchpad pip choca con el limite de rutas de Windows):
    python -m venv %LOCALAPPDATA%\\axiom-py
    %LOCALAPPDATA%\\axiom-py\\Scripts\\python -m pip install -r scripts/requirements-dev.txt
En Git Bash el python queda en "$LOCALAPPDATA/axiom-py/Scripts/python".

Uso (cada orden imprime una linea OK o NO y sale con 0 si da, 1 si no da, 2 si la orden esta mal escrita):
    igual    "1/2-3/4+5/6" "7/12"              dos expresiones exactas son iguales (sympy; acepta ^ y 2x)
    raices   "x^2-5x+6" "2,3"                  las raices de un polinomio en x (o en la unica variable que tenga)
    unidades "72 km/h" "m/s" 20                convierte y compara con el valor esperado (pint)
    unidades "5 m + 3 s"                       solo comprueba que las unidades sean compatibles
    balance  "Fe + O2 -> Fe2O3" "4,3,2"        coeficientes de la ecuacion balanceada, en el orden escrito (chempy)
    masa     "H2SO4" 98 [--tol 0.5]            masa molar contra la de referencia; la UMSS redondea, de ahi la tolerancia
    prueba                                     corre los casos de control (todos deben dar lo esperado)
"""
import sys

sys.stdout.reconfigure(encoding="utf-8")


def _expr(texto):
    from sympy.parsing.sympy_parser import (
        convert_xor,
        implicit_multiplication_application,
        parse_expr,
        standard_transformations,
    )

    return parse_expr(texto, transformations=standard_transformations + (implicit_multiplication_application, convert_xor))


def igual(a, b):
    from sympy import simplify

    ea, eb = _expr(a), _expr(b)
    if simplify(ea - eb) == 0:
        return True, f"{a} = {b}"
    return False, f"{a} da {simplify(ea)}, no {b}"


def raices(poli, esperadas):
    from sympy import Symbol, solve

    p = _expr(poli)
    libres = sorted(p.free_symbols, key=str)
    x = Symbol("x") if Symbol("x") in libres else (libres[0] if len(libres) == 1 else None)
    if x is None:
        raise ValueError(f"no se cual es la variable de {poli}")
    reales = solve(p, x)
    pedidas = [_expr(r) for r in esperadas.split(",")]
    sobran = [r for r in reales if not any((r - q).simplify() == 0 for q in pedidas)]
    faltan = [q for q in pedidas if not any((r - q).simplify() == 0 for r in reales)]
    if not sobran and not faltan:
        return True, f"raices de {poli}: {', '.join(map(str, reales))}"
    return False, f"raices de {poli} son {', '.join(map(str, reales))}, no {esperadas}"


def unidades(expr, destino=None, valor=None):
    import pint

    u = pint.UnitRegistry()
    try:
        q = u.parse_expression(expr)
        if destino is None:
            return True, f"{expr} tiene unidades compatibles: {q:~}"
        q = q.to(destino)
    except pint.DimensionalityError as e:
        return False, f"unidades incompatibles en {expr}: {e}"
    if valor is None:
        return True, f"{expr} = {q:~}"
    if abs(q.magnitude - float(valor)) <= 1e-9 * max(1.0, abs(float(valor))):
        return True, f"{expr} = {q:~}"
    return False, f"{expr} = {q:~}, no {valor} {destino}"


def balance(ecuacion, esperados):
    from chempy import balance_stoichiometry

    izq, der = (lado.split("+") for lado in ecuacion.replace("→", "->").split("->"))
    izq, der = [s.strip() for s in izq], [s.strip() for s in der]
    r, p = balance_stoichiometry(set(izq), set(der))
    coef = [int(r[s]) for s in izq] + [int(p[s]) for s in der]
    texto = " + ".join(f"{c} {s}" for c, s in zip(coef, izq)) + " -> " + " + ".join(f"{c} {s}" for c, s in zip(coef[len(izq):], der))
    if coef == [int(c) for c in esperados.split(",")]:
        return True, texto
    return False, f"balanceada es {texto}, no {esperados}"


def masa(formula, esperada, tol=0.5):
    from chempy import Substance

    m = Substance.from_formula(formula).mass
    if abs(m - float(esperada)) <= tol:
        return True, f"M({formula}) = {m:.3f}, {esperada} dentro de {tol}"
    return False, f"M({formula}) = {m:.3f}, no {esperada} (tolerancia {tol})"


# casos de control: (orden, argumentos, lo que debe dar)
CONTROL = [
    ("igual", ["1/2-3/4+5/6", "7/12"], True),
    ("igual", ["1/2-3/4+5/6", "1/2"], False),
    ("igual", ["sqrt(50)", "5sqrt(2)"], True),
    ("raices", ["x^2-5x+6", "2,3"], True),
    ("raices", ["x^2-5x+6", "2,4"], False),
    ("unidades", ["72 km/h", "m/s", "20"], True),
    ("unidades", ["(2 mol/L)*(0.5 L)", "mol", "1"], True),
    ("unidades", ["5 m + 3 s"], False),
    ("balance", ["Fe + O2 -> Fe2O3", "4,3,2"], True),
    ("balance", ["C3H8 + O2 -> CO2 + H2O", "1,5,3,4"], True),
    ("balance", ["Fe + O2 -> Fe2O3", "2,3,1"], False),
    ("masa", ["H2SO4", "98"], True),
    ("masa", ["H2SO4", "96"], False),
]

ORDENES = {"igual": igual, "raices": raices, "unidades": unidades, "balance": balance, "masa": masa}


def prueba():
    malos = 0
    for orden, args, debe in CONTROL:
        da, texto = ORDENES[orden](*args)
        bien = da == debe
        malos += not bien
        print(("bien " if bien else "MAL  ") + f"{orden} {args} -> {'OK' if da else 'NO'}: {texto}")
    print(f"{len(CONTROL) - malos} de {len(CONTROL)} casos de control dan lo esperado")
    return malos == 0


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 2
    orden, args = argv[0], argv[1:]
    if orden == "prueba":
        return 0 if prueba() else 1
    if orden not in ORDENES:
        print(f"orden desconocida: {orden}. Ordenes: {', '.join(ORDENES)}, prueba")
        return 2
    kw = {}
    if "--tol" in args:
        i = args.index("--tol")
        kw["tol"] = float(args[i + 1])
        args = args[:i] + args[i + 2 :]
    try:
        da, texto = ORDENES[orden](*args, **kw)
    except Exception as e:  # orden mal escrita o expresion que no se entiende: se dice, no se esconde
        print(f"ERROR {orden}: {type(e).__name__}: {e}")
        return 2
    print(("OK " if da else "NO ") + texto)
    return 0 if da else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

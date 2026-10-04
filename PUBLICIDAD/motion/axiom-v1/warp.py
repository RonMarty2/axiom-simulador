# tiempo de salida T (voz) <-> tiempo de animacion t (HTML)
BP=[(0,0),(7.6,8.3),(12.8,15.3),(16.4,19.0),(19.6,21.6),(22.2,24.5),(24.8,27.8),(28.9,31.9),(29.8,33.0),(31.2,34.3),(34.0,37.8)]
def t_of_T(T):
    for (a,A),(b,B) in zip(BP,BP[1:]):
        if T<=B: return a+(T-A)*(b-a)/(B-A)
    return 34.0
def T_of_t(t):
    for (a,A),(b,B) in zip(BP,BP[1:]):
        if t<=b: return A+(t-a)*(B-A)/(b-a)
    return BP[-1][1]
DUR=38.0

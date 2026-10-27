# Sincronización temporal para Medicina v1
# t: tiempo de animación interna (0 a 24.0s)
# T: tiempo de video de salida
DUR = 24.0

def t_of_T(T):
    return min(max(0.0, T), DUR)

def T_of_t(t):
    return min(max(0.0, t), DUR)

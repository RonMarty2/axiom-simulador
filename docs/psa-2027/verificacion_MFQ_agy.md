Verificación de las **105 preguntas** de la sección 4 de [MFQ_INVENTARIO.md](file:///C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/docs/psa-2027/MFQ_INVENTARIO.md) contra [LISTA_CONTENIDOS_PSA2027.txt](file:///C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt) (y el desglose de `4096.pdf` registrado en la sección 1 de `MFQ_INVENTARIO.md`, dado que el PDF original no está en disco y la terminal está bloqueada en modo solo lectura).

| id | veredicto | clave correcta | cuenta clave (1 línea) |
|---|---|---|---|
| M1.1 | OK | A | $(p \land \neg q) \to r \equiv \text{F} \iff p\land\neg q \equiv \text{V},\ r\equiv\text{F} \implies (p,q,r)=(\text{V},\text{F},\text{F})$; 2.º camino: probando A–D, solo $(\text{V}\land\neg\text{F})\to\text{F}\equiv\text{F}$. |
| M1.2 | OK | B | $\|A\cup H\|=80-10=70 \implies \|A\cap H\|=52+44-70=26$; 2.º camino: $(52-x)+x+(44-x)+10=80 \implies x=26$. |
| M1.3 | OK | B | $\neg(p\lor\neg q)\land q \equiv (\neg p\land q)\land q \equiv \neg p\land q$; 2.º camino: tabla de verdad solo es $\text{V}$ en $(p,q)=(\text{F},\text{V})$. |
| M1.4 | OK | C | $\{3\}\in M \implies \{\{3\}\}\subset M$; 2.º camino: $3\notin M$ (descarta A y B) y $\|M\|=4$ (descarta D). |
| M1.5 | OK | A | $(75-35)+(60-35)=40+25=65$; 2.º camino: $\|F\cup T\|-\|F\cap T\|=(75+60-35)-35=65$. |
| M2.1 | OK | A | $i^{43}+i^{24}-i^{18}=i^3+i^0-i^2=-i+1-(-1)=2-i$; 2.º camino: $(i^2)^{21}i+(i^2)^{12}-(i^2)^9=2-i$. |
| M2.2 | OK | A | $(3-2i)(1+4i)=3+12i-2i-8i^2=11+10i$; 2.º camino: $(11+10i)/(1+4i)=3-2i$ y $\|z_1z_2\|^2=221=13\cdot 17$. |
| M2.3 | OK | A | $\dfrac{(5+i)(1+i)}{(1-i)(1+i)}=\dfrac{4+6i}{2}=2+3i$; 2.º camino: $(2+3i)(1-i)=2+i+3=5+i$. |
| M2.4 | OK | A | $\|6-8i\|=\sqrt{6^2+(-8)^2}=\sqrt{100}=10$; 2.º camino: $2\|3-4i\|=2\cdot 5=10$. |
| M2.5 | OK | A | $z\bar{z}=2^2+k^2=29 \implies k^2=25 \implies k=\pm 5$; 2.º camino: $(2\pm 5i)(2\mp 5i)=4+25=29$. |
| M3.1 | OK | A | $M=4000(1+0{,}06\cdot 3)=4000\cdot 1{,}18=4720$; 2.º camino: $I=240/\text{año}\times 3=720 \implies 4000+720=4720$. |
| M3.2 | OK | A | $t=\frac{8}{12}=\frac{2}{3}\text{ años} \implies C=\dfrac{600}{0{,}09\cdot\frac{2}{3}}=\dfrac{600}{0{,}06}=10\,000$; 2.º camino: $0{,}75\%/\text{mes}\times 8=6\% \implies 600/0{,}06=10\,000$. |
| M3.3 | OK | A | $M=5000(1+0{,}10)^2=5000\cdot 1{,}21=6050$; 2.º camino: año 1 $=5500$, año 2 $=5500+550=6050$. |
| M3.4 | OK | B | $250\cdot 0{,}80\cdot 0{,}90=200\cdot 0{,}90=180$; 2.º camino: descuento equivalente $28\%$, $250-70=180$. |
| M3.5 | OK | B | $I=C \implies C=C\cdot r\cdot 5 \implies r=\frac{1}{5}=20\%$; 2.º camino: con $C=100$, gana $20/\text{año} \implies 20\%$. |
| M4.1 | OK | B | $4\times 3\times 5=60$; 2.º camino: $4$ cirujanos $\times 15$ pares anestesiólogo-enfermero $=60$. |
| M4.2 | OK | B | $\binom{7}{3}=\dfrac{7\cdot 6\cdot 5}{3\cdot 2\cdot 1}=35$; 2.º camino: $\binom{7}{4}=\dfrac{840}{24}=35$. |
| M4.3 | OK | B | $\dfrac{5!}{2!}=\dfrac{120}{2}=60$; 2.º camino: $\binom{5}{2}\cdot 3!=10\cdot 6=60$. |
| M4.4 | OK | A | $T_{k=2}=\binom{5}{2}x^3\cdot 2^2=10\cdot 4\,x^3=40x^3$; 2.º camino: $(x^2+4x+4)(x^3+6x^2+12x+8)$ da $(12+24+4)x^3=40x^3$. |
| M4.5 | OK | A | Unidades $\in\{2,4\}$ ($2$), luego $4\cdot 3\cdot 2=24$; 2.º camino: $\frac{2}{5}$ de $V_5^3=60$ son pares $=24$. |
| M5.1 | OK | A | $\bar{x}=\frac{18+22+20+24+20+16}{6}=\frac{120}{6}=20$, moda $=20$ (aparece $2$ veces); 2.º camino: datos simétricos respecto a $20$. |
| M5.2 | OK | B | Ordenados $7,9,10,12,14,15 \implies \text{Me}=\frac{10+12}{2}=11$; 2.º camino: tachando extremos quedan $10$ y $12$, punto medio $11$. |
| M5.3 | OK | B | $\mu=5$, $\sigma^2=\frac{(-3)^2+(-1)^2+1^2+3^2}{4}=\frac{20}{4}=5$; 2.º camino: $\frac{4+16+36+64}{4}-5^2=30-25=5$. |
| M5.4 | OK | C | $\frac{40\cdot 65+65}{41}=\frac{41\cdot 65}{41}=65$; 2.º camino: la desviación del dato nuevo respecto a la media es $0$. |
| M5.5 | OK | C | $\frac{15}{50}\times 100\%=30\%$; 2.º camino: $15$ de $50$ equivale a $30$ de $100$. |
| M6.1 | OK | C | $V=\pi(3)^2(10)=90\pi\ \text{cm}^3$; 2.º camino: $A_b\approx 28{,}3\ \text{cm}^2\times 10\ \text{cm}\approx 283\ \text{cm}^3\approx 90\pi\ \text{cm}^3$. |
| M6.2 | OK | D | $V(2r)=\frac{4}{3}\pi(2r)^3=8V(r)$; 2.º camino: en 3D escalar longitudes por $k=2$ multiplica volúmenes por $2^3=8$. |
| M6.3 | OK | B | $a\sqrt{2}=4\sqrt{2}\implies a=4\ \text{cm}$, $A_T=6(4)^2=96\ \text{cm}^2$; 2.º camino: $A_{\text{cara}}=\frac{d^2}{2}=\frac{32}{2}=16 \implies 6\cdot 16=96\ \text{cm}^2$. |
| M6.4 | OK | A | $h=\sqrt{10^2-6^2}=8\ \text{cm}$, $V=\frac{1}{3}\pi(6)^2(8)=96\pi\ \text{cm}^3$; 2.º camino: $\frac{1}{3}V_{\text{cil}}=\frac{288\pi}{3}=96\pi\ \text{cm}^3$. |
| M6.5 | OK | B | $A_T=2(5\cdot 4+4\cdot 3+5\cdot 3)=2(47)=94\ \text{cm}^2$; 2.º camino: $A_L=2(5+4)\cdot 3=54$ más $2(5\cdot 4)=40 \implies 94\ \text{cm}^2$. |
| M7.1 | OK | B | $c=\sqrt{25-9}=4 \implies 2c=8$; 2.º camino: focos en $(\pm 4,0)$, distancia $4-(-4)=8$. |
| M7.2 | OK | B | $\frac{x^2}{25}+\frac{y^2}{9}=1 \implies a=5,c=4,e=\frac{4}{5}$; 2.º camino: $\sqrt{1-\frac{9}{25}}=\frac{4}{5}$. |
| M7.3 | OK | A | $a=4,b=3$ (horizontal) $\implies y=\pm\frac{3}{4}x$; 2.º camino: $\frac{x^2}{16}-\frac{y^2}{9}=0 \implies y=\pm\frac{3}{4}x$. |
| M7.4 | OK | B | Término positivo en $y \implies a^2=36,a=6 \implies 2a=12$; 2.º camino: vértices $(-1,8)$ y $(-1,-4)$, distancia $12$. |
| M7.5 | OK | B | Foco $(0,3)\implies$ vertical, $c=3,a=5 \implies b^2=25-9=16 \implies \frac{x^2}{16}+\frac{y^2}{25}=1$; 2.º camino: $\sqrt{25-16}=3$ sobre eje $Y$. |
| M8.1 | OK | C | $\lim_{x\to 3}\frac{(x-3)(x+3)}{x-3}=3+3=6$; 2.º camino: L'Hôpital $\lim_{x\to 3}\frac{2x}{1}=6$. |
| M8.2 | OK | A | $f'(x)=12x^3-10x+7$; 2.º camino: $\int(12x^3-10x+7)\,dx=3x^4-5x^2+7x+C$. |
| M8.3 | OK | B | $y'=3x^2-2 \implies y'(2)=3(4)-2=10$; 2.º camino: $\frac{(2+h)^3-2(2+h)-4}{h}=10+6h+h^2\to 10$. |
| M8.4 | OK | B | $[x^3+x^2]_0^2=8+4=12$; 2.º camino: Simpson $\frac{2}{6}[0+4(5)+16]=12$. |
| M8.5 | OK | B | Razón de coeficientes principales $\frac{4}{2}=2$; 2.º camino: $2+\frac{3x+9}{2x^2-5}\to 2$. |
| F1.1 | OK | B | $0{,}04050$ tiene $4$ cifras significativas (`4`, `0`, `5`, `0`); 2.º camino: $4{,}050\times 10^{-2}\ \text{kg}$. |
| F1.2 | OK | A | $36\ \text{km/h} \div 3{,}6 = 10\ \text{m/s}$; 2.º camino: $36\cdot\frac{1000\ \text{m}}{3600\ \text{s}}=10\ \text{m/s}$. |
| F1.3 | OK | C | $5\ \text{mL}=5\ \text{cm}^3=5\times(10^{-2}\ \text{m})^3=5\times 10^{-6}\ \text{m}^3$; 2.º camino: $1\ \text{m}^3=10^6\ \text{mL}\implies 5/10^6=5\times 10^{-6}\ \text{m}^3$. |
| F1.4 | OK | B | $\frac{0{,}5\ \text{g}}{20{,}0\ \text{g}}\times 100\%=2{,}5\%$; 2.º camino: $2{,}5\%$ de $20{,}0\ \text{g}=0{,}5\ \text{g}$. |
| F1.5 | OK | C | $12{,}45+3{,}2+0{,}128=15{,}778\ \text{g}$, redondeado a $1$ decimal ($3{,}2$) $=15{,}8\ \text{g}$; 2.º camino: incertidumbre dominante en décimas. |
| F2.1 | OK | A | $\lambda=\frac{1500\ \text{m/s}}{2\times 10^6\ \text{Hz}}=7{,}5\times 10^{-4}\ \text{m}=0{,}75\ \text{mm}$; 2.º camino: $(2\times 10^6)(0{,}75\times 10^{-3})=1500\ \text{m/s}$. |
| F2.2 | OK | B | $f=\frac{1}{0{,}02\ \text{s}}=50\ \text{Hz}$; 2.º camino: $50\times 0{,}02=1$. |
| F2.3 | OK | B | $d=\frac{340\ \text{m/s}\times 1{,}6\ \text{s}}{2}=272\ \text{m}$; 2.º camino: tiempo de ida $0{,}8\ \text{s}$, $340\times 0{,}8=272\ \text{m}$. |
| F2.4 | OK | C | El ultrasonido es onda mecánica sonora (requiere medio material); 2.º camino: A, B y D son electromagnéticas. |
| F2.5 | OK | A | $f=\frac{3\times 10^8\ \text{m/s}}{600\times 10^{-9}\ \text{m}}=5\times 10^{14}\ \text{Hz}$; 2.º camino: $(5\times 10^{14})(6\times 10^{-7})=3\times 10^8\ \text{m/s}$. |
| F3.1 | OK | A | $1\cdot\text{sen}\,30^\circ=1{,}5\,\text{sen}\,\theta_2\implies\text{sen}\,\theta_2=\frac{0{,}5}{1{,}5}=\frac{1}{3}$; 2.º camino: $\theta_2<30^\circ\implies\text{sen}\,\theta_2<0{,}5$ (única opción $<0{,}5$). |
| F3.2 | OK | A | $v=\frac{3{,}00\times 10^8}{1{,}38}\approx 2{,}17\times 10^8\ \text{m/s}$; 2.º camino: $2{,}17\times 1{,}38\approx 2{,}995\approx 3{,}00$. |
| F3.3 | OK | A | $\frac{1}{d_i}=\frac{1}{10}-\frac{1}{30}=\frac{1}{15}\implies d_i=15\ \text{cm}$; 2.º camino: Newton $x_i=\frac{f^2}{d_o-f}=\frac{100}{20}=5\implies d_i=10+5=15\ \text{cm}$. |
| F3.4 | OK | B | $f=\frac{R}{2}=\frac{40\ \text{cm}}{2}=20\ \text{cm}$; 2.º camino: $R=2f=2(20)=40\ \text{cm}$. |
| F3.5 | OK | A | $f=\frac{1}{-2{,}5\ \text{D}}=-0{,}40\ \text{m}$; 2.º camino: lente divergente ($f<0$) y $(-2{,}5)(-0{,}40)=1$. |
| F4.1 | OK | B | $T_F=\frac{9}{5}(37)+32=66{,}6+32=98{,}6\,^\circ\text{F}$; 2.º camino: $\frac{5}{9}(98{,}6-32)=37\,^\circ\text{C}$. |
| F4.2 | OK | B | $\Delta T(\text{K})=\Delta T(^\circ\text{C})=2{,}5\ \text{K}$; 2.º camino: $(39{,}5+273{,}15)-(37+273{,}15)=2{,}5\ \text{K}$. |
| F4.3 | OK | B | $\Delta L=2\ \text{m}\cdot(1{,}5\times 10^{-5}\ ^\circ\text{C}^{-1})(100\,^\circ\text{C})=3{,}0\times 10^{-3}\ \text{m}=3{,}0\ \text{mm}$; 2.º camino: $1{,}5\times 10^{-3}\times 2000\ \text{mm}=3{,}0\ \text{mm}$. |
| F4.4 | OK | A | $Q=500\ \text{g}\cdot 1\cdot(80-20)=30\,000\ \text{cal}=30\ \text{kcal}$; 2.º camino: $0{,}5\ \text{kg}\cdot 1\cdot 60=30\ \text{kcal}$. |
| F4.5 | OK | A | $200(80-T_e)=300(T_e-30)\implies 5T_e=250\implies T_e=50\,^\circ\text{C}$; 2.º camino: $\frac{200(80)+300(30)}{500}=50\,^\circ\text{C}$. |
| F5.1 | OK | A | $F_{\text{mín}}(5\ \text{cm})=40\ \text{N}(30\ \text{cm})\implies F_{\text{mín}}=240\ \text{N}$; 2.º camino: razón de brazos $30/5=6\implies 6\cdot 40=240\ \text{N}$. |
| F5.2 | SIN_SOLUCION | — (ninguna; cuenta algebraica da $3{,}0\ \text{m}$ = C, pero excede la barra) | $60\ \text{N}\cdot 2\ \text{m}=40\ \text{N}\cdot x\implies x=3{,}0\ \text{m}$, pero la barra de $4\ \text{m}$ apoyada en su centro solo mide $2\ \text{m}$ hacia la derecha (torque máx. posible $=40\cdot 2=80<120\ \text{N}\cdot\text{m}$). |
| F5.3 | OK | A | $T\cos 37^\circ=100\ \text{N}\implies T=\frac{100}{0{,}8}=125\ \text{N}$; 2.º camino: $F_h=100\tan 37^\circ=75\ \text{N}$, $\sqrt{100^2+75^2}=125\ \text{N}$. |
| F5.4 | OK | B | $F=\frac{800\ \text{N}}{4}=200\ \text{N}$; 2.º camino: trabajo $F(4h)=800h\implies F=200\ \text{N}$. |
| F5.5 | OK | A | $F=600\ \text{N}\cdot\frac{1{,}5\ \text{m}}{5\ \text{m}}=180\ \text{N}$; 2.º camino: energía $F\cdot 5=600\cdot 1{,}5=900\ \text{J}\implies F=180\ \text{N}$. |
| F6.1 | OK | A | $F_c=0{,}02\cdot(100)^2\cdot 0{,}10=20\ \text{N}$; 2.º camino: $v=10\ \text{m/s}\implies \frac{0{,}02\cdot 100}{0{,}10}=20\ \text{N}$. |
| F6.2 | OK | B | $f_s=\frac{1000\cdot 20^2}{40}=10\,000\ \text{N}$; 2.º camino: $a_c=\frac{400}{40}=10\ \text{m/s}^2\implies 1000\cdot 10=10\,000\ \text{N}$. |
| F6.3 | OK | B | $F'=36/3^2=4\ \text{N}$; 2.º camino: $4\cdot 3^2=36\ \text{N}$. |
| F6.4 | AMBIGUA | — (falta masa de la estrella; si $M_\star=M_\odot$, da B = $8\ \text{años}$) | $T^2=\frac{4\pi^2}{GM_\star}r^3 \implies T=8\sqrt{M_\odot/M_\star}\ \text{años}$; el enunciado dice «su estrella» sin precisar $M_\star=M_\odot$ (ni decir «el Sol»). |
| F6.5 | OK | B | $r=R_T+R_T=2R_T\implies g=\frac{g_0}{2^2}=\frac{g_0}{4}$; 2.º camino: inverso del cuadrado al duplicar $r$. |
| F7.1 | OK | A | $J=100\cdot 0{,}05=5\ \text{N}\cdot\text{s}\implies v=\frac{5}{0{,}4}=12{,}5\ \text{m/s}$; 2.º camino: $a=\frac{100}{0{,}4}=250\ \text{m/s}^2\implies 250\cdot 0{,}05=12{,}5\ \text{m/s}$. |
| F7.2 | OK | A | $3(4)+1(0)=(3+1)v_f\implies v_f=3\ \text{m/s}$; 2.º camino: masa sube en factor $\frac{4}{3}$, rapidez baja a $\frac{3}{4}\cdot 4=3\ \text{m/s}$. |
| F7.3 | OK | A | $m$ iguales en choque elástico 1D intercambian velocidades: $v_1'=-2\ \text{m/s}$ ($2\ \text{m/s}$ izq.); 2.º camino: $v_{\text{CM}}=+2$, $2-(6-2)=-2\ \text{m/s}$. |
| F7.4 | OK | A | $4\,v_a=0{,}02\cdot 400=8\implies v_a=2\ \text{m/s}$; 2.º camino: razón de masas $4/0{,}02=200\implies 400/200=2\ \text{m/s}$. |
| F7.5 | OK | B | $e=\sqrt{\frac{1{,}44}{2{,}25}}=\frac{1{,}2}{1{,}5}=0{,}80$; 2.º camino: $e^2=0{,}64\implies e=0{,}80$. |
| F8.1 | OK | B | $P=1000\cdot 10\cdot 1{,}2=12\,000\ \text{Pa}$; 2.º camino: $1\ \text{m}$ agua $=10\,000\ \text{Pa}\implies 1{,}2\ \text{m}=12\,000\ \text{Pa}$. |
| F8.2 | OK | A | $F_2=50\cdot\frac{200}{5}=2000\ \text{N}$; 2.º camino: $P=\frac{50}{5\times 10^{-4}}=10^5\ \text{Pa}\implies F_2=10^5(0{,}02)=2000\ \text{N}$. |
| F8.3 | OK | B | $E=1000\cdot 10\cdot(2\times 10^{-3})=20\ \text{N}$; 2.º camino: $2\ \text{L}$ de agua $=2\ \text{kg}\implies$ peso $=20\ \text{N}$. |
| F8.4 | OK | B | $0{,}4(25)=0{,}2\,v_2\implies v_2=50\ \text{cm/s}$; 2.º camino: área a la mitad $\implies$ rapidez se duplica ($50\ \text{cm/s}$). |
| F8.5 | OK | B | $v=\sqrt{2(10)(5)}=\sqrt{100}=10\ \text{m/s}$; 2.º camino: $\frac{1}{2}v^2=gh=50\implies v=10\ \text{m/s}$. |
| F9.1 | OK | A | $F=(1{,}6\times 10^{-19})(2\times 10^6)(0{,}5)(1)=1{,}6\times 10^{-13}\ \text{N}$; 2.º camino: $(2\times 10^6)(0{,}5)=10^6$, por $1{,}6\times 10^{-19}=1{,}6\times 10^{-13}\ \text{N}$. |
| F9.2 | OK | B | $F=qvB\,\text{sen}\,0^\circ=0$; 2.º camino: producto vectorial de paralelos es $\vec{0}$. |
| F9.3 | OK | A | $F=4\cdot 0{,}5\cdot 0{,}3\cdot 1=0{,}6\ \text{N}$; 2.º camino: $4\cdot\frac{1}{2}\cdot\frac{3}{10}=\frac{6}{10}=0{,}6\ \text{N}$. |
| F9.4 | OK | B | $r=\frac{mv}{qB}\propto v\implies$ al duplicar $v$, $r$ se duplica; 2.º camino: $T=\frac{2\pi m}{qB}$ constante $\implies 2\pi r=vT$ se duplica. |
| F9.5 | OK | B | $B=\frac{\mu_0 I}{2\pi d}\implies B(2d)=\frac{B}{2}$; 2.º camino: circunferencia amperiana se duplica con igual $I \implies B/2$. |
| Q1.1 | OK | A | Nivel máximo $n=3$ (Periodo 3), electrones de valencia $3s^2 3p^4 \to 6$ (Grupo VIA / 16); 2.º camino: $Z=16$ ($\mathrm{S}$). |
| Q1.2 | OK | A | En el periodo 2 aumenta $Z_{\text{ef}}$ de izquierda a derecha, bajando el radio: $\mathrm{F}<\mathrm{C}<\mathrm{Li}$; 2.º camino: radios aprox. $64<77<152\ \text{pm}$. |
| Q1.3 | OK | C | En el periodo 3, el halógeno $\mathrm{Cl}$ (VIIA) tiene mayor electronegatividad que $\mathrm{Na},\mathrm{Al},\mathrm{S}$; 2.º camino: Pauling $\mathrm{Cl}=3{,}16$. |
| Q1.4 | OK | A | $\mathrm{Na^+}$ pierde $3s^1$ (pasa de 3 a 2 capas) con igual $Z=11$; 2.º camino: B, C y D afirman datos falsos. |
| Q1.5 | OK | B | Al bajar en un grupo crece $n$ y el apantallamiento, el $e^-$ externo está más lejos y cuesta menos arrancarlo; 2.º camino: Grupo IA $\mathrm{Li}>\mathrm{Na}>\mathrm{K}>\mathrm{Cs}$. |
| Q2.1 | OK | A | $K_c=\dfrac{[\mathrm{SO_3}]^2}{[\mathrm{SO_2}]^2[\mathrm{O_2}]}$ (todos gases, productos/reactivos a sus coeficientes); 2.º camino: unidades $\text{M}^{2-3}=\text{M}^{-1}$ y exponentes correctos. |
| Q2.2 | OK | B | $[\mathrm{H_2}]=[\mathrm{I_2}]=0{,}2\ \text{M}$, $[\mathrm{HI}]=0{,}8\ \text{M} \implies K_c=\frac{0{,}64}{0{,}04}=16$; 2.º camino: $\Delta n=0 \implies \frac{1{,}6^2}{0{,}4\cdot 0{,}4}=16$. |
| Q2.3 | OK | A | $4\ \text{mol gas} \rightleftharpoons 2\ \text{mol gas}$; mayor presión a $T$ cte. desplaza hacia menos moles de gas ($\mathrm{NH_3}$); 2.º camino: al duplicar conc., $Q_c=\frac{1}{4}K_c<K_c$. |
| Q2.4 | OK | B | $\Delta n_{\text{gas}}=1-0=1\implies K_p=K_c(RT)^1$; 2.º camino: $P_{\mathrm{CO_2}}=[\mathrm{CO_2}]RT$. |
| Q2.5 | OK | C | El catalizador baja por igual $E_a$ directa e inversa, acelera ambos sentidos igual y no altera $K_c$; 2.º camino: $\Delta G^\circ$ no cambia. |
| Q3.1 | OK | C | $[\mathrm{H^+}]=10^{-3}\ \text{M}\implies \text{pH}=3$; 2.º camino: $\text{pOH}=11 \implies [\mathrm{H^+}][\mathrm{OH^-}]=10^{-14}$. |
| Q3.2 | OK | B | $[\mathrm{OH^-}]=10^{-2}\ \text{M}\implies \text{pOH}=2\implies \text{pH}=14-2=12$; 2.º camino: $[\mathrm{H^+}]=10^{-12}\ \text{M}\implies\text{pH}=12$. |
| Q3.3 | OK | B | $\mathrm{H_2O}$ dona $\mathrm{H^+}$ (ácido) dejando $\mathrm{OH^-}$ (su base conjugada); 2.º camino: A y D invierten los roles, C no es par conjugado. |
| Q3.4 | OK | B | $\frac{10^{-7{,}1}}{10^{-7{,}4}}=10^{0{,}3}\approx 2$ (pH menor $\implies$ más ácido); 2.º camino: $\log_{10} 2\approx 0{,}301 \implies$ aumenta $\approx 2$ veces. |
| Q3.5 | OK | B | $0{,}2\cdot V_a=0{,}1\cdot 40\implies V_a=20\ \text{mL}$; 2.º camino: doble concentración del ácido ($1:1$) requiere mitad de volumen ($40/2=20\ \text{mL}$). |
| Q4.1 | OK | B | $\mathrm{CH_4}$ tiene 4 enlaces simples $\mathrm{C-H}$ (tetraédrico): hibridación $sp^3$ y $4$ enlaces $\sigma$; 2.º camino: 4 enlaces simples = $4\ \sigma$. |
| Q4.2 | OK | B | Alqueno acíclico (un doble enlace): $\mathrm{C}_n\mathrm{H}_{2n} \xrightarrow{n=5} \mathrm{C_5H_{10}}$; 2.º camino: 1-penteno $\mathrm{CH_2=CH-CH_2-CH_2-CH_3}$ tiene $\mathrm{C_5H_{10}}$. |
| Q4.3 | OK | B | Aldehído tiene grupo carbonilo terminal $-\mathrm{CHO}$; 2.º camino: A alcohol, C cetona, D ácido carboxílico. |
| Q4.4 | OK | B | Cadena de 3 C incluido $-\mathrm{COOH}$ (*prop-*) con función ácido carboxílico: ácido propanoico; 2.º camino: A 2 C, C cetona, D alcohol. |
| Q4.5 | OK | B | $\mathrm{H_2N-C(=O)-NH_2}$ tiene $\mathrm{C=O}$ unido directo a $\mathrm{N}$ (amida); 2.º camino: amina no tiene $\mathrm{C=O}$, nitrilo es $-\mathrm{C\equiv N}$, éster tiene $-\mathrm{C(=O)O-}$. |

## Resumen

- **Total revisadas:** 105 preguntas (M1–M8: 40; F1–F9: 45; Q1–Q4: 20).
- **OK:** **103** de 105.
- **No OK (2):**
  1. **F5.2 — `SIN_SOLUCION`:** La barra uniforme mide $4\ \text{m}$ y está apoyada en su centro, por lo que su brazo derecho máximo es $2\ \text{m}$. La ecuación de momentos ($60\cdot 2 = 40\cdot x$) da $x = 3{,}0\ \text{m}$ (clave C), punto que cae $1\ \text{m}$ fuera de la barra; con $40\ \text{N}$ en esa barra el equilibrio es físicamente imposible. *(Sugerencia de arreglo: hacer la barra de $6\ \text{m}$ o más, o cambiar el peso derecho a $80\ \text{N}$ para que dé $1{,}5\ \text{m}$).*
  2. **F6.4 — `AMBIGUA`:** El enunciado habla de un planeta alrededor de «su estrella» ($r = 4\ \text{UA}$), pero la 3.ª ley de Kepler depende de la masa de la estrella ($T^2 = \frac{4\pi^2}{GM_\star}r^3$). Falta especificar que la estrella tiene la misma masa que el Sol (o decir directamente «alrededor del Sol»); asumiendo $M_\star = M_\odot$, la respuesta sería **B ($8\ \text{años}$)**.

*(Nota de verificación: al estar la terminal bloqueada en este entorno de solo lectura, las 105 resoluciones y sus segundos caminos se verificaron analíticamente sin ejecutar `scripts/verificar-cuenta.py` ni abrir `4096.pdf` directamente.)*

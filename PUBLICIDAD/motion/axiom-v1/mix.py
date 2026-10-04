import numpy as np, wave
from warp import T_of_t, DUR
SR=44100; N=int(DUR*SR); rng=np.random.default_rng(7)
def lp(x,k):  # media movil como filtro pasabajos
    return np.convolve(x,np.ones(k)/k,mode='same')
def env(n,a,d): 
    t=np.arange(n)/SR; return np.minimum(t/a,1)*np.exp(-t/d)
def click(f=1800,d=.018):
    n=int(.12*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)*.6+rng.standard_normal(n)*.25)*env(n,.0008,d)
def pop(f=420,d=.05):
    n=int(.2*SR); t=np.arange(n)/SR
    return np.sin(2*np.pi*(f+f*1.2*np.exp(-t/.02))*t)*env(n,.001,d)
def whoosh(dur=.55):
    n=int(dur*SR); x=rng.standard_normal(n); t=np.linspace(0,1,n)
    y=lp(x,6)-lp(x,60)            # banda media
    y=y*np.sin(np.pi*t)**2
    return y/np.abs(y).max()
def chord(dur=3.2):
    n=int(dur*SR); t=np.arange(n)/SR; y=0
    for f,g in [(392,1),(493.9,.8),(587.3,.7),(784,.35)]:
        y=y+g*np.sin(2*np.pi*f*t)*(1+.002*np.sin(2*np.pi*5*t))
    e=np.minimum(t/.05,1)*np.exp(-t/1.1)*np.minimum((dur-t)/.5,1)
    return y*e/np.abs(y).max()
fx=np.zeros(N)
def put(t_anim,s,g):
    i=int(T_of_t(t_anim)*SR); s=s*g; m=min(len(s),N-i)
    if m>0: fx[i:i+m]+=s[:m]
for i in range(6): put(2.2+i*.7,click(1500+i*120),.35)           # tarjetas
put(6.2,whoosh(.7),.30)                                           # colapso al panel
for t in (7.6,12.8,16.4,19.6,24.8): put(t-.15,whoosh(.5),.22)    # transiciones
for i in range(4): put(9.4+i*.6,pop(380+i*60),.40)               # banners
put(15.0,pop(520),.45); put(18.6,click(2200),.35); put(18.9,pop(600),.35)
put(22.2,click(1200),.35)
for i in range(3): put(22.7+i*.7,click(1700),.28)
for k in range(14): put(25.0+k*.15,click(2400,.008),.12)         # contador
put(28.9,pop(300),.35); put(29.8,whoosh(.45),.28); put(29.9,pop(520),.5)
put(32.2,click(1400),.4); put(31.2,whoosh(.6),.25)
ch=chord(); i=int(T_of_t(31.2)*SR); m=min(len(ch),N-i); fx[i:i+m]+=ch[:m]*.30
fx=np.clip(fx,-1,1)
w=wave.open('../../audio/fx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((fx*32767*0.9).astype(np.int16).tobytes()); w.close()

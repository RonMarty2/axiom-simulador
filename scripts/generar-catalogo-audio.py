# -*- coding: utf-8 -*-
"""Genera src/lib/audio-medicina-catalogo.ts desde los MP3 reales de AUDIOS_MEDICINA_UMSS (solo lectura).

Uso: python scripts/generar-catalogo-audio.py
No modifica ningun MP3 ni toca docs/audio-bloques/.
"""
import glob
import json
import os
import re

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_AUDIO = os.path.join(
    REPO, "examenes pasados", "MEDICINA", "LIBROS DE MEDICINA", "AUDIOS_MEDICINA_UMSS"
)
SALIDA = os.path.join(REPO, "src", "lib", "audio-medicina-catalogo.ts")

# Mapeo oficial PSA 2027 (LISTA_CONTENIDOS_PSA2027.txt) -> slugs de BLOQUES_MEDICINA
MAPA = [
    # Morfofuncion (Saladin, 14 unidades, 20 capitulos PSA)
    ("morfofuncion-introduccion", "Saladin · Anatomía y Fisiología", "Capítulo 1 · Temas principales", True, "2_MORFOFISIOLOGIA", [("Morfo_Cap_01", "Cap. 1")]),
    ("histologia", "Saladin · Anatomía y Fisiología", "Capítulo 5 · Histología", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_05", "Cap. 5")]),
    ("sistema-tegumentario", "Saladin · Anatomía y Fisiología", "Capítulo 6 · El sistema tegumentario", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_06", "Cap. 6")]),
    ("sistema-esqueletico", "Saladin · Anatomía y Fisiología", "Capítulos 8 y 9 · Sistema óseo y articulaciones", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_08", "Cap. 8"), ("Morfo_Cap_09", "Cap. 9")]),
    ("sistema-muscular", "Saladin · Anatomía y Fisiología", "Capítulo 10 · El sistema muscular", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_10", "Cap. 10")]),
    ("sistema-nervioso", "Saladin · Anatomía y Fisiología", "Capítulos 13, 14 y 15 · Médula, encéfalo y autónomo", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_13", "Cap. 13"), ("Morfo_Cap_14", "Cap. 14"), ("Morfo_Cap_15", "Cap. 15")]),
    ("organos-sentidos", "Saladin · Anatomía y Fisiología", "Capítulo 16 · Órganos de los sentidos", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_16", "Cap. 16")]),
    ("sistema-endocrino", "Saladin · Anatomía y Fisiología", "Capítulo 17 · El sistema endocrino", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_17", "Cap. 17")]),
    ("sistema-cardiovascular", "Saladin · Anatomía y Fisiología", "Capítulos 18, 19 y 20 · Sangre, corazón y vasos", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_18", "Cap. 18"), ("Morfo_Cap_19", "Cap. 19"), ("Morfo_Cap_20", "Cap. 20")]),
    ("sistema-linfatico-inmune", "Saladin · Anatomía y Fisiología", "Capítulo 21 · Sistemas linfático e inmunitario", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_21", "Cap. 21")]),
    ("sistema-respiratorio", "Saladin · Anatomía y Fisiología", "Capítulo 22 · El aparato respiratorio", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_22", "Cap. 22")]),
    ("sistema-digestivo", "Saladin · Anatomía y Fisiología", "Capítulo 25 · El aparato digestivo", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_25", "Cap. 25")]),
    ("sistema-urinario", "Saladin · Anatomía y Fisiología", "Capítulo 23 · El aparato urinario", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_23", "Cap. 23")]),
    ("sistema-reproductor", "Saladin · Anatomía y Fisiología", "Capítulos 27 y 28 · Aparato reproductor", False, "2_MORFOFISIOLOGIA", [("Morfo_Cap_27", "Cap. 27"), ("Morfo_Cap_28", "Cap. 28")]),
    # Biologia Celular (Calvo, 8 slugs, 14 capitulos PSA)
    ("bcm-membrana-transporte", "Calvo · Biología Celular", "Capítulos 3 y 5 · Membrana plasmática y macrotransporte", True, "1_BIOLOGIA_CELULAR", [("Tema_03", "Cap. 3"), ("Tema_05", "Cap. 5")]),
    ("bcm-expresion-genica", "Calvo · Biología Celular", "Capítulos 7, 8 y 9 · Núcleo, transcripción y proteínas", False, "1_BIOLOGIA_CELULAR", [("Tema_07", "Cap. 7"), ("Tema_08", "Cap. 8"), ("Tema_09", "Cap. 9")]),
    ("bcm-bioenergetica-senalizacion", "Calvo · Biología Celular", "Capítulos 11 y 13 · Mitocondrias y señalización", False, "1_BIOLOGIA_CELULAR", [("Tema_11", "Cap. 11"), ("Tema_13", "Cap. 13")]),
    ("bases-celulares-vida", "Calvo · Biología Celular", "Capítulos 10, 14 y 15 · Endomembranas, ciclo y división", False, "1_BIOLOGIA_CELULAR", [("Tema_10", "Cap. 10"), ("Tema_14", "Cap. 14"), ("Tema_15", "Cap. 15")]),
    ("bio-citoesqueleto", "Calvo · Biología Celular", "Capítulo 12 · El citoesqueleto", False, "1_BIOLOGIA_CELULAR", [("Tema_12", "Cap. 12")]),
    ("bcm-especializaciones-membrana", "Calvo · Biología Celular", "Capítulo 6 · Especializaciones de la membrana", False, "1_BIOLOGIA_CELULAR", [("Tema_06", "Cap. 6")]),
    ("bcm-celulas-madre", "Calvo · Biología Celular", "Capítulo 18 · Las células madre", False, "1_BIOLOGIA_CELULAR", [("Tema_18", "Cap. 18")]),
    ("bcm-respuesta-inmunitaria", "Calvo · Biología Celular", "Capítulo 17 · Respuesta inmunitaria", False, "1_BIOLOGIA_CELULAR", [("Tema_17", "Cap. 17")]),
]

TILDES = {
    "Introduccion": "Introducción", "Ambito": "Ámbito", "Anatomia": "Anatomía", "Fisiologia": "Fisiología",
    "Origenes": "Orígenes", "Biomedica": "Biomédica", "Evolucion": "Evolución", "Metodo": "Método",
    "Cientifico": "Científico", "Hipotetico": "Hipotético", "Diseno": "Diseño", "Bipedestacion": "Bipedestación",
    "Jerarquia": "Jerarquía", "Variacion": "Variación", "Anatomica": "Anatómica", "Funcion": "Función",
    "Caracteristicas": "Características", "Fisiologica": "Fisiológica", "Retroalimentacion": "Retroalimentación",
    "Terminologia": "Terminología", "Raices": "Raíces", "Imagenes": "Imágenes", "Medicas": "Médicas",
    "Guia": "Guía", "Autoevaluacion": "Autoevaluación", "Historica": "Histórica", "Lipidos": "Lípidos",
    "Fosfogliceridos": "Fosfoglicéridos", "Asimetria": "Asimetría", "Lipidicas": "Lipídicas",
    "Proteinas": "Proteínas", "Perifericas": "Periféricas", "Cortex": "Córtex", "Glucocaliz": "Glucocálix",
    "Histologia": "Histología", "Epitelial": "Epitelial", "Glandulas": "Glándulas", "Oseo": "Óseo",
    "Osea": "Ósea", "Esqueleto": "Esqueleto", "Craneo": "Cráneo", "Torax": "Tórax", "Musculo": "Músculo",
    "Musculos": "Músculos", "Contraccion": "Contracción", "Medula": "Médula", "Encefalo": "Encéfalo",
    "Autonomo": "Autónomo", "Simpatico": "Simpático", "Parasimpatico": "Parasimpático", "Organos": "Órganos",
    "Oido": "Oído", "Vision": "Visión", "Hipotalamo": "Hipotálamo", "Hipofisis": "Hipófisis",
    "Glandula": "Glándula", "Pancreas": "Páncreas", "Corazon": "Corazón", "Cardiaco": "Cardíaco",
    "Circulacion": "Circulación", "Presion": "Presión", "Sanguinea": "Sanguínea", "Sanguineos": "Sanguíneos",
    "Linfatico": "Linfático", "Inmunidad": "Inmunidad", "Ventilacion": "Ventilación", "Respiracion": "Respiración",
    "Difusion": "Difusión", "Rinones": "Riñones", "Rinon": "Riñón", "Filtracion": "Filtración",
    "Reabsorcion": "Reabsorción", "Secrecion": "Secreción", "Digestion": "Digestión", "Absorcion": "Absorción",
    "Higado": "Hígado", "Estomago": "Estómago", "Testiculos": "Testículos", "Espermatogenesis": "Espermatogénesis",
    "Ovogenesis": "Ovogénesis", "Fecundacion": "Fecundación", "Nucleo": "Núcleo", "Nucleolo": "Nucléolo",
    "Transcripcion": "Transcripción", "Traduccion": "Traducción", "Sintesis": "Síntesis",
    "Modificacion": "Modificación", "Reticulo": "Retículo", "Endoplasmatico": "Endoplasmático",
    "Senalizacion": "Señalización", "Division": "División", "Celula": "Célula", "Celulas": "Células",
    "Cancer": "Cáncer", "Genetica": "Genética", "Acidos": "Ácidos", "Nucleicos": "Nucleicos",
    "Replicacion": "Replicación", "Reparacion": "Reparación", "Regulacion": "Regulación",
    "Adhesion": "Adhesión", "Comunicacion": "Comunicación", "Exocitosis": "Exocitosis",
    "Endocitosis": "Endocitosis", "Fagocitosis": "Fagocitosis", "Microtubulos": "Microtúbulos",
    "Dinamica": "Dinámica", "Mecanica": "Mecánica", "Quimica": "Química", "Electrica": "Eléctrica",
    "Acoplamiento": "Acoplamiento", "Oxidativa": "Oxidativa", "Fosforilacion": "Fosforilación",
    "Energia": "Energía", "Membranas": "Membranas", "Uniones": "Uniones", "Matriz": "Matriz",
    "Diferenciacion": "Diferenciación", "Terapeuticas": "Terapéuticas", "Embrionarias": "Embrionarias",
    "Tolerancia": "Tolerancia", "Presentacion": "Presentación", "Antigenos": "Antígenos",
    "Antigeno": "Antígeno", "Linfocitos": "Linfocitos", "Citocinas": "Citocinas",
    "Inflamacion": "Inflamación", "Patologia": "Patología", "Clinica": "Clínica",
    "Patologias": "Patologías", "Clinicas": "Clínicas", "Basica": "Básica", "Basicas": "Básicas",
    "Basico": "Básico", "Basicos": "Básicos", "Clasificacion": "Clasificación", "Organizacion": "Organización",
    "Interaccion": "Interacción", "Integracion": "Integración", "Degeneracion": "Degeneración",
    "Regeneracion": "Regeneración", "Maduracion": "Maduración", "Degradacion": "Degradación",
    "Eliminacion": "Eliminación", "Formacion": "Formación", "Produccion": "Producción",
    "Conduccion": "Conducción", "Transmision": "Transmisión", "Recepcion": "Recepción",
    "Percepcion": "Percepción", "Audicion": "Audición", "Olfacion": "Olfación", "Gustacion": "Gustación",
    "Localizacion": "Localización", "Orientacion": "Orientación", "Posicion": "Posición",
    "Region": "Región", "Regiones": "Regiones", "Pelvica": "Pélvica", "Toracica": "Torácica",
    "Vertebras": "Vértebras", "Articulacion": "Articulación", "Sinovial": "Sinovial",
    "Movil": "Móvil", "Moviles": "Móviles", "Estriado": "Estriado", "Esqueletico": "Esquelético",
    "Esqueletica": "Esquelética", "Plasmatica": "Plasmática", "Mitocondria": "Mitocondria",
    "Peroxisomas": "Peroxisomas", "Citoplasmatico": "Citoplasmático", "Genomica": "Genómica",
    "Epigenetica": "Epigenética", "Cromosomas": "Cromosomas", "Cromosoma": "Cromosoma",
    "Hematopoyesis": "Hematopoyesis", "Coagulacion": "Coagulación", "Hemostasia": "Hemostasia",
    "Eritrocitos": "Eritrocitos", "Leucocitos": "Leucocitos", "Plaquetas": "Plaquetas",
    "Vias": "Vías", "Via": "Vía", "Aereas": "Aéreas", "Aerea": "Aérea", "Alveolar": "Alveolar",
    "Hemodinamica": "Hemodinámica", "Electrocardiograma": "Electrocardiograma",
    "Mecanismos": "Mecanismos", "Hormonas": "Hormonas", "Tiroidea": "Tiroidea", "Suprarrenal": "Suprarrenal",
    "Neurotransmisores": "Neurotransmisores", "Sinapsis": "Sinapsis", "Potencial": "Potencial",
    "Accion": "Acción", "Reflejos": "Reflejos", "Nervios": "Nervios", "Craneales": "Craneales",
    "Raquideos": "Raquídeos", "Raquideo": "Raquídeo", "Espinal": "Espinal", "Periferico": "Periférico",
    "Somatico": "Somático", "Visceral": "Visceral", "Estres": "Estrés", "Liquido": "Líquido",
    "Liquidos": "Líquidos", "Acido": "Ácido", "Basico": "Básico", "Metabolismo": "Metabolismo",
    "Nutricion": "Nutrición", "Envejecimiento": "Envejecimiento", "Embarazo": "Embarazo",
    "Lactancia": "Lactancia", "Parto": "Parto", "Fisiopatologia": "Fisiopatología",
    "Abreviacion": "Abreviación", "Aproximacion": "Aproximación", "Aplicacion": "Aplicación",
    "Diagnostico": "Diagnóstico", "Microscopia": "Microscopía", "Microscopio": "Microscopio",
    "Tecnicas": "Técnicas", "Tecnica": "Técnica", "Bioquimica": "Bioquímica", "Bioquimico": "Bioquímico",
    "Quimico": "Químico", "Quimicos": "Químicos", "Fisico": "Físico", "Fisica": "Física",
    "Mecanico": "Mecánico", "Electrico": "Eléctrico", "Optica": "Óptica", "Termica": "Térmica",
    "Morfologia": "Morfología", "Embriologia": "Embriología", "Citologia": "Citología",
    "Proteomica": "Proteómica", "Bioenergetica": "Bioenergética", "Catabolismo": "Catabolismo",
    "Anabolismo": "Anabolismo", "Glucolisis": "Glucólisis", "Acido": "Ácido", "Citrico": "Cítrico",
    "Hidrofilico": "Hidrofílico", "Hidrofobico": "Hidrofóbico", "Anfipatico": "Anfipático",
    "Osmosis": "Ósmosis", "Ionico": "Iónico", "Ionicos": "Iónicos", "Ionica": "Iónica",
    "Canales": "Canales", "Bombas": "Bombas", "Transporte": "Transporte", "Vesiculas": "Vesículas",
    "Vesicula": "Vesícula", "Vesicular": "Vesicular", "Clatrina": "Clatrina", "Trafico": "Tráfico",
    "Secretora": "Secretora", "Lisosomas": "Lisosomas", "Autofagia": "Autofagia", "Apoptosis": "Apoptosis",
    "Necrosis": "Necrosis", "Mitosis": "Mitosis", "Meiosis": "Meiosis", "Interfase": "Interfase",
    "Checkpoints": "Puntos de control", "Proliferacion": "Proliferación", "Senescencia": "Senescencia",
    "Transduccion": "Transducción", "Senales": "Señales", "Senal": "Señal", "Cascadas": "Cascadas",
    "Receptores": "Receptores", "Ligandos": "Ligandos", "Quinasas": "Quinasas", "Fosfatasas": "Fosfatasas",
    "Calcio": "Calcio", "Sodio": "Sodio", "Potasio": "Potasio", "Oxigeno": "Oxígeno", "Dioxido": "Dióxido",
    "Hidrogeno": "Hidrógeno", "Nitrogeno": "Nitrógeno", "Fosforo": "Fósforo", "Azufre": "Azufre",
    "Sindrome": "Síndrome", "Piel": "Piel", "Epidermis": "Epidermis", "Dermis": "Dermis",
    "Hipodermis": "Hipodermis", "Melanina": "Melanina", "Queratina": "Queratina", "Uñas": "Uñas",
    "Unas": "Uñas", "Pelo": "Pelo", "Cicatrizacion": "Cicatrización", "Quemaduras": "Quemaduras",
    "Osificacion": "Osificación", "Remodelacion": "Remodelación", "Fracturas": "Fracturas",
    "Cartilago": "Cartílago", "Tendones": "Tendones", "Ligamentos": "Ligamentos",
    "Sarcolema": "Sarcolema", "Sarcomero": "Sarcómero", "Sarcomeros": "Sarcómeros",
    "Miofibrillas": "Miofibrillas", "Actina": "Actina", "Miosina": "Miosina",
    "Plastico": "Plástico", "Plasticidad": "Plasticidad", "Memoria": "Memoria", "Sueno": "Sueño",
    "Dolor": "Dolor", "Tacto": "Tacto", "Equilibrio": "Equilibrio", "Retina": "Retina",
    "Coclea": "Cóclea", "Vestibulo": "Vestíbulo", "Timpano": "Tímpano", "Cristalino": "Cristalino",
    "Cornea": "Córnea", "Nefrona": "Nefrona", "Glomerulo": "Glomérulo", "Glomerular": "Glomerular",
    "Tubulo": "Túbulo", "Tubulos": "Túbulos", "Tubular": "Tubular", "Miccion": "Micción",
    "Vejiga": "Vejiga", "Ureteres": "Uréteres", "Uretra": "Uretra", "Esofago": "Esófago",
    "Duodeno": "Duodeno", "Yeyuno": "Yeyuno", "Ileon": "Íleon", "Colon": "Colon", "Recto": "Recto",
    "Bilis": "Bilis", "Vesicula": "Vesícula", "Salivales": "Salivales", "Deglucion": "Deglución",
    "Peristalsis": "Peristalsis", "Enzimas": "Enzimas", "Enzimatica": "Enzimática",
    "Prostata": "Próstata", "Epididimo": "Epidídimo", "Utero": "Útero", "Ovarios": "Ovarios",
    "Ovario": "Ovario", "Ovulacion": "Ovulación", "Menstruacion": "Menstruación", "Ovarico": "Ovárico",
    "Uterino": "Uterino", "Placenta": "Placenta", "Embrion": "Embrión", "Feto": "Feto",
    "Gastrulacion": "Gastrulación", "Organogenesis": "Organogénesis", "Genoma": "Genoma",
    "Cromatina": "Cromatina", "Histonas": "Histonas", "Nucleosoma": "Nucleosoma",
    "Exones": "Exones", "Intrones": "Intrones", "Splicing": "Corte y empalme",
    "Ribosomas": "Ribosomas", "Ribosoma": "Ribosoma", "Codigo": "Código", "Codon": "Codón",
    "Anticodon": "Anticodón", "Plegamiento": "Plegamiento", "Chaperonas": "Chaperonas",
    "Glicosilacion": "Glicosilación", "Glucosilacion": "Glucosilación", "Ubiquitinacion": "Ubiquitinación",
    "Proteasoma": "Proteasoma", "Citocromo": "Citocromo", "Sintasa": "Sintasa",
    "Filamentos": "Filamentos", "Microfilamentos": "Microfilamentos", "Intermedios": "Intermedios",
    "Centrosoma": "Centrosoma", "Cilios": "Cilios", "Flagelos": "Flagelos", "Quinesina": "Quinesina",
    "Dineina": "Dineína", "Desmosomas": "Desmosomas", "Hemidesmosomas": "Hemidesmosomas",
    "Integrinas": "Integrinas", "Cadherinas": "Cadherinas", "Colageno": "Colágeno",
    "Elastina": "Elastina", "Fibronectina": "Fibronectina", "Laminina": "Laminina",
    "Proteoglicanos": "Proteoglicanos", "Hematopoyeticas": "Hematopoyéticas",
    "Mesenquimales": "Mesenquimales", "Pluripotentes": "Pluripotentes", "Totipotentes": "Totipotentes",
    "Multipotentes": "Multipotentes", "Reprogramacion": "Reprogramación", "Ingenieria": "Ingeniería",
    "Tejidos": "Tejidos", "Tejido": "Tejido", "Macrofagos": "Macrófagos", "Macrofago": "Macrófago",
    "Dendriticas": "Dendríticas", "Dendritica": "Dendrítica", "Neutrofilos": "Neutrófilos",
    "Eosinofilos": "Eosinófilos", "Basofilos": "Basófilos", "Monocitos": "Monocitos",
    "Anticuerpos": "Anticuerpos", "Inmunoglobulinas": "Inmunoglobulinas", "Complemento": "Complemento",
    "Timo": "Timo", "Bazo": "Bazo", "Ganglios": "Ganglios", "Medula": "Médula",
    "Autoinmunidad": "Autoinmunidad", "Hipersensibilidad": "Hipersensibilidad",
    "Inmunodeficiencia": "Inmunodeficiencia", "Vacunas": "Vacunas", "Vacunacion": "Vacunación",
}

MINUSCULAS = {"y", "e", "o", "u", "de", "del", "la", "las", "el", "los", "en", "con", "por", "para", "a", "al", "sus", "su", "entre", "sobre", "hacia", "sin"}


def limpiar_titulo(nombre_archivo: str, prefijo_cap: str, multi_cap: bool) -> str:
    stem = os.path.splitext(nombre_archivo)[0]
    m = re.match(r"^(?:Morfo_Cap_\d+|Tema_\d+)_P\d+_(.+)$", stem)
    crudo = m.group(1) if m else stem
    palabras = [p for p in crudo.split("_") if p]
    salida = []
    for i, p in enumerate(palabras):
        p_t = TILDES.get(p, p)
        if i > 0 and p_t.lower() in MINUSCULAS:
            salida.append(p_t.lower())
        elif i > 0 and not p_t.isupper() and len(p_t) > 1 and not re.match(r"^[IVXLCDM]+$", p_t):
            salida.append(p_t[0].lower() + p_t[1:])
        else:
            salida.append(p_t)
    titulo = " ".join(salida)
    if multi_cap:
        return f"{prefijo_cap} · {titulo}"
    return titulo


def main():
    catalogo = {}
    total_pistas = 0
    for slug, libro, capitulo, gratis, carpeta, prefijos in MAPA:
        multi = len(prefijos) > 1
        pistas = []
        numero = 1
        for pref, etiq_cap in prefijos:
            patron = os.path.join(BASE_AUDIO, carpeta, f"{pref}_P*.mp3")
            archivos = sorted(glob.glob(patron))
            if not archivos:
                raise SystemExit(f"FALTA MP3 para {slug} ({patron})")
            for ruta_abs in archivos:
                nombre = os.path.basename(ruta_abs)
                mb = round(os.path.getsize(ruta_abs) / (1024 * 1024), 1)
                pid = f"{slug}-{numero:02d}"
                pistas.append({
                    "id": pid,
                    "numero": numero,
                    "titulo": limpiar_titulo(nombre, etiq_cap, multi),
                    "rutaRelativa": f"{carpeta}/{nombre}",
                    "tamanoMb": mb,
                })
                numero += 1
        catalogo[slug] = {
            "slug": slug,
            "libro": libro,
            "capitulo": capitulo,
            "gratis": gratis,
            "pistas": pistas,
        }
        total_pistas += len(pistas)

    contenido = (
        '// Generado por scripts/generar-catalogo-audio.py desde los MP3 reales de AUDIOS_MEDICINA_UMSS.\n'
        '// No editar rutas a mano: volver a correr el generador si se suman capitulos nuevos.\n'
        'import type { AudiolibroUnidad } from "./audio-medicina.ts";\n\n'
        'export const AUDIOLIBROS_MEDICINA: Record<string, AudiolibroUnidad> = '
        + json.dumps(catalogo, ensure_ascii=False, indent=2)
        + ";\n"
    )
    with open(SALIDA, "w", encoding="utf-8", newline="\n") as f:
        f.write(contenido)
    print(f"Generado {SALIDA}: {len(catalogo)} unidades, {total_pistas} pistas.")


if __name__ == "__main__":
    main()

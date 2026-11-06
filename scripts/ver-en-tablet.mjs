// Abre la app en la red local para verla en el celular o la tablet de Ronald.
// Uso:  node scripts/ver-en-tablet.mjs [/ruta-opcional]
// Imprime las direcciones que se escriben en el navegador de la tablet (misma red WiFi).
// Si el servidor ya corre en el puerto 3001, no lo vuelve a arrancar.
import { spawn } from 'node:child_process'
import { networkInterfaces } from 'node:os'
import net from 'node:net'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

const PUERTO = 3001
const ruta = process.argv[2] ?? '/'

function direcciones() {
  const out = []
  for (const lista of Object.values(networkInterfaces())) {
    for (const i of lista ?? []) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address)
    }
  }
  return out
}

function puertoOcupado(p) {
  return new Promise((resolve) => {
    const s = net.connect(p, '127.0.0.1')
    s.once('connect', () => { s.destroy(); resolve(true) })
    s.once('error', () => resolve(false))
  })
}


// Tablet por depuración USB: reenvía el puerto, abre la ruta en el navegador de la tablet y guarda una captura.
// Uso extra:  node scripts/ver-en-tablet.mjs /ruta --usb   (captura en %TEMP%\axiom-tablet.png)
function buscarAdb() {
  const candidatos = [
    process.env.ADB_PATH,
    path.join(homedir(), 'Downloads', 'CARPETA_PARA_LLEVAR', 'CAPTURADOR', 'herramientas', 'scrcpy', 'adb.exe'),
    path.join(process.env.LOCALAPPDATA ?? '', 'Android', 'Sdk', 'platform-tools', 'adb.exe'),
    'adb',
  ].filter(Boolean)
  return candidatos.find((c) => c === 'adb' || existsSync(c))
}

function abrirPorUsb() {
  const adb = buscarAdb()
  try {
    const lista = execFileSync(adb, ['devices'], { encoding: 'utf8' })
    if (!/	device/.test(lista)) { console.log('No veo tablet por USB (activa la depuración USB y acepta la huella).'); return }
    execFileSync(adb, ['reverse', `tcp:${PUERTO}`, `tcp:${PUERTO}`])
    execFileSync(adb, ['shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-d', `http://localhost:${PUERTO}${ruta}`])
    console.log(`Tablet por USB: abierta http://localhost:${PUERTO}${ruta}`)
    const png = path.join(process.env.TEMP ?? '.', 'axiom-tablet.png')
    setTimeout(() => {
      try {
        const buf = execFileSync(adb, ['exec-out', 'screencap', '-p'], { maxBuffer: 50 * 1024 * 1024 })
        import('node:fs').then((fs) => { fs.writeFileSync(png, buf); console.log(`Captura de la tablet: ${png}`) })
      } catch (e) { console.log('No pude sacar captura:', e.message) }
    }, 8000)
  } catch (e) { console.log('USB no disponible:', e.message) }
}

function avisar() {
  console.log('\nEn la tablet o el celular (misma WiFi), abre el navegador y escribe:')
  for (const ip of direcciones()) console.log(`  http://${ip}:${PUERTO}${ruta}`)
  if (process.argv.includes('--usb')) abrirPorUsb()
  console.log('Si no abre: Windows pide permitir la red privada para Node la primera vez (di que sí).\n')
}

if (await puertoOcupado(PUERTO)) {
  console.log(`La app ya está corriendo en el puerto ${PUERTO}.`)
  avisar()
} else {
  avisar()
  const hijo = spawn('npx', ['next', 'dev', '-H', '0.0.0.0', '-p', String(PUERTO)], {
    stdio: 'inherit',
    shell: true,
  })
  hijo.on('exit', (c) => process.exit(c ?? 0))
}

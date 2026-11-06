// Abre la app en la red local para verla en el celular o la tablet de Ronald.
// Uso:  node scripts/ver-en-tablet.mjs [/ruta-opcional]
// Imprime las direcciones que se escriben en el navegador de la tablet (misma red WiFi).
// Si el servidor ya corre en el puerto 3001, no lo vuelve a arrancar.
import { spawn } from 'node:child_process'
import { networkInterfaces } from 'node:os'
import net from 'node:net'

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

function avisar() {
  console.log('\nEn la tablet o el celular (misma WiFi), abre el navegador y escribe:')
  for (const ip of direcciones()) console.log(`  http://${ip}:${PUERTO}${ruta}`)
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

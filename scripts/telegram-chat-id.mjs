// Ayuda para configurar los avisos de pago por Telegram (docs/avisos-telegram.md).
//
//   node scripts/telegram-chat-id.mjs <TOKEN_DEL_BOT>
//
// Antes: crear el bot con @BotFather y escribirle cualquier mensaje al bot.
// Esto busca ese mensaje, imprime el TELEGRAM_CHAT_ID que hay que cargar en
// Vercel, y manda un mensaje de prueba para confirmar que llega.
// El token se usa solo para hablar con Telegram: no se guarda en ningún archivo.

const token = process.argv[2];
if (!token) {
  console.error("Falta el token. Uso: node scripts/telegram-chat-id.mjs <TOKEN_DEL_BOT>");
  process.exit(1);
}

const api = (metodo, cuerpo) =>
  fetch(`https://api.telegram.org/bot${token}/${metodo}`, cuerpo ? {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo),
  } : undefined).then((r) => r.json());

const act = await api("getUpdates");
if (!act.ok) {
  console.error("Telegram no aceptó el token. Revisa que lo copiaste entero, sin espacios.");
  process.exit(1);
}
const mensajes = act.result.map((u) => u.message ?? u.channel_post).filter(Boolean);
if (mensajes.length === 0) {
  console.error("El bot no tiene mensajes todavía. Abre el bot en Telegram, escríbele 'hola' y vuelve a correr esto.");
  process.exit(1);
}
const chat = mensajes[mensajes.length - 1].chat;
console.log(`Chat encontrado: ${chat.first_name ?? chat.title ?? "(sin nombre)"}`);
console.log(`\nTELEGRAM_CHAT_ID = ${chat.id}\n`);

const prueba = await api("sendMessage", { chat_id: chat.id, text: "AXIOM: aviso de prueba. Si lees esto, los avisos de pago van a llegar acá." });
console.log(prueba.ok ? "Mensaje de prueba enviado: revisa tu Telegram." : "No se pudo mandar el mensaje de prueba.");

# Avisos de pago por Telegram

Cuando un alumno registra un pago, AXIOM le manda un mensaje a Ronald por Telegram con quién es, qué compró, cuánto, por qué método, la referencia, si adjuntó foto y el enlace para aprobarlo. Código: `src/lib/avisos.ts`.

Si Telegram falla o no está configurado, **el pago se registra igual**: solo se pierde el aviso.

## Cómo configurarlo (una sola vez, 10 minutos)

### 1. Crear el bot
1. En Telegram busca **@BotFather** (el que tiene la palomita azul) y ábrelo.
2. Escríbele `/newbot`.
3. Te pide un nombre (ej. `AXIOM Avisos`) y un usuario que termine en `bot` (ej. `axiom_avisos_bot`).
4. Te responde con un **token**: un texto largo con dos puntos, como `1234567890:AAH...`. Cópialo. **Es una contraseña: no lo pegues en chats ni lo subas a GitHub.**

### 2. Hablarle al bot
Busca tu bot por el usuario que le pusiste, ábrelo y escríbele `hola`. Sin esto, Telegram no le deja escribirte.

### 3. Obtener tu número de chat
En la carpeta del proyecto, en una terminal:

```bash
node scripts/telegram-chat-id.mjs PEGA_AQUI_TU_TOKEN
```

Imprime una línea `TELEGRAM_CHAT_ID = 123456789` y te manda un mensaje de prueba. Si te llega, la parte de Telegram está lista.

### 4. Cargar las dos variables en Vercel
1. Entra a vercel.com, abre el proyecto **axiom-simulador**.
2. **Settings** (arriba) → **Environment Variables** (menú de la izquierda).
3. Agrega dos:
   - Nombre `TELEGRAM_BOT_TOKEN`, valor: el token del paso 1.
   - Nombre `TELEGRAM_CHAT_ID`, valor: el número del paso 3.
   - En ambas deja marcado **Production** (y los otros entornos si quieres).
4. **Redeploy**: pestaña **Deployments** → los tres puntos del último deploy → **Redeploy**. Las variables nuevas solo se leen en un deploy nuevo.

### 5. Probar
Haz un pago de prueba como alumno (por ejemplo con RedotPay). Debe llegarte el aviso en unos segundos. Después puedes rechazar ese pago en `/admin/pagos`.

## Qué datos viajan a Telegram
El nombre del alumno, el plan, el monto, el método, la referencia y el enlace al panel. **No** viaja el correo ni la foto. La Política de Privacidad lo menciona.

## Si dejan de llegar
- ¿Siguen las dos variables en Vercel? (Si se borra una, los avisos se apagan en silencio.)
- ¿Cambiaste el token en BotFather? Hay que cargar el nuevo.
- Los errores quedan en los logs de Vercel con el prefijo `[avisos]` (solo el código de error, nunca el token).

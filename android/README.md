# AXIOM · App Android (TWA)

Esta carpeta es un proyecto de Android Studio normal. No es una reescritura
de la app — es un envoltorio nativo (Trusted Web Activity, la forma oficial
de Google de llevar una PWA a Android/Play Store) que abre
`axiom-simulador.vercel.app` dentro de una app instalable, sin barra de
navegador. La web sigue siendo la misma, en el mismo repo, sin cambios.

No se compiló ni se probó desde acá (la sandbox donde se armó este proyecto
tiene bloqueado el acceso a los servidores de Android/Google) — se compila
en tu máquina, como cualquier otro proyecto Android.

## 1. Probarla en tu celular (lo que querés hacer ya)

1. Abrí la carpeta `android/` en Android Studio (`File → Open`).
2. Dejá que sincronice Gradle (primera vez tarda, baja dependencias).
3. Conectá el celular por USB con depuración habilitada (igual que en tu
   app de control remoto).
4. Run ▶ — se instala y abre sola.

En este punto puede aparecer con una barra de direcciones arriba (antes de
verificar el dominio, ver paso 3 abajo) — igual la app funciona 100%, es
solo estético.

## 2. Cambiar el ícono real (2 minutos, opcional)

El ícono que dejé (`res/mipmap-*/ic_launcher*.png`) es un placeholder
generado a las apuradas, con los colores de AXIOM. Para poner el logo
real: click derecho en `res` → `New` → `Image Asset` en Android Studio, y
seguís el asistente con el logo.

## 3. Sacar la barra de direcciones (verificación de dominio)

Esto requiere la llave de firma (ver paso 4), así que va DESPUÉS de tener
un build firmado:

1. Sacá el SHA-256 de tu keystore de firma:
   - Si usás Play App Signing (recomendado, ver paso 4): Play Console →
     tu app → `Configuración` → `Integridad de la app` → copiás el
     `SHA-256` de "Certificado de firma de la app".
   - Si querés el de tu keystore local antes de subir nada:
     `keytool -list -v -keystore tu-archivo.jks` (te lo pide Android
     Studio al generar el keystore, ver paso 4).
2. Pegá ese SHA-256 en DOS lugares (tienen que decir lo mismo):
   - `android/app/src/main/res/values/strings.xml` (campo
     `sha256_cert_fingerprints` dentro de `asset_statements`)
   - `public/.well-known/assetlinks.json`, en el repo principal (no en
     `android/`) — esto se sube a Vercel con el resto de la web, es lo que
     verifica el dominio del lado del servidor.
3. Verificá que quedó bien en:
   `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://axiom-simulador.vercel.app&relation=delegate_permission/common.handle_all_urls`
   (tiene que devolver tu app en la lista).

## 4. Publicar en Play Store

1. Cuenta de Google Play Console (pago único de USD 25, si todavía no la
   tenés).
2. En Android Studio: `Build → Generate Signed Bundle / APK` → `Android App
   Bundle` → creás un keystore NUEVO ahí mismo (te pide dónde guardarlo y
   una contraseña).
   **Guardá ese archivo `.jks` y la contraseña en un lugar seguro y con
   backup (gestor de contraseñas, disco aparte). Si lo perdés, no podés
   volver a actualizar la app con el mismo listado en Play Store — hay que
   empezar de cero.**
3. Subís el `.aab` generado a Play Console, completás la ficha de la app
   (capturas, descripción, clasificación de contenido, política de
   privacidad — Play Console te va guiando).
4. Con Play App Signing activado (Google gestiona la llave final), sacás el
   SHA-256 desde ahí y hacés el paso 3 de arriba.

## Cosas que NO cambian con esto

- La web en `axiom-simulador.vercel.app` sigue andando exactamente igual.
- No hay que mantener dos versiones del contenido — la app Android muestra
  la misma web en vivo. Un deploy a `main` actualiza la web Y la app al
  mismo tiempo (no hace falta re-publicar el APK para cambios de
  contenido/UI — solo para cambiar cosas del propio proyecto Android, como
  el ícono).

# Configuración de Google Auth en Supabase

Para permitir que los usuarios inicien sesión con Google, necesitas configurar un proyecto en Google Cloud y conectar las credenciales en Supabase.

## Paso 1: Obtener la URL de Callback de Supabase
1. Ve a tu Dashboard de Supabase -> **Authentication** -> **Providers**.
2. Despliega la opción **Google**.
3. Copia la **Callback URL** (se ve algo como `https://<tu-proyecto>.supabase.co/auth/v1/callback`).
4. Déjala a mano, la necesitarás en el paso 3.

## Paso 2: Crear Proyecto en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un **Nuevo Proyecto** (nómbralo "Veroni Kite").
3. Ve a **APIs & Services** -> **OAuth consent screen**.
4. Selecciona **External** y dale a "Create".
5. Llena los datos básicos:
   - **App Name**: Veroni Kite
   - **User support email**: Tu email
   - **Developer contact information**: Tu email
6. Dale a "Save and Continue" en las siguientes pantallas (no necesitas scopes especiales por ahora).

## Paso 3: Crear Credenciales
1. Ve a **APIs & Services** -> **Credentials**.
2. Dale a **+ CREATE CREDENTIALS** -> **OAuth client ID**.
3. En "Application type" selecciona **Web application**.
4. En "Name" por "Veroni Kite Web".
5. En **Authorized request APIs** (si te pide), ignora por ahora.
6. En **Authorized JavaScript origins**:
   - Agrega `http://localhost:3000` (para desarrollo).
   - Agrega `https://<tu-proyecto>.supabase.co` (la URL base de tu proyecto Supabase).
   - (Más tarde agregarás tu dominio de producción aquí).
7. En **Authorized redirect URIs**:
   - **Pega la Callback URL que copiaste de Supabase en el Paso 1.**
8. Dale a "Create".

## Paso 4: Conectar en Supabase
1. Al crear las credenciales, Google te mostrará:
   - **Client ID**
   - **Client Secret**
2. Vuelve al Dashboard de Supabase -> **Authentication** -> **Providers** -> **Google**.
3. Pega el **Client ID** y el **Client Secret** en sus campos correspondientes.
4. Activa el toggle de "Enable Sign in with Google".
5. Dale a "Save".

¡Listo! Ahora el botón "Continuar con Google" en el login debería funcionar.

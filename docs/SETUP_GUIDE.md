# 🛠️ Guía de Configuración — EnglishUp

Esta guía te lleva paso a paso por la configuración completa del proyecto, desde cero hasta tener la app funcionando en producción.

---

## 📋 Resumen de Cuentas Necesarias

| Servicio | Propósito | Costo |
|----------|-----------|-------|
| [GitHub](https://github.com) | Repositorio del código | Gratis |
| [Supabase](https://supabase.com) | Autenticación + Base de datos | Gratis (plan Free) |
| [Resend](https://resend.com) | Envío de emails transaccionales | Gratis (hasta 3,000 emails/mes) |
| [Cloudflare](https://cloudflare.com) | Hosting + Dominio + DNS | Gratis (Pages) + Costo del dominio |
| [Google Cloud](https://console.cloud.google.com) | OAuth (Login con Google) | Gratis |

---

## 1️⃣ GitHub — Repositorio

### Crear el repositorio

1. Ve a [https://github.com/new](https://github.com/new)
2. Nombre del repositorio: `EnglishUp`
3. Visibilidad: Público o Privado (a tu preferencia)
4. Haz clic en **"Create repository"**

### Clonar y subir el proyecto

```bash
git clone https://github.com/TU_USUARIO/EnglishUp.git
cd EnglishUp
npm install
npm run dev    # Para desarrollo local
npm run build  # Para producción
```

---

## 2️⃣ Supabase — Autenticación y Base de Datos

### A. Crear proyecto

1. Ve a [https://supabase.com](https://supabase.com) → Inicia sesión
2. Clic en **"New Project"**
3. Configurar:
   - **Organization**: Selecciona la tuya (o crea una nueva)
   - **Name**: `EnglishUp`
   - **Database Password**: Elige una contraseña segura (¡guárdala!)
   - **Region**: La más cercana a tus usuarios (ej: `South America - São Paulo`)
4. Clic en **"Create new project"**
5. Espera ~2 minutos

### B. Obtener credenciales (API Keys)

1. Ve a **Settings** (⚙️) → **API**
2. Copia estos dos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiI...`

> ⚠️ NUNCA compartas ni uses la `service_role key` en el frontend.

### C. Crear tablas (base de datos)

1. Ve a **SQL Editor** (barra lateral)
2. Clic en **"New query"**
3. Copia y pega todo el contenido de `supabase/schema.sql`
4. Clic en **"Run"** ▶️
5. Resultado esperado: ✅ "Success. No rows returned"

Esto crea:
- `profiles` — Datos del usuario (nombre, nivel, XP, racha)
- `user_progress` — Progreso por cada palabra/frase
- `quiz_results` — Historial de quizzes
- `daily_activity` — Actividad diaria (rachas)
- Políticas de seguridad RLS (cada usuario solo ve sus datos)
- Trigger para crear perfil automáticamente al registrarse

### D. Configurar autenticación por Email

1. Ve a **Authentication** → **Providers**
2. Verifica que **Email** esté habilitado
3. Asegúrate que:
   - ✅ "Enable Email Signup" → Activado
   - ✅ "Enable Email confirmations" → Activado

### E. Configurar autenticación con Google

1. Ve a **Authentication** → **Providers** → **Google** → Activar
2. Te pedirá:
   - **Client ID** (de Google Cloud)
   - **Client Secret** (de Google Cloud)
3. Pega los valores (ver sección de Google Cloud abajo)
4. Guarda

### F. Configurar URLs de redirección

1. Ve a **Authentication** → **URL Configuration**
2. Configurar:
   - **Site URL**: `https://englishup.raceclubhub.com`
   - **Redirect URLs** (agregar todas):
     - `https://englishup.raceclubhub.com/dashboard`
     - `https://englishup.raceclubhub.com/reset-password`
     - `http://localhost:5173/dashboard`
     - `http://localhost:5173/reset-password`

### G. Conectar SMTP (Resend) para emails bonitos

1. Ve a **Project Settings** (⚙️) → **Authentication** → **SMTP Settings**
2. Activa **"Enable Custom SMTP"**
3. Configurar:

| Campo | Valor |
|-------|-------|
| Host | `smtp.resend.com` |
| Port | `465` |
| Minimum interval | `60` |
| Username | `resend` |
| Password | Tu API Key de Resend (`re_...`) |
| Sender email | `noreply@raceclubhub.com` |
| Sender name | `EnglishUp` |

4. Clic en **"Save"**

---

## 3️⃣ Resend — Emails Transaccionales

### A. Crear cuenta y API Key

1. Ve a [https://resend.com](https://resend.com) → Crear cuenta
2. Ve a **"API Keys"** (barra lateral)
3. Clic en **"Create API Key"**
   - Name: `EnglishUp`
   - Permission: **Sending access**
4. Clic en **"Add"**
5. **Copia la API key** (solo se muestra una vez, guárdala bien)

### B. Verificar dominio

1. Ve a **"Domains"** → Clic en **"Add Domain"**
2. Escribe: `raceclubhub.com`
3. Resend te mostrará registros DNS que debes agregar en Cloudflare:

| Tipo | Nombre (Host) | Valor |
|------|---------------|-------|
| TXT | `_dmarc` | `v=DMARC1; p=none;` |
| CNAME | `resend._domainkey` | (valor que te da Resend) |
| TXT | `@` | `v=spf1 include:amazonses.com ~all` |
| MX | `@` | (valor que te da Resend) |

4. Agrega cada registro en Cloudflare DNS (ver sección Cloudflare)
5. Regresa a Resend y haz clic en **"Verify DNS"**
6. Espera 1-30 minutos hasta que aparezca ✅

> ⚠️ En Cloudflare, los registros de Resend deben tener la nube en **GRIS (DNS only)**, NO naranja (Proxied).

---

## 4️⃣ Google Cloud — OAuth (Login con Google)

### A. Crear proyecto

1. Ve a [https://console.cloud.google.com](https://console.cloud.google.com)
2. Crea un nuevo proyecto (o usa uno existente)
   - Nombre: `EnglishUp`
3. Selecciona el proyecto

### B. Configurar pantalla de consentimiento

1. Ve a **"APIs & Services"** → **"OAuth consent screen"**
2. User Type: **External**
3. Completa:
   - App name: `EnglishUp`
   - User support email: Tu email
   - Developer contact: Tu email
4. Scopes: Agrega `email` y `profile`
5. Guarda

### C. Crear credenciales OAuth

1. Ve a **"APIs & Services"** → **"Credentials"**
2. Clic en **"Create Credentials"** → **"OAuth client ID"**
3. Configurar:
   - Application type: **Web application**
   - Name: `EnglishUp`
   - Authorized JavaScript origins:
     - `https://englishup.raceclubhub.com`
     - `http://localhost:5173`
   - Authorized redirect URIs:
     - `https://TU_PROYECTO.supabase.co/auth/v1/callback`
       (reemplaza con tu URL de Supabase)
4. Clic en **"Create"**
5. Copia el **Client ID** y **Client Secret**
6. Pégalos en Supabase → Authentication → Providers → Google

### D. Publicar la app (importante)

1. Ve a **"OAuth consent screen"**
2. Clic en **"Publish App"** (cambiar de Testing a Production)
3. Esto permite que cualquier persona use Google Login

> Sin publicar, solo las cuentas de prueba que agregues manualmente podrán iniciar sesión.

---

## 5️⃣ Cloudflare — Hosting y DNS

### A. Agregar registros DNS de Resend

1. Ve a [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecciona tu dominio `raceclubhub.com`
3. Ve a **"DNS"** → **"Records"**
4. Agrega los registros que Resend te indicó (ver sección Resend)
5. **Importante**: Proxy status = **DNS only** (nube gris ☁️) para todos los registros de Resend

### B. Crear proyecto en Cloudflare Pages

1. Ve a **"Workers & Pages"** (barra lateral)
2. Clic en **"Create application"** (botón azul)
3. Selecciona la pestaña **"Pages"** (si aparece)
   - O busca **"Connect to Git"** / **"Import a Git repository"**
4. Conecta GitHub → Selecciona `EnglishUp`
5. Configurar build:

| Campo | Valor |
|-------|-------|
| Project name | `englishup` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

6. Expandir **"Environment variables"** y agregar:

| Variable | Valor |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Tu anon key de Supabase |
| `VITE_APP_URL` | `https://englishup.raceclubhub.com` |

7. Clic en **"Save and Deploy"**
8. Espera ~1-2 minutos

### C. Configurar subdominio personalizado

1. En tu proyecto de Pages → **"Custom domains"**
2. Clic en **"Set up a custom domain"**
3. Escribe: `englishup.raceclubhub.com`
4. Clic en **"Continue"** → **"Activate domain"**
5. Cloudflare crea el CNAME automáticamente
6. Espera ~5 minutos para SSL

### D. Verificar

- Visita: **https://englishup.raceclubhub.com** ✅
- El deploy automático se activa con cada push a `main`

---

## 6️⃣ Variables de Entorno — Resumen

### Archivo `.env` (local, NO se sube a Git)

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
VITE_APP_URL=http://localhost:5173
```

### Cloudflare Pages (producción)

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
VITE_APP_URL=https://englishup.raceclubhub.com
```

---

## 🔄 Flujo de Deploy Automático

```
Tu código → Push a GitHub (main) → Cloudflare detecta → Build automático → Live en tu dominio
```

No necesitas hacer nada manual después del setup inicial.

---

## 🆘 Solución de Problemas Comunes

| Problema | Solución |
|----------|----------|
| Login no funciona | Verificar que las URLs de redirección en Supabase incluyan tu dominio |
| Emails no llegan | Verificar SMTP en Supabase y que el dominio esté verificado en Resend |
| Google Login falla | Verificar redirect URI en Google Cloud y que la app esté publicada |
| Error 404 en rutas | Verificar que el archivo `public/_redirects` existe con `/* /index.html 200` |
| Build falla en Cloudflare | Verificar variables de entorno en Cloudflare Pages |
| DNS no verifican | Asegurarse que los registros estén en DNS Only (nube gris) en Cloudflare |

---

## 📌 Links Rápidos de Administración

| Servicio | URL |
|----------|-----|
| GitHub Repo | https://github.com/Nancyms1012/EnglishUp |
| Supabase Dashboard | https://supabase.com/dashboard |
| Resend Dashboard | https://resend.com/domains |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Google Cloud Console | https://console.cloud.google.com/apis/credentials |
| App en Producción | https://englishup.raceclubhub.com |

---

## 📝 Notas Importantes

- **La anon key de Supabase es pública** — es seguro usarla en el frontend
- **La service_role key NUNCA debe exponerse** — solo para backend/admin
- **La API Key de Resend** — es secreta, solo va en Supabase SMTP settings
- **Google Client Secret** — es secreto, solo va en Supabase Google provider settings
- **El proyecto de Supabase se puede transferir** a otra organización desde Settings → Transfer Project

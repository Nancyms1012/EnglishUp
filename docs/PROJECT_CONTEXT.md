# 📖 Contexto del Proyecto — EnglishUp

## 🎯 Objetivo

App web progresiva (PWA) para aprender inglés de forma interactiva, dirigida a hispanohablantes con nivel básico. Preparada para escalar a otros idiomas (Francés, Italiano, Portugués, Alemán).

---

## 🏗️ Arquitectura Técnica

### Stack Principal

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.x | Frontend / UI |
| Vite | 6.x | Build tool / Dev server |
| Tailwind CSS | 4.x | Estilos (via @tailwindcss/vite) |
| Supabase | - | Auth + Base de datos PostgreSQL |
| Resend | - | Emails transaccionales (SMTP) |
| Cloudflare Pages | - | Hosting + CDN + SSL |
| Web Speech API | Nativa | Pronunciación (TTS) + Reconocimiento de voz (STT) |

### Dependencias principales (`package.json`)

- `react-router-dom` — Enrutamiento SPA
- `@supabase/supabase-js` — Cliente Supabase
- `lucide-react` — Íconos

---

## 📁 Estructura del Proyecto

```
EnglishUp/
├── public/
│   ├── _redirects          # SPA routing para Cloudflare Pages
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service Worker (cache offline)
│   └── icons/              # Íconos PWA (192x192, 512x512)
├── src/
│   ├── main.jsx            # Entry point
│   ├── App.jsx             # Router + Providers
│   ├── index.css           # Tailwind + custom utilities
│   ├── components/
│   │   ├── Layout.jsx      # Sidebar + header (rutas protegidas)
│   │   ├── ProtectedRoute.jsx  # Guard de autenticación
│   │   ├── LevelUpModal.jsx    # Modal animado al subir de nivel
│   │   └── XPNotification.jsx  # Toast de "+X XP"
│   ├── context/
│   │   ├── AuthContext.jsx     # Estado de autenticación (Supabase)
│   │   └── ProgressContext.jsx # Estado de progreso (XP, niveles, rachas)
│   ├── data/
│   │   └── vocabulary.js   # Base de datos de vocabulario + frases + textos
│   ├── lib/
│   │   ├── supabase.js     # Cliente Supabase configurado
│   │   └── constants.js    # Idiomas, categorías, niveles, XP config
│   └── pages/
│       ├── Landing.jsx     # Página pública de bienvenida
│       ├── Login.jsx       # Inicio de sesión (email + Google)
│       ├── Register.jsx    # Registro (email + Google)
│       ├── ForgotPassword.jsx  # Recuperar contraseña
│       ├── Dashboard.jsx   # Panel principal con stats y módulos
│       ├── Flashcards.jsx  # Tarjetas de vocabulario
│       ├── Quiz.jsx        # Quiz de opción múltiple
│       ├── Listening.jsx   # Ejercicios de escucha
│       ├── Writing.jsx     # Ejercicios de escritura
│       ├── Reading.jsx     # Lectura con comprensión
│       ├── Pronunciation.jsx  # Evaluación de pronunciación (micrófono)
│       └── Progress.jsx    # Estadísticas, logros, mapa de niveles
├── supabase/
│   └── schema.sql          # Esquema completo de base de datos
├── docs/
│   ├── SETUP_GUIDE.md      # Guía de configuración (este documento)
│   └── PROJECT_CONTEXT.md  # Contexto técnico (este documento)
├── .env.example            # Plantilla de variables de entorno
├── .gitignore              # Archivos excluidos de Git
├── vite.config.js          # Configuración de Vite
└── README.md               # README principal
```

---

## 🎮 Sistema de Progresión

### Niveles

| Nivel | Nombre | XP Requeridos |
|-------|--------|---------------|
| 1 | Principiante | 0 |
| 2 | Básico | 100 |
| 3 | Intermedio Bajo | 300 |
| 4 | Intermedio | 600 |
| 5 | Avanzado | 1,000 |

### Recompensas de XP

| Acción | XP |
|--------|-----|
| Flashcard correcta ("¡Lo sé!") | +5 |
| Quiz respuesta correcta | +10 |
| Escucha respuesta correcta | +10 |
| Escritura correcta | +10 |
| Pronunciación ≥ 70% similitud | +10 |
| Lectura respuesta correcta | +10 |

### Rachas

- Se cuenta un día como "activo" si el usuario gana al menos 1 XP
- La racha se rompe si pasa más de 1 día sin actividad
- Se guarda en `profiles.streak_days` y `profiles.last_active`

### Logros (12 total)

- Primera Lección, 50 XP, 100 XP, 300 XP, 1000 XP
- Racha de 3, 7, 30 días
- Nivel 2, 3, 4, 5

---

## 🗄️ Base de Datos (Supabase/PostgreSQL)

### Tablas

| Tabla | Propósito |
|-------|-----------|
| `profiles` | Perfil del usuario: nombre, nivel, XP, racha, última actividad |
| `user_progress` | Progreso individual por vocabulario (para repetición espaciada futura) |
| `quiz_results` | Historial de quizzes completados |
| `daily_activity` | Actividad por día (XP ganados, ejercicios, módulos usados) |

### Seguridad (RLS)

- Todas las tablas tienen **Row Level Security** activado
- Cada usuario solo puede ver/editar sus propios datos
- Un trigger automático crea el perfil cuando un usuario se registra

---

## 🔐 Autenticación

### Métodos soportados:
1. **Email + Contraseña** — Con confirmación por email (via Resend)
2. **Google OAuth** — Login con un clic

### Flujo:
1. Usuario se registra → Supabase crea el usuario → Trigger crea perfil → Email de confirmación (Resend)
2. Usuario confirma email → Puede iniciar sesión
3. Al iniciar sesión → `AuthContext` actualiza el estado → Rutas protegidas se desbloquean

---

## 🌍 Multi-idioma (Preparación Futura)

El vocabulario está estructurado para soportar múltiples idiomas:

```javascript
{
  id: 1,
  es: 'Hola',                    // Español (idioma base del usuario)
  translations: {
    en: 'Hello',                  // Inglés ✅ (activo)
    fr: 'Bonjour',               // Francés (futuro)
    it: 'Ciao',                   // Italiano (futuro)
    pt: 'Olá',                    // Portugués (futuro)
    de: 'Hallo',                  // Alemán (futuro)
  },
  category: 'greetings',
  level: 1,
  example: { en: '...', es: '...' }
}
```

Para activar un nuevo idioma:
1. Cambiar `available: true` en `src/lib/constants.js` → `LANGUAGES`
2. Agregar selector de idioma en la UI
3. Usar `translations[selectedLanguage]` en lugar de `translations.en`

---

## 📱 PWA (Progressive Web App)

- **Manifest**: `public/manifest.json` — nombre, colores, íconos
- **Service Worker**: `public/sw.js` — cache network-first
- **Instalable**: Los usuarios pueden agregar a pantalla de inicio en Android/iOS

---

## 📦 Contenido Actual

### Vocabulario: 40 palabras/frases
- 10 categorías: Saludos, Comida, Viajes, Trabajo, Tecnología, Compras, Salud, Entretenimiento, Familia, Naturaleza
- 3 niveles de dificultad por palabra
- Traducciones a 5 idiomas incluidas

### Frases del día: 31 frases motivacionales

### Textos de lectura: 3 textos
- Nivel 1: "My Family", "At the Restaurant"
- Nivel 2: "A Day at Work"

---

## 🔮 Posibles Mejoras Futuras

- [ ] Más vocabulario (objetivo: 500+ palabras)
- [ ] Más textos de lectura por nivel
- [ ] Sistema de repetición espaciada (SRS) para flashcards
- [ ] Activar idiomas adicionales (FR, IT, PT, DE)
- [ ] Notificaciones push (recordatorio diario)
- [ ] Tabla de clasificación (leaderboard)
- [ ] Modo oscuro
- [ ] Estadísticas detalladas por categoría
- [ ] Ejercicios de gramática
- [ ] Integración con IA para conversaciones

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build local
npm run preview

# Ver el build generado
ls dist/
```

---

## 👤 Información del Proyecto

- **Repositorio**: https://github.com/Nancyms1012/EnglishUp
- **Producción**: https://englishup.raceclubhub.com
- **Dominio**: `raceclubhub.com` (Cloudflare)
- **Subdominio**: `englishup.raceclubhub.com`
- **Supabase Project**: `weeorotirsztgbbbsxqg`

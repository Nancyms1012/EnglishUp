# 🎓 EnglishUp

Aprende inglés de forma divertida e interactiva. Una Progressive Web App (PWA) construida con React.

## ✨ Funcionalidades

- 📚 **Flashcards** — Tarjetas de vocabulario español ↔ inglés con pronunciación
- 🧠 **Quizzes** — Ejercicios de opción múltiple por categorías
- 👂 **Escucha** — Comprensión auditiva con diferentes velocidades
- ✍️ **Escritura** — Practica escribiendo traducciones
- 📖 **Lectura** — Textos con preguntas de comprensión
- 💬 **Frase del Día** — Una frase motivacional nueva cada día
- 📊 **Progreso** — Seguimiento de tu avance y logros
- 🌍 **Multi-idioma** — Preparado para Francés, Italiano, Portugués y Alemán

## 🛠️ Tecnologías

- **React** + **Vite** — Frontend rápido y moderno
- **Tailwind CSS** — Estilos responsive
- **Supabase** — Autenticación y base de datos
- **Resend** — Emails transaccionales
- **Cloudflare Pages** — Hosting
- **PWA** — Instalable como app nativa

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Nancyms1012/EnglishUp.git
cd EnglishUp

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

## 📱 Instalar en celular

1. Abre la app en Chrome/Safari en tu celular
2. Toca "Agregar a pantalla de inicio"
3. ¡Listo! La app aparecerá como un ícono

## 🌐 Deploy en Cloudflare Pages

1. Conecta tu repositorio de GitHub en Cloudflare Pages
2. Configura: Build command = `npm run build`, Output = `dist`
3. Agrega las variables de entorno
4. ¡Deploy automático con cada push!

## 📄 Licencia

MIT

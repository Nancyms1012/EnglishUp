// Idiomas soportados - preparado para expansión futura
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nameEs: 'Inglés',
    flag: '🇬🇧',
    available: true,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nameEs: 'Francés',
    flag: '🇫🇷',
    available: false,
  },
  it: {
    code: 'it',
    name: 'Italian',
    nameEs: 'Italiano',
    flag: '🇮🇹',
    available: false,
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nameEs: 'Portugués',
    flag: '🇵🇹',
    available: false,
  },
  de: {
    code: 'de',
    name: 'German',
    nameEs: 'Alemán',
    flag: '🇩🇪',
    available: false,
  },
}

export const DIFFICULTY_LEVELS = {
  beginner: { label: 'Principiante', color: 'green', maxLevel: 10 },
  basic: { label: 'Básico', color: 'blue', maxLevel: 20 },
  intermediate: { label: 'Intermedio', color: 'yellow', maxLevel: 30 },
  advanced: { label: 'Avanzado', color: 'red', maxLevel: 50 },
}

export const CATEGORIES = [
  { id: 'greetings', name: 'Saludos', nameEn: 'Greetings', icon: '👋' },
  { id: 'food', name: 'Comida', nameEn: 'Food & Restaurants', icon: '🍕' },
  { id: 'travel', name: 'Viajes', nameEn: 'Travel', icon: '✈️' },
  { id: 'work', name: 'Trabajo', nameEn: 'Work & Office', icon: '💼' },
  { id: 'technology', name: 'Tecnología', nameEn: 'Technology', icon: '💻' },
  { id: 'shopping', name: 'Compras', nameEn: 'Shopping', icon: '🛍️' },
  { id: 'health', name: 'Salud', nameEn: 'Health', icon: '🏥' },
  { id: 'entertainment', name: 'Entretenimiento', nameEn: 'Entertainment', icon: '🎬' },
  { id: 'family', name: 'Familia', nameEn: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'nature', name: 'Naturaleza', nameEn: 'Nature', icon: '🌿' },
]

export const XP_PER_CORRECT = 10
export const XP_PER_LEVEL = 100
export const STREAK_BONUS = 5

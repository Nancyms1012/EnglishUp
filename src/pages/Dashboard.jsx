import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { 
  BookOpen, Brain, Headphones, PenTool, BookMarked, Mic,
  Flame, Trophy, Target, Sparkles 
} from 'lucide-react'
import { dailyPhrases } from '../data/vocabulary'

const modules = [
  { 
    path: '/flashcards', 
    label: 'Flashcards', 
    description: 'Aprende vocabulario con tarjetas',
    icon: BookOpen, 
    color: 'bg-blue-500',
    bgLight: 'bg-blue-50',
  },
  { 
    path: '/quiz', 
    label: 'Quiz', 
    description: 'Pon a prueba tu conocimiento',
    icon: Brain, 
    color: 'bg-purple-500',
    bgLight: 'bg-purple-50',
  },
  { 
    path: '/listening', 
    label: 'Escucha', 
    description: 'Mejora tu comprensión auditiva',
    icon: Headphones, 
    color: 'bg-green-500',
    bgLight: 'bg-green-50',
  },
  { 
    path: '/writing', 
    label: 'Escritura', 
    description: 'Practica escribiendo en inglés',
    icon: PenTool, 
    color: 'bg-orange-500',
    bgLight: 'bg-orange-50',
  },
  { 
    path: '/reading', 
    label: 'Lectura', 
    description: 'Lee y comprende textos',
    icon: BookMarked, 
    color: 'bg-pink-500',
    bgLight: 'bg-pink-50',
  },
  { 
    path: '/pronunciation', 
    label: 'Pronunciación', 
    description: 'Evalúa y mejora tu pronunciación',
    icon: Mic, 
    color: 'bg-red-500',
    bgLight: 'bg-red-50',
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const today = new Date()
  const phraseOfDay = dailyPhrases[today.getDate() % dailyPhrases.length]
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Estudiante'

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 md:p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          ¡Hola, {userName}! 👋
        </h1>
        <p className="text-indigo-100 text-lg">
          ¡Sigue aprendiendo! Cada día cuenta.
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <Flame size={24} className="mx-auto mb-1" />
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs text-indigo-100">Racha</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <Trophy size={24} className="mx-auto mb-1" />
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs text-indigo-100">XP Total</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <Target size={24} className="mx-auto mb-1" />
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-indigo-100">Nivel</div>
          </div>
        </div>
      </div>

      {/* Phrase of the Day */}
      <div className="card border-l-4 border-l-yellow-400">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-yellow-500" />
          <h3 className="font-semibold text-gray-700">Frase del Día</h3>
        </div>
        <p className="text-xl font-medium text-gray-800 mb-1">
          "{phraseOfDay.en}"
        </p>
        <p className="text-gray-500 italic">
          "{phraseOfDay.es}"
        </p>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Módulos de Aprendizaje</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(({ path, label, description, icon: Icon, color, bgLight }) => (
            <Link
              key={path}
              to={path}
              className={`${bgLight} rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100`}
            >
              <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{label}</h3>
              <p className="text-gray-500 text-sm mt-1">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useAuth } from '../context/AuthContext'
import { Flame, Trophy, Target, Calendar, TrendingUp, Award } from 'lucide-react'

export default function Progress() {
  const { user } = useAuth()
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Estudiante'

  // TODO: Fetch real progress from Supabase
  const stats = {
    streak: 0,
    totalXP: 0,
    level: 1,
    wordsLearned: 0,
    quizzesPassed: 0,
    daysActive: 1,
    accuracy: 0,
  }

  const achievements = [
    { id: 1, name: 'Primera Lección', description: 'Completa tu primera lección', icon: '🌱', unlocked: false },
    { id: 2, name: 'Racha de 7', description: 'Practica 7 días seguidos', icon: '🔥', unlocked: false },
    { id: 3, name: 'Vocabulario 50', description: 'Aprende 50 palabras', icon: '📚', unlocked: false },
    { id: 4, name: 'Quiz Perfecto', description: 'Obtén 100% en un quiz', icon: '🏆', unlocked: false },
    { id: 5, name: 'Oído Fino', description: 'Completa 10 ejercicios de escucha', icon: '👂', unlocked: false },
    { id: 6, name: 'Escritor', description: 'Completa 10 ejercicios de escritura', icon: '✍️', unlocked: false },
    { id: 7, name: 'Lector', description: 'Lee 5 textos completos', icon: '📖', unlocked: false },
    { id: 8, name: 'Racha de 30', description: 'Practica 30 días seguidos', icon: '💎', unlocked: false },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Tu Progreso</h1>
        <p className="text-gray-500">Aquí puedes ver tu avance general en EnglishUp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <Flame size={28} className="mx-auto mb-2 text-orange-500" />
          <div className="text-3xl font-bold text-gray-800">{stats.streak}</div>
          <div className="text-sm text-gray-500">Racha (días)</div>
        </div>
        <div className="card text-center">
          <Trophy size={28} className="mx-auto mb-2 text-yellow-500" />
          <div className="text-3xl font-bold text-gray-800">{stats.totalXP}</div>
          <div className="text-sm text-gray-500">XP Total</div>
        </div>
        <div className="card text-center">
          <Target size={28} className="mx-auto mb-2 text-indigo-500" />
          <div className="text-3xl font-bold text-gray-800">{stats.level}</div>
          <div className="text-sm text-gray-500">Nivel</div>
        </div>
        <div className="card text-center">
          <TrendingUp size={28} className="mx-auto mb-2 text-green-500" />
          <div className="text-3xl font-bold text-gray-800">{stats.wordsLearned}</div>
          <div className="text-sm text-gray-500">Palabras</div>
        </div>
      </div>

      {/* Level progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">Progreso al Nivel {stats.level + 1}</h3>
          <span className="text-sm text-gray-400">{stats.totalXP % 100} / 100 XP</span>
        </div>
        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-4 transition-all"
            style={{ width: `${(stats.totalXP % 100)}%` }}
          />
        </div>
      </div>

      {/* Activity */}
      <div className="card">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Calendar size={20} /> Actividad Reciente
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p className="text-lg">¡Comienza a practicar para ver tu actividad aquí!</p>
          <p className="text-sm mt-2">Tu historial se mostrará a medida que uses los módulos</p>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award size={24} /> Logros
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card flex items-center gap-4 ${!achievement.unlocked ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <div className="ml-auto text-green-500">
                  <Award size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

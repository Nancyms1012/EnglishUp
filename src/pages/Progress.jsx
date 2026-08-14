import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { Flame, Trophy, Target, Calendar, TrendingUp, Award, Zap, Lock } from 'lucide-react'

export default function Progress() {
  const { user } = useAuth()
  const { profile, todayActivity, getNextLevelInfo, LEVEL_THRESHOLDS } = useProgress()

  const totalXP = profile?.total_xp || 0
  const currentLevel = profile?.level || 1
  const streak = profile?.streak_days || 0
  const { nextLevel, xpNeeded, xpProgress } = getNextLevelInfo(totalXP)

  const achievements = [
    { id: 1, name: 'Primera Lección', description: 'Gana tu primer XP', icon: '🌱', unlocked: totalXP > 0 },
    { id: 2, name: 'Racha de 3', description: 'Practica 3 días seguidos', icon: '🔥', unlocked: streak >= 3 },
    { id: 3, name: 'Racha de 7', description: 'Practica 7 días seguidos', icon: '🔥🔥', unlocked: streak >= 7 },
    { id: 4, name: '50 XP', description: 'Acumula 50 XP', icon: '⚡', unlocked: totalXP >= 50 },
    { id: 5, name: '100 XP', description: 'Acumula 100 XP', icon: '💯', unlocked: totalXP >= 100 },
    { id: 6, name: 'Nivel 2', description: 'Alcanza el nivel Básico', icon: '📚', unlocked: currentLevel >= 2 },
    { id: 7, name: 'Nivel 3', description: 'Alcanza nivel Intermedio Bajo', icon: '🏅', unlocked: currentLevel >= 3 },
    { id: 8, name: '300 XP', description: 'Acumula 300 XP', icon: '🌟', unlocked: totalXP >= 300 },
    { id: 9, name: 'Racha de 30', description: 'Practica 30 días seguidos', icon: '💎', unlocked: streak >= 30 },
    { id: 10, name: 'Nivel 4', description: 'Alcanza nivel Intermedio', icon: '🏆', unlocked: currentLevel >= 4 },
    { id: 11, name: '1000 XP', description: 'Acumula 1000 XP', icon: '👑', unlocked: totalXP >= 1000 },
    { id: 12, name: 'Nivel 5', description: 'Alcanza nivel Avanzado', icon: '🎓', unlocked: currentLevel >= 5 },
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Tu Progreso</h1>
        <p className="text-gray-500">Tu avance general en EnglishUp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <Flame size={28} className="mx-auto mb-2 text-orange-500" />
          <div className="text-3xl font-bold text-gray-800">{streak}</div>
          <div className="text-sm text-gray-500">Racha (días)</div>
        </div>
        <div className="card text-center">
          <Zap size={28} className="mx-auto mb-2 text-green-500" />
          <div className="text-3xl font-bold text-gray-800">{totalXP}</div>
          <div className="text-sm text-gray-500">XP Total</div>
        </div>
        <div className="card text-center">
          <Trophy size={28} className="mx-auto mb-2 text-yellow-500" />
          <div className="text-3xl font-bold text-gray-800">{currentLevel}</div>
          <div className="text-sm text-gray-500">{LEVEL_THRESHOLDS.find(t => t.level === currentLevel)?.name}</div>
        </div>
        <div className="card text-center">
          <Award size={28} className="mx-auto mb-2 text-indigo-500" />
          <div className="text-3xl font-bold text-gray-800">{unlockedCount}</div>
          <div className="text-sm text-gray-500">Logros</div>
        </div>
      </div>

      {/* Level progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">
            {nextLevel 
              ? `Progreso al Nivel ${nextLevel.level} (${nextLevel.name})`
              : '🎓 ¡Nivel máximo alcanzado!'
            }
          </h3>
          {nextLevel && (
            <span className="text-sm text-gray-400">{xpNeeded} XP restantes</span>
          )}
        </div>
        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-4 transition-all duration-500"
            style={{ width: `${nextLevel ? xpProgress : 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{totalXP} XP</span>
          <span>{nextLevel ? `${nextLevel.xpRequired} XP` : 'MAX'}</span>
        </div>
      </div>

      {/* Today's activity */}
      <div className="card">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Calendar size={20} /> Actividad de Hoy
        </h3>
        {todayActivity && todayActivity.xp_earned > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{todayActivity.xp_earned}</div>
              <div className="text-sm text-gray-500">XP ganados hoy</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{todayActivity.exercises_completed}</div>
              <div className="text-sm text-gray-500">Ejercicios completados</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <p className="text-lg">¡Empieza a practicar hoy para ver tu actividad!</p>
            <p className="text-sm mt-2">Completa ejercicios para ganar XP</p>
          </div>
        )}
      </div>

      {/* Levels roadmap */}
      <div className="card">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <TrendingUp size={20} /> Mapa de Niveles
        </h3>
        <div className="space-y-3">
          {LEVEL_THRESHOLDS.map((lvl, index) => {
            const isUnlocked = currentLevel >= lvl.level
            const isCurrent = currentLevel === lvl.level
            return (
              <div key={lvl.level} className="flex items-center gap-4">
                {/* Connector line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isUnlocked 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-indigo-200' : ''}`}>
                    {isUnlocked ? '✓' : <Lock size={14} />}
                  </div>
                  {index < LEVEL_THRESHOLDS.length - 1 && (
                    <div className={`w-0.5 h-6 ${isUnlocked ? 'bg-green-300' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isCurrent ? 'text-indigo-600' : 'text-gray-800'}`}>
                        Nivel {lvl.level}: {lvl.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lvl.xpRequired === 0 ? 'Disponible desde el inicio' : `${lvl.xpRequired} XP requeridos`}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
                        ← Estás aquí
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award size={24} /> Logros ({unlockedCount}/{achievements.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card flex items-center gap-4 transition-all ${
                achievement.unlocked 
                  ? 'border-green-100 bg-green-50/50' 
                  : 'opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <div className="text-green-500">✅</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

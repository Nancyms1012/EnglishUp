import { useState } from 'react'
import { vocabulary } from '../data/vocabulary'
import { useProgress } from '../context/ProgressContext'
import { ArrowLeft, Check, X, RotateCcw, Play, Volume2, HelpCircle } from 'lucide-react'
import XPNotification from '../components/XPNotification'
import LevelUpModal from '../components/LevelUpModal'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Writing() {
  const [started, setStarted] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [xpNotification, setXpNotification] = useState({ show: false, amount: 0 })
  const [levelUp, setLevelUp] = useState(null)
  const { addXP, XP_REWARDS } = useProgress()
  const startExercise = () => {
    const shuffled = shuffleArray(vocabulary)
    setExercises(shuffled.slice(0, 10))
    setStarted(true)
    setCurrentIndex(0)
    setUserInput('')
    setShowResult(false)
    setScore(0)
    setComplete(false)
    setShowHint(false)
  }

  const checkAnswer = async (e) => {
    e.preventDefault()
    const correct = exercises[currentIndex].translations.en.toLowerCase().trim()
    const answer = userInput.toLowerCase().trim()
    
    // Allow minor differences (punctuation, extra spaces)
    const normalize = (str) => str.replace(/[?.!,'"]/g, '').replace(/\s+/g, ' ').trim()
    
    const isMatch = normalize(answer) === normalize(correct)
    setIsCorrect(isMatch)
    setShowResult(true)
    if (isMatch) {
      setScore(score + 1)
      const result = await addXP(XP_REWARDS.writing_correct, 'writing')
      setXpNotification({ show: true, amount: XP_REWARDS.writing_correct })
      if (result?.leveledUp) {
        setLevelUp({ level: result.newLevel.level, name: result.newLevel.name })
      }
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= exercises.length) {
      setComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setUserInput('')
      setShowResult(false)
      setShowHint(false)
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const getHint = () => {
    const answer = exercises[currentIndex].translations.en
    const hintLength = Math.ceil(answer.length / 3)
    return answer.substring(0, hintLength) + '...'
  }

  // Landing
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">✍️ Escritura</h1>
        <p className="text-gray-500 mb-8">
          Practica escribiendo la traducción en inglés de palabras y frases en español
        </p>

        <div className="card p-8 mb-6">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold mb-2">¿Cómo funciona?</h2>
          <ol className="text-left text-gray-600 space-y-2 max-w-sm mx-auto">
            <li>1. Verás una palabra o frase en español</li>
            <li>2. Escribe la traducción en inglés</li>
            <li>3. Se verificará tu respuesta automáticamente</li>
            <li>4. Puedes pedir una pista si la necesitas</li>
          </ol>
        </div>

        <button onClick={startExercise} className="btn-primary text-lg px-8 py-4">
          <Play size={20} className="inline mr-2" /> Comenzar (10 ejercicios)
        </button>
      </div>
    )
  }

  // Complete
  if (complete) {
    const percentage = Math.round((score / exercises.length) * 100)

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8">
          <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : '💪'}</div>
          <h2 className="text-2xl font-bold mb-2">
            {percentage >= 70 ? '¡Excelente escritura!' : '¡Sigue practicando!'}
          </h2>
          <p className="text-gray-500 mb-6">
            Acertaste {score} de {exercises.length} ({percentage}%)
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={startExercise} className="btn-primary">
              <RotateCcw size={16} className="inline mr-2" /> Otra ronda
            </button>
            <button onClick={() => setStarted(false)} className="btn-secondary">
              Volver
            </button>
          </div>
        </div>
      </div>
    )
  }

  const exercise = exercises[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      <XPNotification amount={xpNotification.amount} show={xpNotification.show} onHide={() => setXpNotification({ show: false, amount: 0 })} />
      {levelUp && <LevelUpModal level={levelUp.level} levelName={levelUp.name} onClose={() => setLevelUp(null)} />}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setStarted(false)} className="text-indigo-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Salir
        </button>
        <span className="text-sm text-gray-500">{currentIndex + 1} / {exercises.length}</span>
        <span className="text-sm text-green-600 font-medium">✅ {score}</span>
      </div>

      {/* Progress */}
      <div className="bg-gray-200 rounded-full h-2 mb-8">
        <div className="bg-indigo-500 rounded-full h-2 transition-all"
          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} />
      </div>

      {/* Word to translate */}
      <div className="card text-center mb-6 py-8">
        <p className="text-sm text-gray-400 mb-2">Traduce al inglés:</p>
        <h2 className="text-3xl font-bold text-gray-800">{exercise.es}</h2>
        {exercise.example && (
          <p className="text-sm text-gray-400 mt-3 italic">
            Pista contextual: "{exercise.example.es}"
          </p>
        )}
      </div>

      {/* Input */}
      <form onSubmit={checkAnswer} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe la traducción en inglés..."
            className="input-field text-lg pr-20"
            disabled={showResult}
            autoFocus
          />
          {!showResult && (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600"
              title="Ver pista"
            >
              <HelpCircle size={20} />
            </button>
          )}
        </div>

        {showHint && !showResult && (
          <p className="text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">
            💡 Pista: <span className="font-mono">{getHint()}</span>
          </p>
        )}

        {!showResult && (
          <button type="submit" className="btn-primary w-full" disabled={!userInput.trim()}>
            Verificar respuesta
          </button>
        )}
      </form>

      {/* Result */}
      {showResult && (
        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <><Check size={20} className="text-green-500" /><span className="font-semibold text-green-700">¡Correcto! 🎉</span></>
              ) : (
                <><X size={20} className="text-red-500" /><span className="font-semibold text-red-700">Incorrecto</span></>
              )}
            </div>
            {!isCorrect && (
              <p className="text-sm text-gray-600">
                La respuesta correcta es: <strong className="text-indigo-600">{exercise.translations.en}</strong>
              </p>
            )}
          </div>

          <button
            onClick={() => speak(exercise.translations.en)}
            className="flex items-center gap-2 text-indigo-600 hover:underline mx-auto"
          >
            <Volume2 size={18} /> Escuchar pronunciación
          </button>

          <button onClick={handleNext} className="btn-primary w-full">
            {currentIndex + 1 >= exercises.length ? 'Ver resultados' : 'Siguiente →'}
          </button>
        </div>
      )}
    </div>
  )
}

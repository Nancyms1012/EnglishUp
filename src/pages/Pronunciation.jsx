import { useState, useRef } from 'react'
import { vocabulary } from '../data/vocabulary'
import { useProgress } from '../context/ProgressContext'
import { ArrowLeft, Mic, MicOff, Volume2, Play, RotateCcw, Check, X, HelpCircle } from 'lucide-react'
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

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[?.!,'";\-:]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function calculateSimilarity(str1, str2) {
  const s1 = normalizeText(str1)
  const s2 = normalizeText(str2)
  
  if (s1 === s2) return 100
  
  // Check if words match (order insensitive for single words)
  const words1 = s1.split(' ')
  const words2 = s2.split(' ')
  
  if (words1.length === 1 && words2.length === 1) {
    // Levenshtein-based similarity for single words
    const maxLen = Math.max(s1.length, s2.length)
    if (maxLen === 0) return 100
    const distance = levenshtein(s1, s2)
    return Math.round(((maxLen - distance) / maxLen) * 100)
  }
  
  // For phrases, check word match percentage
  let matchCount = 0
  words2.forEach(word => {
    if (words1.includes(word)) matchCount++
  })
  
  const matchPercentage = Math.round((matchCount / Math.max(words1.length, words2.length)) * 100)
  return matchPercentage
}

function levenshtein(a, b) {
  const matrix = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

export default function Pronunciation() {
  const [started, setStarted] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [userSpeech, setUserSpeech] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [similarity, setSimilarity] = useState(0)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [xpNotification, setXpNotification] = useState({ show: false, amount: 0 })
  const [levelUp, setLevelUp] = useState(null)
  const recognitionRef = useRef(null)
  const { addXP, XP_REWARDS } = useProgress()

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

  const startExercise = () => {
    const shuffled = shuffleArray(vocabulary)
    setExercises(shuffled.slice(0, 10))
    setStarted(true)
    setCurrentIndex(0)
    setUserSpeech('')
    setShowResult(false)
    setScore(0)
    setComplete(false)
    setError('')
    setAttempts(0)
  }

  const speak = (text, rate = 0.7) => {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    speechSynthesis.speak(utterance)
  }

  const startListening = () => {
    setError('')
    setUserSpeech('')
    setShowResult(false)

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Tu navegador no soporta reconocimiento de voz. Usa Chrome para mejor experiencia.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 3
    recognition.continuous = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = async (event) => {
      // Get the best match from alternatives
      let bestMatch = ''
      let bestSimilarity = 0
      const target = exercises[currentIndex].translations.en

      for (let i = 0; i < event.results[0].length; i++) {
        const transcript = event.results[0][i].transcript
        const sim = calculateSimilarity(target, transcript)
        if (sim > bestSimilarity) {
          bestSimilarity = sim
          bestMatch = transcript
        }
      }

      setUserSpeech(bestMatch)
      setSimilarity(bestSimilarity)
      setShowResult(true)
      setAttempts(attempts + 1)
      
      if (bestSimilarity >= 70) {
        setScore(score + 1)
        // Award XP
        const result = await addXP(XP_REWARDS.pronunciation_good, 'pronunciation')
        setXpNotification({ show: true, amount: XP_REWARDS.pronunciation_good })
        if (result?.leveledUp) {
          setLevelUp({ level: result.newLevel.level, name: result.newLevel.name })
        }
      }
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      if (event.error === 'no-speech') {
        setError('No se detectó voz. Intenta hablar más fuerte y claro.')
      } else if (event.error === 'not-allowed') {
        setError('Permiso de micrófono denegado. Permite el acceso al micrófono en tu navegador.')
      } else {
        setError('Error al escuchar. Intenta de nuevo.')
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= exercises.length) {
      setComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setUserSpeech('')
      setShowResult(false)
      setError('')
      setAttempts(0)
    }
  }

  const retryPronunciation = () => {
    setUserSpeech('')
    setShowResult(false)
    setError('')
  }

  // Not supported
  if (!isSupported) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎤 Pronunciación</h1>
        <div className="card p-8 mt-6">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold mb-2">Navegador no compatible</h2>
          <p className="text-gray-500 mb-4">
            Tu navegador no soporta reconocimiento de voz.
          </p>
          <p className="text-gray-600">
            Para usar este módulo, abre la app en <strong>Google Chrome</strong> 
            (en computadora o Android). 
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Safari en iPhone tiene soporte limitado.
          </p>
        </div>
      </div>
    )
  }

  // Landing
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎤 Pronunciación</h1>
        <p className="text-gray-500 mb-8">
          Practica tu pronunciación en inglés hablando en voz alta
        </p>

        <div className="card p-8 mb-6">
          <div className="text-6xl mb-4">🗣️</div>
          <h2 className="text-xl font-semibold mb-4">¿Cómo funciona?</h2>
          <ol className="text-left text-gray-600 space-y-3 max-w-sm mx-auto">
            <li className="flex items-start gap-2">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span>Escucha la pronunciación correcta tocando 🔊</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span>Presiona el botón 🎤 y pronuncia la palabra/frase en inglés</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <span>La app evaluará qué tan bien pronunciaste</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <span>¡Puedes intentar varias veces hasta que salga bien!</span>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
          <HelpCircle size={16} className="inline mr-1" />
          <strong>Tips:</strong> Usa Chrome para mejor experiencia. Habla claro y a velocidad normal. 
          Asegúrate de que el micrófono esté habilitado.
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
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🌟' : percentage >= 60 ? '👏' : '💪'}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {percentage >= 80 ? '¡Excelente pronunciación!' : percentage >= 60 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h2>
          <p className="text-gray-500 mb-6">
            Pronunciaste correctamente {score} de {exercises.length} palabras ({percentage}%)
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

  // Exercise
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

      {/* Word to pronounce */}
      <div className="card text-center mb-6 py-8">
        <p className="text-sm text-gray-400 mb-2">Pronuncia en inglés:</p>
        <h2 className="text-3xl font-bold text-indigo-600 mb-1">
          {exercise.translations.en}
        </h2>
        <p className="text-gray-500">({exercise.es})</p>
        
        {/* Listen buttons */}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => speak(exercise.translations.en, 0.5)}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors text-sm"
          >
            <Volume2 size={16} /> 🐢 Lento
          </button>
          <button
            onClick={() => speak(exercise.translations.en, 0.7)}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors text-sm"
          >
            <Volume2 size={16} /> Normal
          </button>
          <button
            onClick={() => speak(exercise.translations.en, 1)}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors text-sm"
          >
            <Volume2 size={16} /> 🏃 Rápido
          </button>
        </div>
      </div>

      {/* Microphone button */}
      {!showResult && (
        <div className="text-center mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
              isListening
                ? 'bg-red-500 animate-pulse shadow-lg shadow-red-200 scale-110'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-lg shadow-indigo-200'
            }`}
          >
            {isListening ? (
              <MicOff size={40} className="text-white" />
            ) : (
              <Mic size={40} className="text-white" />
            )}
          </button>
          <p className="text-sm text-gray-400 mt-4">
            {isListening ? '🔴 Escuchando... habla ahora' : 'Toca para hablar'}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm text-center">
          {error}
          <button onClick={retryPronunciation} className="block mx-auto mt-2 text-red-600 underline">
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="space-y-4">
          {/* Similarity score */}
          <div className={`card text-center ${similarity >= 70 ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              {similarity >= 70 ? (
                <><Check size={24} className="text-green-500" /><span className="text-green-700 font-bold text-lg">¡Bien pronunciado!</span></>
              ) : (
                <><X size={24} className="text-orange-500" /><span className="text-orange-700 font-bold text-lg">Intenta de nuevo</span></>
              )}
            </div>

            {/* Score circle */}
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke={similarity >= 70 ? '#22c55e' : similarity >= 40 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="6"
                  strokeDasharray={`${similarity * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{similarity}%</span>
              </div>
            </div>

            {/* What was heard */}
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Lo que dijiste:</p>
                <p className="font-medium text-gray-800 text-lg">"{userSpeech || '(no se detectó)'}"</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Correcto:</p>
                <p className="font-medium text-indigo-600 text-lg">"{exercise.translations.en}"</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {similarity < 70 && (
              <button onClick={retryPronunciation} className="btn-secondary flex-1">
                <Mic size={16} className="inline mr-2" /> Intentar de nuevo
              </button>
            )}
            <button onClick={handleNext} className={`btn-primary ${similarity >= 70 ? 'w-full' : 'flex-1'}`}>
              {currentIndex + 1 >= exercises.length ? 'Ver resultados' : 'Siguiente →'}
            </button>
          </div>

          {/* Tip */}
          {similarity < 70 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700 text-center">
              💡 <strong>Tip:</strong> Escucha la pronunciación correcta con el botón 🔊 arriba e intenta imitar el sonido
            </div>
          )}
        </div>
      )}
    </div>
  )
}

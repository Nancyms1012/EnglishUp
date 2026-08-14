import { useState, useMemo } from 'react'
import { vocabulary } from '../data/vocabulary'
import { CATEGORIES } from '../lib/constants'
import { ArrowLeft, Volume2, Check, X, RotateCcw, Play } from 'lucide-react'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Listening() {
  const [started, setStarted] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)

  const startExercise = () => {
    const shuffled = shuffleArray(vocabulary)
    const selected = shuffled.slice(0, 10)
    
    const exs = selected.map((item) => {
      const others = vocabulary.filter(v => v.id !== item.id)
      const wrongOptions = shuffleArray(others).slice(0, 3).map(v => v.es)
      const options = shuffleArray([item.es, ...wrongOptions])
      
      return {
        id: item.id,
        textToSpeak: item.translations.en,
        correctAnswer: item.es,
        options,
        correctIndex: options.indexOf(item.es),
      }
    })

    setExercises(exs)
    setStarted(true)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setComplete(false)
  }

  const speak = (text, rate = 0.7) => {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    speechSynthesis.speak(utterance)
  }

  const handleAnswer = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === exercises[currentIndex].correctIndex) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= exercises.length) {
      setComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  // Landing
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👂 Escucha</h1>
        <p className="text-gray-500 mb-8">
          Escucha la palabra o frase en inglés y elige la traducción correcta en español
        </p>

        <div className="card p-8 mb-6">
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-xl font-semibold mb-2">¿Cómo funciona?</h2>
          <ol className="text-left text-gray-600 space-y-2 max-w-sm mx-auto">
            <li>1. Presiona el botón de 🔊 para escuchar</li>
            <li>2. Escucha atentamente la palabra en inglés</li>
            <li>3. Elige la traducción correcta en español</li>
            <li>4. ¡Puedes reproducir el audio las veces que quieras!</li>
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
            {percentage >= 70 ? '¡Excelente oído!' : 'Sigue practicando'}
          </h2>
          <p className="text-gray-500 mb-6">
            Acertaste {score} de {exercises.length} ejercicios ({percentage}%)
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

      {/* Speaker button */}
      <div className="card text-center mb-6 py-12">
        <p className="text-gray-400 mb-4">Escucha y elige la traducción correcta</p>
        <button
          onClick={() => speak(exercise.textToSpeak)}
          className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto hover:bg-indigo-200 transition-all hover:scale-105 active:scale-95"
        >
          <Volume2 size={40} className="text-indigo-600" />
        </button>
        <p className="text-sm text-gray-400 mt-4">Toca para escuchar</p>
        
        {showResult && (
          <p className="text-lg font-medium text-indigo-600 mt-4">
            "{exercise.textToSpeak}"
          </p>
        )}
      </div>

      {/* Speed options */}
      <div className="flex gap-2 justify-center mb-6">
        <button onClick={() => speak(exercise.textToSpeak, 0.5)} className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
          🐢 Lento
        </button>
        <button onClick={() => speak(exercise.textToSpeak, 0.7)} className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
          🚶 Normal
        </button>
        <button onClick={() => speak(exercise.textToSpeak, 1)} className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
          🏃 Rápido
        </button>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((option, index) => {
          let style = 'bg-white border-2 border-gray-200 hover:border-indigo-300'
          if (showResult) {
            if (index === exercise.correctIndex) style = 'bg-green-50 border-2 border-green-500'
            else if (index === selectedAnswer) style = 'bg-red-50 border-2 border-red-500'
            else style = 'bg-gray-50 border-2 border-gray-200 opacity-50'
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all ${style}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === exercise.correctIndex && <Check size={18} className="text-green-500" />}
                {showResult && index === selectedAnswer && index !== exercise.correctIndex && <X size={18} className="text-red-500" />}
              </div>
            </button>
          )
        })}
      </div>

      {showResult && (
        <button onClick={handleNext} className="btn-primary w-full mt-6">
          {currentIndex + 1 >= exercises.length ? 'Ver resultados' : 'Siguiente →'}
        </button>
      )}
    </div>
  )
}

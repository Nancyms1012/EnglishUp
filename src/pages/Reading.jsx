import { useState } from 'react'
import { readingTexts } from '../data/vocabulary'
import { ArrowLeft, BookOpen, Check, X, RotateCcw, Volume2 } from 'lucide-react'

export default function Reading() {
  const [selectedText, setSelectedText] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)

  const startReading = (text) => {
    setSelectedText(text)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setComplete(false)
    setShowQuestions(false)
  }

  const handleAnswer = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === selectedText.questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion + 1 >= selectedText.questions.length) {
      setComplete(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const speak = (text) => {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.7
    speechSynthesis.speak(utterance)
  }

  // Text selection
  if (!selectedText) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 Lectura</h1>
        <p className="text-gray-500 mb-6">Lee textos cortos en inglés y responde preguntas de comprensión</p>

        <div className="grid gap-4">
          {readingTexts.map((text) => (
            <button
              key={text.id}
              onClick={() => startReading(text)}
              className="card hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen size={18} className="text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">{text.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                      Nivel {text.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{text.titleEs}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {text.questions.length} preguntas
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Complete
  if (complete) {
    const percentage = Math.round((score / selectedText.questions.length) * 100)

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8">
          <div className="text-6xl mb-4">{percentage >= 70 ? '📚✨' : '📖💪'}</div>
          <h2 className="text-2xl font-bold mb-2">
            {percentage >= 70 ? '¡Gran comprensión!' : 'Sigue leyendo'}
          </h2>
          <p className="text-gray-500 mb-6">
            Respondiste correctamente {score} de {selectedText.questions.length} preguntas ({percentage}%)
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => startReading(selectedText)} className="btn-primary">
              <RotateCcw size={16} className="inline mr-2" /> Leer de nuevo
            </button>
            <button onClick={() => setSelectedText(null)} className="btn-secondary">
              Otro texto
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Reading + Questions
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => setSelectedText(null)} className="text-indigo-600 hover:underline flex items-center gap-1 mb-6">
        <ArrowLeft size={16} /> Volver a textos
      </button>

      {/* Text */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{selectedText.title}</h2>
          <button
            onClick={() => speak(selectedText.text)}
            className="p-2 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors"
            title="Escuchar el texto"
          >
            <Volume2 size={18} className="text-indigo-600" />
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {selectedText.text}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            💡 Tip: Lee el texto con calma. Puedes usar el botón 🔊 para escucharlo.
          </p>
        </div>
      </div>

      {/* Show questions button */}
      {!showQuestions && (
        <button onClick={() => setShowQuestions(true)} className="btn-primary w-full">
          ¡Listo! Responder preguntas
        </button>
      )}

      {/* Questions */}
      {showQuestions && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">
            Pregunta {currentQuestion + 1} de {selectedText.questions.length}
          </h3>

          <div className="card mb-4">
            <p className="font-medium text-gray-800 text-lg">
              {selectedText.questions[currentQuestion].question}
            </p>
          </div>

          <div className="space-y-3">
            {selectedText.questions[currentQuestion].options.map((option, index) => {
              let style = 'bg-white border-2 border-gray-200 hover:border-indigo-300'
              if (showResult) {
                if (index === selectedText.questions[currentQuestion].correct) {
                  style = 'bg-green-50 border-2 border-green-500'
                } else if (index === selectedAnswer) {
                  style = 'bg-red-50 border-2 border-red-500'
                } else {
                  style = 'bg-gray-50 border-2 border-gray-200 opacity-50'
                }
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
                    {showResult && index === selectedText.questions[currentQuestion].correct && <Check size={18} className="text-green-500" />}
                    {showResult && index === selectedAnswer && index !== selectedText.questions[currentQuestion].correct && <X size={18} className="text-red-500" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <button onClick={handleNext} className="btn-primary w-full mt-6">
              {currentQuestion + 1 >= selectedText.questions.length ? 'Ver resultados' : 'Siguiente pregunta →'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

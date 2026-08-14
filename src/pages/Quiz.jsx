import { useState, useMemo } from 'react'
import { vocabulary, dailyPhrases } from '../data/vocabulary'
import { CATEGORIES } from '../lib/constants'
import { useProgress } from '../context/ProgressContext'
import { ArrowLeft, Check, X, RotateCcw, Trophy, Volume2 } from 'lucide-react'
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

function generateQuestions(vocabList, count = 10) {
  const shuffled = shuffleArray(vocabList)
  const selected = shuffled.slice(0, Math.min(count, shuffled.length))
  
  return selected.map((item) => {
    // Get wrong answers from other vocabulary
    const others = vocabulary.filter(v => v.id !== item.id)
    const wrongAnswers = shuffleArray(others).slice(0, 3).map(v => v.translations.en)
    
    const options = shuffleArray([item.translations.en, ...wrongAnswers])
    const correctIndex = options.indexOf(item.translations.en)

    return {
      id: item.id,
      question: `¿Cómo se dice "${item.es}" en inglés?`,
      options,
      correctIndex,
      correctAnswer: item.translations.en,
      explanation: item.example ? item.example.en : null,
    }
  })
}

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answers, setAnswers] = useState([])
  const [xpNotification, setXpNotification] = useState({ show: false, amount: 0 })
  const [levelUp, setLevelUp] = useState(null)
  const { addXP, saveQuizResult, XP_REWARDS } = useProgress()

  const startQuiz = (category) => {
    const vocabList = category === 'all' 
      ? vocabulary 
      : vocabulary.filter(v => v.category === category)
    
    const q = generateQuestions(vocabList)
    setQuestions(q)
    setSelectedCategory(category)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizComplete(false)
    setAnswers([])
  }

  const handleAnswer = async (index) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)

    const isCorrect = index === questions[currentQuestion].correctIndex
    if (isCorrect) {
      setScore(score + 1)
      // Award XP
      const result = await addXP(XP_REWARDS.quiz_correct, 'quiz')
      setXpNotification({ show: true, amount: XP_REWARDS.quiz_correct })
      if (result?.leveledUp) {
        setLevelUp({ level: result.newLevel.level, name: result.newLevel.name })
      }
    }

    setAnswers([...answers, { 
      question: questions[currentQuestion].question,
      selected: questions[currentQuestion].options[index],
      correct: questions[currentQuestion].correctAnswer,
      isCorrect 
    }])
  }

  const handleNext = () => {
    if (currentQuestion + 1 >= questions.length) {
      setQuizComplete(true)
      // Save quiz result
      saveQuizResult(selectedCategory, score, questions.length)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  // Category selector
  if (selectedCategory === null) {
    return (
      <div className="max-w-4xl mx-auto">
        <XPNotification amount={xpNotification.amount} show={xpNotification.show} onHide={() => setXpNotification({ show: false, amount: 0 })} />
        {levelUp && <LevelUpModal level={levelUp.level} levelName={levelUp.name} onClose={() => setLevelUp(null)} />}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🧠 Quiz</h1>
        <p className="text-gray-500 mb-6">Pon a prueba tu vocabulario con 10 preguntas</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => startQuiz('all')}
            className="card hover:shadow-lg transition-all hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="font-semibold">Todas las categorías</h3>
          </button>
          {CATEGORIES.map((cat) => {
            const count = vocabulary.filter(v => v.category === cat.id).length
            if (count < 4) return null
            return (
              <button
                key={cat.id}
                onClick={() => startQuiz(cat.id)}
                className="card hover:shadow-lg transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold">{cat.name}</h3>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Quiz complete
  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    let message = ''
    let emoji = ''
    
    if (percentage === 100) { message = '¡Perfecto! 🎉'; emoji = '🏆' }
    else if (percentage >= 80) { message = '¡Excelente trabajo!'; emoji = '🌟' }
    else if (percentage >= 60) { message = '¡Buen trabajo!'; emoji = '👍' }
    else if (percentage >= 40) { message = 'Sigue practicando'; emoji = '💪' }
    else { message = 'No te rindas, ¡intenta de nuevo!'; emoji = '🔄' }

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{message}</h2>
          <p className="text-gray-500 mb-6">
            Respondiste correctamente {score} de {questions.length} preguntas
          </p>
          
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle 
                cx="64" cy="64" r="56" fill="none" 
                stroke={percentage >= 60 ? '#22c55e' : '#ef4444'} 
                strokeWidth="8"
                strokeDasharray={`${percentage * 3.52} 352`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
          </div>

          {/* Results detail */}
          <div className="text-left space-y-2 mb-6 max-h-60 overflow-y-auto">
            {answers.map((a, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm ${a.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {a.isCorrect ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />}
                  <span className="font-medium">{a.question}</span>
                </div>
                {!a.isCorrect && (
                  <p className="text-red-600 ml-6 mt-1">Tu respuesta: {a.selected} | Correcta: {a.correct}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={() => startQuiz(selectedCategory)} className="btn-primary">
              <RotateCcw size={16} className="inline mr-2" /> Intentar de nuevo
            </button>
            <button onClick={() => setSelectedCategory(null)} className="btn-secondary">
              Otra categoría
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Question view
  const question = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto">
      <XPNotification amount={xpNotification.amount} show={xpNotification.show} onHide={() => setXpNotification({ show: false, amount: 0 })} />
      {levelUp && <LevelUpModal level={levelUp.level} levelName={levelUp.name} onClose={() => setLevelUp(null)} />}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Salir
        </button>
        <div className="text-sm text-gray-500">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
        <div className="text-sm font-medium text-green-600">
          ✅ {score}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-indigo-500 rounded-full h-2 transition-all"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let optionStyle = 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
          
          if (showResult) {
            if (index === question.correctIndex) {
              optionStyle = 'bg-green-50 border-2 border-green-500 text-green-800'
            } else if (index === selectedAnswer && index !== question.correctIndex) {
              optionStyle = 'bg-red-50 border-2 border-red-500 text-red-800'
            } else {
              optionStyle = 'bg-gray-50 border-2 border-gray-200 opacity-50'
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all ${optionStyle}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === question.correctIndex && <Check size={20} className="text-green-500" />}
                {showResult && index === selectedAnswer && index !== question.correctIndex && <X size={20} className="text-red-500" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Feedback & Next */}
      {showResult && (
        <div className="mt-6 space-y-4">
          {question.explanation && (
            <div className="bg-indigo-50 rounded-xl p-4 flex items-center gap-3">
              <button onClick={() => speak(question.correctAnswer)} className="p-2 bg-indigo-100 rounded-full">
                <Volume2 size={18} className="text-indigo-600" />
              </button>
              <div>
                <p className="font-medium text-indigo-800">Ejemplo: "{question.explanation}"</p>
              </div>
            </div>
          )}
          <button onClick={handleNext} className="btn-primary w-full">
            {currentQuestion + 1 >= questions.length ? 'Ver resultados' : 'Siguiente pregunta →'}
          </button>
        </div>
      )}
    </div>
  )
}

import { useState, useMemo } from 'react'
import { vocabulary } from '../data/vocabulary'
import { CATEGORIES } from '../lib/constants'
import { useProgress } from '../context/ProgressContext'
import { RotateCcw, ArrowLeft, ArrowRight, Volume2, Check, X, Trophy } from 'lucide-react'
import XPNotification from '../components/XPNotification'
import LevelUpModal from '../components/LevelUpModal'

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState([])
  const [unknownCards, setUnknownCards] = useState([])
  const [xpNotification, setXpNotification] = useState({ show: false, amount: 0 })
  const [levelUp, setLevelUp] = useState(null)
  const [sessionComplete, setSessionComplete] = useState(false)
  const { addXP, XP_REWARDS } = useProgress()

  const filteredVocab = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return vocabulary
    return vocabulary.filter(v => v.category === selectedCategory)
  }, [selectedCategory])

  const currentCard = filteredVocab[currentIndex]

  // Check if all cards have been reviewed
  const totalReviewed = knownCards.length + unknownCards.length
  const allReviewed = totalReviewed >= filteredVocab.length

  const speak = (text, lang = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const findNextUnreviewedIndex = (fromIndex) => {
    // Find next card that hasn't been reviewed
    for (let i = 1; i <= filteredVocab.length; i++) {
      const nextIdx = (fromIndex + i) % filteredVocab.length
      const card = filteredVocab[nextIdx]
      if (!knownCards.includes(card.id) && !unknownCards.includes(card.id)) {
        return nextIdx
      }
    }
    return -1 // All reviewed
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % filteredVocab.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length)
  }

  const handleKnown = async () => {
    if (knownCards.includes(currentCard.id)) {
      // Already marked, just go next
      handleNext()
      return
    }

    const newKnown = [...knownCards, currentCard.id]
    setKnownCards(newKnown)

    const result = await addXP(XP_REWARDS.flashcard_known, 'flashcards')
    setXpNotification({ show: true, amount: XP_REWARDS.flashcard_known })
    if (result?.leveledUp) {
      setLevelUp({ level: result.newLevel.level, name: result.newLevel.name })
    }

    // Check if all cards reviewed
    if (newKnown.length + unknownCards.length >= filteredVocab.length) {
      setSessionComplete(true)
    } else {
      // Move to next unreviewed card
      setIsFlipped(false)
      const nextIdx = findNextUnreviewedIndex(currentIndex)
      if (nextIdx >= 0) {
        setCurrentIndex(nextIdx)
      } else {
        setSessionComplete(true)
      }
    }
  }

  const handleUnknown = () => {
    if (unknownCards.includes(currentCard.id)) {
      handleNext()
      return
    }

    const newUnknown = [...unknownCards, currentCard.id]
    setUnknownCards(newUnknown)

    // Check if all cards reviewed
    if (knownCards.length + newUnknown.length >= filteredVocab.length) {
      setSessionComplete(true)
    } else {
      setIsFlipped(false)
      const nextIdx = findNextUnreviewedIndex(currentIndex)
      if (nextIdx >= 0) {
        setCurrentIndex(nextIdx)
      } else {
        setSessionComplete(true)
      }
    }
  }

  const resetProgress = () => {
    setKnownCards([])
    setUnknownCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
    setSessionComplete(false)
  }

  if (!currentCard) return null

  // Category selector
  if (selectedCategory === null) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Flashcards</h1>
        <p className="text-gray-500 mb-6">Elige una categoría para practicar vocabulario</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className="card hover:shadow-lg transition-all hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="font-semibold">Todas</h3>
            <p className="text-sm text-gray-400">{vocabulary.length} palabras</p>
          </button>
          {CATEGORIES.map((cat) => {
            const count = vocabulary.filter(v => v.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="card hover:shadow-lg transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-400">{count} palabras</p>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Session complete view
  if (sessionComplete) {
    const percentage = Math.round((knownCards.length / filteredVocab.length) * 100)

    return (
      <div className="max-w-2xl mx-auto text-center">
        <XPNotification amount={xpNotification.amount} show={xpNotification.show} onHide={() => setXpNotification({ show: false, amount: 0 })} />
        {levelUp && <LevelUpModal level={levelUp.level} levelName={levelUp.name} onClose={() => setLevelUp(null)} />}
        <div className="card p-8">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🌟' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {percentage >= 80 ? '¡Excelente!' : percentage >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h2>
          <p className="text-gray-500 mb-6">
            Revisaste todas las tarjetas de esta categoría
          </p>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{knownCards.length}</div>
              <div className="text-sm text-gray-500">✅ Las sé</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{unknownCards.length}</div>
              <div className="text-sm text-gray-500">❌ No las sé</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{percentage}%</div>
              <div className="text-sm text-gray-500">Dominio</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={resetProgress} className="btn-primary">
              <RotateCcw size={16} className="inline mr-2" /> Repetir
            </button>
            <button onClick={() => { setSelectedCategory(null); resetProgress() }} className="btn-secondary">
              Otra categoría
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <XPNotification amount={xpNotification.amount} show={xpNotification.show} onHide={() => setXpNotification({ show: false, amount: 0 })} />
      {levelUp && <LevelUpModal level={levelUp.level} levelName={levelUp.name} onClose={() => setLevelUp(null)} />}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setSelectedCategory(null); resetProgress() }}
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Categorías
        </button>
        <div className="text-sm text-gray-500">
          {totalReviewed} / {filteredVocab.length} revisadas
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 rounded-full h-2 transition-all"
            style={{ width: `${(knownCards.length / filteredVocab.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">
          ✅ {knownCards.length} | ❌ {unknownCards.length}
        </span>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer perspective-1000"
      >
        <div className={`relative w-full h-72 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front - English (what user needs to learn) */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center backface-hidden">
            <p className="text-sm text-gray-400 mb-4">English</p>
            <h2 className="text-3xl font-bold text-indigo-600 text-center">{currentCard.translations.en}</h2>
            <button
              onClick={(e) => { e.stopPropagation(); speak(currentCard.translations.en) }}
              className="mt-4 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              <Volume2 size={24} className="text-indigo-600" />
            </button>
            <p className="text-sm text-gray-400 mt-4">Toca para ver la traducción</p>
          </div>

          {/* Back - Spanish (translation) */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center backface-hidden rotate-y-180">
            <p className="text-sm text-gray-400 mb-2">Español</p>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              {currentCard.es}
            </h2>
            {currentCard.example && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 italic">"{currentCard.example.en}"</p>
                <p className="text-xs text-gray-400 mt-1">"{currentCard.example.es}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handleUnknown}
          className="flex items-center gap-2 px-5 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors"
        >
          <X size={18} /> No lo sé
        </button>

        <button
          onClick={handlePrev}
          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <ArrowRight size={20} />
        </button>

        <button
          onClick={handleKnown}
          className="flex items-center gap-2 px-5 py-3 bg-green-100 text-green-600 rounded-xl font-medium hover:bg-green-200 transition-colors"
        >
          <Check size={18} /> ¡Lo sé!
        </button>
      </div>

      {/* Reset */}
      <div className="text-center mt-6">
        <button
          onClick={resetProgress}
          className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mx-auto"
        >
          <RotateCcw size={14} /> Reiniciar sesión
        </button>
      </div>
    </div>
  )
}

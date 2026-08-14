import { useState, useMemo } from 'react'
import { vocabulary } from '../data/vocabulary'
import { CATEGORIES } from '../lib/constants'
import { RotateCcw, ArrowLeft, ArrowRight, Volume2, Check, X } from 'lucide-react'

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState([])
  const [unknownCards, setUnknownCards] = useState([])

  const filteredVocab = useMemo(() => {
    if (!selectedCategory) return vocabulary
    return vocabulary.filter(v => v.category === selectedCategory)
  }, [selectedCategory])

  const currentCard = filteredVocab[currentIndex]

  const speak = (text, lang = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % filteredVocab.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length)
  }

  const handleKnown = () => {
    setKnownCards([...knownCards, currentCard.id])
    handleNext()
  }

  const handleUnknown = () => {
    setUnknownCards([...unknownCards, currentCard.id])
    handleNext()
  }

  const resetProgress = () => {
    setKnownCards([])
    setUnknownCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setSelectedCategory(null); resetProgress() }}
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Categorías
        </button>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {filteredVocab.length}
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
          {/* Front - Spanish */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center backface-hidden">
            <p className="text-sm text-gray-400 mb-4">Español</p>
            <h2 className="text-3xl font-bold text-gray-800 text-center">{currentCard.es}</h2>
            <p className="text-sm text-gray-400 mt-6">Toca para ver la traducción</p>
          </div>

          {/* Back - English */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center backface-hidden rotate-y-180">
            <p className="text-sm text-gray-400 mb-2">English</p>
            <h2 className="text-3xl font-bold text-indigo-600 text-center mb-2">
              {currentCard.translations.en}
            </h2>
            <button
              onClick={(e) => { e.stopPropagation(); speak(currentCard.translations.en) }}
              className="mt-2 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              <Volume2 size={24} className="text-indigo-600" />
            </button>
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

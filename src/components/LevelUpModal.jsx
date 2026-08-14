import { useState, useEffect } from 'react'
import { Trophy, X, Sparkles } from 'lucide-react'

export default function LevelUpModal({ level, levelName, onClose }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className={`relative bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center transform transition-all duration-300 ${show ? 'scale-100' : 'scale-75'}`}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="relative">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <Sparkles size={24} className="absolute top-0 right-12 text-yellow-400 animate-pulse" />
          <Sparkles size={16} className="absolute top-8 left-12 text-indigo-400 animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Subiste de Nivel!</h2>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-4 my-4">
          <div className="flex items-center justify-center gap-2">
            <Trophy size={24} />
            <span className="text-3xl font-bold">Nivel {level}</span>
          </div>
          <p className="text-indigo-100 mt-1">{levelName}</p>
        </div>

        <p className="text-gray-500 mb-6">
          ¡Felicidades! Sigue practicando para desbloquear más contenido.
        </p>

        <button onClick={handleClose} className="btn-primary w-full">
          ¡Seguir aprendiendo! 🚀
        </button>
      </div>
    </div>
  )
}

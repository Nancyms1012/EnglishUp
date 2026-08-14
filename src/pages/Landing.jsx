import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Brain, Headphones, PenTool, BookMarked, Sparkles } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-white">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm">
          <GraduationCap size={40} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          EnglishUp
        </h1>
        <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Aprende inglés de forma divertida e interactiva. 
          Practica vocabulario, escucha, lectura y escritura.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
          >
            Comenzar Gratis 🚀
          </Link>
          <Link
            to="/login"
            className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: 'Flashcards', desc: 'Memoriza vocabulario con tarjetas interactivas y pronunciación' },
            { icon: Brain, title: 'Quizzes', desc: 'Pon a prueba tu conocimiento con preguntas de opción múltiple' },
            { icon: Headphones, title: 'Escucha', desc: 'Mejora tu comprensión auditiva con ejercicios de audio' },
            { icon: PenTool, title: 'Escritura', desc: 'Practica escribiendo traducciones y mejora tu ortografía' },
            { icon: BookMarked, title: 'Lectura', desc: 'Lee textos y responde preguntas para mejorar la comprensión' },
            { icon: Sparkles, title: 'Frase del Día', desc: 'Aprende una nueva frase motivacional cada día' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/20">
              <Icon size={28} className="mb-3" />
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-indigo-100 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-indigo-200 py-8 text-sm">
        <p>Hecho con ❤️ para quienes quieren aprender inglés</p>
      </footer>
    </div>
  )
}

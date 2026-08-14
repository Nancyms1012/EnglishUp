import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, BookOpen, Brain, Headphones, PenTool, BookMarked, 
  BarChart3, LogOut, Menu, X, GraduationCap 
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: 'Inicio', icon: Home },
  { path: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { path: '/quiz', label: 'Quiz', icon: Brain },
  { path: '/listening', label: 'Escucha', icon: Headphones },
  { path: '/writing', label: 'Escritura', icon: PenTool },
  { path: '/reading', label: 'Lectura', icon: BookMarked },
  { path: '/progress', label: 'Progreso', icon: BarChart3 },
]

export default function Layout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-indigo-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap size={28} />
          <span className="font-bold text-xl">EnglishUp</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-indigo-700 text-white p-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === path
                  ? 'bg-white text-indigo-700 font-semibold'
                  : 'hover:bg-indigo-600'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-600 w-full text-left text-red-200"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-indigo-600 text-white p-6 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap size={32} />
          <h1 className="font-bold text-2xl">EnglishUp</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === path
                  ? 'bg-white text-indigo-700 font-semibold shadow-md'
                  : 'hover:bg-indigo-500'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-indigo-400 pt-4 mt-4">
          <div className="text-sm text-indigo-200 mb-2">
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

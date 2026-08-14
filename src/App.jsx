import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Listening from './pages/Listening'
import Writing from './pages/Writing'
import Reading from './pages/Reading'
import Pronunciation from './pages/Pronunciation'
import Progress from './pages/Progress'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/flashcards" element={
            <ProtectedRoute>
              <Layout><Flashcards /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute>
              <Layout><Quiz /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/listening" element={
            <ProtectedRoute>
              <Layout><Listening /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/writing" element={
            <ProtectedRoute>
              <Layout><Writing /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/reading" element={
            <ProtectedRoute>
              <Layout><Reading /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/pronunciation" element={
            <ProtectedRoute>
              <Layout><Pronunciation /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Layout><Progress /></Layout>
            </ProtectedRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

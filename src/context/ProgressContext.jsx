import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

const ProgressContext = createContext({})

export const useProgress = () => useContext(ProgressContext)

// Level thresholds
const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Principiante', xpRequired: 0, color: 'green' },
  { level: 2, name: 'Básico', xpRequired: 100, color: 'blue' },
  { level: 3, name: 'Intermedio Bajo', xpRequired: 300, color: 'yellow' },
  { level: 4, name: 'Intermedio', xpRequired: 600, color: 'orange' },
  { level: 5, name: 'Avanzado', xpRequired: 1000, color: 'red' },
]

// XP rewards
const XP_REWARDS = {
  flashcard_known: 5,
  quiz_correct: 10,
  listening_correct: 10,
  writing_correct: 10,
  pronunciation_good: 10,
  reading_correct: 10,
  streak_bonus: 5,
}

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [todayActivity, setTodayActivity] = useState(null)

  // Calculate level from XP
  const calculateLevel = (xp) => {
    let currentLevel = LEVEL_THRESHOLDS[0]
    for (const threshold of LEVEL_THRESHOLDS) {
      if (xp >= threshold.xpRequired) {
        currentLevel = threshold
      } else {
        break
      }
    }
    return currentLevel
  }

  // Get XP needed for next level
  const getNextLevelInfo = (xp) => {
    const currentLevel = calculateLevel(xp)
    const nextThreshold = LEVEL_THRESHOLDS.find(t => t.xpRequired > xp)
    
    if (!nextThreshold) {
      return { nextLevel: null, xpNeeded: 0, xpProgress: 100 }
    }

    const xpInCurrentRange = xp - currentLevel.xpRequired
    const xpRangeTotal = nextThreshold.xpRequired - currentLevel.xpRequired
    const xpProgress = Math.round((xpInCurrentRange / xpRangeTotal) * 100)

    return {
      nextLevel: nextThreshold,
      xpNeeded: nextThreshold.xpRequired - xp,
      xpProgress,
    }
  }

  // Get vocabulary level access (which vocabulary levels the user can access)
  const getAccessibleVocabLevels = (userLevel) => {
    // Level 1 user: access vocab level 1
    // Level 2 user: access vocab levels 1-2
    // Level 3+: access all
    return userLevel >= 3 ? [1, 2, 3] : Array.from({ length: userLevel }, (_, i) => i + 1)
  }

  // Load profile from Supabase
  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || '',
            level: 1,
            total_xp: 0,
            streak_days: 0,
            last_active: new Date().toISOString().split('T')[0],
          })
          .select()
          .single()

        setProfile(newProfile || { level: 1, total_xp: 0, streak_days: 0 })
      } else if (data) {
        // Check and update streak
        const today = new Date().toISOString().split('T')[0]
        const lastActive = data.last_active

        if (lastActive && lastActive !== today) {
          const lastDate = new Date(lastActive)
          const todayDate = new Date(today)
          const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24))

          if (diffDays > 1) {
            // Streak broken
            data.streak_days = 0
          }
        }

        setProfile(data)
      }
    } catch (err) {
      console.error('Error loading profile:', err)
      // Use local fallback
      const localData = localStorage.getItem(`englishup_profile_${user.id}`)
      if (localData) {
        setProfile(JSON.parse(localData))
      } else {
        setProfile({ level: 1, total_xp: 0, streak_days: 0 })
      }
    }

    // Load today's activity
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data } = await supabase
        .from('daily_activity')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_date', today)
        .single()

      setTodayActivity(data || { xp_earned: 0, exercises_completed: 0, modules_used: [] })
    } catch {
      setTodayActivity({ xp_earned: 0, exercises_completed: 0, modules_used: [] })
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // Save profile to Supabase and localStorage
  const saveProfile = async (updatedProfile) => {
    if (!user) return

    // Save locally first (instant feedback)
    localStorage.setItem(`englishup_profile_${user.id}`, JSON.stringify(updatedProfile))
    setProfile(updatedProfile)

    // Save to Supabase
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updatedProfile,
          updated_at: new Date().toISOString(),
        })
    } catch (err) {
      console.error('Error saving profile:', err)
    }
  }

  // Add XP and update level
  const addXP = async (amount, module) => {
    if (!user || !profile) return

    const newXP = (profile.total_xp || 0) + amount
    const newLevel = calculateLevel(newXP)
    const today = new Date().toISOString().split('T')[0]

    const updatedProfile = {
      ...profile,
      total_xp: newXP,
      level: newLevel.level,
      last_active: today,
      streak_days: profile.last_active === today 
        ? profile.streak_days 
        : (profile.streak_days || 0) + 1,
    }

    await saveProfile(updatedProfile)

    // Update daily activity
    try {
      const currentModules = todayActivity?.modules_used || []
      const updatedModules = currentModules.includes(module) 
        ? currentModules 
        : [...currentModules, module]

      const activityData = {
        user_id: user.id,
        activity_date: today,
        xp_earned: (todayActivity?.xp_earned || 0) + amount,
        exercises_completed: (todayActivity?.exercises_completed || 0) + 1,
        modules_used: updatedModules,
      }

      await supabase
        .from('daily_activity')
        .upsert(activityData, { onConflict: 'user_id,activity_date' })

      setTodayActivity(activityData)
    } catch (err) {
      console.error('Error updating activity:', err)
    }

    return { newXP, newLevel, leveledUp: newLevel.level > (profile.level || 1) }
  }

  // Save quiz result
  const saveQuizResult = async (category, score, totalQuestions) => {
    if (!user) return

    try {
      await supabase.from('quiz_results').insert({
        user_id: user.id,
        category,
        score,
        total_questions: totalQuestions,
        language: 'en',
      })
    } catch (err) {
      console.error('Error saving quiz result:', err)
    }
  }

  // Reset all progress
  const resetProgress = async () => {
    if (!user) return

    const resetProfile = {
      id: user.id,
      full_name: profile?.full_name || '',
      level: 1,
      total_xp: 0,
      streak_days: 0,
      last_active: new Date().toISOString().split('T')[0],
    }

    await saveProfile(resetProfile)

    // Clear daily activity
    try {
      await supabase.from('daily_activity').delete().eq('user_id', user.id)
      await supabase.from('quiz_results').delete().eq('user_id', user.id)
      await supabase.from('user_progress').delete().eq('user_id', user.id)
    } catch (err) {
      console.error('Error resetting progress:', err)
    }

    setTodayActivity({ xp_earned: 0, exercises_completed: 0, modules_used: [] })
    localStorage.removeItem(`englishup_profile_${user.id}`)
  }

  const value = {
    profile,
    loading,
    todayActivity,
    addXP,
    saveQuizResult,
    resetProgress,
    calculateLevel,
    getNextLevelInfo,
    getAccessibleVocabLevels,
    XP_REWARDS,
    LEVEL_THRESHOLDS,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

import { useState, useEffect } from 'react'

export default function XPNotification({ amount, show, onHide }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onHide, 300)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  if (!show) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 font-bold">
        <span className="text-xl">⚡</span>
        <span>+{amount} XP</span>
      </div>
    </div>
  )
}

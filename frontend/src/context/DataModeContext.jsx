/**
 * DataModeContext — Quản lý chế độ dữ liệu (mock / real)
 *
 * - mock: dùng src/mock-data/ và src/data/ (không cần backend chạy)
 * - real: gọi API thật từ Spring Boot backend
 *
 * Mode mặc định lấy từ VITE_DATA_MODE env var.
 * Có thể toggle qua DevPanel hoặc localStorage.
 */

import { createContext, useContext, useState, useEffect } from 'react'

const DATA_MODE_KEY = 'uniview-data-mode-v1'
const DEFAULT_MODE = import.meta.env.VITE_DATA_MODE ?? 'mock'

const DataModeContext = createContext(null)

export function DataModeProvider({ children }) {
  const [dataMode, setDataMode] = useState(() => {
    // Ưu tiên localStorage > env var
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(DATA_MODE_KEY)
      if (stored === 'mock' || stored === 'real') return stored
    }
    return DEFAULT_MODE
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DATA_MODE_KEY, dataMode)
    }
  }, [dataMode])

  const toggleDataMode = () => {
    setDataMode(prev => prev === 'mock' ? 'real' : 'mock')
  }

  const isMockMode = dataMode === 'mock'
  const isRealMode = dataMode === 'real'

  return (
    <DataModeContext.Provider value={{ dataMode, isMockMode, isRealMode, toggleDataMode, setDataMode }}>
      {children}
    </DataModeContext.Provider>
  )
}

export function useDataMode() {
  const context = useContext(DataModeContext)
  if (!context) throw new Error('useDataMode must be used within DataModeProvider')
  return context
}

/**
 * DataModeContext — Quản lý chế độ dữ liệu (mock / real)
 * và trạng thái hiển thị bí mật của bảng DevTools.
 *
 * Mặc định: DevTools BỊ GIẤU HOÀN TOÀN để an toàn khi deploy.
 * Cách bật DevTools:
 * 1. Nhấn tổ hợp phím: Ctrl + Shift + D (hoặc Cmd + Shift + D)
 * 2. Nhấp 5 lần liên tiếp vào Logo UniView
 * 3. Thêm query param: ?devtools=1 trên thanh địa chỉ URL
 * 4. Gõ toggleUniViewDevTools() trong console
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DATA_MODE_KEY = 'uniview-data-mode-v1'
const DEVTOOLS_OPEN_KEY = 'uniview-devtools-open-v1'
const DEFAULT_MODE = import.meta.env.VITE_DATA_MODE ?? 'mock'

const DataModeContext = createContext(null)

export function DataModeProvider({ children }) {
  const [dataMode, setDataMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(DATA_MODE_KEY)
      if (stored === 'mock' || stored === 'real') return stored
    }
    return DEFAULT_MODE
  })

  // Mặc định GIẤU hoàn toàn khi deploy
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    if (params.get('devtools') === '1' || params.get('debug') === '1') return true
    return window.sessionStorage.getItem(DEVTOOLS_OPEN_KEY) === 'true'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DATA_MODE_KEY, dataMode)
    }
  }, [dataMode])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(DEVTOOLS_OPEN_KEY, String(isDevToolsOpen))
    }
  }, [isDevToolsOpen])

  const toggleDataMode = useCallback(() => {
    setDataMode((prev) => (prev === 'mock' ? 'real' : 'mock'))
  }, [])

  const toggleDevTools = useCallback(() => {
    setIsDevToolsOpen((prev) => !prev)
  }, [])

  const openDevTools = useCallback(() => {
    setIsDevToolsOpen(true)
  }, [])

  const closeDevTools = useCallback(() => {
    setIsDevToolsOpen(false)
  }, [])

  // Bắt phím tắt bí mật toàn cục: Ctrl + Shift + D
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault()
        setIsDevToolsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.toggleUniViewDevTools = () => setIsDevToolsOpen((prev) => !prev)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const isMockMode = dataMode === 'mock'
  const isRealMode = dataMode === 'real'

  return (
    <DataModeContext.Provider
      value={{
        dataMode,
        isMockMode,
        isRealMode,
        toggleDataMode,
        setDataMode,
        isDevToolsOpen,
        toggleDevTools,
        openDevTools,
        closeDevTools,
      }}
    >
      {children}
    </DataModeContext.Provider>
  )
}

export function useDataMode() {
  const context = useContext(DataModeContext)
  if (!context) throw new Error('useDataMode must be used within DataModeProvider')
  return context
}

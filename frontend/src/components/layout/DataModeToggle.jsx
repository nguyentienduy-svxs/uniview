/**
 * DataModeToggle — Nút toggle Mock Data / Real API
 * Chỉ hiển thị khi đang ở chế độ development (import.meta.env.DEV)
 * Hoặc khi query param ?devtools=1 được truyền vào
 */

import { useState, useEffect } from 'react'
import { useDataMode } from '../../context/DataModeContext'

export function DataModeToggle() {
  const { dataMode, isMockMode, toggleDataMode } = useDataMode()
  const [visible, setVisible] = useState(false)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    // Hiện nếu đang dev mode hoặc có ?devtools=1
    const params = new URLSearchParams(window.location.search)
    const show = import.meta.env.DEV || params.get('devtools') === '1'
    setVisible(show)
  }, [])

  if (!visible) return null

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-24 left-3 z-[9999] w-9 h-9 rounded-full shadow-lg flex items-center justify-center text-xs font-bold border"
        style={{
          background: isMockMode ? '#fef3c7' : '#ede9fe',
          borderColor: isMockMode ? '#f59e0b' : '#7c3aed',
          color: isMockMode ? '#92400e' : '#5b21b6',
        }}
        title={`Chế độ dữ liệu: ${dataMode.toUpperCase()}`}
      >
        {isMockMode ? 'M' : 'R'}
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-24 left-3 z-[9999] rounded-2xl shadow-xl border p-3 flex flex-col gap-2 w-52"
      style={{
        background: '#fff',
        borderColor: '#e5e7eb',
        fontFamily: 'Plus Jakarta Sans, Be Vietnam Pro, sans-serif',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          🛠 Dev Tools
        </span>
        <button
          onClick={() => setMinimized(true)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          ✕
        </button>
      </div>

      {/* Data mode toggle */}
      <div className="rounded-xl border p-2.5"
        style={{
          background: isMockMode ? '#fffbeb' : '#f5f3ff',
          borderColor: isMockMode ? '#fde68a' : '#ddd6fe',
        }}
      >
        <div className="text-[11px] font-bold mb-1.5"
          style={{ color: isMockMode ? '#92400e' : '#5b21b6' }}
        >
          Chế độ dữ liệu
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => !isMockMode && toggleDataMode()}
            className="flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all border"
            style={{
              background: isMockMode ? '#f59e0b' : '#fff',
              color: isMockMode ? '#fff' : '#6b7280',
              borderColor: isMockMode ? '#f59e0b' : '#e5e7eb',
            }}
          >
            📋 Mock
          </button>
          <button
            onClick={() => isMockMode && toggleDataMode()}
            className="flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all border"
            style={{
              background: !isMockMode ? '#7c3aed' : '#fff',
              color: !isMockMode ? '#fff' : '#6b7280',
              borderColor: !isMockMode ? '#7c3aed' : '#e5e7eb',
            }}
          >
            🌐 Real API
          </button>
        </div>

        <p className="text-[10px] mt-1.5 leading-relaxed"
          style={{ color: isMockMode ? '#92400e' : '#5b21b6' }}
        >
          {isMockMode
            ? 'Dùng file mock trong src/mock-data/'
            : 'Gọi Spring Boot API (cần backend chạy)'
          }
        </p>
      </div>

      {/* Auth mode info */}
      <div className="text-[10px] text-gray-400 leading-relaxed">
        Auth mode: <code className="bg-gray-100 px-1 rounded">{import.meta.env.VITE_AUTH_MODE ?? 'mock'}</code>
        <br />
        API URL: <code className="bg-gray-100 px-1 rounded text-[9px]">{import.meta.env.VITE_API_URL ?? 'localhost:8080'}</code>
      </div>
    </div>
  )
}

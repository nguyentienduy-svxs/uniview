/**
 * DataModeToggle — Bảng điều khiển DevTools bí mật
 *
 * Mặc định: KHÔNG HIỂN THỊ GÌ TRÊN MÀN HÌNH (hoàn toàn tàng hình khi deploy).
 *
 * Cách mở:
 * - Nhấn: Ctrl + Shift + D (hoặc Cmd + Shift + D trên Mac)
 * - Hoặc nhấp liên tiếp 5 lần vào Logo UniView trên Header
 * - Hoặc vào đường dẫn có đuôi: ?devtools=1
 */

import { useState, useEffect } from 'react'
import { useDataMode } from '../../context/DataModeContext'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export function DataModeToggle() {
  const { dataMode, isMockMode, toggleDataMode, isDevToolsOpen, closeDevTools } = useDataMode()
  const [serverStatus, setServerStatus] = useState(null)
  const [checking, setChecking] = useState(false)

  const checkServer = async () => {
    setChecking(true)
    try {
      const res = await fetch(`${API_BASE_URL}/status`, { signal: AbortSignal.timeout(2500) })
      if (res.ok) {
        const data = await res.json()
        setServerStatus({ online: true, ...data })
      } else {
        setServerStatus({ online: false })
      }
    } catch {
      setServerStatus({ online: false })
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    if (isDevToolsOpen) {
      checkServer()
    }
  }, [isDevToolsOpen])

  // Nếu chưa được bật bí mật thì GIẤU HOÀN TOÀN (zero footprint)
  if (!isDevToolsOpen) return null

  return (
    <div
      className="fixed bottom-6 left-6 z-[99999] rounded-2xl shadow-2xl border p-4 flex flex-col gap-3 w-72 backdrop-blur-md bg-white/95 animate-in fade-in slide-in-from-bottom-4 duration-200"
      style={{
        borderColor: '#e2e8f0',
        fontFamily: 'Plus Jakarta Sans, Be Vietnam Pro, sans-serif',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-slate-100 text-xs">🛠</span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            DevTools (Ẩn)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={checkServer}
            disabled={checking}
            className="text-[11px] text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded cursor-pointer"
            title="Kiểm tra kết nối server"
          >
            {checking ? '🔄...' : '🔄'}
          </button>
          <button
            onClick={closeDevTools}
            className="text-slate-400 hover:text-slate-700 text-sm px-1.5 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
            title="Đóng bảng (Ctrl+Shift+D để mở lại)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Mode toggle */}
      <div
        className="rounded-xl border p-3 transition-colors"
        style={{
          background: isMockMode ? '#fffbeb' : '#f5f3ff',
          borderColor: isMockMode ? '#fde68a' : '#ddd6fe',
        }}
      >
        <div className="text-[11px] font-bold mb-2 flex items-center justify-between"
          style={{ color: isMockMode ? '#92400e' : '#5b21b6' }}
        >
          <span>Chế độ dữ liệu</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white font-bold border shadow-2xs">
            {dataMode.toUpperCase()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => !isMockMode && toggleDataMode()}
            className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer"
            style={{
              background: isMockMode ? '#f59e0b' : '#fff',
              color: isMockMode ? '#fff' : '#64748b',
              borderColor: isMockMode ? '#f59e0b' : '#cbd5e1',
            }}
          >
            📋 Mock
          </button>
          <button
            onClick={() => {
              if (isMockMode) toggleDataMode()
              checkServer()
            }}
            className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer"
            style={{
              background: !isMockMode ? '#7c3aed' : '#fff',
              color: !isMockMode ? '#fff' : '#64748b',
              borderColor: !isMockMode ? '#7c3aed' : '#cbd5e1',
            }}
          >
            🌐 Real API
          </button>
        </div>

        <p className="text-[10px] mt-2 leading-relaxed"
          style={{ color: isMockMode ? '#92400e' : '#5b21b6' }}
        >
          {isMockMode
            ? 'Đang dùng file mock trong src/mock-data/'
            : 'Đang kết nối Spring Boot & PostgreSQL Render'
          }
        </p>
      </div>

      {/* Backend Status info */}
      <div className="rounded-xl border p-3 text-[11px] leading-relaxed bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between font-bold mb-1.5">
          <span className="text-slate-700">Spring Boot (:8080):</span>
          {serverStatus?.online ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Online
            </span>
          ) : (
            <span className="text-rose-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              Offline
            </span>
          )}
        </div>

        {serverStatus?.online ? (
          <div className="space-y-1 text-slate-500 text-[10px]">
            <div>🐘 DB: <strong className="text-slate-700">PostgreSQL (Render)</strong></div>
            <div className="grid grid-cols-2 gap-1.5 pt-1 font-mono text-[10px] text-slate-600">
              <div className="bg-white p-1.5 rounded border">Users: <strong>{serverStatus.counts?.users ?? 0}</strong></div>
              <div className="bg-white p-1.5 rounded border">Feedbacks: <strong>{serverStatus.counts?.feedbacks ?? 0}</strong></div>
              <div className="bg-white p-1.5 rounded border">Ngành: <strong>{serverStatus.counts?.majors ?? 0}</strong></div>
              <div className="bg-white p-1.5 rounded border">Trường: <strong>{serverStatus.counts?.universities ?? 0}</strong></div>
            </div>
          </div>
        ) : (
          <div className="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 text-[10px] mt-1">
            Backend chưa chạy. Để bật:<br/>
            <code className="bg-white px-1 py-0.5 rounded border mt-0.5 inline-block text-[9px]">cd backend &amp;&amp; mvn spring-boot:run</code>
          </div>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      <div className="text-[10px] text-slate-400 text-center border-t pt-2 flex items-center justify-center gap-1">
        <span>Ẩn/Hiện:</span>
        <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-slate-600 text-[9px]">
          Ctrl + Shift + D
        </kbd>
      </div>
    </div>
  )
}

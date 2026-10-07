import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { MOCK_SESSIONS } from '../data/user'

const SESSION_META = {
  guest:     { label: 'Guest',      icon: 'person_off',       color: '#6b7280' },
  free:      { label: 'Free',       icon: 'person',           color: '#1d4ed8' },
  direction: { label: 'Direction',  icon: 'explore',          color: '#7c3aed' },
  admission: { label: 'Admission',  icon: 'school',           color: '#059669' },
  both:      { label: 'Both',       icon: 'workspace_premium',color: '#fb7185' },
}

const SESSION_KEYS = Object.keys(MOCK_SESSIONS)

function DevToolbar() {
  const { authMode, session, selectMockSession } = useAuth()
  const [open, setOpen] = useState(false)

  // Chỉ hiển thị trong mock mode
  if (authMode !== 'mock') return null

  const currentKey = SESSION_KEYS.find((k) => {
    const s = MOCK_SESSIONS[k]
    return s.user?.id === session?.user?.id
      && JSON.stringify(s.entitlements) === JSON.stringify(session?.entitlements ?? [])
  }) ?? 'free'

  const current = SESSION_META[currentKey]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      {/* Popup menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            right: 0,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(23,32,51,0.14)',
            minWidth: '220px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 14px 8px',
              borderBottom: '1px solid #f3f4f6',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#9ca3af',
            }}
          >
            🛠 Dev — Mock Session
          </div>

          {SESSION_KEYS.map((key) => {
            const meta = SESSION_META[key]
            const isActive = key === currentKey
            return (
              <button
                key={key}
                onClick={() => {
                  selectMockSession(key)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  background: isActive ? '#eff6ff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f9fafb' }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '18px', color: meta.color }}
                >
                  {meta.icon}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#1d4ed8' : '#374151',
                  }}
                >
                  {meta.label}
                </span>
                {isActive && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '16px', color: '#1d4ed8' }}
                  >
                    check_circle
                  </span>
                )}
              </button>
            )
          })}

          <div
            style={{
              padding: '8px 14px',
              borderTop: '1px solid #f3f4f6',
              fontSize: '10px',
              color: '#9ca3af',
            }}
          >
            Chỉ hiển thị khi VITE_AUTH_MODE=mock
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Dev: Switch mock session"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px 8px 10px',
          background: '#172033',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(23,32,51,0.25)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
          transition: 'opacity 0.15s',
          opacity: open ? 1 : 0.85,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.opacity = '0.85' }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '16px', color: current.color }}
        >
          {current.icon}
        </span>
        <span>{current.label}</span>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '14px',
            color: '#9ca3af',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          expand_less
        </span>
      </button>
    </div>
  )
}

export default DevToolbar

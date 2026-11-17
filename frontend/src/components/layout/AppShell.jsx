/**
 * AppShell — Layout wrapper chính của UniView
 * Chứa sidebar, top header, và floating mascot.
 * Bỏ qua sidebar/header cho trang PDF report.
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import FloatingMascot from '../FloatingMascot'

// PDF route không cần layout
const PDF_ROUTE = '/report/pdf'

export default function AppShell({ children }) {
  const location = useLocation()
  const isPdf = location.pathname === PDF_ROUTE

  // Scroll top khi navigate
  const prevPath = useRef(location.pathname)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      prevPath.current = location.pathname
    }
  }, [location.pathname])

  if (isPdf) return <>{children}</>

  return (
    <div className="min-h-screen bg-[#F7F8FE] text-[#1B2A4A]">
      {children}
      <FloatingMascot />
    </div>
  )
}

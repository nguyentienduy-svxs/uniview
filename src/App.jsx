import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppFooter from './components/AppFooter'
import FloatingMascot from './components/FloatingMascot'
import PageRenderer from './components/PageRenderer'
import ScrollToTop from './components/ScrollToTop'
import { pages } from './data/pages'
import AllPagesPage from './pages/AllPagesPage'
import NotFoundPage from './pages/NotFoundPage'
import AppHeader from './components/header/AppHeader'
import { AuthProvider } from './context/AuthContext'
import { AssessmentProvider } from './context/AssessmentContext'
import { JourneyProvider } from './context/JourneyContext'

function AppContent() {
  const location = useLocation()
  const isPdfReport = location.pathname === '/report/pdf'
  const isReportWorkspace = location.pathname === '/report'
    || location.pathname.startsWith('/report/group/')
    || location.pathname.startsWith('/report/major/')
    || isPdfReport

  useEffect(() => {
    const headers = document.querySelectorAll('#uniview-app-header')
    headers.forEach((header, index) => {
      if (index > 0) header.remove()
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#121b2e]">
      {!isPdfReport && <AppHeader />}
      {!isReportWorkspace && <FloatingMascot />}

      <Routes>
        {pages.map((page) => (
          <Route
            key={page.id}
            path={page.path}
            element={<PageRenderer page={page} />}
          />
        ))}

        <Route
          path="/screens"
          element={<AllPagesPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>

      {!isReportWorkspace && <AppFooter />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AssessmentProvider>
          <JourneyProvider>
            <ScrollToTop />
            <AppContent />
          </JourneyProvider>
        </AssessmentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

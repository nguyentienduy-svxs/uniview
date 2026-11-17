import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppHeader from './components/header/AppHeader'
import AppFooter from './components/AppFooter'
import FloatingMascot from './components/FloatingMascot'
import { DataModeToggle } from './components/layout/DataModeToggle'
import PageRenderer from './components/PageRenderer'
import ScrollToTop from './components/ScrollToTop'
import { pages } from './data/pages'
import AllPagesPage from './pages/AllPagesPage'
import NotFoundPage from './pages/NotFoundPage'
import { AuthProvider } from './context/AuthContext'
import { AssessmentProvider } from './context/AssessmentContext'
import { JourneyProvider } from './context/JourneyContext'
import { DataModeProvider } from './context/DataModeContext'

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
    <div className="min-h-screen bg-[#F7F8FE] text-[#1B2A4A] flex flex-col justify-between">
      {!isPdfReport && <AppHeader />}
      
      <main className="flex-1 w-full">
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
      </main>

      <FloatingMascot />

      {!isReportWorkspace && <AppFooter />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <DataModeProvider>
        <AuthProvider>
          <AssessmentProvider>
            <JourneyProvider>
              <ScrollToTop />
              <AppContent />
              <DataModeToggle />
            </JourneyProvider>
          </AssessmentProvider>
        </AuthProvider>
      </DataModeProvider>
    </BrowserRouter>
  )
}

export default App

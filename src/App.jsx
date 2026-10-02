import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import PageRenderer from './components/PageRenderer'
import ScrollToTop from './components/ScrollToTop'
import { pages } from './data/pages'
import AllPagesPage from './pages/AllPagesPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#f9f9ff] text-[#121b2e]">
        <AppHeader />
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.id}
              path={page.path}
              element={<PageRenderer page={page} />}
            />
          ))}
          <Route path="/screens" element={<AllPagesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AppFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
